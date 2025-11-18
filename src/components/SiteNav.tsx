import { useState, useCallback, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useActiveSection } from "@/hooks/use-active-section";
import { Menu, X } from "lucide-react";

interface NavLink {
  href: string;
  label: string;
  section: string;
}

export function SiteNav() {
  const location = useLocation();
  const navigate = useNavigate();
  const activeSection = useActiveSection(["", "pilot", "builds", "where", "faq"]);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const isPortfolioPage = location.pathname === "/portfolio";

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const handleNavClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const href = e.currentTarget.getAttribute("href");
    if (!href) return;

    // Close mobile menu
    setIsMobileMenuOpen(false);

    if (href === "#" || href === "") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    const sectionId = href.replace("#", "");
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  }, []);

  const closeMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(false);
  }, []);

  const navLinks: NavLink[] = [
    { href: "#", label: "Home", section: "" },
    { href: "#pilot", label: "Pilots", section: "pilot" },
    { href: "#builds", label: "Builds", section: "builds" },
    { href: "#where", label: "About", section: "where" },
    { href: "#faq", label: "FAQ", section: "faq" },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur-md supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-14 items-center justify-between">
          {/* Logo/Brand */}
          <a
            href="#"
            onClick={handleNavClick}
            className="flex items-center gap-2 font-itim transition-all hover:opacity-80"
          >
            <span className="text-base sm:text-lg font-bold tracking-wide text-primary">
              AltruisticX
            </span>
            <span className="hidden sm:inline text-xs font-medium text-muted-foreground">
              AI · Weekly Pilots
            </span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:gap-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={handleNavClick}
                className={cn(
                  "px-3 py-1.5 text-sm font-medium transition-all duration-200 rounded-md",
                  activeSection === link.section
                    ? "text-primary bg-primary/10"
                    : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
                )}
              >
                {link.label}
              </a>
            ))}
            
            <Link
              to="/portfolio"
              className={cn(
                "px-3 py-1.5 text-sm font-medium transition-all duration-200 rounded-md",
                isPortfolioPage
                  ? "text-primary bg-primary/10"
                  : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
              )}
              onClick={closeMobileMenu}
            >
              Lab
            </Link>

            {/* CTA Button */}
            <a
              href="https://scheduler.zoom.us/altruistic-xai"
              target="_blank"
              rel="noopener noreferrer"
              className="ml-2 rounded-full bg-gradient-to-r from-primary to-accent px-4 py-1.5 text-sm font-medium text-primary-foreground transition-all duration-200 hover:opacity-90 hover:scale-105 shadow-md shadow-primary/20"
            >
              Book Call
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden inline-flex items-center justify-center rounded-md p-2 text-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-border/40 py-3 animate-in slide-in-from-top-2 duration-200">
            <div className="space-y-1">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={handleNavClick}
                  className={cn(
                    "block rounded-md px-3 py-2 text-sm font-medium transition-colors",
                    activeSection === link.section
                      ? "text-primary bg-primary/10"
                      : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
                  )}
                >
                  {link.label}
                </a>
              ))}
              
              <Link
                to="/portfolio"
                className={cn(
                  "block rounded-md px-3 py-2 text-sm font-medium transition-colors",
                  isPortfolioPage
                    ? "text-primary bg-primary/10"
                    : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
                )}
                onClick={closeMobileMenu}
              >
                Lab
              </Link>

              <a
                href="https://scheduler.zoom.us/altruistic-xai"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 block rounded-full bg-gradient-to-r from-primary to-accent px-4 py-2 text-center text-sm font-medium text-primary-foreground hover:opacity-90 transition-opacity shadow-md shadow-primary/20"
              >
                Book 30-min Call
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
