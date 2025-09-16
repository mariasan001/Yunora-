// src/app/components/InviteEditor/preview/PreviewFrame.tsx
"use client";
import Watermark from "../../common/Watermark";
import styles from "./PreviewFrame.module.css";

type Colors = {
  primary: string;
  secondary?: string;
  bg?: string;
};

export default function PreviewFrame({
  colors,
  children,
  watermark,
}: {
  colors: Colors;
  children: React.ReactNode;
  watermark?: boolean;
}) {
  // Defaults seguros si vienen undefined
  const primary   = colors.primary ?? "#5A4FCF";
  const secondary = colors.secondary ?? "#ECEAFF";
  const bg        = colors.bg ?? "#FFFFFF";

  return (
    <div
      className={styles.frame}
      style={
        {
          ["--primary" as any]: primary,
          ["--secondary" as any]: secondary,
          ["--bg" as any]: bg,
        } as React.CSSProperties
      }
    >
      {children}
      {watermark && <Watermark/>}
    </div>
  );
}
