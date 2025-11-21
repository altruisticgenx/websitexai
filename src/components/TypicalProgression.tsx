import React from "react";
import { motion } from "framer-motion";
import { ParallaxBackground } from "@/components/ParallaxBackground";
import { cn } from "@/lib/utils";

const progressionSteps = [
  {
    title: "1. Pilot",
    sub: "4 weeks",
    body: "Ship 1–2 features/week. Demo-ready code. Real builds, not decks.",
    ring: "emerald",
    icon: "⚡",
  },
  {
    title: "2. Proposal",
    sub: "1–2 weeks",
    body: "Scope doc, timeline, budget. Grant-ready, stakeholder-approved. RFP support.",
    ring: "blue",
    icon: "📋",
  },
  {
    title: "3. Build",
    sub: "2–6 months",
    body: "Full product delivery. Integrations, testing, documentation. Launch-ready.",
    ring: "violet",
    icon: "🚀",
  },
  {
    title: "4. Retainer",
    sub: "Ongoing",
    body: "Monthly support. Bug fixes, features, pivots. Always-on expertise.",
    ring: "orange",
    icon: "🔄",
  },
] as const;

export const TypicalProgression: React.FC = React.memo(() => {
  return (
    <section className="relative border-t border-slate-900/80 py-8 sm:py-10 lg:py-14">
      <ParallaxBackground
        speed={0.4}
        gradient="from-accent/10 via-primary/8 to-transparent"
        meshVariant="mixed"
        meshIntensity="vibrant"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,hsl(var(--secondary)/0.15),transparent_50%)]" />
      </ParallaxBackground>

      <div className="mx-auto w-full max-w-5xl px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="space-y-2 mb-6"
        >
          <h2 className="heading-3 text-foreground">Typical Progression</h2>
          <p className="body-base text-muted-foreground">
            Start small, scale when ready—or jump to any stage.
          </p>
        </motion.div>

        <div className="grid gap-3 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {progressionSteps.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, scale: 0.95, rotateY: -10 }}
              whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.5,
                delay: 0.08 * i,
                type: "spring",
                stiffness: 100
              }}
              whileHover={{
                y: -6,
                scale: 1.03,
                rotateX: 5,
                rotateY: 5,
                transition: { 
                  type: "spring",
                  stiffness: 400,
                  damping: 10
                },
              }}
              style={{
                transformStyle: "preserve-3d",
                perspective: "1200px",
              }}
              className={cn(
                "group relative overflow-hidden rounded-xl border-2 p-3.5 sm:p-4 backdrop-blur-sm transition-all touch-manipulation",
                "hover:shadow-2xl hover:shadow-current/30",
                step.ring === "emerald" &&
                  "border-emerald-500/40 bg-gradient-to-br from-emerald-500/15 via-teal-500/10 to-emerald-500/15 hover:border-emerald-400/70",
                step.ring === "blue" &&
                  "border-blue-500/40 bg-gradient-to-br from-blue-500/15 via-indigo-500/10 to-blue-500/15 hover:border-blue-400/70",
                step.ring === "violet" &&
                  "border-violet-500/40 bg-gradient-to-br from-violet-500/15 via-purple-500/10 to-violet-500/15 hover:border-violet-400/70",
                step.ring === "orange" &&
                  "border-orange-500/40 bg-gradient-to-br from-orange-500/15 via-amber-500/10 to-orange-500/15 hover:border-orange-400/70"
              )}
            >
              {/* Enhanced animated glow on hover */}
              <div
                className={cn(
                  "absolute -inset-[3px] rounded-xl opacity-0 blur-lg transition-all duration-300 group-hover:opacity-40 -z-10",
                  step.ring === "emerald" && "bg-emerald-500",
                  step.ring === "blue" && "bg-blue-500",
                  step.ring === "violet" && "bg-violet-500",
                  step.ring === "orange" && "bg-orange-500"
                )}
              />

              {/* 3D depth layer */}
              <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              {/* Content */}
              <div className="relative z-10">
                <div className="mb-2 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="text-lg sm:text-xl" aria-hidden="true">
                      {step.icon}
                    </span>
                    <span className="text-xs sm:text-sm font-bold text-slate-100">
                      {step.title}
                    </span>
                  </div>
                  <span className="text-[10px] sm:text-xs font-medium text-slate-200/70">
                    {step.sub}
                  </span>
                </div>
                <p className="text-[10px] sm:text-[11px] leading-relaxed text-slate-200/90">
                  {step.body}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
});

TypicalProgression.displayName = "TypicalProgression";
