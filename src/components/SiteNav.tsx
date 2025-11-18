import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuContent,
  NavigationMenuTrigger,
  NavigationMenuLink,
  NavigationMenuIndicator,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";

const navLinkClass =
  "block w-full text-center text-[2.2rem] leading-tight lowercase tracking-[0.05em] transition-colors duration-300";

export function SiteNav() {
  return (
    <div className="relative mx-auto w-full max-w-4xl pt-4 text-foreground">
      {/* Top bar */}
      <NavigationMenu className="w-full justify-center">
        <NavigationMenuList className="grid w-full grid-cols-4 items-center gap-2">
          {/* Home */}
          <NavigationMenuItem>
            <NavigationMenuLink asChild>
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className={cn(navLinkClass, "text-primary hover:text-primary/80")}
              >
                home
              </a>
            </NavigationMenuLink>
          </NavigationMenuItem>

          {/* Lab / Blog */}
          <NavigationMenuItem>
            <NavigationMenuLink asChild>
              <a 
                href="/portfolio" 
                className={cn(navLinkClass, "hover:text-primary")}
              >
                lab
              </a>
            </NavigationMenuLink>
          </NavigationMenuItem>

          {/* Work dropdown */}
          <NavigationMenuItem>
            <NavigationMenuTrigger
              className={cn(
                navLinkClass,
                "bg-transparent p-0 hover:bg-transparent focus:bg-transparent hover:text-primary data-[state=open]:text-primary"
              )}
            >
              work
            </NavigationMenuTrigger>
            <NavigationMenuContent className="mt-3 rounded-2xl border border-border bg-popover/95 backdrop-blur-sm px-4 py-3 shadow-lg">
              <ul className="grid gap-2 text-sm text-foreground md:w-64">
                <li>
                  <NavigationMenuLink asChild>
                    <a
                      href="#pilot"
                      className="block rounded-md px-2 py-1 hover:bg-accent hover:text-accent-foreground transition-colors"
                    >
                      4-week pilots
                    </a>
                  </NavigationMenuLink>
                </li>
                <li>
                  <NavigationMenuLink asChild>
                    <a
                      href="#builds"
                      className="block rounded-md px-2 py-1 hover:bg-accent hover:text-accent-foreground transition-colors"
                    >
                      pilot proposals
                    </a>
                  </NavigationMenuLink>
                </li>
                <li>
                  <NavigationMenuLink asChild>
                    <a
                      href="#how"
                      className="block rounded-md px-2 py-1 hover:bg-accent hover:text-accent-foreground transition-colors"
                    >
                      recurring / saas
                    </a>
                  </NavigationMenuLink>
                </li>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>

          {/* About */}
          <NavigationMenuItem>
            <NavigationMenuLink asChild>
              <a 
                href="#where" 
                className={cn(navLinkClass, "hover:text-primary")}
              >
                about
              </a>
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>

        <NavigationMenuIndicator />
      </NavigationMenu>

      {/* Squiggle underline */}
      <svg
        className="mt-1 w-full text-primary"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 977.2 18.2"
      >
        <path
          className="squiggle"
          fill="none"
          stroke="currentColor"
          strokeMiterlimit="10"
          strokeLinecap="round"
          strokeWidth="4"
          d="M.8 5.6a13.6 13.6 0 0 1 20.3 0l6.2 7a13.6 13.6 0 0 0 20.3 0l6.2-7a13.6 13.6 0 0 1 20.4 0l6.2 7a13.6 13.6 0 0 0 20.3 0l6.2-7a13.6 13.6 0 0 1 20.4 0l6.1 7a13.6 13.6 0 0 0 20.4 0l6.2-7a13.6 13.6 0 0 1 20.3 0l6.2 7a13.6 13.6 0 0 0 20.4 0l6.1-7a13.6 13.6 0 0 1 20.4 0l6.2 7a13.6 13.6 0 0 0 20.3 0l6.2-7a13.6 13.6 0 0 1 20.4 0l6.2 7a13.6 13.6 0 0 0 20.3 0l6.2-7a13.6 13.6 0 0 1 20.3 0l6.2 7a13.6 13.6 0 0 0 20.4 0l6.2-7a13.6 13.6 0 0 1 20.3 0l6.2 7a13.6 13.6 0 0 0 20.3 0l6.2-7a13.6 13.6 0 0 1 20.4 0l6.2 7a13.6 13.6 0 0 0 20.3 0l6.2-7a13.6 13.6 0 0 1 20.3 0l6.2 7a13.6 13.6 0 0 0 20.4 0l6.2-7a13.6 13.6 0 0 1 20.3 0l6.2 7a13.6 13.6 0 0 0 20.4 0l6.2-7a13.6 13.6 0 0 1 20.3 0l6.2 7a13.6 13.6 0 0 0 20.3 0l6.2-7a13.6 13.6 0 0 1 20.4 0l6.2 7a13.6 13.6 0 0 0 20.3 0l6.2-7a13.6 13.6 0 0 1 20.3 0l6.2 7a13.6 13.6 0 0 0 20.4 0l6.2-7a13.6 13.6 0 0 1 20.3 0l6.2 7a13.6 13.6 0 0 0 20.3 0l6.2-7a13.6 13.6 0 0 1 20.4 0l6.2 7a13.6 13.6 0 0 0 20.3 0l6.2-7a13.6 13.6 0 0 1 20.3 0l6.2 7a13.6 13.6 0 0 0 20.4 0l6.2-7a13.6 13.6 0 0 1 20.3 0l6.2 7a13.6 13.6 0 0 0 20.4 0l6.2-7a13.6 13.6 0 0 1 20.3 0l6.2 7a13.6 13.6 0 0 0 20.3 0l6.2-7a13.6 13.6 0 0 1 20.4 0l6.2 7a13.6 13.6 0 0 0 20.3 0l6.2-7a13.6 13.6 0 0 1 20.3 0l6.2 7a13.6 13.6 0 0 0 20.4 0l6.2-7a13.6 13.6 0 0 1 20.3 0l6.2 7a13.6 13.6 0 0 0 20.3 0l6.2-7a13.6 13.6 0 0 1 20.4 0l6.2 7a13.6 13.6 0 0 0 20.3 0l6.2-7a13.6 13.6 0 0 1 20.3 0l6.2 7a13.6 13.6 0 0 0 20.4 0l6.2-7a13.6 13.6 0 0 1 20.3 0l6.2 7a13.6 13.6 0 0 0 20.4 0l6.2-7a13.6 13.6 0 0 1 20.3 0l6.2 7a13.6 13.6 0 0 0 20.3 0l6.2-7a13.6 13.6 0 0 1 20.4 0l6.2 7a13.6 13.6 0 0 0 20.3 0l6.2-7a13.6 13.6 0 0 1 20.3 0l6.2 7a13.6 13.6 0 0 0 20.4 0l6.2-7a13.6 13.6 0 0 1 20.3 0l6.2 7a13.6 13.6 0 0 0 20.3 0l6.2-7a13.6 13.6 0 0 1 20.4 0l6.2 7a13.6 13.6 0 0 0 20.3 0l6.2-7a13.6 13.6 0 0 1 20.3 0l6.2 7a13.6 13.6 0 0 0 20.4 0l6.2-7a13.6 13.6 0 0 1 20.3 0l6.2 7a13.6 13.6 0 0 0 20.3 0l6.2-7a13.6 13.6 0 0 1 20.4 0l6.2 7a13.6 13.6 0 0 0 20.3 0l6.2-7a13.6 13.6 0 0 1 20.3 0l6.2 7a13.6 13.6 0 0 0 20.4 0l6.2-7a13.6 13.6 0 0 1 20.3 0l6.2 7a13.6 13.6 0 0 0 20.4 0l6.2-7a13.6 13.6 0 0 1 20.3 0l6.2 7a13.6 13.6 0 0 0 20.3 0l6.2-7a13.6 13.6 0 0 1 20.4 0l6.2 7a13.6 13.6 0 0 0 20.3 0l6.2-7a13.6 13.6 0 0 1 20.3 0l6.2 7a13.6 13.6 0 0 0 20.4 0l6.2-7a13.6 13.6 0 0 1 20.3 0l6.2 7a13.6 13.6 0 0 0 20.3 0l6.2-7a13.6 13.6 0 0 1 20.4 0l6.2 7a13.6 13.6 0 0 0 20.3 0"
        />
      </svg>
    </div>
  );
}
