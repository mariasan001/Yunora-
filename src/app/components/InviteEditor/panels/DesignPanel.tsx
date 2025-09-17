"use client";
import styles from "@/app/crear/editor.module.css";
import { Config, Variant } from "../../features/invite/types";
import type { Plan } from "@/lib/plans";

type Props = {
  cfg: Config;
  plan: Plan;
  variants: readonly Variant[];
  onVariantChange: (v: Variant) => void;
  onColorsChange: (colors: Config["colors"]) => void;
};

export default function DesignPanel({ cfg, plan, variants, onVariantChange, onColorsChange }: Props) {
  const isFree = plan === "free";
  return (
    <div className={styles.group}>
      <h3>Ajustes</h3>

      <div className={styles.label} style={{ marginBottom: ".5rem" }}>
        <strong className={styles.sectionLead}>
          Plantillas ({isFree ? "Gratis" : "Plus"})
        </strong>
      </div>

      <div className={styles.tplChips} role="tablist" aria-label="Seleccionar plantilla">
        {variants.map((v) => (
          <button
            key={v}
            type="button"
            role="tab"
            aria-selected={cfg.variant === v}
            className={`${styles.tplChip} ${cfg.variant === v ? styles.tplChipActive : ""}`}
            onClick={() => onVariantChange(v)}
          >
            {labelFor(v)}
          </button>
        ))}
      </div>

      <div className={styles.sectionDivider} />

      <div className={styles.label}>
        <strong className={styles.sectionLead}>Colores</strong>
        <small className={styles.help}>
          {isFree ? "Solo el color primario" : "Primario y acento"}
        </small>
      </div>

      {/* Gratis: solo primario — Plus: primario y secundario */}
      <div className={styles.colorRow}>
        <label className={styles.colorItem}>
          <span>Primario</span>
          <input
            className={`${styles.control} ${styles.colorInput}`}
            type="color"
            value={cfg.colors.primary}
            onChange={(e) => onColorsChange({ ...cfg.colors, primary: e.target.value })}
          />
        </label>

        { !isFree && (
          <label className={styles.colorItem}>
            <span>Secundario</span>
            <input
              className={`${styles.control} ${styles.colorInput}`}
              type="color"
              value={cfg.colors.secondary}
              onChange={(e) => onColorsChange({ ...cfg.colors, secondary: e.target.value })}
            />
          </label>
        )}
      </div>

      <p className={styles.note}>
        La tipografía viene optimizada por plantilla para mantener la estética ✨
      </p>
    </div>
  );
}

function labelFor(v: Variant) {
  switch (v) {
    case "botanica":    return "Botánica";
    case "tipografica": return "Tipográfica";
    case "floral":      return "Floral";
    case "plusAurora":  return "Aurora (Plus)";
    default:            return v;
  }
}
