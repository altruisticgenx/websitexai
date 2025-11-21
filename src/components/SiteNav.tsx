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
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-[100] focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2">
        Skip to main content
      </a>
      
      <nav className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/80" aria-label="Main navigation">
        <div className="mx-auto max-w-6xl px-3 sm:px-4">
        <div className="flex h-14 sm:h-16 items-center justify-between">
          {/* Logo/Brand */}
          <a href="#" onClick={handleNavClick} className="flex flex-col transition-colors hover:text-primary">
            <span className="body-xs font-semibold uppercase tracking-wider text-primary">
              AltruisticX AI
            </span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:gap-1" role="navigation" aria-label="Primary">
            <a href="#" onClick={handleNavClick} aria-label="Navigate to home section" aria-current={activeSection === "" ? "page" : undefined} className={cn("px-2 py-1 body-xs lowercase tracking-wide transition-all duration-200 rounded-md", activeSection === "" ? "text-primary bg-primary/10" : "text-foreground hover:text-primary hover:bg-accent/50")}>
              home
            </a>

            <a href="/portfolio" aria-label="View portfolio lab" className="px-2 py-1 body-xs lowercase tracking-wide text-foreground transition-all duration-200 hover:text-primary hover:bg-accent/50 rounded-md">
              lab
            </a>

            <a href="https://futurexedu.lovable.app" target="_blank" rel="noopener noreferrer" aria-label="View 2026 snapshot (opens in new tab)" className="px-2 py-1 body-xs lowercase tracking-wide text-foreground transition-all duration-200 hover:text-primary hover:bg-accent/50 rounded-md">
              2026 snapshot
            </a>

            {/* Work Dropdown */}
            <div className="relative">
              <button onClick={() => setIsWorkOpen(!isWorkOpen)} onMouseEnter={() => setIsWorkOpen(true)} aria-expanded={isWorkOpen} aria-haspopup="true" aria-label="Work menu" className={cn("flex items-center gap-0.5 px-2 py-1 body-xs lowercase tracking-wide transition-all duration-200 rounded-md", isWorkActive ? "text-primary bg-primary/10" : "text-foreground hover:text-primary hover:bg-accent/50")}>
                work
                <ChevronDown className={cn("h-3 w-3 transition-transform duration-200", isWorkOpen && "rotate-180")} aria-hidden="true" />
              </button>

              {/* Dropdown Menu */}
              {isWorkOpen && <div onMouseLeave={() => setIsWorkOpen(false)} role="menu" aria-label="Work submenu" className="absolute right-0 top-full mt-2 w-44 rounded-lg border border-border bg-card/95 backdrop-blur-sm shadow-xl z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="p-1.5">
                    <a href="#pilot" onClick={handleNavClick} role="menuitem" aria-label="Navigate to 4-week pilots section" className={cn("block rounded-md px-2 py-1.5 body-xs transition-colors", activeSection === "pilot" ? "bg-primary/10 text-primary font-medium" : "text-card-foreground hover:bg-accent hover:text-accent-foreground")}>
                      <div className="font-medium body-sm">4-week pilots</div>
                      <div className="micro text-muted-foreground">
                        Pilot partner model
                      </div>
                    </a>

                    <a href="#builds" onClick={handleNavClick} role="menuitem" aria-label="Navigate to recent builds section" className={cn("block rounded-md px-2 py-1.5 body-xs transition-colors", activeSection === "builds" ? "bg-primary/10 text-primary font-medium" : "text-card-foreground hover:bg-accent hover:text-accent-foreground")}>
                      <div className="font-medium body-sm">Recent builds</div>
                      <div className="micro text-muted-foreground">
                        See what's been shipped
                      </div>
                    </a>
                  </div>
                </div>}
            </div>

            {/* Solutions Dropdown */}
            <div className="relative">
              <button onClick={() => setIsSolutionsOpen(!isSolutionsOpen)} onMouseEnter={() => setIsSolutionsOpen(true)} aria-expanded={isSolutionsOpen} aria-haspopup="true" aria-label="Solutions menu" className={cn("flex items-center gap-0.5 px-2 py-1 body-xs lowercase tracking-wide transition-all duration-200 rounded-md", "text-foreground hover:text-primary hover:bg-accent/50")}>
                solutions
                <ChevronDown className={cn("h-3 w-3 transition-transform duration-200", isSolutionsOpen && "rotate-180")} aria-hidden="true" />
              </button>

              {/* Dropdown Menu */}
              {isSolutionsOpen && <div onMouseLeave={() => setIsSolutionsOpen(false)} role="menu" aria-label="Solutions submenu" className="absolute right-0 top-full mt-2 w-44 rounded-lg border border-border bg-card/95 backdrop-blur-sm shadow-xl z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="p-1.5">
                    <a href="/solutions/future-proofing" onClick={() => setIsSolutionsOpen(false)} role="menuitem" aria-label="Future proofing solutions" className="block rounded-md px-2 py-1.5 body-xs transition-colors text-card-foreground hover:bg-accent hover:text-accent-foreground">
                      <div className="font-medium body-sm">Future proofing</div>
                      <div className="micro text-muted-foreground">
                        4-week pilot for schools
                      </div>
                    </a>
                    <a href="https://docs.google.com/document/d/150vF2RNZe395m3TTrq3zQTDGjFxsvfuM4CxNvqiRoss/edit?usp=drivesdk" target="_blank" rel="noopener noreferrer" onClick={() => setIsSolutionsOpen(false)} role="menuitem" aria-label="Our mission (opens in new tab)" className="block rounded-md px-2 py-1.5 body-xs transition-colors text-card-foreground hover:bg-accent hover:text-accent-foreground">
                      <div className="font-medium body-sm">Our mission</div>
                      <div className="micro text-muted-foreground">
                        Learn about our purpose
                      </div>
                    </a>
                  </div>
                </div>}
            </div>

            {/* CTA Button */}
            <a href="https://us06web.zoom.us/launch/chat?src=direct_chat_link&email=altruisticxai@gmail.com" target="_blank" rel="noopener noreferrer" aria-label="Start Zoom chat (opens in new tab)" className="ml-2 rounded-full bg-primary px-4 py-2 min-h-[44px] flex items-center body-xs font-medium text-primary-foreground hover:bg-primary/90 transition-colors shadow-md shadow-primary/20">
              Book Intro
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
            <div className="space-y-0.5">
              <a href="#" onClick={handleNavClick} aria-label="Navigate to home section" aria-current={activeSection === "" ? "page" : undefined} className={cn("block rounded-md px-4 py-3 min-h-[44px] flex items-center body-sm lowercase transition-colors touch-manipulation", activeSection === "" ? "text-primary bg-primary/10" : "text-foreground hover:text-primary hover:bg-accent/50")}>
                home
              </a>

              <a href="/portfolio" aria-label="View portfolio lab" className="block rounded-md px-4 py-3 min-h-[44px] flex items-center body-sm lowercase text-foreground transition-colors hover:text-primary hover:bg-accent/50 touch-manipulation">
                lab
              </a>

              <a href="https://futurexedu.lovable.app" target="_blank" rel="noopener noreferrer" aria-label="View 2026 snapshot (opens in new tab)" className="block rounded-md px-4 py-3 min-h-[44px] flex items-center body-sm lowercase text-foreground transition-colors hover:text-primary hover:bg-accent/50 touch-manipulation">
                2026 snapshot
              </a>

              <div className="space-y-0.5 pl-3 pt-2">
                <div className="overline text-muted-foreground mb-1.5">
                  Work
                </div>
                <a href="#pilot" onClick={handleNavClick} aria-label="Navigate to 4-week pilots section" className={cn("block rounded-md px-3 py-2.5 min-h-[44px] flex items-center body-xs transition-colors touch-manipulation", activeSection === "pilot" ? "text-primary bg-primary/10 font-medium" : "text-foreground hover:text-primary hover:bg-accent/50")}>
                  4-week pilots
                </a>
                <a href="#builds" onClick={handleNavClick} aria-label="Navigate to recent builds section" className={cn("block rounded-md px-3 py-2.5 min-h-[44px] flex items-center body-xs transition-colors touch-manipulation", activeSection === "builds" ? "text-primary bg-primary/10 font-medium" : "text-foreground hover:text-primary hover:bg-accent/50")}>
                  Recent builds
                </a>
                <a href="#how" onClick={handleNavClick} aria-label="Navigate to how it works section" className={cn("block rounded-md px-3 py-2.5 min-h-[44px] flex items-center body-xs transition-colors touch-manipulation", activeSection === "how" ? "text-primary bg-primary/10 font-medium" : "text-foreground hover:text-primary hover:bg-accent/50")}>
                  How it works
                </a>
              </div>

              <div className="space-y-0.5 pl-3 pt-2">
                <div className="overline text-muted-foreground mb-1.5">
                  Solutions
                </div>
                <a href="/solutions/future-proofing" onClick={() => setIsMobileMenuOpen(false)} aria-label="Future proofing solutions" className="block rounded-md px-3 py-2.5 min-h-[44px] flex items-center body-xs transition-colors text-foreground hover:text-primary hover:bg-accent/50 touch-manipulation">
                  Future proofing
                </a>
                <a href="https://docs.google.com/document/d/150vF2RNZe395m3TTrq3zQTDGjFxsvfuM4CxNvqiRoss/edit?usp=drivesdk" target="_blank" rel="noopener noreferrer" onClick={() => setIsMobileMenuOpen(false)} aria-label="Our mission (opens in new tab)" className="block rounded-md px-3 py-2.5 min-h-[44px] flex items-center body-xs transition-colors text-foreground hover:text-primary hover:bg-accent/50 touch-manipulation">
                  Our mission
                </a>
              </div>

              <a href="https://us06web.zoom.us/launch/chat?src=direct_chat_link&email=altruisticxai@gmail.com" target="_blank" rel="noopener noreferrer" aria-label="Start Zoom chat (opens in new tab)" className="mt-4 block rounded-full bg-primary px-5 py-3 min-h-[48px] flex items-center justify-center text-center body-base font-medium text-primary-foreground hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20 touch-manipulation">
                Book 30-min Intro
              </a>
            </div>
          </div>}
      </div>
    </nav>
    </>;
}