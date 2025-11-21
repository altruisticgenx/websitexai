import React, { useCallback, useEffect, useMemo, useRef, useState, Suspense, lazy } from "react";
import { motion, useReducedMotion } from "framer-motion";

// Component Imports
import { PilotCard } from "@/components/PilotCard";
import { SocialProof } from "@/components/SocialProof";
import { Hero } from "@/components/Hero";
import { LazySection } from "@/components/LazySection";
import { ScrollToTop } from "@/components/ScrollToTop";
import { ScrollProgress } from "@/components/ScrollProgress";
import { ParallaxBackground } from "@/components/ParallaxBackground";
import { KeyboardShortcutsHelp } from "@/components/KeyboardShortcutsHelp";
import { SwipeIndicator } from "@/components/SwipeIndicator";
import { SiteNav } from "@/components/SiteNav";
import { HeroSkeleton, CardsSkeleton, StepsSkeleton, TwoColumnSkeleton } from "@/components/skeletons/SectionSkeleton";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { PilotCarousel3D } from "@/components/PilotCarousel3D";
import { Section } from "@/components/Section";
import { Stack } from "@/components/layout/Stack";
import { Grid } from "@/components/layout/Grid";

// Hooks & Utils
import { useSwipeGesture } from "@/hooks/use-swipe-gesture";
import { useKeyboardNavigation } from "@/hooks/use-keyboard-navigation";
import { cn } from "@/lib/utils";
import { supabase } from "@/integrations/supabase/client";

// Lazy Load Sections
const ShelvedExperiments = lazy(() =>
  import("@/components/ShelvedExperiments").then((m) => ({ default: m.ShelvedExperiments })),
);
const WhereIWork = lazy(() => import("@/components/WhereIWork").then((m) => ({ default: m.WhereIWork })));
const OrganizationTypes = lazy(() =>
  import("@/components/OrganizationTypes").then((m) => ({ default: m.OrganizationTypes })),
);
const EngagementModels = lazy(() =>
  import("@/components/EngagementModels").then((m) => ({ default: m.EngagementModels })),
);
const AboutMe = lazy(() => import("@/components/sections/AboutMe").then((m) => ({ default: m.AboutMe })));

// -----------------------------
// Types & Interfaces
// -----------------------------
type FeatureItem = {
  title: string;
  desc: string;
  color: "emerald" | "cyan" | "teal" | "blue";
  icon: string;
  example: string;
};

type Project = {
  id: string;
  title: string;
  sector: string;
  summary: string;
  tag: string;
  image_url?: string | null;
};

// -----------------------------
// Sub-Components
// -----------------------------

const FeatureCardWithTooltip: React.FC<{ item: FeatureItem; index: number }> = React.memo(({ item, index }) => {
  const prefersReducedMotion = useReducedMotion();
  const [isTouched, setIsTouched] = useState(false);

  const colorClasses = useMemo(() => {
    const variants = {
      emerald: {
        border: "border-emerald-400/40 hover:border-emerald-400/70",
        gradient: "from-emerald-500/20 via-teal-500/10 to-green-500/20",
        shadow: "shadow-emerald-500/20",
      },
      cyan: {
        border: "border-cyan-400/40 hover:border-cyan-400/70",
        gradient: "from-cyan-500/20 via-blue-500/10 to-teal-500/20",
        shadow: "shadow-cyan-500/20",
      },
      teal: {
        border: "border-teal-400/40 hover:border-teal-400/70",
        gradient: "from-teal-500/20 via-emerald-500/10 to-cyan-500/20",
        shadow: "shadow-teal-500/20",
      },
      blue: {
        border: "border-blue-400/40 hover:border-blue-400/70",
        gradient: "from-blue-500/20 via-indigo-500/10 to-violet-500/20",
        shadow: "shadow-blue-500/20",
      },
    };
    return variants[item.color] || variants.blue;
  }, [item.color]);

  return (
    <Tooltip open={isTouched ? true : undefined}>
      <TooltipTrigger asChild>
        <motion.button
          type="button"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.3, delay: index * 0.05 }}
          whileHover={
            prefersReducedMotion
              ? undefined
              : { y: -6, rotateX: 2, rotateY: -2, scale: 1.02, transition: { duration: 0.3, ease: "easeOut" } }
          }
          whileTap={{ scale: 0.98 }}
          onClick={() => setIsTouched((v) => !v)}
          onMouseEnter={() => setIsTouched(false)}
          style={{ transformStyle: "preserve-3d", perspective: "1000px" }}
          className={cn(
            "group relative w-full overflow-hidden rounded-lg border bg-gradient-to-br backdrop-blur-sm p-2.5 sm:p-3 transition-all cursor-pointer",
            "touch-manipulation focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50",
            "hover:shadow-xl shadow-lg",
            colorClasses.border,
            colorClasses.gradient,
            colorClasses.shadow,
          )}
        >
          <div className="relative z-10 flex items-start gap-1.5">
            <span className="text-base sm:text-lg flex-shrink-0 mt-0.5">{item.icon}</span>
            <div className="flex-1 min-w-0 text-left">
              <h4 className="mb-0.5 text-[10px] sm:text-[11px] font-bold text-foreground leading-tight line-clamp-2">
                {item.title}
              </h4>
              <p className="text-[9px] sm:text-[10px] leading-snug text-muted-foreground line-clamp-2 sm:line-clamp-3">
                {item.desc}
              </p>
            </div>
          </div>
        </motion.button>
      </TooltipTrigger>
      <TooltipContent
        side="top"
        className="max-w-[260px] sm:max-w-[320px] bg-slate-900/95 backdrop-blur-sm border-primary/30 p-3"
      >
        <p className="text-[10px] sm:text-xs leading-relaxed text-slate-200">
          <span className="font-semibold text-primary">Real Example:</span> {item.example}
        </p>
      </TooltipContent>
    </Tooltip>
  );
});
FeatureCardWithTooltip.displayName = "FeatureCardWithTooltip";

const RecentBuilds: React.FC = React.memo(() => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoadingProjects, setIsLoadingProjects] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProjects = useCallback(async () => {
    try {
      setIsLoadingProjects(true);
      const { data, error: fetchError } = await supabase
        .from("projects")
        .select("slug, title, sector, summary, tag, image_url")
        .eq("featured", true)
        .order("display_order", { ascending: true });

      if (fetchError) throw fetchError;

      setProjects(
        (data || []).map((p) => ({
          id: p.slug,
          title: p.title,
          sector: p.sector,
          summary: p.summary,
          tag: p.tag || "",
          image_url: p.image_url,
        })),
      );
      setError(null);
    } catch (e) {
      console.error("Error fetching projects:", e);
      setError("Failed to load projects");
    } finally {
      setIsLoadingProjects(false);
    }
  }, []);

  useEffect(() => {
    fetchProjects();
    const channel = supabase
      .channel("projects-changes")
      .on("postgres_changes", { event: "*", schema: "public", table: "projects" }, fetchProjects)
      .subscribe();
    return () => {
      supabase.removeChannel(channel);
    };
  }, [fetchProjects]);

  return (
    <Section id="builds" spacing="normal">
      <ParallaxBackground
        speed={0.6}
        gradient="from-primary/8 via-accent/8 to-transparent"
        meshVariant="primary"
        meshIntensity="medium"
      />
      <Stack gap="lg">
        <header className="max-w-2xl">
          <h2 className="heading-3">Recent Builds</h2>
          <p className="body-lg text-muted-foreground mt-2">
            Small scope, real results—across energy, education, and founder projects.
          </p>
        </header>
        {isLoadingProjects ? (
          <CardsSkeleton />
        ) : error ? (
          <div className="text-red-400 text-sm p-4 border border-red-500/20 rounded-lg bg-red-500/10">{error}</div>
        ) : projects.length === 0 ? (
          <div className="text-slate-400 text-sm p-8 border border-slate-800 rounded-lg bg-slate-900/50 text-center">
            No projects featured yet.
          </div>
        ) : (
          <PilotCarousel3D autoPlayInterval={6000}>
            {projects.map((project) => (
              <PilotCard
                key={project.id}
                id={project.id}
                title={project.title}
                sector={project.sector}
                whoFor={project.sector === "Education" ? "Schools" : "Founders"} // Simplified for brevity
                problem="Complex operational challenges"
                outcome="Measurable improvements"
                timeToDemo="Week 1"
                tag={project.tag}
                imageUrl={project.image_url || "/placeholder.svg"}
              />
            ))}
          </PilotCarousel3D>
        )}
      </Stack>
    </Section>
  );
});
RecentBuilds.displayName = "RecentBuilds";

// ... (Previous components PilotOffer, TypicalProgression, WhoBenefits, AboutMe remain largely the same, ensure they are included in your file)

const SiteFooter: React.FC = React.memo(() => (
  <footer className="border-t border-slate-900/80 py-4">
    <div className="body-sm flex flex-col items-start justify-between gap-2 text-slate-500 sm:flex-row sm:items-center">
      <div>© {new Date().getFullYear()} AltruisticX AI</div>
      <div className="flex flex-wrap gap-2">
        <span>Async · privacy-aware · built for pilots</span>
      </div>
    </div>
  </footer>
));
SiteFooter.displayName = "SiteFooter";

// -----------------------------
// Main Component
// -----------------------------
const Index: React.FC = () => {
  const prefersReducedMotion = useReducedMotion();
  const [isBootLoading, setBootLoading] = useState(() => !safeLocalStorageGet("contentLoaded"));
  const sectionIdsRef = useRef<string[]>(["builds", "pilot", "benefits", "org-types", "where", "shelved", "about"]);
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
      const next = Math.max(0, Math.min(sectionIdsRef.current.length - 1, currentSectionIndex + delta));
      if (next !== currentSectionIndex) {
        setCurrentSectionIndex(next);
        document
          .getElementById(sectionIdsRef.current[next])
          ?.scrollIntoView({ behavior: prefersReducedMotion ? "auto" : "smooth", block: "start" });
      }
    },
    [currentSectionIndex, prefersReducedMotion],
  );

  const swipeRef = useSwipeGesture<HTMLDivElement>({
    onSwipeUp: () => navigateSection(1),
    onSwipeDown: () => navigateSection(-1),
    threshold: 72,
  });

  useKeyboardNavigation([
    { key: "1", sectionId: "builds", name: "Builds" },
    { key: "2", sectionId: "pilot", name: "Pilot" },
    { key: "3", sectionId: "benefits", name: "Benefits" },
    { key: "8", sectionId: "about", name: "About" },
  ]);

  return (
    <div ref={swipeRef} className="min-h-screen bg-slate-950 text-slate-50 antialiased">
      <ScrollProgress />
      <SiteNav />
      <div className="relative mx-auto flex min-h-screen max-w-5xl flex-col px-3 sm:px-4">
        <main id="main-content" className="flex-1 pt-2 sm:pt-4">
          {isBootLoading ? (
            <div className="animate-pulse">
              <HeroSkeleton />
            </div>
          ) : (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
              <Hero />
              <SocialProof />
              <RecentBuilds />
              <LazySection minHeight={450}>
                <AboutMe />
              </LazySection>
            </motion.div>
          )}
        </main>
        <SiteFooter />
      </div>
      <ScrollToTop />
      <KeyboardShortcutsHelp />
      <SwipeIndicator />
    </div>
  );
};

export default Index;

// Utils
function safeLocalStorageGet(key: string) {
  try {
    return window.localStorage.getItem(key);
  } catch {
    return null;
  }
}
function safeLocalStorageSet(key: string, value: string) {
  try {
    window.localStorage.setItem(key, value);
  } catch {}
}
