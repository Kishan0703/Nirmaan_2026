import fs from "fs";
import path from "path";
import os from "os";
import { neon } from "@neondatabase/serverless";

export type ProjectSubmission = {
  id: string;
  team: string;
  leader?: string;
  track?: string;
  status: string;
  score?: string;
};

export const initialSubmissions: ProjectSubmission[] = [
  { id: "r1_44", team: "3 byte builders", leader: "Amith H. P", track: "Open Innovation", status: "Qualified for Finale", score: "87.0" },
  { id: "r1_34", team: "Aeronex", leader: "Ashwath", track: "Smart Mobility & Aerospace", status: "Qualified for Finale", score: "89.5" },
  { id: "r1_29", team: "Arigato Algorithms", leader: "Navya Nawal", track: "Deep Tech & Edge AI", status: "Qualified for Finale", score: "90.8" },
  { id: "r1_35", team: "Axiom", leader: "Tharjun S", track: "Open Innovation", status: "Qualified for Finale", score: "89.2" },
  { id: "r1_25", team: "Byte Benders", leader: "Ankit S Kulkarni", track: "Deep Tech & Edge AI", status: "Qualified for Finale", score: "91.8" },
  { id: "r1_28", team: "Byte_me", leader: "Abhiram Sharma", track: "Open Innovation", status: "Qualified for Finale", score: "91.0" },
  { id: "r1_23", team: "CacheUs", leader: "Aadvik Nandisha Gowda", track: "Deep Tech & Edge AI", status: "Qualified for Finale", score: "92.2" },
  { id: "r1_19", team: "ChaCha", leader: "Ranjiv Krishnan", track: "Open Innovation", status: "Qualified for Finale", score: "93.2" },
  { id: "r1_45", team: "CLASHERS", leader: "Rajath DK", track: "Open Innovation", status: "Qualified for Finale", score: "86.8" },
  { id: "r1_7", team: "codalist", leader: "Mohar barat", track: "Cyber-Physical Security & Defense", status: "Qualified for Finale", score: "96.2" },
  { id: "r1_10", team: "Code Crew", leader: "SRUJAN S", track: "Open Innovation", status: "Qualified for Finale", score: "95.5" },
  { id: "r1_39", team: "codegeeks", leader: "avanthi", track: "Open Innovation", status: "Qualified for Finale", score: "88.2" },
  { id: "r1_30", team: "CODEXA", leader: "Jahnavi N", track: "Open Innovation", status: "Qualified for Finale", score: "90.5" },
  { id: "r1_47", team: "Ctrl+care", leader: "Padma Varshini D", track: "HealthTech & Bio-Wearables", status: "Qualified for Finale", score: "86.2" },
  { id: "r1_26", team: "Cyber Citadel", leader: "Akshita Raj", track: "Cyber-Physical Security & Defense", status: "Qualified for Finale", score: "91.5" },
  { id: "r1_6", team: "DOCKER DUCKS", leader: "Madiha Anjum", track: "Open Innovation", status: "Qualified for Finale", score: "96.5" },
  { id: "r1_18", team: "EdgeVital", leader: "Harshita Shakya", track: "HealthTech & Bio-Wearables", status: "Qualified for Finale", score: "93.5" },
  { id: "r1_48", team: "Electrified", leader: "Soumili Mitra", track: "Smart Mobility & Aerospace", status: "Qualified for Finale", score: "86.0" },
  { id: "r1_40", team: "Embedded Minds", leader: "Shivam Shantkumar", track: "Deep Tech & Edge AI", status: "Qualified for Finale", score: "88.0" },
  { id: "r1_32", team: "Error404:NotFound", leader: "MILANRAJ", track: "Cyber-Physical Security & Defense", status: "Qualified for Finale", score: "90.0" },
  { id: "r1_13", team: "FLEETMIND", leader: "Bhumika U", track: "Smart Mobility & Aerospace", status: "Qualified for Finale", score: "94.8" },
  { id: "r1_22", team: "Frequency Fusion", leader: "BHUVAN M H", track: "Smart Mobility & Aerospace", status: "Qualified for Finale", score: "92.5" },
  { id: "r1_11", team: "God Valley", leader: "Ajay Krishna", track: "Open Innovation", status: "Qualified for Finale", score: "95.2" },
  { id: "r1_12", team: "HACKCORE", leader: "Akash P", track: "Cyber-Physical Security & Defense", status: "Qualified for Finale", score: "95.0" },
  { id: "r1_50", team: "Logic Forge", leader: "Vamshi Krishna K M", track: "Deep Tech & Edge AI", status: "Qualified for Finale", score: "85.5" },
  { id: "r1_46", team: "MergeInfinity", leader: "Dhruv Save", track: "Open Innovation", status: "Qualified for Finale", score: "86.5" },
  { id: "r1_16", team: "Muggles", leader: "Sagar N M", track: "Open Innovation", status: "Qualified for Finale", score: "94.0" },
  { id: "r1_5", team: "nexbyte", leader: "Luzain Sara", track: "Deep Tech & Edge AI", status: "Qualified for Finale", score: "96.8" },
  { id: "r1_27", team: "NightCrawler", leader: "Sumukha R", track: "Cyber-Physical Security & Defense", status: "Qualified for Finale", score: "91.2" },
  { id: "r1_17", team: "Paritrana", leader: "Vishwas CM", track: "Cyber-Physical Security & Defense", status: "Qualified for Finale", score: "93.8" },
  { id: "r1_41", team: "QuadCore", leader: "Udit Singhi", track: "Cyber-Physical Security & Defense", status: "Qualified for Finale", score: "87.8" },
  { id: "r1_21", team: "Rasam", leader: "Samanvitha G Nayak", track: "AgriTech", status: "Qualified for Finale", score: "92.8" },
  { id: "r1_37", team: "RehabGrip", leader: "Khush Chadha", track: "HealthTech & Bio-Wearables", status: "Qualified for Finale", score: "88.8" },
  { id: "r1_38", team: "Shadow quant", leader: "Utsav B raikar", track: "Deep Tech & Edge AI", status: "Qualified for Finale", score: "88.5" },
  { id: "r1_14", team: "Silicon Syndicate(Rishika)", leader: "RISHIKA RANJAN", track: "Deep Tech & Edge AI", status: "Qualified for Finale", score: "94.5" },
  { id: "r1_33", team: "teck spark", leader: "pikki Gouthami", track: "Smart Mobility & Aerospace", status: "Qualified for Finale", score: "89.8" },
  { id: "r1_24", team: "The big 4", leader: "Vishal GF", track: "Open Innovation", status: "Qualified for Finale", score: "92.0" },
  { id: "r1_36", team: "The Ravagers", leader: "Sricharan S Sharma", track: "Open Innovation", status: "Qualified for Finale", score: "89.0" },
  { id: "r1_3", team: "The Third Byte", leader: "Ankitha Narayan", track: "Open Innovation", status: "Qualified for Finale", score: "97.5" },
  { id: "r1_1", team: "Tragic bytes", leader: "Lakshmi J Shastry", track: "Deep Tech & Edge AI", status: "Qualified for Finale", score: "98.5" },
  { id: "r1_8", team: "Triple Espresso", leader: "Avani Kollur", track: "Open Innovation", status: "Qualified for Finale", score: "96.0" },
  { id: "r1_49", team: "Trojan Hex", leader: "Pothur Abhinav", track: "Cyber-Physical Security & Defense", status: "Qualified for Finale", score: "85.8" },
  { id: "r1_42", team: "UNO-PI", leader: "SRIVATSAN A", track: "Deep Tech & Edge AI", status: "Qualified for Finale", score: "87.5" },
  { id: "r1_15", team: "Value", leader: "Balaji G S", track: "Open Innovation", status: "Qualified for Finale", score: "94.2" },
  { id: "r1_20", team: "VeriLoop Edge", leader: "Drakshayani", track: "Deep Tech & Edge AI", status: "Qualified for Finale", score: "93.0" },
  { id: "r1_43", team: "Virtual Soldiers", leader: "Vishal Raj", track: "Cyber-Physical Security & Defense", status: "Qualified for Finale", score: "87.2" },
  { id: "r1_2", team: "VORTEX", leader: "Sharan K U", track: "Cyber-Physical Security & Defense", status: "Qualified for Finale", score: "98.0" },
  { id: "r1_9", team: "Vriddhi 2.0 Digital Farms", leader: "Abhilash Das", track: "AgriTech", status: "Qualified for Finale", score: "95.8" },
  { id: "r1_31", team: "YantraVidya", leader: "Raj Shekhar Singh", track: "Deep Tech & Edge AI", status: "Qualified for Finale", score: "90.2" },
  { id: "r1_4", team: "YoungDumb&Broke", leader: "Likithashri", track: "Smart Mobility & Aerospace", status: "Qualified for Finale", score: "97.0" },
  { id: "w_1", team: "THE INNOV8ORS", leader: "Bhagya N K", track: "Deep Tech & Edge AI", status: "Waitlisted", score: "" },
  { id: "w_2", team: "Team Astra", leader: "Pratham R Raikar", track: "Smart Mobility & Aerospace", status: "Waitlisted", score: "" },
  { id: "w_3", team: "RadarX", leader: "PREETHI A", track: "Cyber-Physical Security & Defense", status: "Waitlisted", score: "" },
  { id: "w_4", team: "Hydro Eye", leader: "Rajan Parmar", track: "AgriTech", status: "Waitlisted", score: "" },
  { id: "w_5", team: "Mindsight", leader: "Bushra", track: "Deep Tech & Edge AI", status: "Waitlisted", score: "" },
  { id: "w_6", team: "Prayas Infinity", leader: "Tarun", track: "Open Innovation", status: "Waitlisted", score: "" },
  { id: "w_7", team: "SmartGuard", leader: "Harini S", track: "Cyber-Physical Security & Defense", status: "Waitlisted", score: "" },
  { id: "w_8", team: "Agrenyx Technologies", leader: "Thodupunuri Sai Charan", track: "AgriTech", status: "Waitlisted", score: "" },
  { id: "w_9", team: "The Mavericks", leader: "K K Nithyashree", track: "Open Innovation", status: "Waitlisted", score: "" },
  { id: "w_10", team: "QUANTUM TRAID", leader: "V NANDA KISHORE NAIK", track: "Deep Tech & Edge AI", status: "Waitlisted", score: "" },
  { id: "w_11", team: "Catalyst", leader: "Inchara S Babu", track: "Open Innovation", status: "Waitlisted", score: "" },
  { id: "w_12", team: "ENIGMAA", leader: "Shikta Roy", track: "Cyber-Physical Security & Defense", status: "Waitlisted", score: "" },
  { id: "w_13", team: "RTX 6090", leader: "Shufwath Raqeeb S", track: "Deep Tech & Edge AI", status: "Waitlisted", score: "" },
  { id: "w_14", team: "AI Slaves", leader: "A Likitha", track: "Deep Tech & Edge AI", status: "Waitlisted", score: "" },
  { id: "w_15", team: "Byte Rush", leader: "Meher Tasneem M", track: "Deep Tech & Edge AI", status: "Waitlisted", score: "" },
  { id: "w_16", team: "Alronics", leader: "Aryan Sujay Kumar UK", track: "Smart Mobility & Aerospace", status: "Waitlisted", score: "" },
  { id: "w_17", team: "CrackHeads", leader: "Srivathsa S Murthy", track: "Open Innovation", status: "Waitlisted", score: "" },
  { id: "w_18", team: "AetherAI", leader: "Poshika Gorantla", track: "Deep Tech & Edge AI", status: "Waitlisted", score: "" },
  { id: "w_19", team: "Code colouss", leader: "Videesha A G", track: "Deep Tech & Edge AI", status: "Waitlisted", score: "" },
  { id: "w_20", team: "SVAN", leader: "Vansh Baranwal", track: "Open Innovation", status: "Waitlisted", score: "" },
  { id: "w_21", team: "Dakaits", leader: "Yugesh Kumar", track: "Open Innovation", status: "Waitlisted", score: "" },
  { id: "w_22", team: "Elevspark", leader: "Santoshi SM", track: "Smart Mobility & Aerospace", status: "Waitlisted", score: "" },
  { id: "w_23", team: "TECH FOUR", leader: "HETHYSHI.M.S", track: "Open Innovation", status: "Waitlisted", score: "" },
];

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

export function sortAlphabeticalSubmissions(list: ProjectSubmission[]): ProjectSubmission[] {
  const finalists = list.filter((s) => !s.status.toLowerCase().includes("waitlist"));
  const waitlist = list.filter((s) => s.status.toLowerCase().includes("waitlist"));

  finalists.sort((a, b) =>
    a.team.localeCompare(b.team, undefined, { numeric: true, sensitivity: "base" })
  );

  // Finalists in alphabetical order (numbers first); Waitlist stays in original Drive order
  return [...finalists, ...waitlist];
}

export function getFileSubmissions(): ProjectSubmission[] {
  try {
    ensureSubmissionsFile();
    if (fs.existsSync(SUBMISSIONS_FILE)) {
      const raw = fs.readFileSync(SUBMISSIONS_FILE, "utf-8");
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        return sortAlphabeticalSubmissions(parsed);
      }
    }
  } catch (error) {
    console.error("Error reading submissions database file:", error);
  }
  return sortAlphabeticalSubmissions(initialSubmissions);
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
        leader VARCHAR(255) DEFAULT '',
        track VARCHAR(255) NOT NULL,
        status VARCHAR(100) NOT NULL,
        score VARCHAR(50) NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `;
    await sql`
      ALTER TABLE project_submissions ADD COLUMN IF NOT EXISTS leader VARCHAR(255) DEFAULT '';
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
        SELECT id, team, COALESCE(leader, '') as leader, track, status, score
        FROM project_submissions
        ORDER BY created_at ASC;
      `;
      if (rows && rows.length > 0) {
        return sortAlphabeticalSubmissions(
          rows.map((r: any) => ({
            id: String(r.id),
            team: String(r.team),
            leader: String(r.leader || ""),
            track: String(r.track),
            status: String(r.status),
            score: String(r.score),
          }))
        );
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
        INSERT INTO project_submissions (id, team, leader, track, status, score)
        VALUES (${submission.id}, ${submission.team}, ${submission.leader || ""}, ${submission.track || ""}, ${submission.status}, ${submission.score || ""})
        ON CONFLICT (id) DO UPDATE SET
          team = ${submission.team},
          leader = ${submission.leader || ""},
          track = ${submission.track || ""},
          status = ${submission.status},
          score = ${submission.score || ""};
      `;
    } catch (err) {
      console.error("Neon saveSubmission error:", err);
    }
  }

  const sorted = sortAlphabeticalSubmissions(updated);
  saveFileSubmissions(sorted);
  return sorted;
}

export async function replaceSubmissions(newSubmissions: ProjectSubmission[]): Promise<ProjectSubmission[]> {
  const sorted = sortAlphabeticalSubmissions(newSubmissions);
  if (process.env.DATABASE_URL) {
    try {
      const sql = neon(process.env.DATABASE_URL);
      await initNeonSubmissionsTable(sql);
      await sql`DELETE FROM project_submissions;`;
      for (const sub of sorted) {
        await sql`
          INSERT INTO project_submissions (id, team, leader, track, status, score)
          VALUES (${sub.id}, ${sub.team}, ${sub.leader || ""}, ${sub.track || ""}, ${sub.status}, ${sub.score || ""});
        `;
      }
    } catch (err) {
      console.error("Neon replaceSubmissions error:", err);
    }
  }

  saveFileSubmissions(sorted);
  return sorted;
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

  const sorted = sortAlphabeticalSubmissions(updated);
  saveFileSubmissions(sorted);
  return sorted;
}
