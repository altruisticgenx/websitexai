import React, { useRef } from 'react';
import { motion, useMotionTemplate, useMotionValue, useReducedMotion } from 'framer-motion';

/**
 * SpotlightCard
 * A card with a "GIF-like" living gradient border that follows the mouse.
 * Mobile-first with touch-friendly fallback.
 */

interface SpotlightCardProps {
  children: React.ReactNode;
  className?: string;
}

export const SpotlightCard: React.FC<SpotlightCardProps> = ({ children, className = "" }) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const cardRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  // Handle mouse movement to update spotlight position
  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent<HTMLDivElement>) {
    if (reduceMotion) return;
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  // Background Spotlight (The "Reveal" effect)
  const backgroundStyle = useMotionTemplate`
    radial-gradient(
      650px circle at ${mouseX}px ${mouseY}px,
      rgba(20, 184, 166, 0.15),
      transparent 80%
    )
  `;

  // Border Spotlight (The "Shiny Edge" effect)
  const borderStyle = useMotionTemplate`
    radial-gradient(
      400px circle at ${mouseX}px ${mouseY}px,
      rgba(20, 184, 166, 0.8),
      transparent 80%
    )
  `;

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      className={`group relative w-full rounded-2xl border border-slate-800 bg-slate-900/50 shadow-2xl overflow-hidden ${className}`}
    >
      {/* 1. The Spotlight Border Layer */}
      {!reduceMotion && (
        <motion.div
          className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition duration-300 group-hover:opacity-100"
          style={{ background: borderStyle }}
        />
      )}

      {/* 2. The Content Mask (Keeps the border thin) */}
      <div className="absolute inset-0.5 rounded-xl bg-slate-900/90" />

      {/* 3. The Spotlight Background Layer (Inside the card) */}
      {!reduceMotion && (
        <motion.div
          className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition duration-300 group-hover:opacity-100"
          style={{ background: backgroundStyle }}
        />
      )}

      {/* 4. Content Container */}
      <div className="relative z-10">
        {children}
      </div>

      {/* Optional: Continuous "Pulse" Animation */}
      {!reduceMotion && (
        <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-teal-500/20 rounded-full blur-3xl animate-pulse" />
      )}
    </div>
  );
};
