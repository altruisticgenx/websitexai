import { useState, useEffect } from "react";
import React from "react";
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
  autoPlayInterval = 5000
}: PilotCarousel3DProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const {
    trigger
  } = useHapticFeedback();
  const reduceMotion = useReducedMotion();
  const childrenArray = Array.isArray(children) ? children : [children];
  const totalSlides = childrenArray.length;

  // Detect mobile on mount and resize
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 640);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Helper function to determine which cards should load images
  const shouldLoadImage = (index: number): boolean => {
    // Load current card, adjacent cards (prev/next), and 2 positions ahead for preloading
    const prev = (currentIndex - 1 + totalSlides) % totalSlides;
    const next = (currentIndex + 1) % totalSlides;
    const nextNext = (currentIndex + 2) % totalSlides;
    return index === currentIndex || index === prev || index === next || index === nextNext;
  };

  // Minimum swipe distance (in px) to trigger navigation
  const minSwipeDistance = 50;

  // Auto-play
  useEffect(() => {
    if (autoPlayInterval > 0 && !isPaused) {
      const timer = setInterval(() => {
        handleNext();
      }, autoPlayInterval);
      return () => clearInterval(timer);
    }
  }, [currentIndex, autoPlayInterval, isPaused]);
  const handleNext = () => {
    setDirection(1);
    setCurrentIndex(prev => (prev + 1) % totalSlides);
  };
  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex(prev => (prev - 1 + totalSlides) % totalSlides);
  };

  // Touch event handlers
  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };
  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };
  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    if (isLeftSwipe) {
      trigger('light');
      handleNext();
    } else if (isRightSwipe) {
      trigger('light');
      handlePrev();
    }

    // Reset touch states
    setTouchStart(null);
    setTouchEnd(null);
  };
  const getVisibleIndices = () => {
    const prev = (currentIndex - 1 + totalSlides) % totalSlides;
    const next = (currentIndex + 1) % totalSlides;
    return {
      prev,
      current: currentIndex,
      next
    };
  };
  const {
    prev,
    current,
    next
  } = getVisibleIndices();
  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.5,
      rotateY: direction > 0 ? 45 : -45,
      z: -400
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      rotateY: 0,
      z: 0
    },
    exit: (direction: number) => ({
      x: direction > 0 ? -1000 : 1000,
      opacity: 0,
      scale: 0.5,
      rotateY: direction > 0 ? -45 : 45,
      z: -400
    })
  };
  return <div className="relative w-full mx-auto max-w-6xl px-3 sm:px-4">
      <div className="min-h-[460px] xs:min-h-[480px] sm:min-h-[520px] lg:min-h-[540px] flex items-center justify-center" style={{
      perspective: "2000px"
    }}>
        {/* Carousel Container - Mobile-first with proper overflow */}
        <div className={cn(
          "relative w-full touch-pan-y select-none",
          "h-[460px] xs:h-[480px] sm:h-[520px] lg:h-[540px]",
          isMobile ? "overflow-visible" : "overflow-hidden"
        )} onTouchStart={onTouchStart} onTouchMove={onTouchMove} onTouchEnd={onTouchEnd}>
          <AnimatePresence initial={false} custom={direction} mode="popLayout">
            {/* Current Card (Center) - Mobile-first sizing */}
            <motion.div 
              key={`current-${current}`} 
              className={cn(
                "absolute left-1/2 top-1/2 origin-center",
                "w-[92%] xs:w-[85%] sm:w-[70%] md:w-[60%] lg:w-[50%]",
                "max-w-[340px] xs:max-w-[360px] sm:max-w-[420px]"
              )}
              custom={direction} 
              variants={slideVariants} 
              initial="enter" 
              animate="center" 
              exit="exit" 
              transition={{
                duration: 0.6,
                ease: [0.32, 0.72, 0, 1]
              }} 
              style={{
                x: "-50%",
                y: "-50%",
                transformStyle: "preserve-3d",
                zIndex: 10,
                filter: "drop-shadow(0 20px 40px rgba(0,0,0,0.5))"
              }}
            >
              <div className="transform-gpu h-full">
                {React.cloneElement(childrenArray[current] as React.ReactElement, {
                  shouldLoadImage: shouldLoadImage(current)
                })}
              </div>
            </motion.div>

            {/* Next Card (Right) - Hidden on mobile for clarity */}
            <motion.div 
              key={`next-${next}`} 
              className="absolute right-0 top-1/2 w-[28%] md:w-[25%] origin-center hidden md:block" 
              initial={false} 
              animate={!reduceMotion ? {
                x: "-10%",
                y: "-50%",
                scale: 0.7,
                opacity: 0.3,
                rotateY: -35,
                z: -300
              } : {
                x: "-10%",
                y: "-50%",
                opacity: 0.3
              }} 
              transition={{
                duration: 0.5,
                ease: [0.32, 0.72, 0, 1]
              }} 
              style={{
                transformStyle: "preserve-3d",
                filter: "blur(1.5px) brightness(0.6)"
              }}
            >
              <div className="pointer-events-none shadow-2xl">
                {React.cloneElement(childrenArray[next] as React.ReactElement, {
                  shouldLoadImage: shouldLoadImage(next)
                })}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Navigation Controls - Mobile-first design */}
      <div className="mt-4 flex items-center justify-center gap-2 sm:gap-3">
        {/* Pause/Play Button */}
        <motion.button 
          onClick={() => {
            trigger('light');
            setIsPaused(!isPaused);
          }} 
          whileHover={!isMobile && !reduceMotion ? { scale: 1.08 } : undefined} 
          whileTap={{ scale: 0.92 }} 
          className="group relative rounded-full bg-primary/20 p-2 backdrop-blur-sm border border-primary/50 shadow-lg shadow-primary/30 hover:shadow-primary/50 transition-all duration-300 touch-manipulation" 
          aria-label={isPaused ? "Resume auto-play" : "Pause auto-play"}
        >
          {isPaused ? (
            <Play className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-primary group-hover:text-primary-foreground transition-colors" />
          ) : (
            <Pause className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-primary group-hover:text-primary-foreground transition-colors" />
          )}
          <div className="absolute inset-0 rounded-full bg-primary/0 group-hover:bg-primary/10 transition-all duration-300" />
        </motion.button>

        <motion.button 
          onClick={handlePrev} 
          whileHover={!isMobile && !reduceMotion ? { scale: 1.08, rotate: -3 } : undefined} 
          whileTap={{ scale: 0.92 }} 
          className="group relative rounded-full bg-primary/20 p-2 backdrop-blur-sm border border-primary/50 shadow-lg shadow-primary/30 hover:shadow-primary/50 transition-all duration-300 touch-manipulation" 
          aria-label="Previous project"
        >
          <ChevronLeft className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-primary group-hover:text-primary-foreground transition-colors" />
          <div className="absolute inset-0 rounded-full bg-primary/0 group-hover:bg-primary/10 transition-all duration-300" />
        </motion.button>

        {/* Dots Indicator - Mobile-optimized */}
        <div className="flex gap-1.5 px-2">
          {childrenArray.map((_, index) => (
            <motion.button 
              key={index} 
              onClick={() => {
                setDirection(index > currentIndex ? 1 : -1);
                setCurrentIndex(index);
                trigger('light');
              }} 
              whileHover={{ scale: 1.2 }} 
              whileTap={{ scale: 0.9 }} 
              className={cn(
                "h-1.5 rounded-full transition-all duration-300 touch-manipulation",
                index === currentIndex 
                  ? "w-6 bg-primary shadow-lg shadow-primary/60" 
                  : "w-1.5 bg-primary/40 hover:bg-primary/60"
              )} 
              aria-label={`Go to project ${index + 1}`}
              aria-current={index === currentIndex ? "true" : undefined}
            />
          ))}
        </div>

        <motion.button 
          onClick={handleNext} 
          whileHover={!isMobile && !reduceMotion ? { scale: 1.08, rotate: 3 } : undefined} 
          whileTap={{ scale: 0.92 }} 
          className="group relative rounded-full bg-primary/20 p-2 backdrop-blur-sm border border-primary/50 shadow-lg shadow-primary/30 hover:shadow-primary/50 transition-all duration-300 touch-manipulation" 
          aria-label="Next project"
        >
          <ChevronRight className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-primary group-hover:text-primary-foreground transition-colors" />
          <div className="absolute inset-0 rounded-full bg-primary/0 group-hover:bg-primary/10 transition-all duration-300" />
        </motion.button>
      </div>

      {/* Swipe Indicator - Mobile only */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ delay: 1, duration: 0.5 }} 
        className="mt-3 flex items-center justify-center gap-2 md:hidden"
      >
        <motion.div 
          animate={{ x: [-3, 3, -3] }} 
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }} 
          className="text-primary/60 text-sm"
        >
          ←
        </motion.div>
        <p className="text-center text-[9px] xs:text-[10px] text-muted-foreground/70 font-medium">
          Swipe or tap arrows
        </p>
        <motion.div 
          animate={{ x: [3, -3, 3] }} 
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }} 
          className="text-primary/60 text-sm"
        >
          →
        </motion.div>
      </motion.div>
    </div>;
}