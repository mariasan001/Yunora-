"use client";
import previewStyles from "@/app/crear/preview.module.css";
import styles from "@/app/crear/editor.module.css";
import { Config } from "../../features/invite/types";
import { formatDate } from "../../features/utils/format";


export default function Preview({
  cfg, fontCSS, watermark,
}: { cfg: Config; fontCSS: string; watermark: boolean }) {
  const variant = cfg.variant;

  return (
    <div className={previewStyles.previewWrap} style={{ background: cfg.colors.bg }}>
      <div className={previewStyles.previewCard} style={{ fontFamily: fontCSS }}>
        <div className={`${previewStyles.paper} ${previewStyles[variant] || ""}`}>
          {/* --- BOTÁNICA --- */}
          {variant === "botanica" && (
            <>
              <img src="/ornaments/botanica-corner-tl.svg" alt="" aria-hidden="true" className={previewStyles.ornTL}/>
              <img src="/ornaments/botanica-corner-br.svg" alt="" aria-hidden="true" className={previewStyles.ornBR}/>
              <div className={previewStyles.smallCaps}>Junto a nuestras familias</div>
              <div className={previewStyles.scriptSmall}>Nosotros</div>
              <h2 className={previewStyles.namesCaps} style={{ color: cfg.colors.primary }}>{cfg.data.title}</h2>
              <p className={previewStyles.msgThin}>{cfg.data.message}</p>
              <div className={previewStyles.dateBadge} style={{ borderColor: cfg.colors.primary }}>
                <span className={previewStyles.weekday}>VIERNES</span>
                <span className={previewStyles.day}>{new Date(cfg.data.date||"").getDate()||"18"}</span>
                <span className={previewStyles.month}>AGOSTO</span>
              </div>
              <div className={previewStyles.placeLine}>{cfg.data.location}</div>
              <a className={previewStyles.btn} style={{ background: cfg.colors.primary }} href="#">{cfg.data.rsvpLabel}</a>
            </>
          )}

          {/* --- TIPOGRÁFICA --- */}
          {variant === "tipografica" && (
            <>
              <div className={previewStyles.headerMini}>
                <span className={previewStyles.smallCaps}>¡Nos casamos!</span>
              </div>
              <h2 className={previewStyles.namesScript}>{cfg.data.title}</h2>
              <div className={previewStyles.splitRow}>
                <div className={previewStyles.dateColumn} style={{ borderColor: cfg.colors.primary }}>
                  <div className={previewStyles.dayBig}>{new Date(cfg.data.date||"").getDate()||"18"}</div>
                  <div className={previewStyles.monthSmall}>{(formatDate(cfg.data.date).split(" ")[2]||"agosto").toUpperCase()}</div>
                </div>
                <div className={previewStyles.eventBlock}>
                  <strong>{formatDate(cfg.data.date)} · {cfg.data.time}</strong>
                  <div className={previewStyles.place}>{cfg.data.location}</div>
                </div>
              </div>
              <a className={previewStyles.btn} style={{ background: cfg.colors.primary }} href="#">{cfg.data.rsvpLabel}</a>
            </>
          )}

          {/* --- FLORAL --- */}
          {variant === "floral" && (
            <>
              <img src="/ornaments/floral-crown.svg" alt="" aria-hidden="true" className={previewStyles.crown}/>
              <div className={previewStyles.monogram} style={{ borderColor: cfg.colors.primary, color: cfg.colors.primary }}>
                <span>{(cfg.data.title.match(/[A-Za-zÁÉÍÓÚÑ]/g)?.[0]||"A").toUpperCase()}</span>
                <span>·</span>
                <span>{(cfg.data.title.match(/[A-Za-zÁÉÍÓÚÑ]/g)?.slice(-1)[0]||"L").toUpperCase()}</span>
              </div>
              <h2 className={previewStyles.namesSerif} style={{ color: cfg.colors.primary }}>{cfg.data.title}</h2>
              <p className={previewStyles.msgThin}>{cfg.data.message}</p>
              <div className={previewStyles.info}>
                <span>{formatDate(cfg.data.date)} · {cfg.data.time}</span>
                <span>{cfg.data.location}</span>
              </div>
              <a className={previewStyles.btn} style={{ background: cfg.colors.primary }} href="#">{cfg.data.rsvpLabel}</a>
            </>
          )}

          {watermark && <div className={styles.watermark}>Yunora · Vista previa</div>}
        </div>
      </div>
    </div>
  );
}
