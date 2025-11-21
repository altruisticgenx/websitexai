import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Clock, TrendingUp, Users, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

// Import background images
import salesCopilotBg from "@/assets/pilot-sales-copilot.jpg";
import founderOsBg from "@/assets/pilot-founder-os.jpg";
import energyAnalyticsBg from "@/assets/pilot-energy-analytics.jpg";
import edtechPortalBg from "@/assets/pilot-edtech-portal.jpg";

interface PilotCardProps {
  id: string;
  title: string;
  sector: string;
  whoFor: string;
  problem: string;
  outcome: string;
  timeToDemo: string;
  tag?: string;
  className?: string;
}

export function PilotCard({
  id,
  title,
  sector,
  whoFor,
  problem,
  outcome,
  timeToDemo,
  tag,
  className,
}: PilotCardProps) {
  // Get background image based on slug/title
  const getBackgroundImage = (id: string) => {
    const bgMap: Record<string, string> = {
      "sales-copilot": salesCopilotBg,
      "founder-os": founderOsBg,
      "energy-analytics": energyAnalyticsBg,
      "edtech-portal": edtechPortalBg,
    };
    return bgMap[id] || "";
  };

  // Dynamic gradient based on sector
  const getSectorGradient = (sector: string) => {
    const gradients: Record<string, string> = {
      "Education Nonprofit": "border-blue-400/30 hover:border-blue-400/50",
      "Founder-Backed Startup": "border-emerald-400/30 hover:border-emerald-400/50",
      "Solo Founder": "border-amber-400/30 hover:border-amber-400/50",
      "Climate & Energy": "border-lime-400/30 hover:border-lime-400/50",
    };
    return gradients[sector] || "border-slate-400/30 hover:border-slate-400/50";
  };

  const bgImage = getBackgroundImage(id);

  return (
    <Link to={`/case-study/${id}`}>
      <motion.article
        whileHover={{ y: -2, scale: 1.01 }}
        transition={{ duration: 0.2 }}
        className={cn(
          "group relative flex h-full flex-col rounded-xl border overflow-hidden backdrop-blur-sm p-3 sm:p-4 transition-all duration-300 hover:shadow-2xl hover:shadow-primary/10 cursor-pointer min-h-[180px]",
          getSectorGradient(sector),
          className
        )}
        style={{
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Background Image with Overlay */}
        {bgImage && (
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-20 transition-opacity duration-300 group-hover:opacity-30"
            style={{ backgroundImage: `url(${bgImage})` }}
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-br from-background/95 via-background/90 to-background/95" />
        {/* Header */}
        <div className="relative z-10 flex items-start justify-between gap-2 mb-2">
          <div className="flex-1">
            <div className="flex items-center gap-1.5 mb-1">
              <span className="inline-flex items-center gap-1 rounded-md border border-primary/30 bg-primary/10 px-1.5 py-0.5 text-[9px] sm:text-[10px] font-medium text-primary">
                <Users className="h-2.5 w-2.5" />
                {whoFor}
              </span>
            </div>
            <h3 className="text-[11px] font-semibold text-foreground line-clamp-2 sm:text-xs">{title}</h3>
            <p className="text-[9px] sm:text-[10px] text-muted-foreground mt-0.5">{sector}</p>
          </div>
          {tag && (
            <span className="rounded-md border border-border/50 bg-muted/50 px-1.5 py-0.5 text-[8px] sm:text-[9px] text-muted-foreground whitespace-nowrap">
              {tag}
            </span>
          )}
        </div>

        {/* Problem */}
        <div className="relative z-10 mb-2 flex-1">
          <h4 className="text-[9px] sm:text-[10px] font-semibold text-foreground mb-0.5">Problem</h4>
          <p className="text-[9px] sm:text-[10px] text-muted-foreground leading-relaxed line-clamp-2">
            {problem}
          </p>
        </div>

        {/* Outcome Metric */}
        <div className="relative z-10 mb-2 rounded-lg border border-primary/20 bg-primary/5 p-1.5">
          <div className="flex items-start gap-1.5">
            <TrendingUp className="h-2.5 w-2.5 text-primary mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="text-[9px] sm:text-[10px] font-semibold text-primary mb-0.5">Outcome</h4>
              <p className="text-[9px] sm:text-[10px] text-foreground leading-relaxed">
                {outcome}
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="relative z-10 flex items-center justify-between pt-2 border-t border-border/40">
          <div className="flex items-center gap-1 text-[9px] sm:text-[10px] text-muted-foreground">
            <Clock className="h-2.5 w-2.5" />
            <span>{timeToDemo}</span>
          </div>
          <span className="inline-flex items-center gap-1 text-[9px] sm:text-[10px] font-medium text-primary group-hover:gap-1.5 transition-all">
            View
            <ArrowRight className="h-2.5 w-2.5" />
          </span>
        </div>
      </motion.article>
    </Link>
  );
}
