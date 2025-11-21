import React from "react";
import { motion } from "framer-motion";

export const WavyBackground: React.FC = () => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <svg className="absolute w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="wave-gradient-1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop
              offset="0%"
              style={{
                stopColor: 'hsl(var(--primary))',
                stopOpacity: 0.15,
              }}
            />
            <stop
              offset="50%"
              style={{
                stopColor: 'hsl(var(--accent))',
                stopOpacity: 0.15,
              }}
            />
            <stop
              offset="100%"
              style={{
                stopColor: 'hsl(var(--primary))',
                stopOpacity: 0.15,
              }}
            />
          </linearGradient>
          <linearGradient id="wave-gradient-2" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop
              offset="0%"
              style={{
                stopColor: 'hsl(var(--accent))',
                stopOpacity: 0.1,
              }}
            />
            <stop
              offset="50%"
              style={{
                stopColor: 'hsl(var(--primary))',
                stopOpacity: 0.1,
              }}
            />
            <stop
              offset="100%"
              style={{
                stopColor: 'hsl(var(--accent))',
                stopOpacity: 0.1,
              }}
            />
          </linearGradient>
        </defs>
        <motion.path
          d="M0,50 Q250,100 500,50 T1000,50 T1500,50 T2000,50 V200 H0 Z"
          fill="url(#wave-gradient-1)"
          animate={{
            d: [
              "M0,50 Q250,100 500,50 T1000,50 T1500,50 T2000,50 V200 H0 Z",
              "M0,80 Q250,30 500,80 T1000,80 T1500,80 T2000,80 V200 H0 Z",
              "M0,50 Q250,100 500,50 T1000,50 T1500,50 T2000,50 V200 H0 Z",
            ],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.path
          d="M0,100 Q300,150 600,100 T1200,100 T1800,100 T2400,100 V300 H0 Z"
          fill="url(#wave-gradient-2)"
          animate={{
            d: [
              "M0,100 Q300,150 600,100 T1200,100 T1800,100 T2400,100 V300 H0 Z",
              "M0,130 Q300,80 600,130 T1200,130 T1800,130 T2400,130 V300 H0 Z",
              "M0,100 Q300,150 600,100 T1200,100 T1800,100 T2400,100 V300 H0 Z",
            ],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        />
      </svg>
    </div>
  );
};
