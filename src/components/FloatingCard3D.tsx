import { useRef, useState, memo, useCallback } from 'react';
import { motion } from 'framer-motion';

interface FloatingCard3DProps {
  children: React.ReactNode;
  className?: string;
  intensity?: number;
}

export const FloatingCard3D = memo(({ children, className = "", intensity = 10 }: FloatingCard3DProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateXValue = ((y - centerY) / centerY) * -intensity;
    const rotateYValue = ((x - centerX) / centerX) * intensity;
    
    // Use requestAnimationFrame for smoother updates
    requestAnimationFrame(() => {
      setRotateX(rotateXValue);
      setRotateY(rotateYValue);
    });
  }, [intensity]);

  const handleMouseLeave = useCallback(() => {
    setRotateX(0);
    setRotateY(0);
  }, []);

  return (
    <motion.div
      ref={cardRef}
      className={`relative ${className}`}
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
        stiffness: 400,
        damping: 35,
        mass: 0.5,
      }}
    >
      <div style={{ transform: 'translateZ(20px)' }}>
        {children}
      </div>
      
      {/* 3D depth layers */}
      <div 
        className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/5 to-accent/5 -z-10"
        style={{ transform: 'translateZ(-10px)' }}
        aria-hidden="true"
      />
      <div 
        className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/3 to-accent/3 -z-20"
        style={{ transform: 'translateZ(-20px)' }}
        aria-hidden="true"
      />
    </motion.div>
  );
});

FloatingCard3D.displayName = 'FloatingCard3D';
