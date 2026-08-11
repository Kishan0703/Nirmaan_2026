import { NextResponse } from "next/server";
import { getLeaderboard, saveLeaderboardScore } from "@/lib/db";

export async function GET() {
  try {
    const sorted = getLeaderboard().slice(0, 10);
    return NextResponse.json({ leaderboard: sorted });
  } catch {
    return NextResponse.json({ leaderboard: [] });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, score, id, userId } = body;

    if (!name || typeof score !== "number") {
      return NextResponse.json({ error: "Invalid data" }, { status: 400 });
    }

    const entryId = id || userId || `user_${Date.now()}`;
    const result = saveLeaderboardScore({
      id: entryId,
      name,
      score,
    });

    return NextResponse.json({
      success: true,
      leaderboard: result.leaderboard,
      userRank: result.userRank,
    });
  } catch {
    return NextResponse.json({ error: "Failed to submit score" }, { status: 500 });
  }
}
