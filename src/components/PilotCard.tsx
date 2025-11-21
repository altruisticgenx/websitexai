import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import { Clock, TrendingUp, Users, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { useRef } from "react";

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
  const cardRef = useRef<HTMLElement>(null);
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [6, -6]), {
    stiffness: 350,
    damping: 25,
  });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-6, 6]), {
    stiffness: 350,
    damping: 25,
  });
  
  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const mouseXPos = (e.clientX - centerX) / rect.width;
    const mouseYPos = (e.clientY - centerY) / rect.height;
    mouseX.set(mouseXPos);
    mouseY.set(mouseYPos);
  };
  
  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };
  
  const getSectorStyles = (sector: string) => {
    const styles: Record<string, { gradient: string; border: string; glow: string; accent: string }> = {
      "Education Nonprofit": {
        gradient: "from-blue-500/15 via-indigo-500/10 to-violet-500/15",
        border: "border-blue-400/40 hover:border-blue-400/80",
        glow: "group-hover:shadow-[0_0_40px_-10px_rgba(96,165,250,0.5)]",
        accent: "text-blue-400 bg-blue-400/10 border-blue-400/40",
      },
      "Founder-Backed Startup": {
        gradient: "from-emerald-500/15 via-teal-500/10 to-green-500/15",
        border: "border-emerald-400/40 hover:border-emerald-400/80",
        glow: "group-hover:shadow-[0_0_40px_-10px_rgba(16,185,129,0.5)]",
        accent: "text-emerald-400 bg-emerald-400/10 border-emerald-400/40",
      },
      "Solo Founder": {
        gradient: "from-amber-500/15 via-orange-500/10 to-yellow-500/15",
        border: "border-amber-400/40 hover:border-amber-400/80",
        glow: "group-hover:shadow-[0_0_40px_-10px_rgba(251,191,36,0.5)]",
        accent: "text-amber-400 bg-amber-400/10 border-amber-400/40",
      },
      "Climate & Energy": {
        gradient: "from-lime-500/15 via-green-500/10 to-emerald-500/15",
        border: "border-lime-400/40 hover:border-lime-400/80",
        glow: "group-hover:shadow-[0_0_40px_-10px_rgba(163,230,53,0.5)]",
        accent: "text-lime-400 bg-lime-400/10 border-lime-400/40",
      },
    };
    return styles[sector] || {
      gradient: "from-slate-500/15 via-slate-400/10 to-slate-500/15",
      border: "border-slate-400/40 hover:border-slate-400/80",
      glow: "group-hover:shadow-[0_0_40px_-10px_rgba(148,163,184,0.5)]",
      accent: "text-slate-400 bg-slate-400/10 border-slate-400/40",
    };
  };

  const sectorStyles = getSectorStyles(sector);

  return (
    <Link to={`/case-study/${id}`} className="block group">
      <motion.article
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        whileHover={{ 
          y: -8, 
          scale: 1.03,
          transition: { duration: 0.35, ease: [0.34, 1.56, 0.64, 1] }
        }}
        whileTap={{ scale: 0.98 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        style={{ 
          transformStyle: "preserve-3d",
          perspective: "1500px",
          rotateX,
          rotateY,
        }}
        className={cn(
          "relative flex h-full flex-col rounded-xl border-2 bg-gradient-to-br backdrop-blur-xl p-3 sm:p-4 transition-all duration-500 cursor-pointer overflow-hidden",
          "shadow-lg",
          sectorStyles.gradient,
          sectorStyles.border,
          sectorStyles.glow,
          "before:absolute before:inset-0 before:rounded-xl before:bg-gradient-to-br before:from-white/10 before:via-transparent before:to-white/5 before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-500",
          "after:absolute after:inset-0 after:rounded-xl after:bg-gradient-to-t after:from-black/10 after:via-transparent after:to-transparent after:opacity-0 hover:after:opacity-100 after:transition-opacity after:duration-500",
          className
        )}
      >
        {/* Enhanced 3D depth layers with parallax */}
        <motion.div 
          className="absolute inset-0 rounded-xl bg-gradient-to-br from-transparent via-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{ 
            transform: "translateZ(15px)",
            x: useTransform(mouseX, [-0.5, 0.5], [-10, 10]),
            y: useTransform(mouseY, [-0.5, 0.5], [-10, 10]),
          }} 
        />
        <motion.div 
          className="absolute inset-0 rounded-xl bg-gradient-radial from-primary/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-md pointer-events-none"
          style={{ 
            transform: "translateZ(-10px)",
            x: useTransform(mouseX, [-0.5, 0.5], [6, -6]),
            y: useTransform(mouseY, [-0.5, 0.5], [6, -6]),
          }} 
        />
        
        {/* Shimmer effect */}
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
        
        {/* Header */}
        <div className="relative z-10 flex items-start justify-between gap-2 mb-2">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5 mb-1">
              <span className={cn(
                "inline-flex items-center gap-1 rounded-md border px-1.5 py-0.5 text-[9px] font-bold shadow-sm",
                sectorStyles.accent
              )}>
                <Users className="h-2.5 w-2.5" />
                {whoFor}
              </span>
            </div>
            <h3 className="text-xs sm:text-sm font-bold text-foreground line-clamp-2 leading-tight">
              {title}
            </h3>
            <p className="text-[9px] text-muted-foreground mt-1 line-clamp-1">{sector}</p>
          </div>
          {tag && (
            <span className="rounded-md border border-border/80 bg-muted/90 px-1.5 py-0.5 text-[8px] text-muted-foreground whitespace-nowrap shadow-sm backdrop-blur-sm">
              {tag}
            </span>
          )}
        </div>

        {/* Problem */}
        <div className="relative z-10 mb-2 flex-1">
          <h4 className="text-[9px] font-semibold text-foreground/80 mb-1 uppercase tracking-wider">
            Problem
          </h4>
          <p className="text-[10px] text-muted-foreground leading-relaxed line-clamp-2">
            {problem}
          </p>
        </div>

        {/* Outcome metric - enhanced glassmorphism */}
        <div className="relative z-10 mb-2 rounded-lg border-2 border-primary/30 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent backdrop-blur-sm p-2 shadow-inner">
          <div className="flex items-start gap-1.5">
            <TrendingUp className="h-3 w-3 text-primary mt-0.5 flex-shrink-0" />
            <div className="min-w-0">
              <h4 className="text-[8px] font-bold text-primary mb-1 uppercase tracking-widest">
                Outcome
              </h4>
              <p className="text-[10px] text-foreground/90 leading-snug line-clamp-2 font-medium">
                {outcome}
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="relative z-10 flex items-center justify-between pt-2 border-t border-border/70">
          <div className="flex items-center gap-1 text-[9px] text-muted-foreground">
            <Clock className="h-2.5 w-2.5" />
            <span className="font-medium">{timeToDemo}</span>
          </div>
          <span className="inline-flex items-center gap-1 text-[9px] font-bold text-primary group-hover:gap-1.5 transition-all">
            View
            <ArrowRight className="h-2.5 w-2.5 group-hover:translate-x-0.5 transition-transform" />
          </span>
        </div>
      </motion.article>
    </Link>
  );
}
