// src/lib/base64url.ts
export function encodeBase64UrlUtf8(obj: unknown): string {
  const json = typeof obj === "string" ? obj : JSON.stringify(obj);
  if (typeof window === "undefined") {
    // Node (SSR)
    return Buffer.from(json, "utf-8").toString("base64url");
  }
  // Browser (CSR)
  const b64 = btoa(unescape(encodeURIComponent(json)));
  return b64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
}

export function decodeBase64UrlUtf8<T = unknown>(b64u: string): T {
  // normaliza padding y caracteres
  const b64 = b64u.replace(/-/g, "+").replace(/_/g, "/");
  const padded = b64 + "===".slice((b64.length + 3) % 4);

  let json: string;
  if (typeof window === "undefined") {
    // Node (SSR)
    json = Buffer.from(padded, "base64").toString("utf-8");
  } else {
    json = decodeURIComponent(escape(atob(padded)));
  }
  try {
    return JSON.parse(json) as T;
  } catch {
    // por si el payload ya venía como string
    return json as unknown as T;
  }
}
