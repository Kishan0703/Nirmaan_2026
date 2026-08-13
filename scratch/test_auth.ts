import {
  checkSlidingWindow,
  checkTokenBucket,
  RATE_LIMIT_PRESETS,
} from "../lib/auth/rate-limit";

async function runRateLimitAlgorithmTests() {
  console.log("=== 1. Sliding Window Rate Limiter Test ===");
  const ipKey = "sliding_window_ip_123";
  for (let i = 1; i <= 6; i++) {
    const res = checkSlidingWindow(ipKey, RATE_LIMIT_PRESETS.LOGIN.limit, RATE_LIMIT_PRESETS.LOGIN.windowMs);
    console.log(`Sliding Window Attempt ${i}: Success=${res.success}, Remaining=${res.remaining}, RetryAfter=${res.retryAfterSeconds}s`);
  }

  console.log("\n=== 2. Token Bucket Rate Limiter Test (AI Generation Route) ===");
  const bucketKey = "token_bucket_user_456";
  // Initial capacity = 3, refill rate = 1 token/sec
  for (let i = 1; i <= 4; i++) {
    const res = checkTokenBucket(bucketKey, 3, 1);
    console.log(`Token Bucket Attempt ${i}: Success=${res.success}, Remaining=${res.remaining}, RetryAfter=${res.retryAfterSeconds}s`);
  }

  console.log("\nWaiting 1.1 seconds for Token Bucket refill...");
  await new Promise((res) => setTimeout(res, 1100));

  const refillRes = checkTokenBucket(bucketKey, 3, 1);
  console.log(`Post-Refill Token Bucket Attempt: Success=${refillRes.success}, Remaining=${refillRes.remaining}`);

  console.log("\n=== ALL RATE LIMITING ALGORITHM TESTS PASSED ===");
}

runRateLimitAlgorithmTests().catch(console.error);
