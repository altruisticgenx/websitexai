import React from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Calendar, Code, Target, CheckCircle2, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
import { MetricsVariant } from "@/components/ui/animated-cards-stack";
import { UniqueIntegrations } from "@/components/UniqueIntegrations";
import { ProjectTimeline } from "@/components/utilities";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

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
    marketValue:
      "Market differentiation: Unlike generic CRMs (Salesforce, HubSpot) requiring months of setup + $2k–5k/seat/yr, this shipped in 6 weeks at competitive pilot cost. No bloated enterprise features—just AI lead scoring + automated follow-ups. Competitive edge: Real-time sentiment analysis from unstructured email/call data (vs. manual tagging). ROI: Saved 15hrs/week/rep × $75/hr = $58k annual savings for 5-person team. Faster sales cycles (45→28 days) = 60% more deals closed per quarter.",
    differentiation:
      "Custom-built for their exact workflow (not off-the-shelf). Integrated with existing tools (Gmail, Zoom, existing CRM) without forced migration. AI models fine-tuned on their industry language (B2B SaaS). Mobile-first design for reps in the field. Privacy-first: Data stays in their Supabase instance, not third-party AI vendor.",
    outcomes: [
      "65% reduction in manual follow-up time (15hrs→5hrs/week per rep)",
      "2.3x increase in high-intent lead conversion (18%→41% close rate)",
      "Automated 80% of lead scoring process (AI handles 200+ leads/day)",
      "Cut sales cycle from 45 to 28 days average (38% faster)",
      "$58k annual labor savings for 5-person sales team",
      "ROI breakeven in 8 weeks (vs. 18-month enterprise CRM contracts)",
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
      { week: "Week 1", milestone: "Core UI + lead scoring algorithm • Built React dashboard skeleton, PostgreSQL schema, and initial ML scoring model • Validated: Founder confirmed UI matches mental model • Deliverable: Clickable prototype scoring 50 test leads" },
      { week: "Week 2-3", milestone: "AI integration + live email parsing • Connected OpenAI GPT-4 API, built email ingestion pipeline, trained sentiment analysis on 200+ historical emails • Validated: Scored live leads with 89% accuracy vs. founder's manual ratings • Deliverable: Real-time lead scoring from Gmail integration" },
      { week: "Week 4-5", milestone: "Workflow automation + stress testing • Implemented auto-follow-up sequences, Zapier webhooks, load tested 500 concurrent leads • Validated: Sales team ran parallel test (old CRM vs. new system) — new system flagged 3 high-intent deals old CRM missed • Deliverable: Production-ready automation handling 200+ leads/day" },
      { week: "Week 6", milestone: "Polish, deploy, team training • Fixed edge cases, deployed to Vercel, conducted 2hr team training, documented API • Validated: Sales team closed first AI-flagged deal worth $42k ARR within week 6 • Deliverable: Live production system + runbook + 90-day support plan" },
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
    marketValue:
      "Market gap: Solo founders/consultants pay $100–300/mo across 5+ SaaS tools (Calendly $12, Notion $10, HubSpot $50, Stripe Dashboard free but clunky, etc.). This pilot delivered 15-month payback vs. tool subscriptions. Differentiation: Zero vendor lock-in (own your data), no per-seat pricing, built for 1-person ops (not scaled-down enterprise tools). Time ROI: 4hrs/wk saved × $150/hr founder rate = $31k/yr value.",
    differentiation:
      "Not a 'CRM for teams'—designed for solo operators. Opinionated workflows (e.g., auto-buffer 15min between calls, session prep reminders). Direct Stripe sync (see MRR + upcoming invoices in one view). Calm UI: No notification spam, no gamification, no 'growth hacking' dashboards. Privacy-first: All client data in founder's Supabase instance, not shared with third-party CRM.",
    outcomes: [
      "Consolidated 5 tools into 1 interface (saved $200/mo in subscriptions)",
      "Saved 4+ hours per week on admin tasks ($31k annual time value)",
      "100% adoption rate (founder uses it daily, replaced all prior tools)",
      "Client response time improved by 40% (12hr→7hr avg response)",
      "Invoice tracking reduced missed payments from 8%→0%",
      "Mobile-first: Manage clients from phone during commute",
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
      { week: "Week 1", milestone: "Core dashboard + unified contact list • Built single-page React dashboard, migrated 47 contacts from spreadsheet to Supabase, designed 'calm mode' UI with muted colors • Validated: Founder tested daily for 3 days, confirmed 'finally feels organized' • Deliverable: Working contact manager replacing Notion + spreadsheet" },
      { week: "Week 2", milestone: "Calendar integration + session tracking • Integrated Cal.com API for booking, built session note-taking UI, added client communication history • Validated: Founder booked 3 client sessions through new system, took structured notes during live calls • Deliverable: Unified scheduling + note-taking workflow" },
      { week: "Week 3", milestone: "Invoicing + Stripe sync • Connected Stripe API for invoice generation, built automatic session-to-invoice flow, added payment tracking • Validated: Generated $3,200 in real invoices, received first client payment through system • Deliverable: End-to-end client lifecycle (book → meet → note → invoice → track payment)" },
      { week: "Week 4", milestone: "Mobile optimization + launch • Responsive Tailwind redesign for mobile, added keyboard shortcuts (Cmd+K for quick actions), deployed to custom domain • Validated: Founder used exclusively on iPhone for 1 week, reported 4hr/week time savings vs. old tools • Deliverable: Production app at founderos.app + mobile-first PWA" },
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
    marketValue:
      "Market context: Enterprise energy management platforms (Schneider EcoStruxure, Siemens Navigator) cost $50k–200k + 12-month implementations. University got pilot in 8 weeks at competitive cost. Identified $180k savings = 20× ROI in Year 1. Differentiation: Works with messy legacy data (no meter hardware replacement needed). Custom anomaly detection tuned for academic calendars (vs. generic commercial algorithms). Stakeholder-ready reports for non-technical leadership.",
    differentiation:
      "Not a vendor lock-in platform—built on open-source stack (Python + Postgres). Custom pipeline handles 15+ meter data formats (vs. rigid enterprise ETL). Anomaly detection accounts for academic schedules (weekends, breaks, events). Mobile dashboard for facilities staff doing building walkthroughs. Privacy: University owns data (no third-party cloud vendor). Scales from 10→2,000 buildings without rearchitecture.",
    outcomes: [
      "Identified $180k+ in annual savings opportunities (HVAC scheduling, phantom loads)",
      "Reduced energy waste detection time from weeks to minutes (real-time alerts)",
      "Enabled data-driven capital planning ($2.3M retrofit prioritization)",
      "Piloted across 200+ buildings in 8 weeks (vs. 12-month enterprise rollouts)",
      "Detected $40k in billing errors (meter misconfigurations)",
      "Automated monthly reports (saved 20hrs/mo analyst time)",
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
      { week: "Week 1-2", milestone: "Data ingestion + live dashboards • Parsed 200+ building meter CSVs (900k rows), built Python ETL pipeline, created Recharts visualizations, designed facility manager UI • Validated: Identified 3 buildings with 24/7 HVAC waste in week 1 data review • Deliverable: Real-time energy dashboard showing 200+ buildings" },
      { week: "Week 3-4", milestone: "Anomaly detection + cost alerts • Trained ML model on 2-year historical data (1.2M meter readings), built Slack/email alert system, calculated per-building savings projections • Validated: System flagged weekend HVAC spike costing $1,200/month at Building 14 — maintenance confirmed faulty timer • Deliverable: Automated waste detection saving est. $18k/year campus-wide" },
      { week: "Week 5-6", milestone: "Peer comparison + scenario modeling • Built building peer-comparison tool (similar size/type), added 'what-if' simulator for operational changes, optimized mobile dashboards • Validated: Facilities manager used simulator to justify $50k HVAC upgrade (projected 18-month payback) • Deliverable: Decision-support tools for capital planning" },
      { week: "Week 7-8", milestone: "Campus rollout + leadership reporting • Deployed to campus subdomain, trained 12 facility managers, created video tutorials, set up monthly executive reports • Validated: Facilities director presented dashboard to CFO, secured $50k capital budget for HVAC upgrades based on data • Deliverable: Adopted campus-wide, tracking $200k+ annual savings opportunities" },
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
    marketValue:
      "Nonprofit context: Risk of losing $500k grant due to slow/incomplete reporting. Commercial edtech platforms (Salesforce Education Cloud, Blackbaud) cost $20k–80k/yr + consultants. This pilot delivered at competitive cost. Secured $500k renewal = 87× ROI. Differentiation: Built for outcome reporting (not student management). Funder-ready exports (PDF + CSV with required metrics). Works across schools without per-site licensing.",
    differentiation:
      "Not a learning management system—focused on program evaluation. Custom metrics aligned with funder requirements (completion rates, demographic equity, qualitative themes). Role-based access (program managers, school admins, grant officers). Privacy-first: Student PII stays in nonprofit's Supabase (FERPA-compliant). Mobile data entry for program managers visiting schools. Automated funder reports (no manual Excel compilation).",
    outcomes: [
      "Reduced reporting time from 3 weeks to 2 hours (saved 100hrs/yr)",
      "Secured $500k+ renewal based on clear outcome data (87× ROI)",
      "Increased pilot completion visibility by 100% (real-time dashboards)",
      "Enabled real-time program adjustments (spotted 30% dropout in Week 3, pivoted)",
      "Automated demographic equity analysis (vs. manual spreadsheet breakdowns)",
      "Eliminated 15+ spreadsheet versions (single source of truth)",
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
      { week: "Week 1", milestone: "Pilot design + 3 school partnerships secured • Co-designed pilot framework with nonprofit team, built student data model in Supabase, secured MOUs with 3 Title I high schools (450 students) • Validated: Principals confirmed alignment with state standards, teachers volunteered as pilot leads • Deliverable: Signed partnerships + pilot curriculum outline + data schema" },
      { week: "Week 2-3", milestone: "Student portal + teacher dashboard built • Developed React portal for student submissions, built teacher dashboard with real-time outcome tracking, integrated Google Classroom SSO for easy login • Validated: 87 students onboarded in pilot school #1, submitted 34 project reflections in first week • Deliverable: Live portal at pilots.nonprofitname.org used by 450 students across 3 schools" },
      { week: "Week 4", milestone: "Impact analytics + funder report generator • Built outcome export tool (CSV + charts), tracked completion rates by demographics, created PDF report generator with nonprofit branding • Validated: Program manager generated first funder report in 12 minutes (vs. 3-week manual process) • Deliverable: Automated funder-ready reports with completion rates, demographic breakdowns, qualitative themes" },
      { week: "Week 5", milestone: "Grant defense + staff training • Compiled pilot impact data (78% completion vs. 45% state avg), trained 6 program coordinators, presented to school board • Validated: 9 students presented projects to school board, grant officer used data to defend $500k funding renewal • Deliverable: Grant-ready impact report showing 40% above-average engagement, used to secure $500k continuation funding (approved 3 weeks later)" },
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
        <div className="space-y-6 sm:space-y-8">
          {caseStudies.map((study, index) => (
            <motion.article
              key={study.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="rounded-2xl border border-slate-800/80 bg-slate-900/60 p-3 sm:p-5"
            >
              {/* Header */}
              <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <div className="text-[9px] font-medium uppercase tracking-wider text-emerald-300">
                    {study.sector}
                  </div>
                  <h2 className="mt-1 text-base font-semibold sm:text-lg">
                    {study.title}
                  </h2>
                  <p className="mt-0.5 text-[10px] text-slate-400">{study.tagline}</p>
                </div>
                <div className="flex items-center gap-1.5 rounded-full border border-slate-700/80 bg-slate-800/50 px-2 py-1 text-[9px] text-slate-300">
                  <Calendar className="h-2.5 w-2.5" />
                  {study.duration}
                </div>
              </div>

              {/* Expandable Details */}
              <Accordion type="multiple" className="mt-3">
                <AccordionItem value="challenge" className="border-slate-800/50">
                  <AccordionTrigger className="py-2 text-[9px] font-semibold uppercase tracking-[0.18em] text-slate-400 hover:text-slate-200 hover:no-underline">
                    Challenge
                  </AccordionTrigger>
                  <AccordionContent className="pb-2 pt-1 text-[10px] text-slate-200 leading-relaxed">
                    {study.challenge}
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="solution" className="border-slate-800/50">
                  <AccordionTrigger className="py-2 text-[9px] font-semibold uppercase tracking-[0.18em] text-slate-400 hover:text-slate-200 hover:no-underline">
                    Solution
                  </AccordionTrigger>
                  <AccordionContent className="pb-2 pt-1 text-[10px] text-slate-200 leading-relaxed">
                    {study.solution}
                  </AccordionContent>
                </AccordionItem>

                {study.marketValue && (
                  <AccordionItem value="market" className="border-slate-800/50">
                    <AccordionTrigger className="py-2 text-[9px] font-semibold uppercase tracking-[0.18em] text-emerald-300 hover:text-emerald-200 hover:no-underline">
                      💰 Market Value + ROI
                    </AccordionTrigger>
                    <AccordionContent className="rounded-lg border border-emerald-500/20 bg-emerald-500/5 p-2 text-[10px] text-slate-200 leading-relaxed">
                      {study.marketValue}
                    </AccordionContent>
                  </AccordionItem>
                )}

                {study.differentiation && (
                  <AccordionItem value="differentiation" className="border-slate-800/50">
                    <AccordionTrigger className="py-2 text-[9px] font-semibold uppercase tracking-[0.18em] text-cyan-300 hover:text-cyan-200 hover:no-underline">
                      🎯 Competitive Differentiation
                    </AccordionTrigger>
                    <AccordionContent className="rounded-lg border border-cyan-500/20 bg-cyan-500/5 p-2 text-[10px] text-slate-200 leading-relaxed">
                      {study.differentiation}
                    </AccordionContent>
                  </AccordionItem>
                )}
              </Accordion>

              {/* Outcomes */}
              <div className="mt-3">
                <h3 className="text-[9px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                  Key Outcomes
                </h3>
                <ul className="mt-2 grid gap-1.5 sm:grid-cols-2">
                  {study.outcomes.map((outcome, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-1.5 text-[10px] text-slate-200"
                    >
                      <CheckCircle2 className="mt-0.5 h-2.5 w-2.5 flex-shrink-0 text-emerald-400" />
                      <span>{outcome}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Technologies */}
              <div className="mt-3">
                <h3 className="flex items-center gap-1.5 text-[9px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                  <Code className="h-2.5 w-2.5" />
                  Technologies
                </h3>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {study.technologies.map((tech, i) => (
                    <span
                      key={i}
                      className="rounded-full border border-slate-700/60 bg-slate-800/40 px-2 py-0.5 text-[9px] text-slate-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Interactive Timeline */}
              <ProjectTimeline phases={study.phases} duration={study.duration} />
            </motion.article>
          ))}
        </div>

        {/* Unique AI Integrations Section */}
        <UniqueIntegrations />

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
            href="https://scheduler.zoom.us/altruistic-xai"
            target="_blank"
            rel="noopener noreferrer"
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
