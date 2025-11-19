import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Linkedin } from "lucide-react";
import { Hero3DBackground } from "./Hero3D";
import { FloatingCard3D } from "./FloatingCard3D";
function VisualRow({
  label,
  title,
  body
}: {
  label: string;
  title: string;
  body: string;
}) {
  return <motion.div className="group flex gap-2 rounded-xl border border-slate-800/80 bg-slate-950/40 p-2 transition-all duration-300 cursor-default" whileHover={{
    x: 4,
    borderColor: "hsl(var(--primary) / 0.4)",
    backgroundColor: "hsl(var(--slate-900) / 0.6)"
  }}>
      <div className="mt-0.5 w-12 flex-shrink-0 text-[9px] font-mono uppercase tracking-[0.16em] text-primary group-hover:text-accent transition-colors sm:text-[10px]">
        {label}
      </div>
      <div>
        <div className="text-[10px] font-medium text-foreground group-hover:text-primary transition-colors sm:text-xs">{title}</div>
        <div className="mt-0.5 text-[9px] text-muted-foreground sm:text-[10px]">{body}</div>
      </div>
    </motion.div>;
}
export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const {
    scrollYProgress
  } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });

  // Parallax transforms - different speeds for depth
  const yBackground = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const yMiddle = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const yForeground = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  return <section ref={ref} id="home" className="relative py-8 md:py-12 overflow-hidden">
      {/* 3D Animated Background */}
      <Hero3DBackground />
      
      {/* Parallax Background Layer 1 - Slowest */}
      <motion.div className="absolute inset-0 opacity-20" style={{
      y: yBackground
    }}>
        <motion.div className="absolute top-10 left-10 w-96 h-96 bg-primary/20 rounded-full blur-3xl" animate={{
        scale: [1, 1.2, 1],
        x: [0, 50, 0],
        y: [0, 30, 0]
      }} transition={{
        duration: 15,
        repeat: Infinity,
        ease: "easeInOut"
      }} />
        <motion.div className="absolute bottom-20 right-20 w-80 h-80 bg-accent/20 rounded-full blur-3xl" animate={{
        scale: [1, 1.3, 1],
        x: [0, -30, 0],
        y: [0, -50, 0]
      }} transition={{
        duration: 12,
        repeat: Infinity,
        ease: "easeInOut"
      }} />
      </motion.div>

      {/* Parallax Background Layer 2 - Medium Speed */}
      <motion.div className="absolute inset-0 opacity-30" style={{
      y: yMiddle
    }} animate={{
      background: ['radial-gradient(circle at 20% 50%, hsl(var(--primary) / 0.15) 0%, transparent 50%)', 'radial-gradient(circle at 80% 50%, hsl(var(--accent) / 0.15) 0%, transparent 50%)', 'radial-gradient(circle at 20% 50%, hsl(var(--primary) / 0.15) 0%, transparent 50%)']
    }} transition={{
      duration: 8,
      repeat: Infinity,
      ease: "linear"
    }} />

      {/* Parallax Floating Particles - Reduced for performance */}
      <motion.div className="absolute inset-0 pointer-events-none" style={{
      y: yForeground,
      opacity
    }}>
        {[...Array(8)].map((_, i) => <motion.div key={i} className="absolute w-2 h-2 bg-primary/40 rounded-full" style={{
        left: `${10 + i * 7}%`,
        top: `${20 + i * 5}%`
      }} animate={{
        y: [0, -30, 0],
        opacity: [0.2, 0.6, 0.2],
        scale: [1, 1.5, 1]
      }} transition={{
        duration: 3 + i * 0.5,
        repeat: Infinity,
        ease: "easeInOut",
        delay: i * 0.2
      }} />)}
      </motion.div>
      
      {/* Content Container with Parallax */}
      <motion.div className="relative z-10 mx-auto max-w-6xl px-3 sm:px-4" style={{
      y: yForeground,
      opacity
    }}>
        <div className="grid gap-6 md:grid-cols-[minmax(0,1.4fr),minmax(0,1fr)] md:items-center">
          {/* Left Column - Main Message */}
          <motion.div initial={{
          opacity: 0,
          x: -30
        }} animate={{
          opacity: 1,
          x: 0
        }} transition={{
          duration: 0.8,
          delay: 0.2
        }}>
            {/* Tag Line */}
            <motion.div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-2.5 py-1 text-[9px] font-medium text-primary sm:text-[10px]" initial={{
            opacity: 0,
            scale: 0.8
          }} animate={{
            opacity: 1,
            scale: 1
          }} transition={{
            duration: 0.5,
            delay: 0.4
          }}>
              <span className="inline-flex h-1.5 w-1.5 rounded-full bg-primary" />
              Ship pilot-ready AI tech
            </motion.div>

            {/* Main Headline */}
            <motion.h1 className="mt-3 text-xl font-semibold tracking-tight sm:text-2xl md:text-3xl" initial={{
            opacity: 0,
            y: 20
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            duration: 0.6,
            delay: 0.5
          }}>
              Build, Learn, Lead—on Your Terms
            </motion.h1>

            {/* Supporting Text */}
            <motion.p className="mt-2.5 max-w-xl text-xs leading-relaxed text-muted-foreground sm:text-sm" initial={{
            opacity: 0,
            y: 20
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            duration: 0.6,
            delay: 0.6
          }}>
              Are you a student, teacher, founder, B2B team, or changemaker in energy, education, or governance?
              Skip the slow hiring process and get senior AI/product execution in focused pilots, shipped week by week.
            </motion.p>

            {/* Feature Pills */}
            <motion.dl className="mt-4 grid max-w-xl grid-cols-1 gap-2 text-[10px] text-slate-200 sm:grid-cols-3 sm:text-xs" initial={{
            opacity: 0
          }} animate={{
            opacity: 1
          }} transition={{
            duration: 0.6,
            delay: 0.7
          }}>
              <motion.div className="group rounded-xl border border-slate-800/70 bg-slate-900/70 p-2 transition-all duration-300 hover:border-primary/30" whileHover={{
              y: -2,
              boxShadow: "0 10px 20px -5px hsl(var(--primary) / 0.2)"
            }}>
                <dt className="text-[9px] uppercase tracking-[0.16em] text-slate-400 group-hover:text-primary transition-colors">
                  Work hands-on
                </dt>
                <dd className="mt-0.5 font-medium text-slate-50 text-[10px] sm:text-xs">
                  Build + ship  prototypes.
                </dd>
              </motion.div>
              <motion.div className="group rounded-xl border border-slate-800/70 bg-slate-900/70 p-2 transition-all duration-300 hover:border-primary/30" whileHover={{
              y: -2,
              boxShadow: "0 10px 20px -5px hsl(var(--primary) / 0.2)"
            }}>
                <dt className="text-[9px] uppercase tracking-[0.16em] text-slate-400 group-hover:text-primary transition-colors">
                  Launch actionable tools
                </dt>
                <dd className="mt-0.5 font-medium text-slate-50 text-[10px] sm:text-xs">
                  Deploy features for any sector.                                                            
                </dd>
              </motion.div>
              <motion.div className="group rounded-xl border border-slate-800/70 bg-slate-900/70 p-2 transition-all duration-300 hover:border-primary/30" whileHover={{
              y: -2,
              boxShadow: "0 10px 20px -5px hsl(var(--primary) / 0.2)"
            }}>
                <dt className="text-[9px] uppercase tracking-[0.16em] text-slate-400 group-hover:text-primary transition-colors">
                  Start small, deliver early
                </dt>
                <dd className="mt-0.5 font-medium text-slate-50 text-[10px] sm:text-xs">
                  First meaningful code in Week 1, ready to demo.
                </dd>
              </motion.div>
            </motion.dl>

            {/* CTA Buttons */}
            <motion.div className="mt-5 flex flex-col gap-2.5 text-xs sm:flex-row sm:items-center" initial={{
            opacity: 0,
            y: 20
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            duration: 0.6,
            delay: 0.8
          }}>
              <motion.a href="mailto:hello@altruisticxai.com?subject=AltruisticX%20AI%20Pilot%20Intro" className="inline-flex items-center justify-center rounded-full bg-primary px-4 py-2 text-xs font-medium text-slate-950 shadow-lg shadow-primary/30 transition-all duration-300 hover:bg-primary/90 hover:shadow-primary/40" whileHover={{
              scale: 1.05
            }} whileTap={{
              scale: 0.98
            }}>
                Book a 30-min intro
              </motion.a>
              <motion.a href="https://www.linkedin.com/in/your-profile" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-1.5 rounded-full border border-slate-700 bg-slate-900/50 px-4 py-2 text-xs font-medium text-slate-200 backdrop-blur-sm transition-all duration-300 hover:border-primary/50 hover:bg-slate-800/50" whileHover={{
              scale: 1.05
            }} whileTap={{
              scale: 0.98
            }}>
                <Linkedin className="h-3 w-3" />
                Connect on LinkedIn
              </motion.a>
            </motion.div>
          </motion.div>

          {/* Right Column - Visual Block */}
          <motion.div initial={{
          opacity: 0,
          x: 30
        }} animate={{
          opacity: 1,
          x: 0
        }} transition={{
          duration: 0.8,
          delay: 0.3
        }}>
            <FloatingCard3D>
              <motion.div className="rounded-2xl border border-slate-800/80 bg-slate-900/60 p-3 sm:p-4 backdrop-blur-sm" whileHover={{
              scale: 1.02,
              boxShadow: "0 20px 25px -5px hsl(var(--primary) / 0.15)"
            }} transition={{
              duration: 0.3
            }}>
                <div className="text-[10px] font-mono text-slate-400 sm:text-xs">
                  Build Fast Kit / 4-week pilot
                </div>
                <p className="mt-1.5 text-xs text-slate-200 sm:text-sm">A 3-person team. One small backlog. 4 weeks to prove whether this pilot is worth scaling.</p>
                <div className="mt-3 grid gap-2 text-xs text-slate-200">
                  <VisualRow label="Week 1" title="Clarify & ship the first slice" body="Turn the idea into 1–2 concrete flows. Ship a working skeleton instead of a slide deck." />
                  <VisualRow label="Week 2–3" title="Tighten the flows" body="Integrate data, refine UX, and make it demo-ready for internal stakeholders." />
                  <VisualRow label="Week 4" title="Decide with evidence" body="You walk away with a working repo, a clear walkthrough, and a decision: scale, pivot, or park." />
                </div>
              </motion.div>
            </FloatingCard3D>
          </motion.div>
        </div>
      </motion.div>
    </section>;
}