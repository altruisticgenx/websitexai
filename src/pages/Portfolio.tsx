import React from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Calendar, Code, Target, CheckCircle2, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
import { MetricsVariant } from "@/components/ui/animated-cards-stack";

// --- Case Study Data ---
const caseStudies = [
  {
    id: "sales-copilot",
    title: "AI Sales Copilot Dashboard",
    sector: "Founder-Backed Startup",
    tagline: "From rough prototype to full launch in 6 weeks",
    summary:
      "Reduced manual follow-ups and surfaced high-intent leads automatically using AI-powered analysis and workflow automation.",
    challenge:
      "The sales team was drowning in manual follow-ups and couldn't identify high-intent leads quickly enough. They needed a system that could automatically prioritize leads, suggest follow-up actions, and surface buying signals from email interactions and meeting notes.",
    solution:
      "Built an AI-powered dashboard that analyzes email threads, call transcripts, and CRM data to score leads, suggest next actions, and automate follow-up workflows. The system uses natural language processing to detect buying signals and sentiment shifts.",
    outcomes: [
      "65% reduction in manual follow-up time",
      "2.3x increase in high-intent lead conversion",
      "Automated 80% of lead scoring process",
      "Cut sales cycle from 45 to 28 days average",
    ],
    technologies: [
      "React + TypeScript",
      "OpenAI GPT-4 API",
      "Supabase (Auth + Database)",
      "Python FastAPI (Backend)",
      "LangChain",
      "Tailwind CSS",
      "Recharts",
    ],
    timeline: "6 weeks pilot-to-production",
    duration: "6 weeks",
    phases: [
      { week: "Week 1", milestone: "Core UI + lead scoring logic" },
      { week: "Week 2-3", milestone: "AI integration + email parsing" },
      { week: "Week 4-5", milestone: "Workflow automation + testing" },
      { week: "Week 6", milestone: "Polish, deploy, handoff" },
    ],
  },
  {
    id: "founder-os",
    title: "Founder OS Dashboard",
    sector: "Solo Founder",
    tagline: "A calm founder cockpit for operational clarity",
    summary:
      "Unified scheduling, lightweight CRM, and invoicing into a single interface. Built to feel like a calm founder cockpit.",
    challenge:
      "Solo founder juggling Calendly, Notion, Stripe, and a spreadsheet CRM. Needed a unified view of client relationships, upcoming sessions, and revenue—without the bloat of enterprise tools.",
    solution:
      "Created a lightweight, opinionated dashboard that combines scheduling (with buffer time rules), contact management, session notes, and invoice tracking. Simple by design—no unnecessary features, just what a solo consultant actually needs daily.",
    outcomes: [
      "Consolidated 5 tools into 1 interface",
      "Saved 4+ hours per week on admin",
      "100% adoption rate (founder uses it daily)",
      "Client response time improved by 40%",
    ],
    technologies: [
      "React + TypeScript",
      "Supabase (Database + Auth)",
      "Stripe API",
      "Cal.com API",
      "Tailwind CSS",
      "React Query",
      "Zustand",
    ],
    timeline: "4 weeks prototype-to-daily-use",
    duration: "4 weeks",
    phases: [
      { week: "Week 1", milestone: "Core dashboard + contact list" },
      { week: "Week 2", milestone: "Calendar integration + session tracking" },
      { week: "Week 3", milestone: "Invoicing + Stripe sync" },
      { week: "Week 4", milestone: "Refinement + mobile responsiveness" },
    ],
  },
  {
    id: "energy-analytics",
    title: "Energy Analytics Pilot",
    sector: "Climate & Energy",
    tagline: "Turned messy meter data into actionable savings",
    summary:
      "Turned messy meter exports into a live dashboard. Surfaced savings opportunities across 200+ sites.",
    challenge:
      "University facilities team had meter data from 200+ buildings in inconsistent CSV formats. No way to spot anomalies, compare buildings, or justify capital improvements to leadership.",
    solution:
      "Built a data pipeline to normalize meter exports and a dashboard to visualize usage patterns, detect anomalies, and calculate savings opportunities. Included building comparison tools and automated monthly reports for facilities leadership.",
    outcomes: [
      "Identified $180k+ in annual savings opportunities",
      "Reduced energy waste detection time from weeks to minutes",
      "Enabled data-driven capital planning",
      "Piloted across 200+ buildings in 8 weeks",
    ],
    technologies: [
      "React + TypeScript",
      "Python (Pandas + FastAPI)",
      "PostgreSQL",
      "Recharts + D3.js",
      "Docker",
      "Tailwind CSS",
      "AWS S3",
    ],
    timeline: "8 weeks pilot deployment",
    duration: "8 weeks",
    phases: [
      { week: "Week 1-2", milestone: "Data pipeline + normalization" },
      { week: "Week 3-4", milestone: "Dashboard UI + visualization" },
      { week: "Week 5-6", milestone: "Anomaly detection algorithm" },
      { week: "Week 7-8", milestone: "Reporting + pilot rollout" },
    ],
  },
  {
    id: "edtech-portal",
    title: "EdTech Pilot Portal",
    sector: "Education Nonprofit",
    tagline: "Evidence-based funding defense through data",
    summary:
      "Built a portal to track pilots, students, and outcomes. Helped the team defend funding with real evidence.",
    challenge:
      "Education nonprofit running pilots across multiple schools but tracking everything in spreadsheets. When funders asked for outcome data, it took weeks to compile reports. Risk of losing funding without clear evidence of impact.",
    solution:
      "Created a pilot management portal where program managers could log student participation, track milestones, and generate outcome reports. Built-in analytics showed completion rates, demographic breakdowns, and qualitative feedback summaries.",
    outcomes: [
      "Reduced reporting time from 3 weeks to 2 hours",
      "Secured $500k+ renewal based on clear outcome data",
      "Increased pilot completion visibility by 100%",
      "Enabled real-time program adjustments",
    ],
    technologies: [
      "React + TypeScript",
      "Supabase (Database + Auth + RLS)",
      "Tailwind CSS",
      "React Hook Form + Zod",
      "Recharts",
      "PDF export (react-pdf)",
    ],
    timeline: "5 weeks pilot-ready",
    duration: "5 weeks",
    phases: [
      { week: "Week 1", milestone: "Student tracking + pilot setup" },
      { week: "Week 2-3", milestone: "Outcome tracking + analytics" },
      { week: "Week 4", milestone: "Report generation + PDF export" },
      { week: "Week 5", milestone: "Training + deployment" },
    ],
  },
];
// --- End Case Study Data ---

export default function Portfolio() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-50">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-emerald-300 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to home
          </Link>
          <h1 className="mt-6 text-3xl font-semibold sm:text-4xl md:text-5xl">
            Portfolio & Case Studies
          </h1>
          <p className="mt-3 max-w-2xl text-base text-slate-300">
            Detailed breakdowns of recent builds across energy, education, and
            founder-backed projects. Technologies, timelines, and real outcomes.
          </p>
        </motion.div>

        {/* Case Studies */}
        <div className="space-y-16">
          {caseStudies.map((study, index) => (
            <motion.article
              key={study.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="rounded-3xl border border-slate-800/80 bg-slate-900/60 p-6 sm:p-8"
            >
              {/* Header */}
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <div className="text-xs font-medium text-emerald-300">
                    {study.sector}
                  </div>
                  <h2 className="mt-2 text-2xl font-semibold sm:text-3xl">
                    {study.title}
                  </h2>
                  <p className="mt-1 text-sm text-slate-400">{study.tagline}</p>
                </div>
                <div className="flex items-center gap-2 rounded-full border border-slate-700/80 bg-slate-800/50 px-3 py-1.5 text-xs text-slate-300">
                  <Calendar className="h-3.5 w-3.5" />
                  {study.duration}
                </div>
              </div>

              {/* Challenge */}
              <div className="mt-6">
                <h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-slate-400">
                  Challenge
                </h3>
                <p className="mt-2 text-sm text-slate-200 leading-relaxed">
                  {study.challenge}
                </p>
              </div>

              {/* Solution */}
              <div className="mt-5">
                <h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-slate-400">
                  Solution
                </h3>
                <p className="mt-2 text-sm text-slate-200 leading-relaxed">
                  {study.solution}
                </p>
              </div>

              {/* Outcomes */}
              <div className="mt-5">
                <h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-slate-400">
                  Key Outcomes
                </h3>
                <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                  {study.outcomes.map((outcome, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2 text-sm text-slate-200"
                    >
                      <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-emerald-400" />
                      <span>{outcome}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Technologies */}
              <div className="mt-6">
                <h3 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.16em] text-slate-400">
                  <Code className="h-4 w-4" />
                  Technologies
                </h3>
                <div className="mt-3 flex flex-wrap gap-2">
                  {study.technologies.map((tech, i) => (
                    <span
                      key={i}
                      className="rounded-full border border-slate-700/60 bg-slate-800/40 px-3 py-1 text-xs text-slate-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Timeline */}
              <div className="mt-6">
                <h3 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.16em] text-slate-400">
                  <Target className="h-4 w-4" />
                  Timeline & Phases
                </h3>
                <div className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
                  {study.phases.map((phase, i) => (
                    <div
                      key={i}
                      className="rounded-xl border border-slate-800/70 bg-slate-950/40 p-3"
                    >
                      <div className="text-xs font-mono text-emerald-300">
                        {phase.week}
                      </div>
                      <div className="mt-1 text-xs text-slate-300">
                        {phase.milestone}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Metrics Section */}
        <MetricsVariant />

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-16 rounded-3xl border border-emerald-400/30 bg-emerald-400/5 p-8 text-center"
        >
          <h2 className="text-2xl font-semibold">Ready to start your pilot?</h2>
          <p className="mt-2 text-sm text-slate-300">
            Let's ship something meaningful in 4 weeks. No long-term lock-in,
            just consistent weekly progress.
          </p>
          <a
            href="mailto:hello@altruisticxai.com?subject=Portfolio%20Inquiry"
            className="mt-6 inline-flex items-center justify-center gap-2 rounded-full bg-emerald-400 px-6 py-3 text-sm font-medium text-slate-950 shadow-lg shadow-emerald-500/30 hover:bg-emerald-300 transition-colors"
          >
            Book a 30-min intro
            <ExternalLink className="h-4 w-4" />
          </a>
        </motion.div>
      </div>
    </div>
  );
}
