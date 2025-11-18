import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  lifetime: number;
}

export function MouseParticles() {
  const [particles, setParticles] = useState<Particle[]>([]);
  const particleIdRef = useRef(0);
  const lastPositionRef = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number>();

  useEffect(() => {
    let frameCount = 0;
    
    const handleMouseMove = (e: MouseEvent) => {
      const dx = e.clientX - lastPositionRef.current.x;
      const dy = e.clientY - lastPositionRef.current.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      // Only create particles if mouse is moving
      if (distance > 5) {
        frameCount++;
        
        // Create particles every 2 frames when moving
        if (frameCount % 2 === 0) {
          const colors = [
            'hsl(var(--primary))',
            'hsl(var(--accent))',
            'hsl(var(--secondary))',
          ];
          
          const newParticle: Particle = {
            id: particleIdRef.current++,
            x: e.clientX,
            y: e.clientY,
            size: Math.random() * 8 + 4,
            color: colors[Math.floor(Math.random() * colors.length)],
            lifetime: Date.now(),
          };
          
          setParticles(prev => [...prev, newParticle]);
        }
        
        lastPositionRef.current = { x: e.clientX, y: e.clientY };
      }
    };

    // Clean up old particles
    const cleanupParticles = () => {
      const now = Date.now();
      setParticles(prev => 
        prev.filter(particle => now - particle.lifetime < 1000)
      );
      rafRef.current = requestAnimationFrame(cleanupParticles);
    };

    window.addEventListener('mousemove', handleMouseMove);
    rafRef.current = requestAnimationFrame(cleanupParticles);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      <AnimatePresence>
        {particles.map(particle => (
          <motion.div
            key={particle.id}
            initial={{
              x: particle.x,
              y: particle.y,
              scale: 1,
              opacity: 0.8,
            }}
            animate={{
              x: particle.x + (Math.random() - 0.5) * 40,
              y: particle.y + (Math.random() - 0.5) * 40,
              scale: 0,
              opacity: 0,
            }}
            exit={{
              opacity: 0,
              scale: 0,
            }}
            transition={{
              duration: 1,
              ease: 'easeOut',
            }}
            style={{
              position: 'absolute',
              width: particle.size,
              height: particle.size,
              borderRadius: '50%',
              backgroundColor: particle.color,
              boxShadow: `0 0 ${particle.size * 2}px ${particle.color}, 0 0 ${particle.size}px ${particle.color}`,
              filter: 'blur(1px)',
            }}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}
