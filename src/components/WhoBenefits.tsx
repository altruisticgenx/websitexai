import React, { useMemo } from "react";
import { motion } from "framer-motion";

const audiences = [
  "Students bringing new ideas to life",
  "Teachers or nonprofits piloting campus or impact projects",
  "Boards and governance teams needing clearer dashboards",
  "Solo founders wanting operational peace of mind",
  "B2B units innovating on tight timelines",
] as const;

export const WhoBenefits: React.FC = React.memo(() => {
  return (
    <section id="benefits" className="relative border-t border-slate-900/80 py-10 lg:py-16">
      <div className="mx-auto w-full max-w-5xl px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="space-y-2 mb-8"
        >
          <h2 className="heading-3 text-foreground">Who Benefits Most</h2>
          <p className="body-base text-muted-foreground">
            This model works best for lean teams in mission-driven or complex domains where{" "}
            <span className="font-semibold text-foreground">shipping proof is better than writing plans</span>.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {audiences.map((item, i) => (
            <motion.div
              key={item}
              initial={{ opacity: 0, x: -10, rotateY: -5 }}
              whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.4,
                delay: i * 0.1,
                type: "spring",
                stiffness: 100
              }}
              whileHover={{
                y: -4,
                scale: 1.02,
                rotateX: 3,
                transition: {
                  type: "spring",
                  stiffness: 400,
                  damping: 10
                }
              }}
              style={{
                transformStyle: "preserve-3d",
                perspective: "1000px",
              }}
              className="group rounded-xl border border-slate-800/70 bg-slate-900/60 p-4 shadow-xl hover:shadow-2xl hover:border-primary/40 transition-all touch-manipulation"
            >
              {/* 3D glow effect */}
              <div className="absolute -inset-[1px] rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 opacity-0 group-hover:opacity-100 blur-sm transition-opacity duration-300 -z-10" />
              
              <p className="body-base font-medium text-slate-100 flex items-center gap-2 relative z-10">
                <span className="text-primary text-lg group-hover:scale-110 transition-transform">
                  ✨
                </span>
                {item}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
});

WhoBenefits.displayName = "WhoBenefits";
