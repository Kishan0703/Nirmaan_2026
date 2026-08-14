import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifySessionToken } from "@/lib/auth/security";

export async function GET(request: NextRequest) {
  const sessionToken = request.cookies.get("session_token")?.value;

  if (!sessionToken) {
    return NextResponse.json({ authenticated: false, error: "No active session." }, { status: 401 });
  }

  const payload = verifySessionToken(sessionToken);

  if (!payload || payload.role !== "admin") {
    return NextResponse.json({ authenticated: false, error: "Invalid or non-admin session." }, { status: 403 });
  }

  return NextResponse.json({
    authenticated: true,
    user: {
      userId: payload.userId,
      email: payload.email,
      role: payload.role,
    },
  });
}
