type RateLimitRecord = {
  tokens: number;
  lastRefill: number;
};

type SlidingWindowRecord = {
  timestamps: number[];
};

const tokenBucketStore = new Map<string, RateLimitRecord>();
const slidingWindowStore = new Map<string, SlidingWindowRecord>();

/**
 * Token Bucket Rate Limiter
 * Refills tokens continuously over time. Excellent for burst control on AI & API routes.
 */
export function checkTokenBucket(
  key: string,
  capacity: number = 10,
  fillRatePerSecond: number = 1
): { success: boolean; remaining: number; retryAfterSeconds: number } {
  const now = Date.now();
  let record = tokenBucketStore.get(key);

  if (!record) {
    record = { tokens: capacity, lastRefill: now };
    tokenBucketStore.set(key, record);
  }

  // Calculate refilled tokens
  const elapsedSeconds = (now - record.lastRefill) / 1000;
  record.tokens = Math.min(capacity, record.tokens + elapsedSeconds * fillRatePerSecond);
  record.lastRefill = now;

  if (record.tokens >= 1) {
    record.tokens -= 1;
    return { success: true, remaining: Math.floor(record.tokens), retryAfterSeconds: 0 };
  }

  const retryAfterSeconds = Math.ceil((1 - record.tokens) / fillRatePerSecond);
  return { success: false, remaining: 0, retryAfterSeconds };
}

/**
 * Sliding Window Log Rate Limiter
 * Accurately tracks request timestamps over a moving window. Best for auth & strict limit enforcement.
 */
export function checkSlidingWindow(
  key: string,
  limit: number = 5,
  windowMs: number = 15 * 60 * 1000
): { success: boolean; remaining: number; retryAfterSeconds: number } {
  const now = Date.now();
  const windowStart = now - windowMs;

  let record = slidingWindowStore.get(key);
  if (!record) {
    record = { timestamps: [] };
    slidingWindowStore.set(key, record);
  }

  // Filter out timestamps outside current sliding window
  record.timestamps = record.timestamps.filter((ts) => ts > windowStart);

  if (record.timestamps.length >= limit) {
    const oldestInWindow = record.timestamps[0];
    const retryAfterSeconds = Math.ceil((oldestInWindow + windowMs - now) / 1000);
    return { success: false, remaining: 0, retryAfterSeconds };
  }

  record.timestamps.push(now);
  return { success: true, remaining: limit - record.timestamps.length, retryAfterSeconds: 0 };
}

// Backward compatibility alias for existing routes
export const checkRateLimit = checkSlidingWindow;

/**
 * Preset Rate Limiting Configuration Rules
 */
export const RATE_LIMIT_PRESETS = {
  LOGIN: { limit: 5, windowMs: 15 * 60 * 1000 },
  REGISTER: { limit: 3, windowMs: 60 * 60 * 1000 },
  PASSWORD_RESET: { limit: 3, windowMs: 60 * 60 * 1000 },
  GENERAL_API: { limit: 60, windowMs: 60 * 1000 },
  AI_GENERATION: { capacity: 10, fillRatePerSecond: 0.1 }, // 1 token every 10 seconds, capacity 10
  FILE_UPLOAD: { limit: 10, windowMs: 60 * 60 * 1000 },
};
