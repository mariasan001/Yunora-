// src/components/InviteEditor/panels/DesignPanel.tsx
"use client";

import styles from "@/app/crear/editor.module.css";
import { Config, Variant } from "../../features/invite/types";

type Props = {
  cfg: Config;
  variants: readonly Variant[];                 // 👈 variantes tipadas
  onVariantChange: (v: Variant) => void;        // 👈 acepta Variant
  onColorsChange: (colors: Config["colors"]) => void;
};

export default function DesignPanel({
  cfg, variants, onVariantChange, onColorsChange,
}: Props) {
  return (
    <div className={styles.group}>
      <h3>Ajustes</h3>

      <div className={styles.label} style={{ marginBottom: ".5rem" }}>
        <strong className={styles.sectionLead}>Plantilla (gratis)</strong>
      </div>

      <div className={styles.tplChips} role="tablist" aria-label="Seleccionar plantilla">
        {variants.map((v) => (
          <button
            key={v}
            type="button"
            role="tab"
            aria-selected={cfg.variant === v}
            className={`${styles.tplChip} ${cfg.variant === v ? styles.tplChipActive : ""}`}
            onClick={() => onVariantChange(v)}         // 👈 ahora coincide
          >
            {capitalize(v)}
          </button>
        ))}
      </div>

      <div className={styles.sectionDivider} />

      <div className={styles.label}>
        <strong className={styles.sectionLead}>Color</strong>
        <small className={styles.help}>Elige el color principal de tu invitación.</small>
      </div>

      <div className={styles.colorRow}>
        <label className={styles.colorItem}>
          <span>Primario</span>
          <input
            className={`${styles.control} ${styles.colorInput}`}
            type="color"
            value={cfg.colors.primary}
            onChange={(e) => onColorsChange({ ...cfg.colors, primary: e.target.value })}
            aria-label="Color primario"
          />
        </label>
      </div>

      <p className={styles.note}>
        La tipografía viene optimizada por plantilla para mantener la estética ✨
      </p>
    </div>
  );
}

function capitalize(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}
