import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import { useActiveSection } from "@/hooks/use-active-section";
import { cn } from "@/lib/utils";

interface MobileMenuProps {
  className?: string;
}

export function MobileMenu({ className = "" }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const activeSection = useActiveSection([
    "who", "timeline", "lab", "proof", "faq"
  ]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  };
  
  const closeMenu = () => {
    setIsOpen(false);
    document.body.style.overflow = 'unset';
  };

  const menuItems = [
    { label: "Who I Build For", href: "#who", id: "who" },
    { label: "4-Week Timeline", href: "#timeline", id: "timeline" },
    { label: "Live Pilot Lab", href: "#lab", id: "lab" },
    { label: "Proof & Trust", href: "#proof", id: "proof" },
    { label: "FAQ", href: "#faq", id: "faq" },
    { label: "Portfolio", href: "/portfolio", isRoute: true },
  ];

  return (
    <div className={className}>
      <button
        onClick={toggleMenu}
        className="rounded-xl border border-primary/60 bg-primary/10 p-2.5 text-primary hover:bg-primary/20 transition-all shadow-sm active:scale-95 z-[70]"
        aria-label="Toggle menu"
        aria-expanded={isOpen}
      >
        {isOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      <AnimatePresence mode="wait">
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-slate-950/97 backdrop-blur-md z-[100] touch-none"
              onClick={closeMenu}
              aria-hidden="true"
            />

            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed right-0 top-0 h-full w-[85vw] max-w-[340px] bg-slate-900 backdrop-blur-xl border-l border-slate-800 shadow-2xl z-[101] overflow-y-auto overscroll-contain"
              role="dialog"
              aria-modal="true"
              aria-label="Mobile navigation menu"
            >
              <div className="flex items-center justify-between p-5 border-b border-slate-800 sticky top-0 bg-slate-900 backdrop-blur-xl z-10">
                <div className="flex flex-col">
                  <span className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">
                    AltruisticX AI
                  </span>
                  <span className="text-[10px] text-slate-400 mt-0.5">
                    Navigation
                  </span>
                </div>
                <button
                  onClick={closeMenu}
                  className="rounded-full p-2 hover:bg-slate-800 transition-colors active:scale-95"
                  aria-label="Close menu"
                >
                  <X size={20} className="text-slate-400" />
                </button>
              </div>

              <nav className="p-4">
                <ul className="space-y-1">
                  {menuItems.map((item, index) => (
                    <li key={item.label}>
                      {item.isRoute ? (
                        <Link
                          to={item.href}
                          onClick={closeMenu}
                          className="block px-4 py-3 text-sm text-slate-200 hover:bg-slate-800 hover:text-primary rounded-xl transition-all active:scale-98 font-medium"
                        >
                          <div className="flex items-center gap-3">
                            <span className="text-xs text-slate-500 font-mono">{String(index + 1).padStart(2, '0')}</span>
                            <span>{item.label}</span>
                          </div>
                        </Link>
                      ) : (
                        <a
                          href={item.href}
                          onClick={closeMenu}
                          className={cn(
                            "block px-4 py-3 text-sm rounded-xl transition-all active:scale-98",
                            activeSection === item.id
                              ? "bg-primary/15 text-primary font-semibold border border-primary/30"
                              : "text-slate-200 hover:bg-slate-800 hover:text-primary font-medium"
                          )}
                        >
                          <div className="flex items-center gap-3">
                            <span className={cn(
                              "text-xs font-mono",
                              activeSection === item.id ? "text-primary" : "text-slate-500"
                            )}>
                              {String(index + 1).padStart(2, '0')}
                            </span>
                            <span>{item.label}</span>
                          </div>
                        </a>
                      )}
                    </li>
                  ))}
                </ul>

                <div className="mt-6 pt-5 border-t border-slate-800 space-y-3">
                  <a
                    href="https://scheduler.zoom.us/altruistic-xai"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={closeMenu}
                    className="block w-full rounded-xl bg-primary px-5 py-3.5 text-center text-sm font-semibold text-slate-950 hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 active:scale-95"
                  >
                    Book a Pilot Call
                  </a>
                  <p className="text-center text-xs text-slate-400">
                    Week-to-week · pause anytime · async-first
                  </p>
                </div>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
