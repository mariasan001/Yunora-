// src/app/components/InviteEditor/preview/variants/tipografica/Tipografica.tsx
"use client";

import { Bodoni_Moda, Cormorant_Garamond } from "next/font/google";
import type { Config } from "@/app/components/features/invite/types";
import s from "./Tipografica.module.css";

const didone = Bodoni_Moda({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-didone",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400","500","600"],
  style: ["normal","italic"],
  variable: "--font-text",
  display: "swap",
});

export default function Tipografica({ cfg }: { cfg: Config }) {
  const { left, right } = splitNames(cfg.data.title || "Olivia & Tom");
  const date = fmtDate(cfg.data.date); // “17 AGO 25”
  const time = (cfg.data.time || "").slice(0,5);
  const ceremony = time ? `CEREMONIA ${time} H` : "";

  return (
    <div
      className={`${s.root} ${didone.variable} ${cormorant.variable}`}
      style={
        {
          "--primary": cfg.colors.primary,
          "--paper": "url('/textures/paper-fine.jpg')",
        } as React.CSSProperties
      }
    >
      {/* Nombres */}
      <div className={s.names}>
        <span className={s.name}>{left}</span>
        <span className={s.and}>{inferConj(cfg.data.title)}</span>
        <span className={s.name}>{right}</span>
      </div>

      {/* Línea de invitación (mejor kerning) */}
      <p className={s.inviteCopy}>
        {cfg.data.inviteLine ||
          "SOLICITAN EL HONOR DE SU COMPAÑÍA PARA CELEBRAR SU BODA."}
      </p>

      {/* Fecha */}
      <p className={s.date}>{date}</p>

      {/* Lugar / ceremonia */}
      <div className={s.placeBlock}>
        {ceremony && <p className={s.arrival}>{ceremony}</p>}
        <p className={s.venue}>{cfg.data.location || "Las Palmas Quintas, Monterrey"}</p>
      </div>

      {/* Pie (vestimenta + niños) */}
      <p className={s.footerNote}>
        {(cfg.data.attire || "VESTIMENTA FORMAL").toUpperCase()}
        {cfg.data.kidsAllowed === false ? " — NO NIÑOS" : ""}
      </p>
    </div>
  );
}

/* helpers */
function splitNames(title: string) {
  const amp = title.split("&");
  if (amp.length === 2)
    return { left: clean(amp[0]).toUpperCase(), right: clean(amp[1]).toUpperCase() };
  const byY = title.split(/\s+y\s+|\s+Y\s+/);
  if (byY.length === 2)
    return { left: clean(byY[0]).toUpperCase(), right: clean(byY[1]).toUpperCase() };
  const parts = title.trim().split(/\s+/);
  if (parts.length >= 2)
    return { left: parts[0].toUpperCase(), right: parts.slice(1).join(" ").toUpperCase() };
  return { left: title.toUpperCase(), right: "—" };
}
const clean = (s: string) => s.trim().replace(/\s+/g, " ");

function inferConj(title?: string) {
  return title?.includes("&") ? "and" : "y";
}

function fmtDate(iso?: string) {
  if (!iso) return "17 AGO 25";
  const d = new Date(iso);
  if (isNaN(d.getTime())) return "17 AGO 25";
  const dd = String(d.getDate()).padStart(2, "0");
  const mo = new Intl.DateTimeFormat("es-MX", { month: "short" })
    .format(d)
    .toUpperCase()
    .replace(".", "");
  const yy = String(d.getFullYear()).slice(-2);
  return `${dd} ${mo} ${yy}`;
}
