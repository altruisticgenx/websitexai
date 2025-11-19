import { useState } from "react";
import { cn } from "@/lib/utils";
import { useActiveSection } from "@/hooks/use-active-section";
import { ChevronDown } from "lucide-react";

export function SiteNav() {
  const activeSection = useActiveSection(["", "pilot", "builds", "how", "where"]);
  const [isWorkOpen, setIsWorkOpen] = useState(false);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const href = e.currentTarget.getAttribute("href");
    if (!href) return;

    // Close dropdown when clicking a link
    setIsWorkOpen(false);

    if (href === "#" || href === "") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    const sectionId = href.replace("#", "");
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const isWorkActive = ["pilot", "builds", "how"].includes(activeSection);

  return (
    <>
      {/* Skip to content link for accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-[100] focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
      >
        Skip to main content
      </a>
      
      <nav 
        className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80"
        aria-label="Main navigation"
      >
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo/Brand */}
          <a
            href="#"
            onClick={handleNavClick}
            className="flex flex-col font-itim transition-colors hover:text-primary"
          >
            <span className="text-xs font-semibold uppercase tracking-wider text-primary sm:text-sm">
              AltruisticX AI
            </span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:gap-1" role="navigation" aria-label="Primary">
            <a
              href="#"
              onClick={handleNavClick}
              aria-label="Navigate to home section"
              aria-current={activeSection === "" ? "page" : undefined}
              className={cn(
                "px-3 py-1.5 text-xs font-medium lowercase tracking-wide transition-all duration-200 rounded-md",
                activeSection === ""
                  ? "text-primary bg-primary/10 scale-105"
                  : "text-foreground hover:text-primary hover:bg-accent/50"
              )}
            >
              home
            </a>

            <a
              href="/portfolio"
              aria-label="View portfolio lab"
              className="px-3 py-1.5 text-xs font-medium lowercase tracking-wide text-foreground transition-all duration-200 hover:text-primary hover:bg-accent/50 rounded-md"
            >
              lab
            </a>

            <a
              href="https://futurexedu.lovable.app"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="View 2026 snapshot (opens in new tab)"
              className="px-3 py-1.5 text-xs font-medium lowercase tracking-wide text-foreground transition-all duration-200 hover:text-primary hover:bg-accent/50 rounded-md"
            >
              2026 snapshot
            </a>

            {/* Work Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsWorkOpen(!isWorkOpen)}
                onMouseEnter={() => setIsWorkOpen(true)}
                aria-expanded={isWorkOpen}
                aria-haspopup="true"
                aria-label="Work menu"
                className={cn(
                  "flex items-center gap-1 px-3 py-1.5 text-xs font-medium lowercase tracking-wide transition-all duration-200 rounded-md",
                  isWorkActive
                    ? "text-primary bg-primary/10 scale-105"
                    : "text-foreground hover:text-primary hover:bg-accent/50"
                )}
              >
                work
                <ChevronDown
                  className={cn(
                    "h-3 w-3 transition-transform duration-200",
                    isWorkOpen && "rotate-180"
                  )}
                  aria-hidden="true"
                />
              </button>

              {/* Dropdown Menu */}
              {isWorkOpen && (
                <div
                  onMouseLeave={() => setIsWorkOpen(false)}
                  role="menu"
                  aria-label="Work submenu"
                  className="absolute right-0 top-full mt-2 w-48 rounded-lg border border-border bg-card shadow-xl z-50 animate-in fade-in slide-in-from-top-2 duration-200"
                >
                  <div className="p-2">
                    <a
                      href="#pilot"
                      onClick={handleNavClick}
                      role="menuitem"
                      aria-label="Navigate to 4-week pilots section"
                      className={cn(
                        "block rounded-md px-2.5 py-1.5 text-xs transition-colors",
                        activeSection === "pilot"
                          ? "bg-primary/10 text-primary font-medium"
                          : "text-card-foreground hover:bg-accent hover:text-accent-foreground"
                      )}
                    >
                      <div className="font-medium">4-week pilots</div>
                      <div className="text-[10px] text-muted-foreground">
                        Ship pilot-ready tools
                      </div>
                    </a>

                    <a
                      href="#builds"
                      onClick={handleNavClick}
                      role="menuitem"
                      aria-label="Navigate to recent builds section"
                      className={cn(
                        "block rounded-md px-2.5 py-1.5 text-xs transition-colors",
                        activeSection === "builds"
                          ? "bg-primary/10 text-primary font-medium"
                          : "text-card-foreground hover:bg-accent hover:text-accent-foreground"
                      )}
                    >
                      <div className="font-medium">Recent builds</div>
                      <div className="text-[10px] text-muted-foreground">
                        See what's been shipped
                      </div>
                    </a>

                    <a
                      href="#how"
                      onClick={handleNavClick}
                      role="menuitem"
                      aria-label="Navigate to how it works section"
                      className={cn(
                        "block rounded-md px-2.5 py-1.5 text-xs transition-colors",
                        activeSection === "how"
                          ? "bg-primary/10 text-primary font-medium"
                          : "text-card-foreground hover:bg-accent hover:text-accent-foreground"
                      )}
                    >
                      <div className="font-medium">How it works</div>
                      <div className="text-[10px] text-muted-foreground">
                        Weekly sprint process
                      </div>
                    </a>
                  </div>
                </div>
              )}
            </div>

            <a
              href="#where"
              onClick={handleNavClick}
              aria-label="Navigate to about section"
              aria-current={activeSection === "where" ? "page" : undefined}
              className={cn(
                "px-3 py-1.5 text-xs font-medium lowercase tracking-wide transition-all duration-200 rounded-md",
                activeSection === "where"
                  ? "text-primary bg-primary/10 scale-105"
                  : "text-foreground hover:text-primary hover:bg-accent/50"
              )}
            >
              about
            </a>

            {/* CTA Button */}
            <a
              href="https://scheduler.zoom.us/altruistic-xai"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Book an introduction call (opens in new tab)"
              className="ml-2 rounded-full bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground transition-all duration-200 hover:bg-primary/90 hover:scale-105 shadow-lg shadow-primary/20"
            >
              Book Intro
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsWorkOpen(!isWorkOpen)}
            className="md:hidden inline-flex items-center justify-center rounded-md p-2 text-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
            aria-label="Toggle mobile menu"
            aria-expanded={isWorkOpen}
            aria-controls="mobile-menu"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
            >
              {isWorkOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isWorkOpen && (
          <div 
            id="mobile-menu"
            className="md:hidden border-t border-border/40 py-4 animate-in slide-in-from-top-2 duration-200"
            role="navigation"
            aria-label="Mobile navigation"
          >
            <div className="space-y-1">
              <a
                href="#"
                onClick={handleNavClick}
                aria-label="Navigate to home section"
                aria-current={activeSection === "" ? "page" : undefined}
                className={cn(
                  "block rounded-md px-3 py-2 text-sm font-medium lowercase transition-colors",
                  activeSection === ""
                    ? "text-primary bg-primary/10"
                    : "text-foreground hover:text-primary hover:bg-accent/50"
                )}
              >
                home
              </a>

              <a
                href="/portfolio"
                aria-label="View portfolio lab"
                className="block rounded-md px-3 py-2 text-sm font-medium lowercase text-foreground transition-colors hover:text-primary hover:bg-accent/50"
              >
                lab
              </a>

              <a
                href="https://futurexedu.lovable.app"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="View 2026 snapshot (opens in new tab)"
                className="block rounded-md px-3 py-2 text-sm font-medium lowercase text-foreground transition-colors hover:text-primary hover:bg-accent/50"
              >
                2026 snapshot
              </a>

              <div className="space-y-1 pl-4 pt-2">
                <div className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold mb-2">
                  Work
                </div>
                <a
                  href="#pilot"
                  onClick={handleNavClick}
                  aria-label="Navigate to 4-week pilots section"
                  className={cn(
                    "block rounded-md px-3 py-2 text-xs transition-colors",
                    activeSection === "pilot"
                      ? "text-primary bg-primary/10 font-medium"
                      : "text-foreground hover:text-primary hover:bg-accent/50"
                  )}
                >
                  4-week pilots
                </a>
                <a
                  href="#builds"
                  onClick={handleNavClick}
                  aria-label="Navigate to recent builds section"
                  className={cn(
                    "block rounded-md px-3 py-2 text-xs transition-colors",
                    activeSection === "builds"
                      ? "text-primary bg-primary/10 font-medium"
                      : "text-foreground hover:text-primary hover:bg-accent/50"
                  )}
                >
                  Recent builds
                </a>
                <a
                  href="#how"
                  onClick={handleNavClick}
                  aria-label="Navigate to how it works section"
                  className={cn(
                    "block rounded-md px-3 py-2 text-xs transition-colors",
                    activeSection === "how"
                      ? "text-primary bg-primary/10 font-medium"
                      : "text-foreground hover:text-primary hover:bg-accent/50"
                  )}
                >
                  How it works
                </a>
              </div>

              <a
                href="#where"
                onClick={handleNavClick}
                aria-label="Navigate to about section"
                aria-current={activeSection === "where" ? "page" : undefined}
                className={cn(
                  "block rounded-md px-3 py-2 text-sm font-medium lowercase transition-colors",
                  activeSection === "where"
                    ? "text-primary bg-primary/10"
                    : "text-foreground hover:text-primary hover:bg-accent/50"
                )}
              >
                about
              </a>

              <a
                href="https://scheduler.zoom.us/altruistic-xai"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Book a 30-minute introduction call (opens in new tab)"
                className="mt-4 block rounded-full bg-primary px-4 py-2 text-center text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20"
              >
                Book 30-min Intro
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
    </>
  );
}
