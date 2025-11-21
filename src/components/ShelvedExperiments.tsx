import React, { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { FileText, MessageSquare, PenLine, X } from "lucide-react";
import { Section } from "./Section";
import { Stack } from "./layout/Stack";
const experiments = [{
  icon: FileText,
  name: "Meeting Agenda AI Summarizer",
  status: "Shelved",
  statusColor: "amber",
  sector: "Civic",
  lesson: "If no one owns the decision, no amount of AI will fix the meeting.",
  handwrittenNote: "Decision rights > AI",
  summary: "Built smart summaries, but meetings still went nowhere because accountability was unclear.",
  redactedReason: "Political misalignment"
}, {
  icon: MessageSquare,
  name: "Civic Comment Sentiment Tracker",
  status: "Killed",
  statusColor: "red",
  sector: "Civic",
  lesson: "Filtering comments faster didn't build trust. People cared more about being heard than being categorized.",
  handwrittenNote: "Trust > Efficiency",
  summary: "Automated sentiment analysis made processing faster, but residents wanted human responses, not algorithmic sorting.",
  redactedReason: "Community backlash"
}, {
  icon: PenLine,
  name: "AI Essay Grading Assistant",
  status: "Killed",
  statusColor: "red",
  sector: "Education",
  lesson: "Students valued one thoughtful comment from a teacher more than ten AI-generated rubric scores.",
  handwrittenNote: "Feedback ≠ Scoring",
  summary: "Rubric automation worked technically, but removed the human conversation students needed to improve.",
  redactedReason: "Teacher resistance"
}];
export default function ShelvedExperiments() {
  const [expandedCard, setExpandedCard] = useState<string | null>(null);
  const prefersReducedMotion = useReducedMotion();
  return <Section id="shelved" spacing="compact" border="top">
      <Stack gap="md">
        <header className="max-w-2xl">
          
          <p className="body-sm text-muted-foreground mt-1.5">
            Not everything ships. Here's what we learned from what didn't.
          </p>
        </header>

        {/* Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {experiments.map((exp, index) => {
          const Icon = exp.icon;
          const isExpanded = expandedCard === exp.name;
          const isHovered = !prefersReducedMotion;
          return <motion.div key={exp.name} initial={{
            opacity: 0,
            y: 20
          }} whileInView={{
            opacity: 1,
            y: 0
          }} viewport={{
            once: true
          }} transition={{
            duration: 0.5,
            delay: index * 0.1
          }} onClick={() => setExpandedCard(isExpanded ? null : exp.name)} className="relative cursor-pointer">
                <motion.div initial={{
              filter: "blur(8px)",
              opacity: 0.6
            }} whileHover={isHovered ? {
              filter: "blur(0px)",
              opacity: 1,
              scale: 1.02,
              boxShadow: "0 20px 40px rgba(0,0,0,0.4)"
            } : undefined} animate={isExpanded ? {
              filter: "blur(0px)",
              opacity: 1,
              scale: 1.02
            } : undefined} transition={{
              duration: 0.3
            }} className={`relative overflow-hidden rounded-xl border-2 border-dashed ${exp.statusColor === 'red' ? 'border-red-900/40 bg-red-950/10' : 'border-amber-900/40 bg-amber-950/10'} p-6 min-h-[280px] flex flex-col`}>
                  {/* ARCHIVED Stamp */}
                  <div className="absolute top-4 right-4 -rotate-12 opacity-30">
                    <div className={`px-3 py-1 border-2 ${exp.statusColor === 'red' ? 'border-red-600' : 'border-amber-600'} rounded text-xs font-bold tracking-wider`}>
                      ARCHIVED
                    </div>
                  </div>

                  {/* Header */}
                  <div className="flex items-start gap-3 mb-4">
                    <div className={`p-2 rounded-lg ${exp.statusColor === 'red' ? 'bg-red-900/20' : 'bg-amber-900/20'}`}>
                      <Icon className={`w-5 h-5 ${exp.statusColor === 'red' ? 'text-red-400' : 'text-amber-400'}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-semibold text-foreground leading-tight">
                        {exp.name}
                      </h3>
                      <div className="flex items-center gap-2 mt-1">
                        <span className={`text-[10px] px-2 py-0.5 rounded-full ${exp.statusColor === 'red' ? 'bg-red-900/30 text-red-400' : 'bg-amber-900/30 text-amber-400'}`}>
                          {exp.status}
                        </span>
                        <span className="text-[10px] text-muted-foreground">
                          {exp.sector}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Summary */}
                  <p className="text-xs text-muted-foreground leading-relaxed mb-4 flex-1">
                    {exp.summary}
                  </p>

                  {/* Lesson */}
                  <div className={`text-xs leading-relaxed p-3 rounded-lg border ${exp.statusColor === 'red' ? 'border-red-900/40 bg-red-950/20 text-red-200' : 'border-amber-900/40 bg-amber-950/20 text-amber-200'}`}>
                    <span className="font-semibold">Lesson:</span> {exp.lesson}
                  </div>

                  {/* Handwritten Note Overlay (appears on hover/expanded) */}
                  <motion.div initial={{
                rotate: -5,
                y: -20,
                opacity: 0,
                scale: 0.9
              }} whileHover={isHovered ? {
                rotate: -3,
                y: 0,
                opacity: 1,
                scale: 1
              } : undefined} animate={isExpanded ? {
                rotate: -3,
                y: 0,
                opacity: 1,
                scale: 1
              } : undefined} transition={{
                type: "spring",
                stiffness: 200,
                damping: 15
              }} className="absolute top-6 right-6 bg-yellow-100 p-3 shadow-xl rounded-sm max-w-[140px] pointer-events-none" style={{
                fontFamily: "'Caveat', 'Brush Script MT', cursive",
                transformOrigin: "top right"
              }}>
                    <p className="text-slate-900 text-sm leading-tight">
                      {exp.handwrittenNote}
                    </p>
                    {/* Pin effect */}
                    <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-red-500 shadow-md" />
                  </motion.div>

                  {/* Expand indicator */}
                  {!isExpanded && <div className="absolute bottom-3 right-3 text-[10px] text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity">
                      Click to expand
                    </div>}
                </motion.div>

                {/* Expanded Post-Mortem */}
                {isExpanded && <motion.div initial={{
              opacity: 0,
              height: 0
            }} animate={{
              opacity: 1,
              height: "auto"
            }} exit={{
              opacity: 0,
              height: 0
            }} className="mt-2 p-4 rounded-lg bg-slate-900/60 border border-slate-800">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="text-xs font-semibold text-foreground">Why It Didn't Ship</h4>
                      <button onClick={e => {
                  e.stopPropagation();
                  setExpandedCard(null);
                }} className="text-muted-foreground hover:text-foreground transition-colors" aria-label="Close">
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      <span className="text-red-400 font-medium">Root cause:</span> {exp.redactedReason}
                    </p>
                    <p className="text-xs text-muted-foreground leading-relaxed mt-2">
                      <span className="text-amber-400 font-medium">Takeaway:</span> Sometimes the right call is knowing when to stop.
                    </p>
                  </motion.div>}
              </motion.div>;
        })}
        </div>

        {/* Bottom note */}
        <div className="mt-4 text-center">
          <p className="text-xs text-muted-foreground italic">
            Honest failure logs. No spin, just what we learned.
          </p>
        </div>
      </Stack>
    </Section>;
}