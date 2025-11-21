import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Clock, TrendingUp, Users, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { LazyImage } from "./LazyImage";
import { generatePlaceholderDataUrl } from "@/utils/imageOptimization";

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
      "Education Nonprofit": "from-blue-600/25 via-indigo-500/15 to-violet-600/25 border-blue-500/60 hover:border-blue-400/90",
      "Founder-Backed Startup": "from-emerald-600/25 via-teal-500/15 to-green-600/25 border-emerald-500/60 hover:border-emerald-400/90",
      "Solo Founder": "from-amber-600/25 via-orange-500/15 to-yellow-600/25 border-amber-500/60 hover:border-amber-400/90",
      "Climate & Energy": "from-lime-600/25 via-green-500/15 to-emerald-600/25 border-lime-500/60 hover:border-lime-400/90",
    };
    return gradients[sector] || "from-slate-700/25 via-slate-600/15 to-slate-500/25 border-slate-400/60 hover:border-slate-300/90";
  };

  // Get glow color for 3D effect
  const getGlowColor = (sector: string) => {
    const glows: Record<string, string> = {
      "Education Nonprofit": "shadow-blue-500/30 hover:shadow-blue-400/50",
      "Founder-Backed Startup": "shadow-emerald-500/30 hover:shadow-emerald-400/50",
      "Solo Founder": "shadow-amber-500/30 hover:shadow-amber-400/50",
      "Climate & Energy": "shadow-lime-500/30 hover:shadow-lime-400/50",
    };
    return glows[sector] || "shadow-slate-500/30 hover:shadow-slate-400/50";
  };

  // Get accent color based on sector
  const getSectorAccent = (sector: string) => {
    const accents: Record<string, string> = {
      "Education Nonprofit": "text-blue-400 border-blue-500/50 bg-blue-500/20",
      "Founder-Backed Startup": "text-emerald-400 border-emerald-500/50 bg-emerald-500/20",
      "Solo Founder": "text-amber-400 border-amber-500/50 bg-amber-500/20",
      "Climate & Energy": "text-lime-400 border-lime-500/50 bg-lime-500/20",
    };
    return accents[sector] || "text-slate-400 border-slate-500/50 bg-slate-500/20";
  };

  return (
    <Link to={`/case-study/${id}`} className="block group">
      <motion.article
        whileHover={{ 
          y: -8, 
          rotateX: 2,
          rotateY: -2,
          scale: 1.02,
          transition: { duration: 0.3, ease: [0.34, 1.56, 0.64, 1] }
        }}
        whileTap={{ scale: 0.98 }}
        transition={{ duration: 0.3 }}
        style={{ 
          transformStyle: "preserve-3d",
          perspective: "1500px"
        }}
        className={cn(
          "relative flex h-full flex-col overflow-hidden rounded-xl sm:rounded-2xl border-2 backdrop-blur-md transition-all duration-500 cursor-pointer",
          "shadow-[0_8px_30px_rgba(0,0,0,0.3)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.5)]",
          getSectorGradient(sector),
          getGlowColor(sector),
          className
        )}
      >
        {/* Image Background with Overlay */}
        {imageUrl && (
          <div className="absolute inset-0 z-0">
            <LazyImage
              src={imageUrl}
              srcSet={`${imageUrl}?w=400 400w, ${imageUrl}?w=800 800w, ${imageUrl}?w=1200 1200w`}
              sizes="(max-width: 640px) 400px, (max-width: 1024px) 800px, 1200px"
              alt=""
              placeholderSrc={generatePlaceholderDataUrl(20, 20, '#0f172a')}
              className="h-full w-full object-cover opacity-20 group-hover:opacity-30 transition-opacity duration-500"
              aspectRatio="wide"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
          </div>
        )}
        
        {/* Floating gradient orbs for depth */}
        <div className="absolute top-0 right-0 w-20 sm:w-32 h-20 sm:h-32 bg-primary/15 sm:bg-primary/20 rounded-full blur-2xl sm:blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" style={{ transform: "translateZ(15px)" }} />
        <div className="absolute bottom-0 left-0 w-16 sm:w-24 h-16 sm:h-24 bg-accent/15 sm:bg-accent/20 rounded-full blur-xl sm:blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" style={{ transform: "translateZ(10px)" }} />
        
        {/* Content Container */}
        <div className="relative z-10 flex h-full flex-col p-2.5 sm:p-3 bg-gradient-to-br from-background/50 via-background/65 to-background/85 group-hover:from-background/40 group-hover:via-background/55 group-hover:to-background/75 transition-all duration-500">
          
        {/* Header */}
        <div className="flex items-start justify-between gap-1.5 mb-1.5 sm:mb-2">
          <div className="flex-1 min-w-0">
            <span className={cn(
              "inline-flex items-center gap-0.5 rounded-full border px-1.5 py-0.5 text-[8px] font-bold shadow-md mb-1 backdrop-blur-sm",
              getSectorAccent(sector)
            )}>
              <Users className="h-2 w-2" />
              {whoFor}
            </span>
            <h3 className="text-[10px] sm:text-[11px] font-bold text-foreground line-clamp-2 leading-tight mb-0.5">{title}</h3>
            <p className="text-[8px] text-muted-foreground/70 font-medium">{sector}</p>
          </div>
          {tag && (
            <span className={cn(
              "rounded-full border px-1.5 py-0.5 text-[7px] font-bold whitespace-nowrap shadow-md backdrop-blur-sm",
              getSectorAccent(sector)
            )}>
              {tag}
            </span>
          )}
        </div>

        {/* Challenge */}
        <div className="mb-1.5 flex-1">
          <h4 className="text-[8px] font-bold text-foreground/60 mb-0.5 uppercase tracking-wide">Challenge</h4>
          <p className="text-[9px] text-foreground/85 leading-snug line-clamp-2 font-medium">
            {problem}
          </p>
        </div>

        {/* Result - Highlighted with sector color */}
        <div className={cn(
          "mb-1.5 rounded-lg sm:rounded-xl border-2 bg-gradient-to-br p-1.5 shadow-lg backdrop-blur-sm transition-all duration-300",
          getSectorAccent(sector).replace('text-', 'border-').replace('/20', '/40').replace('/50', '/60'),
          "group-hover:border-opacity-90"
        )} style={{ transform: "translateZ(8px)" }}>
          <div className="flex items-start gap-1.5">
            <div className={cn(
              "rounded-lg p-0.5 shadow-md",
              getSectorAccent(sector).replace('text-', 'bg-').replace('/20', '/40')
            )}>
              <TrendingUp className={cn("h-2.5 w-2.5", getSectorAccent(sector).split(' ')[0])} />
            </div>
            <div className="min-w-0 flex-1">
              <h4 className={cn("text-[8px] font-bold mb-0.5 uppercase tracking-wide", getSectorAccent(sector).split(' ')[0])}>Result</h4>
              <p className="text-[9px] text-foreground font-bold leading-tight line-clamp-2">
                {outcome}
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-1.5 border-t border-border/30">
          <div className="flex items-center gap-1 text-[8px] text-muted-foreground font-bold">
            <Clock className="h-2.5 w-2.5" />
            <span>{timeToDemo}</span>
          </div>
          <span className="inline-flex items-center gap-0.5 text-[8px] font-bold text-primary group-hover:gap-1 transition-all">
            View
            <ArrowRight className="h-2.5 w-2.5 group-hover:translate-x-0.5 transition-transform" />
          </span>
        </div>
        
        </div>
      </motion.article>
    </Link>
  );
}
