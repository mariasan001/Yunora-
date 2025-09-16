import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer} role="contentinfo">
      {/* Borde superior decorativo */}
      <div className={styles.topGlow} aria-hidden="true" />

      <div className={styles.inner}>
        {/* Marca */}
        <div className={styles.brand}>
          <a href="/" className={styles.logo} aria-label="Yunora inicio">
            Yunora ✨
          </a>
          <p className={styles.tagline}>
            Invitaciones digitales que se sienten suyas: para la familia de sangre
            y la familia que eligieron en el camino.
          </p>

          <div className={styles.social}>
            <a href="#" aria-label="Instagram" className={styles.socialBtn}>
              <svg viewBox="0 0 24 24" className={styles.icon}>
                <path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5z" fill="none" stroke="currentColor" strokeWidth="1.5"/>
                <circle cx="12" cy="12" r="3.5" />
                <circle cx="17.5" cy="6.5" r="1"/>
              </svg>
            </a>
            <a href="#" aria-label="WhatsApp" className={styles.socialBtn}>
              <svg viewBox="0 0 24 24" className={styles.icon}>
                <path d="M20 11.5A8.5 8.5 0 1 1 11.5 3 8.5 8.5 0 0 1 20 11.5z" fill="none" stroke="currentColor" strokeWidth="1.5"/>
                <path d="M7.5 19 6 22l3-1.5" fill="none" stroke="currentColor" strokeWidth="1.5"/>
                <path d="M8.5 10.5c0 3 3 5 3.5 5.5s2-.5 2.5-1" fill="none" stroke="currentColor" strokeWidth="1.5"/>
              </svg>
            </a>
            <a href="mailto:hola@yunora.mx" aria-label="Correo" className={styles.socialBtn}>
              <svg viewBox="0 0 24 24" className={styles.icon}>
                <path d="M4 6h16v12H4z" fill="none" stroke="currentColor" strokeWidth="1.5"/>
                <path d="M4 7l8 6 8-6" fill="none" stroke="currentColor" strokeWidth="1.5"/>
              </svg>
            </a>
          </div>
        </div>

        {/* Links */}
        <nav className={styles.links} aria-label="Enlaces del sitio">
          <div>
            <h4>Producto</h4>
            <ul>
              <li><a href="#how">Cómo funciona</a></li>
              <li><a href="#plans">Paquetes</a></li>
              <li><a href="#crear">Crear invitación</a></li>
            </ul>
          </div>
          <div>
            <h4>Soporte</h4>
            <ul>
              <li><a href="#contact">Contacto</a></li>
              <li><a href="#">Guía rápida</a></li>
              <li><a href="#">Preguntas frecuentes</a></li>
            </ul>
          </div>
          <div>
            <h4>Legal</h4>
            <ul>
              <li><a href="#">Términos</a></li>
              <li><a href="#">Privacidad</a></li>
              <li><a href="#">Cookies</a></li>
            </ul>
          </div>
          <div>
            <h4>Contacto</h4>
            <ul className={styles.contactList}>
              <li><a href="mailto:hola@yunora.mx">hola@yunora.mx</a></li>
              <li>CDMX, México</li>
            </ul>
          </div>
        </nav>
      </div>

      {/* Barra inferior */}
      <div className={styles.bottom}>
        <p>
          © 2025 <strong>Yunora</strong>. Todos los derechos reservados.
          &nbsp;·&nbsp; Desarrollado por{" "}
          <a href="#" className={styles.creditBrand} rel="noopener noreferrer">
            aurenna
          </a>
        </p>
      </div>
    </footer>
  );
}
