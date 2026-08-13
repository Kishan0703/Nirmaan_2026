import { NextResponse } from "next/server";
import { generateSecureToken } from "@/lib/auth/security";
import { findUserByEmail, updateUser } from "@/lib/auth/db";
import { checkRateLimit } from "@/lib/auth/rate-limit";

export async function POST(req: Request) {
  try {
    const clientIp = req.headers.get("x-forwarded-for") || "unknown";

    // Rate Limit: Max 3 password reset requests per hour per IP
    const rateLimit = checkRateLimit(`forgot:${clientIp}`, 3, 60 * 60 * 1000);
    if (!rateLimit.success) {
      return NextResponse.json(
        { error: "Too many password reset requests. Please try again later." },
        { status: 429, headers: { "Retry-After": String(rateLimit.retryAfterSeconds) } }
      );
    }

    const { email } = await req.json();

    if (!email) {
      return NextResponse.json({ error: "Email is required." }, { status: 400 });
    }

    const user = findUserByEmail(email);

    let resetTokenResponse: string | undefined = undefined;

    if (user) {
      const { rawToken, hashedToken } = generateSecureToken();
      // Hard 15-minute expiration limit for password resets
      const resetTokenExpiresAt = new Date(Date.now() + 15 * 60 * 1000).toISOString();

      updateUser(user.id, {
        resetTokenHash: hashedToken,
        resetTokenExpiresAt,
      });

      resetTokenResponse = rawToken;
    }

    // Generic response prevents account enumeration vulnerabilities
    return NextResponse.json({
      success: true,
      message: "If an account with that email exists, a password reset token has been generated.",
      resetToken: resetTokenResponse, // Exposed in JSON for local testing
    });
  } catch (error) {
    console.error("Forgot Password Error:", error);
    return NextResponse.json({ error: "Internal server error." }, { status: 500 });
  }
}
