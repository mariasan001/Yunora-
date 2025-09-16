"use client";
import dynamic from "next/dynamic";
import PreviewFrame from "./PreviewFrame";
import { Config } from "../../features/invite/types";

/* Dynamic imports (cada uno trae su CSS Module solo al usarse) */
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

  return (
    <PreviewFrame colors={cfg.colors} watermark={watermark}>
      <div style={commonStyle}>
        {cfg.variant === "botanica" && <Botanica cfg={cfg} />}

      </div>
    </PreviewFrame>
  );
}
