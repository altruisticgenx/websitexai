import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { TestimonialsVariant, CaseStudiesStack } from "@/components/ui/animated-cards-stack";
import { GraduationCap, Zap, Building2, AlertCircle, ChevronDown } from "lucide-react";
import { MobileHeader } from "@/components/MobileHeader";
import { ContactForm } from "@/components/ContactForm";
import { FAQAssistant } from "@/components/FAQAssistant";
import { Toaster } from "@/components/ui/toaster";
import { ScrollToTop } from "@/components/ScrollToTop";
import { KeyboardShortcutsHelp } from "@/components/KeyboardShortcutsHelp";
import { WhereIWork } from "@/components/WhereIWork";
import { useActiveSection } from "@/hooks/use-active-section";
import { useKeyboardNavigation } from "@/hooks/use-keyboard-navigation";
import { cn } from "@/lib/utils";
import { supabase } from "@/integrations/supabase/client";
import { 
  HeroSkeleton, 
  CardsSkeleton, 
  StepsSkeleton, 
  FAQSkeleton 
} from "@/components/skeletons/SectionSkeleton";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";

const lanes = [
  {
    label: "ENERGY",
    title: "Energy Teams",
    icon: Zap,
    points: ["Campus & district energy teams", "Utility + local supplier partnerships", "Grants, decarb, and rate cases"]
  },
  {
    label: "EDUCATION",
    title: "Education Programs",
    icon: GraduationCap,
    points: ["Colleges & universities", "Capstone & workforce programs", "Grant-backed pilots"]
  },
  {
    label: "CIVIC & POLICY",
    title: "Civic Innovation",
    icon: Building2,
    points: ["Municipal innovation teams", "Policy labs & foundations", "AI + data for public good"]
  }
];

const pilotWeeks = [
  { label: "WEEK 1", title: "Scope & First Build", points: ["We agree on 1 clear outcome.", "You get a rough but working version with sample or partial data."] },
  { label: "WEEK 2", title: "Real Data & Workflow", points: ["Connect to one real system (CSV, API, or database).", "Your team can click through a basic end-to-end flow."] },
  { label: "WEEK 3", title: "Feedback & Iteration", points: ["Short Loom updates, async comments.", "We refine the UI, copy, and logic based on real use."] },
  { label: "WEEK 4", title: "Handoff & Next Steps", points: ["Repo, docs, and pilot summary.", "2–3 options for where to take it next (internal, vendor, or second pilot)."] }
];

const faqs = [
  { question: "What do I actually get each week?", answer: "A clear, concrete deliverable: UI screens, working flows, integrations, or refactors. We agree on a small weekly scope and ship it end-to-end instead of spreading effort across ten half-finished ideas." },
  { question: "Do you understand energy, education, or civic work?", answer: "Yes. Most of my work lives across campus energy analytics, education pilots, and local policy/innovation projects. I'm comfortable working with imperfect data, political constraints, and lots of stakeholders." },
  { question: "How do we collaborate day-to-day?", answer: "Async-first. Looms, Notion, Figma, GitHub. We use one lightweight weekly call if needed, but most progress comes from clear briefs and fast iteration on real artifacts." },
  { question: "Is there a long-term contract?", answer: "No. This is intentionally week-to-week. The 4-week pilot gives enough time to ship something real without locking you into a long commitment. You can pause when you're caught up." }
];

const Index = () => {
  const [isLoading, setIsLoading] = useState(() => !localStorage.getItem('contentLoaded'));

  useEffect(() => {
    if (!localStorage.getItem('contentLoaded')) {
      const timer = setTimeout(() => {
        setIsLoading(false);
        localStorage.setItem('contentLoaded', 'true');
      }, 1200);
      return () => clearTimeout(timer);
    }
  }, []);

  useKeyboardNavigation([
    { key: "1", sectionId: "who", name: "Who I Build For" },
    { key: "2", sectionId: "timeline", name: "4-Week Timeline" },
    { key: "3", sectionId: "lab", name: "Live Pilot Lab" },
    { key: "4", sectionId: "where", name: "Where I Work" },
    { key: "5", sectionId: "proof", name: "Proof & Trust" },
    { key: "6", sectionId: "faq", name: "FAQ" },
  ]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50">
      <MobileHeader />
      <div className="mx-auto flex min-h-screen max-w-5xl flex-col px-4 sm:px-6 lg:px-8 pt-[60px] md:pt-0">
        <SiteHeader />
        <main className="flex-1">
          {isLoading ? (
            <div className="animate-pulse"><HeroSkeleton /><CardsSkeleton /><StepsSkeleton /><CardsSkeleton count={3} /><FAQSkeleton /></div>
          ) : (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
              <Hero /><WhoIBuildFor /><PilotTimeline /><LivePilotLab /><WhereIWork /><ProofAndTrust /><FAQAndCTA />
            </motion.div>
          )}
        </main>
        <SiteFooter />
      </div>
      <Toaster /><ScrollToTop /><KeyboardShortcutsHelp />
    </div>
  );
};
export default Index;

function SiteHeader() {
  const activeSection = useActiveSection(["who", "timeline", "lab", "where", "proof"]);
  return (
    <motion.header initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="hidden md:flex items-center justify-between py-5">
      <a href="#" className="flex flex-col" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
        <span className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">AltruisticX AI</span>
        <span className="text-xs text-slate-400">AI + Product Engineering · Weekly Sprints</span>
      </a>
      <nav className="flex items-center gap-6 text-sm text-slate-300">
        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center gap-1 hover:text-primary transition-colors">
            Sections <ChevronDown className="h-4 w-4" />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-slate-900 border-slate-800 z-50">
            <DropdownMenuItem asChild>
              <a href="#who" className={cn("cursor-pointer", activeSection === "who" && "text-primary")}>Who I Build For</a>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <a href="#timeline" className={cn("cursor-pointer", activeSection === "timeline" && "text-primary")}>How it works</a>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <a href="#lab" className={cn("cursor-pointer", activeSection === "lab" && "text-primary")}>Pilot Lab</a>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <a href="#where" className={cn("cursor-pointer", activeSection === "where" && "text-primary")}>Where I Work</a>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <a href="#proof" className={cn("cursor-pointer", activeSection === "proof" && "text-primary")}>Proof & Trust</a>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <a href="#faq" className="cursor-pointer">FAQ</a>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <Link to="/portfolio" className="hover:text-primary transition-colors">Portfolio</Link>
        <a href="https://scheduler.zoom.us/altruistic-xai" target="_blank" rel="noopener noreferrer" className="rounded-full border border-primary/60 bg-primary/10 px-3 py-1.5 text-xs font-medium text-primary hover:bg-primary/20 transition-colors">Book a Pilot Call</a>
      </nav>
    </motion.header>
  );
}

function Hero() {
  return (
    <section className="py-10 sm:py-14">
      <div className="grid gap-10 md:grid-cols-[minmax(0,1.4fr),minmax(0,1fr)] md:items-center">
        <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.2 }}>
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-3 py-1 text-[11px] font-medium text-foreground">
            <span className="inline-flex h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />Live AI Pilot Lab · 4-Week Sprints
          </div>
          <h1 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl">Ship Pilot-Ready AI Products in 4 Weeks</h1>
          <p className="mt-4 max-w-xl text-sm text-slate-300 sm:text-base leading-relaxed">For energy, education, and civic teams who want working software—not another strategy deck. One senior product engineer, one 4-week pilot, zero long-term contract.</p>
          
          <dl className="mt-6 grid max-w-xl grid-cols-1 gap-4 text-xs text-slate-200 sm:grid-cols-3 sm:text-sm">
            {[
              { delay: 0.4, title: "Start fast", desc: "First usable version shipped in Week 1" },
              { delay: 0.5, title: "Clear outcomes", desc: "Clear pilot scope, demo, and handoff by Week 4" },
              { delay: 0.6, title: "Zero long-term risk", desc: "Pause anytime, keep your repo, docs, and assets" }
            ].map((item) => (
              <motion.div key={item.title} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: item.delay }} className="rounded-2xl border border-slate-800/70 bg-slate-900/70 p-3 hover:border-primary/30 transition-colors">
                <dt className="text-[11px] uppercase tracking-[0.16em] text-slate-400">{item.title}</dt>
                <dd className="mt-1 font-medium text-slate-50">{item.desc}</dd>
              </motion.div>
            ))}
          </dl>
          
          <div className="mt-6 flex flex-col gap-3 text-sm sm:flex-row sm:items-center">
            <a href="https://scheduler.zoom.us/altruistic-xai" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-slate-950 shadow-lg shadow-primary/30 hover:bg-primary/90 transition-colors w-full sm:w-auto">Book a Pilot Call</a>
            <p className="text-xs text-slate-400 sm:text-[13px]">Week-to-week · pause anytime · async-first, founder-friendly</p>
          </div>
        </motion.div>
        
        <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.3 }} className="rounded-3xl border border-slate-800/80 bg-slate-900/60 p-4 sm:p-5">
          <div className="text-xs font-mono text-slate-400">Build Fast Kit / 4-week pilot</div>
          <p className="mt-2 text-sm text-slate-200 leading-relaxed">One senior engineer. One small backlog. 4 weeks to prove whether this pilot is worth scaling.</p>
          <div className="mt-4 grid gap-3 text-xs text-slate-200">
            {[
              { week: "Week 1", title: "Clarify & ship the first slice", desc: "Turn the idea into 1–2 concrete flows. Ship a working skeleton instead of a deck." },
              { week: "Week 2–3", title: "Tighten the flows", desc: "Integrate data, refine UX, and make it demo-able to internal stakeholders." },
              { week: "Week 4", title: "Decide with evidence", desc: "You walk away with a working repo, a clear walkthrough, and a decision: scale, pivot, or park." }
            ].map((item) => (
              <div key={item.week} className="flex gap-3 rounded-2xl border border-slate-800/80 bg-slate-950/40 p-3">
                <div className="mt-0.5 w-14 flex-shrink-0 text-[11px] font-mono uppercase tracking-[0.16em] text-primary">{item.week}</div>
                <div><div className="text-[13px] font-medium text-slate-50">{item.title}</div><div className="mt-1 text-[12px] text-slate-300">{item.desc}</div></div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function WhoIBuildFor() {
  return (
    <section id="who" className="border-t border-slate-900/80 py-10 sm:py-14">
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="max-w-4xl">
        <h2 className="text-xl font-semibold sm:text-2xl">Who I Build For</h2>
        <p className="mt-2 text-sm text-slate-300">Three lanes where I've done my best work—and where I can help you ship pilots fast.</p>
      </motion.div>
      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        {lanes.map((lane, index) => {
          const Icon = lane.icon;
          return (
            <motion.div key={lane.label} initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: index * 0.1 }} className="rounded-2xl border border-slate-800/70 bg-slate-900/60 p-5 hover:border-primary/30 hover:-translate-y-1 transition-all">
              <Icon className="h-8 w-8 mx-auto mb-3 text-primary" />
              <div className="text-xs font-semibold uppercase tracking-wide text-primary text-center">{lane.label}</div>
              <h3 className="mt-2 text-sm font-medium text-slate-50 text-center">{lane.title}</h3>
              <ul className="mt-3 space-y-1 text-xs text-slate-300">{lane.points.map((point) => <li key={point}>• {point}</li>)}</ul>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}

function PilotTimeline() {
  return (
    <section id="timeline" className="border-t border-slate-900/80 py-10 sm:py-14">
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="max-w-4xl">
        <p className="text-xs font-semibold uppercase tracking-wide text-primary">How the 4-week pilot works</p>
        <h2 className="mt-2 text-xl font-semibold sm:text-2xl md:text-3xl">One month from idea to demo-ready pilot</h2>
      </motion.div>
      <div className="mt-8 space-y-4">
        {pilotWeeks.map((week, index) => (
          <motion.div key={week.label} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: index * 0.1 }} className="flex flex-col gap-3 rounded-2xl border border-slate-800/70 bg-slate-900/60 p-4 md:flex-row md:items-start hover:border-primary/30 transition-colors">
            <div className="md:w-32 shrink-0"><div className="text-xs font-semibold uppercase tracking-wide text-slate-400">{week.label}</div><div className="text-sm font-medium text-slate-50">{week.title}</div></div>
            <ul className="space-y-1 text-sm text-slate-300">{week.points.map((point) => <li key={point}>• {point}</li>)}</ul>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function LivePilotLab() {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedSector, setSelectedSector] = useState<string | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const { data, error } = await supabase.from('projects').select('*').eq('featured', true).order('display_order', { ascending: true });
        if (error) throw error;
        setProjects(data || []);
      } catch (err) {
        setError('Failed to load pilot projects');
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  const filteredProjects = projects.filter(project => {
    if (selectedSector && project.sector !== selectedSector) return false;
    if (selectedStatus && project.status !== selectedStatus) return false;
    return true;
  });

  const sectors = ['Energy', 'Education', 'Civic & Policy'];
  const statuses = ['Now Shipping', 'Recently Shipped', 'Shelved'];

  return (
    <section id="lab" className="border-t border-slate-900/80 py-10 sm:py-14">
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="max-w-4xl">
        <p className="text-xs font-semibold uppercase tracking-wide text-primary">Live AI Pilot Lab</p>
        <h2 className="mt-2 text-xl font-semibold sm:text-2xl">Recent Pilots & Experiments</h2>
      </motion.div>

      <div className="mt-6 flex flex-wrap items-center gap-3">
        <span className="text-sm text-slate-400">Filter by:</span>
        <div className="flex flex-wrap gap-2">
          {sectors.map((sector) => (
            <Badge
              key={sector}
              variant={selectedSector === sector ? "default" : "outline"}
              className="cursor-pointer"
              onClick={() => setSelectedSector(selectedSector === sector ? null : sector)}
            >
              {sector}
            </Badge>
          ))}
        </div>
        <div className="flex flex-wrap gap-2">
          {statuses.map((status) => (
            <Badge
              key={status}
              variant={selectedStatus === status ? "default" : "outline"}
              className="cursor-pointer"
              onClick={() => setSelectedStatus(selectedStatus === status ? null : status)}
            >
              {status}
            </Badge>
          ))}
        </div>
        {(selectedSector || selectedStatus) && (
          <button
            onClick={() => { setSelectedSector(null); setSelectedStatus(null); }}
            className="text-xs text-slate-400 hover:text-primary transition-colors"
          >
            Clear filters
          </button>
        )}
      </div>

      {loading ? <div className="mt-8"><CardsSkeleton count={4} /></div> : error ? <div className="mt-8 rounded-2xl border border-red-500/30 bg-red-500/5 p-6 text-center"><AlertCircle className="mx-auto h-8 w-8 text-red-400" /><p className="mt-2 text-sm text-red-300">{error}</p></div> : filteredProjects.length === 0 ? <div className="mt-8 rounded-2xl border border-slate-800/70 bg-slate-900/60 p-6 text-center"><p className="text-sm text-slate-400">No projects match the selected filters.</p></div> : <div className="mt-8"><CaseStudiesStack caseStudies={filteredProjects} /></div>}
    </section>
  );
}

function ProofAndTrust() {
  return (
    <section id="proof" className="border-t border-slate-900/80 py-10 sm:py-14">
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="max-w-4xl">
        <h2 className="text-xl font-semibold sm:text-2xl">Proof & Trust</h2>
        <p className="mt-2 text-sm text-slate-300">Real outcomes from real pilots—no embellishment, no aspirational metrics.</p>
      </motion.div>
      <div className="mt-8 grid gap-8 md:grid-cols-[minmax(0,1.2fr),minmax(0,1fr)] md:items-start">
        <div><TestimonialsVariant /></div>
        <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.2 }} className="rounded-2xl border border-slate-800/70 bg-slate-900/60 p-6">
          <h3 className="text-sm font-semibold uppercase tracking-wide text-primary">Outcomes from recent pilots</h3>
          <ul className="mt-4 space-y-3 text-sm text-slate-200">
            {["$180k in hidden savings uncovered across 200+ campus sites", "6-week prototype to production deployment", "4+ hours saved weekly on manual admin tasks", "Board approval secured in 3 weeks with working demo"].map((outcome) => (
              <li key={outcome} className="flex items-start gap-2"><span className="text-primary">✓</span><span>{outcome}</span></li>
            ))}
          </ul>
          <div className="mt-6 border-t border-slate-800/70 pt-6">
            <p className="text-xs uppercase tracking-wide text-slate-400">Good fit</p>
            <ul className="mt-2 space-y-1 text-xs text-slate-300">
              {["Early-stage product with unclear edges", "Energy, education, civic, or compliance work", "Need to show progress to leadership or funders", "Comfortable with async, fast iteration"].map((fit) => <li key={fit}>✓ {fit}</li>)}
            </ul>
            <p className="mt-4 text-xs uppercase tracking-wide text-slate-400">Not a fit</p>
            <ul className="mt-2 space-y-1 text-xs text-slate-400">
              {["You want a big team and huge scope from day one", "You aren't ready to give real feedback weekly", "You just need a static marketing site or brochure"].map((notFit) => <li key={notFit}>✕ {notFit}</li>)}
            </ul>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function FAQAndCTA() {
  return (
    <section id="faq" className="border-t border-slate-900/80 py-10 sm:py-14">
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="max-w-4xl">
        <h2 className="text-xl font-semibold sm:text-2xl">FAQs: Reduce confusion, pre-answer objections</h2>
        <p className="mt-2 text-sm text-slate-300">The short version: we work like a calm, senior teammate who happens to be on a weekly subscription instead of payroll.</p>
      </motion.div>
      <div className="mt-6"><FAQAssistant /></div>
      <dl className="mt-6 space-y-4">
        {faqs.map((item, index) => (
          <motion.div key={item.question} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: index * 0.1 }} className="rounded-2xl border border-slate-800/80 bg-slate-950/60 p-4">
            <dt className="text-sm font-medium text-slate-50">{item.question}</dt>
            <dd className="mt-2 text-sm text-slate-300">{item.answer}</dd>
          </motion.div>
        ))}
      </dl>
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.3 }} className="mt-12 rounded-3xl border border-primary/30 bg-primary/5 p-8 text-center">
        <h3 className="text-xl font-semibold text-slate-50">Ready to ship your pilot?</h3>
        <p className="mt-2 text-sm text-slate-300 max-w-2xl mx-auto">Book a 30-minute intro call. We'll map your pilot scope and decide if this is a fit.</p>
        <a href="https://scheduler.zoom.us/altruistic-xai" target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-medium text-slate-950 hover:bg-primary/90 transition-colors shadow-lg shadow-primary/30">Book a Pilot Call</a>
        <p className="mt-3 text-xs text-slate-400">Week-to-week · pause anytime · no long-term contract</p>
      </motion.div>
      <div className="mt-12"><ContactForm /></div>
    </section>
  );
}

function SiteFooter() {
  return (
    <footer className="border-t border-slate-900/80 py-6">
      <div className="flex flex-col items-start justify-between gap-3 text-xs text-slate-500 sm:flex-row sm:items-center">
        <div>© {new Date().getFullYear()} AltruisticX · AI + Product Engineer</div>
        <div className="flex flex-wrap gap-3"><span>Async-first · privacy-aware · pilot-focused</span></div>
      </div>
    </footer>
  );
}
