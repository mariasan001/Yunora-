// features/invite/types.ts

/** Variantes de TODAS las capas (Gratis + Plus). */
export type Variant =
  | "botanica"
  | "tipografica"
  | "floral"
  // Plus
  | "plusAurora";

export const FONT_OPTIONS = [
  { key: "serif",  label: "Serif elegante",       css: "'Georgia','Times New Roman',serif" },
  { key: "sans",   label: "Sans moderna",         css: "Inter, system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif" },
  { key: "script", label: "Script (decorativa)",  css: "'Brush Script MT','Segoe Script',cursive" },
] as const;
export type FontKey = typeof FONT_OPTIONS[number]["key"];

/** Paleta */
export type Colors = { primary: string; secondary: string; bg: string };

/** Campos comunes (Gratis + Plus) */
export type BaseInviteData = {
  // principal
  title: string;

  // fecha / hora / lugar (genérico; en Plus además tendrás secciones)
  date: string;
  time: string;
  location: string;

  // RSVP (algunas variantes no lo muestran)
  rsvpLabel?: string;

  // copys superiores
  kicker?: string;     // “¡NOS CASAMOS!”
  blessing?: string;   // “CON LA BENDICIÓN…”

  // copy central
  inviteLine?: string; // “TENEMOS EL HONOR DE INVITARLOS…”

  // pie
  attire?: string;         // “VESTIMENTA FORMAL”
  kidsAllowed?: boolean;   // false => “NO NIÑOS”, true => “CON NIÑOS”

  /* ====== PLUS EXTRAS (opcionales) ====== */
  // Ceremonia
  ceremonyTitle?: string;     // “Ceremonia”
  ceremonyTime?: string;      // “18:00”
  ceremonyAddress?: string;   // dirección o texto
  // Recepción
  receptionTitle?: string;    // “Recepción”
  receptionTime?: string;
  receptionAddress?: string;
  // Itinerario
  itinerary?: { time?: string; label: string }[];
  // Padrinos / agradecimientos / menú
  padrinos?: string;
  gratitude?: string;
  menu?: string;              // texto libre
  // Cuenta regresiva
  showCountdown?: boolean;    // si true, usa date/time como destino
};

export type BotanicaData    = BaseInviteData;
export type TipograficaData = BaseInviteData;
export type FloralData      = BaseInviteData;
export type PlusAuroraData  = BaseInviteData;

export type VariantData =
  | BotanicaData
  | TipograficaData
  | FloralData
  | PlusAuroraData;

export type Config = {
  variant: Variant;
  font: FontKey;
  colors: Colors;
  data: VariantData;
  type: import("@/lib/events").EventType;
};
