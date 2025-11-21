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
  // Dynamic gradient based on sector with enhanced 3D effects
  const getSectorGradient = (sector: string) => {
    const gradients: Record<string, string> = {
      "Education Nonprofit": "from-blue-500/20 via-indigo-500/10 to-violet-500/20 border-blue-400/40 hover:border-blue-400/70",
      "Founder-Backed Startup": "from-emerald-500/20 via-teal-500/10 to-green-500/20 border-emerald-400/40 hover:border-emerald-400/70",
      "Solo Founder": "from-amber-500/20 via-orange-500/10 to-yellow-500/20 border-amber-400/40 hover:border-amber-400/70",
      "Climate & Energy": "from-lime-500/20 via-green-500/10 to-emerald-500/20 border-lime-400/40 hover:border-lime-400/70",
    };
    return gradients[sector] || "from-slate-800/20 via-slate-700/10 to-slate-600/20 border-slate-400/40 hover:border-slate-400/70";
  };

  // Get glow color for 3D effect
  const getGlowColor = (sector: string) => {
    const glows: Record<string, string> = {
      "Education Nonprofit": "shadow-blue-500/20",
      "Founder-Backed Startup": "shadow-emerald-500/20",
      "Solo Founder": "shadow-amber-500/20",
      "Climate & Energy": "shadow-lime-500/20",
    };
    return glows[sector] || "shadow-slate-500/20";
  };

  return (
    <Link to={`/case-study/${id}`} className="block group">
      <motion.article
        whileHover={{ 
          y: -12, 
          rotateX: 5,
          rotateY: -3,
          scale: 1.05,
          z: 50,
          transition: { 
            duration: 0.4, 
            ease: [0.34, 1.56, 0.64, 1]
          }
        }}
        whileTap={{ scale: 0.96 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        style={{ 
          transformStyle: "preserve-3d",
          perspective: "1200px"
        }}
        className={cn(
          "relative flex h-full flex-col rounded-lg border bg-gradient-to-br backdrop-blur-sm p-2 sm:p-2.5 transition-all duration-500 cursor-pointer",
          "hover:shadow-2xl shadow-md",
          getSectorGradient(sector),
          getGlowColor(sector),
          "before:absolute before:inset-0 before:rounded-lg before:bg-gradient-to-br before:from-white/10 before:via-white/5 before:to-transparent before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-500",
          "after:absolute after:inset-0 after:rounded-lg after:bg-gradient-to-t after:from-black/20 after:to-transparent after:opacity-0 hover:after:opacity-100 after:transition-opacity after:duration-500",
          className
        )}
      >
        {/* Enhanced 3D Depth Layers */}
        <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-transparent via-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" 
          style={{ transform: "translateZ(10px)" }} />
        <div className="absolute inset-0 rounded-lg bg-gradient-radial from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-sm" 
          style={{ transform: "translateZ(-5px)" }} />
        
        {/* Header */}
        <div className="relative z-10 flex items-start justify-between gap-1 mb-1.5">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1 mb-0.5">
              <span className="inline-flex items-center gap-0.5 rounded border border-primary/50 bg-primary/20 px-1 py-0.5 text-[8px] font-semibold text-primary shadow-sm">
                <Users className="h-2 w-2" />
                {whoFor}
              </span>
            </div>
            <h3 className="text-[10px] sm:text-[11px] font-bold text-foreground line-clamp-2 leading-tight">{title}</h3>
            <p className="text-[8px] text-muted-foreground mt-0.5 line-clamp-1">{sector}</p>
          </div>
          {tag && (
            <span className="rounded border border-border/70 bg-muted/80 px-1 py-0.5 text-[7px] text-muted-foreground whitespace-nowrap shadow-sm">
              {tag}
            </span>
          )}
        </div>

        {/* Problem */}
        <div className="relative z-10 mb-1.5 flex-1">
          <h4 className="text-[8px] font-semibold text-foreground mb-0.5">Problem</h4>
          <p className="text-[8px] text-muted-foreground leading-snug line-clamp-2">
            {problem}
          </p>
        </div>

        {/* Outcome Metric */}
        <div className="relative z-10 mb-1.5 rounded border border-primary/40 bg-primary/15 p-1.5 shadow-inner">
          <div className="flex items-start gap-1">
            <TrendingUp className="h-2 w-2 text-primary mt-0.5 flex-shrink-0" />
            <div className="min-w-0">
              <h4 className="text-[7px] font-bold text-primary mb-0.5 uppercase tracking-wider">Outcome</h4>
              <p className="text-[8px] text-foreground leading-snug line-clamp-2">
                {outcome}
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="relative z-10 flex items-center justify-between pt-1.5 border-t border-border/60">
          <div className="flex items-center gap-0.5 text-[8px] text-muted-foreground">
            <Clock className="h-2 w-2" />
            <span>{timeToDemo}</span>
          </div>
          <span className="inline-flex items-center gap-0.5 text-[8px] font-semibold text-primary group-hover:gap-1 transition-all">
            View
            <ArrowRight className="h-2 w-2" />
          </span>
        </div>
      </motion.article>
    </Link>
  );
}
