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
  description: "$1,150/wk · 4 weeks · Ship Week 1",
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
      <div className="mx-auto max-w-6xl px-3 sm:px-4">
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
      }} className="mb-2 text-center sm:mb-3">
          <h2 className="heading-6">
            How We Work Together
          </h2>
          <p className="mt-0.5 micro text-slate-400">
            Pick your speed
          </p>
        </motion.div>

        <div className="grid grid-cols-2 gap-1.5 sm:gap-2 lg:grid-cols-4" style={{ perspective: "1000px" }}>
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
                  <motion.div 
                    whileHover={{
                      scale: 1.05,
                      rotateY: 5,
                      rotateX: -5,
                      z: 50,
                      boxShadow: "0 20px 40px -10px rgba(16, 185, 129, 0.4)"
                    }} 
                    className={`group relative h-full rounded-md border-2 ${model.borderColor} bg-gradient-to-br ${model.color} p-1.5 sm:p-2 transition-all duration-300 cursor-default backdrop-blur-sm`}
                    style={{ transformStyle: "preserve-3d" }}
                  >
                    <div className={`inline-flex rounded bg-slate-950/80 p-0.5 ${model.iconColor} shadow-lg`}>
                      <Icon className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
                    </div>
                    
                    <h3 className="mt-0.5 caption font-bold text-slate-50">
                      {model.name}
                    </h3>
                    
                    <p className="mt-0.5 micro leading-snug text-slate-200 font-medium">
                      {model.description}
                    </p>

                    <div className="mt-1 space-y-0.5 border-t border-slate-600/40 pt-0.5">
                      <div>
                        <span className="overline text-slate-400">
                          ✓
                        </span>
                        <p className="micro text-slate-300">{model.pros}</p>
                      </div>
                      
                      <div>
                        <span className="overline text-slate-400">
                          →
                        </span>
                        <p className="micro text-slate-300">{model.bestFor}</p>
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