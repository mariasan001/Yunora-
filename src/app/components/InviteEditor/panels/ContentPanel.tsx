// components/InviteEditor/panels/ContentPanel.tsx
"use client";
import styles from "@/app/crear/editor.module.css";
import type { Config } from "../../features/invite/types";

export default function ContentPanel({
  cfg, onDataChange,
}: {
  cfg: Config;
  onDataChange: <K extends keyof Config["data"]>(key: K, value: Config["data"][K]) => void;
}) {
  const isBotanica = cfg.variant === "botanica";

  return (
    <div className={styles.group}>
      <h3>Contenido</h3>

      {/* Nombres */}
      <label className={styles.label}>
        Nombres de los novios
        <input
          className={styles.control}
          value={cfg.data.title}
          onChange={(e)=>onDataChange("title", e.target.value)}
          placeholder="Marcela & Andrés"
        />
      </label>

      {/* Línea de invitación (se ve en el centro de la tarjeta) */}
      <label className={styles.label}>
        Línea de invitación
        <input
          className={styles.control}
          value={cfg.data.inviteLine ?? ""}
          onChange={(e)=>onDataChange("inviteLine", e.target.value)}
          placeholder="Tenemos el honor de invitarlos a celebrar nuestra unión…"
        />
      </label>

      {/* Textos superiores (opcionales) */}
      <div className={styles.fieldRow}>
        <label className={styles.label}>
          Texto superior
          <input
            className={styles.control}
            value={cfg.data.kicker ?? ""}
            onChange={(e)=>onDataChange("kicker", e.target.value)}
            placeholder="¡NOS CASAMOS!"
          />
        </label>
        <label className={styles.label}>
          Subtítulo superior
          <input
            className={styles.control}
            value={cfg.data.blessing ?? ""}
            onChange={(e)=>onDataChange("blessing", e.target.value)}
            placeholder="CON LA BENDICIÓN DE DIOS Y NUESTROS PADRES"
          />
        </label>
      </div>

      {/* Fecha y hora */}
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

      {/* Lugar */}
      <label className={styles.label}>
        Lugar
        <input
          className={styles.control}
          value={cfg.data.location}
          onChange={(e)=>onDataChange("location", e.target.value)}
          placeholder="Las Palmas Quintas, Monterrey"
        />
      </label>

      {/* Vestimenta + Niños */}
      <div className={styles.fieldRow}>
        <label className={styles.label}>
          Vestimenta
          <input
            className={styles.control}
            value={cfg.data.attire ?? ""}
            onChange={(e)=>onDataChange("attire", e.target.value)}
            placeholder="VESTIMENTA FORMAL"
          />
        </label>

        <label className={styles.label}>
          ¿Niños?
          <select
            className={styles.control}
            value={(cfg.data.kidsAllowed ?? false) ? "si" : "no"}
            onChange={(e)=>onDataChange("kidsAllowed", e.target.value === "si")}
          >
            <option value="no">No niños</option>
            <option value="si">Con niños</option>
          </select>
        </label>
      </div>

      {/* RSVP: oculto en Botánica */}
      {!isBotanica && (
        <label className={styles.label}>
          Texto del botón
          <input
            className={styles.control}
            value={cfg.data.rsvpLabel}
            onChange={(e)=>onDataChange("rsvpLabel", e.target.value)}
            placeholder="Confirmar asistencia"
          />
        </label>
      )}
    </div>
  );
}
