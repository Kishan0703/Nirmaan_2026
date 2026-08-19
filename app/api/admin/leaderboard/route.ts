import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getLeaderboard, saveLeaderboardScore, clearLeaderboard, saveFileLeaderboardScore } from "@/lib/db";
import { saveNeonLeaderboardScore, clearNeonLeaderboard, initNeonTables } from "@/lib/neon";
import { neon } from "@neondatabase/serverless";
import fs from "fs";
import path from "path";
import os from "os";

const getDbDir = () => {
  if (process.env.VERCEL || process.env.NODE_ENV === "production") {
    return path.join(os.tmpdir(), "nirmaan_data");
  }
  return path.join(process.cwd(), "data");
};

const DB_DIR = getDbDir();
const DB_FILE = path.join(DB_DIR, "leaderboard.json");

// Protected POST: Admin adds or modifies a leaderboard score
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, name, score } = body;

    const parsedScore = Number.parseInt(String(score), 10);
    if (!Number.isFinite(parsedScore) || parsedScore < 0) {
      return NextResponse.json({ error: "Invalid score value." }, { status: 400 });
    }

    const entryId = String(id || "").trim() || `player_${Date.now()}`;
    const entryName = String(name || "").trim().slice(0, 20) || "Anonymous Bug Squasher";

    const result = await saveLeaderboardScore({
      id: entryId,
      name: entryName,
      score: parsedScore,
    });

    return NextResponse.json({
      success: true,
      message: "Leaderboard entry updated.",
      leaderboard: result.leaderboard,
    });
  } catch (error) {
    console.error("Admin leaderboard POST error:", error);
    return NextResponse.json({ error: "Failed to update leaderboard entry." }, { status: 500 });
  }
}

// Protected DELETE: Admin deletes a single entry by ID or clears all
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const targetId = searchParams.get("id");

    if (!targetId || targetId === "all") {
      await clearLeaderboard();
      return NextResponse.json({ success: true, message: "Leaderboard cleared." });
    }

    // Filter out specific ID - update both file and Neon
    const current = await getLeaderboard();
    const updated = current.filter((item) => item.id !== targetId);

    // Update file database
    if (fs.existsSync(DB_DIR)) {
      fs.writeFileSync(DB_FILE, JSON.stringify(updated, null, 2), "utf-8");
    }

    // Update Neon database
    if (process.env.DATABASE_URL) {
      try {
        const sql = neon(process.env.DATABASE_URL);
        await initNeonTables();
        await sql`DELETE FROM leaderboard WHERE id = ${targetId};`;
      } catch (neonErr) {
        console.error("Neon delete error:", neonErr);
      }
    }

    return NextResponse.json({ success: true, message: "Entry deleted successfully.", leaderboard: updated });
  } catch (error) {
    console.error("Admin leaderboard DELETE error:", error);
    return NextResponse.json({ error: "Failed to delete leaderboard entry." }, { status: 500 });
  }
}
