import { NextResponse } from "next/server";
import { hashToken } from "@/lib/auth/security";
import { findUserByVerificationTokenHash, updateUser } from "@/lib/auth/db";
import { logAuthEvent, logStructuredEvent } from "@/lib/auth/logger";

export async function POST(req: Request) {
  try {
    const { token } = await req.json();

    if (typeof token !== "string" || token.length !== 64) {
      return NextResponse.json({ error: "Verification token is required." }, { status: 400 });
    }

    const hashedToken = hashToken(token);
    const user = findUserByVerificationTokenHash(hashedToken);

    if (!user) {
      return NextResponse.json({ error: "Invalid or expired verification token." }, { status: 400 });
    }

    // Check expiration
    const verificationExpiresAt = user.verificationExpiresAt ? Date.parse(user.verificationExpiresAt) : NaN;
    if (!Number.isFinite(verificationExpiresAt) || verificationExpiresAt <= Date.now()) {
      updateUser(user.id, {
        verificationTokenHash: undefined,
        verificationExpiresAt: undefined,
      });
      return NextResponse.json({ error: "Verification token has expired. Please request a new one." }, { status: 400 });
    }

    // Consume token and verify user
    updateUser(user.id, {
      emailVerified: true,
      verificationTokenHash: undefined,
      verificationExpiresAt: undefined,
    });

    logAuthEvent("EMAIL_VERIFIED", user.id, req.headers.get("x-forwarded-for")?.split(",")[0].trim());

    return NextResponse.json({ success: true, message: "Email verified successfully! You can now log in." });
  } catch (error) {
    logStructuredEvent("ERROR", "API_ERROR", { route: "auth/verify-email", errorName: error instanceof Error ? error.name : "UnknownError" });
    return NextResponse.json({ error: "Internal server error." }, { status: 500 });
  }
}
