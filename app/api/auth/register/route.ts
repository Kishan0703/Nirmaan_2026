import { NextResponse } from "next/server";
import { hashPassword, generateSecureToken, isValidPassword } from "@/lib/auth/security";
import { findUserByEmail, createUser } from "@/lib/auth/db";
import { checkRateLimit } from "@/lib/auth/rate-limit";
import { logAuthEvent, logSecurityAlert, logStructuredEvent } from "@/lib/auth/logger";

export async function POST(req: Request) {
  try {
    const clientIp = req.headers.get("x-forwarded-for") || "unknown";
    
    // Rate limit: max 3 registrations per hour per IP
    const rateLimit = checkRateLimit(`register:${clientIp}`, 3, 60 * 60 * 1000);
    if (!rateLimit.success) {
      logSecurityAlert("RATE_LIMIT_EXCEEDED", clientIp, { route: "auth/register" });
      return NextResponse.json(
        { error: "Too many registration attempts. Please try again later." },
        { status: 429, headers: { "Retry-After": String(rateLimit.retryAfterSeconds) } }
      );
    }

    const { name, email, password } = await req.json();

    if (typeof name !== "string" || typeof email !== "string" || !name.trim() || !email.trim() || typeof password !== "string") {
      return NextResponse.json({ error: "Name, email, and password are required." }, { status: 400 });
    }

    if (!isValidPassword(password)) {
      return NextResponse.json({ error: "Password must be 12 to 256 characters long." }, { status: 400 });
    }

    const normalizedEmail = email.toLowerCase().trim();

    // Check if user already exists
    const existing = findUserByEmail(normalizedEmail);
    if (existing) {
      return NextResponse.json({ error: "An account with this email already exists." }, { status: 409 });
    }

    // Securely hash password
    const passwordHash = await hashPassword(password);

    // Generate 24-hour expiring email verification token
    const { hashedToken } = generateSecureToken();
    const verificationExpiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString();

    const newUser = createUser({
      name: name.trim(),
      email: normalizedEmail,
      passwordHash,
      emailVerified: false,
      verificationTokenHash: hashedToken,
      verificationExpiresAt,
    });

    logAuthEvent("REGISTER", newUser.id, clientIp);

    return NextResponse.json({
      success: true,
      message: "Account created successfully. Complete verification through the configured email delivery service.",
    });
  } catch (error) {
    logStructuredEvent("ERROR", "API_ERROR", { route: "auth/register", errorName: error instanceof Error ? error.name : "UnknownError" });
    return NextResponse.json({ error: "Internal server error." }, { status: 500 });
  }
}
