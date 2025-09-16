// features/invite/types.ts
export type Variant = "botanica" | "tipografica" | "floral";

export const FONT_OPTIONS = [
  { key: "serif",  label: "Serif elegante",       css: "'Georgia', 'Times New Roman', serif" },
  { key: "sans",   label: "Sans moderna",         css: "Inter, system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif" },
  { key: "script", label: "Script (decorativa)",  css: "'Brush Script MT', 'Segoe Script', cursive" },
] as const;
export type FontKey = typeof FONT_OPTIONS[number]["key"];

/** Campos comunes a todas las variantes */
export type BaseInviteData = {
  /** Nombres de los novios */
  title: string;

  /** Fecha/hora/lugar */
  date: string;
  time: string;
  location: string;

  /** RSVP (puede estar vacío si la variante no lo usa) */
  rsvpLabel: string;

  /** Top lines */
  kicker?: string;        // “¡NOS CASAMOS!”
  blessing?: string;      // “CON LA BENDICIÓN DE DIOS Y NUESTROS PADRES”

  /** Línea de invitación central (la larga) */
  inviteLine?: string;    // “TENEMOS EL HONOR DE INVITARLOS…”

  /** Vestimenta y niños */
  attire?: string;        // “VESTIMENTA FORMAL”
  kidsAllowed?: boolean;  // false => “NO NIÑOS”, true => “CON NIÑOS”
};

export type BotanicaData    = BaseInviteData;
export type TipograficaData = BaseInviteData;
export type FloralData      = BaseInviteData;

export type VariantData = BotanicaData | TipograficaData | FloralData;

export type Config = {
  variant: Variant;
  font: FontKey;
  colors: { primary: string; secondary: string; bg: string };
  data: VariantData;
  type: import("@/lib/events").EventType;
};
