"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface Card {
  id: number;
  content: React.ReactNode;
  className?: string;
}

export const AnimatedCardsStack = ({
  cards,
  offset = 10,
  scaleFactor = 0.06,
}: {
  cards: Card[];
  offset?: number;
  scaleFactor?: number;
}) => {
  const [activeCards, setActiveCards] = useState<Card[]>(cards);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveCards((prev) => {
        const newArray = [...prev];
        newArray.unshift(newArray.pop()!);
        return newArray;
      });
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative h-[280px] w-full md:h-[320px]">
      {activeCards.map((card, index) => {
        return (
          <motion.div
            key={card.id}
            className={cn(
              "absolute inset-0 mx-auto flex w-full max-w-lg flex-col justify-between rounded-2xl border border-slate-800/80 bg-slate-900/80 p-4 shadow-lg backdrop-blur-sm md:p-5",
              card.className
            )}
            style={{
              transformOrigin: "top center",
            }}
        animate={{
          top: index * -offset,
          scale: 1 - index * scaleFactor,
          zIndex: cards.length - index,
          opacity: index === 0 ? 1 : index === 1 ? 0.8 : index === 2 ? 0.4 : 0,
        }}
        transition={{
          duration: 0.5,
          ease: [0.4, 0, 0.2, 1],
          opacity: { duration: 0.6 },
        }}
          >
            {card.content}
          </motion.div>
        );
      })}
    </div>
  );
};

// Testimonials Variant
export const TestimonialsVariant = () => {
  const testimonials = [
    {
      id: 1,
      content: "Dashboard uncovered $180k in hidden savings. Weeks of analysis now take minutes.",
      color: "from-emerald-500/20 to-teal-500/20",
      borderColor: "border-emerald-400/40",
    },
    {
      id: 2,
      content: "Prototype to production in 6 weeks. Cut sales cycle by 40%. Team uses it daily.",
      color: "from-blue-500/20 to-cyan-500/20",
      borderColor: "border-blue-400/40",
    },
    {
      id: 3,
      content: "Secured $500k renewal with clear data. Spreadsheet chaos → 2-hour reports.",
      color: "from-violet-500/20 to-purple-500/20",
      borderColor: "border-violet-400/40",
    },
    {
      id: 4,
      content: "5 tools → 1 calm interface. Save 4+ hours weekly on admin work.",
      color: "from-amber-500/20 to-orange-500/20",
      borderColor: "border-amber-400/40",
    },
    {
      id: 5,
      content: "Pilot proved value in 3 weeks. Got board approval to scale immediately.",
      color: "from-rose-500/20 to-pink-500/20",
      borderColor: "border-rose-400/40",
    },
    {
      id: 6,
      content: "Finally have visibility into energy usage. Identified patterns we never knew existed.",
      color: "from-green-500/20 to-emerald-500/20",
      borderColor: "border-green-400/40",
    },
    {
      id: 7,
      content: "Students actually engaged with the pilot portal. Feedback loops went from weeks to days.",
      color: "from-indigo-500/20 to-blue-500/20",
      borderColor: "border-indigo-400/40",
    },
    {
      id: 8,
      content: "No more scattered tools. One source of truth for the whole ops workflow.",
      color: "from-fuchsia-500/20 to-purple-500/20",
      borderColor: "border-fuchsia-400/40",
    },
    {
      id: 9,
      content: "Async collaboration worked perfectly. Zero meetings, constant progress.",
      color: "from-cyan-500/20 to-teal-500/20",
      borderColor: "border-cyan-400/40",
    },
    {
      id: 10,
      content: "Built exactly what we needed—nothing more, nothing less. Perfect scope.",
      color: "from-lime-500/20 to-green-500/20",
      borderColor: "border-lime-400/40",
    },
    {
      id: 11,
      content: "Week 1 deliverable was already usable. Showed it to stakeholders immediately.",
      color: "from-red-500/20 to-orange-500/20",
      borderColor: "border-red-400/40",
    },
    {
      id: 12,
      content: "Clear decision framework at Week 4. Knew exactly whether to scale or pivot.",
      color: "from-sky-500/20 to-blue-500/20",
      borderColor: "border-sky-400/40",
    },
  ];

  const cards = testimonials.map((testimonial) => ({
    id: testimonial.id,
    className: `bg-gradient-to-br ${testimonial.color} ${testimonial.borderColor}`,
    content: (
      <div className="flex h-full items-center justify-center">
        <p className="text-xs leading-relaxed text-slate-100 md:text-sm">
          "{testimonial.content}"
        </p>
      </div>
    ),
  }));

  return (
    <section className="py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <h2 className="text-2xl font-semibold sm:text-3xl">
            What clients say
          </h2>
          <p className="mt-3 text-sm text-slate-300 sm:text-base">
            Real feedback from energy, education, and founder-backed projects.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <AnimatedCardsStack cards={cards} />
        </motion.div>
      </div>
    </section>
  );
};

// Awards/Recognition Variant
export const AwardsVariant = () => {
  const awards = [
    {
      id: 1,
      title: "Energy Efficiency Award",
      organization: "Higher Education Sustainability Council",
      year: "2024",
      description:
        "Recognized for innovative energy analytics platform that identified $180k+ in savings opportunities across 200+ buildings.",
    },
    {
      id: 2,
      title: "EdTech Innovation Grant",
      organization: "National Education Foundation",
      year: "2023",
      description:
        "Awarded for pilot management system that improved outcome tracking and enabled data-driven program decisions.",
    },
    {
      id: 3,
      title: "Climate Tech Builder",
      organization: "Cleantech Accelerator",
      year: "2024",
      description:
        "Selected for impact-driven approach to building tools that help organizations reduce carbon footprint through better data.",
    },
  ];

  const cards = awards.map((award) => ({
    id: award.id,
    content: (
      <div className="flex h-full flex-col justify-between">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-xs font-medium text-emerald-300">
            {award.year}
          </div>
          <h3 className="mt-4 text-xl font-semibold text-slate-50">
            {award.title}
          </h3>
          <p className="mt-2 text-sm text-slate-400">{award.organization}</p>
          <p className="mt-4 text-sm leading-relaxed text-slate-300">
            {award.description}
          </p>
        </div>
      </div>
    ),
  }));

  return (
    <section className="py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <h2 className="text-2xl font-semibold sm:text-3xl">
            Recognition & Awards
          </h2>
          <p className="mt-3 text-sm text-slate-300 sm:text-base">
            Acknowledged for impact-driven work in energy, education, and climate tech.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <AnimatedCardsStack cards={cards} />
        </motion.div>
      </div>
    </section>
  );
};

// Stats/Metrics Variant
export const MetricsVariant = () => {
  const metrics = [
    {
      id: 1,
      title: "Client Retention",
      value: "100%",
      description:
        "Every pilot client has continued to the next phase or recommended us to their network.",
      context: "Based on 12+ projects across energy, education, and civic sectors",
    },
    {
      id: 2,
      title: "Time to First Value",
      value: "1 week",
      description:
        "First meaningful deliverable shipped in Week 1. No 3-month discovery phases.",
      context: "Average across all pilot projects since 2023",
    },
    {
      id: 3,
      title: "Cost Savings Identified",
      value: "$500k+",
      description:
        "Total operational savings surfaced through energy analytics and process optimization tools.",
      context: "Cumulative impact across campus and enterprise clients",
    },
  ];

  const cards = metrics.map((metric) => ({
    id: metric.id,
    content: (
      <div className="flex h-full flex-col justify-between">
        <div>
          <div className="text-xs uppercase tracking-[0.16em] text-slate-400">
            {metric.title}
          </div>
          <div className="mt-3 text-5xl font-bold text-emerald-300 md:text-6xl">
            {metric.value}
          </div>
          <p className="mt-4 text-base leading-relaxed text-slate-200">
            {metric.description}
          </p>
        </div>
        <div className="mt-6 rounded-xl border border-slate-800/60 bg-slate-950/60 p-3">
          <p className="text-xs text-slate-400">{metric.context}</p>
        </div>
      </div>
    ),
  }));

  return (
    <section className="py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <h2 className="text-2xl font-semibold sm:text-3xl">
            Track record
          </h2>
          <p className="mt-3 text-sm text-slate-300 sm:text-base">
            Numbers that matter from real pilot projects.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <AnimatedCardsStack cards={cards} />
        </motion.div>
      </div>
    </section>
  );
};

// Case Studies Variant (6-second rotation)
export const CaseStudiesStack = ({
  caseStudies,
}: {
  caseStudies: Array<{
    id: string;
    title: string;
    sector: string;
    summary: string;
    tag: string;
  }>;
}) => {
  const [activeCards, setActiveCards] = useState(caseStudies);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveCards((prev) => {
        const newArray = [...prev];
        newArray.unshift(newArray.pop()!);
        return newArray;
      });
    }, 6000); // 6-second rotation for case studies

    return () => clearInterval(interval);
  }, []);

  const cards = activeCards.map((study) => ({
    id: study.id,
    content: (
      <div className="flex h-full flex-col justify-between p-1">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-400/30 bg-blue-400/10 px-3 py-1 text-xs font-medium text-blue-300">
            {study.sector}
          </div>
          <h3 className="mt-4 text-lg font-semibold text-slate-50 md:text-xl">
            {study.title}
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-slate-300">
            {study.summary}
          </p>
        </div>
        <div className="mt-4 flex items-center justify-between border-t border-slate-800/60 pt-3">
          <span className="rounded-full bg-slate-800/60 px-3 py-1 text-xs text-slate-300">
            {study.tag}
          </span>
          <span className="text-xs text-slate-500">
            View case study →
          </span>
        </div>
      </div>
    ),
  }));

  return (
    <div className="relative h-[320px] w-full md:h-[360px]">
      {cards.map((card, index) => {
        return (
          <motion.div
            key={card.id}
            className="absolute inset-0 mx-auto flex w-full max-w-lg flex-col justify-between rounded-3xl border border-blue-400/20 bg-gradient-to-br from-slate-900/90 to-slate-950/90 p-5 shadow-xl backdrop-blur-sm md:p-6"
            style={{
              transformOrigin: "top center",
            }}
            animate={{
              top: index * -12,
              scale: 1 - index * 0.05,
              zIndex: cards.length - index,
              opacity: index === 0 ? 1 : index === 1 ? 0.7 : index === 2 ? 0.35 : 0,
            }}
            transition={{
              duration: 0.7,
              ease: [0.32, 0.72, 0, 1],
              opacity: { duration: 0.8 },
            }}
          >
            {card.content}
          </motion.div>
        );
      })}
    </div>
  );
};
