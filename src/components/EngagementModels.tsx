import { memo } from "react";
import { motion } from "framer-motion";
import { Zap, FileText, Layers, RefreshCw, LucideIcon } from "lucide-react";
import { FloatingCard3D } from "./cards/FloatingCard3D";
interface EngagementModel {
  name: string;
  icon: LucideIcon;
  description: string;
  pros: string;
  bestFor: string;
  color: string;
  borderColor: string;
  iconColor: string;
}
const engagementModels: EngagementModel[] = [{
  name: "Pilot",
  icon: Zap,
  description: "4 weeks · Ship Week 1",
  pros: "Fast start, real code, low commit",
  bestFor: "Students, founders, first builds",
  color: "from-emerald-500/30 via-teal-500/20 to-cyan-500/30",
  borderColor: "border-emerald-400/50",
  iconColor: "text-emerald-400"
}, {
  name: "Proposal",
  icon: FileText,
  description: "Scoped doc · Timeline · Budget",
  pros: "Stakeholder clarity, grant-ready",
  bestFor: "Federal/state grants, RFPs",
  color: "from-blue-500/30 via-indigo-500/20 to-purple-500/30",
  borderColor: "border-blue-400/50",
  iconColor: "text-blue-400"
}, {
  name: "Full Project",
  icon: Layers,
  description: "2-6 months · End-to-end delivery",
  pros: "Complete solution, stable team",
  bestFor: "Campuses, B2B teams, scale-ups",
  color: "from-violet-500/30 via-fuchsia-500/20 to-pink-500/30",
  borderColor: "border-violet-400/50",
  iconColor: "text-violet-400"
}, {
  name: "Retainer",
  icon: RefreshCw,
  description: "Monthly · Ongoing support · Flexible",
  pros: "Always-on expertise, evolving needs",
  bestFor: "Post-launch, maintenance, pivots",
  color: "from-orange-500/30 via-amber-500/20 to-yellow-500/30",
  borderColor: "border-orange-400/50",
  iconColor: "text-orange-400"
}] as const;
export const EngagementModels = memo(() => {
  return <section className="py-3 sm:py-4">
      
    </section>;
});
EngagementModels.displayName = 'EngagementModels';