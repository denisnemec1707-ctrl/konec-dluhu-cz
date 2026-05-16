import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";
import MultiStepForm from "./MultiStepForm";

const FloatingCTA = () => {
  const [visible, setVisible] = useState(false);
  const [overlayOpen, setOverlayOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const hero = document.getElementById("hero");
      if (hero) setVisible(window.scrollY > hero.offsetHeight);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToForm = () => {
    document.getElementById("contact-form")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      {/* Mobile overlay */}
      {overlayOpen && (
        <MultiStepForm isOverlay onClose={() => setOverlayOpen(false)} />
      )}

      {/* Desktop: floating button */}
      {visible && (
        <Button
          onClick={scrollToForm}
          className="hidden lg:flex fixed bottom-5 right-4 sm:bottom-6 sm:right-6 z-50 rounded-full shadow-2xl bg-accent-gold hover:bg-accent-gold/90 text-accent-gold-foreground px-4 sm:px-6 py-5 sm:py-6 text-sm sm:text-base font-semibold gap-2 transition-all duration-300"
        >
          <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5" />
          <span>Chci poradit zdarma</span>
        </Button>
      )}

      {/* Mobile: sticky bottom bar */}
      <div
        className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-background border-t border-border px-4 py-3"
        style={{ paddingBottom: "calc(12px + env(safe-area-inset-bottom))" }}
      >
        <Button
          onClick={() => setOverlayOpen(true)}
          className="w-full h-13 text-base font-bold rounded-2xl bg-accent-gold hover:bg-accent-gold/90 text-accent-gold-foreground shadow-lg"
        >
          Chci bezplatné poradenství →
        </Button>
        {/* TODO: az bude cislo, pridat tlacidlo zavolat */}
      </div>
    </>
  );
};

export default FloatingCTA;
