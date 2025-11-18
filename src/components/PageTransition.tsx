import { motion, AnimatePresence } from "framer-motion";
import { ReactNode } from "react";

interface PageTransitionProps {
  children: ReactNode;
  delay?: number;
}

export function PageTransition({ children, delay = 0 }: PageTransitionProps) {
  return (
    <motion.div
      initial={{ 
        opacity: 0,
        rotateX: -15,
        z: -200,
        scale: 0.95
      }}
      animate={{ 
        opacity: 1,
        rotateX: 0,
        z: 0,
        scale: 1
      }}
      exit={{ 
        opacity: 0,
        rotateX: 15,
        z: -200,
        scale: 0.95
      }}
      transition={{
        duration: 0.6,
        delay,
        ease: [0.25, 0.46, 0.45, 0.94]
      }}
      style={{
        transformStyle: 'preserve-3d',
        perspective: '1200px',
      }}
    >
      {children}
    </motion.div>
  );
}

export function SectionTransition({ children, delay = 0 }: PageTransitionProps) {
  return (
    <motion.div
      initial={{ 
        opacity: 0,
        y: 60,
        rotateX: 10,
        scale: 0.97
      }}
      whileInView={{ 
        opacity: 1,
        y: 0,
        rotateX: 0,
        scale: 1
      }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{
        duration: 0.7,
        delay,
        ease: [0.25, 0.46, 0.45, 0.94]
      }}
      style={{
        transformStyle: 'preserve-3d',
      }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerContainer({ children, staggerDelay = 0.1 }: { children: ReactNode, staggerDelay?: number }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={{
        visible: {
          transition: {
            staggerChildren: staggerDelay,
          },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({ children, index = 0 }: { children: ReactNode, index?: number }) {
  return (
    <motion.div
      variants={{
        hidden: { 
          opacity: 0, 
          y: 40,
          rotateY: -15,
          scale: 0.9
        },
        visible: { 
          opacity: 1, 
          y: 0,
          rotateY: 0,
          scale: 1,
          transition: {
            duration: 0.5,
            ease: [0.25, 0.46, 0.45, 0.94]
          }
        },
      }}
      style={{
        transformStyle: 'preserve-3d',
      }}
    >
      {children}
    </motion.div>
  );
}
