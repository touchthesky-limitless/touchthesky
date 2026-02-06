import { motion } from "framer-motion";
import { useAirlines } from "../hooks/useAirlines";
import SweetSpot from "./SweetSpot";

interface DashboardProps {
	onClose: () => void;
}

export default function Dashboard({ onClose }: DashboardProps) {
	const {
		filteredData,
		banks,
		activeBanks,
		toggleBank,
		getPartnerCount,
		totalAirlines,
		featuredCount,
		allianceCount,
		bonusCount,
	} = useAirlines();

	return (
		<motion.div
			initial={{ y: "100%" }}
			animate={{ y: 0 }}
			exit={{ y: "100%" }}
			/* 🟢 The 'Spring' Magic */
			transition={{
				type: "spring",
				damping: 30, // 📍 Higher = less "infinite" wobbling
				stiffness: 300, // 📍 Higher = faster initial snap
				mass: 0.8, // 📍 Lower = feels lighter/snappier
				velocity: 2, // 📍 Initial momentum
			}}
			drag="y"
			dragConstraints={{ top: 0, bottom: 0 }}
			dragElastic={0.6}
			onDragEnd={(_, info) => {
				if (info.offset.y > 100) onClose();
			}}
			/* 🟢 Changed inset-0 to bottom-0 and height to 65vh */
			className="fixed bottom-0 left-0 right-0 z-[100] bg-white dark:bg-slate-900 rounded-t-[2.5rem] shadow-2xl max-h-[65vh] overflow-y-auto no-scrollbar border-t border-slate-100 dark:border-slate-800"
		>
			{/* 📍 Sticky Handle so it stays at the top of the drawer while scrolling */}
			<div className="sticky top-0 bg-inherit pt-5 pb-2 z-30">
				<div className="w-10 h-1 bg-slate-300 dark:bg-slate-700 rounded-full mx-auto" />
			</div>

			<div className="space-y-6 p-4 pt-2">
				{/* Header Section */}
				<div className="flex justify-between items-end">
					<div>
						<h1 className="text-3xl font-black text-slate-900 dark:text-white uppercase tracking-tighter leading-none">
							Sky_Index Dashboard
						</h1>
						<p className="text-slate-500 dark:text-slate-400 text-sm mt-2 font-medium">
							Real-time analytics for your transfer partners.
						</p>
					</div>
					<button className="cursor-pointer px-5 py-2.5 bg-blue-600 text-white rounded-xl text-xs font-black uppercase tracking-widest hover:bg-blue-700 transition-all active:scale-95 shadow-lg shadow-sky-500/20">
						Sync Data
					</button>
				</div>

				{/* Main Stats Grid */}
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
					<div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm">
						<p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.2em]">
							Total Partners
						</p>
						<p className="text-4xl font-black text-sky-600 mt-2">
							{totalAirlines.toLocaleString()}
						</p>
					</div>

					<div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm">
						<p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.2em]">
							Featured
						</p>
						<p className="text-4xl font-black text-emerald-600 mt-2">
							{featuredCount}
						</p>
					</div>

					<div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm">
						<p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.2em]">
							Alliances
						</p>
						<p className="text-4xl font-black text-violet-600 mt-2">
							{allianceCount}
						</p>
					</div>

					<div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm">
						<p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.2em]">
							Active Bonuses
						</p>
						<p className="text-4xl font-black text-amber-500 mt-2">
							{bonusCount}
						</p>
					</div>
				</div>

				{/* 🟢 NEW: Sweet Spot Section */}
				<SweetSpot />

				{/* Banking Ecosystem Section */}
				<div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm">
					<div className="p-5 border-b border-slate-50 dark:border-slate-800 flex items-center justify-between">
						<h3 className="text-xs font-black uppercase tracking-widest dark:text-white">
							Banking Ecosystem
						</h3>
						<span className="text-[10px] font-bold text-slate-400 uppercase">
							{banks.length} Networks
						</span>
					</div>
					<div className="p-6">
						<div className="flex flex-wrap gap-4">
							{banks.map((bank) => {
								const count = getPartnerCount?.(bank.id);
								const isActive = activeBanks?.includes(bank.id);

								return (
									<button
										key={bank.id}
										onClick={() => toggleBank(bank.id)}
										className={`cursor-pointer flex items-center gap-3 px-4 py-2 rounded-2xl border transition-all active:scale-95 group ${
											isActive
												? `${bank.bg} border-transparent shadow-md`
												: "bg-slate-50 dark:bg-slate-800/30 border-slate-100 dark:border-slate-800 hover:border-sky-500"
										}`}
									>
										<div
											className={`w-2.5 h-2.5 rounded-full shadow-sm group-hover:scale-125 transition-transform ${
												isActive ? "bg-white" : bank.bg
											}`}
										/>
										<div className="flex flex-col text-left">
											<span
												className={`text-xs font-bold uppercase tracking-tight ${isActive ? "text-white" : "text-slate-700 dark:text-slate-200"}`}
											>
												{bank.name}
											</span>
											<span
												className={`text-[9px] font-medium ${isActive ? "text-white/80" : "text-slate-400"}`}
											>
												{count} Partners
											</span>
										</div>
									</button>
								);
							})}
						</div>
					</div>
				</div>

				{/* Alliance Distribution Section */}
				<div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 overflow-hidden shadow-sm">
					<div className="p-5 border-b border-slate-50 dark:border-slate-800 flex items-center justify-between">
						<h3 className="text-xs font-black uppercase tracking-widest dark:text-white">
							Alliance Distribution
						</h3>
						<span className="text-[10px] font-bold text-slate-400 uppercase">
							Airlines per Network
						</span>
					</div>
					<div className="p-6">
						<div className="flex flex-wrap gap-3">
							{Array.from(new Set(filteredData.map((a) => a.alliance))).map(
								(alliance) => (
									<div
										key={alliance}
										className="px-4 py-2 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-800"
									>
										<p className="text-[10px] font-bold text-slate-400 uppercase leading-none">
											{alliance}
										</p>
										<p className="text-lg font-black dark:text-white mt-1">
											{
												filteredData.filter((a) => a.alliance === alliance)
													.length
											}{" "}
											<span className="text-[10px] text-slate-500 font-medium">
												Airlines
											</span>
										</p>
									</div>
								),
							)}
						</div>
					</div>
				</div>

				{/* 🟢 Add a close button at the bottom for accessibility */}
				<button
					onClick={onClose}
					// className="cursor-pointer w-full py-4 text-slate-400 text-[10px] font-black uppercase tracking-widest hover:text-slate-600 transition-colors"
					className="cursor-pointer w-full mt-8 py-4 bg-blue-600 text-white rounded-2xl font-black uppercase tracking-widest text-xs active:scale-95 transition-all shadow-lg shadow-sky-500/20"
				>
					Dismiss Dashboard
				</button>
			</div>
		</motion.div>
	);
}
