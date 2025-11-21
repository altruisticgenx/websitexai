import React, { useMemo, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

export type FeatureItem = {
  title: string;
  desc: string;
  color: "emerald" | "cyan" | "teal" | "blue";
  icon: string;
  example: string;
};

interface FeatureCardWithTooltipProps {
  item: FeatureItem;
  index: number;
}

export const FeatureCardWithTooltip: React.FC<FeatureCardWithTooltipProps> = React.memo(
  ({ item, index }) => {
    const prefersReducedMotion = useReducedMotion();
    const [isTouched, setIsTouched] = useState(false);

    const colorClasses = useMemo(() => {
      switch (item.color) {
        case "emerald":
          return {
            border: "border-emerald-400/40 hover:border-emerald-400/70",
            gradient: "from-emerald-500/20 via-teal-500/10 to-green-500/20",
            shadow: "shadow-emerald-500/20",
            glow: "bg-emerald-500",
          };
        case "cyan":
          return {
            border: "border-cyan-400/40 hover:border-cyan-400/70",
            gradient: "from-cyan-500/20 via-blue-500/10 to-teal-500/20",
            shadow: "shadow-cyan-500/20",
            glow: "bg-cyan-500",
          };
        case "teal":
          return {
            border: "border-teal-400/40 hover:border-teal-400/70",
            gradient: "from-teal-500/20 via-emerald-500/10 to-cyan-500/20",
            shadow: "shadow-teal-500/20",
            glow: "bg-teal-500",
          };
        default:
          return {
            border: "border-blue-400/40 hover:border-blue-400/70",
            gradient: "from-blue-500/20 via-indigo-500/10 to-violet-500/20",
            shadow: "shadow-blue-500/20",
            glow: "bg-blue-500",
          };
      }
    }, [item.color]);

    return (
      <Tooltip open={isTouched ? true : undefined}>
        <TooltipTrigger asChild>
          <motion.button
            type="button"
            initial={{
              opacity: 0,
              scale: 0.95,
            }}
            whileInView={{
              opacity: 1,
              scale: 1,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration: prefersReducedMotion ? 0 : 0.3,
              delay: index * 0.05,
            }}
            whileHover={
              prefersReducedMotion
                ? undefined
                : {
                    y: -8,
                    rotateX: 4,
                    rotateY: -4,
                    scale: 1.03,
                    transition: { 
                      type: "spring",
                      stiffness: 400,
                      damping: 10
                    },
                  }
            }
            whileTap={{ scale: 0.97 }}
            onClick={() => setIsTouched(!isTouched)}
            onMouseEnter={() => setIsTouched(false)}
            style={{
              transformStyle: "preserve-3d",
              perspective: "1200px",
            }}
            className={cn(
              "group relative w-full overflow-hidden rounded-xl border bg-gradient-to-br backdrop-blur-sm p-3 sm:p-3.5 transition-all cursor-pointer",
              "touch-manipulation focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50",
              "hover:shadow-2xl shadow-lg",
              colorClasses.border,
              colorClasses.gradient,
              colorClasses.shadow,
              "before:absolute before:inset-0 before:rounded-xl before:bg-gradient-to-br before:from-white/5 before:to-transparent before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-300",
            )}
            aria-label={`${item.title} – ${item.desc}. Tap to see example.`}
          >
            {/* 3D Depth Effect with enhanced glow */}
            <div 
              className={cn(
                "absolute inset-0 rounded-xl bg-gradient-to-br from-transparent via-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300",
                "group-hover:shadow-[inset_0_0_30px_rgba(var(--primary),0.3)]"
              )} 
            />

            {/* Animated border glow on hover */}
            <div
              className={cn(
                "absolute -inset-[1px] rounded-xl opacity-0 blur-sm transition-opacity duration-300 group-hover:opacity-40 -z-10",
                colorClasses.glow
              )}
            />

            <div className="relative z-10 flex items-start gap-2">
              <span className="text-lg sm:text-xl flex-shrink-0 mt-0.5" aria-hidden="true">
                {item.icon}
              </span>
              <div className="flex-1 min-w-0 text-left">
                <h4 className="mb-1 text-[11px] sm:text-xs font-bold text-foreground leading-tight line-clamp-2">
                  {item.title}
                </h4>
                <p className="text-[9px] sm:text-[10px] leading-snug text-muted-foreground line-clamp-2 sm:line-clamp-3">
                  {item.desc}
                </p>
              </div>
            </div>

            {/* Touch indicator for mobile */}
            <div className="absolute bottom-1.5 right-1.5 text-[8px] text-muted-foreground/50 sm:hidden">
              Tap
            </div>
          </motion.button>
        </TooltipTrigger>
        <TooltipContent
          side="top"
          className="max-w-[280px] sm:max-w-[340px] bg-slate-900/95 backdrop-blur-sm border-primary/30 p-3"
          onPointerDownOutside={(e) => {
            if (isTouched) {
              e.preventDefault();
              setIsTouched(false);
            }
          }}
        >
          <p className="text-[10px] sm:text-xs leading-relaxed text-slate-200">
            <span className="font-semibold text-primary">Real Example:</span> {item.example}
          </p>
        </TooltipContent>
      </Tooltip>
    );
  }
);

FeatureCardWithTooltip.displayName = "FeatureCardWithTooltip";
