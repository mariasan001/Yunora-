// features/invite/types.ts

export type Variant = "botanica" | "tipografica" | "floral";

/* Fuentes disponibles por variante (la variante decide cuál usa) */
export const FONT_OPTIONS = [
  { key: "serif",  label: "Serif elegante",       css: "'Georgia','Times New Roman',serif" },
  { key: "sans",   label: "Sans moderna",         css: "Inter, system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif" },
  { key: "script", label: "Script (decorativa)",  css: "'Brush Script MT','Segoe Script',cursive" },
] as const;

export type FontKey = typeof FONT_OPTIONS[number]["key"];

/** Paleta usada por el marco de previsualización y la plantilla */
export type Colors = { primary: string; secondary: string; bg: string };

/** Campos comunes a TODAS las variantes */
export type BaseInviteData = {
  /** Nombres de los novios (o título principal del evento) */
  title: string;

  /** Fecha / hora / lugar */
  date: string;
  time: string;
  location: string;

  /** Texto de botón / RSVP (no todas las variantes lo usan) */
  rsvpLabel?: string;

  /** Copys superiores */
  kicker?: string;      // “¡NOS CASAMOS!”
  blessing?: string;    // “CON LA BENDICIÓN DE DIOS Y NUESTROS PADRES”

  /** Línea larga central (p.ej. “TENEMOS EL HONOR…”) */
  inviteLine?: string;

  /** Pie: vestimenta y niños */
  attire?: string;        // “VESTIMENTA FORMAL”
  kidsAllowed?: boolean;  // false => “NO NIÑOS”, true => “CON NIÑOS”
};

/* Para ahora, todas las variantes comparten el mismo shape */
export type BotanicaData    = BaseInviteData;
export type TipograficaData = BaseInviteData;
export type FloralData      = BaseInviteData;

export type VariantData = BotanicaData | TipograficaData | FloralData;

/** Configuración completa que viaja entre editor y preview */
export type Config = {
  variant: Variant;
  font: FontKey;
  colors: Colors;
  data: VariantData;
  type: import("@/lib/events").EventType;
};
