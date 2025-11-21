import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

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

  const childrenArray = Array.isArray(children) ? children : [children];
  const totalSlides = childrenArray.length;

  // Minimum swipe distance (in px) to trigger navigation
  const minSwipeDistance = 50;

  // Auto-play
  useEffect(() => {
    if (autoPlayInterval > 0) {
      const timer = setInterval(() => {
        handleNext();
      }, autoPlayInterval);
      return () => clearInterval(timer);
    }
  }, [currentIndex, autoPlayInterval]);

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % totalSlides);
  };

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
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
      handleNext();
    } else if (isRightSwipe) {
      handlePrev();
    }

    // Reset touch states
    setTouchStart(null);
    setTouchEnd(null);
  };

  const getVisibleIndices = () => {
    const prev = (currentIndex - 1 + totalSlides) % totalSlides;
    const next = (currentIndex + 1) % totalSlides;
    return { prev, current: currentIndex, next };
  };

  const { prev, current, next } = getVisibleIndices();

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.5,
      rotateY: direction > 0 ? 45 : -45,
      z: -400,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      rotateY: 0,
      z: 0,
    },
    exit: (direction: number) => ({
      x: direction > 0 ? -1000 : 1000,
      opacity: 0,
      scale: 0.5,
      rotateY: direction > 0 ? -45 : 45,
      z: -400,
    }),
  };

  return (
    <div className="relative w-full" style={{ perspective: "1500px" }}>
      {/* Carousel Container */}
      <div 
        className="relative h-[240px] sm:h-[260px] md:h-[280px] overflow-visible touch-pan-y select-none"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        <AnimatePresence initial={false} custom={direction} mode="popLayout">
          {/* Previous Card (Left) */}
          <motion.div
            key={`prev-${prev}`}
            className="absolute left-0 top-1/2 w-[28%] sm:w-[25%] origin-center hidden xs:block"
            initial={false}
            animate={{
              x: "5%",
              y: "-50%",
              scale: 0.65,
              opacity: 0.3,
              rotateY: 30,
              z: -250,
            }}
            transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
            style={{
              transformStyle: "preserve-3d",
            }}
          >
            <div className="pointer-events-none blur-[1.5px]">
              {childrenArray[prev]}
            </div>
          </motion.div>

          {/* Current Card (Center) */}
          <motion.div
            key={`current-${current}`}
            className="absolute left-1/2 top-1/2 w-[85%] xs:w-[70%] sm:w-[60%] md:w-[50%] origin-center"
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.6, ease: [0.32, 0.72, 0, 1] }}
            style={{
              x: "-50%",
              y: "-50%",
              transformStyle: "preserve-3d",
              zIndex: 10,
            }}
          >
            {childrenArray[current]}
          </motion.div>

          {/* Next Card (Right) */}
          <motion.div
            key={`next-${next}`}
            className="absolute right-0 top-1/2 w-[28%] sm:w-[25%] origin-center hidden xs:block"
            initial={false}
            animate={{
              x: "-5%",
              y: "-50%",
              scale: 0.65,
              opacity: 0.3,
              rotateY: -30,
              z: -250,
            }}
            transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
            style={{
              transformStyle: "preserve-3d",
            }}
          >
            <div className="pointer-events-none blur-[1.5px]">
              {childrenArray[next]}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Buttons */}
      <div className="mt-3 flex items-center justify-center gap-2">
        <motion.button
          onClick={handlePrev}
          whileHover={{ scale: 1.08, rotate: -3 }}
          whileTap={{ scale: 0.92 }}
          className="group relative rounded-full bg-primary/20 p-1.5 backdrop-blur-sm border border-primary/50 shadow-md shadow-primary/25 hover:shadow-primary/50 transition-all duration-300"
          style={{ transformStyle: "preserve-3d" }}
          aria-label="Previous project"
        >
          <ChevronLeft className="h-3.5 w-3.5 text-primary group-hover:text-primary-foreground transition-colors" />
          <div className="absolute inset-0 rounded-full bg-primary/0 group-hover:bg-primary transition-all duration-300 -z-10" />
        </motion.button>

        {/* Dots Indicator */}
        <div className="flex gap-1">
          {childrenArray.map((_, index) => (
            <motion.button
              key={index}
              onClick={() => {
                setDirection(index > currentIndex ? 1 : -1);
                setCurrentIndex(index);
              }}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              className={cn(
                "h-1 rounded-full transition-all duration-300",
                index === currentIndex
                  ? "w-5 bg-primary shadow-md shadow-primary/60"
                  : "w-1 bg-primary/40 hover:bg-primary/60"
              )}
              aria-label={`Go to project ${index + 1}`}
            />
          ))}
        </div>

        <motion.button
          onClick={handleNext}
          whileHover={{ scale: 1.08, rotate: 3 }}
          whileTap={{ scale: 0.92 }}
          className="group relative rounded-full bg-primary/20 p-1.5 backdrop-blur-sm border border-primary/50 shadow-md shadow-primary/25 hover:shadow-primary/50 transition-all duration-300"
          style={{ transformStyle: "preserve-3d" }}
          aria-label="Next project"
        >
          <ChevronRight className="h-3.5 w-3.5 text-primary group-hover:text-primary-foreground transition-colors" />
          <div className="absolute inset-0 rounded-full bg-primary/0 group-hover:bg-primary transition-all duration-300 -z-10" />
        </motion.button>
      </div>

      {/* Swipe Indicator for Mobile */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="mt-2 flex items-center justify-center gap-1.5"
      >
        <motion.div
          animate={{ x: [-3, 3, -3] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="text-primary/60"
        >
          ←
        </motion.div>
        <p className="text-center text-[8px] text-muted-foreground/70 font-medium">
          Swipe or tap arrows
        </p>
        <motion.div
          animate={{ x: [3, -3, 3] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="text-primary/60"
        >
          →
        </motion.div>
      </motion.div>
    </div>
  );
}
