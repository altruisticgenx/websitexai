import React, { useCallback, useEffect, useRef, useState, Suspense, lazy } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Hero } from "@/components/Hero";
import { SocialProof } from "@/components/SocialProof";
import { RecentBuilds } from "@/components/RecentBuilds";
import { TypicalProgression } from "@/components/TypicalProgression";
import { WhoBenefits } from "@/components/WhoBenefits";
import { AboutMe } from "@/components/AboutMe";
import { SiteFooter } from "@/components/SiteFooter";
import { LazySection } from "@/components/LazySection";
import { useSwipeGesture } from "@/hooks/use-swipe-gesture";
import { ScrollToTop } from "@/components/ScrollToTop";
import { ScrollProgress } from "@/components/ScrollProgress";
import { KeyboardShortcutsHelp } from "@/components/KeyboardShortcutsHelp";
import { SwipeIndicator } from "@/components/SwipeIndicator";
import { useKeyboardNavigation } from "@/hooks/use-keyboard-navigation";
import { SiteNav } from "@/components/SiteNav";
import {
  HeroSkeleton,
  CardsSkeleton,
  StepsSkeleton,
  TwoColumnSkeleton,
} from "@/components/skeletons/SectionSkeleton";
import { TooltipProvider } from "@/components/ui/tooltip";

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

const PilotOffer = lazy(() =>
  import("@/components/PilotOffer").then((m) => ({
    default: m.PilotOffer,
  }))
);

// Local storage helpers
const safeLocalStorageGet = (key: string): string | null => {
  try {
    return localStorage.getItem(key);
  } catch (e) {
    return null;
  }
};

const safeLocalStorageSet = (key: string, value: string): void => {
  try {
    localStorage.setItem(key, value);
  } catch (e) {
    // Fail silently
  }
};

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

  // Define navigateSection BEFORE using it in swipe gesture
  const navigateSection = useCallback(
    (delta: number) => {
      const ids = sectionIdsRef.current;
      const next = Math.max(0, Math.min(ids.length - 1, currentSectionIndex + delta));
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

  // Swipe gesture support (mobile-first)
  const swipeRef = useSwipeGesture<HTMLDivElement>({
    onSwipeUp: () => navigateSection(1),
    onSwipeDown: () => navigateSection(-1),
    threshold: 72,
  });

  // Keyboard quick-jumps (1..8)
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
    <div ref={swipeRef} className="min-h-screen bg-slate-950 text-slate-50 antialiased">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:rounded-md focus:bg-slate-800 focus:px-3 focus:py-2"
      >
        Skip to content
      </a>

      <ScrollProgress />
      <SiteNav />

      <div className="relative mx-auto flex min-h-screen max-w-5xl flex-col px-3 sm:px-4">
        <main id="main-content" className="flex-1 pt-2 sm:pt-4" role="main">
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
            <TooltipProvider delayDuration={160}>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: prefersReducedMotion ? 0 : 0.4 }}
              >
                <Hero />
                <SocialProof />
                <RecentBuilds />

                <LazySection>
                  <TypicalProgression />
                </LazySection>

                <Suspense
                  fallback={
                    <div className="h-64 rounded-2xl bg-slate-900/60" aria-busy="true" aria-live="polite" />
                  }
                >
                  <LazySection>
                    <PilotOffer />
                  </LazySection>
                </Suspense>

                <LazySection>
                  <WhoBenefits />
                </LazySection>

                <Suspense
                  fallback={
                    <div className="h-64 rounded-2xl bg-slate-900/60" aria-busy="true" aria-live="polite" />
                  }
                >
                  <LazySection>
                    <OrganizationTypes />
                  </LazySection>
                </Suspense>

                <Suspense
                  fallback={
                    <div className="h-64 rounded-2xl bg-slate-900/60" aria-busy="true" aria-live="polite" />
                  }
                >
                  <LazySection>
                    <WhereIWork />
                  </LazySection>
                </Suspense>

                <Suspense
                  fallback={
                    <div className="h-64 rounded-2xl bg-slate-900/60" aria-busy="true" aria-live="polite" />
                  }
                >
                  <LazySection>
                    <ShelvedExperiments />
                  </LazySection>
                </Suspense>

                <LazySection>
                  <AboutMe />
                </LazySection>
              </motion.div>
            </TooltipProvider>
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
