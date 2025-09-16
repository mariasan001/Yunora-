import styles from "./SupportCTA.module.css";

export default function SupportCTA() {
  return (
    <section className={styles.wrap} aria-label="Acompañamiento y llamada a la acción">
      <div className={styles.inner}>
        <p className={styles.kicker}>Estamos contigo</p>
        <h2 className={styles.title}>
          No estás solo. Haz tu celebración <span>inolvidable</span>.
        </h2>
        <p className={styles.lead}>
          Crea tu invitación hoy y, si quieres afinar colores y estilo para que todo respire su historia,
          cuenta con nuestra asesoría. Sin estrés, con cariño y claridad.
        </p>

        <div className={styles.chips}>
          <span>💬 Ayuda humana cuando la necesites</span>
          <span>🎨 Paletas y tipografías sugeridas</span>
          <span>🧭 Guías de texto listas para usar</span>
        </div>

        <div className={styles.ctaRow}>
          <a href="#crear" className={styles.primary}>Crear mi invitación</a>
          <a href="#contact" className={styles.secondary}>Pedir asesoría</a>
        </div>

        <p className={styles.note}>
          Asesoría de color y estilo <strong>incluida en Yunora Plus y Premium</strong>.
          En plan Gratis disponible como extra.
        </p>
      </div>
    </section>
  );
}
