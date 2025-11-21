import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";

interface GradientMeshProps {
  variant?: "primary" | "secondary" | "accent" | "mixed";
  intensity?: "subtle" | "medium" | "vibrant";
  className?: string;
}

export function GradientMesh({
  variant = "mixed",
  intensity = "medium",
  className = "",
}: GradientMeshProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Intensity multipliers
  const intensityMap = {
    subtle: 0.08,
    medium: 0.15,
    vibrant: 0.25,
  };
  const alpha = intensityMap[intensity];

  // Color shift based on scroll progress
  const hue1 = useTransform(scrollYProgress, [0, 0.5, 1], [220, 280, 340]);
  const hue2 = useTransform(scrollYProgress, [0, 0.5, 1], [180, 240, 300]);
  const hue3 = useTransform(scrollYProgress, [0, 0.5, 1], [160, 200, 260]);
  const hue4 = useTransform(scrollYProgress, [0, 0.5, 1], [140, 180, 220]);

  // Rotation animation
  const rotate = useTransform(scrollYProgress, [0, 1], [0, isMobile ? 45 : 90]);

  // Scale pulsing
  const scale = useTransform(
    scrollYProgress,
    [0, 0.25, 0.5, 0.75, 1],
    [1, 1.1, 1, 1.15, 1]
  );

  const getVariantColors = () => {
    switch (variant) {
      case "primary":
        return {
          color1: "hsl(var(--primary))",
          color2: "hsl(var(--primary))",
          color3: "hsl(var(--accent))",
          color4: "hsl(var(--primary))",
        };
      case "secondary":
        return {
          color1: "hsl(var(--secondary))",
          color2: "hsl(var(--secondary))",
          color3: "hsl(var(--primary))",
          color4: "hsl(var(--secondary))",
        };
      case "accent":
        return {
          color1: "hsl(var(--accent))",
          color2: "hsl(var(--accent))",
          color3: "hsl(var(--primary))",
          color4: "hsl(var(--accent))",
        };
      default:
        return null;
    }
  };

  const variantColors = getVariantColors();

  return (
    <div
      ref={ref}
      className={`relative absolute inset-0 -z-10 overflow-hidden ${className}`}
      aria-hidden="true"
    >
      <motion.div
        className="absolute inset-0"
        style={{
          rotate,
          scale,
        }}
      >
        {/* Mesh gradient layers with scroll-based color shifting */}
        {variantColors ? (
          <>
            {/* Fixed color mesh for variants */}
            <div
              className="absolute inset-0 opacity-80"
              style={{
                background: `
                  radial-gradient(at 20% 30%, ${variantColors.color1} 0px, transparent 50%),
                  radial-gradient(at 80% 20%, ${variantColors.color2} 0px, transparent 50%),
                  radial-gradient(at 60% 80%, ${variantColors.color3} 0px, transparent 50%),
                  radial-gradient(at 30% 70%, ${variantColors.color4} 0px, transparent 50%)
                `,
                filter: "blur(60px)",
                opacity: alpha,
              }}
            />
          </>
        ) : (
          <>
            {/* Dynamic color shifting mesh for mixed variant */}
            <motion.div
              className="absolute top-[10%] left-[15%] h-[60%] w-[60%] rounded-full"
              style={{
                background: useTransform(
                  hue1,
                  (h) => `radial-gradient(circle, hsl(${h} 70% 60% / ${alpha}) 0%, transparent 70%)`
                ),
                filter: "blur(80px)",
              }}
            />
            <motion.div
              className="absolute top-[20%] right-[10%] h-[50%] w-[50%] rounded-full"
              style={{
                background: useTransform(
                  hue2,
                  (h) => `radial-gradient(circle, hsl(${h} 75% 55% / ${alpha}) 0%, transparent 70%)`
                ),
                filter: "blur(70px)",
              }}
            />
            <motion.div
              className="absolute bottom-[15%] left-[20%] h-[55%] w-[55%] rounded-full"
              style={{
                background: useTransform(
                  hue3,
                  (h) => `radial-gradient(circle, hsl(${h} 65% 58% / ${alpha}) 0%, transparent 70%)`
                ),
                filter: "blur(90px)",
              }}
            />
            <motion.div
              className="absolute bottom-[20%] right-[15%] h-[45%] w-[45%] rounded-full"
              style={{
                background: useTransform(
                  hue4,
                  (h) => `radial-gradient(circle, hsl(${h} 80% 52% / ${alpha}) 0%, transparent 70%)`
                ),
                filter: "blur(75px)",
              }}
            />
          </>
        )}

        {/* Overlay texture for depth */}
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `
              repeating-linear-gradient(
                0deg,
                transparent,
                transparent 2px,
                hsl(var(--primary) / 0.02) 2px,
                hsl(var(--primary) / 0.02) 4px
              ),
              repeating-linear-gradient(
                90deg,
                transparent,
                transparent 2px,
                hsl(var(--accent) / 0.02) 2px,
                hsl(var(--accent) / 0.02) 4px
              )
            `,
          }}
        />
      </motion.div>
    </div>
  );
}
