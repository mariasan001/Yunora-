// src/components/InviteEditor/index.tsx
"use client";

import Link from "next/link";
import styles from "@/app/crear/editor.module.css";
import { titleForType } from "@/lib/events";
import { canUse, Plan } from "@/lib/plans";
import type { EventType } from "@/lib/events";

import PlanBar from "./parts/PlanBar";
import DesignPanel from "./panels/DesignPanel";
import ContentPanel from "./panels/ContentPanel";
import ExtrasPanel from "./panels/ExtrasPanel";
import TemplateSwitcher from "./preview/TemplateSwitcher";
import { useInviteState } from "../features/hooks/useInviteState";

export default function InviteEditor({ initialType }: { initialType: EventType }) {
  const {
    cfg, variants, changeVariant, onColorsChange, onDataChange,
    plan, choosePlan, PLAN_ORDER, PLAN_LABEL,
    fontCSS, previewLink, shareWhatsApp,
  } = useInviteState(initialType);
// 1) deja fuera "agency" con tipado estricto
const VISIBLE_PLANS = PLAN_ORDER.filter(
  (p): p is Exclude<Plan, "agency"> => p !== "agency"
);

  return (
    <main className={styles.wrap}>
{/* ===== TOOLBAR FIJA (pulida) ===== */}
    <div className={styles.toolbar} role="region" aria-label="Barra del editor">
      <div className={styles.tLeft}>
        <Link href="/crear" className={styles.back}>← Regresar</Link>
      </div>

      <div className={styles.tCenter}>
        <h1 className={styles.title}>
          <span className={styles.tStrong}>Editor —</span>{" "}
          <span className={styles.tSoft}>{titleForType(cfg.type)}</span>
        </h1>
      </div>

      <div className={styles.tRight}>
        {/* Solo Gratis / Plus / Premium (sin Agencia) */}
    <PlanBar
  order={VISIBLE_PLANS}
  label={PLAN_LABEL}
  value={plan}
  onChange={choosePlan}
  className={styles.planSlim}
/>

        <a
          className={styles.btnPrimary}
          href={previewLink}
          target="_blank"
          rel="noopener noreferrer"
        >
          Previsualizar
        </a>

        <button
          className={`${styles.btnSecondary} ${!canUse("removeWatermark", plan) ? styles.btnWatermark : ""}`}
          onClick={shareWhatsApp}
        >
          {canUse("removeWatermark", plan) ? "Compartir" : "Compartir (marca de agua)"}
        </button>
      </div>
</div>
      {/* ===== CONTENIDO ===== */}
      <section className={styles.editor}>
        {/* Panel izquierdo (sticky) */}
        <aside className={styles.panel} aria-label="Panel de edición">
          <div className={styles.panelHeader}>Ajustes</div>

          <DesignPanel
            cfg={cfg}
            variants={variants}
            onVariantChange={changeVariant}
            onColorsChange={onColorsChange}
          />

          <div className={styles.sectionDivider} />

          <ContentPanel cfg={cfg} onDataChange={onDataChange} />

          <div className={styles.sectionDivider} />

          <ExtrasPanel plan={plan} choosePlan={choosePlan} />
        </aside>

        {/* Lienzo / Vista */}
        <div className={styles.canvas}>
          {/* 👇 NUEVO: contenedor para anclar la preview a la izquierda y controlar su ancho */}
          <div className={styles.canvasInner}>
            <TemplateSwitcher
              cfg={cfg}
              fontCSS={fontCSS}
              watermark={!canUse("removeWatermark", plan)}
            />
          </div>
        </div>
      </section>
    </main>
  );
}
