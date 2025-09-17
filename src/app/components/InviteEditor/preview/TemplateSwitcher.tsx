"use client";
import dynamic from "next/dynamic";
import PreviewFrame from "./PreviewFrame";
import type { Config } from "../../features/invite/types";

const Botanica    = dynamic(() => import("./variants/botanica/Botanica"));
const Tipografica = dynamic(() => import("./variants/tipografica/Tipografica"));
const PlusAurora  = dynamic(() => import("./variants/plus/aurora/Aurora"));

export default function TemplateSwitcher({ cfg, fontCSS, watermark }: { cfg: Config; fontCSS: string; watermark: boolean; }) {
  const commonStyle = { fontFamily: fontCSS } as React.CSSProperties;
  const safeColors = {
    primary:   cfg.colors?.primary   ?? "#5A4FCF",
    secondary: cfg.colors?.secondary ?? "#ECEAFF",
    bg:        cfg.colors?.bg        ?? "#FFFFFF",
  };

  return (
    <PreviewFrame colors={safeColors} watermark={watermark}>
      <div style={commonStyle}>
        {cfg.variant === "botanica"    && <Botanica cfg={cfg} />}
        {cfg.variant === "tipografica" && <Tipografica cfg={cfg} />}
        
        {cfg.variant === "plusAurora"  && <PlusAurora cfg={cfg} />}
      </div>
    </PreviewFrame>
  );
}
