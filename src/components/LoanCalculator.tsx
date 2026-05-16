import { useState } from "react";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";

const LoanCalculator = () => {
  const [amount, setAmount] = useState([100000]);

  const scrollToForm = () => {
    document.getElementById("contact-form")?.scrollIntoView({ behavior: "smooth" });
  };

  const formatAmount = (val: number) =>
    new Intl.NumberFormat("cs-CZ").format(val) + " Kč";

  return (
    <section id="calculator" className="py-14 md:py-20 px-4 md:px-6 bg-background text-foreground">
      <div className="max-w-2xl mx-auto text-center">
        <h2 className="text-2xl md:text-3xl font-light mb-2">
          Kolik potřebujete?
        </h2>
        <p className="text-muted-foreground mb-10">
          Orientační částka, kterou můžete získat na základě nemovitosti
        </p>

        <div className="text-4xl sm:text-5xl md:text-7xl font-bold mb-10 text-accent-gold break-all sm:break-normal">
          {formatAmount(amount[0])}
        </div>

        <div className="px-4 mb-10">
          <Slider
            value={amount}
            onValueChange={setAmount}
            min={100000}
            max={5000000}
            step={100000}
            className="[&_[role=slider]]:h-6 [&_[role=slider]]:w-6 [&_[role=slider]]:bg-accent-gold [&_[role=slider]]:border-accent-gold [&_.bg-primary]:bg-accent-gold"
          />
          <div className="flex justify-between text-sm text-muted-foreground mt-3">
            <span>100 000 Kč</span>
            <span>5 000 000 Kč</span>
          </div>
        </div>

        <Button
          onClick={scrollToForm}
          size="lg"
          className="text-base md:text-lg px-8 md:px-10 py-6 md:py-7 rounded-full bg-accent-gold hover:bg-accent-gold/90 text-accent-gold-foreground shadow-xl font-semibold w-full sm:w-auto"
        >
          Chci vědět více o této částce
        </Button>
      </div>
    </section>
  );
};

export default LoanCalculator;
