import React from "react";
import { motion } from "framer-motion";
import { GraduationCap, Zap, Building2, Rocket } from "lucide-react";

const orgTypes = [
  {
    icon: GraduationCap,
    name: "Higher Ed Campuses",
    color: "text-primary"
  },
  {
    icon: Zap,
    name: "Energy & Climate Orgs",
    color: "text-accent"
  },
  {
    icon: Building2,
    name: "Civic Coalitions",
    color: "text-primary"
  },
  {
    icon: Rocket,
    name: "Impact Startups (1–50 people)",
    color: "text-accent"
  }
];

export function OrganizationTypes() {
  return (
    <section id="org-types" className="py-10 sm:py-14">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl"
      >
        <h2 className="text-xl font-semibold sm:text-2xl">
          Organization Types
        </h2>
        <p className="mt-2 text-sm text-slate-300">
          The kinds of teams and organizations I work with most often.
        </p>
      </motion.div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {orgTypes.map((org, index) => {
          const Icon = org.icon;
          return (
            <motion.div
              key={org.name}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ 
                y: -8,
                boxShadow: "0 20px 25px -5px hsl(var(--primary) / 0.25)",
                borderColor: "hsl(var(--primary) / 0.5)"
              }}
              className="group rounded-2xl border border-slate-800/70 bg-gradient-to-br from-slate-900/60 to-slate-900/30 p-5 text-center transition-all duration-300 cursor-default"
            >
              <Icon className={`h-8 w-8 mx-auto mb-3 ${org.color} group-hover:scale-110 transition-transform duration-300`} />
              <h3 className="text-sm font-medium text-slate-50 group-hover:text-primary transition-colors">{org.name}</h3>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
