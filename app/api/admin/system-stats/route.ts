import { NextResponse } from "next/server";
import { getAllUsers } from "@/lib/auth/db";

export async function GET() {
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
