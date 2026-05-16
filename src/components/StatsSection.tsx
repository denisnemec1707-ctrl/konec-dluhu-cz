import { useEffect, useRef, useState } from "react";
import { Home, Clock, Banknote, CheckCircle } from "lucide-react";

const stats = [
  { icon: Home, value: 300, suffix: "+", label: "zachráněných nemovitostí" },
  { icon: Clock, value: 10, suffix: " dní", label: "průměrná doba vyřízení" },
  { icon: Banknote, value: 400, suffix: "M+ Kč", label: "dluhů vyřešeno" },
  { icon: CheckCircle, value: 97, suffix: "%", label: "úspěšnost případů" },
];

const AnimatedNumber = ({ target, suffix }: { target: number; suffix: string }) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const animated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !animated.current) {
          animated.current = true;
          const duration = 1500;
          const steps = 40;
          const increment = target / steps;
          let current = 0;
          const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
              setCount(target);
              clearInterval(timer);
            } else {
              setCount(Math.floor(current));
            }
          }, duration / steps);
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return (
    <div ref={ref} className="text-4xl md:text-5xl font-bold text-accent-gold">
      {count}{suffix}
    </div>
  );
};

const StatsSection = () => {
  return (
    <section className="py-20 px-6 bg-secondary">
      <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
        {stats.map((stat) => (
          <div key={stat.label} className="text-center space-y-3">
            <stat.icon className="w-8 h-8 mx-auto text-primary" />
            <AnimatedNumber target={stat.value} suffix={stat.suffix} />
            <p className="text-sm text-muted-foreground">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default StatsSection;
