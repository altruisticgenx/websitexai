import React from "react";
import { motion } from "framer-motion";
import { MapPin, Building2, GraduationCap } from "lucide-react";
import { Section } from "./Section";
import { Stack } from "./layout/Stack";
import { Grid } from "./layout/Grid";

const locations = [
  {
    icon: MapPin,
    location: "Pennsylvania",
    details: "Philadelphia, Lehigh Valley, State College – campuses, pilots, coalitions"
  },
  {
    icon: Building2,
    location: "Washington, DC",
    details: "Federal/civic tech – grants, advocacy, coalition coordination"
  },
  {
    icon: GraduationCap,
    location: "Boston",
    details: "Higher ed, climate innovation – university, EdTech, energy research"
  }
];

export function WhereIWork() {
  return (
    <Section id="where" spacing="compact" border="top">
      <Stack gap="md">
        <header className="max-w-2xl">
          <h2 className="heading-4">Where I Work</h2>
          <p className="body-sm text-muted-foreground mt-1.5">
            Geographic focus for pilots, campus work, and civic innovation:
          </p>
        </header>

        <Grid columns={{ mobile: 1, tablet: 3, desktop: 3 }} gap="sm">
          {locations.map((loc, index) => {
            const Icon = loc.icon;
            return (
              <motion.div
                key={loc.location}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ 
                  y: -4,
                  boxShadow: "0 15px 20px -5px hsl(var(--primary) / 0.15)",
                  borderColor: "hsl(var(--primary) / 0.3)"
                }}
                className="group rounded-xl border border-slate-800/70 bg-gradient-to-br from-slate-950/50 to-slate-900/30 p-3 transition-all duration-300 cursor-default"
              >
                <Icon className="h-4 w-4 text-primary mb-2 group-hover:scale-110 group-hover:text-accent transition-all duration-300" />
                <h3 className="body-sm font-semibold text-slate-50 group-hover:text-primary transition-colors">
                  {loc.location}
                </h3>
                <p className="mt-1.5 body-xs text-muted-foreground">{loc.details}</p>
              </motion.div>
            );
          })}
        </Grid>
      </Stack>
    </Section>
  );
}
