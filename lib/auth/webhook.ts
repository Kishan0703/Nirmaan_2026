import crypto from "crypto";

export type WebhookVerificationResult = {
  isValid: boolean;
  reason?: string;
  timestamp?: number;
};

/**
 * Verify incoming webhook HMAC signature with timestamp replay attack prevention
 * @param rawBody Raw unparsed string body of the incoming webhook request
 * @param signatureHeader Header value (e.g. `t=1700000000,v1=sha256_hash_here`)
 * @param secret Secret shared with provider (e.g., process.env.WEBHOOK_SECRET)
 * @param toleranceSeconds Maximum allowed age of webhook timestamp (default 300 seconds / 5 mins)
 */
export function verifyWebhookSignature(
  rawBody: string,
  signatureHeader: string | null,
  secret: string,
  toleranceSeconds: number = 300
): WebhookVerificationResult {
  if (!signatureHeader) {
    return { isValid: false, reason: "Missing signature header." };
  }

  if (!secret || secret.trim().length === 0) {
    return { isValid: false, reason: "Webhook secret is not configured." };
  }

  // 1. Parse signature header components (t=timestamp, v1=signature)
  const parts = signatureHeader.split(",");
  let timestampStr: string | null = null;
  let signatureHex: string | null = null;

  for (const part of parts) {
    const [key, value] = part.trim().split("=");
    if (key === "t") timestampStr = value;
    if (key === "v1" || key === "sig") signatureHex = value;
  }

  if (!timestampStr || !signatureHex) {
    return { isValid: false, reason: "Malformed webhook signature header format." };
  }

  const timestamp = parseInt(timestampStr, 10);
  if (isNaN(timestamp)) {
    return { isValid: false, reason: "Invalid timestamp format in webhook header." };
  }

  // 2. Replay Attack Defense: Check timestamp tolerance window
  const nowSeconds = Math.floor(Date.now() / 1000);
  if (Math.abs(nowSeconds - timestamp) > toleranceSeconds) {
    return { isValid: false, reason: `Replay attack rejected: Webhook timestamp expired (${nowSeconds - timestamp}s delta).` };
  }

  // 3. Re-compute HMAC-SHA256 over `${timestamp}.${rawBody}`
  const signedPayload = `${timestamp}.${rawBody}`;
  const expectedHmac = crypto
    .createHmac("sha256", secret)
    .update(signedPayload, "utf-8")
    .digest("hex");

  // 4. Timing-safe comparison to prevent side-channel timing attacks
  const sigBuf = Buffer.from(signatureHex, "hex");
  const expBuf = Buffer.from(expectedHmac, "hex");

  if (sigBuf.length !== expBuf.length || !crypto.timingSafeEqual(sigBuf, expBuf)) {
    return { isValid: false, reason: "HMAC signature mismatch verification failed." };
  }

  return { isValid: true, timestamp };
}

/**
 * Generate test webhook signature (used for testing and provider emulation)
 */
export function generateTestWebhookSignature(rawBody: string, secret: string, customTimestamp?: number): { signatureHeader: string; timestamp: number } {
  const timestamp = customTimestamp || Math.floor(Date.now() / 1000);
  const signedPayload = `${timestamp}.${rawBody}`;
  const sig = crypto.createHmac("sha256", secret).update(signedPayload, "utf-8").digest("hex");
  return {
    signatureHeader: `t=${timestamp},v1=${sig}`,
    timestamp,
  };
}
