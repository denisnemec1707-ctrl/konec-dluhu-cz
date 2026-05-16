import { Gavel, AlertTriangle, Link2Off, RefreshCw, Scale } from "lucide-react";

const situations = [
  { icon: Gavel, text: "Hrozí vám dražba nemovitosti" },
  { icon: AlertTriangle, text: "Máte exekuci na nemovitost" },
  { icon: Link2Off, text: "Tíží vás zástavní právo nebo věřitel" },
  { icon: Scale, text: "Jste v insolvenci nebo oddlužení" },
  { icon: RefreshCw, text: "Potřebujete rychle refinancovat dluhy" },
];

const ForWhoSection = () => {
  return (
    <section id="solutions" className="py-14 md:py-20 px-4 md:px-6 bg-background">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-light text-center text-foreground mb-12">
          Řešíte některou z těchto situací?
        </h2>

        <div className="space-y-4 mb-10">
          {situations.map((item) => (
            <div
              key={item.text}
              className="flex items-center gap-4 p-4 rounded-xl bg-secondary/50 border border-border"
            >
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <item.icon className="w-5 h-5 text-primary" />
              </div>
              <span className="text-foreground">{item.text}</span>
            </div>
          ))}
        </div>

        <div className="text-center">
          <div className="inline-flex flex-wrap justify-center items-center gap-3 bg-accent-gold/10 border border-accent-gold/30 rounded-2xl px-6 py-4">
            <span className="text-2xl">🏠</span>
            <span className="text-base md:text-lg font-semibold text-foreground">
              Pokud vlastníte nemovitost, umíme vám pomoci.
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ForWhoSection;
