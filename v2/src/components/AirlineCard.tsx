/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useMemo } from "react";
import { usePointCalculator } from "../hooks/usePointCalculator";
import { useGetAirlineLogos } from "../hooks/useGetAirlineLogos";
import type { Partner } from "../types/";
import { useAirlines } from "../context/AirlinesContext";

export default function AirlineCard({
	airline,
	ALLIANCE_LOGOS,
	isGridView,
	banks,
}: any) {
	const [imgError, setImgError] = useState(false);

	// State for calculator
	const [calcPartner, setCalcPartner] = useState<string | null>(null);
	const [now] = useState(() => Date.now());

	const {
		pointsAmount,
		setPointsAmount,
		calcMode,
		setCalcMode,
		calculateTransfer,
		calculateRequired,
	} = usePointCalculator();

	const { airlineLogoUrl, getBankLogo } = useGetAirlineLogos(airline, banks);
	const { bankColorMap } = useAirlines();

	// Updated: Check if any partner has a bonus that is NOT EXPIRED
	const hasActiveBonus = useMemo(() => {
		return airline.partners?.some((p: Partner) => {
			if (!p.bonusAmount) return false;
			if (!p.bonusEnds) return true;

			// Fix: Treat as Local Time and set to end of day
			const expiry = new Date(p.bonusEnds.replace(/-/g, "/"));
			expiry.setHours(23, 59, 59, 999);
			return expiry.getTime() > now;
		});
	}, [airline.partners, now]);

	// Determine Style Priority: Bonus wins over Featured
	const cardHighlightStyles = hasActiveBonus
		? "ring-2 ring-emerald-500 shadow-lg shadow-emerald-500/10" // Bonus Green
		: airline.featured
			? "ring-2 ring-blue-500 shadow-lg shadow-blue-500/10" // Featured Blue
			: "shadow-sm"; // Standard

	return (
		<div
			className={`group relative overflow-hidden transition-all duration-300 border ${
				isGridView
					? "flex flex-col h-full p-6 rounded-4xl"
					: /* Mobile: stack vertically | Desktop: row if not gridView */
						"flex flex-col md:flex-row md:items-center justify-between p-5 md:p-4 rounded-2xl mb-3"
			} ${cardHighlightStyles} 
            bg-white border-slate-200 hover:border-blue-300
            dark:bg-[#0f172a] dark:border-slate-800 dark:hover:border-slate-700`}
		>
			{/* Header Section */}
			<div className="flex items-center gap-4 w-full">
				<div className="relative shrink-0">
					<div
						className={`w-12 h-12 rounded-2xl bg-white p-2 flex items-center justify-center shadow-md border transition-colors ${
							hasActiveBonus
								? "border-red-200 dark:border-red-900/50"
								: "border-slate-100 dark:border-transparent"
						}`}
					>
						{imgError ? (
							<span className="text-blue-600 font-bold">{airline.iata}</span>
						) : (
							<img
								src={airlineLogoUrl}
								onError={() => setImgError(true)}
								className="w-full h-full object-contain"
								alt=""
							/>
						)}
					</div>

					{hasActiveBonus && (
						<div className="absolute inset-0 rounded-2xl border-2 border-red-500/20 pointer-events-none animate-pulse" />
					)}
				</div>

				<div className="min-w-0 flex-1">
					{/* Airline Hyperlink */}
					<a
						href={airline.url || `https://${airline.domain}`}
						target="_blank"
						rel="noopener noreferrer"
						className="inline-block group/link cursor-pointer"
					>
						<h3 className="font-bold text-lg leading-tight truncate text-slate-900 dark:text-white group-hover/link:text-blue-500 transition-colors">
							{airline.name}
							<span className="ml-1 opacity-0 group-hover/link:opacity-100 transition-opacity text-xs font-normal text-blue-400">
								↗
							</span>
						</h3>
					</a>

					<div className="flex items-center gap-2 mt-1">
						<span className="text-[10px] font-bold px-2 py-0.5 rounded-md uppercase tracking-wider border bg-slate-100 text-slate-600 border-slate-200 dark:bg-slate-800 dark:text-slate-400 dark:border-slate-700">
							{airline.iata}
						</span>
						{ALLIANCE_LOGOS?.[airline.alliance] && (
							<img
								src={ALLIANCE_LOGOS[airline.alliance]}
								className="w-4 h-4 alliance-logo-canvas"
								alt=""
							/>
						)}
						<span className="text-[10px] px-2 py-0.5 rounded-md tracking-wider border bg-slate-100 text-slate-600 border-slate-200 dark:bg-slate-800 dark:text-slate-400 dark:border-slate-700">
							{airline.award}
						</span>
					</div>
				</div>
			</div>

			{/* Partner Section */}
			<div
				className={`flex flex-wrap gap-2 ${
					isGridView
						? "mt-6"
						: "mt-4 md:mt-0 justify-start md:justify-end ml-0 md:ml-auto w-full md:w-auto"
				}`}
			>
				{airline.partners?.map((p: any, i: number) => {
					const safeDate = p.bonusEnds
						? new Date(p.bonusEnds.replace(/-/g, "/"))
						: null;
					if (safeDate) {
						safeDate.setHours(23, 59, 59, 999);
					}

					const isExpired = safeDate ? safeDate.getTime() < now : false;
					const partnerHasBonus = (p.bonusAmount ?? 0) > 0 && !isExpired;

					const rgb = bankColorMap[p.bank] || "bg-slate-500";
					const tintedBackground = `
						bg-[rgb(var(--bank-rgb)/0.1)] 
						border-[rgb(var(--bank-rgb)/0.2)] 
						dark:bg-[rgb(var(--bank-rgb)/0.15)] 
						dark:border-[rgb(var(--bank-rgb)/0.4)]
					`;

					return (
						<div key={i} className="flex flex-col gap-2">
							<div
								onClick={() =>
									setCalcPartner(calcPartner === p.bank ? null : p.bank)
								}
								style={{ "--bank-rgb": rgb } as any}
								className={`cursor-pointer flex items-center gap-3 border rounded-2xl pl-2 pr-3 py-1.5 transition-all
                                    ${
																			partnerHasBonus
																				? "bg-[rgb(var(--bank-rgb)/0.1)] border-[rgb(var(--bank-rgb)/0.2)] dark:bg-[rgb(var(--bank-rgb)/0.15)] dark:border-[rgb(var(--bank-rgb)/0.4)]"
																				: "bg-slate-50 border-slate-200 dark:bg-slate-900/40 dark:border-slate-800"
																		} text-slate-800 dark:text-slate-200 hover:border-blue-400 dark:hover:border-blue-500`}
							>
								<div className="relative w-7 h-7 rounded-lg bg-white p-1 flex items-center justify-center shadow-sm shrink-0 border border-slate-100">
									<img
										src={getBankLogo(p.bank)}
										className="w-full h-full object-contain"
										alt=""
									/>
									{/* Red dot top right bank logo */}
									{partnerHasBonus && (
										<span className="absolute -top-1 -right-1 flex h-2 w-2">
											<span
												style={{ "--bank-rgb": rgb } as any}
												className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[rgb(var(--bank-rgb)/0.9)] opacity-75"
											></span>
											<span
												style={{ "--bank-rgb": rgb } as any}
												className="relative inline-flex rounded-full h-2 w-2 bg-[rgb(var(--bank-rgb)/0.9)]"
											></span>
										</span>
									)}
								</div>

								<div className="flex flex-col">
									<span className="text-[8px] font-bold uppercase tracking-tighter mb-0.5 text-slate-500 dark:text-slate-500">
										{p.bank}
									</span>
									<div className="flex items-center gap-1.5">
										<span className="text-[11px] font-bold leading-none">
											{p.ratio}
										</span>
										{p.bonusAmount && partnerHasBonus && (
											<span className="text-[10px] font-black text-emerald-600 dark:text-emerald-400 animate-pulse">
												+{p.bonusAmount}%
											</span>
										)}
									</div>
								</div>
							</div>

							{/* Calculator UI */}
							{calcPartner === p.bank && (
								<div
									style={{ "--bank-rgb": rgb } as any}
									className={`p-3 ${tintedBackground} rounded-xl animate-in fade-in zoom-in-95 duration-200`}
								>
									<div className="flex flex-col gap-2 min-w-40">
										<div
											className={`flex ${tintedBackground} dark:bg-slate-800 p-0.5 rounded-lg mb-1`}
										>
											<button
												onClick={(e) => {
													e.stopPropagation();
													setCalcMode("have");
												}}
												style={{ "--bank-rgb": rgb } as any}
												className={`flex-1 text-[8px] uppercase font-black py-1 px-2 rounded-md transition-all cursor-pointer ${calcMode === "have" ? tintedBackground : "text-slate-500"}`}
											>
												I Have
											</button>
											<button
												onClick={(e) => {
													e.stopPropagation();
													setCalcMode("need");
												}}
												style={{ "--bank-rgb": rgb } as any}
												className={`flex-1 text-[8px] uppercase font-black py-1 px-2 rounded-md transition-all cursor-pointer ${calcMode === "need" ? tintedBackground : "text-slate-500"}`}
											>
												I Need
											</button>
										</div>
										<div className="flex items-center justify-between">
											<label className="text-[9px] font-black text-blue-600 dark:text-blue-400 uppercase tracking-widest">
												{calcMode === "have"
													? "Bank Points"
													: `${airline.award} Goal`}
											</label>
											{/* Bonus Countdown next to the label */}
											{p.bonusEnds && partnerHasBonus && (
												<div className="flex items-center gap-1 px-1.5 py-0.5 bg-emerald-100 dark:bg-emerald-500/20 rounded-md border border-emerald-200 dark:border-emerald-500/30 animate-pulse">
													<span className="text-[7px] font-mono font-bold text-red-500">
														⏳End:
													</span>
													<span className="text-[8px] font-mono font-bold text-emerald-700 dark:text-emerald-300">
														{p.bonusEnds}
													</span>
												</div>
											)}
										</div>

										<input
											type="text"
											value={pointsAmount}
											onClick={(e) => e.stopPropagation()}
											onChange={(e) => setPointsAmount(e.target.value)}
											className="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-2 py-1 text-xs font-bold outline-none focus:ring-1 focus:ring-blue-500"
										/>

										<div className="pt-1 border-t border-blue-100 dark:border-blue-800/50">
											<div className="text-[11px] font-black text-slate-900 dark:text-white">
												{calcMode === "have" ? (
													<>
														={" "}
														{calculateTransfer(
															p.ratio,
															/* If expired, pass 0 as the bonus so math is base-ratio only */
															partnerHasBonus ? p.bonusAmount : 0,
														).toLocaleString()}{" "}
														{airline.award}
													</>
												) : (
													<>
														Requires{" "}
														{calculateRequired(
															p.ratio,
															/* If expired, pass 0 as the bonus so math is base-ratio only */
															partnerHasBonus ? p.bonusAmount : 0,
														).toLocaleString()}{" "}
														{p.bank} Points
													</>
												)}
											</div>
										</div>
									</div>
								</div>
							)}
						</div>
					);
				})}
			</div>
		</div>
	);
}
