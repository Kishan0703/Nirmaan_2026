import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Secret for JWT verification
const AUTH_SECRET = process.env.AUTH_SECRET || "nirmaan_2026_super_strong_default_secret_key_32_bytes_min!";

// Edge-compatible Sliding Window Rate Limiter Store
type EdgeRateLimitRecord = { timestamps: number[] };
const edgeRateLimitStore = new Map<string, EdgeRateLimitRecord>();

/**
 * Edge Rate Limiter (60 requests per minute per IP for general API routes)
 */
function checkEdgeRateLimit(clientIp: string, limit: number = 60, windowMs: number = 60 * 1000): { success: boolean; retryAfter: number } {
  const now = Date.now();
  const windowStart = now - windowMs;

  let record = edgeRateLimitStore.get(clientIp);
  if (!record) {
    record = { timestamps: [] };
    edgeRateLimitStore.set(clientIp, record);
  }

  record.timestamps = record.timestamps.filter((ts) => ts > windowStart);

  if (record.timestamps.length >= limit) {
    const oldest = record.timestamps[0];
    const retryAfter = Math.ceil((oldest + windowMs - now) / 1000);
    return { success: false, retryAfter };
  }

  record.timestamps.push(now);
  return { success: true, retryAfter: 0 };
}

/**
 * Lightweight Edge-compatible JWT verification for middleware
 */
async function verifyJwtEdge(token: string): Promise<{ userId: string; email: string; role?: string; exp: number } | null> {
  try {
    const parts = token.split(".");
    if (parts.length !== 3) return null;

    const [headerB64, payloadB64, signatureB64] = parts;

    // Reject 'none' algorithm or non-HS256 algorithms
    const headerJson = JSON.parse(atob(headerB64.replace(/-/g, "+").replace(/_/g, "/")));
    if (!headerJson || typeof headerJson.alg !== "string" || headerJson.alg.toUpperCase() !== "HS256") {
      return null;
    }

    // Verify signature using Web Crypto API (Edge Runtime Compatible)
    const encoder = new TextEncoder();
    const key = await crypto.subtle.importKey(
      "raw",
      encoder.encode(AUTH_SECRET),
      { name: "HMAC", hash: "SHA-256" },
      false,
      ["verify"]
    );

    const signature = Uint8Array.from(atob(signatureB64.replace(/-/g, "+").replace(/_/g, "/")), (c) => c.charCodeAt(0));
    const data = encoder.encode(`${headerB64}.${payloadB64}`);

    const isValid = await crypto.subtle.verify("HMAC", key, signature, data);
    if (!isValid) return null;

    const payload = JSON.parse(atob(payloadB64.replace(/-/g, "+").replace(/_/g, "/")));
    const nowSeconds = Math.floor(Date.now() / 1000);

    if (payload.exp && payload.exp < nowSeconds) {
      return null; // Expired token
    }

    return payload;
  } catch (error) {
    return null;
  }
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const clientIp = request.headers.get("x-forwarded-for") || "unknown_ip";

  // 1. Global API Rate Limiting (Blocks bot flooding and automated scripts)
  if (pathname.startsWith("/api")) {
    const isAuthRoute = pathname.startsWith("/api/auth");
    // Standard API limit: 60 req/min; Auth route limit handled in specific endpoint handlers
    const limit = isAuthRoute ? 20 : 60;
    const rateCheck = checkEdgeRateLimit(`${pathname}:${clientIp}`, limit, 60 * 1000);

    if (!rateCheck.success) {
      return NextResponse.json(
        { error: "Too many requests. Global rate limit exceeded." },
        { status: 429, headers: { "Retry-After": String(rateCheck.retryAfter) } }
      );
    }
  }

  // 2. Protect Admin Pages and Admin API Endpoints at Routing Layer
  const isAdminPageRoute = pathname.startsWith("/admin");
  const isAdminApiRoute = pathname.startsWith("/api/admin");

  if (isAdminPageRoute || isAdminApiRoute) {
    const sessionToken = request.cookies.get("session_token")?.value;

    if (!sessionToken) {
      if (isAdminApiRoute) {
        return NextResponse.json({ error: "Authentication required." }, { status: 401 });
      }
      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set("redirect", pathname);
      return NextResponse.redirect(loginUrl);
    }

    const payload = await verifyJwtEdge(sessionToken);

    // Verify both token validity AND admin role at routing layer
    if (!payload || payload.role !== "admin") {
      if (isAdminApiRoute) {
        return NextResponse.json({ error: "Forbidden: Admin role required." }, { status: 403 });
      }
      return NextResponse.redirect(new URL("/?error=unauthorized", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/api/:path*"],
};
