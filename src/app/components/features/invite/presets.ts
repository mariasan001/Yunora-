// features/invite/presets.ts
import type { EventType } from "@/lib/events";
import type { Config, Variant, FontKey, BaseInviteData } from "./types";

const VARIANT_DEFAULTS: Record<Variant, { font: FontKey; colors: Config["colors"] }> = {
  botanica:    { font: "serif",  colors: { primary: "#2F6A3A", secondary: "#8BBE92", bg: "#FFFFFF" } },
  tipografica: { font: "script", colors: { primary: "#7A64FF", secondary: "#FFD7A3", bg: "#FFFFFF" } },
  floral:      { font: "serif",  colors: { primary: "#8C5ACF", secondary: "#FFC766", bg: "#FFFFFF" } },
};

export const DEFAULT_DATA: BaseInviteData = {
  title: "Tu evento",
  date: "2025-12-31",
  time: "19:00",
  location: "Ciudad de México",
  rsvpLabel: "",                 // vacío para no usarlo en Botánica

  kicker: "¡NOS CASAMOS!",
  blessing: "CON LA BENDICIÓN DE DIOS Y NUESTROS PADRES",
  inviteLine: "TENEMOS EL HONOR DE INVITARLOS A CELEBRAR NUESTRA UNIÓN MATRIMONIAL",
  attire: "VESTIMENTA FORMAL",
  kidsAllowed: false,            // por defecto: “NO NIÑOS”
};

const FREE_VARIANTS_BY_EVENT: Record<EventType, Variant[]> = {
  boda: ["botanica", "tipografica", "floral"],
  xv: ["tipografica", "floral", "botanica"],
  bautizo: ["botanica", "floral", "tipografica"],
  cumple: ["tipografica", "floral", "botanica"],
  babyshower: ["botanica", "floral", "tipografica"],
  graduacion: ["tipografica", "botanica", "floral"],
  comunion: ["botanica", "floral", "tipografica"],
  aniversario: ["tipografica", "floral", "botanica"],
  despedida: ["tipografica", "botanica", "floral"],
  infantil: ["floral", "tipografica", "botanica"],
  civil: ["tipografica", "botanica", "floral"],
  pedida: ["floral", "botanica", "tipografica"],
  familiar: ["botanica", "floral", "tipografica"],
};

type EvOverride = { colors?: Partial<Config["colors"]>; data?: Partial<BaseInviteData> };

const EVENT_VARIANTS: Partial<Record<EventType, Partial<Record<Variant, EvOverride>>>> = {
  boda: {
    botanica: {
      data: {
        title: "Marcela & Andrés",
        inviteLine: "TENEMOS EL HONOR DE INVITARLOS A CELEBRAR NUESTRA UNIÓN MATRIMONIAL",
        attire: "VESTIMENTA FORMAL",
        kidsAllowed: false,
        date: "2025-08-18",
        time: "19:00",
        location: "Las Palmas Quintas, Monterrey",
      },
    },
  },
  // …otros eventos si quieres
};

export function getFreeVariants(eventType: EventType): Variant[] {
  return FREE_VARIANTS_BY_EVENT[eventType] ?? ["botanica", "tipografica", "floral"];
}

export function getVariantSeed(eventType: EventType, variant: Variant): Partial<Config> {
  const base = VARIANT_DEFAULTS[variant];
  const ev = EVENT_VARIANTS[eventType]?.[variant];
  return {
    variant,
    font: base.font,
    colors: { ...base.colors, ...(ev?.colors || {}) },
    data: { ...DEFAULT_DATA, ...(ev?.data || {}) },
  };
}
