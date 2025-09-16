// src/app/components/InviteEditor/preview/TemplateSwitcher.tsx
"use client";
import dynamic from "next/dynamic";
import PreviewFrame from "./PreviewFrame";
import type { Config } from "../../features/invite/types";

const Botanica = dynamic(() => import("./variants/botanica/Botanica"));

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

  // (Opcional) normalizar aquí también
  const safeColors = {
    primary:   cfg.colors?.primary   ?? "#5A4FCF",
    secondary: cfg.colors?.secondary ?? "#ECEAFF",
    bg:        cfg.colors?.bg        ?? "#FFFFFF",
  };

  return (
    <PreviewFrame colors={safeColors} watermark={watermark}>
      <div style={commonStyle}>
        {cfg.variant === "botanica" && <Botanica cfg={cfg} />}
      </div>
    </PreviewFrame>
  );
}
