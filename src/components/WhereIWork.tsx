import React from "react";
import { motion } from "framer-motion";
import { MapPin, Building2, GraduationCap } from "lucide-react";

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
    <section id="where" className="border-t border-slate-900/80 py-6 sm:py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl"
      >
        <h2 className="heading-4">Where I Work</h2>
        <p className="mt-1.5 body-sm text-muted-foreground">
          Geographic focus for pilots, campus work, and civic innovation:
        </p>
      </motion.div>

      <div className="mt-4 grid gap-2.5 sm:grid-cols-3">
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
                boxShadow: "0 15px 20px -5px rgba(16, 185, 129, 0.15)",
                borderColor: "rgba(16, 185, 129, 0.3)"
              }}
              className="group rounded-xl border border-slate-800/70 bg-gradient-to-br from-slate-950/50 to-slate-900/30 p-3 transition-all duration-300 cursor-default"
            >
              <Icon className="h-4 w-4 text-primary mb-2 group-hover:scale-110 group-hover:text-accent transition-all duration-300" />
              <h3 className="heading-6 text-foreground group-hover:text-primary transition-colors">
                {loc.location}
              </h3>
              <p className="mt-1.5 body-sm text-muted-foreground">{loc.details}</p>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
