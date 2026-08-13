import { NextResponse } from "next/server";
import { verifyPassword, createSessionToken } from "@/lib/auth/security";
import { findUserByEmail } from "@/lib/auth/db";
import { checkRateLimit } from "@/lib/auth/rate-limit";

export async function POST(req: Request) {
  try {
    const clientIp = req.headers.get("x-forwarded-for") || "unknown";

    // Rate Limit: Max 5 failed login attempts per 15 mins
    const rateLimit = checkRateLimit(`login:${clientIp}`, 5, 15 * 60 * 1000);
    if (!rateLimit.success) {
      return NextResponse.json(
        { error: "Too many login attempts. Please try again in 15 minutes." },
        { status: 429, headers: { "Retry-After": String(rateLimit.retryAfterSeconds) } }
      );
    }

    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required." }, { status: 400 });
    }

    const user = findUserByEmail(email);
    if (!user) {
      // Generic response prevents account enumeration
      return NextResponse.json({ error: "Invalid email or password." }, { status: 401 });
    }

    // Verify Password Hash
    const isPasswordValid = await verifyPassword(password, user.passwordHash);
    if (!isPasswordValid) {
      return NextResponse.json({ error: "Invalid email or password." }, { status: 401 });
    }

    // Email verification check
    if (!user.emailVerified) {
      return NextResponse.json(
        { error: "Email address is not verified. Please verify your email first." },
        { status: 403 }
      );
    }

    // Create 15-minute expiring session token
    const token = createSessionToken({ userId: user.id, email: user.email }, 15 * 60);

    const response = NextResponse.json({
      success: true,
      message: "Logged in successfully.",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    });

    // Set Secure HTTP-Only Cookie
    response.cookies.set("session_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 15 * 60, // 15 Minutes session expiration
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("Login Error:", error);
    return NextResponse.json({ error: "Internal server error." }, { status: 500 });
  }
}
