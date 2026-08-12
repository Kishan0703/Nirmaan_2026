import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { getNeonMessages, saveNeonMessage, clearNeonTables, LobbyMessage } from "@/lib/neon";

export const dynamic = 'force-dynamic';

const dbRelativePath = process.env.COMMUNITY_DB_PATH || "data/messages.json";
const DB_PATH = path.join(process.cwd(), dbRelativePath);

const TEAM_MEMBERS_DATABASE = [
  "anmol narayan", "anmol",
  "amey vikram singh", "amey",
  "dheeksha n", "dheeksha",
  "kishan mn", "kishan m n", "kishan m", "kishan kumar", "kishan",
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
  "saurabh kumar", "saurabh",
  "sonika k", "sonika",
  "mansi kalgudi", "mansi",
  "kanishk upadhyay", "kanishk",
  "ritik",
  "harshit raj", "harshit",
  "parth paliwal", "parth",
  "ravindra a", "ravindra",
  "vanshika biswal", "vanshika",
  "namratha r bagade", "namratha",
  "ayush kumar", "ayush",
  "sisir raj", "sisir",
  "eklavya agarwal", "eklavya",
  "sajja chaulagain", "sajja",
  "shlesha singh thakuri", "shlesha",
  "sarjath", "prateek mitra", "prateek",
  "nirmaan organizers", "organizer", "admin", "lead", "mentor"
];

function readDB(): LobbyMessage[] {
  try {
    if (!fs.existsSync(DB_PATH)) {
      const initial: LobbyMessage[] = [];
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

function writeDB(messages: LobbyMessage[]) {
  try {
    fs.mkdirSync(path.dirname(DB_PATH), { recursive: true });
    fs.writeFileSync(DB_PATH, JSON.stringify(messages, null, 2), "utf-8");
  } catch (err) {
    console.error("Failed to write to local DB:", err);
  }
}

export async function GET() {
  if (process.env.DATABASE_URL) {
    const neonMsgs = await getNeonMessages();
    if (neonMsgs) {
      return NextResponse.json({ success: true, messages: neonMsgs });
    }
  }

  const messages = readDB();
  return NextResponse.json({ success: true, messages });
}

export async function DELETE() {
  writeDB([]);
  if (process.env.DATABASE_URL) {
    await clearNeonTables();
  }
  return NextResponse.json({ success: true, messages: [] });
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

    // Strict server-side verification against TEAM_MEMBERS_DATABASE
    const isTeamMember = TEAM_MEMBERS_DATABASE.some((teamName) => {
      if (!nameLower) return false;
      return nameLower === teamName || (nameLower.length >= 3 && (nameLower.includes(teamName) || teamName.includes(nameLower)));
    });

    const currentTime = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    
    // Only verified roster members can post ANNOUNCEMENT / REPLY. Everyone else is QUERY.
    const msgType = isTeamMember ? "ANNOUNCEMENT" : "QUERY";

    const newMsg: LobbyMessage = {
      id: `msg-${Date.now()}`,
      sender: nameTrimmed,
      type: msgType,
      text: text.trim(),
      time: currentTime,
    };

    let autoReceipt: LobbyMessage | null = null;
    if (!isTeamMember && msgType === "QUERY") {
      autoReceipt = {
        id: `bot-${Date.now() + 1}`,
        sender: "Nirmaan Organizers",
        type: "REPLY",
        text: `Thanks @${nameTrimmed}! Your question has been posted to the Lobby Q&A stream. Organizers will broadcast an answer shortly! ⚡`,
        time: currentTime,
      };
    }

    if (process.env.DATABASE_URL) {
      const saved1 = await saveNeonMessage(newMsg);
      if (saved1) {
        if (autoReceipt) {
          await saveNeonMessage(autoReceipt);
        }
        const updatedNeonMsgs = (await getNeonMessages()) || [];
        return NextResponse.json({ success: true, messages: updatedNeonMsgs });
      }
    }

    // Local fallback if DATABASE_URL is not set or Neon query failed
    const messages = readDB();
    messages.push(newMsg);
    if (autoReceipt) {
      messages.push(autoReceipt);
    }
    writeDB(messages);

    return NextResponse.json({ success: true, messages });
  } catch (error) {
    console.error("Messages POST error:", error);
    return NextResponse.json({ success: false, error: "Server error" }, { status: 500 });
  }
}
