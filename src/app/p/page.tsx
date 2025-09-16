// app/p/page.tsx
import TemplateSwitcher from "@/app/components/InviteEditor/preview/TemplateSwitcher";
import { DEFAULT_DATA } from "@/app/components/features/invite/presets";
import type { Config } from "@/app/components/features/invite/types";
import { decodeBase64UrlUtf8 } from "@/lib/ase64url";
import type { Plan } from "@/lib/plans";
import { canUse } from "@/lib/plans";

function normalizeConfig(rawIn: Partial<Config> | any): Config {
  const raw = rawIn || {};
  const dataIn = raw.data ?? raw.d ?? {};
  const colorsIn = raw.colors ?? raw.c ?? {};

  // Defaults deterministas (evita hydration mismatch)
  const data = {
    ...DEFAULT_DATA,
    ...dataIn,
  } as Config["data"];

  // Textos “templated” con fallback
  (data as any).kicker ??= "¡Nos casamos!";
  (data as any).blessing ??= "Con la bendición de Dios y nuestros padres";
  (data as any).inviteLine ??=
    "Tenemos el honor de invitarlos a celebrar nuestra unión matrimonial";
  (data as any).attire ??= "Vestimenta formal";
  if (typeof (data as any).kidsAllowed !== "boolean") (data as any).kidsAllowed = false;

  // Colores con fallback estable
  const colors: Config["colors"] = {
    primary: "#2F6A3A",
    secondary: "#8BBE92",
    bg: "#FFFFFF",
    ...colorsIn,
  };

  return {
    variant: (raw.variant ?? raw.v ?? "botanica") as Config["variant"],
    font: (raw.font ?? raw.f ?? "serif") as Config["font"],
    colors,
    data,
    type: (raw.type ?? raw.y ?? "boda") as Config["type"],
  };
}

export default function PreviewPage({
  searchParams,
}: {
  searchParams: { d?: string };
}) {
  // 1) Decodifica UTF-8 seguro (nada de atob)
  const raw = searchParams?.d ? decodeBase64UrlUtf8<Partial<Config> & { p?: Plan }>(searchParams.d) : {};

  // 2) Normaliza config para SSR/cliente
  const cfg = normalizeConfig(raw);

  // 3) Fuente efectiva (igual que en el editor)
  const fontCSS =
    cfg.font === "serif"
      ? "'Georgia','Times New Roman',serif"
      : cfg.font === "script"
      ? "'Brush Script MT','Segoe Script',cursive"
      : "Inter, system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif";

  // 4) Marca de agua según plan (si te mandaron `p` en el payload)
  const plan: Plan = (raw as any)?.p ?? "free";
  const watermark = !canUse("removeWatermark", plan);

  return (
    <main style={{ padding: "1rem" }}>
      <TemplateSwitcher cfg={cfg} fontCSS={fontCSS} watermark={watermark} />
    </main>
  );
}
