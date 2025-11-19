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
              
              <TypicalProgression />
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
          <h2 className="text-base font-semibold tracking-tight text-foreground md:text-lg">
            Recent Builds
          </h2>
          <p className="mt-1 text-[10px] text-muted-foreground sm:text-xs">
            Small scope, real results—across energy, education, and founder projects.
          </p>
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
  const [hoveredStep, setHoveredStep] = React.useState<number | null>(null);
  const steps = [{
    label: "01",
    title: "Share your idea",
    body: "Send a doc or quick Loom/call. We scope a realistic 4-week slice.",
    gradient: "from-emerald-500/20 via-teal-500/15 to-cyan-500/20",
    glowColor: "rgba(16, 185, 129, 0.3)",
    borderColor: "border-emerald-500/30",
    progressColor: "bg-emerald-500"
  }, {
    label: "02",
    title: "Ship weekly",
    body: "Each week: one complete feature you can demo.",
    gradient: "from-purple-500/20 via-fuchsia-500/15 to-pink-500/20",
    glowColor: "rgba(168, 85, 247, 0.3)",
    borderColor: "border-purple-500/30",
    progressColor: "bg-purple-500"
  }, {
    label: "03",
    title: "Decide",
    body: "Working pilot. Clear options: go, pivot, or pause.",
    gradient: "from-orange-500/20 via-amber-500/15 to-yellow-500/20",
    glowColor: "rgba(249, 115, 22, 0.3)",
    borderColor: "border-orange-500/30",
    progressColor: "bg-orange-500"
  }];
  return <section id="how" className="border-t border-slate-900/80 py-3 md:py-4">
      <div className="mx-auto w-full max-w-5xl px-2 md:px-3">
        

        <div className="mt-2 grid gap-1.5 sm:grid-cols-3" style={{
        perspective: "1000px"
      }}>
          {steps.map((step, index) => null)}
        </div>

        {/* Interactive Timeline Bar */}
        

        {/* 4-Week Sprint Details */}
        <motion.div initial={{
        opacity: 0,
        y: 20,
        scale: 0.95
      }} whileInView={{
        opacity: 1,
        y: 0,
        scale: 1
      }} viewport={{
        once: true
      }} transition={{
        duration: 0.6,
        delay: 0.4,
        type: "spring"
      }} whileHover={{
        scale: 1.02
      }} className="mt-2 rounded-xl border border-slate-800/70 bg-gradient-to-br from-slate-950/70 to-slate-900/40 backdrop-blur-sm p-1.5 sm:p-2">
          <h3 className="text-[9px] font-semibold text-primary sm:text-[10px]">4-Week Sprint Includes</h3>
          <ul className="mt-1 space-y-0.5 text-[8px] text-slate-200 sm:text-[9px]">
            <li className="flex items-start gap-1">
              <span className="text-primary text-[9px]">✓</span>
              Weekly features you can actually demo
            </li>
            <li className="flex items-start gap-1">
              <span className="text-primary text-[9px]">✓</span>
              Async tools you already use (Loom, Notion, GitHub, Figma)
            </li>
            <li className="flex items-start gap-1">
              <span className="text-primary text-[9px]">✓</span>
              You keep all code and docs
            </li>
            <li className="flex items-start gap-1">
              <span className="text-primary text-[9px]">✓</span>
              Built for validation, fundraising, and teaching
            </li>
          </ul>
        </motion.div>
      </div>
    </section>;
}
function PilotOffer() {
  return <section id="pilot" className="border-t border-slate-900/80 py-3 md:py-4">
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
      }} className="mb-3">
          <h2 className="text-sm font-semibold tracking-tight text-foreground sm:text-base">
            Why a Pilot Partner Instead of Hiring In-House
          </h2>
          <div className="mt-2 space-y-1.5 text-xs text-muted-foreground max-w-3xl leading-relaxed">
            <p>
              Hiring in-house makes sense once you know what you're scaling. When you're still in the "is this even the right thing?" phase, it's a slow and expensive way to find out.
            </p>
            <p>
              Bringing on a full-time senior hire typically means months of recruiting, six-figure commitments, and added overhead—before you even know if the pilot is worth scaling.
            </p>
            <p className="text-foreground font-medium">
              My model is different: You bring a real problem, we design a small, honest experiment, and within a few weeks you have something you can show to leadership, funders, or partners—plus a clearer sense of what to do next.
            </p>
          </div>
        </motion.div>

        {/* What This Model Is For */}
        <motion.div initial={{
        opacity: 0,
        y: 20
      }} whileInView={{
        opacity: 1,
        y: 0
      }} viewport={{
        once: true
      }} transition={{
        duration: 0.6,
        delay: 0.1
      }} className="mb-3">
          <h3 className="text-xs font-semibold text-primary mb-2 sm:text-sm">
            What This Model Is For
          </h3>
          <div className="grid gap-1.5 sm:grid-cols-2">
            {[{
            title: "Early, ambiguous work",
            desc: "When the edges are fuzzy and you need to learn by shipping, not by planning.",
            color: "emerald",
            icon: "🧭"
          }, {
            title: "Complex domains",
            desc: "Energy, education, civic systems, compliance—places where policy, people, and tech collide.",
            color: "cyan",
            icon: "⚡"
          }, {
            title: "Proof, not promises",
            desc: "You need visible movement and credible artifacts, not another strategy deck.",
            color: "teal",
            icon: "✓"
          }, {
            title: "Lean, collaborative teams",
            desc: "You're comfortable working in short cycles, reacting to real results, and adjusting quickly.",
            color: "blue",
            icon: "⚙"
          }].map((item, i) => <motion.div key={i} initial={{
            opacity: 0,
            scale: 0.98
          }} whileInView={{
            opacity: 1,
            scale: 1
          }} viewport={{
            once: true
          }} transition={{
            duration: 0.4,
            delay: i * 0.08
          }} whileHover={{
            scale: 1.01,
            y: -1
          }} className={`group relative rounded-md border ${item.color === 'emerald' ? 'border-primary/30 bg-gradient-to-br from-primary/5' : item.color === 'cyan' ? 'border-accent/30 bg-gradient-to-br from-accent/5' : item.color === 'teal' ? 'border-primary/20 bg-gradient-to-br from-primary/5' : 'border-blue-500/30 bg-gradient-to-br from-blue-500/5'} to-slate-950/80 p-2 backdrop-blur-sm overflow-hidden transition-all`}>
                <div className="relative flex items-start gap-2">
                  <span className="text-xs flex-shrink-0">{item.icon}</span>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-semibold text-foreground">
                      {item.title}
                    </h4>
                    <p className="text-[10px] text-muted-foreground leading-relaxed mt-0.5">
                      {item.desc}
                    </p>
                  </div>
                </div>
              </motion.div>)}
          </div>
        </motion.div>

        {/* What This Model Is Not For */}
        <motion.div initial={{
        opacity: 0,
        y: 20
      }} whileInView={{
        opacity: 1,
        y: 0
      }} viewport={{
        once: true
      }} transition={{
        duration: 0.6,
        delay: 0.2
      }} className="mb-3">
          <h3 className="text-xs font-semibold text-muted-foreground mb-2 sm:text-sm">
            What This Model Is Not For
          </h3>
          <div className="rounded-md border border-slate-800/70 bg-slate-950/50 p-2">
            <ul className="space-y-1 text-[10px] text-slate-400">
              <li className="flex items-start gap-1.5">
                <span className="opacity-50 mt-0.5 text-xs">✕</span>
                <span>Large, multi-team implementations from day one</span>
              </li>
              <li className="flex items-start gap-1.5">
                <span className="opacity-50 mt-0.5 text-xs">✕</span>
                <span>Long-term headcount decisions disguised as "pilots"</span>
              </li>
              <li className="flex items-start gap-1.5">
                <span className="opacity-50 mt-0.5 text-xs">✕</span>
                <span>Purely cosmetic work where a static site or brochure would do</span>
              </li>
            </ul>
          </div>
        </motion.div>

        {/* Bottom CTA */}
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
        delay: 0.3
      }} className="rounded-md border border-primary/30 bg-gradient-to-br from-primary/5 to-slate-950/80 p-2.5 backdrop-blur-sm">
          <p className="text-xs text-foreground font-medium mb-1">
            Pilot-first, learning-first approach
          </p>
          <p className="text-[10px] text-muted-foreground leading-relaxed">
            Small scope, honest results, and no long-term lock-in until you know what's actually worth scaling.
          </p>
        </motion.div>
      </div>
    </section>;
}
function TypicalProgression() {
  return <section className="border-t border-slate-900/80 py-6 md:py-8">
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
          <h2 className="text-base font-semibold tracking-tight text-foreground md:text-lg">
            Typical Progression
          </h2>
          <p className="mt-1.5 text-[10px] text-muted-foreground sm:text-xs">
            Start small, scale when ready—or jump to any stage.
          </p>
        </motion.div>

        <div className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
          <motion.div initial={{
          opacity: 0,
          scale: 0.95
        }} whileInView={{
          opacity: 1,
          scale: 1
        }} viewport={{
          once: true
        }} transition={{
          duration: 0.5,
          delay: 0.1
        }} className="group rounded-lg border-2 border-emerald-500/50 bg-gradient-to-br from-emerald-500/20 to-teal-500/20 p-2.5 backdrop-blur-sm transition-all hover:shadow-[0_0_20px_rgba(16,185,129,0.5)]">
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] font-bold text-emerald-400 sm:text-xs">1. Pilot</span>
              <span className="text-[8px] text-emerald-300/80 sm:text-[9px]">4 weeks</span>
            </div>
            <p className="mt-1 text-[8px] leading-tight text-slate-300 sm:text-[9px]">
              Ship 1–2 features/week. Demo-ready code. Real builds, not decks. $1,150/wk.
            </p>
          </motion.div>

          <motion.div initial={{
          opacity: 0,
          scale: 0.95
        }} whileInView={{
          opacity: 1,
          scale: 1
        }} viewport={{
          once: true
        }} transition={{
          duration: 0.5,
          delay: 0.2
        }} className="group rounded-lg border-2 border-blue-500/50 bg-gradient-to-br from-blue-500/20 to-indigo-500/20 p-2.5 backdrop-blur-sm transition-all hover:shadow-[0_0_20px_rgba(59,130,246,0.5)]">
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] font-bold text-blue-400 sm:text-xs">2. Proposal</span>
              <span className="text-[8px] text-blue-300/80 sm:text-[9px]">1–2 weeks</span>
            </div>
            <p className="mt-1 text-[8px] leading-tight text-slate-300 sm:text-[9px]">
              Scope doc, timeline, budget. Grant-ready, stakeholder-approved. RFP support.
            </p>
          </motion.div>

          <motion.div initial={{
          opacity: 0,
          scale: 0.95
        }} whileInView={{
          opacity: 1,
          scale: 1
        }} viewport={{
          once: true
        }} transition={{
          duration: 0.5,
          delay: 0.3
        }} className="group rounded-lg border-2 border-violet-500/50 bg-gradient-to-br from-violet-500/20 to-purple-500/20 p-2.5 backdrop-blur-sm transition-all hover:shadow-[0_0_20px_rgba(139,92,246,0.5)]">
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] font-bold text-violet-400 sm:text-xs">3. Build</span>
              <span className="text-[8px] text-violet-300/80 sm:text-[9px]">2–6 months</span>
            </div>
            <p className="mt-1 text-[8px] leading-tight text-slate-300 sm:text-[9px]">
              Full product delivery. Integrations, testing, documentation. Launch-ready.
            </p>
          </motion.div>

          <motion.div initial={{
          opacity: 0,
          scale: 0.95
        }} whileInView={{
          opacity: 1,
          scale: 1
        }} viewport={{
          once: true
        }} transition={{
          duration: 0.5,
          delay: 0.4
        }} className="group rounded-lg border-2 border-orange-500/50 bg-gradient-to-br from-orange-500/20 to-amber-500/20 p-2.5 backdrop-blur-sm transition-all hover:shadow-[0_0_20px_rgba(249,115,22,0.5)]">
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] font-bold text-orange-400 sm:text-xs">4. Retainer</span>
              <span className="text-[8px] text-orange-300/80 sm:text-[9px]">Ongoing</span>
            </div>
            <p className="mt-1 text-[8px] leading-tight text-slate-300 sm:text-[9px]">
              Monthly support. Bug fixes, features, pivots. Always-on expertise.
            </p>
          </motion.div>
        </div>
      </div>
    </section>;
}
function WhoBenefits() {
  const audiences = ["Students bringing new ideas to life", "Teachers or nonprofits piloting campus or impact projects", "Boards and governance teams needing clearer dashboards", "Solo founders wanting operational peace of mind", "B2B units innovating on tight timelines"];
  return <section id="benefits" className="border-t border-slate-900/80 py-6 md:py-8">
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
          <h2 className="text-base font-semibold tracking-tight text-foreground md:text-lg">
            Who Benefits?
          </h2>
          <p className="mt-1.5 max-w-2xl text-[10px] leading-relaxed text-muted-foreground sm:text-xs">
            This model is for anyone who needs <span className="text-primary font-medium">tangible progress without hiring overhead</span>.
          </p>
        </motion.div>

        <div className="mt-4 grid gap-4 md:grid-cols-2">
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
        }} className="rounded-xl border border-slate-800/70 bg-slate-950/50 p-3">
            <h3 className="text-[10px] font-semibold uppercase tracking-[0.16em] text-primary sm:text-xs">
              Perfect For
            </h3>
            <ul className="mt-2 space-y-1 text-[10px] text-slate-200 sm:text-xs">
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
        }} className="rounded-xl border border-slate-800/70 bg-slate-950/50 p-3">
            <div className="mb-3">
              <h3 className="text-[10px] font-semibold uppercase tracking-[0.16em] text-primary sm:text-xs">
                Ideal Fit
              </h3>
              <p className="mt-1 text-[10px] text-slate-200 sm:text-xs">
                Weekly feedback, ready to experiment, need clear results
              </p>
            </div>
            <div>
              <h3 className="text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-400 sm:text-xs">
                Not a Fit
              </h3>
              <p className="mt-1 text-[10px] text-slate-400 sm:text-xs">
                Big static sites, slow-moving teams, no feedback loop
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>;
}
function FAQSection() {
  return <section id="faq" className="border-t border-slate-900/80 py-6 md:py-8">
      

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
    }} className="mb-4">
        <FAQAssistant />
      </motion.div>

      {/* FAQ Items - Compact Grid Layout */}
      <dl className="grid gap-2 sm:gap-2.5 sm:grid-cols-2">
        {faqs.map((item, index) => null)}
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