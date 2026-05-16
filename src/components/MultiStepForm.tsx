import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Lock, X, ChevronLeft, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

declare global {
  interface Window { gtag?: (...args: unknown[]) => void; }
}

const KRAJE = [
  "Praha", "Středočeský kraj", "Jihočeský kraj", "Plzeňský kraj",
  "Karlovarský kraj", "Ústecký kraj", "Liberecký kraj", "Královéhradecký kraj",
  "Pardubický kraj", "Kraj Vysočina", "Jihomoravský kraj", "Olomoucký kraj",
  "Zlínský kraj", "Moravskoslezský kraj",
];

const PROPERTY_TYPES = [
  { value: "byt", label: "Byt", icon: "🏢" },
  { value: "dum", label: "Dům", icon: "🏠" },
  { value: "pozemek", label: "Pozemek", icon: "🌳" },
  { value: "komercni", label: "Komerční", icon: "🏬" },
  { value: "jiny", label: "Jiné", icon: "📋" },
];

const TOTAL_STEPS = 4;

type FormData = {
  ownsProperty: "yes" | "no" | null;
  loanAmount: number;
  propertyType: string;
  region: string;
  city: string;
  description: string;
  name: string;
  phone: string;
  gdpr: boolean;
};

const formatCzk = (val: number) => {
  if (val >= 1_000_000) {
    const m = val / 1_000_000;
    return `${m % 1 === 0 ? m.toFixed(0) : m.toFixed(1)} mil. Kč`;
  }
  return `${Math.round(val / 1000)} tis. Kč`;
};

const estimatedMonthly = (amount: number) => {
  const rate = 0.009;
  const n = 120;
  const p = amount * rate / (1 - Math.pow(1 + rate, -n));
  return Math.round(p / 100) * 100;
};

interface Props {
  onClose?: () => void;
  isOverlay?: boolean;
}

const MultiStepForm = ({ onClose, isOverlay = false }: Props) => {
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [data, setData] = useState<FormData>({
    ownsProperty: null,
    loanAmount: 500_000,
    propertyType: "",
    region: "",
    city: "",
    description: "",
    name: "",
    phone: "",
    gdpr: false,
  });

  useEffect(() => {
    if (!isOverlay) return;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, [isOverlay]);

  const track = (name: string) => {
    if (typeof window.gtag === "function") window.gtag("event", name);
  };

  const validate = (s: number): Record<string, string> => {
    const e: Record<string, string> = {};
    if (s === 1 && !data.ownsProperty) e.ownsProperty = "Vyberte jednu z možností";
    if (s === 2) {
      if (!data.propertyType) e.propertyType = "Vyberte typ nemovitosti";
      if (!data.region) e.region = "Vyberte kraj";
      if (data.city.trim().length < 2) e.city = "Zadejte město nebo okres";
    }
    if (s === 4) {
      const parts = data.name.trim().split(/\s+/);
      if (parts.length < 2 || parts[0].length < 2) e.name = "Zadejte jméno a příjmení";
      const digits = data.phone.replace(/\D/g, "");
      if (digits.length !== 9 && digits.length !== 12) e.phone = "Zadejte platné číslo (9 číslic)";
      if (!data.gdpr) e.gdpr = "Pro pokračování je nutný souhlas";
    }
    return e;
  };

  const next = () => {
    if (step === 1 && data.ownsProperty === "no") return;
    const errs = validate(step);
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setErrors({});
    track(`form_step_${step}_completed`);
    setStep(s => s + 1);
  };

  const back = () => { setErrors({}); setStep(s => s - 1); };

  const skipStep3 = () => { track("form_step_3_skipped"); setStep(4); };

  const submit = async () => {
    const errs = validate(4);
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setIsSubmitting(true);
    try {
      await fetch("https://hooks.zapier.com/hooks/catch/21999989/4yrvanh/", {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "text/plain" },
        body: JSON.stringify({
          datum_a_cas: new Date().toLocaleString("cs-CZ"),
          meno: data.name,
          telefon: data.phone,
          ma_nehnutelnost: "Áno",
          typ_nemovitosti: data.propertyType,
          pozadovana_castka: formatCzk(data.loanAmount),
          kraj: data.region,
          mesto: data.city,
          popis_situace: data.description,
          zdroj: "konec-dluhu-multistep",
        }),
      });
      if (typeof window.gtag === "function") {
        window.gtag("event", "conversion", { send_to: "AW-18153709721/V2VUCMOb9qocEJnBrtBD" });
        window.gtag("event", "form_submitted");
      }
      setSubmitted(true);
    } catch {
      toast({
        title: "Něco se pokazilo",
        description: "Zkuste to prosím znovu nebo nás kontaktujte na info@konec-dluhu.cz",
        variant: "destructive",
      });
      setIsSubmitting(false);
    }
  };

  const progress = (step / TOTAL_STEPS) * 100;

  /* ─── Thank-you screen ─── */
  if (submitted) {
    return (
      <div className={isOverlay
        ? "fixed inset-0 z-[60] bg-background flex items-center justify-center px-6"
        : "rounded-2xl bg-secondary/30 p-8 flex items-center justify-center min-h-[300px]"
      }>
        <div className="text-center max-w-sm w-full">
          <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <h3 className="text-xl font-bold text-foreground mb-2">
            Děkujeme, {data.name.split(" ")[0]}!
          </h3>
          <p className="text-muted-foreground mb-6 leading-relaxed text-sm">
            Vaši žádost jsme přijali.<br />Ozveme se vám do 24 hodin.
          </p>
          {isOverlay && onClose && (
            <button
              onClick={onClose}
              className="w-full h-12 rounded-2xl bg-accent-gold text-accent-gold-foreground text-sm font-bold"
            >
              Zavřít
            </button>
          )}
        </div>
      </div>
    );
  }

  /* ─── Shared step content ─── */
  const stepContent = (
    <>
      {/* STEP 1 */}
      {step === 1 && (
        <div className="space-y-5">
          <div>
            <label className="block text-sm font-semibold text-foreground mb-3">
              Vlastníte nemovitost? <span className="text-destructive">*</span>
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button type="button"
                onClick={() => setData(d => ({ ...d, ownsProperty: "yes" }))}
                className={`h-14 rounded-xl border-2 font-semibold text-sm transition-all
                  ${data.ownsProperty === "yes"
                    ? "border-accent-gold bg-accent-gold text-accent-gold-foreground shadow-md"
                    : "border-border bg-background text-foreground hover:border-accent-gold/50"}`}
              >✓ Ano, vlastním</button>
              <button type="button"
                onClick={() => setData(d => ({ ...d, ownsProperty: "no" }))}
                className={`h-14 rounded-xl border-2 font-semibold text-sm transition-all
                  ${data.ownsProperty === "no"
                    ? "border-destructive bg-destructive/10 text-destructive"
                    : "border-border bg-background text-foreground hover:border-destructive/40"}`}
              >✗ Ne, nevlastním</button>
            </div>
            {errors.ownsProperty && <p className="text-destructive text-xs mt-1">{errors.ownsProperty}</p>}
          </div>

          {data.ownsProperty === "no" && (
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-sm text-amber-800">
              <p className="font-semibold mb-1">Bohužel, tato služba není pro vás.</p>
              <p className="text-amber-700 leading-relaxed text-xs">
                Naše financování vyžaduje nemovitost jako zajištění.
                Doporučujeme se obrátit na banku nebo mikropůjčkové společnosti.
              </p>
            </div>
          )}

          {data.ownsProperty === "yes" && (
            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">
                Kolik potřebujete na vyřešení situace? <span className="text-destructive">*</span>
              </label>
              <div className="text-3xl font-bold text-accent-gold mb-3 text-center">
                {formatCzk(data.loanAmount)}
              </div>
              <input
                type="range"
                min={100_000}
                max={5_000_000}
                step={50_000}
                value={data.loanAmount}
                onChange={e => setData(d => ({ ...d, loanAmount: Number(e.target.value) }))}
                className="w-full h-2 bg-secondary rounded-full appearance-none cursor-pointer accent-accent-gold"
              />
              <div className="flex justify-between text-xs text-muted-foreground mt-1">
                <span>100 tis.</span><span>5 mil. Kč</span>
              </div>
            </div>
          )}
        </div>
      )}

      {/* STEP 2 */}
      {step === 2 && (
        <div className="space-y-5">
          <div>
            <label className="block text-sm font-semibold text-foreground mb-3">
              Jakou nemovitost vlastníte? <span className="text-destructive">*</span>
            </label>
            <div className="grid grid-cols-3 gap-2">
              {PROPERTY_TYPES.slice(0, 3).map(pt => (
                <button key={pt.value} type="button"
                  onClick={() => setData(d => ({ ...d, propertyType: pt.value }))}
                  className={`flex flex-col items-center justify-center gap-1.5 py-3 rounded-xl border-2 text-xs font-medium transition-all
                    ${data.propertyType === pt.value
                      ? "border-accent-gold bg-accent-gold/10"
                      : "border-border bg-background hover:border-accent-gold/50"}`}
                >
                  <span className="text-2xl">{pt.icon}</span>
                  {pt.label}
                </button>
              ))}
            </div>
            <div className="grid grid-cols-2 gap-2 mt-2">
              {PROPERTY_TYPES.slice(3).map(pt => (
                <button key={pt.value} type="button"
                  onClick={() => setData(d => ({ ...d, propertyType: pt.value }))}
                  className={`flex flex-col items-center justify-center gap-1.5 py-3 rounded-xl border-2 text-xs font-medium transition-all
                    ${data.propertyType === pt.value
                      ? "border-accent-gold bg-accent-gold/10"
                      : "border-border bg-background hover:border-accent-gold/50"}`}
                >
                  <span className="text-2xl">{pt.icon}</span>
                  {pt.label}
                </button>
              ))}
            </div>
            {errors.propertyType && <p className="text-destructive text-xs mt-1">{errors.propertyType}</p>}
          </div>

          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">
              Kraj nemovitosti <span className="text-destructive">*</span>
            </label>
            <select
              value={data.region}
              onChange={e => setData(d => ({ ...d, region: e.target.value }))}
              className="w-full h-12 rounded-xl border-2 border-border bg-background px-3 text-sm text-foreground focus:border-accent-gold focus:outline-none transition-colors"
            >
              <option value="">Vyberte kraj…</option>
              {KRAJE.map(k => <option key={k} value={k}>{k}</option>)}
            </select>
            {errors.region && <p className="text-destructive text-xs mt-1">{errors.region}</p>}
          </div>

          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">
              Město / obec <span className="text-destructive">*</span>
            </label>
            <Input
              placeholder="Např. Brno, Plzeň..."
              value={data.city}
              onChange={e => setData(d => ({ ...d, city: e.target.value }))}
              className="bg-background border-border h-12"
            />
            {errors.city && <p className="text-destructive text-xs mt-1">{errors.city}</p>}
          </div>
        </div>
      )}

      {/* STEP 3 */}
      {step === 3 && (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-foreground mb-1">
              Popište stručně vaši situaci{" "}
              <span className="text-muted-foreground font-normal">(nepovinné)</span>
            </label>
            <p className="text-xs text-muted-foreground mb-3">
              💡 Pomůže nám připravit se na hovor. Např.: hrozí mi dražba, mám exekuci na nemovitost, zástavní právo...
            </p>
            <Textarea
              placeholder="Krátký popis vaší situace..."
              value={data.description}
              onChange={e => setData(d => ({ ...d, description: e.target.value.slice(0, 300) }))}
              className="bg-background border-border min-h-[130px] resize-none text-sm"
            />
            <p className="text-xs text-muted-foreground text-right mt-1">{data.description.length} / 300</p>
          </div>
          <button type="button" onClick={skipStep3}
            className="text-xs text-muted-foreground underline block text-center w-full"
          >
            Přeskočit tento krok →
          </button>
        </div>
      )}

      {/* STEP 4 */}
      {step === 4 && (
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">Už jen kontakt a ozveme se vám.</p>

          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">
              Jméno a příjmení <span className="text-destructive">*</span>
            </label>
            <Input
              placeholder="Jan Novák"
              value={data.name}
              onChange={e => setData(d => ({ ...d, name: e.target.value }))}
              autoComplete="name"
              className="bg-background border-border h-12"
            />
            {errors.name && <p className="text-destructive text-xs mt-1">{errors.name}</p>}
          </div>

          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">
              Telefonní číslo <span className="text-destructive">*</span>
            </label>
            <div className="flex gap-2">
              <span className="flex items-center h-12 px-3 rounded-xl border-2 border-border bg-secondary text-sm text-muted-foreground whitespace-nowrap">
                🇨🇿 +420
              </span>
              <Input
                type="tel"
                inputMode="tel"
                placeholder="777 123 456"
                value={data.phone}
                onChange={e => setData(d => ({ ...d, phone: e.target.value.replace(/[^\d\s]/g, "") }))}
                autoComplete="tel"
                className="bg-background border-border h-12 flex-1"
              />
            </div>
            {errors.phone && <p className="text-destructive text-xs mt-1">{errors.phone}</p>}
          </div>

          <div className="bg-secondary/50 rounded-xl p-3 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 text-lg">👤</div>
            <div>
              <p className="text-xs font-semibold text-foreground">Váš poradce vám zavolá do 24 h</p>
              <p className="text-xs text-muted-foreground">Poradenství je zcela zdarma a nezávazné</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <input
              type="checkbox"
              id="gdpr"
              checked={data.gdpr}
              onChange={e => setData(d => ({ ...d, gdpr: e.target.checked }))}
              className="mt-1 w-4 h-4 rounded accent-accent-gold cursor-pointer flex-shrink-0"
            />
            <label htmlFor="gdpr" className="text-xs text-muted-foreground leading-relaxed cursor-pointer">
              Souhlasím se zpracováním osobních údajů dle{" "}
              <a href="/zasady-ochrany-osobnich-udaju" target="_blank" rel="noopener noreferrer"
                className="underline hover:text-foreground"
              >zásad ochrany osobních údajů</a>.
              Nevoláme bez vašeho souhlasu.
            </label>
          </div>
          {errors.gdpr && <p className="text-destructive text-xs">{errors.gdpr}</p>}
        </div>
      )}
    </>
  );

  /* ─── OVERLAY mode (mobile full-screen) ─── */
  if (isOverlay) {
    return (
      <div className="fixed inset-0 z-[60] bg-background flex flex-col">

        {/* Top: nav bar */}
        <div className="flex-none border-b border-border bg-background">
          <div className="flex items-center justify-between px-5 py-4">
            <div className="flex items-center gap-2">
              {step > 1 && (
                <button onClick={back} className="p-1.5 -ml-1.5 rounded-lg hover:bg-secondary transition-colors">
                  <ChevronLeft className="w-5 h-5" />
                </button>
              )}
              <span className="text-sm font-medium text-muted-foreground">Krok {step} z {TOTAL_STEPS}</span>
            </div>
            {onClose && (
              <button onClick={onClose} className="p-2 -mr-2 rounded-lg hover:bg-secondary transition-colors">
                <X className="w-5 h-5" />
              </button>
            )}
          </div>
          {/* Progress bar */}
          <div className="h-1 bg-secondary mx-0">
            <div
              className="h-full bg-accent-gold transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Middle: scrollable content */}
        <div className="flex-1 overflow-y-auto">
          <div className="px-5 pt-6 pb-6 max-w-lg mx-auto w-full">
            <h2 className="text-xl font-bold text-foreground mb-6">Získejte bezplatné poradenství</h2>
            {stepContent}
          </div>
        </div>

        {/* Bottom: sticky button */}
        <div
          className="flex-none border-t border-border bg-background px-5 py-4 space-y-3"
          style={{ paddingBottom: "calc(16px + env(safe-area-inset-bottom))" }}
        >
          {step < 4 && data.ownsProperty !== "no" && (
            <Button onClick={next}
              className="w-full h-14 text-base font-bold rounded-2xl bg-accent-gold hover:bg-accent-gold/90 text-accent-gold-foreground shadow-md"
            >
              Pokračovat →
            </Button>
          )}
          {step === 4 && (
            <Button onClick={submit} disabled={isSubmitting}
              className="w-full h-14 text-base font-bold rounded-2xl bg-accent-gold hover:bg-accent-gold/90 text-accent-gold-foreground shadow-md"
            >
              {isSubmitting ? "Odesílám..." : "Chci bezplatné poradenství zdarma"}
            </Button>
          )}
          <div className="flex justify-center gap-4">
            <span className="flex items-center gap-1 text-xs text-muted-foreground">
              <Lock className="w-3 h-3" /> SSL
            </span>
            <span className="text-xs text-muted-foreground">✓ GDPR</span>
            <span className="text-xs text-muted-foreground">Konzultace zdarma</span>
          </div>
        </div>
      </div>
    );
  }

  /* ─── EMBEDDED mode (desktop card) ─── */
  return (
    <div className="bg-secondary/30 rounded-2xl p-6 sm:p-8">
      {/* Header */}
      <div className="mb-5">
        <div className="flex items-center justify-between mb-2">
          {step > 1 ? (
            <button onClick={back}
              className="text-xs text-muted-foreground flex items-center gap-1 hover:text-foreground transition-colors"
            >
              <ChevronLeft className="w-3 h-3" /> Zpět
            </button>
          ) : <span />}
          <span className="text-xs text-muted-foreground">Krok {step} z {TOTAL_STEPS} · ⏱ cca 45 s</span>
        </div>
        {/* Progress bar */}
        <div className="h-1 bg-secondary/50 rounded-full mb-4">
          <div
            className="h-full bg-accent-gold rounded-full transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
        <h3 className="text-lg font-bold text-foreground">Získejte bezplatné poradenství</h3>
      </div>

      {stepContent}

      {/* Buttons */}
      <div className="mt-6 space-y-3">
        {step < 4 && data.ownsProperty !== "no" && (
          <Button onClick={next}
            className="w-full text-base font-bold rounded-xl bg-accent-gold hover:bg-accent-gold/90 text-accent-gold-foreground shadow-md"
            style={{ height: "52px" }}
          >
            Pokračovat →
          </Button>
        )}
        {step === 4 && (
          <Button onClick={submit} disabled={isSubmitting}
            className="w-full text-base font-bold rounded-xl bg-accent-gold hover:bg-accent-gold/90 text-accent-gold-foreground shadow-md"
            style={{ height: "56px" }}
          >
            {isSubmitting ? "Odesílám..." : "Chci bezplatné poradenství zdarma"}
          </Button>
        )}
        <div className="flex flex-wrap justify-center gap-x-4 gap-y-1">
          <span className="flex items-center gap-1 text-xs text-muted-foreground">
            <Lock className="w-3 h-3" /> SSL zabezpečeno
          </span>
          <span className="text-xs text-muted-foreground">✓ GDPR</span>
          <span className="text-xs text-muted-foreground">Konzultace zdarma</span>
        </div>
      </div>
    </div>
  );
};

export default MultiStepForm;
