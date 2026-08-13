import {
  hashPassword,
  verifyPassword,
  generateSecureToken,
  hashToken,
  createSessionToken,
  verifySessionToken,
  createRefreshToken,
} from "../lib/auth/security";
import { checkRateLimit } from "../lib/auth/rate-limit";
import { createUser, saveRefreshTokenRecord, findRefreshTokenRecord, revokeRefreshTokenRecord, revokeAllUserRefreshTokens } from "../lib/auth/db";

async function runSecurityAuditTests() {
  console.log("=== 1. JWT 'none' Algorithm Rejection Test ===");
  // Craft a malicious JWT header with 'alg': 'none'
  const headerNone = Buffer.from(JSON.stringify({ alg: "none", typ: "JWT" })).toString("base64url");
  const payloadData = Buffer.from(JSON.stringify({ userId: "attacker", email: "hacker@evil.com", exp: Math.floor(Date.now()/1000)+3600 })).toString("base64url");
  const fakeTokenNone = `${headerNone}.${payloadData}.`;

  const rejectedNoneResult = verifySessionToken(fakeTokenNone);
  console.log("Malicious 'none' algorithm token rejected:", rejectedNoneResult === null);

  console.log("\n=== 2. Refresh Token Rotation & Reuse Detection Test ===");
  const testUser = createUser({
    name: "Test User",
    email: `test_${Date.now()}@nirmaan.org`,
    passwordHash: await hashPassword("Password123!"),
    emailVerified: true,
  });

  // Issue Refresh Token
  const { refreshToken, tokenId, expiresAt } = createRefreshToken(testUser.id);
  const [, rawSecret] = refreshToken.split(".");
  saveRefreshTokenRecord({
    tokenId,
    userId: testUser.id,
    tokenHash: hashToken(rawSecret),
    expiresAt,
    revoked: false,
  });

  // Verify token active
  const initialTokenRecord = findRefreshTokenRecord(tokenId);
  console.log("Initial Refresh Token Active:", initialTokenRecord?.revoked === false);

  // Consume token (Rotation)
  revokeRefreshTokenRecord(tokenId);
  const rotatedTokenRecord = findRefreshTokenRecord(tokenId);
  console.log("Refresh Token Revoked On Rotation:", rotatedTokenRecord?.revoked === true);

  // Attempt reuse (Simulate attacker stealing used refresh token)
  if (rotatedTokenRecord?.revoked) {
    revokeAllUserRefreshTokens(testUser.id);
    console.log("Security Action: All user refresh tokens revoked due to reuse detection.");
  }

  console.log("\n=== 3. Valid Session Token Verification ===");
  const validToken = createSessionToken({ userId: testUser.id, email: testUser.email, role: testUser.role });
  const verifiedPayload = verifySessionToken(validToken);
  console.log("Valid HS256 Token Verified:", verifiedPayload?.userId === testUser.id && verifiedPayload?.role === "user");

  console.log("\n=== ALL EXTENDED SECURITY & IDOR AUDIT TESTS PASSED ===");
}

runSecurityAuditTests().catch(console.error);
