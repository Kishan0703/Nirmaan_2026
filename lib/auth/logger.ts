export type LogLevel = "INFO" | "WARN" | "ERROR" | "SECURITY_ALERT";

export type AuditLogPayload = {
  timestamp: string;
  level: LogLevel;
  event: string;
  clientIp?: string;
  userId?: string;
  details?: Record<string, any>;
};

/**
 * Structured JSON Logger for SIEM & Log Aggregators (Datadog, CloudWatch, Loki)
 */
export function logStructuredEvent(
  level: LogLevel,
  event: string,
  details?: Record<string, any>,
  clientIp?: string,
  userId?: string
): void {
  const payload: AuditLogPayload = {
    timestamp: new Date().toISOString(),
    level,
    event,
    clientIp: clientIp || "unknown",
    userId: userId || "anonymous",
    details: details || {},
  };

  const jsonLog = JSON.stringify(payload);

  switch (level) {
    case "SECURITY_ALERT":
      console.warn(`[SECURITY_ALERT] ${jsonLog}`);
      break;
    case "ERROR":
      console.error(`[ERROR_LOG] ${jsonLog}`);
      break;
    case "WARN":
      console.warn(`[WARN_LOG] ${jsonLog}`);
      break;
    case "INFO":
    default:
      console.log(`[AUDIT_LOG] ${jsonLog}`);
      break;
  }
}

export function logAuthEvent(event: "LOGIN_SUCCESS" | "LOGIN_FAILED" | "REGISTER" | "PASSWORD_RESET" | "EMAIL_VERIFIED", userId?: string, clientIp?: string, details?: Record<string, any>) {
  logStructuredEvent("INFO", `AUTH_${event}`, details, clientIp, userId);
}

export function logSecurityAlert(alertType: "RATE_LIMIT_EXCEEDED" | "TOKEN_REUSE_DETECTED" | "UNAUTHORIZED_ADMIN_ATTEMPT" | "WEBHOOK_VERIFICATION_FAILED" | "MAGIC_BYTE_MISMATCH", clientIp?: string, details?: Record<string, any>) {
  logStructuredEvent("SECURITY_ALERT", alertType, details, clientIp);
}
