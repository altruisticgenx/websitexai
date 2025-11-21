import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Linkedin, Mail } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { InteractiveButton } from "./ui/interactive-button";

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const isMobile = useIsMobile();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });

  // Parallax - disabled on mobile for performance
  const yForeground = useTransform(scrollYProgress, [0, 1], isMobile ? ["0%", "0%"] : ["0%", "15%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  // Simple typing animation
  const fullText = "Local-First AI for Schools & Energy Systems";
  const [displayedText, setDisplayedText] = useState("");
  const [showCursor, setShowCursor] = useState(true);
  const [activeSector, setActiveSector] = useState<"energy" | "education" | null>(null);

  useEffect(() => {
    let currentIndex = 0;
    const typingInterval = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setDisplayedText(fullText.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(typingInterval);
      }
    }, 80);

    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 530);
    
    return () => {
      clearInterval(typingInterval);
      clearInterval(cursorInterval);
    };
  }, [fullText]);

  const sectorContent = {
    energy: {
      title: "Campus Energy AI",
      description: "Real-time monitoring, predictive analytics, automated optimization",
      badge: "Energy"
    },
    education: {
      title: "EdTech Assistant",
      description: "Student analytics, adaptive learning, automated grading",
      badge: "Education"
    }
  };

  return (
    <section 
      ref={ref} 
      id="home" 
      className="relative py-12 sm:py-16 md:py-24 overflow-hidden bg-gradient-to-br from-background via-background to-primary/5"
    >
      {/* Simplified gradient background */}
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.02]" aria-hidden="true" />
      
      <motion.div 
        style={{ y: yForeground, opacity }}
        className="relative mx-auto max-w-5xl px-4 sm:px-6"
      >
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center gap-2 mb-4 sm:mb-6">
              <span className="inline-block w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="text-xs sm:text-sm font-medium text-muted-foreground uppercase tracking-wider">
                Weekly AI Pilots
              </span>
            </div>
            
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4 sm:mb-6 leading-tight">
              {displayedText}
              <span 
                className="inline-block w-0.5 h-8 sm:h-10 md:h-12 bg-primary ml-1 align-middle"
                style={{ opacity: showCursor ? 1 : 0 }}
              />
            </h1>
            
            <p className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-2xl mx-auto mb-8 sm:mb-10 leading-relaxed">
              4-week pilots for campuses, nonprofits & civic teams.
              <br className="hidden sm:block" />
              Ship Week 1. No vendor lock-in. Keep the code.
            </p>
          </motion.div>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-8 sm:mb-12"
          >
            <InteractiveButton
              variant="primary"
              size="lg"
              haptic="medium"
              onClick={() => document.getElementById('pilot')?.scrollIntoView({ behavior: 'smooth' })}
              className="w-full sm:w-auto"
            >
              See Pilot Catalog
            </InteractiveButton>
            
            <InteractiveButton
              variant="outline"
              size="lg"
              haptic="light"
              onClick={() => document.getElementById('builds')?.scrollIntoView({ behavior: 'smooth' })}
              className="w-full sm:w-auto"
            >
              View Recent Builds
            </InteractiveButton>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex items-center justify-center gap-3"
          >
            <a
              href="https://www.linkedin.com/in/ik11/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center w-10 h-10 rounded-lg border border-border hover:border-primary hover:bg-primary/5 transition-all touch-manipulation"
              aria-label="LinkedIn profile"
            >
              <Linkedin className="w-4 h-4" />
            </a>
            <a
              href="https://us06web.zoom.us/launch/chat?src=direct_chat_link&email=altruisticxai@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center w-10 h-10 rounded-lg border border-border hover:border-primary hover:bg-primary/5 transition-all touch-manipulation"
              aria-label="Zoom chat"
            >
              <Mail className="w-4 h-4" />
            </a>
          </motion.div>
        </div>

        {/* Sector Switcher - Simplified */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="max-w-3xl mx-auto"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-6">
            {(["energy", "education"] as const).map((sector) => (
              <button
                key={sector}
                onClick={() => setActiveSector(activeSector === sector ? null : sector)}
                className="group relative rounded-xl border-2 border-border hover:border-primary bg-card p-4 sm:p-5 text-left transition-all touch-manipulation hover:shadow-lg"
              >
                <div className="flex items-start justify-between mb-2">
                  <span className="inline-block px-2 py-1 rounded-md bg-primary/10 text-primary text-xs font-medium">
                    {sectorContent[sector].badge}
                  </span>
                </div>
                <h3 className="text-base sm:text-lg font-semibold text-foreground mb-1">
                  {sectorContent[sector].title}
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground">
                  {sectorContent[sector].description}
                </p>
                
                {activeSector === sector && (
                  <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    className="absolute bottom-0 left-0 right-0 h-1 bg-primary rounded-b-xl"
                  />
                )}
              </button>
            ))}
          </div>

          {activeSector && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden"
            >
              <div className="rounded-xl border border-border bg-card/50 backdrop-blur-sm p-4 sm:p-6">
                <p className="text-sm text-foreground">
                  {activeSector === "energy" 
                    ? "Monitor campus energy use, predict demand spikes, automate HVAC schedules. Week 1: Live dashboard. Week 4: Pilot-ready optimization."
                    : "Track student progress, identify at-risk learners, automate grading workflows. Week 1: Analytics prototype. Week 4: Full integration."}
                </p>
              </div>
            </motion.div>
          )}
        </motion.div>
      </motion.div>
    </section>
  );
}
