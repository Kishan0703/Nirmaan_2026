/**
 * Utility for sanitizing external URLs to prevent DOM-based XSS (e.g. javascript: or data: URIs)
 */
export function sanitizeUrl(url?: string): string {
  if (!url || typeof url !== "string") return "#";
  const trimmed = url.trim();

  // Reject malicious URI schemes
  if (/^(javascript:|data:|vbscript:)/i.test(trimmed)) {
    return "#";
  }

  // Ensure valid HTTP/HTTPS or relative link
  if (!/^https?:\/\//i.test(trimmed) && !trimmed.startsWith("/") && !trimmed.startsWith("#")) {
    return `https://${trimmed}`;
  }

  return trimmed;
}

/**
 * Utility for sanitizing user text strings
 */
export function sanitizeText(text?: string): string {
  if (!text || typeof text !== "string") return "";
  return text.replace(/[<>]/g, "").trim();
}
