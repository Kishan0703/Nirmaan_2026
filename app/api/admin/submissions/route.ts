import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { saveSubmission, deleteSubmission } from "@/lib/submissions-db";
import { sanitizeText } from "@/lib/security-sanitize";

// Protected POST: Admin creates or updates a project submission
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, team, track, status, score } = body;

    const cleanTeam = sanitizeText(team);
    if (!cleanTeam) {
      return NextResponse.json({ error: "Team name is required." }, { status: 400 });
    }

    const cleanTrack = sanitizeText(track) || "General Innovation";
    const cleanStatus = sanitizeText(status) || "Under Review";
    const cleanScore = sanitizeText(String(score)) || "80";

    const submissionId = id && typeof id === "string" ? id : `sub_${Date.now()}`;

    const updatedList = await saveSubmission({
      id: submissionId,
      team: cleanTeam,
      track: cleanTrack,
      status: cleanStatus,
      score: cleanScore,
    });

    return NextResponse.json({
      success: true,
      message: "Submission saved successfully.",
      submissions: updatedList,
    });
  } catch (error) {
    console.error("Admin submission POST error:", error);
    return NextResponse.json({ error: "Failed to save submission." }, { status: 500 });
  }
}

// Protected DELETE: Admin deletes a project submission by ID
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Submission ID is required." }, { status: 400 });
    }

    const updatedList = await deleteSubmission(id);
    return NextResponse.json({
      success: true,
      message: "Submission deleted successfully.",
      submissions: updatedList,
    });
  } catch (error) {
    console.error("Admin submission DELETE error:", error);
    return NextResponse.json({ error: "Failed to delete submission." }, { status: 500 });
  }
}
