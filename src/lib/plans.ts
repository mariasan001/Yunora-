export type Plan = "free" | "plus" | "premium" | "agency";

export const PLAN_LABEL: Record<Plan, string> = {
  free: "Gratis",
  plus: "Plus",
  premium: "Premium",
  agency: "Agencia",
};

// Qué incluye cada plan
const FEATURES: Record<string, Plan[]> = {
  removeWatermark: ["plus", "premium", "agency"],
  rsvpAdvanced:    ["plus", "premium", "agency"],
  qrAccess:        ["premium", "agency"],
  photoAlbum:      ["premium", "agency"],
  customDomain:    ["agency"],
};

export function canUse(feature: keyof typeof FEATURES, plan: Plan) {
  return FEATURES[feature]?.includes(plan) ?? false;
}

export const PLAN_ORDER: Plan[] = ["free", "plus", "premium", "agency"];
