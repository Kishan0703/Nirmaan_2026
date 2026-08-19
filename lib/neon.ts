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

export type GameSession = {
  id: string;
  player_id: string;
  player_name: string;
  session_token: string;
  status: "active" | "completed" | "abandoned";
  score: number;
  clicks_count: number;
  started_at: string;
  ended_at: string | null;
  created_at: string;
};

export type ScoreRecord = {
  id: string;
  player_id: string;
  player_name: string;
  score: number;
  session_token: string;
  created_at: string;
};

let sqlClient: NeonQueryFunction<false, false> | null = null;
let tablesInitialized = false;

// Keep the database client private to this module. All exported operations below
// use Neon tagged templates, which bind interpolated values as query parameters.
function getNeonSql() {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    if (process.env.NODE_ENV === "production") {
      throw new Error("DATABASE_URL must be configured in production.");
    }
    return null;
  }
  if (process.env.NODE_ENV === "production") {
    const databaseUrl = new URL(connectionString);
    const sslMode = databaseUrl.searchParams.get("sslmode");
    if (sslMode !== "require" && databaseUrl.searchParams.get("ssl") !== "true") {
      throw new Error("DATABASE_URL must require TLS in production.");
    }
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

    // Game sessions table - tracks each game session
    await sql`
      CREATE TABLE IF NOT EXISTS game_sessions (
        id VARCHAR(255) PRIMARY KEY,
        player_id VARCHAR(255) NOT NULL,
        player_name VARCHAR(255) NOT NULL,
        session_token VARCHAR(255) NOT NULL UNIQUE,
        status VARCHAR(20) NOT NULL DEFAULT 'active',
        score INT NOT NULL DEFAULT 0,
        clicks_count INT NOT NULL DEFAULT 0,
        started_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
        ended_at TIMESTAMP WITH TIME ZONE,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `;

    // Scores table - records each finalized score submission
    await sql`
      CREATE TABLE IF NOT EXISTS scores (
        id VARCHAR(255) PRIMARY KEY,
        player_id VARCHAR(255) NOT NULL,
        player_name VARCHAR(255) NOT NULL,
        score INT NOT NULL,
        session_token VARCHAR(255) NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `;

    // Indexes for performance and lookups
    await sql`CREATE INDEX IF NOT EXISTS idx_game_sessions_player_id ON game_sessions(player_id);`;
    await sql`CREATE INDEX IF NOT EXISTS idx_game_sessions_session_token ON game_sessions(session_token);`;
    await sql`CREATE INDEX IF NOT EXISTS idx_game_sessions_status ON game_sessions(status);`;
    await sql`CREATE INDEX IF NOT EXISTS idx_scores_player_id ON scores(player_id);`;
    await sql`CREATE INDEX IF NOT EXISTS idx_scores_session_token ON scores(session_token);`;
    await sql`CREATE INDEX IF NOT EXISTS idx_scores_created_at ON scores(created_at DESC);`;

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

    // Ownership is keyed exclusively by the authenticated user's immutable ID.
    // Display names are not authorization identifiers and must never select a row.
    const existing = await sql`
      SELECT id, score, name FROM leaderboard WHERE id = ${entry.id} LIMIT 1;
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
    const userRankIndex = leaderboard.findIndex((e) => e.id === entry.id);
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
    let rows = await sql`
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

export async function clearNeonMessages(): Promise<boolean> {
  const sql = getNeonSql();
  if (!sql) return false;

  try {
    await initNeonTables();
    await sql`DELETE FROM lobby_messages;`;
    return true;
  } catch (error) {
    console.error("Neon clearNeonMessages error:", error);
    return false;
  }
}

export async function clearNeonLeaderboard(): Promise<boolean> {
  const sql = getNeonSql();
  if (!sql) return false;

  try {
    await initNeonTables();
    await sql`DELETE FROM leaderboard;`;
    return true;
  } catch (error) {
    console.error("Neon clearNeonLeaderboard error:", error);
    return false;
  }
}

// ── GAME SESSION NEON OPERATORS ──

export async function createGameSession(entry: {
  id: string;
  player_id: string;
  player_name: string;
  session_token: string;
}): Promise<GameSession | null> {
  const sql = getNeonSql();
  if (!sql) return null;

  try {
    await initNeonTables();
    const now = new Date().toISOString();
    await sql`
      INSERT INTO game_sessions (id, player_id, player_name, session_token, status, score, clicks_count, started_at, ended_at, created_at)
      VALUES (${entry.id}, ${entry.player_id}, ${entry.player_name}, ${entry.session_token}, 'active', 0, 0, ${now}, NULL, ${now});
    `;

    const rows = await sql`
      SELECT id, player_id, player_name, session_token, status, score, clicks_count, started_at, ended_at, created_at
      FROM game_sessions WHERE id = ${entry.id} LIMIT 1;
    `;

    if (rows && rows.length > 0) {
      const r = rows[0];
      return {
        id: String(r.id),
        player_id: String(r.player_id),
        player_name: String(r.player_name),
        session_token: String(r.session_token),
        status: String(r.status) as "active" | "completed" | "abandoned",
        score: Number(r.score),
        clicks_count: Number(r.clicks_count),
        started_at: String(r.started_at),
        ended_at: r.ended_at ? String(r.ended_at) : null,
        created_at: String(r.created_at),
      };
    }
    return null;
  } catch (error) {
    console.error("Neon createGameSession error:", error);
    return null;
  }
}

export async function getGameSessionByToken(sessionToken: string): Promise<GameSession | null> {
  const sql = getNeonSql();
  if (!sql) return null;

  try {
    await initNeonTables();
    const rows = await sql`
      SELECT id, player_id, player_name, session_token, status, score, clicks_count, started_at, ended_at, created_at
      FROM game_sessions WHERE session_token = ${sessionToken} LIMIT 1;
    `;

    if (rows && rows.length > 0) {
      const r = rows[0];
      return {
        id: String(r.id),
        player_id: String(r.player_id),
        player_name: String(r.player_name),
        session_token: String(r.session_token),
        status: String(r.status) as "active" | "completed" | "abandoned",
        score: Number(r.score),
        clicks_count: Number(r.clicks_count),
        started_at: String(r.started_at),
        ended_at: r.ended_at ? String(r.ended_at) : null,
        created_at: String(r.created_at),
      };
    }
    return null;
  } catch (error) {
    console.error("Neon getGameSessionByToken error:", error);
    return null;
  }
}

export async function updateGameSessionClick(sessionToken: string): Promise<{ score: number; clicks_count: number } | null> {
  const sql = getNeonSql();
  if (!sql) return null;

  try {
    await initNeonTables();
    const now = new Date().toISOString();
    // Increment score by 10 (points per bug) and clicks_count by 1
    const pointsPerBug = 10;
    await sql`
      UPDATE game_sessions
      SET score = score + ${pointsPerBug}, clicks_count = clicks_count + 1
      WHERE session_token = ${sessionToken} AND status = 'active';
    `;

    const rows = await sql`
      SELECT score, clicks_count FROM game_sessions WHERE session_token = ${sessionToken} LIMIT 1;
    `;

    if (rows && rows.length > 0) {
      return {
        score: Number(rows[0].score),
        clicks_count: Number(rows[0].clicks_count),
      };
    }
    return null;
  } catch (error) {
    console.error("Neon updateGameSessionClick error:", error);
    return null;
  }
}

export async function finalizeGameSession(sessionToken: string): Promise<GameSession | null> {
  const sql = getNeonSql();
  if (!sql) return null;

  try {
    await initNeonTables();
    const now = new Date().toISOString();
    await sql`
      UPDATE game_sessions
      SET status = 'completed', ended_at = ${now}
      WHERE session_token = ${sessionToken} AND status = 'active';
    `;

    const rows = await sql`
      SELECT id, player_id, player_name, session_token, status, score, clicks_count, started_at, ended_at, created_at
      FROM game_sessions WHERE session_token = ${sessionToken} LIMIT 1;
    `;

    if (rows && rows.length > 0) {
      const r = rows[0];
      return {
        id: String(r.id),
        player_id: String(r.player_id),
        player_name: String(r.player_name),
        session_token: String(r.session_token),
        status: String(r.status) as "active" | "completed" | "abandoned",
        score: Number(r.score),
        clicks_count: Number(r.clicks_count),
        started_at: String(r.started_at),
        ended_at: r.ended_at ? String(r.ended_at) : null,
        created_at: String(r.created_at),
      };
    }
    return null;
  } catch (error) {
    console.error("Neon finalizeGameSession error:", error);
    return null;
  }
}

// ── SCORE RECORDS NEON OPERATORS ──

export async function saveScoreRecord(entry: {
  id: string;
  player_id: string;
  player_name: string;
  score: number;
  session_token: string;
}): Promise<ScoreRecord | null> {
  const sql = getNeonSql();
  if (!sql) return null;

  try {
    await initNeonTables();
    const now = new Date().toISOString();
    const cleanName = String(entry.player_name).trim().slice(0, 20) || "Anonymous Bug Squasher";
    await sql`
      INSERT INTO scores (id, player_id, player_name, score, session_token, created_at)
      VALUES (${entry.id}, ${entry.player_id}, ${cleanName}, ${entry.score}, ${entry.session_token}, ${now});
    `;

    const rows = await sql`
      SELECT id, player_id, player_name, score, session_token, created_at
      FROM scores WHERE id = ${entry.id} LIMIT 1;
    `;

    if (rows && rows.length > 0) {
      const r = rows[0];
      return {
        id: String(r.id),
        player_id: String(r.player_id),
        player_name: String(r.player_name),
        score: Number(r.score),
        session_token: String(r.session_token),
        created_at: String(r.created_at),
      };
    }
    return null;
  } catch (error) {
    console.error("Neon saveScoreRecord error:", error);
    return null;
  }
}

export async function hasScoreRecordForSession(sessionToken: string): Promise<boolean> {
  const sql = getNeonSql();
  if (!sql) return false;

  try {
    await initNeonTables();
    const rows = await sql`
      SELECT 1 FROM scores WHERE session_token = ${sessionToken} LIMIT 1;
    `;
    return rows && rows.length > 0;
  } catch (error) {
    console.error("Neon hasScoreRecordForSession error:", error);
    return false;
  }
}
