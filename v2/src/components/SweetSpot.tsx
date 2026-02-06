import { motion } from "motion/react";

const DEALS = [
	{ provider: "Amex", partner: "Virgin", value: "¢1.8", color: "bg-red-500" },
	{
		provider: "Chase",
		partner: "Air Canada",
		value: "¢1.6",
		color: "bg-green-600",
	},
	{
		provider: "Bilt",
		partner: "Flying Blue",
		value: "¢2.1",
		color: "bg-sky-500",
	},
];

export default function SweetSpot() {
	return (
		<div className="space-y-3">
			<div className="flex items-center gap-2 mb-2">
				<span className="text-[10px] font-black uppercase tracking-[0.2em] text-amber-500">
					✨ Sweet Spot Alerts
				</span>
			</div>

			<div className="grid grid-cols-1 gap-3">
				{DEALS.map((deal, i) => (
					<motion.div
						key={deal.partner}
						initial={{ opacity: 0, x: -20, scale: 0.9 }}
						animate={{ opacity: 1, x: 0, scale: 1 }}
						transition={{
							type: "spring",
							damping: 20,
							stiffness: 300,
							delay: i * 0.1, // 🟢 Staggered entry
						}}
						whileHover={{ scale: 1.02 }}
						whileTap={{ scale: 0.98 }}
						className="cursor-pointer flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-800"
					>
						<div className="flex items-center gap-3">
							<div className={`w-1.5 h-8 rounded-full ${deal.color}`} />
							<div>
								<p className="text-[10px] font-bold text-slate-400 uppercase leading-none">
									{deal.provider} →
								</p>
								<p className="text-sm font-black dark:text-white mt-1">
									{deal.partner}
								</p>
							</div>
						</div>
						<div className="text-right">
							<p className="text-[10px] font-bold text-slate-400 uppercase leading-none">
								Value
							</p>
							<p className="text-sm font-black text-emerald-500 mt-1">
								{deal.value}
							</p>
						</div>
					</motion.div>
				))}
			</div>
		</div>
	);
}
