import { useAirlines } from "../hooks/useAirlines";

export default function StatsBar({
	onOpenDashboard,
}: {
	onOpenDashboard: () => void;
}) {
	const { totalAirlines, bonusCount, showOnlyBonuses, setShowOnlyBonuses } =
		useAirlines();

	// Don't show if there's no data
	if (totalAirlines === 0) return null;

	return (
		<div className="w-full mt-4 p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl flex items-center justify-between shadow-sm animate-in fade-in slide-in-from-top-2">
			<div className="flex gap-4">
				{/* Static Partners Info */}
				<div className="text-left">
					<p className="text-[10px] font-black uppercase tracking-widest text-slate-400">
						Partners
					</p>
					<p className="text-xl font-black text-sky-600">{totalAirlines}</p>
				</div>

				{/* Interactive Bonus Section */}
				<button
					onClick={() => setShowOnlyBonuses(!showOnlyBonuses)}
					className={`cursor-pointer text-left border-l border-slate-200 dark:border-slate-800 pl-4 transition-all hover:opacity-70 ${
						showOnlyBonuses ? "scale-105" : ""
					}`}
				>
					<p className="text-[10px] font-black uppercase tracking-widest text-slate-400">
						Bonuses
					</p>
					<div className="flex items-center gap-1">
						<p
							className={`text-xl font-black ${showOnlyBonuses ? "text-orange-600" : "text-orange-500"}`}
						>
							{bonusCount}
						</p>
						<span className={bonusCount > 0 ? "animate-bounce" : ""}>🔥</span>
					</div>
				</button>
			</div>

			{/* Dashboard Trigger */}
			<button
				onClick={onOpenDashboard}
				className="cursor-pointer bg-slate-100 dark:bg-slate-800 px-4 py-2 rounded-xl text-[10px] font-black text-slate-500 hover:bg-sky-600 hover:text-white transition-all active:scale-95"
			>
				VIEW INSIGHTS →
			</button>
		</div>
	);
}
