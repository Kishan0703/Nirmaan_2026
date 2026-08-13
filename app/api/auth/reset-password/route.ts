import { NextResponse } from "next/server";
import { hashToken, hashPassword } from "@/lib/auth/security";
import { findUserByResetTokenHash, updateUser, revokeAllUserRefreshTokens } from "@/lib/auth/db";
import { checkRateLimit } from "@/lib/auth/rate-limit";

export async function POST(req: Request) {
  try {
    const clientIp = req.headers.get("x-forwarded-for") || "unknown";

    // Rate Limit: Max 5 password reset attempts per 15 minutes per IP
    const rateLimit = checkRateLimit(`reset:${clientIp}`, 5, 15 * 60 * 1000);
    if (!rateLimit.success) {
      return NextResponse.json(
        { error: "Too many password reset attempts. Please try again later." },
        { status: 429, headers: { "Retry-After": String(rateLimit.retryAfterSeconds) } }
      );
    }

    const { token, newPassword } = await req.json();

    if (!token || !newPassword) {
      return NextResponse.json({ error: "Reset token and new password are required." }, { status: 400 });
    }

    if (newPassword.length < 8) {
      return NextResponse.json({ error: "New password must be at least 8 characters long." }, { status: 400 });
    }

    // 1. Hash incoming raw token (SHA-256) to lookup DB record
    const hashedToken = hashToken(token);
    const user = findUserByResetTokenHash(hashedToken);

    if (!user) {
      return NextResponse.json({ error: "Invalid or expired password reset token." }, { status: 400 });
    }

    // 2. Hard 15-Minute Expiration Enforcement
    if (user.resetTokenExpiresAt && new Date(user.resetTokenExpiresAt) < new Date()) {
      // Invalidate expired token
      updateUser(user.id, {
        resetTokenHash: undefined,
        resetTokenExpiresAt: undefined,
      });
      return NextResponse.json({ error: "Password reset token has expired. Please request a new one." }, { status: 400 });
    }

    // 3. Immediately invalidate old password by saving new scrypt password hash
    const newPasswordHash = await hashPassword(newPassword);

    // 4. Consume Token (Single-Use enforcement) and update password hash
    updateUser(user.id, {
      passwordHash: newPasswordHash,
      resetTokenHash: undefined,
      resetTokenExpiresAt: undefined,
    });

    // 5. Security Enhancement: Revoke ALL existing active session/refresh tokens for user
    revokeAllUserRefreshTokens(user.id);

    return NextResponse.json({
      success: true,
      message: "Password updated successfully! All previous sessions have been invalidated. You can now log in with your new password.",
    });
  } catch (error) {
    console.error("Reset Password Error:", error);
    return NextResponse.json({ error: "Internal server error." }, { status: 500 });
  }
}
