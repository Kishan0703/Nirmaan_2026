import { NextResponse } from "next/server";
import { getLeaderboard, saveLeaderboardScore, clearLeaderboard } from "@/lib/db";

export const dynamic = "force-dynamic";

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

export async function DELETE() {
  try {
    await clearLeaderboard();
    return NextResponse.json({ success: true, leaderboard: [] });
  } catch (err) {
    console.error("Leaderboard DELETE error:", err);
    return NextResponse.json({ error: "Failed to clear leaderboard" }, { status: 500 });
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
    const result = await saveLeaderboardScore({
      id: entryId,
      name,
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
