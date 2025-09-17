"use client";

import type { Config } from "@/app/components/features/invite/types";
import s from "./Aurora.module.css";
import React from "react";

export default function Aurora({ cfg }: { cfg: Config }) {
  const names = cfg.data.title || "Marcela & Andrés";
  const invite = (cfg.data.inviteLine || "Junto a nuestras familias, los esperamos para celebrar.").toUpperCase();

  const dateStr = cfg.data.date || "2025-12-31";
  const timeStr = (cfg.data.time || "19:00").slice(0,5);
  const place   = cfg.data.location || "Ciudad de México";

  const cerTitle = cfg.data.ceremonyTitle || "Ceremonia";
  const cerTime  = (cfg.data.ceremonyTime || "").slice(0,5);
  const cerAddr  = cfg.data.ceremonyAddress || "";

  const recTitle = cfg.data.receptionTitle || "Recepción";
  const recTime  = (cfg.data.receptionTime || "").slice(0,5);
  const recAddr  = cfg.data.receptionAddress || "";

  const attire   = (cfg.data.attire || "VESTIMENTA FORMAL").toUpperCase();
  const kids     = cfg.data.kidsAllowed ? "— CON NIÑOS" : "— NO NIÑOS";

  const showCd   = !!cfg.data.showCountdown;

  return (
    <div
      className={s.root}
      style={
        { ["--primary" as any]: cfg.colors.primary, ["--accent" as any]: cfg.colors.secondary } as React.CSSProperties
      }
    >
      <header className={s.header}>
        <h2 className={s.names}>{names}</h2>
        <p className={s.invite}>{invite}</p>
      </header>

      {showCd && <Countdown date={dateStr} time={timeStr} className={s.countdown} />}

      <section className={s.block}>
        <p className={s.dateLine}>
          {formatDateES(dateStr)} · {timeStr} H
        </p>
        <p className={s.place}>{place}</p>
      </section>

      <section className={s.grid2}>
        <div className={s.card}>
          <h4 className={s.cardTitle}>{cerTitle}</h4>
          {cerTime && <p className={s.cardMeta}>{cerTime} H</p>}
          {cerAddr && <p className={s.cardText}>{cerAddr}</p>}
        </div>
        <div className={s.card}>
          <h4 className={s.cardTitle}>{recTitle}</h4>
          {recTime && <p className={s.cardMeta}>{recTime} H</p>}
          {recAddr && <p className={s.cardText}>{recAddr}</p>}
        </div>
      </section>

      <footer className={s.footer}>
        <p className={s.note}>{attire} {kids}</p>
      </footer>
    </div>
  );
}

/* ===== utilidades ===== */
function formatDateES(iso?: string) {
  // estable y SSR-safe
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso || "");
  if (!m) return "SÁB 31 DIC 25";
  const y = +m[1], mm = +m[2], dd = +m[3];
  const dt = new Date(Date.UTC(y, mm-1, dd));
  const WEEK = ["DOM","LUN","MAR","MIÉ","JUE","VIE","SÁB"];
  const MONTH= ["ENE","FEB","MAR","ABR","MAY","JUN","JUL","AGO","SEP","OCT","NOV","DIC"];
  return `${WEEK[dt.getUTCDay()]} ${String(dd).padStart(2,"0")} ${MONTH[mm-1]} ${String(y).slice(-2)}`;
}

function Countdown({ date, time, className }: { date: string; time: string; className?: string }) {
  const target = Date.parse(`${date}T${time || "00:00"}:00`);
  const [t, setT] = React.useState<number>(() => Math.max(0, target - Date.now()));

  React.useEffect(() => {
    const id = setInterval(() => setT(Math.max(0, target - Date.now())), 1000);
    return () => clearInterval(id);
  }, [target]);

  const s = Math.floor(t / 1000);
  const d = Math.floor(s / 86400);
  const h = Math.floor((s % 86400) / 3600);
  const m = Math.floor((s % 3600) / 60);
  const sec = s % 60;

  return (
    <div className={className}>
      {d}d {String(h).padStart(2,"0")}h {String(m).padStart(2,"0")}m {String(sec).padStart(2,"0")}s
    </div>
  );
}
