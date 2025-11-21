import { motion } from "framer-motion";
import { Building2, GraduationCap, Lightbulb, Users } from "lucide-react";
export function SocialProof() {
  const proofItems = [{
    icon: GraduationCap,
    label: "Education nonprofits"
  }, {
    icon: Lightbulb,
    label: "Energy teams"
  }, {
    icon: Building2,
    label: "Civic operations"
  }, {
    icon: Users,
    label: "Founder-backed startups"
  }];
  return <section className="py-8 border-b border-border/40">
      <div className="mx-auto max-w-5xl px-3 sm:px-4">
        <motion.div initial={{
        opacity: 0,
        y: 20
      }} whileInView={{
        opacity: 1,
        y: 0
      }} viewport={{
        once: true
      }} transition={{
        duration: 0.4
      }} className="text-center">
          
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {proofItems.map((item, index) => {
            const Icon = item.icon;
            return <motion.div key={item.label} initial={{
              opacity: 0,
              scale: 0.9
            }} whileInView={{
              opacity: 1,
              scale: 1
            }} viewport={{
              once: true
            }} transition={{
              duration: 0.3,
              delay: index * 0.1
            }} className="flex flex-col items-center gap-2 rounded-lg border border-border/50 bg-card/30 backdrop-blur-sm p-3 hover:border-primary/30 hover:bg-card/50 transition-all">
                  <Icon className="h-5 w-5 text-primary" />
                  <span className="body-xs text-center text-muted-foreground">{item.label}</span>
                </motion.div>;
          })}
          </div>
        </motion.div>
      </div>
    </section>;
}