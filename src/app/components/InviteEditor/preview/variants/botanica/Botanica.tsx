"use client";
import { Config } from "@/app/components/features/invite/types";
import s from "./Botanica.module.css";
import { formatDate } from "@/app/components/features/utils/format";


export default function Botanica({ cfg }: { cfg: Config }) {
  const day = new Date(cfg.data.date || "").getDate() || "18";
  const date = formatDate(cfg.data.date);

  return (
    <div className={s.root}>
      {/* ornamentos en esquinas */}
      <img src="/ornaments/botanica-corner-tl.svg" alt="" aria-hidden className={s.ornTL}/>
      <img src="/ornaments/botanica-corner-br.svg" alt="" aria-hidden className={s.ornBR}/>

      <div className={s.smallCaps}>Junto a nuestras familias</div>
      <div className={s.scriptSmall}>Nosotros</div>

      <h2 className={s.namesCaps}>{cfg.data.title}</h2>

      <p className={s.msg}>{cfg.data.message}</p>

      <div className={s.dateBadge}>
        <span className={s.weekday}>VIERNES</span>
        <span className={s.day}>{day}</span>
        <span className={s.month}>{date.split(" ")[2]?.toUpperCase() || "AGOSTO"}</span>
      </div>

      <div className={s.place}>{cfg.data.location}</div>

      <a className={s.btn} href="#">{cfg.data.rsvpLabel}</a>
    </div>
  );
}
