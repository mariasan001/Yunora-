"use client";
import { useMemo, useState } from "react";
import styles from "./PricingToggle.module.css";

/* Iconos simples */
function Check(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path d="M5 13l4 4L19 7" fill="none" stroke="currentColor" strokeWidth="2"/>
    </svg>
  );
}
function Minus(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path d="M5 12h14" fill="none" stroke="currentColor" strokeWidth="2"/>
    </svg>
  );
}

type FeatureKey =
  | "premiumTemplates"
  | "removeBrand"
  | "rsvpAdvanced"
  | "qrAccess"
  | "album"
  | "support"
  | "duration"
  | "unlimited"
  | "allTemplates"
  | "customDomain"
  | "seats";

type FeatureCell = boolean | string;

type Plan = {
  name: string;
  price: string;
  scope: string;        // p.ej. "1 evento" o "Ilimitados"
  highlight?: boolean;  // "Más popular"
  features: Record<FeatureKey, FeatureCell>;
};

/* Config público (precio por evento) */
const publicFeatures: Array<{ key: FeatureKey; label: string }> = [
  { key: "premiumTemplates", label: "Plantillas premium" },
  { key: "removeBrand",      label: "Sin marca Yunora" },
  { key: "rsvpAdvanced",     label: "RSVP avanzado" },
  { key: "qrAccess",         label: "QR de acceso" },
  { key: "album",            label: "Álbum de fotos" },
  { key: "support",          label: "Soporte" },
  { key: "duration",         label: "Duración del link" },
];

const publicPlans: Plan[] = [
  {
    name: "Gratis",
    price: "$0",
    scope: "1 evento",
    features: {
      premiumTemplates: false,
      removeBrand: false, // marca incluida
      rsvpAdvanced: false,
      qrAccess: false,
      album: false,
      support: "Básico",
      duration: "15 días",
      unlimited: false,
      allTemplates: false,
      customDomain: false,
      seats: "—",
    },
  },
  {
    name: "Plus",
    price: "$149 MXN",
    scope: "1 evento",
    highlight: true, // Más popular
    features: {
      premiumTemplates: true,
      removeBrand: true,
      rsvpAdvanced: true,
      qrAccess: false,
      album: false,
      support: "Estándar",
      duration: "3 meses",
      unlimited: false,
      allTemplates: false,
      customDomain: false,
      seats: "—",
    },
  },
  {
    name: "Premium",
    price: "$229 MXN",
    scope: "1 evento",
    features: {
      premiumTemplates: true,
      removeBrand: true,
      rsvpAdvanced: true,
      qrAccess: true,
      album: true,
      support: "Prioritario",
      duration: "12 meses",
      unlimited: false,
      allTemplates: false,
      customDomain: false,
      seats: "—",
    },
  },
];

/* Config agencias (suscripción anual) */
const agencyFeatures: Array<{ key: FeatureKey; label: string }> = [
  { key: "unlimited",    label: "Eventos ilimitados" },
  { key: "removeBrand",  label: "Sin marca Yunora" },
  { key: "allTemplates", label: "Todas las plantillas" },
  { key: "customDomain", label: "Dominio personalizado" },
  { key: "support",      label: "Soporte" },
  { key: "seats",        label: "Miembros del equipo" },
];

const agencyPlans: Plan[] = [
  {
    name: "Agencia Start",
    price: "$999 MXN/año",
    scope: "Ilimitados",
    features: {
      unlimited: true,
      removeBrand: false,   // marca incluida
      allTemplates: false,  // base
      customDomain: false,
      support: "Básico",
      seats: "1",
      premiumTemplates: false,
      rsvpAdvanced: false,
      qrAccess: false,
      album: false,
      duration: "—",
    },
  },
  {
    name: "Agencia Pro",
    price: "$2,499 MXN/año",
    scope: "Ilimitados",
    highlight: true, // Más popular
    features: {
      unlimited: true,
      removeBrand: true,
      allTemplates: true,
      customDomain: false,
      support: "Prioritario",
      seats: "3",
      premiumTemplates: false,
      rsvpAdvanced: false,
      qrAccess: false,
      album: false,
      duration: "—",
    },
  },
  {
    name: "Agencia Elite",
    price: "$5,000 MXN/año",
    scope: "Ilimitados",
    features: {
      unlimited: true,
      removeBrand: true,
      allTemplates: true,
      customDomain: true,
      support: "Dedicado",
      seats: "5",
      premiumTemplates: false,
      rsvpAdvanced: false,
      qrAccess: false,
      album: false,
      duration: "—",
    },
  },
];

/* Render de una celda de feature */
function FeatureRow({
  label,
  value,
}: {
  label: string;
  value: FeatureCell;
}) {
  const isBool = typeof value === "boolean";
  const on = isBool && value === true;
  const off = isBool && value === false;

  return (
    <li className={`${styles.featureRow} ${off ? styles.off : ""}`}>
      <span className={styles.featureLabel}>{label}</span>
      <span className={styles.featureValue}>
        {isBool ? (
          on ? <Check className={styles.iconCheck}/> : <Minus className={styles.iconMinus}/>
        ) : (
          <span className={styles.badgeValue}>{String(value)}</span>
        )}
      </span>
    </li>
  );
}

export default function PricingToggle() {
  const [isAgency, setIsAgency] = useState(false);

  const title = isAgency ? "Planes para agencias" : "Planes para público";
  const subtitle = isAgency
    ? "Suscripción anual — ideal para planners y venues. Incluye eventos ilimitados."
    : "Precio por evento — perfecto para una boda, XV, bautizo o fiesta.";

  const { features, plans } = useMemo(() => {
    return isAgency
      ? { features: agencyFeatures, plans: agencyPlans }
      : { features: publicFeatures, plans: publicPlans };
  }, [isAgency]);

  return (
    <section id="plans" className={styles.wrapper} aria-label="Paquetes y precios">
      {/* Encabezado */}
      <header className={styles.head}>
        <p className={styles.kicker}>Paquetes</p>
        <h2 className={styles.title}>{title}</h2>
        <p className={styles.lead}>{subtitle}</p>

        {/* Toggle */}
        <div className={styles.toggle} role="tablist" aria-label="Segmento">
          <button
            role="tab"
            aria-selected={!isAgency}
            className={!isAgency ? styles.active : ""}
            onClick={() => setIsAgency(false)}
          >
            👤 Público (por evento)
          </button>
          <button
            role="tab"
            aria-selected={isAgency}
            className={isAgency ? styles.active : ""}
            onClick={() => setIsAgency(true)}
          >
            🏢 Agencias (anual)
          </button>
        </div>
      </header>

      {/* Cards */}
      <div className={styles.plans}>
        {plans.map((p) => (
          <article key={p.name} className={`${styles.plan} ${p.highlight ? styles.highlight : ""}`}>
            {p.highlight && <span className={styles.tag}>Más popular</span>}

            <div className={styles.planHead}>
              <h3 className={styles.planName}>{p.name}</h3>
              <div className={styles.priceRow}>
                <strong className={styles.price}>{p.price}</strong>
                <span className={styles.scope}>{p.scope}</span>
              </div>
            </div>

            <ul className={styles.featuresList}>
              {features.map(({ key, label }) => (
                <FeatureRow key={key} label={label} value={p.features[key] ?? false} />
              ))}
            </ul>

            <a href="#crear" className={styles.cta}>
              Elegir {p.name}
            </a>

            {!isAgency ? (
              <p className={styles.footNote}>Aplica a un (1) evento con link único.</p>
            ) : (
              <p className={styles.footNote}>Facturable anual. Transferible entre clientes/eventos.</p>
            )}
          </article>
        ))}
      </div>
    </section>
  );
}
