import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    q: "Umíte pomoci i při hrozící dražbě?",
    a: "Ano. I když je dražba již nařízena, máme nástroje, jak ji zastavit. Čím dříve nás kontaktujete, tím více možností máme. Neotálejte.",
  },
  {
    q: "Jak rychle dokážete situaci vyřešit?",
    a: "Většinu případů řešíme do 5–10 pracovních dnů od dohody. V urgentních situacích (hrozící dražba) jednáme okamžitě.",
  },
  {
    q: "Jaké podmínky musím splňovat?",
    a: "Stačí, když vlastníte nemovitost na území České republiky. Neprověřujeme váš příjem, registr dlužníků ani historii splácení.",
  },
  {
    q: "Musím mít čistý registr?",
    a: "Ne. Specializujeme se právě na klienty se záznamem, exekucí nebo insolvencí. Registr nás nezajímá — rozhoduje nemovitost.",
  },
  {
    q: "Je poradenství skutečně zdarma?",
    a: "Ano. Úvodní konzultace i posouzení vaší situace jsou zcela zdarma a nezávazné. Nic neplatíte, dokud se nedohodneme na konkrétním řešení.",
  },
  {
    q: "Co když mám exekuci přímo na nemovitosti?",
    a: "Exekuce na nemovitosti je přesně náš případ. Pomůžeme vám ji vyplatit a vymazat — a nemovitost tak zachráníme.",
  },
];

const FAQSection = () => {
  return (
    <section id="faq" className="py-14 md:py-20 px-4 md:px-6 bg-background">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-light text-center text-foreground mb-8 md:mb-12">
          Nejčastější otázky
        </h2>

        <Accordion type="single" collapsible className="space-y-2">
          {faqs.map((faq, i) => (
            <AccordionItem
              key={i}
              value={`faq-${i}`}
              className="border border-border rounded-xl px-4 bg-card"
            >
              <AccordionTrigger className="text-left text-foreground hover:no-underline">
                {faq.q}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                {faq.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default FAQSection;
