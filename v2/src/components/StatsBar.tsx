import { useAirlines } from "../hooks/useAirlines";
import IntelligenceButton from "./IntelligenceButton";

export default function StatsBar({
	onOpenDashboard,
}: {
	onOpenDashboard: () => void;
}) {
	const {
		totalAirlines,
		bonusCount,
		showOnlyBonuses,
		setShowOnlyBonuses,
		featuredCount,
		showOnlyFeatured,
		setShowOnlyFeatured,
	} = useAirlines();

	// Don't show if there's no data
	if (totalAirlines === 0) return null;

	return (
		// <div className="w-full mt-4 py-2 px-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl flex items-center justify-between shadow-sm animate-in fade-in slide-in-from-top-2">
		<div className="w-full mt-4 py-2 px-3 sm:px-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl flex items-center justify-between gap-2 overflow-x-hidden">
			<div className="flex gap-6 items-center">
				{/* 🟢 PARTNERS */}
				<div className="flex flex-col justify-center text-left pl-4 py-1 border-l border-transparent">
					<p className="text-[10px] font-black uppercase tracking-widest text-slate-400 leading-none mb-1">
						Partners
					</p>
					<p className="text-xl font-black text-sky-600 leading-none">
						{totalAirlines}
					</p>
				</div>

				{/* 🟠 BONUSES */}
				<button
					onClick={() => setShowOnlyBonuses(!showOnlyBonuses)}
					className={`cursor-pointer text-left border-l pl-4 py-1 transition-all hover:bg-slate-50 dark:hover:bg-slate-800/50 ${
						showOnlyBonuses
							? "border-l-orange-500 bg-orange-500/10"
							: "border-slate-200 dark:border-slate-800"
					}`}
				>
					<p
						className={`text-[10px] font-black uppercase tracking-widest leading-none mb-1 ${showOnlyBonuses ? "text-orange-600" : "text-slate-400"}`}
					>
						Bonuses
					</p>
					{/* 🟢 Added -mt-1 to pull the whole row up */}
					<div className="flex items-center gap-1 leading-none -mt-1">
						<p
							className={`text-xl font-black ${showOnlyBonuses ? "text-orange-600" : "text-orange-500"}`}
						>
							{bonusCount}
						</p>
						{/* 🟢 Added -translate-y-0.5 to nudge the icon up specifically */}
						<span
							className={`text-lg -translate-y-0.5 ${bonusCount > 0 ? "animate-pulse" : ""}`}
						>
							🔥
						</span>
					</div>
				</button>

				{/* 🔵 FEATURES */}
				<button
					onClick={() => setShowOnlyFeatured(!showOnlyFeatured)}
					className={`cursor-pointer text-left border-l pl-4 py-1 transition-all hover:bg-slate-50 dark:hover:bg-slate-800/50 ${
						showOnlyFeatured
							? "border-l-blue-500 bg-blue-500/10"
							: "border-slate-200 dark:border-slate-800"
					}`}
				>
					<p
						className={`text-[10px] font-black uppercase tracking-widest leading-none mb-1 ${showOnlyFeatured ? "text-blue-600" : "text-slate-400"}`}
					>
						Features
					</p>
					{/* 🟢 Added -mt-1 to pull the whole row up */}
					<div className="flex items-center gap-1 leading-none -mt-1">
						<p
							className={`text-xl font-black ${showOnlyFeatured ? "text-blue-600" : "text-blue-500"}`}
						>
							{featuredCount}
						</p>
						{/* 🟢 Added -translate-y-0.5 to nudge the icon up specifically */}
						<span
							className={`text-lg -translate-y-0.5 ${featuredCount > 0 ? "animate-pulse" : ""}`}
						>
							✨
						</span>
					</div>
				</button>
			</div>

			<IntelligenceButton
				onClick={onOpenDashboard}
				label="Network Intelligence"
				icon={"→"}
				variant="solid"
			/>
		</div>
	);
}
