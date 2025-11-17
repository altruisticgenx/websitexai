import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { TestimonialsVariant, CaseStudiesStack } from "@/components/ui/animated-cards-stack";
import { Linkedin } from "lucide-react";
import { ShelvedExperiments } from "@/components/ShelvedExperiments";
import { WhereIWork } from "@/components/WhereIWork";
import { OrganizationTypes } from "@/components/OrganizationTypes";
import { EngagementModels } from "@/components/EngagementModels";
import { MobileMenu } from "@/components/MobileMenu";

// --- Data Definitions ---
const recentBuilds = [{
  id: "sales-copilot",
  title: "AI Sales Copilot Dashboard",
  sector: "Founder-Backed Startup",
  summary: "Not just another CRM add-on—this system studies founders' actual outreach patterns, auto-classifies high-intent conversations, and surfaces 'don't-drop-these' deals with smart follow-ups trained on real founder behavior.",
  tag: "Personalized growth engine"
}, {
  id: "founder-os",
  title: "Founder OS Dashboard",
  sector: "Solo Founder",
  summary: "A stripped-down, elegant cockpit that merges calendar, CRM, tasks, and invoicing into one serene flow. Context-aware sections hide anything irrelevant, dramatically lowering cognitive load.",
  tag: "Attention protection"
}, {
  id: "energy-analytics",
  title: "Energy Analytics Pilot",
  sector: "Climate & Energy",
  summary: "Converts chaotic meter and operations data into clean, real-time analytics. AI spots invisible inefficiencies, forecasts savings, and lets teams simulate operational changes before they're expensive.",
  tag: "Scenario-driven decisions"
}, {
  id: "edtech-portal",
  title: "EdTech Pilot Portal",
  sector: "Education Nonprofit",
  summary: "Tracks pilots, student paths, and impact metrics—then auto-translates that activity into polished, grant-winning insights. Its 'evidence engine' converts engagement into funder-ready narratives.",
  tag: "Grant storytelling"
}];
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
  return <div className="min-h-screen bg-slate-950 text-slate-50">
      <div className="mx-auto flex min-h-screen max-w-6xl flex-col px-4 sm:px-6 lg:px-8">
        <SiteHeader />
        <main className="flex-1">
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
        </main>
        <SiteFooter />
      </div>
    </div>;
};
export default Index;

// --- Sub-Components ---

function SiteHeader() {
  return <motion.header initial={{
    opacity: 0,
    y: -20
  }} animate={{
    opacity: 1,
    y: 0
  }} transition={{
    duration: 0.5
  }} className="flex items-center justify-between py-5">
      <a href="#" className="flex flex-col">
        <span className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">
          AltruisticX AI
        </span>
        <span className="text-xs text-slate-400">
          AI + Product Engineering · Weekly Sprints
        </span>
      </a>
      <nav className="hidden items-center gap-6 text-sm text-slate-300 md:flex">
        <a href="#builds" className="hover:text-primary transition-colors">
          Builds
        </a>
        <Link to="/portfolio" className="hover:text-primary transition-colors">
          Portfolio
        </Link>
        <a href="#how" className="hover:text-primary transition-colors">
          How it works
        </a>
        <a href="#pilot" className="hover:text-primary transition-colors">
          4-week pilot
        </a>
        <a href="https://scheduler.zoom.us/altruistic-xai" target="_blank" rel="noopener noreferrer" className="rounded-full border border-primary/60 bg-primary/10 px-3 py-1.5 text-xs font-medium text-primary hover:bg-primary/20 transition-colors">
          Book a 30-min intro
        </a>
      </nav>
      <MobileMenu className="md:hidden" />
    </motion.header>;
}
function Hero() {
  return <section className="py-10 sm:py-14">
      <div className="grid gap-10 md:grid-cols-[minmax(0,1.4fr),minmax(0,1fr)] md:items-center">
        <motion.div initial={{
        opacity: 0,
        x: -30
      }} animate={{
        opacity: 1,
        x: 0
      }} transition={{
        duration: 0.6,
        delay: 0.2
      }}>
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
            <motion.div initial={{
            opacity: 0,
            y: 20
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            delay: 0.4
          }} className="rounded-2xl border border-slate-800/70 bg-slate-900/70 p-3 hover:border-primary/30 transition-colors">
              <dt className="text-[11px] uppercase tracking-[0.16em] text-slate-400">
                Work hands-on
              </dt>
              <dd className="mt-1 font-medium text-slate-50">
                Build with real tools and ship working prototypes.
              </dd>
            </motion.div>
            <motion.div initial={{
            opacity: 0,
            y: 20
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            delay: 0.5
          }} className="rounded-2xl border border-slate-800/70 bg-slate-900/70 p-3 hover:border-primary/30 transition-colors">
              <dt className="text-[11px] uppercase tracking-[0.16em] text-slate-400">
                Launch actionable tools
              </dt>
              <dd className="mt-1 font-medium text-slate-50">
                Deploy features users can actually test and use.
              </dd>
            </motion.div>
            <motion.div initial={{
            opacity: 0,
            y: 20
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            delay: 0.6
          }} className="rounded-2xl border border-slate-800/70 bg-slate-900/70 p-3 hover:border-primary/30 transition-colors">
              <dt className="text-[11px] uppercase tracking-[0.16em] text-slate-400">
                Start small, deliver early
              </dt>
              <dd className="mt-1 font-medium text-slate-50">
                First meaningful code in Week 1, ready to demo.
              </dd>
            </motion.div>
          </dl>

          <div className="mt-6 flex flex-col gap-3 text-sm">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
              
              <a href="https://www.linkedin.com/in/ik11" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 rounded-full border border-primary/60 bg-primary/10 px-5 py-2.5 text-sm font-medium text-primary hover:bg-primary/20 transition-colors">
                <Linkedin size={16} />
                Connect on LinkedIn
              </a>
            </div>
            
          </div>
        </motion.div>

        <motion.div initial={{
        opacity: 0,
        x: 30
      }} animate={{
        opacity: 1,
        x: 0
      }} transition={{
        duration: 0.6,
        delay: 0.3
      }} className="rounded-3xl border border-slate-800/80 bg-slate-900/60 p-4 sm:p-5">
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
  return <div className="flex gap-3 rounded-2xl border border-slate-800/80 bg-slate-950/40 p-3 hover:border-primary/20 transition-colors">
      <div className="mt-0.5 w-14 flex-shrink-0 text-[11px] font-mono uppercase tracking-[0.16em] text-primary">
        {label}
      </div>
      <div>
        <div className="text-[13px] font-medium text-slate-50">{title}</div>
        <div className="mt-1 text-[12px] text-slate-300">{body}</div>
      </div>
    </div>;
}
function RecentBuilds() {
  return <section id="builds" className="py-10 sm:py-14">
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
    }} className="flex items-end justify-between gap-4">
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

      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="mt-10"
      >
        <CaseStudiesStack caseStudies={recentBuilds} />
      </motion.div>
    </section>;
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

          <div className="mt-6 flex flex-col gap-3 text-sm sm:flex-row sm:items-baseline">
            <div>
              
              
              
            </div>
            <div className="sm:ml-6">
              <div className="text-xs uppercase tracking-[0.18em] text-slate-400">
                For comparison
              </div>
              <p className="mt-1 max-w-xs text-xs text-slate-400">
                Hiring in-house can take 3–6 months, $100k–$150k salary, plus
                30–40% in overhead—with no guarantee they can move quickly on a
                messy pilot.
              </p>
            </div>
          </div>

          <div className="mt-6 flex flex-col gap-3 text-sm sm:flex-row sm:items-center">
            
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
  return <section id="faq" className="border-t border-slate-900/80 py-10 sm:py-14">
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
          FAQs: Reduce confusion, pre-answer objections
        </h2>
        <p className="mt-2 text-sm text-slate-300">
          The short version: we work like a calm, senior teammate who happens to
          be on a weekly subscription instead of payroll.
        </p>
      </motion.div>

      <dl className="mt-6 space-y-4">
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
      }} className="rounded-2xl border border-slate-800/80 bg-slate-950/60 p-4 hover:border-primary/30 transition-colors">
            <dt className="text-sm font-medium text-slate-50">
              {item.question}
            </dt>
            <dd className="mt-2 text-sm text-slate-300">{item.answer}</dd>
          </motion.div>)}
      </dl>
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