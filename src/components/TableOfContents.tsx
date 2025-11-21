import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Menu } from "lucide-react";
import { cn } from "@/lib/utils";

interface TOCSection {
  id: string;
  label: string;
}

const sections: TOCSection[] = [
  { id: "home", label: "Home" },
  { id: "builds", label: "Recent Builds" },
  { id: "pilot", label: "4-Week Pilot" },
  { id: "benefits", label: "Who Benefits" },
  { id: "org-types", label: "Organizations" },
  { id: "where", label: "Where I Work" },
  { id: "shelved", label: "Experiments" },
  { id: "about", label: "About" },
];

export function TableOfContents() {
  const [activeSection, setActiveSection] = useState("home");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-20% 0px -70% 0px",
        threshold: 0.1,
      }
    );

    sections.forEach((section) => {
      const element = document.getElementById(section.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
      setIsOpen(false);
    }
  };

  const activeLabel = sections.find((s) => s.id === activeSection)?.label || "Home";

  return (
    <>
      {/* Mobile: Collapsible Dropdown */}
      <div className="fixed bottom-20 left-4 z-40 md:hidden">
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 rounded-full border border-primary/30 bg-slate-900/95 backdrop-blur-lg px-4 py-2 text-xs font-medium text-foreground shadow-lg touch-manipulation min-h-[44px]"
          whileTap={{ scale: 0.95 }}
        >
          <Menu className="h-3 w-3" />
          <span>{activeLabel}</span>
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <ChevronDown className="h-3 w-3" />
          </motion.div>
        </motion.button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="absolute bottom-full left-0 mb-2 w-48 rounded-lg border border-slate-800/80 bg-slate-900/98 backdrop-blur-lg shadow-xl overflow-hidden"
            >
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => scrollToSection(section.id)}
                  className={cn(
                    "w-full px-4 py-2.5 text-left text-xs font-medium transition-colors touch-manipulation",
                    activeSection === section.id
                      ? "bg-primary/20 text-primary"
                      : "text-muted-foreground hover:bg-slate-800/60 hover:text-foreground"
                  )}
                >
                  {section.label}
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Desktop: Sticky Sidebar */}
      <motion.nav
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="hidden md:block fixed left-8 top-1/2 -translate-y-1/2 z-40"
      >
        <div className="space-y-1">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => scrollToSection(section.id)}
              className={cn(
                "group flex items-center gap-3 py-2 text-xs font-medium transition-all",
                activeSection === section.id
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <motion.div
                className={cn(
                  "h-px transition-all",
                  activeSection === section.id
                    ? "w-8 bg-primary"
                    : "w-4 bg-muted-foreground/40 group-hover:w-6 group-hover:bg-foreground"
                )}
                layout
              />
              <span className="whitespace-nowrap">{section.label}</span>
            </button>
          ))}
        </div>
      </motion.nav>
    </>
  );
}
