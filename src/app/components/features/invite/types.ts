// features/invite/types.ts
export type Variant = "botanica" | "tipografica" | "floral";

export const FONT_OPTIONS = [
  { key: "serif",  label: "Serif elegante",       css: "'Georgia', 'Times New Roman', serif" },
  { key: "sans",   label: "Sans moderna",         css: "Inter, system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif" },
  { key: "script", label: "Script (decorativa)",  css: "'Brush Script MT', 'Segoe Script', cursive" },
] as const;
export type FontKey = typeof FONT_OPTIONS[number]["key"];

/** Campos comunes a TODAS las variantes (los opcionales evitan errores en unions) */
export type BaseInviteData = {
  title: string;
  date: string;
  time: string;
  location: string;
  rsvpLabel: string;

  /** Línea larga tipo “Tenemos el honor…” */
  message?: string;

  /** Lo usamos como “Vestimenta” (p.ej. “Formal — No niños”) */
  subtitle?: string;
};

/** Si alguna variante necesita extras, extiende BaseInviteData */
export type BotanicaData    = BaseInviteData;
export type TipograficaData = BaseInviteData;
export type FloralData      = BaseInviteData;

export type VariantData = BotanicaData | TipograficaData | FloralData;

export type Config = {
  variant: Variant;
  font: FontKey;
  colors: { primary: string; secondary: string; bg: string };
  data: VariantData; // <- ahora SIEMPRE tiene message/subtitle (opcionales)
  type: import("@/lib/events").EventType;
};
