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
          rotateX: 4,
          rotateY: -3,
          scale: 1.05,
          transition: { duration: 0.4, ease: [0.34, 1.56, 0.64, 1] }
        }}
        whileTap={{ scale: 0.96 }}
        transition={{ duration: 0.3 }}
        style={{ 
          transformStyle: "preserve-3d",
          perspective: "1200px"
        }}
        className={cn(
          "relative flex h-full flex-col overflow-hidden rounded-2xl border-2 backdrop-blur-md transition-all duration-500 cursor-pointer",
          "hover:shadow-[0_20px_50px_rgba(0,0,0,0.4)]",
          getSectorGradient(sector),
          getGlowColor(sector),
          className
        )}
      >
        {/* Image Background with Overlay */}
        {imageUrl && (
          <div className="absolute inset-0 z-0">
            <img 
              src={imageUrl} 
              alt=""
              className="h-full w-full object-cover opacity-20 group-hover:opacity-30 transition-opacity duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
          </div>
        )}
        
        {/* Floating gradient orbs for depth */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" style={{ transform: "translateZ(20px)" }} />
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-accent/20 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" style={{ transform: "translateZ(15px)" }} />
        
        {/* Content Container */}
        <div className="relative z-10 flex h-full flex-col p-3 bg-gradient-to-br from-background/40 via-background/60 to-background/80 group-hover:from-background/30 group-hover:via-background/50 group-hover:to-background/70 transition-all duration-500">
          
        {/* Header */}
        <div className="flex items-start justify-between gap-1.5 mb-2">
          <div className="flex-1 min-w-0">
            <span className="inline-flex items-center gap-0.5 rounded-full border border-primary/50 bg-primary/20 px-2 py-0.5 text-[9px] font-semibold text-primary shadow-md mb-1.5 backdrop-blur-sm">
              <Users className="h-2.5 w-2.5" />
              {whoFor}
            </span>
            <h3 className="text-xs sm:text-sm font-bold text-foreground line-clamp-2 leading-tight mb-1">{title}</h3>
            <p className="text-[9px] text-muted-foreground/80">{sector}</p>
          </div>
          {tag && (
            <span className="rounded-full border border-accent/50 bg-accent/20 px-2 py-0.5 text-[8px] font-medium text-accent whitespace-nowrap shadow-md backdrop-blur-sm">
              {tag}
            </span>
          )}
        </div>

        {/* Challenge */}
        <div className="mb-2 flex-1">
          <h4 className="text-[9px] font-bold text-foreground/70 mb-1 uppercase tracking-wider">Challenge</h4>
          <p className="text-[10px] text-foreground/90 leading-relaxed line-clamp-2">
            {problem}
          </p>
        </div>

        {/* Result - Highlighted */}
        <div className="mb-2 rounded-xl border-2 border-primary/40 bg-gradient-to-br from-primary/25 via-primary/15 to-transparent p-2 shadow-lg backdrop-blur-sm group-hover:border-primary/60 transition-all duration-300" style={{ transform: "translateZ(10px)" }}>
          <div className="flex items-start gap-2">
            <div className="rounded-lg bg-primary/30 p-1 shadow-md">
              <TrendingUp className="h-3 w-3 text-primary" />
            </div>
            <div className="min-w-0 flex-1">
              <h4 className="text-[9px] font-bold text-primary mb-1 uppercase tracking-wide">Result</h4>
              <p className="text-[10px] text-foreground font-medium leading-snug line-clamp-2">
                {outcome}
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-2 border-t border-border/30">
          <div className="flex items-center gap-1.5 text-[9px] text-muted-foreground font-medium">
            <Clock className="h-3 w-3" />
            <span>{timeToDemo}</span>
          </div>
          <span className="inline-flex items-center gap-1 text-[10px] font-bold text-primary group-hover:gap-2 transition-all">
            View
            <ArrowRight className="h-3 w-3 group-hover:translate-x-0.5 transition-transform" />
          </span>
        </div>
        
        </div>
      </motion.article>
    </Link>
  );
}
