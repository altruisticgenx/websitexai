export interface CaseStudyPhase {
  week: string;
  milestone: string;
}

export interface CaseStudy {
  id: string;
  title: string;
  sector: string;
  tagline: string;
  summary: string;
  challenge: string;
  solution: string;
  outcomes: string[];
  technologies: string[];
  timeline: string;
  duration: string;
  phases: CaseStudyPhase[];
  tag?: string;
}

export const caseStudiesData: CaseStudy[] = [
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
    tagline: "Turning building-by-building meter chaos into clarity",
    summary:
      "Raw meter exports from 200+ buildings morphed into an actionable live dashboard that flags savings opportunities, detects anomalies, and gives facility managers easy wins—campus energy spend dropped 18% in the pilot's first semester.",
    challenge:
      "Campus facilities team was drowning in Excel spreadsheets with thousands of meter readings from 200+ buildings. Energy waste went undetected for months, billing errors slipped through, and there was no way to identify which buildings needed immediate attention. Manual analysis was consuming 10+ hours per week with minimal insight.",
    solution:
      "Built a real-time analytics dashboard that ingests meter data, normalizes readings across different building types, detects anomalies using statistical baselines, and surfaces actionable recommendations. The system flags unusual spikes, compares buildings against efficiency benchmarks, and automatically generates prioritized action lists for facility managers.",
    outcomes: [
      "18% reduction in overall energy spend",
      "Automated 95% of meter data analysis",
      "Detected $47K in billing errors in first quarter",
      "Reduced analysis time from 10 hours/week to 15 min/week",
    ],
    technologies: [
      "React + TypeScript",
      "Python (Data Processing)",
      "Pandas + NumPy",
      "PostgreSQL",
      "Recharts",
      "Tailwind CSS",
      "Node.js (API)",
    ],
    timeline: "5 weeks proof-of-concept",
    duration: "5 weeks",
    phases: [
      { week: "Week 1", milestone: "Data ingestion + normalization" },
      { week: "Week 2-3", milestone: "Anomaly detection + benchmarking" },
      { week: "Week 4", milestone: "Dashboard UI + visualizations" },
      { week: "Week 5", milestone: "Testing + facility team training" },
    ],
    tag: "Energy & climate",
  },
  {
    id: "edtech-portal",
    title: "EdTech Pilot Portal",
    sector: "Education Nonprofit",
    tagline: "Evidence that wins funding rounds",
    summary:
      "Turned scattered pilot data from 12 schools into a clean, funder-ready dashboard. Program directors can now show real-time student outcomes, teacher adoption rates, and curriculum effectiveness—securing their next funding round with confidence.",
    challenge:
      "Education nonprofit was running pilots across 12 schools but couldn't effectively demonstrate impact to funders. Data lived in Google Sheets, teacher feedback was in emails, and student outcomes were scattered across different platforms. When funding applications came around, they scrambled to manually compile reports—often missing critical metrics or presenting outdated data.",
    solution:
      "Created a centralized pilot tracking portal that aggregates student participation data, teacher feedback, assessment results, and program milestones. The system automatically generates funder-ready reports showing longitudinal trends, comparative analysis across schools, and evidence of impact. Real-time dashboards give program directors instant visibility into pilot health.",
    outcomes: [
      "Secured $250K in additional funding using portal data",
      "Reduced report generation time from 3 days to 15 minutes",
      "100% teacher participation in feedback system",
      "Enabled data-driven program improvements mid-pilot",
    ],
    technologies: [
      "React + TypeScript",
      "Supabase (Database + Auth)",
      "Chart.js",
      "Tailwind CSS",
      "React Query",
      "PDF Generation (jsPDF)",
    ],
    timeline: "4 weeks MVP",
    duration: "4 weeks",
    phases: [
      { week: "Week 1", milestone: "Core data model + school setup" },
      { week: "Week 2", milestone: "Student tracking + teacher feedback" },
      { week: "Week 3", milestone: "Analytics + report generation" },
      { week: "Week 4", milestone: "Polish + funder-ready exports" },
    ],
    tag: "Education impact",
  },
];

export const getCaseStudyById = (id: string): CaseStudy | undefined => {
  return caseStudiesData.find((study) => study.id === id);
};

export const getAllCaseStudies = (): CaseStudy[] => {
  return caseStudiesData;
};
