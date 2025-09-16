export function base64urlEncode(obj: object) {
  const s = JSON.stringify(obj);
  const b = typeof window === "undefined"
    ? Buffer.from(s).toString("base64")
    : btoa(unescape(encodeURIComponent(s)));
  return b.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
}
