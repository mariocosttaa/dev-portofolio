import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { ThemeToggle } from "./ThemeToggle";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { Menu, X } from "lucide-react";
import { getNavigation, getPersonalInfo } from "@/lib/api";
import { useDetailPanel } from "@/contexts/DetailPanelContext";
import { useTheme } from "@/hooks/useTheme";
import { useLanguage } from "@/contexts/LanguageContext";
import { cn } from "@/lib/utils";

export function Navbar() {
  const { t, language } = useLanguage();
  const navLinks = getNavigation(language).links;
  const personal = getPersonalInfo(language);
  const { isOpen: isDetailPanelOpen } = useDetailPanel();
  const location = useLocation();
  const { theme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [logoSrc, setLogoSrc] = useState<string>(
    theme === "dark" ? "/mario-costa-dev-logo-dark.svg" : "/mario-costa-dev-logo.svg"
  );
  
  // Map navigation keys to translation keys
  const navTranslationMap: Record<string, string> = {
    "Work": "nav.work",
    "Projects": "nav.projects",
    "About": "nav.about",
    "Education": "nav.education",
    "Skills": "nav.skills",
    "Contact": "nav.contact",
  };

  useEffect(() => {
    setLogoSrc(theme === "dark" ? "/mario-costa-dev-logo-dark.svg" : "/mario-costa-dev-logo.svg");
  }, [theme]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={cn(
        "fixed top-4 left-1/2 -translate-x-1/2 z-[60] transition-all duration-500",
        isScrolled 
          ? "glass-strong rounded-full px-6 py-3 shadow-2xl" 
          : "bg-transparent px-6 py-4",
        isDetailPanelOpen && "md:left-4 md:translate-x-0 md:opacity-30 md:hover:opacity-60"
      )}
    >
      <div className="flex items-center gap-8">
        <Link
          to="/"
          className="flex items-center gap-2 font-bold text-lg text-foreground hover:opacity-80 transition-opacity"
        >
          <img
            src={logoSrc}
            alt="Mário Costa"
            style={{ width: "400px", height: "auto", maxHeight: "none" }}
            className="object-contain"
            key={theme}
          />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => {
            const isActive = link.href.startsWith("/") 
              ? location.pathname === link.href
              : (location.pathname === "/" && (location.hash === link.href || (link.href === "#work" && !location.hash)));
            
            return link.href.startsWith("/") ? (
              <Link
                key={link.name}
                to={link.href}
                className={cn(
                  "text-sm font-medium transition-colors relative group",
                  isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                )}
              >
                {t(navTranslationMap[link.name] || link.name)}
                <span className={cn(
                  "absolute -bottom-1 left-0 h-0.5 bg-primary transition-all duration-300",
                  isActive ? "w-full" : "w-0 group-hover:w-full"
                )} />
              </Link>
            ) : (
              <Link
                key={link.name}
                to={link.href.startsWith("#") ? `/${link.href}` : link.href}
                onClick={(e) => {
                  // Handle hash links
                  if (link.href.startsWith("#")) {
                    if (location.pathname === "/") {
                      // If already on home, scroll smoothly
                      e.preventDefault();
                      const element = document.querySelector(link.href);
                      if (element) {
                        element.scrollIntoView({ behavior: "smooth", block: "start" });
                      }
                    }
                    // If on different page, Link will navigate to /#section and Index.tsx will handle scrolling
                  }
                }}
                className={cn(
                  "text-sm font-medium transition-colors relative group",
                  isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                )}
              >
                {t(navTranslationMap[link.name] || link.name)}
                <span className={cn(
                  "absolute -bottom-1 left-0 h-0.5 bg-primary transition-all duration-300",
                  isActive ? "w-full" : "w-0 group-hover:w-full"
                )} />
              </Link>
            );
          })}
        </div>

        <div className="flex items-center gap-3">
          <LanguageSwitcher />
          <ThemeToggle />
          
          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-foreground hover:text-primary transition-colors"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-1/2 -translate-x-1/2 mt-4 glass-strong rounded-2xl p-4 animate-scale-in min-w-[200px]">
          <div className="flex flex-col gap-2">
            {navLinks.map((link) => {
              const isActive = link.href.startsWith("/") 
                ? location.pathname === link.href
                : location.hash === link.href;
              
              return link.href.startsWith("/") ? (
                <Link
                  key={link.name}
                  to={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={cn(
                    "text-base font-medium transition-colors py-3 px-4 rounded-xl",
                    isActive 
                      ? "text-foreground bg-muted" 
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                  )}
                >
                  {t(navTranslationMap[link.name] || link.name)}
                </Link>
              ) : (
                <Link
                  key={link.name}
                  to={link.href.startsWith("#") ? `/${link.href}` : link.href}
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    // Handle hash links
                    if (link.href.startsWith("#") && location.pathname === "/") {
                      // If already on home, scroll smoothly after menu closes
                      setTimeout(() => {
                        const element = document.querySelector(link.href);
                        if (element) {
                          element.scrollIntoView({ behavior: "smooth", block: "start" });
                        }
                      }, 100);
                    }
                    // If on different page, Link will navigate to /#section and Index.tsx will handle scrolling
                  }}
                  className={cn(
                    "text-base font-medium transition-colors py-3 px-4 rounded-xl",
                    isActive 
                      ? "text-foreground bg-muted" 
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                  )}
                >
                  {t(navTranslationMap[link.name] || link.name)}
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </nav>
  );
}
