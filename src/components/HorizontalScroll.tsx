import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";

interface HorizontalScrollProps {
  children: React.ReactNode;
  className?: string;
}

export function HorizontalScroll({ children, className = "" }: HorizontalScrollProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Desktop: horizontal scroll tied to vertical scroll
  // Mobile: disabled for better touch scrolling
  const x = useTransform(
    scrollYProgress,
    [0, 1],
    isMobile ? ["0%", "0%"] : ["0%", "-50%"]
  );

  return (
    <div ref={ref} className={`relative ${className}`}>
      <div className="overflow-x-auto overflow-y-hidden scrollbar-thin scrollbar-thumb-primary/20 scrollbar-track-transparent">
        <motion.div
          style={isMobile ? {} : { x }}
          className="flex gap-4 sm:gap-6"
        >
          {children}
        </motion.div>
      </div>
    </div>
  );
}
