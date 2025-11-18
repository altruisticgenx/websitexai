import { useState } from "react";
import { cn } from "@/lib/utils";
import { useActiveSection } from "@/hooks/use-active-section";
import { ChevronDown } from "lucide-react";

export function SiteNav() {
  const activeSection = useActiveSection(["hero", "who", "what", "pilots", "how", "why"]);
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

  const isWorkActive = ["who", "what", "pilots", "how", "why"].includes(activeSection);

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo/Brand */}
          <a
            href="#"
            onClick={handleNavClick}
            className="flex flex-col font-itim transition-colors hover:text-primary"
          >
            <span className="text-lg font-semibold uppercase tracking-wider text-primary">
              AltruisticX AI
            </span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:gap-1">
            <a
              href="#hero"
              onClick={handleNavClick}
              className={cn(
                "px-4 py-2 text-sm font-medium lowercase tracking-wide transition-all duration-200 rounded-md",
                activeSection === "hero"
                  ? "text-primary bg-primary/10 scale-105"
                  : "text-foreground hover:text-primary hover:bg-accent/50"
              )}
            >
              home
            </a>

            <a
              href="/portfolio"
              className="px-4 py-2 text-sm font-medium lowercase tracking-wide text-foreground transition-all duration-200 hover:text-primary hover:bg-accent/50 rounded-md"
            >
              lab
            </a>

            {/* Work Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsWorkOpen(!isWorkOpen)}
                onMouseEnter={() => setIsWorkOpen(true)}
                className={cn(
                  "flex items-center gap-1 px-4 py-2 text-sm font-medium lowercase tracking-wide transition-all duration-200 rounded-md",
                  isWorkActive
                    ? "text-primary bg-primary/10 scale-105"
                    : "text-foreground hover:text-primary hover:bg-accent/50"
                )}
              >
                work
                <ChevronDown
                  className={cn(
                    "h-4 w-4 transition-transform duration-200",
                    isWorkOpen && "rotate-180"
                  )}
                />
              </button>

              {/* Dropdown Menu */}
              {isWorkOpen && (
                <div
                  onMouseLeave={() => setIsWorkOpen(false)}
                  className="absolute right-0 top-full mt-2 w-56 rounded-lg border border-border bg-card shadow-xl z-50 animate-in fade-in slide-in-from-top-2 duration-200"
                >
                  <div className="p-2">
                    <a
                      href="#who"
                      onClick={handleNavClick}
                      className={cn(
                        "block rounded-md px-3 py-2 text-sm transition-colors",
                        activeSection === "who"
                          ? "bg-primary/10 text-primary font-medium"
                          : "text-card-foreground hover:bg-accent hover:text-accent-foreground"
                      )}
                    >
                      <div className="font-medium">Who uses this?</div>
                      <div className="text-xs text-muted-foreground">
                        Teams that need proof
                      </div>
                    </a>

                    <a
                      href="#what"
                      onClick={handleNavClick}
                      className={cn(
                        "block rounded-md px-3 py-2 text-sm transition-colors",
                        activeSection === "what"
                          ? "bg-primary/10 text-primary font-medium"
                          : "text-card-foreground hover:bg-accent hover:text-accent-foreground"
                      )}
                    >
                      <div className="font-medium">What you get</div>
                      <div className="text-xs text-muted-foreground">
                        4-week pilot outcomes
                      </div>
                    </a>

                    <a
                      href="#pilots"
                      onClick={handleNavClick}
                      className={cn(
                        "block rounded-md px-3 py-2 text-sm transition-colors",
                        activeSection === "pilots"
                          ? "bg-primary/10 text-primary font-medium"
                          : "text-card-foreground hover:bg-accent hover:text-accent-foreground"
                      )}
                    >
                      <div className="font-medium">Sample pilots</div>
                      <div className="text-xs text-muted-foreground">
                        Real examples
                      </div>
                    </a>

                    <a
                      href="#how"
                      onClick={handleNavClick}
                      className={cn(
                        "block rounded-md px-3 py-2 text-sm transition-colors",
                        activeSection === "how"
                          ? "bg-primary/10 text-primary font-medium"
                          : "text-card-foreground hover:bg-accent hover:text-accent-foreground"
                      )}
                    >
                      <div className="font-medium">How it works</div>
                      <div className="text-xs text-muted-foreground">
                        4-step process
                      </div>
                    </a>

                    <a
                      href="#why"
                      onClick={handleNavClick}
                      className={cn(
                        "block rounded-md px-3 py-2 text-sm transition-colors",
                        activeSection === "why"
                          ? "bg-primary/10 text-primary font-medium"
                          : "text-card-foreground hover:bg-accent hover:text-accent-foreground"
                      )}
                    >
                      <div className="font-medium">Why this model?</div>
                      <div className="text-xs text-muted-foreground">
                        Less risk, more honesty
                      </div>
                    </a>
                  </div>
                </div>
              )}
            </div>

            {/* CTA Button */}
            <a
              href="https://scheduler.zoom.us/altruistic-xai"
              target="_blank"
              rel="noopener noreferrer"
              className="ml-2 rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-all duration-200 hover:bg-primary/90 hover:scale-105 shadow-lg shadow-primary/20"
            >
              Book Intro
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsWorkOpen(!isWorkOpen)}
            className="md:hidden inline-flex items-center justify-center rounded-md p-2 text-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
            aria-label="Toggle menu"
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
          <div className="md:hidden border-t border-border/40 py-4 animate-in slide-in-from-top-2 duration-200">
            <div className="space-y-1">
              <a
                href="#hero"
                onClick={handleNavClick}
                className={cn(
                  "block rounded-md px-3 py-2 text-base font-medium lowercase transition-colors",
                  activeSection === "hero"
                    ? "text-primary bg-primary/10"
                    : "text-foreground hover:text-primary hover:bg-accent/50"
                )}
              >
                home
              </a>

              <a
                href="/portfolio"
                className="block rounded-md px-3 py-2 text-base font-medium lowercase text-foreground transition-colors hover:text-primary hover:bg-accent/50"
              >
                lab
              </a>

              <div className="space-y-1 pl-4 pt-2">
                <div className="text-xs uppercase tracking-wider text-muted-foreground font-semibold mb-2">
                  Work
                </div>
                <a
                  href="#who"
                  onClick={handleNavClick}
                  className={cn(
                    "block rounded-md px-3 py-2 text-sm transition-colors",
                    activeSection === "who"
                      ? "text-primary bg-primary/10 font-medium"
                      : "text-foreground hover:text-primary hover:bg-accent/50"
                  )}
                >
                  Who uses this?
                </a>
                <a
                  href="#what"
                  onClick={handleNavClick}
                  className={cn(
                    "block rounded-md px-3 py-2 text-sm transition-colors",
                    activeSection === "what"
                      ? "text-primary bg-primary/10 font-medium"
                      : "text-foreground hover:text-primary hover:bg-accent/50"
                  )}
                >
                  What you get
                </a>
                <a
                  href="#pilots"
                  onClick={handleNavClick}
                  className={cn(
                    "block rounded-md px-3 py-2 text-sm transition-colors",
                    activeSection === "pilots"
                      ? "text-primary bg-primary/10 font-medium"
                      : "text-foreground hover:text-primary hover:bg-accent/50"
                  )}
                >
                  Sample pilots
                </a>
                <a
                  href="#how"
                  onClick={handleNavClick}
                  className={cn(
                    "block rounded-md px-3 py-2 text-sm transition-colors",
                    activeSection === "how"
                      ? "text-primary bg-primary/10 font-medium"
                      : "text-foreground hover:text-primary hover:bg-accent/50"
                  )}
                >
                  How it works
                </a>
                <a
                  href="#why"
                  onClick={handleNavClick}
                  className={cn(
                    "block rounded-md px-3 py-2 text-sm transition-colors",
                    activeSection === "why"
                      ? "text-primary bg-primary/10 font-medium"
                      : "text-foreground hover:text-primary hover:bg-accent/50"
                  )}
                >
                  Why this model?
                </a>
              </div>

              <a
                href="https://scheduler.zoom.us/altruistic-xai"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 block rounded-full bg-primary px-4 py-2 text-center text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20"
              >
                Book 30-min Intro
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
