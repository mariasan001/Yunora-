// features/invite/presets.ts
import type { EventType } from "@/lib/events";
import type {
  Config,
  Variant,
  FontKey,
  BaseInviteData,
} from "./types";

/* ===========================
   Defaults por VARIANTE
   =========================== */
const VARIANT_DEFAULTS: Record<
  Variant,
  { font: FontKey; colors: Config["colors"] }
> = {
  botanica: {
    font: "serif",
    colors: { primary: "#2F6A3A", secondary: "#8BBE92", bg: "#FFFFFF" }, // <- color principal ok
  },
  tipografica: {
    font: "script",
    colors: { primary: "#7A64FF", secondary: "#FFD7A3", bg: "#FFFFFF" },
  },
  floral: {
    font: "serif",
    colors: { primary: "#8C5ACF", secondary: "#FFC766", bg: "#FFFFFF" },
  },
};

/* ===========================
   Variantes gratis por EVENTO
   (lo que mostramos como chips)
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
   Datos base (comunes a todas)
   =========================== */
export const DEFAULT_DATA: BaseInviteData = {
  title: "Tu evento",
  date: "2025-12-31",
  time: "19:00",
  location: "Ciudad de México",
  rsvpLabel: "Confirmar asistencia",
  message: "",
  subtitle: "", // lo usamos como “Vestimenta”, p.ej. “Formal — No niños”
};

/* ===========================
   Overrides por EVENTO + VARIANTE
   (solo lo que difiere del default)
   =========================== */
type EvOverride = {
  colors?: Partial<Config["colors"]>;
  data?: Partial<BaseInviteData>;
};

const EVENT_VARIANTS: Partial<
  Record<EventType, Partial<Record<Variant, EvOverride>>>
> = {
  /* -------- BODA -------- */
  boda: {
    botanica: {
      colors: { primary: "#2F6A3A", secondary: "#8BBE92", bg: "#FFFFFF" },
      data: {
        title: "Marcela & Andrés",
        message: "Tenemos el honor de invitarlos a celebrar nuestra unión.",
        date: "2025-08-18",
        time: "19:00",
        location: "Las Palmas Quintas, Monterrey",
        rsvpLabel: "Confirmar asistencia",
        subtitle: "Formal — No niños",
      },
    },
    tipografica: {
      data: {
        title: "Marcela & Andrés",
        message:
          "Junto a nuestras familias, los esperamos para celebrar.",
        date: "2025-08-18",
        time: "19:00",
        location: "Las Palmas Quintas, Monterrey",
        rsvpLabel: "Confirmar",
        subtitle: "Formal",
      },
    },
    floral: {
      colors: { primary: "#7D58C7", secondary: "#FFE0A1", bg: "#FFFFFF" },
      data: {
        title: "Marcela & Andrés",
        message: "El amor se celebra en familia.",
        date: "2025-08-18",
        time: "19:00",
        location: "Las Palmas Quintas, Monterrey",
        rsvpLabel: "RSVP",
        subtitle: "Formal — No niños",
      },
    },
  },

  /* -------- CUMPLE -------- */
  cumple: {
    tipografica: {
      colors: { primary: "#E06B5F", secondary: "#FFE08A", bg: "#FFFFFF" },
      data: {
        title: "Cumple de Fer",
        message: "¡Ven a festejar conmigo! Habrá pastel 🎂",
        date: "2025-07-22",
        time: "20:00",
        location: "Casa de Fer, CDMX",
        rsvpLabel: "Confirmar",
      },
    },
    botanica: {
      colors: { primary: "#2F8F83", secondary: "#B3E5DE", bg: "#FFFFFF" },
      data: {
        title: "Cumple de Fer",
        message: "Un brindis por un año más.",
        date: "2025-07-22",
        time: "20:00",
        location: "Casa de Fer, CDMX",
        rsvpLabel: "Asistiré",
      },
    },
    floral: {
      colors: { primary: "#F06489", secondary: "#FFDA7B", bg: "#FFFFFF" },
      data: {
        title: "Cumple de Fer",
        message: "Risas, música y buena vibra.",
        date: "2025-07-22",
        time: "20:00",
        location: "Casa de Fer, CDMX",
        rsvpLabel: "Voy",
      },
    },
  },

  /* -------- BAUTIZO -------- */
  bautizo: {
    botanica: {
      colors: { primary: "#5A8FDF", secondary: "#FFE6A9", bg: "#FFFFFF" },
      data: {
        title: "Bautizo de Mateo",
        message: "Nos dará alegría compartir este momento en familia.",
        date: "2025-06-08",
        time: "12:00",
        location: "Parroquia San José, GDL",
        rsvpLabel: "Asistiré",
      },
    },
  },

  // Puedes seguir agregando overrides para el resto de eventos cuando lo necesites.
};

/* ===========================
   API pública del módulo
   =========================== */

/** Variantes gratis disponibles para un evento */
export function getFreeVariants(eventType: EventType): Variant[] {
  return (
    FREE_VARIANTS_BY_EVENT[eventType] ?? ["botanica", "tipografica", "floral"]
  );
}

/** Seed (mezcla): defaults de la variante + overrides del evento */
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
    data: { ...DEFAULT_DATA, ...(ev?.data || {}) },
  };
}
