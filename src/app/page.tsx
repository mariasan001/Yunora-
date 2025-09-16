import Footer from "./components/Footer";
import HowItWorks from "./components/HowItWorks";
import PricingToggle from "./components/PricingToggle";
import SupportCTA from "./components/SupportCTA";
import WhyYunora from "./components/WhyYunora";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.main}>
      {/* ===== NAVBAR ===== */}
      <header className={styles.navbar}>
        <div className={styles.logo}>Yunora ✨</div>
        <nav className={styles.menu}>
          <a href="#how">Cómo funciona</a>
          <a href="#plans">Paquetes</a>
          <a href="#contact">Contacto</a>
        </nav>
        <a href="#crear" className={styles.cta}>Crear Invitación</a>
      </header>

      {/* ===== HERO (pantalla completa) ===== */}
      <section className={styles.hero} aria-label="Yunora - Inicio">
        <div className={styles.heroInner}>
          <div className={styles.heroText}>
            <span className={styles.kicker}>Yunora es unión</span>
            <h1>
              Donde los <strong>lazos</strong> se encuentran
            </h1>
            <p className={styles.lead}>
              Invitaciones que cuentan tu historia: familia de sangre
              <span className={styles.dot}> • </span>
              familia que elegimos
              <span className={styles.dot}> • </span>
              momentos que nos unen.  
              Tecnología suave, emoción real.
            </p>

            <div className={styles.chips}>
              <span>👨‍👩‍👧‍👦 Celebraciones con sentido</span>
              <span>💫 Toque espiritual si quieres</span>
              <span>🤝 Hecho para tribus elegidas</span>
            </div>

            <div className={styles.ctaRow}>
              <a href="#crear" className={styles.heroPrimary}>Crear mi invitación</a>
              <a href="#how" className={styles.heroSecondary}>Ver cómo funciona</a>
            </div>

            <small className={styles.note}>Empieza gratis. Sin tarjetas, sin fricción.</small>
          </div>

          {/* Si luego quieres ilustración, aquí va */}
          <div className={styles.heroArt} aria-hidden="true" />
        </div>
      </section>

      {/* ===== HOW IT WORKS ===== */}
      <HowItWorks />

      {/* ===== DIFERENCIADORES ===== */}
   <WhyYunora />

      {/* ===== PLANES con toggle Público | Agencia ===== */}
      <PricingToggle />

      {/* ===== CTA FINAL ===== */}
      {/* ===== Acompañamiento / CTA final ===== */}
      <SupportCTA />

      {/* ===== FOOTER ===== */}
     <Footer />
    </main>
  );
}
