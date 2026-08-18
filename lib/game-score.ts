const DEFAULT_GAME_DURATION_SECONDS = 30;
const DEFAULT_POINTS_PER_BUG = 10;
const DEFAULT_SPAWN_INTERVAL_MS = 700;
const MIN_SPAWN_INTERVAL_MS = 200;

export const MAX_GAME_SCORE = getMaxPossibleGameScore(
  DEFAULT_GAME_DURATION_SECONDS,
  DEFAULT_POINTS_PER_BUG,
  DEFAULT_SPAWN_INTERVAL_MS
);

type GameScoreConfig = {
  gameDuration?: number;
  pointsPerBug?: number;
  spawnIntervalMs?: number;
};

type ValidScoreResult =
  | { ok: true; score: number }
  | { ok: false; error: string };

export function validateGameScore(score: unknown, config: GameScoreConfig = {}): ValidScoreResult {
  const parsedScore = Number.parseInt(String(score), 10);
  const gameDuration = Number.isFinite(config.gameDuration) && config.gameDuration ? config.gameDuration : DEFAULT_GAME_DURATION_SECONDS;
  const pointsPerBug = Number.isFinite(config.pointsPerBug) && config.pointsPerBug ? config.pointsPerBug : DEFAULT_POINTS_PER_BUG;
  const spawnIntervalMs =
    Number.isFinite(config.spawnIntervalMs) && config.spawnIntervalMs ? config.spawnIntervalMs : DEFAULT_SPAWN_INTERVAL_MS;
  const maxScore = getMaxPossibleGameScore(gameDuration, pointsPerBug, spawnIntervalMs);

  if (!Number.isFinite(parsedScore) || parsedScore < 0) {
    return { ok: false, error: "Invalid score value." };
  }

  if (parsedScore > maxScore || parsedScore % pointsPerBug !== 0) {
    return { ok: false, error: "Score is outside the allowed game range." };
  }

  return { ok: true, score: parsedScore };
}

function getMaxPossibleGameScore(gameDuration: number, pointsPerBug: number, spawnIntervalMs: number): number {
  const durationMs = gameDuration * 1000;
  let elapsedMs = 0;
  let score = 0;

  while (elapsedMs <= durationMs) {
    score += pointsPerBug;
    const nextInterval = Math.max(MIN_SPAWN_INTERVAL_MS, spawnIntervalMs - Math.floor(score / 50) * 50);
    elapsedMs += nextInterval;
  }

  return score;
}
