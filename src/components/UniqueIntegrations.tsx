import React from "react";
import { motion } from "framer-motion";
import { Brain, Database, Pencil, Users, Mic, Target, Zap, Shield } from "lucide-react";

const integrations = [
  {
    id: "adaptive-curriculum",
    title: "AI-Powered Adaptive Curriculum",
    description: "Generative AI analyzes local challenges to customize project-based curriculum—marine conservation for coastal areas, civics for policy-minded students",
    icon: Brain,
    tag: "Education",
  },
  {
    id: "data-pipelines",
    title: "Open-Source, Self-Healing Data Pipelines",
    description: "AI automates schema mapping and corrects integration failures for energy dashboards, student portals, and governance tracking—no constant IT fixes needed",
    icon: Database,
    tag: "Infrastructure",
  },
  {
    id: "prototyping",
    title: "Prototyping from Sketch or Brief",
    description: "AI-infused design tools instantly convert student or teacher sketches into working prototypes using Figma plugins and generative design",
    icon: Pencil,
    tag: "Design",
  },
  {
    id: "civic-simulations",
    title: "Virtual Civic Engagement Simulations",
    description: "AI-powered role-playing for government, decision-making boards, and policy debates—tailored to real local challenges in each city or country",
    icon: Users,
    tag: "Civic",
  },
  {
    id: "voice-interfaces",
    title: "Voice and Conversational Interfaces",
    description: "Smart voice agents for energy monitoring, classroom Q&A, compliance training—making complex tools accessible to all ages and backgrounds",
    icon: Mic,
    tag: "Accessibility",
  },
  {
    id: "roadmapping",
    title: "AI-Driven Operational Roadmapping",
    description: "AI analyzes feedback and behaviors to suggest which student projects, civic features, or energy optimizations to develop next",
    icon: Target,
    tag: "Strategy",
  },
  {
    id: "simulation",
    title: "Rapid Simulation & Engineering Iteration",
    description: "AI modeling accelerates testing for energy systems, environmental models, and civic projects—students and teams iterate without expensive physical prototypes",
    icon: Zap,
    tag: "Engineering",
  },
  {
    id: "compliance",
    title: "Compliance and Governance Integration",
    description: "AI checks compliance against policy, energy, or EdTech standards during prototyping—teachers, founders, and governance bodies avoid regulatory surprises",
    icon: Shield,
    tag: "Governance",
  },
];

export function UniqueIntegrations() {
  return (
    <section className="py-10 sm:py-14">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <h2 className="text-2xl font-semibold sm:text-3xl">
          Unique AI Integrations for Modern Teams
        </h2>
        <p className="mt-3 max-w-3xl text-base text-slate-300">
          These integrations unlock rapid experimentation, simplify back-end complexity, and bring new voices into 
          the product process—students, educators, engineers, civic leaders—all benefiting from tangible, 
          interactive, and adaptive AI-powered tools.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {integrations.map((integration, index) => {
          const Icon = integration.icon;
          return (
            <motion.article
              key={integration.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className="group rounded-2xl border border-slate-800/70 bg-slate-900/60 p-5 hover:border-emerald-400/30 transition-all hover:-translate-y-1"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="rounded-xl bg-emerald-400/10 p-2.5">
                  <Icon className="h-5 w-5 text-emerald-300" />
                </div>
                <span className="rounded-full border border-slate-700/80 bg-slate-800/50 px-2.5 py-0.5 text-[10px] uppercase tracking-wider text-slate-400">
                  {integration.tag}
                </span>
              </div>
              <h3 className="mt-4 text-base font-semibold text-slate-50">
                {integration.title}
              </h3>
              <p className="mt-2 text-sm text-slate-300 leading-relaxed">
                {integration.description}
              </p>
            </motion.article>
          );
        })}
      </div>
    </section>
  );
}
