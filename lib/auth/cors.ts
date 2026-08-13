import { NextResponse } from "next/server";

// Explicit Whitelist of Allowed Domains (No wildcard *)
const ALLOWED_ORIGINS = new Set([
  (process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000").replace(/\/$/, ""),
  "https://nirmaan2026.com",
  "https://www.nirmaan2026.com",
]);

/**
 * Validate request origin against explicit whitelist
 */
export function getCorsHeaders(requestOrigin?: string | null): Record<string, string> {
  const origin = requestOrigin?.trim() || "";

  const isAllowed = ALLOWED_ORIGINS.has(origin) || (process.env.NODE_ENV !== "production" && origin.startsWith("http://localhost:"));

  const headers: Record<string, string> = {
    // Explicit Origin match - NEVER wildcard '*'
    "Access-Control-Allow-Origin": isAllowed ? origin : (process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"),
    "Access-Control-Allow-Methods": "GET, POST, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Requested-With",
    "Access-Control-Max-Age": "86400", // 24 Hours preflight cache
  };

  // Only allow credentials with explicit non-wildcard origins
  if (isAllowed && origin) {
    headers["Access-Control-Allow-Credentials"] = "true";
  }

  return headers;
}

/**
 * Handle HTTP OPTIONS Preflight requests cleanly
 */
export function handleCorsPreflight(requestOrigin?: string | null): NextResponse {
  const headers = getCorsHeaders(requestOrigin);
  return new NextResponse(null, { status: 204, headers });
}
