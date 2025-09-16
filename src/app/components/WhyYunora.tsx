import styles from "./WhyYunora.module.css";

/* Iconitos inline (puedes cambiarlos por /public/icons/*.svg cuando gustes) */
function IconWand(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path d="M4 20l9-9m2-6l.9 1.7L19 7l-1.7.9L16.4 10l-.9-1.7L13 7l1.7-.9L15.6 4z" fill="none" stroke="currentColor" strokeWidth="1.5"/>
      <rect x="3" y="19" width="2" height="2" rx=".5" />
    </svg>
  );
}
function IconHeartLink(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path d="M12 20s-6.5-3.8-8.5-7A4.5 4.5 0 0 1 8.8 6 5 5 0 0 1 12 7a5 5 0 0 1 3.2-1 4.5 4.5 0 0 1 5.3 7c-2 3.2-8.5 7-8.5 7z" fill="none" stroke="currentColor" strokeWidth="1.5"/>
    </svg>
  );
}
function IconHeadset(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path d="M4 12a8 8 0 0 1 16 0v5" fill="none" stroke="currentColor" strokeWidth="1.5"/>
      <rect x="3" y="12" width="4" height="6" rx="1.5"/>
      <rect x="17" y="12" width="4" height="6" rx="1.5"/>
      <path d="M12 18v2a3 3 0 0 0 3 3h1" fill="none" stroke="currentColor" strokeWidth="1.5"/>
    </svg>
  );
}
function IconBolt(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path d="M13 2L3 14h6l-2 8 10-12h-6l2-8z" fill="currentColor"/>
    </svg>
  );
}
function IconFlagMx(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 16" aria-hidden="true" {...props}>
      <rect width="8" height="16" x="0" y="0" fill="#006847"/>
      <rect width="8" height="16" x="8" y="0" fill="#fff"/>
      <rect width="8" height="16" x="16" y="0" fill="#ce1126"/>
      <circle cx="12" cy="8" r="1.5" fill="#b8860b"/>
    </svg>
  );
}
function IconShield(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6l8-3z" fill="none" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M9 12l2 2 4-4" fill="none" stroke="currentColor" strokeWidth="1.5"/>
    </svg>
  );
}

const reasons = [
  {
    Icon: IconWand,
    title: "Personalización de verdad",
    desc: "No es una plantilla rígida: ajusta tono, colores, tipografías y secciones para que cuente su historia.",
  },
  {
    Icon: IconHeartLink,
    title: "Hecho para su gente",
    desc: "Para la familia de sangre y la familia que eligieron en el camino. Textos guía para hablar en su propia voz.",
  },
  {
    Icon: IconHeadset,
    title: "Acompañamiento cercano",
    desc: "Soporte humano y claro. Si hay dudas, aquí estamos—sin rodeos.",
  },
  {
    Icon: IconBolt,
    title: "Simple y rápido",
    desc: "Vista previa inmediata y flujo en minutos. Lo importante: celebrar, no complicarse.",
  },
  {
    Icon: IconFlagMx,
    title: "Identidad con raíz",
    desc: "Diseño con calidez latino/mex, sin clichés. Elegante, actual, con alma.",
  },
  {
    Icon: IconShield,
    title: "Privacidad y control",
    desc: "Tú decides quién ve la invitación. Puedes desactivarla o borrarla cuando quieras.",
  },
] as const;

export default function WhyYunora() {
  return (
    <section id="why" className={styles.wrap} aria-label="¿Por qué Yunora?">
      <div className={styles.head}>
        <p className={styles.kicker}>Hecho para ti</p>
        <h2>¿Por qué Yunora?</h2>
        <p className={styles.lead}>
          Porque cada reunión tiene un corazón distinto. Yunora no impone un molde:
          te damos herramientas para que la invitación se sienta <strong>suya</strong>,
          con el nivel de cuidado que pondrías al prepararla en casa.
        </p>
      </div>

      <div className={styles.grid}>
        {reasons.map(({ Icon, title, desc }, i) => (
          <article key={i} className={styles.card}>
            <div className={styles.iconWrap}>
              <Icon className={styles.icon} />
            </div>
            <h3 className={styles.title}>{title}</h3>
            <p className={styles.desc}>{desc}</p>
          </article>
        ))}
      </div>

      {/* Franja de confianza + mini testimonio */}
      <div className={styles.trust}>
        <div className={styles.badges}>
          <span>✨ Sin marca en Plus/Premium</span>
          <span>🪪 QR opcional</span>
          <span>💬 RSVP por mensajería</span>
        </div>
        <blockquote className={styles.quote}>
          “Se sintió nuestra, no ‘una más’. Mis papás y mis amigos entendieron el tono al instante.”
          <cite>— Ana &amp; Luis</cite>
        </blockquote>
      </div>

      <div className={styles.actions}>
       <a href="/crear" className={styles.primary}>
       Crear mi invitación
      </a>
        <a href="#how" className={styles.secondary}>Ver cómo funciona</a>
      </div>
    </section>
  );
}
