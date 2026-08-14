import "server-only";
import crypto from "crypto";

const PASSWORD_SCRYPT_OPTIONS = { N: 32_768, r: 8, p: 1, maxmem: 64 * 1024 * 1024 };
const LEGACY_SCRYPT_OPTIONS = { N: 16_384, r: 8, p: 1, maxmem: 32 * 1024 * 1024 };
const MIN_PASSWORD_LENGTH = 12;

function derivePasswordKey(password: string, salt: string, options = PASSWORD_SCRYPT_OPTIONS): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    crypto.scrypt(password, salt, 64, options, (error, derivedKey) => {
      if (error) reject(error);
      else resolve(derivedKey as Buffer);
    });
  });
}

function getAuthSecret(): string {
  return process.env.AUTH_SECRET || "nirmaan_2026_super_secret_auth_key_development_only_32bytes";
}

export function verifyAdminPassword(password: string): boolean {
  const expectedPassword = process.env.ADMIN_PASSWORD || "nirmaan2026admin";
  if (typeof password !== "string" || !password) return false;

  const passwordBuffer = Buffer.from(password);
  const expectedBuffer = Buffer.from(expectedPassword);

  if (passwordBuffer.length !== expectedBuffer.length) return false;
  return crypto.timingSafeEqual(passwordBuffer, expectedBuffer);
}

export function verifyAdminUsername(username: string): boolean {
  const expectedUsername = process.env.ADMIN_USERNAME || "admin123";
  if (typeof username !== "string" || !username) return false;

  const usernameBuffer = Buffer.from(username.trim());
  const expectedBuffer = Buffer.from(expectedUsername);

  if (usernameBuffer.length !== expectedBuffer.length) return false;
  return crypto.timingSafeEqual(usernameBuffer, expectedBuffer);
}

export function verifyAdminCredentials(username: string, password: string): boolean {
  return verifyAdminUsername(username) && verifyAdminPassword(password);
}

/**
 * Hash password using Node.js crypto.scrypt
 */
export async function hashPassword(password: string): Promise<string> {
  const salt = crypto.randomBytes(16).toString("hex");
  const derivedKey = await derivePasswordKey(password, salt);
  return `scrypt$${PASSWORD_SCRYPT_OPTIONS.N}$${PASSWORD_SCRYPT_OPTIONS.r}$${PASSWORD_SCRYPT_OPTIONS.p}$${salt}$${derivedKey.toString("hex")}`;
}

/**
 * Verify password against stored salt:hash
 */
export async function verifyPassword(password: string, storedHash: string): Promise<boolean> {
  try {
    const modernParts = storedHash.split("$");
    const isModernHash = modernParts.length === 6 && modernParts[0] === "scrypt";
    const [salt, keyHex] = isModernHash ? [modernParts[4], modernParts[5]] : storedHash.split(":");
    if (!salt || !keyHex) return false;
    
    const key = Buffer.from(keyHex, "hex");
    if (key.length !== 64) return false;
    const options = isModernHash ? PASSWORD_SCRYPT_OPTIONS : LEGACY_SCRYPT_OPTIONS;
    if (isModernHash && (modernParts[1] !== String(options.N) || modernParts[2] !== String(options.r) || modernParts[3] !== String(options.p))) {
      return false;
    }
    const derivedKey = await derivePasswordKey(password, salt, options);
    return crypto.timingSafeEqual(key, derivedKey);
  } catch (error) {
    return false;
  }
}

export function isValidPassword(password: unknown): password is string {
  return typeof password === "string" && password.length >= MIN_PASSWORD_LENGTH && password.length <= 256;
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

export function tokenHashesEqual(left: string, right: string): boolean {
  const leftBuffer = Buffer.from(left, "hex");
  const rightBuffer = Buffer.from(right, "hex");
  return leftBuffer.length === rightBuffer.length && crypto.timingSafeEqual(leftBuffer, rightBuffer);
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
  const iat = Math.floor(Date.now() / 1000);
  const bodyPayload = Buffer.from(JSON.stringify({ ...payload, iat, exp, jti })).toString("base64url");
  
  const signatureInput = `${header}.${bodyPayload}`;
  const signature = crypto.createHmac("sha256", getAuthSecret()).update(signatureInput).digest("base64url");
  
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
    if (!header || header.alg !== "HS256" || header.typ !== "JWT") {
      console.warn("Security Alert: Rejected invalid JWT algorithm attempt:", header?.alg);
      return null; // Explicitly reject 'none' or mismatched algorithms
    }

    // 2. Signature Validation
    const expectedSignature = crypto.createHmac("sha256", getAuthSecret()).update(`${headerB64}.${bodyB64}`).digest("base64url");
    const sigBuf = Buffer.from(signature);
    const expSigBuf = Buffer.from(expectedSignature);

    if (sigBuf.length !== expSigBuf.length || !crypto.timingSafeEqual(sigBuf, expSigBuf)) {
      return null; // Signature mismatch
    }

    // 3. Expiration Enforced
    const payload = JSON.parse(Buffer.from(bodyB64, "base64url").toString("utf-8"));
    const nowSeconds = Math.floor(Date.now() / 1000);
    if (
      typeof payload.userId !== "string" ||
      typeof payload.email !== "string" ||
      (payload.role !== undefined && payload.role !== "admin" && payload.role !== "user") ||
      !Number.isInteger(payload.iat) ||
      !Number.isInteger(payload.exp) ||
      typeof payload.jti !== "string" ||
      !/^[a-f0-9]{32}$/.test(payload.jti) ||
      payload.iat > nowSeconds + 60 ||
      payload.exp <= nowSeconds ||
      payload.exp - payload.iat > 24 * 60 * 60
    ) {
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
