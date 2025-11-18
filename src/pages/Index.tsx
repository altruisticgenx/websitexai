import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { TestimonialsVariant } from "@/components/ui/animated-cards-stack";
import { ShelvedExperiments } from "@/components/ShelvedExperiments";
import { WhereIWork } from "@/components/WhereIWork";
import { OrganizationTypes } from "@/components/OrganizationTypes";
import { EngagementModels } from "@/components/EngagementModels";
import { Hero } from "@/components/Hero";
import { RecentBuilds } from "@/components/RecentBuilds";
import { HowItWorks } from "@/components/HowItWorks";
import { PilotOffer } from "@/components/PilotOffer";
import { WhoBenefits } from "@/components/WhoBenefits";
import { FAQSection } from "@/components/FAQSection";
import { SiteFooter } from "@/components/SiteFooter";
import { Toaster } from "@/components/ui/toaster";
import { ScrollToTop } from "@/components/ScrollToTop";
import { ScrollProgress } from "@/components/ScrollProgress";
import { KeyboardShortcutsHelp } from "@/components/KeyboardShortcutsHelp";
import { useKeyboardNavigation } from "@/hooks/use-keyboard-navigation";
import { SiteNav } from "@/components/SiteNav";
import { 
  HeroSkeleton, 
  CardsSkeleton, 
  StepsSkeleton, 
  TwoColumnSkeleton, 
  FAQSkeleton
} from "@/components/skeletons/SectionSkeleton";

// --- Main Page Component ---
const Index = () => {
  const [isLoading, setIsLoading] = useState(() => {
    // Check if content was previously loaded
    return !localStorage.getItem('contentLoaded');
  });

  // Simulate content loading for first-time visitors
  useEffect(() => {
    const hasLoadedBefore = localStorage.getItem('contentLoaded');
    
    if (!hasLoadedBefore) {
      const timer = setTimeout(() => {
        setIsLoading(false);
        localStorage.setItem('contentLoaded', 'true');
      }, 1200);

      return () => clearTimeout(timer);
    }
  }, []);

  // Setup keyboard navigation
  useKeyboardNavigation([
    { key: "1", sectionId: "builds", name: "Builds" },
    { key: "2", sectionId: "how", name: "How it Works" },
    { key: "3", sectionId: "pilot", name: "4-Week Pilot" },
    { key: "4", sectionId: "benefits", name: "Who Benefits" },
    { key: "5", sectionId: "org-types", name: "Organization Types" },
    { key: "6", sectionId: "where", name: "Where I Work" },
    { key: "7", sectionId: "shelved", name: "Shelved Experiments" },
    { key: "8", sectionId: "testimonials", name: "Testimonials" },
    { key: "9", sectionId: "faq", name: "FAQ" },
  ]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50">
      {/* Scroll Progress Bar */}
      <ScrollProgress />
      
      {/* Sticky Navigation */}
      <SiteNav />
      
      <div className="mx-auto flex min-h-screen max-w-6xl flex-col px-4 sm:px-6 lg:px-8">
        <main className="flex-1 pt-4 sm:pt-8">
          {isLoading ? (
            <div className="animate-pulse">
              <HeroSkeleton />
              <CardsSkeleton />
              <StepsSkeleton />
              <TwoColumnSkeleton />
              <StepsSkeleton count={2} />
              <CardsSkeleton count={3} />
              <FAQSkeleton />
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Hero />
              <RecentBuilds />
              <EngagementModels />
              <HowItWorks />
              <PilotOffer />
              <WhoBenefits />
              <OrganizationTypes />
              <WhereIWork />
              <ShelvedExperiments />
              <div id="testimonials">
                <TestimonialsVariant />
              </div>
              <FAQSection />
            </motion.div>
          )}
        </main>
        <SiteFooter />
      </div>
      <Toaster />
      <ScrollToTop />
      <KeyboardShortcutsHelp />
    </div>
  );
};
export default Index;