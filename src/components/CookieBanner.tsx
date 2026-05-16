import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Cookie, X } from "lucide-react";

declare global {
  interface Window { gtag?: (...args: unknown[]) => void; }
}

const COOKIE_KEY = "nemocapital_cookie_consent";

const CookieBanner = () => {
  const [visible, setVisible] = useState(false);
  const [showDetail, setShowDetail] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem(COOKIE_KEY);
    if (!consent) setVisible(true);
  }, []);

  const accept = () => {
    localStorage.setItem(COOKIE_KEY, "accepted");
    setVisible(false);
    if (typeof window.gtag === "function") {
      window.gtag("consent", "update", {
        ad_storage: "granted",
        ad_user_data: "granted",
        ad_personalization: "granted",
        analytics_storage: "granted",
      });
    }
  };

  const reject = () => {
    localStorage.setItem(COOKIE_KEY, "rejected");
    setVisible(false);
    if (typeof window.gtag === "function") {
      window.gtag("consent", "update", {
        ad_storage: "denied",
        ad_user_data: "denied",
        ad_personalization: "denied",
        analytics_storage: "denied",
      });
    }
  };

  if (!visible) return null;

  return (
    <div className="hidden md:block fixed bottom-0 left-0 right-0 z-[100] p-4 md:p-6">
      <div className="max-w-4xl mx-auto bg-foreground text-background rounded-2xl shadow-2xl p-5 md:p-6">
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0 w-10 h-10 rounded-full bg-background/10 flex items-center justify-center mt-0.5">
            <Cookie className="w-5 h-5 text-accent-gold" />
          </div>

          <div className="flex-1 min-w-0">
            <p className="text-sm text-background/80 leading-relaxed">
              Používáme cookies pro zajištění správného fungování webu.{" "}
              <button
                onClick={() => setShowDetail(!showDetail)}
                className="text-background/50 hover:text-background/80 underline transition-colors"
              >
                {showDetail ? "Skrýt podrobnosti" : "Více informací"}
              </button>
            </p>

            {showDetail && (
              <div className="mt-3 text-xs text-background/50 leading-relaxed space-y-1">
                <p><span className="text-background/70 font-medium">Nezbytné cookies:</span> Zajišťují základní funkce webu (formulář, navigace). Nelze odmítnout.</p>
                <p><span className="text-background/70 font-medium">Analytické cookies:</span> Pomáhají nám pochopit, jak návštěvníci web používají. Pouze se souhlasem.</p>
                <p className="pt-1">Správce údajů: NemoCapital s.r.o., info@nemocapital.cz</p>
              </div>
            )}
          </div>

          <button
            onClick={reject}
            className="flex-shrink-0 text-background/30 hover:text-background/60 transition-colors mt-0.5"
            aria-label="Zavřít"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="flex flex-wrap gap-3 mt-4 ml-14">
          <Button
            onClick={accept}
            size="sm"
            className="rounded-full bg-accent-gold hover:bg-accent-gold/90 text-accent-gold-foreground font-semibold px-6"
          >
            Přijmout vše
          </Button>
          <Button
            onClick={reject}
            size="sm"
            variant="outline"
            className="rounded-full border-background/20 text-background/70 bg-transparent hover:bg-background/10 px-6"
          >
            Pouze nezbytné
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CookieBanner;
