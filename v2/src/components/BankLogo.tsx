import { useAirlines } from "../hooks/useAirlines";
import { useGetAirlineLogos } from "../hooks/useGetAirlineLogos";
import type { Airline } from "../types";

interface BankLogoProps {
	bankId: string;
	airline?: Airline;
	className?: string;
}

export const BankLogo = ({ bankId, airline, className = "w-6 h-6" }: BankLogoProps) => {
    const { banks } = useAirlines();
    const { getBankLogo } = useGetAirlineLogos(airline, banks);

    if (!bankId) return null;

    const logoSrc = getBankLogo(bankId);

    return (
        <div className={`${className} flex items-center justify-center overflow-hidden rounded-md bg-white shadow-sm`}>
            {/* 🟢 If logoSrc is undefined, we don't render the img to avoid the console warning */}
            {logoSrc && (
                <img
                    src={logoSrc}
                    className="w-full h-full object-contain"
                    alt={`${bankId} logo`}
                    loading="lazy"
                    /* 🟢 We only need onError if we want a SECONDARY fallback 
                       (e.g. if the URL returned by the hook actually 404s) */
                    onError={(e) => {
                        (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${bankId}`;
                    }}
                />
            )}
        </div>
    );
};