// =============================================
// File: AuroraPlus.tsx
// =============================================
"use client";

import * as React from "react";
import css from "./Aurora.module.css";
import Watermark from "@/app/components/common/Watermark";

/* ===========================
   Helpers deterministas (sin locale)
   =========================== */
function parseISO(iso?: string) {
  if (!iso) return null;
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso);
  if (!m) return null;
  const y = +m[1], mm = +m[2], dd = +m[3];
  const dt = new Date(Date.UTC(y, mm - 1, dd));
  if (Number.isNaN(dt.getTime())) return null;
  return { y, m: (mm - 1) as 0|1|2|3|4|5|6|7|8|9|10|11, d: dd };
}
const MONTH = ["ENE","FEB","MAR","ABR","MAY","JUN","JUL","AGO","SEP","OCT","NOV","DIC"] as const;

function targetFrom(date?: string, time?: string) {
  if (!date) return NaN;
  const hhmm = (time || "00:00").slice(0, 5);
  // Z para evitar desfases SSR/cliente
  const ts = Date.parse(`${date}T${hhmm}:00Z`);
  return Number.isFinite(ts) ? ts : NaN;
}
function msToParts(ms: number) {
  const total = Math.max(0, Math.floor(ms / 1000));
  const d  = Math.floor(total / 86400);
  const h  = Math.floor((total % 86400) / 3600);
  const m  = Math.floor((total % 3600) / 60);
  const ss = total % 60;
  return { d, h, m, ss };
}

/* ===========================
   🔗 Google Calendar helper (opcional)
   =========================== */
function gcalUrl({ title, location, details, date, time, durationHours = 4 }: {
  title: string;
  location?: string;
  details?: string;
  date?: string;
  time?: string;
  durationHours?: number;
}) {
  const startMs = targetFrom(date, time);
  if (!Number.isFinite(startMs)) return "";
  const endMs = (startMs as number) + durationHours * 3600_000;
  const fmt = (ms: number) => {
    const d = new Date(ms);
    const y = d.getUTCFullYear();
    const M = String(d.getUTCMonth() + 1).padStart(2, "0");
    const D = String(d.getUTCDate()).padStart(2, "0");
    const h = String(d.getUTCHours()).padStart(2, "0");
    const m = String(d.getUTCMinutes()).padStart(2, "0");
    const s = String(d.getUTCSeconds()).padStart(2, "0");
    return `${y}${M}${D}T${h}${m}${s}Z`;
  };
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: title,
    dates: `${fmt(startMs)}/${fmt(endMs)}`,
    location: location || "",
    details: details || "",
  });
  return `https://www.google.com/calendar/render?${params.toString()}`;
}

/* ===========================
   ⏱️ Countdown estable
   =========================== */
function Countdown({ date, time }: { date?: string; time?: string }) {
  const target = React.useMemo(() => targetFrom(date, time), [date, time]);
  const [ms, setMs] = React.useState<number>(() =>
    Number.isFinite(target) ? Math.max(0, (target as number) - Date.now()) : 0
  );

  React.useEffect(() => {
    if (!Number.isFinite(target)) { setMs(0); return; }
    setMs(Math.max(0, (target as number) - Date.now()));
    const id = setInterval(() => setMs(Math.max(0, (target as number) - Date.now())), 1000);
    return () => clearInterval(id);
  }, [target]);

  if (!Number.isFinite(target)) return null;

  const { d, h, m, ss } = msToParts(ms);
  return (
    <div className={css.countdown} aria-label="Cuenta regresiva">
      <div className={css.cdBox}><span className={css.cdNum}>{d}</span><span className={css.cdLab}>días</span></div>
      <div className={css.cdBox}><span className={css.cdNum}>{String(h).padStart(2,"0")}</span><span className={css.cdLab}>hrs</span></div>
      <div className={css.cdBox}><span className={css.cdNum}>{String(m).padStart(2,"0")}</span><span className={css.cdLab}>min</span></div>
      <div className={css.cdBox}><span className={css.cdNum}>{String(ss).padStart(2,"0")}</span><span className={css.cdLab}>seg</span></div>
    </div>
  );
}

/* ===========================
   Aurora Plus (mejorada)
   =========================== */
export default function AuroraPlus({
  cfg,
  watermark = false,
}: {
  cfg: any;               // relajado mientras defines tipos Plus
  watermark?: boolean;
}) {
  const title: string = cfg?.data?.title || "Dmitry & Maria";
  const [left, right] = splitNames(title);
  const coverUrl: string = cfg?.data?.coverUrl || "/textures/hero-sample.jpg";
  const subHero: string = cfg?.data?.kicker || "wedding day";

  const parts = parseISO(cfg?.data?.date);
  const dateBig = parts
    ? `${String(parts.d).padStart(2, "0")} ${MONTH[parts.m]} ${String(parts.y).slice(-2)}`
    : "17 AGO 25";
  const time = (cfg?.data?.time || "19:00").slice(0, 5);

  const gratitude: string =
    cfg?.data?.gratitude ||
    "Agradecidos con la vida y con Dios por permitirnos celebrar este día.";

  const ceremony = cfg?.data?.ceremony || {
    title: "Ceremonia religiosa",
    time: "17:00",
    place: "Parroquia San José",
    address: "Centro, Monterrey",
    maps: "https://maps.google.com/?q=Parroquia San José Monterrey",
  };
  const reception = cfg?.data?.reception || {
    title: "Recepción",
    time: "20:00",
    place: "Las Palmas Quintas",
    address: "Monterrey, N.L.",
    maps: "https://maps.google.com/?q=Las Palmas Quintas Monterrey",
  };

  const timeline: Array<{ t: string; label: string; icon?: "church"|"glass"|"fork"|"dance"|"party"|"end" }> =
    cfg?.data?.timeline || [
    { t: ceremony.time, label: "Misa", icon: "church",
    desc: "Unimos nuestras vidas ante Dios y nuestras familias." },

  { t: "18:30", label: "Llegada al salón", icon: "glass",
    desc: "Brindis de bienvenida y fotos con los novios." },

  { t: "20:00", label: "Cena", icon: "fork",
    desc: "Compartimos la mesa y los buenos deseos." },

  { t: "21:30", label: "Primer baile", icon: "dance",
    desc: "Nuestro vals abre la pista: ¡prepárate para el momento!" },

  { t: "22:00", label: "Fiesta", icon: "party",
    desc: "Música, baile y sorpresas toda la noche." },

  { t: "02:00", label: "Cierre", icon: "end",
    desc: "Último abrazo y agradecimiento por acompañarnos." },
    ];

  const attire: string = (cfg?.data?.attire || "Vestimenta formal").toUpperCase();
  const kids: string = cfg?.data?.kidsAllowed ? "CON NIÑOS" : "NO NIÑOS";

  const padrinos: Array<{ role: string; name: string }> =
    cfg?.data?.padrinos || [
      { role: "Madrina de velo", name: "Alejandra López" },
      { role: "Padrino de anillos", name: "Carlos Pérez" },
      { role: "Damas", name: "Paola • Sofía • Fernanda" },
      { role: "Caballeros", name: "Diego • Luis • Mario" },
    ];

  const rsvpLabel: string = cfg?.data?.rsvpLabel || "Confirmar asistencia";

  // Google Calendar quick link
  const gcal = gcalUrl({
    title: `${left} & ${right} — Boda`,
    location: `${reception.place}${reception.address ? `, ${reception.address}` : ""}`,
    details: "¡Acompáñanos en este día especial!",
    date: cfg?.data?.date,
    time: cfg?.data?.time,
    durationHours: 5,
  });

  return (
    <div
      className={css.root}
      style={
        {
          "--primary": cfg?.colors?.primary || "#2F6A3A",
          "--paper": "url('/textures/paper-fine.png')",
        } as React.CSSProperties
      }
    >
      {/* === Portada tipo referencia === */}
      <section className={css.heroSimple} aria-label="Portada">
        <div className={css.aurora} aria-hidden />
        <h1 className={css.heroTitle}>
          <span className={css.heroNames}>
            {left.toUpperCase()} & {right.toUpperCase()}
          </span>
        </h1>
        <p className={css.heroSub}>{subHero}</p>

        <figure className={css.photoWrap}>
          <img
            className={css.photo}
            src={coverUrl}
            alt={`Foto de ${left} y ${right}`}
            loading="eager"
            decoding="async"
          />
        </figure>

        <Countdown date={cfg?.data?.date} time={cfg?.data?.time} />
        <p className={css.gratitude}>
          {gratitude}
        </p>
        <div className={css.hDivider} aria-hidden="true" />
      </section>

      {/* Día de la boda */}
      <section className={css.day} aria-label="Día de la boda">
        <div className={css.dayCard}>
          <div className={css.dateBig}>
            <span className={css.dateFoil}>{dateBig}</span>
          </div>
          <div className={css.time}>a las {time} h</div>
          {gcal && (
            <a className={css.addCal} href={gcal} target="_blank" rel="noopener noreferrer" aria-label="Agregar al calendario">
              Añadir al calendario
            </a>
          )}
        </div>
        <div className={css.blocks}>
          <PlaceCard {...ceremony} />
          <PlaceCard {...reception} />
        </div>
      </section>

      {/* 🔥 NUEVO ORDEN: Padrinos inmediatamente después de la fecha */}
      <section className={css.honors} aria-label="Padrinos y acompañantes">
        <h3 className={css.secTitle}>Padrinos & acompañantes</h3>
        <div className={css.honorsGrid}>
          {padrinos.map((p, i) => (
            <article key={i} className={css.honorCard} aria-label={`${p.role}: ${p.name}`}>
              <span className={css.honorRole}>{p.role}</span>
              <span className={css.honorName}>{p.name}</span>
            </article>
          ))}
        </div>
      </section>

      {/* Línea de tiempo */
      <section className={css.timeline} aria-label="Itinerario del día">
        <header className={css.tHeader}>
          <h3 className={css.secTitle}>{cfg?.data?.timelineTitle || "Itinerario del día"}</h3>
          <p className={css.tIntro}>
            {cfg?.data?.timelineIntro || "Los momentos más importantes. Te sugerimos llegar con 15 minutos de anticipación."}
          </p>
        </header>

        {/* Versión centrada, minimalista (estilo póster) */}
        <div className={css.tCenterWrap}>
          <ol className={css.tCenterList}>
            {timeline.map((item: any, i: number) => {
              const desc = item.desc || item.label;
              return (
                <li key={i} className={css.tCItem} aria-label={`${item.t} — ${desc}`}> 
                  <span className={css.tCDot} aria-hidden />
                  <div className={css.tCTime}>{item.t}</div>
                  <div className={css.tCText}>{desc}</div>
                </li>
              );
            })}
          </ol>
        </div>
      </section>
}
      {/* Vestimenta / Niños */}
      <section className={css.attireKids} aria-label="Vestimenta y niños">
        <span className={css.chip}>{attire}</span>
        <span className={css.dot}>•</span>
        <span className={css.chip}>{kids}</span>
      </section>

      {/* CTA */}
      {rsvpLabel && (
        <div className={css.ctaWrap}>
          <a className={css.cta} href="#rsvp">{rsvpLabel}</a>
        </div>
      )}

      {/* Marca de agua */}
      {watermark && (
        <div className={css.wm}>
          <Watermark variant="corner" brand="Yunora" url="https://yunora.mx" />
        </div>
      )}
    </div>
  );
}

/* ===========================
   Auxiliares UI
   =========================== */
function splitNames(title: string) {
  const viaAmp = title.split("&");
  if (viaAmp.length === 2) return [clean(viaAmp[0]), clean(viaAmp[1])];
  const viaY = title.split(/\s+y\s+|\s+Y\s+/);
  if (viaY.length === 2) return [clean(viaY[0]), clean(viaY[1])];
  const parts = title.trim().split(/\s+/);
  if (parts.length >= 2) return [parts[0], parts.slice(1).join(" ")];
  return [title.trim() || "Nombre", "Pareja"];
}
const clean = (s: string) => s.trim().replace(/\s+/g, " ");

function PlaceCard(props: { title: string; time: string; place: string; address: string; maps?: string }) {
  return (
    <article className={css.placeCard}>
      <h4 className={css.placeTitle}>{props.title}</h4>
      <div className={css.placeTime}>{props.time} h</div>
      <div className={css.placeName}>{props.place}</div>
      <div className={css.placeAddr}>{props.address}</div>
      {props.maps && (
        <a className={css.maps} href={props.maps} target="_blank" rel="noopener noreferrer">
          Ver mapa →
        </a>
      )}
    </article>
  );
}

function Icon({ kind, className }: { kind?: string; className?: string }) {
  switch (kind) {
    case "church":
      return (<svg className={className} viewBox="0 0 24 24" aria-hidden><path fill="currentColor" d="M11 2h2v3l3 2v3h2v10h-4v-4H10v4H6V10h2V8l3-2V2z"/></svg>);
    case "glass":
      return (<svg className={className} viewBox="0 0 24 24" aria-hidden><path fill="currentColor" d="M7 2h10l-1 6c-.4 2-2.4 3-4 3s-3.6-1-4-3L7 2zm4 11h2v7h3v2H8v-2h3v-7z"/></svg>);
    case "fork":
      return (<svg className={className} viewBox="0 0 24 24" aria-hidden><path fill="currentColor" d="M7 2h2v7a3 3 0 0 1-2 2v11H5V11a3 3 0 0 1-2-2V2h2v5h2V2zm10 0h2v20h-2v-9h-2v9h-2V2h2v7h2V2z"/></svg>);
    case "dance":
      return (<svg className={className} viewBox="0 0 24 24" aria-hidden><path fill="currentColor" d="M12 2a2 2 0 110 4 2 2 0 010-4zm1 5l3 3-2 2 2 4-2 1-2-4-2 2-2-2 3-3V9l2-2z"/></svg>);
    case "party":
      return (<svg className={className} viewBox="0 0 24 24" aria-hidden><path fill="currentColor" d="M2 22l8-3 9-9-5-5-9 9-3 8zm12-14l2 2M16 2l2 2M20 6l2 2"/></svg>);
    default:
      return (<svg className={className} viewBox="0 0 24 24" aria-hidden><circle cx="12" cy="12" r="3" fill="currentColor"/></svg>);
  }
}
