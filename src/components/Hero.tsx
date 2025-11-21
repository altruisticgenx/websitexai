import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useReducedMotion, AnimatePresence } from "framer-motion";
import { Terminal, Activity, Zap, GraduationCap, Building2, ArrowRight } from "lucide-react";
import { HeroScene } from "./HeroScene";
import { TimeLapseHero } from "./TimeLapseHero";

// --- TYPES & CONFIG ---
const audienceVariants = {
  default: {
    tagline: "Week 1 demo · Week 4 handoff",
    headline: "Pilot-ready AI.",
    subhead: "Shipped fast.",
    supporting: "I turn \"we should do something with this data\" into dashboards + automations people actually use.",
    color: "text-blue-400",
    icon: <Activity className="w-4 h-4" />
  },
  startup: {
    tagline: "Fast · Lean · Production-ready",
    headline: "Ship production-lean AI",
    subhead: "in 4 weeks.",
    supporting: "Your data's already telling you what to build. I help you listen fast.",
    color: "text-purple-400",
    icon: <Terminal className="w-4 h-4" />
  },
  energy: {
    tagline: "Real-time · Local-first · Savings",
    headline: "Find savings your meters",
    subhead: "already know about.",
    supporting: "Real-time energy dashboards + alerts in 4 weeks, local-first by default.",
    color: "text-emerald-400",
    icon: <Zap className="w-4 h-4" />
  },
  education: {
    tagline: "Student-first · Evidence-based",
    headline: "Turn school data into",
    subhead: "decisions people trust.",
    supporting: "Attendance, facilities, learning signals → clear dashboards + gentle automations.",
    color: "text-amber-400",
    icon: <GraduationCap className="w-4 h-4" />
  },
  civic: {
    tagline: "Privacy-first · Transparent",
    headline: "Make public ops smarter",
    subhead: "without being creepy.",
    supporting: "Privacy-first AI for infrastructure, policy, and community workflows.",
    color: "text-rose-400",
    icon: <Building2 className="w-4 h-4" />
  }
} as const;
type AudienceType = keyof typeof audienceVariants;
export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const {
    scrollYProgress
  } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });

  // --- STATE ---
  // Initialize from URL, but allow manual overrides
  const [activeAudience, setActiveAudience] = useState<AudienceType>('default');
  const [isMobile, setIsMobile] = useState(false);
  const [shouldRender3D, setShouldRender3D] = useState(false);

  // Load URL param on mount only
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const param = params.get('audience')?.toLowerCase();
      if (param && param in audienceVariants) {
        setActiveAudience(param as AudienceType);
      }
      setIsMobile(window.innerWidth < 768);
    }
  }, []);
  const copy = audienceVariants[activeAudience];

  // --- ANIMATIONS ---
  const yForeground = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  // Only render 3D on desktop and when user hasn't requested reduced motion
  useEffect(() => {
    if (isMobile || prefersReducedMotion) return;
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
  }, [shouldRender3D, isMobile, prefersReducedMotion]);

  // Radar Scan Effect (Background)
  const RadarOverlay = () => <div className="absolute inset-0 overflow-hidden pointer-events-none">
       <motion.div className="absolute w-full h-[2px] bg-gradient-to-r from-transparent via-primary/30 to-transparent" animate={{
      top: ["0%", "100%"],
      opacity: [0, 1, 0]
    }} transition={{
      duration: 3,
      repeat: Infinity,
      ease: "linear"
    }} />
       <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-[0.03]" />
    </div>;
  return <section ref={ref} className="relative min-h-screen flex flex-col items-center pt-20 overflow-hidden bg-slate-950">
      
      {/* 1. SYSTEM STATUS BAR (Top of Hero) */}
      <div className="absolute top-0 left-0 right-0 h-10 bg-slate-900/50 border-b border-slate-800 flex items-center justify-between px-4 text-[10px] uppercase tracking-widest text-slate-500 font-mono z-20 backdrop-blur-sm">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" /> 
            System: Online
          </span>
          <span className="hidden sm:inline">Latency: 14ms</span>
        </div>
        <div className="flex gap-4">
           <span className="hidden sm:inline">Build: v2.4.0</span>
           <span className="text-primary">Ready for Pilot</span>
        </div>
      </div>

      {/* 2. BACKGROUNDS */}
      {!isMobile && !prefersReducedMotion && shouldRender3D && <HeroScene />}
      <RadarOverlay />
      
      {/* Gradient fallback */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-950/90 to-slate-900 pointer-events-none -z-10" />

      {/* 3. MAIN CONTENT */}
      <motion.div style={{
      y: isMobile ? 0 : yForeground,
      opacity
    }} className="relative z-10 w-full max-w-7xl px-4 sm:px-6 flex flex-col items-center gap-6 sm:gap-8 mt-12 sm:mt-16 lg:mt-20">
        
        {/* SECTOR SELECTOR (Interactive Pills) */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-2.5">
          {(Object.keys(audienceVariants) as AudienceType[]).map(key => <button key={key} onClick={() => setActiveAudience(key)} className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-all border min-h-[44px] sm:min-h-0 ${activeAudience === key ? "bg-slate-800 border-slate-600 text-white shadow-lg scale-105" : "bg-transparent border-transparent text-slate-500 hover:text-slate-300 hover:bg-slate-900"}`}>
              {key === 'default' ? 'All Sectors' : key.charAt(0).toUpperCase() + key.slice(1)}
            </button>)}
        </div>

        {/* DYNAMIC TEXT HEADER */}
        <div className="max-w-3xl mx-auto text-center space-y-4 sm:space-y-6 mt-4 sm:mt-0">
          <AnimatePresence mode="wait">
            <motion.div key={activeAudience} initial={{
            opacity: 0,
            y: 20
          }} animate={{
            opacity: 1,
            y: 0
          }} exit={{
            opacity: 0,
            y: -20
          }} transition={{
            duration: 0.3
          }}>
              {/* Tagline */}
              <div className={`inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded border border-slate-800 bg-slate-900/50 backdrop-blur-md text-[10px] sm:text-xs font-mono mb-4 sm:mb-6 ${copy.color}`}>
                {copy.icon}
                <span className="uppercase tracking-wider">{copy.tagline}</span>
              </div>

              {/* Headline */}
              <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-[1.1] px-4 sm:px-0">
                {copy.headline} <br />
                <span className={`transparent bg-clip-text bg-gradient-to-r from-white to-slate-500 ${copy.color.replace('text-', 'text-')}`}>
                  {copy.subhead}
                </span>
              </h1>

              {/* Supporting Text */}
              <p className="mt-4 sm:mt-6 text-base sm:text-lg text-slate-400 max-w-xl mx-auto leading-relaxed px-4 sm:px-0">
                {copy.supporting}
              </p>
            </motion.div>
          </AnimatePresence>

          {/* CTAs */}
          <motion.div initial={{
          opacity: 0
        }} animate={{
          opacity: 1
        }} transition={{
          delay: 0.4
        }} className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-stretch sm:items-center pt-4 sm:pt-6 w-full sm:w-auto px-4 sm:px-0">
            <a href="https://us06web.zoom.us/launch/chat?src=direct_chat_link&email=altruisticxai@gmail.com" target="_blank" rel="noopener noreferrer" className="group relative inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-3.5 text-sm font-bold text-slate-950 bg-white rounded-full overflow-hidden transition-transform active:scale-95 hover:scale-105 w-full sm:w-auto min-h-[44px]">
              <span className="relative z-10 flex items-center gap-2">
                Start a Pilot <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-white via-slate-200 to-white opacity-0 group-hover:opacity-100 transition-opacity" />
            </a>
            
            <button onClick={() => document.getElementById('builds')?.scrollIntoView({
            behavior: 'smooth'
          })} className="px-6 sm:px-8 py-3 sm:py-3.5 text-sm font-medium text-slate-400 hover:text-white transition-colors w-full sm:w-auto min-h-[44px]">
              View Case Studies
            </button>
          </motion.div>
        </div>

        {/* COMPONENT SLOT: TIMELAPSE HERO 
            (Only shows on default to avoid clutter, or acts as main visual) */}
        {activeAudience === 'default' && (
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="w-full mt-8 sm:mt-12 border-t border-slate-800/50 pt-8 sm:pt-12"
          >
            <TimeLapseHero />
          </motion.div>
        )}

      </motion.div>
    </section>;
}