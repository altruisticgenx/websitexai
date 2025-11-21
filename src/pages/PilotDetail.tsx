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
