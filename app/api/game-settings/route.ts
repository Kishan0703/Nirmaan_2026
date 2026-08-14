import { NextResponse } from "next/server";
import { getGameConfig } from "@/lib/game-config";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  try {
    const config = await getGameConfig();
    return NextResponse.json({ success: true, config });
  } catch (error) {
    console.error("Error fetching game config:", error);
    return NextResponse.json({ error: "Failed to load game config." }, { status: 500 });
  }
}
