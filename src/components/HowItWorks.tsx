import { motion } from "framer-motion";

const steps = [
  {
    label: "01",
    title: "Share your starting point",
    body: "You send a Loom, doc, or repo. We map what's realistic in a 4-week window and pick a small surface to prove.",
  },
  {
    label: "02",
    title: "Ship weekly slices",
    body: "Each week we ship a complete slice of value: screens, flows, integrations, or data plumbing—not just tickets and diagrams.",
  },
  {
    label: "03",
    title: "Decide with clarity",
    body: "At the end, you have a working pilot, a walkthrough, and a decision: invest more, iterate, or pause.",
  },
];

export function HowItWorks() {
  return (
    <section id="how" className="border-t border-slate-900/80 py-10 md:py-16">
      <div className="mx-auto w-full max-w-5xl px-4 md:px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          viewport={{ once: true }} 
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
            How Our Experimental Pilot Works
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground md:text-base">
            <span className="text-primary font-medium">The Build Fast Kit: 4 weeks. 3 steps.</span> Intentionally simple. 
            No massive discovery phase, no 40-page decks. Just a tight loop around one meaningful pilot.
          </p>
        </motion.div>

        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          {steps.map((step, index) => (
            <motion.div 
              key={step.label} 
              initial={{ opacity: 0, y: 20 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              viewport={{ once: true }} 
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ 
                y: -6,
                boxShadow: "0 20px 25px -5px hsl(var(--primary) / 0.2)",
                borderColor: "hsl(var(--primary) / 0.4)"
              }}
              className="group rounded-2xl border border-slate-800/70 bg-gradient-to-br from-slate-950/50 to-slate-900/30 p-4 text-sm transition-all duration-300 cursor-default"
            >
              <div className="text-xs font-mono uppercase tracking-[0.18em] text-primary group-hover:text-accent transition-colors">
                {step.label}
              </div>
              <h3 className="mt-2 text-sm font-semibold text-slate-50 group-hover:text-primary transition-colors">
                {step.title}
              </h3>
              <p className="mt-2 text-sm text-slate-300">{step.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
