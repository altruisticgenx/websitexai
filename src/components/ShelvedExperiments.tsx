import React from "react";
import { motion } from "framer-motion";
import { FileText, MessageSquare, PenLine } from "lucide-react";

const experiments = [
  {
    icon: FileText,
    sector: "Energy · Higher Ed Campus (PA)",
    status: "Week 2 of 4",
    name: "Campus Energy Storyboard",
    context: "For facilities managers who need to show grant committees energy improvements",
    hypothesis: "Can we turn campus energy data into a narrative that facilities managers can show to grant committees?",
    outcome: "Created a weekly 'energy story' deck using existing meters and CSV exports; facilities team is now using it in 2 grant applications."
  },
  {
    icon: MessageSquare,
    sector: "Education · Pilot Management",
    status: "Shipped",
    name: "EdTech Admin Matching System",
    context: "For education nonprofits tracking pilots and student outcomes",
    hypothesis: "Can we reduce the time it takes to match students with programs?",
    outcome: "Reduced admin matching time from 2 weeks to 3 days using automated workflow system."
  },
  {
    icon: PenLine,
    sector: "Civic · Local Government",
    status: "Shipped",
    name: "Civic RFP Replacement Demo",
    context: "For local governments evaluating vendor proposals",
    hypothesis: "Can we build a working demo faster than a traditional RFP process?",
    outcome: "Replaced vendor RFP with a working demo in 30 days, saving 4 months of procurement time."
  }
];

export function ShelvedExperiments() {
  return (
    <section id="lab" className="border-t border-slate-900/80 py-10 sm:py-14">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl"
      >
        <div className="text-xs font-mono uppercase tracking-[0.18em] text-slate-400">
          Live AI Pilot Lab
        </div>
        <h2 className="mt-2 text-xl font-semibold sm:text-2xl">
          Not a portfolio. A lab notebook.
        </h2>
        <p className="mt-2 text-sm text-slate-300">
          Current experiments, recent wins, and what we're testing.
        </p>
      </motion.div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {experiments.map((exp, index) => {
          const Icon = exp.icon;
          const isShipped = exp.status === "Shipped";
          return (
            <motion.article
              key={exp.name}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative flex h-full flex-col rounded-2xl border border-slate-800/70 bg-slate-950/50 p-4 sm:p-5 text-sm hover:border-primary/30 transition-all"
            >
              <div className="flex items-start justify-between gap-3 mb-3">
                <Icon className="h-5 w-5 text-primary flex-shrink-0" />
                <span
                  className={`inline-flex rounded-full px-2 py-1 text-[10px] font-medium uppercase tracking-wider ${
                    isShipped
                      ? "bg-primary/10 text-primary"
                      : "bg-accent/10 text-accent"
                  }`}
                >
                  {exp.status}
                </span>
              </div>

              <div className="text-[10px] uppercase tracking-[0.16em] text-slate-400 mb-2">
                {exp.sector}
              </div>

              <h3 className="text-sm font-semibold text-slate-50 mb-2">
                {exp.name}
              </h3>

              <p className="text-xs text-slate-400 mb-3 italic">
                {exp.context}
              </p>

              <div className="mb-3">
                <div className="text-[10px] uppercase tracking-wider text-slate-500 mb-1">
                  Hypothesis
                </div>
                <p className="text-xs text-slate-300">
                  {exp.hypothesis}
                </p>
              </div>

              <div className="mt-auto pt-3 border-t border-slate-800/50">
                <div className="text-[10px] uppercase tracking-wider text-slate-500 mb-1">
                  {isShipped ? "Outcome" : "Current Status"}
                </div>
                <p className="text-xs text-slate-200 font-medium">
                  {exp.outcome}
                </p>
              </div>
            </motion.article>
          );
        })}
      </div>
    </section>
  );
}
