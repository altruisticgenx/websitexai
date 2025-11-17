"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

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
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative h-[400px] w-full md:h-[500px]">
      {activeCards.map((card, index) => {
        return (
          <motion.div
            key={card.id}
            className={cn(
              "absolute inset-0 mx-auto flex w-full max-w-xl flex-col justify-between rounded-3xl border border-slate-800/80 bg-slate-900/80 p-6 shadow-xl backdrop-blur-sm md:p-8",
              card.className
            )}
            style={{
              transformOrigin: "top center",
            }}
            animate={{
              top: index * -offset,
              scale: 1 - index * scaleFactor,
              zIndex: cards.length - index,
              opacity: index < 3 ? 1 : 0,
            }}
            transition={{
              duration: 0.5,
              ease: "easeInOut",
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
      name: "Sarah Chen",
      role: "Director of Facilities",
      company: "State University System",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
      content:
        "The energy analytics dashboard identified $180k in savings opportunities we had no visibility into. What used to take weeks of manual analysis now happens in minutes. Game-changer for our sustainability goals.",
    },
    {
      id: 2,
      name: "Marcus Thompson",
      role: "Founder & CEO",
      company: "GrowthPilot AI",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Marcus",
      content:
        "From scattered prototype to production-ready in 6 weeks. The AI copilot cut our sales cycle by 40% and our team actually uses it daily. No fluff, just working software that solves real problems.",
    },
    {
      id: 3,
      name: "Dr. Aisha Patel",
      role: "Program Director",
      company: "Education Impact Fund",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Aisha",
      content:
        "We secured $500k in renewed funding because we finally had clear outcome data. The pilot portal transformed weeks of spreadsheet chaos into 2-hour reports. Our board was genuinely impressed.",
    },
    {
      id: 4,
      name: "James Rivera",
      role: "Solo Founder",
      company: "Clarity Consulting",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=James",
      content:
        "Consolidated 5 tools into one calm interface. I save 4+ hours every week on admin work and can focus on client delivery. It's exactly what I needed—nothing more, nothing less.",
    },
  ];

  const cards = testimonials.map((testimonial) => ({
    id: testimonial.id,
    content: (
      <div className="flex h-full flex-col justify-between">
        <div>
          <p className="text-sm leading-relaxed text-slate-200 md:text-base">
            "{testimonial.content}"
          </p>
        </div>
        <div className="mt-6 flex items-center gap-4">
          <Avatar className="h-12 w-12 border-2 border-emerald-400/20">
            <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
            <AvatarFallback className="bg-emerald-400/10 text-emerald-300">
              {testimonial.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div>
            <div className="font-medium text-slate-50">{testimonial.name}</div>
            <div className="text-xs text-slate-400">
              {testimonial.role} · {testimonial.company}
            </div>
          </div>
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
