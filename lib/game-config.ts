import fs from "fs";
import path from "path";
import os from "os";
import { neon } from "@neondatabase/serverless";

export type GameConfig = {
  gameDuration: number;
  pointsPerBug: number;
  spawnIntervalMs: number;
  bugLifetimeMs: number;
  prizePoolTotal: string;
  buildDurationHours: string;
  builderCapacity: string;
  mentorsCount: string;
  registrationsCount: string;
  teamsFormedCount: string;
  submissionsCount: string;
  judgesAssignedCount: string;
};

export const defaultGameConfig: GameConfig = {
  gameDuration: 30,
  pointsPerBug: 10,
  spawnIntervalMs: 700,
  bugLifetimeMs: 2000,
  prizePoolTotal: "₹1,00,000+",
  buildDurationHours: "24 hrs",
  builderCapacity: "420",
  mentorsCount: "18+",
  registrationsCount: "0",
  teamsFormedCount: "0",
  submissionsCount: "0 drafts",
  judgesAssignedCount: "0",
};

const getDbDir = () => {
  if (process.env.VERCEL || process.env.NODE_ENV === "production") {
    return path.join(os.tmpdir(), "nirmaan_data");
  }
  return path.join(process.cwd(), "data");
};

const DB_DIR = getDbDir();
const SETTINGS_FILE = path.join(DB_DIR, "game_settings.json");

function ensureSettingsFile(): void {
  try {
    if (!fs.existsSync(DB_DIR)) {
      fs.mkdirSync(DB_DIR, { recursive: true });
    }
    if (!fs.existsSync(SETTINGS_FILE)) {
      fs.writeFileSync(SETTINGS_FILE, JSON.stringify(defaultGameConfig, null, 2), "utf-8");
    }
  } catch (error) {
    console.error("Error initializing game settings file:", error);
  }
}

export function getFileGameConfig(): GameConfig {
  try {
    ensureSettingsFile();
    if (fs.existsSync(SETTINGS_FILE)) {
      const raw = fs.readFileSync(SETTINGS_FILE, "utf-8");
      const parsed = JSON.parse(raw);
      return { ...defaultGameConfig, ...parsed };
    }
  } catch (error) {
    console.error("Error reading game settings database file:", error);
  }
  return defaultGameConfig;
}

export function saveFileGameConfig(newConfig: Partial<GameConfig>): GameConfig {
  try {
    ensureSettingsFile();
    const current = getFileGameConfig();
    const updated = { ...current, ...newConfig };
    if (fs.existsSync(DB_DIR)) {
      fs.writeFileSync(SETTINGS_FILE, JSON.stringify(updated, null, 2), "utf-8");
    }
    return updated;
  } catch (error) {
    console.error("Error writing game settings to database file:", error);
    return getFileGameConfig();
  }
}

// ── NEON DATABASE PERSISTENCE ──

async function initNeonSettingsTable(sql: any) {
  try {
    await sql`
      CREATE TABLE IF NOT EXISTS game_settings (
        key VARCHAR(100) PRIMARY KEY,
        value TEXT NOT NULL
      );
    `;
  } catch (err) {
    console.error("Neon settings table init error:", err);
  }
}

export async function getGameConfig(): Promise<GameConfig> {
  if (process.env.DATABASE_URL) {
    try {
      const sql = neon(process.env.DATABASE_URL);
      await initNeonSettingsTable(sql);
      const rows = await sql`SELECT key, value FROM game_settings;`;
      if (rows && rows.length > 0) {
        const configMap: Record<string, any> = {};
        rows.forEach((r: any) => {
          configMap[r.key] = r.value;
        });
        return {
          gameDuration: Number(configMap.gameDuration) || defaultGameConfig.gameDuration,
          pointsPerBug: Number(configMap.pointsPerBug) || defaultGameConfig.pointsPerBug,
          spawnIntervalMs: Number(configMap.spawnIntervalMs) || defaultGameConfig.spawnIntervalMs,
          bugLifetimeMs: Number(configMap.bugLifetimeMs) || defaultGameConfig.bugLifetimeMs,
          prizePoolTotal: configMap.prizePoolTotal || defaultGameConfig.prizePoolTotal,
          buildDurationHours: configMap.buildDurationHours || defaultGameConfig.buildDurationHours,
          builderCapacity: configMap.builderCapacity || defaultGameConfig.builderCapacity,
          mentorsCount: configMap.mentorsCount || defaultGameConfig.mentorsCount,
          registrationsCount: configMap.registrationsCount || defaultGameConfig.registrationsCount,
          teamsFormedCount: configMap.teamsFormedCount || defaultGameConfig.teamsFormedCount,
          submissionsCount: configMap.submissionsCount || defaultGameConfig.submissionsCount,
          judgesAssignedCount: configMap.judgesAssignedCount || defaultGameConfig.judgesAssignedCount,
        };
      }
    } catch (err) {
      console.error("Neon getGameConfig error:", err);
    }
  }
  return getFileGameConfig();
}

export async function saveGameConfig(newConfig: Partial<GameConfig>): Promise<GameConfig> {
  const merged = { ...(await getGameConfig()), ...newConfig };

  if (process.env.DATABASE_URL) {
    try {
      const sql = neon(process.env.DATABASE_URL);
      await initNeonSettingsTable(sql);
      for (const [key, val] of Object.entries(merged)) {
        await sql`
          INSERT INTO game_settings (key, value)
          VALUES (${key}, ${String(val)})
          ON CONFLICT (key) DO UPDATE SET value = ${String(val)};
        `;
      }
    } catch (err) {
      console.error("Neon saveGameConfig error:", err);
    }
  }

  saveFileGameConfig(merged);
  return merged;
}
