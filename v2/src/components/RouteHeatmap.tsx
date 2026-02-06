import { useMemo, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { AIRLINES } from "../data/partners";
import type { Airline } from "../types";

export default function RouteHeatmap() {
	const [activeRegion, setActiveRegion] = useState<string | null>(null);
	const [isDark, setIsDark] = useState(() =>
		typeof window !== "undefined"
			? window.matchMedia("(prefers-color-scheme: dark)").matches
			: true,
	);

	// 🌗 Auto-System Theme Listener
	useEffect(() => {
		const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
		const handler = (e: MediaQueryListEvent) => setIsDark(e.matches);
		mediaQuery.addEventListener("change", handler);
		return () => mediaQuery.removeEventListener("change", handler);
	}, []);

	// 🟢 Accurate Data Processing from partners.ts
	const stats = useMemo(() => {
		return AIRLINES.reduce(
			(acc, curr: Airline) => {
				const reg = curr.region || "NA";
				acc[reg] = (acc[reg] || 0) + 1;
				return acc;
			},
			{} as Record<string, number>,
		);
	}, []);

	const REGIONS = [
		{
			id: "NA",
			name: "N. America",
			count: stats["NA"] || 0,
			pos: { x: "15%", y: "35%" },
			color: "#0ea5e9",
		},
		{
			id: "SA",
			name: "S. America",
			count: stats["SA"] || 0,
			pos: { x: "25%", y: "70%" },
			color: "#ec4899",
		},
		{
			id: "EU",
			name: "Europe",
			count: stats["EU"] || 0,
			pos: { x: "48%", y: "25%" },
			color: "#8b5cf6",
		},
		{
			id: "AS",
			name: "Asia",
			count: stats["AS"] || 0,
			pos: { x: "75%", y: "40%" },
			color: "#10b981",
		},
		{
			id: "OC",
			name: "Oceania",
			count: stats["OC"] || 0,
			pos: { x: "85%", y: "75%" },
			color: "#6366f1",
		},
		{
			id: "WORLDWIDE",
			name: "Worldwide Hotels",
			count: stats["WORLDWIDE"] || 0,
			pos: { x: "95%", y: "35%" },
			color: "#f6b12e",
		},
	];

	return (
        
		<div
			className={`
            ${isDark ? "bg-slate-950 border-white/5" : "bg-slate-50 border-slate-200"} 
            rounded-[2.5rem] p-8 border shadow-2xl relative overflow-hidden transition-colors duration-700
        `}
		>
			<div
				className="absolute inset-0 opacity-10"
				style={{
					backgroundImage: `radial-gradient(${isDark ? "#334155" : "#94a3b8"} 1px, transparent 1px)`,
					backgroundSize: "24px 24px",
				}}
			/>

			<div className="relative z-10 flex justify-between items-start mb-12">
				<div>
					<h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-sky-500/80">
						Network Topology
					</h3>
					<p
						className={`${isDark ? "text-white" : "text-slate-900"} text-2xl font-black tracking-tighter mt-1`}
					>
						Global Connectivity
					</p>
				</div>

				<div
					className={`${isDark ? "bg-white/5 border-white/10" : "bg-white border-slate-200"} backdrop-blur-xl border px-5 py-2.5 rounded-2xl shadow-sm`}
				>
					<p className="text-[9px] font-bold text-slate-500 uppercase leading-none">
						Total Nodes
					</p>
					<p
						className={`text-xl font-black ${isDark ? "text-white" : "text-slate-900"} mt-1`}
					>
						{AIRLINES.length >= 1000
							? "1,000"
							: AIRLINES.length.toLocaleString()}
					</p>
				</div>
			</div>

			<div className="relative h-64 w-full">
				<svg className="w-full h-full overflow-visible">
					{REGIONS.map((reg) => {
						const isSelected = activeRegion === reg.id;
						const hasData = reg.count > 0;

						return (
							<g
								key={reg.id}
								className="cursor-pointer"
								onMouseEnter={() => setActiveRegion(reg.id)}
								onMouseLeave={() => setActiveRegion(null)}
							>
								{/* 📍 Animated Pulsing Ring */}
								{hasData && (
									<motion.circle
										cx={reg.pos.x}
										cy={reg.pos.y}
										r={6}
										stroke={reg.color}
										strokeWidth="2"
										fill="transparent"
										initial={{ opacity: 0.5, r: 6 }}
										animate={{ opacity: 0, r: 25 }}
										transition={{
											duration: 2,
											repeat: Infinity,
											ease: "easeOut",
										}}
									/>
								)}

								{/* Main Glow Halo */}
								<motion.circle
									cx={reg.pos.x}
									cy={reg.pos.y}
									r={isSelected ? 40 : 15}
									fill={reg.color}
									initial={false}
									animate={{ opacity: isSelected ? 0.2 : hasData ? 0.05 : 0 }}
								/>

								{/* Solid Core Dot */}
								<circle
									cx={reg.pos.x}
									cy={reg.pos.y}
									r={isSelected ? 7 : 5}
									fill={hasData ? reg.color : isDark ? "#1e293b" : "#cbd5e1"}
									className="transition-all duration-300"
								/>
							</g>
						);
					})}
				</svg>

				{REGIONS.map((reg) => (
					<div
						key={reg.id}
						style={{ left: reg.pos.x, top: reg.pos.y }}
						className="absolute -translate-x-1/2 translate-y-8 pointer-events-none text-center min-w-[120px]"
					>
						<p
							className={`text-[10px] font-black uppercase tracking-widest transition-all ${
								activeRegion === reg.id
									? isDark
										? "text-white"
										: "text-slate-900"
									: isDark
										? "text-slate-600"
										: "text-slate-400"
							}`}
						>
							{reg.name}
						</p>
						<p
							className={`text-[11px] font-bold ${
								activeRegion === reg.id
									? "text-sky-500"
									: isDark
										? "text-slate-800"
										: "text-slate-300"
							}`}
						>
							{reg.count >= 1000 ? "1,000" : reg.count.toLocaleString()}{" "}
							Partners
						</p>
					</div>
				))}
			</div>

			<div className="mt-12 flex justify-center">
				<button className="cursor-pointer bg-sky-500/10 hover:bg-sky-500 text-sky-500 hover:text-white px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest border border-sky-500/20 transition-all">
					Explore Network Details 📍
				</button>
			</div>
		</div>
	);
}