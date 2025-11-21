import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  lazy,
} from "react";
import { motion, useReducedMotion } from "framer-motion";
import { PilotCard } from "@/components/PilotCard";
import { SocialProof } from "@/components/SocialProof";
import { Hero } from "@/components/Hero";
import { LazySection } from "@/components/LazySection";
import { useSwipeGesture } from "@/hooks/use-swipe-gesture";
import { PerformanceIndicator } from "@/components/PerformanceIndicator";
import { ContentLoader, CardSkeleton } from "@/components/ContentLoader";
import { ScrollToTop } from "@/components/ScrollToTop";
import { ScrollProgress } from "@/components/ScrollProgress";
import { KeyboardShortcutsHelp } from "@/components/KeyboardShortcutsHelp";
import { SwipeIndicator } from "@/components/SwipeIndicator";
import { useKeyboardNavigation } from "@/hooks/use-keyboard-navigation";
import { cn } from "@/lib/utils";
import { supabase } from "@/integrations/supabase/client";
import { SiteNav } from "@/components/SiteNav";
import {
  HeroSkeleton,
  CardsSkeleton,
  StepsSkeleton,
  TwoColumnSkeleton,
} from "@/components/skeletons/SectionSkeleton";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

// layout primitives
import { Section } from "@/components/layout/Section";
import { Stack } from "@/components/layout/Stack";

// Lazy load heavier, below-the-fold sections
const ShelvedExperiments = lazy(() =>
  import("@/components/ShelvedExperiments").then((m) => ({
    default: m.ShelvedExperiments,
  }))
);
const WhereIWork = lazy(() =>
  import("@/components/WhereIWork").then((m) => ({
    default: m.WhereIWork,
  }))
);
const OrganizationTypes = lazy(() =>
  import("@/components/OrganizationTypes").then((m) => ({
    default: m.OrganizationTypes,
  }))
);
const EngagementModels = lazy(() =>
  import("@/components/EngagementModels").then((m) => ({
    default: m.EngagementModels,
  }))
);

// -----------------------------
// Main Page Component
// -----------------------------
const Index: React.FC = () => {
  const prefersReducedMotion = useReducedMotion();

  const [isBootLoading, setBootLoading] = useState(
    () => !safeLocalStorageGet("contentLoaded")
  );

  const sectionIdsRef = useRef<string[]>([
    "builds",
    "pilot",
    "benefits",
    "org-types",
    "where",
    "shelved",
    "testimonials",
    "about",
  ]);
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);

  useEffect(() => {
    if (!safeLocalStorageGet("contentLoaded")) {
      const t = window.setTimeout(() => {
        setBootLoading(false);
        safeLocalStorageSet("contentLoaded", "true");
      }, 700);
      return () => window.clearTimeout(t);
    }
    setBootLoading(false);
  }, []);

  const navigateSection = useCallback(
    (delta: number) => {
      const ids = sectionIdsRef.current;
      const next = Math.max(
        0,
        Math.min(ids.length - 1, currentSectionIndex + delta)
      );
      if (next !== currentSectionIndex) {
        setCurrentSectionIndex(next);
        const el = document.getElementById(ids[next]);
        el?.scrollIntoView({
          behavior: prefersReducedMotion ? "auto" : "smooth",
          block: "start",
        });
      }
    },
    [currentSectionIndex, prefersReducedMotion]
  );

  const swipeRef = useSwipeGesture<HTMLDivElement>({
    onSwipeUp: () => navigateSection(1),
    onSwipeDown: () => navigateSection(-1),
    threshold: 72,
  });

  useKeyboardNavigation([
    { key: "1", sectionId: "builds", name: "Builds" },
    { key: "2", sectionId: "pilot", name: "4-Week Pilot" },
    { key: "3", sectionId: "benefits", name: "Who Benefits" },
    { key: "4", sectionId: "org-types", name: "Organization Types" },
    { key: "5", sectionId: "where", name: "Where I Work" },
    { key: "6", sectionId: "shelved", name: "Shelved Experiments" },
    { key: "7", sectionId: "testimonials", name: "Testimonials" },
    { key: "8", sectionId: "about", name: "About" },
  ]);

  return (
    <div
      ref={swipeRef}
      className={cn(
        "min-h-screen text-slate-50 antialiased selection:bg-primary/30 selection:text-white",
        // richer background wash
        "bg-[radial-gradient(80%_60%_at_50%_-10%,rgba(14,165,233,0.14),transparent_60%),radial-gradient(70%_50%_at_85%_0%,rgba(16,185,129,0.12),transparent_55%),radial-gradient(60%_45%_at_0%_10%,rgba(99,102,241,0.14),transparent_55%)]",
        "bg-slate-950"
      )}
    >
      {/* subtle noise overlay */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-0 opacity-[0.05] mix-blend-soft-light [background-image:url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%22120%22 height=%22120%22 viewBox=%220 0 120 120%22><filter id=%22n%22><feTurbulence type=%22fractalNoise%22 baseFrequency=%220.9%22 numOctaves=%222%22 stitchTiles=%22stitch%22/></filter><rect width=%22120%22 height=%22120%22 filter=%22url(%23n)%22 opacity=%220.4%22/></svg>')]" 
      />

      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:rounded-md focus:bg-slate-800 focus:px-3 focus:py-2"
      >
        Skip to content
      </a>

      <ScrollProgress />
      <SiteNav />

      <main
        id="main-content"
        className="relative z-10 pt-16"
        role="main"
        aria-busy={isBootLoading}
      >
        {isBootLoading ? (
          <div className="animate-pulse">
            <HeroSkeleton />
            <CardsSkeleton />
            <StepsSkeleton />
            <TwoColumnSkeleton />
            <StepsSkeleton count={2} />
            <CardsSkeleton count={3} />
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.45 }}
          >
            <Hero />
            <SocialProof />
            <RecentBuilds />

            <LazySection minHeight={360}>
              <TypicalProgression />
            </LazySection>

            <LazySection minHeight={520}>
              <PilotOffer />
            </LazySection>

            <LazySection minHeight={420}>
              <WhoBenefits />
            </LazySection>

            <LazySection minHeight={420}>
              <OrganizationTypes />
            </LazySection>

            <LazySection minHeight={420}>
              <WhereIWork />
            </LazySection>

            <LazySection minHeight={420}>
              <ShelvedExperiments />
            </LazySection>

            <LazySection minHeight={520}>
              <AboutMe />
            </LazySection>

            <LazySection minHeight={420}>
              <EngagementModels />
            </LazySection>
          </motion.div>
        )}
      </main>

      <SiteFooter />

      <ScrollToTop />
      <KeyboardShortcutsHelp />
      <SwipeIndicator />
      <PerformanceIndicator />
    </div>
  );
};

export default Index;

// -----------------------------
// Sub-Components
// -----------------------------

type FeatureItem = {
  title: string;
  desc: string;
  color: "emerald" | "cyan" | "teal" | "blue";
  icon: string;
  example: string;
};

const FeatureCardWithTooltip: React.FC<{ item: FeatureItem; index: number }> =
  React.memo(({ item, index }) => {
    const prefersReducedMotion = useReducedMotion();
    const [isTouched, setIsTouched] = useState(false);

    const colorClasses = useMemo(() => {
      switch (item.color) {
        case "emerald":
          return {
            ring: "ring-emerald-400/30 hover:ring-emerald-400/60",
            border: "border-emerald-400/30 hover:border-emerald-300/70",
            gradient:
              "from-emerald-500/25 via-teal-500/10 to-green-500/25",
            glow: "shadow-[0_0_40px_-18px_rgba(16,185,129,0.8)]",
          };
        case "cyan":
          return {
            ring: "ring-cyan-400/30 hover:ring-cyan-300/60",
            border: "border-cyan-400/30 hover:border-cyan-300/70",
            gradient: "from-cyan-500/25 via-blue-500/10 to-teal-500/25",
            glow: "shadow-[0_0_40px_-18px_rgba(56,189,248,0.8)]",
          };
        case "teal":
          return {
            ring: "ring-teal-400/30 hover:ring-teal-300/60",
            border: "border-teal-400/30 hover:border-teal-300/70",
            gradient:
              "from-teal-500/25 via-emerald-500/10 to-cyan-500/25",
            glow: "shadow-[0_0_40px_-18px_rgba(45,212,191,0.8)]",
          };
        default:
          return {
            ring: "ring-blue-400/30 hover:ring-blue-300/60",
            border: "border-blue-400/30 hover:border-blue-300/70",
            gradient:
              "from-blue-500/25 via-indigo-500/10 to-violet-500/25",
            glow: "shadow-[0_0_40px_-18px_rgba(59,130,246,0.8)]",
          };
      }
    }, [item.color]);

    return (
      <Tooltip open={isTouched ? true : undefined}>
        <TooltipTrigger asChild>
          <motion.button
            type="button"
            initial={{ opacity: 0, scale: 0.96, y: 6 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, margin: "-10% 0% -10% 0%" }}
            transition={{
              duration: prefersReducedMotion ? 0 : 0.35,
              delay: index * 0.05,
            }}
            whileHover={
              prefersReducedMotion
                ? undefined
                : {
                    y: -6,
                    rotateX: 2,
                    rotateY: -2,
                    scale: 1.03,
                    transition: { duration: 0.25, ease: "easeOut" },
                  }
            }
            whileTap={{ scale: 0.98 }}
            onClick={() => setIsTouched((v) => !v)}
            onMouseEnter={() => setIsTouched(false)}
            onBlur={() => setIsTouched(false)}
            className={cn(
              "group relative w-full overflow-hidden rounded-xl border bg-gradient-to-br backdrop-blur-sm",
              "p-3 sm:p-4 md:p-5 transition-all cursor-pointer",
              "ring-1",
              "focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/60",
              colorClasses.ring,
              colorClasses.border,
              colorClasses.gradient,
              colorClasses.glow,
              "before:absolute before:inset-0 before:rounded-xl before:bg-gradient-to-br before:from-white/10 before:via-white/0 before:to-transparent before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-300"
            )}
            aria-expanded={isTouched}
            aria-label={`${item.title} – ${item.desc}. Tap to see example.`}
          >
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-[radial-gradient(120%_100%_at_10%_0%,rgba(255,255,255,0.08),transparent_60%)]" />

            <div className="relative z-10 flex items-start gap-2.5">
              <span
                className="text-xl sm:text-2xl leading-none flex-shrink-0 mt-0.5"
                aria-hidden="true"
              >
                {item.icon}
              </span>
              <div className="flex-1 min-w-0 text-left">
                <h4 className="heading-5 mb-1.5 line-clamp-2">
                  {item.title}
                </h4>
                <p className="body-sm text-muted-foreground leading-snug line-clamp-3">
                  {item.desc}
                </p>
              </div>
            </div>

            <div className="absolute bottom-2 right-2 caption text-muted-foreground/70 sm:hidden">
              Tap
            </div>
          </motion.button>
        </TooltipTrigger>

        <TooltipContent
          side="top"
          sideOffset={8}
          className="max-w-[280px] sm:max-w-[360px] bg-slate-900/95 backdrop-blur-md border-primary/30 p-3.5"
          onPointerDownOutside={(e) => {
            if (isTouched) {
              e.preventDefault();
              setIsTouched(false);
            }
          }}
        >
          <p className="body-sm leading-relaxed text-slate-200">
            <span className="font-semibold text-primary">Real Example:</span>{" "}
            {item.example}
          </p>
        </TooltipContent>
      </Tooltip>
    );
  });

FeatureCardWithTooltip.displayName = "FeatureCardWithTooltip";

// -----------------------------
// Recent Builds
// -----------------------------
const RecentBuilds: React.FC = React.memo(() => {
  const [projects, setProjects] = useState<
    Array<{
      id: string;
      title: string;
      sector: string;
      summary: string;
      tag: string;
    }>
  >([]);
  const [isLoadingProjects, setIsLoadingProjects] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const getSectorAudience = (sector: string): string => {
    const audienceMap: Record<string, string> = {
      "Education Nonprofit": "Education teams",
      "Founder-Backed Startup": "B2B Startups",
      "Solo Founder": "Solo Founders",
      "Climate & Energy": "Energy teams",
    };
    return audienceMap[sector] || "Organizations";
  };

  const getProjectProblem = (id: string): string => {
    const problemMap: Record<string, string> = {
      "sales-copilot":
        "Manual follow-ups drowning the team, missing high-intent leads",
      "founder-os":
        "5 tools, constant context-switching, scattered client data",
      "energy-analytics":
        "200+ buildings, data chaos, no visibility into savings",
      "edtech-portal":
        "15+ pilots tracked in spreadsheets, funding reports take weeks",
    };
    return (
      problemMap[id] ||
      "Complex operational challenges requiring AI solutions"
    );
  };

  const getProjectOutcome = (id: string): string => {
    const outcomeMap: Record<string, string> = {
      "sales-copilot": "65% less manual work, 2.3x conversion rate",
      "founder-os": "Saved 4+ hours/week, 5 tools → 1 interface",
      "energy-analytics": "$180k+ savings identified in first month",
      "edtech-portal": "Secured $500k funding with data-backed reports",
    };
    return outcomeMap[id] || "Measurable operational improvements";
  };

  const getTimeToDemo = (id: string): string => {
    const timeMap: Record<string, string> = {
      "sales-copilot": "Week 1 demo",
      "founder-os": "Week 1 demo",
      "energy-analytics": "Week 1 dashboard",
      "edtech-portal": "Week 1 portal",
    };
    return timeMap[id] || "Week 1";
  };

  const mapProjects = useCallback((rows: any[] | null) => {
    return (rows ?? []).map((p) => ({
      id: p.slug,
      title: p.title,
      sector: p.sector,
      summary: p.summary,
      tag: p.tag || "",
    }));
  }, []);

  const fetchProjects = useCallback(async () => {
    try {
      setIsLoadingProjects(true);
      const { data, error: fetchError } = await supabase
        .from("projects")
        .select("slug, title, sector, summary, tag")
        .eq("featured", true)
        .order("display_order", { ascending: true });

      if (fetchError) throw fetchError;

      setProjects((prev) => {
        const next = mapProjects(data);
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

  useEffect(() => {
    const channel = supabase
      .channel("projects-changes")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "projects" },
        fetchProjects
      )
      .subscribe();
    return () => {
      supabase.removeChannel(channel);
    };
  }, [fetchProjects]);

  return (
    <Section id="builds" border="top" className="scroll-mt-24">
      <Stack>
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          className="space-y-2 max-w-2xl"
        >
          <h2 className="heading-2 text-foreground">
            Recent Builds
            <span className="ml-2 inline-block h-1.5 w-1.5 rounded-full bg-primary align-middle" />
          </h2>
          <p className="body-lg text-muted-foreground">
            Small scope, real results—across energy, education, and founder projects.
          </p>
        </motion.div>

        <ContentLoader
          isLoading={isLoadingProjects}
          fallback={<CardSkeleton count={4} />}
        >
          {error ? (
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-2xl border border-red-400/20 bg-red-400/10 p-6 text-center"
              role="alert"
              aria-live="polite"
            >
              <p className="body-sm text-red-300">{error}</p>
              <button
                onClick={fetchProjects}
                className="mt-3 caption underline text-red-400 hover:text-red-300"
              >
                Try again
              </button>
            </motion.div>
          ) : projects.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-2xl border border-slate-800/80 bg-slate-900/60 p-8 text-center"
            >
              <p className="body-sm text-slate-400">
                No projects available yet. Check back soon!
              </p>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: 0.06 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6"
            >
              {projects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, scale: 0.97 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
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
      </Stack>
    </Section>
  );
});

RecentBuilds.displayName = "RecentBuilds";

// -----------------------------
// Pilot Offer
// -----------------------------
const PilotOffer: React.FC = React.memo(() => {
  return (
    <Section id="pilot" border="top" aria-labelledby="pilot-heading" className="scroll-mt-24">
      <Stack gap="lg">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          className="space-y-6"
        >
          <h2 id="pilot-heading" className="heading-2 text-foreground">
            Why a Pilot Partner Instead of Hiring In-House
          </h2>

          <ul className="max-w-3xl space-y-4">
            {[
              `Hiring in-house makes sense once you know what you're scaling. When you're still in the "is this even the right thing?" phase, it's a slow and expensive way to find out.`,
              `Bringing on a full-time senior hire typically means months of recruiting, six-figure commitments, and added overhead—before you even know if the pilot is worth scaling.`,
              `My model is different: You bring a real problem, we design a small, honest experiment, and within a few weeks you have something you can show to leadership, funders, or partners—plus a clearer sense of what to do next.`,
            ].map((text, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -8 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: i * 0.08 }}
                className={cn(
                  "flex items-start gap-2 body-base leading-relaxed",
                  i === 2
                    ? "text-foreground font-medium"
                    : "text-muted-foreground"
                )}
              >
                <span className="mt-1 text-primary">•</span>
                <span>{text}</span>
              </motion.li>
            ))}
          </ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, delay: 0.05 }}
          className="space-y-4"
        >
          <h3 className="heading-3 text-primary">What This Model Is For</h3>
          <p className="body-sm text-muted-foreground">
            Tap cards to see real examples
          </p>

          <TooltipProvider delayDuration={160}>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {[
                {
                  title: "Early, ambiguous work",
                  desc: "When the edges are fuzzy and you need to learn by shipping, not by planning.",
                  color: "emerald",
                  icon: "🧭",
                  example:
                    "AI Sales Copilot: Started with messy CRM exports and unclear goals. Week 1: data flow. Week 2: first dashboard. Week 4: auto-prioritized leads ready for demo.",
                },
                {
                  title: "Complex domains",
                  desc: "Energy, education, civic systems, compliance—places where policy, people, and tech collide.",
                  color: "cyan",
                  icon: "⚡",
                  example:
                    "Energy Analytics Pilot: 200+ campus meters, Excel chaos. Built real-time dashboard showing savings opportunities across policy, billing, and operations.",
                },
                {
                  title: "Proof, not promises",
                  desc: "You need visible movement and credible artifacts, not another strategy deck.",
                  color: "teal",
                  icon: "✓",
                  example:
                    "EdTech Portal: Education nonprofit needed evidence for funders. 4 weeks: working pilot tracking outcomes. Result: defended funding with real data.",
                },
                {
                  title: "Lean, collaborative teams",
                  desc: "You're comfortable working in short cycles, reacting to real results, and adjusting quickly.",
                  color: "blue",
                  icon: "⚙",
                  example:
                    "Founder OS: Solo founder needed operational clarity. Weekly async Looms, quick pivots. Built unified scheduling, CRM, and invoicing—calm founder cockpit.",
                },
              ].map((item, i) => (
                <FeatureCardWithTooltip
                  key={item.title}
                  item={item as FeatureItem}
                  index={i}
                />
              ))}
            </div>
          </TooltipProvider>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, delay: 0.12 }}
          className="space-y-4"
        >
          <h3 className="heading-3 text-muted-foreground">
            What This Model Is Not For
          </h3>

          <div className="rounded-xl border border-slate-800/70 bg-slate-950/50 p-6">
            <ul className="body-base space-y-3 text-slate-400">
              {[
                "Large, multi-team implementations from day one",
                'Long-term headcount decisions disguised as "pilots"',
                "Purely cosmetic work where a static site or brochure would do",
              ].map((t) => (
                <li key={t} className="flex items-start gap-2">
                  <span className="mt-0.5 opacity-50">✕</span>
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, delay: 0.18 }}
          className="rounded-xl border border-primary/35 bg-gradient-to-br from-primary/10 via-slate-950/70 to-slate-950/90 p-6 backdrop-blur-sm"
        >
          <p className="heading-5 mb-2 text-foreground">
            Pilot-first, learning-first approach
          </p>
          <p className="body-base leading-relaxed text-muted-foreground">
            Small scope, honest results, and no long-term lock-in until you
            know what's actually worth scaling.
          </p>
        </motion.div>
      </Stack>
    </Section>
  );
});

PilotOffer.displayName = "PilotOffer";

// -----------------------------
// Typical Progression
// -----------------------------
const TypicalProgression: React.FC = React.memo(() => {
  return (
    <Section id="progression" border="top" className="scroll-mt-24">
      <Stack>
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          className="space-y-2 max-w-2xl"
        >
          <h2 className="heading-2 text-foreground">Typical Progression</h2>
          <p className="body-lg text-muted-foreground">
            Start small, scale when ready—or jump to any stage.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {[
            {
              title: "1. Pilot",
              sub: "4 weeks",
              body:
                "Ship 1–2 features/week. Demo-ready code. Real builds, not decks.",
              ring: "emerald",
            },
            {
              title: "2. Proposal",
              sub: "1–2 weeks",
              body:
                "Scope doc, timeline, budget. Grant-ready, stakeholder-approved. RFP support.",
              ring: "blue",
            },
            {
              title: "3. Build",
              sub: "2–6 months",
              body:
                "Full product delivery. Integrations, testing, documentation. Launch-ready.",
              ring: "violet",
            },
            {
              title: "4. Retainer",
              sub: "Ongoing",
              body:
                "Monthly support. Bug fixes, features, pivots. Always-on expertise.",
              ring: "orange",
            },
          ].map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, scale: 0.985 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: 0.08 * i }}
              className={cn(
                "group rounded-xl border-2 p-5 backdrop-blur-sm transition-all hover:-translate-y-1",
                step.ring === "emerald" &&
                  "border-emerald-500/50 bg-gradient-to-br from-emerald-500/20 to-teal-500/20",
                step.ring === "blue" &&
                  "border-blue-500/50 bg-gradient-to-br from-blue-500/20 to-indigo-500/20",
                step.ring === "violet" &&
                  "border-violet-500/50 bg-gradient-to-br from-violet-500/20 to-purple-500/20",
                step.ring === "orange" &&
                  "border-orange-500/50 bg-gradient-to-br from-orange-500/20 to-amber-500/20"
              )}
            >
              <div className="mb-2 flex items-center gap-2">
                <span className="body-base font-bold text-slate-100">
                  {step.title}
                </span>
                <span className="body-sm text-slate-200/80">
                  {step.sub}
                </span>
              </div>
              <p className="body-base leading-snug text-slate-200/90">
                {step.body}
              </p>
            </motion.div>
          ))}
        </div>
      </Stack>
    </Section>
  );
});

TypicalProgression.displayName = "TypicalProgression";

// -----------------------------
// Who Benefits
// -----------------------------
const WhoBenefits: React.FC = React.memo(() => {
  const audiences = useMemo(
    () => [
      "Students bringing new ideas to life",
      "Teachers or nonprofits piloting campus or impact projects",
      "Boards and governance teams needing clearer dashboards",
      "Solo founders wanting operational peace of mind",
      "B2B units innovating on tight timelines",
    ],
    []
  );

  return (
    <Section id="benefits" border="top" className="scroll-mt-24">
      <Stack>
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          className="space-y-2 max-w-2xl"
        >
          <h2 className="heading-2 text-foreground">Who Benefits?</h2>
          <p className="body-lg leading-relaxed text-muted-foreground">
            This model is for anyone who needs{" "}
            <span className="font-medium text-primary">
              tangible progress without hiring overhead
            </span>
            .
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
          <motion.div
            initial={{ opacity: 0, x: -12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: 0.05 }}
            className="rounded-xl border border-slate-800/70 bg-slate-950/50 p-6"
          >
            <h3 className="heading-5 mb-4 text-primary">Perfect For</h3>
            <ul className="body-base space-y-3 text-slate-200">
              {audiences.map((aud) => (
                <li key={aud} className="flex items-start gap-2">
                  <span className="mt-0.5 text-primary">✓</span>
                  <span>{aud}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: 0.08 }}
            className="space-y-6 rounded-xl border border-slate-800/70 bg-slate-950/50 p-6"
          >
            <div>
              <h3 className="heading-5 mb-2 text-primary">Ideal Fit</h3>
              <p className="body-base text-slate-200">
                Weekly feedback, ready to experiment, need clear results
              </p>
            </div>
            <div>
              <h3 className="heading-5 mb-2 text-slate-400">Not a Fit</h3>
              <p className="body-base text-slate-400">
                Big static sites, slow-moving teams, no feedback loop
              </p>
            </div>
          </motion.div>
        </div>
      </Stack>
    </Section>
  );
});

WhoBenefits.displayName = "WhoBenefits";

// -----------------------------
// About
// -----------------------------
const AboutMe: React.FC = React.memo(() => {
  return (
    <Section id="about" border="top" className="scroll-mt-24">
      <Stack gap="lg">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="space-y-3 max-w-2xl"
        >
          <h2 className="heading-2 text-foreground">About Me</h2>
          <motion.p
            className="body-lg max-w-3xl text-muted-foreground"
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.08 }}
          >
            I aim to close the gap between proven innovations and
            implementation by giving anyone the tools to turn regional
            data, successful pilots, and stalled legislation into
            AI-assisted solutions for any sector.
          </motion.p>
        </motion.div>

        <motion.div
          className="relative"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.08 }}
        >
          <article className="relative overflow-hidden rounded-xl border border-slate-800/70 bg-gradient-to-br from-slate-950/95 via-slate-900/95 to-slate-950/95 p-6 shadow-2xl backdrop-blur-xl">
            <div
              className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-transparent to-cyan-500/5"
              aria-hidden="true"
            />
            <div className="relative z-10">
              <h3
                id="why-matters-heading"
                className="heading-4 text-foreground"
              >
                Why This Matters
              </h3>

              <motion.p
                className="body-sm mt-2 text-muted-foreground"
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.16 }}
              >
                Pennsylvania cannot afford another decade of:
              </motion.p>

              <ul
                className="mt-3 space-y-2"
                role="list"
                aria-label="Challenges Pennsylvania faces"
              >
                {[
                  "Delayed modernization while comparable states advance",
                  "Legislative gridlock on education and infrastructure",
                  "Workforce development disconnected from regional needs",
                  "Civics education that feels irrelevant to students",
                  "Declining trust in public institutions",
                ].map((t) => (
                  <li
                    key={t}
                    className="caption flex items-start gap-2 text-muted-foreground/90"
                  >
                    <span
                      className="mt-1 inline-block h-1 w-1 flex-shrink-0 rounded-full bg-emerald-400/70"
                      aria-hidden="true"
                    />
                    <span className="flex-1">{t}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-5 border-t border-slate-800/50 pt-4">
                <p className="body-base font-medium leading-relaxed text-foreground">
                  This work provides the missing infrastructure for a
                  state with all the necessary components but no system
                  connecting them.
                </p>
              </div>
            </div>
          </article>
        </motion.div>
      </Stack>
    </Section>
  );
});

AboutMe.displayName = "AboutMe";

// -----------------------------
// Footer
// -----------------------------
const SiteFooter: React.FC = React.memo(() => {
  return (
    <footer className="border-t border-slate-900/80 py-6">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="body-sm flex flex-col items-start justify-between gap-2 text-slate-500 sm:flex-row sm:items-center">
          <div>© {new Date().getFullYear()} AltruisticX AI</div>
          <div className="flex flex-wrap gap-2">
            <span>Async · privacy-aware · built for pilots</span>
          </div>
        </div>
      </div>
    </footer>
  );
});

SiteFooter.displayName = "SiteFooter";

// -----------------------------
// Utilities
// -----------------------------
function safeLocalStorageGet(key: string): string | null {
  try {
    return typeof window !== "undefined"
      ? window.localStorage.getItem(key)
      : null;
  } catch {
    return null;
  }
}
function safeLocalStorageSet(key: string, value: string): void {
  try {
    if (typeof window !== "undefined")
      window.localStorage.setItem(key, value);
  } catch {}
}
function shallowArrayEqual<T extends { [k: string]: any }>(
  a: T[],
  b: T[]
): boolean {
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
