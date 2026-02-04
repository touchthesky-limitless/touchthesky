interface BankLogoProps {
  bank: {
    name: string;
    domain?: string;
    logoOverride?: string;
  };
  className?: string;
}

export const BankLogo = ({ bank, className = "w-6 h-6" }: BankLogoProps) => {
  // Fallback icon if no domain is found
  const fallbackIcon = `https://ui-avatars.com/api/?name=${encodeURIComponent(bank.name)}&background=random`;
  
  const logoSrc = bank.logoOverride || (bank.domain 
    ? `https://www.google.com/s2/favicons?sz=128&domain=${bank.domain}`
    : fallbackIcon);

  return (
    <div className={`${className} flex items-center justify-center overflow-hidden rounded-md`}>
      <img 
        src={logoSrc}
        className="w-full h-full object-contain"
        alt={`${bank.name} logo`}
        loading="lazy"
        onError={(e) => {
          // If Google Favicon fails, swap to the fallback initials
          (e.target as HTMLImageElement).src = fallbackIcon;
        }}
      />
    </div>
  );
};