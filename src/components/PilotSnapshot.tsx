import { motion } from "framer-motion";
import { Section } from "./Section";
import { CheckCircle2 } from "lucide-react";

export function PilotSnapshot() {
  return (
    <Section spacing="compact" border="bottom">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto"
      >
        <div className="rounded-xl glass-card-hover p-6">
          <h2 className="text-lg sm:text-xl font-bold text-foreground mb-4">
            Pilot Snapshot
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="rounded-lg glass-card p-4">
              <div className="text-xs text-muted-foreground mb-1">Duration</div>
              <div className="text-xl font-bold text-primary">4 weeks</div>
            </div>
            
            <div className="rounded-lg glass-card p-4">
              <div className="text-xs text-muted-foreground mb-1">Ship Rate</div>
              <div className="text-xl font-bold text-primary">1–2 features/week</div>
            </div>
            
            <div className="rounded-lg glass-card p-4">
              <div className="text-xs text-muted-foreground mb-1">Starting Range</div>
              <div className="text-xl font-bold text-primary">$1,150/week</div>
            </div>
            
            <div className="rounded-lg glass-card p-4">
              <div className="text-xs text-muted-foreground mb-1">Deliverables</div>
              <div className="text-sm font-semibold text-foreground leading-tight">Demo + Repo + Plan</div>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <CheckCircle2 className="h-4 w-4 text-primary" />
              <span>No lock-in</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <CheckCircle2 className="h-4 w-4 text-primary" />
              <span>Weekly demos</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <CheckCircle2 className="h-4 w-4 text-primary" />
              <span>You keep the code</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <CheckCircle2 className="h-4 w-4 text-primary" />
              <span>Pause anytime after Week 2</span>
            </div>
          </div>
        </div>
      </motion.div>
    </Section>
  );
}
