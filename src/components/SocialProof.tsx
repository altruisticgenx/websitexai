import { motion } from "framer-motion";
import { Section } from "./Section";
import { AnimatedNumber } from "./AnimatedNumber";

export function SocialProof() {
  return (
    <Section spacing="compact" border="bottom">
      <div className="max-w-3xl mx-auto">
        {/* Killer Quote with Number */}
        <motion.blockquote
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative rounded-xl border border-primary/20 bg-gradient-to-br from-primary/5 to-accent/5 backdrop-blur-sm p-6"
        >
          <div className="absolute top-4 left-4 text-4xl text-primary/20 font-serif">"</div>
          <p className="text-sm sm:text-base text-foreground leading-relaxed pl-6">
            Demo in Week 1. <span className="font-semibold text-primary">65% less manual work</span> by Week 4. 
            No hiring process, no equity, just consistent weekly shipping.
          </p>
          <footer className="mt-4 flex items-center justify-between pl-6">
            <cite className="text-xs text-muted-foreground not-italic">
              — Recent AI Sales Copilot Pilot
            </cite>
            <div className="flex gap-2 text-[10px] text-muted-foreground/70">
              <span className="px-2 py-0.5 rounded-full border border-border/50 bg-card/30">Startup</span>
              <span className="px-2 py-0.5 rounded-full border border-border/50 bg-card/30">4 weeks</span>
            </div>
          </footer>
        </motion.blockquote>

        {/* Proxy Proof Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mt-6 grid grid-cols-3 gap-4 text-center"
        >
          <div className="rounded-lg border border-border/50 bg-card/30 backdrop-blur-sm p-3">
            <div className="text-xl sm:text-2xl font-bold text-primary">
              <AnimatedNumber value={4} suffix="+" />
            </div>
            <div className="text-xs text-muted-foreground mt-1">Pilots shipped</div>
          </div>
          <div className="rounded-lg border border-border/50 bg-card/30 backdrop-blur-sm p-3">
            <div className="text-xl sm:text-2xl font-bold text-primary">Week 1</div>
            <div className="text-xs text-muted-foreground mt-1">Avg first demo</div>
          </div>
          <div className="rounded-lg border border-border/50 bg-card/30 backdrop-blur-sm p-3">
            <div className="text-xl sm:text-2xl font-bold text-primary">
              <AnimatedNumber value={3} />
            </div>
            <div className="text-xs text-muted-foreground mt-1">Core sectors</div>
          </div>
        </motion.div>

        {/* Worked With */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-6 text-center"
        >
          <p className="text-xs text-muted-foreground mb-3">Worked with</p>
          <div className="flex flex-wrap justify-center gap-3 text-xs text-muted-foreground/80">
            <span className="px-3 py-1.5 rounded-md border border-border/50 bg-card/20">Education Nonprofits</span>
            <span className="px-3 py-1.5 rounded-md border border-border/50 bg-card/20">Energy Teams</span>
            <span className="px-3 py-1.5 rounded-md border border-border/50 bg-card/20">Civic Operations</span>
            <span className="px-3 py-1.5 rounded-md border border-border/50 bg-card/20">Founder-Backed Startups</span>
          </div>
        </motion.div>
      </div>
    </Section>
  );
}
