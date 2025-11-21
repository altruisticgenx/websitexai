import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import { useActiveSection } from "@/hooks/use-active-section";
import { useFocusTrap } from "@/hooks/use-focus-trap";
import { useHapticFeedback } from "@/hooks/use-haptic-feedback";
import { ChevronDown } from "lucide-react";
export function SiteNav() {
  const activeSection = useActiveSection(["", "pilot", "builds", "how", "where"]);
  const [isWorkOpen, setIsWorkOpen] = useState(false);
  const [isSolutionsOpen, setIsSolutionsOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const mobileMenuRef = useFocusTrap<HTMLDivElement>(isMobileMenuOpen);
  const mobileMenuButtonRef = useRef<HTMLButtonElement>(null);
  const { trigger } = useHapticFeedback();
  
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    trigger('light');
    const href = e.currentTarget.getAttribute("href");
    if (!href) return;

    // Close dropdown and mobile menu when clicking a link
    setIsWorkOpen(false);
    setIsSolutionsOpen(false);
    setIsMobileMenuOpen(false);
    if (href === "#" || href === "") {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
      return;
    }
    const sectionId = href.replace("#", "");
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    }
  };
  const isWorkActive = ["pilot", "builds", "how"].includes(activeSection);

  // Handle ESC key to close mobile menu
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
        // Return focus to the menu button
        mobileMenuButtonRef.current?.focus();
      }
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isMobileMenuOpen]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);
  return <>
      {/* Skip to content link for accessibility */}
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-[100] focus:rounded-md focus:bg-primary focus:px-3 focus:py-2 sm:px-4 focus:text-primary-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2">
        Skip to main content
      </a>
      
      <nav className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/80" aria-label="Main navigation">
        <div className="mx-auto max-w-6xl px-3 sm:px-4 lg:px-6">
        <div className="flex h-14 sm:h-16 items-center justify-between">
          {/* Logo/Brand */}
          <a href="#" onClick={handleNavClick} className="flex flex-col transition-colors hover:text-primary">
            <span className="body-xs font-semibold uppercase tracking-wider text-primary">
              AltruisticX AI
            </span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:gap-1" role="navigation" aria-label="Primary">
            <a href="#" onClick={handleNavClick} aria-label="Navigate to home" aria-current={activeSection === "" ? "page" : undefined} className={cn("px-3 py-2 text-xs font-medium transition-all duration-200 rounded-md", activeSection === "" ? "text-primary bg-primary/10" : "text-muted-foreground hover:text-foreground hover:bg-accent/50")}>
              Home
            </a>

            {/* Pilots Dropdown */}
            <div className="relative">
              <button onClick={() => setIsWorkOpen(!isWorkOpen)} onMouseEnter={() => setIsWorkOpen(true)} aria-expanded={isWorkOpen} aria-haspopup="true" aria-label="Pilots menu" className={cn("flex items-center gap-1 px-3 py-2 text-xs font-medium transition-all duration-200 rounded-md", isWorkActive ? "text-primary bg-primary/10" : "text-muted-foreground hover:text-foreground hover:bg-accent/50")}>
                Pilots
                <ChevronDown className={cn("h-3 w-3 transition-transform duration-200", isWorkOpen && "rotate-180")} aria-hidden="true" />
              </button>

              {/* Dropdown Menu */}
              {isWorkOpen && <div onMouseLeave={() => setIsWorkOpen(false)} role="menu" aria-label="Pilots submenu" className="absolute left-0 top-full mt-2 w-52 rounded-xl border border-border/50 bg-card backdrop-blur-xl shadow-2xl z-50 animate-in fade-in slide-in-from-top-2 duration-200 overflow-hidden">
                  <div className="p-1">
                    <a href="/pilots" onClick={() => setIsWorkOpen(false)} role="menuitem" aria-label="View all pilots" className="block rounded-lg px-3 py-2 transition-colors hover:bg-accent group">
                      <div className="text-sm font-medium text-foreground group-hover:text-primary">Browse Pilots</div>
                      <div className="text-xs text-muted-foreground">
                        Explore 4-week pilot catalog
                      </div>
                    </a>
                    
                    <a href="/pilot-quiz" onClick={() => setIsWorkOpen(false)} role="menuitem" aria-label="Take pilot quiz" className="block rounded-lg px-3 py-2 transition-colors hover:bg-accent group">
                      <div className="text-sm font-medium text-foreground group-hover:text-primary">Find Your Pilot</div>
                      <div className="text-xs text-muted-foreground">
                        Quick quiz for recommendations
                      </div>
                    </a>

                    <div className="my-1 border-t border-border/50" />

                    <a href="#builds" onClick={handleNavClick} role="menuitem" aria-label="Navigate to recent builds" className={cn("block rounded-lg px-3 py-2 transition-colors", activeSection === "builds" ? "bg-primary/10" : "hover:bg-accent group")}>
                      <div className={cn("text-sm font-medium", activeSection === "builds" ? "text-primary" : "text-foreground group-hover:text-primary")}>Recent Builds</div>
                      <div className="text-xs text-muted-foreground">
                        Case studies & outcomes
                      </div>
                    </a>
                  </div>
                </div>}
            </div>

            <a href="/portfolio" aria-label="View lab" className="px-3 py-2 text-xs font-medium text-muted-foreground transition-all duration-200 hover:text-foreground hover:bg-accent/50 rounded-md">
              Lab
            </a>

            {/* Solutions Dropdown */}
            <div className="relative">
              <button onClick={() => setIsSolutionsOpen(!isSolutionsOpen)} onMouseEnter={() => setIsSolutionsOpen(true)} aria-expanded={isSolutionsOpen} aria-haspopup="true" aria-label="Solutions menu" className={cn("flex items-center gap-0.5 px-2 py-1 body-xs lowercase tracking-wide transition-all duration-200 rounded-md min-h-[44px]", "text-foreground hover:text-primary hover:bg-accent/50")}>
                solutions
                <ChevronDown className={cn("h-3 w-3 transition-transform duration-200", isSolutionsOpen && "rotate-180")} aria-hidden="true" />
              </button>

              {/* Dropdown Menu */}
              {isSolutionsOpen && <div onMouseLeave={() => setIsSolutionsOpen(false)} role="menu" aria-label="Solutions submenu" className="absolute right-0 top-full mt-2 w-44 rounded-lg border border-border bg-card/95 backdrop-blur-sm shadow-xl z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="p-1.5">
                    <a href="/solutions/future-proofing" onClick={() => setIsSolutionsOpen(false)} role="menuitem" aria-label="Future proofing solutions" className="block rounded-md px-2 py-1.5 body-xs transition-colors text-card-foreground hover:bg-accent hover:text-accent-foreground min-h-[40px]">
                      <div className="font-medium body-sm">Future proofing</div>
                      <div className="micro text-muted-foreground">
                        4-week pilot for schools
                      </div>
                    </a>
                    <a href="https://docs.google.com/document/d/150vF2RNZe395m3TTrq3zQTDGjFxsvfuM4CxNvqiRoss/edit?usp=drivesdk" target="_blank" rel="noopener noreferrer" onClick={() => setIsSolutionsOpen(false)} role="menuitem" aria-label="Our mission (opens in new tab)" className="block rounded-md px-2 py-1.5 body-xs transition-colors text-card-foreground hover:bg-accent hover:text-accent-foreground min-h-[40px]">
                      <div className="font-medium body-sm">Our mission</div>
                      <div className="micro text-muted-foreground">
                        Learn about our purpose
                      </div>
                    </a>
                  </div>
                </div>}
            </div>

            {/* CTA Button */}
            <a href="https://scheduler.zoom.us/altruistic-xai" target="_blank" rel="noopener noreferrer" aria-label="Book intro call" className="ml-2 rounded-lg bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground hover:bg-primary/90 transition-all shadow-lg shadow-primary/25 hover:shadow-primary/40">
              Book Call
            </a>
          </div>

          {/* Mobile Menu Button - Touch-friendly size (min 44x44px) */}
          <button ref={mobileMenuButtonRef} onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="md:hidden inline-flex items-center justify-center rounded-md min-w-[44px] min-h-[44px] p-3 text-foreground hover:bg-accent hover:text-accent-foreground transition-colors touch-manipulation" aria-label="Toggle mobile menu" aria-expanded={isMobileMenuOpen} aria-controls="mobile-menu">
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
              {isMobileMenuOpen ? <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /> : <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && <div ref={mobileMenuRef} id="mobile-menu" className="md:hidden border-t border-border/40 py-3 animate-in slide-in-from-top-2 duration-200" role="navigation" aria-label="Mobile navigation">
            <div className="space-y-1 px-2">
              <a href="#" onClick={handleNavClick} aria-label="Navigate to home" aria-current={activeSection === "" ? "page" : undefined} className={cn("block rounded-lg px-3 py-2.5 text-sm font-medium transition-colors touch-manipulation", activeSection === "" ? "text-primary bg-primary/10" : "text-foreground hover:bg-accent/50")}>
                Home
              </a>

              <div className="pt-2 pb-1">
                <div className="text-xs font-semibold text-muted-foreground px-3 mb-1">
                  Pilots
                </div>
                <div className="space-y-0.5">
                  <a href="/pilots" onClick={() => setIsMobileMenuOpen(false)} aria-label="Browse all pilots" className="block rounded-lg px-3 py-2 text-sm transition-colors text-foreground hover:bg-accent/50 touch-manipulation">
                    Browse Pilots
                  </a>
                  <a href="/pilot-quiz" onClick={() => setIsMobileMenuOpen(false)} aria-label="Take pilot quiz" className="block rounded-lg px-3 py-2 text-sm transition-colors text-foreground hover:bg-accent/50 touch-manipulation">
                    Find Your Pilot
                  </a>
                  <a href="#builds" onClick={handleNavClick} aria-label="Navigate to recent builds" className={cn("block rounded-lg px-3 py-2 text-sm transition-colors touch-manipulation", activeSection === "builds" ? "text-primary bg-primary/10 font-medium" : "text-foreground hover:bg-accent/50")}>
                    Recent Builds
                  </a>
                </div>
              </div>

              <a href="/portfolio" onClick={() => setIsMobileMenuOpen(false)} aria-label="View lab" className="block rounded-lg px-3 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-accent/50 touch-manipulation">
                Lab
              </a>

              <div className="pt-2 pb-1">
                <div className="text-xs font-semibold text-muted-foreground px-3 mb-1">
                  Solutions
                </div>
                <div className="space-y-0.5">
                  <a href="/solutions/future-proofing" onClick={() => setIsMobileMenuOpen(false)} aria-label="Future proofing" className="block rounded-lg px-3 py-2 text-sm transition-colors text-foreground hover:bg-accent/50 touch-manipulation">
                    Future Proofing
                  </a>
                  <a href="https://docs.google.com/document/d/150vF2RNZe395m3TTrq3zQTDGjFxsvfuM4CxNvqiRoss/edit?usp=drivesdk" target="_blank" rel="noopener noreferrer" onClick={() => setIsMobileMenuOpen(false)} aria-label="Our mission" className="block rounded-lg px-3 py-2 text-sm transition-colors text-foreground hover:bg-accent/50 touch-manipulation">
                    Our Mission
                  </a>
                </div>
              </div>

              <div className="pt-4">
                <a href="https://scheduler.zoom.us/altruistic-xai" target="_blank" rel="noopener noreferrer" aria-label="Book intro call" className="block rounded-lg bg-primary px-4 py-3 text-center text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-all shadow-lg shadow-primary/25 touch-manipulation">
                  Book Intro Call
                </a>
              </div>
            </div>
          </div>}
      </div>
    </nav>
    </>;
}