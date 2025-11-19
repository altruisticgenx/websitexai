import React from "react";
import { motion } from "framer-motion";
import { FileText, MessageSquare, PenLine } from "lucide-react";

const experiments = [
  {
    icon: FileText,
    name: "Meeting Agenda AI Summarizer",
    status: "Shelved",
    lesson: "If no one owns the decision, no amount of AI will fix the meeting."
  },
  {
    icon: MessageSquare,
    name: "Civic Comment Sentiment Tracker",
    status: "Killed",
    lesson: "Filtering comments faster didn't build trust. People cared more about being heard than being categorized."
  },
  {
    icon: PenLine,
    name: "AI Essay Grading Assistant",
    status: "Killed",
    lesson: "Students valued one thoughtful comment from a teacher more than ten AI-generated rubric scores."
  }
];

export function ShelvedExperiments() {
  return (
    <section id="shelved" className="border-t border-slate-900/80 py-6 sm:py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl"
      >
        <h2 className="text-base font-semibold sm:text-lg">
          Shelved & Killed Experiments
        </h2>
        <p className="mt-1.5 text-[10px] text-slate-300 sm:text-xs">
          Not everything ships. We keep the lessons.
        </p>
      </motion.div>

      <div className="mt-4 overflow-x-auto">
        <table className="w-full text-left text-[10px] sm:text-xs">
          <thead className="border-b border-slate-800/70">
            <tr>
              <th className="pb-2 pr-3 text-[9px] font-medium uppercase tracking-wider text-slate-400 sm:text-[10px]">Icon</th>
              <th className="pb-2 pr-3 text-[9px] font-medium uppercase tracking-wider text-slate-400 sm:text-[10px]">Project</th>
              <th className="pb-2 pr-3 text-[9px] font-medium uppercase tracking-wider text-slate-400 sm:text-[10px]">Status</th>
              <th className="pb-2 text-[9px] font-medium uppercase tracking-wider text-slate-400 sm:text-[10px]">Lesson Learned</th>
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
                  <td className="py-2.5 pr-3">
                    <Icon className="h-3.5 w-3.5 text-primary" />
                  </td>
                  <td className="py-2.5 pr-3 font-medium text-slate-200">
                    {exp.name}
                  </td>
                  <td className="py-2.5 pr-3">
                    <span
                      className={`inline-flex rounded-full px-1.5 py-0.5 text-[8px] font-medium sm:text-[9px] ${
                        exp.status === "Killed"
                          ? "bg-destructive/10 text-destructive"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {exp.status}
                    </span>
                  </td>
                  <td className="py-2.5 text-slate-300">{exp.lesson}</td>
                </motion.tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
}
