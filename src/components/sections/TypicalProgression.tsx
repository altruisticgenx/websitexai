import React from "react";
import { motion } from "framer-motion";
import { Section } from "@/components/Section";
import { Stack } from "@/components/layout/Stack";
import { Grid } from "@/components/layout/Grid";
import { ParallaxBackground } from "@/components/ParallaxBackground";
import { cn } from "@/lib/utils";

export const TypicalProgression: React.FC = React.memo(() => {
  return (
    <Section spacing="normal" border="top">
      <ParallaxBackground
        speed={0.4}
        gradient="from-accent/10 via-primary/8 to-transparent"
        meshVariant="mixed"
        meshIntensity="vibrant"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,hsl(var(--secondary)/0.15),transparent_50%)]" />
      </ParallaxBackground>

      <Stack gap="lg">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          <h2 className="heading-4 text-foreground">Typical Progression</h2>
          <p className="body-sm text-muted-foreground mt-1">
            Start small, scale when ready—or jump to any stage.
          </p>
        </motion.div>

        <Grid columns={{ mobile: 2, tablet: 2, desktop: 4 }} gap="sm">
          {[
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
          ].map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.06 * i }}
              whileHover={{ y: -4, scale: 1.02, transition: { duration: 0.2 } }}
              className={cn(
                "group relative overflow-hidden rounded-xl border-2 p-2.5 sm:p-3 backdrop-blur-sm transition-all",
                "hover:shadow-lg hover:shadow-current/20",
                step.ring === "emerald" &&
                  "border-emerald-500/40 bg-gradient-to-br from-emerald-500/15 via-teal-500/10 to-emerald-500/15 hover:border-emerald-400/60",
                step.ring === "blue" &&
                  "border-blue-500/40 bg-gradient-to-br from-blue-500/15 via-indigo-500/10 to-blue-500/15 hover:border-blue-400/60",
                step.ring === "violet" &&
                  "border-violet-500/40 bg-gradient-to-br from-violet-500/15 via-purple-500/10 to-violet-500/15 hover:border-violet-400/60",
                step.ring === "orange" &&
                  "border-orange-500/40 bg-gradient-to-br from-orange-500/15 via-amber-500/10 to-orange-500/15 hover:border-orange-400/60",
              )}
            >
              <div
                className={cn(
                  "absolute -inset-[2px] rounded-xl opacity-0 blur-md transition-opacity duration-300 group-hover:opacity-30",
                  step.ring === "emerald" && "bg-emerald-500",
                  step.ring === "blue" && "bg-blue-500",
                  step.ring === "violet" && "bg-violet-500",
                  step.ring === "orange" && "bg-orange-500",
                )}
              />
              <div className="relative z-10">
                <div className="mb-1.5 flex items-center justify-between gap-1.5">
                  <div className="flex items-center gap-1.5">
                    <span className="text-base sm:text-lg" aria-hidden="true">
                      {step.icon}
                    </span>
                    <span className="body-sm font-bold text-slate-100">{step.title}</span>
                  </div>
                  <span className="body-xs font-medium text-slate-200/70">{step.sub}</span>
                </div>
                <p className="body-xs leading-snug text-slate-200/85">{step.body}</p>
              </div>
            </motion.div>
          ))}
        </Grid>
      </Stack>
    </Section>
  );
});

TypicalProgression.displayName = "TypicalProgression";
