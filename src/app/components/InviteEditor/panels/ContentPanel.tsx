"use client";
import styles from "@/app/crear/editor.module.css";
import type { Config } from "../../features/invite/types";
import type { Plan } from "@/lib/plans";

export default function ContentPanel({
  cfg, plan, onDataChange,
}: {
  cfg: Config;
  plan: Plan;
  onDataChange: <K extends keyof Config["data"]>(key: K, value: Config["data"][K]) => void;
}) {
  const isBotanica = cfg.variant === "botanica";
  const isFree = plan === "free";

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

      {/* Línea de invitación */}
      <label className={styles.label}>
        Línea de invitación
        <input
          className={styles.control}
          value={cfg.data.inviteLine ?? ""}
          onChange={(e)=>onDataChange("inviteLine", e.target.value)}
          placeholder="Tenemos el honor de invitarlos a celebrar nuestra unión…"
        />
      </label>

      {/* Superiores */}
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

      {/* RSVP: oculto en Botánica (Gratis), visible en otras */}
      {(!isBotanica || !isFree) && (
        <label className={styles.label}>
          Texto del botón
          <input
            className={styles.control}
            value={cfg.data.rsvpLabel ?? ""}
            onChange={(e)=>onDataChange("rsvpLabel", e.target.value)}
            placeholder="Confirmar asistencia"
          />
        </label>
      )}

      {/* ===== PLUS EXTRA CAMPOS ===== */}
      { !isFree && (
        <>
          <div className={styles.sectionDivider} />

          <h4 className={styles.subhead}>Ceremonia</h4>
          <div className={styles.fieldRow}>
            <label className={styles.label}>
              Título
              <input className={styles.control}
                value={cfg.data.ceremonyTitle ?? ""}
                onChange={(e)=>onDataChange("ceremonyTitle", e.target.value)}
                placeholder="Ceremonia" />
            </label>
            <label className={styles.label}>
              Hora
              <input className={styles.control}
                type="time"
                value={cfg.data.ceremonyTime ?? ""}
                onChange={(e)=>onDataChange("ceremonyTime", e.target.value)} />
            </label>
          </div>
          <label className={styles.label}>
            Dirección / lugar
            <input className={styles.control}
              value={cfg.data.ceremonyAddress ?? ""}
              onChange={(e)=>onDataChange("ceremonyAddress", e.target.value)} />
          </label>

          <h4 className={styles.subhead}>Recepción</h4>
          <div className={styles.fieldRow}>
            <label className={styles.label}>
              Título
              <input className={styles.control}
                value={cfg.data.receptionTitle ?? ""}
                onChange={(e)=>onDataChange("receptionTitle", e.target.value)}
                placeholder="Recepción" />
            </label>
            <label className={styles.label}>
              Hora
              <input className={styles.control}
                type="time"
                value={cfg.data.receptionTime ?? ""}
                onChange={(e)=>onDataChange("receptionTime", e.target.value)} />
            </label>
          </div>
          <label className={styles.label}>
            Dirección / lugar
            <input className={styles.control}
              value={cfg.data.receptionAddress ?? ""}
              onChange={(e)=>onDataChange("receptionAddress", e.target.value)} />
          </label>

          <h4 className={styles.subhead}>Cuenta regresiva</h4>
          <label className={styles.switchRow}>
            <input
              type="checkbox"
              checked={!!cfg.data.showCountdown}
              onChange={(e)=>onDataChange("showCountdown", e.target.checked)}
            />
            <span>Mostrar countdown hasta la fecha/hora</span>
          </label>
        </>
      )}
    </div>
  );
}
