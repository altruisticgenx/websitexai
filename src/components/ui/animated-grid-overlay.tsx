import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface AnimatedGridOverlayProps {
  intensity?: "subtle" | "medium" | "strong";
  showMatrix?: boolean;
}

export function AnimatedGridOverlay({ 
  intensity = "subtle",
  showMatrix = true 
}: AnimatedGridOverlayProps) {
  const [matrixChars, setMatrixChars] = useState<Array<{
    char: string;
    x: number;
    y: number;
    opacity: number;
    delay: number;
  }>>([]);

  // Generate random matrix characters
  useEffect(() => {
    if (!showMatrix) return;
    
    const chars = "01アイウエオカキクケコサシスセソ";
    const columns = Math.floor(window.innerWidth / 60);
    const rows = Math.floor(window.innerHeight / 60);
    
    const newChars = Array.from({ length: Math.min(columns * 2, 20) }, (_, i) => ({
      char: chars[Math.floor(Math.random() * chars.length)],
      x: (i % columns) * 60 + Math.random() * 40,
      y: Math.random() * rows * 60,
      opacity: Math.random() * 0.3 + 0.1,
      delay: Math.random() * 5
    }));
    
    setMatrixChars(newChars);
  }, [showMatrix]);

  const gridOpacity = {
    subtle: 0.03,
    medium: 0.06,
    strong: 0.1
  }[intensity];

  const scanlineOpacity = {
    subtle: 0.02,
    medium: 0.04,
    strong: 0.06
  }[intensity];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Animated Grid */}
      <div 
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(to right, hsl(var(--lime) / ${gridOpacity}) 1px, transparent 1px),
            linear-gradient(to bottom, hsl(var(--lime) / ${gridOpacity}) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
        }}
      >
        <motion.div
          className="absolute inset-0"
          animate={{
            backgroundPosition: ["0px 0px", "40px 40px"],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{
            backgroundImage: `
              linear-gradient(to right, hsl(var(--primary) / ${gridOpacity * 0.5}) 1px, transparent 1px),
              linear-gradient(to bottom, hsl(var(--primary) / ${gridOpacity * 0.5}) 1px, transparent 1px)
            `,
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      {/* Scanning Lines */}
      <motion.div
        className="absolute inset-0"
        animate={{
          backgroundPosition: ["0% 0%", "0% 100%"],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "linear",
        }}
        style={{
          backgroundImage: `repeating-linear-gradient(
            0deg,
            transparent,
            transparent 2px,
            hsl(var(--lime) / ${scanlineOpacity}) 2px,
            hsl(var(--lime) / ${scanlineOpacity}) 4px
          )`,
        }}
      />

      {/* Matrix Characters */}
      {showMatrix && matrixChars.map((char, i) => (
        <motion.div
          key={i}
          className="absolute text-lime font-mono text-xs"
          initial={{ opacity: 0, y: char.y }}
          animate={{
            opacity: [0, char.opacity, 0],
            y: [char.y, char.y + 100],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            delay: char.delay,
            ease: "linear",
          }}
          style={{
            left: `${char.x}px`,
            filter: `blur(${Math.random() * 0.5}px)`,
            textShadow: `0 0 8px hsl(var(--lime) / ${char.opacity})`,
          }}
        >
          {char.char}
        </motion.div>
      ))}

      {/* Radial Gradient Vignette */}
      <div 
        className="absolute inset-0"
        style={{
          background: `radial-gradient(circle at center, transparent 0%, hsl(var(--background) / 0.3) 100%)`,
        }}
      />
    </div>
  );
}
