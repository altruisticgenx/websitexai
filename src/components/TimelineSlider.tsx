import { useRef, useState, useCallback, useEffect } from "react";
import { motion } from "framer-motion";
import { useHapticFeedback } from "@/hooks/use-haptic-feedback";
import { useIsMobile } from "@/hooks/use-mobile";

interface TimelineSliderProps {
  position: number; // 0-100
  onChange: (position: number) => void;
}

export function TimelineSlider({ position, onChange }: TimelineSliderProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const { trigger } = useHapticFeedback();
  const isMobile = useIsMobile();

  const updatePosition = useCallback((clientX: number) => {
    if (!trackRef.current) return;

    const rect = trackRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const newPosition = Math.max(0, Math.min(100, (x / rect.width) * 100));
    
    onChange(newPosition);

    // Trigger haptic feedback at key milestones
    if (
      (newPosition >= 28 && newPosition <= 32) || // Week 1
      (newPosition >= 63 && newPosition <= 67)    // Week 4
    ) {
      trigger('medium');
    }
  }, [onChange, trigger]);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    updatePosition(e.clientX);
    trigger('light');
  };

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (isDragging) {
      updatePosition(e.clientX);
    }
  }, [isDragging, updatePosition]);

  const handleMouseUp = useCallback(() => {
    if (isDragging) {
      setIsDragging(false);
      trigger('light');
    }
  }, [isDragging, trigger]);

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    updatePosition(e.touches[0].clientX);
    trigger('light');
  };

  const handleTouchMove = useCallback((e: TouchEvent) => {
    if (isDragging) {
      updatePosition(e.touches[0].clientX);
    }
  }, [isDragging, updatePosition]);

  const handleTouchEnd = useCallback(() => {
    if (isDragging) {
      setIsDragging(false);
      trigger('light');
    }
  }, [isDragging, trigger]);

  // Global event listeners for drag
  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      window.addEventListener('touchmove', handleTouchMove);
      window.addEventListener('touchend', handleTouchEnd);

      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', handleMouseUp);
        window.removeEventListener('touchmove', handleTouchMove);
        window.removeEventListener('touchend', handleTouchEnd);
      };
    }
  }, [isDragging, handleMouseMove, handleMouseUp, handleTouchMove, handleTouchEnd]);

  return (
    <div className="relative">
      {/* Track */}
      <div
        ref={trackRef}
        className="relative h-2 bg-slate-800 rounded-full cursor-pointer overflow-hidden"
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
        role="slider"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={position}
        aria-label="Timeline slider"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'ArrowLeft') {
            onChange(Math.max(0, position - 5));
            trigger('light');
          } else if (e.key === 'ArrowRight') {
            onChange(Math.min(100, position + 5));
            trigger('light');
          }
        }}
      >
        {/* Progress bar */}
        <motion.div
          className="absolute top-0 left-0 h-full bg-gradient-to-r from-primary via-accent to-primary rounded-full"
          style={{ width: `${position}%` }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        />

        {/* Milestone markers */}
        <div className="absolute top-0 left-[30%] w-0.5 h-full bg-slate-600 opacity-50" />
        <div className="absolute top-0 left-[65%] w-0.5 h-full bg-slate-600 opacity-50" />
      </div>

      {/* Draggable Handle */}
      <motion.div
        className={`absolute top-1/2 -translate-y-1/2 w-6 h-6 sm:w-8 sm:h-8 rounded-full border-2 border-primary bg-slate-900 shadow-lg cursor-grab ${
          isDragging ? 'cursor-grabbing scale-110' : ''
        }`}
        style={{ left: `${position}%`, x: '-50%' }}
        animate={{
          scale: isDragging ? 1.2 : 1,
          boxShadow: isDragging
            ? '0 0 20px rgba(0, 255, 163, 0.6)'
            : '0 4px 10px rgba(0, 0, 0, 0.3)',
        }}
        transition={{ type: "spring", stiffness: 400, damping: 20 }}
      >
        {/* Handle grip lines */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-3 h-0.5 bg-primary rounded-full" />
        </div>
      </motion.div>

      {/* Touch target expansion for mobile */}
      {isMobile && (
        <div
          className="absolute inset-0 -top-4 -bottom-4"
          onTouchStart={handleTouchStart}
        />
      )}
    </div>
  );
}
