import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { TestimonialsVariant } from "@/components/ui/animated-cards-stack";
import { Linkedin } from "lucide-react";

// --- Data Definitions ---
const recentBuilds = [{
  id: "sales-copilot",
  title: "AI Sales Copilot Dashboard",
  sector: "Founder-Backed Startup",
  summary: "From rough prototype to full launch in 6 weeks. Reduced manual follow-ups and surfaced high-intent leads automatically.",
  tag: "Pilot to production"
}, {
  id: "founder-os",
  title: "Founder OS Dashboard",
  sector: "Solo Founder",
  summary: "Unified scheduling, lightweight CRM, and invoicing into a single interface. Built to feel like a calm founder cockpit.",
  tag: "Operational clarity"
}, {
  id: "energy-analytics",
  title: "Energy Analytics Pilot",
  sector: "Climate & Energy",
  summary: "Turned messy meter exports into a live dashboard. Surfaced savings opportunities across 200+ sites.",
  tag: "Energy & climate"
}, {
  id: "edtech-portal",
  title: "EdTech Pilot Portal",
  sector: "Education Nonprofit",
  summary: "Built a portal to track pilots, students, and outcomes. Helped the team defend funding with real evidence.",
  tag: "Education impact"
}];
const faqs = [{
  question: "What do I actually get each week?",
  answer: "A clear, concrete deliverable: UI screens, working flows, integrations, or refactors. We agree on a small weekly scope and ship it end-to-end instead of spreading effort across ten half-finished ideas."
}, {
  question: "Do you understand energy, education, or civic work?",
  answer: "Yes. Most of my work lives across campus energy analytics, education pilots, and local policy/innovation projects. I'm comfortable working with imperfect data, political constraints, and lots of stakeholders."
}, {
  question: "How do we collaborate day-to-day?",
  answer: "Async-first. Looms, Notion, Figma, GitHub. We use one lightweight weekly call if needed, but most progress comes from clear briefs and fast iteration on real artifacts."
}, {
  question: "Is there a long-term contract?",
  answer: "No. This is intentionally week-to-week. The 4-week pilot gives enough time to ship something real without locking you into a long commitment. You can pause when you're caught up."
}];

// --- Main Page Component ---
const Index = () => {
  return <div className="min-h-screen bg-slate-950 text-slate-50">
      <div className="mx-auto flex min-h-screen max-w-6xl flex-col px-4 sm:px-6 lg:px-8">
        <SiteHeader />
        <main className="flex-1">
          <Hero />
          <RecentBuilds />
          <HowItWorks />
          <PilotOffer />
          <TestimonialsVariant />
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
        <span className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-300">
          AltruisticX AI
        </span>
        <span className="text-xs text-slate-400">
          AI + Product Engineering · Weekly Sprints
        </span>
      </a>
      <nav className="hidden items-center gap-6 text-sm text-slate-300 sm:flex">
        <a href="#builds" className="hover:text-emerald-300 transition-colors">
          Builds
        </a>
        <Link to="/portfolio" className="hover:text-emerald-300 transition-colors">
          Portfolio
        </Link>
        <a href="#how" className="hover:text-emerald-300 transition-colors">
          How it works
        </a>
        <a href="#pilot" className="hover:text-emerald-300 transition-colors">
          4-week pilot
        </a>
        <a href="mailto:hello@altruisticxai.com" className="rounded-full border border-emerald-400/60 bg-emerald-400/10 px-3 py-1.5 text-xs font-medium text-emerald-100 hover:bg-emerald-400/20 transition-colors">
          Book a 30-min intro
        </a>
      </nav>
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
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-400/5 px-3 py-1 text-[11px] font-medium text-emerald-100">
            <span className="inline-flex h-1.5 w-1.5 rounded-full bg-emerald-300 animate-pulse" />
            Ship pilot-ready AI tech in weekly sprints
          </div>

          <h1 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl">
            Senior AI/product execution without the 6-month hiring slog.
          </h1>

          <p className="mt-4 max-w-xl text-sm text-slate-300 sm:text-base">
            Work directly with a calm, senior engineer who designs, builds, and
            ships AI tools for <span className="text-emerald-300 font-medium">energy, education, and civic teams</span>.
            Week-to-week, no long-term lock-in. First meaningful code in Week 1.
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
          }} className="rounded-2xl border border-slate-800/70 bg-slate-900/70 p-3 hover:border-emerald-400/30 transition-colors">
              <dt className="text-[11px] uppercase tracking-[0.16em] text-slate-400">
                Start fast
              </dt>
              <dd className="mt-1 font-medium text-slate-50">
                First pilot slice shipping in Week 1.
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
          }} className="rounded-2xl border border-slate-800/70 bg-slate-900/70 p-3 hover:border-emerald-400/30 transition-colors">
              <dt className="text-[11px] uppercase tracking-[0.16em] text-slate-400">
                Zero long-term risk
              </dt>
              <dd className="mt-1 font-medium text-slate-50">
                Week-to-week. Pause anytime. You keep the repo.
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
          }} className="rounded-2xl border border-slate-800/70 bg-slate-900/70 p-3 hover:border-emerald-400/30 transition-colors">
              <dt className="text-[11px] uppercase tracking-[0.16em] text-slate-400">
                Built for pilots
              </dt>
              <dd className="mt-1 font-medium text-slate-50">
                Focus on 1–2 real user journeys, not a giant roadmap.
              </dd>
            </motion.div>
          </dl>

          <div className="mt-6 flex flex-col gap-3 text-sm">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
              
              <a href="https://www.linkedin.com/in/ik11" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 rounded-full border border-emerald-400/60 bg-emerald-400/10 px-5 py-2.5 text-sm font-medium text-emerald-100 hover:bg-emerald-400/20 transition-colors">
                <Linkedin size={16} />
                Connect on LinkedIn
              </a>
            </div>
            <p className="text-xs text-slate-400 sm:text-[13px]">
              Week-to-week · pause anytime · async-first, founder-friendly
            </p>
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
  return <div className="flex gap-3 rounded-2xl border border-slate-800/80 bg-slate-950/40 p-3 hover:border-emerald-400/20 transition-colors">
      <div className="mt-0.5 w-14 flex-shrink-0 text-[11px] font-mono uppercase tracking-[0.16em] text-emerald-300">
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

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {recentBuilds.map((build, index) => <motion.article key={build.id} initial={{
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
      }} className="group relative flex h-full flex-col rounded-2xl border border-slate-800/70 bg-slate-900/70 p-4 text-sm shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-xl hover:border-emerald-400/30">
            <div className="text-[11px] font-medium text-emerald-300">
              {build.sector}
            </div>
            <h3 className="mt-2 text-sm font-semibold text-slate-50">
              {build.title}
            </h3>
            <p className="mt-2 text-[13px] text-slate-300">{build.summary}</p>
            <div className="mt-3 flex flex-1 items-end justify-between text-[11px] text-slate-400">
              <span className="rounded-full border border-slate-700/80 px-2 py-1 text-[11px]">
                {build.tag}
              </span>
              <span className="text-[11px] text-slate-500 group-hover:text-emerald-300 transition-colors">
                Built in weekly slices →
              </span>
            </div>
          </motion.article>)}
      </div>
    </section>;
}
function HowItWorks() {
  const steps = [{
    label: "01",
    title: "Share your starting point",
    body: "You send a Loom, doc, or repo. We map what's realistic in a 4-week window and pick a small surface to prove."
  }, {
    label: "02",
    title: "Ship weekly slices",
    body: "Each week we ship a complete slice of value: screens, flows, integrations, or data plumbing—not just tickets and diagrams."
  }, {
    label: "03",
    title: "Decide with clarity",
    body: "At the end, you have a working pilot, a walkthrough, and a decision: invest more, iterate, or pause."
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
          How it works: The Build Fast Kit
        </h2>
        <p className="mt-2 text-sm text-slate-300">
          The Build Fast Kit is intentionally simple. No massive discovery
          phase, no 40-page decks. Just a tight loop around one meaningful
          pilot.
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
      }} className="rounded-2xl border border-slate-800/70 bg-slate-950/50 p-4 text-sm hover:border-emerald-400/30 transition-colors">
            <div className="text-[11px] font-mono uppercase tracking-[0.18em] text-emerald-300">
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
            Offer: 4-week pilot at <span className="text-emerald-300">$1,150 / week</span>
          </h2>
          <p className="mt-2 text-sm text-slate-300">
            One senior product-minded engineer embedded on your roadmap for 4
            weeks. No hiring process, no equity, no long-term contract—just
            consistent weekly shipping.
          </p>

          <ul className="mt-4 space-y-2 text-sm text-slate-200">
            <li className="flex items-start gap-2">
              <span className="text-emerald-400 mt-0.5">✓</span>
              Consistent weekly deliverables you can demo internally.
            </li>
            <li className="flex items-start gap-2">
              <span className="text-emerald-400 mt-0.5">✓</span>
              Async-first collaboration (Loom, Notion, GitHub, your tools).
            </li>
            <li className="flex items-start gap-2">
              <span className="text-emerald-400 mt-0.5">✓</span>
              You keep the repo, infra, and docs—no lock-in.
            </li>
            <li className="flex items-start gap-2">
              <span className="text-emerald-400 mt-0.5">✓</span>
              Ideal while you're validating or fundraising.
            </li>
          </ul>

          <div className="mt-6 flex flex-col gap-3 text-sm sm:flex-row sm:items-baseline">
            <div>
              <div className="text-xs uppercase tracking-[0.18em] text-slate-400">
                Pilot pricing
              </div>
              <div className="mt-1 text-2xl font-semibold text-emerald-300">
                $1,150 / week
              </div>
              <div className="text-xs text-slate-400">
                Billed weekly · pause anytime after Week 2
              </div>
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
            <a href="mailto:hello@altruisticxai.com?subject=4-week%20pilot%20-%20AltruisticX%20AI" className="inline-flex items-center justify-center rounded-full bg-emerald-400 px-5 py-2.5 text-sm font-medium text-slate-950 shadow-lg shadow-emerald-500/30 hover:bg-emerald-300 transition-all hover:shadow-emerald-500/50">
              Book a 30-min intro
            </a>
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
              <span className="text-emerald-400">✓</span>
              Early-stage product with unclear edges.
            </li>
            <li className="flex items-start gap-2">
              <span className="text-emerald-400">✓</span>
              Energy, education, civic, or compliance work.
            </li>
            <li className="flex items-start gap-2">
              <span className="text-emerald-400">✓</span>
              Need to show progress to leadership or funders.
            </li>
            <li className="flex items-start gap-2">
              <span className="text-emerald-400">✓</span>
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
      }} className="rounded-2xl border border-slate-800/80 bg-slate-950/60 p-4 hover:border-emerald-400/30 transition-colors">
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
          <span>Async-first · privacy-aware · pilot-focused</span>
        </div>
      </div>
    </footer>;
}