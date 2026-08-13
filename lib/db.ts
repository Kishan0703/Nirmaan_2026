import fs from "fs";
import path from "path";
import os from "os";
import { getNeonLeaderboard, saveNeonLeaderboardScore, LeaderboardEntry } from "./neon";

export type { LeaderboardEntry };

const getDbDir = () => {
  if (process.env.VERCEL || process.env.NODE_ENV === "production") {
    return path.join(os.tmpdir(), "nirmaan_data");
  }
  return path.join(process.cwd(), "data");
};

const DB_DIR = getDbDir();
const DB_FILE = path.join(DB_DIR, "leaderboard.json");

const initialSeed: LeaderboardEntry[] = [];

function ensureDbFile(): void {
  try {
    if (!fs.existsSync(DB_DIR)) {
      fs.mkdirSync(DB_DIR, { recursive: true });
    }
    if (!fs.existsSync(DB_FILE)) {
      fs.writeFileSync(DB_FILE, JSON.stringify(initialSeed, null, 2), "utf-8");
    }
  } catch (error) {
    console.error("Error initializing database file:", error);
  }
}

export function getFileLeaderboard(): LeaderboardEntry[] {
  try {
    ensureDbFile();
    if (fs.existsSync(DB_FILE)) {
      const raw = fs.readFileSync(DB_FILE, "utf-8");
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        return parsed.sort((a, b) => b.score - a.score);
      }
    }
  } catch (error) {
    console.error("Error reading leaderboard database:", error);
  }
  return initialSeed;
}

export async function getLeaderboard(): Promise<LeaderboardEntry[]> {
  // Try Neon DB first if configured
  if (process.env.DATABASE_URL) {
    const neonData = await getNeonLeaderboard();
    if (neonData) {
      return neonData;
    }
  }
  // Fallback to local file database
  return getFileLeaderboard();
}

export function saveFileLeaderboardScore(entry: { id: string; name: string; score: number }): {
  leaderboard: LeaderboardEntry[];
  userRank: number | null;
} {
  try {
    ensureDbFile();
    let current = getFileLeaderboard();
    const cleanName = String(entry.name).trim().slice(0, 20) || "Anonymous Bug Squasher";
    const dateStr = new Date().toISOString().split("T")[0];

    const existingIndex = current.findIndex(
      (e) => e.id === entry.id || e.name.toLowerCase() === cleanName.toLowerCase()
    );

    if (existingIndex !== -1) {
      if (entry.score > current[existingIndex].score) {
        current[existingIndex].score = entry.score;
        current[existingIndex].date = dateStr;
        current[existingIndex].name = cleanName;
      }
    } else {
      current.push({
        id: entry.id,
        name: cleanName,
        score: entry.score,
        date: dateStr,
      });
    }

    current = current.sort((a, b) => b.score - a.score).slice(0, 50);

    if (fs.existsSync(DB_DIR)) {
      fs.writeFileSync(DB_FILE, JSON.stringify(current, null, 2), "utf-8");
    }

    const userRank = current.findIndex((e) => e.id === entry.id) + 1;

    return {
      leaderboard: current.slice(0, 10),
      userRank: userRank > 0 ? userRank : null,
    };
  } catch (error) {
    console.error("Error writing to leaderboard database:", error);
    return {
      leaderboard: getFileLeaderboard().slice(0, 10),
      userRank: null,
    };
  }
}

export async function clearLeaderboard(): Promise<boolean> {
  try {
    ensureDbFile();
    if (fs.existsSync(DB_FILE)) {
      fs.writeFileSync(DB_FILE, JSON.stringify([], null, 2), "utf-8");
    }
    if (process.env.DATABASE_URL) {
      const { clearNeonTables } = await import("./neon");
      await clearNeonTables();
    }
    return true;
  } catch (error) {
    console.error("Error clearing leaderboard database:", error);
    return false;
  }
}

export async function saveLeaderboardScore(entry: { id: string; name: string; score: number }): Promise<{
  leaderboard: LeaderboardEntry[];
  userRank: number | null;
}> {
  // Try Neon DB first if configured
  if (process.env.DATABASE_URL) {
    const neonRes = await saveNeonLeaderboardScore(entry);
    if (neonRes) {
      return neonRes;
    }
  }
  // Fallback to file database
  return saveFileLeaderboardScore(entry);
}
