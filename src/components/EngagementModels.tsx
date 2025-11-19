import { memo } from "react";
import { motion } from "framer-motion";
import { Zap, FileText, Layers, RefreshCw, LucideIcon } from "lucide-react";
import { FloatingCard3D } from "./FloatingCard3D";
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
  description: "4-week sprint—real builds, not decks.",
  pros: "Momentum, learning, low risk",
  bestFor: "Validation, rapid iteration",
  color: "from-primary/20 to-accent/20",
  borderColor: "border-primary/40",
  iconColor: "text-primary"
}, {
  name: "Proposal",
  icon: FileText,
  description: "Scoped plan: objectives, timeline, budget.",
  pros: "Clarity, stakeholder buy-in",
  bestFor: "Grants, compliance work",
  color: "from-secondary/20 to-accent/20",
  borderColor: "border-secondary/40",
  iconColor: "text-accent"
}, {
  name: "Full Project",
  icon: Layers,
  description: "Multi-month end-to-end execution.",
  pros: "Stability, full solution",
  bestFor: "Long-term scaling",
  color: "from-primary/15 to-secondary/15",
  borderColor: "border-primary/40",
  iconColor: "text-primary"
}, {
  name: "Retainer",
  icon: RefreshCw,
  description: "Ongoing flexible support.",
  pros: "Continuous expertise",
  bestFor: "Evolving roadmaps",
  color: "from-accent/20 to-primary/20",
  borderColor: "border-accent/40",
  iconColor: "text-accent"
}] as const;
export const EngagementModels = memo(() => {
  return <section className="py-5 sm:py-6">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.div initial={{
        opacity: 0,
        y: 20
      }} whileInView={{
        opacity: 1,
        y: 0
      }} viewport={{
        once: true
      }} transition={{
        duration: 0.6
      }} className="mb-3 text-center sm:mb-4">
          <h2 className="text-sm font-semibold sm:text-base">
            How We Work Together
          </h2>
          <p className="mt-1 text-[9px] text-slate-300 sm:text-[10px]">
            Different models for different needs
          </p>
        </motion.div>

        <div className="grid grid-cols-2 gap-2 sm:gap-2.5 lg:grid-cols-4">
          {engagementModels.map((model, index) => {
          const Icon = model.icon;
          return <motion.div key={model.name} initial={{
            opacity: 0,
            scale: 0.9
          }} whileInView={{
            opacity: 1,
            scale: 1
          }} viewport={{
            once: true
          }} transition={{
            duration: 0.5,
            delay: index * 0.1
          }}>
                <FloatingCard3D className="h-full">
                  <motion.div whileHover={{
                scale: 1.03,
                boxShadow: "0 15px 30px -5px rgba(16, 185, 129, 0.25)"
              }} className={`group relative h-full rounded-lg border ${model.borderColor} bg-gradient-to-br ${model.color} p-2 sm:p-2.5 transition-all duration-300 cursor-default`}>
                    <div className={`inline-flex rounded-md bg-slate-900/60 p-1 ${model.iconColor}`}>
                      <Icon className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                    </div>
                    
                    <h3 className="mt-1 text-[10px] font-semibold text-slate-50 sm:text-[11px]">
                      {model.name}
                    </h3>
                    
                    <p className="mt-0.5 text-[8px] leading-tight text-slate-200 sm:text-[9px]">
                      {model.description}
                    </p>

                    <div className="mt-1.5 space-y-0.5 border-t border-slate-700/30 pt-1">
                      <div>
                        <span className="text-[7px] font-medium uppercase tracking-wider text-slate-400 sm:text-[8px]">
                          Pros
                        </span>
                        <p className="text-[8px] text-slate-300 sm:text-[9px]">{model.pros}</p>
                      </div>
                      
                      <div>
                        <span className="text-[7px] font-medium uppercase tracking-wider text-slate-400 sm:text-[8px]">
                          Best For
                        </span>
                        <p className="text-[8px] text-slate-300 sm:text-[9px]">{model.bestFor}</p>
                      </div>
                    </div>
                  </motion.div>
                </FloatingCard3D>
              </motion.div>;
        })}
        </div>

        {/* Compact Roadmap */}
        
      </div>
    </section>;
});
EngagementModels.displayName = 'EngagementModels';