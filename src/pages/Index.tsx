import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Zap, Users, Target, Cpu, TrendingUp, Clock, CheckCircle, Book, MessageSquare } from "lucide-react";
import { Link } from "react-router-dom";
import { InteractiveButton } from "@/components/ui/interactive-button";
import { InteractiveCard } from "@/components/ui/interactive-card";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SiteNav } from "@/components/SiteNav";
import { cn } from "@/lib/utils";

const Index: React.FC = () => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="min-h-screen bg-background text-foreground antialiased">
      <SiteNav />

      <main className="relative">
        {/* Hero Section - Crisp & Focused */}
        <section className="relative overflow-hidden border-b border-border">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/5" />
          <div className="relative mx-auto max-w-5xl px-4 py-16 sm:px-6 sm:py-24 lg:py-32">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: prefersReducedMotion ? 0 : 0.6 }}
              className="text-center"
            >
              <Badge className="mb-4 bg-accent/20 text-accent-foreground border-accent/30">
                4-Week AI Pilots
              </Badge>
              <h1 className="heading-1 mb-4 sm:mb-6">
                AI Pilots Delivered in 4 Weeks
              </h1>
              <p className="body-lg mx-auto max-w-2xl text-muted-foreground mb-8">
                Founder-backed engineering for teams that want aligned, local-first, high-ROI AI.
                <br />
                No black box automation. Just transparent, explainable solutions.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <InteractiveButton 
                  size="lg" 
                  variant="primary"
                  haptic="medium"
                  onClick={() => window.location.href = '/pilots'}
                  className="w-full sm:w-auto"
                >
                  See 4-Week Pilots <ArrowRight className="ml-2 h-4 w-4" />
                </InteractiveButton>
                <InteractiveButton 
                  size="lg" 
                  variant="outline"
                  haptic="light"
                  onClick={() => window.open('https://us06web.zoom.us/launch/chat?src=direct_chat_link&email=altruisticxai@gmail.com', '_blank')}
                  className="w-full sm:w-auto"
                >
                  Book Fit Call
                </InteractiveButton>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ROI Bar - Social Proof */}
        <section className="border-b border-border bg-card/30">
          <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 sm:py-12">
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:gap-6">
              <StatCard
                icon={<TrendingUp className="h-5 w-5 text-primary" />}
                value="480k ARR"
                label="Pilot pipeline"
                delay={0.1}
              />
              <StatCard
                icon={<Zap className="h-5 w-5 text-accent" />}
                value="2.3x"
                label="Conversion boost"
                delay={0.2}
              />
              <StatCard
                icon={<Clock className="h-5 w-5 text-primary" />}
                value="65%"
                label="Manual work reduced"
                delay={0.3}
              />
              <StatCard
                icon={<Target className="h-5 w-5 text-accent" />}
                value="80%"
                label="Lead triage automated"
                delay={0.4}
              />
            </div>
          </div>
        </section>

        {/* What We Build - Four Card Section */}
        <section id="what-we-build" className="border-b border-border py-12 sm:py-16 lg:py-20">
          <div className="mx-auto max-w-5xl px-4 sm:px-6">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-center mb-10 sm:mb-12"
            >
              <h2 className="heading-2 mb-3">What We Build</h2>
              <p className="body-lg text-muted-foreground max-w-2xl mx-auto">
                Four core domains where 4-week pilots create immediate, measurable impact
              </p>
            </motion.div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:gap-6">
              <DomainCard
                icon={<Zap className="h-6 w-6" />}
                title="Energy Intelligence"
                description="Campus energy analytics, demand forecasting, and sustainability dashboards"
                color="primary"
                delay={0.1}
              />
              <DomainCard
                icon={<Book className="h-6 w-6" />}
                title="Education & Workforce"
                description="Student success tools, learning analytics, and career pathway automation"
                color="accent"
                delay={0.2}
              />
              <DomainCard
                icon={<Users className="h-6 w-6" />}
                title="Gov & Civic Innovation"
                description="Public sector dashboards, policy tracking, and community engagement platforms"
                color="primary"
                delay={0.3}
              />
              <DomainCard
                icon={<Cpu className="h-6 w-6" />}
                title="Founder & Startup Tools"
                description="Sales copilots, CRM automation, and founder productivity systems"
                color="accent"
                delay={0.4}
              />
            </div>
          </div>
        </section>

        {/* Featured Pilots - Top 3 Case Studies */}
        <section id="featured-pilots" className="border-b border-border py-12 sm:py-16 lg:py-20 bg-card/20">
          <div className="mx-auto max-w-5xl px-4 sm:px-6">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-center mb-10 sm:mb-12"
            >
              <h2 className="heading-2 mb-3">Featured Pilots</h2>
              <p className="body-lg text-muted-foreground max-w-2xl mx-auto">
                Real projects shipped in 4 weeks with measurable outcomes
              </p>
            </motion.div>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
              <PilotShowcaseCard
                title="Energy Analytics Dashboard"
                problem="Campus couldn't track real-time energy usage across 40+ buildings"
                outcome="$127k annual savings identified"
                timeToDemo="Week 1"
                tag="Energy"
                link="/case-study/energy-analytics"
                delay={0.1}
              />
              <PilotShowcaseCard
                title="Founder OS"
                problem="CEO spending 12 hrs/week on meeting prep and follow-ups"
                outcome="85% time saved on admin tasks"
                timeToDemo="Week 1"
                tag="Startup"
                link="/case-study/founder-os"
                delay={0.2}
              />
              <PilotShowcaseCard
                title="EdTech Portal"
                problem="Teachers manually tracking 200+ student assignments"
                outcome="95% grading automation"
                timeToDemo="Week 2"
                tag="Education"
                link="/case-study/edtech-portal"
                delay={0.3}
              />
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="mt-8 text-center"
            >
              <InteractiveButton 
                variant="outline" 
                size="lg"
                haptic="light"
                onClick={() => window.location.href = '/portfolio'}
              >
                View All Case Studies <ArrowRight className="ml-2 h-4 w-4" />
              </InteractiveButton>
            </motion.div>
          </div>
        </section>

        {/* Philosophy Trio */}
        <section id="philosophy" className="border-b border-border py-12 sm:py-16 lg:py-20">
          <div className="mx-auto max-w-5xl px-4 sm:px-6">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-center mb-10 sm:mb-12"
            >
              <h2 className="heading-2 mb-3">Our Philosophy</h2>
              <p className="body-lg text-muted-foreground max-w-2xl mx-auto">
                Three principles that guide every pilot we ship
              </p>
            </motion.div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              <PhilosophyCard
                title="Local-First"
                description="Your data stays on your infrastructure. No cloud lock-in, no vendor control."
                delay={0.1}
              />
              <PhilosophyCard
                title="Transparent"
                description="Explainable AI with clear reasoning. No black boxes, no hidden logic."
                delay={0.2}
              />
              <PhilosophyCard
                title="Regenerative"
                description="Build systems that strengthen communities and protect privacy rights."
                delay={0.3}
              />
            </div>
          </div>
        </section>

        {/* Final CTA Block */}
        <section className="py-16 sm:py-20 lg:py-24">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: prefersReducedMotion ? 0 : 0.6 }}
            >
              <h2 className="heading-2 mb-4">Ready to Ship Your First Pilot?</h2>
              <p className="body-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                See the full pilot catalog or book a 30-minute fit call to discuss your specific challenge.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <InteractiveButton 
                  size="lg"
                  variant="primary"
                  haptic="medium"
                  onClick={() => window.location.href = '/pilots'}
                  className="w-full sm:w-auto"
                >
                  See Pilot Catalog <ArrowRight className="ml-2 h-4 w-4" />
                </InteractiveButton>
                <InteractiveButton 
                  size="lg"
                  variant="outline"
                  haptic="light"
                  onClick={() => window.open('https://us06web.zoom.us/launch/chat?src=direct_chat_link&email=altruisticxai@gmail.com', '_blank')}
                  className="w-full sm:w-auto"
                >
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Book 30 Min Fit Call
                </InteractiveButton>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-border bg-card/30 py-8 sm:py-12">
          <div className="mx-auto max-w-5xl px-4 sm:px-6">
            <div className="flex flex-col items-center gap-6 sm:flex-row sm:justify-between">
              <nav className="flex flex-wrap justify-center gap-4 text-sm text-muted-foreground sm:gap-6">
                <Link to="/" className="hover:text-foreground transition-colors">Home</Link>
                <Link to="/portfolio" className="hover:text-foreground transition-colors">Portfolio & Case Studies</Link>
                <a href="https://us06web.zoom.us/launch/chat?src=direct_chat_link&email=altruisticxai@gmail.com" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">Contact</a>
                <a href="https://www.linkedin.com/in/ik11/" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">LinkedIn</a>
              </nav>
              <p className="text-xs text-muted-foreground">
                © 2025 AltruisticX AI. All rights reserved.
              </p>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default Index;

// Sub-Components

const StatCard: React.FC<{
  icon: React.ReactNode;
  value: string;
  label: string;
  delay: number;
}> = ({ icon, value, label, delay }) => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: prefersReducedMotion ? 0 : 0.4, delay }}
      className="text-center"
    >
      <div className="mb-2 flex justify-center">{icon}</div>
      <div className="heading-3 mb-1">{value}</div>
      <div className="caption">{label}</div>
    </motion.div>
  );
};

const DomainCard: React.FC<{
  icon: React.ReactNode;
  title: string;
  description: string;
  color: "primary" | "accent";
  delay: number;
}> = ({ icon, title, description, color, delay }) => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: prefersReducedMotion ? 0 : 0.4, delay }}
    >
      <Card className={cn(
        "h-full border-2 transition-all hover:shadow-lg",
        color === "primary" ? "border-primary/20 hover:border-primary/40" : "border-accent/20 hover:border-accent/40"
      )}>
        <CardHeader>
          <div className={cn(
            "mb-3 inline-flex rounded-lg p-3",
            color === "primary" ? "bg-primary/10 text-primary" : "bg-accent/10 text-accent"
          )}>
            {icon}
          </div>
          <CardTitle className="heading-4">{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription className="body-base">{description}</CardDescription>
        </CardContent>
      </Card>
    </motion.div>
  );
};

const PilotShowcaseCard: React.FC<{
  title: string;
  problem: string;
  outcome: string;
  timeToDemo: string;
  tag: string;
  link: string;
  delay: number;
}> = ({ title, problem, outcome, timeToDemo, tag, link, delay }) => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: prefersReducedMotion ? 0 : 0.4, delay }}
      className="h-full"
    >
      <Card className="h-full border-border hover:border-primary/40 transition-all hover:shadow-lg">
        <CardHeader>
          <div className="flex items-start justify-between gap-2 mb-2">
            <Badge variant="outline" className="text-xs">
              {tag}
            </Badge>
            <Badge className="bg-accent/20 text-accent-foreground border-accent/30 text-xs">
              {timeToDemo}
            </Badge>
          </div>
          <CardTitle className="heading-4">{title}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <p className="body-sm font-semibold text-muted-foreground mb-1">Problem:</p>
            <p className="body-base">{problem}</p>
          </div>
          <div>
            <p className="body-sm font-semibold text-primary mb-1">Outcome:</p>
            <p className="body-base font-medium">{outcome}</p>
          </div>
          <InteractiveButton 
            variant="ghost" 
            size="sm"
            haptic="light"
            onClick={() => window.location.href = link}
            className="w-full"
          >
            Open case study <ArrowRight className="ml-2 h-3 w-3" />
          </InteractiveButton>
        </CardContent>
      </Card>
    </motion.div>
  );
};

const PhilosophyCard: React.FC<{
  title: string;
  description: string;
  delay: number;
}> = ({ title, description, delay }) => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: prefersReducedMotion ? 0 : 0.4, delay }}
    >
      <Card className="h-full border-border bg-card/50">
        <CardHeader>
          <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
            <CheckCircle className="h-6 w-6 text-primary" />
          </div>
          <CardTitle className="heading-4">{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription className="body-base">{description}</CardDescription>
        </CardContent>
      </Card>
    </motion.div>
  );
};
