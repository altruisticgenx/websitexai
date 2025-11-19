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
import { ScrollToTop } from "@/components/ScrollToTop";
import { ScrollProgress } from "@/components/ScrollProgress";
import { KeyboardShortcutsHelp } from "@/components/KeyboardShortcutsHelp";
import { useActiveSection } from "@/hooks/use-active-section";
import { useKeyboardNavigation } from "@/hooks/use-keyboard-navigation";
import { cn } from "@/lib/utils";
import { supabase } from "@/integrations/supabase/client";
import { SiteNav } from "@/components/SiteNav";
import { HeroSkeleton, CardsSkeleton, StepsSkeleton, TwoColumnSkeleton, FAQSkeleton } from "@/components/skeletons/SectionSkeleton";

// --- Data Definitions ---
const faqs = [{
  question: "What do I get?",
  answer: "One feature per week: UI, workflow, integration—fully working, not half-done."
}, {
  question: "Know my field?",
  answer: "Yes. Energy, EdTech, policy, B2B, student projects."
}, {
  question: "How we work?",
  answer: "Async: Loom, Notion, GitHub. Quick call if needed."
}, {
  question: "Any contract?",
  answer: "Nope. Week-to-week. Code is yours."
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
  useKeyboardNavigation([{
    key: "1",
    sectionId: "builds",
    name: "Builds"
  }, {
    key: "2",
    sectionId: "how",
    name: "How it Works"
  }, {
    key: "3",
    sectionId: "pilot",
    name: "4-Week Pilot"
  }, {
    key: "4",
    sectionId: "benefits",
    name: "Who Benefits"
  }, {
    key: "5",
    sectionId: "org-types",
    name: "Organization Types"
  }, {
    key: "6",
    sectionId: "where",
    name: "Where I Work"
  }, {
    key: "7",
    sectionId: "shelved",
    name: "Shelved Experiments"
  }, {
    key: "8",
    sectionId: "testimonials",
    name: "Testimonials"
  }, {
    key: "9",
    sectionId: "faq",
    name: "FAQ"
  }]);
  return <div className="min-h-screen bg-slate-950 text-slate-50">
      {/* Scroll Progress Bar */}
      <ScrollProgress />
      
      {/* Sticky Navigation */}
      <SiteNav />
      
      <div className="relative mx-auto flex min-h-screen max-w-5xl flex-col px-3 sm:px-4">
        <main id="main-content" className="flex-1 pt-2 sm:pt-4" role="main">
          {isLoading ? <div className="animate-pulse">
              <HeroSkeleton />
              <CardsSkeleton />
              <StepsSkeleton />
              <TwoColumnSkeleton />
              <StepsSkeleton count={2} />
              <CardsSkeleton count={3} />
              <FAQSkeleton />
            </div> : <motion.div initial={{
          opacity: 0
        }} animate={{
          opacity: 1
        }} transition={{
          duration: 0.5
        }}>
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
            </motion.div>}
        </main>
        <SiteFooter />
      </div>
      <ScrollToTop />
      <KeyboardShortcutsHelp />
    </div>;
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
        const {
          data,
          error: fetchError
        } = await supabase.from('projects').select('slug, title, sector, summary, tag').eq('featured', true).order('display_order', {
          ascending: true
        });
        if (fetchError) throw fetchError;

        // Transform database data to match component expectations
        const formattedProjects = (data || []).map(project => ({
          id: project.slug,
          title: project.title,
          sector: project.sector,
          summary: project.summary,
          tag: project.tag || ''
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
    const channel = supabase.channel('projects-changes').on('postgres_changes', {
      event: '*',
      schema: 'public',
      table: 'projects'
    }, async () => {
      // Refetch projects when any change occurs
      try {
        const {
          data,
          error: fetchError
        } = await supabase.from('projects').select('slug, title, sector, summary, tag').eq('featured', true).order('display_order', {
          ascending: true
        });
        if (fetchError) throw fetchError;
        const formattedProjects = (data || []).map(project => ({
          id: project.slug,
          title: project.title,
          sector: project.sector,
          summary: project.summary,
          tag: project.tag || ''
        }));
        setProjects(formattedProjects);
      } catch (err) {
        console.error('Error refreshing projects:', err);
      }
    }).subscribe();
    return () => {
      supabase.removeChannel(channel);
    };
  }, []);
  return <section id="builds" className="py-6 md:py-10">
      <div className="mx-auto w-full max-w-5xl px-3 md:px-4">
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
      }}>
          <h2 className="text-lg font-semibold tracking-tight text-foreground md:text-xl">
            Recent builds
          </h2>
          
        </motion.div>

        {isLoadingProjects ? <div className="mt-6">
            <CardsSkeleton />
          </div> : error ? <motion.div initial={{
        opacity: 0,
        y: 30
      }} animate={{
        opacity: 1,
        y: 0
      }} className="mt-6 rounded-2xl border border-red-400/20 bg-red-400/10 p-6 text-center">
            <p className="text-sm text-red-300">{error}</p>
            <button onClick={() => window.location.reload()} className="mt-3 text-xs text-red-400 hover:text-red-300 underline">
              Try again
            </button>
          </motion.div> : projects.length === 0 ? <motion.div initial={{
        opacity: 0,
        y: 30
      }} animate={{
        opacity: 1,
        y: 0
      }} className="mt-6 rounded-2xl border border-slate-800/80 bg-slate-900/60 p-8 text-center">
            <p className="text-sm text-slate-400">No projects available yet. Check back soon!</p>
          </motion.div> : <motion.div initial={{
        opacity: 0,
        y: 30
      }} whileInView={{
        opacity: 1,
        y: 0
      }} viewport={{
        once: true
      }} transition={{
        duration: 0.6,
        delay: 0.2
      }} className="mt-6">
            <CaseStudiesStack caseStudies={projects} />
          </motion.div>}
      </div>
    </section>;
}
function HowItWorks() {
  const steps = [{
    label: "01",
    title: "Share your idea",
    body: "Send a doc or quick call. We scope a realistic 4-week slice."
  }, {
    label: "02",
    title: "Ship weekly",
    body: "Each week: one complete feature you can demo."
  }, {
    label: "03",
    title: "Decide",
    body: "Working pilot. Clear next steps. Your choice: go, pivot, or pause."
  }];
  return <section id="how" className="border-t border-slate-900/80 py-6 md:py-10">
      <div className="mx-auto w-full max-w-5xl px-3 md:px-4">
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
      }}>
          <h2 className="text-lg font-semibold tracking-tight text-foreground md:text-xl">
            How it works
          </h2>
          <p className="mt-2 max-w-2xl text-xs leading-relaxed text-muted-foreground md:text-sm">
            <span className="text-primary font-medium">4 weeks. 3 steps.</span> No endless meetings or docs—just shipping.
          </p>
        </motion.div>

        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          {steps.map((step, index) => <motion.div key={step.label} initial={{
          opacity: 0,
          y: 20
        }} whileInView={{
          opacity: 1,
          y: 0
        }} viewport={{
          once: true
        }} transition={{
          duration: 0.5,
          delay: index * 0.1
        }} whileHover={{
          y: -6,
          boxShadow: "0 20px 25px -5px hsl(var(--primary) / 0.2)",
          borderColor: "hsl(var(--primary) / 0.4)"
        }} className="group rounded-xl border border-slate-800/70 bg-gradient-to-br from-slate-950/50 to-slate-900/30 p-3 text-sm transition-all duration-300 cursor-default">
              <div className="text-[10px] font-mono uppercase tracking-[0.18em] text-primary group-hover:text-accent transition-colors">
                {step.label}
              </div>
              <h3 className="mt-1.5 text-xs font-semibold text-slate-50 group-hover:text-primary transition-colors md:text-sm">
                {step.title}
              </h3>
              <p className="mt-1.5 text-xs text-slate-300">{step.body}</p>
            </motion.div>)}
        </div>
      </div>
    </section>;
}
function PilotOffer() {
  return <section id="pilot" className="border-t border-slate-900/80 py-6 md:py-10">
      <div className="mx-auto w-full max-w-5xl px-3 md:px-4">
        <div className="grid gap-8 md:grid-cols-[minmax(0,1.3fr),minmax(0,1fr)] md:items-start">
          <motion.div initial={{
          opacity: 0,
          x: -30
        }} whileInView={{
          opacity: 1,
          x: 0
        }} viewport={{
          once: true
        }} transition={{
          duration: 0.6
        }}>
            <h2 className="text-lg font-semibold tracking-tight text-foreground md:text-xl">
              4-week sprint
            </h2>
            <p className="mt-2 max-w-2xl text-xs leading-relaxed text-muted-foreground md:text-sm">
              Weekly features you can demo. Async tools you already use. Code and docs stay yours.
            </p>

            <ul className="mt-3 space-y-1.5 text-xs text-slate-200 md:text-sm">
              <li className="flex items-start gap-2">
                <span className="text-primary mt-0.5 text-xs">✓</span>
                Weekly features you can demo
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-0.5 text-xs">✓</span>
                Async: Loom, Notion, GitHub, Figma
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-0.5 text-xs">✓</span>
                You keep all code and docs
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-0.5 text-xs">✓</span>
                For validation, fundraising, teaching
              </li>
            </ul>
            
            <div className="mt-4 rounded-xl border border-primary/30 bg-primary/5 p-3">
              <h3 className="text-xs font-semibold text-primary md:text-sm">Why this works</h3>
              <p className="mt-1.5 text-xs text-slate-300">
                Most dev work is built for big budgets. You need fast, scrappy builds for education, research, or civic projects.
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

          <motion.div initial={{
          opacity: 0,
          x: 30
        }} whileInView={{
          opacity: 1,
          x: 0
        }} viewport={{
          once: true
        }} transition={{
          duration: 0.6
        }} whileHover={{
          scale: 1.02,
          boxShadow: "0 20px 25px -5px hsl(var(--primary) / 0.15)"
        }} className="group rounded-3xl border border-slate-800/80 bg-gradient-to-br from-slate-950/60 to-slate-900/40 p-4 text-xs text-slate-200 sm:p-5 transition-all duration-500 hover:border-primary/30 cursor-default">
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
    </section>;
}
function WhoBenefits() {
  const audiences = ["Students bringing new ideas to life", "Teachers or nonprofits piloting campus or impact projects", "Board and governance teams seeking data clarity", "Solo founders wanting operational peace of mind", "B2B units innovating under fast timelines"];
  return <section id="benefits" className="border-t border-slate-900/80 py-10 md:py-16">
      <div className="mx-auto w-full max-w-5xl px-4 md:px-6">
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
      }}>
          <h2 className="text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
            Who Benefits?
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground md:text-base">
            This approach works for anyone who needs tangible progress without the overhead of traditional hiring.
          </p>
        </motion.div>

        <div className="mt-6 grid gap-6 md:grid-cols-2">
          <motion.div initial={{
          opacity: 0,
          x: -20
        }} whileInView={{
          opacity: 1,
          x: 0
        }} viewport={{
          once: true
        }} transition={{
          duration: 0.5,
          delay: 0.1
        }} className="rounded-2xl border border-slate-800/70 bg-slate-950/50 p-5">
            <h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-primary">
              Perfect For
            </h3>
            <ul className="mt-3 space-y-2 text-sm text-slate-200">
              {audiences.map((audience, i) => <li key={i} className="flex items-start gap-2">
                  <span className="text-primary mt-0.5">✓</span>
                  {audience}
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
          duration: 0.5,
          delay: 0.2
        }} className="rounded-2xl border border-slate-800/70 bg-slate-950/50 p-5">
            <div className="mb-4">
              <h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-primary">
                Ideal Fit
              </h3>
              <p className="mt-2 text-sm text-slate-200">
                Real feedback weekly, ready to experiment, need clear results
              </p>
            </div>
            <div>
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
    </section>;
}
function FAQSection() {
  return <section id="faq" className="border-t border-slate-900/80 py-6 md:py-10">
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
    }} className="max-w-4xl mb-4">
        <h2 className="text-lg font-semibold md:text-xl">
          FAQ
        </h2>
        <p className="mt-1.5 text-xs text-slate-300 md:text-sm">
          Like working with a senior dev on a weekly subscription.
        </p>
      </motion.div>

      {/* AI Assistant */}
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
    }} className="mb-6">
        <FAQAssistant />
      </motion.div>

      {/* FAQ Items - Compact Grid Layout */}
      <dl className="grid gap-2 sm:gap-3 sm:grid-cols-2">
        {faqs.map((item, index) => <motion.div key={item.question} initial={{
        opacity: 0,
        y: 20
      }} whileInView={{
        opacity: 1,
        y: 0
      }} viewport={{
        once: true
      }} transition={{
        duration: 0.5,
        delay: index * 0.05
      }} className="rounded-xl border border-slate-800/80 bg-slate-950/60 p-2.5 sm:p-3 hover:border-primary/30 transition-colors">
            <dt className="text-xs font-medium text-slate-50 leading-tight md:text-sm">
              {item.question}
            </dt>
            <dd className="mt-1 text-xs text-slate-300 leading-relaxed">
              {item.answer}
            </dd>
          </motion.div>)}
      </dl>
    </section>;
}
function SiteFooter() {
  return <footer className="border-t border-slate-900/80 py-4">
      <div className="flex flex-col items-start justify-between gap-2 text-[10px] text-slate-500 sm:flex-row sm:items-center md:text-xs">
        <div>© {new Date().getFullYear()} AltruisticX AI</div>
        <div className="flex flex-wrap gap-2">
          <span>Async · privacy-aware · built for pilots</span>
        </div>
      </div>
    </footer>;
}