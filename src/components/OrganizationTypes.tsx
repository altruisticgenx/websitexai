import { memo } from "react";
import { motion } from "framer-motion";
import { GraduationCap, Zap, Building2, Rocket, LucideIcon } from "lucide-react";

interface OrgType {
  icon: LucideIcon;
  name: string;
  color: string;
}

const orgTypes: OrgType[] = [
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
] as const;

export const OrganizationTypes = memo(() => {
  return (
    <section id="org-types" className="py-6 sm:py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl"
      >
        <h2 className="text-base font-semibold sm:text-lg">
          Organization Types
        </h2>
        <p className="mt-1.5 text-[10px] text-muted-foreground sm:text-xs">
          Common teams I work with:
        </p>
      </motion.div>

      <div className="mt-4 grid gap-2.5 sm:grid-cols-2 lg:grid-cols-4">
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
                y: -6,
                scale: 1.03,
                rotate: 1,
                boxShadow: "0 15px 20px -5px hsl(var(--primary) / 0.2)",
                borderColor: "hsl(var(--primary) / 0.5)"
              }}
              className="group rounded-xl border border-border bg-gradient-to-br from-card/60 to-card/30 p-3 text-center transition-all duration-300 cursor-default"
            >
              <motion.div
                whileHover={{ 
                  scale: 1.15,
                  rotate: -3,
                }}
                transition={{ type: "spring", stiffness: 300, damping: 15 }}
              >
                <Icon className={`mx-auto mb-2 h-5 w-5 transition-colors duration-300 ${org.color}`} />
              </motion.div>
              <h3 className="text-[10px] font-medium text-foreground transition-colors group-hover:text-primary sm:text-xs">
                {org.name}
              </h3>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
});

OrganizationTypes.displayName = 'OrganizationTypes';
