import React from "react";
import { motion } from "framer-motion";
import { Section } from "@/components/utilities/Section";
import { Stack } from "@/components/layout/Stack";
import { ParallaxBackground } from "@/components/effects/ParallaxBackground";

export const AboutMe: React.FC = React.memo(() => {
  return (
    <Section id="about" spacing="normal" border="top">
      <ParallaxBackground
        speed={0.6}
        gradient="from-primary/6 via-secondary/8 to-accent/6"
        meshVariant="mixed"
        meshIntensity="subtle"
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,hsl(var(--primary)/0.12),transparent_60%)]" />
      </ParallaxBackground>

      <Stack gap="xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="heading-3 text-foreground">About Me</h2>
          <motion.p
            className="body-lg max-w-2xl text-muted-foreground mt-3"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            I aim to close the gap between proven innovations and implementation by giving anyone the tools to turn
            regional data, successful pilots, and stalled legislation into AI-assisted solutions for any sector.
          </motion.p>
        </motion.div>

        <motion.div
          className="relative"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <article className="relative overflow-hidden rounded-xl border border-slate-800/70 bg-gradient-to-br from-slate-950/95 via-slate-900/95 to-slate-950/95 p-5 shadow-2xl backdrop-blur-xl">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-transparent to-cyan-500/5" />
            <div className="relative z-10">
              <h3 id="why-matters-heading" className="heading-4 text-foreground">
                Why This Matters
              </h3>
              <motion.p
                className="body-sm mt-2 text-muted-foreground"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                Pennsylvania cannot afford another decade of:
              </motion.p>

              <ul className="mt-3 space-y-1.5" role="list" aria-label="Challenges Pennsylvania faces">
                {[
                  "Delayed modernization while comparable states advance",
                  "Legislative gridlock on education and infrastructure",
                  "Workforce development disconnected from regional needs",
                  "Civics education that feels irrelevant to students",
                  "Declining trust in public institutions",
                ].map((t) => (
                  <li key={t} className="body-xs flex items-start gap-2 text-muted-foreground/90">
                    <span className="mt-1 inline-block h-1 w-1 flex-shrink-0 rounded-full bg-emerald-400/70" />
                    <span className="flex-1">{t}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-5 border-t border-slate-800/50 pt-4">
                <p className="body-base font-medium leading-relaxed text-foreground">
                  This work provides the missing infrastructure for a state with all the necessary components but no
                  system connecting them.
                </p>
              </div>
            </div>
          </article>
        </motion.div>
      </Stack>
    </Section>
  );
});

AboutMe.displayName = "AboutMe";
