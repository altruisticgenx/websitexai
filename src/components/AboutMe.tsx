import React from "react";
import { motion } from "framer-motion";

export const AboutMe: React.FC = React.memo(() => {
  return (
    <section id="about" className="relative border-t border-slate-900/80 py-10 lg:py-16">
      <div className="mx-auto w-full max-w-5xl px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="heading-3 text-foreground mb-6"
        >
          About Me
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="body-base text-muted-foreground space-y-5"
        >
          <motion.p
            whileHover={{ x: 4 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            I'm a founder and product engineer with two decades of experience helping teams ship
            mission-critical software, from{" "}
            <span className="font-semibold text-foreground">
              early-stage startups to non-profits and government organizations
            </span>
            .
          </motion.p>

          <motion.p
            whileHover={{ x: 4 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            My work focuses on getting to a{" "}
            <span className="font-semibold text-primary">demo-ready artifact</span> as quickly as
            possible—eliminating technical ambiguity and validating the core idea before committing
            to long-term hiring or large-scale build-outs.
          </motion.p>

          <motion.p
            whileHover={{ x: 4 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            If your problem involves complex data, AI/ML integration, or highly technical domains
            (like climate, energy, or civic tech), let's talk about running a{" "}
            <span className="font-semibold text-foreground">4-week pilot</span>.
          </motion.p>
        </motion.div>

        {/* Call to action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-8"
        >
          <motion.a
            href="mailto:hello@altruisticxai.com?subject=4-week%20pilot%20inquiry"
            whileHover={{
              scale: 1.02,
              boxShadow: "0 8px 30px rgba(var(--primary), 0.3)",
            }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center gap-2 rounded-xl bg-primary/10 border border-primary/30 px-6 py-3 text-sm font-medium text-primary hover:bg-primary/20 transition-colors"
          >
            <span>Start a conversation</span>
            <span className="text-base">→</span>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
});

AboutMe.displayName = "AboutMe";
