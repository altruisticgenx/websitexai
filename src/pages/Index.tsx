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

import { ScrollToTop } from "@/components/ScrollToTop";
import { ScrollProgress } from "@/components/ScrollProgress";
import { KeyboardShortcutsHelp } from "@/components/KeyboardShortcutsHelp";
import { useActiveSection } from "@/hooks/use-active-section";
import { useKeyboardNavigation } from "@/hooks/use-keyboard-navigation";
import { cn } from "@/lib/utils";
import { supabase } from "@/integrations/supabase/client";
import { SiteNav } from "@/components/SiteNav";
import { HeroSkeleton, CardsSkeleton, StepsSkeleton, TwoColumnSkeleton } from "@/components/skeletons/SectionSkeleton";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

// --- Data Definitions ---

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
              <PilotOffer />
              <WhoBenefits />
              <OrganizationTypes />
              <WhereIWork />
              <ShelvedExperiments />
              <AboutMe />
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

function FeatureCardWithTooltip({ item, index }: { item: { title: string; desc: string; color: string; icon: string; example: string }; index: number }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Tooltip open={isOpen} onOpenChange={setIsOpen}>
      <TooltipTrigger asChild>
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: index * 0.08 }}
          whileHover={{ scale: 1.01, y: -1 }}
          onClick={handleClick}
          onTouchStart={handleClick}
          className={`group relative rounded-md border ${
            item.color === 'emerald'
              ? 'border-primary/30 bg-gradient-to-br from-primary/5'
              : item.color === 'cyan'
              ? 'border-accent/30 bg-gradient-to-br from-accent/5'
              : item.color === 'teal'
              ? 'border-primary/20 bg-gradient-to-br from-primary/5'
              : 'border-blue-500/30 bg-gradient-to-br from-blue-500/5'
          } to-slate-950/80 p-2 backdrop-blur-sm overflow-hidden transition-all cursor-pointer touch-manipulation active:scale-[0.98]`}
        >
          <div className="relative flex items-start gap-2">
            <div className="flex-1 min-w-0">
              <h4 className="text-xs font-semibold text-foreground">
                {item.title}
              </h4>
              <p className="body-sm text-muted-foreground leading-relaxed mt-0.5">
                {item.desc}
              </p>
            </div>
          </div>
        </motion.div>
      </TooltipTrigger>
      <TooltipContent side="top" className="max-w-[280px] bg-slate-900/95 border-primary/30 backdrop-blur-sm">
        <p className="body-sm text-slate-200 leading-relaxed">
          <span className="font-semibold text-primary">Real Example:</span> {item.example}
        </p>
      </TooltipContent>
    </Tooltip>
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
          <h2 className="heading-3 text-foreground text-reveal">
            Recent Builds
          </h2>
          <p className="mt-1 body-base text-muted-foreground text-reveal text-reveal-delay-1">
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
      }} className="mt-6 horizontal-scroll pb-2">
            <CaseStudiesStack caseStudies={projects} />
          </motion.div>}
      </div>
    </section>;
}
function PilotOffer() {
  return <section id="pilot" className="border-t border-slate-900/80 py-3 md:py-4 gradient-mesh">
      <div className="mx-auto w-full max-w-5xl px-3 md:px-4 organic-spacing">
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
      }} className="mb-3 isolated-component">
          <h2 className="text-sm font-semibold tracking-tight text-foreground sm:text-base text-reveal">
            Why a Pilot Partner Instead of Hiring In-House
          </h2>
          <ul className="mt-2 space-y-1.5 max-w-3xl">
            {[
              "Hiring in-house makes sense once you know what you're scaling. When you're still in the \"is this even the right thing?\" phase, it's a slow and expensive way to find out.",
              "Bringing on a full-time senior hire typically means months of recruiting, six-figure commitments, and added overhead—before you even know if the pilot is worth scaling.",
              "My model is different: You bring a real problem, we design a small, honest experiment, and within a few weeks you have something you can show to leadership, funders, or partners—plus a clearer sense of what to do next."
            ].map((text, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className={`flex items-start gap-2 body-base leading-relaxed ${i === 2 ? 'text-foreground font-medium' : 'text-muted-foreground'}`}
              >
                <span className="text-primary mt-0.5 text-xs">•</span>
                <span>{text}</span>
              </motion.li>
            ))}
          </ul>
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
          <TooltipProvider delayDuration={200}>
            <div className="grid gap-1.5 sm:grid-cols-2">
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
            }].map((item, i) => <FeatureCardWithTooltip key={i} item={item} index={i} />)}
            </div>
          </TooltipProvider>
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
            <ul className="space-y-1 body-base text-slate-400">
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
          <p className="body-base text-muted-foreground leading-relaxed">
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
          <h2 className="heading-3 text-foreground text-reveal">
            Typical Progression
          </h2>
          <p className="mt-1.5 body-base text-muted-foreground text-reveal text-reveal-delay-1">
            Start small, scale when ready—or jump to any stage.
          </p>
        </motion.div>

        <div className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-4 fluid-space">
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
        }} className="group rounded-lg border-2 border-emerald-500/50 bg-gradient-to-br from-emerald-500/20 to-teal-500/20 p-2.5 backdrop-blur-sm transition-all hover:shadow-[0_0_20px_rgba(16,185,129,0.5)] isolated-component preserve-3d">
            <div className="flex items-center gap-1.5">
              <span className="body-sm font-bold text-emerald-400">1. Pilot</span>
              <span className="caption text-emerald-300/80">4 weeks</span>
            </div>
            <p className="mt-1 body-sm leading-tight text-slate-300">
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
        }} className="group rounded-lg border-2 border-blue-500/50 bg-gradient-to-br from-blue-500/20 to-indigo-500/20 p-2.5 backdrop-blur-sm transition-all hover:shadow-[0_0_20px_rgba(59,130,246,0.5)] isolated-component preserve-3d">
            <div className="flex items-center gap-1.5">
              <span className="body-sm font-bold text-blue-400">2. Proposal</span>
              <span className="caption text-blue-300/80">1–2 weeks</span>
            </div>
            <p className="mt-1 body-sm leading-tight text-slate-300">
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
        }} className="group rounded-lg border-2 border-violet-500/50 bg-gradient-to-br from-violet-500/20 to-purple-500/20 p-2.5 backdrop-blur-sm transition-all hover:shadow-[0_0_20px_rgba(139,92,246,0.5)] isolated-component preserve-3d">
            <div className="flex items-center gap-1.5">
              <span className="body-sm font-bold text-violet-400">3. Build</span>
              <span className="caption text-violet-300/80">2–6 months</span>
            </div>
            <p className="mt-1 body-sm leading-tight text-slate-300">
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
        }} className="group rounded-lg border-2 border-orange-500/50 bg-gradient-to-br from-orange-500/20 to-amber-500/20 p-2.5 backdrop-blur-sm transition-all hover:shadow-[0_0_20px_rgba(249,115,22,0.5)] isolated-component preserve-3d">
            <div className="flex items-center gap-1.5">
              <span className="body-sm font-bold text-orange-400">4. Retainer</span>
              <span className="caption text-orange-300/80">Ongoing</span>
            </div>
            <p className="mt-1 body-sm leading-tight text-slate-300">
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
          <h2 className="heading-3 text-foreground">
            Who Benefits?
          </h2>
          <p className="mt-1.5 max-w-2xl body-base leading-relaxed text-muted-foreground">
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
            <h3 className="label text-primary">
              Perfect For
            </h3>
            <ul className="mt-2 space-y-1 body-base text-slate-200">
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
              <h3 className="label text-primary">
                Ideal Fit
              </h3>
              <p className="mt-1 body-base text-slate-200">
                Weekly feedback, ready to experiment, need clear results
              </p>
            </div>
            <div>
              <h3 className="label text-slate-400">
                Not a Fit
              </h3>
              <p className="mt-1 body-base text-slate-400">
                Big static sites, slow-moving teams, no feedback loop
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>;
}
function AboutMe() {
  return (
    <section id="about" className="border-t border-slate-900/80 py-6 md:py-8 gradient-mesh">
      <div className="mx-auto w-full max-w-5xl px-3 md:px-4 organic-spacing">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="space-y-2"
        >
          <h2 className="heading-3 text-foreground text-reveal">
            About Me
          </h2>
          <motion.p
            className="body-base text-muted-foreground max-w-3xl text-reveal text-reveal-delay-1"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            I aim to close the gap between proven innovations and implementation by giving anyone the tools to turn regional data, successful pilots, and stalled legislation into AI-assisted solutions for any sector.
          </motion.p>
        </motion.div>

        {/* Why This Matters Section - 3D Glowing Card */}
        <motion.div
          className="relative mt-6 group perspective-1000"
          initial={{ opacity: 0, y: 30, rotateX: -10 }}
          whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2, type: "spring", bounce: 0.3 }}
          whileHover={{ 
            scale: 1.02,
            rotateX: 2,
            rotateY: -2,
            transition: { duration: 0.3 }
          }}
          style={{ transformStyle: "preserve-3d" }}
        >
          {/* Glow effect background */}
          <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-500 via-cyan-500 to-emerald-500 rounded-2xl opacity-0 group-hover:opacity-30 blur-lg transition-all duration-500 animate-pulse" />
          
          {/* Main card */}
          <div className="relative rounded-xl border border-slate-800/70 bg-gradient-to-br from-slate-950/95 via-slate-900/95 to-slate-950/95 backdrop-blur-xl p-4 md:p-5 shadow-2xl overflow-hidden">
            {/* Animated gradient overlay */}
            <motion.div 
              className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-transparent to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              animate={{
                backgroundPosition: ['0% 0%', '100% 100%'],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            />
            
            {/* Scanning line effect */}
            <motion.div 
              className="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-emerald-400/50 to-transparent"
              animate={{
                top: ['-100%', '200%']
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "linear"
              }}
            />
            
            <div className="relative z-10">
              <h3 className="heading-4 text-foreground flex items-center gap-2">
                <motion.span
                  className="inline-block w-2 h-2 rounded-full bg-emerald-400"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [1, 0.5, 1]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity
                  }}
                />
                Why This Matters
              </h3>
              
              <motion.p
                className="mt-2 body-sm text-muted-foreground"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                Pennsylvania cannot afford another decade of:
              </motion.p>
              
              <ul className="mt-3 space-y-1.5">
                {[
                  "Delayed modernization while comparable states advance",
                  "Legislative gridlock on education and infrastructure",
                  "Workforce development disconnected from regional needs",
                  "Civics education that feels irrelevant to students",
                  "Declining trust in public institutions"
                ].map((item, index) => (
                  <motion.li
                    key={index}
                    className="flex items-start gap-2 caption text-muted-foreground/90 group/item"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ 
                      duration: 0.5, 
                      delay: 0.4 + index * 0.08,
                      type: "spring",
                      stiffness: 100
                    }}
                    whileHover={{
                      x: 4,
                      transition: { duration: 0.2 }
                    }}
                  >
                    <motion.span 
                      className="inline-block w-1 h-1 mt-1 rounded-full bg-emerald-400/70 flex-shrink-0"
                      whileHover={{ 
                        scale: 1.5,
                        backgroundColor: "rgb(52, 211, 153)"
                      }}
                      animate={{
                        scale: [1, 1.1, 1],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: index * 0.2
                      }}
                    />
                    <span className="flex-1 group-hover/item:text-muted-foreground transition-colors">{item}</span>
                  </motion.li>
                ))}
              </ul>

              <motion.div
                className="mt-5 pt-4 border-t border-slate-800/50"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.9 }}
              >
                <p className="body-base text-foreground leading-relaxed font-medium">
                  This work provides the missing infrastructure for a state with all the necessary components but no system connecting them.
                </p>
              </motion.div>
            </div>
            
            {/* Corner accent */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-emerald-500/10 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
function SiteFooter() {
  return <footer className="border-t border-slate-900/80 py-4">
      <div className="flex flex-col items-start justify-between gap-2 body-sm text-slate-500 sm:flex-row sm:items-center">
        <div>© {new Date().getFullYear()} AltruisticX AI</div>
        <div className="flex flex-wrap gap-2">
          <span>Async · privacy-aware · built for pilots</span>
        </div>
      </div>
    </footer>;
}