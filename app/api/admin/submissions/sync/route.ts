import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getSubmissions, replaceSubmissions, initialSubmissions, ProjectSubmission } from "@/lib/submissions-db";
import { sanitizeText } from "@/lib/security-sanitize";

export const dynamic = "force-dynamic";

function extractCsvUrl(url: string): string {
  const match = url.match(/\/d\/([a-zA-Z0-9-_]+)/);
  if (!match) return url;
  const sheetId = match[1];
  const gidMatch = url.match(/[#&?]gid=([0-9]+)/);
  const gid = gidMatch ? gidMatch[1] : "0";
  return `https://docs.google.com/spreadsheets/d/${sheetId}/export?format=csv&gid=${gid}`;
}

interface ParsedTeam {
  team: string;
  leader: string;
  status: "Qualified for Finale" | "Waitlisted";
}

function parseCsv(csvText: string): ParsedTeam[] {
  const lines = csvText.split(/\r?\n/).filter((l) => l.trim().length > 0);
  if (lines.length < 2) return [];

  const results: ParsedTeam[] = [];
  let isWaitlistSection = false;

  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;

    const parts = line.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/).map((p) =>
      p.replace(/^"|"$/g, "").replace(/""/g, '"').trim()
    );

    const firstCol = sanitizeText(parts[0] || "");
    const secondCol = sanitizeText(parts[1] || "");

    const normalizedFirst = firstCol.toLowerCase().replace(/[^a-z0-9]/g, "");

    // Detect section separator for waitlist
    if (normalizedFirst === "waitlist" || normalizedFirst === "waitinglist") {
      isWaitlistSection = true;
      continue;
    }

    // Skip repeated header rows if any
    if (normalizedFirst === "teamname" || normalizedFirst === "team") {
      continue;
    }

    if (firstCol) {
      results.push({
        team: firstCol,
        leader: secondCol,
        status: isWaitlistSection ? "Waitlisted" : "Qualified for Finale",
      });
    }
  }
  return results;
}

function inferTrack(teamName: string): string {
  const t = teamName.toLowerCase();
  if (t.includes("security") || t.includes("defense") || t.includes("vortex") || t.includes("trojan") || t.includes("hackcore") || t.includes("citadel") || t.includes("soldier")) {
    return "Cyber-Physical Security & Defense";
  }
  if (t.includes("mobility") || t.includes("aero") || t.includes("fleet") || t.includes("fusion") || t.includes("electric")) {
    return "Smart Mobility & Aerospace";
  }
  if (t.includes("health") || t.includes("bio") || t.includes("vital") || t.includes("care") || t.includes("rehab")) {
    return "HealthTech & Bio-Wearables";
  }
  if (t.includes("agri") || t.includes("farm") || t.includes("vriddhi") || t.includes("rasam")) {
    return "AgriTech";
  }
  if (t.includes("ai") || t.includes("deep") || t.includes("byte") || t.includes("code") || t.includes("edge") || t.includes("algo") || t.includes("quant") || t.includes("embed") || t.includes("pi")) {
    return "Deep Tech & Edge AI";
  }
  return "Open Innovation";
}

export async function POST(request: NextRequest) {
  try {
    let sheetUrl = "https://docs.google.com/spreadsheets/d/18SaW_YjbLqOf1sWIHk6BSk7ke6DqmNKZ9Bxf7E7NWeg/edit?gid=0#gid=0";
    try {
      const body = await request.json();
      if (body?.sheetUrl && typeof body.sheetUrl === "string") {
        sheetUrl = body.sheetUrl.trim();
      }
    } catch {
      // Body is optional
    }

    const csvUrl = extractCsvUrl(sheetUrl);
    let parsed: ParsedTeam[] = [];

    try {
      const res = await fetch(csvUrl, {
        headers: { "User-Agent": "Mozilla/5.0" },
        cache: "no-store",
      });
      if (res.ok) {
        const text = await res.text();
        parsed = parseCsv(text);
      }
    } catch (fetchErr) {
      console.warn("Live fetch from Google Sheet failed, using initial dataset fallback:", fetchErr);
    }

    if (parsed.length === 0) {
      parsed = initialSubmissions.map((s) => ({
        team: s.team,
        leader: s.leader || "",
        status: s.status.toLowerCase().includes("waitlist") ? "Waitlisted" : "Qualified for Finale",
      }));
    }

    const currentSubmissions = await getSubmissions();
    const currentMap = new Map(currentSubmissions.map((s) => [s.team.toLowerCase(), s]));

    const newSubmissions: ProjectSubmission[] = parsed.map((item, index) => {
      const existing = currentMap.get(item.team.toLowerCase());
      return {
        id: existing?.id || (item.status === "Waitlisted" ? `w_${index + 1}` : `r1_${index + 1}`),
        team: item.team,
        leader: item.leader || existing?.leader || "",
        track: existing?.track || "",
        status: item.status || existing?.status || "Qualified for Finale",
        score: existing?.score || "",
      };
    });

    const saved = await replaceSubmissions(newSubmissions);

    return NextResponse.json({
      success: true,
      message: `Successfully synced ${saved.length} teams from Google Sheet.`,
      count: saved.length,
      submissions: saved,
      sheetUrl,
    });
  } catch (error) {
    console.error("Error syncing Google Sheet submissions:", error);
    return NextResponse.json(
      { error: "Failed to sync teams from Google Sheet." },
      { status: 500 }
    );
  }
}
