import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getLeaderboard, saveLeaderboardScore, clearLeaderboard } from "@/lib/db";
import { verifySessionToken } from "@/lib/auth/security";
import { findUserById } from "@/lib/auth/db";
import { handleServerError } from "@/lib/auth/error-handler";

export const dynamic = "force-dynamic";

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

// POST: Game score submission
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { id, name, score } = body;

    const parsedScore = Number.parseInt(String(score), 10);
    if (!Number.isFinite(parsedScore) || parsedScore < 0) {
      return NextResponse.json({ error: "Invalid score value." }, { status: 400 });
    }

    const cleanId = String(id || "").trim() || `player_${Date.now()}`;
    const cleanName = String(name || "").trim().slice(0, 20) || "Anonymous Bug Squasher";

    const result = await saveLeaderboardScore({
      id: cleanId,
      name: cleanName,
      score: parsedScore,
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
