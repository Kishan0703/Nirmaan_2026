import crypto from "crypto";
import { promisify } from "util";

const scryptAsync = promisify(crypto.scrypt);

// Use AUTH_SECRET from env, fallback only in development warning
const AUTH_SECRET = process.env.AUTH_SECRET || "nirmaan_2026_fallback_dev_secret_key_change_in_prod";

/**
 * Hash password using Node.js crypto.scrypt (OWASP recommended KDF)
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
 * Generate cryptographically secure opaque token (for email verification & password reset)
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
 * Lightweight HMAC-SHA256 session token generator (Self-contained JWT alternative)
 */
export function createSessionToken(payload: { userId: string; email: string }, expiresInSeconds: number = 15 * 60): string {
  const header = Buffer.from(JSON.stringify({ alg: "HS256", typ: "JWT" })).toString("base64url");
  const exp = Math.floor(Date.now() / 1000) + expiresInSeconds;
  const bodyPayload = Buffer.from(JSON.stringify({ ...payload, exp })).toString("base64url");
  
  const signatureInput = `${header}.${bodyPayload}`;
  const signature = crypto.createHmac("sha256", AUTH_SECRET).update(signatureInput).digest("base64url");
  
  return `${signatureInput}.${signature}`;
}

/**
 * Verify HMAC-SHA256 session token
 */
export function verifySessionToken(token: string): { userId: string; email: string; exp: number } | null {
  try {
    const parts = token.split(".");
    if (parts.length !== 3) return null;

    const [header, bodyPayload, signature] = parts;
    const expectedSignature = crypto.createHmac("sha256", AUTH_SECRET).update(`${header}.${bodyPayload}`).digest("base64url");

    if (!crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expectedSignature))) {
      return null;
    }

    const payload = JSON.parse(Buffer.from(bodyPayload, "base64url").toString("utf-8"));
    
    // Expiration check
    if (payload.exp && payload.exp < Math.floor(Date.now() / 1000)) {
      return null; // Session expired
    }

    return payload;
  } catch (error) {
    return null;
  }
}
