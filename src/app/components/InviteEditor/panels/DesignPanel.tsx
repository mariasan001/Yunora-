"use client";
import styles from "@/app/crear/editor.module.css";
import { Config, Variant } from "../../features/invite/types";

export default function DesignPanel({
  cfg, variants, onColorsChange, onVariantChange,
}: {
  cfg: Config;
  variants: Variant[];
  onColorsChange: (colors: Config["colors"]) => void;
  onVariantChange: (v: Variant) => void;
}) {
  return (
    <div className={styles.group}>
      <h3>Plantilla (gratis)</h3>

      <div className={styles.tplChips} role="tablist" aria-label="Elegir plantilla">
        {variants.map((v) => (
          <button
            key={v}
            role="tab"
            aria-selected={cfg.variant === v}
            type="button"
            className={`${styles.tplChip} ${cfg.variant === v ? styles.tplChipActive : ""}`}
            onClick={() => onVariantChange(v)}
            title={`Elegir ${labelOf(v)}`}
          >
            {labelOf(v)}
          </button>
        ))}
      </div>

      <h3 style={{marginTop:".8rem"}}>Colores</h3>
      <div className={styles.colors}>
        <div>
          <label>Primario</label>
          <input className={styles.control} type="color" value={cfg.colors.primary}
            onChange={(e)=>onColorsChange({ ...cfg.colors, primary: e.target.value })}/>
        </div>
        <div>
          <label>Secundario</label>
          <input className={styles.control} type="color" value={cfg.colors.secondary}
            onChange={(e)=>onColorsChange({ ...cfg.colors, secondary: e.target.value })}/>
        </div>
        <div>
          <label>Fondo</label>
          <input className={styles.control} type="color" value={cfg.colors.bg}
            onChange={(e)=>onColorsChange({ ...cfg.colors, bg: e.target.value })}/>
        </div>
      </div>

      <p className={styles.hint}>La tipografía viene optimizada por plantilla para mantener la estética ✨</p>
    </div>
  );
}

function labelOf(v: Variant) {
  switch (v) {
    case "botanica": return "Botánica";
    case "tipografica": return "Tipográfica";
    case "floral": return "Floral";
  }
}
