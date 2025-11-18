import React from "react";
import { motion } from "framer-motion";
import { Zap, FileText, Layers, RefreshCw } from "lucide-react";
import { FloatingCard3D } from "./FloatingCard3D";

const engagementModels = [
  {
    name: "Pilot",
    icon: Zap,
    description: "4-week sprint—real builds, not decks.",
    pros: "Momentum, learning, low risk",
    bestFor: "Validation, rapid iteration",
    color: "from-emerald-500/20 to-teal-500/20",
    borderColor: "border-emerald-400/40",
    iconColor: "text-emerald-300",
  },
  {
    name: "Proposal",
    icon: FileText,
    description: "Scoped plan: objectives, timeline, budget.",
    pros: "Clarity, stakeholder buy-in",
    bestFor: "Grants, compliance work",
    color: "from-blue-500/20 to-cyan-500/20",
    borderColor: "border-blue-400/40",
    iconColor: "text-blue-300",
  },
  {
    name: "Full Project",
    icon: Layers,
    description: "Multi-month end-to-end execution.",
    pros: "Stability, full solution",
    bestFor: "Long-term scaling",
    color: "from-violet-500/20 to-purple-500/20",
    borderColor: "border-violet-400/40",
    iconColor: "text-violet-300",
  },
  {
    name: "Retainer",
    icon: RefreshCw,
    description: "Ongoing flexible support.",
    pros: "Continuous expertise",
    bestFor: "Evolving roadmaps",
    color: "from-amber-500/20 to-orange-500/20",
    borderColor: "border-amber-400/40",
    iconColor: "text-amber-300",
  },
];

export function EngagementModels() {
  return (
    <section className="py-8 sm:py-10">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-4 text-center sm:mb-6"
        >
          <h2 className="text-base font-semibold sm:text-lg">
            How we work together
          </h2>
          <p className="mt-1.5 text-[10px] text-slate-300 sm:text-xs">
            Different models for different needs
          </p>
        </motion.div>

        <div className="grid grid-cols-2 gap-2.5 sm:gap-3 lg:grid-cols-4">
          {engagementModels.map((model, index) => {
            const Icon = model.icon;
            return (
              <motion.div
                key={model.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <FloatingCard3D className="h-full">
                  <motion.div
                    whileHover={{ 
                      scale: 1.03,
                      boxShadow: "0 15px 30px -5px rgba(16, 185, 129, 0.25)"
                    }}
                    className={`group relative h-full rounded-lg border ${model.borderColor} bg-gradient-to-br ${model.color} p-2.5 sm:p-3 transition-all duration-300 cursor-default`}
                  >
                    <div className={`inline-flex rounded-md bg-slate-900/60 p-1.5 ${model.iconColor}`}>
                      <Icon className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                    </div>
                    
                    <h3 className="mt-1.5 text-[11px] font-semibold text-slate-50 sm:text-xs">
                      {model.name}
                    </h3>
                    
                    <p className="mt-1 text-[9px] leading-tight text-slate-200 sm:text-[10px]">
                      {model.description}
                    </p>

                    <div className="mt-2 space-y-1 border-t border-slate-700/30 pt-1.5">
                      <div>
                        <span className="text-[8px] font-medium uppercase tracking-wider text-slate-400">
                          Pros
                        </span>
                        <p className="text-[8px] text-slate-300 sm:text-[9px]">{model.pros}</p>
                      </div>
                      
                      <div>
                        <span className="text-[8px] font-medium uppercase tracking-wider text-slate-400">
                          Best For
                        </span>
                        <p className="text-[8px] text-slate-300 sm:text-[9px]">{model.bestFor}</p>
                      </div>
                    </div>
                  </motion.div>
                </FloatingCard3D>
              </motion.div>
            );
          })}
        </div>

        {/* Compact Roadmap */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-6 rounded-xl border border-slate-800/80 bg-slate-900/60 p-3 sm:mt-8 sm:p-4"
        >
          <h3 className="text-center text-xs font-semibold text-slate-50 sm:text-sm">
            Typical progression
          </h3>
          <p className="mt-1 text-center text-[9px] text-slate-400 sm:text-[10px]">
            Most start with a pilot, then scale
          </p>
          
          <div className="mt-3 flex flex-wrap items-center justify-center gap-2 sm:mt-4 sm:gap-3">
            <div className="flex flex-col items-center">
              <div className="rounded-lg bg-emerald-400/10 px-2 py-1 sm:px-3">
                <span className="text-[10px] font-medium text-emerald-300 sm:text-xs">Pilot</span>
              </div>
              <span className="mt-0.5 text-[8px] text-slate-400">4wks</span>
            </div>
            
            <div className="text-slate-600">→</div>
            
            <div className="flex flex-col items-center">
              <div className="rounded-lg bg-blue-400/10 px-2 py-1 sm:px-3">
                <span className="text-[10px] font-medium text-blue-300 sm:text-xs">Proposal</span>
              </div>
              <span className="mt-0.5 text-[8px] text-slate-400">1-2wks</span>
            </div>
            
            <div className="text-slate-600">→</div>
            
            <div className="flex flex-col items-center">
              <div className="rounded-lg bg-violet-400/10 px-2 py-1 sm:px-3">
                <span className="text-[10px] font-medium text-violet-300 sm:text-xs">Build</span>
              </div>
              <span className="mt-0.5 text-[8px] text-slate-400">2-6mo</span>
            </div>
            
            <div className="text-slate-600">→</div>
            
            <div className="flex flex-col items-center">
              <div className="rounded-lg bg-amber-400/10 px-2 py-1 sm:px-3">
                <span className="text-[10px] font-medium text-amber-300 sm:text-xs">Retainer</span>
              </div>
              <span className="mt-0.5 text-[8px] text-slate-400">Ongoing</span>
            </div>
          </div>

          <p className="mt-2 text-center text-[8px] text-slate-400 sm:mt-3 sm:text-[9px]">
            Or jump to any model that fits
          </p>
        </motion.div>
      </div>
    </section>
  );
}
