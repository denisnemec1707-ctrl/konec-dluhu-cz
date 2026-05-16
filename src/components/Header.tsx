import { useState } from "react";
import { Menu, X } from "lucide-react";
import Logo from "./Logo";

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const navItems = [
    { label: "Domů", href: "#hero" },
    { label: "Pro koho", href: "#solutions" },
    { label: "Služby", href: "#services" },
    { label: "O nás", href: "#about" },
    { label: "Kontakt", href: "#contact-form" },
  ];

  const scrollTo = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border/50">
      <div className="max-w-6xl mx-auto px-6 py-3 flex items-center justify-between">
        <Logo variant="full" size="sm" />

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <button
              key={item.href}
              onClick={() => scrollTo(item.href)}
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors uppercase tracking-wider"
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-foreground"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-background border-t border-border">
          <nav className="flex flex-col px-6 py-4 gap-4">
            {navItems.map((item) => (
              <button
                key={item.href}
                onClick={() => scrollTo(item.href)}
                className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors uppercase tracking-wider text-left"
              >
                {item.label}
              </button>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
