 // features/invite/presets.ts
import type { EventType } from "@/lib/events";
import type {
  Config,
  Variant,
  FontKey,
  BaseInviteData,
  Colors,
} from "./types";

/* ===========================
   Defaults por VARIANTE
   =========================== */
const VARIANT_DEFAULTS: Record<Variant, { font: FontKey; colors: Colors }> = {
  botanica: {
    font: "serif",
    colors: { primary: "#232323", secondary: "#8BBE92", bg: "#FFFFFF" },
  },
  tipografica: {
    font: "script",
    colors: { primary: "#232323", secondary: "#FFD7A3", bg: "#FFFFFF" },
  },
  floral: {
    font: "serif",
    colors: { primary: "#232323", secondary: "#FFC766", bg: "#FFFFFF" },
  },
};

/* ===========================
   Datos base (comunes a todas)
   =========================== */
export const DEFAULT_DATA: BaseInviteData = {
  title: "Tu evento",
  date: "2025-12-31",
  time: "19:00",
  location: "Ciudad de México",

  // RSVP opcional (Botánica no lo usa)
  rsvpLabel: "",

  // copys superiores
  kicker: "¡NOS CASAMOS!",
  blessing: "CON LA BENDICIÓN DE DIOS Y NUESTROS PADRES",

  // línea central
  inviteLine:
    "TENEMOS EL HONOR DE INVITARLOS A CELEBRAR NUESTRA UNIÓN MATRIMONIAL",

  // pie
  attire: "VESTIMENTA FORMAL",
  kidsAllowed: false, // false => “NO NIÑOS”
};

/* ===========================
   Variantes gratis por EVENTO (chips)
   =========================== */
const FREE_VARIANTS_BY_EVENT: Record<EventType, Variant[]> = {
  boda:        ["botanica", "tipografica", "floral"],
  xv:          ["tipografica", "floral", "botanica"],
  bautizo:     ["botanica", "floral", "tipografica"],
  cumple:      ["tipografica", "floral", "botanica"],
  babyshower:  ["botanica", "floral", "tipografica"],
  graduacion:  ["tipografica", "botanica", "floral"],
  comunion:    ["botanica", "floral", "tipografica"],
  aniversario: ["tipografica", "floral", "botanica"],
  despedida:   ["tipografica", "botanica", "floral"],
  infantil:    ["floral", "tipografica", "botanica"],
  civil:       ["tipografica", "botanica", "floral"],
  pedida:      ["floral", "botanica", "tipografica"],
  familiar:    ["botanica", "floral", "tipografica"],
};

/* ===========================
   Overrides por EVENTO + VARIANTE
   (solo diferencias vs DEFAULT_DATA)
   =========================== */
type EvOverride = {
  colors?: Partial<Colors>;
  data?: Partial<BaseInviteData>;
};

const EVENT_VARIANTS: Partial<
  Record<EventType, Partial<Record<Variant, EvOverride>>>
> = {
  /* -------- BODA -------- */
  boda: {
    botanica: {
      colors: { primary: "#232323", secondary: "#8BBE92", bg: "#FFFFFF" },
      data: {
        title: "Marcela & Andrés",
        date: "2025-08-18",
        time: "19:00",
        location: "Las Palmas Quintas, Monterrey",
        inviteLine:
          "TENEMOS EL HONOR DE INVITARLOS A CELEBRAR NUESTRA UNIÓN MATRIMONIAL",
        attire: "VESTIMENTA FORMAL",
        kidsAllowed: false,
      },
    },
    tipografica: {
      data: {
        title: "Marcela & Andrés",
        inviteLine:
          "Junto a nuestras familias, los esperamos para celebrar.",
        date: "2025-08-18",
        time: "19:00",
        location: "Las Palmas Quintas, Monterrey",
        attire: "FORMAL",
      },
    },
    floral: {
      colors: { primary: "#232323", secondary: "#FFE0A1", bg: "#FFFFFF" },
      data: {
        title: "Marcela & Andrés",
        inviteLine: "El amor se celebra en familia.",
        date: "2025-08-18",
        time: "19:00",
        location: "Las Palmas Quintas, Monterrey",
        attire: "FORMAL — NO NIÑOS",
        kidsAllowed: false,
      },
    },
  },

  /* -------- EJEMPLOS EXTRA (añade cuando los necesites) -------- */
  // cumple: { ... },
  // bautizo: { ... },
};

/* ===========================
   API pública
   =========================== */
export function getFreeVariants(eventType: EventType): Variant[] {
  return FREE_VARIANTS_BY_EVENT[eventType] ?? ["botanica", "tipografica", "floral"];
}

export function getVariantSeed(
  eventType: EventType,
  variant: Variant
): Partial<Config> {
  const base = VARIANT_DEFAULTS[variant];
  const ev = EVENT_VARIANTS[eventType]?.[variant];

  return {
    variant,
    font: base.font,
    colors: { ...base.colors, ...(ev?.colors || {}) },
    data:   { ...DEFAULT_DATA, ...(ev?.data   || {}) },
  };
}
