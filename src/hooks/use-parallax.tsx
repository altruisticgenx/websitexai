import { useRef } from "react";
import { useScroll, useTransform, MotionValue } from "framer-motion";

export function useParallax(distance: number = 200, container?: React.RefObject<HTMLElement>): {
  ref: React.RefObject<HTMLDivElement>;
  y: MotionValue<number>;
} {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
    container,
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [-distance, distance]);
  
  return { ref, y };
}

export function useParallaxSimple(speed: number = 0.5, container?: React.RefObject<HTMLElement>): {
  ref: React.RefObject<HTMLDivElement>;
  y: MotionValue<number>;
} {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
    container,
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [0, -speed * 100]);
  
  return { ref, y };
}
