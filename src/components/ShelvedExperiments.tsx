import React from "react";
import { motion } from "framer-motion";
import { FileText, MessageSquare, PenLine } from "lucide-react";
import { Section } from "./utilities/Section";
import { Stack } from "./layout/Stack";

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
    <Section id="shelved" spacing="compact" border="top">
      <Stack gap="md">
        <header className="max-w-2xl">
          <h2 className="heading-4">Examples</h2>
          <p className="body-sm text-muted-foreground mt-1.5">
            Not everything ships. We keep the lessons.
          </p>
        </header>

        <div className="overflow-x-auto rounded-xl border border-white/10">
          <table className="min-w-full text-left">
            <thead className="bg-white/5 border-b border-slate-800/70">
              <tr>
                <th className="pb-2 pr-3 text-[9px] font-medium uppercase tracking-wider text-slate-400 sm:text-[10px] p-3">Icon</th>
                <th className="pb-2 pr-3 text-[9px] font-medium uppercase tracking-wider text-slate-400 sm:text-[10px] p-3">Project</th>
                <th className="pb-2 pr-3 text-[9px] font-medium uppercase tracking-wider text-slate-400 sm:text-[10px] p-3">Status</th>
                <th className="pb-2 text-[9px] font-medium uppercase tracking-wider text-slate-400 sm:text-[10px] p-3">Lesson Learned</th>
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
                    <td className="p-3 align-top">
                      <Icon className="h-3.5 w-3.5 text-primary" />
                    </td>
                    <td className="p-3 align-top max-w-[18rem] break-words body-sm font-medium text-slate-200">
                      {exp.name}
                    </td>
                    <td className="p-3 align-top">
                      <span className={`inline-flex rounded-full px-1.5 py-0.5 text-[8px] font-medium sm:text-[9px] ${
                        exp.status === "Killed" 
                          ? "bg-destructive/10 text-destructive" 
                          : "bg-muted text-muted-foreground"
                      }`}>
                        {exp.status}
                      </span>
                    </td>
                    <td className="p-3 align-top max-w-[28rem] break-words body-sm text-slate-300">
                      {exp.lesson}
                    </td>
                  </motion.tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Stack>
    </Section>
  );
}
