import React, { useState, useMemo } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { ParallaxBackground } from "@/components/effects";
import { cn } from "@/lib/utils";

type FeatureItem = {
  title: string;
  desc: string;
  color: "emerald" | "cyan" | "teal" | "blue";
  icon: string;
  example: string;
};

const FeatureCardWithTooltip: React.FC<{ item: FeatureItem; index: number }> = React.memo(({ item, index }) => {
  const prefersReducedMotion = useReducedMotion();
  const [isTouched, setIsTouched] = useState(false);

  const colorClasses = useMemo(() => {
    switch (item.color) {
      case "emerald":
        return {
          border: "border-emerald-400/40 hover:border-emerald-400/70",
          gradient: "from-emerald-500/20 via-teal-500/10 to-green-500/20",
          shadow: "shadow-emerald-500/20",
        };
      case "cyan":
        return {
          border: "border-cyan-400/40 hover:border-cyan-400/70",
          gradient: "from-cyan-500/20 via-blue-500/10 to-teal-500/20",
          shadow: "shadow-cyan-500/20",
        };
      case "teal":
        return {
          border: "border-teal-400/40 hover:border-teal-400/70",
          gradient: "from-teal-500/20 via-emerald-500/10 to-cyan-500/20",
          shadow: "shadow-teal-500/20",
        };
      default:
        return {
          border: "border-blue-400/40 hover:border-blue-400/70",
          gradient: "from-blue-500/20 via-indigo-500/10 to-violet-500/20",
          shadow: "shadow-blue-500/20",
        };
    }
  }, [item.color]);

  return (
    <Tooltip open={isTouched ? true : undefined}>
      <TooltipTrigger asChild>
        <motion.button
          type="button"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{
            duration: prefersReducedMotion ? 0 : 0.3,
            delay: index * 0.05,
          }}
          whileHover={
            prefersReducedMotion
              ? undefined
              : {
                  y: -6,
                  rotateX: 2,
                  rotateY: -2,
                  scale: 1.02,
                  transition: { duration: 0.3, ease: "easeOut" },
                }
          }
          whileTap={{ scale: 0.98 }}
          onClick={() => setIsTouched((v) => !v)}
          onMouseEnter={() => setIsTouched(false)}
          style={{ transformStyle: "preserve-3d", perspective: "1000px" }}
          className={cn(
            "group relative w-full overflow-hidden rounded-lg border bg-gradient-to-br backdrop-blur-sm p-2.5 sm:p-3 transition-all cursor-pointer",
            "touch-manipulation focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50",
            "hover:shadow-xl shadow-lg",
            colorClasses.border,
            colorClasses.gradient,
            colorClasses.shadow,
            "before:absolute before:inset-0 before:rounded-lg before:bg-gradient-to-br before:from-white/5 before:to-transparent before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-300",
          )}
          aria-label={`${item.title} – ${item.desc}. Tap to see example.`}
        >
          <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-transparent via-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="relative z-10 flex items-start gap-1.5">
            <span className="text-base sm:text-lg flex-shrink-0 mt-0.5" aria-hidden="true">
              {item.icon}
            </span>
            <div className="flex-1 min-w-0 text-left">
              <h4 className="mb-0.5 text-[10px] sm:text-[11px] font-bold text-foreground leading-tight line-clamp-2">
                {item.title}
              </h4>
              <p className="text-[9px] sm:text-[10px] leading-snug text-muted-foreground line-clamp-2 sm:line-clamp-3">
                {item.desc}
              </p>
            </div>
          </div>
          <div className="absolute bottom-1 right-1 text-[8px] text-muted-foreground/50 sm:hidden">Tap</div>
        </motion.button>
      </TooltipTrigger>

      <TooltipContent
        side="top"
        className="max-w-[260px] sm:max-w-[320px] bg-slate-900/95 backdrop-blur-sm border-primary/30 p-3"
        onPointerDownOutside={(e) => {
          if (isTouched) {
            e.preventDefault();
            setIsTouched(false);
          }
        }}
      >
        <p className="text-[10px] sm:text-xs leading-relaxed text-slate-200">
          <span className="font-semibold text-primary">Real Example:</span> {item.example}
        </p>
      </TooltipContent>
    </Tooltip>
  );
});
FeatureCardWithTooltip.displayName = "FeatureCardWithTooltip";

export const PilotOffer: React.FC = React.memo(() => {
  const items: FeatureItem[] = [
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
                  i === 2 ? "text-foreground font-medium" : "text-muted-foreground",
                )}
              >
                <span className="mt-0.5 text-xs text-primary">•</span>
                <span>{text}</span>
              </motion.li>
            ))}
          </ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, delay: 0.1 }}
          className="space-y-3 sm:space-y-4"
        >
          <h3 className="heading-4 text-primary">What This Model Is For</h3>
          <p className="text-[10px] sm:text-xs text-muted-foreground">Tap cards to see real examples</p>

          <TooltipProvider delayDuration={160}>
            <div className="grid gap-2 sm:gap-3 grid-cols-2 lg:grid-cols-4">
              {items.map((item, i) => (
                <FeatureCardWithTooltip key={item.title} item={item} index={i} />
              ))}
            </div>
          </TooltipProvider>
        </motion.div>

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
              {[
                "Large, multi-team implementations from day one",
                'Long-term headcount decisions disguised as "pilots"',
                "Purely cosmetic work where a static site or brochure would do",
              ].map((t) => (
                <li key={t} className="flex items-start gap-2">
                  <span className="mt-0.5 opacity-50">✕</span>
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.25 }}
          className="rounded-lg border border-primary/30 bg-gradient-to-br from-primary/5 to-slate-950/80 p-5 backdrop-blur-sm"
        >
          <p className="heading-5 mb-3 text-foreground">Pilot-first, learning-first approach</p>
          <p className="body-base leading-relaxed text-muted-foreground">
            Small scope, honest results, and no long-term lock-in until you know what's actually worth scaling.
          </p>
        </motion.div>
      </div>
    </section>
  );
});

PilotOffer.displayName = "PilotOffer";
