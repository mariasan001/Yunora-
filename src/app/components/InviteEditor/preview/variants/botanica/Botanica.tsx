"use client";

import type { Config } from "@/app/components/features/invite/types";
import s from "./Botanica.module.css";
import Watermark from "@/app/components/common/Watermark"; // ⬅️ nuevo

/** ===== main ===== */
export default function Botanica({
  cfg,
  watermark = false, // ⬅️ nuevo: control externo
}: {
  cfg: Config;
  watermark?: boolean;
}) {
  const { leftName, rightName } = splitNames(cfg.data.title || "Ana & David");
  const leftInitial = leftName.charAt(0).toUpperCase();
  const rightInitial = rightName.charAt(0).toUpperCase();

  const d = safeDate(cfg.data.date);
  const dayNum = d ? String(d.getDate()) : "17";
  const month = d
    ? new Intl.DateTimeFormat("es-MX", { month: "long" }).format(d).toUpperCase()
    : "AGOSTO";

  const time = (cfg.data.time || "20:30").slice(0, 5);
  const { venueTitle, venueAddress } = splitLocation(
    cfg.data.location || "BW EVENTOS, Blvd. Antonio L. Rodríguez 3066, Santa María, MTY N.L."
  );

  return (
    <div
      className={s.root}
      style={
        {
          "--primary": cfg.colors.primary,
          "--paper": "url('/textures/paper-fine.png')",
        } as React.CSSProperties
      }
    >
      {/* ===== Initials row ===== */}
      <header className={s.initialsRow}>
        <div className={s.initialCol}>
          <div className={s.initial}>{leftInitial}</div>
          <div className={s.initialName}>{firstName(leftName)}</div>
        </div>

        <Tulip className={s.tulip} />

        <div className={s.initialCol}>
          <div className={s.initial}>{rightInitial}</div>
          <div className={s.initialName}>{firstName(rightName)}</div>
        </div>
      </header>

      <p className={s.kicker}>¡NOS CASAMOS!</p>
      <p className={s.subkicker}>CON LA BENDICIÓN DE DIOS Y NUESTROS PADRES</p>

      {/* Nombres script */}
      <div className={s.namesBlock}>
        <span className={s.nameScript} style={{ color: "var(--primary)" }}>
          {leftName}
        </span>
        <span className={s.amp} style={{ color: "var(--primary)" }}>
          &
        </span>
        <span className={s.nameScript} style={{ color: "var(--primary)" }}>
          {rightName}
        </span>
      </div>

      <p className={s.inviteLine}>
        TENEMOS EL HONOR DE INVITARLOS A CELEBRAR NUESTRA UNIÓN MATRIMONIAL
      </p>

      {/* Fecha / venue */}
      <section className={s.details}>
        <div className={s.dateCol}>
          <div className={s.dayBig}>{dayNum}</div>
          <div className={s.monthSmall}>{month}</div>
        </div>

        <div className={s.divider} aria-hidden="true" />

        <div className={s.venueCol}>
          <div className={s.venueRow}>
            <span className={s.venueTitle}>{venueTitle}</span>
            <span className={s.bullet}>•</span>
            <span className={s.time}>{time} H</span>
          </div>
          {venueAddress && <div className={s.address}>{venueAddress}</div>}
        </div>
      </section>

      <p className={s.thanks}>Gracias por acompañarnos</p>

      <p className={s.footerNote}>
        <Hanger className={s.hanger} />
        VESTIMENTA FORMAL — NO NIÑOS
      </p>

      {/* ===== Marca de agua (footer coqueto + diagonal en print) ===== */}
     {watermark && (
        <Watermark
          variant="chip"            // "chip" o "corner"
          brand="Yunora"
          url="https://yunora.mx"
          showCTA
         
        />
      )}
    </div>
  );
}

/** ===== helpers ===== */
function splitNames(title: string) {
  // “Ana & David” | “Ana y David” | “Ana   David”
  const byAmp = title.split("&");
  if (byAmp.length === 2) return { leftName: clean(byAmp[0]), rightName: clean(byAmp[1]) };

  const byY = title.split(/\s+y\s+|\s+Y\s+/);
  if (byY.length === 2) return { leftName: clean(byY[0]), rightName: clean(byY[1]) };

  const parts = title.trim().split(/\s+/);
  if (parts.length >= 2) return { leftName: parts[0], rightName: parts.slice(1).join(" ") };
  return { leftName: title.trim() || "Ana", rightName: "David" };
}
const clean = (s: string) => s.trim().replace(/\s+/g, " ");
const firstName = (s: string) => clean(s).split(" ")[0] || s;

function splitLocation(loc: string) {
  const [first, ...rest] = loc.split(",");
  return {
    venueTitle: (first || "BW EVENTOS").trim().toUpperCase(),
    venueAddress: rest.join(",").trim(),
  };
}
function safeDate(iso?: string) {
  if (!iso) return null;
  const d = new Date(iso);
  return isNaN(d.getTime()) ? null : d;
}

/** ===== ornaments (SVG) ===== */
function Tulip({ className }: { className?: string }) {
  // estilizado, tintable (currentColor = var(--primary))
  return (
    <svg className={className} viewBox="0 0 64 64" aria-hidden="true">
      <g fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <path d="M32 52c4-8 4-16 0-24" />
        <path d="M32 28c-6-2-9-7-9-14 5 2 8 1 9-2 1 3 4 4 9 2 0 7-3 12-9 14z" />
        <path d="M32 44c-4-4-8-6-12-6" />
        <path d="M32 44c4-4 8-6 12-6" />
      </g>
    </svg>
  );
}

function Hanger({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M10.5 5.5a1.5 1.5 0 1 1 3 0c0 1.2-.9 1.6-1.5 2l-.5.3v1.2M3 18l9-5 9 5M4 18h16"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
