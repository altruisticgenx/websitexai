import { motion, useReducedMotion } from "framer-motion";
import { ReactNode } from "react";

interface PageTransitionProps {
  children: ReactNode;
  className?: string;
}

export function PageTransition({ children, className = "" }: PageTransitionProps) {
  const prefersReducedMotion = useReducedMotion();

  const variants = {
    initial: {
      opacity: 0,
      y: prefersReducedMotion ? 0 : 20,
      scale: prefersReducedMotion ? 1 : 0.98,
    },
    animate: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: prefersReducedMotion ? 0 : 0.4,
        ease: [0.25, 0.1, 0.25, 1] as const, // Custom easing for smooth feel
      },
    },
    exit: {
      opacity: 0,
      y: prefersReducedMotion ? 0 : -20,
      scale: prefersReducedMotion ? 1 : 0.98,
      transition: {
        duration: prefersReducedMotion ? 0 : 0.3,
        ease: [0.25, 0.1, 0.25, 1] as const,
      },
    },
  };

  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={variants}
      className={className}
    >
      {children}
    </motion.div>
  );
}
