import React from "react";
import { motion } from "framer-motion";
import { useParams, Link, Navigate } from "react-router-dom";
import { ArrowLeft, Calendar, CheckCircle2, Code } from "lucide-react";
import { ProjectTimeline } from "@/components/ProjectTimeline";

// --- Case Study Data (shared) ---
export const caseStudiesData = [
  {
    id: "sales-copilot",
    title: "AI Sales Copilot Dashboard",
    sector: "Founder-Backed Startup",
    tagline: "A personalized growth engine that learns from founder behavior",
    summary:
      "Not just another CRM add-on—this system studies founders' actual outreach patterns, auto-classifies high-intent conversations, and surfaces 'don't-drop-these' deals with smart follow-ups trained on real founder behavior.",
    challenge:
      "The sales team was drowning in manual follow-ups and couldn't identify high-intent leads quickly enough. Generic CRM templates felt robotic and didn't match the founder's unique voice. They needed a system that could learn their actual communication style, automatically prioritize leads based on subtle buying signals, and suggest follow-up actions that felt authentically human.",
    solution:
      "Built an AI-powered dashboard that studies the founder's email patterns, call transcripts, and successful deal histories to create a personalized engagement model. The system uses natural language processing to detect buying signals, sentiment shifts, and conversation momentum—then generates follow-ups that match the founder's voice and timing preferences. It evolves continuously, becoming smarter with every interaction.",
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
    tag: "Pilot to production",
  },
  {
    id: "founder-os",
    title: "Founder OS Dashboard",
    sector: "Solo Founder",
    tagline: "Engineered for founder attention protection",
    summary:
      "A stripped-down, elegant cockpit that merges calendar, CRM, tasks, and invoicing into one serene flow. Context-aware sections hide anything irrelevant, dramatically lowering cognitive load for solo founders.",
    challenge:
      "Solo founder juggling Calendly, Notion, Stripe, and a spreadsheet CRM—constantly context-switching between tools and drowning in SaaS fragmentation. Each tool added mental overhead, breaking focus and making it impossible to see the full picture of client relationships, revenue, and upcoming commitments. They needed a unified view without enterprise bloat.",
    solution:
      "Created an intentionally minimalist dashboard that combines scheduling (with intelligent buffer time rules), contact management, session notes, and invoice tracking. The interface adapts to context—hiding irrelevant sections and surfacing only what matters for the current task. Built with 'calm mode' principles: soft gradients, zero unnecessary notifications, and a focus on reducing decision fatigue rather than adding features.",
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
    tag: "Operational clarity",
  },
  {
    id: "energy-analytics",
    title: "Energy Analytics Pilot",
    sector: "Climate & Energy",
    tagline: "From static reporting to scenario-driven decision-making",
    summary:
      "Converts chaotic meter and operations data into a clean, real-time analytics environment. AI spots invisible inefficiencies, forecasts savings, and lets teams simulate operational changes before they're expensive.",
    challenge:
      "Campus operations team had 200+ buildings with meter data scattered across Excel files, PDFs, and legacy energy management software. No way to spot patterns, compare buildings, or identify savings opportunities without weeks of manual analysis. Worse, they couldn't test 'what-if' scenarios—every operational change was a leap of faith with no way to predict outcomes or ROI.",
    solution:
      "Built a real-time analytics platform that ingests meter data from multiple sources, normalizes it, and transforms it into interactive visualizations. Added AI-powered anomaly detection that spots inefficiencies invisible to human analysis, peer building comparisons to identify underperformers, and a scenario simulation engine that lets teams test operational changes virtually. Teams can now model the impact of equipment upgrades, schedule shifts, or behavior changes before committing capital.",
    outcomes: [
      "Identified $180k+ in savings opportunities in first month",
      "Reduced energy analysis time from weeks to hours",
      "Enabled data-driven decisions for retrofits and upgrades",
      "Now tracking 200+ buildings with real-time alerts",
    ],
    technologies: [
      "React + TypeScript",
      "Python (Data Processing)",
      "Supabase (Database)",
      "Recharts + D3.js",
      "Tailwind CSS",
      "Node.js (API)",
    ],
    timeline: "5 weeks proof-of-concept to pilot",
    duration: "5 weeks",
    phases: [
      { week: "Week 1", milestone: "Data ingestion + normalization pipeline" },
      { week: "Week 2-3", milestone: "Dashboard UI + visualization" },
      { week: "Week 4", milestone: "Anomaly detection + savings algorithm" },
      { week: "Week 5", milestone: "Testing, refinement, pilot launch" },
    ],
    tag: "Energy & climate",
  },
  {
    id: "edtech-portal",
    title: "EdTech Pilot Portal",
    sector: "Education Nonprofit",
    tagline: "Bridging classroom reality with funder-ready narratives",
    summary:
      "Tracks pilots, student paths, and impact metrics—then auto-translates that activity into polished, grant-winning insights. Its 'evidence engine' converts day-to-day engagement into the structured outcomes funders demand.",
    challenge:
      "Education nonprofit running 15+ pilots across schools with all tracking in Google Sheets. Coordinators spent weeks manually compiling data for grant reports, and there was no way to quickly surface which programs were actually working. The gap between messy classroom reality and the polished narratives funders expect was costing them time, credibility, and funding. Leadership faced a $500k renewal decision with weak evidence.",
    solution:
      "Created a pilot management portal with an 'evidence engine' at its core. Coordinators log student engagement, outcomes, and qualitative feedback in simple forms—then the system automatically weaves that data into compelling, funder-ready narratives. It generates board-ready reports with trend analysis, program comparisons, and impact stories backed by real numbers. Designed for non-technical education staff, with guided workflows that tighten feedback loops and improve grant storytelling.",
    outcomes: [
      "Secured $500k funding renewal with data-backed reporting",
      "Reduced report prep time from 2 weeks to 2 hours",
      "Identified top 3 highest-impact programs for scaling",
      "Now standard tool for all pilot coordinators",
    ],
    technologies: [
      "React + TypeScript",
      "Supabase (Database + Auth)",
      "Tailwind CSS",
      "Recharts",
      "PDF Generation (jsPDF)",
    ],
    timeline: "4 weeks MVP to funding decision",
    duration: "4 weeks",
    phases: [
      { week: "Week 1", milestone: "Core data model + pilot tracking UI" },
      { week: "Week 2", milestone: "Student tracking + outcome logging" },
      { week: "Week 3", milestone: "Reporting + data visualization" },
      { week: "Week 4", milestone: "PDF generation + polish for board demo" },
    ],
    tag: "Education impact",
  },
];

const CaseStudyDetail = () => {
  const { id } = useParams<{ id: string }>();
  const caseStudy = caseStudiesData.find((study) => study.id === id);

  if (!caseStudy) {
    return <Navigate to="/portfolio" replace />;
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50">
      <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-primary transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to home
          </Link>
        </motion.div>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mt-8"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-400/30 bg-blue-400/10 px-3 py-1 text-xs font-medium text-blue-300">
            {caseStudy.sector}
          </div>
          <h1 className="mt-4 text-3xl font-bold text-slate-50 sm:text-4xl">
            {caseStudy.title}
          </h1>
          <p className="mt-3 text-lg text-slate-300">{caseStudy.tagline}</p>
        </motion.div>

        {/* Timeline & Duration */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-6 flex flex-wrap gap-4"
        >
          <div className="flex items-center gap-2 rounded-xl border border-slate-800/80 bg-slate-900/60 px-4 py-2">
            <Calendar className="h-4 w-4 text-primary" />
            <span className="text-sm text-slate-300">{caseStudy.duration}</span>
          </div>
          <div className="flex items-center gap-2 rounded-xl border border-slate-800/80 bg-slate-900/60 px-4 py-2">
            <Code className="h-4 w-4 text-primary" />
            <span className="text-sm text-slate-300">{caseStudy.timeline}</span>
          </div>
        </motion.div>

        {/* Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-8 rounded-2xl border border-slate-800/80 bg-slate-900/60 p-6"
        >
          <p className="text-base leading-relaxed text-slate-200">
            {caseStudy.summary}
          </p>
        </motion.div>

        {/* Challenge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-8"
        >
          <h2 className="text-xl font-semibold text-slate-50">The Challenge</h2>
          <p className="mt-3 text-base leading-relaxed text-slate-300">
            {caseStudy.challenge}
          </p>
        </motion.div>

        {/* Solution */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-8"
        >
          <h2 className="text-xl font-semibold text-slate-50">The Solution</h2>
          <p className="mt-3 text-base leading-relaxed text-slate-300">
            {caseStudy.solution}
          </p>
        </motion.div>

        {/* Outcomes */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-8"
        >
          <h2 className="text-xl font-semibold text-slate-50">Key Outcomes</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {caseStudy.outcomes.map((outcome, index) => (
              <div
                key={index}
                className="flex items-start gap-3 rounded-xl border border-slate-800/80 bg-slate-900/60 p-4"
              >
                <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                <span className="text-sm text-slate-200">{outcome}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Project Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="mt-8"
        >
          <h2 className="text-xl font-semibold text-slate-50">Project Timeline</h2>
          <ProjectTimeline phases={caseStudy.phases} duration={caseStudy.duration} />
        </motion.div>

        {/* Technologies */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="mt-8"
        >
          <h2 className="text-xl font-semibold text-slate-50">Technologies Used</h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {caseStudy.technologies.map((tech, index) => (
              <span
                key={index}
                className="rounded-full border border-slate-700/80 bg-slate-800/60 px-3 py-1 text-xs text-slate-300"
              >
                {tech}
              </span>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.9 }}
          className="mt-12 rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/5 to-primary/10 p-6 text-center"
        >
          <h3 className="text-lg font-semibold text-slate-50">
            Need something similar?
          </h3>
          <p className="mt-2 text-sm text-slate-300">
            Book a 30-min intro to discuss your pilot project and get a clear weekly plan.
          </p>
          <a
            href="https://scheduler.zoom.us/altruistic-xai"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center justify-center rounded-full bg-primary px-6 py-2.5 text-sm font-medium text-slate-950 shadow-lg shadow-primary/30 hover:bg-primary/90 transition-colors"
          >
            Book a call
          </a>
        </motion.div>

        {/* Navigation to other case studies */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1 }}
          className="mt-12 border-t border-slate-800/80 pt-8"
        >
          <h3 className="text-sm font-medium text-slate-400">More Case Studies</h3>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {caseStudiesData
              .filter((study) => study.id !== id)
              .slice(0, 2)
              .map((study) => (
                <Link
                  key={study.id}
                  to={`/case-study/${study.id}`}
                  className="group rounded-xl border border-slate-800/80 bg-slate-900/60 p-4 transition-all hover:border-primary/30 hover:-translate-y-1"
                >
                  <div className="text-xs text-primary">{study.sector}</div>
                  <h4 className="mt-2 text-sm font-semibold text-slate-50 group-hover:text-primary transition-colors">
                    {study.title}
                  </h4>
                  <p className="mt-1 text-xs text-slate-400">{study.tagline}</p>
                </Link>
              ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default CaseStudyDetail;
