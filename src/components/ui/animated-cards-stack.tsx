"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface Card {
  id: number;
  content: React.ReactNode;
  className?: string;
}

// Small hook to detect mobile for animation tuning
const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const mq = window.matchMedia("(max-width: 640px)");

    const handleChange = (e: MediaQueryListEvent) => {
      setIsMobile(e.matches);
    };

    setIsMobile(mq.matches);

    if (mq.addEventListener) {
      mq.addEventListener("change", handleChange);
    } else {
      // Safari < 14 fallback
      // @ts-ignore
      mq.addListener(handleChange);
    }

    return () => {
      if (mq.removeEventListener) {
        mq.removeEventListener("change", handleChange);
      } else {
        // @ts-ignore
        mq.removeListener(handleChange);
      }
    };
  }, []);

  return isMobile;
};

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
  const isMobile = useIsMobile();

  // Softer stacking on mobile
  const cardOffset = isMobile ? offset * 0.6 : offset;
  const cardScaleFactor = isMobile ? scaleFactor * 0.6 : scaleFactor;

  // Show fewer visible "layers" on mobile so nothing gets cramped
  const visibleDepth = isMobile ? 2 : 3;

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
    <div className="relative h-[220px] w-full sm:h-[260px] md:h-[320px]">
      {activeCards.map((card, index) => {
        const isVisible = index <= visibleDepth;

        return (
          <motion.div
            key={card.id}
            className={cn(
              "absolute inset-0 mx-auto flex w-[90%] max-w-md flex-col justify-between rounded-2xl border border-slate-800/80 bg-slate-900/80 p-3 shadow-lg backdrop-blur-sm sm:w-full sm:max-w-lg sm:p-4 md:p-5",
              card.className
            )}
            style={{
              transformOrigin: "top center",
            }}
            animate={{
              top: index * -cardOffset,
              scale: 1 - index * cardScaleFactor,
              zIndex: cards.length - index,
              opacity: index === 0 ? 1 : index === 1 ? 0.85 : index === 2 ? 0.45 : 0,
            }}
            transition={{
              duration: 0.5,
              ease: [0.4, 0, 0.2, 1],
              opacity: { duration: 0.6 },
            }}
          >
            {isVisible && card.content}
          </motion.div>
        );
      })}
    </div>
  );
};

/* ===================== Testimonials Variant ===================== */

export const TestimonialsVariant = () => {
  const testimonials = [
    {
      id: 1,
      content:
        "Dashboard uncovered $180k in hidden savings. Weeks of analysis now take minutes.",
      color: "from-emerald-500/20 to-teal-500/20",
      borderColor: "border-emerald-400/40",
    },
    {
      id: 2,
      content:
        "Prototype to production in 6 weeks. Cut sales cycle by 40%. Team uses it daily.",
      color: "from-blue-500/20 to-cyan-500/20",
      borderColor: "border-blue-400/40",
    },
    {
      id: 3,
      content:
        "Secured $500k renewal with clear data. Spreadsheet chaos → 2-hour reports.",
      color: "from-violet-500/20 to-purple-500/20",
      borderColor: "border-violet-400/40",
    },
    {
      id: 4,
      content:
        "5 tools → 1 calm interface. Save 4+ hours weekly on admin work.",
      color: "from-amber-500/20 to-orange-500/20",
      borderColor: "border-amber-400/40",
    },
    {
      id: 5,
      content:
        "Pilot proved value in 3 weeks. Got board approval to scale immediately.",
      color: "from-rose-500/20 to-pink-500/20",
      borderColor: "border-rose-400/40",
    },
    {
      id: 6,
      content:
        "Finally have visibility into energy usage. Identified patterns we never knew existed.",
      color: "from-green-500/20 to-emerald-500/20",
      borderColor: "border-green-400/40",
    },
    {
      id: 7,
      content:
        "Students actually engaged with the pilot portal. Feedback loops went from weeks to days.",
      color: "from-indigo-500/20 to-blue-500/20",
      borderColor: "border-indigo-400/40",
    },
    {
      id: 8,
      content:
        "No more scattered tools. One source of truth for the whole ops workflow.",
      color: "from-fuchsia-500/20 to-purple-500/20",
      borderColor: "border-fuchsia-400/40",
    },
    {
      id: 9,
      content:
        "Async collaboration worked perfectly. Zero meetings, constant progress.",
      color: "from-cyan-500/20 to-teal-500/20",
      borderColor: "border-cyan-400/40",
    },
    {
      id: 10,
      content:
        "Built exactly what we needed—nothing more, nothing less. Perfect scope.",
      color: "from-lime-500/20 to-green-500/20",
      borderColor: "border-lime-400/40",
    },
    {
      id: 11,
      content:
        "Week 1 deliverable was already usable. Showed it to stakeholders immediately.",
      color: "from-red-500/20 to-orange-500/20",
      borderColor: "border-red-400/40",
    },
    {
      id: 12,
      content:
        "Clear decision framework at Week 4. Knew exactly whether to scale or pivot.",
      color: "from-sky-500/20 to-blue-500/20",
      borderColor: "border-sky-400/40",
    },
  ];

  const cards = testimonials.map((testimonial) => ({
    id: testimonial.id,
    className: `bg-gradient-to-br ${testimonial.color} ${testimonial.borderColor}`,
    content: (
      <div className="flex h-full items-center justify-center">
        <p className="text-[11px] leading-relaxed text-slate-100 sm:text-xs md:text-sm">
          "{testimonial.content}"
        </p>
      </div>
    ),
  }));

  return (
    <section className="py-12 sm:py-16 md:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-8 text-center sm:mb-12"
        >
          <h2 className="text-xl font-semibold sm:text-2xl md:text-3xl">
            What clients say
          </h2>
          <p className="mt-3 text-xs text-slate-300 sm:text-sm md:text-base">
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

/* ===================== Awards Variant ===================== */

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
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-[11px] font-medium text-emerald-300 sm:text-xs">
            {award.year}
          </div>
          <h3 className="mt-4 text-lg font-semibold text-slate-50 sm:text-xl">
            {award.title}
          </h3>
          <p className="mt-2 text-xs text-slate-400 sm:text-sm">
            {award.organization}
          </p>
          <p className="mt-4 text-xs leading-relaxed text-slate-300 sm:text-sm">
            {award.description}
          </p>
        </div>
      </div>
    ),
  }));

  return (
    <section className="py-12 sm:py-16 md:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-8 text-center sm:mb-12"
        >
          <h2 className="text-xl font-semibold sm:text-2xl md:text-3xl">
            Recognition & Awards
          </h2>
          <p className="mt-3 text-xs text-slate-300 sm:text-sm md:text-base">
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

/* ===================== Metrics Variant ===================== */

export const MetricsVariant = () => {
  const metrics = [
    {
      id: 1,
      title: "Client Retention",
      value: "100%",
      description:
        "Every pilot client has continued to the next phase or recommended us to their network.",
      context:
        "Based on 12+ projects across energy, education, and civic sectors",
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
          <div className="text-[10px] uppercase tracking-[0.16em] text-slate-400 sm:text-xs">
            {metric.title}
          </div>
          <div className="mt-3 text-4xl font-bold text-emerald-300 sm:text-5xl md:text-6xl">
            {metric.value}
          </div>
          <p className="mt-4 text-sm leading-relaxed text-slate-200">
            {metric.description}
          </p>
        </div>
        <div className="mt-4 rounded-xl border border-slate-800/60 bg-slate-950/60 p-3">
          <p className="text-[11px] text-slate-400 sm:text-xs">
            {metric.context}
          </p>
        </div>
      </div>
    ),
  }));

  return (
    <section className="py-12 sm:py-16 md:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-8 text-center sm:mb-12"
        >
          <h2 className="text-xl font-semibold sm:text-2xl md:text-3xl">
            Track record
          </h2>
          <p className="mt-3 text-xs text-slate-300 sm:text-sm md:text-base">
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

/* ===================== Case Studies Stack ===================== */

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
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [touchStart, setTouchStart] = useState<{ x: number; y: number } | null>(
    null
  );
  const [isSwiping, setIsSwiping] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isSwiping) {
        setActiveCards((prev) => {
          const newArray = [...prev];
          newArray.unshift(newArray.pop()!);
          return newArray;
        });
      }
    }, 6000);

    return () => clearInterval(interval);
  }, [isSwiping]);

  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    setTouchStart({ x: touch.clientX, y: touch.clientY });
    setIsSwiping(false);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!touchStart) return;
    const touch = e.touches[0];
    const deltaX = Math.abs(touch.clientX - touchStart.x);
    const deltaY = Math.abs(touch.clientY - touchStart.y);

    // If horizontal swipe is more dominant, prevent vertical scroll
    if (deltaX > deltaY && deltaX > 10) {
      e.preventDefault();
      setIsSwiping(true);
    }
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!touchStart) return;
    const touch = e.changedTouches[0];
    const deltaX = touch.clientX - touchStart.x;

    if (Math.abs(deltaX) > 50) {
      setActiveCards((prev) => {
        const newArray = [...prev];
        if (deltaX < 0) {
          newArray.unshift(newArray.pop()!);
        } else {
          newArray.push(newArray.shift()!);
        }
        return newArray;
      });
    }
    setTouchStart(null);
    setTimeout(() => setIsSwiping(false), 100);
  };

  const getCardGradient = (sector: string) => {
    const gradients: Record<string, string> = {
      "Education Nonprofit":
        "from-blue-500/20 via-indigo-500/15 to-violet-500/20 border-blue-400/30",
      "Founder-Backed Startup":
        "from-emerald-500/20 via-teal-500/15 to-green-500/20 border-emerald-400/30",
      "Solo Founder":
        "from-amber-500/20 via-orange-500/15 to-yellow-500/20 border-amber-400/30",
      "Climate & Energy":
        "from-lime-500/20 via-green-500/15 to-emerald-500/20 border-lime-400/30",
      "Healthcare & Civic":
        "from-rose-500/20 via-pink-500/15 to-fuchsia-500/20 border-rose-400/30",
      "Civic Innovation":
        "from-purple-500/20 via-violet-500/15 to-indigo-500/20 border-purple-400/30",
      "Higher Education":
        "from-cyan-500/20 via-sky-500/15 to-blue-500/20 border-cyan-400/30",
      "Climate Tech":
        "from-green-500/20 via-emerald-500/15 to-teal-500/20 border-green-400/30",
      "Nonprofit Operations":
        "from-orange-500/20 via-amber-500/15 to-yellow-500/20 border-orange-400/30",
      "Social Justice":
        "from-red-500/20 via-rose-500/15 to-pink-500/20 border-red-400/30",
    };
    return (
      gradients[sector] ||
      "from-slate-800/20 via-slate-700/15 to-slate-600/20 border-slate-400/30"
    );
  };

  const getProjectIcon = (id: string) => {
    switch (id) {
      case "sales-copilot":
        return (
          <div className="flex items-center gap-1">
            <svg
              className="h-3 w-3 sm:h-4 sm:w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
              />
            </svg>
            <svg
              className="h-3 w-3 sm:h-4 sm:w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
              />
            </svg>
          </div>
        );
      case "founder-os":
        return (
          <svg
            className="h-3 w-3 sm:h-4 sm:w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
            />
          </svg>
        );
      case "energy-analytics":
        return (
          <svg
            className="h-3 w-3 sm:h-4 sm:w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 10V3L4 14h7v7l9-11h-7z"
            />
          </svg>
        );
      case "edtech-portal":
        return (
          <div className="flex items-center gap-1">
            <svg
              className="h-3 w-3 sm:h-4 sm:w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
              />
            </svg>
            <svg
              className="h-3 w-3 sm:h-4 sm:w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
              />
            </svg>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div
      className="group/container relative h-[200px] w-full sm:h-[220px] md:h-[240px] touch-pan-y select-none"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      style={{ touchAction: "pan-y" }}
    >
      {activeCards.map((study, index) => {
        const isTop = index === 0;
        const gradientClass = getCardGradient(study.sector);

        // Only show top few cards on mobile
        const maxVisible = isMobile ? 2 : 3;
        if (index > maxVisible) return null;

        return (
          <motion.a
            key={study.id}
            href={`/case-study/${study.id}`}
            className={cn(
              "absolute left-1/2 mx-auto flex w-[88%] max-w-sm flex-col justify-between rounded-xl border-[3px] p-3 backdrop-blur-sm sm:w-[80%] sm:max-w-md sm:p-4 md:w-[70%]",
              "bg-gradient-to-br",
              gradientClass,
              "group/card relative overflow-hidden outline outline-[3px] outline-background outline-offset-[3px]",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background",
              "touch-target",
              "transition-all duration-300 ease-out cursor-pointer",
              "mix-blend-multiply active:scale-[0.98]"
            )}
            style={{
              transformOrigin: "center center",
              backfaceVisibility: "hidden",
              WebkitBackfaceVisibility: "hidden",
              transform: "translateZ(0)",
              willChange: "transform, opacity, filter, box-shadow",
              filter:
                hoveredIndex === index
                  ? "none"
                  : "grayscale(100%) sepia(5%)",
              mixBlendMode: hoveredIndex === index ? "normal" : "multiply",
            }}
            initial={false}
            animate={{
              x: "-50%",
              y: index * -6,
              scale:
                hoveredIndex === index ? 1 : 1 - index * (isMobile ? 0.03 : 0.04),
              rotate:
                hoveredIndex === index
                  ? 0
                  : isTop
                  ? 0
                  : index % 2 === 0
                  ? -3
                  : 3,
              zIndex: hoveredIndex === index ? 100 : caseStudies.length - index,
              opacity:
                hoveredIndex !== null && hoveredIndex !== index
                  ? 0.3
                  : index === 0
                  ? 1
                  : index === 1
                  ? 0.75
                  : 0.4,
            }}
            whileHover={
              isTop
                ? {
                    scale: 1,
                    y: -8,
                    rotateX: -2,
                    rotateY: 1,
                    transition: {
                      duration: 0.2,
                      ease: "easeOut",
                    },
                  }
                : {}
            }
            whileTap={
              isTop
                ? {
                    scale: 0.97,
                    transition: {
                      duration: 0.1,
                    },
                  }
                : {}
            }
            transition={{
              duration: hoveredIndex === index ? 0.3 : 0.4,
              ease: [0.25, 0.1, 0.25, 1],
            }}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            onFocus={() => setHoveredIndex(index)}
            onBlur={() => setHoveredIndex(null)}
          >
            <div className="space-y-1.5 sm:space-y-2">
              <div className="inline-flex items-center gap-1 rounded-full border border-current/30 bg-current/10 px-2 py-0.5 text-[9px] font-medium sm:text-[10px]">
                <span className="flex items-center">
                  {getProjectIcon(study.id)}
                </span>
                <span>{study.sector}</span>
              </div>
              <h3 className="text-xs font-semibold leading-tight text-slate-50 sm:text-sm md:text-base">
                {study.title}
              </h3>
              <p className="line-clamp-2 text-[10px] leading-relaxed text-slate-200/90 sm:text-xs">
                {study.summary}
              </p>
            </div>

            <div className="mt-2 flex items-center justify-between gap-2">
              <span className="rounded-full border border-slate-700/60 bg-slate-800/40 px-2 py-1 text-[9px] font-medium text-slate-300 sm:text-[10px]">
                {study.tag}
              </span>
              <span className="text-[10px] font-medium text-current transition-transform sm:text-xs group-hover:translate-x-1">
                View →
              </span>
            </div>
          </motion.a>
        );
      })}
    </div>
  );
};
