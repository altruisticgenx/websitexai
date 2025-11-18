import React from "react";
import { motion } from "framer-motion";

const weeklyDeliverables = [
  {
    week: "Week 1",
    what: "Align + first working prototype",
    example: "Simple dashboard or agent with fake/partial data"
  },
  {
    week: "Week 2",
    what: "Integrate with one real dataset",
    example: "Demoable workflow for one team"
  },
  {
    week: "Week 3",
    what: "Iterate with stakeholders",
    example: "Short Loom walkthrough + bugfix + small feature"
  },
  {
    week: "Week 4",
    what: "Handoff + next steps",
    example: "Repo, docs, and 2–3 options for where to go next"
  }
];

export function FourWeekPilot() {
  return (
    <section id="pilot" className="border-t border-slate-900/80 py-10 sm:py-14">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl"
      >
        <div className="text-xs font-mono uppercase tracking-[0.18em] text-slate-400">
          The Product
        </div>
        <h2 className="mt-2 text-xl font-semibold sm:text-2xl">
          Your 4-Week AI Pilot
        </h2>
        <p className="mt-2 text-sm text-slate-300">
          What you get each week—not theory, actual deliverables
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="mt-6 overflow-x-auto"
      >
        <table className="w-full text-left text-sm">
          <thead className="border-b border-slate-800/70">
            <tr>
              <th className="pb-3 pr-4 font-medium text-slate-400 text-xs uppercase tracking-wider">Week</th>
              <th className="pb-3 pr-4 font-medium text-slate-400 text-xs uppercase tracking-wider">What you get</th>
              <th className="pb-3 font-medium text-slate-400 text-xs uppercase tracking-wider">Example deliverable</th>
            </tr>
          </thead>
          <tbody>
            {weeklyDeliverables.map((item, index) => (
              <motion.tr
                key={item.week}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="border-b border-slate-800/50 hover:bg-slate-900/30 transition-colors"
              >
                <td className="py-4 pr-4 font-mono text-xs text-primary font-medium">
                  {item.week}
                </td>
                <td className="py-4 pr-4 font-medium text-slate-200">
                  {item.what}
                </td>
                <td className="py-4 text-slate-300 text-sm">
                  {item.example}
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="mt-8 rounded-3xl border border-slate-800/80 bg-slate-950/60 p-6 sm:p-8"
      >
        <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-slate-50 sm:text-xl">
              Fractional Product Engineer – 1–2 Slots Open
            </h3>
            <p className="mt-3 text-sm text-slate-300 max-w-2xl">
              One senior engineer dedicated to your pilot for 4 weeks. No hiring process, 
              no long-term contract, just weekly shipping.
            </p>
            <ul className="mt-4 space-y-2 text-sm text-slate-200">
              <li className="flex items-start gap-2">
                <span className="text-primary mt-0.5">•</span>
                <span>Consistent weekly deliverables</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-0.5">•</span>
                <span>Async-first (Loom, Notion, your tools)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-0.5">•</span>
                <span>Pause after any week</span>
              </li>
            </ul>
          </div>

          <div className="flex flex-col gap-3 md:flex-shrink-0">
            <div className="rounded-2xl border border-slate-800/70 bg-slate-900/60 p-4 text-center">
              <div className="text-xs uppercase tracking-[0.18em] text-slate-400">
                Pilot pricing
              </div>
              <div className="mt-1 text-2xl font-semibold text-primary">
                $1,150 / week
              </div>
              <div className="mt-1 text-xs text-slate-400">
                Billed weekly · pause anytime after Week 2
              </div>
            </div>
            <a
              href="https://scheduler.zoom.us/altruistic-xai"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20"
            >
              Book a Pilot Call
            </a>
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-slate-800/50">
          <p className="text-xs text-slate-400">
            <strong className="text-slate-300">For comparison:</strong> Hiring in-house can take 3–6 months, 
            $100k–$150k salary, plus 30–40% in overhead—with no guarantee they can move quickly on a messy pilot.
          </p>
        </div>
      </motion.div>
    </section>
  );
}
