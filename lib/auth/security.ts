import crypto from "crypto";
import { promisify } from "util";

const scryptAsync = promisify(crypto.scrypt);

const AUTH_SECRET = process.env.AUTH_SECRET || "nirmaan_2026_super_strong_default_secret_key_32_bytes_min!";

if (process.env.NODE_ENV === "production" && (!process.env.AUTH_SECRET || process.env.AUTH_SECRET.length < 32)) {
  throw new Error("CRITICAL SECURITY ERROR: AUTH_SECRET must be set and at least 32 characters long in production!");
}

/**
 * Hash password using Node.js crypto.scrypt
 */
export async function hashPassword(password: string): Promise<string> {
  const salt = crypto.randomBytes(16).toString("hex");
  const derivedKey = (await scryptAsync(password, salt, 64)) as Buffer;
  return `${salt}:${derivedKey.toString("hex")}`;
}

/**
 * Verify password against stored salt:hash
 */
export async function verifyPassword(password: string, storedHash: string): Promise<boolean> {
  try {
    const [salt, keyHex] = storedHash.split(":");
    if (!salt || !keyHex) return false;
    
    const key = Buffer.from(keyHex, "hex");
    const derivedKey = (await scryptAsync(password, salt, 64)) as Buffer;
    return crypto.timingSafeEqual(key, derivedKey);
  } catch (error) {
    return false;
  }
}

/**
 * Generate cryptographically secure token
 */
export function generateSecureToken(): { rawToken: string; hashedToken: string } {
  const rawToken = crypto.randomBytes(32).toString("hex");
  const hashedToken = crypto.createHash("sha256").update(rawToken).digest("hex");
  return { rawToken, hashedToken };
}

/**
 * Hash token for lookup comparison
 */
export function hashToken(token: string): string {
  return crypto.createHash("sha256").update(token).digest("hex");
}

/**
 * Sign JWT token with strict HS256 algorithm
 */
export function createSessionToken(
  payload: { userId: string; email: string; role?: string },
  expiresInSeconds: number = 15 * 60
): string {
  const header = Buffer.from(JSON.stringify({ alg: "HS256", typ: "JWT" })).toString("base64url");
  const exp = Math.floor(Date.now() / 1000) + expiresInSeconds;
  const jti = crypto.randomBytes(16).toString("hex");
  const bodyPayload = Buffer.from(JSON.stringify({ ...payload, exp, jti })).toString("base64url");
  
  const signatureInput = `${header}.${bodyPayload}`;
  const signature = crypto.createHmac("sha256", AUTH_SECRET).update(signatureInput).digest("base64url");
  
  return `${signatureInput}.${signature}`;
}

/**
 * Verify JWT session token with strict algorithm verification ('none' algorithm explicitly rejected)
 */
export function verifySessionToken(token: string): { userId: string; email: string; role?: string; exp: number; jti: string } | null {
  try {
    if (!token || typeof token !== "string") return null;

    const parts = token.split(".");
    if (parts.length !== 3) return null;

    const [headerB64, bodyB64, signature] = parts;

    // 1. Explicit Algorithm Check: Reject 'none' or any algorithm other than HS256
    const header = JSON.parse(Buffer.from(headerB64, "base64url").toString("utf-8"));
    if (!header || typeof header.alg !== "string" || header.alg.toUpperCase() !== "HS256") {
      console.warn("Security Alert: Rejected invalid JWT algorithm attempt:", header?.alg);
      return null; // Explicitly reject 'none' or mismatched algorithms
    }

    // 2. Signature Validation
    const expectedSignature = crypto.createHmac("sha256", AUTH_SECRET).update(`${headerB64}.${bodyB64}`).digest("base64url");
    const sigBuf = Buffer.from(signature);
    const expSigBuf = Buffer.from(expectedSignature);

    if (sigBuf.length !== expSigBuf.length || !crypto.timingSafeEqual(sigBuf, expSigBuf)) {
      return null; // Signature mismatch
    }

    // 3. Expiration Enforced
    const payload = JSON.parse(Buffer.from(bodyB64, "base64url").toString("utf-8"));
    const nowSeconds = Math.floor(Date.now() / 1000);
    if (!payload.exp || typeof payload.exp !== "number" || payload.exp < nowSeconds) {
      return null; // Expired token
    }

    return payload;
  } catch (error) {
    return null;
  }
}

/**
 * Create Refresh Token for Rotation Flow (7 days expiry)
 */
export function createRefreshToken(userId: string): { refreshToken: string; tokenId: string; expiresAt: string } {
  const tokenId = crypto.randomBytes(16).toString("hex");
  const rawToken = crypto.randomBytes(32).toString("hex");
  const refreshToken = `${tokenId}.${rawToken}`;
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString();

  return { refreshToken, tokenId, expiresAt };
}
