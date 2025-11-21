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

  const childrenArray = Array.isArray(children) ? children : [children];
  const totalSlides = childrenArray.length;

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
    <div className="relative w-full" style={{ perspective: "2000px" }}>
      {/* Carousel Container */}
      <div className="relative h-[280px] sm:h-[320px] md:h-[360px] overflow-visible">
        <AnimatePresence initial={false} custom={direction} mode="popLayout">
          {/* Previous Card (Left) */}
          <motion.div
            key={`prev-${prev}`}
            className="absolute left-0 top-1/2 w-[35%] sm:w-[30%] origin-center"
            initial={false}
            animate={{
              x: "10%",
              y: "-50%",
              scale: 0.7,
              opacity: 0.4,
              rotateY: 25,
              z: -200,
            }}
            transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
            style={{
              transformStyle: "preserve-3d",
            }}
          >
            <div className="pointer-events-none blur-[2px]">
              {childrenArray[prev]}
            </div>
          </motion.div>

          {/* Current Card (Center) */}
          <motion.div
            key={`current-${current}`}
            className="absolute left-1/2 top-1/2 w-[75%] sm:w-[65%] md:w-[55%] origin-center"
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
            className="absolute right-0 top-1/2 w-[35%] sm:w-[30%] origin-center"
            initial={false}
            animate={{
              x: "-10%",
              y: "-50%",
              scale: 0.7,
              opacity: 0.4,
              rotateY: -25,
              z: -200,
            }}
            transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
            style={{
              transformStyle: "preserve-3d",
            }}
          >
            <div className="pointer-events-none blur-[2px]">
              {childrenArray[next]}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Buttons */}
      <div className="mt-4 flex items-center justify-center gap-3">
        <motion.button
          onClick={handlePrev}
          whileHover={{ scale: 1.1, rotate: -5 }}
          whileTap={{ scale: 0.9 }}
          className="group relative rounded-full bg-primary/20 p-2 backdrop-blur-sm border border-primary/40 shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all duration-300"
          style={{ transformStyle: "preserve-3d" }}
        >
          <ChevronLeft className="h-4 w-4 text-primary group-hover:text-primary-foreground transition-colors" />
          <div className="absolute inset-0 rounded-full bg-primary/0 group-hover:bg-primary/100 transition-all duration-300 -z-10" />
        </motion.button>

        {/* Dots Indicator */}
        <div className="flex gap-1.5">
          {childrenArray.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setDirection(index > currentIndex ? 1 : -1);
                setCurrentIndex(index);
              }}
              className={cn(
                "h-1.5 rounded-full transition-all duration-300",
                index === currentIndex
                  ? "w-6 bg-primary shadow-lg shadow-primary/50"
                  : "w-1.5 bg-primary/30 hover:bg-primary/50"
              )}
            />
          ))}
        </div>

        <motion.button
          onClick={handleNext}
          whileHover={{ scale: 1.1, rotate: 5 }}
          whileTap={{ scale: 0.9 }}
          className="group relative rounded-full bg-primary/20 p-2 backdrop-blur-sm border border-primary/40 shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all duration-300"
          style={{ transformStyle: "preserve-3d" }}
        >
          <ChevronRight className="h-4 w-4 text-primary group-hover:text-primary-foreground transition-colors" />
          <div className="absolute inset-0 rounded-full bg-primary/0 group-hover:bg-primary/100 transition-all duration-300 -z-10" />
        </motion.button>
      </div>

      {/* Swipe Indicator for Mobile */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="mt-3 text-center text-[9px] text-muted-foreground sm:hidden"
      >
        Swipe or tap arrows to navigate
      </motion.p>
    </div>
  );
}
