import { NextResponse } from "next/server";
import { verifyWebhookSignature } from "@/lib/auth/webhook";

export async function POST(req: Request) {
  try {
    const webhookSecret = process.env.WEBHOOK_SECRET;
    if (!webhookSecret || webhookSecret.length < 32) {
      console.error("WEBHOOK_SECRET is not configured or is too short.");
      return NextResponse.json({ error: "Webhook endpoint is not configured." }, { status: 503 });
    }

    const rawBody = await req.text();
    const signatureHeader = req.headers.get("x-webhook-signature") || req.headers.get("stripe-signature");

    // 1. Strict HMAC Signature & Timestamp Replay Protection
    const verification = verifyWebhookSignature(rawBody, signatureHeader, webhookSecret, 300); // 5 minute max age

    if (!verification.isValid) {
      console.warn(`SECURITY ALERT: Webhook validation failed. Reason: ${verification.reason}`);
      return NextResponse.json(
        { error: "Webhook verification failed.", details: verification.reason },
        { status: 401 }
      );
    }

    // 2. Safely Process Validated Webhook Payload
    const payload = JSON.parse(rawBody);
    console.log("Verified webhook received:", payload.event);

    return NextResponse.json({
      success: true,
      message: "Webhook processed successfully.",
      eventId: payload.id || `evt_${Date.now()}`,
    });
  } catch (error) {
    console.error("Webhook processing error:", error);
    return NextResponse.json({ error: "Internal server error during webhook processing." }, { status: 500 });
  }
}
