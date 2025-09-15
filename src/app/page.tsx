import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.main}>
      {/* ===== NAVBAR ===== */}
      <header className={styles.navbar}>
        <div className={styles.logo}>Yunora ✨</div>
        <nav>
          <a href="#how">Cómo funciona</a>
          <a href="#plans">Paquetes</a>
          <a href="#contact">Contacto</a>
        </nav>
        <a href="#crear" className={styles.cta}>Crear Invitación</a>
      </header>

      {/* ===== HERO ===== */}
      <section className={styles.hero}>
        <h1>Donde los corazones se encuentran ❤️</h1>
        <p>Invitaciones digitales únicas, rápidas y llenas de emoción.</p>
        <a href="#crear" className={styles.heroBtn}>Empieza Gratis</a>
      </section>

      {/* ===== HOW IT WORKS ===== */}
      <section id="how" className={styles.section}>
        <h2>Cómo funciona</h2>
        <div className={styles.steps}>
          <div><span>1️⃣</span><p>Elige tu evento</p></div>
          <div><span>2️⃣</span><p>Personaliza tu invitación</p></div>
          <div><span>3️⃣</span><p>Compártela al instante</p></div>
        </div>
      </section>

      {/* ===== DIFERENCIADORES ===== */}
      <section className={styles.section}>
        <h2>¿Por qué Yunora?</h2>
        <ul className={styles.features}>
          <li>✅ Confirmación por WhatsApp</li>
          <li>✅ QR para acceso seguro</li>
          <li>✅ Plantillas cálidas y personalizadas</li>
          <li>✅ Todo en menos de 5 minutos</li>
        </ul>
      </section>

      {/* ===== PLANES ===== */}
      <section id="plans" className={styles.section}>
        <h2>Paquetes</h2>
        <div className={styles.plans}>
          <div className={styles.plan}>
            <h3>Gratis</h3>
            <p>Plantillas básicas para empezar.</p>
          </div>
          <div className={styles.plan}>
            <h3>Yunora Plus</h3>
            <p>Más estilos y RSVP avanzado.</p>
          </div>
          <div className={styles.plan}>
            <h3>Yunora Premium</h3>
            <p>Incluye QR + álbum de fotos + soporte dedicado.</p>
          </div>
        </div>
      </section>

      {/* ===== CTA FINAL ===== */}
      <section className={styles.ctaFinal}>
        <h2>Haz que tu celebración sea inolvidable ✨</h2>
        <a href="#crear" className={styles.heroBtn}>Crear Invitación</a>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className={styles.footer}>
        <p>© 2025 Yunora. Todos los derechos reservados.</p>
      </footer>
    </main>
  );
}
