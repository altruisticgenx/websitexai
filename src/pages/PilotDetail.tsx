import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useParams, Link, Navigate } from "react-router-dom";
import { ArrowLeft, Clock, Target, TrendingUp, CheckCircle, Code, Calendar, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SiteNav } from "@/components/SiteNav";
import { cn } from "@/lib/utils";

interface PilotData {
  id: string;
  title: string;
  domain: string;
  problem: string;
  whatShips: string[];
  outcome: string;
  timeToDemo: string;
  price: string;
  challenge: string;
  approach: string[];
  techStack: string[];
  timeline: Array<{
    week: string;
    deliverables: string[];
  }>;
  featured?: boolean;
}

const PILOT_DETAILS: Record<string, PilotData> = {
  "energy-analytics": {
    id: "energy-analytics",
    title: "Energy Analytics Dashboard",
    domain: "Energy",
    problem: "Campus can't track real-time energy usage across 40+ buildings",
    whatShips: ["Live energy monitoring", "Building-level breakdowns", "Cost forecasting", "Anomaly alerts"],
    outcome: "$127k annual savings identified",
    timeToDemo: "Week 1",
    price: "$12k–$18k",
    challenge: "Large university campus with 40+ buildings had zero visibility into real-time energy consumption. Facilities team couldn't identify waste, predict demand spikes, or make data-driven decisions about HVAC scheduling and equipment upgrades. Manual meter readings took 20+ hours monthly and were often inaccurate.",
    approach: [
      "Integrated with existing building management systems (BMS) and smart meters",
      "Built real-time dashboard with building-level granularity",
      "Implemented ML-powered anomaly detection for waste identification",
      "Created forecasting model using weather data and historical patterns",
      "Automated alert system for abnormal consumption patterns",
    ],
    techStack: ["React", "Python", "TimescaleDB", "BACnet Protocol", "Chart.js", "FastAPI"],
    timeline: [
      {
        week: "Week 1",
        deliverables: [
          "Live dashboard prototype with 5 buildings",
          "Real-time consumption charts",
          "Basic anomaly detection",
          "Demo ready for stakeholder review",
        ],
      },
      {
        week: "Week 2",
        deliverables: [
          "Expanded to all 40+ buildings",
          "Historical data import (2 years)",
          "Cost calculation integration",
          "Building comparison views",
        ],
      },
      {
        week: "Week 3",
        deliverables: [
          "ML forecasting model deployed",
          "Weather data integration",
          "Peak demand predictions",
          "Custom alert rules engine",
        ],
      },
      {
        week: "Week 4",
        deliverables: [
          "Mobile-responsive interface",
          "Export functionality for reports",
          "User documentation",
          "Stakeholder training session",
        ],
      },
    ],
    featured: true,
  },
  "founder-os": {
    id: "founder-os",
    title: "Founder OS",
    domain: "Startup",
    problem: "CEO spending 12 hrs/week on meeting prep and follow-ups",
    whatShips: ["Auto meeting summaries", "Action item tracking", "Email drafting", "CRM sync"],
    outcome: "85% time saved on admin",
    timeToDemo: "Week 1",
    price: "$10k–$16k",
    challenge: "Early-stage founder juggling 30+ meetings weekly with investors, customers, and team. Spending 12+ hours on prep notes, follow-up emails, and CRM updates. No system for tracking action items across conversations. Critical follow-ups being missed.",
    approach: [
      "Built AI-powered meeting assistant with calendar integration",
      "Implemented automated note-taking and summarization",
      "Created action item extraction and tracking system",
      "Developed email draft generator using founder's voice",
      "Integrated with HubSpot CRM for automatic contact updates",
    ],
    techStack: ["React", "TypeScript", "Lovable AI (Gemini 2.5 Flash)", "Calendar API", "HubSpot API", "Supabase"],
    timeline: [
      {
        week: "Week 1",
        deliverables: [
          "Meeting summary generator prototype",
          "Calendar sync (Google/Outlook)",
          "Basic action item extraction",
          "Demo with 5 real meetings",
        ],
      },
      {
        week: "Week 2",
        deliverables: [
          "Email draft generation",
          "Founder voice training (10 sample emails)",
          "CRM integration (HubSpot)",
          "Contact auto-creation",
        ],
      },
      {
        week: "Week 3",
        deliverables: [
          "Action item dashboard",
          "Deadline tracking & reminders",
          "Follow-up automation",
          "Mobile app prototype",
        ],
      },
      {
        week: "Week 4",
        deliverables: [
          "Polish & bug fixes",
          "Performance optimization",
          "User documentation",
          "Training session",
        ],
      },
    ],
    featured: true,
  },
  "edtech-portal": {
    id: "edtech-portal",
    title: "EdTech Student Portal",
    domain: "Education",
    problem: "Teachers manually tracking 200+ student assignments",
    whatShips: ["Auto-grading system", "Progress dashboards", "Parent notifications", "Assignment analytics"],
    outcome: "95% grading automation",
    timeToDemo: "Week 2",
    price: "$14k–$22k",
    challenge: "Middle school with 8 teachers managing 200+ students. Manual grading taking 15+ hours per teacher weekly. No centralized system for tracking student progress. Parents requesting more visibility into student performance. Teachers overwhelmed with administrative work.",
    approach: [
      "Built student portal with role-based access (students, teachers, parents)",
      "Implemented auto-grading for multiple-choice and short-answer questions",
      "Created progress tracking dashboard with grade analytics",
      "Developed automated parent notification system",
      "Integrated with existing Google Classroom assignments",
    ],
    techStack: ["React", "Node.js", "PostgreSQL", "Google Classroom API", "SendGrid", "Chart.js"],
    timeline: [
      {
        week: "Week 1",
        deliverables: [
          "User authentication system",
          "Basic assignment upload",
          "Student roster import",
          "Simple grading interface",
        ],
      },
      {
        week: "Week 2",
        deliverables: [
          "Auto-grading for MCQ",
          "Progress dashboard prototype",
          "Google Classroom sync",
          "Demo with 2 teachers",
        ],
      },
      {
        week: "Week 3",
        deliverables: [
          "Parent portal access",
          "Email notification system",
          "Grade analytics & trends",
          "Assignment calendar view",
        ],
      },
      {
        week: "Week 4",
        deliverables: [
          "Mobile-responsive design",
          "Bulk upload functionality",
          "Export grade reports",
          "Teacher training",
        ],
      },
    ],
    featured: true,
  },
  "demand-forecasting": {
    id: "demand-forecasting",
    title: "Energy Demand Forecasting",
    domain: "Energy",
    problem: "Can't predict peak usage periods, leading to demand charges",
    whatShips: ["ML-powered forecasting", "Weather integration", "Peak alert system", "Historical trends"],
    outcome: "22% reduction in demand charges",
    timeToDemo: "Week 2",
    price: "$15k–$20k",
    challenge: "Industrial facility with high energy demand was paying excessive demand charges due to unpredictable peak usage. No ability to forecast consumption based on production schedules, weather, or historical patterns. Monthly demand charges averaging $40k with frequent spikes during extreme weather.",
    approach: [
      "Built ML forecasting model using 3 years of historical data",
      "Integrated weather API for temperature-based predictions",
      "Connected to production scheduling system for load planning",
      "Created real-time alert system for predicted peak events",
      "Developed load-shedding recommendations for peak periods",
    ],
    techStack: ["Python", "scikit-learn", "React", "PostgreSQL", "Weather API", "MQTT", "FastAPI"],
    timeline: [
      {
        week: "Week 1",
        deliverables: [
          "Data pipeline from meters & BMS",
          "Historical data analysis (3 years)",
          "Basic forecasting model (24-hour ahead)",
          "Prototype dashboard",
        ],
      },
      {
        week: "Week 2",
        deliverables: [
          "Weather API integration",
          "Production schedule integration",
          "Enhanced ML model with multiple features",
          "Demo ready for operations team",
        ],
      },
      {
        week: "Week 3",
        deliverables: [
          "Real-time prediction engine",
          "Peak alert system (email/SMS)",
          "Load shedding recommendations",
          "7-day forecast view",
        ],
      },
      {
        week: "Week 4",
        deliverables: [
          "Mobile notifications",
          "Historical accuracy reports",
          "User training materials",
          "Operations team onboarding",
        ],
      },
    ],
  },
  "sustainability-tracker": {
    id: "sustainability-tracker",
    title: "Sustainability Dashboard",
    domain: "Energy",
    problem: "Manual carbon reporting takes 40+ hours quarterly",
    whatShips: ["Auto carbon tracking", "Scope 1-3 breakdowns", "Compliance reports", "Goal tracking"],
    outcome: "95% time saved on reporting",
    timeToDemo: "Week 1",
    price: "$10k–$15k",
    challenge: "Corporate campus required quarterly sustainability reports for board and ESG compliance. Sustainability manager spending 40+ hours manually collecting utility data, calculating emissions, and creating reports. No centralized tracking of reduction goals or progress toward net-zero commitments.",
    approach: [
      "Automated data collection from utility providers and meters",
      "Built carbon calculation engine following GHG Protocol standards",
      "Created visual dashboard for Scope 1, 2, and 3 emissions",
      "Implemented goal tracking with progress indicators",
      "Generated automated compliance reports (CDP, SASB, etc.)",
    ],
    techStack: ["React", "Node.js", "PostgreSQL", "PDF Generation", "Chart.js", "Utility APIs"],
    timeline: [
      {
        week: "Week 1",
        deliverables: [
          "Utility data ingestion pipeline",
          "Basic carbon calculation engine",
          "Scope 1 & 2 emissions dashboard",
          "Demo with current quarter data",
        ],
      },
      {
        week: "Week 2",
        deliverables: [
          "Scope 3 emissions tracking",
          "Historical data import (2 years)",
          "Emissions breakdown by building/dept",
          "Trend analysis views",
        ],
      },
      {
        week: "Week 3",
        deliverables: [
          "Goal setting & tracking module",
          "Net-zero pathway projections",
          "Automated report generation",
          "Export to CDP/SASB formats",
        ],
      },
      {
        week: "Week 4",
        deliverables: [
          "Mobile-responsive interface",
          "Board presentation template",
          "User documentation",
          "Training for sustainability team",
        ],
      },
    ],
  },
  "career-pathways": {
    id: "career-pathways",
    title: "Career Pathway Mapper",
    domain: "Education",
    problem: "Students can't visualize post-graduation career options",
    whatShips: ["Interactive pathway tool", "Skills gap analysis", "Job market data", "Mentorship matching"],
    outcome: "3x student engagement",
    timeToDemo: "Week 3",
    price: "$16k–$24k",
    challenge: "Community college with 5,000+ students had no tool for career exploration. Advisors overwhelmed with 1:300 ratios. Students graduating without clear career paths, low internship placement rates. No visibility into which skills were in-demand locally or what jobs alumni held.",
    approach: [
      "Built interactive career pathway visualization tool",
      "Integrated labor market data (BLS, LinkedIn, local employers)",
      "Created skills gap analysis comparing student transcripts to job requirements",
      "Developed mentorship matching system connecting students with alumni",
      "Built employer connection portal for internship postings",
    ],
    techStack: ["React", "Node.js", "PostgreSQL", "D3.js", "LinkedIn API", "BLS API", "SendGrid"],
    timeline: [
      {
        week: "Week 1",
        deliverables: [
          "Student profile system",
          "Basic career pathway database (20 careers)",
          "Skills inventory from transcripts",
          "Simple matching algorithm",
        ],
      },
      {
        week: "Week 2",
        deliverables: [
          "Labor market data integration",
          "Salary & job growth projections",
          "Skills gap visualization",
          "Course recommendations",
        ],
      },
      {
        week: "Week 3",
        deliverables: [
          "Interactive pathway explorer",
          "Alumni database integration",
          "Mentorship matching system",
          "Demo with 50 students",
        ],
      },
      {
        week: "Week 4",
        deliverables: [
          "Employer portal for internships",
          "Mobile app",
          "Advisor dashboard",
          "Launch with career services",
        ],
      },
    ],
  },
  "learning-analytics": {
    id: "learning-analytics",
    title: "Learning Analytics Engine",
    domain: "Education",
    problem: "No visibility into which students are falling behind",
    whatShips: ["Early warning system", "Intervention triggers", "Performance trends", "Admin dashboard"],
    outcome: "40% drop in student attrition",
    timeToDemo: "Week 2",
    price: "$18k–$26k",
    challenge: "Large university seeing 25% first-year attrition rate. No early warning system for at-risk students. Advisors finding out about struggling students too late. No centralized data on attendance, grades, engagement, or financial holds. Reactive rather than proactive student support.",
    approach: [
      "Integrated data from LMS, SIS, financial aid, and attendance systems",
      "Built predictive model identifying at-risk students",
      "Created automated alert system for advisors and support staff",
      "Developed intervention tracking and case management",
      "Built analytics dashboard showing cohort trends and outcomes",
    ],
    techStack: ["Python", "scikit-learn", "React", "PostgreSQL", "Canvas LMS API", "Ellucian API", "Tableau"],
    timeline: [
      {
        week: "Week 1",
        deliverables: [
          "Data integration pipeline (LMS + SIS)",
          "Student risk scoring model (v1)",
          "Basic alert dashboard",
          "Pilot with 100 students",
        ],
      },
      {
        week: "Week 2",
        deliverables: [
          "Attendance data integration",
          "Financial hold tracking",
          "Enhanced risk model (multiple factors)",
          "Demo with advising team",
        ],
      },
      {
        week: "Week 3",
        deliverables: [
          "Automated advisor alerts",
          "Intervention tracking system",
          "Case management workflow",
          "Student engagement metrics",
        ],
      },
      {
        week: "Week 4",
        deliverables: [
          "Admin analytics dashboard",
          "Cohort analysis views",
          "Export & reporting tools",
          "Campus-wide rollout training",
        ],
      },
    ],
  },
  "policy-tracker": {
    id: "policy-tracker",
    title: "Policy Tracking Dashboard",
    domain: "Gov",
    problem: "Staff manually tracking 100+ bills across 3 legislative sessions",
    whatShips: ["Auto bill tracking", "Amendment alerts", "Stakeholder tagging", "Impact summaries"],
    outcome: "80% time saved on tracking",
    timeToDemo: "Week 2",
    price: "$12k–$18k",
    challenge: "Advocacy organization tracking 100+ state bills across 3 legislative sessions. Two staff members spending 30+ hours weekly manually checking legislature websites, copying bill text into spreadsheets, emailing updates to coalition partners. Missing critical amendments and committee votes.",
    approach: [
      "Built automated bill scraper for state legislature websites",
      "Created dashboard with real-time bill status updates",
      "Implemented amendment detection and alert system",
      "Developed stakeholder tagging and notification system",
      "Built AI-powered bill impact summary generator",
    ],
    techStack: ["Python", "Beautiful Soup", "React", "PostgreSQL", "Lovable AI (Gemini)", "SendGrid", "Celery"],
    timeline: [
      {
        week: "Week 1",
        deliverables: [
          "Bill scraper for 1 state legislature",
          "Basic dashboard with bill list",
          "Manual bill import (100 bills)",
          "Prototype demo",
        ],
      },
      {
        week: "Week 2",
        deliverables: [
          "Automated daily scraping",
          "Amendment detection algorithm",
          "Email alert system",
          "Demo with policy team",
        ],
      },
      {
        week: "Week 3",
        deliverables: [
          "Stakeholder management system",
          "Coalition partner notifications",
          "AI impact summaries",
          "Advanced search & filters",
        ],
      },
      {
        week: "Week 4",
        deliverables: [
          "Multi-state support (3 legislatures)",
          "Mobile-responsive design",
          "Export functionality",
          "Team training & docs",
        ],
      },
    ],
  },
  "community-engagement": {
    id: "community-engagement",
    title: "Community Engagement Platform",
    domain: "Gov",
    problem: "Residents have no clear way to report issues or track resolutions",
    whatShips: ["Issue reporting portal", "Status tracking", "Response automation", "Analytics dashboard"],
    outcome: "65% faster response times",
    timeToDemo: "Week 3",
    price: "$14k–$20k",
    challenge: "City of 50,000 residents receiving complaints via phone, email, walk-ins with no centralized tracking. Average response time 14 days. Citizens frustrated with lack of visibility. Staff duplicating efforts, no data on issue trends or resource allocation.",
    approach: [
      "Built public-facing issue reporting portal with photo uploads",
      "Created internal case management system for city staff",
      "Developed automated routing to appropriate departments",
      "Implemented status tracking with citizen notifications",
      "Built analytics dashboard for trends and performance metrics",
    ],
    techStack: ["React", "Node.js", "PostgreSQL", "Mapbox", "Twilio", "AWS S3", "SendGrid"],
    timeline: [
      {
        week: "Week 1",
        deliverables: [
          "Public issue submission form",
          "Photo upload functionality",
          "Basic staff dashboard",
          "Map view of issues",
        ],
      },
      {
        week: "Week 2",
        deliverables: [
          "Case assignment workflow",
          "Department routing rules",
          "Staff mobile app",
          "Pilot with 20 test issues",
        ],
      },
      {
        week: "Week 3",
        deliverables: [
          "Citizen status tracking portal",
          "Email/SMS notifications",
          "Case notes & updates",
          "Demo with city council",
        ],
      },
      {
        week: "Week 4",
        deliverables: [
          "Analytics dashboard for leadership",
          "Response time metrics",
          "Issue category trends",
          "Public launch & PR materials",
        ],
      },
    ],
  },
  "grant-management": {
    id: "grant-management",
    title: "Grant Management System",
    domain: "Gov",
    problem: "Tracking 50+ grants in spreadsheets, missed deadlines",
    whatShips: ["Centralized grant hub", "Deadline reminders", "Compliance tracking", "Reporting automation"],
    outcome: "100% on-time submissions",
    timeToDemo: "Week 2",
    price: "$16k–$24k",
    challenge: "Nonprofit managing 50+ federal and foundation grants totaling $15M annually. Grants officer tracking everything in Excel, missing deadlines, duplicate reporting, no visibility into budget utilization. Executive director requesting real-time grant portfolio dashboards for board meetings.",
    approach: [
      "Built centralized grant database with full grant lifecycle tracking",
      "Created automated deadline reminder system (email/SMS)",
      "Developed compliance checklist templates for each funder",
      "Implemented budget tracking with burn rate alerts",
      "Built automated report generation from stored data",
    ],
    techStack: ["React", "Node.js", "PostgreSQL", "PDF Generation", "Google Calendar API", "Twilio", "Chart.js"],
    timeline: [
      {
        week: "Week 1",
        deliverables: [
          "Grant database schema",
          "Manual import of 50 grants",
          "Basic grant detail views",
          "Deadline calendar integration",
        ],
      },
      {
        week: "Week 2",
        deliverables: [
          "Automated deadline reminders",
          "Compliance checklist system",
          "Budget tracking module",
          "Demo with grants team",
        ],
      },
      {
        week: "Week 3",
        deliverables: [
          "Report generation templates",
          "Funder-specific formatting",
          "Document storage (S3)",
          "Grant search & filters",
        ],
      },
      {
        week: "Week 4",
        deliverables: [
          "Executive dashboard",
          "Portfolio analytics",
          "Mobile app for field staff",
          "Team training & rollout",
        ],
      },
    ],
  },
  "sales-copilot": {
    id: "sales-copilot",
    title: "Sales Copilot",
    domain: "Startup",
    problem: "Sales reps spending 60% of time on CRM data entry",
    whatShips: ["Auto lead enrichment", "Follow-up automation", "Deal scoring", "Pipeline insights"],
    outcome: "2.3x conversion rate",
    timeToDemo: "Week 2",
    price: "$14k–$22k",
    challenge: "B2B SaaS startup with 5-person sales team closing $50k ARR deals. Reps spending 60% of time on CRM data entry, lead research, and follow-up emails instead of selling. No lead scoring, inconsistent follow-up cadence, deals stalling in pipeline with no visibility into why.",
    approach: [
      "Built AI-powered lead enrichment pulling data from LinkedIn, Clearbit, etc.",
      "Created automated follow-up email system using rep's writing style",
      "Developed ML deal scoring model based on engagement signals",
      "Implemented pipeline health dashboard with stall alerts",
      "Integrated with Slack for real-time deal notifications",
    ],
    techStack: ["React", "TypeScript", "Lovable AI (Gemini)", "HubSpot API", "Clearbit API", "Slack API", "Supabase"],
    timeline: [
      {
        week: "Week 1",
        deliverables: [
          "HubSpot integration",
          "Basic lead enrichment (LinkedIn)",
          "Email template library",
          "Prototype with 1 rep",
        ],
      },
      {
        week: "Week 2",
        deliverables: [
          "Automated follow-up sequences",
          "Rep voice training (10 emails)",
          "Deal scoring model v1",
          "Demo with full sales team",
        ],
      },
      {
        week: "Week 3",
        deliverables: [
          "Pipeline health dashboard",
          "Stall detection alerts",
          "Slack integration",
          "Win/loss analysis",
        ],
      },
      {
        week: "Week 4",
        deliverables: [
          "Mobile app for reps",
          "Manager analytics dashboard",
          "A/B test framework",
          "Sales team training",
        ],
      },
    ],
  },
  "customer-insights": {
    id: "customer-insights",
    title: "Customer Insights Engine",
    domain: "Startup",
    problem: "Can't identify churn signals until customers already left",
    whatShips: ["Churn prediction", "Health scoring", "Intervention triggers", "Usage analytics"],
    outcome: "40% reduction in churn",
    timeToDemo: "Week 3",
    price: "$16k–$24k",
    challenge: "SaaS company with 500 customers and 15% annual churn. Customer success team reacting to cancellations instead of preventing them. No visibility into product usage, engagement patterns, or early warning signals. Exit interviews revealing issues that existed for months.",
    approach: [
      "Built data pipeline aggregating product usage, support tickets, and billing data",
      "Created ML churn prediction model with 14-day lookahead",
      "Developed customer health scoring algorithm",
      "Implemented automated intervention triggers for at-risk accounts",
      "Built CS dashboard with account prioritization",
    ],
    techStack: ["Python", "scikit-learn", "React", "PostgreSQL", "Segment", "Intercom API", "Stripe API", "FastAPI"],
    timeline: [
      {
        week: "Week 1",
        deliverables: [
          "Data pipeline (product + billing + support)",
          "Basic usage analytics",
          "Customer cohort analysis",
          "Initial model training",
        ],
      },
      {
        week: "Week 2",
        deliverables: [
          "Churn prediction model (v1)",
          "Health scoring algorithm",
          "Account risk dashboard",
          "Pilot with 50 accounts",
        ],
      },
      {
        week: "Week 3",
        deliverables: [
          "Automated intervention triggers",
          "CS task creation in CRM",
          "Email alerts for at-risk accounts",
          "Demo with CS team",
        ],
      },
      {
        week: "Week 4",
        deliverables: [
          "Refined ML model (v2)",
          "Executive retention dashboard",
          "Playbook templates",
          "CS team training & rollout",
        ],
      },
    ],
  },
};

const PilotDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const prefersReducedMotion = useReducedMotion();

  const pilot = id ? PILOT_DETAILS[id] : null;

  if (!pilot) {
    return <Navigate to="/pilots" replace />;
  }

  return (
    <div className="min-h-screen bg-background text-foreground antialiased">
      <SiteNav />

      <main className="relative">
        {/* Hero Section */}
        <section className="relative overflow-hidden border-b border-border">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/5" />
          <div className="relative mx-auto max-w-4xl px-4 py-12 sm:px-6 sm:py-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: prefersReducedMotion ? 0 : 0.6 }}
            >
              <Button variant="ghost" size="sm" className="mb-6" asChild>
                <Link to="/pilots">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Pilots
                </Link>
              </Button>

              <div className="flex flex-wrap gap-2 mb-4">
                <Badge variant="outline">{pilot.domain}</Badge>
                {pilot.featured && (
                  <Badge className="bg-accent/20 text-accent-foreground border-accent/30">Featured</Badge>
                )}
              </div>

              <h1 className="heading-1 mb-4">{pilot.title}</h1>

              <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-6">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-primary" />
                  <span>{pilot.timeToDemo} demo</span>
                </div>
                <div className="flex items-center gap-2">
                  <Target className="h-4 w-4 text-accent" />
                  <span className="font-medium">{pilot.price}</span>
                </div>
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-primary" />
                  <span className="font-medium">{pilot.outcome}</span>
                </div>
              </div>

              <Button size="lg" className="touch-target-lg" asChild>
                <a
                  href="https://us06web.zoom.us/launch/chat?src=direct_chat_link&email=altruisticxai@gmail.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Discuss This Pilot
                </a>
              </Button>
            </motion.div>
          </div>
        </section>

        {/* Content Sections */}
        <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 sm:py-16 space-y-12">
          {/* Challenge */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.6, delay: 0.1 }}
          >
            <h2 className="heading-2 mb-4">The Challenge</h2>
            <Card>
              <CardContent className="pt-6">
                <p className="body-lg leading-relaxed">{pilot.challenge}</p>
              </CardContent>
            </Card>
          </motion.section>

          {/* Pilot Approach */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.6, delay: 0.2 }}
          >
            <h2 className="heading-2 mb-4">Pilot Approach</h2>
            <Card>
              <CardContent className="pt-6">
                <ul className="space-y-3">
                  {pilot.approach.map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <span className="body-base">{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </motion.section>

          {/* 4-Week Timeline */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.6, delay: 0.3 }}
          >
            <h2 className="heading-2 mb-4">4-Week Timeline</h2>
            <div className="space-y-4">
              {pilot.timeline.map((week, index) => (
                <Card
                  key={week.week}
                  className={cn(
                    "border-l-4",
                    index === 0
                      ? "border-l-primary"
                      : index === 1
                      ? "border-l-accent"
                      : index === 2
                      ? "border-l-primary/70"
                      : "border-l-accent/70"
                  )}
                >
                  <CardHeader>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-5 w-5 text-primary" />
                      <CardTitle className="heading-4">{week.week}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {week.deliverables.map((deliverable, i) => (
                        <li key={i} className="flex items-start gap-2 body-base">
                          <span className="text-primary mt-1">•</span>
                          <span>{deliverable}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </motion.section>

          {/* Tech Stack */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.6, delay: 0.4 }}
          >
            <h2 className="heading-2 mb-4">Tech Stack</h2>
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Code className="h-5 w-5 text-primary" />
                  <CardTitle className="heading-4">Technologies Used</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {pilot.techStack.map((tech, index) => (
                    <Badge key={index} variant="secondary" className="text-sm">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.section>

          {/* CTA Section */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.6, delay: 0.5 }}
            className="border-t border-border pt-12"
          >
            <div className="text-center">
              <h2 className="heading-2 mb-4">Ready to Start Your Pilot?</h2>
              <p className="body-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                Book a 30-minute fit call to discuss how we can adapt this pilot to your specific needs.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="touch-target-lg" asChild>
                  <a
                    href="https://us06web.zoom.us/launch/chat?src=direct_chat_link&email=altruisticxai@gmail.com"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <MessageSquare className="mr-2 h-4 w-4" />
                    Book Fit Call
                  </a>
                </Button>
                <Button size="lg" variant="outline" className="touch-target-lg" asChild>
                  <Link to="/pilots">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    View All Pilots
                  </Link>
                </Button>
              </div>
            </div>
          </motion.section>
        </div>
      </main>
    </div>
  );
};

export default PilotDetail;
