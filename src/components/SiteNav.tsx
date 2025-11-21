import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useActiveSection } from "@/hooks/use-active-section";
import { useFocusTrap } from "@/hooks/use-focus-trap";
import { useHapticFeedback } from "@/hooks/use-haptic-feedback";
import { Menu, X } from "lucide-react";
import { prefetchPortfolio, prefetchFutureProofing } from "@/utils/routePrefetch";
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from "@/components/ui/navigation-menu";
export function SiteNav() {
  const activeSection = useActiveSection(["", "pilot", "builds", "how", "where"]);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const mobileMenuRef = useFocusTrap<HTMLDivElement>(isMobileMenuOpen);
  const mobileMenuButtonRef = useRef<HTMLButtonElement>(null);
  const {
    trigger
  } = useHapticFeedback();
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    trigger('light');
    const href = e.currentTarget.getAttribute("href");
    if (!href) return;

    // Close mobile menu when clicking a link
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
            <span className="body-xs font-semibold uppercase tracking-wider text-primary text-xs">
              AltruisticXAI 
            </span>
          </a>

          {/* Desktop Navigation */}
          <NavigationMenu className="hidden md:flex">
            <NavigationMenuList className="gap-1">
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <a href="#" onClick={handleNavClick} aria-label="Navigate to home section" aria-current={activeSection === "" ? "page" : undefined} className={cn("inline-flex items-center justify-center rounded-md px-3 py-2 body-xs lowercase tracking-wide transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50", activeSection === "" ? "text-primary bg-primary/10" : "text-foreground")}>
                    home
                  </a>
                </NavigationMenuLink>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link to="/portfolio" aria-label="View portfolio lab" className="inline-flex items-center justify-center rounded-md px-3 py-2 body-xs lowercase tracking-wide text-foreground transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none" onMouseEnter={prefetchPortfolio} onFocus={prefetchPortfolio}>
                    lab
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <a href="https://futurexedu.lovable.app" target="_blank" rel="noopener noreferrer" aria-label="View 2026 snapshot (opens in new tab)" className="inline-flex items-center justify-center rounded-md px-3 py-2 body-xs lowercase tracking-wide text-foreground transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none">
                    2026 snapshot
                  </a>
                </NavigationMenuLink>
              </NavigationMenuItem>

              {/* Work Dropdown */}
              <NavigationMenuItem>
                <NavigationMenuTrigger className={cn("body-xs lowercase tracking-wide", isWorkActive ? "text-primary bg-primary/10" : "")}>
                  work
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[280px] gap-1 p-2">
                    <li>
                      <NavigationMenuLink asChild>
                        <a href="#pilot" onClick={handleNavClick} aria-label="Navigate to 4-week pilots section" className={cn("block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground", activeSection === "pilot" ? "bg-primary/10 text-primary" : "")}>
                          <div className="body-sm font-medium leading-none">4-week pilots</div>
                          <p className="micro text-muted-foreground mt-1">
                            Pilot partner model
                          </p>
                        </a>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <a href="#builds" onClick={handleNavClick} aria-label="Navigate to recent builds section" className={cn("block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground", activeSection === "builds" ? "bg-primary/10 text-primary" : "")}>
                          <div className="body-sm font-medium leading-none">Recent builds</div>
                          <p className="micro text-muted-foreground mt-1">
                            See what's been shipped
                          </p>
                        </a>
                      </NavigationMenuLink>
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              {/* Solutions Dropdown */}
              <NavigationMenuItem>
                <NavigationMenuTrigger className="body-xs lowercase tracking-wide">
                  solutions
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[280px] gap-1 p-2">
                    <li>
                      <NavigationMenuLink asChild>
                        <Link to="/solutions/future-proofing" aria-label="Future proofing solutions" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground" onMouseEnter={prefetchFutureProofing} onFocus={prefetchFutureProofing}>
                          <div className="body-sm font-medium leading-none">Future proofing</div>
                          <p className="micro text-muted-foreground mt-1">
                            4-week pilot for schools
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <a href="https://docs.google.com/document/d/150vF2RNZe395m3TTrq3zQTDGjFxsvfuM4CxNvqiRoss/edit?usp=drivesdk" target="_blank" rel="noopener noreferrer" aria-label="Our mission (opens in new tab)" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                          <div className="body-sm font-medium leading-none">Our mission</div>
                          <p className="micro text-muted-foreground mt-1">
                            Learn about our purpose
                          </p>
                        </a>
                      </NavigationMenuLink>
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          {/* CTA Button */}
          <a href="https://scheduler.zoom.us/altruistic-xai" target="_blank" rel="noopener noreferrer" aria-label="Let's talk - schedule a brief intro call (opens in new tab)" className="hidden md:flex ml-2 rounded-full bg-primary px-4 py-2 min-h-[44px] items-center body-xs font-medium text-primary-foreground hover:bg-primary/90 transition-colors shadow-md shadow-primary/20">
            Let's talk
          </a>

          {/* Mobile Menu Button - Touch-friendly size (min 44x44px) */}
          <button ref={mobileMenuButtonRef} onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="md:hidden inline-flex items-center justify-center rounded-md min-w-[44px] min-h-[44px] p-3 text-foreground hover:bg-accent hover:text-accent-foreground transition-colors touch-manipulation" aria-label="Toggle mobile menu" aria-expanded={isMobileMenuOpen} aria-controls="mobile-menu">
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && <div ref={mobileMenuRef} id="mobile-menu" className="md:hidden border-t border-border/40 py-3 animate-in slide-in-from-top-2 duration-200" role="navigation" aria-label="Mobile navigation">
            <div className="space-y-0.5">
              <a href="#" onClick={handleNavClick} aria-label="Navigate to home section" aria-current={activeSection === "" ? "page" : undefined} className={cn("block rounded-md px-4 py-3 min-h-[44px] flex items-center body-sm lowercase transition-colors touch-manipulation", activeSection === "" ? "text-primary bg-primary/10" : "text-foreground hover:text-primary hover:bg-accent/50")}>
                home
              </a>

              <Link to="/portfolio" aria-label="View portfolio lab" className="block rounded-md px-4 py-3 min-h-[44px] flex items-center body-sm lowercase text-foreground transition-colors hover:text-primary hover:bg-accent/50 touch-manipulation" onClick={() => setIsMobileMenuOpen(false)} onMouseEnter={prefetchPortfolio} onFocus={prefetchPortfolio}>
                lab
              </Link>

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
                <Link to="/solutions/future-proofing" onClick={() => setIsMobileMenuOpen(false)} aria-label="Future proofing solutions" className="block rounded-md px-3 py-2.5 min-h-[44px] flex items-center body-xs transition-colors text-foreground hover:text-primary hover:bg-accent/50 touch-manipulation" onMouseEnter={prefetchFutureProofing} onFocus={prefetchFutureProofing}>
                  Future proofing
                </Link>
                <a href="https://docs.google.com/document/d/150vF2RNZe395m3TTrq3zQTDGjFxsvfuM4CxNvqiRoss/edit?usp=drivesdk" target="_blank" rel="noopener noreferrer" onClick={() => setIsMobileMenuOpen(false)} aria-label="Our mission (opens in new tab)" className="block rounded-md px-3 py-2.5 min-h-[44px] flex items-center body-xs transition-colors text-foreground hover:text-primary hover:bg-accent/50 touch-manipulation">
                  Our mission
                </a>
              </div>

              <a href="https://scheduler.zoom.us/altruistic-xai" target="_blank" rel="noopener noreferrer" aria-label="Let's talk - schedule a brief intro call (opens in new tab)" className="mt-4 block rounded-full bg-primary px-5 py-3 min-h-[48px] flex items-center justify-center text-center body-base font-medium text-primary-foreground hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20 touch-manipulation">
                Let's talk
              </a>
            </div>
          </div>}
      </div>
    </nav>
    </>;
}