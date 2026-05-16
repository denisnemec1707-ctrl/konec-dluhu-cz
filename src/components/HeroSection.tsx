import { useState } from "react";
import { Button } from "@/components/ui/button";
import MultiStepForm from "./MultiStepForm";

const HeroSection = () => {
  const [overlayOpen, setOverlayOpen] = useState(false);

  return (
    <>
      <section
        id="hero"
        className="relative min-h-[100svh] flex items-center px-4 md:px-8 lg:px-12 overflow-hidden pt-16"
        style={{
          background: "linear-gradient(135deg, #0f2a5e 0%, #1a4494 40%, #1e5bb5 70%, #0d3b7a 100%)",
        }}
      >
        <div className="absolute top-[-80px] right-[-80px] w-[400px] h-[400px] rounded-full opacity-10 pointer-events-none"
          style={{ background: "radial-gradient(circle, #60a5fa, transparent 70%)" }} />
        <div className="absolute bottom-[-60px] left-[-60px] w-[300px] h-[300px] rounded-full opacity-10 pointer-events-none"
          style={{ background: "radial-gradient(circle, #93c5fd, transparent 70%)" }} />

        <div className="relative z-10 w-full max-w-6xl mx-auto">

          <div className="hidden lg:grid lg:grid-cols-[1fr_420px] gap-12 items-center py-8">
            <div className="flex flex-col gap-6">
              <div className="inline-block self-start bg-white/10 border border-white/20 text-white/90 text-xs px-4 py-2 rounded-full tracking-wider uppercase">
                Oddlužení nemovitostí · Poradenství zdarma
              </div>
              <h1 className="text-4xl xl:text-5xl font-bold text-white leading-tight">
                Hrozí vám dražba?<br />Zbavte se dluhů<br />
                <span className="text-accent-gold">na nemovitosti.</span>
              </h1>
              <p className="text-lg text-white/80 leading-relaxed max-w-xl">
                Pomůžeme vám vyřešit exekuce, zástavní práva i hrozící dražbu.
                Diskrétně, rychle a bez zbytečné byrokracie.
              </p>
              <ul className="space-y-2">
                {[
                  "Vyřešíme exekuce a zástavní práva na vaší nemovitosti",
                  "Zabráníme hrozící dražbě nemovitosti",
                  "Poradenství zdarma a nezávazně",
                  "Bez prověřování příjmů a registru dlužníků",
                ].map(item => (
                  <li key={item} className="flex items-center gap-2 text-white/90 text-sm">
                    <span className="w-5 h-5 rounded-full bg-accent-gold/20 border border-accent-gold flex items-center justify-center flex-shrink-0 text-accent-gold text-[10px] font-bold">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
              <div className="flex items-center gap-3 pt-2">
                <div className="flex -space-x-2">
                  {["👤","👤","👤"].map((u,i) => (
                    <div key={i} className="w-8 h-8 rounded-full bg-white/20 border-2 border-white/30 flex items-center justify-center text-sm">{u}</div>
                  ))}
                </div>
                <span className="text-white/70 text-sm">⭐⭐⭐⭐⭐ Přes 300 vyřešených případů</span>
              </div>
            </div>
            <div className="bg-background rounded-2xl shadow-2xl overflow-hidden">
              <MultiStepForm />
            </div>
          </div>

          <div className="lg:hidden flex flex-col items-center text-center gap-6 py-10 pb-28">
            <div className="inline-block bg-white/10 border border-white/20 text-white/90 text-xs px-4 py-2 rounded-full tracking-wider uppercase">
              Oddlužení nemovitostí · Zdarma
            </div>
            <h1 className="text-[1.75rem] font-bold text-white leading-tight tracking-tight">
              Hrozí vám dražba?<br />
              <span className="text-accent-gold">Zbavte se dluhů.</span>
            </h1>
            <p className="text-base text-white/75 leading-relaxed max-w-xs">
              Exekuce, zástavní práva, hrozící dražba — vyřešíme to za vás. Diskrétně a nezávazně.
            </p>
            <ul className="flex flex-col gap-2 w-full max-w-xs text-left">
              {[
                "Zastavíme hrozící dražbu nemovitosti",
                "Vyřešíme exekuce a zástavní práva",
                "Poradenství zdarma a nezávazně",
              ].map(item => (
                <li key={item} className="flex items-center gap-2.5 text-white/90 text-sm">
                  <span className="w-5 h-5 rounded-full bg-accent-gold/20 border border-accent-gold/60 flex items-center justify-center flex-shrink-0 text-accent-gold text-[10px] font-bold">✓</span>
                  {item}
                </li>
              ))}
            </ul>
            <Button
              onClick={() => setOverlayOpen(true)}
              className="w-full max-w-xs h-14 text-base font-bold rounded-2xl bg-accent-gold hover:bg-accent-gold/90 text-accent-gold-foreground shadow-2xl"
            >
              Chci bezplatné poradenství →
            </Button>
            <div className="flex items-center gap-1.5 text-white/50 text-xs">
              <span>🔒</span><span>SSL · GDPR · Poradenství zdarma</span>
            </div>
            <p className="text-white/40 text-xs">⭐⭐⭐⭐⭐ Přes 300 vyřešených případů</p>
          </div>
        </div>
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/40 animate-bounce hidden lg:block">↓</div>
      </section>

      {overlayOpen && (
        <MultiStepForm isOverlay onClose={() => setOverlayOpen(false)} />
      )}
    </>
  );
};

export default HeroSection;
