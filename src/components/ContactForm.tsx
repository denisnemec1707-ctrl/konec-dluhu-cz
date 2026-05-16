import { useState, useEffect, useRef } from "react";

declare global {
  interface Window { gtag?: (...args: unknown[]) => void; }
}
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Lock, Clock, Shield, XCircle, Home } from "lucide-react";

const FORM_NAME = "lead_form_konec_dluhu_bottom";

const kraje = [
  "Praha", "Středočeský kraj", "Jihočeský kraj", "Plzeňský kraj",
  "Karlovarský kraj", "Ústecký kraj", "Liberecký kraj", "Královéhradecký kraj",
  "Pardubický kraj", "Kraj Vysočina", "Jihomoravský kraj", "Olomoucký kraj",
  "Zlínský kraj", "Moravskoslezský kraj",
];

const gtag = (...args: unknown[]) => {
  if (typeof window.gtag === "function") window.gtag(...args);
};

const ContactForm = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [ownsProperty, setOwnsProperty] = useState<"yes" | "no" | null>(null);
  const [formData, setFormData] = useState({
    name: "", phone: "", city: "", propertyType: "", loanAmount: "",
    encumbrance: "", purpose: "", urgency: "", ownership: "",
    region: "", contactTime: "", propertyValue: "", description: "",
  });

  const formStartedRef = useRef(false);

  useEffect(() => {
    let exitTracked = false;
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY < 10 && !exitTracked) {
        exitTracked = true;
        gtag("event", "exit_intent", { page_path: location.pathname });
      }
    };
    document.addEventListener("mouseleave", handleMouseLeave);
    return () => document.removeEventListener("mouseleave", handleMouseLeave);
  }, []);

  const handleFormFocus = () => {
    if (!formStartedRef.current) {
      formStartedRef.current = true;
      gtag("event", "lead_form_start", { form_name: FORM_NAME });
    }
  };

  const set = (key: string) => (value: string) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
    gtag("event", "lead_form_field_complete", { form_name: FORM_NAME, field_name: key, field_type: "select" });
  };

  const handleBlur = (fieldName: string, fieldType: string, value: string) => {
    const filled = value.trim().length > 0;
    gtag("event", filled ? "lead_form_field_complete" : "lead_form_field_abandon", {
      form_name: FORM_NAME, field_name: fieldName, field_type: fieldType,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    gtag("event", "lead_form_submit_attempt", { form_name: FORM_NAME });
    try {
      // TODO: Add konec-dluhu.cz Zapier webhook URL here
      // await fetch("https://hooks.zapier.com/hooks/catch/XXXXXXX/XXXXXXX/", {
      //   method: "POST",
      //   mode: "no-cors",
      //   headers: { "Content-Type": "text/plain" },
      //   body: JSON.stringify({
      //     datum_a_cas: new Date().toLocaleString("cs-CZ"),
      //     ma_nehnutelnost: ownsProperty === "yes" ? "Ano" : ownsProperty === "no" ? "Ne" : "Nevyplněno",
      //     meno: formData.name,
      //     telefon: formData.phone,
      //     mesto: formData.city,
      //     typ_nemovitosti: formData.propertyType,
      //     vyse_dluhu: formData.loanAmount,
      //     zatizeni_nemovitosti: formData.encumbrance,
      //     typ_zavazku: formData.purpose,
      //     urgentnost: formData.urgency,
      //     typ_vlastnictvi: formData.ownership,
      //     kraj: formData.region,
      //     preferovany_kontakt: formData.contactTime,
      //     odh_hodnota_nemovitosti: formData.propertyValue,
      //     popis_situace: formData.description,
      //     zdroj: "konec-dluhu-spodny-formular",
      //   }),
      // });
      gtag("event", "lead_form_success", { form_name: FORM_NAME });
      // TODO: Add konec-dluhu.cz Google Ads conversion tag
      // gtag("event", "conversion", { send_to: "AW-XXXXXXXXX/XXXXXXXXXXXX", value: 1.0, currency: "CZK" });
      toast({ title: "Děkujeme za váš zájem", description: "Ozveme se vám do několika hodin." });
    } catch {
      toast({ title: "Něco se pokazilo", description: "Zkuste to prosím znovu nebo nás kontaktujte na info@konec-dluhu.cz", variant: "destructive" });
    }
    setFormData({ name: "", phone: "", city: "", propertyType: "", loanAmount: "", encumbrance: "", purpose: "", urgency: "", ownership: "", region: "", contactTime: "", propertyValue: "", description: "" });
    setOwnsProperty(null);
    setIsSubmitting(false);
  };

  return (
    <section id="contact-form" className="py-14 md:py-20 px-4 md:px-6">
      <div className="max-w-xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-light text-foreground mb-4">Bezplatné poradenství bez závazků</h2>
          <p className="text-accent-gold font-semibold text-lg">Posoudíme vaši situaci zdarma a nezávazně</p>
        </div>

        <form onSubmit={handleSubmit} onFocus={handleFormFocus} className="space-y-5 bg-secondary/30 p-5 sm:p-8 rounded-2xl">

          <div>
            <p className="font-medium text-foreground mb-3 text-center">Vlastníte nemovitost?</p>
            <div className="grid grid-cols-2 gap-3">
              <button type="button"
                onClick={() => { setOwnsProperty("yes"); gtag("event", "lead_qualify", { form_name: FORM_NAME, owns_property: true }); }}
                className={`flex items-center justify-center gap-2 py-3 px-4 rounded-xl border-2 font-semibold transition-all duration-200 text-sm ${ownsProperty === "yes" ? "border-primary bg-primary text-primary-foreground shadow-md" : "border-border bg-background text-foreground hover:border-primary/50"}`}
              ><Home className="w-4 h-4" />Ano, vlastním</button>
              <button type="button"
                onClick={() => { setOwnsProperty("no"); gtag("event", "lead_disqualify", { form_name: FORM_NAME, owns_property: false }); }}
                className={`flex items-center justify-center gap-2 py-3 px-4 rounded-xl border-2 font-semibold transition-all duration-200 text-sm ${ownsProperty === "no" ? "border-destructive bg-destructive/10 text-destructive shadow-md" : "border-border bg-background text-foreground hover:border-destructive/40"}`}
              ><XCircle className="w-4 h-4" />Ne, nevlastním</button>
            </div>
            {ownsProperty === "no" && (
              <div className="mt-3 bg-amber-50 border border-amber-200 rounded-xl p-4 text-sm text-amber-800">
                <p className="font-semibold mb-1">Naše řešení vyžaduje vlastnictví nemovitosti.</p>
                <p className="text-amber-700 text-xs leading-relaxed">Bez nemovitosti vám bohužel nemůžeme pomoci. Doporučujeme se obrátit na bezplatnou dluhovou poradnu nebo banku.</p>
              </div>
            )}
          </div>

          <Input placeholder="Vaše jméno a příjmení" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} onBlur={(e) => handleBlur("name", "text", e.target.value)} required className="bg-background border-border h-12" />
          <Input type="tel" inputMode="tel" placeholder="Telefonní číslo" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} onBlur={(e) => handleBlur("phone", "tel", e.target.value)} required className="bg-background border-border h-12" />
          <Input placeholder="Město, kde se nachází nemovitost" value={formData.city} onChange={(e) => setFormData({ ...formData, city: e.target.value })} onBlur={(e) => handleBlur("city", "text", e.target.value)} required className="bg-background border-border h-12" />

          <Select value={formData.propertyType} onValueChange={set("propertyType")}><SelectTrigger className="bg-background border-border h-12"><SelectValue placeholder="Typ nemovitosti" /></SelectTrigger><SelectContent><SelectItem value="byt">Byt</SelectItem><SelectItem value="dum">Rodinný dům</SelectItem><SelectItem value="pozemek">Pozemek</SelectItem><SelectItem value="komercni">Komerční nemovitost</SelectItem><SelectItem value="jiny">Jiný typ</SelectItem></SelectContent></Select>

          <Select value={formData.loanAmount} onValueChange={set("loanAmount")}><SelectTrigger className="bg-background border-border h-12"><SelectValue placeholder="Výše mých dluhů / závazků" /></SelectTrigger><SelectContent><SelectItem value="do500000">Do 500 000 Kč</SelectItem><SelectItem value="500000-1000000">500 000 – 1 000 000 Kč</SelectItem><SelectItem value="1000000-2000000">1 000 000 – 2 000 000 Kč</SelectItem><SelectItem value="2000000-5000000">2 000 000 – 5 000 000 Kč</SelectItem><SelectItem value="5000000+">Více než 5 000 000 Kč</SelectItem></SelectContent></Select>

          <Select value={formData.encumbrance} onValueChange={set("encumbrance")}><SelectTrigger className="bg-background border-border h-12"><SelectValue placeholder="Je nemovitost zatížena závazkem?" /></SelectTrigger><SelectContent><SelectItem value="nezatizena">Není zatížena</SelectItem><SelectItem value="zalozni-pravo-banka">Zástavní právo banky (hypotéka)</SelectItem><SelectItem value="zalozni-pravo-jine">Zástavní právo jiného věřitele</SelectItem><SelectItem value="exekuce">Exekuce na nemovitosti</SelectItem><SelectItem value="insolvence">Insolvence / oddlužení</SelectItem><SelectItem value="nevim">Nevím / nejsem si jistý/á</SelectItem></SelectContent></Select>

          <Select value={formData.purpose} onValueChange={set("purpose")}><SelectTrigger className="bg-background border-border h-12"><SelectValue placeholder="Co potřebujete řešit?" /></SelectTrigger><SelectContent><SelectItem value="exekuce">Exekuce na nemovitosti</SelectItem><SelectItem value="zalozni-pravo">Zástavní právo věřitele</SelectItem><SelectItem value="hrozba-drazby">Hrozba nebo nařízení dražby</SelectItem><SelectItem value="insolvence">Insolvence / oddlužení</SelectItem><SelectItem value="refinancovani">Refinancování více dluhů do jednoho</SelectItem><SelectItem value="jine">Jiné</SelectItem></SelectContent></Select>

          <Select value={formData.urgency} onValueChange={set("urgency")}><SelectTrigger className="bg-background border-border h-12"><SelectValue placeholder="Jak urgentní je vaše situace?" /></SelectTrigger><SelectContent><SelectItem value="ihned">Kritická — dražba nebo exekuce hrozí do 7 dní</SelectItem><SelectItem value="mesic">Naléhavá — řeším to do měsíce</SelectItem><SelectItem value="zjistuji">Zatím zjišťuji možnosti</SelectItem></SelectContent></Select>

          <Select value={formData.ownership} onValueChange={set("ownership")}><SelectTrigger className="bg-background border-border h-12"><SelectValue placeholder="Typ vlastnictví nemovitosti" /></SelectTrigger><SelectContent><SelectItem value="sole">100 % vlastník/ce</SelectItem><SelectItem value="co-owner">Spoluvlastník/ce</SelectItem><SelectItem value="inheritance">V dědickém řízení</SelectItem></SelectContent></Select>

          <Select value={formData.region} onValueChange={set("region")}><SelectTrigger className="bg-background border-border h-12"><SelectValue placeholder="Kraj nemovitosti" /></SelectTrigger><SelectContent>{kraje.map((k) => (<SelectItem key={k} value={k}>{k}</SelectItem>))}</SelectContent></Select>

          <Select value={formData.contactTime} onValueChange={set("contactTime")}><SelectTrigger className="bg-background border-border h-12"><SelectValue placeholder="Preferovaný čas kontaktu" /></SelectTrigger><SelectContent><SelectItem value="dopoledne">Dopoledne (8:00 – 12:00)</SelectItem><SelectItem value="odpoledne">Odpoledne (12:00 – 17:00)</SelectItem><SelectItem value="vecer">Večer (17:00 – 20:00)</SelectItem><SelectItem value="kdykoliv">Kdykoliv</SelectItem></SelectContent></Select>

          <Select value={formData.propertyValue} onValueChange={set("propertyValue")}><SelectTrigger className="bg-background border-border h-12"><SelectValue placeholder="Odhadovaná hodnota nemovitosti" /></SelectTrigger><SelectContent><SelectItem value="do1m">Do 1 000 000 Kč</SelectItem><SelectItem value="1m-3m">1 000 000 – 3 000 000 Kč</SelectItem><SelectItem value="3m-6m">3 000 000 – 6 000 000 Kč</SelectItem><SelectItem value="6m-10m">6 000 000 – 10 000 000 Kč</SelectItem><SelectItem value="nad10m">Více než 10 000 000 Kč</SelectItem></SelectContent></Select>

          <Textarea placeholder="Krátký popis vaší situace (nepovinné)" value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} onBlur={(e) => handleBlur("description", "textarea", e.target.value)} className="bg-background border-border min-h-[100px] resize-none" />

          <Button type="submit" disabled={isSubmitting} className="w-full h-14 text-lg rounded-full bg-accent-gold hover:bg-accent-gold/90 text-accent-gold-foreground shadow-lg hover:shadow-xl transition-all duration-300">
            {isSubmitting ? "Odesílám..." : "Chci bezplatné poradenství"}
          </Button>

          <div className="flex flex-wrap justify-center gap-4 pt-2">
            <div className="flex items-center gap-2 text-muted-foreground text-sm"><Lock className="w-4 h-4 flex-shrink-0" /><span>Bezpečné údaje</span></div>
            <div className="flex items-center gap-2 text-muted-foreground text-sm"><Clock className="w-4 h-4 flex-shrink-0" /><span>Rychlá odpověď</span></div>
            <div className="flex items-center gap-2 text-muted-foreground text-sm"><Shield className="w-4 h-4 flex-shrink-0" /><span>Diskrétnost</span></div>
          </div>
        </form>
      </div>
    </section>
  );
};

export default ContactForm;
