"use client";
import { useEffect, useRef, useState } from "react";
import styles from "./HowItWorks.module.css";

/* Iconos placeholder (cámbialos por /public/icons/*.svg si quieres) */
function IconEvent(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path d="M7 2v2M17 2v2M4 7h16M5 7v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <rect x="7" y="11" width="4" height="3" rx="0.5" />
      <rect x="13" y="11" width="4" height="3" rx="0.5" />
    </svg>
  );
}
function IconEdit(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path d="M4 20h4l10-10a2.5 2.5 0 0 0-3.5-3.5L4.5 16.5 4 20z" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <path d="M13.5 6.5l4 4" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}
function IconShare(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <circle cx="6" cy="12" r="2.2" />
      <circle cx="18" cy="6" r="2.2" />
      <circle cx="18" cy="18" r="2.2" />
      <path d="M7.9 11l8.2-4.1M7.9 13l8.2 4.1" fill="none" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

/* Hook sencillo para detectar cuando la sección entra a viewport */
function useInView<T extends HTMLElement>(threshold = 0.3) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          obs.disconnect(); // solo una vez
        }
      },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

const STEPS = [
  {
    id: 1,
    title: "Elige tu evento",
    caption: "Boda, XV, bautizo o esa reunión que reúne a los tuyos.",
    bullets: ["Plantillas pensadas con cariño", "Estilos para distintos tonos y tradiciones"],
    cta: { label: "Probar ahora", href: "#crear" },
    Icon: IconEvent,
  },
  {
    id: 2,
    title: "Personaliza en minutos",
    caption: "Nombres, fecha, lugar y un mensaje que sí los representa.",
    bullets: ["Vista previa inmediata", "Colores y tipografía que combinan con ustedes"],
    cta: { label: "Ver editor", href: "#crear" },
    Icon: IconEdit,
  },
  {
    id: 3,
    title: "Comparte y confirma",
    caption: "Envía por WhatsApp, recibe confirmaciones y usa QR si quieres.",
    bullets: ["RSVP simple o detallado", "Recordatorios automáticos"],
    cta: { label: "Compartir demo", href: "#crear" },
    Icon: IconShare,
  },
] as const;

export default function HowItWorks() {
  const { ref, inView } = useInView<HTMLDivElement>(0.25);
  const [activeStep, setActiveStep] = useState<number | null>(null);

  return (
    <section id="how" ref={ref} className={`${styles.wrap} ${inView ? styles.inView : ""}`} aria-label="Cómo funciona Yunora">
      <header className={styles.head}>
        <p className={styles.kicker}>Así de fácil</p>
        <h2>Cómo funciona</h2>
        <p className={styles.lead}>
          En <strong>tres pasos</strong> creas una invitación que se siente suya: para la familia de sangre y la que eligieron en el camino.
        </p>
      </header>

      {/* Timeline / Stepper animado */}
      <div className={styles.timeline} aria-hidden="true">
        <div className={`${styles.rail} ${inView ? styles.railOn : ""}`} />
        {STEPS.map((s, idx) => (
          <div
            key={s.id}
            className={`${styles.node} ${activeStep === s.id ? styles.activeNode : ""}`}
            style={{ animationDelay: `${200 * (idx + 1)}ms` }}
          >
            <span>{s.id}</span>
          </div>
        ))}
      </div>

      {/* Cards con fade-up + highlight al hover/focus */}
      <ol className={styles.grid}>
        {STEPS.map(({ id, title, caption, bullets, cta, Icon }, idx) => (
          <li
            key={id}
            className={`${styles.card} ${inView ? styles.cardIn : ""}`}
            style={{ animationDelay: `${180 * (idx + 1)}ms` }}
            onMouseEnter={() => setActiveStep(id)}
            onMouseLeave={() => setActiveStep(null)}
            onFocus={() => setActiveStep(id)}
            onBlur={() => setActiveStep(null)}
          >
            <div className={styles.iconRow}>
              <div className={styles.iconWrap}><Icon className={styles.icon} /></div>
              <div className={styles.titleCol}>
                <p className={styles.stepTag}>Paso {id}</p>
                <h3 className={styles.title}>{title}</h3>
              </div>
            </div>

            <p className={styles.caption}>{caption}</p>

            <ul className={styles.bullets}>
              {bullets.map((b, i) => (<li key={i}>{b}</li>))}
            </ul>

            <a className={styles.cta} href={cta.href}>{cta.label}</a>
          </li>
        ))}
      </ol>

      <p className={styles.note}>
        ¿Planeas varios eventos? Revisa los <a href="#plans">planes para agencias</a>.
      </p>
    </section>
  );
}
