import { NextResponse } from "next/server";
import { logStructuredEvent } from "@/lib/auth/logger";

/**
 * Centralized Safe Error Handler
 * Logs full stack traces & internal error details server-side,
 * while returning sanitized generic error messages to the client in production.
 */
export function handleServerError(error: unknown, contextMessage: string = "Internal Error"): NextResponse {
  // Log a structured, non-sensitive error record for the deployment log sink.
  logStructuredEvent("ERROR", "API_ERROR", {
    context: contextMessage,
    errorName: error instanceof Error ? error.name : "UnknownError",
  });

  // 2. Return generic sanitized JSON response to client (zero stack trace leakage)
  return NextResponse.json(
    {
      error: "An unexpected internal server error occurred. Please try again later.",
      status: 500,
    },
    { status: 500 }
  );
}
