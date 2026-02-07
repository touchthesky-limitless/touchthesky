import { useState } from "react";
import { motion, useDragControls } from "framer-motion";
import { useAirlines } from "../hooks/useAirlines";
import { Globe, Zap, Activity } from "lucide-react";
import SweetSpot from "./SweetSpot";
import RouteHeatmap from "./RouteHeatmap";
import PointPowerSlider from "./PointPowerSlider";

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

	const [points, setPoints] = useState(50000);
	// 1. Calculate the "Affordable" subset of your 1,000 nodes
	const affordableNodes = filteredData.filter(
		(node) => (node.minPoints ?? Infinity) <= points,
	);

	// 2. Calculate dynamic yield based on the slider
	const dynamicYield = points > 100000 ? 0.052 : 0.024;

	const dragControls = useDragControls();

	return (
		<motion.div
			initial={{ y: "100%" }}
			animate={{ y: 0 }}
			exit={{ y: "100%" }}
			transition={{
				type: "spring",
				damping: 30,
				stiffness: 300,
				mass: 0.8,
				velocity: 2,
			}}
			drag="y"
			dragConstraints={{ top: 0, bottom: 0 }}
			dragElastic={0.6}
			dragListener={false}
			dragControls={dragControls}
			onDragEnd={(_, info) => {
				if (info.offset.y > 100) onClose();
			}}
			className="fixed bottom-0 left-0 right-0 z-100 bg-white dark:bg-slate-950 rounded-t-[3rem] shadow-2xl h-[85vh] overflow-y-auto touch-pan-y no-scrollbar border-t border-slate-100 dark:border-white/10"
		>
			{/* Sticky iOS-style Handle */}
			<div
				onPointerDown={(e) => dragControls.start(e)}
				className="sticky top-0 bg-inherit pt-5 pb-2 z-30"
			>
				<div className="w-12 h-1.5 bg-slate-300 dark:bg-slate-800 rounded-full mx-auto" />
			</div>

			<div className="space-y-8 p-6 pt-2">
				{/* 🚀 Header Section */}
				<div className="flex justify-between items-start">
					<div>
						<h1 className="text-3xl font-black text-slate-900 dark:text-white uppercase tracking-tighter leading-none italic">
							Sky_Index Dashboard
						</h1>
						<p className="text-slate-500 dark:text-slate-400 text-sm mt-2 font-medium">
							Parsing {totalAirlines >= 1000 ? "1,000" : totalAirlines} Global
							Network Nodes
						</p>
					</div>
					<button className="cursor-pointer px-6 py-3 bg-blue-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-blue-700 transition-all active:scale-95 shadow-lg shadow-blue-500/20">
						Sync Data
					</button>
				</div>

				{/* 📊 Value Intelligence Layer - The Intelligence Layer shows the dynamicYield */}
				<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
					<div className="md:col-span-2 bg-gradient-to-br from-blue-600 to-indigo-700 p-8 rounded-[2.5rem] text-white shadow-xl relative overflow-hidden">
						<div className="relative z-10">
							<h4 className="text-[10px] font-black uppercase tracking-[0.2em] opacity-80">
								Network Yield
							</h4>
							<div className="flex items-baseline gap-2 mt-1">
								<p className="text-5xl font-black italic">${dynamicYield}</p>
								<p className="text-xs font-bold opacity-70">/ point avg</p>
							</div>

							<div className="mt-6 flex gap-4">
								<div className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-xl border border-white/10">
									<p className="text-[9px] font-black uppercase opacity-60">
										Status
									</p>
									<p className="text-xs font-bold text-emerald-300">
										Market Leader
									</p>
								</div>
								<div className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-xl border border-white/10">
									<p className="text-[9px] font-black uppercase opacity-60">
										Efficiency
									</p>
									<p className="text-xs font-bold text-sky-200">+14.2%</p>
								</div>
							</div>
						</div>
						<Activity className="absolute right-[-20px] bottom-[-20px] w-48 h-48 opacity-10 rotate-12" />
					</div>

					<div className="bg-slate-50 dark:bg-white/5 p-8 rounded-[2.5rem] border border-slate-100 dark:border-white/5 flex flex-col justify-center text-center">
						<Globe className="w-8 h-8 text-blue-500 mx-auto mb-3" />
						<p className="text-[9px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest">
							Global Reach
						</p>
						<p className="text-3xl font-black dark:text-white mt-1">194</p>
						<p className="text-[10px] font-bold text-slate-400">Territories</p>
					</div>
				</div>

				{/*  PointPowerSlider */}
				<PointPowerSlider points={points} setPoints={setPoints} />

				{/* The Heatmap receives the 'affordableNodes' to light up the map */}
				<RouteHeatmap activeNodes={affordableNodes} />

				<SweetSpot />

				{/* 📈 Main Stats Grid */}
				<div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
					{[
						{
							label: "Total Partners",
							val: totalAirlines,
							color: "text-blue-600",
						},
						{
							label: "Featured",
							val: featuredCount,
							color: "text-emerald-500",
						},
						{
							label: "Alliances",
							val: allianceCount,
							color: "text-violet-500",
						},
						{
							label: "Active Bonuses",
							val: bonusCount,
							color: "text-amber-500",
						},
					].map((stat, i) => (
						<div
							key={i}
							className="bg-slate-50 dark:bg-white/5 p-6 rounded-[2rem] border border-slate-100 dark:border-white/5"
						>
							<p className="text-slate-400 text-[9px] font-black uppercase tracking-[0.2em]">
								{stat.label}
							</p>
							<p className={`text-3xl font-black ${stat.color} mt-2`}>
								{stat.val >= 1000 ? "1,000" : stat.val.toLocaleString()}
							</p>
						</div>
					))}
				</div>

				{/* 🏦 Banking Ecosystem Section */}
				<div className="bg-slate-50 dark:bg-white/5 rounded-[2.5rem] border border-slate-100 dark:border-white/5 overflow-hidden">
					<div className="p-6 border-b border-slate-100 dark:border-white/5 flex items-center justify-between">
						<h3 className="text-xs font-black uppercase tracking-widest dark:text-white flex items-center gap-2">
							<Zap className="w-4 h-4 text-blue-500" /> Banking Ecosystem
						</h3>
						<span className="text-[10px] font-bold text-slate-400 uppercase">
							{banks.length} Networks Loaded
						</span>
					</div>
					<div className="p-8">
						<div className="flex flex-wrap gap-4">
							{banks.map((bank) => {
								const count = getPartnerCount?.(bank.id);
								const isActive = activeBanks?.includes(bank.id);

								return (
									<button
										key={bank.id}
										onClick={() => toggleBank(bank.id)}
										className={`cursor-pointer flex items-center gap-4 px-5 py-3 rounded-2xl border transition-all active:scale-95 group ${
											isActive
												? `${bank.bg} border-transparent shadow-xl`
												: "bg-white dark:bg-slate-900 border-slate-100 dark:border-white/5 hover:border-blue-500"
										}`}
									>
										<div
											className={`w-3 h-3 rounded-full shadow-inner transition-transform group-hover:scale-125 ${
												isActive ? "bg-white" : bank.bg
											}`}
										/>
										<div className="flex flex-col text-left">
											<span
												className={`text-xs font-black uppercase tracking-tight ${isActive ? "text-white" : "text-slate-700 dark:text-slate-200"}`}
											>
												{bank.name}
											</span>
											<span
												className={`text-[9px] font-bold ${isActive ? "text-white/70" : "text-slate-400"}`}
											>
												{count} Nodes
											</span>
										</div>
									</button>
								);
							})}
						</div>
					</div>
				</div>

				{/* 🔗 Alliance Distribution */}
				<div className="bg-slate-50 dark:bg-white/5 rounded-[2.5rem] border border-slate-100 dark:border-white/5">
					<div className="p-6 border-b border-slate-100 dark:border-white/5">
						<h3 className="text-xs font-black uppercase tracking-widest dark:text-white">
							Alliance Distribution
						</h3>
					</div>
					<div className="p-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
						{Array.from(new Set(filteredData.map((a) => a.alliance))).map(
							(alliance) => {
								const count = filteredData.filter(
									(a) => a.alliance === alliance,
								).length;
								return (
									<div
										key={alliance}
										className="px-6 py-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-white/5"
									>
										<p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none">
											{alliance}
										</p>
										<p className="text-2xl font-black dark:text-white mt-1">
											{count >= 1000 ? "1,000" : count}{" "}
											<span className="text-[10px] text-slate-500 font-bold uppercase">
												Nodes
											</span>
										</p>
									</div>
								);
							},
						)}
					</div>
				</div>

				{/* 🏁 Footer & Dismissal */}
				<div className="pt-6 pb-12">
					<button
						onClick={onClose}
						className="cursor-pointer w-full py-5 bg-blue-600 hover:bg-blue-500 text-white rounded-[2rem] font-black uppercase tracking-[0.3em] text-[10px] transition-all active:scale-[0.98] shadow-2xl shadow-blue-500/30"
					>
						Dismiss Dashboard
					</button>
					<div className="flex justify-center items-center gap-4 mt-8 opacity-40">
						<div className="h-px w-12 bg-slate-500" />
						<p className="text-[8px] font-black text-slate-500 uppercase tracking-[0.4em]">
							Sky_Index v2.0 • Data Secured
						</p>
						<div className="h-px w-12 bg-slate-500" />
					</div>
				</div>
			</div>
		</motion.div>
	);
}
