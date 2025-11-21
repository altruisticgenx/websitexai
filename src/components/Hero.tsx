import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
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
  const {
    scrollYProgress
  } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });

  // Device capability detection
  const [deviceCapabilities, setDeviceCapabilities] = useState(() => detectDeviceCapabilities());
  const [isPerformanceMode, setIsPerformanceMode] = useState(() => shouldDisableHeavyAnimations());

  // Parallax transforms - disabled on low-end devices
  const yForeground = useTransform(
    scrollYProgress, 
    [0, 1], 
    isPerformanceMode ? ["0%", "0%"] : ["0%", "15%"]
  );
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  // Lazy loading state for 3D background
  const [shouldRender3D, setShouldRender3D] = useState(false);

  // Typing animation state
  const fullText = "Local-First AI for Schools & Energy Systems";
  const [displayedText, setDisplayedText] = useState("");
  const [showCursor, setShowCursor] = useState(true);

  // Sector switcher state
  const [activeSector, setActiveSector] = useState<"energy" | "education" | null>(null);

  // Mouse trail particles state
  const [trailParticles, setTrailParticles] = useState<TrailParticle[]>([]);
  const particleIdRef = useRef(0);
  const lastMousePos = useRef({
    x: 0,
    y: 0,
    timestamp: 0
  });
  const lastSoundTime = useRef(0);
  const audioContextRef = useRef<AudioContext | null>(null);

  // Intersection Observer for lazy loading 3D background - only on capable devices
  useEffect(() => {
    // Skip 3D background entirely on low-end devices or performance mode
    if (isPerformanceMode) {
      return;
    }

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
  }, [shouldRender3D, isPerformanceMode]);
  // Typing animation with optimized speed
  useEffect(() => {
    let currentIndex = 0;
    const typingSpeed = getAnimationDuration(80);
    
    // Skip typing animation in performance mode
    if (isPerformanceMode) {
      setDisplayedText(fullText);
      return;
    }

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
  }, [fullText, isPerformanceMode]);

  // Initialize Audio Context - only on capable devices
  useEffect(() => {
    if (isPerformanceMode || typeof window === 'undefined') {
      return;
    }
    
    audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    
    return () => {
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, [isPerformanceMode]);

  // Play sound based on speed threshold - disabled in performance mode
  const playSpeedSound = (speed: number) => {
    if (!audioContextRef.current || isPerformanceMode) return;
    const now = Date.now();
    // Throttle sounds to prevent spam (minimum 100ms between sounds)
    if (now - lastSoundTime.current < 100) return;
    const audioContext = audioContextRef.current;
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    // Different frequencies and volumes based on speed thresholds
    if (speed < 0.5) {
      // Slow: Low frequency, subtle
      oscillator.frequency.value = 200;
      gainNode.gain.value = 0.05;
    } else if (speed < 1.5) {
      // Medium: Mid frequency, moderate
      oscillator.frequency.value = 400;
      gainNode.gain.value = 0.08;
    } else {
      // Fast: High frequency, prominent
      oscillator.frequency.value = 800;
      gainNode.gain.value = 0.12;
    }
    oscillator.type = 'sine';
    oscillator.start();

    // Fade out
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.15);
    oscillator.stop(audioContext.currentTime + 0.15);
    lastSoundTime.current = now;
  };

  // Handle mouse movement for trail effect - disabled in performance mode
  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!ref.current || isPerformanceMode) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const now = Date.now();

    // Calculate speed based on distance and time since last movement
    const dx = x - lastMousePos.current.x;
    const dy = y - lastMousePos.current.y;
    const dt = Math.max(now - lastMousePos.current.timestamp, 1);
    const distance = Math.sqrt(dx * dx + dy * dy);
    const speed = Math.min(distance / dt, 3); // Normalize speed (0-3)

    // Play sound when speed exceeds threshold
    if (speed > 0.3) {
      playSpeedSound(speed);
    }
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

  // Clean up old particles
  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();
      setTrailParticles(prev => prev.filter(particle => now - particle.timestamp < 1000));
    }, 100);
    return () => clearInterval(interval);
  }, []);
  return <section ref={ref} id="home" className="relative py-3 sm:py-4 overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950" onMouseMove={handleMouseMove}>
      {/* Vibrant Moving Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Animated Gradient Mesh */}
        <motion.div 
          className="absolute inset-0 opacity-60"
          style={{
            background: 'radial-gradient(circle at 20% 50%, hsl(var(--primary) / 0.3) 0%, transparent 50%), radial-gradient(circle at 80% 50%, hsl(var(--accent) / 0.25) 0%, transparent 50%)',
          }}
          animate={{
            background: [
              'radial-gradient(circle at 20% 50%, hsl(var(--primary) / 0.3) 0%, transparent 50%), radial-gradient(circle at 80% 50%, hsl(var(--accent) / 0.25) 0%, transparent 50%)',
              'radial-gradient(circle at 80% 30%, hsl(var(--primary) / 0.35) 0%, transparent 50%), radial-gradient(circle at 20% 70%, hsl(var(--accent) / 0.3) 0%, transparent 50%)',
              'radial-gradient(circle at 50% 80%, hsl(var(--primary) / 0.3) 0%, transparent 50%), radial-gradient(circle at 50% 20%, hsl(var(--accent) / 0.25) 0%, transparent 50%)',
              'radial-gradient(circle at 20% 50%, hsl(var(--primary) / 0.3) 0%, transparent 50%), radial-gradient(circle at 80% 50%, hsl(var(--accent) / 0.25) 0%, transparent 50%)',
            ]
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        {/* Floating Orbs */}
        {!isPerformanceMode && (
          <>
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute rounded-full"
                style={{
                  width: `${60 + i * 20}px`,
                  height: `${60 + i * 20}px`,
                  background: `radial-gradient(circle, hsl(var(--primary) / ${0.2 - i * 0.03}), transparent)`,
                  filter: 'blur(20px)',
                }}
                animate={{
                  x: [
                    `${20 + i * 15}%`,
                    `${60 + i * 10}%`,
                    `${20 + i * 15}%`,
                  ],
                  y: [
                    `${30 + i * 10}%`,
                    `${70 - i * 10}%`,
                    `${30 + i * 10}%`,
                  ],
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{
                  duration: 8 + i * 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.5,
                }}
              />
            ))}
          </>
        )}
        
        {/* Grid Pattern Overlay */}
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: 'linear-gradient(hsl(var(--primary) / 0.1) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--primary) / 0.1) 1px, transparent 1px)',
            backgroundSize: '50px 50px',
          }}
        />
      </div>

      {/* Mouse Trail Particles - Only on desktop with capable devices */}
      {!isPerformanceMode && (
        <div className="hidden md:block">
          {trailParticles.slice(0, 10).map(particle => {
            const age = Date.now() - particle.timestamp;
            const lifespan = 1000;
            const progress = age / lifespan;
            const speedRatio = Math.min(particle.speed / 3, 1);
            
            return <motion.div 
              key={particle.id} 
              className="absolute w-1.5 h-1.5 rounded-full pointer-events-none" 
              style={{
                left: particle.x,
                top: particle.y,
                background: `radial-gradient(circle, hsl(var(--primary) / ${0.6 * (1 - progress)}), transparent)`,
                boxShadow: `0 0 ${6 * (1 - progress)}px hsl(var(--primary) / ${0.4 * (1 - progress)})`
              }} 
              initial={{ scale: 0, opacity: 1 }} 
              animate={{
                scale: [0, 1.2, 0],
                opacity: [1, 0.6, 0]
              }} 
              transition={{
                duration: 0.8,
                ease: "easeOut"
              }} 
            />;
          })}
        </div>
      )}
      
      {/* 3D Animated Background - Only on capable devices with reduced opacity */}
      {shouldRender3D && !isPerformanceMode && (
        <div className="opacity-20">
          <Hero3DBackground />
        </div>
      )}

      {/* Main Content - Compact Mobile-First */}
      <motion.div 
        className="relative z-10 px-3 py-2 sm:px-4 sm:py-3 mx-auto max-w-3xl" 
        style={{
          y: yForeground,
          opacity,
          transformStyle: "preserve-3d",
        }}
      >
        {/* 3D Glass Card Effect */}
        <motion.div 
          className="absolute inset-0 bg-gradient-to-br from-white/5 via-white/2 to-transparent backdrop-blur-md rounded-xl border border-white/10 -z-10"
          style={{
            transform: "translateZ(-20px)",
          }}
          whileHover={{
            scale: 1.02,
            boxShadow: "0 20px 60px -10px hsl(var(--primary) / 0.3)",
          }}
        />
        
        <div className="max-w-2xl mx-auto space-y-2 sm:space-y-2.5 relative">
          <motion.div initial={{
            opacity: 0,
            y: 30
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            duration: 0.8
          }}>
            {/* Tagline - Compact & Vibrant */}
            <motion.div 
              className="inline-flex items-center gap-1.5 rounded-full border-2 border-primary/70 bg-gradient-to-r from-primary/20 via-primary/10 to-accent/20 backdrop-blur-xl px-2 py-0.5 sm:px-2.5 sm:py-1 text-[9px] sm:text-[10px] font-semibold text-white shadow-[0_0_20px_hsl(var(--primary)/0.4)]" 
              initial={{
                opacity: 0,
                scale: 0.9,
                rotateX: -15
              }} 
              animate={{
                opacity: 1,
                scale: 1,
                rotateX: 0
              }} 
              transition={{
                duration: 0.6,
                delay: 0.2,
                ease: [0.34, 1.56, 0.64, 1]
              }}
              style={{
                transformStyle: "preserve-3d",
              }}
              whileHover={{
                scale: 1.05,
                boxShadow: "0 0 30px hsl(var(--primary) / 0.6)",
              }}
              role="status" 
              aria-label="Current service availability"
            >
              <motion.span 
                className="inline-flex h-1 w-1 sm:h-1.5 sm:w-1.5 rounded-full bg-primary shadow-[0_0_12px_hsl(var(--primary))]" 
                animate={{
                  opacity: [1, 0.4, 1],
                  scale: [1, 1.4, 1],
                  boxShadow: ["0 0 12px hsl(var(--primary))", "0 0 20px hsl(var(--primary))", "0 0 12px hsl(var(--primary))"]
                }} 
                transition={{
                  duration: 1.5,
                  repeat: Infinity
                }} 
                aria-hidden="true" 
              />
              <span className="font-mono">{'>'} Ship pilot-ready AI tech</span>
            </motion.div>

            {/* Main Headline - Compact & 3D */}
            <motion.h1 
              className="mt-1.5 sm:mt-2 text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight leading-tight bg-gradient-to-br from-white via-white to-slate-300 bg-clip-text text-transparent drop-shadow-[0_2px_10px_hsl(var(--primary)/0.3)]" 
              initial={{
                opacity: 0,
                y: 20,
                rotateX: -10
              }} 
              animate={{
                opacity: 1,
                y: 0,
                rotateX: 0
              }} 
              transition={{
                duration: 0.7,
                delay: 0.4,
                ease: [0.34, 1.56, 0.64, 1]
              }}
              style={{
                transformStyle: "preserve-3d",
                textShadow: "0 4px 20px hsl(var(--primary) / 0.4)",
              }}
            >
              Ship a working AI pilot in 2–6 weeks — without hiring.
            </motion.h1>

            {/* Subhead - Compact */}
            <motion.p 
              className="mt-1.5 text-[10px] sm:text-xs max-w-xl text-slate-300/90 drop-shadow-md leading-relaxed" 
              initial={{
                opacity: 0,
                y: 15
              }} 
              animate={{
                opacity: 1,
                y: 0
              }} 
              transition={{
                duration: 0.6,
                delay: 0.5
              }}
            >
              Senior AI + product execution for energy, education, and civic teams. First demo in Week 1.
            </motion.p>

            {/* Sector Tag Switcher - Compact & 3D */}
            <motion.div 
              className="mt-1.5 sm:mt-2 flex flex-wrap gap-1.5 items-center text-[9px] sm:text-[10px]" 
              initial={{
                opacity: 0,
                y: 15
              }} 
              animate={{
                opacity: 1,
                y: 0
              }} 
              transition={{
                duration: 0.6,
                delay: 0.6
              }}
            >
              <span className="text-slate-300/80 font-semibold">Focus:</span>
              <motion.button 
                className="relative px-2 py-1 sm:px-2.5 sm:py-1.5 rounded-lg border-2 border-primary/70 bg-gradient-to-br from-primary/20 via-primary/10 to-transparent backdrop-blur-xl text-white font-bold overflow-visible group transition-all shadow-[0_0_15px_hsl(var(--primary)/0.3)]"
                onMouseEnter={() => setActiveSector("energy")} 
                onMouseLeave={() => setActiveSector(null)} 
                whileHover={{
                  scale: 1.05,
                  borderColor: "hsl(var(--primary) / 0.8)"
                }} 
                style={{
                  transformStyle: "preserve-3d",
                  perspective: "1000px"
                }}
              >
                {/* Glowing Halo Effect - Behind button */}
                <motion.div className="absolute inset-0 rounded-lg bg-primary blur-xl -z-10" animate={{
                opacity: activeSector === "energy" ? [0.3, 0.6, 0.3] : 0.1,
                scale: activeSector === "energy" ? [1.2, 1.5, 1.2] : 1
              }} transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut"
              }} />
                
                {/* Pulsing Ring on Hover */}
                {activeSector === "energy" && <>
                    <motion.div className="absolute inset-0 rounded-lg border-2 border-primary" initial={{
                  scale: 1,
                  opacity: 0.6
                }} animate={{
                  scale: [1, 1.5, 2],
                  opacity: [0.6, 0.3, 0]
                }} transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeOut"
                }} />
                    <motion.div className="absolute inset-0 rounded-lg border-2 border-primary" initial={{
                  scale: 1,
                  opacity: 0.6
                }} animate={{
                  scale: [1, 1.5, 2],
                  opacity: [0.6, 0.3, 0]
                }} transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeOut",
                  delay: 0.5
                }} />
                  </>}
                {/* Orbital Particles */}
                {[...Array(4)].map((_, i) => {
                const angle = i * 90 * (Math.PI / 180);
                const radius = 25;
                return <motion.div key={i} className="absolute w-1.5 h-1.5 rounded-full bg-primary shadow-[0_0_8px_2px_hsl(var(--primary)/0.6)]" style={{
                  left: '50%',
                  top: '50%'
                }} animate={{
                  x: [Math.cos(angle) * radius, Math.cos(angle + Math.PI / 2) * radius, Math.cos(angle + Math.PI) * radius, Math.cos(angle + 3 * Math.PI / 2) * radius, Math.cos(angle + 2 * Math.PI) * radius],
                  y: [Math.sin(angle) * radius, Math.sin(angle + Math.PI / 2) * radius, Math.sin(angle + Math.PI) * radius, Math.sin(angle + 3 * Math.PI / 2) * radius, Math.sin(angle + 2 * Math.PI) * radius],
                  opacity: [0.4, 0.8, 0.6, 0.8, 0.4],
                  scale: [0.8, 1.2, 1, 1.2, 0.8]
                }} transition={{
                  duration: activeSector === "energy" ? 2 : 4,
                  repeat: Infinity,
                  ease: "linear",
                  delay: i * 0.25
                }} />;
              })}
                <motion.div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/20 to-primary/0" animate={{
                x: ['-200%', '200%']
              }} transition={{
                duration: 3,
                repeat: Infinity,
                ease: "linear"
              }} />
                <span className="relative z-10 font-mono">Energy</span>
              </motion.button>
              
              <motion.button 
                className="relative px-2 py-1 sm:px-2.5 sm:py-1.5 rounded-lg border-2 border-accent/70 bg-gradient-to-br from-accent/20 via-accent/10 to-transparent backdrop-blur-xl text-white font-bold overflow-visible group transition-all shadow-[0_0_15px_hsl(var(--accent)/0.3)]"
                onMouseEnter={() => setActiveSector("education")} 
                onMouseLeave={() => setActiveSector(null)} 
                whileHover={{
                  scale: 1.05,
                  borderColor: "hsl(var(--accent) / 0.8)"
                }} 
                style={{
                  transformStyle: "preserve-3d",
                  perspective: "1000px"
                }}
              >
                {/* Glowing Halo Effect - Behind button */}
                <motion.div className="absolute inset-0 rounded-lg bg-accent blur-xl -z-10" animate={{
                opacity: activeSector === "education" ? [0.3, 0.6, 0.3] : 0.1,
                scale: activeSector === "education" ? [1.2, 1.5, 1.2] : 1
              }} transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut"
              }} />
                
                {/* Pulsing Ring on Hover */}
                {activeSector === "education" && <>
                    <motion.div className="absolute inset-0 rounded-lg border-2 border-accent" initial={{
                  scale: 1,
                  opacity: 0.6
                }} animate={{
                  scale: [1, 1.5, 2],
                  opacity: [0.6, 0.3, 0]
                }} transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeOut"
                }} />
                    <motion.div className="absolute inset-0 rounded-lg border-2 border-accent" initial={{
                  scale: 1,
                  opacity: 0.6
                }} animate={{
                  scale: [1, 1.5, 2],
                  opacity: [0.6, 0.3, 0]
                }} transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeOut",
                  delay: 0.5
                }} />
                  </>}
                {/* Orbital Particles */}
                {[...Array(4)].map((_, i) => {
                const angle = (i * 90 + 45) * (Math.PI / 180);
                const radius = 25;
                return <motion.div key={i} className="absolute w-1.5 h-1.5 rounded-full bg-accent shadow-[0_0_8px_2px_hsl(var(--accent)/0.6)]" style={{
                  left: '50%',
                  top: '50%'
                }} animate={{
                  x: [Math.cos(angle) * radius, Math.cos(angle + Math.PI / 2) * radius, Math.cos(angle + Math.PI) * radius, Math.cos(angle + 3 * Math.PI / 2) * radius, Math.cos(angle + 2 * Math.PI) * radius],
                  y: [Math.sin(angle) * radius, Math.sin(angle + Math.PI / 2) * radius, Math.sin(angle + Math.PI) * radius, Math.sin(angle + 3 * Math.PI / 2) * radius, Math.sin(angle + 2 * Math.PI) * radius],
                  opacity: [0.5, 0.9, 0.7, 0.9, 0.5],
                  scale: [0.9, 1.3, 1.1, 1.3, 0.9]
                }} transition={{
                  duration: activeSector === "education" ? 2.5 : 5,
                  repeat: Infinity,
                  ease: "linear",
                  delay: i * 0.3
                }} />;
              })}
                <motion.div className="absolute inset-0 bg-gradient-to-r from-accent/0 via-accent/20 to-accent/0" animate={{
                x: ['-200%', '200%']
              }} transition={{
                duration: 3,
                repeat: Infinity,
                ease: "linear"
              }} />
                <span className="relative z-10 font-mono">Education</span>
              </motion.button>
            </motion.div>

            {/* Dynamic Sector Description - Compact & Vibrant */}
            <motion.div 
              className="mt-1.5 min-h-[32px]" 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }}
            >
              {activeSector === "energy" && (
                <motion.p 
                  className="text-[9px] sm:text-[10px] text-white font-mono drop-shadow-md bg-gradient-to-r from-primary/30 via-primary/20 to-transparent backdrop-blur-xl rounded-lg px-2 py-1 sm:px-2.5 sm:py-1.5 inline-block border border-primary/40 shadow-[0_0_15px_hsl(var(--primary)/0.3)]" 
                  initial={{ opacity: 0, x: -10, rotateX: -10 }} 
                  animate={{ opacity: 1, x: 0, rotateX: 0 }} 
                  exit={{ opacity: 0, x: 10 }} 
                  transition={{ duration: 0.4 }}
                  style={{ transformStyle: "preserve-3d" }}
                >
                  → Grid optimization · Demand forecasting · Utility analytics
                </motion.p>
              )}
              {activeSector === "education" && (
                <motion.p 
                  className="text-[9px] sm:text-[10px] text-white font-mono drop-shadow-md bg-gradient-to-r from-accent/30 via-accent/20 to-transparent backdrop-blur-xl rounded-lg px-2 py-1 sm:px-2.5 sm:py-1.5 inline-block border border-accent/40 shadow-[0_0_15px_hsl(var(--accent)/0.3)]" 
                  initial={{ opacity: 0, x: -10, rotateX: -10 }} 
                  animate={{ opacity: 1, x: 0, rotateX: 0 }} 
                  exit={{ opacity: 0, x: 10 }} 
                  transition={{ duration: 0.4 }}
                  style={{ transformStyle: "preserve-3d" }}
                >
                  → Personalized learning · Student privacy · Civic education
                </motion.p>
              )}
              {!activeSector && (
                <motion.p 
                  className="max-w-xl text-[9px] sm:text-[10px] text-slate-300/80 drop-shadow-md" 
                  initial={{ opacity: 0 }} 
                  animate={{ opacity: 1 }}
                >
                  Privacy-first prototypes that help educators personalize learning and utilities optimize grids—without sending your data to Big Tech clouds.
                </motion.p>
              )}
            </motion.div>

            {/* CTA Buttons - Compact & 3D */}
            <motion.div 
              className="mt-2 flex flex-col gap-1.5 sm:flex-row sm:items-start" 
              initial={{
                opacity: 0,
                y: 15
              }} 
              animate={{
                opacity: 1,
                y: 0
              }} 
              transition={{
                duration: 0.6,
                delay: 0.7
              }}
            >
              <motion.a 
                href="https://us06web.zoom.us/launch/chat?src=direct_chat_link&email=altruisticxai@gmail.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="inline-flex w-full sm:w-auto items-center justify-center rounded-lg bg-gradient-to-br from-primary via-primary/90 to-primary/80 px-3 py-1.5 sm:px-4 sm:py-2 text-[10px] sm:text-[11px] font-bold text-white hover:from-primary/90 hover:via-primary/80 hover:to-primary/70 transition-all shadow-[0_4px_20px_hsl(var(--primary)/0.4)] border border-primary/50"
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 6px 30px hsl(var(--primary) / 0.6)",
                  y: -2,
                }}
                whileTap={{ scale: 0.98 }}
                style={{ transformStyle: "preserve-3d" }}
              >
                <Mail className="w-3 h-3 mr-1.5" />
                Zoom Chat
              </motion.a>
              <motion.a 
                href="https://www.linkedin.com/in/ik11/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="inline-flex w-full sm:w-auto items-center justify-center rounded-lg bg-gradient-to-br from-accent via-accent/90 to-accent/80 px-3 py-1.5 sm:px-4 sm:py-2 text-[10px] sm:text-[11px] font-bold text-white hover:from-accent/90 hover:via-accent/80 hover:to-accent/70 transition-all shadow-[0_4px_20px_hsl(var(--accent)/0.4)] border border-accent/50"
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 6px 30px hsl(var(--accent) / 0.6)",
                  y: -2,
                }}
                whileTap={{ scale: 0.98 }}
                style={{ transformStyle: "preserve-3d" }}
              >
                <Linkedin className="w-3 h-3 mr-1.5" />
                LinkedIn
              </motion.a>
            </motion.div>

            {/* Proof line */}
            
          </motion.div>
        </div>
      </motion.div>
    </section>;
}