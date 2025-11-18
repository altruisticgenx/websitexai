import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Ripple {
  id: number;
  x: number;
  y: number;
}

export function ClickRipples() {
  const [ripples, setRipples] = useState<Ripple[]>([]);
  const rippleIdRef = useRef(0);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const newRipple: Ripple = {
        id: rippleIdRef.current++,
        x: e.clientX,
        y: e.clientY,
      };
      
      setRipples(prev => [...prev, newRipple]);
      
      // Remove ripple after animation completes
      setTimeout(() => {
        setRipples(prev => prev.filter(ripple => ripple.id !== newRipple.id));
      }, 1000);
    };

    window.addEventListener('click', handleClick);
    return () => window.removeEventListener('click', handleClick);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-40">
      <AnimatePresence>
        {ripples.map(ripple => (
          <div key={ripple.id} className="absolute" style={{ left: ripple.x, top: ripple.y }}>
            {/* Primary ripple */}
            <motion.div
              initial={{ scale: 0, opacity: 0.8 }}
              animate={{ scale: 3, opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="absolute -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full border-2"
              style={{
                borderColor: 'hsl(var(--primary))',
                boxShadow: '0 0 20px hsl(var(--primary) / 0.5)',
              }}
            />
            
            {/* Secondary ripple */}
            <motion.div
              initial={{ scale: 0, opacity: 0.6 }}
              animate={{ scale: 2.5, opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.7, ease: 'easeOut', delay: 0.1 }}
              className="absolute -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full border-2"
              style={{
                borderColor: 'hsl(var(--accent))',
                boxShadow: '0 0 15px hsl(var(--accent) / 0.4)',
              }}
            />
            
            {/* Tertiary ripple */}
            <motion.div
              initial={{ scale: 0, opacity: 0.4 }}
              animate={{ scale: 2, opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut', delay: 0.2 }}
              className="absolute -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full border"
              style={{
                borderColor: 'hsl(var(--secondary))',
                boxShadow: '0 0 10px hsl(var(--secondary) / 0.3)',
              }}
            />
            
            {/* Center glow */}
            <motion.div
              initial={{ scale: 0, opacity: 0.8 }}
              animate={{ scale: 1.5, opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="absolute -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full"
              style={{
                backgroundColor: 'hsl(var(--primary))',
                boxShadow: '0 0 30px hsl(var(--primary) / 0.8), 0 0 60px hsl(var(--primary) / 0.4)',
                filter: 'blur(4px)',
              }}
            />
          </div>
        ))}
      </AnimatePresence>
    </div>
  );
}
