import { NextResponse } from "next/server";
import { getGameConfig } from "@/lib/game-config";
import { getGameSessionByToken, updateGameSessionClick } from "@/lib/neon";
import { checkSlidingWindow } from "@/lib/auth/rate-limit";
import { handleServerError } from "@/lib/auth/error-handler";

export const dynamic = "force-dynamic";

const CLICK_RATE_LIMIT = { limit: 120, windowMs: 60 * 1000 };
const MAX_CLICKS_PER_SECOND = 10;

function getClientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0].trim();
  }
  return "unknown";
}

const clickTimestamps = new Map<string, number[]>();

function checkClickRate(sessionToken: string): { allowed: boolean; cps: number } {
  const now = Date.now();
  const windowMs = 1000;
  const windowStart = now - windowMs;

  let timestamps = clickTimestamps.get(sessionToken) || [];
  timestamps = timestamps.filter((ts) => ts > windowStart);
  const cps = timestamps.length;

  timestamps.push(now);
  clickTimestamps.set(sessionToken, timestamps);

  if (timestamps.length > 100) {
    clickTimestamps.set(sessionToken, timestamps.slice(-100));
  }

  return { allowed: cps <= MAX_CLICKS_PER_SECOND, cps };
}

export async function POST(request: Request) {
  try {
    const ip = getClientIp(request);
    const rateLimit = checkSlidingWindow(`game_click:${ip}`, CLICK_RATE_LIMIT.limit, CLICK_RATE_LIMIT.windowMs);
    if (!rateLimit.success) {
      return NextResponse.json(
        { error: "Too many requests. Please slow down." },
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
      return NextResponse.json({ error: "Game session has ended" }, { status: 400 });
    }

    const clickRate = checkClickRate(session_token);
    if (!clickRate.allowed) {
      console.warn(`[CHEAT DETECTED] High CPS: ${clickRate.cps} for session ${session_token}`);
      return NextResponse.json(
        { error: "Click rate exceeded. Slow down!", cheat_detected: true, cps: clickRate.cps },
        { status: 429 }
      );
    }

    const gameConfig = await getGameConfig();
    const maxPossibleScore = calculateMaxPossibleScore(gameConfig);
    if (session.score >= maxPossibleScore) {
      return NextResponse.json({ error: "Maximum score reached" }, { status: 400 });
    }

    const result = await updateGameSessionClick(session_token);
    if (!result) {
      return NextResponse.json({ error: "Failed to update score" }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      score: result.score,
      clicks_count: result.clicks_count,
    });
  } catch (err) {
    return handleServerError(err, "Game Click Error");
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