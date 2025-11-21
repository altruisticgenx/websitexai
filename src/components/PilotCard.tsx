import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { OptimizedImage } from "./OptimizedImage";

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
}: PilotCardProps) {
  const reduce = useReducedMotion();

  return (
    <motion.article
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: reduce ? 0 : 0.35 }}
      className={cn(
        "relative w-full overflow-hidden rounded-2xl border border-slate-800/80 bg-slate-950/80 backdrop-blur-xl",
        "shadow-lg shadow-black/30",
        // Mobile-first size + breathing room
        "min-h-[360px] sm:min-h-[380px] lg:min-h-[420px]",
        className,
      )}
    >
      {/* Image header */}
      <div className="relative h-36 sm:h-40 lg:h-44 w-full overflow-hidden">
        {imageUrl ? (
          <OptimizedImage
            src={imageUrl}
            alt={`${title} preview`}
            sizes="(max-width: 640px) 400px, (max-width: 1024px) 800px, 1200px"
            className="h-full w-full object-cover"
            enableModernFormats={true}
          />
        ) : (
          <div className="h-full w-full bg-gradient-to-br from-slate-900 to-slate-800" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent" />

        {/* sector pill */}
        <div className="absolute left-2 top-2 rounded-full bg-black/60 px-2.5 py-1 text-[10px] sm:text-xs text-slate-200 ring-1 ring-white/10">
          {sector}
        </div>

        {tag && (
          <div className="absolute right-2 top-2 rounded-full bg-primary/15 px-2.5 py-1 text-[10px] sm:text-xs text-primary ring-1 ring-primary/30">
            {tag}
          </div>
        )}
      </div>

      {/* Body */}
      <div className="flex flex-col gap-2 p-3 sm:p-4">
        <header className="space-y-1">
          <h3 className="text-sm sm:text-base lg:text-lg font-bold leading-tight text-white line-clamp-2">
            {title}
          </h3>
          <p className="text-[11px] sm:text-xs text-slate-400">
            For <span className="text-slate-200 font-medium">{whoFor}</span> · {timeToDemo}
          </p>
        </header>

        <div className="space-y-2">
          <div className="rounded-xl bg-slate-900/60 p-2.5 sm:p-3">
            <p className="text-[11px] sm:text-xs text-slate-300 leading-relaxed">
              <span className="font-semibold text-slate-100">Problem:</span>{" "}
              {problem}
            </p>
          </div>

          <div className="rounded-xl bg-slate-900/60 p-2.5 sm:p-3">
            <p className="text-[11px] sm:text-xs text-slate-300 leading-relaxed">
              <span className="font-semibold text-slate-100">Outcome:</span>{" "}
              {outcome}
            </p>
          </div>
        </div>

        {/* Footer CTA row */}
        <div className="mt-auto pt-1">
          <Link
            to={`/case-study/${id}`}
            className={cn(
              "block w-full rounded-xl border border-slate-700/80 bg-slate-900/70 px-3 py-2.5 text-center",
              "text-xs sm:text-sm font-semibold text-white",
              "hover:bg-slate-800/80 active:scale-[0.99] transition",
              "focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
            )}
            aria-label={`Open case study for ${title}`}
          >
            View case study →
          </Link>
        </div>
      </div>
    </motion.article>
  );
}
