import { useState, useEffect, useCallback } from "react";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

const SECTIONS = [
  { id: "builds", label: "Builds" },
  { id: "progression", label: "Progression" },
  { id: "pilot", label: "Pilot" },
  { id: "benefits", label: "Benefits" },
  { id: "org-types", label: "Organizations" },
  { id: "where", label: "Where" },
  { id: "shelved", label: "Experiments" },
  { id: "engagement", label: "Engagement" },
  { id: "about", label: "About" },
] as const;

export const BreadcrumbTrail = () => {
  const [activeSection, setActiveSection] = useState<string>("builds");

  const handleScroll = useCallback(() => {
    const scrollPosition = window.scrollY + 200; // offset for header

    for (let i = SECTIONS.length - 1; i >= 0; i--) {
      const section = document.getElementById(SECTIONS[i].id);
      if (section && section.offsetTop <= scrollPosition) {
        setActiveSection(SECTIONS[i].id);
        return;
      }
    }
  }, []);

  useEffect(() => {
    handleScroll(); // Initial check
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const activeSectionIndex = SECTIONS.findIndex((s) => s.id === activeSection);

  return (
    <nav
      aria-label="Section breadcrumb"
      className="sticky top-14 z-40 border-b border-border/50 bg-background/80 backdrop-blur-sm"
    >
      <div className="mx-auto max-w-5xl px-3 py-2 sm:px-4">
        <ol className="flex items-center gap-1 overflow-x-auto scrollbar-hide">
          {/* Home indicator */}
          <li className="flex items-center gap-1 flex-shrink-0">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className={cn(
                "text-xs transition-colors touch-target-lg",
                activeSection === "builds"
                  ? "text-primary font-medium"
                  : "text-muted-foreground hover:text-foreground"
              )}
              aria-current={activeSection === "builds" ? "location" : undefined}
            >
              Home
            </button>
            <ChevronRight className="h-3 w-3 text-muted-foreground/50" aria-hidden="true" />
          </li>

          {/* Current section */}
          <li className="flex items-center gap-1 flex-shrink-0">
            <button
              onClick={() => scrollToSection(activeSection)}
              className="text-xs font-medium text-primary touch-target-lg"
              aria-current="location"
            >
              {SECTIONS.find((s) => s.id === activeSection)?.label}
            </button>
          </li>

          {/* Next section preview (if not last) */}
          {activeSectionIndex < SECTIONS.length - 1 && (
            <>
              <ChevronRight className="h-3 w-3 text-muted-foreground/30" aria-hidden="true" />
              <li className="flex-shrink-0">
                <button
                  onClick={() => scrollToSection(SECTIONS[activeSectionIndex + 1].id)}
                  className="text-xs text-muted-foreground/50 hover:text-muted-foreground transition-colors touch-target-lg"
                >
                  {SECTIONS[activeSectionIndex + 1].label}
                </button>
              </li>
            </>
          )}
        </ol>
      </div>
    </nav>
  );
};
