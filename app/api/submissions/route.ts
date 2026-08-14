import { NextResponse } from "next/server";
import { getSubmissions } from "@/lib/submissions-db";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  try {
    const list = await getSubmissions();
    return NextResponse.json({ success: true, submissions: list });
  } catch (error) {
    console.error("Error fetching submissions:", error);
    return NextResponse.json({ error: "Failed to load project submissions." }, { status: 500 });
  }
}
