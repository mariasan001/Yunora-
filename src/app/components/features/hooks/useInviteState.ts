// features/hooks/useInviteState.ts
"use client";

import { useEffect, useMemo, useState } from "react";
import { PLAN_LABEL, PLAN_ORDER, canUse, type Plan } from "@/lib/plans";
import { base64urlEncode } from "../utils/base64";
import { Config, FONT_OPTIONS, Variant } from "../invite/types";
import { getVariantSeed, getVariantsForPlan } from "../invite/presets";

export function useInviteState(initialType: Config["type"]) {
  // 1) ¡clave! igual en SSR y 1er render del cliente
  const [plan, setPlan] = useState<Plan>("free");

  // 2) ya montado, sincroniza con localStorage y re-seedea
  useEffect(() => {
    const stored = (localStorage.getItem("yunora.plan") as Plan) || "free";
    if (stored !== plan) setPlan(stored);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const choosePlan = (p: Plan) => {
    setPlan(p);
    localStorage.setItem("yunora.plan", p);
  };

  // Variantes dependen del plan
  const variants = useMemo(() => getVariantsForPlan(initialType, plan), [initialType, plan]);
  const initialVariant = (variants[0] ?? "botanica") as Variant;

  // Estado inicial determinista
  const seed0 = getVariantSeed(initialType, initialVariant);
  const [cfg, setCfg] = useState<Config>({
    variant: seed0.variant!, font: seed0.font!, colors: seed0.colors!, data: seed0.data!, type: initialType,
  });

  // Re-seed al cambiar tipo/plan
  useEffect(() => {
    const v = (getVariantsForPlan(initialType, plan)[0] ?? "botanica") as Variant;
    const seed = getVariantSeed(initialType, v);
    setCfg({ variant: seed.variant!, font: seed.font!, colors: seed.colors!, data: seed.data!, type: initialType });
  }, [initialType, plan]);

  function changeVariant(v: Variant) {
    const seed = getVariantSeed(initialType, v);
    setCfg(prev => ({ ...prev, variant: v, font: seed.font!, colors: seed.colors!, data: prev.data }));
  }
  function onDataChange<K extends keyof Config["data"]>(key: K, value: Config["data"][K]) {
    setCfg(prev => ({ ...prev, data: { ...prev.data, [key]: value } }));
  }
  function onColorsChange(colors: Config["colors"]) { setCfg(prev => ({ ...prev, colors })); }

  const fontCSS = useMemo(() => FONT_OPTIONS.find(f => f.key === cfg.font)?.css ?? FONT_OPTIONS[0].css, [cfg.font]);

  const previewLink = useMemo(() => {
    const payload = { v: cfg.variant, c: cfg.colors, f: cfg.font, d: cfg.data, y: cfg.type, p: plan } as const;
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
    cfg, setCfg,
    variants, changeVariant, onDataChange, onColorsChange,
    plan, choosePlan, PLAN_ORDER, PLAN_LABEL, canUse,
    fontCSS, previewLink, shareWhatsApp,
  };
}
