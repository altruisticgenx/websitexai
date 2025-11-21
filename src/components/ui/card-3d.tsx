import { useRef, useState, memo, useCallback, ReactNode } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface Card3DProps {
  children: ReactNode;
  className?: string;
  intensity?: number;
  enableHover?: boolean;
}

export const Card3D = memo(({ 
  children, 
  className = "", 
  intensity = 8,
  enableHover = true 
}: Card3DProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || !enableHover) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateXValue = ((y - centerY) / centerY) * -intensity;
    const rotateYValue = ((x - centerX) / centerX) * intensity;
    
    requestAnimationFrame(() => {
      setRotateX(rotateXValue);
      setRotateY(rotateYValue);
    });
  }, [intensity, enableHover]);

  const handleMouseLeave = useCallback(() => {
    if (!enableHover) return;
    setRotateX(0);
    setRotateY(0);
  }, [enableHover]);

  return (
    <motion.div
      ref={cardRef}
      className={cn("relative", className)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transformStyle: 'preserve-3d',
        perspective: '1000px',
      }}
      animate={{
        rotateX,
        rotateY,
      }}
      transition={{
        type: 'spring',
        stiffness: 300,
        damping: 30,
        mass: 0.5,
      }}
    >
      <div style={{ transform: 'translateZ(15px)' }} className="relative">
        {children}
      </div>
      
      {/* Subtle 3D depth layers */}
      <div 
        className="absolute inset-0 rounded-xl bg-gradient-to-br from-primary/5 to-accent/5 -z-10 blur-sm"
        style={{ transform: 'translateZ(-5px)' }}
        aria-hidden="true"
      />
      <div 
        className="absolute inset-0 rounded-xl bg-gradient-to-br from-primary/3 to-accent/3 -z-20 blur-md"
        style={{ transform: 'translateZ(-10px)' }}
        aria-hidden="true"
      />
    </motion.div>
  );
});

Card3D.displayName = 'Card3D';
