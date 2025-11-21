import React, { useMemo } from "react";
import { motion } from "framer-motion";
import { Section } from "@/components/utilities/Section";
import { Stack } from "@/components/layout/Stack";
import { Grid } from "@/components/layout/Grid";
import { ParallaxBackground } from "@/components/effects/ParallaxBackground";

export const WhoBenefits: React.FC = React.memo(() => {
  const audiences = useMemo(
    () => [
      "Students bringing new ideas to life",
      "Teachers or nonprofits piloting campus or impact projects",
      "Boards and governance teams needing clearer dashboards",
      "Solo founders wanting operational peace of mind",
      "B2B units innovating on tight timelines",
    ],
    [],
  );

  return (
    <Section id="benefits" spacing="normal" border="top">
      <ParallaxBackground
        speed={0.55}
        gradient="from-primary/10 via-secondary/8 to-accent/10"
        meshVariant="secondary"
        meshIntensity="medium"
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_20%,hsl(var(--accent)/0.15),transparent_60%)]" />
      </ParallaxBackground>

      <Stack gap="lg">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          <h2 className="heading-3 text-foreground">Who Benefits?</h2>
          <p className="body-base leading-relaxed text-muted-foreground mt-2">
            This model is for anyone who needs{" "}
            <span className="font-medium text-primary">tangible progress without hiring overhead</span>.
          </p>
        </motion.div>

        <Grid columns={{ mobile: 1, tablet: 2, desktop: 2 }} gap="md">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="rounded-xl border border-slate-800/70 bg-slate-950/50 p-5"
          >
            <h3 className="heading-5 mb-4 text-primary">Perfect For</h3>
            <ul className="body-base space-y-3 text-slate-200">
              {audiences.map((aud) => (
                <li key={aud} className="flex items-start gap-2">
                  <span className="mt-0.5 text-primary">✓</span>
                  {aud}
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.15 }}
            className="space-y-6 rounded-xl border border-slate-800/70 bg-slate-950/50 p-5"
          >
            <div>
              <h3 className="heading-5 mb-3 text-primary">Ideal Fit</h3>
              <p className="body-base text-slate-200">Weekly feedback, ready to experiment, need clear results</p>
            </div>
            <div>
              <h3 className="heading-5 mb-3 text-slate-400">Not a Fit</h3>
              <p className="body-base text-slate-400">Big static sites, slow-moving teams, no feedback loop</p>
            </div>
          </motion.div>
        </Grid>
      </Stack>
    </Section>
  );
});

WhoBenefits.displayName = "WhoBenefits";
