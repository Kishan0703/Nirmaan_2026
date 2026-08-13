type RateLimitRecord = {
  count: number;
  resetTime: number;
};

const store = new Map<string, RateLimitRecord>();

/**
 * In-memory sliding window rate limiter
 * @param key Identification key (e.g. `login:192.168.1.1` or `forgot:user@example.com`)
 * @param limit Maximum allowed requests in window
 * @param windowMs Window duration in milliseconds (default 15 minutes)
 */
export function checkRateLimit(
  key: string,
  limit: number = 5,
  windowMs: number = 15 * 60 * 1000
): { success: boolean; remaining: number; retryAfterSeconds: number } {
  const now = Date.now();
  const record = store.get(key);

  if (!record || record.resetTime < now) {
    store.set(key, { count: 1, resetTime: now + windowMs });
    return { success: true, remaining: limit - 1, retryAfterSeconds: 0 };
  }

  if (record.count >= limit) {
    const retryAfterSeconds = Math.ceil((record.resetTime - now) / 1000);
    return { success: false, remaining: 0, retryAfterSeconds };
  }

  record.count += 1;
  return { success: true, remaining: limit - record.count, retryAfterSeconds: 0 };
}
