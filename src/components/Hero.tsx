import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Linkedin, Mail } from "lucide-react";
import { Hero3DBackground } from "./Hero3D";
import { MouseTrailEffect } from "./hero/MouseTrailEffect";
import { SectorSwitcher } from "./hero/SectorSwitcher";
import { WavyBackground } from "./hero/WavyBackground";

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Parallax transforms
  const yForeground = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  // Lazy loading state for 3D background
  const [shouldRender3D, setShouldRender3D] = useState(false);

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
        rootMargin: "100px",
        threshold: 0.1,
      }
    );
    if (ref.current) {
      observer.observe(ref.current);
    }
    const currentRef = ref.current;
    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [shouldRender3D]);

  return (
    <section ref={ref} id="home" className="relative py-4 md:py-6 overflow-hidden bg-background gradient-mesh">
      {/* Mouse Trail Effect */}
      <MouseTrailEffect containerRef={ref} />

      {/* 3D Animated Background - Lazy Loaded */}
      {shouldRender3D && <Hero3DBackground />}

      {/* Wavy Colorful Background */}
      <WavyBackground />

      {/* Main Content with Parallax */}
      <motion.div
        style={{ y: yForeground, opacity }}
        className="relative z-10 px-4 py-3 mx-auto max-w-4xl"
      >
        <div className="max-w-2xl mx-auto space-y-3">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Tagline with Animated Dot */}
            <motion.div
              className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-3 py-1 text-[10px] font-normal text-muted-foreground"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              role="status"
              aria-label="Current service availability"
            >
              <motion.span
                className="inline-flex h-1.5 w-1.5 rounded-full bg-primary"
                animate={{ opacity: [1, 0.5, 1], scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                aria-hidden="true"
              />
              <span className="font-mono">{">"} Ship pilot-ready AI tech</span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              className="mt-2 text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground tracking-tight leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              Ship a working AI pilot in 2–6 weeks — without hiring.
            </motion.h1>

            {/* Subhead */}
            <motion.p
              className="mt-2 text-xs sm:text-sm text-muted-foreground max-w-xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              Senior AI + product execution for energy, education, and civic teams. First demo in Week 1.
            </motion.p>

            {/* Sector Tag Switcher */}
            <SectorSwitcher />

            {/* CTA Buttons */}
            <motion.div
              className="mt-3 flex flex-col gap-1.5 sm:flex-row sm:items-start"
              style={{ perspective: "1000px" }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <motion.a
                href="https://us06web.zoom.us/launch/chat?src=direct_chat_link&email=altruisticxai@gmail.com"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex w-full sm:w-auto items-center justify-center rounded-full bg-primary px-2.5 py-1 text-[10px] font-bold text-primary-foreground transition-all duration-300 shadow-[0_0_20px_rgba(var(--primary),0.4)] hover:shadow-[0_0_30px_rgba(var(--primary),0.7),0_0_60px_rgba(var(--primary),0.4)] border border-primary/50"
                style={{ transformStyle: "preserve-3d" }}
                whileHover={{
                  scale: 1.05,
                  rotateX: 3,
                  rotateY: -2,
                  y: -2,
                  transition: { duration: 0.2 },
                }}
                whileTap={{ scale: 0.95 }}
              >
                <Mail className="w-2.5 h-2.5 mr-1 group-hover:animate-pulse" />
                Zoom Chat
              </motion.a>
              <motion.a
                href="https://www.linkedin.com/in/ik11/"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex w-full sm:w-auto items-center justify-center rounded-full bg-accent px-2.5 py-1 text-[10px] font-bold text-accent-foreground transition-all duration-300 shadow-[0_0_20px_rgba(var(--accent),0.4)] hover:shadow-[0_0_30px_rgba(var(--accent),0.7),0_0_60px_rgba(var(--accent),0.4)] border border-accent/50"
                style={{ transformStyle: "preserve-3d" }}
                whileHover={{
                  scale: 1.05,
                  rotateX: 3,
                  rotateY: 2,
                  y: -2,
                  transition: { duration: 0.2 },
                }}
                whileTap={{ scale: 0.95 }}
              >
                <Linkedin className="w-2.5 h-2.5 mr-1 group-hover:animate-pulse" />
                LinkedIn
              </motion.a>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
