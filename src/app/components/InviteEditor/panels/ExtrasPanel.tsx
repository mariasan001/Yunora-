"use client";
import styles from "@/app/crear/editor.module.css";
import { Lock } from "lucide-react";
import type { Plan } from "@/lib/plans";
import { canUse } from "@/lib/plans";

export default function ExtrasPanel({
  plan,
  choosePlan,
}: {
  plan: Plan;
  choosePlan: (p: Plan) => void;
}) {
  const lockedRSVP = !canUse("rsvpAdvanced", plan);
  const lockedQR   = !canUse("qrAccess", plan);

  return (
    <section className={styles.group} aria-labelledby="extras-title">
      <h3 id="extras-title">Extras</h3>

      {/* RSVP avanzado */}
      <article
        className={styles.lockWrap}
        aria-disabled={lockedRSVP}
        aria-labelledby="rsvp-title"
      >
        {lockedRSVP && (
          <div className={styles.lockOverlay} aria-hidden="true">
            <p><Lock size={16} /> Plus</p>
          </div>
        )}

        <div className={styles.upsell}>
          <div className={styles.upsellHeader}>
            <span id="rsvp-title" className={styles.badgePro}>RSVP avanzado</span>
            <small className={styles.extraMeta}>
              Formulario con asistentes y recordatorios.
            </small>
          </div>

          {lockedRSVP && (
            <div className={styles.upsellActions}>
              <a href="#plans" className={styles.btnGold}>Ver planes</a>
              <button
                type="button"
                className={styles.btnGhost}
                onClick={() => choosePlan("plus")}
              >
                Probar en demo
              </button>
            </div>
          )}
        </div>
      </article>

      {/* QR acceso */}
      <article
        className={styles.lockWrap}
        aria-disabled={lockedQR}
        aria-labelledby="qr-title"
      >
        {lockedQR && (
          <div className={styles.lockOverlay} aria-hidden="true">
            <p><Lock size={16} /> Premium</p>
          </div>
        )}

        <div className={styles.upsell}>
          <div className={styles.upsellHeader}>
            <span id="qr-title" className={styles.badgePro}>QR de acceso</span>
            <small className={styles.extraMeta}>
              Control de entrada con lista y códigos.
            </small>
          </div>

          {lockedQR && (
            <div className={styles.upsellActions}>
              <a href="#plans" className={styles.btnGold}>Subir a Premium</a>
              <button
                type="button"
                className={styles.btnGhost}
                onClick={() => choosePlan("premium")}
              >
                Ver demo
              </button>
            </div>
          )}
        </div>
      </article>
    </section>
  );
}
