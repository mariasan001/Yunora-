"use client";
import styles from "@/app/crear/editor.module.css";
import { Config } from "../../features/invite/types";

export default function ContentPanel({
  cfg, onDataChange,
}: {
  cfg: Config;
  onDataChange: <K extends keyof Config["data"]>(key: K, value: Config["data"][K]) => void;
}) {
  return (
    <div className={styles.group}>
      <h3>Contenido</h3>

      <label className={styles.label}>
        Título
        <input
          className={styles.control}
          value={cfg.data.title}
          onChange={(e)=>onDataChange("title", e.target.value)}
        />
      </label>

      <label className={styles.label}>
        Tipo de evento
        <input
          className={styles.control}
          value={cfg.data.subtitle}
          onChange={(e)=>onDataChange("subtitle", e.target.value)}
        />
      </label>

      <label className={styles.label}>
        Mensaje
        <textarea
          className={styles.control}
          rows={3}
          value={cfg.data.message}
          onChange={(e)=>onDataChange("message", e.target.value)}
        />
      </label>

      <div className={styles.fieldRow}>
        <label className={styles.label}>
          Fecha
          <input
            className={styles.control}
            type="date"
            value={cfg.data.date}
            onChange={(e)=>onDataChange("date", e.target.value)}
          />
        </label>

        <label className={styles.label}>
          Hora
          <input
            className={styles.control}
            type="time"
            value={cfg.data.time}
            onChange={(e)=>onDataChange("time", e.target.value)}
          />
        </label>
      </div>

      <label className={styles.label}>
        Lugar
        <input
          className={styles.control}
          value={cfg.data.location}
          onChange={(e)=>onDataChange("location", e.target.value)}
        />
      </label>

      <label className={styles.label}>
        Texto del botón
        <input
          className={styles.control}
          value={cfg.data.rsvpLabel}
          onChange={(e)=>onDataChange("rsvpLabel", e.target.value)}
        />
      </label>
    </div>
  );
}
