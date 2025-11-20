import { PilotApplicationForm } from "@/components/PilotApplicationForm";

export default function FutureProofing() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-50">
      {/* Hero */}
      <section className="border-b border-slate-800 bg-gradient-to-br from-sky-900/40 via-slate-950 to-emerald-900/40">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:py-20 lg:py-24">
          <div className="max-w-3xl space-y-6">
            <p className="text-xs font-semibold tracking-[0.2em] text-sky-300 uppercase">
              2025–2026 Pennsylvania Pilot
            </p>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold leading-tight">
              Future-Proofing Pennsylvania Students
            </h1>
            <p className="text-base sm:text-lg text-slate-200/90">
              A civic innovation &amp; AI literacy pilot that connects real data,
              real bills, and real pilots so students can design practical
              solutions for their own communities.
            </p>

            <div className="flex flex-wrap gap-3">
              <a
                href="#apply"
                className="inline-flex items-center rounded-full bg-sky-400 px-5 py-2.5 text-sm font-medium text-slate-950 hover:bg-sky-300 transition"
              >
                Apply Below
              </a>
            </div>

            <div className="mt-4 flex flex-wrap gap-4 text-xs text-slate-300/80">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-emerald-400" />
                <span>For districts, legislators, and students</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-sky-400" />
                <span>2–6 week plug-and-play unit</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem & Urgency */}
      <section className="border-b border-slate-800">
        <div className="mx-auto max-w-6xl px-4 py-12 lg:py-16">
          <div className="grid gap-10 lg:grid-cols-2">
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold">
                Pennsylvania is stuck between innovation and reality.
              </h2>
              <p className="text-slate-200/90">
                Over 80% of key education, energy, and AI bills die in
                committee. Districts face chronic issues in attendance,
                infrastructure, and workforce pipelines, while students see
                politics as noise instead of a system they can understand or
                influence.
              </p>
              <p className="text-slate-300/90">
                Meanwhile, places like Maine and DC are moving forward with
                AI-driven tutoring, V2G electric buses, and project-based civic
                models that give students real ownership. Pennsylvania risks
                being left behind.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4">
                <p className="text-xs font-medium text-slate-400 uppercase tracking-wide">
                  Legislative Congestion
                </p>
                <p className="mt-2 text-3xl font-semibold text-sky-300">
                  80%+
                </p>
                <p className="mt-1 text-xs text-slate-300/90">
                  of relevant education, energy, and AI bills stall &quot;In
                  Committee&quot; before districts ever see impact.
                </p>
              </div>
              <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4">
                <p className="text-xs font-medium text-slate-400 uppercase tracking-wide">
                  Fragmented Districts
                </p>
                <p className="mt-2 text-3xl font-semibold text-emerald-300">
                  500+
                </p>
                <p className="mt-1 text-xs text-slate-300/90">
                  districts operating without shared innovation infrastructure
                  or a common civic–AI learning model.
                </p>
              </div>
              <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4 sm:col-span-2">
                <p className="text-xs font-medium text-slate-400 uppercase tracking-wide">
                  A working contrast
                </p>
                <p className="mt-2 text-sm text-slate-100">
                  Acton Academy Kennebunkport in Maine shows what&apos;s
                  possible when students run real projects, present to real
                  audiences, and use tools like AI inside flexible, project-
                  based arcs. This pilot brings that level of agency and realism
                  into Pennsylvania districts.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Solution Overview */}
      <section className="border-b border-slate-800 bg-slate-950">
        <div className="mx-auto max-w-6xl px-4 py-12 lg:py-16 space-y-8">
          <div className="max-w-3xl space-y-3">
            <h2 className="text-2xl font-semibold">
              A policy-to-practice civic lab for Pennsylvania.
            </h2>
            <p className="text-slate-200/90">
              The Future-Proofing Pilot gives districts a complete, ready-to-run
              learning environment that connects regional needs, innovation
              pilots, and real bills to AI-assisted student solutions.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                title: "Regional Needs Dashboard",
                body: "Students explore attendance, transportation, building stress, and workforce data to answer: What hurts here?",
              },
              {
                title: "Innovation Pilot Library",
                body: "Learners study proven pilots from PA and beyond—HIT, AI tutors, V2G buses, solar and energy analytics.",
              },
              {
                title: "Legislative Bottlenecks",
                body: "Visual breakdown of In Committee vs Enacted bills by theme, so students can see where good ideas get stuck.",
              },
              {
                title: "AI Policy Brief Tool",
                body: "AI-assisted 100-word briefs tailored to legislators, school boards, district leaders, or community partners.",
              },
            ].map((card) => (
              <div
                key={card.title}
                className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4 flex flex-col gap-2"
              >
                <h3 className="text-sm font-semibold text-slate-50">
                  {card.title}
                </h3>
                <p className="text-xs text-slate-300/90">{card.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pilot Structure */}
      <section className="border-b border-slate-800">
        <div className="mx-auto max-w-6xl px-4 py-12 lg:py-16 space-y-6">
          <div className="max-w-3xl space-y-2">
            <h2 className="text-2xl font-semibold">
              2–6 weeks. Real data. Real bills. Real student work.
            </h2>
            <p className="text-slate-200/90">
              The pilot is flexible by design—districts can run a short 2-week
              taste or a full 6-week civic innovation arc.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 text-sm">
            {[
              {
                step: "Week 1",
                title: "What hurts here?",
                body: "Students explore the needs dashboard and select local problems that actually show up in their lives.",
              },
              {
                step: "Week 2",
                title: "What works elsewhere?",
                body: "They analyze innovation pilots like HIT, AI tutoring, and V2G buses, asking how those might translate locally.",
              },
              {
                step: "Week 3",
                title: "Where is the system stuck?",
                body: "Students examine real PA bills and committee bottlenecks, connecting policy to the needs they've selected.",
              },
              {
                step: "Week 4",
                title: "What's our proposal?",
                body: "Using the AI brief tool, they draft concise, data-backed proposals tailored to a specific audience.",
              },
              {
                step: "Weeks 5–6",
                title: "Who needs to hear this?",
                body: "Optional exhibition and dialogue with boards, legislators, district leaders, or community partners.",
              },
            ].map((item) => (
              <div
                key={item.step}
                className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4"
              >
                <p className="text-xs font-semibold text-sky-300">
                  {item.step}
                </p>
                <h3 className="mt-1 text-sm font-semibold text-slate-50">
                  {item.title}
                </h3>
                <p className="mt-1 text-xs text-slate-300/90">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Outcomes */}
      <section className="border-b border-slate-800 bg-slate-950">
        <div className="mx-auto max-w-6xl px-4 py-12 lg:py-16 space-y-8">
          <h2 className="text-2xl font-semibold">What districts gain.</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 text-xs">
            <div className="space-y-2 rounded-2xl border border-slate-800 bg-slate-900/60 p-4">
              <h3 className="text-sm font-semibold text-slate-50">
                For Students
              </h3>
              <ul className="mt-1 space-y-1 text-slate-300/90">
                <li>• Higher engagement and ownership</li>
                <li>• Systems thinking around policy and data</li>
                <li>• Practical AI and communication skills</li>
              </ul>
            </div>
            <div className="space-y-2 rounded-2xl border border-slate-800 bg-slate-900/60 p-4">
              <h3 className="text-sm font-semibold text-slate-50">
                For Teachers
              </h3>
              <ul className="mt-1 space-y-1 text-slate-300/90">
                <li>• A scaffolded, modern unit with minimal prep</li>
                <li>• Evidence-based student work to showcase</li>
              </ul>
            </div>
            <div className="space-y-2 rounded-2xl border border-slate-800 bg-slate-900/60 p-4">
              <h3 className="text-sm font-semibold text-slate-50">
                For Districts
              </h3>
              <ul className="mt-1 space-y-1 text-slate-300/90">
                <li>• Board-ready documentation and artifacts</li>
                <li>• Grant-aligned outcomes in SEL, PBL, AI literacy</li>
              </ul>
            </div>
            <div className="space-y-2 rounded-2xl border border-slate-800 bg-slate-900/60 p-4">
              <h3 className="text-sm font-semibold text-slate-50">
                For Legislators
              </h3>
              <ul className="mt-1 space-y-1 text-slate-300/90">
                <li>• Respectful, structured youth input</li>
                <li>• Local data and narratives they can use</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="apply" className="border-b border-slate-800">
        <div className="mx-auto max-w-6xl px-4 py-12 lg:py-16 space-y-6">
          <div className="max-w-3xl space-y-3">
            <h2 className="text-2xl font-semibold">
              Bring the Future-Proofing Pilot to your district.
            </h2>
            <p className="text-slate-200/90">
              This is the fastest, lowest-friction way for Pennsylvania to turn
              real data, real bills, and real pilots into student-led,
              AI-supported civic solutions—without waiting for new mandates.
            </p>
          </div>
          <PilotApplicationForm />
          <p className="text-xs text-slate-400">
            Ideal for 1–3 pilot schools per district in 2025–2026, with room to
            scale to 20–50 districts by Fall 2026.
          </p>
        </div>
      </section>
    </main>
  );
}
