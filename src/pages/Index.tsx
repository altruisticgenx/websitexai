import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { TestimonialsVariant, CaseStudiesStack } from "@/components/ui/animated-cards-stack";
import { Linkedin } from "lucide-react";
import { ShelvedExperiments } from "@/components/ShelvedExperiments";
import { WhereIWork } from "@/components/WhereIWork";
import { OrganizationTypes } from "@/components/OrganizationTypes";
import { EngagementModels } from "@/components/EngagementModels";
import { Hero } from "@/components/Hero";

import { FAQAssistant } from "@/components/FAQAssistant";
import { Toaster } from "@/components/ui/toaster";
import { ScrollToTop } from "@/components/ScrollToTop";
import { ScrollProgress } from "@/components/ScrollProgress";
import { KeyboardShortcutsHelp } from "@/components/KeyboardShortcutsHelp";
import { useActiveSection } from "@/hooks/use-active-section";
import { useKeyboardNavigation } from "@/hooks/use-keyboard-navigation";
import { cn } from "@/lib/utils";
import { supabase } from "@/integrations/supabase/client";
import { ControlRoomOverlay } from "@/components/ui/control-room-overlay";
import { SiteNav } from "@/components/SiteNav";
import { 
  HeroSkeleton, 
  CardsSkeleton, 
  StepsSkeleton, 
  TwoColumnSkeleton, 
  FAQSkeleton
} from "@/components/skeletons/SectionSkeleton";

// --- Data Definitions ---
const faqs = [{
  question: "What do I get each week?",
  answer: "One end-to-end deliverable: UI, workflow, integration, or refactor—shipped, not left half-finished."
}, {
  question: "Is AltruisticX familiar with my work?",
  answer: "Yes. Projects span campus energy, EdTech, policy pilots, B2B and student initiatives, working with complex data and diverse teams."
}, {
  question: "How do we collaborate?",
  answer: "Async-first: Loom, Notion, GitHub, Figma. Fast cycles. One quick call if needed—most progress comes from real builds."
}, {
  question: "Is there any long-term contract?",
  answer: "None. Week-to-week, pause as needed. The repo and code are always yours."
}];

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

// --- Sub-Components ---

function RecentBuilds() {
  const [projects, setProjects] = useState<Array<{
    id: string;
    title: string;
    sector: string;
    summary: string;
    tag: string;
  }>>([]);
  const [isLoadingProjects, setIsLoadingProjects] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setIsLoadingProjects(true);
        const { data, error: fetchError } = await supabase
          .from('projects')
          .select('slug, title, sector, summary, tag')
          .eq('featured', true)
          .order('display_order', { ascending: true });

        if (fetchError) throw fetchError;

        // Transform database data to match component expectations
        const formattedProjects = (data || []).map(project => ({
          id: project.slug,
          title: project.title,
          sector: project.sector,
          summary: project.summary,
          tag: project.tag || '',
        }));

        setProjects(formattedProjects);
        setError(null);
      } catch (err) {
        console.error('Error fetching projects:', err);
        setError('Failed to load projects');
      } finally {
        setIsLoadingProjects(false);
      }
    };

    fetchProjects();
  }, []);

  // Realtime subscription for projects
  useEffect(() => {
    const channel = supabase
      .channel('projects-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'projects'
        },
        async () => {
          // Refetch projects when any change occurs
          try {
            const { data, error: fetchError } = await supabase
              .from('projects')
              .select('slug, title, sector, summary, tag')
              .eq('featured', true)
              .order('display_order', { ascending: true });

            if (fetchError) throw fetchError;

            const formattedProjects = (data || []).map(project => ({
              id: project.slug,
              title: project.title,
              sector: project.sector,
              summary: project.summary,
              tag: project.tag || '',
            }));

            setProjects(formattedProjects);
          } catch (err) {
            console.error('Error refreshing projects:', err);
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return (
    <section id="builds" className="py-10 md:py-16 relative border-t border-lime/20 shadow-lime-glow">
      <ControlRoomOverlay intensity="subtle" />
      <div className="mx-auto w-full max-w-5xl px-4 md:px-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          viewport={{ once: true }} 
          transition={{ duration: 0.5 }}
        >
          <h2 className="heading-display text-xl md:text-2xl">
            Proof: Recent builds & pilots
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground md:text-base">
            Real examples from energy, education, and founder-backed work. The
            details change, but the pattern is the same: pick a small surface
            area and ship something real.
          </p>
        </motion.div>

        {isLoadingProjects ? (
          <div className="mt-6">
            <CardsSkeleton />
          </div>
        ) : error ? (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 rounded-2xl border border-red-400/20 bg-red-400/10 p-6 text-center"
          >
            <p className="text-sm text-red-300">{error}</p>
            <button 
              onClick={() => window.location.reload()} 
              className="mt-3 text-xs text-red-400 hover:text-red-300 underline"
            >
              Try again
            </button>
          </motion.div>
        ) : projects.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 rounded-2xl border border-slate-800/80 bg-slate-900/60 p-8 text-center"
          >
            <p className="text-sm text-slate-400">No projects available yet. Check back soon!</p>
          </motion.div>
        ) : (
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-6"
          >
            <CaseStudiesStack caseStudies={projects} />
          </motion.div>
        )}
      </div>
    </section>
  );
}
function HowItWorks() {
  const steps = [{
    label: "Week 1",
    title: "Pinpoint & Prototype",
    body: "Share your challenge or goal—class doc, campus brief, stakeholder repo, student idea. Get a working skeleton in days."
  }, {
    label: "Weeks 2–3",
    title: "Refine & Connect",
    body: "Iterate with live feedback: data flows, interfaces, reporting. See your concept demo-ready for internal pilots, classes, or team reviews."
  }, {
    label: "Week 4",
    title: "Decide with Clarity",
    body: "Wrap with a real repo, guided walkthrough, and a clear decision: scale, pivot, or pause. Your code, data, and documentation are always yours."
  }];
  return (
    <section id="how" className="border-t border-lime/20 shadow-lime-glow py-10 md:py-16 relative">
      <ControlRoomOverlay intensity="subtle" showScanline={false} />
      <div className="mx-auto w-full max-w-5xl px-4 md:px-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          viewport={{ once: true }} 
          transition={{ duration: 0.5 }}
        >
          <h2 className="heading-display text-xl md:text-2xl">
            How Our Experimental Pilot Works
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground md:text-base">
            <span className="text-primary font-medium">The Build Fast Kit: 4 weeks. 3 steps.</span> Intentionally simple. 
            No massive discovery phase, no 40-page decks. Just a tight loop around one meaningful pilot.
          </p>
        </motion.div>

        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          {steps.map((step, index) => (
            <motion.div 
              key={step.label} 
              initial={{ opacity: 0, y: 20, rotateX: -10 }} 
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }} 
              viewport={{ once: true }} 
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ 
                y: -8,
                rotateX: 5,
                rotateY: index === 1 ? 0 : index === 0 ? -5 : 5,
                scale: 1.03,
                boxShadow: "0 20px 25px -5px hsl(var(--primary) / 0.3)",
              }}
              className="card-3d card-3d-border group rounded-2xl p-5 text-sm transition-all duration-500 cursor-default"
              style={{ transformStyle: 'preserve-3d' }}
            >
              <div className="text-xs font-mono uppercase tracking-[0.18em] text-primary group-hover:text-accent transition-colors" style={{ transform: 'translateZ(15px)' }}>
                {step.label}
              </div>
              <h3 className="mt-2 text-sm font-semibold text-slate-50 group-hover:text-primary transition-colors" style={{ transform: 'translateZ(20px)' }}>
                {step.title}
              </h3>
              <p className="mt-2 text-sm text-slate-300" style={{ transform: 'translateZ(10px)' }}>{step.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
function PilotOffer() {
  return (
    <section id="pilot" className="border-t border-lime/20 shadow-lime-glow py-10 md:py-16 relative">
      <ControlRoomOverlay intensity="medium" />
      <div className="mx-auto w-full max-w-5xl px-4 md:px-6 relative z-10">
        <div className="grid gap-8 md:grid-cols-[minmax(0,1.3fr),minmax(0,1fr)] md:items-start">
          <motion.div 
            initial={{ opacity: 0, x: -30 }} 
            whileInView={{ opacity: 1, x: 0 }} 
            viewport={{ once: true }} 
            transition={{ duration: 0.6 }}
          >
            <h2 className="heading-display text-xl md:text-2xl">
              Offer: Try a 4-Week Sprint
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground md:text-base">
              Pilot-ready features every week, demoable anywhere. Async collaboration using Loom, Notion, GitHub, Figma—whatever 
              works for your team, classroom, or org. Zero lock-in: All repos, infra, and docs belong to you.
            </p>

            <ul className="mt-4 space-y-2 text-sm text-slate-200">
              <li className="flex items-start gap-2">
                <span className="text-primary mt-0.5">✓</span>
                Pilot-ready features every week, demoable anywhere
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-0.5">✓</span>
                Async collaboration: Use Loom, Notion, GitHub, Figma—whatever works for your team, classroom, or org
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-0.5">✓</span>
                Zero lock-in: All repos, infra, and docs belong to you
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-0.5">✓</span>
                Perfect for fast validation, fundraising, leadership proof, classroom projects
              </li>
            </ul>
            
            <div className="mt-6 rounded-2xl border border-primary/30 bg-primary/5 p-4">
              <h3 className="text-sm font-semibold text-primary">Why experiment?</h3>
              <p className="mt-2 text-sm text-slate-300">
                Recruiting takes months, costs six figures, and adds complexity. Pilots deliver results now, 
                helping you move forward—whatever your goals.
              </p>
            </div>

            <div className="mt-6">
              <div className="text-xs uppercase tracking-[0.18em] text-slate-400">
                For comparison
              </div>
              <p className="mt-1 max-w-xs text-xs text-slate-400">
                Hiring in-house can take 3–6 months, $100k–$150k salary, plus
                30–40% in overhead—with no guarantee they can move quickly on a
                messy pilot.
              </p>
            </div>

            <div className="mt-6">
              <p className="text-xs text-slate-400 sm:text-sm">
                Send a quick Loom or doc about your project. If it's a fit, we
                can start shipping next week.
              </p>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 30 }} 
            whileInView={{ opacity: 1, x: 0 }} 
            viewport={{ once: true }} 
            transition={{ duration: 0.6 }}
            whileHover={{ 
              scale: 1.02,
              boxShadow: "0 20px 25px -5px hsl(var(--primary) / 0.15)"
            }}
            className="group rounded-3xl border border-slate-800/80 bg-gradient-to-br from-slate-950/60 to-slate-900/40 p-4 text-xs text-slate-200 sm:p-5 transition-all duration-500 hover:border-primary/30 cursor-default"
          >
            <div className="text-xs font-mono uppercase tracking-[0.18em] text-slate-400 group-hover:text-primary transition-colors">
              Good fit
            </div>
            <ul className="mt-2 space-y-1">
              <li className="flex items-start gap-2">
                <span className="text-primary">✓</span>
                Early-stage product with unclear edges.
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">✓</span>
                Energy, education, civic, or compliance work.
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">✓</span>
                Need to show progress to leadership or funders.
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">✓</span>
                Comfortable with async, fast iteration.
              </li>
            </ul>

            <div className="mt-5 text-xs font-mono uppercase tracking-[0.18em] text-slate-400 group-hover:text-accent transition-colors">
              Not a fit
            </div>
            <ul className="mt-2 space-y-1 text-slate-400">
              <li className="flex items-start gap-2">
                <span className="opacity-50">✕</span>
                You want a big team and a huge scope from day one.
              </li>
              <li className="flex items-start gap-2">
                <span className="opacity-50">✕</span>
                You aren't ready to give real feedback weekly.
              </li>
              <li className="flex items-start gap-2">
                <span className="opacity-50">✕</span>
                You just need a static marketing site or brochure.
              </li>
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
function WhoBenefits() {
  const audiences = ["Students bringing new ideas to life", "Teachers or nonprofits piloting campus or impact projects", "Board and governance teams seeking data clarity", "Solo founders wanting operational peace of mind", "B2B units innovating under fast timelines"];
  return (
    <section id="benefits" className="border-t border-lime/20 shadow-lime-glow py-10 md:py-16 relative">
      <ControlRoomOverlay intensity="subtle" showScanline={false} />
      <div className="mx-auto w-full max-w-5xl px-4 md:px-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          viewport={{ once: true }} 
          transition={{ duration: 0.5 }}
        >
          <h2 className="heading-display text-xl md:text-2xl">
            Who Benefits?
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground md:text-base">
            This approach works for anyone who needs tangible progress without the overhead of traditional hiring.
          </p>
        </motion.div>

        <div className="mt-6 grid gap-6 md:grid-cols-2">
          <motion.div 
            initial={{ opacity: 0, x: -20, rotateY: -10 }} 
            whileInView={{ opacity: 1, x: 0, rotateY: 0 }} 
            viewport={{ once: true }} 
            transition={{ duration: 0.6, delay: 0.1 }}
            whileHover={{
              rotateY: 3,
              rotateX: -3,
              scale: 1.02,
              boxShadow: "0 20px 25px -5px hsl(var(--primary) / 0.3)",
            }}
            className="card-3d card-3d-border rounded-2xl p-6 transition-all duration-500"
            style={{ transformStyle: 'preserve-3d' }}
          >
            <h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-primary" style={{ transform: 'translateZ(15px)' }}>
              Perfect For
            </h3>
            <ul className="mt-3 space-y-2 text-sm text-slate-200" style={{ transform: 'translateZ(10px)' }}>
              {audiences.map((audience, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-primary mt-0.5">✓</span>
                  {audience}
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20, rotateY: 10 }} 
            whileInView={{ opacity: 1, x: 0, rotateY: 0 }} 
            viewport={{ once: true }} 
            transition={{ duration: 0.6, delay: 0.2 }}
            whileHover={{
              rotateY: -3,
              rotateX: -3,
              scale: 1.02,
              boxShadow: "0 20px 25px -5px hsl(var(--accent) / 0.3)",
            }}
            className="card-3d card-3d-border rounded-2xl p-6 transition-all duration-500"
            style={{ transformStyle: 'preserve-3d' }}
          >
            <div className="mb-4" style={{ transform: 'translateZ(15px)' }}>
              <h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-primary">
                Ideal Fit
              </h3>
              <p className="mt-2 text-sm text-slate-200">
                Real feedback weekly, ready to experiment, need clear results
              </p>
            </div>
            <div style={{ transform: 'translateZ(10px)' }}>
              <h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-slate-400">
                Not a Fit
              </h3>
              <p className="mt-2 text-sm text-slate-400">
                Big static sites, slow-moving teams, no feedback or iteration
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
function FAQSection() {
  return (
    <section id="faq" className="border-t border-lime/20 shadow-lime-glow py-8 sm:py-12 relative">
      <ControlRoomOverlay intensity="subtle" />
      <motion.div 
        initial={{ opacity: 0, y: 20 }} 
        whileInView={{ opacity: 1, y: 0 }} 
        viewport={{ once: true }} 
        transition={{ duration: 0.5 }} 
        className="max-w-4xl mb-6"
      >
        <h2 className="heading-display text-base sm:text-lg">
          FAQs & AI Assistant
        </h2>
        <p className="mt-2 text-xs sm:text-sm text-slate-300">
          Get quick answers to common questions or ask our AI assistant about submissions and services.
        </p>
      </motion.div>

      {/* AI Assistant */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }} 
        whileInView={{ opacity: 1, y: 0 }} 
        viewport={{ once: true }} 
        transition={{ duration: 0.5, delay: 0.1 }}
        className="mb-6"
      >
        <FAQAssistant />
      </motion.div>

      {/* FAQ Items - Compact Grid Layout */}
      <dl className="grid gap-3 sm:gap-4 sm:grid-cols-2">
        {faqs.map((item, index) => (
          <motion.div 
            key={item.question} 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.05 }}
            className="rounded-xl border border-slate-800/80 bg-slate-950/60 p-3 sm:p-4 hover:border-primary/30 transition-colors"
          >
            <dt className="text-xs sm:text-sm font-medium text-slate-50 leading-tight">
              {item.question}
            </dt>
            <dd className="mt-1.5 sm:mt-2 text-xs sm:text-sm text-slate-300 leading-relaxed">
              {item.answer}
            </dd>
          </motion.div>
        ))}
      </dl>
    </section>
  );
}

function SiteFooter() {
  return <footer className="border-t border-lime/20 shadow-lime-glow py-4">
      <div className="flex flex-col items-start justify-between gap-2 text-[10px] text-slate-500 sm:flex-row sm:items-center">
        <div className="text-[10px]">© {new Date().getFullYear()} AltruisticX · AI + Product Engineer</div>
        <div className="flex flex-wrap gap-2">
          <span className="text-[10px]">Async-first · privacy-aware · built for pilots, classrooms, and fast-moving teams</span>
        </div>
      </div>
    </footer>;
}