import { Shield, Heart, Users, Zap } from "lucide-react";

const values = [
  {
    icon: Shield,
    title: "Diskrétnost",
    description: "Vaše situace zůstane jen mezi námi. Nikdo se o ničem nedozví.",
  },
  {
    icon: Heart,
    title: "Lidský přístup",
    description: "Dluhová situace je náročná. Přistupujeme s empatií a bez odsuzování.",
  },
  {
    icon: Users,
    title: "Osobní kontakt",
    description: "Komunikujete přímo s poradcem, který se věnuje jen vašemu případu.",
  },
  {
    icon: Zap,
    title: "Jednáme rychle",
    description: "Čas je klíčový. Většinu případů řešíme do 10 pracovních dnů.",
  },
];

const AboutSection = () => {
  return (
    <section id="about" className="py-14 md:py-20 px-4 md:px-6 bg-secondary/30">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-start">
          {/* Left */}
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6">
              Kdo jsme
            </h2>
            <h3 className="text-xl font-semibold text-foreground mb-4">
              Specialisté na oddlužení nemovitostí
            </h3>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Pomáháme lidem v dluhové tísni zachránit jejich nemovitost.
                Zaměřujeme se výhradně na případy, kde jiní řekli ne —
                exekuce, zástavní práva, hrozby dražby, insolvence.
              </p>
              <p>
                Finanční řešení nabízíme na základě hodnoty vaší nemovitosti.
                Nezajímá nás váš příjem ani záznam v registru dlužníků.
              </p>
              <p className="font-medium text-foreground">
                Důležité je, že vlastníte nemovitost a chcete situaci řešit.
              </p>
            </div>
          </div>

          {/* Right */}
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6">
              Proč nás?
            </h2>
            <div className="grid grid-cols-2 gap-6">
              {values.map((v) => (
                <div key={v.title} className="p-5 bg-background rounded-xl shadow-sm">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                    <v.icon className="w-5 h-5 text-primary" />
                  </div>
                  <h4 className="font-semibold text-foreground mb-1 text-sm">{v.title}</h4>
                  <p className="text-xs text-muted-foreground">{v.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
