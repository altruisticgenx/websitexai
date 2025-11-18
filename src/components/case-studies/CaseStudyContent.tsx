import { motion } from "framer-motion";
import { CheckCircle2, Code } from "lucide-react";
import type { CaseStudy } from "@/data/caseStudies";
import { ProjectTimeline } from "@/components/ProjectTimeline";

interface CaseStudyContentProps {
  caseStudy: CaseStudy;
}

export function CaseStudyContent({ caseStudy }: CaseStudyContentProps) {
  return (
    <div className="space-y-12">
      {/* Summary Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="rounded-2xl border border-primary/30 bg-gradient-to-br from-slate-950/80 to-slate-900/60 p-6 sm:p-8 backdrop-blur-sm"
      >
        <h2 className="mb-4 text-xl font-semibold text-slate-50">Overview</h2>
        <p className="text-sm text-slate-300 leading-relaxed sm:text-base">
          {caseStudy.summary}
        </p>
      </motion.section>

      {/* Challenge Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="rounded-2xl border border-orange-500/30 bg-gradient-to-br from-orange-950/20 to-slate-900/60 p-6 sm:p-8 backdrop-blur-sm"
      >
        <h2 className="mb-4 text-xl font-semibold text-orange-300">The Challenge</h2>
        <p className="text-sm text-slate-300 leading-relaxed sm:text-base">
          {caseStudy.challenge}
        </p>
      </motion.section>

      {/* Solution Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="rounded-2xl border border-blue-500/30 bg-gradient-to-br from-blue-950/20 to-slate-900/60 p-6 sm:p-8 backdrop-blur-sm"
      >
        <h2 className="mb-4 text-xl font-semibold text-blue-300">The Solution</h2>
        <p className="text-sm text-slate-300 leading-relaxed sm:text-base">
          {caseStudy.solution}
        </p>
      </motion.section>

      {/* Outcomes Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="rounded-2xl border border-emerald-500/30 bg-gradient-to-br from-emerald-950/20 to-slate-900/60 p-6 sm:p-8 backdrop-blur-sm"
      >
        <h2 className="mb-6 text-xl font-semibold text-emerald-300">Key Outcomes</h2>
        <ul className="grid gap-3 sm:grid-cols-2">
          {caseStudy.outcomes.map((outcome, index) => (
            <li key={index} className="flex items-start gap-3">
              <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-emerald-400 mt-0.5" />
              <span className="text-sm text-slate-300">{outcome}</span>
            </li>
          ))}
        </ul>
      </motion.section>

      {/* Technologies Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="rounded-2xl border border-purple-500/30 bg-gradient-to-br from-purple-950/20 to-slate-900/60 p-6 sm:p-8 backdrop-blur-sm"
      >
        <div className="mb-4 flex items-center gap-2">
          <Code className="h-5 w-5 text-purple-400" />
          <h2 className="text-xl font-semibold text-purple-300">Technologies Used</h2>
        </div>
        <div className="flex flex-wrap gap-2">
          {caseStudy.technologies.map((tech, index) => (
            <span
              key={index}
              className="rounded-full border border-purple-400/30 bg-purple-400/10 px-3 py-1 text-xs font-medium text-purple-200"
            >
              {tech}
            </span>
          ))}
        </div>
      </motion.section>

      {/* Project Timeline Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="rounded-2xl border border-primary/30 bg-gradient-to-br from-slate-950/80 to-slate-900/60 p-6 sm:p-8 backdrop-blur-sm"
      >
        <h2 className="mb-6 text-xl font-semibold text-slate-50">Project Timeline</h2>
        <ProjectTimeline phases={caseStudy.phases} duration={caseStudy.duration} />
      </motion.section>
    </div>
  );
}
