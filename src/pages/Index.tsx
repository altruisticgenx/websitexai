import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { TestimonialsVariant, CaseStudiesStack } from "@/components/ui/animated-cards-stack";
import { Linkedin } from "lucide-react";
import { ShelvedExperiments } from "@/components/ShelvedExperiments";
import { WhereIWork } from "@/components/WhereIWork";
import { FourWeekPilot } from "@/components/FourWeekPilot";
import { AboutSection } from "@/components/AboutSection";
import { MobileMenu } from "@/components/MobileMenu";
import { ContactForm } from "@/components/ContactForm";
import { Toaster } from "@/components/ui/toaster";

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
const faqs = [
  {
    question: "What do you actually deliver in 4 weeks?",
    answer: "A working prototype you can demo internally. Week 1: basic version with fake data. Week 2: connected to one real data source. Week 3: refined based on your feedback. Week 4: full repo, docs, and 2-3 options for next steps."
  },
  {
    question: "How do we work together if our data is sensitive?",
    answer: "We work in your environment (your GitHub, your cloud account, your data stays with you). All code and IP are yours. I sign NDAs and work under your data governance policies."
  },
  {
    question: "What happens after the pilot ends?",
    answer: "Three options: (1) Continue week-to-week on new features, (2) Pause and resume later, (3) Hand off to your team with a walkthrough. No pressure, no lock-in."
  },
  {
    question: "What tools/stack do you typically use?",
    answer: "React/TypeScript frontends, Supabase/Postgres for backend, modern AI APIs (OpenAI, Anthropic, Google), and whatever tools you already use. I adapt to your existing infrastructure."
  }
];

// --- Main Page Component ---
const Index = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-50">
      <div className="mx-auto flex min-h-screen max-w-6xl flex-col px-4 sm:px-6 lg:px-8">
        <SiteHeader />
        <main className="flex-1">
          <Hero />
          <FourWeekPilot />
          <RecentBuilds />
          <HowItWorks />
          <WhereIWork />
          <ShelvedExperiments />
          <div id="testimonials">
            <TestimonialsVariant />
          </div>
          <AboutSection />
          <FAQSection />
          <ContactSection />
        </main>
        <SiteFooter />
      </div>
      <Toaster />
    </div>
  );
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
  return (
    <section className="py-10 sm:py-14">
      <div className="max-w-4xl">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-3 py-1 text-[11px] font-medium text-foreground">
            <span className="inline-flex h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
            Ship pilot-ready AI tech in weekly sprints
          </div>

          <h1 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl">
            Ship Pilot-Ready AI Products in 4 Weeks
          </h1>

          <p className="mt-4 max-w-2xl text-sm text-slate-300 sm:text-base">
            For energy, education, and civic teams who need real software—not another strategy deck. 
            One senior product engineer, one 4-week pilot, zero long-term contract.
          </p>

          <ul className="mt-6 space-y-3 text-sm text-slate-200 max-w-xl">
            <motion.li
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="flex items-start gap-3"
            >
              <span className="text-primary mt-0.5 flex-shrink-0">•</span>
              <span>First usable version shipped in Week 1</span>
            </motion.li>
            <motion.li
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="flex items-start gap-3"
            >
              <span className="text-primary mt-0.5 flex-shrink-0">•</span>
              <span>Clear scope, demo, and handoff by end of Week 4</span>
            </motion.li>
            <motion.li
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
              className="flex items-start gap-3"
            >
              <span className="text-primary mt-0.5 flex-shrink-0">•</span>
              <span>Pause anytime, keep your repo and docs</span>
            </motion.li>
          </ul>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <a
              href="https://scheduler.zoom.us/altruistic-xai"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20"
            >
              Book a Pilot Call
            </a>
            <p className="text-xs text-slate-400 sm:text-[13px]">
              Week-to-week · pause anytime · async-first, founder-friendly
            </p>
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
  const steps = [
    {
      label: "01",
      title: "Share your starting point",
      body: "You send a Loom, doc, or repo. We map what's realistic in a 4-week window and pick a small surface to prove."
    },
    {
      label: "02",
      title: "Ship weekly slices",
      body: "Each week we ship a complete slice of value: screens, flows, integrations, or data plumbing—not just tickets and diagrams."
    },
    {
      label: "03",
      title: "Decide with clarity",
      body: "At the end, you have a working pilot, a walkthrough, and a decision: invest more, iterate, or pause."
    }
  ];

  return (
    <section id="how" className="border-t border-slate-900/80 py-10 sm:py-14">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl"
      >
        <div className="text-xs font-mono uppercase tracking-[0.18em] text-slate-400">
          Process
        </div>
        <h2 className="mt-2 text-xl font-semibold sm:text-2xl">
          How it works: The Build Fast Kit
        </h2>
        <p className="mt-2 text-sm text-slate-300">
          The Build Fast Kit is intentionally simple. No massive discovery phase, no 40-page decks. 
          Just a tight loop around one meaningful pilot.
        </p>
      </motion.div>

      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        {steps.map((step, index) => (
          <motion.div
            key={step.label}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="rounded-2xl border border-slate-800/70 bg-slate-950/50 p-4 sm:p-5 text-sm"
          >
            <div className="text-[11px] font-mono uppercase tracking-[0.18em] text-primary">
              {step.label}
            </div>
            <h3 className="mt-2 text-sm font-semibold text-slate-50">
              {step.title}
            </h3>
            <p className="mt-2 text-[13px] text-slate-300">{step.body}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function FAQSection() {
  return (
    <section id="faq" className="border-t border-slate-900/80 py-10 sm:py-14">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl"
      >
        <div className="text-xs font-mono uppercase tracking-[0.18em] text-slate-400">
          Questions
        </div>
        <h2 className="mt-2 text-xl font-semibold sm:text-2xl">
          Frequently Asked Questions
        </h2>
        <p className="mt-2 text-sm text-slate-300">
          Common questions about working together, deliverables, and process.
        </p>
      </motion.div>

      <dl className="mt-6 space-y-4">
        {faqs.map((item, index) => (
          <motion.div
            key={item.question}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.05 }}
            className="rounded-2xl border border-slate-800/80 bg-slate-950/60 p-4 sm:p-5 hover:border-primary/30 transition-colors"
          >
            <dt className="text-sm font-medium text-slate-50">
              {item.question}
            </dt>
            <dd className="mt-2 text-sm text-slate-300">{item.answer}</dd>
          </motion.div>
        ))}
      </dl>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="mt-10 rounded-3xl border border-primary/30 bg-primary/5 p-6 sm:p-8 text-center"
      >
        <h3 className="text-lg font-semibold text-slate-50 sm:text-xl">
          Ready to test an AI idea without a 6-month commitment?
        </h3>
        <p className="mt-3 text-sm text-slate-300 max-w-2xl mx-auto">
          Send a Loom or short brief about your project. If it's a fit, we can start a 4-week pilot next Monday.
        </p>
        <a
          href="https://scheduler.zoom.us/altruistic-xai"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20"
        >
          Book a Pilot Call
        </a>
      </motion.div>
    </section>
  );
}

function ContactSection() {
  return (
    <section id="contact" className="border-t border-slate-900/80 py-10 sm:py-14">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="max-w-2xl mx-auto"
      >
        <ContactForm />
      </motion.div>
    </section>
  );
}

function SiteFooter() {
  return (
    <footer className="border-t border-slate-900/80 py-6">
      <div className="flex flex-col items-start justify-between gap-3 text-xs text-slate-500 sm:flex-row sm:items-center">
        <div>© {new Date().getFullYear()} AltruisticX AI · AI + Product Engineer</div>
        <div className="flex flex-wrap gap-3">
          <span>Async-first · privacy-aware · pilot-focused</span>
        </div>
      </div>
    </footer>
  );
}