import React, { useState } from "react";
import { motion } from "framer-motion";

type Sector = "energy" | "education" | "civic" | "climate" | "startups";

const sectors: Array<{
  id: Sector;
  label: string;
  color: string;
  borderColor: string;
  bgColor: string;
  textColor: string;
  shape: string;
  description: string;
}> = [
  {
    id: "energy",
    label: "Energy",
    color: "emerald",
    borderColor: "border-emerald-500/50",
    bgColor: "bg-emerald-500/10",
    textColor: "text-emerald-400",
    shape: "rounded-md",
    description: "→ Grid optimization · Demand forecasting · Utility analytics",
  },
  {
    id: "education",
    label: "Education",
    color: "blue",
    borderColor: "border-blue-500/50",
    bgColor: "bg-blue-500/10",
    textColor: "text-blue-400",
    shape: "rounded-full",
    description: "→ Personalized learning · Student privacy · Civic education",
  },
  {
    id: "civic",
    label: "Civic",
    color: "violet",
    borderColor: "border-violet-500/50",
    bgColor: "bg-violet-500/10",
    textColor: "text-violet-400",
    shape: "rounded-sm",
    description: "→ Policy tracking · Public engagement · Transparency tools",
  },
  {
    id: "climate",
    label: "Climate",
    color: "lime",
    borderColor: "border-lime-500/50",
    bgColor: "bg-lime-500/10",
    textColor: "text-lime-400",
    shape: "rounded-lg",
    description: "→ Carbon tracking · Sustainability metrics · Impact reporting",
  },
  {
    id: "startups",
    label: "Startups",
    color: "amber",
    borderColor: "border-amber-500/50",
    bgColor: "bg-amber-500/10",
    textColor: "text-amber-400",
    shape: "rounded-full",
    description: "→ MVP validation · Product-market fit · Growth experiments",
  },
];

export const SectorSwitcher: React.FC = () => {
  const [activeSector, setActiveSector] = useState<Sector | null>(null);

  return (
    <>
      <motion.div
        className="mt-2 flex flex-wrap gap-1.5 items-center text-[8px]"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
      >
        <span className="text-muted-foreground font-mono">Focus:</span>

        {sectors.map((sector) => (
          <motion.button
            key={sector.id}
            className={`relative px-3 py-2 min-h-[44px] min-w-[44px] ${sector.shape} border ${sector.borderColor} ${sector.bgColor} backdrop-blur-sm ${sector.textColor} overflow-visible group transition-all flex items-center justify-center focus-ring interactive`}
            onMouseEnter={() => setActiveSector(sector.id)}
            onMouseLeave={() => setActiveSector(null)}
            whileHover={{
              scale: 1.1,
              rotateX: 5,
              rotateY: -5,
            }}
            style={{
              transformStyle: "preserve-3d",
              perspective: "1000px",
              boxShadow:
                activeSector === sector.id
                  ? `0 0 20px rgba(var(--${sector.color}), 0.4)`
                  : `0 0 8px rgba(var(--${sector.color}), 0.2)`,
            }}
            aria-label={`Focus area: ${sector.label}`}
            role="button"
          >
            <motion.div
              className={`absolute inset-0 ${sector.shape} bg-${sector.color}-500 blur-lg -z-10`}
              animate={{
                opacity: activeSector === sector.id ? [0.2, 0.5, 0.2] : 0.1,
                scale: activeSector === sector.id ? [1.1, 1.4, 1.1] : 1,
              }}
              transition={{
                duration: 1.5 + Math.random() * 0.5,
                repeat: Infinity,
              }}
            />
            <span className="relative z-10 font-mono font-bold text-[11px] sm:text-xs">{sector.label}</span>
          </motion.button>
        ))}
      </motion.div>

      <motion.div className="mt-2 min-h-[32px]" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        {activeSector ? (
          <motion.p
            className={`text-[9px] ${
              sectors.find((s) => s.id === activeSector)?.textColor
            }/90 font-mono`}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            transition={{ duration: 0.3 }}
          >
            {sectors.find((s) => s.id === activeSector)?.description}
          </motion.p>
        ) : (
          <motion.p
            className="max-w-xl text-xs text-muted-foreground"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            Privacy-first prototypes that help educators personalize learning and utilities optimize grids—without
            sending your data to Big Tech clouds.
          </motion.p>
        )}
      </motion.div>
    </>
  );
};
