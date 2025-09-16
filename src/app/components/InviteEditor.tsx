"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import styles from "@/app/crear/editor.module.css";
import previewStyles from "@/app/crear/preview.module.css";
import type { EventType } from "@/lib/events";
import { titleForType } from "@/lib/events";
import type { Plan } from "@/lib/plans";
import { PLAN_LABEL, PLAN_ORDER, canUse } from "@/lib/plans";
import { Lock } from "lucide-react";

/* =========================
   Tipografías disponibles
========================= */
const FONT_OPTIONS = [
  { key: "serif",  label: "Serif elegante", css: "'Georgia', 'Times New Roman', serif" },
  { key: "sans",   label: "Sans moderna",   css: "Inter, system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif" },
  { key: "script", label: "Script (decorativa)", css: "'Brush Script MT', 'Segoe Script', cursive" },
] as const;

/* =========================
   Config principal del editor
========================= */
type Config = {
  template: "classic" | "minimal";
  colors: { primary: string; secondary: string; bg: string };
  font: typeof FONT_OPTIONS[number]["key"];
  data: {
    title: string; subtitle: string; message: string;
    date: string; time: string; location: string; rsvpLabel: string;
  };
  type: EventType;
};

/* =========================
   Presets por tipo de evento
========================= */
const PRESETS: Record<EventType, Partial<Config>> = {
  boda: {
    template: "classic",
    colors: { primary: "#5A4FCF", secondary: "#FFD166", bg: "#FFFFFF" },
    font: "serif",
    data: {
      title: "Ana & Luis",
      subtitle: "Boda",
      message: "Nos encantará celebrar contigo este día tan especial.",
      date: "2025-12-20", time: "17:00", location: "Hacienda Los Laureles, CDMX",
      rsvpLabel: "Confirmar asistencia",
    } as any,
  },
  xv: {
    template: "classic",
    colors: { primary: "#7A64FF", secondary: "#FFD7A3", bg: "#FFFFFF" },
    font: "script",
    data: {
      title: "Sofía XV",
      subtitle: "Quince Años",
      message: "Acompáñame a celebrar esta nueva etapa.",
      date: "2025-09-14", time: "18:00", location: "Salón Real, Puebla",
      rsvpLabel: "Confirmar asistencia",
    } as any,
  },
  bautizo: {
    template: "minimal",
    colors: { primary: "#5A8FDF", secondary: "#FFE6A9", bg: "#FFFFFF" },
    font: "sans",
    data: {
      title: "Bautizo de Mateo",
      subtitle: "Bautizo",
      message: "Nos dará alegría compartir este momento en familia.",
      date: "2025-06-08", time: "12:00", location: "Parroquia San José, GDL",
      rsvpLabel: "Confirmar asistencia",
    } as any,
  },
  cumple: {
    template: "minimal",
    colors: { primary: "#E06B5F", secondary: "#FFE08A", bg: "#FFFFFF" },
    font: "sans",
    data: {
      title: "Cumple de Fer",
      subtitle: "Cumpleaños",
      message: "Ven a festejar conmigo. ¡Habrá pastel!",
      date: "2025-07-22", time: "20:00", location: "Casa de Fer, CDMX",
      rsvpLabel: "Confirmar asistencia",
    } as any,
  },
  babyshower: {
    template: "classic",
    colors: { primary: "#7AB97A", secondary: "#FFE6A9", bg: "#FFFFFF" },
    font: "serif",
    data: {
      title: "Baby Shower de Valentina",
      subtitle: "Baby Shower",
      message: "Acompáñanos a dar la bienvenida a nuestra pequeña.",
      date: "2025-05-10", time: "17:00", location: "Terraza Lomas, MTY",
      rsvpLabel: "Confirmar asistencia",
    } as any,
  },
  graduacion: {
    template: "minimal",
    colors: { primary: "#333333", secondary: "#FFD166", bg: "#FFFFFF" },
    font: "sans",
    data: {
      title: "Graduación de Diego",
      subtitle: "Graduación",
      message: "Listos para el siguiente capítulo. ¡Celebremos!",
      date: "2025-08-01", time: "19:00", location: "Auditorio Central, QRO",
      rsvpLabel: "Confirmar asistencia",
    } as any,
  },
  comunion: {
    template: "classic",
    colors: { primary: "#5A8FDF", secondary: "#FFD166", bg: "#FFFFFF" },
    font: "serif",
    data: {
      title: "Primera Comunión de Emma",
      subtitle: "Primera Comunión",
      message: "Nos encantaría que nos acompañaras.",
      date: "2025-04-06", time: "11:00", location: "Iglesia San Ángel, CDMX",
      rsvpLabel: "Confirmar asistencia",
    } as any,
  },
  aniversario: {
    template: "classic",
    colors: { primary: "#8C5ACF", secondary: "#FFC766", bg: "#FFFFFF" },
    font: "serif",
    data: {
      title: "25 Aniversario",
      subtitle: "Aniversario",
      message: "Un cuarto de siglo juntos. Brindemos por más.",
      date: "2025-03-15", time: "20:00", location: "Restaurante Alma, CDMX",
      rsvpLabel: "Confirmar asistencia",
    } as any,
  },
  despedida: {
    template: "minimal",
    colors: { primary: "#5A4FCF", secondary: "#FFD166", bg: "#FFFFFF" },
    font: "sans",
    data: {
      title: "Despedida de Mariana",
      subtitle: "Despedida",
      message: "Una última gran reunión antes de su viaje.",
      date: "2025-02-10", time: "21:00", location: "Rooftop Centro, GDL",
      rsvpLabel: "Confirmar asistencia",
    } as any,
  },
  infantil: {
    template: "minimal",
    colors: { primary: "#F06489", secondary: "#FFDA7B", bg: "#FFFFFF" },
    font: "sans",
    data: {
      title: "Cumple de Leo (6)",
      subtitle: "Fiesta Infantil",
      message: "Juegos, risas y mucha diversión.",
      date: "2025-09-10", time: "16:00", location: "Parque La Cima, MTY",
      rsvpLabel: "Confirmar asistencia",
    } as any,
  },
  civil: {
    template: "classic",
    colors: { primary: "#4A4A4A", secondary: "#FFD166", bg: "#FFFFFF" },
    font: "serif",
    data: {
      title: "Ceremonia Civil",
      subtitle: "Boda Civil",
      message: "Nos encantará contar contigo en este momento.",
      date: "2025-05-18", time: "13:00", location: "Registro Civil, CDMX",
      rsvpLabel: "Confirmar asistencia",
    } as any,
  },
  pedida: {
    template: "classic",
    colors: { primary: "#5A4FCF", secondary: "#FFE0A1", bg: "#FFFFFF" },
    font: "serif",
    data: {
      title: "Pedida de Mano",
      subtitle: "Compromiso",
      message: "Queremos compartir esta alegría con ustedes.",
      date: "2025-06-30", time: "18:30", location: "Casa de la Familia García",
      rsvpLabel: "Confirmar asistencia",
    } as any,
  },
  familiar: {
    template: "minimal",
    colors: { primary: "#2F8F83", secondary: "#FFD166", bg: "#FFFFFF" },
    font: "sans",
    data: {
      title: "Reunión Familiar",
      subtitle: "Encuentro",
      message: "Porque la familia también se elige. ¡Nos vemos!",
      date: "2025-07-05", time: "14:00", location: "Quinta El Encino",
      rsvpLabel: "Confirmar asistencia",
    } as any,
  },
};

/* =========================
   Helpers
========================= */
function base64urlEncode(obj: object) {
  const s = JSON.stringify(obj);
  const b =
    typeof window === "undefined"
      ? Buffer.from(s).toString("base64")
      : btoa(unescape(encodeURIComponent(s)));
  return b.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
}

/* =========================
   Componente principal
========================= */
export default function InviteEditor({ initialType }: { initialType: EventType }) {
  const seed = PRESETS[initialType];

  // Plan actual (se persiste en localStorage)
  const [plan, setPlan] = useState<Plan>(() => {
    if (typeof window === "undefined") return "free";
    return (localStorage.getItem("yunora.plan") as Plan) || "free";
  });
  function choosePlan(p: Plan) {
    setPlan(p);
    if (typeof window !== "undefined") localStorage.setItem("yunora.plan", p);
  }

  // Config editable
  const [cfg, setCfg] = useState<Config>({
    template: seed.template ?? "classic",
    colors: seed.colors ?? { primary: "#5A4FCF", secondary: "#FFD166", bg: "#FFFFFF" },
    font: seed.font ?? "serif",
    data: {
      title: seed.data?.title ?? "Tu evento",
      subtitle: seed.data?.subtitle ?? "Celebración",
      message: seed.data?.message ?? "Personaliza tu mensaje aquí.",
      date: seed.data?.date ?? "2025-12-31",
      time: seed.data?.time ?? "19:00",
      location: seed.data?.location ?? "Ciudad de México",
      rsvpLabel: seed.data?.rsvpLabel ?? "Confirmar asistencia",
    },
    type: initialType,
  });

  const fontCSS = useMemo(
    () => FONT_OPTIONS.find(f => f.key === cfg.font)?.css ?? FONT_OPTIONS[0].css,
    [cfg.font]
  );

  function onChange<K extends keyof Config>(key: K, value: Config[K]) {
    setCfg(prev => ({ ...prev, [key]: value }));
  }
  function onDataChange<K extends keyof Config["data"]>(key: K, value: Config["data"][K]) {
    setCfg(prev => ({ ...prev, data: { ...prev.data, [key]: value } }));
  }

  const previewLink = useMemo(() => {
    const payload = { t: cfg.template, c: cfg.colors, f: cfg.font, d: cfg.data, v: 1, y: cfg.type, p: plan };
    const encoded = base64urlEncode(payload);
    return `/p?d=${encoded}`;
  }, [cfg, plan]);

  function shareWhatsApp() {
    if (!canUse("removeWatermark", plan)) {
      alert("Tip: con Plus/Premium quitas la marca de agua y desbloqueas opciones extra ✨");
    }
    const msg = `Te comparto nuestra invitación ✨\n${location.origin}${previewLink}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(msg)}`, "_blank");
  }

  return (
    <main className={styles.wrap}>
      <header className={styles.header}>
        <Link href="/crear" className={styles.back}>← Cambiar tipo</Link>
        <h1>Editor — {titleForType(cfg.type)}</h1>

        <div className={styles.actions}>
          {/* Selector de plan */}
          <div className={styles.planBar} aria-label="Seleccionar plan">
            {PLAN_ORDER.map(p => (
              <button
                key={p}
                className={`${styles.planChip} ${plan === p ? styles.planChipActive : ""}`}
                onClick={() => choosePlan(p)}
                type="button"
                aria-pressed={plan === p}
                title={`Plan ${PLAN_LABEL[p]}`}
              >
                {PLAN_LABEL[p]}
              </button>
            ))}
          </div>

          <a className={styles.btnPrimary} href={previewLink} target="_blank" rel="noopener noreferrer">Previsualizar</a>
          <button className={styles.btnSecondary} onClick={shareWhatsApp}>Compartir WhatsApp</button>
        </div>
      </header>

      <section className={styles.editor}>
        {/* Panel izquierdo */}
        <aside className={styles.panel}>
          {/* === Plantilla === */}
          <div className={styles.group}>
            <h3>Plantilla</h3>
            <div className={styles.row}>
              <label className={styles.radio}>
                <input type="radio" name="tpl" checked={cfg.template === "classic"}
                  onChange={() => onChange("template", "classic")} />
                <span>Clásica</span>
              </label>
              <label className={styles.radio}>
                <input type="radio" name="tpl" checked={cfg.template === "minimal"}
                  onChange={() => onChange("template", "minimal")} />
                <span>Minimal</span>
              </label>
            </div>

            {/* Ejemplo de template PRO (demo + candado) */}
            <div className={`${styles.row} ${styles.lockWrap}`} style={{ marginTop: ".4rem" }}>
              <label className={styles.radio} aria-disabled={!canUse("photoAlbum", plan)}>
                <input type="radio" name="tpl" disabled={!canUse("photoAlbum", plan)} />
                <span>Editorial (foto portada)</span>
              </label>
              {!canUse("photoAlbum", plan) && (
                <div className={styles.lockOverlay}>
                  <p><Lock size={16}/> Premium</p>
                </div>
              )}
            </div>
          </div>

          {/* === Colores === */}
          <div className={styles.group}>
            <h3>Colores</h3>
            <div className={styles.colors}>
              <div>
                <label>Primario</label>
                <input className={styles.control} type="color" value={cfg.colors.primary}
                  onChange={(e) => onChange("colors", { ...cfg.colors, primary: e.target.value })} />
              </div>
              <div>
                <label>Secundario</label>
                <input className={styles.control} type="color" value={cfg.colors.secondary}
                  onChange={(e) => onChange("colors", { ...cfg.colors, secondary: e.target.value })} />
              </div>
              <div>
                <label>Fondo</label>
                <input className={styles.control} type="color" value={cfg.colors.bg}
                  onChange={(e) => onChange("colors", { ...cfg.colors, bg: e.target.value })} />
              </div>
            </div>
          </div>

          {/* === Tipografía === */}
          <div className={styles.group}>
            <h3>Tipografía</h3>
            <select
              value={cfg.font}
              onChange={(e) => onChange("font", e.target.value as Config["font"])}
              className={styles.select}
            >
              {FONT_OPTIONS.map(f => (<option key={f.key} value={f.key}>{f.label}</option>))}
            </select>
          </div>

          {/* === Contenido === */}
          <div className={styles.group}>
            <h3>Contenido</h3>
            <label className={styles.label}>Título
              <input className={styles.control} value={cfg.data.title} onChange={(e)=>onDataChange("title", e.target.value)} />
            </label>
            <label className={styles.label}>Tipo de evento
              <input className={styles.control} value={cfg.data.subtitle} onChange={(e)=>onDataChange("subtitle", e.target.value)} />
            </label>
            <label className={styles.label}>Mensaje
              <textarea className={styles.control} rows={3} value={cfg.data.message} onChange={(e)=>onDataChange("message", e.target.value)} />
            </label>
            <div className={styles.row}>
              <label className={styles.label}>Fecha
                <input className={styles.control} type="date" value={cfg.data.date} onChange={(e)=>onDataChange("date", e.target.value)} />
              </label>
              <label className={styles.label}>Hora
                <input className={styles.control} type="time" value={cfg.data.time} onChange={(e)=>onDataChange("time", e.target.value)} />
              </label>
            </div>
            <label className={styles.label}>Lugar
              <input className={styles.control} value={cfg.data.location} onChange={(e)=>onDataChange("location", e.target.value)} />
            </label>
            <label className={styles.label}>Texto del botón
              <input className={styles.control} value={cfg.data.rsvpLabel} onChange={(e)=>onDataChange("rsvpLabel", e.target.value)} />
            </label>
            <p className={styles.hint}>Luego añadimos portada, mapa y RSVP real.</p>
          </div>

          {/* === Extras PRO (con candadito) === */}
          <div className={styles.group}>
            <h3>Extras</h3>

            {/* RSVP avanzado */}
            <div className={styles.lockWrap}>
              {!canUse("rsvpAdvanced", plan) && (
                <div className={styles.lockOverlay}><p><Lock size={16}/> Plus</p></div>
              )}
              <div className={styles.upsell}>
                <span className={styles.badgePro}>RSVP avanzado</span>
                <small>Formulario con asistentes, mensaje y recordatorios.</small>
                {!canUse("rsvpAdvanced", plan) && (
                  <div className={styles.upsellActions}>
                    <a href="#plans" className={styles.btnGold}>Ver planes</a>
                    <button className={styles.btnGhost} onClick={() => choosePlan("plus")}>Probar en demo</button>
                  </div>
                )}
              </div>
            </div>

            {/* QR de acceso */}
            <div className={styles.lockWrap} style={{ marginTop: ".6rem" }}>
              {!canUse("qrAccess", plan) && (
                <div className={styles.lockOverlay}><p><Lock size={16}/> Premium</p></div>
              )}
              <div className={styles.upsell}>
                <span className={styles.badgePro}>QR de acceso</span>
                <small>Control de entrada y lista confirmada.</small>
                {!canUse("qrAccess", plan) && (
                  <div className={styles.upsellActions}>
                    <a href="#plans" className={styles.btnGold}>Subir a Premium</a>
                    <button className={styles.btnGhost} onClick={() => choosePlan("premium")}>Ver demo</button>
                  </div>
                )}
              </div>
            </div>

            {/* Álbum de fotos */}
            <div className={styles.lockWrap} style={{ marginTop: ".6rem" }}>
              {!canUse("photoAlbum", plan) && (
                <div className={styles.lockOverlay}><p><Lock size={16}/> Premium</p></div>
              )}
              <div className={styles.upsell}>
                <span className={styles.badgePro}>Álbum de fotos</span>
                <small>Comparte y guarda los momentos del evento.</small>
                {!canUse("photoAlbum", plan) && (
                  <div className={styles.upsellActions}>
                    <a href="#plans" className={styles.btnGold}>Ir a Premium</a>
                    <button className={styles.btnGhost} onClick={() => choosePlan("premium")}>Ver demo</button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </aside>

        {/* Vista previa */}
        <div className={previewStyles.previewWrap} style={{ background: cfg.colors.bg }}>
          <div className={previewStyles.previewCard} style={{ fontFamily: fontCSS, position:"relative" }}>
            {cfg.template === "classic" ? <ClassicTemplate cfg={cfg}/> : <MinimalTemplate cfg={cfg}/>}
            {/* Marca de agua si el plan no permite quitarla */}
            {!canUse("removeWatermark", plan) && (
              <div className={styles.watermark}>Yunora · Vista previa</div>
            )}
          </div>

          {/* Barra inferior fija */}
          <div className={styles.footerBar}>
            <a className={styles.btnPrimary} href={previewLink} target="_blank" rel="noopener noreferrer">
              Abrir vista previa
            </a>
            <button className={styles.btnSecondary} onClick={shareWhatsApp}>
              Compartir {canUse("removeWatermark", plan) ? "" : "(con marca de agua)"}
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}

/* =========================
   Templates
========================= */
function ClassicTemplate({ cfg }: { cfg: Config }) {
  return (
    <div className={previewStyles.classic}>
      <div className={previewStyles.ribbon} style={{ background: cfg.colors.secondary }} />
      <h2 className={previewStyles.title} style={{ color: cfg.colors.primary }}>{cfg.data.title}</h2>
      <p className={previewStyles.subtitle}>{cfg.data.subtitle}</p>
      <p className={previewStyles.msg}>{cfg.data.message}</p>
      <div className={previewStyles.info}>
        <span>{formatDate(cfg.data.date)} · {cfg.data.time}</span>
        <span>{cfg.data.location}</span>
      </div>
      <a className={previewStyles.btn} style={{ background: cfg.colors.primary }} href="#">
        {cfg.data.rsvpLabel}
      </a>
    </div>
  );
}

function MinimalTemplate({ cfg }: { cfg: Config }) {
  return (
    <div className={previewStyles.minimal}>
      <h2 className={previewStyles.title} style={{ color: cfg.colors.primary }}>{cfg.data.title}</h2>
      <p className={previewStyles.subtitle}>{cfg.data.subtitle}</p>
      <div className={previewStyles.infoBlock} style={{ borderColor: cfg.colors.primary }}>
        <div><small>Fecha</small><strong>{formatDate(cfg.data.date)}</strong></div>
        <div><small>Hora</small><strong>{cfg.data.time}</strong></div>
        <div><small>Lugar</small><strong>{cfg.data.location}</strong></div>
      </div>
      <p className={previewStyles.msg}>{cfg.data.message}</p>
      <a className={previewStyles.link} style={{ color: cfg.colors.primary }} href="#">
        {cfg.data.rsvpLabel} →
      </a>
    </div>
  );
}

/* =========================
   Util formateo fecha
========================= */
function formatDate(iso: string) {
  if (!iso) return "";
  try {
    const d = new Date(iso);
    return d.toLocaleDateString("es-MX", { day: "2-digit", month: "long", year: "numeric" });
  } catch { return iso; }
}
