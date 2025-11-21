import React from "react";
import { motion } from "framer-motion";
import { ParallaxBackground } from "@/components/ParallaxBackground";
import { FeatureCardWithTooltip, FeatureItem } from "@/components/FeatureCardWithTooltip";
import { TooltipProvider } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

const features: FeatureItem[] = [
  {
    title: "Early, ambiguous work",
    desc: "When the edges are fuzzy and you need to learn by shipping, not by planning.",
    color: "emerald",
    icon: "🧭",
    example:
      "AI Sales Copilot: Started with messy CRM exports and unclear goals. Week 1: data flow. Week 2: first dashboard. Week 4: auto-prioritized leads ready for demo.",
  },
  {
    title: "Complex domains",
    desc: "Energy, education, civic systems, compliance—places where policy, people, and tech collide.",
    color: "cyan",
    icon: "⚡",
    example:
      "Energy Analytics Pilot: 200+ campus meters, Excel chaos. Built real-time dashboard showing savings opportunities across policy, billing, and operations.",
  },
  {
    title: "Proof, not promises",
    desc: "You need visible movement and credible artifacts, not another strategy deck.",
    color: "teal",
    icon: "✓",
    example:
      "EdTech Portal: Education nonprofit needed evidence for funders. 4 weeks: working pilot tracking outcomes. Result: defended funding with real data.",
  },
  {
    title: "Lean, collaborative teams",
    desc: "You're comfortable working in short cycles, reacting to real results, and adjusting quickly.",
    color: "blue",
    icon: "⚙",
    example:
      "Founder OS: Solo founder needed operational clarity. Weekly async Looms, quick pivots. Built unified scheduling, CRM, and invoicing—calm founder cockpit.",
  },
];

const notForItems = [
  "Large, multi-team implementations from day one",
  'Long-term headcount decisions disguised as "pilots"',
  "Purely cosmetic work where a static site or brochure would do",
];

export const PilotOffer: React.FC = React.memo(() => {
  return (
    <section
      id="pilot"
      className="relative border-t border-slate-900/80 py-10 lg:py-16"
      aria-labelledby="pilot-heading"
    >
      <ParallaxBackground
        speed={0.5}
        gradient="from-secondary/8 via-accent/6 to-transparent"
        meshVariant="accent"
        meshIntensity="subtle"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,hsl(var(--accent)/0.15),transparent_50%)]" />
      </ParallaxBackground>

      <div className="mx-auto w-full max-w-5xl space-y-8 px-4">
        {/* Main Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="space-y-6"
        >
          <h2 id="pilot-heading" className="heading-3 text-foreground">
            Why a Pilot Partner Instead of Hiring In-House
          </h2>

          <ul className="max-w-3xl space-y-4">
            {[
              "Hiring in-house makes sense once you know what you're scaling. When you're still in the \"is this even the right thing?\" phase, it's a slow and expensive way to find out.",
              "Bringing on a full-time senior hire typically means months of recruiting, six-figure commitments, and added overhead—before you even know if the pilot is worth scaling.",
              "My model is different: You bring a real problem, we design a small, honest experiment, and within a few weeks you have something you can show to leadership, funders, or partners—plus a clearer sense of what to do next.",
            ].map((text, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: i * 0.08 }}
                className={cn(
                  "flex items-start gap-2 body-base leading-relaxed",
                  i === 2 ? "text-foreground font-medium" : "text-muted-foreground"
                )}
              >
                <span className="mt-0.5 text-xs text-primary">•</span>
                <span>{text}</span>
              </motion.li>
            ))}
          </ul>
        </motion.div>

        {/* What This Model Is For */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, delay: 0.1 }}
          className="space-y-3 sm:space-y-4"
        >
          <h3 className="heading-4 text-primary">What This Model Is For</h3>
          <p className="text-[10px] sm:text-xs text-muted-foreground">
            Tap cards to see real examples
          </p>

          <TooltipProvider delayDuration={160}>
            <div className="grid gap-2 sm:gap-3 grid-cols-2 lg:grid-cols-4">
              {features.map((item, i) => (
                <FeatureCardWithTooltip key={item.title} item={item} index={i} />
              ))}
            </div>
          </TooltipProvider>
        </motion.div>

        {/* What This Model Is Not For */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, delay: 0.2 }}
          className="space-y-4"
        >
          <h3 className="heading-4 text-muted-foreground">What This Model Is Not For</h3>

          <div className="rounded-lg border border-slate-800/70 bg-slate-950/50 p-5">
            <ul className="body-base space-y-3 text-slate-400">
              {notForItems.map((t) => (
                <li key={t} className="flex items-start gap-2">
                  <span className="mt-0.5 opacity-50">✕</span>
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>

        {/* Summary Box */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.25 }}
          className="rounded-lg border border-primary/30 bg-gradient-to-br from-primary/5 to-slate-950/80 p-5 backdrop-blur-sm"
        >
          <p className="heading-5 mb-3 text-foreground">Pilot-first, learning-first approach</p>
          <p className="body-base leading-relaxed text-muted-foreground">
            Small scope, honest results, and no long-term lock-in until you know what's actually worth
            scaling.
          </p>
        </motion.div>
      </div>
    </section>
  );
});

PilotOffer.displayName = "PilotOffer";
