import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Calendar } from "lucide-react";
import type { CaseStudy } from "@/data/caseStudies";

interface CaseStudyCardProps {
  caseStudy: CaseStudy;
  index: number;
}

export function CaseStudyCard({ caseStudy, index }: CaseStudyCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative overflow-hidden rounded-2xl border border-primary/30 bg-gradient-to-br from-slate-950/80 to-slate-900/60 p-6 backdrop-blur-sm transition-all hover:-translate-y-1 hover:shadow-2xl hover:shadow-primary/20"
    >
      {/* Tag Badge */}
      {caseStudy.tag && (
        <div className="mb-3 inline-flex items-center rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
          {caseStudy.tag}
        </div>
      )}

      {/* Sector */}
      <div className="mb-2 text-xs font-medium uppercase tracking-wider text-emerald-300">
        {caseStudy.sector}
      </div>

      {/* Title */}
      <h3 className="mb-3 text-xl font-bold text-slate-50 group-hover:text-primary transition-colors">
        {caseStudy.title}
      </h3>

      {/* Tagline */}
      <p className="mb-4 text-sm text-slate-300 leading-relaxed">
        {caseStudy.tagline}
      </p>

      {/* Timeline */}
      <div className="mb-4 flex items-center gap-2 text-xs text-slate-400">
        <Calendar className="h-4 w-4" />
        <span>{caseStudy.timeline}</span>
      </div>

      {/* Summary */}
      <p className="mb-4 text-sm text-slate-400 line-clamp-3">
        {caseStudy.summary}
      </p>

      {/* Link */}
      <Link
        to={`/case-study/${caseStudy.id}`}
        className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:gap-3 transition-all"
      >
        Read full case study
        <ArrowRight className="h-4 w-4" />
      </Link>

      {/* Hover Effect Gradient */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
    </motion.article>
  );
}
