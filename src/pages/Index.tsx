import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle2, Rocket, Users, TrendingUp, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ScrollToTop } from "@/components/ScrollToTop";
import { ScrollProgress } from "@/components/ScrollProgress";
import { SiteNav } from "@/components/SiteNav";
import { SectionNav } from "@/components/SectionNav";

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <ScrollProgress />
      <SiteNav />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section id="hero" className="relative overflow-hidden py-16 sm:py-24 lg:py-32">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
              {/* Left Column - Text Content */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-3 py-1.5 text-xs font-medium text-primary mb-6">
                  AltruisticX AI · Live AI Pilot Lab
                </div>
                
                <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl mb-6">
                  AI pilots for campuses, cities, and scrappy teams
                </h1>
                
                <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                  Test real AI tools in 4-week pilots. I design, build, and ship working software — not slide decks — so you can see what actually helps your people before you commit.
                </p>
                
                <ul className="space-y-4 mb-8">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">Real builds, not demos – dashboards, workflows, and tiny tools your team can click on.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">4-week sprints – enough to learn, short enough to walk away.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">No long contracts – pause anytime, keep the code and the lessons.</span>
                  </li>
                </ul>
                
                <div className="flex flex-col sm:flex-row gap-4 mb-4">
                  <Button size="lg" className="text-base" asChild>
                    <a href="mailto:hello@altruisticxai.com?subject=Book%20a%20Pilot%20Call">
                      Book a Pilot Call
                    </a>
                  </Button>
                  <Button size="lg" variant="outline" className="text-base" asChild>
                    <Link to="/portfolio">View active pilots</Link>
                  </Button>
                </div>
                <p className="text-sm text-muted-foreground">
                  Week-to-week · pause anytime · async-friendly
                </p>
              </motion.div>
              
              {/* Right Column - Visual */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="hidden lg:block"
              >
                <Card className="p-6 bg-card border-border shadow-lg">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between pb-4 border-b border-border">
                      <h3 className="font-semibold">Lab Notebook</h3>
                      <span className="text-xs text-muted-foreground">Week 4/4</span>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3 p-3 rounded-lg bg-primary/10 border border-primary/20">
                        <div className="h-2 w-2 rounded-full bg-primary"></div>
                        <span className="text-sm">Dashboard shipped</span>
                      </div>
                      <div className="flex items-center gap-3 p-3 rounded-lg bg-primary/10 border border-primary/20">
                        <div className="h-2 w-2 rounded-full bg-primary"></div>
                        <span className="text-sm">Team feedback collected</span>
                      </div>
                      <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50 border border-border">
                        <div className="h-2 w-2 rounded-full bg-muted-foreground"></div>
                        <span className="text-sm">Final walkthrough scheduled</span>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Who This Is For */}
        <section id="who" className="py-16 sm:py-20 bg-muted/30">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
                Who uses Pilots4You?
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Teams that need real evidence, not another strategy deck.
              </p>
            </motion.div>
            
            <div className="grid gap-6 md:grid-cols-3">
              {[
                {
                  title: "Campuses & schools",
                  body: "Turn messy student, energy, or operations data into simple tools that staff will actually use.",
                  icon: Users
                },
                {
                  title: "Cities & civic teams",
                  body: "Try AI around forms, wait times, and public info without handing everything to a big vendor.",
                  icon: TrendingUp
                },
                {
                  title: "Founders & small orgs",
                  body: "You have a fuzzy idea and a deadline. We turn it into a usable pilot you can show to partners and funders.",
                  icon: Rocket
                }
              ].map((card, index) => (
                <motion.div
                  key={card.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card className="p-6 h-full hover:shadow-lg transition-shadow">
                    <card.icon className="h-8 w-8 text-primary mb-4" />
                    <h3 className="text-xl font-semibold mb-3">{card.title}</h3>
                    <p className="text-muted-foreground">{card.body}</p>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* What You Get in 4 Weeks */}
        <section id="what" className="py-16 sm:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
              {/* Left - Intro */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
                  What you get from a 4-week pilot
                </h2>
                <p className="text-lg text-muted-foreground mb-8">
                  Each pilot is a tiny, focused project with a clear question, a working prototype, and a simple story you can share.
                </p>
              </motion.div>
              
              {/* Right - Timeline Cards */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="space-y-6"
              >
                {[
                  {
                    number: "1",
                    title: "A focused question",
                    body: '"Can we cut this process from 2 weeks to 2 days?" "Can staff understand this dashboard in under 60 seconds?" We write this down first.'
                  },
                  {
                    number: "2",
                    title: "A working prototype",
                    body: "A small, opinionated tool: dashboard, form flow, matching engine, or internal 'copilot' — shipped where your team can try it."
                  },
                  {
                    number: "3",
                    title: "A plain-language summary",
                    body: "What worked, what didn't, and what to do next — in slides or a one-pager you can send to leadership or funders."
                  },
                  {
                    number: "4",
                    title: "A clear next step",
                    body: 'Kill it, tweak it, or scale it. No pressure to "go big" if it doesn\'t earn it.'
                  }
                ].map((item, index) => (
                  <Card key={item.number} className="p-6 border-l-4 border-l-primary">
                    <div className="flex gap-4">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                        {item.number}
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                        <p className="text-muted-foreground">{item.body}</p>
                      </div>
                    </div>
                  </Card>
                ))}
              </motion.div>
            </div>
          </div>
        </section>

        {/* Sample Pilots */}
        <section id="pilots" className="py-16 sm:py-20 bg-muted/30">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mb-12"
            >
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
                Sample pilots I'm running for teams like yours
              </h2>
            </motion.div>
            
            <div className="grid gap-6 md:grid-cols-2">
              {[
                {
                  label: "Higher Ed · Energy",
                  title: "Campus Energy Storyboard",
                  goal: "Turn raw campus energy data into a simple story that facilities can show to grant committees.",
                  outcome: 'A live dashboard plus a "energy story" one-pager updated weekly.'
                },
                {
                  label: "Education · Community",
                  title: "Capstone Partner Matchmaker",
                  goal: "Cut the time to match students with community partners from 2 weeks to a couple of days.",
                  outcome: "A simple web UI where staff can see matches, constraints, and contact info in one place."
                },
                {
                  label: "City / Civic",
                  title: "Civic Form Triage Assistant",
                  goal: 'Help staff quickly sort incoming forms and emails into "urgent now / later / wrong place."',
                  outcome: "An internal assistant that tags and routes requests instead of one shared inbox chaos."
                },
                {
                  label: "Energy & Education",
                  title: "Grant Evidence Pack Helper",
                  goal: "Pull the right metrics, screenshots, and quotes for grant applications without digging through old emails.",
                  outcome: 'A small tool that assembles a "grant evidence pack" from your dashboards and notes.'
                }
              ].map((pilot, index) => (
                <motion.div
                  key={pilot.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card className="p-6 h-full hover:shadow-lg transition-all hover:-translate-y-1">
                    <div className="inline-block rounded-full bg-primary/10 text-primary text-xs font-medium px-3 py-1 mb-4">
                      {pilot.label}
                    </div>
                    <h3 className="text-xl font-semibold mb-3">{pilot.title}</h3>
                    <div className="space-y-3">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground mb-1">Goal:</p>
                        <p className="text-sm">{pilot.goal}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-muted-foreground mb-1">Outcome:</p>
                        <p className="text-sm">{pilot.outcome}</p>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* How a Pilot Works */}
        <section id="how" className="py-16 sm:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
                How a pilot actually works
              </h2>
            </motion.div>
            
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-12">
              {[
                {
                  step: "Step 1",
                  title: "Quick intake (Day 1–3)",
                  body: "30–45 minute call or async Loom. We pick one workflow, one dataset, and one clear question."
                },
                {
                  step: "Step 2",
                  title: "Sketch & agree (Day 3–5)",
                  body: 'You get a tiny plan: what we\'re building, what "good" looks like, who will touch it.'
                },
                {
                  step: "Step 3",
                  title: "Build & tweak (Weeks 2–3)",
                  body: "I ship early versions, you poke holes, we adjust. Light check-ins, mostly async."
                },
                {
                  step: "Step 4",
                  title: "Share the story (Week 4)",
                  body: 'You get the prototype, a short walkthrough, and a "what we learned" summary you can show around.'
                }
              ].map((item, index) => (
                <motion.div
                  key={item.step}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card className="p-6 h-full relative">
                    <div className="text-sm font-bold text-primary mb-2">{item.step}</div>
                    <h3 className="text-lg font-semibold mb-3">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.body}</p>
                    {index < 3 && (
                      <div className="hidden lg:block absolute -right-3 top-1/2 transform -translate-y-1/2">
                        <ArrowRight className="h-6 w-6 text-primary/30" />
                      </div>
                    )}
                  </Card>
                </motion.div>
              ))}
            </div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <Button size="lg" className="text-base gap-2" asChild>
                <a 
                  href="https://www.linkedin.com/in/inga-kaltak-11i41141/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  <Linkedin className="h-5 w-5" />
                  Connect on LinkedIn
                </a>
              </Button>
            </motion.div>
          </div>
        </section>

        {/* Why This Model */}
        <section id="why" className="py-16 sm:py-20 bg-muted/30">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
                Why this &quot;pilot lab&quot; instead of a big contract?
              </h2>
            </motion.div>
            
            <div className="grid gap-6 md:grid-cols-3">
              {[
                {
                  title: "Less risk",
                  body: 'Short sprints, clear end, no awkward "we\'re stuck with this vendor" feeling.'
                },
                {
                  title: "More honesty",
                  body: "We keep the ugly parts in the story — what didn't work is just as valuable for your next grant or proposal."
                },
                {
                  title: "Real momentum",
                  body: "Instead of a 40-page strategy doc, you walk away with something that runs and real numbers to point at."
                }
              ].map((card, index) => (
                <motion.div
                  key={card.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card className="p-6 h-full text-center">
                    <h3 className="text-xl font-semibold mb-3">{card.title}</h3>
                    <p className="text-muted-foreground">{card.body}</p>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-12 border-t border-border">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center space-y-2">
              <p className="font-semibold">AltruisticX AI · Pilots4You Lab</p>
              <p className="text-sm text-muted-foreground">
                AI pilots for energy, education, and civic teams who want proof before promises.
              </p>
            </div>
          </div>
        </footer>
      </main>
      
      <ScrollToTop />
      <SectionNav />
    </div>
  );
};

export default Index;