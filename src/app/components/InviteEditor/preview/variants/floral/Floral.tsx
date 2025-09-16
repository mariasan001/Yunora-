"use client";

import type { Config } from "@/app/components/features/invite/types";
import s from "./Floral.module.css";
import Watermark from "@/app/components/common/Watermark";

export default function Floral({
  cfg,
  watermark = false,
}: {
  cfg: Config;
  watermark?: boolean;
}) {
  const { left, right } = splitNames(cfg.data.title || "Alissa & Montes");

  const topKicker   = (cfg.data.kicker   || "JUNTO A SUS FAMILIAS").toUpperCase();
  const topBlessing = (cfg.data.blessing || "").toUpperCase();

  const invite = (cfg.data.inviteLine ||
    "TENEMOS EL HONOR DE INVITARLOS A CELEBRAR SU MATRIMONIO").toUpperCase();

  const d = parseISO(cfg.data.date);
  const dateLong = d
    ? `${WEEKDAY[d.w]} ${d.day} ${MONTH_LONG[d.m]} ${String(d.y).slice(-2)}`
    : "SÁBADO 26 SEPTIEMBRE 26";
  const time = (cfg.data.time || "19:00").slice(0,5) + " H";

  const location = cfg.data.location || "123 ANYWHERE ST., ANY CITY";
  const attire = (cfg.data.attire || "VESTIMENTA FORMAL").toUpperCase();
  const kids   = cfg.data.kidsAllowed ? "— CON NIÑOS" : "— NO NIÑOS";

  return (
    <div
      className={s.root}
      style={
        {
          "--primary": cfg.colors.primary,                            // ← el primario llega aquí
          "--paper": `url('/textures/floral-fondo.jpg')`,
        } as React.CSSProperties
      }
    >
      <div className={s.inner} aria-hidden />

      <p className={s.kicker}>{topKicker}</p>
      {topBlessing && <p className={s.subkicker}>{topBlessing}</p>}

      <div className={s.names}>
        <span className={s.name}>{left}</span>
        <span className={s.and}>y</span>
        <span className={s.name}>{right}</span>
      </div>

      <p className={s.invite}>{invite}</p>

      <div className={s.dateBlock}>
        <span className={s.date}>{dateLong}</span>   {/* ← usa primario */}
        <span className={s.dot}>•</span>
        <span className={s.time}>{time}</span>       {/* ← fijo */}
      </div>

      <p className={s.place}>{location}</p>

      <p className={s.footerNote}>
        {attire} {kids}
      </p>

      {watermark && (
        <div className={s.wm}>
          <Watermark variant="corner" brand="Yunora" url="https://yunora.mx" />
        </div>
      )}
    </div>
  );
}

/* helpers */
function splitNames(title: string) {
  const viaAmp = title.split("&");
  if (viaAmp.length === 2) return { left: clean(viaAmp[0]), right: clean(viaAmp[1]) };

  const viaY = title.split(/\s+y\s+|\s+Y\s+/);
  if (viaY.length === 2) return { left: clean(viaY[0]), right: clean(viaY[1]) };

  const parts = title.trim().split(/\s+/);
  if (parts.length >= 2) return { left: parts[0], right: parts.slice(1).join(" ") };
  return { left: title.trim() || "Alissa", right: "Montes" };
}
const clean = (s: string) => s.trim().replace(/\s+/g, " ");

function parseISO(iso?: string) {
  if (!iso) return null;
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso);
  if (!m) return null;
  const y = +m[1], mm = +m[2], dd = +m[3];
  const dt = new Date(Date.UTC(y, mm - 1, dd));
  if (Number.isNaN(dt.getTime())) return null;
  return { y, m: (mm - 1) as 0|1|2|3|4|5|6|7|8|9|10|11, d: dd, w: dt.getUTCDay() as 0|1|2|3|4|5|6, day: String(dd).padStart(2,"0") };
}
const WEEKDAY = ["DOM","LUN","MAR","MIÉ","JUE","VIE","SÁB"] as const;
const MONTH_LONG = ["ENERO","FEBRERO","MARZO","ABRIL","MAYO","JUNIO","JULIO","AGOSTO","SEPTIEMBRE","OCTUBRE","NOVIEMBRE","DICIEMBRE"] as const;
