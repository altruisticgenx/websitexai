import { motion } from "framer-motion";
import { Calendar } from "lucide-react";
import type { CaseStudy } from "@/data/caseStudies";

interface CaseStudyHeaderProps {
  caseStudy: CaseStudy;
}

export function CaseStudyHeader({ caseStudy }: CaseStudyHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="mb-12"
    >
      {/* Tag */}
      {caseStudy.tag && (
        <div className="mb-4 inline-flex items-center rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
          {caseStudy.tag}
        </div>
      )}

      {/* Sector */}
      <div className="mb-3 text-sm font-medium uppercase tracking-wider text-emerald-300">
        {caseStudy.sector}
      </div>

      {/* Title */}
      <h1 className="mb-4 heading-display text-2xl sm:text-3xl lg:text-4xl">
        {caseStudy.title}
      </h1>

      {/* Tagline */}
      <p className="mb-6 text-lg text-slate-300 sm:text-xl">
        {caseStudy.tagline}
      </p>

      {/* Timeline */}
      <div className="flex items-center gap-2 text-sm text-slate-400">
        <Calendar className="h-5 w-5" />
        <span className="font-medium">{caseStudy.timeline}</span>
      </div>
    </motion.div>
  );
}
