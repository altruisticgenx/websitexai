import React, { useState, useEffect, memo, useMemo, useCallback } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { TestimonialsVariant, CaseStudiesStack } from "@/components/ui/animated-cards-stack";
import { Linkedin } from "lucide-react";
import { ShelvedExperiments } from "@/components/ShelvedExperiments";
import { WhereIWork } from "@/components/WhereIWork";
import { OrganizationTypes } from "@/components/OrganizationTypes";
import { EngagementModels } from "@/components/EngagementModels";
import { ContactForm } from "@/components/ContactForm";
import { FAQAssistant } from "@/components/FAQAssistant";
import { Toaster } from "@/components/ui/toaster";
import { ScrollToTop } from "@/components/ScrollToTop";
import { KeyboardShortcutsHelp } from "@/components/KeyboardShortcutsHelp";
import { useActiveSection } from "@/hooks/use-active-section";
import { useKeyboardNavigation } from "@/hooks/use-keyboard-navigation";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { useParallax } from "@/hooks/use-parallax";
import { cn } from "@/lib/utils";
import { supabase } from "@/integrations/supabase/client";
import { SiteNav } from "@/components/SiteNav";
import { 
  HeroSkeleton, 
  CardsSkeleton, 
  StepsSkeleton, 
  TwoColumnSkeleton, 
  FAQSkeleton,
  ContactSkeleton 
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
      {/* Sticky Navigation */}
      <SiteNav />
      
      <div className="mx-auto flex min-h-screen max-w-6xl flex-col px-4 sm:px-6 lg:px-8">
        <main className="flex-1 pt-8">
          {isLoading ? (
            <div className="animate-pulse">
              <HeroSkeleton />
              <CardsSkeleton />
              <StepsSkeleton />
              <TwoColumnSkeleton />
              <StepsSkeleton count={2} />
              <CardsSkeleton count={3} />
              <FAQSkeleton />
              <ContactSkeleton />
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
                <ParallaxWrapper distance={50}>
                  <TestimonialsVariant />
                </ParallaxWrapper>
              </div>
              <FAQSection />
              <ContactSection />
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

// Optimized Hero component with React.memo
const Hero = memo(function Hero() {
  const { elementRef, isVisible } = useScrollAnimation();
  const { ref: parallaxRef, y: parallaxY } = useParallax(100);
  
  return <section 
    ref={elementRef}
    className={cn(
      "py-10 sm:py-14 transition-all duration-700 relative",
      isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
    )}
  >
      <div className="grid gap-10 md:grid-cols-[minmax(0,1.4fr),minmax(0,1fr)] md:items-center">
        <div className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-3 py-1 text-[11px] font-medium text-foreground">
            <span className="inline-flex h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
            Ship pilot-ready AI tech in weekly sprints
          </div>

          <h1 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl">
            Build, Learn, Lead—on Your Terms
          </h1>

          <p className="mt-4 max-w-xl text-sm text-slate-300 sm:text-base">
            Are you a student, teacher, founder, B2B team, or changemaker in energy, education, or governance? 
            Skip the slow hiring process and unlock <span className="text-primary font-medium">senior AI/product execution</span>—in focused pilots, shipped week by week.
          </p>

          <dl className="mt-6 grid max-w-xl grid-cols-1 gap-4 text-xs text-slate-200 sm:grid-cols-3 sm:text-sm">
            <div className="rounded-2xl border border-slate-800/70 bg-slate-900/70 p-3 hover:border-primary/30 transition-colors animate-fade-in" style={{ animationDelay: '0.4s' }}>
              <dt className="text-[11px] uppercase tracking-[0.16em] text-slate-400">
                Work hands-on
              </dt>
              <dd className="mt-1 font-medium text-slate-50">
                Build with real tools and ship working prototypes.
              </dd>
            </div>
            <div className="rounded-2xl border border-slate-800/70 bg-slate-900/70 p-3 hover:border-primary/30 transition-colors animate-fade-in" style={{ animationDelay: '0.5s' }}>
              <dt className="text-[11px] uppercase tracking-[0.16em] text-slate-400">
                Launch actionable tools
              </dt>
              <dd className="mt-1 font-medium text-slate-50">
                Deploy features users can actually test and use.
              </dd>
            </div>
            <div className="rounded-2xl border border-slate-800/70 bg-slate-900/70 p-3 hover:border-primary/30 transition-colors animate-fade-in" style={{ animationDelay: '0.6s' }}>
              <dt className="text-[11px] uppercase tracking-[0.16em] text-slate-400">
                Start small, deliver early
              </dt>
              <dd className="mt-1 font-medium text-slate-50">
                First meaningful code in Week 1, ready to demo.
              </dd>
            </div>
          </dl>

          <div className="mt-6 flex flex-col gap-3 text-sm">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
              
              <a href="https://www.linkedin.com/in/ik11" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 rounded-full border border-primary/60 bg-primary/10 px-5 py-2.5 text-sm font-medium text-primary hover:bg-primary/20 transition-colors">
                <Linkedin size={16} />
                Connect on LinkedIn
              </a>
            </div>
            
          </div>
        </div>

        <motion.div 
          ref={parallaxRef}
          style={{ y: parallaxY, position: "relative" }}
          className="rounded-3xl border border-slate-800/80 bg-slate-900/60 p-4 sm:p-5 shadow-2xl shadow-primary/5 animate-fade-in"
        >
          <div className="text-xs font-mono text-slate-400">
            Build Fast Kit / 4-week pilot
          </div>
          <p className="mt-2 text-sm text-slate-200">
            One senior engineer. One small backlog. 4 weeks to prove whether
            this pilot is worth scaling.
          </p>
          <div className="mt-4 grid gap-3 text-xs text-slate-200">
            <VisualRow label="Week 1" title="Clarify & ship the first slice" body="Turn the idea into 1–2 concrete flows. Ship a working skeleton instead of a deck." />
            <VisualRow label="Week 2–3" title="Tighten the flows" body="Integrate data, refine UX, and make it demo-able to internal stakeholders." />
            <VisualRow label="Week 4" title="Decide with evidence" body="You walk away with a working repo, a clear walkthrough, and a decision: scale, pivot, or park." />
          </div>
        </motion.div>
      </div>
    </section>;
});

// Optimized VisualRow component with React.memo
const VisualRow = memo(function VisualRow({
  label,
  title,
  body
}: {
  label: string;
  title: string;
  body: string;
}) {
  const { ref: parallaxRef, y: parallaxY } = useParallax(30);
  
  return <motion.div 
    ref={parallaxRef}
    style={{ y: parallaxY, position: "relative" }}
    className="flex gap-3 rounded-2xl border border-slate-800/80 bg-slate-950/40 p-3 hover:border-primary/20 hover:bg-slate-950/60 transition-all duration-300"
  >
      <div className="mt-0.5 w-14 flex-shrink-0 text-[11px] font-mono uppercase tracking-[0.16em] text-primary">
        {label}
      </div>
      <div>
        <div className="text-[13px] font-medium text-slate-50">{title}</div>
        <div className="mt-1 text-[12px] text-slate-300">{body}</div>
      </div>
    </motion.div>;
});

// Optimized RecentBuilds component with React.memo
const RecentBuilds = memo(function RecentBuilds() {
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

  const { elementRef, isVisible } = useScrollAnimation();
  
  return (
    <section 
      id="builds" 
      ref={elementRef}
      className={cn(
        "py-10 sm:py-14 transition-all duration-700",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      )}
    >
      <motion.div 
        initial={{ opacity: 0, y: 20 }} 
        whileInView={{ opacity: 1, y: 0 }} 
        viewport={{ once: true }} 
        transition={{ duration: 0.5 }} 
        className="flex items-end justify-between gap-4"
      >
        <div>
          <h2 className="text-xl font-semibold sm:text-2xl">
            Proof: Recent builds & pilots
          </h2>
          <p className="mt-2 max-w-xl text-sm text-slate-300">
            Real examples from energy, education, and founder-backed work. The
            details change, but the pattern is the same: pick a small surface
            area and ship something real.
          </p>
        </div>
      </motion.div>

      {isLoadingProjects ? (
        <div className="mt-10">
          <CardsSkeleton />
        </div>
      ) : error ? (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-10 rounded-2xl border border-red-400/20 bg-red-400/10 p-6 text-center"
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
          className="mt-10 rounded-2xl border border-slate-800/80 bg-slate-900/60 p-8 text-center"
        >
          <p className="text-sm text-slate-400">No projects available yet. Check back soon!</p>
        </motion.div>
      ) : (
        <ParallaxWrapper distance={60}>
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-10"
          >
            <CaseStudiesStack caseStudies={projects} />
          </motion.div>
        </ParallaxWrapper>
      )}
    </section>
  );
});

// Optimized HowItWorks component with React.memo  
const HowItWorks = memo(function HowItWorks() {
  const { elementRef, isVisible } = useScrollAnimation();
  
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
  
  return <section 
    id="how" 
    ref={elementRef}
    className={cn(
      "border-t border-slate-900/80 py-10 sm:py-14 transition-all duration-700",
      isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
    )}
  >
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
    }} className="max-w-4xl">
        <h2 className="text-xl font-semibold sm:text-2xl">
          How Our Experimental Pilot Works
        </h2>
        <p className="mt-2 text-sm text-slate-300">
          <span className="text-primary font-medium">The Build Fast Kit: 4 weeks. 3 steps.</span> Intentionally simple. 
          No massive discovery phase, no 40-page decks. Just a tight loop around one meaningful pilot.
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
      }} className="rounded-2xl border border-slate-800/70 bg-slate-950/50 p-4 text-sm hover:border-primary/30 transition-colors">
            <div className="text-[11px] font-mono uppercase tracking-[0.18em] text-primary">
              {step.label}
            </div>
            <h3 className="mt-2 text-sm font-semibold text-slate-50">
              {step.title}
            </h3>
            <p className="mt-2 text-[13px] text-slate-300">{step.body}</p>
          </motion.div>)}
      </div>
    </section>;
});

const PilotOffer = memo(function PilotOffer() {
  const { elementRef, isVisible } = useScrollAnimation();
  const { ref: parallaxRef, y: parallaxY } = useParallax(80);
  
  return <section 
    id="pilot" 
    ref={elementRef}
    className={cn(
      "border-t border-slate-900/80 py-10 sm:py-14 transition-all duration-700 relative",
      isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
    )}
  >
      <div className="grid gap-8 md:grid-cols-[minmax(0,1.3fr),minmax(0,1fr)] md:items-center">
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
          <h2 className="text-xl font-semibold sm:text-2xl">
            Offer: Try a 4-Week Sprint
          </h2>
          <p className="mt-2 text-sm text-slate-300">
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
            <p className="text-xs text-slate-400 sm:text-[13px]">
              Send a quick Loom or doc about your project. If it's a fit, we
              can start shipping next week.
            </p>
          </div>
        </motion.div>

        <motion.div 
          ref={parallaxRef}
          initial={{
            opacity: 0,
            x: 30
          }} 
          whileInView={{
            opacity: 1,
            x: 0
          }} 
          viewport={{
            once: true
          }} 
          transition={{
            duration: 0.6
          }}
          style={{ y: parallaxY, position: "relative" }}
          className="rounded-3xl border border-slate-800/80 bg-slate-950/60 p-4 text-xs text-slate-200 sm:p-5 shadow-2xl shadow-primary/5"
        >
          <div className="text-[11px] font-mono uppercase tracking-[0.18em] text-slate-400">
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

          <div className="mt-5 text-[11px] font-mono uppercase tracking-[0.18em] text-slate-400">
            Not a fit
          </div>
          <ul className="mt-2 space-y-1 text-slate-400">
            <li className="flex items-start gap-2">
              <span>✕</span>
              You want a big team and a huge scope from day one.
            </li>
            <li className="flex items-start gap-2">
              <span>✕</span>
              You aren't ready to give real feedback weekly.
            </li>
            <li className="flex items-start gap-2">
              <span>✕</span>
              You just need a static marketing site or brochure.
            </li>
          </ul>
        </motion.div>
      </div>
    </section>;
});

const WhoBenefits = memo(function WhoBenefits() {
  const { elementRef, isVisible } = useScrollAnimation();
  
  const audiences = ["Students bringing new ideas to life", "Teachers or nonprofits piloting campus or impact projects", "Board and governance teams seeking data clarity", "Solo founders wanting operational peace of mind", "B2B units innovating under fast timelines"];
  
  return <section 
    id="benefits" 
    ref={elementRef}
    className={cn(
      "border-t border-slate-900/80 py-10 sm:py-14 transition-all duration-700",
      isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
    )}
  >
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
    }} className="max-w-4xl">
        <h2 className="text-xl font-semibold sm:text-2xl">
          Who Benefits?
        </h2>
        <p className="mt-2 text-sm text-slate-300">
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
    </section>;
});

const FAQSection = memo(function FAQSection() {
  const { elementRef, isVisible } = useScrollAnimation();
  
  return (
    <section 
      id="faq" 
      ref={elementRef}
      className={cn(
        "border-t border-slate-900/80 py-8 sm:py-12 transition-all duration-700",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      )}
    >
      <motion.div 
        initial={{ opacity: 0, y: 20 }} 
        whileInView={{ opacity: 1, y: 0 }} 
        viewport={{ once: true }} 
        transition={{ duration: 0.5 }} 
        className="max-w-4xl mb-6"
      >
        <h2 className="text-lg sm:text-xl font-semibold">
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
});

const ContactSection = memo(function ContactSection() {
  const { elementRef, isVisible } = useScrollAnimation();
  
  return <section 
    id="contact" 
    ref={elementRef}
    className={cn(
      "border-t border-slate-900/80 py-10 sm:py-14 transition-all duration-700",
      isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
    )}
  >
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
    }} className="max-w-2xl mx-auto">
        <ContactForm />
      </motion.div>
    </section>;
});

// Optimized Parallax wrapper component with React.memo
const ParallaxWrapper = memo(function ParallaxWrapper({ 
  children, 
  distance = 50 
}: { 
  children: React.ReactNode; 
  distance?: number;
}) {
  const { ref, y } = useParallax(distance);
  
  return (
    <motion.div ref={ref} style={{ y, position: "relative" }}>
      {children}
    </motion.div>
  );
});

const SiteFooter = memo(function SiteFooter() {
  return <footer className="border-t border-slate-900/80 py-6">
      <div className="flex flex-col items-start justify-between gap-3 text-xs text-slate-500 sm:flex-row sm:items-center">
        <div>© {new Date().getFullYear()} AltruisticX · AI + Product Engineer</div>
        <div className="flex flex-wrap gap-3">
          <span>Async-first · privacy-aware · built for pilots, classrooms, and fast-moving teams</span>
        </div>
      </div>
    </footer>;
});