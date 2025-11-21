import React, { useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown, ChevronUp, Clock } from "lucide-react";

interface Phase {
  week: string;
  milestone: string;
}

interface ProjectTimelineProps {
  phases: Phase[];
  duration: string;
}

export function ProjectTimeline({ phases, duration }: ProjectTimelineProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [hoveredPhase, setHoveredPhase] = useState<number | null>(null);

  // Parse duration to get total weeks
  const totalWeeks = parseInt(duration.match(/\d+/)?.[0] || "4");
  
  // Parse phase week ranges
  const getWeekRange = (weekString: string) => {
    const match = weekString.match(/Week (\d+)(?:-(\d+))?/);
    if (!match) return { start: 1, end: 1 };
    const start = parseInt(match[1]);
    const end = match[2] ? parseInt(match[2]) : start;
    return { start, end };
  };

  return (
    <div className="mt-6">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex w-full items-center justify-between rounded-xl border border-slate-800/70 bg-slate-950/40 p-4 text-left transition-all hover:border-emerald-400/30 hover:bg-slate-900/60"
      >
        <div className="flex items-center gap-3">
          <div className="rounded-lg bg-emerald-400/10 p-2">
            <Clock className="h-4 w-4 text-emerald-300" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-slate-50">
              Project Timeline
            </h3>
            <p className="text-xs text-slate-400">
              {phases.length} phases • {duration}
            </p>
          </div>
        </div>
        {isExpanded ? (
          <ChevronUp className="h-5 w-5 text-slate-400" />
        ) : (
          <ChevronDown className="h-5 w-5 text-slate-400" />
        )}
      </button>

      <motion.div
        initial={false}
        animate={{
          height: isExpanded ? "auto" : 0,
          opacity: isExpanded ? 1 : 0,
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="overflow-hidden"
      >
        <div className="mt-4 rounded-xl border border-slate-800/70 bg-slate-950/40 p-5">
          {/* Week headers */}
          <div className="mb-4 flex gap-2">
            {Array.from({ length: totalWeeks }, (_, i) => (
              <div
                key={i}
                className="flex-1 text-center text-xs font-medium text-slate-400"
              >
                Week {i + 1}
              </div>
            ))}
          </div>

          {/* Timeline bars */}
          <div className="space-y-3">
            {phases.map((phase, index) => {
              const { start, end } = getWeekRange(phase.week);
              const startPercent = ((start - 1) / totalWeeks) * 100;
              const widthPercent = ((end - start + 1) / totalWeeks) * 100;
              const isHovered = hoveredPhase === index;

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="relative"
                  onMouseEnter={() => setHoveredPhase(index)}
                  onMouseLeave={() => setHoveredPhase(null)}
                >
                  {/* Background track */}
                  <div className="relative h-12 rounded-lg border border-slate-800/50 bg-slate-900/30">
                    {/* Animated progress bar */}
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${widthPercent}%` }}
                      transition={{
                        duration: 0.8,
                        delay: index * 0.1 + 0.2,
                        ease: "easeOut",
                      }}
                      style={{ left: `${startPercent}%` }}
                      className={`absolute top-0 h-full rounded-lg transition-all duration-300 ${
                        isHovered
                          ? "bg-gradient-to-r from-emerald-400 to-emerald-500"
                          : "bg-gradient-to-r from-emerald-400/80 to-emerald-500/80"
                      }`}
                    >
                      {/* Shimmer effect */}
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                        animate={{
                          x: ["-100%", "200%"],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "linear",
                          delay: index * 0.2,
                        }}
                      />
                    </motion.div>

                    {/* Phase label */}
                    <div className="absolute inset-0 flex items-center px-3">
                      <span
                        className={`text-xs font-medium transition-colors ${
                          isHovered ? "text-slate-900" : "text-slate-300"
                        }`}
                        style={{
                          marginLeft: `${startPercent}%`,
                          zIndex: 10,
                        }}
                      >
                        {phase.week}
                      </span>
                    </div>
                  </div>

                  {/* Milestone tooltip */}
                  <motion.div
                    initial={{ opacity: 0, y: -5 }}
                    animate={{
                      opacity: isHovered ? 1 : 0,
                      y: isHovered ? 0 : -5,
                    }}
                    transition={{ duration: 0.2 }}
                    className="absolute -top-14 left-0 right-0 z-20 mx-2 rounded-lg border border-emerald-400/30 bg-slate-900 p-2 text-xs text-slate-200 shadow-lg"
                    style={{ pointerEvents: "none" }}
                  >
                    <div className="font-medium text-emerald-300">
                      {phase.week}
                    </div>
                    <div className="mt-1">{phase.milestone}</div>
                    {/* Arrow pointing down */}
                    <div className="absolute -bottom-1 left-4 h-2 w-2 rotate-45 border-b border-r border-emerald-400/30 bg-slate-900" />
                  </motion.div>
                </motion.div>
              );
            })}
          </div>

          {/* Legend */}
          <div className="mt-5 flex items-center gap-4 border-t border-slate-800/50 pt-4">
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded bg-gradient-to-r from-emerald-400 to-emerald-500" />
              <span className="text-xs text-slate-400">Active Phase</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded border border-slate-700/50 bg-slate-900/30" />
              <span className="text-xs text-slate-400">Timeline Track</span>
            </div>
          </div>

          {/* Quick stats */}
          <div className="mt-4 grid grid-cols-3 gap-3">
            <div className="rounded-lg bg-slate-900/50 p-2.5 text-center">
              <div className="text-xs text-slate-400">Total Duration</div>
              <div className="mt-1 text-sm font-semibold text-emerald-300">
                {duration}
              </div>
            </div>
            <div className="rounded-lg bg-slate-900/50 p-2.5 text-center">
              <div className="text-xs text-slate-400">Milestones</div>
              <div className="mt-1 text-sm font-semibold text-emerald-300">
                {phases.length}
              </div>
            </div>
            <div className="rounded-lg bg-slate-900/50 p-2.5 text-center">
              <div className="text-xs text-slate-400">Avg. Per Phase</div>
              <div className="mt-1 text-sm font-semibold text-emerald-300">
                {Math.ceil(totalWeeks / phases.length)}w
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
