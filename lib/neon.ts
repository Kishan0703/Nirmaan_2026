import { neon, NeonQueryFunction } from "@neondatabase/serverless";

export type LeaderboardEntry = {
  id: string;
  name: string;
  score: number;
  date: string;
};

export type LobbyMessage = {
  id: string;
  sender: string;
  type: string;
  text: string;
  time: string;
};

let sqlClient: NeonQueryFunction<false, false> | null = null;
let tablesInitialized = false;

export function getNeonSql() {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    return null;
  }
  if (!sqlClient) {
    sqlClient = neon(connectionString);
  }
  return sqlClient;
}

export async function initNeonTables(): Promise<boolean> {
  const sql = getNeonSql();
  if (!sql) return false;
  if (tablesInitialized) return true;

  try {
    // Leaderboard table
    await sql`
      CREATE TABLE IF NOT EXISTS leaderboard (
        id VARCHAR(255) PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        score INT NOT NULL,
        date VARCHAR(50) NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `;

    // Lobby messages table
    await sql`
      CREATE TABLE IF NOT EXISTS lobby_messages (
        id VARCHAR(255) PRIMARY KEY,
        sender VARCHAR(255) NOT NULL,
        type VARCHAR(50) NOT NULL,
        text TEXT NOT NULL,
        time VARCHAR(50) NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `;

    tablesInitialized = true;
    return true;
  } catch (error) {
    console.error("Neon DB table initialization error:", error);
    return false;
  }
}

// ── LEADERBOARD NEON OPERATORS ──

export async function getNeonLeaderboard(): Promise<LeaderboardEntry[] | null> {
  const sql = getNeonSql();
  if (!sql) return null;

  try {
    await initNeonTables();
    const rows = await sql`
      SELECT id, name, score, date
      FROM leaderboard
      ORDER BY score DESC
      LIMIT 50;
    `;

    return rows.map((r) => ({
      id: String(r.id),
      name: String(r.name),
      score: Number(r.score),
      date: String(r.date),
    }));
  } catch (error) {
    console.error("Neon getLeaderboard error:", error);
    return null;
  }
}

export async function saveNeonLeaderboardScore(entry: {
  id: string;
  name: string;
  score: number;
}): Promise<{ leaderboard: LeaderboardEntry[]; userRank: number | null } | null> {
  const sql = getNeonSql();
  if (!sql) return null;

  try {
    await initNeonTables();
    const cleanName = String(entry.name).trim().slice(0, 20) || "Anonymous Bug Squasher";
    const dateStr = new Date().toISOString().split("T")[0];

    // Check existing score by id or case-insensitive name
    const existing = await sql`
      SELECT id, score, name FROM leaderboard WHERE id = ${entry.id} OR LOWER(name) = LOWER(${cleanName}) LIMIT 1;
    `;

    if (existing && existing.length > 0) {
      const existingRecord = existing[0];
      const existingScore = Number(existingRecord.score);
      // Update if new score is higher or equal to refresh timestamp/name
      if (entry.score >= existingScore) {
        await sql`
          UPDATE leaderboard
          SET score = ${entry.score}, date = ${dateStr}, name = ${cleanName}, id = ${entry.id}
          WHERE id = ${existingRecord.id};
        `;
      }
    } else {
      await sql`
        INSERT INTO leaderboard (id, name, score, date)
        VALUES (${entry.id}, ${cleanName}, ${entry.score}, ${dateStr});
      `;
    }

    const leaderboard = (await getNeonLeaderboard()) || [];
    const userRankIndex = leaderboard.findIndex(
      (e) => e.id === entry.id || e.name.toLowerCase() === cleanName.toLowerCase()
    );
    const userRank = userRankIndex >= 0 ? userRankIndex + 1 : null;

    return {
      leaderboard: leaderboard.slice(0, 10),
      userRank,
    };
  } catch (error) {
    console.error("Neon saveLeaderboardScore error:", error);
    return null;
  }
}

// ── LOBBY MESSAGES NEON OPERATORS ──

export async function getNeonMessages(): Promise<LobbyMessage[] | null> {
  const sql = getNeonSql();
  if (!sql) return null;

  try {
    await initNeonTables();
    const rows = await sql`
      SELECT id, sender, type, text, time
      FROM lobby_messages
      ORDER BY created_at ASC, id ASC
      LIMIT 200;
    `;

    return rows.map((r) => ({
      id: String(r.id),
      sender: String(r.sender),
      type: String(r.type),
      text: String(r.text),
      time: String(r.time),
    }));
  } catch (error) {
    console.error("Neon getMessages error:", error);
    return null;
  }
}

export async function saveNeonMessage(msg: LobbyMessage): Promise<boolean> {
  const sql = getNeonSql();
  if (!sql) return false;

  try {
    await initNeonTables();
    await sql`
      INSERT INTO lobby_messages (id, sender, type, text, time)
      VALUES (${msg.id}, ${msg.sender}, ${msg.type}, ${msg.text}, ${msg.time});
    `;
    return true;
  } catch (error) {
    console.error("Neon saveMessage error:", error);
    return false;
  }
}
