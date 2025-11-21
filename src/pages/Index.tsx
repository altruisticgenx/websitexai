import React, { useCallback, useEffect, useMemo, useRef, useState, Suspense, lazy } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { CaseStudiesStack } from "@/components/ui/animated-cards-stack";
import { PilotCard } from "@/components/PilotCard";
import { SocialProof } from "@/components/SocialProof";
import { HowItWorks } from "@/components/HowItWorks";
import { Hero } from "@/components/Hero";
import { LazySection } from "@/components/LazySection";
import { useSwipeGesture } from "@/hooks/use-swipe-gesture";
import { PerformanceIndicator } from "@/components/PerformanceIndicator";
import { ContentLoader, CardSkeleton } from "@/components/ContentLoader";

// Lazy load heavier, below-the-fold sections
const ShelvedExperiments = lazy(() => import("@/components/ShelvedExperiments").then(m => ({
  default: m.ShelvedExperiments
})));
const WhereIWork = lazy(() => import("@/components/WhereIWork").then(m => ({
  default: m.WhereIWork
})));
const OrganizationTypes = lazy(() => import("@/components/OrganizationTypes").then(m => ({
  default: m.OrganizationTypes
})));
const EngagementModels = lazy(() => import("@/components/EngagementModels").then(m => ({
  default: m.EngagementModels
})));
import { ScrollToTop } from "@/components/ScrollToTop";
import { ScrollProgress } from "@/components/ScrollProgress";
import { KeyboardShortcutsHelp } from "@/components/KeyboardShortcutsHelp";
import { SwipeIndicator } from "@/components/SwipeIndicator";
import { useKeyboardNavigation } from "@/hooks/use-keyboard-navigation";
import { cn } from "@/lib/utils";
import { supabase } from "@/integrations/supabase/client";
import { SiteNav } from "@/components/SiteNav";
import { HeroSkeleton, CardsSkeleton, StepsSkeleton, TwoColumnSkeleton } from "@/components/skeletons/SectionSkeleton";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

// -----------------------------
// Main Page Component
// -----------------------------
const Index: React.FC = () => {
  const prefersReducedMotion = useReducedMotion();

  // Avoid flicker on first paint; hydrate with a tiny stored flag
  const [isBootLoading, setBootLoading] = useState(() => !safeLocalStorageGet("contentLoaded"));

  // Keep stable ref of section ids for swipe/keyboard nav
  const sectionIdsRef = useRef<string[]>(["builds", "pilot", "benefits", "org-types", "where", "shelved", "about"]);
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);

  // Simulate initial load once for first-time visitors
  useEffect(() => {
    if (!safeLocalStorageGet("contentLoaded")) {
      const t = window.setTimeout(() => {
        setBootLoading(false);
        safeLocalStorageSet("contentLoaded", "true");
      }, 700); // faster perceived load, mobile-first
      return () => window.clearTimeout(t);
    }
    setBootLoading(false);
  }, []);

  // Swipe gesture support (mobile-first)
  const swipeRef = useSwipeGesture<HTMLDivElement>({
    onSwipeUp: () => navigateSection(1),
    onSwipeDown: () => navigateSection(-1),
    threshold: 72
  });
  const navigateSection = useCallback((delta: number) => {
    const ids = sectionIdsRef.current;
    const next = Math.max(0, Math.min(ids.length - 1, currentSectionIndex + delta));
    if (next !== currentSectionIndex) {
      setCurrentSectionIndex(next);
      const el = document.getElementById(ids[next]);
      el?.scrollIntoView({
        behavior: prefersReducedMotion ? "auto" : "smooth",
        block: "start"
      });
    }
  }, [currentSectionIndex, prefersReducedMotion]);

  // Keyboard quick-jumps (1..8)
  useKeyboardNavigation([{
    key: "1",
    sectionId: "builds",
    name: "Builds"
  }, {
    key: "2",
    sectionId: "pilot",
    name: "4-Week Pilot"
  }, {
    key: "3",
    sectionId: "benefits",
    name: "Who Benefits"
  }, {
    key: "4",
    sectionId: "org-types",
    name: "Organization Types"
  }, {
    key: "5",
    sectionId: "where",
    name: "Where I Work"
  }, {
    key: "6",
    sectionId: "shelved",
    name: "Shelved Experiments"
  }, {
    key: "7",
    sectionId: "testimonials",
    name: "Testimonials"
  }, {
    key: "8",
    sectionId: "about",
    name: "About"
  }]);
  return <div ref={swipeRef} className="min-h-screen text-slate-50 antialiased">
      <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:rounded-md focus:bg-slate-800 focus:px-3 focus:py-2">
        Skip to content
      </a>

      <ScrollProgress />
      <SiteNav />

      {/* Enhanced Content Frame with Modern Layout */}
      <div className="relative mx-auto flex min-h-screen max-w-7xl flex-col px-3 sm:px-4 lg:px-6">
        {/* Content Shadow/Glow Effect */}
        <div className="pointer-events-none absolute inset-0 rounded-3xl bg-gradient-to-b from-primary/5 via-transparent to-accent/5 opacity-30 blur-xl" />
        <main id="main-content" className="relative flex-1 pt-2 sm:pt-4 snap-container" role="main">
          {isBootLoading ? <div className="animate-pulse">
              <HeroSkeleton />
              <CardsSkeleton />
              <StepsSkeleton />
              <TwoColumnSkeleton />
              <StepsSkeleton count={2} />
              <CardsSkeleton count={3} />
            </div> : <motion.div initial={{
          opacity: 0
        }} animate={{
          opacity: 1
        }} transition={{
          duration: prefersReducedMotion ? 0 : 0.4
        }}>
              <Hero />
              
              <SocialProof />
              
              
              
              <RecentBuilds />

              <LazySection>
                <TypicalProgression />
              </LazySection>

              <LazySection>
                <PilotOffer />
              </LazySection>

              <LazySection>
                <WhoBenefits />
              </LazySection>

              <Suspense fallback={<div className="h-64 rounded-2xl bg-slate-900/60" aria-busy="true" aria-live="polite" />}>
                <LazySection>
                  <OrganizationTypes />
                </LazySection>
              </Suspense>

              <Suspense fallback={<div className="h-64 rounded-2xl bg-slate-900/60" aria-busy="true" aria-live="polite" />}>
                <LazySection>
                  <WhereIWork />
                </LazySection>
              </Suspense>

              <Suspense fallback={<div className="h-64 rounded-2xl bg-slate-900/60" aria-busy="true" aria-live="polite" />}>
                <LazySection>
                  <ShelvedExperiments />
                </LazySection>
              </Suspense>

              <LazySection>
                <AboutMe />
              </LazySection>
            </motion.div>}
        </main>
        <SiteFooter />
      </div>

      <ScrollToTop />
      <KeyboardShortcutsHelp />
      <SwipeIndicator />
      <PerformanceIndicator />
    </div>;
};
export default Index;

// -----------------------------
// Sub-Components (optimized & mobile-first)
// -----------------------------

type FeatureItem = {
  title: string;
  desc: string;
  color: "emerald" | "cyan" | "teal" | "blue";
  icon: string;
  example: string;
};
const FeatureCardWithTooltip: React.FC<{
  item: FeatureItem;
  index: number;
}> = React.memo(({
  item,
  index
}) => {
  const prefersReducedMotion = useReducedMotion();
  const [isTouched, setIsTouched] = useState(false);
  
  const colorClasses = useMemo(() => {
    switch (item.color) {
      case "emerald":
        return {
          border: "border-emerald-400/40 hover:border-emerald-400/70",
          gradient: "from-emerald-500/20 via-teal-500/10 to-green-500/20",
          shadow: "shadow-emerald-500/20"
        };
      case "cyan":
        return {
          border: "border-cyan-400/40 hover:border-cyan-400/70",
          gradient: "from-cyan-500/20 via-blue-500/10 to-teal-500/20",
          shadow: "shadow-cyan-500/20"
        };
      case "teal":
        return {
          border: "border-teal-400/40 hover:border-teal-400/70",
          gradient: "from-teal-500/20 via-emerald-500/10 to-cyan-500/20",
          shadow: "shadow-teal-500/20"
        };
      default:
        return {
          border: "border-blue-400/40 hover:border-blue-400/70",
          gradient: "from-blue-500/20 via-indigo-500/10 to-violet-500/20",
          shadow: "shadow-blue-500/20"
        };
    }
  }, [item.color]);
  
  return <Tooltip open={isTouched ? true : undefined}>
      <TooltipTrigger asChild>
        <motion.button 
          type="button" 
          initial={{
            opacity: 0,
            scale: 0.95
          }} 
          whileInView={{
            opacity: 1,
            scale: 1
          }} 
          viewport={{
            once: true
          }} 
          transition={{
            duration: prefersReducedMotion ? 0 : 0.3,
            delay: index * 0.05
          }} 
          whileHover={prefersReducedMotion ? undefined : {
            y: -6,
            rotateX: 2,
            rotateY: -2,
            scale: 1.02,
            transition: { duration: 0.3, ease: "easeOut" }
          }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setIsTouched(!isTouched)}
          onMouseEnter={() => setIsTouched(false)}
          style={{ 
            transformStyle: "preserve-3d",
            perspective: "1000px"
          }}
          className={cn(
            "group relative w-full overflow-hidden rounded-lg border bg-gradient-to-br backdrop-blur-sm p-2.5 sm:p-3 transition-all cursor-pointer",
            "touch-manipulation focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50",
            "hover:shadow-xl shadow-lg",
            colorClasses.border,
            colorClasses.gradient,
            colorClasses.shadow,
            "before:absolute before:inset-0 before:rounded-lg before:bg-gradient-to-br before:from-white/5 before:to-transparent before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-300"
          )} 
          aria-label={`${item.title} – ${item.desc}. Tap to see example.`}
        >
          {/* 3D Depth Effect */}
          <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-transparent via-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          <div className="relative z-10 flex items-start gap-1.5">
            <span className="text-base sm:text-lg flex-shrink-0 mt-0.5" aria-hidden="true">{item.icon}</span>
            <div className="flex-1 min-w-0 text-left">
              <h4 className="mb-0.5 text-[10px] sm:text-[11px] font-bold text-foreground leading-tight line-clamp-2">{item.title}</h4>
              <p className="text-[9px] sm:text-[10px] leading-snug text-muted-foreground line-clamp-2 sm:line-clamp-3">{item.desc}</p>
            </div>
          </div>
          
          {/* Touch indicator for mobile */}
          <div className="absolute bottom-1 right-1 text-[8px] text-muted-foreground/50 sm:hidden">
            Tap
          </div>
        </motion.button>
      </TooltipTrigger>
      <TooltipContent 
        side="top" 
        className="max-w-[260px] sm:max-w-[320px] bg-slate-900/95 backdrop-blur-sm border-primary/30 p-3"
        onPointerDownOutside={(e) => {
          if (isTouched) {
            e.preventDefault();
            setIsTouched(false);
          }
        }}
      >
        <p className="text-[10px] sm:text-xs leading-relaxed text-slate-200">
          <span className="font-semibold text-primary">Real Example:</span> {item.example}
        </p>
      </TooltipContent>
    </Tooltip>;
});
FeatureCardWithTooltip.displayName = "FeatureCardWithTooltip";
const RecentBuilds: React.FC = React.memo(() => {
  const [projects, setProjects] = useState<Array<{
    id: string;
    title: string;
    sector: string;
    summary: string;
    tag: string;
  }>>([]);
  const [isLoadingProjects, setIsLoadingProjects] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Helper functions to map project data to PilotCard props
  const getSectorAudience = (sector: string): string => {
    const audienceMap: Record<string, string> = {
      "Education Nonprofit": "Education teams",
      "Founder-Backed Startup": "B2B Startups",
      "Solo Founder": "Solo Founders",
      "Climate & Energy": "Energy teams"
    };
    return audienceMap[sector] || "Organizations";
  };
  const getProjectProblem = (id: string): string => {
    const problemMap: Record<string, string> = {
      "sales-copilot": "Manual follow-ups drowning the team, missing high-intent leads",
      "founder-os": "5 tools, constant context-switching, scattered client data",
      "energy-analytics": "200+ buildings, data chaos, no visibility into savings",
      "edtech-portal": "15+ pilots tracked in spreadsheets, funding reports take weeks"
    };
    return problemMap[id] || "Complex operational challenges requiring AI solutions";
  };
  const getProjectOutcome = (id: string): string => {
    const outcomeMap: Record<string, string> = {
      "sales-copilot": "65% less manual work, 2.3x conversion rate",
      "founder-os": "Saved 4+ hours/week, 5 tools → 1 interface",
      "energy-analytics": "$180k+ savings identified in first month",
      "edtech-portal": "Secured $500k funding with data-backed reports"
    };
    return outcomeMap[id] || "Measurable operational improvements";
  };
  const getTimeToDemo = (id: string): string => {
    const timeMap: Record<string, string> = {
      "sales-copilot": "Week 1 demo",
      "founder-os": "Week 1 demo",
      "energy-analytics": "Week 1 dashboard",
      "edtech-portal": "Week 1 portal"
    };
    return timeMap[id] || "Week 1";
  };
  const mapProjects = useCallback((rows: any[] | null) => {
    return (rows ?? []).map(p => ({
      id: p.slug,
      title: p.title,
      sector: p.sector,
      summary: p.summary,
      tag: p.tag || ""
    }));
  }, []);
  const fetchProjects = useCallback(async () => {
    try {
      setIsLoadingProjects(true);
      const {
        data,
        error: fetchError
      } = await supabase.from("projects").select("slug, title, sector, summary, tag").eq("featured", true).order("display_order", {
        ascending: true
      });
      if (fetchError) throw fetchError;
      setProjects(prev => {
        const next = mapProjects(data);
        // Avoid unnecessary re-renders
        return shallowArrayEqual(prev, next) ? prev : next;
      });
      setError(null);
    } catch (e) {
      console.error("Error fetching projects:", e);
      setError("Failed to load projects");
    } finally {
      setIsLoadingProjects(false);
    }
  }, [mapProjects]);
  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  // Realtime subscription (cleanly)
  useEffect(() => {
    const channel = supabase.channel("projects-changes").on("postgres_changes", {
      event: "*",
      schema: "public",
      table: "projects"
    }, fetchProjects).subscribe();
    return () => {
      supabase.removeChannel(channel);
    };
  }, [fetchProjects]);
  return <section id="builds" className="relative py-8 sm:py-10 lg:py-14 snap-section">
      {/* Section Background Glow */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent opacity-50" />
      
      <div className="relative mx-auto w-full max-w-6xl px-3 sm:px-4">
        <motion.div initial={{
        opacity: 0,
        y: 20
      }} whileInView={{
        opacity: 1,
        y: 0
      }} viewport={{
        once: true
      }} transition={{
        duration: 0.4
      }} className="space-y-2 sm:space-y-3 mb-4 sm:mb-6">
          <h2 className="heading-3 text-foreground">Recent Builds</h2>
          <p className="body-base text-muted-foreground max-w-2xl">
            Small scope, real results—across energy, education, and founder projects.
          </p>
        </motion.div>

        <ContentLoader isLoading={isLoadingProjects} fallback={<CardSkeleton count={4} />}>
          {error ? (
            <motion.div initial={{
              opacity: 0,
              y: 20
            }} animate={{
              opacity: 1,
              y: 0
            }} className="mt-6 rounded-2xl border border-red-400/20 bg-red-400/10 p-6 text-center" role="alert" aria-live="polite">
              <p className="text-sm text-red-300">{error}</p>
              <button onClick={fetchProjects} className="mt-3 text-xs underline text-red-400 hover:text-red-300">
                Try again
              </button>
            </motion.div>
          ) : projects.length === 0 ? (
            <motion.div initial={{
              opacity: 0,
              y: 20
            }} animate={{
              opacity: 1,
              y: 0
            }} className="mt-6 rounded-2xl border border-slate-800/80 bg-slate-900/60 p-8 text-center">
              <p className="text-sm text-slate-400">No projects available yet. Check back soon!</p>
            </motion.div>
          ) : (
            <motion.div initial={{
              opacity: 0,
              y: 20
            }} whileInView={{
              opacity: 1,
              y: 0
            }} viewport={{
              once: true
            }} transition={{
              duration: 0.5,
              delay: 0.1
            }} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 mt-4 sm:mt-6">
              {projects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, scale: 0.92, y: 10 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ 
                    duration: 0.4, 
                    delay: index * 0.08,
                    ease: [0.34, 1.56, 0.64, 1]
                  }}
                >
                  <PilotCard
                    id={project.id}
                    title={project.title}
                    sector={project.sector}
                    whoFor={getSectorAudience(project.sector)}
                    problem={getProjectProblem(project.id)}
                    outcome={getProjectOutcome(project.id)}
                    timeToDemo={getTimeToDemo(project.id)}
                    tag={project.tag}
                  />
                </motion.div>
              ))}
            </motion.div>
          )}
        </ContentLoader>
      </div>
    </section>;
});
RecentBuilds.displayName = "RecentBuilds";
const PilotOffer: React.FC = React.memo(() => {
  return <section id="pilot" className="relative border-t border-white/5 py-8 sm:py-10 lg:py-14 snap-section" aria-labelledby="pilot-heading">
      {/* Section Background with Subtle Card Effect */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-accent/5 to-transparent opacity-40" />
      
      <div className="relative mx-auto w-full max-w-6xl space-y-6 sm:space-y-8 px-3 sm:px-4">
        <motion.div initial={{
        opacity: 0,
        y: 20
      }} whileInView={{
        opacity: 1,
        y: 0
      }} viewport={{
        once: true
      }} transition={{
        duration: 0.4
      }} className="space-y-6">
          <h2 id="pilot-heading" className="heading-3 text-foreground">Why a Pilot Partner Instead of Hiring In-House</h2>
          <ul className="max-w-3xl space-y-4">
            {["Hiring in-house makes sense once you know what you're scaling. When you're still in the \"is this even the right thing?\" phase, it's a slow and expensive way to find out.", "Bringing on a full-time senior hire typically means months of recruiting, six-figure commitments, and added overhead—before you even know if the pilot is worth scaling.", "My model is different: You bring a real problem, we design a small, honest experiment, and within a few weeks you have something you can show to leadership, funders, or partners—plus a clearer sense of what to do next."].map((text, i) => <motion.li key={i} initial={{
            opacity: 0,
            x: -10
          }} whileInView={{
            opacity: 1,
            x: 0
          }} viewport={{
            once: true
          }} transition={{
            duration: 0.35,
            delay: i * 0.08
          }} className={cn("flex items-start gap-2 body-base leading-relaxed", i === 2 ? "text-foreground font-medium" : "text-muted-foreground")}>
                <span className="mt-0.5 text-xs text-primary">•</span>
                <span>{text}</span>
              </motion.li>)}
          </ul>
        </motion.div>

        <motion.div initial={{
        opacity: 0,
        y: 20
      }} whileInView={{
        opacity: 1,
        y: 0
      }} viewport={{
        once: true
      }} transition={{
        duration: 0.45,
        delay: 0.1
      }} className="space-y-3 sm:space-y-4">
          <h3 className="heading-4 text-primary">What This Model Is For</h3>
          <p className="text-[10px] sm:text-xs text-muted-foreground">Tap cards to see real examples</p>
          <TooltipProvider delayDuration={160}>
            <div className="grid gap-2 sm:gap-3 grid-cols-2 lg:grid-cols-4">
              {[{
              title: "Early, ambiguous work",
              desc: "When the edges are fuzzy and you need to learn by shipping, not by planning.",
              color: "emerald",
              icon: "🧭",
              example: "AI Sales Copilot: Started with messy CRM exports and unclear goals. Week 1: data flow. Week 2: first dashboard. Week 4: auto-prioritized leads ready for demo."
            }, {
              title: "Complex domains",
              desc: "Energy, education, civic systems, compliance—places where policy, people, and tech collide.",
              color: "cyan",
              icon: "⚡",
              example: "Energy Analytics Pilot: 200+ campus meters, Excel chaos. Built real-time dashboard showing savings opportunities across policy, billing, and operations."
            }, {
              title: "Proof, not promises",
              desc: "You need visible movement and credible artifacts, not another strategy deck.",
              color: "teal",
              icon: "✓",
              example: "EdTech Portal: Education nonprofit needed evidence for funders. 4 weeks: working pilot tracking outcomes. Result: defended funding with real data."
            }, {
              title: "Lean, collaborative teams",
              desc: "You're comfortable working in short cycles, reacting to real results, and adjusting quickly.",
              color: "blue",
              icon: "⚙",
              example: "Founder OS: Solo founder needed operational clarity. Weekly async Looms, quick pivots. Built unified scheduling, CRM, and invoicing—calm founder cockpit."
            }].map((item, i) => <FeatureCardWithTooltip key={item.title} item={item as any} index={i} />)}
            </div>
          </TooltipProvider>
        </motion.div>

        <motion.div initial={{
        opacity: 0,
        y: 20
      }} whileInView={{
        opacity: 1,
        y: 0
      }} viewport={{
        once: true
      }} transition={{
        duration: 0.45,
        delay: 0.2
      }} className="space-y-4">
          <h3 className="heading-4 text-muted-foreground">What This Model Is Not For</h3>
          <div className="rounded-lg border border-slate-800/70 bg-slate-950/50 p-5">
            <ul className="body-base space-y-3 text-slate-400">
              {["Large, multi-team implementations from day one", 'Long-term headcount decisions disguised as "pilots"', "Purely cosmetic work where a static site or brochure would do"].map(t => <li key={t} className="flex items-start gap-2">
                  <span className="mt-0.5 opacity-50">✕</span>
                  <span>{t}</span>
                </li>)}
            </ul>
          </div>
        </motion.div>

        <motion.div initial={{
        opacity: 0,
        y: 20
      }} whileInView={{
        opacity: 1,
        y: 0
      }} viewport={{
        once: true
      }} transition={{
        duration: 0.4,
        delay: 0.25
      }} className="rounded-lg border border-primary/30 bg-gradient-to-br from-primary/5 to-slate-950/80 p-5 backdrop-blur-sm">
          <p className="heading-5 mb-3 text-foreground">Pilot-first, learning-first approach</p>
          <p className="body-base leading-relaxed text-muted-foreground">
            Small scope, honest results, and no long-term lock-in until you know what's actually worth scaling.
          </p>
        </motion.div>
      </div>
    </section>;
});
PilotOffer.displayName = "PilotOffer";
const TypicalProgression: React.FC = React.memo(() => {
  return <section className="relative border-t border-white/5 py-8 sm:py-10 lg:py-14 snap-section">
      {/* Vibrant Section Glow */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-violet-500/5 via-transparent to-blue-500/5 opacity-50" />
      
      <div className="relative mx-auto w-full max-w-6xl px-3 sm:px-4">
        <motion.div initial={{
        opacity: 0,
        y: 20
      }} whileInView={{
        opacity: 1,
        y: 0
      }} viewport={{
        once: true
      }} transition={{
        duration: 0.4
      }} className="space-y-2">
          <h2 className="heading-3 text-foreground">Typical Progression</h2>
          <p className="body-base text-muted-foreground">Start small, scale when ready—or jump to any stage.</p>
        </motion.div>

        <div className="mt-6 grid gap-4 grid-cols-1 sm:grid-cols-2 xl:grid-cols-4">
          {[{
          title: "1. Pilot",
          sub: "4 weeks",
          body: "Ship 1–2 features/week. Demo-ready code. Real builds, not decks.",
          ring: "emerald"
        }, {
          title: "2. Proposal",
          sub: "1–2 weeks",
          body: "Scope doc, timeline, budget. Grant-ready, stakeholder-approved. RFP support.",
          ring: "blue"
        }, {
          title: "3. Build",
          sub: "2–6 months",
          body: "Full product delivery. Integrations, testing, documentation. Launch-ready.",
          ring: "violet"
        }, {
          title: "4. Retainer",
          sub: "Ongoing",
          body: "Monthly support. Bug fixes, features, pivots. Always-on expertise.",
          ring: "orange"
        }].map((step, i) => <motion.div key={step.title} initial={{
          opacity: 0,
          scale: 0.95
        }} whileInView={{
          opacity: 1,
          scale: 1
        }} viewport={{
          once: true
        }} transition={{
          duration: 0.45,
          delay: 0.08 * i
        }} className={cn("group rounded-lg border-2 p-4 backdrop-blur-sm transition-all", step.ring === "emerald" && "border-emerald-500/50 bg-gradient-to-br from-emerald-500/20 to-teal-500/20", step.ring === "blue" && "border-blue-500/50 bg-gradient-to-br from-blue-500/20 to-indigo-500/20", step.ring === "violet" && "border-violet-500/50 bg-gradient-to-br from-violet-500/20 to-purple-500/20", step.ring === "orange" && "border-orange-500/50 bg-gradient-to-br from-orange-500/20 to-amber-500/20")}>
              <div className="mb-2 flex items-center gap-2">
                <span className="body-base font-bold text-slate-100">{step.title}</span>
                <span className="body-sm text-slate-200/80">{step.sub}</span>
              </div>
              <p className="body-base leading-snug text-slate-200/90">{step.body}</p>
            </motion.div>)}
        </div>
      </div>
    </section>;
});
TypicalProgression.displayName = "TypicalProgression";
const WhoBenefits: React.FC = React.memo(() => {
  const audiences = useMemo(() => ["Students bringing new ideas to life", "Teachers or nonprofits piloting campus or impact projects", "Boards and governance teams needing clearer dashboards", "Solo founders wanting operational peace of mind", "B2B units innovating on tight timelines"], []);
  return <section id="benefits" className="relative border-t border-white/5 py-8 sm:py-10 lg:py-14 snap-section">
      {/* Section Accent Glow */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 opacity-40" />
      
      <div className="relative mx-auto w-full max-w-6xl px-3 sm:px-4">
        <motion.div initial={{
        opacity: 0,
        y: 20
      }} whileInView={{
        opacity: 1,
        y: 0
      }} viewport={{
        once: true
      }} transition={{
        duration: 0.4
      }} className="space-y-2">
          <h2 className="heading-3 text-foreground">Who Benefits?</h2>
          <p className="body-base leading-relaxed text-muted-foreground">
            This model is for anyone who needs{" "}
            <span className="font-medium text-primary">tangible progress without hiring overhead</span>.
          </p>
        </motion.div>

        <div className="mt-6 grid gap-4 grid-cols-1 sm:grid-cols-2">
          <motion.div initial={{
          opacity: 0,
          x: -20
        }} whileInView={{
          opacity: 1,
          x: 0
        }} viewport={{
          once: true
        }} transition={{
          duration: 0.4,
          delay: 0.1
        }} className="rounded-xl border border-slate-800/70 bg-slate-950/50 p-5">
            <h3 className="heading-5 mb-4 text-primary">Perfect For</h3>
            <ul className="body-base space-y-3 text-slate-200">
              {audiences.map(aud => <li key={aud} className="flex items-start gap-2">
                  <span className="mt-0.5 text-primary">✓</span>
                  {aud}
                </li>)}
            </ul>
          </motion.div>

          <motion.div initial={{
          opacity: 0,
          x: 20
        }} whileInView={{
          opacity: 1,
          x: 0
        }} viewport={{
          once: true
        }} transition={{
          duration: 0.4,
          delay: 0.15
        }} className="space-y-6 rounded-xl border border-slate-800/70 bg-slate-950/50 p-5">
            <div>
              <h3 className="heading-5 mb-3 text-primary">Ideal Fit</h3>
              <p className="body-base text-slate-200">Weekly feedback, ready to experiment, need clear results</p>
            </div>
            <div>
              <h3 className="heading-5 mb-3 text-slate-400">Not a Fit</h3>
              <p className="body-base text-slate-400">Big static sites, slow-moving teams, no feedback loop</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>;
});
WhoBenefits.displayName = "WhoBenefits";
const AboutMe: React.FC = React.memo(() => {
  return <section id="about" className="relative border-t border-white/5 py-8 sm:py-10 lg:py-14 snap-section">
      {/* Final Section Glow */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-primary/10 via-transparent to-transparent opacity-50" />
      
      <div className="relative mx-auto w-full max-w-6xl space-y-8 sm:space-y-10 px-3 sm:px-4">
        <motion.div initial={{
        opacity: 0,
        y: 20
      }} whileInView={{
        opacity: 1,
        y: 0
      }} viewport={{
        once: true
      }} transition={{
        duration: 0.5
      }} className="space-y-3">
          <h2 className="heading-3 text-foreground">About Me</h2>
          <motion.p className="body-lg max-w-3xl text-muted-foreground" initial={{
          opacity: 0,
          y: 10
        }} whileInView={{
          opacity: 1,
          y: 0
        }} viewport={{
          once: true
        }} transition={{
          duration: 0.5,
          delay: 0.1
        }}>
            I aim to close the gap between proven innovations and implementation by giving anyone the tools to turn
            regional data, successful pilots, and stalled legislation into AI-assisted solutions for any sector.
          </motion.p>
        </motion.div>

        <motion.div className="relative" initial={{
        opacity: 0,
        y: 30
      }} whileInView={{
        opacity: 1,
        y: 0
      }} viewport={{
        once: true
      }} transition={{
        duration: 0.6,
        delay: 0.1
      }}>
          <article className="relative overflow-hidden rounded-xl border border-slate-800/70 bg-gradient-to-br from-slate-950/95 via-slate-900/95 to-slate-950/95 p-5 shadow-2xl backdrop-blur-xl">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-transparent to-cyan-500/5" aria-hidden="true" />
            <div className="relative z-10">
              <h3 id="why-matters-heading" className="heading-4 text-foreground">Why This Matters</h3>
              <motion.p className="body-sm mt-2 text-muted-foreground" initial={{
              opacity: 0,
              y: 10
            }} whileInView={{
              opacity: 1,
              y: 0
            }} viewport={{
              once: true
            }} transition={{
              duration: 0.5,
              delay: 0.2
            }}>
                Pennsylvania cannot afford another decade of:
              </motion.p>
              <ul className="mt-3 space-y-1.5" role="list" aria-label="Challenges Pennsylvania faces">
                {["Delayed modernization while comparable states advance", "Legislative gridlock on education and infrastructure", "Workforce development disconnected from regional needs", "Civics education that feels irrelevant to students", "Declining trust in public institutions"].map(t => <li key={t} className="caption flex items-start gap-2 text-muted-foreground/90">
                    <span className="mt-1 inline-block h-1 w-1 flex-shrink-0 rounded-full bg-emerald-400/70" aria-hidden="true" />
                    <span className="flex-1">{t}</span>
                  </li>)}
              </ul>
              <div className="mt-5 border-t border-slate-800/50 pt-4">
                <p className="body-base font-medium leading-relaxed text-foreground">
                  This work provides the missing infrastructure for a state with all the necessary components but no
                  system connecting them.
                </p>
              </div>
            </div>
          </article>
        </motion.div>
      </div>
    </section>;
});
AboutMe.displayName = "AboutMe";
const SiteFooter: React.FC = React.memo(() => {
  return <footer className="relative border-t border-white/10 bg-slate-950/80 backdrop-blur-sm py-4 sm:py-5">
      <div className="body-sm flex flex-col items-start justify-between gap-2 text-slate-400 sm:flex-row sm:items-center px-3 sm:px-4">
        <div>© {new Date().getFullYear()} AltruisticX AI</div>
        <div className="flex flex-wrap gap-2">
          <span>Async · privacy-aware · built for pilots</span>
        </div>
      </div>
    </footer>;
});
SiteFooter.displayName = "SiteFooter";

// -----------------------------
// Utilities
// -----------------------------
function safeLocalStorageGet(key: string): string | null {
  try {
    return typeof window !== "undefined" ? window.localStorage.getItem(key) : null;
  } catch {
    return null;
  }
}
function safeLocalStorageSet(key: string, value: string): void {
  try {
    if (typeof window !== "undefined") window.localStorage.setItem(key, value);
  } catch {}
}
function shallowArrayEqual<T extends {
  [k: string]: any;
}>(a: T[], b: T[]): boolean {
  if (a === b) return true;
  if (a.length !== b.length) return false;
  for (let i = 0; i < a.length; i++) {
    const aa = a[i];
    const bb = b[i];
    if (!aa || !bb) return false;
    const keys = new Set([...Object.keys(aa), ...Object.keys(bb)]);
    for (const k of keys) if (aa[k] !== bb[k]) return false;
  }
  return true;
}