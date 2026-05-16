import { Mail, MapPin } from "lucide-react";
import Logo from "./Logo";

const Footer = () => {
  return (
    <footer className="bg-foreground text-background py-16 px-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 md:gap-12">
        {/* About */}
        <div>
          <h3 className="text-sm font-bold uppercase tracking-wider mb-4 text-background/70">
            O nás
          </h3>
          <div className="w-12 h-px bg-primary mb-4" />
          <p className="text-sm text-background/60 leading-relaxed mb-6">
            Specialisté na oddlužení nemovitostí. Pomáháme lidem zachránit jejich
            majetek před dražbou a zbavit se dluhů.
          </p>
          <div className="space-y-3 text-sm text-background/60">
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4" />
              <span>info@konec-dluhu.cz</span>
            </div>
          </div>
        </div>

        {/* Links */}
        <div>
          <h3 className="text-sm font-bold uppercase tracking-wider mb-4 text-background/70">
            Odkazy
          </h3>
          <div className="w-12 h-px bg-primary mb-4" />
          <nav className="flex flex-col gap-2 text-sm text-background/60">
            <a href="#hero" className="hover:text-primary transition-colors">Domů</a>
            <a href="#solutions" className="hover:text-primary transition-colors">Pro koho</a>
            <a href="#services" className="hover:text-primary transition-colors">Služby</a>
            <a href="#about" className="hover:text-primary transition-colors">O nás</a>
            <a href="#contact-form" className="hover:text-primary transition-colors">Kontakt</a>
          </nav>
        </div>

        {/* Find us */}
        <div>
          <h3 className="text-sm font-bold uppercase tracking-wider mb-4 text-background/70">
            Najdete nás
          </h3>
          <div className="w-12 h-px bg-primary mb-4" />
          <div className="space-y-3 text-sm text-background/60">
            <p>Konec Dluhů s.r.o.</p>
            <div className="flex items-start gap-2">
              <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
              <span>Praha, Česká republika</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto mt-12 pt-6 border-t border-background/10 flex flex-col md:flex-row items-center justify-between gap-4">
        <Logo variant="full" size="sm" className="[&_span]:text-background/60 [&_circle]:!stroke-background/40 [&_path]:!fill-background/40" />
        <p className="text-xs text-background/40">
          © {new Date().getFullYear()} Konec Dluhů. Všechna práva vyhrazena.
        </p>
      </div>

      <div className="max-w-6xl mx-auto mt-6 pt-6 border-t border-background/10">
        <p className="text-xs text-background/30 leading-relaxed">
          Konec Dluhů s.r.o. je registrovaný nebankovní zprostředkovatel úvěrů pod dohledem České národní banky (ČNB).
          Minimální doba splácení: 12 měsíců. Maximální doba splácení: 120 měsíců.
          Maximální RPSN (roční procentní sazba nákladů): 19,9&nbsp;%.
          Reprezentativní příklad: Půjčka ve výši 500&nbsp;000&nbsp;Kč, splatnost 60 měsíců, úroková sazba 8,9&nbsp;% p.a.,
          RPSN 9,3&nbsp;%, měsíční splátka 10&nbsp;358&nbsp;Kč, celková splatná částka 621&nbsp;480&nbsp;Kč.
          Poskytnutí úvěru je podmíněno posouzením vaší bonity. Nesplacení úvěru může mít závažné finanční důsledky.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
