import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { SpotlightCard } from "./SpotlightCard";

interface PilotCardProps {
  id: string;
  title: string;
  sector: string;
  whoFor: string;
  problem: string;
  outcome: string;
  timeToDemo: string;
  tag?: string;
  imageUrl?: string;
  className?: string;
  shouldLoadImage?: boolean; // New prop for lazy loading control
}

export function PilotCard({
  id,
  title,
  sector,
  whoFor,
  problem,
  outcome,
  timeToDemo,
  tag,
  imageUrl,
  className,
  shouldLoadImage = true,
}: PilotCardProps) {
  const reduce = useReducedMotion();

  return (
    <Link to={`/case-study/${id}`} className="block w-full h-full">
      <SpotlightCard className={cn("h-full flex flex-col", className)}>
        <motion.article
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduce ? 0 : 0.35 }}
          className="relative w-full h-full flex flex-col overflow-hidden"
        >
          {/* Image header - Mobile-first sizing */}
          <div className="relative h-32 xs:h-36 sm:h-40 w-full overflow-hidden flex-shrink-0">
            {(shouldLoadImage ?? true) && imageUrl ? (
              <img
                src={imageUrl}
                alt={`${title} preview`}
                className="h-full w-full object-cover"
                loading="lazy"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
            ) : (
              <div className="h-full w-full bg-slate-800" />
            )}
            {/* Gradient overlay/fallback */}
            <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/50 to-transparent" />

            {/* Sector pill */}
            <div className="absolute left-2 top-2 rounded-full bg-black/70 backdrop-blur-sm px-2 py-0.5 text-[9px] sm:text-[10px] text-slate-200 ring-1 ring-white/10 font-medium">
              {sector}
            </div>

            {tag && (
              <div className="absolute right-2 top-2 rounded-full bg-primary/20 backdrop-blur-sm px-2 py-0.5 text-[9px] sm:text-[10px] text-primary ring-1 ring-primary/30 font-medium">
                {tag}
              </div>
            )}
          </div>

          {/* Body - Mobile-first padding and spacing */}
          <div className="flex flex-col gap-2 p-3 sm:p-4 flex-1">
            <header className="space-y-0.5">
              <h3 className="text-xs xs:text-sm sm:text-base font-bold leading-tight text-white line-clamp-2">
                {title}
              </h3>
              <p className="text-[10px] xs:text-[11px] sm:text-xs text-slate-400">
                For <span className="text-slate-200 font-medium">{whoFor}</span> · {timeToDemo}
              </p>
            </header>

            <div className="space-y-1.5 flex-1">
              <div className="rounded-lg bg-slate-900/60 backdrop-blur-sm p-2 sm:p-2.5">
                <p className="text-[10px] xs:text-[11px] sm:text-xs text-slate-300 leading-relaxed">
                  <span className="font-semibold text-slate-100">Problem:</span>{" "}
                  {problem}
                </p>
              </div>

              <div className="rounded-lg bg-slate-900/60 backdrop-blur-sm p-2 sm:p-2.5">
                <p className="text-[10px] xs:text-[11px] sm:text-xs text-slate-300 leading-relaxed">
                  <span className="font-semibold text-slate-100">Outcome:</span>{" "}
                  {outcome}
                </p>
              </div>
            </div>

            {/* Footer CTA */}
            <div className="mt-auto pt-1">
              <div
                className={cn(
                  "w-full rounded-lg border border-primary/30 bg-primary/10 px-3 py-2 text-center",
                  "text-[10px] xs:text-[11px] sm:text-xs font-semibold text-primary",
                  "hover:bg-primary/20 hover:border-primary/50 active:scale-[0.98] transition-all duration-200",
                  "focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
                )}
                role="button"
                aria-label={`Open case study for ${title}`}
              >
                View case study →
              </div>
            </div>
          </div>
        </motion.article>
      </SpotlightCard>
    </Link>
  );
}
