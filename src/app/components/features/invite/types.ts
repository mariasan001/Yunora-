export type Variant = "botanica" | "tipografica" | "floral";

export const FONT_OPTIONS = [
  { key: "serif",  label: "Serif elegante",       css: "'Georgia', 'Times New Roman', serif" },
  { key: "sans",   label: "Sans moderna",         css: "Inter, system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif" },
  { key: "script", label: "Script (decorativa)",  css: "'Brush Script MT', 'Segoe Script', cursive" },
] as const;
export type FontKey = typeof FONT_OPTIONS[number]["key"];

export type Config = {
  /* solo variante (sin classic/minimal) */
  variant: Variant;
  /* font bloqueada por variante (no se muestra en UI) */
  font: FontKey;

  colors: { primary: string; secondary: string; bg: string };
  data: {
    title: string; subtitle: string; message: string;
    date: string; time: string; location: string; rsvpLabel: string;
  };
  type: import("@/lib/events").EventType;
};
