import { hashPassword, verifyPassword, generateSecureToken, hashToken, createSessionToken, verifySessionToken } from "../lib/auth/security";
import { checkRateLimit } from "../lib/auth/rate-limit";

async function testAuthSystem() {
  console.log("=== 1. Password Hashing Test ===");
  const pass = "SuperSecretP@ssw0rd2026!";
  const hashed = await hashPassword(pass);
  console.log("Password Hash:", hashed);
  const matchSuccess = await verifyPassword(pass, hashed);
  const matchFailure = await verifyPassword("WrongPassword123", hashed);
  console.log("Password Verify Success:", matchSuccess === true);
  console.log("Password Verify Failure:", matchFailure === false);

  console.log("\n=== 2. Cryptographic Token Generation & Hashing ===");
  const { rawToken, hashedToken } = generateSecureToken();
  console.log("Raw Token Length:", rawToken.length);
  console.log("Hashed Token Match:", hashToken(rawToken) === hashedToken);

  console.log("\n=== 3. Session Token & Expiration Test ===");
  const sessionToken = createSessionToken({ userId: "usr_123", email: "test@nirmaan.org" }, 2); // 2 sec exp
  const validPayload = verifySessionToken(sessionToken);
  console.log("Valid Session Payload:", validPayload);
  
  // Sleep 3 seconds to test expiration
  await new Promise((res) => setTimeout(res, 3000));
  const expiredPayload = verifySessionToken(sessionToken);
  console.log("Expired Session Payload (Should be null):", expiredPayload);

  console.log("\n=== 4. Rate Limiting Test ===");
  const testIp = "192.168.1.100";
  for (let i = 1; i <= 6; i++) {
    const res = checkRateLimit(`login:${testIp}`, 5, 10000);
    console.log(`Attempt ${i}: Success=${res.success}, Remaining=${res.remaining}, RetryAfter=${res.retryAfterSeconds}s`);
  }

  console.log("\n=== ALL AUTH SECURITY TESTS COMPLETED CLEANLY ===");
}

testAuthSystem().catch(console.error);
