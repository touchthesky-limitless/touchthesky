import type { Bank } from "../types";
import { ALLIANCE_NAMES } from "../config";
import { ALLIANCE_LOGOS } from "../config";
import { BankLogo } from "./BankLogo";

interface SearchFiltersProps {
	banks: Bank[];
	activeBanks: string[];
	toggleBank: (id: string) => void;
	activeAlliances: string[];
	toggleAlliance: (name: string) => void;
	showOnlyBonuses: boolean;
	setShowOnlyBonuses: (val: boolean) => void;
}

export default function SearchFilters({
	banks,
	activeBanks,
	toggleBank,
	activeAlliances,
	toggleAlliance,
}: SearchFiltersProps) {
	return (
		<div className="space-y-6 animate-in fade-in slide-in-from-top-4 duration-700">
			{/* Bank Icons */}
			<div className="flex flex-wrap gap-3 justify-center">
				{banks.map((bank) => {
					const isActive = activeBanks.includes(bank.id);
					return (
						<button
							key={bank.id}
							onClick={() => toggleBank(bank.id)}
							className={`cursor-pointer disabled:cursor-not-allowed group relative p-2 rounded-2xl transition-all duration-300 ${
								isActive
									? `${bank.bg} ${bank.text} border-white shadow-md scale-105`
									: "bg-white dark:bg-slate-900 shadow-sm border border-slate-100 dark:border-slate-800"
							}`}
						>
							<div
								className={`w-8 h-8 flex items-center justify-center transition-all ${
									isActive ? "bg-white rounded-full p-1" : "" // This prevents the blue from touching the logo
								}`}
							>
								<BankLogo
									bank={bank}
									className="w-full h-full object-contain"
								/>
							</div>
						</button>
					);
				})}
			</div>

			{/* Alliance Pills */}
			<div className="flex flex-wrap gap-1.5 justify-center">
				{ALLIANCE_NAMES.map((name) => {
					const isActive = activeAlliances.includes(name);

					const emojiMap: Record<string, string> = {
						"Hotels": "🏨",
						"No Alliance": "✨",
					};

					return (
						<button
							key={name}
							onClick={() => toggleAlliance(name)}
							className={`cursor-pointer disabled:cursor-not-allowed disabled:opacity-50 
                flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-full 
                text-[10px] font-black uppercase tracking-wider transition-all border ${
									isActive
										? "bg-emerald-600 text-white border-emerald-700 shadow-md shadow-emerald-500/20"
										: "bg-white dark:bg-slate-900 text-slate-500 dark:text-slate-400 border-slate-200 dark:border-slate-800 hover:border-emerald-500/50"
								}`}
						>
							{ALLIANCE_LOGOS?.[name] ? (
								<img
									src={ALLIANCE_LOGOS[name]}
									className="w-3.5 h-3.5 object-contain flex-shrink-0 transition-all"
									alt=""
								/>
							) : (
								<span className="text-xs leading-none flex-shrink-0">
									{emojiMap[name] || "✨"}
								</span>
							)}

							<span className="leading-none">{name}</span>
						</button>
					);
				})}
			</div>
		</div>
	);
}
