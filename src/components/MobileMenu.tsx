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
    "builds", "how", "pilot", "benefits", "org-types", 
    "where", "shelved", "testimonials", "faq", "contact"
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
    { label: "Builds", href: "#builds", id: "builds" },
    { label: "Portfolio", href: "/portfolio", isRoute: true },
    { label: "How it Works", href: "#how", id: "how" },
    { label: "4-Week Pilot", href: "#pilot", id: "pilot" },
    { label: "Who Benefits", href: "#benefits", id: "benefits" },
    { label: "Organization Types", href: "#org-types", id: "org-types" },
    { label: "Where I Work", href: "#where", id: "where" },
    { label: "Shelved Experiments", href: "#shelved", id: "shelved" },
    { label: "Testimonials", href: "#testimonials", id: "testimonials" },
    { label: "FAQ", href: "#faq", id: "faq" },
  ];

  return (
    <div className={className}>
      <button
        onClick={toggleMenu}
        className="rounded-full border border-lime/60 bg-gradient-to-br from-primary/10 to-lime/10 p-2 text-primary hover:bg-lime/20 hover:border-lime hover:shadow-lime-glow transition-all active:scale-95"
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
              className="fixed inset-0 z-[100] touch-none"
              style={{
                background: 'radial-gradient(circle at 50% 50%, hsl(var(--lime) / 0.15) 0%, hsl(var(--primary) / 0.1) 30%, hsl(222 47% 11% / 0.95) 100%)',
                backdropFilter: 'blur(12px)',
                boxShadow: 'inset 0 0 100px hsl(var(--lime) / 0.1)',
              }}
              onClick={closeMenu}
              aria-hidden="true"
            />

            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed right-0 top-0 h-full w-[85vw] max-w-[320px] z-[101] overflow-y-auto overscroll-contain border-l border-lime/40 shadow-2xl"
              style={{
                background: 'linear-gradient(135deg, hsl(217 33% 17% / 0.98) 0%, hsl(222 47% 11% / 0.98) 50%, hsl(217 33% 17% / 0.98) 100%)',
                backdropFilter: 'blur(20px)',
                boxShadow: '-10px 0 50px hsl(var(--lime) / 0.3), -5px 0 30px hsl(var(--primary) / 0.2), 0 0 100px hsl(var(--lime) / 0.1) inset',
              }}
              role="dialog"
              aria-modal="true"
              aria-label="Mobile navigation menu"
            >
              <div className="flex items-center justify-between p-4 border-b border-lime/30 sticky top-0 z-10" style={{
                background: 'linear-gradient(180deg, hsl(217 33% 17% / 0.98) 0%, hsl(217 33% 17% / 0.85) 100%)',
                backdropFilter: 'blur(16px)',
                boxShadow: '0 4px 20px hsl(var(--lime) / 0.15)',
              }}>
                <span className="text-xs font-semibold uppercase tracking-[0.18em] text-lime">
                  Menu
                </span>
                <button
                  onClick={closeMenu}
                  className="rounded-full p-1.5 hover:bg-lime/20 hover:shadow-lime-glow transition-all active:scale-95"
                  aria-label="Close menu"
                >
                  <X size={18} className="text-lime" />
                </button>
              </div>

              <nav className="p-3">
                <ul className="space-y-0.5">
                  {menuItems.map((item) => (
                    <li key={item.label}>
                      {item.isRoute ? (
                        <Link
                          to={item.href}
                          onClick={closeMenu}
                          className="block px-3 py-2.5 text-sm text-slate-200 hover:bg-lime/10 hover:text-lime hover:border-lime/30 border border-transparent rounded-lg transition-all active:scale-98"
                        >
                          {item.label}
                        </Link>
                      ) : (
                        <a
                          href={item.href}
                          onClick={closeMenu}
                          className={cn(
                            "block px-3 py-2.5 text-sm rounded-lg transition-all active:scale-98 border",
                            activeSection === item.id
                              ? "bg-lime/15 text-lime font-medium border-lime/40 shadow-lime-glow"
                              : "text-slate-200 hover:bg-lime/10 hover:text-lime hover:border-lime/30 border-transparent"
                          )}
                        >
                          {item.label}
                        </a>
                      )}
                    </li>
                  ))}
                </ul>

                <div className="mt-6 pt-4 border-t border-lime/30">
                  <a
                    href="https://scheduler.zoom.us/altruistic-xai"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={closeMenu}
                    className="block w-full rounded-lg border border-lime/60 bg-gradient-to-r from-primary/20 to-lime/20 px-4 py-3 text-center text-sm font-medium text-lime hover:from-lime/30 hover:to-primary/30 hover:shadow-lime-glow transition-all active:scale-95"
                  >
                    Book a 30-min intro
                  </a>
                </div>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
