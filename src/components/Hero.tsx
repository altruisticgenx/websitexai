import React from "react";
import { motion } from "framer-motion";
import { Linkedin } from "lucide-react";

function VisualRow({
  label,
  title,
  body,
}: {
  label: string;
  title: string;
  body: string;
}) {
  return (
    <div className="flex gap-3 rounded-2xl border border-slate-800/80 bg-slate-950/40 p-3 hover:border-primary/20 transition-colors">
      <div className="mt-0.5 w-14 flex-shrink-0 text-xs font-mono uppercase tracking-[0.16em] text-primary">
        {label}
      </div>
      <div>
        <div className="text-sm font-medium text-foreground">{title}</div>
        <div className="mt-1 text-xs text-muted-foreground">{body}</div>
      </div>
    </div>
  );
}

export function Hero() {
  return (
    <section id="home" className="py-10 md:py-16">
      <div className="mx-auto flex w-full max-w-5xl flex-col items-center gap-10 px-4 md:flex-row md:px-6">
        {/* Left: Text Content (60%) */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }} 
          animate={{ opacity: 1, x: 0 }} 
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex-1"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            <span className="inline-flex h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
            Ship pilot-ready AI tech
          </div>

          <h1 className="mt-4 font-itim text-4xl font-semibold tracking-tight md:text-5xl">
            Build, Learn, Lead—on Your Terms
          </h1>

          <p className="mt-4 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
            Are you a student, teacher, founder, B2B team, or changemaker in energy, education, or governance? 
            Skip the slow hiring process and unlock <span className="text-primary font-medium">senior AI/product execution</span>—in focused pilots, shipped week by week.
          </p>

          <dl className="mt-6 grid max-w-xl grid-cols-1 gap-4 sm:grid-cols-3">
            <motion.div 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ delay: 0.4 }} 
              className="rounded-2xl border border-slate-800/70 bg-slate-900/70 p-3 hover:border-primary/30 transition-colors"
            >
              <dt className="text-xs uppercase tracking-[0.16em] text-slate-400">
                Work hands-on
              </dt>
              <dd className="mt-1 text-sm font-medium text-foreground">
                Build with real tools and ship working prototypes.
              </dd>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ delay: 0.5 }} 
              className="rounded-2xl border border-slate-800/70 bg-slate-900/70 p-3 hover:border-primary/30 transition-colors"
            >
              <dt className="text-xs uppercase tracking-[0.16em] text-slate-400">
                Launch actionable tools
              </dt>
              <dd className="mt-1 text-sm font-medium text-foreground">
                Deploy features users can actually test and use.
              </dd>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ delay: 0.6 }} 
              className="rounded-2xl border border-slate-800/70 bg-slate-900/70 p-3 hover:border-primary/30 transition-colors"
            >
              <dt className="text-xs uppercase tracking-[0.16em] text-slate-400">
                Start small, deliver early
              </dt>
              <dd className="mt-1 text-sm font-medium text-foreground">
                First meaningful code in Week 1, ready to demo.
              </dd>
            </motion.div>
          </dl>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
            <a 
              href="https://www.linkedin.com/in/ik11" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="inline-flex items-center justify-center gap-2 rounded-full border border-primary/60 bg-primary/10 px-5 py-2.5 text-sm font-medium text-primary hover:bg-primary/20 transition-colors"
            >
              <Linkedin size={16} />
              Connect on LinkedIn
            </a>
          </div>
        </motion.div>

        {/* Right: Visual Block (40%) */}
        <motion.div 
          initial={{ opacity: 0, x: 30 }} 
          animate={{ opacity: 1, x: 0 }} 
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex-1"
        >
          <div className="rounded-3xl border border-slate-800/80 bg-slate-900/60 p-4 sm:p-5">
            <div className="text-xs font-mono uppercase tracking-[0.16em] text-slate-400">
              Build Fast Kit / 4-week pilot
            </div>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              One senior engineer. One small backlog. 4 weeks to prove whether this pilot is worth scaling.
            </p>
            <div className="mt-4 grid gap-3">
              <VisualRow 
                label="Week 1" 
                title="Clarify & ship the first slice" 
                body="Turn the idea into 1–2 concrete flows. Ship a working skeleton instead of a deck." 
              />
              <VisualRow 
                label="Week 2–3" 
                title="Tighten the flows" 
                body="Integrate data, refine UX, and make it demo-able to internal stakeholders." 
              />
              <VisualRow 
                label="Week 4" 
                title="Decide with evidence" 
                body="You walk away with a working repo, a clear walkthrough, and a decision: scale, pivot, or park." 
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
