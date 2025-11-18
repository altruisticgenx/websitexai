import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  CheckCircle2,
  Rocket,
  Users,
  TrendingUp,
  Linkedin,
  Github,
  Mail,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ScrollToTop } from "@/components/ScrollToTop";
import { ScrollProgress } from "@/components/ScrollProgress";
import { SiteNav } from "@/components/SiteNav";
import { SectionNav } from "@/components/SectionNav";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-950 to-background text-foreground">
      <ScrollProgress />
      <SiteNav />

      {/* Background accents */}
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -left-32 top-0 h-72 w-72 rounded-full bg-emerald-500/10 blur-3xl" />
        <div className="absolute right-0 top-40 h-80 w-80 rounded-full bg-violet-500/10 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 h-64 w-64 rounded-full bg-cyan-500/10 blur-3xl" />
      </div>

      <main className="flex-1">
        {/* Hero Section */}
        <section
          id="hero"
          className="relative overflow-hidden py-16 sm:py-24 lg:py-32"
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
              {/* Left Column - Text Content */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1.5 text-xs font-medium text-emerald-300">
                  <span className="inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                  AltruisticX AI · Live AI Pilot Lab
                </div>

                <h1 className="mb-6 text-4xl font-semibold tracking-tight text-slate-50 sm:text-5xl lg:text-6xl">
                  AI pilots for campuses, cities, and scrappy teams
                </h1>

                <p className="mb-8 max-w-xl text-lg leading-relaxed text-slate-300">
                  Test real AI tools in 4-week pilots. I design, build, and ship
                  working software — not slide decks — so you can see what
                  actually helps your people before you commit.
                </p>

                <ul className="mb-8 space-y-4">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="mt-0.5 h-6 w-6 flex-shrink-0 text-emerald-400" />
                    <span className="text-sm text-slate-300">
                      Real builds, not demos – dashboards, workflows, and small
                      tools your team can actually click on.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="mt-0.5 h-6 w-6 flex-shrink-0 text-emerald-400" />
                    <span className="text-sm text-slate-300">
                      4-week sprints – enough to learn, short enough to walk
                      away with no drama.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="mt-0.5 h-6 w-6 flex-shrink-0 text-emerald-400" />
                    <span className="text-sm text-slate-300">
                      No long contracts – pause anytime, keep the code and the
                      lessons.
                    </span>
                  </li>
                </ul>

                <div className="mb-4 flex flex-col gap-4 sm:flex-row">
                  <Button
                    size="lg"
                    className="text-base shadow-xl shadow-emerald-500/30 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-emerald-500/50"
                    asChild
                  >
                    <a href="mailto:hello@altruisticxai.com?subject=Book%20a%20Pilot%20Call">
                      Book a Pilot Call
                    </a>
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="text-base border-slate-700/80 bg-slate-900/60 backdrop-blur transition-all duration-300 hover:scale-105 hover:border-emerald-500/50 hover:bg-slate-800/80"
                    asChild
                  >
                    <Link to="/portfolio">View active pilots</Link>
                  </Button>
                </div>
                <p className="text-sm text-slate-400">
                  Week-to-week · pause anytime · async-friendly
                </p>
              </motion.div>

              {/* Right Column - Visual */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.15 }}
                className="hidden lg:block"
              >
                <Card className="group relative overflow-hidden border border-slate-700/70 bg-slate-900/70 p-6 shadow-[0_18px_45px_rgba(0,0,0,0.65)] backdrop-blur transition-all duration-500 hover:border-emerald-500/30 hover:shadow-[0_20px_50px_rgba(16,185,129,0.15)]">
                  <div className="absolute inset-x-0 top-0 h-10 bg-gradient-to-r from-emerald-500/20 via-violet-500/20 to-cyan-500/20 opacity-70 blur-xl" />
                  <div className="relative space-y-4">
                    <div className="flex items-center justify-between border-b border-slate-700 pb-4">
                      <div>
                        <p className="text-xs font-medium uppercase tracking-[0.18em] text-slate-400">
                          Live Experiment Board
                        </p>
                        <p className="text-xs text-slate-500">
                          Not a portfolio. A lab notebook.
                        </p>
                      </div>
                      <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2.5 py-1 text-[11px] font-medium text-emerald-300">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                        2 active pilots
                      </span>
                    </div>

                    <div className="space-y-3 text-xs">
                      <LabCard
                        title="Campus Energy Storyboard"
                        tag="Higher Ed · Energy"
                        status="Week 2 of 4"
                        updated="Updated 2 days ago"
                      />
                      <LabCard
                        title="Capstone Partner Matchmaker"
                        tag="Education · Community"
                        status="Week 1 of 6"
                        updated="Updated 3 days ago"
                      />
                    </div>

                    <div className="mt-4 rounded-xl border border-dashed border-slate-700/80 bg-slate-950/60 px-4 py-3 text-xs text-slate-300">
                      <p className="font-medium text-slate-100">
                        Next pilot slot
                      </p>
                      <p className="text-[11px] text-slate-400">
                        4-week window for one focused build: one workflow, one
                        dataset, one clear question.
                      </p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Who This Is For */}
        <section id="who" className="bg-slate-950/60 py-16 sm:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mb-12 text-center"
            >
              <h2 className="mb-4 text-3xl font-semibold tracking-tight text-slate-50 sm:text-4xl">
                Who uses Pilots4You?
              </h2>
              <p className="mx-auto max-w-2xl text-lg text-slate-300">
                Teams that need real evidence, not another strategy deck.
              </p>
            </motion.div>

            <div className="grid gap-6 md:grid-cols-3">
              {[
                {
                  title: "Campuses & schools",
                  body: "Turn messy student, energy, or operations data into simple tools that staff will actually use.",
                  icon: Users,
                },
                {
                  title: "Cities & civic teams",
                  body: "Try AI around forms, wait times, and public info without handing everything to a big vendor.",
                  icon: TrendingUp,
                },
                {
                  title: "Founders & small orgs",
                  body: "You have a fuzzy idea and a deadline. We turn it into a usable pilot you can show to partners and funders.",
                  icon: Rocket,
                },
              ].map((card, index) => (
                <motion.div
                  key={card.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card className="group h-full border border-slate-800 bg-slate-900/70 p-6 shadow-lg shadow-black/40 backdrop-blur transition-all duration-300 hover:scale-[1.02] hover:border-emerald-500/50 hover:shadow-2xl hover:shadow-emerald-500/20 cursor-pointer">
                    <card.icon className="mb-4 h-8 w-8 text-emerald-400 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3" />
                    <h3 className="mb-3 text-xl font-semibold text-slate-50 transition-colors group-hover:text-emerald-300">
                      {card.title}
                    </h3>
                    <p className="text-sm text-slate-300">{card.body}</p>
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
                <h2 className="mb-4 text-3xl font-semibold tracking-tight text-slate-50 sm:text-4xl">
                  What you get from a 4-week pilot
                </h2>
                <p className="mb-6 text-lg text-slate-300">
                  Each pilot is a tiny, focused project with a clear question, a
                  working prototype, and a simple story you can share.
                </p>
                <p className="text-sm text-slate-400">
                  We write down the question, build something small and
                  opinionated, and leave you with a clear "keep, tweak, or
                  kill" decision instead of another unread strategy PDF.
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
                    body: "Can we cut this process from 2 weeks to 2 days? Can staff understand this dashboard in under 60 seconds? We write this down first.",
                  },
                  {
                    number: "2",
                    title: "A working prototype",
                    body: "A small, opinionated tool: dashboard, form flow, matching engine, or internal copilot — shipped where your team can actually try it.",
                  },
                  {
                    number: "3",
                    title: "A plain-language summary",
                    body: "What worked, what did not, and what to do next — in slides or a one-pager you can send to leadership or funders.",
                  },
                  {
                    number: "4",
                    title: "A clear next step",
                    body: "Kill it, tweak it, or scale it. No pressure to go big if it does not earn it.",
                  },
                ].map((item) => (
                  <Card
                    key={item.number}
                    className="group border-l-4 border-l-emerald-400/80 bg-slate-950/70 p-6 shadow-lg shadow-black/40 backdrop-blur transition-all duration-300 hover:scale-[1.02] hover:border-l-emerald-400 hover:shadow-xl hover:shadow-emerald-500/20 cursor-pointer"
                  >
                    <div className="flex gap-4">
                      <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-emerald-500 text-xs font-bold text-slate-950 transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-emerald-500/50">
                        {item.number}
                      </div>
                      <div>
                        <h3 className="mb-1 text-sm font-semibold text-slate-50 transition-colors group-hover:text-emerald-300">
                          {item.title}
                        </h3>
                        <p className="text-xs text-slate-300">{item.body}</p>
                      </div>
                    </div>
                  </Card>
                ))}
              </motion.div>
            </div>
          </div>
        </section>

        {/* Sample Pilots */}
        <section id="pilots" className="bg-slate-950/70 py-16 sm:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mb-12"
            >
              <h2 className="mb-4 text-3xl font-semibold tracking-tight text-slate-50 sm:text-4xl">
                Sample pilots I&apos;m running for teams like yours
              </h2>
            </motion.div>

            <div className="grid gap-6 md:grid-cols-2">
              {[
                {
                  label: "Higher Ed · Energy",
                  title: "Campus Energy Storyboard",
                  goal: "Turn raw campus energy data into a simple story that facilities can show to grant committees.",
                  outcome:
                    "A live dashboard plus an energy story one-pager that updates weekly.",
                },
                {
                  label: "Education · Community",
                  title: "Capstone Partner Matchmaker",
                  goal: "Cut the time to match students with community partners from 2 weeks to a couple of days.",
                  outcome:
                    "A simple web UI where staff can see matches, constraints, and contact info in one place.",
                },
                {
                  label: "City / Civic",
                  title: "Civic Form Triage Assistant",
                  goal: "Help staff quickly sort incoming forms and emails into urgent now, later, or wrong place.",
                  outcome:
                    "An internal assistant that tags and routes requests instead of one overloaded shared inbox.",
                },
                {
                  label: "Energy & Education",
                  title: "Grant Evidence Pack Helper",
                  goal: "Pull the right metrics, screenshots, and quotes for grant applications without spelunking old emails.",
                  outcome:
                    "A small tool that assembles a grant evidence pack from your dashboards and notes.",
                },
              ].map((pilot, index) => (
                <motion.div
                  key={pilot.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card className="group h-full border border-slate-800 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-6 shadow-lg shadow-black/50 backdrop-blur transition-all duration-300 hover:scale-[1.02] hover:border-emerald-500/50 hover:shadow-2xl hover:shadow-emerald-500/30 cursor-pointer">
                    <div className="mb-4 inline-flex rounded-full bg-emerald-500/10 px-3 py-1 text-[11px] font-medium text-emerald-300 transition-all duration-300 group-hover:bg-emerald-500/20 group-hover:scale-105">
                      {pilot.label}
                    </div>
                    <h3 className="mb-3 text-xl font-semibold text-slate-50 transition-colors group-hover:text-emerald-300">
                      {pilot.title}
                    </h3>
                    <div className="space-y-3 text-sm">
                      <div>
                        <p className="mb-1 text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                          Goal
                        </p>
                        <p className="text-slate-300">{pilot.goal}</p>
                      </div>
                      <div>
                        <p className="mb-1 text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                          Outcome
                        </p>
                        <p className="text-slate-300">{pilot.outcome}</p>
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
              className="mb-12 text-center"
            >
              <h2 className="mb-4 text-3xl font-semibold tracking-tight text-slate-50 sm:text-4xl">
                How a pilot actually works
              </h2>
            </motion.div>

            <div className="mb-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {[
                {
                  step: "Step 1",
                  title: "Quick intake (Day 1–3)",
                  body: "30–45 minute call or async Loom. We pick one workflow, one dataset, and one clear question.",
                },
                {
                  step: "Step 2",
                  title: "Sketch & agree (Day 3–5)",
                  body: "You get a tiny plan: what we are building, what good looks like, and who will touch it.",
                },
                {
                  step: "Step 3",
                  title: "Build & tweak (Weeks 2–3)",
                  body: "I ship early versions, you poke holes, we adjust. Light check-ins, mostly async.",
                },
                {
                  step: "Step 4",
                  title: "Share the story (Week 4)",
                  body: "You get the prototype, a short walkthrough, and a what we learned summary you can show around.",
                },
              ].map((item, index) => (
                <motion.div
                  key={item.step}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card className="group relative h-full border border-slate-800 bg-slate-950/70 p-6 shadow-lg shadow-black/40 backdrop-blur transition-all duration-300 hover:scale-[1.02] hover:border-emerald-500/50 hover:shadow-xl hover:shadow-emerald-500/20 cursor-pointer">
                    <div className="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-emerald-400 transition-all duration-300 group-hover:text-emerald-300 group-hover:scale-105">
                      {item.step}
                    </div>
                    <h3 className="mb-3 text-lg font-semibold text-slate-50 transition-colors group-hover:text-emerald-300">
                      {item.title}
                    </h3>
                    <p className="text-sm text-slate-300">{item.body}</p>
                    {index < 3 && (
                      <div className="pointer-events-none absolute -right-3 top-1/2 hidden -translate-y-1/2 transition-all duration-300 group-hover:translate-x-1 lg:block">
                        <ArrowRight className="h-6 w-6 text-emerald-500/40 transition-colors group-hover:text-emerald-400" />
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
              <Button size="lg" className="group gap-2 text-base transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-emerald-500/30" asChild>
                <a
                  href="https://www.linkedin.com/in/ik11?utm_source=share_via&utm_content=profile&utm_medium=member_android"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Linkedin className="h-5 w-5 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6" />
                  Connect on LinkedIn
                </a>
              </Button>
            </motion.div>
          </div>
        </section>

        {/* Why This Model */}
        <section id="why" className="bg-slate-950/80 py-16 sm:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mb-12 text-center"
            >
              <h2 className="mb-4 text-3xl font-semibold tracking-tight text-slate-50 sm:text-4xl">
                Why this &quot;pilot lab&quot; instead of a big contract?
              </h2>
            </motion.div>

            <div className="grid gap-6 md:grid-cols-3">
              {[
                {
                  title: "Less risk",
                  body: "Short sprints, clear end, no awkward we are stuck with this vendor feeling.",
                },
                {
                  title: "More honesty",
                  body: "We keep the ugly parts in the story — what did not work is just as valuable for your next grant or proposal.",
                },
                {
                  title: "Real momentum",
                  body: "Instead of a 40-page strategy doc, you walk away with something that runs and real numbers to point at.",
                },
              ].map((card, index) => (
                <motion.div
                  key={card.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card className="group h-full border border-slate-800 bg-slate-950/70 p-6 text-center shadow-lg shadow-black/40 backdrop-blur transition-all duration-300 hover:scale-[1.02] hover:border-emerald-500/50 hover:shadow-xl hover:shadow-emerald-500/20 cursor-pointer">
                    <h3 className="mb-3 text-xl font-semibold text-slate-50 transition-colors group-hover:text-emerald-300">
                      {card.title}
                    </h3>
                    <p className="text-sm text-slate-300">{card.body}</p>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-slate-800 bg-slate-950 py-10">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="space-y-6 text-center">
              <div className="space-y-2">
                <p className="text-sm font-semibold text-slate-100">
                  AltruisticX AI · Pilots4You Lab
                </p>
                <p className="text-xs text-slate-400">
                  AI pilots for energy, education, and civic teams who want proof
                  before promises.
                </p>
              </div>

              {/* Social Links */}
              <div className="flex items-center justify-center gap-4">
                <a
                  href="https://www.linkedin.com/in/ik11?utm_source=share_via&utm_content=profile&utm_medium=member_android"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex h-10 w-10 items-center justify-center rounded-full border border-slate-700 bg-slate-900/70 backdrop-blur transition-all duration-300 hover:scale-110 hover:border-emerald-500/50 hover:bg-slate-800 hover:shadow-lg hover:shadow-emerald-500/20"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="h-5 w-5 text-slate-400 transition-colors duration-300 group-hover:text-emerald-400" />
                </a>
                <a
                  href="https://github.com/altruisticxai"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex h-10 w-10 items-center justify-center rounded-full border border-slate-700 bg-slate-900/70 backdrop-blur transition-all duration-300 hover:scale-110 hover:border-emerald-500/50 hover:bg-slate-800 hover:shadow-lg hover:shadow-emerald-500/20"
                  aria-label="GitHub"
                >
                  <Github className="h-5 w-5 text-slate-400 transition-colors duration-300 group-hover:text-emerald-400" />
                </a>
                <a
                  href="mailto:hello@altruisticxai.com"
                  className="group flex h-10 w-10 items-center justify-center rounded-full border border-slate-700 bg-slate-900/70 backdrop-blur transition-all duration-300 hover:scale-110 hover:border-emerald-500/50 hover:bg-slate-800 hover:shadow-lg hover:shadow-emerald-500/20"
                  aria-label="Email"
                >
                  <Mail className="h-5 w-5 text-slate-400 transition-colors duration-300 group-hover:text-emerald-400" />
                </a>
              </div>
            </div>
          </div>
        </footer>
      </main>

      <ScrollToTop />
      <SectionNav />
    </div>
  );
};

function LabCard({
  title,
  tag,
  status,
  updated,
}: {
  title: string;
  tag: string;
  status: string;
  updated: string;
}) {
  return (
    <div className="group rounded-xl border border-slate-700 bg-slate-950/70 p-3 transition-all duration-300 hover:scale-[1.02] hover:border-emerald-500/50 hover:shadow-lg hover:shadow-emerald-500/20 cursor-pointer">
      <div className="mb-1 flex items-center justify-between gap-2">
        <span className="text-[11px] font-medium text-slate-300 transition-colors group-hover:text-emerald-300">{tag}</span>
        <span className="text-[11px] text-emerald-300 transition-all duration-300 group-hover:scale-110">{status}</span>
      </div>
      <p className="text-xs font-semibold text-slate-50 transition-colors group-hover:text-emerald-300">{title}</p>
      <p className="mt-1 text-[11px] text-slate-500">{updated}</p>
    </div>
  );
}

export default Index;
