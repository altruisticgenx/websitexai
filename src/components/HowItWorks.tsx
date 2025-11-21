import { motion } from "framer-motion";
import { FileText, Rocket, RefreshCw } from "lucide-react";
import { Section } from "./Section";
import { Stack } from "./layout/Stack";
import { Grid } from "./layout/Grid";

export function HowItWorks() {
  const steps = [
    {
      icon: FileText,
      number: "1",
      title: "Send your messy problem",
      description: "Share a Loom, doc, or rough outline. No polish needed."
    },
    {
      icon: Rocket,
      number: "2",
      title: "We ship Week-1 demo",
      description: "First working slice deployed. Demo-able to stakeholders."
    },
    {
      icon: RefreshCw,
      number: "3",
      title: "Iterate weekly → pilot-ready",
      description: "Refine based on real feedback until it's production-ready."
    }
  ];

  return (
    <Section id="how" spacing="normal" border="bottom">
      <Stack gap="lg">
        <header className="max-w-2xl text-center mx-auto">
          <h2 className="heading-3">How it works</h2>
          <p className="body-lg text-muted-foreground mt-2">
            Simple 3-step process from idea to working pilot
          </p>
        </header>

        <Grid columns={{ mobile: 1, tablet: 3, desktop: 3 }} gap="md">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="relative rounded-lg border border-border/60 bg-card/40 backdrop-blur-sm p-6 hover:border-primary/30 hover:bg-card/60 transition-all group"
              >
                {/* Step number badge */}
                <div className="absolute -top-3 left-6 inline-flex h-6 w-6 items-center justify-center rounded-full border-2 border-primary bg-background body-xs font-bold text-primary">
                  {step.number}
                </div>

                {/* Icon */}
                <div className="mt-2 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary group-hover:bg-primary/20 transition-colors">
                  <Icon className="h-6 w-6" />
                </div>

                {/* Content */}
                <h3 className="mt-4 heading-5 text-foreground">{step.title}</h3>
                <p className="mt-2 body-sm text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </motion.div>
            );
          })}
        </Grid>
      </Stack>
    </Section>
  );
}
