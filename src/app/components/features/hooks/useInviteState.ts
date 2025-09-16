"use client";

import { useMemo, useState } from "react";
import { PLAN_LABEL, PLAN_ORDER, canUse } from "@/lib/plans";
import type { Plan } from "@/lib/plans";

import { base64urlEncode } from "../utils/base64";
import { Config, FONT_OPTIONS, Variant } from "../invite/types";
import { getFreeVariants, getVariantSeed } from "../invite/presets";

/**
 * Estado del editor: variante por evento, colores, contenido, plan, etc.
 * Genera también el link de Vista Previa (?d=...) compatible con /p.
 */
export function useInviteState(initialType: Config["type"]) {
  // Plantillas gratis según el evento (boda ≠ cumple, etc.)
  const variants = useMemo(() => getFreeVariants(initialType), [initialType]);
  const initialVariant = variants[0] ?? "botanica";

  // Plan persistido (free/plus/premium...)
  const [plan, setPlan] = useState<Plan>(() => {
    if (typeof window === "undefined") return "free";
    return (localStorage.getItem("yunora.plan") as Plan) || "free";
  });
  const choosePlan = (p: Plan) => {
    setPlan(p);
    if (typeof window !== "undefined") localStorage.setItem("yunora.plan", p);
  };

  // Estado inicial (semilla = evento + plantilla)
  const seed0 = getVariantSeed(initialType, initialVariant);
  const [cfg, setCfg] = useState<Config>({
    variant: seed0.variant!,
    font: seed0.font!,
    colors: seed0.colors!,
    data: seed0.data!,
    type: initialType,
  });

  // Cambiar de plantilla: conserva el contenido, actualiza estilo/typography
  function changeVariant(v: Variant) {
    const seed = getVariantSeed(initialType, v);
    setCfg(prev => ({
      ...prev,
      variant: v,
      font: seed.font!,
      colors: seed.colors!,
      // Si quieres resetear textos al preset de la plantilla, usa: data: seed.data!
      data: prev.data,
    }));
  }

  // Updates
  function onDataChange<K extends keyof Config["data"]>(key: K, value: Config["data"][K]) {
    setCfg(prev => ({ ...prev, data: { ...prev.data, [key]: value } }));
  }
  function onColorsChange(colors: Config["colors"]) {
    setCfg(prev => ({ ...prev, colors }));
  }

  // Font CSS efectiva (bloqueada por plantilla)
  const fontCSS = useMemo(
    () => FONT_OPTIONS.find(f => f.key === cfg.font)?.css ?? FONT_OPTIONS[0].css,
    [cfg.font]
  );

  // Link de vista previa (mismo motor que el editor)
  const previewLink = useMemo(() => {
    const payload = {
      v: cfg.variant,   // Variant
      c: cfg.colors,    // { primary, secondary, bg }
      f: cfg.font,      // "serif" | "sans" | "script"
      d: cfg.data,      // contenido
      y: cfg.type,      // EventType
      p: plan,          // Plan
    } as const;

    return `/p?d=${base64urlEncode(payload)}`;
  }, [cfg, plan]);

  // Compartir por WhatsApp
  function shareWhatsApp() {
    if (!canUse("removeWatermark", plan)) {
      alert("Tip: con Plus/Premium quitas la marca de agua y desbloqueas extras ✨");
    }
    const msg = `Te comparto nuestra invitación ✨\n${location.origin}${previewLink}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(msg)}`, "_blank");
  }

  return {
    cfg, setCfg,
    variants, // para chips de plantillas
    changeVariant, onDataChange, onColorsChange,
    plan, choosePlan, PLAN_ORDER, PLAN_LABEL, canUse,
    fontCSS, previewLink, shareWhatsApp,
  };
}
