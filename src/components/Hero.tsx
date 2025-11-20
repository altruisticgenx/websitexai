import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Play } from "lucide-react";

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });

  // Parallax transforms
  const yForeground = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section ref={ref} id="home" className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#0F172A]">
      {/* Animated Shimmer Background */}
      <div className="absolute inset-0 opacity-30 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/10 to-transparent animate-shimmer" 
             style={{
               backgroundSize: '200% 100%',
               animation: 'shimmer 8s linear infinite'
             }} 
        />
      </div>

      {/* Particle Grid */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute inset-0" 
             style={{
               backgroundImage: 'radial-gradient(circle at center, hsl(var(--primary) / 0.15) 1px, transparent 1px)',
               backgroundSize: '50px 50px'
             }} 
        />
      </div>

      {/* Floating Orbs */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl"
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.5, 0.3, 0.5],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Main Content */}
      <motion.div 
        className="relative z-10 w-full px-4 py-20 mx-auto max-w-7xl"
        style={{ y: yForeground, opacity }}
      >
        <div className="max-w-5xl mx-auto text-center space-y-8">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/5 backdrop-blur-sm px-4 py-2 text-sm text-foreground">
              <span className="inline-flex h-2 w-2 rounded-full bg-primary animate-pulse" />
              <span>Pilot-Ready AI Tech · Weekly Sprints</span>
            </div>
          </motion.div>

          {/* Headline */}
          <motion.h1
            className="text-4xl md:text-6xl font-bold tracking-tight text-foreground leading-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            4-Week AI Pilots for Energy,
            <br />
            <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
              Education & Civic Teams
            </span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Ship working AI prototypes weekly — no hiring slog, no vendor lock-in.
          </motion.p>

          {/* CTAs */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            {/* Primary CTA */}
            <motion.a
              href="https://scheduler.zoom.us/altruistic-xai"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex items-center gap-2 rounded-xl bg-primary px-8 py-4 text-base font-semibold text-primary-foreground overflow-hidden shadow-lg shadow-primary/25 transition-all hover:shadow-xl hover:shadow-primary/40"
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                animate={{ x: ['-200%', '200%'] }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              />
              <span className="relative z-10">Book a Pilot Call</span>
              <ArrowRight className="relative z-10 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </motion.a>

            {/* Secondary CTA */}
            <motion.a
              href="/portfolio"
              className="group inline-flex items-center gap-2 rounded-xl border-2 border-border bg-background/60 backdrop-blur-sm px-8 py-4 text-base font-semibold text-foreground overflow-hidden shadow-lg transition-all hover:border-primary/40 hover:bg-background/80"
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <Play className="h-5 w-5 transition-transform group-hover:scale-110" />
              <span>See Live Experiments</span>
            </motion.a>
          </motion.div>

          {/* Trust Indicators */}
          <motion.div
            className="flex flex-wrap gap-6 justify-center items-center pt-8 text-sm text-muted-foreground"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
          >
            <div className="flex items-center gap-2">
              <svg className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span>Week-to-week, pause anytime</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span>You keep the repo & infra</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span>First slice ships Week 1</span>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Inline Styles for Shimmer Animation */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
      `}} />
    </section>
  );
}
