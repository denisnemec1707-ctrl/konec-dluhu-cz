import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Home, ArrowLeft } from "lucide-react";
import Logo from "@/components/Logo";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404:", location.pathname);
  }, [location.pathname]);

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-6 text-center relative overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #0f2a5e 0%, #1a4494 50%, #0d3b7a 100%)",
      }}
    >
      <div className="absolute top-6 left-6">
        <a href="/">
          <Logo variant="full" size="sm" className="[&_.text-primary]:!text-blue-300 [&_.text-foreground]:!text-white/70" />
        </a>
      </div>

      <div className="relative z-10 max-w-lg space-y-6">
        <div
          className="text-[120px] md:text-[160px] font-bold leading-none select-none"
          style={{ color: "rgba(255,255,255,0.07)" }}
        >
          404
        </div>

        <div className="-mt-10 space-y-3">
          <h1 className="text-2xl md:text-3xl font-bold text-white">
            Stránka nebyla nalezena
          </h1>
          <p className="text-white/60 text-base leading-relaxed">
            Odkaz, který jste sledovali, neexistuje nebo byl přesunut.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
          <Button
            onClick={() => window.location.href = "/"}
            className="rounded-full bg-accent-gold hover:bg-accent-gold/90 text-accent-gold-foreground px-8 py-5 font-semibold gap-2"
          >
            <Home className="w-4 h-4" />
            Zpět na úvod
          </Button>
          <Button
            onClick={() => window.history.back()}
            variant="outline"
            className="rounded-full border-white/20 text-white bg-transparent hover:bg-white/10 px-8 py-5 gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Předchozí stránka
          </Button>
        </div>

        <p className="text-white/30 text-sm pt-4">
          Potřebujete pomoc?{" "}
          <a href="mailto:info@nemocapital.cz" className="text-white/50 hover:text-white/80 transition-colors underline">
            info@nemocapital.cz
          </a>
        </p>
      </div>
    </div>
  );
};

export default NotFound;
