import { motion } from "framer-motion";

export function PilotOffer() {
  return (
    <section id="pilot" className="border-t border-slate-900/80 py-10 md:py-16">
      <div className="mx-auto w-full max-w-5xl px-4 md:px-6">
        <div className="grid gap-8 md:grid-cols-[minmax(0,1.3fr),minmax(0,1fr)] md:items-start">
          <motion.div 
            initial={{ opacity: 0, x: -30 }} 
            whileInView={{ opacity: 1, x: 0 }} 
            viewport={{ once: true }} 
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
              Offer: Try a 4-Week Sprint
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground md:text-base">
              Pilot-ready features every week, demoable anywhere. Async collaboration using Loom, Notion, GitHub, Figma—whatever 
              works for your team, classroom, or org. Zero lock-in: All repos, infra, and docs belong to you.
            </p>

            <ul className="mt-4 space-y-2 text-sm text-slate-200">
              <li className="flex items-start gap-2">
                <span className="text-primary mt-0.5">✓</span>
                Pilot-ready features every week, demoable anywhere
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-0.5">✓</span>
                Async collaboration: Use Loom, Notion, GitHub, Figma—whatever works for your team, classroom, or org
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-0.5">✓</span>
                Zero lock-in: All repos, infra, and docs belong to you
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-0.5">✓</span>
                Perfect for fast validation, fundraising, leadership proof, classroom projects
              </li>
            </ul>
            
            <div className="mt-6 rounded-2xl border border-primary/30 bg-primary/5 p-4">
              <h3 className="text-sm font-semibold text-primary">Why experiment?</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                <span className="text-primary font-medium">Show funding-ready progress.</span> Prove your pilot to leadership or advisors 
                with a working product, not a pitch deck. <span className="text-primary font-medium">De-risk complexity.</span> Test the 
                messiest part of your idea before committing large budgets, staffing, or semesters. 
                <span className="text-primary font-medium">Validate market fit.</span> If the pilot works, double down. If it doesn't, 
                pivot or park it—without major regret.
              </p>
            </div>

            <div className="mt-6 flex flex-col gap-3 text-sm sm:flex-row sm:items-center">
              <a
                href="mailto:hello@altruisticxai.com?subject=4-week%20pilot%20-%20AltruisticX%20AI"
                className="inline-flex items-center justify-center rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground shadow-lg shadow-primary/30 hover:bg-primary/90 transition-colors"
              >
                Book a 30-min intro
              </a>
              <p className="text-xs text-slate-400 sm:text-sm">
                Send a quick Loom or doc about your project. If it's a fit, we can start shipping next week.
              </p>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }} 
            whileInView={{ opacity: 1, x: 0 }} 
            viewport={{ once: true }} 
            transition={{ duration: 0.5, delay: 0.2 }} 
            className="rounded-2xl border border-slate-800/70 bg-slate-950/50 p-5"
          >
            <div className="mb-4">
              <h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-primary">
                Ideal Fit
              </h3>
              <p className="mt-2 text-sm text-slate-200">
                Real feedback weekly, ready to experiment, need clear results
              </p>
            </div>
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-slate-400">
                Not a Fit
              </h3>
              <p className="mt-2 text-sm text-slate-400">
                Big static sites, slow-moving teams, no feedback or iteration
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
