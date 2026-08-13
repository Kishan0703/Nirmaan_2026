import { NextResponse } from "next/server";
import { hashToken, hashPassword } from "@/lib/auth/security";
import { findUserByResetTokenHash, updateUser } from "@/lib/auth/db";

export async function POST(req: Request) {
  try {
    const { token, newPassword } = await req.json();

    if (!token || !newPassword) {
      return NextResponse.json({ error: "Reset token and new password are required." }, { status: 400 });
    }

    if (newPassword.length < 8) {
      return NextResponse.json({ error: "New password must be at least 8 characters long." }, { status: 400 });
    }

    const hashedToken = hashToken(token);
    const user = findUserByResetTokenHash(hashedToken);

    if (!user) {
      return NextResponse.json({ error: "Invalid or expired password reset token." }, { status: 400 });
    }

    // Strictly enforce 15-minute token expiration
    if (user.resetTokenExpiresAt && new Date(user.resetTokenExpiresAt) < new Date()) {
      return NextResponse.json({ error: "Password reset token has expired. Please request a new one." }, { status: 400 });
    }

    // Hash new password securely
    const newPasswordHash = await hashPassword(newPassword);

    // Update password and invalidate single-use reset token
    updateUser(user.id, {
      passwordHash: newPasswordHash,
      resetTokenHash: undefined,
      resetTokenExpiresAt: undefined,
    });

    return NextResponse.json({ success: true, message: "Password updated successfully. You can now log in with your new password." });
  } catch (error) {
    console.error("Reset Password Error:", error);
    return NextResponse.json({ error: "Internal server error." }, { status: 500 });
  }
}
