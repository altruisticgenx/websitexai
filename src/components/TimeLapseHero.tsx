import { useState, useMemo, useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { FileSpreadsheet, Mail, FileText, Layout, Box, Grid3x3, BarChart3, TrendingUp, Sparkles, Play, Pause } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { useSwipeGesture } from "@/hooks/use-swipe-gesture";
import { TimelineSlider } from "./TimelineSlider";
import { Button } from "@/components/ui/button";

export function TimeLapseHero() {
  const [timelinePosition, setTimelinePosition] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const isMobile = useIsMobile();

  // Determine visual state based on timeline position
  const visualState = useMemo(() => {
    if (timelinePosition < 30) return 'chaos';
    if (timelinePosition < 65) return 'wireframe';
    return 'polished';
  }, [timelinePosition]);

  // Auto-play functionality
  useEffect(() => {
    if (!isPlaying || prefersReducedMotion) return;

    const interval = setInterval(() => {
      setTimelinePosition(prev => {
        // Cycle through key milestones: 0 → 35 (Week 1) → 70 (Week 4) → 0
        if (prev < 30) return 35; // Go to Week 1
        if (prev < 65) return 70; // Go to Week 4
        return 0; // Reset to Week 0
      });
    }, 3000); // 3 seconds per state

    return () => clearInterval(interval);
  }, [isPlaying, prefersReducedMotion]);

  // For mobile swipe navigation
  const handleSwipeLeft = () => {
    setIsPlaying(false); // Pause on manual interaction
    setTimelinePosition(prev => Math.min(prev + 35, 100));
  };

  const handleSwipeRight = () => {
    setIsPlaying(false); // Pause on manual interaction
    setTimelinePosition(prev => Math.max(prev - 35, 0));
  };

  const handleManualChange = (newPosition: number) => {
    setIsPlaying(false); // Pause on manual slider interaction
    setTimelinePosition(newPosition);
  };

  const swipeRef = useSwipeGesture<HTMLDivElement>({
    onSwipeLeft: handleSwipeLeft,
    onSwipeRight: handleSwipeRight,
    threshold: 50,
  });

  // Animation props for different states
  const chaosAnimation = prefersReducedMotion ? {} : {
    rotate: [0, -5, 5, -3, 3, 0],
    scale: [1, 1.02, 0.98, 1.01, 0.99, 1],
    transition: { duration: 3, repeat: Infinity, ease: "easeInOut" as const }
  };

  const glowAnimation = prefersReducedMotion ? {} : {
    filter: [
      "drop-shadow(0 0 20px rgba(0, 255, 163, 0.3))",
      "drop-shadow(0 0 30px rgba(0, 255, 163, 0.5))",
      "drop-shadow(0 0 20px rgba(0, 255, 163, 0.3))"
    ],
    transition: { duration: 2, repeat: Infinity }
  };

  return (
    <div className="relative w-full max-w-5xl mx-auto px-4 py-8 sm:py-12">
      {/* Play/Pause Button */}
      <div className="flex justify-end mb-4">
        <Button
          onClick={() => setIsPlaying(!isPlaying)}
          variant="outline"
          size="sm"
          className="gap-2 rounded-full"
          aria-label={isPlaying ? "Pause timeline" : "Play timeline"}
        >
          {isPlaying ? (
            <>
              <Pause className="w-4 h-4" />
              <span className="text-xs">Pause</span>
            </>
          ) : (
            <>
              <Play className="w-4 h-4" />
              <span className="text-xs">Auto-play</span>
            </>
          )}
        </Button>
      </div>

      {/* Visual Canvas */}
      <div
        ref={swipeRef}
        className="relative h-[300px] sm:h-[400px] mb-8 rounded-2xl border border-border bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 overflow-hidden"
      >
        {/* Week 0: Chaos State */}
        {visualState === 'chaos' && (
          <motion.div
            key="chaos"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 flex items-center justify-center p-8"
          >
            {/* Scattered documents */}
            <motion.div animate={chaosAnimation} className="absolute top-12 left-16 opacity-70">
              <FileSpreadsheet className="w-12 h-12 sm:w-16 sm:h-16 text-muted-foreground" style={{ filter: 'blur(1px)' }} />
            </motion.div>
            <motion.div animate={chaosAnimation} className="absolute top-24 right-20 opacity-60" style={{ rotate: '15deg' }}>
              <Mail className="w-10 h-10 sm:w-14 sm:h-14 text-muted-foreground" style={{ filter: 'blur(1px)' }} />
            </motion.div>
            <motion.div animate={chaosAnimation} className="absolute bottom-20 left-24 opacity-75" style={{ rotate: '-12deg' }}>
              <FileText className="w-14 h-14 sm:w-18 sm:h-18 text-muted-foreground" style={{ filter: 'blur(1px)' }} />
            </motion.div>
            <motion.div animate={chaosAnimation} className="absolute bottom-16 right-16 opacity-65" style={{ rotate: '8deg' }}>
              <FileSpreadsheet className="w-10 h-10 sm:w-12 sm:h-12 text-muted-foreground" style={{ filter: 'blur(1px)' }} />
            </motion.div>
            <motion.div animate={chaosAnimation} className="absolute top-32 left-1/2 opacity-50" style={{ rotate: '-20deg' }}>
              <Mail className="w-12 h-12 sm:w-16 sm:h-16 text-muted-foreground" style={{ filter: 'blur(1px)' }} />
            </motion.div>

            {/* Label */}
            <motion.div
              className="absolute bottom-8 left-1/2 -translate-x-1/2 px-4 py-2 rounded-full bg-slate-800/80 backdrop-blur-sm border border-slate-700"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <span className="text-xs sm:text-sm font-mono text-muted-foreground">The Mess</span>
            </motion.div>
          </motion.div>
        )}

        {/* Week 1: Wireframe State */}
        {visualState === 'wireframe' && (
          <motion.div
            key="wireframe"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="absolute inset-0 flex items-center justify-center p-8"
          >
            {/* Grid layout organizing */}
            <div className="grid grid-cols-3 gap-4 sm:gap-6 max-w-md">
              <motion.div
                className="aspect-square rounded-lg border-2 border-primary/30 bg-primary/5 flex items-center justify-center"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 }}
              >
                <Layout className="w-6 h-6 sm:w-8 sm:h-8 text-primary/60" />
              </motion.div>
              <motion.div
                className="aspect-square rounded-lg border-2 border-primary/30 bg-primary/5 flex items-center justify-center"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
              >
                <Box className="w-6 h-6 sm:w-8 sm:h-8 text-primary/60" />
              </motion.div>
              <motion.div
                className="aspect-square rounded-lg border-2 border-primary/30 bg-primary/5 flex items-center justify-center"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 }}
              >
                <Grid3x3 className="w-6 h-6 sm:w-8 sm:h-8 text-primary/60" />
              </motion.div>
              <motion.div
                className="aspect-square rounded-lg border-2 border-primary/30 bg-primary/5 col-span-2"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 }}
              />
              <motion.div
                className="aspect-square rounded-lg border-2 border-primary/30 bg-primary/5"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 }}
              />
            </div>

            {/* Label with checkmark */}
            <motion.div
              className="absolute bottom-8 left-1/2 -translate-x-1/2 px-4 py-2 rounded-full bg-primary/20 backdrop-blur-sm border border-primary/40"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <span className="text-xs sm:text-sm font-mono text-primary">First Demo Shipped ✓</span>
            </motion.div>
          </motion.div>
        )}

        {/* Week 4: Polished State */}
        {visualState === 'polished' && (
          <motion.div
            key="polished"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="absolute inset-0 flex items-center justify-center p-8"
          >
            {/* Polished dashboard */}
            <motion.div
              className="relative max-w-lg w-full"
              animate={glowAnimation}
            >
              <div className="rounded-xl border border-primary/20 bg-gradient-to-br from-primary/10 to-accent/5 p-6 sm:p-8">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <BarChart3 className="w-8 h-8 sm:w-10 sm:h-10 text-primary" />
                    <div className="flex-1">
                      <div className="h-2 bg-primary/30 rounded-full overflow-hidden">
                        <motion.div
                          className="h-full bg-primary rounded-full"
                          initial={{ width: 0 }}
                          animate={{ width: "75%" }}
                          transition={{ duration: 1, delay: 0.3 }}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <TrendingUp className="w-8 h-8 sm:w-10 sm:h-10 text-accent" />
                    <div className="flex-1">
                      <div className="h-2 bg-accent/30 rounded-full overflow-hidden">
                        <motion.div
                          className="h-full bg-accent rounded-full"
                          initial={{ width: 0 }}
                          animate={{ width: "60%" }}
                          transition={{ duration: 1, delay: 0.5 }}
                        />
                      </div>
                    </div>
                  </div>
                  <motion.div
                    className="flex items-center justify-center gap-2 pt-2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.7 }}
                  >
                    <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                    <span className="text-xs sm:text-sm text-primary font-medium">Working Dashboard</span>
                    <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                  </motion.div>
                </div>
              </div>
            </motion.div>

            {/* Label */}
            <motion.div
              className="absolute bottom-8 left-1/2 -translate-x-1/2 px-4 py-2 rounded-full bg-primary/20 backdrop-blur-sm border border-primary/40"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              <span className="text-xs sm:text-sm font-mono text-primary">Pilot Handoff 🚀</span>
            </motion.div>
          </motion.div>
        )}

        {/* Mobile swipe indicator */}
        {isMobile && (
          <motion.div
            className="absolute top-4 right-4 text-xs text-muted-foreground bg-slate-800/60 backdrop-blur-sm px-2 py-1 rounded"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            ← Swipe →
          </motion.div>
        )}
      </div>

      {/* Timeline Slider */}
      <TimelineSlider
        position={timelinePosition}
        onChange={handleManualChange}
      />

      {/* Timeline Labels */}
      <div className="flex justify-between items-center mt-4 px-2 text-xs sm:text-sm text-muted-foreground font-mono">
        <span className={timelinePosition < 30 ? 'text-primary font-semibold' : ''}>Week 0</span>
        <span className={timelinePosition >= 30 && timelinePosition < 65 ? 'text-primary font-semibold' : ''}>Week 1</span>
        <span className={timelinePosition >= 65 ? 'text-primary font-semibold' : ''}>Week 4</span>
      </div>
    </div>
  );
}
