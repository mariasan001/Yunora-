"use client";
import styles from "./ frame.module.css";

export default function PreviewFrame({
  colors,
  watermark,
  children,
}: {
  colors: { primary: string; secondary: string; bg: string };
  watermark?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div
      className={styles.wrap}
      style={
        {
          "--primary": colors.primary,
          "--secondary": colors.secondary,
          "--bg": colors.bg,
        } as React.CSSProperties
      }
    >
      <div className={styles.paper}>
        <div className={styles.inner}>{children}</div>
        {watermark && <div className={styles.watermark}>Yunora · Vista previa</div>}
      </div>
    </div>
  );
}
