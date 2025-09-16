"use client";

import Link from "next/link";
import styles from "@/app/crear/editor.module.css";
import previewStyles from "@/app/crear/preview.module.css"; // asegura bundling
import { titleForType } from "@/lib/events";
import { canUse } from "@/lib/plans";
import type { EventType } from "@/lib/events";

import PlanBar from "./parts/PlanBar";
import DesignPanel from "./panels/DesignPanel";
import ContentPanel from "./panels/ContentPanel";
import ExtrasPanel from "./panels/ExtrasPanel";
import Preview from "./preview/Preview";
import { useInviteState } from "../features/hooks/useInviteState";

export default function InviteEditor({ initialType }: { initialType: EventType }) {
  const {
    cfg, variants, changeVariant, onColorsChange, onDataChange,
    plan, choosePlan, PLAN_ORDER, PLAN_LABEL,
    fontCSS, previewLink, shareWhatsApp,
  } = useInviteState(initialType);

  return (
    <main className={styles.wrap}>
      <header className={styles.header}>
        <Link href="/crear" className={styles.back}>← Cambiar tipo</Link>
        <h1>Editor — {titleForType(cfg.type)}</h1>

        <div className={styles.actions}>
          <PlanBar order={PLAN_ORDER} label={PLAN_LABEL} value={plan} onChange={choosePlan} />
          <a className={styles.btnPrimary} href={previewLink} target="_blank" rel="noopener noreferrer">Previsualizar</a>
          <button className={styles.btnSecondary} onClick={shareWhatsApp}>
            Compartir {canUse("removeWatermark", plan) ? "" : "(marca de agua)"}
          </button>
        </div>
      </header>

      <section className={styles.editor}>
        <aside className={styles.panel}>
          <DesignPanel
            cfg={cfg}
            variants={variants}
            onVariantChange={changeVariant}
            onColorsChange={onColorsChange}
          />
          <ContentPanel cfg={cfg} onDataChange={onDataChange} />
          <ExtrasPanel plan={plan} choosePlan={choosePlan} />
        </aside>

        <div>
          <Preview cfg={cfg} fontCSS={fontCSS} watermark={!canUse("removeWatermark", plan)} />
          <div className={styles.footerBar}>
            <a className={styles.btnPrimary} href={previewLink} target="_blank" rel="noopener noreferrer">Abrir vista previa</a>
            <button className={styles.btnSecondary} onClick={shareWhatsApp}>Compartir</button>
          </div>
        </div>
      </section>
    </main>
  );
}
