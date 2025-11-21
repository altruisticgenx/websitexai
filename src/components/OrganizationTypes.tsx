import { memo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GraduationCap, Zap, Building2, Rocket, LucideIcon, ChevronDown } from "lucide-react";
interface OrgType {
  icon: LucideIcon;
  name: string;
  color: string;
  description: string;
  gradient: string;
}
const orgTypes: OrgType[] = [{
  icon: GraduationCap,
  name: "Higher Ed Campuses",
  color: "text-emerald-400",
  gradient: "from-emerald-500/10 via-emerald-500/5 to-transparent",
  description: "Campuses get a **living lab**, not another abstract civics assignment. We turn one course, honors cohort, or \"innovation\" seminar into a structured 4–8 week sprint where students interrogate real campus data, real state bills, and real pilots (AI, energy, tutoring). The payoff: grant-ready stories, concrete evidence for leadership, and students who can talk about systems and tradeoffs without blowing up the room."
}, {
  icon: Zap,
  name: "Energy & Climate Orgs",
  color: "text-cyan-400",
  gradient: "from-cyan-500/10 via-cyan-500/5 to-transparent",
  description: "For energy and climate groups, this is a **translation engine** between technical campaigns and local reality. We help you anchor your work (solar, V2G, building retrofits) in the daily pain points of schools and communities—buses that don't run, bills that spike, kids with asthma—and co-write proposals with students and educators. The result is quieter, more persuasive messaging that can land in rural and urban districts without sounding like a culture-war trigger."
}, {
  icon: Building2,
  name: "Civic Coalitions",
  color: "text-purple-400",
  gradient: "from-purple-500/10 via-purple-500/5 to-transparent",
  description: "Coalitions are often rich in passion but poor in **shared structure**. We give them a common map: which bills are stuck, which committees matter, where issues intersect (attendance, housing, energy, safety). Then we run short labs that help members rewrite divisive talking points, agree on a small set of metrics, and walk into town halls or legislator meetings with one coherent story instead of six competing narratives."
}, {
  icon: Rocket,
  name: "Impact Startups (1–50 people)",
  color: "text-orange-400",
  gradient: "from-orange-500/10 via-orange-500/5 to-transparent",
  description: "Early-stage teams don't need another \"framework\"; they need a **reality check that doesn't kill the vision**. We sit their product next to actual policy constraints, funding streams, and pilot opportunities in one or two regions, then co-design a simple playbook: where to pilot, who to partner with, and how to talk about tradeoffs honestly. Founders come out with fewer buzzwords, tighter partner briefs, and a roadmap that makes sense to schools, cities, or agencies—not just investors."
}] as const;
export const OrganizationTypes = memo(() => {
  const [expandedOrg, setExpandedOrg] = useState<string | null>(null);
  const toggleOrg = (orgName: string) => {
    setExpandedOrg(expandedOrg === orgName ? null : orgName);
  };
  return <section id="org-types" className="py-6 sm:py-8">
      <motion.div initial={{
      opacity: 0,
      y: 20
    }} whileInView={{
      opacity: 1,
      y: 0
    }} viewport={{
      once: true
    }} transition={{
      duration: 0.5
    }} className="max-w-4xl">
        <h2 className="text-lg font-semibold sm:text-xl lg:text-2xl">
          Organization Types
        </h2>
        
      </motion.div>

      <div className="mt-4 grid grid-cols-1 gap-2.5 sm:grid-cols-2 lg:grid-cols-4">
        {orgTypes.map((org, index) => {
        const Icon = org.icon;
        const isExpanded = expandedOrg === org.name;
        return <motion.div key={org.name} initial={{
          opacity: 0,
          scale: 0.95
        }} whileInView={{
          opacity: 1,
          scale: 1
        }} viewport={{
          once: true
        }} transition={{
          duration: 0.5,
          delay: index * 0.1
        }} className="relative">
              <motion.button onClick={() => toggleOrg(org.name)} whileHover={{
            y: -4,
            scale: 1.02
          }} whileTap={{
            scale: 0.98
          }} className={`group w-full rounded-xl border transition-all duration-300 cursor-pointer ${isExpanded ? 'border-primary/50 bg-gradient-to-br ' + org.gradient : 'border-border bg-gradient-to-br from-card/60 to-card/30'} p-3 text-center`}>
                <motion.div animate={{
              scale: isExpanded ? 1.1 : 1,
              rotate: isExpanded ? -5 : 0
            }} transition={{
              type: "spring",
              stiffness: 300,
              damping: 15
            }}>
                  <Icon className={`mx-auto mb-2 h-5 w-5 transition-colors duration-300 ${org.color}`} />
                </motion.div>
                <h3 className={`body-xs font-medium transition-colors ${isExpanded ? org.color : 'text-foreground group-hover:text-primary'}`}>
                  {org.name}
                </h3>
                <ChevronDown className={`mx-auto mt-1 h-3 w-3 transition-transform duration-300 ${isExpanded ? 'rotate-180 ' + org.color : 'text-muted-foreground'}`} />
              </motion.button>

              <AnimatePresence>
                {isExpanded && <motion.div initial={{
              opacity: 0,
              height: 0,
              y: -10
            }} animate={{
              opacity: 1,
              height: "auto",
              y: 0
            }} exit={{
              opacity: 0,
              height: 0,
              y: -10
            }} transition={{
              duration: 0.3
            }} className="absolute left-0 right-0 top-full z-50 mt-2">
                    <div className={`rounded-xl border border-border/50 bg-background/95 backdrop-blur-sm p-3 shadow-xl ${'bg-gradient-to-br ' + org.gradient}`}>
                      <p className="caption leading-relaxed text-muted-foreground">
                        {org.description.split('**').map((part, i) => i % 2 === 1 ? <strong key={i} className="font-semibold text-foreground">{part}</strong> : <span key={i}>{part}</span>)}
                      </p>
                    </div>
                  </motion.div>}
              </AnimatePresence>
            </motion.div>;
      })}
      </div>
    </section>;
});
OrganizationTypes.displayName = 'OrganizationTypes';