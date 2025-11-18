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
          ? 'bg-slate-950/98 backdrop-blur-lg border-b border-slate-800 shadow-lg' 
          : 'bg-slate-950/80 backdrop-blur-md border-b border-slate-800/30'
      }`}
    >
      <div className="flex items-center justify-between px-4 py-3">
        {/* Brand/Logo */}
        <a href="#" className="flex flex-col transition-opacity hover:opacity-80" onClick={(e) => {
          e.preventDefault();
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}>
          <span className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
            AltruisticX AI
          </span>
          <span className={`text-[10px] text-slate-400 transition-opacity ${
            isScrolled ? 'opacity-0 h-0' : 'opacity-100'
          }`}>
            AI + Product Engineering
          </span>
        </a>

        {/* Mobile Menu Button */}
        <MobileMenu />
      </div>
    </motion.header>
  );
}
