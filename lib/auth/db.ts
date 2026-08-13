import fs from "fs";
import path from "path";

export type UserRecord = {
  id: string;
  email: string;
  name: string;
  passwordHash: string;
  emailVerified: boolean;
  verificationTokenHash?: string;
  verificationExpiresAt?: string;
  resetTokenHash?: string;
  resetTokenExpiresAt?: string;
  createdAt: string;
};

const DB_DIR = path.join(process.cwd(), "data");
const USERS_FILE = path.join(DB_DIR, "users.json");

function ensureUsersDb(): void {
  try {
    if (!fs.existsSync(DB_DIR)) {
      fs.mkdirSync(DB_DIR, { recursive: true });
    }
    if (!fs.existsSync(USERS_FILE)) {
      fs.writeFileSync(USERS_FILE, JSON.stringify([], null, 2), "utf-8");
    }
  } catch (error) {
    console.error("Error creating users DB:", error);
  }
}

export function getAllUsers(): UserRecord[] {
  try {
    ensureUsersDb();
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
    ensureUsersDb();
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

export function createUser(userData: Omit<UserRecord, "id" | "createdAt">): UserRecord {
  const users = getAllUsers();
  const newUser: UserRecord = {
    ...userData,
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
