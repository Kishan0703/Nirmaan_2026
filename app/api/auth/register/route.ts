import { NextResponse } from "next/server";
import { hashPassword, generateSecureToken } from "@/lib/auth/security";
import { findUserByEmail, createUser } from "@/lib/auth/db";
import { checkRateLimit } from "@/lib/auth/rate-limit";

export async function POST(req: Request) {
  try {
    const clientIp = req.headers.get("x-forwarded-for") || "unknown";
    
    // Rate limit: max 3 registrations per hour per IP
    const rateLimit = checkRateLimit(`register:${clientIp}`, 3, 60 * 60 * 1000);
    if (!rateLimit.success) {
      return NextResponse.json(
        { error: "Too many registration attempts. Please try again later." },
        { status: 429, headers: { "Retry-After": String(rateLimit.retryAfterSeconds) } }
      );
    }

    const { name, email, password } = await req.json();

    if (!name || !email || !password) {
      return NextResponse.json({ error: "Name, email, and password are required." }, { status: 400 });
    }

    if (password.length < 8) {
      return NextResponse.json({ error: "Password must be at least 8 characters long." }, { status: 400 });
    }

    // Check if user already exists
    const existing = findUserByEmail(email);
    if (existing) {
      return NextResponse.json({ error: "An account with this email already exists." }, { status: 409 });
    }

    // Securely hash password
    const passwordHash = await hashPassword(password);

    // Generate 24-hour expiring email verification token
    const { rawToken, hashedToken } = generateSecureToken();
    const verificationExpiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString();

    const newUser = createUser({
      name: name.trim(),
      email: email.toLowerCase().trim(),
      passwordHash,
      emailVerified: false,
      verificationTokenHash: hashedToken,
      verificationExpiresAt,
    });

    return NextResponse.json({
      success: true,
      message: "Account created successfully! Please verify your email.",
      // Returning raw token in response body for demo/testing since SMTP server is external
      verificationToken: rawToken,
    });
  } catch (error) {
    console.error("Register Error:", error);
    return NextResponse.json({ error: "Internal server error." }, { status: 500 });
  }
}
