
import type { EventType } from "@/lib/events";
import type { Plan } from "@/lib/plans";
import { canUse } from "@/lib/plans";
import { Config, FontKey, Variant } from "../components/features/invite/types";
import { base64urlDecode } from "../components/features/utils/base64";
import TemplateSwitcher from "../components/InviteEditor/preview/TemplateSwitcher";

// evita que Next lo intente cachear como estático
export const dynamic = "force-dynamic";

type Props = { searchParams: { d?: string } };

// fuentes (igual que en el editor)
const FONT_CSS: Record<FontKey, string> = {
  serif: "'Georgia', 'Times New Roman', serif",
  sans: "Inter, system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif",
  script: "'Brush Script MT', 'Segoe Script', cursive",
};

const DEFAULT_DATA: Config["data"] = {
  title: "Tu evento",
  subtitle: "Celebración",
  message: "Personaliza tu mensaje aquí.",
  date: "2025-12-31",
  time: "19:00",
  location: "Ciudad de México",
  rsvpLabel: "Confirmar asistencia",
};

function inferFontFromVariant(v: Variant): FontKey {
  switch (v) {
    case "tipografica": return "script";
    case "botanica":
    case "floral":     return "serif";
  }
}

function mapTemplateToVariant(t?: string): Variant {
  // compatibilidad con enlaces viejos que enviaban t: "classic|minimal"
  if (t === "classic") return "botanica";
  if (t === "minimal") return "tipografica";
  return "botanica";
}

export default function PreviewPage({ searchParams }: Props) {
  const payload = base64urlDecode<any>(searchParams.d);

  // si no hay payload válido, mostramos un estado seguro
  if (!payload) {
    const cfgFallback: Config = {
      variant: "botanica",
      font: "serif",
      colors: { primary: "#5A4FCF", secondary: "#FFD166", bg: "#FFFFFF" },
      data: DEFAULT_DATA,
      type: "boda" as EventType,
    };
    return (
      <main style={{ padding: "2rem" }}>
        <TemplateSwitcher cfg={cfgFallback} fontCSS={FONT_CSS[cfgFallback.font]} watermark />
      </main>
    );
  }

  // compat: v (nuevo), t (antiguo)
  const variant: Variant = payload.v ?? mapTemplateToVariant(payload.t);
  const type: EventType = payload.y ?? "boda";
  const plan: Plan = payload.p ?? "free";

  const cfg: Config = {
    variant,
    font: payload.f ?? inferFontFromVariant(variant),
    colors: payload.c ?? { primary: "#5A4FCF", secondary: "#FFD166", bg: "#FFFFFF" },
    data: payload.d ?? DEFAULT_DATA,
    type,
  };

  const fontCSS = FONT_CSS[cfg.font];

  return (
    <main style={{ padding: "1.2rem" }}>
      <TemplateSwitcher
        cfg={cfg}
        fontCSS={fontCSS}
        watermark={!canUse("removeWatermark", plan)}
      />
    </main>
  );
}
