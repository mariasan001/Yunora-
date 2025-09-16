"use client";
import styles from "@/app/crear/editor.module.css";
import type { Config } from "../../features/invite/types";

export default function ContentPanel({
  cfg,
  onDataChange,
}: {
  cfg: Config;
  onDataChange: <K extends keyof Config["data"]>(
    key: K,
    value: Config["data"][K]
  ) => void;
}) {
  return (
    <div className={styles.group}>
      <h3>Contenido</h3>

      {/* Nombres */}
      <label className={styles.label}>
        Nombres de los novios
        <input
          className={styles.control}
          value={cfg.data.title}
          placeholder="Ej. Ana & David"
          onChange={(e) => onDataChange("title", e.target.value)}
          aria-label="Nombres de los novios"
        />
      </label>

      {/* Línea de invitación / mensaje */}
      <label className={styles.label}>
        Línea de invitación
        <textarea
          className={styles.control}
          rows={3}
          value={cfg.data.message}
          placeholder="Tenemos el honor de invitarles a celebrar nuestra unión…"
          onChange={(e) => onDataChange("message", e.target.value)}
          aria-label="Línea de invitación"
        />
        <small className={styles.hint}>
          Puedes dejarla en blanco si no la necesitas.
        </small>
      </label>

      {/* Fecha y hora */}
      <div className={styles.fieldRow}>
        <label className={styles.label}>
          Fecha
          <input
            className={styles.control}
            type="date"
            value={cfg.data.date}
            onChange={(e) => onDataChange("date", e.target.value)}
            aria-label="Fecha del evento"
          />
        </label>

        <label className={styles.label}>
          Hora
          <input
            className={styles.control}
            type="time"
            value={cfg.data.time}
            onChange={(e) => onDataChange("time", e.target.value)}
            aria-label="Hora del evento"
          />
        </label>
      </div>

      {/* Lugar */}
      <label className={styles.label}>
        Lugar
        <input
          className={styles.control}
          value={cfg.data.location}
          placeholder="Ej. Las Palmas Quintas, Monterrey"
          onChange={(e) => onDataChange("location", e.target.value)}
          aria-label="Lugar del evento"
        />
      </label>

      {/* Vestimenta + botón */}
      <div className={styles.fieldRow}>
        <label className={styles.label}>
          Vestimenta
          {/* Reutilizamos 'subtitle' como vestimenta */}
          <input
            className={styles.control}
            value={cfg.data.subtitle}
            placeholder="Ej. Formal"
            onChange={(e) => onDataChange("subtitle", e.target.value)}
            aria-label="Vestimenta sugerida"
          />
          <small className={styles.hint}>
            Se mostrará al pie (p. ej., “VESTIMENTA FORMAL — NO NIÑOS”).
          </small>
        </label>

        <label className={styles.label}>
          Texto del botón
          <input
            className={styles.control}
            value={cfg.data.rsvpLabel}
            placeholder="Confirmar asistencia"
            onChange={(e) => onDataChange("rsvpLabel", e.target.value)}
            aria-label="Texto del botón principal"
          />
        </label>
      </div>
    </div>
  );
}
