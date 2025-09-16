"use client";

import clsx from "clsx";
import styles from "@/app/crear/editor.module.css";
import type { Plan } from "@/lib/plans";

export default function PlanBar({
  order, label, value, onChange, className,
}: {
  order: Plan[];
  label: Record<Plan, string>;
  value: Plan;
  onChange: (p: Plan) => void;
  className?: string;
}) {
  return (
    <div
      className={clsx(styles.planGroup, className)}
      role="tablist"
      aria-label="Selecciona un plan"
    >
      {order.map((p) => (
        <button
          key={p}
          type="button"
          role="tab"
          aria-selected={value === p}
          className={clsx(styles.planPill, value === p && styles.planActive)}
          onClick={() => onChange(p)}
        >
          {label[p]}
        </button>
      ))}
    </div>
  );
}
