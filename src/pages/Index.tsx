import React from "react";
import { ScrollToTop } from "@/components/ScrollToTop";
import { ScrollProgress } from "@/components/ScrollProgress";

export default function Index() {
  return (
    <>
      <ScrollProgress />
      <PilotsLandingPage />
      <ScrollToTop />
    </>
  );
}

function PilotsLandingPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-50">
      {/* Page wrapper */}
      <div className="mx-auto max-w-6xl px-4 pb-16 pt-8 sm:px-6 lg:px-8">
        {/* Top nav / brand */}
        <header className="mb-10 flex items-center justify-between gap-4">
          <div>
            <div className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
              AltruisticX AI
            </div>
            <div className="text-sm text-slate-400">
              Live AI Pilot Lab · Weekly Sprints
            </div>
          </div>
          <a
            href="#contact"
            className="rounded-full border border-slate-700 px-4 py-2 text-sm font-medium text-slate-100 hover:border-slate-500 hover:bg-slate-900"
          >
            Book a Pilot Call
          </a>
        </header>

        {/* HERO */}
        <section className="grid gap-10 border-b border-slate-800 pb-12 lg:grid-cols-2 lg:items-center">
          <div className="space-y-6">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-400">
              Live AI Pilot Lab
            </p>
            <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
              AI pilots for campuses, cities, and scrappy teams
            </h1>
            <p className="max-w-xl text-base text-slate-300 sm:text-lg">
              Test real AI tools in 4-week pilots. I design, build, and ship
              working software — not slide decks — so you can see what actually
              helps your people before you commit.
            </p>

            <ul className="space-y-2 text-sm text-slate-300">
              <li>• Real builds, not demos – tools your team can click on.</li>
              <li>• 4-week sprints – enough to learn, short enough to walk away.</li>
              <li>• No long contracts – pause anytime, keep the code and lessons.</li>
            </ul>

            <div className="flex flex-wrap items-center gap-4">
              <a
                href="#contact"
                className="rounded-full bg-emerald-500 px-5 py-2.5 text-sm font-semibold text-slate-950 shadow-lg shadow-emerald-500/20 hover:bg-emerald-400"
              >
                Book a Pilot Call
              </a>
              <a
                href="#pilots"
                className="text-sm font-medium text-slate-200 underline-offset-4 hover:underline"
              >
                View active pilots
              </a>
            </div>
            <p className="text-xs text-slate-400">
              Week-to-week · pause anytime · async-friendly
            </p>
          </div>

          {/* Hero "lab notebook" visual */}
          <div className="lg:justify-self-end">
            <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4 shadow-xl shadow-emerald-500/10">
              <div className="mb-3 flex items-center justify-between">
                <span className="text-xs font-medium uppercase tracking-[0.18em] text-slate-400">
                  Live Experiment Board
                </span>
                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-medium text-emerald-300">
                  ● 2 active
                </span>
              </div>
              <div className="space-y-3 text-xs">
                <PilotCardMini
                  title="Campus Energy Storyboard"
                  tag="Higher Ed · Energy"
                  status="Week 2 of 4"
                  updated="Updated 2 days ago"
                />
                <PilotCardMini
                  title="Capstone Partner Matchmaker"
                  tag="Education · Community"
                  status="Week 1 of 6"
                  updated="Updated 3 days ago"
                />
              </div>
            </div>
          </div>
        </section>

        {/* WHO IT'S FOR */}
        <section className="border-b border-slate-800 py-12">
          <div className="mb-8 max-w-3xl">
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              Who uses Pilots4You?
            </h2>
            <p className="mt-3 text-sm text-slate-300">
              Teams that need real evidence, not another strategy deck.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <InfoCard
              title="Campuses & schools"
              body="Turn messy student, energy, or operations data into simple tools that staff will actually use."
            />
            <InfoCard
              title="Cities & civic teams"
              body="Try AI around forms, wait times, and public info without handing everything to a big vendor."
            />
            <InfoCard
              title="Founders & small orgs"
              body="You have a fuzzy idea and a deadline. We ship a usable pilot you can show to partners and funders."
            />
          </div>
        </section>

        {/* WHAT YOU GET */}
        <section className="border-b border-slate-800 py-12">
          <div className="grid gap-10 lg:grid-cols-[1.1fr,1fr]">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                What you get from a 4-week pilot
              </h2>
              <p className="mt-3 text-sm text-slate-300">
                Each pilot is a tiny, focused project with a clear question, a
                working prototype, and a simple story you can share.
              </p>
              <p className="mt-4 text-xs text-slate-400">
                We write down the question, build something small and opinionated,
                and leave you with a clear "keep, tweak, or kill" decision.
              </p>
            </div>

            <div className="space-y-4">
              <StepCard
                step="01"
                title="A focused question"
                body="\"Can we cut this process from 2 weeks to 2 days?\" \"Can staff understand this dashboard in under 60 seconds?\" We write this down first."
              />
              <StepCard
                step="02"
                title="A working prototype"
                body="A small, opinionated tool: dashboard, form flow, matching engine, or internal copilot - shipped where your team can try it."
              />
              <StepCard
                step="03"
                title="A plain-language summary"
                body="What worked, what didn't, and what to do next - in slides or a one-pager you can send to leadership or funders."
              />
              <StepCard
                step="04"
                title="A clear next step"
                body="Kill it, tweak it, or scale it. No pressure to \"go big\" if it doesn't earn it."
              />
            </div>
          </div>
        </section>

        {/* SAMPLE PILOTS */}
        <section id="pilots" className="border-b border-slate-800 py-12">
          <div className="mb-8 max-w-3xl">
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              Sample pilots I'm running for teams like yours
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <PilotCard
              label="Higher Ed · Energy"
              title="Campus Energy Storyboard"
              goal="Turn raw campus energy data into a simple story that facilities can show to grant committees."
              outcome="A live dashboard plus an energy story one-pager updated weekly."
            />
            <PilotCard
              label="Education · Community"
              title="Capstone Partner Matchmaker"
              goal="Cut the time to match students with community partners from 2 weeks to a couple of days."
              outcome="A simple web UI where staff can see matches, constraints, and contact info in one place."
            />
            <PilotCard
              label="City / Civic"
              title="Civic Form Triage Assistant"
              goal="Help staff quickly sort incoming forms and emails into \"urgent now / later / wrong place.\""
              outcome="An internal assistant that tags and routes requests instead of one shared inbox chaos."
            />
            <PilotCard
              label="Energy & Education"
              title="Grant Evidence Pack Helper"
              goal="Pull key metrics, screenshots, and quotes for grant applications without digging through old emails."
              outcome="A small tool that assembles a \"grant evidence pack\" from your dashboards and notes."
            />
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section className="border-b border-slate-800 py-12">
          <div className="mb-8 max-w-3xl">
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              How a pilot actually works
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <StepCardVertical
              step="Step 1"
              title="Quick intake (Day 1-3)"
              body="30–45 minute call or async Loom. We pick one workflow, one dataset, and one clear question."
            />
            <StepCardVertical
              step="Step 2"
              title="Sketch & agree (Day 3-5)"
              body="You get a tiny plan: what we're building, what \"good\" looks like, who will touch it."
            />
            <StepCardVertical
              step="Step 3"
              title="Build & tweak (Weeks 2-3)"
              body="I ship early versions, you poke holes, we adjust. Light check-ins, mostly async."
            />
            <StepCardVertical
              step="Step 4"
              title="Share the story (Week 4)"
              body="You get the prototype, a short walkthrough, and a \"what we learned\" summary you can show around."
            />
          </div>

          <div
            id="contact"
            className="mt-8 flex flex-wrap items-center gap-4 border border-slate-800 bg-slate-900/40 p-4 rounded-2xl"
          >
            <div className="flex-1 space-y-1">
              <p className="text-sm font-medium text-slate-100">
                Ready to explore a pilot?
              </p>
              <p className="text-xs text-slate-400">
                Tell me the mess, we'll find a pilot worth running.
              </p>
            </div>
            <a
              href="mailto:altruisticxai@gmail.com?subject=Pilot%20Call"
              className="rounded-full bg-emerald-500 px-5 py-2 text-sm font-semibold text-slate-950 hover:bg-emerald-400"
            >
              Email to Book a Call
            </a>
          </div>
        </section>

        {/* WHY THIS MODEL */}
        <section className="py-12">
          <div className="mb-8 max-w-3xl">
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              Why this "pilot lab" instead of a big contract?
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <InfoCard
              title="Less risk"
              body="Short sprints, clear end, no awkward \"we're stuck with this vendor\" feeling."
            />
            <InfoCard
              title="More honesty"
              body="We keep the ugly parts in the story - what didn't work is just as valuable for your next grant or proposal."
            />
            <InfoCard
              title="Real momentum"
              body="Instead of a 40-page strategy doc, you walk away with something that runs and real numbers to point at."
            />
          </div>

          <footer className="mt-10 border-t border-slate-800 pt-6 text-xs text-slate-500">
            <p>AltruisticX AI · Pilots4You Lab</p>
            <p className="mt-1">
              AI pilots for energy, education, and civic teams who want proof before
              promises.
            </p>
          </footer>
        </section>
      </div>
    </div>
  );
}

/* Small helper components */

function InfoCard({ title, body }: { title: string; body: string }) {
  return (
    <div className="h-full rounded-2xl border border-slate-800 bg-slate-900/60 p-4 shadow-sm shadow-slate-900/40">
      <h3 className="text-sm font-semibold text-slate-50">{title}</h3>
      <p className="mt-2 text-xs text-slate-300">{body}</p>
    </div>
  );
}

function StepCard({
  step,
  title,
  body,
}: {
  step: string;
  title: string;
  body: string;
}) {
  return (
    <div className="flex gap-3 rounded-2xl border border-slate-800 bg-slate-900/60 p-4">
      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500/10 text-[11px] font-semibold text-emerald-300">
        {step}
      </div>
      <div>
        <h3 className="text-sm font-semibold text-slate-50">{title}</h3>
        <p className="mt-1 text-xs text-slate-300">{body}</p>
      </div>
    </div>
  );
}

function StepCardVertical({
  step,
  title,
  body,
}: {
  step: string;
  title: string;
  body: string;
}) {
  return (
    <div className="h-full rounded-2xl border border-slate-800 bg-slate-900/60 p-4">
      <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-emerald-300">
        {step}
      </div>
      <h3 className="mt-2 text-sm font-semibold text-slate-50">{title}</h3>
      <p className="mt-2 text-xs text-slate-300">{body}</p>
    </div>
  );
}

function PilotCard({
  label,
  title,
  goal,
  outcome,
}: {
  label: string;
  title: string;
  goal: string;
  outcome: string;
}) {
  return (
    <article className="flex h-full flex-col rounded-2xl border border-slate-800 bg-slate-900/60 p-4">
      <div className="mb-1 inline-flex rounded-full bg-slate-800 px-2 py-0.5 text-[10px] font-medium text-slate-300">
        {label}
      </div>
      <h3 className="text-sm font-semibold text-slate-50">{title}</h3>
      <p className="mt-2 text-xs text-slate-300">
        <span className="font-semibold text-slate-200">Goal: </span>
        {goal}
      </p>
      <p className="mt-2 text-xs text-slate-300">
        <span className="font-semibold text-slate-200">Pilot outcome: </span>
        {outcome}
      </p>
    </article>
  );
}

function PilotCardMini({
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
    <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-3">
      <div className="flex items-center justify-between gap-2">
        <span className="text-[10px] font-medium text-slate-300">{tag}</span>
        <span className="text-[10px] text-emerald-300">{status}</span>
      </div>
      <p className="mt-1 text-xs font-semibold text-slate-50">{title}</p>
      <p className="mt-1 text-[10px] text-slate-500">{updated}</p>
    </div>
  );
}