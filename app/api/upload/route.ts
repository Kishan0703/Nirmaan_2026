import { NextResponse } from "next/server";
import crypto from "crypto";
import path from "path";
import fs from "fs";
import { cookies } from "next/headers";
import { verifySessionToken } from "@/lib/auth/security";
import { findUserById } from "@/lib/auth/db";
import { checkRateLimit } from "@/lib/auth/rate-limit";

// Configuration limits
const MAX_FILE_SIZE_BYTES = 5 * 1024 * 1024; // Hard 5MB limit
const ALLOWED_MIME_TYPES = new Map<string, string>([
  ["image/jpeg", ".jpg"],
  ["image/png", ".png"],
  ["image/webp", ".webp"],
  ["application/pdf", ".pdf"],
]);

// Magic number signatures for strict server-side content verification
const MAGIC_NUMBERS: Record<string, string> = {
  "ffd8ff": "image/jpeg",
  "89504e47": "image/png",
  "52494646": "image/webp",
  "25504446": "application/pdf",
};

/**
 * Inspect file binary magic numbers (prevents extension spoofing / polyglot attacks)
 */
function verifyMagicBytes(buffer: Buffer): string | null {
  const hex = buffer.toString("hex", 0, 4);
  for (const [signature, mime] of Object.entries(MAGIC_NUMBERS)) {
    if (hex.toLowerCase().startsWith(signature)) {
      return mime;
    }
  }
  return null;
}

// Storage path: OUTSIDE web root directory to prevent direct execution
const STORAGE_DIR = path.join(process.cwd(), "storage", "uploads");

function ensureStorageDir(): void {
  if (!fs.existsSync(STORAGE_DIR)) {
    fs.mkdirSync(STORAGE_DIR, { recursive: true });
  }
}

export async function POST(req: Request) {
  try {
    const clientIp = req.headers.get("x-forwarded-for") || "unknown";

    // Rate Limiting: Max 10 uploads per hour per IP
    const rateLimit = checkRateLimit(`upload:${clientIp}`, 10, 60 * 60 * 1000);
    if (!rateLimit.success) {
      return NextResponse.json(
        { error: "Upload rate limit exceeded. Please try again later." },
        { status: 429, headers: { "Retry-After": String(rateLimit.retryAfterSeconds) } }
      );
    }

    // 1. Authentication Check
    const cookieStore = cookies();
    const sessionToken = cookieStore.get("session_token")?.value;
    const payload = sessionToken ? verifySessionToken(sessionToken) : null;

    if (!payload) {
      return NextResponse.json({ error: "Authentication required to upload files." }, { status: 401 });
    }

    const user = findUserById(payload.userId);
    if (!user) {
      return NextResponse.json({ error: "Invalid user session." }, { status: 401 });
    }

    // 2. Parse Multipart Form Data
    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No file provided." }, { status: 400 });
    }

    // 3. File Size Validation (Max 5MB)
    if (file.size > MAX_FILE_SIZE_BYTES) {
      return NextResponse.json({ error: "File size exceeds 5MB limit." }, { status: 400 });
    }

    // 4. MIME Type Whitelist Check
    const allowedExtension = ALLOWED_MIME_TYPES.get(file.type);
    if (!allowedExtension) {
      return NextResponse.json({ error: "Invalid file type. Only JPEG, PNG, WebP, and PDF are permitted." }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // 5. Binary Magic Number Verification (Prevents malicious file extension spoofing)
    const detectedMime = verifyMagicBytes(buffer);
    if (!detectedMime || detectedMime !== file.type) {
      return NextResponse.json({ error: "Security warning: File content signature mismatch detected." }, { status: 400 });
    }

    // 6. Path Traversal & Execution Defense (Cryptographically random filename + extension strip)
    // Original filename is completely discarded
    const safeUUID = crypto.randomBytes(16).toString("hex");
    const safeFilename = `${safeUUID}${allowedExtension}`;

    ensureStorageDir();
    const safePath = path.join(STORAGE_DIR, safeFilename);

    // Write file outside web root
    fs.writeFileSync(safePath, buffer);

    return NextResponse.json({
      success: true,
      message: "File uploaded successfully.",
      fileId: safeUUID,
    });
  } catch (error) {
    console.error("File upload error:", error);
    return NextResponse.json({ error: "Internal server error during upload." }, { status: 500 });
  }
}
