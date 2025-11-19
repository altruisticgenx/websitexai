import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Linkedin, Mail } from "lucide-react";
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
  return <motion.div className="group relative flex gap-2 rounded-xl border border-emerald-500/20 bg-slate-950/60 p-2 cursor-default overflow-hidden backdrop-blur-sm" whileHover={{
    x: 4,
    borderColor: "hsl(var(--primary) / 0.5)",
    backgroundColor: "hsl(var(--slate-900) / 0.8)",
    boxShadow: "0 0 20px hsl(var(--primary) / 0.2)"
  }} transition={{
    duration: 0.2
  }}>
    <motion.div className="absolute inset-0 bg-gradient-to-r from-emerald-500/0 via-emerald-500/5 to-emerald-500/0" animate={{
      x: ['-100%', '100%']
    }} transition={{
      duration: 3,
      repeat: Infinity,
      ease: "linear"
    }} />
    <div className="mt-0.5 w-11 flex-shrink-0 label text-emerald-400 group-hover:text-cyan-400 transition-colors font-mono relative z-10">
      {label}
    </div>
    <div className="relative z-10">
      <div className="body-sm font-medium text-slate-200 group-hover:text-emerald-300 transition-colors font-mono">
        <span className="text-emerald-500">{'>'}</span> {title}
      </div>
      <div className="mt-0.5 caption text-slate-400">{body}</div>
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

  // Typing animation state
  const fullText = "Build, Learn, Lead—on Your Terms";
  const [displayedText, setDisplayedText] = useState("");
  const [showCursor, setShowCursor] = useState(true);
  useEffect(() => {
    let currentIndex = 0;
    const typingSpeed = 80; // milliseconds per character

    const typingInterval = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setDisplayedText(fullText.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(typingInterval);
      }
    }, typingSpeed);

    // Cursor blink effect
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 530);
    return () => {
      clearInterval(typingInterval);
      clearInterval(cursorInterval);
    };
  }, []);
  return <section ref={ref} id="home" className="relative py-8 md:py-12 overflow-hidden bg-slate-950">
      {/* 3D Animated Background */}
      <Hero3DBackground />
      
      {/* Matrix Rain Effect - Optimized */}
      <div className="absolute inset-0 opacity-10 pointer-events-none overflow-hidden">
        {[...Array(10)].map((_, i) => <motion.div key={i} className="absolute w-px bg-gradient-to-b from-transparent via-emerald-500 to-transparent" style={{
        left: `${i * 10}%`,
        height: '200px',
        top: '-200px'
      }} animate={{
        y: ['0vh', '100vh']
      }} transition={{
        duration: 4 + Math.random() * 2,
        repeat: Infinity,
        ease: "linear",
        delay: Math.random() * 3
      }} />)}
      </div>

      {/* Scanlines */}
      <div className="absolute inset-0 pointer-events-none opacity-5">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-emerald-500/20 to-transparent animate-pulse" style={{
        backgroundSize: '100% 4px',
        backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, hsl(var(--primary) / 0.1) 2px, hsl(var(--primary) / 0.1) 4px)'
      }} />
      </div>

      {/* Glitch Grid Background */}
      <motion.div className="absolute inset-0 opacity-20" style={{
      y: yBackground
    }}>
        <div className="absolute inset-0" style={{
        backgroundImage: `
              linear-gradient(hsl(var(--primary) / 0.1) 1px, transparent 1px),
              linear-gradient(90deg, hsl(var(--primary) / 0.1) 1px, transparent 1px)
            `,
        backgroundSize: '50px 50px'
      }} />
        <motion.div className="absolute top-10 left-10 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl" animate={{
        scale: [1, 1.2, 1],
        x: [0, 50, 0],
        y: [0, 30, 0],
        opacity: [0.2, 0.4, 0.2]
      }} transition={{
        duration: 15,
        repeat: Infinity,
        ease: "easeInOut"
      }} />
        <motion.div className="absolute bottom-20 right-20 w-80 h-80 bg-cyan-500/20 rounded-full blur-3xl" animate={{
        scale: [1, 1.3, 1],
        x: [0, -30, 0],
        y: [0, -50, 0],
        opacity: [0.2, 0.4, 0.2]
      }} transition={{
        duration: 12,
        repeat: Infinity,
        ease: "easeInOut"
      }} />
      </motion.div>

      {/* Floating Binary/Hex Particles */}
      <motion.div className="absolute inset-0 pointer-events-none" style={{
      y: yForeground,
      opacity
    }}>
        {[...Array(12)].map((_, i) => <motion.div key={i} className="absolute caption font-mono text-emerald-500/40" style={{
        left: `${5 + i * 8}%`,
        top: `${10 + i * 7}%`
      }} animate={{
        y: [0, -40, 0],
        opacity: [0.1, 0.6, 0.1],
        rotateZ: [0, 360]
      }} transition={{
        duration: 4 + i * 0.3,
        repeat: Infinity,
        ease: "easeInOut",
        delay: i * 0.2
      }}>
            {Math.random() > 0.5 ? '0x' + Math.floor(Math.random() * 0xFF).toString(16) : Math.floor(Math.random() * 2).toString()}
          </motion.div>)}
      </motion.div>

      {/* Scanning Line Effect */}
      <motion.div className="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-emerald-500 to-transparent opacity-50 pointer-events-none" animate={{
      top: ['0%', '100%']
    }} transition={{
      duration: 4,
      repeat: Infinity,
      ease: "linear"
    }} />
      
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
            {/* Tag Line with Glitch Effect */}
            <motion.div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/5 px-2.5 py-1 caption font-medium text-emerald-400 backdrop-blur-sm" initial={{
            opacity: 0,
            scale: 0.8
          }} animate={{
            opacity: 1,
            scale: 1
          }} transition={{
            duration: 0.5,
            delay: 0.4
          }} whileHover={{
            boxShadow: "0 0 20px hsl(var(--primary) / 0.4)"
          }}>
              <motion.span className="inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" animate={{
              opacity: [1, 0.5, 1],
              scale: [1, 1.2, 1]
            }} transition={{
              duration: 2,
              repeat: Infinity
            }} />
              <span className="font-mono">{'>'} Ship pilot-ready AI tech</span>
            </motion.div>

            {/* Main Headline with Terminal Typing */}
            <motion.h1 className="mt-3 heading-1 relative font-mono" initial={{
            opacity: 0,
            y: 20
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            duration: 0.6,
            delay: 0.5
          }}>
              <span className="relative inline-block">
                <span className="relative z-10 bg-gradient-to-r from-emerald-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent">
                  {displayedText}
                  <motion.span className="inline-block w-[0.6em] h-[1em] bg-emerald-400 ml-1" animate={{
                  opacity: showCursor ? 1 : 0
                }} transition={{
                  duration: 0
                }} />
                </span>
                <motion.span className="absolute inset-0 bg-gradient-to-r from-emerald-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent blur-sm" animate={{
                opacity: [0.5, 0.8, 0.5]
              }} transition={{
                duration: 2,
                repeat: Infinity
              }}>
                  {displayedText}
                </motion.span>
              </span>
            </motion.h1>

            {/* Supporting Text */}
            <motion.p className="mt-2.5 max-w-xl body-base text-muted-foreground" initial={{
            opacity: 0,
            y: 20
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            duration: 0.6,
            delay: 0.6
          }}>For students, teachers, founders, and B2B or civic teams, I offer hands-on AI/product execution without the headcount drama. We pick one concrete problem, turn it into a small backlog, and in 4 weeks you get: a live prototype, clear documentation, and a simple decision—scale it, tweak it, or archive it.</motion.p>

            {/* Feature Pills - Unique Interactive Cards */}
            

            {/* CTA Buttons - Compact 3D Style */}
            <motion.div className="mt-4 flex flex-col gap-2 body-xs sm:flex-row sm:items-center" initial={{
            opacity: 0,
            y: 20
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            duration: 0.6,
            delay: 0.8
          }}>
              <motion.a href="https://scheduler.zoom.us/altruistic-xai" target="_blank" rel="noopener noreferrer" className="relative inline-flex items-center justify-center rounded-lg bg-gradient-to-br from-emerald-500 via-emerald-600 to-cyan-600 px-3 py-1.5 caption font-mono text-slate-950 font-semibold overflow-hidden group shadow-[0_4px_0_0_hsl(var(--primary)/0.5)] active:shadow-[0_2px_0_0_hsl(var(--primary)/0.5)] active:translate-y-[2px] transition-all" whileHover={{
              scale: 1.03,
              rotateX: -5,
              rotateY: 5,
              boxShadow: "0 6px 0 0 hsl(var(--primary) / 0.5), 0 8px 20px -5px hsl(var(--primary) / 0.4)"
            }} whileTap={{
              scale: 0.97,
              translateY: 2
            }} style={{
              transformStyle: "preserve-3d",
              perspective: "1000px"
            }}>
                {/* Animated shimmer */}
                <motion.div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent" animate={{
                x: ['-200%', '200%']
              }} transition={{
                duration: 2,
                repeat: Infinity,
                ease: "linear"
              }} />
                
                {/* Inner shadow for depth */}
                <div className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent rounded-lg" />
                
                <span className="relative z-10 flex items-center gap-1 drop-shadow-sm">
                  <span>{'>'}</span> Book intro
                </span>
                
                {/* Glow on hover */}
                <motion.div className="absolute inset-0 opacity-0 group-hover:opacity-100 rounded-lg" style={{
                boxShadow: '0 0 30px hsl(var(--primary)), inset 0 0 20px hsl(var(--primary) / 0.3)'
              }} transition={{
                duration: 0.3
              }} />
              </motion.a>
              
              <motion.a href="mailto:altruisticxai@gmail.com" className="relative inline-flex items-center justify-center gap-1 rounded-lg border-2 border-emerald-500/40 bg-gradient-to-br from-slate-900/90 to-slate-800/90 px-3 py-1.5 caption text-emerald-400 backdrop-blur-sm font-mono font-medium overflow-hidden group shadow-[0_4px_0_0_hsl(var(--primary)/0.2)] active:shadow-[0_2px_0_0_hsl(var(--primary)/0.2)] active:translate-y-[2px] transition-all" whileHover={{
              scale: 1.03,
              rotateX: -5,
              rotateY: -5,
              borderColor: "hsl(var(--primary) / 0.7)",
              boxShadow: "0 6px 0 0 hsl(var(--primary) / 0.2), 0 8px 20px -5px hsl(var(--primary) / 0.3)"
            }} whileTap={{
              scale: 0.97,
              translateY: 2
            }} style={{
              transformStyle: "preserve-3d",
              perspective: "1000px"
            }}>
                {/* Scanning line */}
                <motion.div className="absolute inset-0 bg-gradient-to-r from-emerald-500/0 via-emerald-500/20 to-emerald-500/0" animate={{
                x: ['-200%', '200%']
              }} transition={{
                duration: 3,
                repeat: Infinity,
                ease: "linear"
              }} />
                
                {/* Inner glow */}
                <div className="absolute inset-0 bg-gradient-to-b from-emerald-500/10 to-transparent rounded-lg" />
                
                <Mail className="h-2.5 w-2.5 relative z-10" />
                <span className="relative z-10 text-[10px] sm:text-xs">altruisticxai@gmail.com</span>
              </motion.a>
              
              <motion.a href="https://www.linkedin.com/in/ik11/" target="_blank" rel="noopener noreferrer" className="relative inline-flex items-center justify-center gap-1 rounded-lg border-2 border-emerald-500/40 bg-gradient-to-br from-slate-900/90 to-slate-800/90 px-3 py-1.5 caption text-emerald-400 backdrop-blur-sm font-mono font-medium overflow-hidden group shadow-[0_4px_0_0_hsl(var(--primary)/0.2)] active:shadow-[0_2px_0_0_hsl(var(--primary)/0.2)] active:translate-y-[2px] transition-all" whileHover={{
              scale: 1.03,
              rotateX: -5,
              rotateY: -5,
              borderColor: "hsl(var(--primary) / 0.7)",
              boxShadow: "0 6px 0 0 hsl(var(--primary) / 0.2), 0 8px 20px -5px hsl(var(--primary) / 0.3)"
            }} whileTap={{
              scale: 0.97,
              translateY: 2
            }} style={{
              transformStyle: "preserve-3d",
              perspective: "1000px"
            }}>
                {/* Scanning line */}
                <motion.div className="absolute inset-0 bg-gradient-to-r from-emerald-500/0 via-emerald-500/20 to-emerald-500/0" animate={{
                x: ['-200%', '200%']
              }} transition={{
                duration: 3,
                repeat: Infinity,
                ease: "linear"
              }} />
                
                {/* Inner glow */}
                <div className="absolute inset-0 bg-gradient-to-b from-emerald-500/10 to-transparent rounded-lg" />
                
                <Linkedin className="h-2.5 w-2.5 relative z-10" />
                <span className="relative z-10">LinkedIn</span>
              </motion.a>
            </motion.div>
          </motion.div>

          {/* Right Column - Hacker Terminal Block */}
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
              <motion.div className="relative rounded-2xl border border-emerald-500/30 bg-slate-900/80 p-3 sm:p-4 backdrop-blur-sm overflow-hidden" whileHover={{
              scale: 1.02,
              boxShadow: "0 20px 25px -5px hsl(var(--primary) / 0.3), 0 0 60px -15px hsl(var(--primary) / 0.4)",
              borderColor: "hsl(var(--primary) / 0.5)"
            }} transition={{
              duration: 0.3
            }}>
                {/* Terminal Header */}
                <div className="flex items-center gap-2 mb-3 pb-2 border-b border-emerald-500/20">
                  <div className="flex gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-red-500/70" />
                    <div className="w-2 h-2 rounded-full bg-yellow-500/70" />
                    <div className="w-2 h-2 rounded-full bg-emerald-500/70" />
                  </div>
                  <div className="caption font-mono text-emerald-400/70">
                    ~/build-fast-kit.sh
                  </div>
                </div>

                {/* Scanning Line Effect */}
                <motion.div className="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-emerald-400 to-transparent" animate={{
                top: ['0%', '100%']
              }} transition={{
                duration: 3,
                repeat: Infinity,
                ease: "linear"
              }} />

                <div className="caption font-mono text-emerald-400/90">
                  <span className="text-cyan-400">$</span> cat build-fast-kit.config
                </div>
                <p className="mt-1.5 body-xs text-slate-300 font-mono">
                  <span className="text-emerald-400">{'>'}</span> A 3-person team. One small backlog. 4 weeks to prove whether this pilot is worth scaling.
                </p>
                <div className="mt-3 grid gap-2 body-xs text-slate-200">
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