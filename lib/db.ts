import fs from "fs";
import path from "path";

export type LeaderboardEntry = {
  id: string;
  name: string;
  score: number;
  date: string;
};

const DB_DIR = path.join(process.cwd(), "data");
const DB_FILE = path.join(DB_DIR, "leaderboard.json");

const initialSeed: LeaderboardEntry[] = [
  { id: "seed_1", name: "BugDestroyer_99", score: 280, date: "2026-08-01" },
  { id: "seed_2", name: "NullPointerSam", score: 240, date: "2026-08-02" },
  { id: "seed_3", name: "SyntaxSlayer", score: 210, date: "2026-08-02" },
  { id: "seed_4", name: "DevOpsDave", score: 180, date: "2026-08-03" },
  { id: "seed_5", name: "ReactRanger", score: 150, date: "2026-08-03" },
];

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

export function getLeaderboard(): LeaderboardEntry[] {
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

export function saveLeaderboardScore(entry: { id: string; name: string; score: number }): {
  leaderboard: LeaderboardEntry[];
  userRank: number | null;
} {
  try {
    ensureDbFile();
    let current = getLeaderboard();
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

    // Sort descending and cap persistent records
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
      leaderboard: getLeaderboard().slice(0, 10),
      userRank: null,
    };
  }
}
