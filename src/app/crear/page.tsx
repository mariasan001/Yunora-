"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import styles from "./select.module.css";
import {
  type LucideIcon,
  Heart, Crown, Droplets, Cake, GraduationCap, Baby, Church,
  Sparkles, Plane, PartyPopper, ScrollText, Gem, Users
} from "lucide-react";
import { EVENT_TYPES, EVENT_LABELS, type EventType } from "@/lib/events";

/* Ícono por tipo (el color/estilo lo da CSS) */
const ICON_BY_TYPE: Record<EventType, LucideIcon> = {
  boda: Heart, xv: Crown, bautizo: Droplets, cumple: Cake, babyshower: Baby,
  graduacion: GraduationCap, comunion: Church, aniversario: Sparkles,
  despedida: Plane, infantil: PartyPopper, civil: ScrollText, pedida: Gem, familiar: Users,
};

/* Chips arriba: mostramos los más usados + 'Todos' */
type Chip = "todos" | "boda" | "xv" | "cumple" | "bautizo" | "graduacion";
const CHIP_LABEL: Record<Chip, string> = {
  todos: "Todos",
  boda: "Boda",
  xv: "XV Años",
  cumple: "Cumpleaños",
  bautizo: "Bautizo",
  graduacion: "Graduación",
};
const CHIP_ORDER: Chip[] = ["todos", "boda", "xv", "cumple", "bautizo", "graduacion"];

export default function CrearSelectorPage() {
  const [chip, setChip] = useState<Chip>("todos");

  const items = useMemo(() => {
    const list = EVENT_TYPES.map((key) => ({
      key,
      label: EVENT_LABELS[key],
      Icon: ICON_BY_TYPE[key],
      href: `/crear/${key}`,
    }));

    if (chip === "todos") return list;
    return list.filter((i) => i.key === chip);
  }, [chip]);

  return (
    <main className={styles.wrap}>
      <div className={styles.mist} aria-hidden="true" />

      <header className={styles.head}>
        <h1>Elige el tipo de invitación</h1>
        <p className={styles.sub}>
          Partimos de un preset pensado para ese evento. Luego lo personalizas a tu estilo.
        </p>

        <div className={styles.chips} role="tablist" aria-label="Filtrar tipos de evento">
          {CHIP_ORDER.map((c) => (
            <button
              key={c}
              role="tab"
              aria-selected={chip === c}
              className={`${styles.chip} ${chip === c ? styles.chipActive : ""}`}
              onClick={() => setChip(c)}
              type="button"
            >
              {CHIP_LABEL[c]}
            </button>
          ))}
        </div>
      </header>

      <section className={styles.grid} aria-label="Tipos de evento">
        {items.map(({ key, label, Icon, href }) => (
          <Link key={key} href={href} className={styles.card} prefetch>
            <span className={styles.iconWrap} aria-hidden="true">
              <Icon className={styles.icon} />
            </span>
            <div className={styles.cardText}>
              <h2 className={styles.title}>{label}</h2>
              <p className={styles.caption}>Empezar con {label}</p>
            </div>
          </Link>
        ))}
      </section>

      <p className={styles.note}>
        <em>¿No ves tu evento? Elige cualquiera y cámbialo después en el editor.</em>
      </p>
    </main>
  );
}
