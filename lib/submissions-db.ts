import fs from "fs";
import path from "path";
import os from "os";
import { neon } from "@neondatabase/serverless";

export type ProjectSubmission = {
  id: string;
  team: string;
  track: string;
  status: string;
  score: string;
};

export const initialSubmissions: ProjectSubmission[] = [];

const getDbDir = () => {
  if (process.env.VERCEL || process.env.NODE_ENV === "production") {
    return path.join(os.tmpdir(), "nirmaan_data");
  }
  return path.join(process.cwd(), "data");
};

const DB_DIR = getDbDir();
const SUBMISSIONS_FILE = path.join(DB_DIR, "submissions.json");

function ensureSubmissionsFile(): void {
  try {
    if (!fs.existsSync(DB_DIR)) {
      fs.mkdirSync(DB_DIR, { recursive: true });
    }
    if (!fs.existsSync(SUBMISSIONS_FILE)) {
      fs.writeFileSync(SUBMISSIONS_FILE, JSON.stringify(initialSubmissions, null, 2), "utf-8");
    }
  } catch (error) {
    console.error("Error initializing submissions file:", error);
  }
}

export function getFileSubmissions(): ProjectSubmission[] {
  try {
    ensureSubmissionsFile();
    if (fs.existsSync(SUBMISSIONS_FILE)) {
      const raw = fs.readFileSync(SUBMISSIONS_FILE, "utf-8");
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        return parsed;
      }
    }
  } catch (error) {
    console.error("Error reading submissions database file:", error);
  }
  return initialSubmissions;
}

export function saveFileSubmissions(submissions: ProjectSubmission[]): boolean {
  try {
    ensureSubmissionsFile();
    if (fs.existsSync(DB_DIR)) {
      fs.writeFileSync(SUBMISSIONS_FILE, JSON.stringify(submissions, null, 2), "utf-8");
    }
    return true;
  } catch (error) {
    console.error("Error writing submissions to file:", error);
    return false;
  }
}

// ── NEON DATABASE PERSISTENCE ──

async function initNeonSubmissionsTable(sql: any) {
  try {
    await sql`
      CREATE TABLE IF NOT EXISTS project_submissions (
        id VARCHAR(255) PRIMARY KEY,
        team VARCHAR(255) NOT NULL,
        track VARCHAR(255) NOT NULL,
        status VARCHAR(100) NOT NULL,
        score VARCHAR(50) NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `;
  } catch (err) {
    console.error("Neon project_submissions table init error:", err);
  }
}

export async function getSubmissions(): Promise<ProjectSubmission[]> {
  if (process.env.DATABASE_URL) {
    try {
      const sql = neon(process.env.DATABASE_URL);
      await initNeonSubmissionsTable(sql);
      const rows = await sql`
        SELECT id, team, track, status, score
        FROM project_submissions
        ORDER BY created_at ASC;
      `;
      if (rows && rows.length > 0) {
        return rows.map((r: any) => ({
          id: String(r.id),
          team: String(r.team),
          track: String(r.track),
          status: String(r.status),
          score: String(r.score),
        }));
      }
    } catch (err) {
      console.error("Neon getSubmissions error:", err);
    }
  }
  return getFileSubmissions();
}

export async function saveSubmission(submission: ProjectSubmission): Promise<ProjectSubmission[]> {
  const current = await getSubmissions();
  const index = current.findIndex((s) => s.id === submission.id);
  let updated: ProjectSubmission[];

  if (index !== -1) {
    updated = [...current];
    updated[index] = submission;
  } else {
    updated = [...current, submission];
  }

  if (process.env.DATABASE_URL) {
    try {
      const sql = neon(process.env.DATABASE_URL);
      await initNeonSubmissionsTable(sql);
      await sql`
        INSERT INTO project_submissions (id, team, track, status, score)
        VALUES (${submission.id}, ${submission.team}, ${submission.track}, ${submission.status}, ${submission.score})
        ON CONFLICT (id) DO UPDATE SET
          team = ${submission.team},
          track = ${submission.track},
          status = ${submission.status},
          score = ${submission.score};
      `;
    } catch (err) {
      console.error("Neon saveSubmission error:", err);
    }
  }

  saveFileSubmissions(updated);
  return updated;
}

export async function deleteSubmission(id: string): Promise<ProjectSubmission[]> {
  const current = await getSubmissions();
  const updated = current.filter((s) => s.id !== id);

  if (process.env.DATABASE_URL) {
    try {
      const sql = neon(process.env.DATABASE_URL);
      await initNeonSubmissionsTable(sql);
      await sql`DELETE FROM project_submissions WHERE id = ${id};`;
    } catch (err) {
      console.error("Neon deleteSubmission error:", err);
    }
  }

  saveFileSubmissions(updated);
  return updated;
}
