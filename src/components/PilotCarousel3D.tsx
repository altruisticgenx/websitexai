import React, { useCallback, useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import { cn } from "@/lib/utils";
import { useHapticFeedback } from "@/hooks/use-haptic-feedback";

interface PilotCarousel3DProps {
  children: React.ReactNode[];
  autoPlayInterval?: number;
}

export function PilotCarousel3D({
  children,
  autoPlayInterval = 5000,
}: PilotCarousel3DProps) {
  const reduceMotion = useReducedMotion();
  const { trigger } = useHapticFeedback();

  const childrenArray = useMemo(
    () => (Array.isArray(children) ? children : [children]),
    [children],
  );
  const totalSlides = childrenArray.length;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  // SSR-safe mobile detection
  useEffect(() => {
    const checkMobile = () => {
      if (typeof window === "undefined") return;
      setIsMobile(window.innerWidth < 640);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleNext = useCallback(() => {
    if (totalSlides <= 1) return;
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % totalSlides);
  }, [totalSlides]);

  const handlePrev = useCallback(() => {
    if (totalSlides <= 1) return;
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
  }, [totalSlides]);

  // Auto-play (stable)
  useEffect(() => {
    if (autoPlayInterval > 0 && !isPaused && totalSlides > 1) {
      const timer = setInterval(handleNext, autoPlayInterval);
      return () => clearInterval(timer);
    }
  }, [autoPlayInterval, isPaused, totalSlides, handleNext]);

  // Load images only for visible cards
  const shouldLoadImage = useCallback(
    (index: number) => {
      if (totalSlides <= 1) return true;
      const prev = (currentIndex - 1 + totalSlides) % totalSlides;
      const next = (currentIndex + 1) % totalSlides;
      return index === currentIndex || index === prev || index === next;
    },
    [currentIndex, totalSlides],
  );

  const minSwipeDistance = 50;

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };
  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };
  const onTouchEnd = () => {
    if (touchStart == null || touchEnd == null) return;
    const distance = touchStart - touchEnd;
    if (distance > minSwipeDistance) {
      trigger("light");
      handleNext();
    } else if (distance < -minSwipeDistance) {
      trigger("light");
      handlePrev();
    }
    setTouchStart(null);
    setTouchEnd(null);
  };

  const prev = (currentIndex - 1 + totalSlides) % totalSlides;
  const next = (currentIndex + 1) % totalSlides;

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 900 : -900,
      opacity: 0,
      scale: 0.88,
      rotateY: dir > 0 ? 35 : -35,
      z: -280,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      rotateY: 0,
      z: 0,
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -900 : 900,
      opacity: 0,
      scale: 0.88,
      rotateY: dir > 0 ? -35 : 35,
      z: -280,
    }),
  };

  return (
    <div className="relative w-full mx-auto max-w-5xl px-2 sm:px-4">
      {/* Stage: smaller on mobile */}
      <div
        className="flex items-center justify-center"
        style={{ perspective: "1800px" }}
      >
        <div
          className={cn(
            "relative w-full touch-pan-y select-none",
            // shorter stage
            "h-[380px] xs:h-[400px] sm:h-[460px] lg:h-[500px]",
            isMobile ? "overflow-visible" : "overflow-hidden",
          )}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          <AnimatePresence initial={false} custom={direction} mode="popLayout">
            {/* PREV card (left) */}
            {!isMobile && totalSlides > 1 && (
              <motion.div
                key={`prev-${prev}`}
                className="absolute left-0 top-1/2 w-[26%] md:w-[24%] origin-center hidden md:block"
                initial={false}
                animate={
                  !reduceMotion
                    ? {
                        x: "10%",
                        y: "-50%",
                        scale: 0.68,
                        opacity: 0.28,
                        rotateY: 35,
                        z: -260,
                      }
                    : { x: "10%", y: "-50%", opacity: 0.25 }
                }
                transition={{ duration: 0.45, ease: [0.32, 0.72, 0, 1] }}
                style={{
                  transformStyle: "preserve-3d",
                  filter: "blur(1.5px) brightness(0.6)",
                }}
              >
                <div className="pointer-events-none">
                  <div className="rounded-2xl overflow-hidden bg-slate-950 shadow-2xl">
                    {React.cloneElement(
                      childrenArray[prev] as React.ReactElement,
                      { shouldLoadImage: shouldLoadImage(prev) },
                    )}
                  </div>
                </div>
              </motion.div>
            )}

            {/* CURRENT card (center) */}
            <motion.div
              key={`current-${currentIndex}`}
              className={cn(
                "absolute left-1/2 top-1/2 origin-center",
                // smaller widths
                "w-[90%] xs:w-[84%] sm:w-[70%] md:w-[60%] lg:w-[52%]",
                // smaller max widths
                "max-w-[320px] xs:max-w-[340px] sm:max-w-[380px] md:max-w-[420px]",
              )}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                duration: reduceMotion ? 0 : 0.55,
                ease: [0.32, 0.72, 0, 1],
              }}
              style={{
                x: "-50%",
                y: "-50%",
                transformStyle: "preserve-3d",
                zIndex: 10,
                filter: "drop-shadow(0 18px 36px rgba(0,0,0,0.55))",
              }}
            >
              <div className="transform-gpu">
                <div className="rounded-2xl overflow-hidden bg-slate-950 shadow-2xl">
                  {React.cloneElement(
                    childrenArray[currentIndex] as React.ReactElement,
                    { shouldLoadImage: shouldLoadImage(currentIndex) },
                  )}
                </div>
              </div>
            </motion.div>

            {/* NEXT card (right) */}
            {!isMobile && totalSlides > 1 && (
              <motion.div
                key={`next-${next}`}
                className="absolute right-0 top-1/2 w-[26%] md:w-[24%] origin-center hidden md:block"
                initial={false}
                animate={
                  !reduceMotion
                    ? {
                        x: "-10%",
                        y: "-50%",
                        scale: 0.68,
                        opacity: 0.28,
                        rotateY: -35,
                        z: -260,
                      }
                    : { x: "-10%", y: "-50%", opacity: 0.25 }
                }
                transition={{ duration: 0.45, ease: [0.32, 0.72, 0, 1] }}
                style={{
                  transformStyle: "preserve-3d",
                  filter: "blur(1.5px) brightness(0.6)",
                }}
              >
                <div className="pointer-events-none">
                  <div className="rounded-2xl overflow-hidden bg-slate-950 shadow-2xl">
                    {React.cloneElement(
                      childrenArray[next] as React.ReactElement,
                      { shouldLoadImage: shouldLoadImage(next) },
                    )}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Controls */}
      <div className="mt-3 flex items-center justify-center gap-2 sm:gap-3">
        {/* Pause / Play */}
        <motion.button
          onClick={() => {
            trigger("light");
            setIsPaused((p) => !p);
          }}
          whileHover={!isMobile && !reduceMotion ? { scale: 1.06 } : undefined}
          whileTap={{ scale: 0.92 }}
          className="group relative rounded-full bg-primary/15 p-2 border border-primary/40 shadow-md shadow-primary/20 hover:shadow-primary/40 transition touch-manipulation"
          aria-label={isPaused ? "Resume auto-play" : "Pause auto-play"}
        >
          {isPaused ? (
            <Play className="h-3.5 w-3.5 text-primary" />
          ) : (
            <Pause className="h-3.5 w-3.5 text-primary" />
          )}
        </motion.button>

        <motion.button
          onClick={() => {
            trigger("light");
            handlePrev();
          }}
          whileHover={!isMobile && !reduceMotion ? { scale: 1.06 } : undefined}
          whileTap={{ scale: 0.92 }}
          className="group relative rounded-full bg-primary/15 p-2 border border-primary/40 shadow-md shadow-primary/20 hover:shadow-primary/40 transition touch-manipulation"
          aria-label="Previous project"
        >
          <ChevronLeft className="h-3.5 w-3.5 text-primary" />
        </motion.button>

        {/* Dots */}
        <div className="flex gap-1.5 px-1">
          {childrenArray.map((_, index) => (
            <motion.button
              key={index}
              onClick={() => {
                setDirection(index > currentIndex ? 1 : -1);
                setCurrentIndex(index);
                trigger("light");
              }}
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.9 }}
              className={cn(
                "h-1.5 rounded-full transition-all duration-300 touch-manipulation",
                index === currentIndex
                  ? "w-5 bg-primary shadow-sm shadow-primary/60"
                  : "w-1.5 bg-primary/40 hover:bg-primary/70",
              )}
              aria-label={`Go to project ${index + 1}`}
              aria-current={index === currentIndex ? "true" : undefined}
            />
          ))}
        </div>

        <motion.button
          onClick={() => {
            trigger("light");
            handleNext();
          }}
          whileHover={!isMobile && !reduceMotion ? { scale: 1.06 } : undefined}
          whileTap={{ scale: 0.92 }}
          className="group relative rounded-full bg-primary/15 p-2 border border-primary/40 shadow-md shadow-primary/20 hover:shadow-primary/40 transition touch-manipulation"
          aria-label="Next project"
        >
          <ChevronRight className="h-3.5 w-3.5 text-primary" />
        </motion.button>
      </div>

      {/* Mobile swipe hint */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.4 }}
        className="mt-2 flex items-center justify-center gap-2 md:hidden text-[10px] text-muted-foreground/70"
      >
        <span className="text-primary/60">←</span>
        Swipe or tap arrows
        <span className="text-primary/60">→</span>
      </motion.div>
    </div>
  );
}