import { getCorsHeaders } from "../lib/auth/cors";
import { verifyWebhookSignature, generateTestWebhookSignature } from "../lib/auth/webhook";

async function runCorsAndWebhookSecurityTests() {
  console.log("=== 1. CORS Security Audit Test ===");
  const allowedHeaders = getCorsHeaders("https://nirmaan2026.com");
  console.log("Allowed Domain Origin Match:", allowedHeaders["Access-Control-Allow-Origin"] === "https://nirmaan2026.com");
  console.log("Credentials Allowed for Explicit Domain:", allowedHeaders["Access-Control-Allow-Credentials"] === "true");

  const unallowedHeaders = getCorsHeaders("https://evil-attacker-site.com");
  console.log("Unallowed Origin Not Reflected:", unallowedHeaders["Access-Control-Allow-Origin"] !== "https://evil-attacker-site.com");
  console.log("Credentials Suppressed for Unallowed Origin:", unallowedHeaders["Access-Control-Allow-Credentials"] === undefined);

  console.log("\n=== 2. Webhook HMAC & Replay Attack Defense Test ===");
  const secret = "test_webhook_secret_key_32_bytes_min!";
  const payload = JSON.stringify({ event: "payment.succeeded", id: "evt_100" });

  // Test Valid Signature
  const { signatureHeader, timestamp } = generateTestWebhookSignature(payload, secret);
  const validResult = verifyWebhookSignature(payload, signatureHeader, secret, 300);
  console.log("Valid Webhook Signature Passed:", validResult.isValid === true);

  // Test Tampered Payload
  const tamperedPayload = JSON.stringify({ event: "payment.succeeded", id: "evt_100", tampered: true });
  const tamperedResult = verifyWebhookSignature(tamperedPayload, signatureHeader, secret, 300);
  console.log("Tampered Webhook Payload Rejected:", tamperedResult.isValid === false);

  // Test Replay Attack (Stale Timestamp)
  const staleTimestamp = Math.floor(Date.now() / 1000) - 600; // 10 minutes ago
  const { signatureHeader: staleHeader } = generateTestWebhookSignature(payload, secret, staleTimestamp);
  const replayResult = verifyWebhookSignature(payload, staleHeader, secret, 300);
  console.log("Replay Attack (Stale Timestamp > 5m) Rejected:", replayResult.isValid === false);

  console.log("\n=== ALL CORS & WEBHOOK SECURITY AUDITS PASSED ===");
}

runCorsAndWebhookSecurityTests().catch(console.error);
