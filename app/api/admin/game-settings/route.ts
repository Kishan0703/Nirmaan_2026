import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { saveGameConfig } from "@/lib/game-config";
import { sanitizeText } from "@/lib/security-sanitize";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const gameDuration = Number.parseInt(String(body.gameDuration), 10);
    const pointsPerBug = Number.parseInt(String(body.pointsPerBug), 10);
    const spawnIntervalMs = Number.parseInt(String(body.spawnIntervalMs), 10);
    const bugLifetimeMs = Number.parseInt(String(body.bugLifetimeMs), 10);

    const updatedConfig = await saveGameConfig({
      gameDuration: Number.isFinite(gameDuration) && gameDuration > 0 ? gameDuration : 30,
      pointsPerBug: Number.isFinite(pointsPerBug) && pointsPerBug > 0 ? pointsPerBug : 10,
      spawnIntervalMs: Number.isFinite(spawnIntervalMs) && spawnIntervalMs >= 100 ? spawnIntervalMs : 700,
      bugLifetimeMs: Number.isFinite(bugLifetimeMs) && bugLifetimeMs >= 200 ? bugLifetimeMs : 2000,
      prizePoolTotal: sanitizeText(body.prizePoolTotal) || "₹8L",
      buildDurationHours: sanitizeText(body.buildDurationHours) || "24 hrs",
      builderCapacity: sanitizeText(body.builderCapacity) || "420",
      mentorsCount: sanitizeText(body.mentorsCount) || "18+",
      registrationsCount: sanitizeText(body.registrationsCount) || "1,240+",
      teamsFormedCount: sanitizeText(body.teamsFormedCount) || "310+",
      submissionsCount: sanitizeText(body.submissionsCount) || "85 drafts",
      judgesAssignedCount: sanitizeText(body.judgesAssignedCount) || "24",
    });

    return NextResponse.json({
      success: true,
      message: "Game parameters and statistics updated successfully.",
      config: updatedConfig,
    });
  } catch (error) {
    console.error("Error updating game settings:", error);
    return NextResponse.json({ error: "Failed to update game configuration." }, { status: 500 });
  }
}
