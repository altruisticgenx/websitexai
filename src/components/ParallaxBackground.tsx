import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";
import { GradientMesh } from "./GradientMesh";

interface ParallaxBackgroundProps {
  children?: React.ReactNode;
  speed?: number;
  className?: string;
  gradient?: string;
  meshVariant?: "primary" | "secondary" | "accent" | "mixed";
  meshIntensity?: "subtle" | "medium" | "vibrant";
}

export function ParallaxBackground({
  children,
  speed = 0.5,
  className = "",
  gradient = "from-primary/5 via-accent/5 to-secondary/5",
  meshVariant = "mixed",
  meshIntensity = "medium",
}: ParallaxBackgroundProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Reduce parallax effect on mobile for performance
  const effectiveSpeed = isMobile ? speed * 0.3 : speed;
  
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    [-100 * effectiveSpeed, 100 * effectiveSpeed]
  );

  const opacity = useTransform(
    scrollYProgress,
    [0, 0.3, 0.7, 1],
    [0.3, 1, 1, 0.3]
  );

  return (
    <div ref={ref} className="relative overflow-hidden" style={{ position: 'relative' }}>
      {/* Animated gradient mesh */}
      <GradientMesh variant={meshVariant} intensity={meshIntensity} />
      
      {/* Parallax layer */}
      <motion.div
        style={{ y, opacity }}
        className={`absolute inset-0 -z-10 bg-gradient-to-br ${gradient} ${className}`}
      >
        {children}
      </motion.div>
    </div>
  );
}
