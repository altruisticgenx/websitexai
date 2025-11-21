import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { HeroScene } from "./HeroScene";

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });

  // Parallax transforms
  const yForeground = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  // Mobile/reduced motion detection - gate heavy visuals
  const [isMobile, setIsMobile] = useState(false);
  const [shouldRender3D, setShouldRender3D] = useState(false);
  
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Only render 3D on desktop and when user hasn't requested reduced motion
  useEffect(() => {
    if (isMobile || prefersReducedMotion) return;
    
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !shouldRender3D) {
          setShouldRender3D(true);
        }
      });
    }, {
      rootMargin: '100px',
      threshold: 0.1
    });
    if (ref.current) {
      observer.observe(ref.current);
    }
    const currentRef = ref.current;
    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [shouldRender3D, isMobile, prefersReducedMotion]);

  const scrollToRecentBuilds = () => {
    const element = document.getElementById('builds');
    element?.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth' });
  };

  return (
    <section
      ref={ref}
      className="relative min-h-[70vh] flex items-center justify-center overflow-hidden"
      onMouseMove={(e) => {
        // Disable mouse trail on mobile
        if (isMobile) return;
      }}
    >
      {/* 3D Animated Background - Only on desktop with motion enabled */}
      {shouldRender3D && !isMobile && !prefersReducedMotion && <HeroScene />}
      
      {/* Simplified gradient background for mobile or reduced motion */}
      {(isMobile || prefersReducedMotion) && (
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-slate-950 to-accent/10" />
      )}
      
      {/* Wavy Background - Disabled on mobile */}
      {!isMobile && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <svg className="absolute w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="wave-gradient-1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{ stopColor: 'hsl(var(--primary))', stopOpacity: 0.15 }} />
                <stop offset="50%" style={{ stopColor: 'hsl(var(--accent))', stopOpacity: 0.15 }} />
                <stop offset="100%" style={{ stopColor: 'hsl(var(--primary))', stopOpacity: 0.15 }} />
              </linearGradient>
            </defs>
            <motion.path
              d="M0,50 Q250,100 500,50 T1000,50 T1500,50 T2000,50 V200 H0 Z"
              fill="url(#wave-gradient-1)"
              animate={prefersReducedMotion ? undefined : {
                d: [
                  "M0,50 Q250,100 500,50 T1000,50 T1500,50 T2000,50 V200 H0 Z",
                  "M0,80 Q250,30 500,80 T1000,80 T1500,80 T2000,80 V200 H0 Z",
                  "M0,50 Q250,100 500,50 T1000,50 T1500,50 T2000,50 V200 H0 Z"
                ]
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </svg>
        </div>
      )}

      {/* Main Content with Parallax */}
      <motion.div
        style={!isMobile ? { y: yForeground, opacity } : undefined}
        className="relative z-10 px-4 py-8 mx-auto max-w-4xl w-full"
      >
        <div className="max-w-2xl mx-auto space-y-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.8 }}
          >
            {/* Tagline */}
            <motion.div
              className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-3 py-1.5 text-xs font-normal text-muted-foreground"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: prefersReducedMotion ? 0 : 0.5, delay: 0.3 }}
            >
              <motion.span
                className="inline-flex h-1.5 w-1.5 rounded-full bg-primary"
                animate={prefersReducedMotion ? undefined : {
                  opacity: [1, 0.5, 1],
                  scale: [1, 1.2, 1]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity
                }}
                aria-hidden="true"
              />
              <span className="font-mono text-primary/80">Ship pilot-ready AI tech</span>
            </motion.div>

            {/* Main Headline - Speed + Proof Formula */}
            <motion.h1
              className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground tracking-tight leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: prefersReducedMotion ? 0 : 0.6, delay: 0.5 }}
            >
              Ship a demo-ready AI pilot in 4 weeks{" "}
              <span className="text-primary">(without hiring)</span>
            </motion.h1>

            {/* Subhead - Domains + Outcome */}
            <motion.p
              className="mt-4 text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: prefersReducedMotion ? 0 : 0.6, delay: 0.6 }}
            >
              Energy, education, and civic teams use me to turn messy data + stalled plans into working dashboards and automations.
            </motion.p>

            {/* Primary CTA + Secondary CTA */}
            <motion.div
              className="mt-6 flex flex-col sm:flex-row gap-3 justify-center items-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: prefersReducedMotion ? 0 : 0.6, delay: 0.7 }}
            >
              {/* Primary CTA */}
              <a
                href="https://us06web.zoom.us/launch/chat?src=direct_chat_link&email=altruisticxai@gmail.com"
                target="_blank"
                rel="noopener noreferrer"
                className="min-h-[44px] w-full sm:w-auto inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/30 hover:bg-primary/90 transition-all focus-ring interactive"
              >
                Book a 20-min Pilot Fit Call
              </a>

              {/* Secondary CTA */}
              <button
                onClick={scrollToRecentBuilds}
                className="min-h-[44px] w-full sm:w-auto inline-flex items-center justify-center rounded-full border border-border bg-card/50 backdrop-blur-sm px-6 py-3 text-sm font-semibold text-foreground hover:bg-card/80 transition-all focus-ring interactive"
              >
                See 4 Pilots →
              </button>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
