import { useActiveSection } from "@/hooks/use-active-section";
import { cn } from "@/lib/utils";

const sections = [
  { id: "hero", label: "Home" },
  { id: "who", label: "Who uses this?" },
  { id: "what", label: "What you get" },
  { id: "pilots", label: "Sample pilots" },
  { id: "how", label: "How it works" },
  { id: "why", label: "Why this model?" },
];

export function SectionNav() {
  const activeSection = useActiveSection(sections.map(s => s.id));

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <nav className="fixed right-8 top-1/2 -translate-y-1/2 z-40 hidden lg:block">
      <ul className="space-y-4">
        {sections.map((section) => {
          const isActive = activeSection === section.id;
          
          return (
            <li key={section.id}>
              <button
                onClick={() => scrollToSection(section.id)}
                className="group relative flex items-center"
                aria-label={`Go to ${section.label}`}
              >
                {/* Dot */}
                <span
                  className={cn(
                    "h-3 w-3 rounded-full border-2 transition-all duration-300",
                    isActive
                      ? "border-primary bg-primary scale-125 shadow-lg shadow-primary/30"
                      : "border-muted-foreground/40 bg-background hover:border-primary/60 hover:bg-primary/20 hover:scale-110"
                  )}
                />
                
                {/* Label tooltip */}
                <span
                  className={cn(
                    "absolute right-6 whitespace-nowrap rounded-md px-3 py-1.5 text-sm font-medium transition-all duration-200",
                    "opacity-0 -translate-x-2 pointer-events-none",
                    "group-hover:opacity-100 group-hover:translate-x-0",
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "bg-card text-card-foreground border border-border shadow-lg"
                  )}
                >
                  {section.label}
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
