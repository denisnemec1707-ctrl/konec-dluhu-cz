import { cn } from "@/lib/utils";

interface LogoProps {
  variant?: 'full' | 'icon' | 'vertical';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const sizeMap = {
  sm: { icon: 32, text: 'text-lg' },
  md: { icon: 40, text: 'text-xl' },
  lg: { icon: 48, text: 'text-2xl' },
};

const Logo = ({ variant = 'full', size = 'md', className }: LogoProps) => {
  const { icon: iconSize, text: textSize } = sizeMap[size];

  const LogoIcon = () => (
    <svg
      width={iconSize}
      height={iconSize}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="flex-shrink-0"
    >
      {/* Kruh — symbol ukončení */}
      <circle cx="24" cy="24" r="20" fill="currentColor" className="text-primary" opacity="0.12" />
      <circle cx="24" cy="24" r="20" stroke="currentColor" strokeWidth="2" fill="none" className="text-primary" />
      {/* Řetěz — přeškrtnutý */}
      <path d="M16 24h6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className="text-accent-gold" />
      <path d="M26 24h6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className="text-accent-gold" />
      <rect x="19" y="20" width="10" height="8" rx="2" stroke="currentColor" strokeWidth="2" fill="none" className="text-accent-gold" />
      {/* Přeškrtnutí */}
      <path d="M15 15L33 33" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className="text-primary" opacity="0.5" />
    </svg>
  );

  const LogoText = () => (
    <span className={cn(textSize, "tracking-tight")}>
      <span className="font-bold text-primary">Konec</span>
      <span className="font-light text-foreground ml-1">Dluhů</span>
    </span>
  );

  if (variant === 'icon') {
    return <div className={cn("flex items-center", className)}><LogoIcon /></div>;
  }

  if (variant === 'vertical') {
    return (
      <div className={cn("flex flex-col items-center gap-2", className)}>
        <LogoIcon />
        <LogoText />
      </div>
    );
  }

  return (
    <div className={cn("flex items-center gap-3", className)}>
      <LogoIcon />
      <LogoText />
    </div>
  );
};

export default Logo;
