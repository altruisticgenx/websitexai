import React from "react";
import { motion } from "framer-motion";

export function AboutSection() {
  return (
    <section id="about" className="border-t border-slate-900/80 py-10 sm:py-14">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto"
      >
        <div className="text-xs font-mono uppercase tracking-[0.18em] text-slate-400 mb-3">
          About
        </div>
        <h2 className="text-xl font-semibold sm:text-2xl mb-4">
          Who is AltruisticX AI?
        </h2>
        <div className="rounded-3xl border border-slate-800/80 bg-slate-950/60 p-6 sm:p-8">
          <p className="text-sm text-slate-300 leading-relaxed sm:text-base">
            AltruisticX AI is a one-person product lab. I design and ship AI pilots for universities, 
            local governments, and mission-driven orgs—focused on energy, education, and civic impact. 
            Not an agency, not a SaaS subscription, just hands-on builds in 4-week sprints.
          </p>
          <div className="mt-6 pt-6 border-t border-slate-800/50">
            <p className="text-xs text-slate-400">
              <strong className="text-slate-300">Clarification:</strong> AltruisticX AI is distinct from 
              other "altruistic" brands. We're a solo product engineer specializing in pilots for impact-driven 
              teams in higher education, energy, and civic sectors.
            </p>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
