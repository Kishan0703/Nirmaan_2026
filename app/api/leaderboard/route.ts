import { NextResponse } from "next/server";

export type LeaderboardEntry = {
  id: string;
  name: string;
  score: number;
  date: string;
};

// Initial leaderboard seeds
let leaderboard: LeaderboardEntry[] = [
  { id: "1", name: "BugDestroyer_99", score: 280, date: "2026-08-01" },
  { id: "2", name: "NullPointerSam", score: 240, date: "2026-08-02" },
  { id: "3", name: "SyntaxSlayer", score: 210, date: "2026-08-02" },
  { id: "4", name: "DevOpsDave", score: 180, date: "2026-08-03" },
  { id: "5", name: "ReactRanger", score: 150, date: "2026-08-03" },
];

export async function GET() {
  const sorted = [...leaderboard].sort((a, b) => b.score - a.score).slice(0, 10);
  return NextResponse.json({ leaderboard: sorted });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, score, userId } = body;

    if (!name || typeof score !== "number") {
      return NextResponse.json({ error: "Invalid data" }, { status: 400 });
    }

    const cleanName = String(name).trim().slice(0, 20) || "Anonymous Bug Squasher";
    const entryId = userId || `user_${Date.now()}`;
    const dateStr = new Date().toISOString().split("T")[0];

    // Check if player already exists in leaderboard
    const existingIndex = leaderboard.findIndex((e) => e.id === entryId || e.name.toLowerCase() === cleanName.toLowerCase());

    if (existingIndex !== -1) {
      // Only update if new score is higher
      if (score > leaderboard[existingIndex].score) {
        leaderboard[existingIndex].score = score;
        leaderboard[existingIndex].date = dateStr;
        leaderboard[existingIndex].name = cleanName;
      }
    } else {
      leaderboard.push({
        id: entryId,
        name: cleanName,
        score,
        date: dateStr,
      });
    }

    // Keep top 50
    leaderboard = leaderboard.sort((a, b) => b.score - a.score).slice(0, 50);

    const top10 = leaderboard.slice(0, 10);
    const userRank = leaderboard.findIndex((e) => e.id === entryId) + 1;

    return NextResponse.json({
      success: true,
      leaderboard: top10,
      userRank: userRank > 0 ? userRank : null,
    });
  } catch {
    return NextResponse.json({ error: "Failed to submit score" }, { status: 500 });
  }
}
