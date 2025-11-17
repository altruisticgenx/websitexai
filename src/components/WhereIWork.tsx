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
    <section className="border-t border-slate-900/80 py-10 sm:py-14">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl"
      >
        <h2 className="text-xl font-semibold sm:text-2xl">Where I Work</h2>
        <p className="mt-2 text-sm text-slate-300">
          Geographic focus areas for pilots, campus work, and civic innovation.
        </p>
      </motion.div>

      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        {locations.map((loc, index) => {
          const Icon = loc.icon;
          return (
            <motion.div
              key={loc.location}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="rounded-2xl border border-slate-800/70 bg-slate-950/50 p-4 hover:border-primary/30 transition-colors"
            >
              <Icon className="h-6 w-6 text-primary mb-3" />
              <h3 className="text-sm font-semibold text-slate-50">
                {loc.location}
              </h3>
              <p className="mt-2 text-xs text-slate-300">{loc.details}</p>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
