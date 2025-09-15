"use client";
import { useState } from "react";
import styles from "./PricingToggle.module.css";

export default function PricingToggle() {
  const [isAgency, setIsAgency] = useState(false);

  return (
    <section id="plans" className={styles.wrapper}>
      {/* Toggle */}
      <div className={styles.toggle}>
        <button
          className={!isAgency ? styles.active : ""}
          onClick={() => setIsAgency(false)}
        >
          👤 Público
        </button>
        <button
          className={isAgency ? styles.active : ""}
          onClick={() => setIsAgency(true)}
        >
          🏢 Agencia
        </button>
      </div>

      {/* Planes */}
      <div className={styles.plans}>
        {!isAgency ? (
          <>
            <div className={styles.plan}>
              <h3>Gratis</h3>
              <p>Plantillas básicas con marca Yunora.</p>
              <strong>$0</strong>
            </div>
            <div className={styles.plan}>
              <h3>Plus</h3>
              <p>Plantillas premium + RSVP avanzado.</p>
              <strong>$149 MXN</strong>
            </div>
            <div className={styles.plan}>
              <h3>Premium</h3>
              <p>Incluye QR, álbum de fotos y soporte.</p>
              <strong>$299 MXN</strong>
            </div>
          </>
        ) : (
          <>
            <div className={styles.plan}>
              <h3>Agencia Start</h3>
              <p>Ilimitadas con marca Yunora.</p>
              <strong>$999 MXN/año</strong>
            </div>
            <div className={styles.plan}>
              <h3>Agencia Pro</h3>
              <p>Ilimitadas, sin marca, todas las plantillas.</p>
              <strong>$2,499 MXN/año</strong>
            </div>
            <div className={styles.plan}>
              <h3>Agencia Elite</h3>
              <p>Ilimitadas + dominio personalizado + soporte.</p>
              <strong>$4,999 MXN/año</strong>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
