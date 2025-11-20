export type GradientKind = "emerald" | "cyan" | "teal" | "blue" | "violet" | "orange";

/** Tailwind class presets for gradient + border treatment on cards */
export function getCardGradient(kind: GradientKind): string {
  switch (kind) {
    case "emerald":
      return "border-emerald-500/50 bg-gradient-to-br from-emerald-500/20 to-teal-500/20";
    case "cyan":
      return "border-cyan-500/30 bg-gradient-to-br from-cyan-500/10 to-slate-950/80";
    case "teal":
      return "border-teal-500/30 bg-gradient-to-br from-teal-500/10 to-slate-950/80";
    case "blue":
      return "border-blue-500/50 bg-gradient-to-br from-blue-500/20 to-indigo-500/20";
    case "violet":
      return "border-violet-500/50 bg-gradient-to-br from-violet-500/20 to-purple-500/20";
    case "orange":
      return "border-orange-500/50 bg-gradient-to-br from-orange-500/20 to-amber-500/20";
    default:
      return "border-slate-800 bg-slate-900/60";
  }
}

/** Convenience helper to compose a full card container */
export function cardContainer(kind: GradientKind, extra = ""): string {
  return ["group rounded-lg border-2 p-4 backdrop-blur-sm transition-all", getCardGradient(kind), extra]
    .filter(Boolean)
    .join(" ");
}
