import { useState, useCallback, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

interface Ripple {
  id: number;
  x: number;
  y: number;
  size: number;
}

interface TouchRippleProps {
  className?: string;
  color?: string;
  duration?: number;
}

export const TouchRipple = memo(({ 
  className,
  color = 'rgba(255, 255, 255, 0.5)',
  duration = 600 
}: TouchRippleProps) => {
  const [ripples, setRipples] = useState<Ripple[]>([]);

  const addRipple = useCallback((event: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
    const target = event.currentTarget;
    const rect = target.getBoundingClientRect();
    
    let x: number, y: number;
    
    if ('touches' in event && event.touches.length > 0) {
      x = event.touches[0].clientX - rect.left;
      y = event.touches[0].clientY - rect.top;
    } else if ('clientX' in event) {
      x = event.clientX - rect.left;
      y = event.clientY - rect.top;
    } else {
      return;
    }

    const size = Math.max(rect.width, rect.height);
    const ripple: Ripple = {
      id: Date.now(),
      x,
      y,
      size
    };

    setRipples(prev => [...prev, ripple]);
    
    setTimeout(() => {
      setRipples(prev => prev.filter(r => r.id !== ripple.id));
    }, duration);
  }, [duration]);

  return (
    <div 
      className={cn("absolute inset-0 overflow-hidden pointer-events-none rounded-inherit", className)}
      onMouseDown={addRipple}
      onTouchStart={addRipple}
    >
      <AnimatePresence>
        {ripples.map(ripple => (
          <motion.span
            key={ripple.id}
            className="absolute rounded-full"
            style={{
              left: ripple.x,
              top: ripple.y,
              width: ripple.size,
              height: ripple.size,
              backgroundColor: color,
              transform: 'translate(-50%, -50%)'
            }}
            initial={{ scale: 0, opacity: 0.5 }}
            animate={{ scale: 2, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: duration / 1000, ease: 'easeOut' }}
          />
        ))}
      </AnimatePresence>
    </div>
  );
});

TouchRipple.displayName = 'TouchRipple';
