import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getLeaderboard, saveLeaderboardScore, clearLeaderboard } from "@/lib/db";
import { verifySessionToken } from "@/lib/auth/security";
import { findUserById } from "@/lib/auth/db";

export const dynamic = "force-dynamic";

// GET is public read-only
export async function GET() {
  try {
    const list = await getLeaderboard();
    const sorted = list.slice(0, 10);
    return NextResponse.json({ leaderboard: sorted });
  } catch (err) {
    console.error("Leaderboard GET error:", err);
    return NextResponse.json({ leaderboard: [] });
  }
}

// DELETE: Strict Admin Authorization Check (Prevents Unauthorized Clearing)
export async function DELETE() {
  try {
    const cookieStore = cookies();
    const sessionToken = cookieStore.get("session_token")?.value;
    const payload = sessionToken ? verifySessionToken(sessionToken) : null;

    if (!payload) {
      return NextResponse.json({ error: "Authentication required to clear leaderboard." }, { status: 401 });
    }

    const user = findUserById(payload.userId);
    if (!user || user.role !== "admin") {
      return NextResponse.json({ error: "Forbidden: Admin access required." }, { status: 403 });
    }

    await clearLeaderboard();
    return NextResponse.json({ success: true, leaderboard: [] });
  } catch (err) {
    console.error("Leaderboard DELETE error:", err);
    return NextResponse.json({ error: "Failed to clear leaderboard" }, { status: 500 });
  }
}

// POST: Enforce Session Ownership (IDOR Protection)
export async function POST(request: Request) {
  try {
    const cookieStore = cookies();
    const sessionToken = cookieStore.get("session_token")?.value;
    const payload = sessionToken ? verifySessionToken(sessionToken) : null;

    if (!payload) {
      return NextResponse.json({ error: "Authentication required to submit score." }, { status: 401 });
    }

    const user = findUserById(payload.userId);
    if (!user) {
      return NextResponse.json({ error: "Invalid user session." }, { status: 401 });
    }

    const body = await request.json();
    const { score } = body;

    if (typeof score !== "number" || score < 0) {
      return NextResponse.json({ error: "Invalid score data" }, { status: 400 });
    }

    // IDOR Protection: Always bind entry ID and name strictly to authenticated user
    const result = await saveLeaderboardScore({
      id: user.id,
      name: user.name,
      score,
    });

    return NextResponse.json({
      success: true,
      leaderboard: result.leaderboard,
      userRank: result.userRank,
      rank: result.userRank,
    });
  } catch (err) {
    console.error("Leaderboard POST error:", err);
    return NextResponse.json({ error: "Failed to submit score" }, { status: 500 });
  }
}
