"use client";
import { useMemo, useState } from "react";
import { PLAN_LABEL, PLAN_ORDER, canUse } from "@/lib/plans";
import type { Plan } from "@/lib/plans";
import { base64urlEncode } from "../utils/base64";
import { getFreeVariants, getVariantSeed } from "../invite/presets";
import { Config, FONT_OPTIONS, Variant } from "../invite/types";


export function useInviteState(initialType: Config["type"]) {
  // 1) lista de plantillas gratis según el evento (boda ≠ cumple)
  const variants = getFreeVariants(initialType);
  const initialVariant = variants[0] ?? "botanica";

  // 2) plan persistido
  const [plan, setPlan] = useState<Plan>(() => {
    if (typeof window === "undefined") return "free";
    return (localStorage.getItem("yunora.plan") as Plan) || "free";
  });
  const choosePlan = (p: Plan) => {
    setPlan(p);
    if (typeof window !== "undefined") localStorage.setItem("yunora.plan", p);
  };

  // 3) seed inicial = evento + plantilla
  const seed0 = getVariantSeed(initialType, initialVariant);
  const [cfg, setCfg] = useState<Config>({
    variant: seed0.variant!,
    font: seed0.font!,
    colors: seed0.colors!,
    data: seed0.data!,
    type: initialType,
  });

  // Cambiar de plantilla: conserva contenido, ajusta estilo
  function changeVariant(v: Variant) {
    const seed = getVariantSeed(initialType, v);
    setCfg(prev => ({
      ...prev,
      variant: v,
      font: seed.font!,
      colors: seed.colors!,
      data: prev.data, // si quieres resetear texto según plantilla: usa seed.data
    }));
  }

  function onDataChange<K extends keyof Config["data"]>(key: K, value: Config["data"][K]) {
    setCfg(prev => ({ ...prev, data: { ...prev.data, [key]: value } }));
  }
  function onColorsChange(colors: Config["colors"]) {
    setCfg(prev => ({ ...prev, colors }));
  }

  const fontCSS = useMemo(
    () => FONT_OPTIONS.find(f => f.key === cfg.font)?.css ?? FONT_OPTIONS[0].css,
    [cfg.font]
  );

  const previewLink = useMemo(() => {
    const payload = { v: cfg.variant, c: cfg.colors, f: cfg.font, d: cfg.data, y: cfg.type, p: plan };
    return `/p?d=${base64urlEncode(payload)}`;
  }, [cfg, plan]);

  function shareWhatsApp() {
    if (!canUse("removeWatermark", plan)) {
      alert("Tip: con Plus/Premium quitas la marca de agua y desbloqueas extras ✨");
    }
    const msg = `Te comparto nuestra invitación ✨\n${location.origin}${previewLink}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(msg)}`, "_blank");
  }

  return {
    // <- Asegúrate de que 'variants' esté aquí
    cfg, setCfg, variants,
    changeVariant, onDataChange, onColorsChange,
    plan, choosePlan, PLAN_ORDER, PLAN_LABEL, canUse,
    fontCSS, previewLink, shareWhatsApp,
  };
}
