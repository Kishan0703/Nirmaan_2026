import { NextResponse } from "next/server";
import { getGameConfig } from "@/lib/game-config";
import { createGameSession, getGameSessionByToken } from "@/lib/neon";
import { generateSecureToken } from "@/lib/auth/security";
import { checkSlidingWindow } from "@/lib/auth/rate-limit";
import { sanitizePlayerName } from "@/lib/security-sanitize";
import { handleServerError } from "@/lib/auth/error-handler";

export const dynamic = "force-dynamic";

const SESSION_RATE_LIMIT = { limit: 5, windowMs: 60 * 1000 };

function getClientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0].trim();
  }
  return "unknown";
}

export async function POST(request: Request) {
  try {
    const ip = getClientIp(request);
    const rateLimit = checkSlidingWindow(`game_session:${ip}`, SESSION_RATE_LIMIT.limit, SESSION_RATE_LIMIT.windowMs);
    if (!rateLimit.success) {
      return NextResponse.json(
        { error: "Too many session requests. Please wait." },
        { status: 429, headers: { "Retry-After": String(rateLimit.retryAfterSeconds) } }
      );
    }

    const body = await request.json();
    const { player_name } = body;

    const cleanName = sanitizePlayerName(player_name);
    if (!cleanName) {
      return NextResponse.json({ error: "Invalid player name" }, { status: 400 });
    }

    const gameConfig = await getGameConfig();
    const playerId = `player_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
    const { rawToken: sessionToken } = generateSecureToken();
    const sessionId = `session_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;

    const session = await createGameSession({
      id: sessionId,
      player_id: playerId,
      player_name: cleanName,
      session_token: sessionToken,
    });

    if (!session) {
      return NextResponse.json({ error: "Failed to create game session" }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      session: {
        id: session.id,
        player_id: session.player_id,
        player_name: session.player_name,
        session_token: session.session_token,
        game_duration: gameConfig.gameDuration,
        points_per_bug: gameConfig.pointsPerBug,
        spawn_interval_ms: gameConfig.spawnIntervalMs,
        bug_lifetime_ms: gameConfig.bugLifetimeMs,
      },
    });
  } catch (err) {
    return handleServerError(err, "Game Session Create Error");
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const sessionToken = searchParams.get("session_token");

    if (!sessionToken) {
      return NextResponse.json({ error: "Session token required" }, { status: 400 });
    }

    const session = await getGameSessionByToken(sessionToken);
    if (!session) {
      return NextResponse.json({ error: "Session not found" }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      session: {
        id: session.id,
        player_id: session.player_id,
        player_name: session.player_name,
        score: session.score,
        clicks_count: session.clicks_count,
        status: session.status,
        started_at: session.started_at,
        ended_at: session.ended_at,
      },
    });
  } catch (err) {
    return handleServerError(err, "Game Session Get Error");
  }
}