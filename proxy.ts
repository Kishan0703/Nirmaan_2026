import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getCorsHeaders, handleCorsPreflight } from "@/lib/auth/cors";

// Secret for JWT verification
const AUTH_SECRET = process.env.AUTH_SECRET || "nirmaan_2026_super_strong_default_secret_key_32_bytes_min!";

// Edge-compatible Sliding Window Rate Limiter Store
type EdgeRateLimitRecord = { timestamps: number[] };
const edgeRateLimitStore = new Map<string, EdgeRateLimitRecord>();

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

async function verifyJwtEdge(token: string): Promise<{ userId: string; email: string; role?: string; exp: number } | null> {
  try {
    const parts = token.split(".");
    if (parts.length !== 3) return null;

    const [headerB64, payloadB64, signatureB64] = parts;

    const headerJson = JSON.parse(atob(headerB64.replace(/-/g, "+").replace(/_/g, "/")));
    if (!headerJson || typeof headerJson.alg !== "string" || headerJson.alg.toUpperCase() !== "HS256") {
      return null;
    }

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
      return null;
    }

    return payload;
  } catch (error) {
    return null;
  }
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const origin = request.headers.get("origin");

  // 1. CORS Preflight OPTIONS Handling
  if (request.method === "OPTIONS" && pathname.startsWith("/api")) {
    return handleCorsPreflight(origin);
  }

  // 2. Global API Rate Limiting
  if (pathname.startsWith("/api")) {
    const clientIp = request.headers.get("x-forwarded-for") || "unknown_ip";
    const isAuthRoute = pathname.startsWith("/api/auth");
    const limit = isAuthRoute ? 20 : 60;
    const rateCheck = checkEdgeRateLimit(`${pathname}:${clientIp}`, limit, 60 * 1000);

    if (!rateCheck.success) {
      const corsHeaders = getCorsHeaders(origin);
      return NextResponse.json(
        { error: "Too many requests. Global rate limit exceeded." },
        { status: 429, headers: { ...corsHeaders, "Retry-After": String(rateCheck.retryAfter) } }
      );
    }
  }

  // 3. Admin Authorization Routing Protection
  const isAdminPageRoute = pathname.startsWith("/admin");
  const isAdminApiRoute = pathname.startsWith("/api/admin");

  if (isAdminPageRoute || isAdminApiRoute) {
    const sessionToken = request.cookies.get("session_token")?.value;

    if (!sessionToken) {
      if (isAdminApiRoute) {
        return NextResponse.json({ error: "Authentication required." }, { status: 401, headers: getCorsHeaders(origin) });
      }
      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set("redirect", pathname);
      return NextResponse.redirect(loginUrl);
    }

    const payload = await verifyJwtEdge(sessionToken);

    if (!payload || payload.role !== "admin") {
      if (isAdminApiRoute) {
        return NextResponse.json({ error: "Forbidden: Admin role required." }, { status: 403, headers: getCorsHeaders(origin) });
      }
      return NextResponse.redirect(new URL("/?error=unauthorized", request.url));
    }
  }

  // 4. Attach CORS Headers to all API responses
  const response = NextResponse.next();
  if (pathname.startsWith("/api")) {
    const corsHeaders = getCorsHeaders(origin);
    Object.entries(corsHeaders).forEach(([key, val]) => {
      response.headers.set(key, val);
    });
  }

  return response;
}

export const config = {
  matcher: ["/admin/:path*", "/api/:path*"],
};
