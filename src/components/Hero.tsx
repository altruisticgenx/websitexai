import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { Linkedin, Mail } from "lucide-react";
import { Hero3DBackground } from "./Hero3D";
import { shouldDisableHeavyAnimations, detectDeviceCapabilities, getAnimationDuration } from "@/utils/deviceCapabilities";
import { cn } from "@/lib/utils";
interface TrailParticle {
  id: number;
  x: number;
  y: number;
  timestamp: number;
  speed: number;
}
export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const {
    scrollYProgress
  } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });
  const [deviceCapabilities, setDeviceCapabilities] = useState(() => detectDeviceCapabilities());
  const [isPerformanceMode, setIsPerformanceMode] = useState(() => shouldDisableHeavyAnimations());
  const yForeground = useTransform(scrollYProgress, [0, 1], isPerformanceMode ? ["0%", "0%"] : ["0%", "15%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const [shouldRender3D, setShouldRender3D] = useState(false);
  const [activeSector, setActiveSector] = useState<"energy" | "education" | null>(null);
  const [trailParticles, setTrailParticles] = useState<TrailParticle[]>([]);
  const particleIdRef = useRef(0);
  const lastMousePos = useRef({
    x: 0,
    y: 0,
    timestamp: 0
  });
  const lastSoundTime = useRef(0);
  const audioContextRef = useRef<AudioContext | null>(null);
  useEffect(() => {
    if (isPerformanceMode) return;
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
    if (ref.current) observer.observe(ref.current);
    const currentRef = ref.current;
    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, [shouldRender3D, isPerformanceMode]);
  useEffect(() => {
    if (isPerformanceMode || typeof window === 'undefined') return;
    audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    return () => {
      if (audioContextRef.current) audioContextRef.current.close();
    };
  }, [isPerformanceMode]);
  const playSpeedSound = (speed: number) => {
    if (!audioContextRef.current || isPerformanceMode) return;
    const now = Date.now();
    if (now - lastSoundTime.current < 100) return;
    const audioContext = audioContextRef.current;
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    if (speed < 0.5) {
      oscillator.frequency.value = 200;
      gainNode.gain.value = 0.05;
    } else if (speed < 1.5) {
      oscillator.frequency.value = 400;
      gainNode.gain.value = 0.08;
    } else {
      oscillator.frequency.value = 800;
      gainNode.gain.value = 0.12;
    }
    oscillator.type = 'sine';
    oscillator.start();
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.15);
    oscillator.stop(audioContext.currentTime + 0.15);
    lastSoundTime.current = now;
  };
  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!ref.current || isPerformanceMode) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const now = Date.now();
    const dx = x - lastMousePos.current.x;
    const dy = y - lastMousePos.current.y;
    const dt = Math.max(now - lastMousePos.current.timestamp, 1);
    const distance = Math.sqrt(dx * dx + dy * dy);
    const speed = Math.min(distance / dt, 3);
    if (speed > 0.3) playSpeedSound(speed);
    lastMousePos.current = {
      x,
      y,
      timestamp: now
    };
    const newParticle: TrailParticle = {
      id: particleIdRef.current++,
      x,
      y,
      timestamp: now,
      speed
    };
    setTrailParticles(prev => [...prev, newParticle]);
  };
  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();
      setTrailParticles(prev => prev.filter(particle => now - particle.timestamp < 1000));
    }, 100);
    return () => clearInterval(interval);
  }, []);
  return <section ref={ref} id="home" className="relative py-8 sm:py-12 lg:py-16 overflow-hidden bg-slate-950" onMouseMove={handleMouseMove}>
      {/* Vibrant gradient background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div className="absolute inset-0 opacity-50" style={{
        background: 'radial-gradient(circle at 20% 50%, hsl(var(--primary) / 0.25) 0%, transparent 50%), radial-gradient(circle at 80% 50%, hsl(var(--accent) / 0.2) 0%, transparent 50%)'
      }} animate={{
        background: ['radial-gradient(circle at 20% 50%, hsl(var(--primary) / 0.25) 0%, transparent 50%), radial-gradient(circle at 80% 50%, hsl(var(--accent) / 0.2) 0%, transparent 50%)', 'radial-gradient(circle at 80% 30%, hsl(var(--primary) / 0.3) 0%, transparent 50%), radial-gradient(circle at 20% 70%, hsl(var(--accent) / 0.25) 0%, transparent 50%)', 'radial-gradient(circle at 50% 80%, hsl(var(--primary) / 0.25) 0%, transparent 50%), radial-gradient(circle at 50% 20%, hsl(var(--accent) / 0.2) 0%, transparent 50%)', 'radial-gradient(circle at 20% 50%, hsl(var(--primary) / 0.25) 0%, transparent 50%), radial-gradient(circle at 80% 50%, hsl(var(--accent) / 0.2) 0%, transparent 50%)']
      }} transition={{
        duration: 10,
        repeat: Infinity,
        ease: "easeInOut"
      }} />
        
        {!isPerformanceMode && <>
            {[...Array(3)].map((_, i) => <motion.div key={i} className="absolute rounded-full" style={{
          width: `${80 + i * 30}px`,
          height: `${80 + i * 30}px`,
          background: `radial-gradient(circle, hsl(var(--primary) / ${0.15 - i * 0.03}), transparent)`,
          filter: 'blur(30px)'
        }} animate={{
          x: [`${20 + i * 15}%`, `${60 + i * 10}%`, `${20 + i * 15}%`],
          y: [`${30 + i * 10}%`, `${70 - i * 10}%`, `${30 + i * 10}%`],
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.4, 0.2]
        }} transition={{
          duration: 10 + i * 2,
          repeat: Infinity,
          ease: "easeInOut",
          delay: i * 0.5
        }} />)}
          </>}
        
        <div className="absolute inset-0 opacity-[0.07]" style={{
        backgroundImage: 'linear-gradient(hsl(var(--primary) / 0.15) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--primary) / 0.15) 1px, transparent 1px)',
        backgroundSize: '60px 60px'
      }} />
      </div>

      {/* Mouse trail particles */}
      {!isPerformanceMode && <div className="hidden md:block">
          {trailParticles.slice(0, 8).map(particle => {
        const age = Date.now() - particle.timestamp;
        const lifespan = 1000;
        const progress = age / lifespan;
        const speedRatio = Math.min(particle.speed / 3, 1);
        return <motion.div key={particle.id} className="absolute w-2 h-2 rounded-full pointer-events-none" style={{
          left: particle.x,
          top: particle.y,
          background: speedRatio > 0.5 ? `radial-gradient(circle, hsl(var(--accent) / ${0.7 * (1 - progress)}), transparent)` : `radial-gradient(circle, hsl(var(--primary) / ${0.6 * (1 - progress)}), transparent)`,
          boxShadow: `0 0 ${8 * (1 - progress)}px ${speedRatio > 0.5 ? 'hsl(var(--accent) / 0.5)' : 'hsl(var(--primary) / 0.4)'}`
        }} initial={{
          scale: 0,
          opacity: 1
        }} animate={{
          scale: [0, 1.4, 0],
          opacity: [1, 0.7, 0]
        }} transition={{
          duration: 1,
          ease: "easeOut"
        }} />;
      })}
        </div>}
      
      {shouldRender3D && !isPerformanceMode && <div className="opacity-15">
          <Hero3DBackground />
        </div>}

      {/* Main content - Enhanced glassmorphism */}
      <motion.div className="relative z-10 px-4 py-6 sm:py-8 mx-auto max-w-4xl" style={{
      y: yForeground,
      opacity
    }}>
        {/* 3D glass card with enhanced depth */}
        <motion.div className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.07] via-white/[0.03] to-transparent backdrop-blur-2xl shadow-2xl" whileHover={{
        scale: 1.01,
        boxShadow: "0 25px 70px -15px hsl(var(--primary) / 0.4)",
        borderColor: "hsl(var(--primary) / 0.3)"
      }} transition={{
        duration: 0.4,
        ease: [0.34, 1.56, 0.64, 1]
      }} style={{
        transformStyle: "preserve-3d"
      }}>
          {/* Shimmer effect */}
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-700" />
          
          <div className="relative p-6 sm:p-8 lg:p-10 space-y-4 sm:space-y-5">
            {/* Tagline - compact & glowing */}
            <motion.div className="inline-flex items-center gap-2 rounded-full border-2 border-primary/60 bg-gradient-to-r from-primary/15 via-primary/10 to-accent/15 backdrop-blur-xl px-3 py-1.5 text-[10px] sm:text-xs font-bold text-foreground shadow-[0_0_25px_hsl(var(--primary)/0.3)]" initial={{
            opacity: 0,
            scale: 0.9,
            rotateX: -15
          }} animate={{
            opacity: 1,
            scale: 1,
            rotateX: 0
          }} transition={{
            duration: 0.6,
            delay: 0.2,
            ease: [0.34, 1.56, 0.64, 1]
          }} whileHover={{
            scale: 1.05,
            boxShadow: "0 0 35px rgba(16, 185, 129, 0.6)",
            borderColor: "rgba(16, 185, 129, 0.8)"
          }}>
              <motion.span className="inline-flex h-2 w-2 rounded-full bg-primary shadow-[0_0_15px_hsl(var(--primary))]" animate={{
              opacity: [1, 0.3, 1],
              scale: [1, 1.5, 1],
              boxShadow: ["0 0 15px hsl(var(--primary))", "0 0 25px hsl(var(--primary))", "0 0 15px hsl(var(--primary))"]
            }} transition={{
              duration: 1.8,
              repeat: Infinity
            }} />
              <span className="font-mono tracking-wide text-xs">{'>'} Ship pilot-ready AI tech</span>
            </motion.div>

            {/* Main headline - vibrant 3D text */}
            <motion.h1 initial={{
            opacity: 0,
            y: 20,
            rotateX: -10
          }} animate={{
            opacity: 1,
            y: 0,
            rotateX: 0
          }} transition={{
            duration: 0.7,
            delay: 0.3,
            ease: [0.34, 1.56, 0.64, 1]
          }} style={{
            textShadow: "0 6px 25px hsl(var(--primary) / 0.3)",
            transformStyle: "preserve-3d"
          }} className="text-2xl sm:text-3xl font-bold tracking-tight leading-tight bg-gradient-to-br from-foreground via-foreground to-muted-foreground bg-clip-text text-transparent lg:text-3xl">
              Ship a working AI pilot in 2–6 weeks — without hiring.
            </motion.h1>

            {/* Subhead */}
            <motion.p initial={{
            opacity: 0,
            y: 15
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            duration: 0.6,
            delay: 0.4
          }} className="text-xs sm:text-sm max-w-2xl text-muted-foreground leading-relaxed lg:text-sm">
              Senior AI + product execution for energy, education, and civic teams. First demo in Week 1.
            </motion.p>

            {/* Sector switcher - enhanced 3D buttons */}
            <motion.div className="flex flex-wrap gap-2 sm:gap-3 items-center text-xs sm:text-sm" initial={{
            opacity: 0,
            y: 15
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            duration: 0.6,
            delay: 0.5
          }}>
              <span className="text-muted-foreground font-semibold">Focus:</span>
              
              {["energy", "education"].map(sector => <motion.button key={sector} className="relative px-3 py-2 rounded-xl border-2 border-primary/60 bg-gradient-to-br from-primary/15 via-primary/10 to-transparent backdrop-blur-xl text-foreground font-bold overflow-visible group transition-all shadow-[0_0_20px_hsl(var(--primary)/0.2)]" onMouseEnter={() => setActiveSector(sector as "energy" | "education")} onMouseLeave={() => setActiveSector(null)} whileHover={{
              scale: 1.08,
              borderColor: "hsl(var(--primary) / 0.9)",
              boxShadow: "0 0 30px hsl(var(--primary) / 0.5)"
            }} whileTap={{
              scale: 0.95
            }} style={{
              transformStyle: "preserve-3d"
            }}>
                  {/* Glowing halo */}
                  <motion.div animate={{
                opacity: activeSector === sector ? [0.3, 0.7, 0.3] : 0.15,
                scale: activeSector === sector ? [1.2, 1.6, 1.2] : 1
              }} transition={{
                duration: 1.8,
                repeat: Infinity,
                ease: "easeInOut"
              }} className="absolute inset-0 bg-primary blur-2xl -z-10 rounded-sm" />
                  
                  {/* Orbital particles */}
                  {activeSector === sector && <>
                      {[...Array(6)].map((_, i) => <motion.div key={i} className="absolute w-1 h-1 rounded-full bg-primary shadow-[0_0_8px_hsl(var(--primary))]" style={{
                  left: "50%",
                  top: "50%"
                }} animate={{
                  x: [0, Math.cos(i * Math.PI / 3) * 40, 0],
                  y: [0, Math.sin(i * Math.PI / 3) * 40, 0],
                  opacity: [0, 1, 0]
                }} transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.15,
                  ease: "easeInOut"
                }} />)}
                    </>}
                  
                  <span className="relative z-10 capitalize text-xs">{sector}</span>
                </motion.button>)}
            </motion.div>

            {/* CTA buttons - enhanced glassmorphism */}
            <motion.div className="flex flex-col sm:flex-row gap-3 pt-2" initial={{
            opacity: 0,
            y: 15
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            duration: 0.6,
            delay: 0.6
          }}>
              <motion.a href="mailto:altruisticxai@gmail.com" className="inline-flex items-center justify-center gap-2 rounded-xl border-2 border-primary bg-gradient-to-br from-primary via-primary/90 to-primary/80 px-5 py-3 text-sm font-bold text-primary-foreground backdrop-blur-xl transition-all" whileHover={{
              scale: 1.05,
              boxShadow: "0 0 45px rgba(16, 185, 129, 0.6)",
              y: -3
            }} whileTap={{
              scale: 0.97
            }}>
                <Mail className="h-4 w-4" />
                <span className="text-xs">Book a Call</span>
              </motion.a>

              <motion.a href="https://www.linkedin.com/in/ik11/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 rounded-xl border-2 border-border bg-gradient-to-br from-muted/80 via-muted/60 to-muted/40 px-5 py-3 text-sm font-bold text-foreground shadow-lg backdrop-blur-xl transition-all hover:border-primary/50" whileHover={{
              scale: 1.05,
              boxShadow: "0 0 30px hsl(var(--primary) / 0.3)",
              y: -3
            }} whileTap={{
              scale: 0.97
            }}>
                <Linkedin className="h-4 w-4" />
                
              </motion.a>
            </motion.div>

            {/* Trust line */}
            <motion.p className="text-[10px] sm:text-xs text-muted-foreground/80 pt-2" initial={{
            opacity: 0
          }} animate={{
            opacity: 1
          }} transition={{
            duration: 0.6,
            delay: 0.7
          }}>
              Week-to-week · Pause anytime · Async-first
            </motion.p>
          </div>
        </motion.div>
      </motion.div>
    </section>;
}