import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";

interface TOCItem {
  id: string;
  label: string;
}

interface InPageTOCProps {
  items: TOCItem[];
  className?: string;
}

export function InPageTOC({ items, className }: InPageTOCProps) {
  const [activeId, setActiveId] = useState<string>("");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-20% 0% -35% 0%",
        threshold: 0,
      }
    );

    items.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [items]);

  const handleClick = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
      setIsOpen(false);
    }
  };

  return (
    <>
      {/* Mobile: Collapsible Dropdown */}
      <div className="lg:hidden sticky top-16 z-40 w-full bg-background/80 backdrop-blur-md border-b border-border/40 mb-6">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex items-center justify-between px-4 py-3 text-left body-sm font-medium text-foreground hover:bg-accent/50 transition-colors"
          aria-expanded={isOpen}
          aria-label="Toggle table of contents"
        >
          <span>On this page</span>
          {isOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </button>

        <AnimatePresence>
          {isOpen && (
            <motion.nav
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
              aria-label="Table of contents"
            >
              <ul className="px-4 pb-3 space-y-1">
                {items.map((item) => (
                  <li key={item.id}>
                    <button
                      onClick={() => handleClick(item.id)}
                      className={cn(
                        "block w-full text-left px-3 py-2 rounded-md body-xs transition-colors",
                        activeId === item.id
                          ? "text-primary bg-primary/10 font-medium"
                          : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
                      )}
                    >
                      {item.label}
                    </button>
                  </li>
                ))}
              </ul>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>

      {/* Desktop: Sticky Sidebar */}
      <nav
        className={cn(
          "hidden lg:block sticky top-24 self-start",
          className
        )}
        aria-label="Table of contents"
      >
        <div className="rounded-lg border border-border/40 bg-card/50 backdrop-blur-sm p-4">
          <h3 className="body-sm font-semibold text-foreground mb-3">On this page</h3>
          <ul className="space-y-1">
            {items.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => handleClick(item.id)}
                  className={cn(
                    "block w-full text-left px-3 py-1.5 rounded-md body-xs transition-all duration-200",
                    activeId === item.id
                      ? "text-primary bg-primary/10 font-medium border-l-2 border-primary"
                      : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
                  )}
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </>
  );
}
