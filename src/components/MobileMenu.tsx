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
    // Prevent body scroll when menu is open
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
        className="rounded-full border border-primary/60 bg-primary/10 p-2 text-primary hover:bg-primary/20 transition-colors touch-manipulation"
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
              className="fixed inset-0 bg-slate-950/90 backdrop-blur-sm z-[100] touch-none"
              onClick={closeMenu}
              aria-hidden="true"
            />

            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed right-0 top-0 h-full w-72 bg-slate-900/98 backdrop-blur-md border-l border-slate-800 shadow-2xl z-[101] overflow-y-auto overscroll-contain"
              role="dialog"
              aria-modal="true"
              aria-label="Mobile navigation menu"
            >
              <div className="flex items-center justify-between p-5 border-b border-slate-800">
                <span className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">
                  Menu
                </span>
                <button
                  onClick={closeMenu}
                  className="rounded-full p-1 hover:bg-slate-800 transition-colors"
                  aria-label="Close menu"
                >
                  <X size={20} className="text-slate-400" />
                </button>
              </div>

              <nav className="p-5">
                <ul className="space-y-1">
                  {menuItems.map((item) => (
                    <li key={item.label}>
                      {item.isRoute ? (
                        <Link
                          to={item.href}
                          onClick={closeMenu}
                          className="block rounded-lg px-4 py-3 text-sm text-slate-300 hover:bg-slate-800 hover:text-primary transition-colors"
                        >
                          {item.label}
                        </Link>
                      ) : (
                        <a
                          href={item.href}
                          onClick={closeMenu}
                          className={cn(
                            "block rounded-lg px-4 py-3 text-sm transition-colors",
                            activeSection === item.id
                              ? "bg-slate-800 text-primary font-medium"
                              : "text-slate-300 hover:bg-slate-800 hover:text-primary"
                          )}
                        >
                          {item.label}
                        </a>
                      )}
                    </li>
                  ))}
                </ul>

                <div className="mt-6 pt-6 border-t border-slate-800">
                  <a
                    href="https://scheduler.zoom.us/altruistic-xai"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={closeMenu}
                    className="block rounded-full border border-primary/60 bg-primary/10 px-4 py-2.5 text-center text-sm font-medium text-primary hover:bg-primary/20 transition-colors"
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
