import { NextResponse } from "next/server";

/**
 * Centralized Safe Error Handler
 * Logs full stack traces & internal error details server-side,
 * while returning sanitized generic error messages to the client in production.
 */
export function handleServerError(error: unknown, contextMessage: string = "Internal Error"): NextResponse {
  // 1. Log full error stack trace server-side only
  if (error instanceof Error) {
    console.error(`[SERVER_LOG_ONLY] ${contextMessage}:`, {
      name: error.name,
      message: error.message,
      stack: error.stack,
    });
  } else {
    console.error(`[SERVER_LOG_ONLY] ${contextMessage}:`, error);
  }

  // 2. Return generic sanitized JSON response to client (zero stack trace leakage)
  return NextResponse.json(
    {
      error: "An unexpected internal server error occurred. Please try again later.",
      status: 500,
    },
    { status: 500 }
  );
}
