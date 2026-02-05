/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";

export default function AirlineCard({
	airline,
	ALLIANCE_LOGOS,
	isGridView,
	banks,
}: any) {
	const [imgError, setImgError] = useState(false);

	const airlineLogoUrl = airline.logo
		? airline.logo.startsWith("http")
			? airline.logo
			: `/logos/${airline.logo}`
		: `https://www.google.com/s2/favicons?sz=128&domain=${airline.domain}`;

	const getBankLogo = (bankId: string, banksList: any[]) => {
		const bank = banksList?.find(
			(b) => b.id.toLowerCase() === bankId.toLowerCase(),
		);
		if (!bank) return `https://ui-avatars.com/api/?name=${bankId}`;
		return (
			bank.logoOverride ||
			`https://www.google.com/s2/favicons?sz=64&domain=${bank.domain}`
		);
	};

	const featuredStyles = airline.featured
		? "ring-2 ring-blue-500 shadow-lg shadow-blue-500/10"
		: "shadow-sm";

	return (
		<div
			className={`group relative overflow-hidden transition-all duration-300 border ${
				isGridView
					? "flex flex-col h-full p-6 rounded-[2rem]"
					: /* Mobile: stack vertically | Desktop: row if not gridView */
						"flex flex-col md:flex-row md:items-center justify-between p-5 md:p-4 rounded-2xl mb-3"
			} ${featuredStyles} 
      bg-white border-slate-200 hover:border-blue-300
      dark:bg-[#0f172a] dark:border-slate-800 dark:hover:border-slate-700`}
		>
			{/* Header Section */}
			<div className="flex items-center gap-4 w-full">
				<div className="relative flex-shrink-0">
					<div className="w-12 h-12 rounded-2xl bg-white p-2 flex items-center justify-center shadow-md border border-slate-100 dark:border-transparent">
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
				</div>

				<div className="min-w-0 flex-1">
					{/* Airline Hyperlink */}
					<a
						href={airline.url || `https://${airline.domain}`}
						target="_blank"
						rel="noopener noreferrer"
						className="inline-block group/link"
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
								className="w-4 h-4"
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
						: /* Mobile: margin-top | Desktop: align right in list view */
							"mt-4 md:mt-0 justify-start md:justify-end ml-0 md:ml-auto w-full md:w-auto"
				}`}
			>
				{airline.partners?.map((p: any, i: number) => (
					<div
						key={i}
						className="flex items-center gap-3 border rounded-2xl pl-2 pr-3 py-1.5 transition-all
              bg-slate-50 border-slate-200 text-slate-800 
              dark:bg-slate-900/40 dark:border-slate-800 dark:text-slate-200"
					>
						<div className="w-7 h-7 rounded-lg bg-white p-1 flex items-center justify-center shadow-sm flex-shrink-0 border border-slate-100">
							<img
								src={getBankLogo(p.bank, banks)}
								className="w-full h-full object-contain"
								alt=""
							/>
						</div>

						<div className="flex flex-col">
							<span className="text-[8px] font-bold uppercase tracking-tighter mb-0.5 text-slate-500 dark:text-slate-500">
								{p.bank}
							</span>
							<div className="flex items-center gap-1.5">
								<span className="text-[11px] font-bold leading-none">
									{p.ratio}
								</span>
								{p.bonus && (
									<span className="text-[10px] font-black text-emerald-600 dark:text-emerald-400 animate-pulse">
										+{p.bonus}%
									</span>
								)}
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
