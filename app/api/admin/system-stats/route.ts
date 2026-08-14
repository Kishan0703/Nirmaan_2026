import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { findUserById, getAllUsers } from "@/lib/auth/db";
import { verifySessionToken } from "@/lib/auth/security";

export async function GET() {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get("session_token")?.value;
  const payload = sessionToken ? verifySessionToken(sessionToken) : null;

  if (!payload) {
    return NextResponse.json({ error: "Authentication required." }, { status: 401 });
  }

  const requester = findUserById(payload.userId);
  if (!requester || requester.role !== "admin") {
    return NextResponse.json({ error: "Forbidden: Admin access required." }, { status: 403 });
  }

  const users = getAllUsers();
  
  return NextResponse.json({
    success: true,
    stats: {
      totalUsers: users.length,
      verifiedUsers: users.filter((u) => u.emailVerified).length,
      adminCount: users.filter((u) => u.role === "admin").length,
      systemStatus: "Operational",
      timestamp: new Date().toISOString(),
    },
  });
}
