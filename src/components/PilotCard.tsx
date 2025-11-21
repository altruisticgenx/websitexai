import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Clock, TrendingUp, Users, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface PilotCardProps {
  id: string;
  title: string;
  sector: string;
  whoFor: string;
  problem: string;
  outcome: string;
  timeToDemo: string;
  tag?: string;
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
  className,
}: PilotCardProps) {
  // Dynamic gradient based on sector
  const getSectorGradient = (sector: string) => {
    const gradients: Record<string, string> = {
      "Education Nonprofit": "from-blue-500/10 via-indigo-500/5 to-violet-500/10 border-blue-400/30 hover:border-blue-400/50",
      "Founder-Backed Startup": "from-emerald-500/10 via-teal-500/5 to-green-500/10 border-emerald-400/30 hover:border-emerald-400/50",
      "Solo Founder": "from-amber-500/10 via-orange-500/5 to-yellow-500/10 border-amber-400/30 hover:border-amber-400/50",
      "Climate & Energy": "from-lime-500/10 via-green-500/5 to-emerald-500/10 border-lime-400/30 hover:border-lime-400/50",
    };
    return gradients[sector] || "from-slate-800/10 via-slate-700/5 to-slate-600/10 border-slate-400/30 hover:border-slate-400/50";
  };

  return (
    <Link to={`/case-study/${id}`}>
      <motion.article
        whileHover={{ y: -4, scale: 1.02 }}
        transition={{ duration: 0.2 }}
        className={cn(
          "group relative flex h-full flex-col rounded-lg border bg-gradient-to-br backdrop-blur-sm p-4 transition-all duration-300 hover:shadow-xl cursor-pointer min-h-[200px]",
          getSectorGradient(sector),
          className
        )}
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-2 mb-3">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <span className="inline-flex items-center gap-1 rounded-md border border-primary/30 bg-primary/10 px-2 py-0.5 body-xs font-medium text-primary">
                <Users className="h-3 w-3" />
                {whoFor}
              </span>
            </div>
            <h3 className="text-sm font-semibold text-foreground line-clamp-2 sm:text-base">{title}</h3>
            <p className="body-xs text-muted-foreground mt-1">{sector}</p>
          </div>
          {tag && (
            <span className="rounded-md border border-border/50 bg-muted/50 px-2 py-0.5 body-xs text-muted-foreground whitespace-nowrap">
              {tag}
            </span>
          )}
        </div>

        {/* Problem */}
        <div className="mb-3 flex-1">
          <h4 className="body-xs font-semibold text-foreground mb-1">Problem</h4>
          <p className="body-xs text-muted-foreground leading-relaxed line-clamp-2">
            {problem}
          </p>
        </div>

        {/* Outcome Metric */}
        <div className="mb-3 rounded-md border border-primary/20 bg-primary/5 p-2">
          <div className="flex items-start gap-2">
            <TrendingUp className="h-3 w-3 text-primary mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="body-xs font-semibold text-primary mb-0.5">Outcome</h4>
              <p className="body-xs text-foreground leading-relaxed">
                {outcome}
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-3 border-t border-border/40">
          <div className="flex items-center gap-1 body-xs text-muted-foreground">
            <Clock className="h-3 w-3" />
            <span>{timeToDemo}</span>
          </div>
          <span className="inline-flex items-center gap-1 body-xs font-medium text-primary group-hover:gap-2 transition-all">
            View Case
            <ArrowRight className="h-3 w-3" />
          </span>
        </div>
      </motion.article>
    </Link>
  );
}
