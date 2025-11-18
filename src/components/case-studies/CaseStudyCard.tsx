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
      initial={{ opacity: 0, y: 20, rotateX: -10 }}
      animate={{ opacity: 1, y: 0, rotateX: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{
        y: -10,
        rotateX: 5,
        rotateY: index % 2 === 0 ? -5 : 5,
        scale: 1.02,
      }}
      className="card-3d card-3d-border group relative overflow-hidden rounded-2xl p-6 backdrop-blur-sm transition-all duration-500 hover:shadow-3d"
      style={{ transformStyle: 'preserve-3d' }}
    >
      {/* Tag Badge */}
      {caseStudy.tag && (
        <div className="mb-3 inline-flex items-center rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-medium text-primary" style={{ transform: 'translateZ(20px)' }}>
          {caseStudy.tag}
        </div>
      )}

      {/* Sector */}
      <div className="mb-2 text-xs font-medium uppercase tracking-wider text-emerald-300" style={{ transform: 'translateZ(15px)' }}>
        {caseStudy.sector}
      </div>

      {/* Title */}
      <h3 className="mb-3 text-xl font-bold text-slate-50 group-hover:text-primary transition-colors" style={{ transform: 'translateZ(25px)' }}>
        {caseStudy.title}
      </h3>

      {/* Tagline */}
      <p className="mb-4 text-sm text-slate-300 leading-relaxed" style={{ transform: 'translateZ(15px)' }}>
        {caseStudy.tagline}
      </p>

      {/* Timeline */}
      <div className="mb-4 flex items-center gap-2 text-xs text-slate-400" style={{ transform: 'translateZ(10px)' }}>
        <Calendar className="h-4 w-4" />
        <span>{caseStudy.timeline}</span>
      </div>

      {/* Summary */}
      <p className="mb-4 text-sm text-slate-400 line-clamp-3" style={{ transform: 'translateZ(10px)' }}>
        {caseStudy.summary}
      </p>

      {/* Link */}
      <Link
        to={`/case-study/${caseStudy.id}`}
        className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:gap-3 transition-all"
        style={{ transform: 'translateZ(20px)' }}
      >
        Read full case study
        <ArrowRight className="h-4 w-4" />
      </Link>

      {/* Hover Effect Gradient */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
    </motion.article>
  );
}
