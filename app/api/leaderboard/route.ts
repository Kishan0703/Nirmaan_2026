import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getLeaderboard, saveLeaderboardScore, clearLeaderboard } from "@/lib/db";
import { getGameConfig } from "@/lib/game-config";
import { validateGameScore } from "@/lib/game-score";
import { verifySessionToken } from "@/lib/auth/security";
import { findUserById } from "@/lib/auth/db";
import { handleServerError } from "@/lib/auth/error-handler";
import { getGameSessionByToken, hasScoreRecordForSession } from "@/lib/neon";
import { checkSlidingWindow } from "@/lib/auth/rate-limit";

export const dynamic = "force-dynamic";

const LEADERBOARD_RATE_LIMIT = { limit: 5, windowMs: 60 * 1000 };

function getClientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0].trim();
  }
  return "unknown";
}

// GET is public read-only
export async function GET() {
  try {
    const list = await getLeaderboard();
    const sorted = list.slice(0, 50);
    return NextResponse.json({ leaderboard: sorted });
  } catch (err) {
    return handleServerError(err, "Leaderboard GET Error");
  }
}

// DELETE: Strict Admin Authorization Check (Clears leaderboard)
export async function DELETE() {
  try {
    const cookieStore = await cookies();
    const sessionToken = cookieStore.get("session_token")?.value;
    const payload = sessionToken ? verifySessionToken(sessionToken) : null;

    if (!payload || payload.role !== "admin") {
      return NextResponse.json({ error: "Forbidden: Admin access required." }, { status: 403 });
    }

    await clearLeaderboard();
    return NextResponse.json({ success: true, leaderboard: [] });
  } catch (err) {
    return handleServerError(err, "Leaderboard DELETE Error");
  }
}

// POST: Game score submission - requires valid completed game session
export async function POST(request: Request) {
  try {
    const ip = getClientIp(request);
    const rateLimit = checkSlidingWindow(`leaderboard_post:${ip}`, LEADERBOARD_RATE_LIMIT.limit, LEADERBOARD_RATE_LIMIT.windowMs);
    if (!rateLimit.success) {
      return NextResponse.json(
        { error: "Too many submissions. Please wait." },
        { status: 429, headers: { "Retry-After": String(rateLimit.retryAfterSeconds) } }
      );
    }

    const body = await request.json();
    const { id, name, score, session_token } = body;

    if (!session_token || typeof session_token !== "string") {
      return NextResponse.json({ error: "Session token required for score submission" }, { status: 400 });
    }

    const session = await getGameSessionByToken(session_token);
    if (!session) {
      return NextResponse.json({ error: "Invalid session token" }, { status: 404 });
    }

    if (session.status !== "completed") {
      return NextResponse.json({ error: "Game session not completed" }, { status: 400 });
    }

    const alreadySubmitted = await hasScoreRecordForSession(session_token);
    if (alreadySubmitted) {
      return NextResponse.json({ error: "Score already submitted for this session" }, { status: 409 });
    }

    if (session.player_id !== id) {
      return NextResponse.json({ error: "Player ID mismatch" }, { status: 400 });
    }

    const gameConfig = await getGameConfig();
    const scoreResult = validateGameScore(score, gameConfig);
    if (!scoreResult.ok) {
      return NextResponse.json({ error: scoreResult.error }, { status: 400 });
    }

    if (score !== session.score) {
      console.warn(`[SCORE MISMATCH] Client sent: ${score}, Server has: ${session.score} for session ${session_token}`);
      return NextResponse.json({ error: "Score mismatch - server authoritative" }, { status: 400 });
    }

    const cleanId = String(id || "").trim();
    const cleanName = String(name || "").trim().slice(0, 20) || "Anonymous Bug Squasher";

    const result = await saveLeaderboardScore({
      id: cleanId,
      name: cleanName,
      score: scoreResult.score,
    });

    return NextResponse.json({
      success: true,
      leaderboard: result.leaderboard,
      userRank: result.userRank,
      rank: result.userRank,
    });
  } catch (err) {
    return handleServerError(err, "Leaderboard POST Error");
  }
}
