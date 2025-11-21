import React, { useState, useMemo } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Zap, Book, Users, Cpu, Filter, ArrowRight, Clock, Target, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SiteNav } from "@/components/SiteNav";
import { cn } from "@/lib/utils";

type Domain = "All" | "Energy" | "Education" | "Gov" | "Startup";

interface Pilot {
  id: string;
  title: string;
  domain: Exclude<Domain, "All">;
  problem: string;
  whatShips: string[];
  outcome: string;
  timeToDemo: string;
  price: string;
  featured?: boolean;
}

const PILOTS_DATA: Pilot[] = [
  {
    id: "energy-analytics",
    title: "Energy Analytics Dashboard",
    domain: "Energy",
    problem: "Campus can't track real-time energy usage across 40+ buildings",
    whatShips: ["Live energy monitoring", "Building-level breakdowns", "Cost forecasting", "Anomaly alerts"],
    outcome: "$127k annual savings identified",
    timeToDemo: "Week 1",
    price: "$12k–$18k",
    featured: true,
  },
  {
    id: "demand-forecasting",
    title: "Energy Demand Forecasting",
    domain: "Energy",
    problem: "Can't predict peak usage periods, leading to demand charges",
    whatShips: ["ML-powered forecasting", "Weather integration", "Peak alert system", "Historical trends"],
    outcome: "22% reduction in demand charges",
    timeToDemo: "Week 2",
    price: "$15k–$20k",
  },
  {
    id: "sustainability-tracker",
    title: "Sustainability Dashboard",
    domain: "Energy",
    problem: "Manual carbon reporting takes 40+ hours quarterly",
    whatShips: ["Auto carbon tracking", "Scope 1-3 breakdowns", "Compliance reports", "Goal tracking"],
    outcome: "95% time saved on reporting",
    timeToDemo: "Week 1",
    price: "$10k–$15k",
  },
  {
    id: "edtech-portal",
    title: "EdTech Student Portal",
    domain: "Education",
    problem: "Teachers manually tracking 200+ student assignments",
    whatShips: ["Auto-grading system", "Progress dashboards", "Parent notifications", "Assignment analytics"],
    outcome: "95% grading automation",
    timeToDemo: "Week 2",
    price: "$14k–$22k",
    featured: true,
  },
  {
    id: "career-pathways",
    title: "Career Pathway Mapper",
    domain: "Education",
    problem: "Students can't visualize post-graduation career options",
    whatShips: ["Interactive pathway tool", "Skills gap analysis", "Job market data", "Mentorship matching"],
    outcome: "3x student engagement",
    timeToDemo: "Week 3",
    price: "$16k–$24k",
  },
  {
    id: "learning-analytics",
    title: "Learning Analytics Engine",
    domain: "Education",
    problem: "No visibility into which students are falling behind",
    whatShips: ["Early warning system", "Intervention triggers", "Performance trends", "Admin dashboard"],
    outcome: "40% drop in student attrition",
    timeToDemo: "Week 2",
    price: "$18k–$26k",
  },
  {
    id: "policy-tracker",
    title: "Policy Tracking Dashboard",
    domain: "Gov",
    problem: "Staff manually tracking 100+ bills across 3 legislative sessions",
    whatShips: ["Auto bill tracking", "Amendment alerts", "Stakeholder tagging", "Impact summaries"],
    outcome: "80% time saved on tracking",
    timeToDemo: "Week 2",
    price: "$12k–$18k",
  },
  {
    id: "community-engagement",
    title: "Community Engagement Platform",
    domain: "Gov",
    problem: "Residents have no clear way to report issues or track resolutions",
    whatShips: ["Issue reporting portal", "Status tracking", "Response automation", "Analytics dashboard"],
    outcome: "65% faster response times",
    timeToDemo: "Week 3",
    price: "$14k–$20k",
  },
  {
    id: "grant-management",
    title: "Grant Management System",
    domain: "Gov",
    problem: "Tracking 50+ grants in spreadsheets, missed deadlines",
    whatShips: ["Centralized grant hub", "Deadline reminders", "Compliance tracking", "Reporting automation"],
    outcome: "100% on-time submissions",
    timeToDemo: "Week 2",
    price: "$16k–$24k",
  },
  {
    id: "founder-os",
    title: "Founder OS",
    domain: "Startup",
    problem: "CEO spending 12 hrs/week on meeting prep and follow-ups",
    whatShips: ["Auto meeting summaries", "Action item tracking", "Email drafting", "CRM sync"],
    outcome: "85% time saved on admin",
    timeToDemo: "Week 1",
    price: "$10k–$16k",
    featured: true,
  },
  {
    id: "sales-copilot",
    title: "Sales Copilot",
    domain: "Startup",
    problem: "Sales reps spending 60% of time on CRM data entry",
    whatShips: ["Auto lead enrichment", "Follow-up automation", "Deal scoring", "Pipeline insights"],
    outcome: "2.3x conversion rate",
    timeToDemo: "Week 2",
    price: "$14k–$22k",
  },
  {
    id: "customer-insights",
    title: "Customer Insights Engine",
    domain: "Startup",
    problem: "Can't identify churn signals until customers already left",
    whatShips: ["Churn prediction", "Health scoring", "Intervention triggers", "Usage analytics"],
    outcome: "40% reduction in churn",
    timeToDemo: "Week 3",
    price: "$16k–$24k",
  },
];

const Pilots: React.FC = () => {
  const prefersReducedMotion = useReducedMotion();
  const [selectedDomain, setSelectedDomain] = useState<Domain>("All");

  const filteredPilots = useMemo(() => {
    if (selectedDomain === "All") return PILOTS_DATA;
    return PILOTS_DATA.filter((pilot) => pilot.domain === selectedDomain);
  }, [selectedDomain]);

  const domainStats = useMemo(() => {
    return {
      All: PILOTS_DATA.length,
      Energy: PILOTS_DATA.filter((p) => p.domain === "Energy").length,
      Education: PILOTS_DATA.filter((p) => p.domain === "Education").length,
      Gov: PILOTS_DATA.filter((p) => p.domain === "Gov").length,
      Startup: PILOTS_DATA.filter((p) => p.domain === "Startup").length,
    };
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground antialiased">
      <SiteNav />

      <main className="relative">
        {/* Hero Section */}
        <section className="relative overflow-hidden border-b border-border">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/5" />
          <div className="relative mx-auto max-w-5xl px-4 py-12 sm:px-6 sm:py-16 lg:py-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: prefersReducedMotion ? 0 : 0.6 }}
              className="text-center"
            >
              <Badge className="mb-4 bg-accent/20 text-accent-foreground border-accent/30">
                All Pilots
              </Badge>
              <h1 className="heading-1 mb-4">4-Week Pilot Catalog</h1>
              <p className="body-lg mx-auto max-w-2xl text-muted-foreground">
                Production-ready solutions shipped in 4 weeks. Filter by domain to find your perfect pilot.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Filter Tabs */}
        <section className="sticky top-[64px] z-40 border-b border-border bg-background/95 backdrop-blur-sm">
          <div className="mx-auto max-w-5xl px-4 py-4 sm:px-6">
            <div className="flex items-center gap-2 overflow-x-auto">
              <Filter className="h-4 w-4 text-muted-foreground flex-shrink-0" />
              <div className="flex gap-2 flex-wrap">
                <FilterButton
                  active={selectedDomain === "All"}
                  onClick={() => setSelectedDomain("All")}
                  count={domainStats.All}
                >
                  All Pilots
                </FilterButton>
                <FilterButton
                  active={selectedDomain === "Energy"}
                  onClick={() => setSelectedDomain("Energy")}
                  icon={<Zap className="h-3 w-3" />}
                  count={domainStats.Energy}
                >
                  Energy
                </FilterButton>
                <FilterButton
                  active={selectedDomain === "Education"}
                  onClick={() => setSelectedDomain("Education")}
                  icon={<Book className="h-3 w-3" />}
                  count={domainStats.Education}
                >
                  Education
                </FilterButton>
                <FilterButton
                  active={selectedDomain === "Gov"}
                  onClick={() => setSelectedDomain("Gov")}
                  icon={<Users className="h-3 w-3" />}
                  count={domainStats.Gov}
                >
                  Gov
                </FilterButton>
                <FilterButton
                  active={selectedDomain === "Startup"}
                  onClick={() => setSelectedDomain("Startup")}
                  icon={<Cpu className="h-3 w-3" />}
                  count={domainStats.Startup}
                >
                  Startup
                </FilterButton>
              </div>
            </div>
          </div>
        </section>

        {/* Pilots Grid */}
        <section className="py-12 sm:py-16">
          <div className="mx-auto max-w-5xl px-4 sm:px-6">
            <motion.div
              key={selectedDomain}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: prefersReducedMotion ? 0 : 0.3 }}
              className="mb-6"
            >
              <p className="body-base text-muted-foreground">
                Showing {filteredPilots.length} pilot{filteredPilots.length !== 1 ? "s" : ""}
                {selectedDomain !== "All" && ` in ${selectedDomain}`}
              </p>
            </motion.div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredPilots.map((pilot, index) => (
                <PilotCard key={pilot.id} pilot={pilot} index={index} />
              ))}
            </div>

            {filteredPilots.length === 0 && (
              <div className="py-16 text-center">
                <p className="body-lg text-muted-foreground">No pilots found in this domain.</p>
              </div>
            )}
          </div>
        </section>

        {/* CTA Section */}
        <section className="border-t border-border py-12 sm:py-16 bg-card/20">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: prefersReducedMotion ? 0 : 0.6 }}
            >
              <h2 className="heading-2 mb-4">Don't See Your Use Case?</h2>
              <p className="body-lg text-muted-foreground mb-8">
                Book a fit call to discuss a custom pilot for your specific challenge.
              </p>
              <Button size="lg" className="touch-target-lg" asChild>
                <a
                  href="https://us06web.zoom.us/launch/chat?src=direct_chat_link&email=altruisticxai@gmail.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Book Fit Call <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
            </motion.div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Pilots;

// Sub-Components

const FilterButton: React.FC<{
  active: boolean;
  onClick: () => void;
  icon?: React.ReactNode;
  count: number;
  children: React.ReactNode;
}> = ({ active, onClick, icon, count, children }) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-all touch-manipulation min-h-[36px]",
        active
          ? "bg-primary text-primary-foreground shadow-sm"
          : "bg-card text-muted-foreground hover:bg-card/80 hover:text-foreground border border-border"
      )}
    >
      {icon}
      <span>{children}</span>
      <Badge
        variant="secondary"
        className={cn(
          "ml-1 h-5 min-w-[20px] px-1.5 text-[10px]",
          active ? "bg-primary-foreground/20 text-primary-foreground" : "bg-muted text-muted-foreground"
        )}
      >
        {count}
      </Badge>
    </button>
  );
};

const PilotCard: React.FC<{ pilot: Pilot; index: number }> = ({ pilot, index }) => {
  const prefersReducedMotion = useReducedMotion();

  const domainColor = {
    Energy: "primary",
    Education: "accent",
    Gov: "primary",
    Startup: "accent",
  }[pilot.domain] as "primary" | "accent";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: prefersReducedMotion ? 0 : 0.4, delay: index * 0.05 }}
    >
      <Card
        className={cn(
          "h-full border-2 transition-all hover:shadow-lg group",
          domainColor === "primary" ? "hover:border-primary/40" : "hover:border-accent/40",
          pilot.featured && "ring-2 ring-accent/20"
        )}
      >
        <CardHeader>
          <div className="flex items-start justify-between gap-2 mb-2">
            <Badge variant="outline" className="text-xs">
              {pilot.domain}
            </Badge>
            <div className="flex gap-1">
              {pilot.featured && (
                <Badge className="bg-accent/20 text-accent-foreground border-accent/30 text-xs">Featured</Badge>
              )}
            </div>
          </div>
          <CardTitle className="heading-4 group-hover:text-primary transition-colors">{pilot.title}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Problem */}
          <div>
            <p className="body-sm font-semibold text-muted-foreground mb-1">Problem:</p>
            <p className="body-base text-sm">{pilot.problem}</p>
          </div>

          {/* What Ships */}
          <div>
            <p className="body-sm font-semibold text-muted-foreground mb-2">What Ships:</p>
            <ul className="space-y-1">
              {pilot.whatShips.map((item, i) => (
                <li key={i} className="flex items-start gap-2 body-base text-sm">
                  <span className="text-primary mt-0.5">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Outcome */}
          <div className="pt-2 border-t border-border">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="h-4 w-4 text-primary" />
              <p className="body-sm font-semibold text-primary">Measured Outcome:</p>
            </div>
            <p className="body-base font-medium">{pilot.outcome}</p>
          </div>

          {/* Meta Info */}
          <div className="flex items-center justify-between pt-2 border-t border-border">
            <div className="flex items-center gap-1 text-muted-foreground">
              <Clock className="h-3 w-3" />
              <span className="body-sm">{pilot.timeToDemo}</span>
            </div>
            <div className="flex items-center gap-1 text-muted-foreground">
              <Target className="h-3 w-3" />
              <span className="body-sm font-medium">{pilot.price}</span>
            </div>
          </div>

          {/* CTA */}
          <Button variant="outline" size="sm" className="w-full mt-2" asChild>
            <a
              href="https://us06web.zoom.us/launch/chat?src=direct_chat_link&email=altruisticxai@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              Discuss This Pilot <ArrowRight className="ml-2 h-3 w-3" />
            </a>
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
};
