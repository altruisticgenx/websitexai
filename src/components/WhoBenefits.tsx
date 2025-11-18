import { motion } from "framer-motion";

const benefitGroups = [
  {
    title: "Founding & Startup Leaders",
    items: [
      "Need to prove an idea fast—fundraising, advisors, or internal buy-in",
      "Facing unclear edges, too many unknowns to hire full-time yet",
      "Want weekly shipping cadence without a 6-month hiring process",
    ],
  },
  {
    title: "Educators & Researchers",
    items: [
      "Running short pilot cycles: classroom projects, semester-based sprints",
      "Need functional prototypes for grant proposals or stakeholder demos",
      "Building educational tools, campus analytics, or research dashboards",
    ],
  },
  {
    title: "Climate & Energy Teams",
    items: [
      "Turning messy meter data, GHG reports, or site audits into dashboards",
      "Building internal tools to track savings, pilot performance, or compliance",
      "Need rapid experimentation with policy pilots or climate-focused MVPs",
    ],
  },
  {
    title: "Policy & Civic Innovation",
    items: [
      "Running government pilots, local innovation sprints, or civic tech experiments",
      "Navigating political timelines, budget cycles, or public accountability",
      "Need clear evidence of what works before scaling city-wide or region-wide",
    ],
  },
];

export function WhoBenefits() {
  return (
    <section id="benefits" className="border-t border-slate-900/80 py-10 md:py-16">
      <div className="mx-auto w-full max-w-5xl px-4 md:px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          viewport={{ once: true }} 
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
            Who Benefits Most?
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground md:text-base">
            This model works best for teams that need <span className="text-primary font-medium">fast, real pilots</span> with 
            <span className="text-primary font-medium"> concrete weekly progress</span>—not endless planning cycles.
          </p>
        </motion.div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {benefitGroups.map((group, groupIndex) => (
            <motion.div 
              key={group.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: groupIndex * 0.1 }}
              className="rounded-2xl border border-slate-800/70 bg-slate-950/50 p-4"
            >
              <h3 className="text-sm font-semibold text-primary">
                {group.title}
              </h3>
              <ul className="mt-3 space-y-2 text-sm text-slate-300">
                {group.items.map((item, itemIndex) => (
                  <li key={itemIndex} className="flex items-start gap-2">
                    <span className="text-primary mt-0.5 flex-shrink-0">→</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
