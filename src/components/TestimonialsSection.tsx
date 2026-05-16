import { Star } from "lucide-react";

const testimonials = [
  {
    initials: "P.H.",
    city: "Ostrava",
    text: "Hrozila nám dražba za 3 týdny. Tady nám pomohli ji zastavit a vše vyřešit. Zachránili nám byt.",
  },
  {
    initials: "M.K.",
    city: "Praha",
    text: "Měl jsem dvě exekuce na domě. Banka odmítla, tady mi pomohli do 10 dnů. Teď mám klid.",
  },
  {
    initials: "J.N.",
    city: "Brno",
    text: "Zástavní právo věřitele mi viselo nad hlavou roky. Konečně vyřešeno, rychle a bez stresu.",
  },
];

const StarsRow = () => (
  <div className="flex gap-1">
    {[...Array(5)].map((_, i) => (
      <Star key={i} className="w-4 h-4 fill-accent-gold text-accent-gold" />
    ))}
  </div>
);

const TestimonialsSection = () => {
  return (
    <section id="reference" className="py-14 md:py-20 px-4 md:px-6 bg-secondary">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-light text-center text-foreground mb-12">
          Co říkají naši klienti
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div
              key={t.initials}
              className="bg-card rounded-2xl p-6 border border-border shadow-sm space-y-4"
            >
              <StarsRow />
              <p className="text-foreground italic leading-relaxed">"{t.text}"</p>
              <p className="text-sm text-muted-foreground">
                — {t.initials}, {t.city}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
