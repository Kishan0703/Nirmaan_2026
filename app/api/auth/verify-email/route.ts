import { NextResponse } from "next/server";
import { hashToken } from "@/lib/auth/security";
import { findUserByVerificationTokenHash, updateUser } from "@/lib/auth/db";

export async function POST(req: Request) {
  try {
    const { token } = await req.json();

    if (!token) {
      return NextResponse.json({ error: "Verification token is required." }, { status: 400 });
    }

    const hashedToken = hashToken(token);
    const user = findUserByVerificationTokenHash(hashedToken);

    if (!user) {
      return NextResponse.json({ error: "Invalid or expired verification token." }, { status: 400 });
    }

    // Check expiration
    if (user.verificationExpiresAt && new Date(user.verificationExpiresAt) < new Date()) {
      return NextResponse.json({ error: "Verification token has expired. Please request a new one." }, { status: 400 });
    }

    // Consume token and verify user
    updateUser(user.id, {
      emailVerified: true,
      verificationTokenHash: undefined,
      verificationExpiresAt: undefined,
    });

    return NextResponse.json({ success: true, message: "Email verified successfully! You can now log in." });
  } catch (error) {
    console.error("Verify Email Error:", error);
    return NextResponse.json({ error: "Internal server error." }, { status: 500 });
  }
}
