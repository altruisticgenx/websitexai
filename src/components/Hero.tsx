import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Linkedin } from "lucide-react";
import { Hero3DBackground } from "./Hero3D";
import { ControlRoomOverlay } from "./ui/control-room-overlay";
import { FloatingCard3D } from "./FloatingCard3D";

function VisualRow({
  label,
  title,
  body,
}: {
  label: string;
  title: string;
  body: string;
}) {
  return (
    <motion.div 
      className="card-3d card-3d-border group flex gap-3 rounded-2xl p-4 transition-all duration-500 cursor-default perspective-1000"
      whileHover={{ 
        scale: 1.02,
        rotateY: 2,
        rotateX: -2,
        transition: { duration: 0.3 }
      }}
      initial={{ opacity: 0, y: 20, rotateX: -10 }}
      animate={{ opacity: 1, y: 0, rotateX: 0 }}
      transition={{ duration: 0.6 }}
      style={{
        transformStyle: 'preserve-3d',
      }}
    >
      <div className="mt-0.5 w-14 flex-shrink-0 text-xs font-mono uppercase tracking-[0.16em] text-primary group-hover:text-accent transition-colors">
        {label}
      </div>
      <div style={{ transform: 'translateZ(10px)' }}>
        <div className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">{title}</div>
        <div className="mt-1 text-xs text-muted-foreground">{body}</div>
      </div>
    </motion.div>
  );
}

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });

  // Parallax transforms - different speeds for depth
  const yBackground = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const yMiddle = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const yForeground = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section ref={ref} id="home" className="relative py-10 md:py-16 overflow-hidden">
      {/* Control Room Grid Overlay */}
      <ControlRoomOverlay intensity="medium" />
      
      {/* 3D Animated Background */}
      <Hero3DBackground />
      
      {/* Parallax Background Layer 1 - Slowest */}
      <motion.div 
        className="absolute inset-0 opacity-20"
        style={{ y: yBackground }}
      >
        <motion.div 
          className="absolute top-10 left-10 w-72 h-72 md:w-96 md:h-96 bg-primary/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 50, 0],
            y: [0, 30, 0],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute bottom-20 right-20 w-64 h-64 md:w-80 md:h-80 bg-lime/30 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            x: [0, -30, 0],
            y: [0, -50, 0],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute top-1/2 left-1/2 w-56 h-56 md:w-72 md:h-72 bg-lime/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"
          animate={{
            scale: [1, 1.4, 1],
            opacity: [0.2, 0.35, 0.2],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>

      {/* Parallax Background Layer 2 - Medium Speed */}
      <motion.div 
        className="absolute inset-0 opacity-30"
        style={{ y: yMiddle }}
        animate={{
          background: [
            'radial-gradient(circle at 20% 50%, hsl(var(--primary) / 0.15) 0%, transparent 50%)',
            'radial-gradient(circle at 50% 50%, hsl(var(--lime) / 0.2) 0%, transparent 50%)',
            'radial-gradient(circle at 80% 50%, hsl(var(--accent) / 0.15) 0%, transparent 50%)',
            'radial-gradient(circle at 50% 50%, hsl(var(--lime) / 0.2) 0%, transparent 50%)',
            'radial-gradient(circle at 20% 50%, hsl(var(--primary) / 0.15) 0%, transparent 50%)',
          ],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
      />

      {/* Parallax Floating Particles */}
      <motion.div 
        className="absolute inset-0 pointer-events-none"
        style={{ y: yForeground, opacity }}
      >
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-primary/40 rounded-full"
            style={{
              left: `${10 + (i * 7)}%`,
              top: `${20 + (i * 5)}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.6, 0.2],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 3 + i * 0.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.2,
            }}
          />
        ))}
      </motion.div>
      
      <motion.div 
        className="relative mx-auto flex w-full max-w-5xl flex-col items-center gap-10 px-4 md:flex-row md:px-6"
        style={{ opacity }}
      >
        {/* Left: Text Content (60%) */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }} 
          animate={{ opacity: 1, x: 0 }} 
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex-1"
        >
          <motion.div 
            className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-gradient-to-r from-primary/10 to-accent/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-primary shadow-lg shadow-primary/20"
            whileHover={{ scale: 1.05, boxShadow: "0 20px 25px -5px hsl(var(--primary) / 0.3)" }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            <span className="inline-flex h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
            Ship pilot-ready AI tech
          </motion.div>

          <motion.h1 
            className="mt-4 heading-display text-3xl md:text-4xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            Build, Learn, Lead—on Your Terms
          </motion.h1>

          <p className="mt-4 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
            Are you a student, teacher, founder, B2B team, or changemaker in energy, education, or governance? 
            Skip the slow hiring process and unlock <span className="text-primary font-medium">senior AI/product execution</span>—in focused pilots, shipped week by week.
          </p>

          <dl className="mt-6 grid max-w-xl grid-cols-1 gap-4 sm:grid-cols-3">
            <motion.div 
              initial={{ opacity: 0, y: 20, rotateX: -10 }} 
              animate={{ opacity: 1, y: 0, rotateX: 0 }} 
              transition={{ delay: 0.4, duration: 0.6 }}
              whileHover={{ 
                y: -6,
                rotateX: 3,
                rotateY: -3,
                scale: 1.03,
                boxShadow: "0 0 25px hsl(var(--lime) / 0.4), 0 20px 25px -5px hsl(var(--primary) / 0.3)",
              }}
              className="card-3d card-3d-border rounded-2xl p-4 transition-all duration-500 cursor-default"
              style={{ transformStyle: 'preserve-3d' }}
            >
              <dt className="text-xs uppercase tracking-[0.16em] text-slate-400">
                Work hands-on
              </dt>
              <dd className="mt-1 text-sm font-medium text-foreground" style={{ transform: 'translateZ(10px)' }}>
                Build with real tools and ship working prototypes.
              </dd>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, y: 20, rotateX: -10 }} 
              animate={{ opacity: 1, y: 0, rotateX: 0 }} 
              transition={{ delay: 0.5, duration: 0.6 }}
              whileHover={{ 
                y: -6,
                rotateX: 3,
                rotateY: -3,
                scale: 1.03,
                boxShadow: "0 0 25px hsl(var(--lime) / 0.4), 0 20px 25px -5px hsl(var(--accent) / 0.3)",
              }}
              className="card-3d card-3d-border rounded-2xl p-4 transition-all duration-500 cursor-default"
              style={{ transformStyle: 'preserve-3d' }}
            >
              <dt className="text-xs uppercase tracking-[0.16em] text-slate-400">
                Launch actionable tools
              </dt>
              <dd className="mt-1 text-sm font-medium text-foreground" style={{ transform: 'translateZ(10px)' }}>
                Deploy features users can actually test and use.
              </dd>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, y: 20, rotateX: -10 }} 
              animate={{ opacity: 1, y: 0, rotateX: 0 }} 
              transition={{ delay: 0.6, duration: 0.6 }}
              whileHover={{ 
                y: -6,
                rotateX: 3,
                rotateY: -3,
                scale: 1.03,
                boxShadow: "0 0 25px hsl(var(--lime) / 0.4), 0 20px 25px -5px hsl(var(--primary) / 0.3)",
              }}
              className="card-3d card-3d-border rounded-2xl p-4 transition-all duration-500 cursor-default"
              style={{ transformStyle: 'preserve-3d' }}
            >
              <dt className="text-xs uppercase tracking-[0.16em] text-slate-400">
                Start small, deliver early
              </dt>
              <dd className="mt-1 text-sm font-medium text-foreground" style={{ transform: 'translateZ(10px)' }}>
                First meaningful code in Week 1, ready to demo.
              </dd>
            </motion.div>
          </dl>

          <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:items-center">
            <motion.a 
              href="https://scheduler.zoom.us/altruistic-xai" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-lg bg-gradient-to-r from-primary to-accent px-3 py-1.5 text-xs font-medium text-primary-foreground shadow-glow transition-all duration-300"
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 0 30px hsl(var(--lime) / 0.6), 0 20px 25px -5px hsl(var(--primary) / 0.4)"
              }}
              whileTap={{ scale: 0.95 }}
            >
              Book 30-min intro
            </motion.a>
            <motion.a
              href="https://www.linkedin.com/in/ik11"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-primary/30 bg-primary/5 px-3 py-1.5 text-xs font-medium text-primary transition-all duration-300"
              whileHover={{ 
                scale: 1.05,
                backgroundColor: "hsl(var(--primary) / 0.15)",
                borderColor: "hsl(var(--lime) / 0.6)",
                boxShadow: "0 0 20px hsl(var(--lime) / 0.4)"
              }}
              whileTap={{ scale: 0.95 }}
            >
              <Linkedin size={14} />
              LinkedIn
            </motion.a>
          </div>
        </motion.div>

        {/* Right: Visual Block (40%) */}
        <motion.div 
          initial={{ opacity: 0, x: 30 }} 
          animate={{ opacity: 1, x: 0 }} 
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex-1"
        >
          <FloatingCard3D>
            <div className="card-3d card-3d-border rounded-3xl p-5 sm:p-6 backdrop-blur-sm shadow-elevated transition-all duration-500" style={{ transformStyle: 'preserve-3d' }}>
              <div className="text-xs font-mono uppercase tracking-[0.16em] text-primary/80" style={{ transform: 'translateZ(20px)' }}>
                Build Fast Kit / 4-week pilot
              </div>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground" style={{ transform: 'translateZ(15px)' }}>
                One senior engineer. One small backlog. 4 weeks to prove whether this pilot is worth scaling.
              </p>
              <div className="mt-4 grid gap-3" style={{ transform: 'translateZ(10px)' }}>
                <VisualRow 
                  label="Week 1" 
                  title="Clarify & ship the first slice" 
                  body="Turn the idea into 1–2 concrete flows. Ship a working skeleton instead of a deck." 
                />
                <VisualRow 
                  label="Week 2–3" 
                  title="Tighten the flows" 
                  body="Integrate data, refine UX, and make it demo-able to internal stakeholders." 
                />
                <VisualRow 
                  label="Week 4" 
                  title="Decide with evidence" 
                  body="You walk away with a working repo, a clear walkthrough, and a decision: scale, pivot, or park." 
                />
              </div>
            </div>
          </FloatingCard3D>
        </motion.div>
      </motion.div>
    </section>
  );
}
