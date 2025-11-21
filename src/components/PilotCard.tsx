import React, { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { SpotlightCard } from "./SpotlightCard";
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
  shouldLoadImage = true
}: PilotCardProps) {
  const reduce = useReducedMotion();
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reduce) return;
    
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientY - rect.top) / rect.height - 0.5;
    const y = (e.clientX - rect.left) / rect.width - 0.5;
    
    setRotateX(x * 10);
    setRotateY(y * -10);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  return <Link to={`/case-study/${id}`} className="block w-full h-full">
      <SpotlightCard className={cn("h-full flex flex-col", className)}>
        <motion.article 
          initial={{
            opacity: 0,
            y: 12
          }} 
          animate={{
            opacity: 1,
            y: 0,
            rotateX,
            rotateY
          }} 
          transition={{
            duration: reduce ? 0 : 0.35,
            rotateX: { duration: 0.3, ease: "easeOut" },
            rotateY: { duration: 0.3, ease: "easeOut" }
          }}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{
            transformStyle: "preserve-3d",
            perspective: "1000px"
          }}
          className="relative w-full h-full flex flex-col overflow-hidden"
        >
          {/* Image header - Mobile-first sizing */}
          <div className="relative h-32 xs:h-36 sm:h-40 w-full overflow-hidden flex-shrink-0">
            {imageUrl && shouldLoadImage ? (
              <OptimizedImage
                src={imageUrl}
                alt={`${title} preview`}
                className="h-full w-full object-cover"
                aspectRatio="video"
                sizes="(max-width: 475px) 320px, (max-width: 640px) 400px, 500px"
                enableModernFormats={true}
              />
            ) : (
              /* Gradient fallback when no image or not loaded yet */
              <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900" />
            )}
            <div className="pointer-events-none\n    absolute\n    inset-x-0\n    bottom-0\n    h-1/2\n    rounded-2xl\n    bg-gradient-to-t\n    from-slate-950/95\n    via-slate-950/60\n    to-transparent\n    sm:inset-0\n    sm:h-full" />

            {/* Sector pill */}
            <div className="absolute left-2 top-2 rounded-full bg-black/70 backdrop-blur-sm px-2 py-0.5 body-xs text-slate-200 ring-1 ring-white/10 font-medium">
              {sector}
            </div>

            {tag && (
              <div className="absolute right-2 top-2 rounded-full bg-primary/20 backdrop-blur-sm px-2 py-0.5 body-xs text-primary ring-1 ring-primary/30 font-medium">
                {tag}
              </div>
            )}
          </div>

          {/* Body - Mobile-first padding and spacing */}
          <div className="flex flex-col gap-2 p-3 sm:p-4 flex-1">
            <header className="space-y-0.5">
              <h3 className="body-base font-bold leading-tight text-white line-clamp-2">
                {title}
              </h3>
              <p className="body-xs text-slate-400">
                For <span className="text-slate-200 font-medium">{whoFor}</span> · {timeToDemo}
              </p>
            </header>

            <div className="space-y-1.5 flex-1">
              <div className="rounded-lg bg-slate-900/60 backdrop-blur-sm p-2 sm:p-2.5">
                <p className="body-sm text-slate-300 leading-relaxed">
                  <span className="font-semibold text-slate-100">Problem:</span>{" "}
                  {problem}
                </p>
              </div>

              <div className="rounded-lg bg-slate-900/60 backdrop-blur-sm p-2 sm:p-2.5">
                <p className="body-sm text-slate-300 leading-relaxed">
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
                  "body-sm font-semibold text-primary",
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
    </Link>;
}