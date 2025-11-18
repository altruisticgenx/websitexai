import React from "react";
import { motion } from "framer-motion";
import { FileText, MessageSquare, PenLine } from "lucide-react";

const experiments = [
  {
    icon: FileText,
    name: "Meeting Agenda AI Summarizer",
    status: "Shelved",
    lesson: "Tech can't fix politics. No decision rights = no dashboard."
  },
  {
    icon: MessageSquare,
    name: "Civic Comment Sentiment Tracker",
    status: "Killed",
    lesson: "Efficiency isn't everything. Trust matters most."
  },
  {
    icon: PenLine,
    name: "AI Essay Grading Assistant",
    status: "Killed",
    lesson: "Teaching is relational. Students need real feedback."
  }
];

export function ShelvedExperiments() {
  return (
    <section id="shelved" className="border-t border-slate-900/80 py-10 sm:py-14">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl"
      >
        <h2 className="text-xl font-semibold sm:text-2xl">
          Shelved & Killed Experiments
        </h2>
        <p className="mt-2 text-sm text-slate-300">
          Not everything ships. Here's what we learned from what didn't work.
        </p>
      </motion.div>

      <div className="mt-6 overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-slate-800/70">
            <tr>
              <th className="pb-3 pr-4 font-medium text-slate-400">Icon</th>
              <th className="pb-3 pr-4 font-medium text-slate-400">Project Name</th>
              <th className="pb-3 pr-4 font-medium text-slate-400">Status</th>
              <th className="pb-3 font-medium text-slate-400">Lesson Learned</th>
            </tr>
          </thead>
          <tbody>
            {experiments.map((exp, index) => {
              const Icon = exp.icon;
              return (
                <motion.tr
                  key={exp.name}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="border-b border-slate-800/50 hover:bg-slate-900/30 transition-colors"
                >
                  <td className="py-4 pr-4">
                    <Icon className="h-5 w-5 text-primary" />
                  </td>
                  <td className="py-4 pr-4 font-medium text-slate-200">
                    {exp.name}
                  </td>
                  <td className="py-4 pr-4">
                    <span
                      className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${
                        exp.status === "Killed"
                          ? "bg-destructive/10 text-destructive"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {exp.status}
                    </span>
                  </td>
                  <td className="py-4 text-slate-300">{exp.lesson}</td>
                </motion.tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
}
