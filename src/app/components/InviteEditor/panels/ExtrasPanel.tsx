"use client";
import styles from "@/app/crear/editor.module.css";
import { Lock } from "lucide-react";
import type { Plan } from "@/lib/plans";
import { canUse } from "@/lib/plans";

export default function ExtrasPanel({
  plan, choosePlan,
}: { plan: Plan; choosePlan: (p: Plan) => void }) {
  return (
    <div className={styles.group}>
      <h3>Extras</h3>

      {/* RSVP avanzado */}
      <div className={styles.lockWrap}>
        {!canUse("rsvpAdvanced", plan) && (
          <div className={styles.lockOverlay}><p><Lock size={16}/> Plus</p></div>
        )}
        <div className={styles.upsell}>
          <span className={styles.badgePro}>RSVP avanzado</span>
          <small>Formulario con asistentes y recordatorios.</small>
          {!canUse("rsvpAdvanced", plan) && (
            <div className={styles.upsellActions}>
              <a href="#plans" className={styles.btnGold}>Ver planes</a>
              <button className={styles.btnGhost} onClick={()=>choosePlan("plus")}>Probar en demo</button>
            </div>
          )}
        </div>
      </div>

      {/* QR */}
      <div className={styles.lockWrap} style={{ marginTop: ".6rem" }}>
        {!canUse("qrAccess", plan) && (
          <div className={styles.lockOverlay}><p><Lock size={16}/> Premium</p></div>
        )}
        <div className={styles.upsell}>
          <span className={styles.badgePro}>QR de acceso</span>
          <small>Control de entrada con lista.</small>
          {!canUse("qrAccess", plan) && (
            <div className={styles.upsellActions}>
              <a href="#plans" className={styles.btnGold}>Subir a Premium</a>
              <button className={styles.btnGhost} onClick={()=>choosePlan("premium")}>Ver demo</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
