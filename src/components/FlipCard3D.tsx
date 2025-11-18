import { useState } from "react";
import { motion } from "framer-motion";
import { ExternalLink, Code, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

interface FlipCard3DProps {
  project: {
    id: string;
    title: string;
    sector: string;
    summary: string;
    tag: string;
  };
  index: number;
}

export function FlipCard3D({ project, index }: FlipCard3DProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="h-[380px] w-full perspective-1000"
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
    >
      <motion.div
        className="relative h-full w-full preserve-3d transition-transform duration-700 cursor-pointer"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Front Side */}
        <div
          className="absolute inset-0 backface-hidden rounded-3xl border border-border bg-gradient-to-br from-card/90 to-card/50 backdrop-blur-xl p-6 shadow-2xl overflow-hidden"
          style={{ backfaceVisibility: "hidden" }}
        >
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>

          {/* Content */}
          <div className="relative h-full flex flex-col">
            {/* Sector Badge */}
            <div className="flex items-center justify-between mb-4">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                <Zap size={12} />
                {project.sector}
              </span>
              {project.tag && (
                <span className="rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-xs font-medium text-accent">
                  {project.tag}
                </span>
              )}
            </div>

            {/* Title */}
            <h3 className="text-xl font-bold text-foreground mb-3 leading-tight">
              {project.title}
            </h3>

            {/* Summary */}
            <p className="text-sm text-muted-foreground leading-relaxed flex-1">
              {project.summary}
            </p>

            {/* Hover Indicator */}
            <div className="mt-4 flex items-center gap-2 text-xs text-primary font-medium">
              <span className="animate-pulse">Hover to see details</span>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </div>
          </div>

          {/* Decorative Elements */}
          <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-primary/20 rounded-full blur-3xl"></div>
          <div className="absolute -top-10 -left-10 w-32 h-32 bg-accent/20 rounded-full blur-2xl"></div>
        </div>

        {/* Back Side */}
        <div
          className="absolute inset-0 backface-hidden rounded-3xl border border-primary/40 bg-gradient-to-br from-primary/20 via-card to-accent/20 backdrop-blur-xl p-6 shadow-2xl overflow-hidden"
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
          }}
        >
          {/* Animated Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10 animate-gradient"></div>

          {/* Content */}
          <div className="relative h-full flex flex-col">
            <div className="flex items-center gap-2 mb-4">
              <Code size={20} className="text-primary" />
              <h3 className="text-lg font-bold text-foreground">Project Details</h3>
            </div>

            {/* Details List */}
            <div className="space-y-3 flex-1">
              <div className="rounded-xl border border-border/50 bg-background/50 backdrop-blur-sm p-3">
                <div className="text-xs font-semibold text-primary uppercase tracking-wider mb-1">
                  Sector
                </div>
                <div className="text-sm font-medium text-foreground">{project.sector}</div>
              </div>

              <div className="rounded-xl border border-border/50 bg-background/50 backdrop-blur-sm p-3">
                <div className="text-xs font-semibold text-primary uppercase tracking-wider mb-1">
                  Approach
                </div>
                <div className="text-sm font-medium text-foreground">
                  Weekly sprints · Pilot-focused · Real deployments
                </div>
              </div>

              <div className="rounded-xl border border-border/50 bg-background/50 backdrop-blur-sm p-3">
                <div className="text-xs font-semibold text-primary uppercase tracking-wider mb-1">
                  Outcome
                </div>
                <div className="text-sm font-medium text-foreground">
                  {project.tag || "Shipped & Deployed"}
                </div>
              </div>
            </div>

            {/* Link */}
            <a
              href={`/portfolio#${project.id}`}
              className="mt-4 inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-all duration-300 hover:scale-105 shadow-lg shadow-primary/30"
              onClick={(e) => e.stopPropagation()}
            >
              View Case Study
              <ExternalLink size={16} />
            </a>
          </div>

          {/* Decorative Grid Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: `linear-gradient(rgba(31, 221, 197, 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(31, 221, 197, 0.3) 1px, transparent 1px)`,
              backgroundSize: '20px 20px'
            }}></div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
