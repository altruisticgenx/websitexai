import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Linkedin, Mail } from "lucide-react";
import { Hero3DBackground } from "./Hero3D";
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
  const [activeSector, setActiveSector] = useState<"energy" | "education" | "civic" | "climate" | "startups" | null>(null);

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

  // Intersection Observer for lazy loading 3D background
  useEffect(() => {
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
  }, [fullText]);

  // Initialize Audio Context
  useEffect(() => {
    if (typeof window !== 'undefined') {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    return () => {
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, []);

  // Play sound based on speed threshold
  const playSpeedSound = (speed: number) => {
    if (!audioContextRef.current) return;
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

  // Handle mouse movement for trail effect
  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!ref.current) return;
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
  return <section ref={ref} id="home" className="relative py-4 md:py-6 overflow-hidden bg-background gradient-mesh" onMouseMove={handleMouseMove}>
      {/* Mouse Trail Particles */}
      {trailParticles.map(particle => {
      const age = Date.now() - particle.timestamp;
      const lifespan = 1000; // 1 second
      const progress = age / lifespan;

      // Interpolate between primary (slow) and accent (fast) based on speed
      const speedRatio = Math.min(particle.speed / 3, 1); // Normalize to 0-1
      const primaryWeight = 1 - speedRatio;
      const accentWeight = speedRatio;

      // Dynamic color mixing between primary and accent
      const mixedColor = speedRatio < 0.5 ? `color-mix(in oklch, hsl(var(--primary)) ${(1 - speedRatio * 2) * 100}%, hsl(var(--accent)) ${speedRatio * 2 * 100}%)` : `color-mix(in oklch, hsl(var(--accent)) ${(speedRatio - 0.5) * 2 * 100}%, hsl(var(--primary)) ${(1 - (speedRatio - 0.5) * 2) * 100}%)`;
      return <motion.div key={particle.id} className="absolute w-2 h-2 rounded-full pointer-events-none" style={{
        left: particle.x,
        top: particle.y,
        background: speedRatio < 0.5 ? `radial-gradient(circle, hsl(var(--primary) / ${1 - progress}), transparent)` : `radial-gradient(circle, hsl(var(--accent) / ${1 - progress}), transparent)`,
        boxShadow: speedRatio < 0.5 ? `0 0 ${8 * (1 - progress)}px ${4 * (1 - progress)}px hsl(var(--primary) / ${0.6 * (1 - progress)})` : `0 0 ${12 * (1 - progress)}px ${6 * (1 - progress)}px hsl(var(--accent) / ${0.7 * (1 - progress)})`
      }} initial={{
        scale: 0,
        opacity: 1
      }} animate={{
        scale: [0, 1.5 + speedRatio * 0.5, 0],
        opacity: [1, 0.8, 0]
      }} transition={{
        duration: 1 - speedRatio * 0.3,
        ease: "easeOut"
      }} />;
    })}
      
      {/* 3D Animated Background - Lazy Loaded */}
      {shouldRender3D && <Hero3DBackground />}
      
      {/* Wavy Colorful Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <svg className="absolute w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="wave-gradient-1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{ stopColor: 'hsl(var(--primary))', stopOpacity: 0.15 }} />
              <stop offset="50%" style={{ stopColor: 'hsl(var(--accent))', stopOpacity: 0.15 }} />
              <stop offset="100%" style={{ stopColor: 'hsl(var(--primary))', stopOpacity: 0.15 }} />
            </linearGradient>
            <linearGradient id="wave-gradient-2" x1="100%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" style={{ stopColor: 'hsl(var(--accent))', stopOpacity: 0.1 }} />
              <stop offset="50%" style={{ stopColor: 'hsl(var(--primary))', stopOpacity: 0.1 }} />
              <stop offset="100%" style={{ stopColor: 'hsl(var(--accent))', stopOpacity: 0.1 }} />
            </linearGradient>
          </defs>
          <motion.path
            d="M0,50 Q250,100 500,50 T1000,50 T1500,50 T2000,50 V200 H0 Z"
            fill="url(#wave-gradient-1)"
            animate={{
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
          <motion.path
            d="M0,100 Q300,150 600,100 T1200,100 T1800,100 T2400,100 V300 H0 Z"
            fill="url(#wave-gradient-2)"
            animate={{
              d: [
                "M0,100 Q300,150 600,100 T1200,100 T1800,100 T2400,100 V300 H0 Z",
                "M0,130 Q300,80 600,130 T1200,130 T1800,130 T2400,130 V300 H0 Z",
                "M0,100 Q300,150 600,100 T1200,100 T1800,100 T2400,100 V300 H0 Z"
              ]
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1
            }}
          />
        </svg>
      </div>

      {/* Main Content with Parallax */}
      <motion.div className="relative z-10 px-4 py-3 mx-auto max-w-4xl" style={{
      y: yForeground,
      opacity
    }}>
        <div className="max-w-2xl mx-auto space-y-3">
          <motion.div initial={{
          opacity: 0,
          y: 30
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.8
        }}>
            {/* Tagline with Animated Dot */}
            <motion.div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-3 py-1 text-[10px] font-normal text-muted-foreground" initial={{
            opacity: 0,
            scale: 0.9
          }} animate={{
            opacity: 1,
            scale: 1
          }} transition={{
            duration: 0.5,
            delay: 0.3
          }} role="status" aria-label="Current service availability">
              <motion.span className="inline-flex h-1.5 w-1.5 rounded-full bg-primary" animate={{
              opacity: [1, 0.5, 1],
              scale: [1, 1.2, 1]
            }} transition={{
              duration: 2,
              repeat: Infinity
            }} aria-hidden="true" />
              <span className="font-mono">{'>'} Ship pilot-ready AI tech</span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1 className="mt-2 text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground tracking-tight leading-tight" initial={{
            opacity: 0,
            y: 20
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            duration: 0.6,
            delay: 0.5
          }}>
              Ship a working AI pilot in 2–6 weeks — without hiring.
            </motion.h1>

            {/* Subhead */}
            <motion.p className="mt-2 text-xs sm:text-sm text-muted-foreground max-w-xl" initial={{
            opacity: 0,
            y: 20
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            duration: 0.6,
            delay: 0.6
          }}>
              Senior AI + product execution for energy, education, and civic teams. First demo in Week 1.
            </motion.p>

            {/* Sector Tag Switcher - Compact 3D */}
            <motion.div className="mt-2 flex flex-wrap gap-1.5 items-center text-[8px]" initial={{
            opacity: 0,
            y: 20
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            duration: 0.6,
            delay: 0.6
          }}>
              <span className="text-muted-foreground font-mono">Focus:</span>
              
              {/* Energy - Hexagon Shape */}
              <motion.button className="relative px-2 py-0.5 rounded-md border border-emerald-500/50 bg-emerald-500/10 backdrop-blur-sm text-emerald-400 overflow-visible group transition-all" onMouseEnter={() => setActiveSector("energy")} onMouseLeave={() => setActiveSector(null)} whileHover={{
              scale: 1.1,
              rotateX: 5,
              rotateY: -5,
              borderColor: "rgb(16 185 129 / 0.8)"
            }} style={{
              transformStyle: "preserve-3d",
              perspective: "1000px",
              boxShadow: activeSector === "energy" ? "0 0 20px rgba(16, 185, 129, 0.4)" : "0 0 8px rgba(16, 185, 129, 0.2)"
            }}>
                <motion.div className="absolute inset-0 rounded-md bg-emerald-500 blur-lg -z-10" animate={{
                opacity: activeSector === "energy" ? [0.2, 0.5, 0.2] : 0.1,
                scale: activeSector === "energy" ? [1.1, 1.4, 1.1] : 1
              }} transition={{ duration: 1.5, repeat: Infinity }} />
                <span className="relative z-10 font-mono font-bold">Energy</span>
              </motion.button>
              
              {/* Education - Circle Shape */}
              <motion.button className="relative px-2 py-0.5 rounded-full border border-blue-500/50 bg-blue-500/10 backdrop-blur-sm text-blue-400 overflow-visible group transition-all" onMouseEnter={() => setActiveSector("education")} onMouseLeave={() => setActiveSector(null)} whileHover={{
              scale: 1.1,
              rotateX: -5,
              rotateY: 5,
              borderColor: "rgb(59 130 246 / 0.8)"
            }} style={{
              transformStyle: "preserve-3d",
              perspective: "1000px",
              boxShadow: activeSector === "education" ? "0 0 20px rgba(59, 130, 246, 0.4)" : "0 0 8px rgba(59, 130, 246, 0.2)"
            }}>
                <motion.div className="absolute inset-0 rounded-full bg-blue-500 blur-lg -z-10" animate={{
                opacity: activeSector === "education" ? [0.2, 0.5, 0.2] : 0.1,
                scale: activeSector === "education" ? [1.1, 1.4, 1.1] : 1
              }} transition={{ duration: 1.8, repeat: Infinity }} />
                <span className="relative z-10 font-mono font-bold">Education</span>
              </motion.button>
              
              {/* Civic - Square Shape */}
              <motion.button className="relative px-2 py-0.5 rounded-sm border border-violet-500/50 bg-violet-500/10 backdrop-blur-sm text-violet-400 overflow-visible group transition-all" onMouseEnter={() => setActiveSector("civic")} onMouseLeave={() => setActiveSector(null)} whileHover={{
              scale: 1.1,
              rotateX: 5,
              rotateZ: 2,
              borderColor: "rgb(139 92 246 / 0.8)"
            }} style={{
              transformStyle: "preserve-3d",
              perspective: "1000px",
              boxShadow: activeSector === "civic" ? "0 0 20px rgba(139, 92, 246, 0.4)" : "0 0 8px rgba(139, 92, 246, 0.2)"
            }}>
                <motion.div className="absolute inset-0 rounded-sm bg-violet-500 blur-lg -z-10" animate={{
                opacity: activeSector === "civic" ? [0.2, 0.5, 0.2] : 0.1,
                scale: activeSector === "civic" ? [1.1, 1.4, 1.1] : 1
              }} transition={{ duration: 2, repeat: Infinity }} />
                <span className="relative z-10 font-mono font-bold">Civic</span>
              </motion.button>
              
              {/* Climate - Rounded Square */}
              <motion.button className="relative px-2 py-0.5 rounded-lg border border-lime-500/50 bg-lime-500/10 backdrop-blur-sm text-lime-400 overflow-visible group transition-all" onMouseEnter={() => setActiveSector("climate")} onMouseLeave={() => setActiveSector(null)} whileHover={{
              scale: 1.1,
              rotateY: 5,
              rotateZ: -2,
              borderColor: "rgb(132 204 22 / 0.8)"
            }} style={{
              transformStyle: "preserve-3d",
              perspective: "1000px",
              boxShadow: activeSector === "climate" ? "0 0 20px rgba(132, 204, 22, 0.4)" : "0 0 8px rgba(132, 204, 22, 0.2)"
            }}>
                <motion.div className="absolute inset-0 rounded-lg bg-lime-500 blur-lg -z-10" animate={{
                opacity: activeSector === "climate" ? [0.2, 0.5, 0.2] : 0.1,
                scale: activeSector === "climate" ? [1.1, 1.4, 1.1] : 1
              }} transition={{ duration: 1.6, repeat: Infinity }} />
                <span className="relative z-10 font-mono font-bold">Climate</span>
              </motion.button>
              
              {/* Startups - Pill Shape */}
              <motion.button className="relative px-2 py-0.5 rounded-full border border-amber-500/50 bg-amber-500/10 backdrop-blur-sm text-amber-400 overflow-visible group transition-all" onMouseEnter={() => setActiveSector("startups")} onMouseLeave={() => setActiveSector(null)} whileHover={{
              scale: 1.1,
              rotateX: -5,
              rotateZ: 3,
              borderColor: "rgb(245 158 11 / 0.8)"
            }} style={{
              transformStyle: "preserve-3d",
              perspective: "1000px",
              boxShadow: activeSector === "startups" ? "0 0 20px rgba(245, 158, 11, 0.4)" : "0 0 8px rgba(245, 158, 11, 0.2)"
            }}>
                <motion.div className="absolute inset-0 rounded-full bg-amber-500 blur-lg -z-10" animate={{
                opacity: activeSector === "startups" ? [0.2, 0.5, 0.2] : 0.1,
                scale: activeSector === "startups" ? [1.1, 1.4, 1.1] : 1
              }} transition={{ duration: 2.2, repeat: Infinity }} />
                <span className="relative z-10 font-mono font-bold">Startups</span>
              </motion.button>
            </motion.div>

            {/* Dynamic Sector Description */}
            <motion.div className="mt-2 min-h-[32px]" initial={{
            opacity: 0
          }} animate={{
            opacity: 1
          }}>
              {activeSector === "energy" && <motion.p className="text-[9px] text-emerald-400/90 font-mono" initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 10 }} transition={{ duration: 0.3 }}>
                  → Grid optimization · Demand forecasting · Utility analytics
                </motion.p>}
              {activeSector === "education" && <motion.p className="text-[9px] text-blue-400/90 font-mono" initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 10 }} transition={{ duration: 0.3 }}>
                  → Personalized learning · Student privacy · Civic education
                </motion.p>}
              {activeSector === "civic" && <motion.p className="text-[9px] text-violet-400/90 font-mono" initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 10 }} transition={{ duration: 0.3 }}>
                  → Policy tracking · Public engagement · Transparency tools
                </motion.p>}
              {activeSector === "climate" && <motion.p className="text-[9px] text-lime-400/90 font-mono" initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 10 }} transition={{ duration: 0.3 }}>
                  → Carbon tracking · Sustainability metrics · Impact reporting
                </motion.p>}
              {activeSector === "startups" && <motion.p className="text-[9px] text-amber-400/90 font-mono" initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 10 }} transition={{ duration: 0.3 }}>
                  → MVP validation · Product-market fit · Growth experiments
                </motion.p>}
              {!activeSector && <motion.p className="max-w-xl text-xs text-muted-foreground" initial={{
              opacity: 0
            }} animate={{
              opacity: 1
            }}>
                  Privacy-first prototypes that help educators personalize learning and utilities optimize grids—without sending your data to Big Tech clouds.
                </motion.p>}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div 
              className="mt-3 flex flex-col gap-1.5 sm:flex-row sm:items-start" 
              style={{ perspective: "1000px" }}
              initial={{
                opacity: 0,
                y: 20
              }} 
              animate={{
                opacity: 1,
                y: 0
              }} 
              transition={{
                duration: 0.6,
                delay: 0.8
              }}
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
                  transition: { duration: 0.2 }
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
                  transition: { duration: 0.2 }
                }}
                whileTap={{ scale: 0.95 }}
              >
                <Linkedin className="w-2.5 h-2.5 mr-1 group-hover:animate-pulse" />
                LinkedIn
              </motion.a>
            </motion.div>

            {/* Proof line */}
            
          </motion.div>
        </div>
      </motion.div>
    </section>;
}