import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyAdminCredentials, createSessionToken } from "@/lib/auth/security";
import { logSecurityAlert, logStructuredEvent } from "@/lib/auth/logger";

export async function POST(request: NextRequest) {
  const clientIp = request.headers.get("x-forwarded-for")?.split(",")[0].trim() || "unknown_ip";

  try {
    const body = await request.json();
    const { username, password } = body;

    if (!username || typeof username !== "string" || !password || typeof password !== "string") {
      return NextResponse.json({ error: "Username and password are required." }, { status: 400 });
    }

    const isValid = verifyAdminCredentials(username, password);

    if (!isValid) {
      return NextResponse.json({ error: "Invalid admin username or password." }, { status: 401 });
    }

    // Generate Admin JWT Token
    const sessionToken = createSessionToken(
      {
        userId: "admin_master",
        email: "admin@nirmaan.tech",
        role: "admin",
      },
      8 * 60 * 60 // 8 hours session
    );

    logStructuredEvent("INFO", "AUTH_ADMIN_LOGIN_SUCCESS", { userId: "admin_master" }, clientIp);

    const response = NextResponse.json({
      success: true,
      message: "Admin authentication successful.",
    });

    response.cookies.set("session_token", sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 8 * 60 * 60,
    });

    return response;
  } catch (error) {
    console.error("Admin login error:", error);
    return NextResponse.json({ error: "Internal server error during authentication." }, { status: 500 });
  }
}
