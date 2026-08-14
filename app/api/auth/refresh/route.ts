import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import {
  hashToken,
  tokenHashesEqual,
  createSessionToken,
  createRefreshToken,
} from "@/lib/auth/security";
import {
  findRefreshTokenRecord,
  revokeRefreshTokenRecord,
  revokeAllUserRefreshTokens,
  saveRefreshTokenRecord,
  findUserById,
} from "@/lib/auth/db";
import { logSecurityAlert, logStructuredEvent } from "@/lib/auth/logger";

export async function POST() {
  try {
    const cookieStore = await cookies();
    const rawRefreshToken = cookieStore.get("refresh_token")?.value;

    if (!rawRefreshToken) {
      return NextResponse.json({ error: "Refresh token required." }, { status: 401 });
    }

    const [tokenId, rawSecret] = rawRefreshToken.split(".");
    if (!tokenId || !rawSecret) {
      return NextResponse.json({ error: "Invalid refresh token format." }, { status: 401 });
    }

    const record = findRefreshTokenRecord(tokenId);
    if (!record) {
      return NextResponse.json({ error: "Refresh token not found." }, { status: 401 });
    }

    // Reuse Detection: If token is already revoked, an attacker or compromised client attempted reuse!
    if (record.revoked) {
      logSecurityAlert("TOKEN_REUSE_DETECTED", undefined, { userId: record.userId });
      revokeAllUserRefreshTokens(record.userId);
      
      const response = NextResponse.json({ error: "Security alert: Token reuse detected. All sessions revoked." }, { status: 401 });
      response.cookies.set("session_token", "", { maxAge: 0 });
      response.cookies.set("refresh_token", "", { maxAge: 0 });
      return response;
    }

    // Check expiration
    const refreshExpiresAt = Date.parse(record.expiresAt);
    if (!Number.isFinite(refreshExpiresAt) || refreshExpiresAt <= Date.now()) {
      revokeRefreshTokenRecord(tokenId);
      return NextResponse.json({ error: "Refresh token expired." }, { status: 401 });
    }

    // Validate hash match
    const hashedSecret = hashToken(rawSecret);
    if (!tokenHashesEqual(record.tokenHash, hashedSecret)) {
      revokeRefreshTokenRecord(tokenId);
      return NextResponse.json({ error: "Invalid refresh token secret." }, { status: 401 });
    }

    const user = findUserById(record.userId);
    if (!user || !user.emailVerified) {
      return NextResponse.json({ error: "User not found." }, { status: 401 });
    }

    // REFRESH TOKEN ROTATION:
    // 1. Revoke used refresh token
    revokeRefreshTokenRecord(tokenId);

    // 2. Issue new Access Token (15 mins) & new Refresh Token (7 days)
    const newAccessToken = createSessionToken({ userId: user.id, email: user.email, role: user.role }, 15 * 60);
    const { refreshToken: newRefreshToken, tokenId: newId, expiresAt: newExpiresAt } = createRefreshToken(user.id);
    const [, newSecret] = newRefreshToken.split(".");

    saveRefreshTokenRecord({
      tokenId: newId,
      userId: user.id,
      tokenHash: hashToken(newSecret),
      expiresAt: newExpiresAt,
      revoked: false,
    });

    const response = NextResponse.json({ success: true, message: "Token refreshed successfully." });

    // Set rotated HttpOnly cookies
    response.cookies.set("session_token", newAccessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 15 * 60,
      path: "/",
    });

    response.cookies.set("refresh_token", newRefreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60,
      path: "/",
    });

    return response;
  } catch (error) {
    logStructuredEvent("ERROR", "API_ERROR", { route: "auth/refresh", errorName: error instanceof Error ? error.name : "UnknownError" });
    return NextResponse.json({ error: "Internal server error." }, { status: 500 });
  }
}
