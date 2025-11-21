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
  const fullText = "Ship a working AI pilot in 2–6 weeks — without hiring.";
  const [displayedText, setDisplayedText] = useState("");
  const [showCursor, setShowCursor] = useState(true);
  
  // Sector switcher state
  const [activeSector, setActiveSector] = useState<"energy" | "education" | null>(null);
  
  // Mouse trail particles state
  const [trailParticles, setTrailParticles] = useState<TrailParticle[]>([]);
  const particleIdRef = useRef(0);
  const lastMousePos = useRef({ x: 0, y: 0, timestamp: 0 });
  const lastSoundTime = useRef(0);
  const audioContextRef = useRef<AudioContext | null>(null);
  
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
    
    lastMousePos.current = { x, y, timestamp: now };
    
    const newParticle: TrailParticle = {
      id: particleIdRef.current++,
      x,
      y,
      timestamp: now,
      speed,
    };
    
    setTrailParticles(prev => [...prev, newParticle]);
  };

  // Clean up old particles
  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();
      setTrailParticles(prev => 
        prev.filter(particle => now - particle.timestamp < 1000)
      );
    }, 100);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <section 
      ref={ref} 
      id="home" 
      className="relative py-8 md:py-12 overflow-hidden bg-background gradient-mesh"
      onMouseMove={handleMouseMove}
    >
      {/* Mouse Trail Particles */}
      {trailParticles.map((particle) => {
        const age = Date.now() - particle.timestamp;
        const lifespan = 1000; // 1 second
        const progress = age / lifespan;
        
        // Interpolate between primary (slow) and accent (fast) based on speed
        const speedRatio = Math.min(particle.speed / 3, 1); // Normalize to 0-1
        const primaryWeight = 1 - speedRatio;
        const accentWeight = speedRatio;
        
        // Dynamic color mixing between primary and accent
        const mixedColor = speedRatio < 0.5 
          ? `color-mix(in oklch, hsl(var(--primary)) ${(1 - speedRatio * 2) * 100}%, hsl(var(--accent)) ${speedRatio * 2 * 100}%)`
          : `color-mix(in oklch, hsl(var(--accent)) ${((speedRatio - 0.5) * 2) * 100}%, hsl(var(--primary)) ${(1 - (speedRatio - 0.5) * 2) * 100}%)`;
        
        return (
          <motion.div
            key={particle.id}
            className="absolute w-2 h-2 rounded-full pointer-events-none"
            style={{
              left: particle.x,
              top: particle.y,
              background: speedRatio < 0.5
                ? `radial-gradient(circle, hsl(var(--primary) / ${1 - progress}), transparent)`
                : `radial-gradient(circle, hsl(var(--accent) / ${1 - progress}), transparent)`,
              boxShadow: speedRatio < 0.5
                ? `0 0 ${8 * (1 - progress)}px ${4 * (1 - progress)}px hsl(var(--primary) / ${0.6 * (1 - progress)})`
                : `0 0 ${12 * (1 - progress)}px ${6 * (1 - progress)}px hsl(var(--accent) / ${0.7 * (1 - progress)})`,
            }}
            initial={{ scale: 0, opacity: 1 }}
            animate={{ 
              scale: [0, 1.5 + (speedRatio * 0.5), 0],
              opacity: [1, 0.8, 0],
            }}
            transition={{ 
              duration: 1 - (speedRatio * 0.3),
              ease: "easeOut",
            }}
          />
        );
      })}
      
      {/* 3D Animated Background - Lazy Loaded */}
      {shouldRender3D && <Hero3DBackground />}
      
      {/* Matrix Rain Effect - Optimized */}
      <div className="absolute inset-0 opacity-10 pointer-events-none overflow-hidden">
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-px bg-gradient-to-b from-transparent via-primary to-transparent"
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
          className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/20 to-transparent animate-pulse"
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
              className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-2.5 py-1 text-[9px] sm:text-[10px] font-normal text-muted-foreground"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <motion.span
                className="inline-flex h-1.5 w-1.5 rounded-full bg-primary"
                animate={{ opacity: [1, 0.5, 1], scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <span className="font-mono">Real pilots · Real results</span>
            </motion.div>

            {/* Main Headline with Terminal Typing */}
            <motion.h1
              className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight relative font-mono text-reveal text-reveal-delay-1"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <span className="relative inline-block">
                <span className="relative z-10 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                  {displayedText}
                  <motion.span
                    className="inline-block w-[0.4em] h-[0.9em] bg-primary ml-1"
                    animate={{ opacity: showCursor ? 1 : 0 }}
                    transition={{ duration: 0 }}
                  />
                </span>
                <motion.span
                  className="absolute inset-0 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent blur-sm"
                  animate={{ opacity: [0.5, 0.8, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  {displayedText}
                </motion.span>
              </span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              className="mt-4 text-sm sm:text-base text-muted-foreground max-w-2xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
            >
              Senior AI + product execution for energy, education, and civic teams. First demo in Week 1.
            </motion.p>

            {/* Call-to-Action Buttons */}
            <motion.div
              className="mt-6 flex flex-col sm:flex-row gap-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.9 }}
            >
              <motion.a
                href="mailto:hello@altruisticxai.com"
                className="w-full sm:w-auto group relative overflow-hidden rounded-lg bg-gradient-to-r from-primary via-accent to-primary px-6 py-3 text-sm font-semibold text-slate-950 shadow-lg transition-all hover:shadow-xl hover:shadow-primary/30 touch-manipulation min-h-[44px] flex items-center justify-center"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-accent via-primary to-accent opacity-0 group-hover:opacity-100 transition-opacity"
                  animate={{ x: ['-100%', '100%'] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                />
                <span className="relative z-10">Book a 20-min Pilot Fit Call</span>
              </motion.a>

              <motion.a
                href="/portfolio"
                className="w-full sm:w-auto group relative overflow-hidden rounded-lg border border-primary/40 bg-card/60 backdrop-blur-sm px-6 py-3 text-sm font-medium text-foreground transition-all hover:border-primary/60 hover:bg-card/80 touch-manipulation min-h-[44px] flex items-center justify-center"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="relative z-10">See Live Experiments</span>
              </motion.a>
            </motion.div>

            {/* Proof Line */}
            <motion.p
              className="mt-4 text-xs text-muted-foreground/80"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.0 }}
            >
              Pilots shipped with UNE, school teams, city ops, and founders.
            </motion.p>

            {/* Social Links */}
            <motion.div 
              className="flex items-center gap-3 mt-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 1.1 }}
            >
              <motion.a
                href="https://www.linkedin.com/in/christopherblairpa/"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-primary/30 bg-card/60 backdrop-blur-sm p-2 text-foreground transition-all hover:border-primary/60 hover:bg-card/80 touch-manipulation min-h-[44px] min-w-[44px] flex items-center justify-center"
                whileHover={{ scale: 1.05, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
              >
                <Linkedin className="h-4 w-4" />
              </motion.a>
              <motion.a
                href="mailto:hello@altruisticxai.com"
                className="rounded-full border border-primary/30 bg-card/60 backdrop-blur-sm p-2 text-foreground transition-all hover:border-primary/60 hover:bg-card/80 touch-manipulation min-h-[44px] min-w-[44px] flex items-center justify-center"
                whileHover={{ scale: 1.05, rotate: -5 }}
                whileTap={{ scale: 0.95 }}
              >
                <Mail className="h-4 w-4" />
              </motion.a>
              
              <motion.a
                href="https://www.linkedin.com/in/ik11/"
                target="_blank"
                rel="noopener noreferrer"
                className="relative inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-lg border-2 border-accent/40 bg-card/60 backdrop-blur-sm px-5 py-3 body-base font-mono text-foreground overflow-hidden group shadow-[0_3px_0_0_hsl(var(--accent)/0.3)] active:shadow-[0_1px_0_0_hsl(var(--accent)/0.3)] active:translate-y-[2px] transition-all"
                whileHover={{
                  scale: 1.03,
                  rotateX: -5,
                  rotateY: -5,
                  borderColor: "hsl(var(--accent) / 0.6)",
                  boxShadow: "0 5px 0 0 hsl(var(--accent) / 0.3), 0 6px 15px -3px hsl(var(--accent) / 0.3)"
                }}
                whileTap={{ scale: 0.97, translateY: 2 }}
                style={{ transformStyle: "preserve-3d", perspective: "1000px" }}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-accent/0 via-accent/20 to-accent/0"
                  animate={{ x: ['-200%', '200%'] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-accent/10 to-transparent rounded-lg" />
                <Linkedin className="h-3 w-3 relative z-10" />
                <span className="relative z-10">LinkedIn</span>
              </motion.a>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
