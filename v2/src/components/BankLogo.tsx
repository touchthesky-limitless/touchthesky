import { useAirlines } from "../hooks/useAirlines";
import { useGetAirlineLogos } from "../hooks/useGetAirlineLogos";
import type { Airline } from "../types";

interface BankLogoProps {
	bankId: string;
	airline?: Airline;
	className?: string;
}

export const BankLogo = ({ bankId, airline, className = "w-6 h-6" }: BankLogoProps) => {
	const { banks } = useAirlines(); // 🟢 Get data from context
	const { getBankLogo } = useGetAirlineLogos(airline, banks);

	if (!bankId) return null;

	const logoSrc = getBankLogo(bankId);
	const fallbackIcon = `https://ui-avatars.com/api/?name=${encodeURIComponent(bankId)}&background=random`;

	return (
		<div
			className={`${className} flex items-center justify-center overflow-hidden rounded-md`}
		>
			<img
				src={logoSrc}
				className="w-full h-full object-contain"
				alt={`${bankId} logo`}
				loading="lazy"
				onError={(e) => {
					// If Google Favicon fails, swap to the fallback initials
					(e.target as HTMLImageElement).src = fallbackIcon;
				}}
			/>
		</div>
	);
};
