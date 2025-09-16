// Base64 URL-safe helpers

/** Codifica un objeto a base64url (seguro para querystrings) */
export function base64urlEncode(obj: unknown): string {
  const json = JSON.stringify(obj);
  const b64 =
    typeof window === "undefined"
      ? Buffer.from(json).toString("base64")
      : btoa(unescape(encodeURIComponent(json)));
  return b64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
}

/** Decodifica un base64url a objeto (si falla, retorna null) */
export function base64urlDecode<T = any>(s?: string): T | null {
  if (!s) return null;
  try {
    const b64 = s.replace(/-/g, "+").replace(/_/g, "/");
    const pad = b64.length % 4 ? 4 - (b64.length % 4) : 0;
    const b64p = b64 + (pad ? "=".repeat(pad) : "");
    const json =
      typeof window === "undefined"
        ? Buffer.from(b64p, "base64").toString("utf8")
        : decodeURIComponent(escape(atob(b64p)));
    return JSON.parse(json) as T;
  } catch {
    return null;
  }
}
