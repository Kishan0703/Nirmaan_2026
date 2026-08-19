import { NextResponse } from "next/server";
import { getGameConfig } from "@/lib/game-config";
import { getGameSessionByToken, finalizeGameSession, saveScoreRecord, hasScoreRecordForSession } from "@/lib/neon";
import { saveNeonLeaderboardScore, getNeonLeaderboard } from "@/lib/neon";
import { checkSlidingWindow } from "@/lib/auth/rate-limit";
import { handleServerError } from "@/lib/auth/error-handler";
import { validateGameScore } from "@/lib/game-score";

export const dynamic = "force-dynamic";

const FINALIZE_RATE_LIMIT = { limit: 10, windowMs: 60 * 1000 };

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
    const rateLimit = checkSlidingWindow(`game_finalize:${ip}`, FINALIZE_RATE_LIMIT.limit, FINALIZE_RATE_LIMIT.windowMs);
    if (!rateLimit.success) {
      return NextResponse.json(
        { error: "Too many requests. Please wait." },
        { status: 429, headers: { "Retry-After": String(rateLimit.retryAfterSeconds) } }
      );
    }

    const body = await request.json();
    const { session_token } = body;

    if (!session_token || typeof session_token !== "string") {
      return NextResponse.json({ error: "Session token required" }, { status: 400 });
    }

    const session = await getGameSessionByToken(session_token);
    if (!session) {
      return NextResponse.json({ error: "Invalid or expired session" }, { status: 404 });
    }

    if (session.status !== "active") {
      return NextResponse.json({ error: "Game session has already ended" }, { status: 400 });
    }

    const alreadySubmitted = await hasScoreRecordForSession(session_token);
    if (alreadySubmitted) {
      return NextResponse.json({ error: "Score already submitted for this session" }, { status: 409 });
    }

    const gameConfig = await getGameConfig();
    const maxPossibleScore = calculateMaxPossibleScore(gameConfig);
    const serverScore = session.score;

    const scoreResult = validateGameScore(serverScore, {
      gameDuration: gameConfig.gameDuration,
      pointsPerBug: gameConfig.pointsPerBug,
      spawnIntervalMs: gameConfig.spawnIntervalMs,
    });

    if (!scoreResult.ok) {
      console.warn(`[SCORE VALIDATION FAILED] Session: ${session_token}, Score: ${serverScore}, Error: ${scoreResult.error}`);
      return NextResponse.json({ error: "Invalid score detected", details: scoreResult.error }, { status: 400 });
    }

    if (serverScore > maxPossibleScore) {
      console.warn(`[CHEAT DETECTED] Score exceeds maximum possible: ${serverScore} > ${maxPossibleScore} for session ${session_token}`);
      return NextResponse.json({ error: "Score exceeds maximum possible for game duration" }, { status: 400 });
    }

    const finalizedSession = await finalizeGameSession(session_token);
    if (!finalizedSession) {
      return NextResponse.json({ error: "Failed to finalize session" }, { status: 500 });
    }

    const scoreRecordId = `score_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
    await saveScoreRecord({
      id: scoreRecordId,
      player_id: finalizedSession.player_id,
      player_name: finalizedSession.player_name,
      score: finalizedSession.score,
      session_token: finalizedSession.session_token,
    });

    const leaderboardResult = await saveNeonLeaderboardScore({
      id: finalizedSession.player_id,
      name: finalizedSession.player_name,
      score: finalizedSession.score,
    });

    const leaderboard = (await getNeonLeaderboard()) || [];
    const userRankIndex = leaderboard.findIndex((e) => e.id === finalizedSession.player_id);
    const userRank = userRankIndex >= 0 ? userRankIndex + 1 : null;

    return NextResponse.json({
      success: true,
      final_score: finalizedSession.score,
      clicks_count: finalizedSession.clicks_count,
      player_name: finalizedSession.player_name,
      player_id: finalizedSession.player_id,
      leaderboard: leaderboardResult?.leaderboard || leaderboard.slice(0, 10),
      userRank: leaderboardResult?.userRank ?? userRank,
    });
  } catch (err) {
    return handleServerError(err, "Game Finalize Error");
  }
}

function calculateMaxPossibleScore(config: { gameDuration: number; pointsPerBug: number; spawnIntervalMs: number }): number {
  const { gameDuration, pointsPerBug, spawnIntervalMs } = config;
  const durationMs = gameDuration * 1000;
  let elapsedMs = 0;
  let score = 0;
  const MIN_SPAWN_INTERVAL_MS = 200;

  while (elapsedMs <= durationMs) {
    score += pointsPerBug;
    const nextInterval = Math.max(MIN_SPAWN_INTERVAL_MS, spawnIntervalMs - Math.floor(score / 50) * 50);
    elapsedMs += nextInterval;
  }

  return score;
}