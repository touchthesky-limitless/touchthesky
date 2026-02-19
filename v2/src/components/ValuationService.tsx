import { useState, useEffect } from "react";
import { VALUATIONS } from "../data/valuations";
import { useCopy } from "../hooks/useCopy";
import { useAirlines } from "../hooks/useAirlines";

export default function ValuationService() {
	const [isOpen, setIsOpen] = useState(false);
	const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
	const { isCopied, shareResult } = useCopy();
	const { getPartnerCount } = useAirlines();

	// Keyboard shortcut: Press ESC to close
	useEffect(() => {
		const handleEsc = (e: KeyboardEvent) => {
			if (e.key === "Escape") setIsOpen(false);
		};
		if (isOpen) window.addEventListener("keydown", handleEsc);
		return () => window.removeEventListener("keydown", handleEsc);
	}, [isOpen]);

	const handleCopy = (item: (typeof VALUATIONS)[0], index: number) => {
		setCopiedIndex(index);

		shareResult({
			title: item.name,
			details: `¢${item.value} per point`,
		});
	};

	return (
		<>
			{/* TRIGGER BUTTON: Floating High-Tech FAB */}
			<button
				onClick={() => setIsOpen(true)}
				className="cursor-pointer fixed bottom-6 right-6 z-40 p-3.5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-2xl shadow-2xl hover:scale-105 active:scale-95 transition-all flex items-center gap-2 border border-slate-700 dark:border-slate-200 group"
			>
				<svg
					className="w-4 h-4 group-hover:rotate-12 transition-transform"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth={2.5}
						d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
					/>
				</svg>
				<span className="text-[10px] font-black uppercase tracking-[0.2em] pr-1">
					Benchmarks
				</span>
			</button>

			{/* DRAWER COMPONENT: Self-contained logic */}
			{isOpen && (
				<div className="fixed inset-0 z-100 flex justify-end">
					{/* Backdrop blur */}
					<div
						className="absolute inset-0 bg-slate-950/40 backdrop-blur-sm transition-opacity"
						onClick={() => setIsOpen(false)}
					/>

					<div className="relative w-full max-w-sm bg-white dark:bg-slate-900 h-full border-l border-slate-200 dark:border-slate-800 flex flex-col shadow-2xl animate-in slide-in-from-right duration-300">
						{/* Drawer Header */}
						<div className="p-6 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
							<div>
								<p className="text-[10px] font-mono text-blue-500 font-bold uppercase tracking-[0.3em]">
									Sky_Index_v2.6
								</p>
								<h2 className="text-xl font-black dark:text-white uppercase tracking-tighter">
									Market Value
								</h2>
							</div>
							<button
								onClick={() => setIsOpen(false)}
								className="cursor-pointer p-2 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors"
							>
								<svg
									className="w-5 h-5"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M6 18L18 6M6 6l12 12"
									/>
								</svg>
							</button>
						</div>

						{/* List Content */}
						<div className="flex-1 overflow-y-auto p-6 space-y-4">
							{VALUATIONS.map((item, idx) => (
								<div
									key={item.code}
									className="group p-4 rounded-2xl border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30 transition-all hover:border-blue-500/50"
								>
									<div className="flex justify-between items-center">
										<div className="space-y-0.5">
											<p className="text-[8px] font-mono text-slate-400 uppercase">
												{item.code}{" "}
												<span className="text-[7px] text-slate-500">
													({getPartnerCount(item.code.split("_")[0])} Partners)
												</span>
											</p>
											<p className="text-xs font-bold text-slate-700 dark:text-slate-200 uppercase">
												{item.name}
											</p>
										</div>
										<div className="flex items-center gap-3">
											<div className="text-right">
												<span className="text-[9px] font-bold text-slate-400 ml-1">
													¢
												</span>
												<span
													className={`text-lg font-mono font-black ${item.color}`}
												>
													{item.value}
												</span>
											</div>
											<button
												onClick={() => handleCopy(item, idx)}
												className="cursor-pointer p-2 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-400 hover:text-blue-500 transition-all"
											>
												{isCopied && copiedIndex === idx ? (
													<svg
														className="w-3.5 h-3.5 text-emerald-500"
														fill="none"
														viewBox="0 0 24 24"
														stroke="currentColor"
													>
														<path
															strokeLinecap="round"
															strokeLinejoin="round"
															strokeWidth={3}
															d="M5 13l4 4L19 7"
														/>
													</svg>
												) : (
													<svg
														className="w-3.5 h-3.5"
														fill="none"
														viewBox="0 0 24 24"
														stroke="currentColor"
													>
														<path
															strokeLinecap="round"
															strokeLinejoin="round"
															strokeWidth={2}
															d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2"
														/>
													</svg>
												)}
											</button>
										</div>
									</div>
								</div>
							))}
						</div>

						{/* Footer Footer */}
						<div className="p-6 bg-slate-50/50 dark:bg-slate-800/20 border-t border-slate-100 dark:border-slate-800">
							<p className="text-[9px] font-medium text-slate-400 dark:text-slate-500 uppercase leading-relaxed">
								Data generated via Sky_Protocol at 2.6 Ghz. Redemption
								efficiency may fluctuate based on partner availability.
							</p>
						</div>
					</div>
				</div>
			)}
		</>
	);
}
