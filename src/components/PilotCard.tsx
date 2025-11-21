import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

interface PilotCardProps {
  id: string;
  title: string;
  sector: string;
  summary: string;
  tag?: string;
  problem?: string;
  outcome?: string;
  timeToDemo?: string;
  index: number;
}

export function PilotCard({
  id,
  title,
  sector,
  summary,
  tag,
  problem,
  outcome,
  timeToDemo = "Week 1-2",
  index,
}: PilotCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="group relative flex flex-col rounded-lg border border-slate-800/70 bg-slate-900/70 p-4 sm:p-5 shadow-sm transition-all hover:shadow-lg hover:border-primary/30 hover:-translate-y-1"
    >
      {/* Sector Tag */}
      <div className="flex items-center justify-between gap-2 mb-3">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/10 px-2.5 py-1 text-[10px] font-medium text-primary">
          {sector}
        </span>
        {timeToDemo && (
          <span className="inline-flex items-center gap-1 text-[10px] text-muted-foreground">
            <Clock className="h-3 w-3" />
            {timeToDemo}
          </span>
        )}
      </div>

      {/* Title */}
      <h3 className="text-base sm:text-lg font-semibold text-foreground mb-2 line-clamp-2">
        {title}
      </h3>

      {/* Problem (if provided) */}
      {problem && (
        <div className="mb-3">
          <p className="text-xs font-medium text-muted-foreground mb-1">Problem:</p>
          <p className="text-xs text-slate-300 leading-relaxed">{problem}</p>
        </div>
      )}

      {/* Summary */}
      <p className="text-xs text-slate-300 leading-relaxed mb-3 flex-1">
        {summary}
      </p>

      {/* Outcome (if provided) */}
      {outcome && (
        <div className="mb-3 rounded-md bg-primary/5 border border-primary/20 px-3 py-2">
          <p className="text-xs font-medium text-primary mb-1">Outcome:</p>
          <p className="text-xs text-foreground">{outcome}</p>
        </div>
      )}

      {/* Footer: Tag + CTA */}
      <div className="flex items-center justify-between gap-3 pt-3 border-t border-slate-800/70">
        {tag && (
          <span className="text-[10px] text-slate-500 rounded-full border border-slate-700/80 px-2 py-1">
            {tag}
          </span>
        )}
        <a
          href={`/case-study/${id}`}
          className={cn(
            "inline-flex items-center gap-1.5 text-xs font-medium text-primary transition-all",
            "hover:gap-2 hover:text-accent",
            "ml-auto touch-manipulation min-h-[44px] px-3 py-2"
          )}
        >
          View details
          <ArrowRight className="h-3 w-3" />
        </a>
      </div>
    </motion.article>
  );
}
