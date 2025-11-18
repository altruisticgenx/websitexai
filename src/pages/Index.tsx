import React, { useState, useEffect } from "react";
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
import { AnimatedBackground } from "@/components/AnimatedBackground";
import { FlipCard3D } from "@/components/FlipCard3D";
import { useActiveSection } from "@/hooks/use-active-section";
import { useKeyboardNavigation } from "@/hooks/use-keyboard-navigation";
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
    <div className="relative min-h-screen bg-slate-950 text-slate-50">
      {/* Animated Background */}
      <AnimatedBackground />
      
      {/* Sticky Navigation */}
      <SiteNav />
      
      <div className="relative z-10 mx-auto flex min-h-screen max-w-6xl flex-col px-4 sm:px-6 lg:px-8">
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
                <TestimonialsVariant />
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

function Hero() {
  return (
    <section className="relative py-16 sm:py-24 overflow-hidden">
      {/* Animated Gradient Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10 animate-gradient"></div>
        <div className="absolute top-1/4 -left-48 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 -right-48 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="grid gap-12 lg:grid-cols-[1.2fr,1fr] lg:gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 backdrop-blur-sm px-4 py-2 text-xs font-medium text-primary shadow-lg shadow-primary/20"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            Ship pilot-ready AI tech in weekly sprints
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="mt-6 text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight"
          >
            <span className="bg-gradient-to-r from-foreground via-foreground to-primary bg-clip-text text-transparent">
              Build, Learn, Lead
            </span>
            <br />
            <span className="text-primary">on Your Terms</span>
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="mt-6 max-w-2xl text-base sm:text-lg leading-relaxed text-muted-foreground"
          >
            Are you a student, teacher, founder, B2B team, or changemaker in{" "}
            <span className="text-foreground font-semibold">energy, education, or governance</span>? 
            Skip the slow hiring process and unlock{" "}
            <span className="text-primary font-semibold">senior AI/product execution</span>
            —in focused pilots, shipped week by week.
          </motion.p>

          {/* Feature Cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="mt-8 grid gap-4 sm:grid-cols-3"
          >
            <div className="group relative overflow-hidden rounded-2xl border border-border bg-card/50 backdrop-blur-sm p-5 hover:border-primary/40 hover:bg-card/80 transition-all duration-300 hover:scale-105">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <dt className="text-xs font-semibold uppercase tracking-wider text-primary">
                Work hands-on
              </dt>
              <dd className="relative mt-2 text-sm font-medium text-foreground leading-relaxed">
                Build with real tools and ship working prototypes.
              </dd>
            </div>

            <div className="group relative overflow-hidden rounded-2xl border border-border bg-card/50 backdrop-blur-sm p-5 hover:border-primary/40 hover:bg-card/80 transition-all duration-300 hover:scale-105">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <dt className="text-xs font-semibold uppercase tracking-wider text-primary">
                Launch tools
              </dt>
              <dd className="relative mt-2 text-sm font-medium text-foreground leading-relaxed">
                Deploy features users can actually test and use.
              </dd>
            </div>

            <div className="group relative overflow-hidden rounded-2xl border border-border bg-card/50 backdrop-blur-sm p-5 hover:border-primary/40 hover:bg-card/80 transition-all duration-300 hover:scale-105">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <dt className="text-xs font-semibold uppercase tracking-wider text-primary">
                Start small
              </dt>
              <dd className="relative mt-2 text-sm font-medium text-foreground leading-relaxed">
                First meaningful code in Week 1, ready to demo.
              </dd>
            </div>
          </motion.div>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="mt-10 flex flex-col sm:flex-row gap-4"
          >
            <a
              href="mailto:hello@altruisticxai.com"
              className="group relative inline-flex items-center justify-center gap-2 rounded-full bg-primary px-8 py-4 text-base font-semibold text-primary-foreground overflow-hidden hover:scale-105 transition-all duration-300 shadow-xl shadow-primary/30"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-primary via-accent to-primary bg-[length:200%_100%] animate-gradient"></span>
              <span className="relative">Book 30-min Intro</span>
              <svg className="relative w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </a>

            <a
              href="https://www.linkedin.com/in/ik11"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-primary/40 bg-primary/5 backdrop-blur-sm px-8 py-4 text-base font-semibold text-primary hover:bg-primary/10 hover:border-primary/60 transition-all duration-300"
            >
              <Linkedin size={20} />
              Connect on LinkedIn
            </a>
          </motion.div>
        </motion.div>

        {/* Right Side - Build Fast Kit */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="relative group"
        >
          <div className="absolute -inset-1 bg-gradient-to-r from-primary/30 to-accent/30 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          
          <div className="relative rounded-3xl border border-border bg-card/80 backdrop-blur-xl p-6 sm:p-8 shadow-2xl overflow-hidden">
            {/* Subtle background pattern */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5"></div>
            
            <div className="relative">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-semibold uppercase tracking-wider text-primary">
                  Build Fast Kit
                </span>
                <span className="text-xs text-muted-foreground">/ 4-week pilot</span>
              </div>
              
              <p className="mt-4 text-base font-medium text-foreground leading-relaxed">
                One senior engineer. One small backlog. 4 weeks to prove whether
                this pilot is worth scaling.
              </p>
              
              <div className="mt-6 space-y-3">
                <VisualRow 
                  label="Week 1" 
                  title="Clarify & ship the first slice" 
                  body="Turn the idea into 1–2 concrete flows. Ship a working skeleton instead of a deck." 
                />
                <VisualRow 
                  label="Week 2–3" 
                  title="Tighten the flows" 
                  body="Integrate data, refine UX, and make it demo-able to internal stakeholders." 
                />
                <VisualRow 
                  label="Week 4" 
                  title="Decide with evidence" 
                  body="You walk away with a working repo, a clear walkthrough, and a decision: scale, pivot, or park." 
                />
              </div>

              <div className="mt-6 pt-6 border-t border-border/50">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Pilot pricing</span>
                  <span className="text-2xl font-bold text-primary">$1,150<span className="text-sm font-normal text-muted-foreground">/week</span></span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
function VisualRow({
  label,
  title,
  body
}: {
  label: string;
  title: string;
  body: string;
}) {
  return (
    <div className="group flex gap-4 rounded-2xl border border-border bg-background/50 backdrop-blur-sm p-4 hover:border-primary/40 hover:bg-background/80 transition-all duration-300 hover:scale-[1.02]">
      <div className="flex-shrink-0">
        <div className="flex h-10 w-16 items-center justify-center rounded-lg bg-primary/10 text-xs font-mono font-bold text-primary border border-primary/20">
          {label}
        </div>
      </div>
      <div className="flex-1">
        <div className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">{title}</div>
        <div className="mt-1 text-xs text-muted-foreground leading-relaxed">{body}</div>
      </div>
    </div>
  );
}
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
    <section id="builds" className="py-10 sm:py-14">
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
        <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => (
            <FlipCard3D key={project.id} project={project} index={index} />
          ))}
        </div>
      )}
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
  return <section id="how" className="border-t border-slate-900/80 py-10 sm:py-14">
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
}
function PilotOffer() {
  return <section id="pilot" className="border-t border-slate-900/80 py-10 sm:py-14">
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
      }} className="rounded-3xl border border-slate-800/80 bg-slate-950/60 p-4 text-xs text-slate-200 sm:p-5">
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
}
function WhoBenefits() {
  const audiences = ["Students bringing new ideas to life", "Teachers or nonprofits piloting campus or impact projects", "Board and governance teams seeking data clarity", "Solo founders wanting operational peace of mind", "B2B units innovating under fast timelines"];
  return <section id="benefits" className="border-t border-slate-900/80 py-10 sm:py-14">
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
}
function FAQSection() {
  return (
    <section id="faq" className="border-t border-slate-900/80 py-8 sm:py-12">
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
}

function ContactSection() {
  return <section id="contact" className="border-t border-slate-900/80 py-10 sm:py-14">
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
}

function SiteFooter() {
  return <footer className="border-t border-slate-900/80 py-6">
      <div className="flex flex-col items-start justify-between gap-3 text-xs text-slate-500 sm:flex-row sm:items-center">
        <div>© {new Date().getFullYear()} AltruisticX · AI + Product Engineer</div>
        <div className="flex flex-wrap gap-3">
          <span>Async-first · privacy-aware · built for pilots, classrooms, and fast-moving teams</span>
        </div>
      </div>
    </footer>;
}