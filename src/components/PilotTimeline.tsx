import { motion } from "framer-motion";
import { Target, GitBranch, CheckCircle2 } from "lucide-react";

interface TimelineStep {
  week: string;
  title: string;
  description: string;
  color: "emerald" | "blue" | "violet";
  icon: any;
}

const timelineSteps: TimelineStep[] = [
  {
    week: "Week 1",
    title: "Pinpoint & Prototype",
    description: "Share your challenge or goal—class doc, campus brief, stakeholder repo, student idea. Get a working skeleton in days.",
    color: "emerald",
    icon: Target,
  },
  {
    week: "Weeks 2–3",
    title: "Refine & Connect",
    description: "Iterate with live feedback: data flows, interfaces, reporting. See your concept demo-ready for internal pilots, classes, or team reviews.",
    color: "blue",
    icon: GitBranch,
  },
  {
    week: "Week 4",
    title: "Decide with Clarity",
    description: "Wrap with a real repo, guided walkthrough, and a clear decision: scale, pivot, or pause. Your code, data, and documentation are always yours.",
    color: "violet",
    icon: CheckCircle2,
  },
];

const colorMap = {
  emerald: {
    border: "border-emerald-400/30",
    bg: "from-slate-900/40 to-emerald-950/20",
    text: "text-emerald-300",
    glow: "group-hover:shadow-emerald-500/20",
    dot: "bg-emerald-400",
    stroke: "#34d399",
  },
  blue: {
    border: "border-blue-400/30",
    bg: "from-slate-900/40 to-blue-950/20",
    text: "text-blue-300",
    glow: "group-hover:shadow-blue-500/20",
    dot: "bg-blue-400",
    stroke: "#60a5fa",
  },
  violet: {
    border: "border-violet-400/30",
    bg: "from-slate-900/40 to-violet-950/20",
    text: "text-violet-300",
    glow: "group-hover:shadow-violet-500/20",
    dot: "bg-violet-400",
    stroke: "#a78bfa",
  },
};

export function PilotTimeline() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, delay: 0.4 }}
      className="mt-6 sm:mt-8"
    >
      <div className="mb-3 text-center sm:mb-4">
        <h3 className="text-xs font-semibold text-slate-50 sm:text-sm">
          4-Week Pilot Timeline
        </h3>
        <p className="mt-1 text-[9px] text-slate-400 sm:text-[10px]">
          Ship real code, not just talk
        </p>
      </div>

      {/* Desktop: 3-column grid */}
      <div className="relative hidden md:grid md:grid-cols-3 md:gap-3">
        {/* SVG Connection Lines */}
        <svg
          className="pointer-events-none absolute inset-0 -z-10 h-full w-full"
          style={{ top: "50%", transform: "translateY(-50%)" }}
        >
          <defs>
            <linearGradient id="gradient-1" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#34d399" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#60a5fa" stopOpacity="0.6" />
            </linearGradient>
            <linearGradient id="gradient-2" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#60a5fa" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#a78bfa" stopOpacity="0.6" />
            </linearGradient>
          </defs>

          {/* Line 1 to 2 */}
          <motion.path
            d="M 33% 50% C 40% 50%, 60% 50%, 66.5% 50%"
            stroke="url(#gradient-1)"
            strokeWidth="1.5"
            fill="none"
            strokeDasharray="5 3"
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.6 }}
          />

          {/* Line 2 to 3 */}
          <motion.path
            d="M 66.5% 50% C 73% 50%, 93% 50%, 100% 50%"
            stroke="url(#gradient-2)"
            strokeWidth="1.5"
            fill="none"
            strokeDasharray="5 3"
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.9 }}
          />
        </svg>

        {timelineSteps.map((step, index) => {
          const colors = colorMap[step.color];
          const Icon = step.icon;

          return (
            <motion.div
              key={step.week}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="group relative"
            >
              <motion.div
                whileHover={{ scale: 1.02 }}
                className={`relative h-full rounded-lg border ${colors.border} bg-gradient-to-br ${colors.bg} p-3 backdrop-blur-sm transition-all duration-300 ${colors.glow} shadow-lg`}
              >
                {/* Glow effect on hover */}
                <div className="pointer-events-none absolute inset-0 rounded-lg bg-gradient-to-br from-white/5 to-white/0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                {/* Icon and Week */}
                <div className="flex items-center justify-between">
                  <div className={`inline-flex rounded-md bg-slate-900/60 p-1.5 ${colors.text}`}>
                    <Icon className="h-3.5 w-3.5" />
                  </div>
                  <span className="text-[9px] font-mono uppercase tracking-wider text-slate-400">
                    {step.week}
                  </span>
                </div>

                {/* Title */}
                <h4 className={`mt-2 text-xs font-semibold ${colors.text}`}>
                  {step.title}
                </h4>

                {/* Description */}
                <p className="mt-1.5 text-[9px] leading-relaxed text-slate-300">
                  {step.description}
                </p>

                {/* Connection Dot */}
                {index < timelineSteps.length - 1 && (
                  <motion.div
                    className={`absolute right-0 top-1/2 h-2 w-2 -translate-y-1/2 translate-x-1/2 rounded-full ${colors.dot} shadow-lg`}
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: index * 0.3,
                    }}
                  />
                )}
              </motion.div>
            </motion.div>
          );
        })}
      </div>

      {/* Mobile: Stacked vertical layout */}
      <div className="relative space-y-2 md:hidden">
        {timelineSteps.map((step, index) => {
          const colors = colorMap[step.color];
          const Icon = step.icon;

          return (
            <div key={step.week} className="relative">
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="group relative"
              >
                <div
                  className={`relative rounded-lg border ${colors.border} bg-gradient-to-br ${colors.bg} p-2.5 backdrop-blur-sm transition-all duration-300 ${colors.glow} shadow-lg`}
                >
                  {/* Icon and Week */}
                  <div className="flex items-center justify-between">
                    <div className={`inline-flex rounded-md bg-slate-900/60 p-1.5 ${colors.text}`}>
                      <Icon className="h-3 w-3" />
                    </div>
                    <span className="text-[8px] font-mono uppercase tracking-wider text-slate-400">
                      {step.week}
                    </span>
                  </div>

                  {/* Title */}
                  <h4 className={`mt-1.5 text-[11px] font-semibold ${colors.text}`}>
                    {step.title}
                  </h4>

                  {/* Description */}
                  <p className="mt-1 text-[8px] leading-relaxed text-slate-300">
                    {step.description}
                  </p>
                </div>

                {/* Vertical Connection Line */}
                {index < timelineSteps.length - 1 && (
                  <motion.div
                    className="absolute bottom-0 left-1/2 h-2 w-0.5 -translate-x-1/2 translate-y-full bg-gradient-to-b from-slate-600 to-transparent"
                    initial={{ scaleY: 0 }}
                    whileInView={{ scaleY: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: index * 0.15 + 0.3 }}
                  />
                )}
              </motion.div>
            </div>
          );
        })}
      </div>

      {/* Footer note */}
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 1.2 }}
        className="mt-3 text-center text-[8px] text-slate-400 sm:text-[9px]"
      >
        Every week delivers tangible progress you can demo
      </motion.p>
    </motion.div>
  );
}
