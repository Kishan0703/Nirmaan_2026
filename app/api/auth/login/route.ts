import { NextResponse } from "next/server";
import { verifyPassword, createSessionToken, createRefreshToken, hashToken } from "@/lib/auth/security";
import { findUserByEmail, saveRefreshTokenRecord } from "@/lib/auth/db";
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
      return NextResponse.json({ error: "Invalid email or password." }, { status: 401 });
    }

    const isPasswordValid = await verifyPassword(password, user.passwordHash);
    if (!isPasswordValid) {
      return NextResponse.json({ error: "Invalid email or password." }, { status: 401 });
    }

    if (!user.emailVerified) {
      return NextResponse.json(
        { error: "Email address is not verified. Please verify your email first." },
        { status: 403 }
      );
    }

    // 1. Create Access Token (15 mins)
    const accessToken = createSessionToken({ userId: user.id, email: user.email, role: user.role }, 15 * 60);

    // 2. Create Refresh Token (7 days) for Rotation
    const { refreshToken, tokenId, expiresAt } = createRefreshToken(user.id);
    const [, rawSecret] = refreshToken.split(".");

    saveRefreshTokenRecord({
      tokenId,
      userId: user.id,
      tokenHash: hashToken(rawSecret),
      expiresAt,
      revoked: false,
    });

    const response = NextResponse.json({
      success: true,
      message: "Logged in successfully.",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });

    // Set HttpOnly Cookies (Never stored in localStorage)
    response.cookies.set("session_token", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 15 * 60, // 15 mins
      path: "/",
    });

    response.cookies.set("refresh_token", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60, // 7 days
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("Login Error:", error);
    return NextResponse.json({ error: "Internal server error." }, { status: 500 });
  }
}
