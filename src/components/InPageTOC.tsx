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
export function InPageTOC({
  items,
  className
}: InPageTOCProps) {
  const [activeId, setActiveId] = useState<string>("");
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveId(entry.target.id);
        }
      });
    }, {
      rootMargin: "-20% 0% -35% 0%",
      threshold: 0
    });
    items.forEach(({
      id
    }) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });
    return () => observer.disconnect();
  }, [items]);
  const handleClick = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
      setIsOpen(false);
    }
  };
  return <>
      {/* Mobile: Collapsible Dropdown */}
      <div className="lg:hidden sticky top-16 z-40 w-full bg-background/80 backdrop-blur-md border-b border-border/40 mb-3">
        <button onClick={() => setIsOpen(!isOpen)} className="w-full flex items-center justify-between px-2 py-1.5 text-left text-[10px] font-medium text-foreground hover:bg-accent/50 transition-colors" aria-expanded={isOpen} aria-label="Toggle table of contents">
          <span>On this page</span>
          {isOpen ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
        </button>

        <AnimatePresence>
          {isOpen && <motion.nav initial={{
          height: 0,
          opacity: 0
        }} animate={{
          height: "auto",
          opacity: 1
        }} exit={{
          height: 0,
          opacity: 0
        }} transition={{
          duration: 0.2
        }} className="overflow-hidden" aria-label="Table of contents">
              <ul className="px-2 pb-2 space-y-0.5">
                {items.map(item => <li key={item.id}>
                    <button onClick={() => handleClick(item.id)} className={cn("block w-full text-left px-2 py-1 rounded-md text-[9px] transition-colors", activeId === item.id ? "text-primary bg-primary/10 font-medium" : "text-muted-foreground hover:text-foreground hover:bg-accent/50")}>
                      {item.label}
                    </button>
                  </li>)}
              </ul>
            </motion.nav>}
        </AnimatePresence>
      </div>

      {/* Desktop: Sticky Sidebar */}
      <nav className={cn("hidden lg:block sticky top-24 self-start", className)} aria-label="Table of contents">
        
      </nav>
    </>;
}