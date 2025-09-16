import type { Config } from "./types";
import type { EventType } from "@/lib/events";
import type { Variant, FontKey } from "./types";

/* Defaults base por plantilla (colores + fuente) */
const VARIANT_DEFAULTS: Record<Variant, { font: FontKey; colors: Config["colors"] }> = {
  botanica:    { font: "serif",  colors: { primary: "#2F6A3A", secondary: "#8BBE92", bg: "#FFFFFF" } },
  tipografica: { font: "script", colors: { primary: "#7A64FF", secondary: "#FFD7A3", bg: "#FFFFFF" } },
  floral:      { font: "serif",  colors: { primary: "#8C5ACF", secondary: "#FFC766", bg: "#FFFFFF" } },
};

/* Variantes gratuitas DISPONIBLES por evento (sin thumbnails, solo chips) */
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

/* Overrides de textos/colores por evento + plantilla (solo lo que cambia) */
const EVENT_VARIANTS: Partial<Record<EventType, Partial<Record<Variant, Partial<Config>>>>> = {
  boda: {
    botanica: {
      colors: { primary: "#2F6A3A", secondary: "#8BBE92", bg: "#FFFFFF" },
      data: {
        title: "Marcela & Andrés", subtitle: "Boda",
        message: "Tenemos el honor de invitarlos a celebrar nuestra unión.",
        date: "2025-08-18", time: "19:00",
        location: "Las Palmas Quintas, Monterrey", rsvpLabel: "Confirmar asistencia",
      },
    },
    tipografica: {
      data: {
        title: "Marcela & Andrés", subtitle: "Boda",
        message: "Junto a nuestras familias, los esperamos para celebrar.",
        date: "2025-08-18", time: "19:00",
        location: "Las Palmas Quintas, Monterrey", rsvpLabel: "Confirmar",
      },
    },
    floral: {
      colors: { primary: "#7D58C7", secondary: "#FFE0A1", bg: "#FFFFFF" },
      data: {
        title: "Marcela & Andrés", subtitle: "Boda",
        message: "El amor se celebra en familia.",
        date: "2025-08-18", time: "19:00",
        location: "Las Palmas Quintas, Monterrey", rsvpLabel: "RSVP",
      },
    },
  },

  cumple: {
    tipografica: {
      colors: { primary: "#E06B5F", secondary: "#FFE08A", bg: "#FFFFFF" },
      data: {
        title: "Cumple de Fer", subtitle: "Cumpleaños",
        message: "¡Ven a festejar conmigo! Habrá pastel 🎂",
        date: "2025-07-22", time: "20:00",
        location: "Casa de Fer, CDMX", rsvpLabel: "Confirmar",
      },
    },
    botanica: {
      colors: { primary: "#2F8F83", secondary: "#B3E5DE", bg: "#FFFFFF" },
      data: {
        title: "Cumple de Fer", subtitle: "Cumpleaños",
        message: "Un brindis por un año más.",
        date: "2025-07-22", time: "20:00",
        location: "Casa de Fer, CDMX", rsvpLabel: "Asistiré",
      },
    },
    floral: {
      colors: { primary: "#F06489", secondary: "#FFDA7B", bg: "#FFFFFF" },
      data: {
        title: "Cumple de Fer", subtitle: "Cumpleaños",
        message: "Risas, música y buena vibra.",
        date: "2025-07-22", time: "20:00",
        location: "Casa de Fer, CDMX", rsvpLabel: "Voy",
      },
    },
  },

  bautizo: {
    botanica: {
      colors: { primary: "#5A8FDF", secondary: "#FFE6A9", bg: "#FFFFFF" },
      data: {
        title: "Bautizo de Mateo", subtitle: "Bautizo",
        message: "Nos dará alegría compartir este momento en familia.",
        date: "2025-06-08", time: "12:00",
        location: "Parroquia San José, GDL", rsvpLabel: "Asistiré",
      },
    },
  },
  // …puedes seguir completando overrides para el resto de eventos.
};

const DEFAULT_DATA: Config["data"] = {
  title: "Tu evento", subtitle: "Celebración", message: "Personaliza tu mensaje aquí.",
  date: "2025-12-31", time: "19:00", location: "Ciudad de México", rsvpLabel: "Confirmar asistencia",
};

/** Variantes gratis para un evento */
export function getFreeVariants(eventType: EventType): Variant[] {
  return FREE_VARIANTS_BY_EVENT[eventType] ?? ["botanica", "tipografica", "floral"];
}

/** Seed = defaults de la plantilla + overrides del evento */
export function getVariantSeed(eventType: EventType, variant: Variant): Partial<Config> {
  const base = VARIANT_DEFAULTS[variant];
  const ev = EVENT_VARIANTS[eventType]?.[variant] ?? {};
  return {
    variant,
    font: base.font,
    colors: { ...base.colors, ...(ev.colors || {}) },
    data: { ...DEFAULT_DATA, ...(ev.data || {}) },
  };
}
