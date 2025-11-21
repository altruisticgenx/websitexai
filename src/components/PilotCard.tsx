import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { Clock, TrendingUp, Users, ArrowRight, Zap, CheckCircle2, ExternalLink } from "lucide-react";
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
  technologies?: string[];
  keyFeatures?: string[];
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
  technologies = [],
  keyFeatures = [],
}: PilotCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

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

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsFlipped(!isFlipped);
  };

  return (
    <div 
      className="block group h-full cursor-pointer"
      style={{ perspective: "1000px" }}
      onClick={handleClick}
    >
      <motion.div
        className="relative w-full h-full"
        style={{ transformStyle: "preserve-3d" }}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
        whileHover={{ 
          y: -8,
          transition: { duration: 0.3 }
        }}
      >
        {/* Front of Card */}
        <motion.article
          className={cn(
            "absolute inset-0 flex flex-col rounded-xl border bg-gradient-to-br backdrop-blur-sm p-3 transition-all duration-300",
            "hover:shadow-2xl shadow-lg",
            getSectorGradient(sector),
            getGlowColor(sector),
            "before:absolute before:inset-0 before:rounded-xl before:bg-gradient-to-br before:from-white/5 before:to-transparent before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-300",
            className
          )}
          style={{ backfaceVisibility: "hidden" }}
        >
          {/* 3D Depth Effect */}
          <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-transparent via-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          {/* Header */}
          <div className="relative z-10 flex items-start justify-between gap-1.5 mb-2">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5 mb-1">
                <span className="inline-flex items-center gap-0.5 rounded-md border border-primary/40 bg-primary/15 px-1.5 py-0.5 text-[9px] font-medium text-primary shadow-sm">
                  <Users className="h-2.5 w-2.5" />
                  {whoFor}
                </span>
              </div>
              <h3 className="text-[11px] sm:text-xs font-bold text-foreground line-clamp-2 leading-tight">{title}</h3>
              <p className="text-[9px] text-muted-foreground mt-0.5 line-clamp-1">{sector}</p>
            </div>
            {tag && (
              <span className="rounded-md border border-border/60 bg-muted/70 px-1.5 py-0.5 text-[8px] text-muted-foreground whitespace-nowrap shadow-sm">
                {tag}
              </span>
            )}
          </div>

          {/* Problem */}
          <div className="relative z-10 mb-2 flex-1">
            <h4 className="text-[9px] font-semibold text-foreground mb-0.5">Problem</h4>
            <p className="text-[9px] text-muted-foreground leading-snug line-clamp-2">
              {problem}
            </p>
          </div>

          {/* Outcome Metric */}
          <div className="relative z-10 mb-2 rounded-lg border border-primary/30 bg-primary/10 p-1.5 shadow-inner">
            <div className="flex items-start gap-1.5">
              <TrendingUp className="h-2.5 w-2.5 text-primary mt-0.5 flex-shrink-0" />
              <div className="min-w-0">
                <h4 className="text-[8px] font-semibold text-primary mb-0.5 uppercase tracking-wide">Outcome</h4>
                <p className="text-[9px] text-foreground leading-snug line-clamp-2">
                  {outcome}
                </p>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="relative z-10 flex items-center justify-between pt-2 border-t border-border/50">
            <div className="flex items-center gap-1 text-[9px] text-muted-foreground">
              <Clock className="h-2.5 w-2.5" />
              <span>{timeToDemo}</span>
            </div>
            <span className="inline-flex items-center gap-1 text-[9px] font-medium text-primary/60">
              Click to flip
              <Zap className="h-2.5 w-2.5" />
            </span>
          </div>
        </motion.article>

        {/* Back of Card */}
        <motion.div
          className={cn(
            "absolute inset-0 flex flex-col rounded-xl border bg-gradient-to-br backdrop-blur-sm p-3 transition-all duration-300",
            "hover:shadow-2xl shadow-lg",
            getSectorGradient(sector),
            getGlowColor(sector),
            className
          )}
          style={{ 
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)"
          }}
        >
          {/* 3D Depth Effect */}
          <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-transparent via-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          <div className="relative z-10 h-full flex flex-col">
            {/* Back Header */}
            <div className="flex items-start justify-between gap-1.5 mb-2">
              <h3 className="text-[11px] sm:text-xs font-bold text-foreground line-clamp-2 leading-tight">{title}</h3>
              <button 
                className="text-[9px] text-muted-foreground hover:text-foreground"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsFlipped(false);
                }}
              >
                ✕
              </button>
            </div>

            {/* Key Features */}
            {keyFeatures.length > 0 && (
              <div className="mb-2 flex-1">
                <h4 className="text-[9px] font-semibold text-foreground mb-1 flex items-center gap-1">
                  <CheckCircle2 className="h-2.5 w-2.5 text-primary" />
                  Key Features
                </h4>
                <ul className="space-y-0.5">
                  {keyFeatures.slice(0, 3).map((feature, idx) => (
                    <li key={idx} className="text-[8px] text-muted-foreground leading-snug flex items-start gap-1">
                      <span className="text-primary mt-0.5">•</span>
                      <span className="line-clamp-1">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Technologies */}
            {technologies.length > 0 && (
              <div className="mb-2">
                <h4 className="text-[9px] font-semibold text-foreground mb-1">Tech Stack</h4>
                <div className="flex flex-wrap gap-1">
                  {technologies.slice(0, 4).map((tech, idx) => (
                    <span key={idx} className="rounded-md bg-primary/10 border border-primary/20 px-1.5 py-0.5 text-[7px] text-primary">
                      {tech}
                    </span>
                  ))}
                  {technologies.length > 4 && (
                    <span className="rounded-md bg-muted/50 px-1.5 py-0.5 text-[7px] text-muted-foreground">
                      +{technologies.length - 4}
                    </span>
                  )}
                </div>
              </div>
            )}

            {/* View Full Case Study Button */}
            <Link 
              to={`/case-study/${id}`}
              className="mt-auto w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full flex items-center justify-center gap-1 rounded-lg bg-primary/20 border border-primary/40 px-2 py-1.5 text-[9px] font-medium text-primary hover:bg-primary/30 transition-colors"
              >
                View Full Case Study
                <ExternalLink className="h-2.5 w-2.5" />
              </motion.button>
            </Link>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
