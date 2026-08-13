import fs from "fs";
import path from "path";
import os from "os";

const getDbDir = () => {
  if (process.env.VERCEL || process.env.NODE_ENV === "production") {
    return path.join(os.tmpdir(), "nirmaan_data");
  }
  return path.join(process.cwd(), "data");
};

const DB_DIR = getDbDir();
const USERS_FILE = path.join(DB_DIR, "users.json");
const REFRESH_TOKENS_FILE = path.join(DB_DIR, "refresh_tokens.json");

export type UserRecord = {
  id: string;
  email: string;
  name: string;
  role: "admin" | "user";
  passwordHash: string;
  emailVerified: boolean;
  verificationTokenHash?: string;
  verificationExpiresAt?: string;
  resetTokenHash?: string;
  resetTokenExpiresAt?: string;
  createdAt: string;
};

export type RefreshTokenRecord = {
  tokenId: string;
  userId: string;
  tokenHash: string;
  expiresAt: string;
  revoked: boolean;
};

function ensureDbFiles(): void {
  try {
    if (!fs.existsSync(DB_DIR)) {
      fs.mkdirSync(DB_DIR, { recursive: true });
    }
    if (!fs.existsSync(USERS_FILE)) {
      fs.writeFileSync(USERS_FILE, JSON.stringify([], null, 2), "utf-8");
    }
    if (!fs.existsSync(REFRESH_TOKENS_FILE)) {
      fs.writeFileSync(REFRESH_TOKENS_FILE, JSON.stringify([], null, 2), "utf-8");
    }
  } catch (error) {
    console.error("Error initializing auth database files:", error);
  }
}

export function getAllUsers(): UserRecord[] {
  try {
    ensureDbFiles();
    if (fs.existsSync(USERS_FILE)) {
      const data = fs.readFileSync(USERS_FILE, "utf-8");
      return JSON.parse(data);
    }
  } catch (error) {
    console.error("Error reading users DB:", error);
  }
  return [];
}

export function saveUsers(users: UserRecord[]): void {
  try {
    ensureDbFiles();
    fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2), "utf-8");
  } catch (error) {
    console.error("Error writing users DB:", error);
  }
}

export function findUserByEmail(email: string): UserRecord | null {
  const users = getAllUsers();
  return users.find((u) => u.email.toLowerCase() === email.toLowerCase()) || null;
}

export function findUserById(id: string): UserRecord | null {
  const users = getAllUsers();
  return users.find((u) => u.id === id) || null;
}

export function findUserByVerificationTokenHash(hashedToken: string): UserRecord | null {
  const users = getAllUsers();
  return users.find((u) => u.verificationTokenHash === hashedToken) || null;
}

export function findUserByResetTokenHash(hashedToken: string): UserRecord | null {
  const users = getAllUsers();
  return users.find((u) => u.resetTokenHash === hashedToken) || null;
}

export function createUser(userData: Omit<UserRecord, "id" | "createdAt" | "role"> & { role?: "admin" | "user" }): UserRecord {
  const users = getAllUsers();
  const newUser: UserRecord = {
    ...userData,
    role: userData.role || "user",
    id: `usr_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`,
    createdAt: new Date().toISOString(),
  };
  users.push(newUser);
  saveUsers(users);
  return newUser;
}

export function updateUser(id: string, updates: Partial<UserRecord>): UserRecord | null {
  const users = getAllUsers();
  const index = users.findIndex((u) => u.id === id);
  if (index === -1) return null;

  users[index] = { ...users[index], ...updates };
  saveUsers(users);
  return users[index];
}

// === Refresh Token Management for Rotation ===

function getAllRefreshTokens(): RefreshTokenRecord[] {
  try {
    ensureDbFiles();
    if (fs.existsSync(REFRESH_TOKENS_FILE)) {
      const data = fs.readFileSync(REFRESH_TOKENS_FILE, "utf-8");
      return JSON.parse(data);
    }
  } catch (error) {
    console.error("Error reading refresh tokens DB:", error);
  }
  return [];
}

function saveRefreshTokens(tokens: RefreshTokenRecord[]): void {
  try {
    ensureDbFiles();
    fs.writeFileSync(REFRESH_TOKENS_FILE, JSON.stringify(tokens, null, 2), "utf-8");
  } catch (error) {
    console.error("Error writing refresh tokens DB:", error);
  }
}

export function saveRefreshTokenRecord(record: RefreshTokenRecord): void {
  const tokens = getAllRefreshTokens();
  tokens.push(record);
  saveRefreshTokens(tokens);
}

export function findRefreshTokenRecord(tokenId: string): RefreshTokenRecord | null {
  const tokens = getAllRefreshTokens();
  return tokens.find((t) => t.tokenId === tokenId) || null;
}

export function revokeRefreshTokenRecord(tokenId: string): void {
  const tokens = getAllRefreshTokens();
  const index = tokens.findIndex((t) => t.tokenId === tokenId);
  if (index !== -1) {
    tokens[index].revoked = true;
    saveRefreshTokens(tokens);
  }
}

export function revokeAllUserRefreshTokens(userId: string): void {
  const tokens = getAllRefreshTokens();
  let updated = false;
  tokens.forEach((t) => {
    if (t.userId === userId && !t.revoked) {
      t.revoked = true;
      updated = true;
    }
  });
  if (updated) {
    saveRefreshTokens(tokens);
  }
}
