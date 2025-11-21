import React, { useMemo, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import { ParallaxBackground } from "./ParallaxBackground";

type OrgType = {
  id: string;
  label: string;
  blurb: string;
  tags?: string[];
};

const ORG_TYPES: OrgType[] = [
  {
    id: "campus",
    label: "Universities / Campuses",
    blurb: "Energy, research, student success, and ops intelligence pilots.",
    tags: ["Energy", "EdTech", "Ops"],
  },
  {
    id: "cities",
    label: "Municipalities / Cities",
    blurb: "Policy + infrastructure analytics with privacy-first AI.",
    tags: ["Civic", "Grid", "Planning"],
  },
  {
    id: "startups",
    label: "Founder-Led Startups",
    blurb: "Fast pilot-to-product loops for real traction.",
    tags: ["B2B", "Growth", "RAG"],
  },
  {
    id: "utilities",
    label: "Utilities / Co-ops",
    blurb: "Local-first load forecasting and customer intelligence.",
    tags: ["Forecasting", "DER", "Savings"],
  },
];

export default function OrganizationTypes({
  className,
}: {
  className?: string;
}) {
  const reduceMotion = useReducedMotion();
  const [activeId, setActiveId] = useState<string>(ORG_TYPES[0].id);

  const active = useMemo(
    () => ORG_TYPES.find((o) => o.id === activeId) ?? ORG_TYPES[0],
    [activeId]
  );

  return (
    <section className={cn("relative w-full", className)}>
      <ParallaxBackground
        speed={0.5}
        gradient="from-accent/8 via-secondary/6 to-primary/8"
        meshVariant="accent"
        meshIntensity="medium"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,hsl(var(--accent)/0.15),transparent_50%)]" />
      </ParallaxBackground>

      <div className="mx-auto w-full max-w-5xl px-3 sm:px-4">
        <div className="flex items-end justify-between gap-2">
          <h2 className="text-xl sm:text-2xl font-semibold tracking-tight">
            Who I build for
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground">
            Pick a lane, see the fit.
          </p>
        </div>

        <div className="mt-3 grid grid-cols-2 sm:grid-cols-4 gap-2">
          {ORG_TYPES.map((org) => {
            const isActive = org.id === activeId;
            return (
              <button
                key={org.id}
                onClick={() => setActiveId(org.id)}
                className={cn(
                  "min-w-0 rounded-2xl px-3 py-2 text-left border transition",
                  "bg-background/60 hover:bg-background/90",
                  isActive
                    ? "border-primary/60 shadow-sm"
                    : "border-border/60"
                )}
                aria-pressed={isActive}
              >
                <div className="text-[11px] sm:text-sm font-medium truncate">
                  {org.label}
                </div>
                {org.tags?.length ? (
                  <div className="mt-1 flex flex-wrap gap-1">
                    {org.tags.map((t) => (
                      <span
                        key={t}
                        className="text-[9px] sm:text-[10px] px-1.5 py-0.5 rounded-full bg-muted/70"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                ) : null}
              </button>
            );
          })}
        </div>

        <motion.div
          key={active.id}
          initial={reduceMotion ? false : { opacity: 0, y: 8 }}
          animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
          className="mt-3 rounded-3xl border border-border/60 bg-background/70 p-4 sm:p-5"
        >
          <div className="text-base sm:text-lg font-semibold">
            {active.label}
          </div>
          <p className="mt-1 text-sm sm:text-base text-muted-foreground leading-relaxed">
            {active.blurb}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
