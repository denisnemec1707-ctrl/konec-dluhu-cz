const steps = [
  {
    number: "1",
    title: "Vyplníte krátký formulář",
    description: "Popíšete nám svou situaci — diskrétně a zcela nezávazně.",
  },
  {
    number: "2",
    title: "Poradíme vám zdarma",
    description: "Zavoláme vám a společně probereme, jaké možnosti máte a jak postupovat.",
  },
  {
    number: "3",
    title: "Vyřešíme to za vás",
    description: "Postaráme se o celý proces — od sjednání financování až po vymazání závazků.",
  },
];

const StepsSection = () => {
  return (
    <section id="postup" className="py-14 md:py-20 px-4 md:px-6 bg-background">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-foreground text-center mb-14">
          Jak to probíhá?
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {steps.map((step) => (
            <div key={step.number} className="flex md:flex-col items-start md:items-center gap-5 md:gap-0 md:text-center">
              <div className="flex-shrink-0 w-14 h-14 md:w-16 md:h-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center md:mx-auto md:mb-5 text-xl md:text-2xl font-bold">
                {step.number}
              </div>
              <div>
                <h3 className="text-base md:text-lg font-semibold text-foreground mb-1 md:mb-3">
                  {step.title}
                </h3>
                <p className="text-muted-foreground text-sm">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StepsSection;
