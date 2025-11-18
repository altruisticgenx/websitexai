import { motion, useScroll, useTransform } from "framer-motion";
import { MobileMenu } from "@/components/MobileMenu";
import { useEffect, useState } from "react";

export function MobileHeader() {
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const unsubscribe = scrollY.on("change", (latest) => {
      setIsScrolled(latest > 50);
    });
    return () => unsubscribe();
  }, [scrollY]);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.3 }}
      className={`md:hidden fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-slate-950/98 backdrop-blur-lg border-b border-lime/30 shadow-lime-glow' 
          : 'bg-slate-950/80 backdrop-blur-md border-b border-slate-800/30'
      }`}
    >
      <div className="flex items-center justify-between px-4 py-3">
        {/* Brand/Logo */}
        <a href="#" className="flex items-center gap-1.5 transition-opacity hover:opacity-80" onClick={(e) => {
          e.preventDefault();
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}>
          <svg 
            className="w-2.5 h-2.5 text-lime drop-shadow-[0_0_6px_hsl(var(--lime))]" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
          </svg>
          <span className="text-[9px] font-semibold uppercase tracking-[0.18em] text-primary">
            AltruisticX AI
          </span>
        </a>

        {/* Mobile Menu Button */}
        <MobileMenu />
      </div>
    </motion.header>
  );
}
