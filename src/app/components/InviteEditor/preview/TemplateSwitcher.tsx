// src/app/components/InviteEditor/preview/TemplateSwitcher.tsx
"use client";

import dynamic from "next/dynamic";
import PreviewFrame from "./PreviewFrame";
import type { Config } from "../../features/invite/types";

/* Carga perezosa: cada variante trae su CSS Module */
const Botanica    = dynamic(() => import("./variants/botanica/Botanica"));
const Tipografica = dynamic(() => import("./variants/tipografica/Tipografica"));
const Floral      = dynamic(() => import("./variants/floral/Floral")); // <- comenta si aún no existe

export default function TemplateSwitcher({
  cfg,
  fontCSS,
  watermark,
}: {
  cfg: Config;
  fontCSS: string;
  watermark: boolean;
}) {
  const commonStyle = { fontFamily: fontCSS } as React.CSSProperties;

  // Normalización defensiva (evita hydration raros si llega algo undefined)
  const safeColors = {
    primary:   cfg.colors?.primary   ?? "#5A4FCF",
    secondary: cfg.colors?.secondary ?? "#ECEAFF",
    bg:        cfg.colors?.bg        ?? "#FFFFFF",
  };

  return (
    <PreviewFrame colors={safeColors} watermark={watermark}>
      <div style={commonStyle}>
        {cfg.variant === "botanica"    && <Botanica cfg={cfg} />}
        {cfg.variant === "tipografica" && <Tipografica cfg={cfg}  />}
        {cfg.variant === "floral"      && <Floral cfg={cfg}  />}
      </div>
    </PreviewFrame>
  );
}
