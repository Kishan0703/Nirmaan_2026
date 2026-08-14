import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { revokeRefreshTokenRecord } from "@/lib/auth/db";

export async function POST() {
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get("refresh_token")?.value;
  const [tokenId] = refreshToken?.split(".") || [];
  if (tokenId) {
    revokeRefreshTokenRecord(tokenId);
  }

  const response = NextResponse.json({ success: true, message: "Logged out successfully." });

  // Invalidate HTTP-Only session cookie
  response.cookies.set("session_token", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    expires: new Date(0),
    path: "/",
  });

  response.cookies.set("refresh_token", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    expires: new Date(0),
    path: "/",
  });

  return response;
}
