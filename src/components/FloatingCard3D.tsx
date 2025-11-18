import { useRef, useState } from 'react';
import { motion } from 'framer-motion';

interface FloatingCard3DProps {
  children: React.ReactNode;
  className?: string;
}

export function FloatingCard3D({ children, className = "" }: FloatingCard3DProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateXValue = ((y - centerY) / centerY) * -10;
    const rotateYValue = ((x - centerX) / centerX) * 10;
    
    setRotateX(rotateXValue);
    setRotateY(rotateYValue);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

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
        stiffness: 300,
        damping: 30,
      }}
    >
      <div
        style={{
          transform: 'translateZ(20px)',
        }}
      >
        {children}
      </div>
      
      {/* 3D depth layers */}
      <div 
        className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/5 to-accent/5 -z-10"
        style={{ transform: 'translateZ(-10px)' }}
      />
      <div 
        className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/3 to-accent/3 -z-20"
        style={{ transform: 'translateZ(-20px)' }}
      />
    </motion.div>
  );
}
