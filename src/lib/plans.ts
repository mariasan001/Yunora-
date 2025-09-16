export type Plan = "free" | "plus" | "premium" | "agency";

export const PLAN_ORDER = ["free", "plus", "premium", "agency"] as const;

export const PLAN_LABEL: Record<Plan, string> = {
  free: "Gratis",
  plus: "Plus",
  premium: "Premium",
  agency: "Agencia",
};

export type Feature = "removeWatermark" | "rsvpAdvanced" | "qrAccess" | "photoAlbum" | "customDomain";

export const FEATURES: Record<Feature, readonly Plan[]> = {
  removeWatermark: ["plus", "premium", "agency"],
  rsvpAdvanced:    ["plus", "premium", "agency"],
  qrAccess:        ["premium", "agency"],
  photoAlbum:      ["premium", "agency"],
  customDomain:    ["agency"],
};

export function canUse(feature: Feature, plan: Plan) {
  return FEATURES[feature].includes(plan);
}
