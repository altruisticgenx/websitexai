import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";

interface MobileMenuProps {
  className?: string;
}

export function MobileMenu({ className = "" }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  const menuItems = [
    { label: "Builds", href: "#builds" },
    { label: "Portfolio", href: "/portfolio", isRoute: true },
    { label: "How it Works", href: "#how" },
    { label: "4-Week Pilot", href: "#pilot" },
    { label: "Who Benefits", href: "#benefits" },
    { label: "Organization Types", href: "#org-types" },
    { label: "Where I Work", href: "#where" },
    { label: "Shelved Experiments", href: "#shelved" },
    { label: "Testimonials", href: "#testimonials" },
    { label: "FAQ", href: "#faq" },
  ];

  return (
    <div className={className}>
      <button
        onClick={toggleMenu}
        className="rounded-full border border-primary/60 bg-primary/10 p-2 text-primary hover:bg-primary/20 transition-colors"
        aria-label="Toggle menu"
      >
        {isOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-40"
              onClick={closeMenu}
            />

            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 h-full w-72 bg-slate-900 border-l border-slate-800 shadow-2xl z-50 overflow-y-auto"
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
                          className="block rounded-lg px-4 py-3 text-sm text-slate-300 hover:bg-slate-800 hover:text-primary transition-colors"
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
