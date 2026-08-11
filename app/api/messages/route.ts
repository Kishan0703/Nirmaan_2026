import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export const dynamic = 'force-dynamic';

const dbRelativePath = process.env.COMMUNITY_DB_PATH || "data/messages.json";
const DB_PATH = path.join(process.cwd(), dbRelativePath);

const TEAM_MEMBERS_DATABASE = [
  "anmol narayan", "anmol",
  "dheeksha n", "dheeksha",
  "kishan m", "kishan kumar", "kishan",
  "shashikiran b s", "shashikiran", "shashi",
  "gaurav nayak k", "gaurav nayak", "gaurav",
  "arnav paniya", "arnav",
  "swapnil biswas", "swapnil",
  "sakshi sanjeev jadhav", "sakshi jadhav", "sakshi",
  "archisha gupta", "archisha",
  "madhusudhan c n", "madhusudhan",
  "lakshaya garg", "lakshaya",
  "alok verma", "alok",
  "rithika shetty", "rithika",
  "likitha s", "likitha",
  "sai amrutha as", "sai amrutha", "amrutha",
  "sneha mudgal", "sneha",
  "nirmaan organizers", "organizer", "admin", "lead", "mentor"
];

function readDB() {
  try {
    if (!fs.existsSync(DB_PATH)) {
      const initial = [
        {
          id: "msg-welcome",
          sender: "Nirmaan Organizers",
          type: "REPLY",
          text: "Welcome to the NIRMAAN 2026 Community!",
          time: "10:00 AM"
        }
      ];
      fs.mkdirSync(path.dirname(DB_PATH), { recursive: true });
      fs.writeFileSync(DB_PATH, JSON.stringify(initial, null, 2), "utf-8");
      return initial;
    }
    const data = fs.readFileSync(DB_PATH, "utf-8");
    return JSON.parse(data);
  } catch {
    return [];
  }
}

function writeDB(messages: any[]) {
  try {
    fs.mkdirSync(path.dirname(DB_PATH), { recursive: true });
    fs.writeFileSync(DB_PATH, JSON.stringify(messages, null, 2), "utf-8");
  } catch (err) {
    console.error("Failed to write to DB:", err);
  }
}

export async function GET() {
  const messages = readDB();
  return NextResponse.json({ success: true, messages });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { sender, text } = body;

    if (!text || !text.trim()) {
      return NextResponse.json({ success: false, error: "Text is required" }, { status: 400 });
    }

    const nameTrimmed = (sender || "Builder").trim();
    const nameLower = nameTrimmed.toLowerCase();

    // Database check for team member
    const isTeamMember = TEAM_MEMBERS_DATABASE.some((teamName) => {
      if (!nameLower) return false;
      return nameLower === teamName || (nameLower.length >= 3 && (nameLower.includes(teamName) || teamName.includes(nameLower)));
    });

    const currentTime = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    const msgType = isTeamMember ? "REPLY" : "QUERY";

    const newMsg = {
      id: `msg-${Date.now()}`,
      sender: nameTrimmed,
      type: msgType,
      text: text.trim(),
      time: currentTime,
    };

    const messages = readDB();
    messages.push(newMsg);

    // If query from non-team member, append receipt from Organizers
    if (!isTeamMember) {
      const autoReceipt = {
        id: `bot-${Date.now()}`,
        sender: "Nirmaan Organizers",
        type: "REPLY",
        text: `Thanks @${nameTrimmed}! Your message has been logged to the lobby floor. Organizers will respond shortly! 🚀`,
        time: currentTime,
      };
      messages.push(autoReceipt);
    }

    writeDB(messages);

    return NextResponse.json({ success: true, messages });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Server error" }, { status: 500 });
  }
}
