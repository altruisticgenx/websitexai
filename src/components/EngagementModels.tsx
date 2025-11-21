import { memo } from "react";
import { motion } from "framer-motion";
import { Zap, FileText, Layers, RefreshCw, LucideIcon } from "lucide-react";
import { Card3D } from "./ui/card-3d";
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
  return (
    <section className="py-6 sm:py-8 lg:py-12">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="text-center mb-6 sm:mb-8">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-foreground mb-2">
            Engagement Models
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground max-w-2xl mx-auto">
            Choose the model that fits your timeline and commitment level
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {engagementModels.map((model, index) => {
            const Icon = model.icon;
            return (
              <Card3D key={model.name} intensity={6}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className={`relative overflow-hidden rounded-xl border-2 ${model.borderColor} bg-card/50 backdrop-blur-sm p-3 sm:p-4 hover:shadow-xl transition-shadow duration-300`}
                >
                  {/* Gradient Background */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${model.color} opacity-50`} />
                  
                  {/* Content */}
                  <div className="relative z-10">
                    <div className={`inline-flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-background/80 ${model.iconColor} mb-2 sm:mb-3`}>
                      <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                    </div>
                    
                    <h3 className="text-sm sm:text-base font-bold text-foreground mb-1">
                      {model.name}
                    </h3>
                    
                    <p className="text-[10px] sm:text-xs text-muted-foreground mb-2">
                      {model.description}
                    </p>
                    
                    <div className="space-y-1.5 sm:space-y-2">
                      <div>
                        <p className="text-[9px] sm:text-[10px] font-semibold text-foreground mb-0.5">Pros</p>
                        <p className="text-[9px] sm:text-[10px] text-muted-foreground">{model.pros}</p>
                      </div>
                      
                      <div>
                        <p className="text-[9px] sm:text-[10px] font-semibold text-foreground mb-0.5">Best For</p>
                        <p className="text-[9px] sm:text-[10px] text-muted-foreground">{model.bestFor}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </Card3D>
            );
          })}
        </div>
      </div>
    </section>
  );
});
EngagementModels.displayName = 'EngagementModels';