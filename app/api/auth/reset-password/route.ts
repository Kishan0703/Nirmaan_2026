import { NextResponse } from "next/server";
import { hashToken, hashPassword, isValidPassword } from "@/lib/auth/security";
import { findUserByResetTokenHash, updateUser, revokeAllUserRefreshTokens } from "@/lib/auth/db";
import { checkRateLimit } from "@/lib/auth/rate-limit";
import { logAuthEvent, logSecurityAlert, logStructuredEvent } from "@/lib/auth/logger";

export async function POST(req: Request) {
  try {
    const clientIp = req.headers.get("x-forwarded-for") || "unknown";

    // Rate Limit: Max 5 password reset attempts per 15 minutes per IP
    const rateLimit = checkRateLimit(`reset:${clientIp}`, 5, 15 * 60 * 1000);
    if (!rateLimit.success) {
      logSecurityAlert("RATE_LIMIT_EXCEEDED", clientIp, { route: "auth/reset-password" });
      return NextResponse.json(
        { error: "Too many password reset attempts. Please try again later." },
        { status: 429, headers: { "Retry-After": String(rateLimit.retryAfterSeconds) } }
      );
    }

    const { token, newPassword } = await req.json();

    if (
      typeof token !== "string" ||
      !/^[a-f0-9]{64}$/i.test(token) ||
      typeof newPassword !== "string" ||
      !newPassword
    ) {
      return NextResponse.json({ error: "Reset token and new password are required." }, { status: 400 });
    }

    if (!isValidPassword(newPassword)) {
      return NextResponse.json({ error: "New password must be 12 to 256 characters long." }, { status: 400 });
    }

    // 1. Hash incoming raw token (SHA-256) to lookup DB record
    const hashedToken = hashToken(token);
    const user = findUserByResetTokenHash(hashedToken);

    if (!user) {
      return NextResponse.json({ error: "Invalid or expired password reset token." }, { status: 400 });
    }

    // 2. Hard 15-Minute Expiration Enforcement
    const resetTokenExpiresAt = user.resetTokenExpiresAt ? Date.parse(user.resetTokenExpiresAt) : NaN;
    if (!Number.isFinite(resetTokenExpiresAt) || resetTokenExpiresAt <= Date.now()) {
      // Invalidate expired token
      updateUser(user.id, {
        resetTokenHash: undefined,
        resetTokenExpiresAt: undefined,
      });
      return NextResponse.json({ error: "Password reset token has expired. Please request a new one." }, { status: 400 });
    }

    // 3. Consume the token before awaiting password hashing. This prevents two
    // concurrent requests from using the same valid token.
    updateUser(user.id, {
      resetTokenHash: undefined,
      resetTokenExpiresAt: undefined,
    });

    // 4. Replace the password immediately after successful derivation.
    const newPasswordHash = await hashPassword(newPassword);
    updateUser(user.id, { passwordHash: newPasswordHash });

    // 5. Security Enhancement: Revoke ALL existing active session/refresh tokens for user
    revokeAllUserRefreshTokens(user.id);
    logAuthEvent("PASSWORD_RESET", user.id, clientIp);

    return NextResponse.json({
      success: true,
      message: "Password updated successfully! All previous sessions have been invalidated. You can now log in with your new password.",
    });
  } catch (error) {
    logStructuredEvent("ERROR", "API_ERROR", { route: "auth/reset-password", errorName: error instanceof Error ? error.name : "UnknownError" });
    return NextResponse.json({ error: "Internal server error." }, { status: 500 });
  }
}
