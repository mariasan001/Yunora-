// features/invite/presets.ts
import type { EventType } from "@/lib/events";
import type { Config, Variant, FontKey, BaseInviteData, Colors } from "./types";
import type { Plan } from "@/lib/plans";

/* ============ Defaults por VARIANTE ============ */
const VARIANT_DEFAULTS: Record<Variant, { font: FontKey; colors: Colors }> = {
  // Gratis
  botanica:    { font: "serif",  colors: { primary: "#2F6A3A", secondary: "#8BBE92", bg: "#FFFFFF" } },
  tipografica: { font: "serif",  colors: { primary: "#131315", secondary: "#EDECF8", bg: "#FFFFFF" } },
  floral:      { font: "serif",  colors: { primary: "#2A1F1D", secondary: "#EED9C4", bg: "#FBF8F4" } },
  // Plus
  plusAurora:  { font: "sans",   colors: { primary: "#4E7DF2", secondary: "#E9EEFF", bg: "#FFFFFF" } },
};

/* ============ Defaults de DATA (comunes) ============ */
export const DEFAULT_DATA: BaseInviteData = {
  title: "Marcela & Andrés",
  date:  "2025-12-31",
  time:  "19:00",
  location: "Ciudad de México",
  rsvpLabel: "",

  kicker:   "¡NOS CASAMOS!",
  blessing: "CON LA BENDICIÓN DE DIOS Y NUESTROS PADRES",
  inviteLine: "TENEMOS EL HONOR DE INVITARLOS A CELEBRAR NUESTRA UNIÓN MATRIMONIAL",

  attire: "VESTIMENTA FORMAL",
  kidsAllowed: false,

  // PLUS EXTRAS (opcionales; vacíos por defecto)
  ceremonyTitle: "Ceremonia",
  ceremonyTime:  "",
  ceremonyAddress: "",
  receptionTitle: "Recepción",
  receptionTime:  "",
  receptionAddress: "",
  itinerary: [],
  padrinos: "",
  gratitude: "",
  menu: "",
  showCountdown: false,
};

/* ============ Variantes disponibles por EVENTO y PLAN ============ */
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

const PLUS_VARIANTS_BY_EVENT: Record<EventType, Variant[]> = {
  boda:        ["plusAurora"],
  xv:          ["plusAurora"],
  bautizo:     ["plusAurora"],
  cumple:      ["plusAurora"],
  babyshower:  ["plusAurora"],
  graduacion:  ["plusAurora"],
  comunion:    ["plusAurora"],
  aniversario: ["plusAurora"],
  despedida:   ["plusAurora"],
  infantil:    ["plusAurora"],
  civil:       ["plusAurora"],
  pedida:      ["plusAurora"],
  familiar:    ["plusAurora"],
};

/* ============ Overrides por EVENTO + VARIANTE (solo diferencias) ============ */
type EvOverride = { colors?: Partial<Colors>; data?: Partial<BaseInviteData> };

const EVENT_VARIANTS: Partial<Record<EventType, Partial<Record<Variant, EvOverride>>>> = {
  boda: {
    botanica: {
      data: {
        inviteLine: "TENEMOS EL HONOR DE INVITARLOS A CELEBRAR NUESTRA UNIÓN MATRIMONIAL",
        attire: "VESTIMENTA FORMAL",
        kidsAllowed: false,
      },
    },
    // Ejemplo Plus
    plusAurora: {
      data: {
        inviteLine: "Junto a nuestras familias, los esperamos para celebrar.",
        ceremonyTime: "18:00",
        ceremonyAddress: "Parroquia San José, Monterrey",
        receptionTime: "20:00",
        receptionAddress: "Las Palmas Quintas, Monterrey",
        itinerary: [
          { time: "18:00", label: "Ceremonia" },
          { time: "20:00", label: "Recepción" },
          { time: "21:30", label: "Primer baile" },
          { time: "22:00", label: "Brindis" },
        ],
        showCountdown: true,
      },
    },
  },
};

/* ============ API pública ============ */
export function getVariantsForPlan(eventType: EventType, plan: Plan): Variant[] {
  if (plan === "plus")    return PLUS_VARIANTS_BY_EVENT[eventType] ?? ["plusAurora"];
  if (plan === "premium") return PLUS_VARIANTS_BY_EVENT[eventType] ?? ["plusAurora"]; // por ahora igual que plus
  return FREE_VARIANTS_BY_EVENT[eventType] ?? ["botanica", "tipografica", "floral"];
}

export function getVariantSeed(eventType: EventType, variant: Variant): Partial<Config> {
  const base = VARIANT_DEFAULTS[variant];
  const ev   = EVENT_VARIANTS[eventType]?.[variant];
  return {
    variant,
    font:   base.font,
    colors: { ...base.colors, ...(ev?.colors || {}) },
    data:   { ...DEFAULT_DATA, ...(ev?.data   || {}) },
  };
}
