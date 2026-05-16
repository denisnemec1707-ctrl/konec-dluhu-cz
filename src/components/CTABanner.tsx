import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const CTABanner = () => {
  const scrollToForm = () => {
    document.getElementById("contact-form")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="py-16 px-6" style={{
      background: "linear-gradient(135deg, #0f2a5e 0%, #1a4494 60%, #1e5bb5 100%)",
    }}>
      <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-8 text-center sm:text-left">
        <div>
          <h2 className="text-xl md:text-2xl font-semibold text-white mb-2">
            Neřešte to sami. Poradíme vám zdarma.
          </h2>
          <p className="text-white/70 text-base">
            Posoudíme vaši situaci a řekneme vám upřímně, co je možné.
          </p>
        </div>
        <Button
          onClick={scrollToForm}
          size="lg"
          className="flex-shrink-0 rounded-full bg-accent-gold hover:bg-accent-gold/90 text-accent-gold-foreground px-8 py-6 text-base font-semibold shadow-xl gap-2"
        >
          Chci poradit zdarma
          <ArrowRight className="w-4 h-4" />
        </Button>
      </div>
    </section>
  );
};

export default CTABanner;
