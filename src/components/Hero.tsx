import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Linkedin } from "lucide-react";

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
      className="group flex gap-3 rounded-2xl border border-slate-800/80 bg-slate-950/40 p-3 transition-all duration-300 cursor-default"
      whileHover={{ 
        x: 4,
        borderColor: "hsl(var(--primary) / 0.4)",
        backgroundColor: "hsl(var(--slate-900) / 0.6)"
      }}
    >
      <div className="mt-0.5 w-14 flex-shrink-0 text-xs font-mono uppercase tracking-[0.16em] text-primary group-hover:text-accent transition-colors">
        {label}
      </div>
      <div>
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
      {/* Parallax Background Layer 1 - Slowest */}
      <motion.div 
        className="absolute inset-0 opacity-20"
        style={{ y: yBackground }}
      >
        <motion.div 
          className="absolute top-10 left-10 w-96 h-96 bg-primary/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 50, 0],
            y: [0, 30, 0],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute bottom-20 right-20 w-80 h-80 bg-accent/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            x: [0, -30, 0],
            y: [0, -50, 0],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>

      {/* Parallax Background Layer 2 - Medium Speed */}
      <motion.div 
        className="absolute inset-0 opacity-30"
        style={{ y: yMiddle }}
        animate={{
          background: [
            'radial-gradient(circle at 20% 50%, hsl(var(--primary) / 0.15) 0%, transparent 50%)',
            'radial-gradient(circle at 80% 50%, hsl(var(--accent) / 0.15) 0%, transparent 50%)',
            'radial-gradient(circle at 20% 50%, hsl(var(--primary) / 0.15) 0%, transparent 50%)',
          ],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
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
            className="mt-4 font-itim text-4xl font-semibold tracking-tight md:text-5xl bg-gradient-to-r from-foreground via-primary to-foreground bg-clip-text text-transparent"
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
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ delay: 0.4 }}
              whileHover={{ 
                y: -4, 
                boxShadow: "0 20px 25px -5px hsl(var(--primary) / 0.2)",
                borderColor: "hsl(var(--primary) / 0.5)"
              }}
              className="rounded-2xl border border-slate-800/70 bg-gradient-to-br from-slate-900/70 to-slate-900/40 p-3 transition-all duration-300 cursor-default"
            >
              <dt className="text-xs uppercase tracking-[0.16em] text-slate-400">
                Work hands-on
              </dt>
              <dd className="mt-1 text-sm font-medium text-foreground">
                Build with real tools and ship working prototypes.
              </dd>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ delay: 0.5 }}
              whileHover={{ 
                y: -4, 
                boxShadow: "0 20px 25px -5px hsl(var(--accent) / 0.2)",
                borderColor: "hsl(var(--accent) / 0.5)"
              }}
              className="rounded-2xl border border-slate-800/70 bg-gradient-to-br from-slate-900/70 to-slate-900/40 p-3 transition-all duration-300 cursor-default"
            >
              <dt className="text-xs uppercase tracking-[0.16em] text-slate-400">
                Launch actionable tools
              </dt>
              <dd className="mt-1 text-sm font-medium text-foreground">
                Deploy features users can actually test and use.
              </dd>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ delay: 0.6 }}
              whileHover={{ 
                y: -4, 
                boxShadow: "0 20px 25px -5px hsl(var(--primary) / 0.2)",
                borderColor: "hsl(var(--primary) / 0.5)"
              }}
              className="rounded-2xl border border-slate-800/70 bg-gradient-to-br from-slate-900/70 to-slate-900/40 p-3 transition-all duration-300 cursor-default"
            >
              <dt className="text-xs uppercase tracking-[0.16em] text-slate-400">
                Start small, deliver early
              </dt>
              <dd className="mt-1 text-sm font-medium text-foreground">
                First meaningful code in Week 1, ready to demo.
              </dd>
            </motion.div>
          </dl>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
            <motion.a 
              href="https://scheduler.zoom.us/altruistic-xai" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-primary to-accent px-5 py-2.5 text-sm font-medium text-primary-foreground shadow-lg shadow-primary/30 transition-all duration-300"
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 20px 25px -5px hsl(var(--primary) / 0.4)"
              }}
              whileTap={{ scale: 0.95 }}
            >
              Book a 30-min intro
            </motion.a>
            <motion.a
              href="https://www.linkedin.com/in/ik11"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-5 py-2.5 text-sm font-medium text-primary transition-all duration-300"
              whileHover={{ 
                scale: 1.05,
                backgroundColor: "hsl(var(--primary) / 0.15)",
                borderColor: "hsl(var(--primary) / 0.5)"
              }}
              whileTap={{ scale: 0.95 }}
            >
              <Linkedin size={16} />
              Connect on LinkedIn
            </motion.a>
          </div>
        </motion.div>

        {/* Right: Visual Block (40%) */}
        <motion.div 
          initial={{ opacity: 0, x: 30 }} 
          animate={{ opacity: 1, x: 0 }} 
          transition={{ duration: 0.6, delay: 0.4 }}
          whileHover={{ scale: 1.02 }}
          className="flex-1"
        >
          <div className="rounded-3xl border border-slate-800/80 bg-gradient-to-br from-slate-900/80 to-slate-900/40 p-4 sm:p-5 backdrop-blur-sm shadow-xl hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500 hover:border-primary/30">
            <div className="text-xs font-mono uppercase tracking-[0.16em] text-primary/80">
              Build Fast Kit / 4-week pilot
            </div>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              One senior engineer. One small backlog. 4 weeks to prove whether this pilot is worth scaling.
            </p>
            <div className="mt-4 grid gap-3">
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
        </motion.div>
      </motion.div>
    </section>
  );
}
