import React from "react";
import { motion } from "framer-motion";
import { Zap, FileText, Layers, RefreshCw } from "lucide-react";

const engagementModels = [
  {
    name: "Pilot",
    icon: Zap,
    description: "A 4-week sprint with weekly delivery—real, usable builds, not decks.",
    pros: "Momentum, learning, tangible progress, low risk",
    bestFor: "Validation, early adoption, rapid iteration",
    color: "from-emerald-500/20 to-teal-500/20",
    borderColor: "border-emerald-400/40",
    iconColor: "text-emerald-300",
  },
  {
    name: "Proposal",
    icon: FileText,
    description: "A scoped plan outlining objectives, requirements, timelines, and budget.",
    pros: "Clarity, alignment, stakeholder buy-in",
    bestFor: "Grants, larger organizations, compliance-heavy work",
    color: "from-blue-500/20 to-cyan-500/20",
    borderColor: "border-blue-400/40",
    iconColor: "text-blue-300",
  },
  {
    name: "Full Project",
    icon: Layers,
    description: "Multi-month end-to-end execution without pilot fragmentation.",
    pros: "Stability, depth, full solution build-out",
    bestFor: "Long-term product development, scaling",
    color: "from-violet-500/20 to-purple-500/20",
    borderColor: "border-violet-400/40",
    iconColor: "text-violet-300",
  },
  {
    name: "Retainer",
    icon: RefreshCw,
    description: "Ongoing, flexible creative/technical support.",
    pros: "Continuous expertise, predictable bandwidth",
    bestFor: "Established teams, B2B orgs, evolving roadmaps",
    color: "from-amber-500/20 to-orange-500/20",
    borderColor: "border-amber-400/40",
    iconColor: "text-amber-300",
  },
];

export function EngagementModels() {
  return (
    <section className="py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <h2 className="text-2xl font-semibold sm:text-3xl">
            How we work together
          </h2>
          <p className="mt-3 text-sm text-slate-300 sm:text-base">
            Different engagement models for different needs—from rapid validation to ongoing partnership.
          </p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {engagementModels.map((model, index) => {
            const Icon = model.icon;
            return (
              <motion.div
                key={model.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`group relative rounded-2xl border ${model.borderColor} bg-gradient-to-br ${model.color} p-6 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl`}
              >
                <div className={`inline-flex rounded-xl bg-slate-900/60 p-3 ${model.iconColor}`}>
                  <Icon className="h-6 w-6" />
                </div>
                
                <h3 className="mt-4 text-lg font-semibold text-slate-50">
                  {model.name}
                </h3>
                
                <p className="mt-2 text-sm leading-relaxed text-slate-200">
                  {model.description}
                </p>

                <div className="mt-4 space-y-2 border-t border-slate-700/30 pt-4">
                  <div>
                    <span className="text-xs font-medium uppercase tracking-wider text-slate-400">
                      Pros
                    </span>
                    <p className="mt-1 text-xs text-slate-300">{model.pros}</p>
                  </div>
                  
                  <div>
                    <span className="text-xs font-medium uppercase tracking-wider text-slate-400">
                      Best For
                    </span>
                    <p className="mt-1 text-xs text-slate-300">{model.bestFor}</p>
                  </div>
                </div>

                {/* Hover indicator */}
                <div className="absolute bottom-4 right-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <span className="text-xs text-slate-400">Learn more →</span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Roadmap visualization */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 rounded-2xl border border-slate-800/80 bg-slate-900/60 p-6 sm:p-8"
        >
          <h3 className="text-center text-lg font-semibold text-slate-50">
            Typical progression path
          </h3>
          <p className="mt-2 text-center text-sm text-slate-400">
            Most engagements start with a pilot, then scale based on evidence
          </p>
          
          <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <div className="flex flex-col items-center">
              <div className="rounded-xl bg-emerald-400/10 px-4 py-2">
                <span className="text-sm font-medium text-emerald-300">Pilot</span>
              </div>
              <span className="mt-2 text-xs text-slate-400">4 weeks</span>
            </div>
            
            <div className="h-8 w-px bg-slate-700 sm:h-px sm:w-8" />
            
            <div className="flex flex-col items-center">
              <div className="rounded-xl bg-blue-400/10 px-4 py-2">
                <span className="text-sm font-medium text-blue-300">Proposal</span>
              </div>
              <span className="mt-2 text-xs text-slate-400">1-2 weeks</span>
            </div>
            
            <div className="h-8 w-px bg-slate-700 sm:h-px sm:w-8" />
            
            <div className="flex flex-col items-center">
              <div className="rounded-xl bg-violet-400/10 px-4 py-2">
                <span className="text-sm font-medium text-violet-300">Full Build</span>
              </div>
              <span className="mt-2 text-xs text-slate-400">2-6 months</span>
            </div>
            
            <div className="h-8 w-px bg-slate-700 sm:h-px sm:w-8" />
            
            <div className="flex flex-col items-center">
              <div className="rounded-xl bg-amber-400/10 px-4 py-2">
                <span className="text-sm font-medium text-amber-300">Retainer</span>
              </div>
              <span className="mt-2 text-xs text-slate-400">Ongoing</span>
            </div>
          </div>

          <p className="mt-6 text-center text-xs text-slate-400">
            Or jump straight to any model that fits your context—there's no forced path.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
