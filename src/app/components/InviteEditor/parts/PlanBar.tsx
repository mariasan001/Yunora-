"use client";
import styles from "@/app/crear/editor.module.css";
import type { Plan } from "@/lib/plans";

export default function PlanBar({
  order, label, value, onChange,
}: {
  order: Plan[]; label: Record<Plan,string>;
  value: Plan; onChange: (p: Plan) => void;
}) {
  return (
    <div className={styles.planBar} aria-label="Seleccionar plan">
      {order.map(p => (
        <button
          key={p}
          type="button"
          className={`${styles.planChip} ${value === p ? styles.planChipActive : ""}`}
          onClick={() => onChange(p)}
          aria-pressed={value === p}
          title={`Plan ${label[p]}`}
        >
          {label[p]}
        </button>
      ))}
    </div>
  );
}
