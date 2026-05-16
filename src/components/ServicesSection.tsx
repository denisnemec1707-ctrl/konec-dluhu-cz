import { Gavel, ShieldCheck, RefreshCw, MessageCircle } from "lucide-react";

const services = [
  {
    icon: Gavel,
    color: "bg-red-50 text-red-600",
    title: "Zastavení dražby",
    description:
      "Jednáme rychle — i v případě nařízené dražby. Pomůžeme vám situaci zastavit a získat čas na klidné řešení.",
  },
  {
    icon: ShieldCheck,
    color: "bg-amber-50 text-amber-600",
    title: "Oddlužení nemovitosti",
    description:
      "Zbavíme vaši nemovitost exekucí, zástavních práv a dalších závazků. Vrátíme vám klid a kontrolu nad majetkem.",
  },
  {
    icon: RefreshCw,
    color: "bg-green-50 text-green-600",
    title: "Refinancování dluhů",
    description:
      "Sloučíme všechny vaše dluhy do jedné zvládnutelné splátky. Bez nutnosti čistého registru nebo doložení příjmu.",
  },
  {
    icon: MessageCircle,
    color: "bg-blue-50 text-blue-600",
    title: "Bezplatné poradenství",
    description:
      "Každý případ posoudíme individuálně a zdarma. Řekneme vám upřímně, co je možné a jak postupovat.",
  },
];

const ServicesSection = () => {
  return (
    <section id="services" className="py-14 md:py-20 px-4 md:px-6 bg-background">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
            Jak vám pomůžeme
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Specializujeme se na řešení dluhových situací spojených s nemovitostmi.
            Neprověřujeme příjmy ani registry — rozhoduje hodnota vaší nemovitosti.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service) => (
            <div
              key={service.title}
              className="group p-6 rounded-2xl border border-border bg-card hover:shadow-lg transition-all duration-300 hover:-translate-y-1 flex flex-col gap-4"
            >
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${service.color}`}>
                <service.icon className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-semibold text-primary">
                {service.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
