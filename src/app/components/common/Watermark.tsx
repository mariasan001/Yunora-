"use client";

import styles from "./Watermark.module.css";

type Variant = "chip" | "corner";
export default function Watermark({
  variant = "chip",
  brand = "Yunora",
  url = "https://yunora.mx",
  showCTA = true,
  tint = "#5A4FCF", // acento (morado Yunora)
}: {
  variant?: Variant;
  brand?: string;
  url?: string;
  showCTA?: boolean;
  tint?: string;
}) {
  const host = safeHost(url);
  const diag = svgDiagonal(`${brand} • ${host}`);

  return (
    <>
      {variant === "chip" ? (
        <div className={styles.wmChip} style={{ ["--tint" as any]: tint }}>
          <span className={styles.brand}>Hecho con {brand}</span>

          {showCTA && (
            <>
              <span className={styles.dot} aria-hidden>•</span>
              <a
                className={styles.link}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
              >
                Crea la tuya
              </a>
              <span className={styles.dot} aria-hidden>•</span>
              <a
                className={styles.link}
                href={`${url}/contacto`}
                target="_blank"
                rel="noopener noreferrer"
              >
                ¿A medida? Contáctanos
              </a>
            </>
          )}
        </div>
      ) : (
        <a
          className={styles.wmCorner}
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          style={{ ["--tint" as any]: tint }}
          aria-label={`Hecho con ${brand}`}
        >
          {brand}
        </a>
      )}

      {/* Sólo al imprimir: patrón diagonal suave */}
      <div
        className={styles.printOnly}
        style={{ ["--diag" as any]: `url("${diag}")` }}
        aria-hidden
      />
    </>
  );
}

function safeHost(u: string) {
  try { return new URL(u).host; } catch { return "yunora.mx"; }
}

function svgDiagonal(text: string, color = "#202024", opacity = 0.06) {
  const svg = encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="320" height="320" viewBox="0 0 320 320">
      <g transform="rotate(-35 160 160)" fill="${color}" fill-opacity="${opacity}">
        <text x="0" y="80"  font-size="20" font-family="ui-sans, system-ui, -apple-system, Segoe UI, Roboto, Arial">${text}   ${text}</text>
        <text x="0" y="160" font-size="20" font-family="ui-sans, system-ui, -apple-system, Segoe UI, Roboto, Arial">${text}   ${text}</text>
        <text x="0" y="240" font-size="20" font-family="ui-sans, system-ui, -apple-system, Segoe UI, Roboto, Arial">${text}   ${text}</text>
      </g>
    </svg>`
  );
  return `data:image/svg+xml;charset=utf-8,${svg}`;
}
