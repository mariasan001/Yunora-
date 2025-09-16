export function formatDate(iso: string) {
  if (!iso) return "";
  try {
    const d = new Date(iso);
    return d.toLocaleDateString("es-MX",{ day:"2-digit", month:"long", year:"numeric" });
  } catch { return iso; }
}
