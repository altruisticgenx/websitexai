import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Linkedin, Mail } from "lucide-react";
import { Hero3DBackground } from "./Hero3D";

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });

  // Parallax transforms
  const yForeground = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  // Lazy loading state for 3D background
  const [shouldRender3D, setShouldRender3D] = useState(false);

  // Typing animation state
  const fullText = "Local-First AI for Schools & Energy Systems";
  const [displayedText, setDisplayedText] = useState("");
  const [showCursor, setShowCursor] = useState(true);
  
  // Sector switcher state
  const [activeSector, setActiveSector] = useState<"energy" | "education" | null>(null);
  
  // Intersection Observer for lazy loading 3D background
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !shouldRender3D) {
            setShouldRender3D(true);
          }
        });
      },
      {
        rootMargin: '100px',
        threshold: 0.1,
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [shouldRender3D]);

  useEffect(() => {
    let currentIndex = 0;
    const typingSpeed = 80;

    const typingInterval = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setDisplayedText(fullText.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(typingInterval);
      }
    }, typingSpeed);

    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 530);
    
    return () => {
      clearInterval(typingInterval);
      clearInterval(cursorInterval);
    };
  }, []);

  return (
    <section ref={ref} id="home" className="relative py-8 md:py-12 overflow-hidden bg-slate-950 gradient-mesh">
      {/* 3D Animated Background - Lazy Loaded */}
      {shouldRender3D && <Hero3DBackground />}
      
      {/* Matrix Rain Effect - Optimized */}
      <div className="absolute inset-0 opacity-10 pointer-events-none overflow-hidden">
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-px bg-gradient-to-b from-transparent via-emerald-500 to-transparent"
            style={{
              left: `${i * 10}%`,
              height: '200px',
              top: '-200px'
            }}
            animate={{ y: ['0vh', '100vh'] }}
            transition={{
              duration: 4 + Math.random() * 2,
              repeat: Infinity,
              ease: "linear",
              delay: Math.random() * 3
            }}
          />
        ))}
      </div>

      {/* Scanlines */}
      <div className="absolute inset-0 pointer-events-none opacity-5">
        <div 
          className="absolute inset-0 bg-gradient-to-b from-transparent via-emerald-500/20 to-transparent animate-pulse"
          style={{
            backgroundSize: '100% 4px',
            backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, hsl(var(--primary) / 0.1) 2px, hsl(var(--primary) / 0.1) 4px)'
          }}
        />
      </div>

      {/* Main Content with Parallax */}
      <motion.div 
        className="relative z-10 px-4 py-6 mx-auto max-w-7xl organic-spacing"
        style={{ y: yForeground, opacity }}
      >
        <div className="max-w-3xl mx-auto fluid-space">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Tagline with Animated Dot */}
            <motion.div
              className="inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-400/5 px-3 py-1 caption font-mono text-emerald-100 text-reveal"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <motion.span
                className="inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400"
                animate={{ opacity: [1, 0.5, 1], scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <span className="font-mono">{'>'} Ship pilot-ready AI tech</span>
            </motion.div>

            {/* Main Headline with Terminal Typing */}
            <motion.h1
              className="mt-3 heading-1 relative font-mono text-reveal text-reveal-delay-1"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <span className="relative inline-block">
                <span className="relative z-10 bg-gradient-to-r from-emerald-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent">
                  {displayedText}
                  <motion.span
                    className="inline-block w-[0.6em] h-[1em] bg-emerald-400 ml-1"
                    animate={{ opacity: showCursor ? 1 : 0 }}
                    transition={{ duration: 0 }}
                  />
                </span>
                <motion.span
                  className="absolute inset-0 bg-gradient-to-r from-emerald-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent blur-sm"
                  animate={{ opacity: [0.5, 0.8, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  {displayedText}
                </motion.span>
              </span>
            </motion.h1>

            {/* Sector Tag Switcher */}
            <motion.div
              className="mt-3 flex flex-wrap gap-2 items-center caption"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <span className="text-muted-foreground">Focus:</span>
              <motion.button
                className="relative px-3 py-1.5 rounded-lg border-2 border-emerald-400/40 bg-slate-900/60 backdrop-blur-sm text-emerald-100 overflow-hidden group transition-all"
                onMouseEnter={() => setActiveSector("energy")}
                onMouseLeave={() => setActiveSector(null)}
                whileHover={{ scale: 1.05, borderColor: "hsl(var(--primary) / 0.6)" }}
                style={{ transformStyle: "preserve-3d", perspective: "1000px" }}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-emerald-500/0 via-emerald-500/20 to-emerald-500/0"
                  animate={{ x: ['-200%', '200%'] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                />
                <span className="relative z-10 font-mono">Energy</span>
              </motion.button>
              
              <motion.button
                className="relative px-3 py-1.5 rounded-lg border-2 border-cyan-400/40 bg-slate-900/60 backdrop-blur-sm text-cyan-100 overflow-hidden group transition-all"
                onMouseEnter={() => setActiveSector("education")}
                onMouseLeave={() => setActiveSector(null)}
                whileHover={{ scale: 1.05, borderColor: "hsl(200 100% 60% / 0.6)" }}
                style={{ transformStyle: "preserve-3d", perspective: "1000px" }}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-cyan-400/0 via-cyan-400/20 to-cyan-400/0"
                  animate={{ x: ['-200%', '200%'] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                />
                <span className="relative z-10 font-mono">Education</span>
              </motion.button>
            </motion.div>

            {/* Dynamic Sector Description */}
            <motion.div
              className="mt-2 min-h-[60px]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {activeSector === "energy" && (
                <motion.p
                  className="caption text-emerald-300/90 font-mono"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  transition={{ duration: 0.3 }}
                >
                  → Grid optimization · Demand forecasting · Utility analytics
                </motion.p>
              )}
              {activeSector === "education" && (
                <motion.p
                  className="caption text-cyan-300/90 font-mono"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  transition={{ duration: 0.3 }}
                >
                  → Personalized learning · Student privacy · Civic education
                </motion.p>
              )}
              {!activeSector && (
                <motion.p
                  className="max-w-xl body-base text-muted-foreground"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  Privacy-first prototypes that help educators personalize learning and utilities optimize grids—without sending your data to Big Tech clouds.
                </motion.p>
              )}
            </motion.div>

            {/* CTA Buttons - Compact 3D Style */}
            <motion.div
              className="mt-4 flex flex-col gap-2 body-xs sm:flex-row sm:items-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <motion.a
                href="https://scheduler.zoom.us/altruistic-xai"
                target="_blank"
                rel="noopener noreferrer"
                className="relative inline-flex items-center justify-center rounded-lg bg-gradient-to-br from-emerald-500 via-emerald-600 to-cyan-600 px-3 py-1.5 caption font-mono text-slate-950 font-semibold overflow-hidden group shadow-[0_4px_0_0_hsl(var(--primary)/0.5)] active:shadow-[0_2px_0_0_hsl(var(--primary)/0.5)] active:translate-y-[2px] transition-all"
                whileHover={{
                  scale: 1.03,
                  rotateX: -5,
                  rotateY: 5,
                  boxShadow: "0 6px 0 0 hsl(var(--primary) / 0.5), 0 8px 20px -5px hsl(var(--primary) / 0.4)"
                }}
                whileTap={{ scale: 0.97, translateY: 2 }}
                style={{ transformStyle: "preserve-3d", perspective: "1000px" }}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                  animate={{ x: ['-200%', '200%'] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-lg" />
                <span className="relative z-10">Book 30-min call</span>
              </motion.a>
              
              <motion.a
                href="mailto:altruisticxai@gmail.com"
                className="relative inline-flex items-center justify-center gap-1.5 rounded-lg border-2 border-emerald-400/40 bg-slate-900/60 backdrop-blur-sm px-3 py-1.5 caption font-mono text-emerald-100 overflow-hidden group shadow-[0_3px_0_0_hsl(var(--primary)/0.3)] active:shadow-[0_1px_0_0_hsl(var(--primary)/0.3)] active:translate-y-[2px] transition-all"
                whileHover={{
                  scale: 1.03,
                  rotateX: -5,
                  rotateY: -5,
                  borderColor: "hsl(var(--primary) / 0.6)",
                  boxShadow: "0 5px 0 0 hsl(var(--primary) / 0.3), 0 6px 15px -3px hsl(var(--primary) / 0.3)"
                }}
                whileTap={{ scale: 0.97, translateY: 2 }}
                style={{ transformStyle: "preserve-3d", perspective: "1000px" }}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-emerald-500/0 via-emerald-500/20 to-emerald-500/0"
                  animate={{ x: ['-200%', '200%'] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-emerald-500/10 to-transparent rounded-lg" />
                <Mail className="h-2.5 w-2.5 relative z-10" />
                <span className="relative z-10">altruisticxai@gmail.com</span>
              </motion.a>
              
              <motion.a
                href="https://www.linkedin.com/in/ik11/"
                target="_blank"
                rel="noopener noreferrer"
                className="relative inline-flex items-center justify-center gap-1.5 rounded-lg border-2 border-sky-400/40 bg-slate-900/60 backdrop-blur-sm px-3 py-1.5 caption font-mono text-sky-100 overflow-hidden group shadow-[0_3px_0_0_hsl(210_100%_60%/0.3)] active:shadow-[0_1px_0_0_hsl(210_100%_60%/0.3)] active:translate-y-[2px] transition-all"
                whileHover={{
                  scale: 1.03,
                  rotateX: -5,
                  rotateY: -5,
                  borderColor: "hsl(210 100% 60% / 0.6)",
                  boxShadow: "0 5px 0 0 hsl(210 100% 60% / 0.3), 0 6px 15px -3px hsl(210 100% 60% / 0.3)"
                }}
                whileTap={{ scale: 0.97, translateY: 2 }}
                style={{ transformStyle: "preserve-3d", perspective: "1000px" }}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-sky-400/0 via-sky-400/20 to-sky-400/0"
                  animate={{ x: ['-200%', '200%'] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-emerald-500/10 to-transparent rounded-lg" />
                <Linkedin className="h-2.5 w-2.5 relative z-10" />
                <span className="relative z-10">LinkedIn</span>
              </motion.a>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
