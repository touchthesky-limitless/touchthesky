/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";

export default function AirlineCard({
    airline,
    // ALLIANCE_LOGOS,
    isGridView,
    // banks,
}: any) {
    // const [imgError, setImgError] = useState(false);
    
    // 🎨 UI State Management
    const [calcPartner, setCalcPartner] = useState<string | null>(null);
    const [pointsAmount, setPointsAmount] = useState<string>("1,000");
    const [showSweetSpots, setShowSweetSpots] = useState(false);

    // 🌐 Logo Logic
    const airlineLogoUrl = airline.logo
        ? airline.logo.startsWith("http")
            ? airline.logo
            : `/logos/${airline.logo}`
        : `https://www.google.com/s2/favicons?sz=128&domain=${airline.domain}`;

    // 🧮 Calculation Logic with 1,000 formatting
    const calculateTransfer = (amountStr: string, ratioStr: string, bonusAmount: number = 0) => {
        const numericAmount = Number(amountStr.replace(/,/g, ''));
        if (isNaN(numericAmount)) return 0;
        const [from, to] = ratioStr.split(':').map(Number);
        const base = (numericAmount / from) * to;
        return Math.floor(base * (1 + (bonusAmount || 0) / 100));
    };

    return (
        <div className={`group relative overflow-hidden transition-all border ${
            isGridView ? "p-6 rounded-4xl" : "p-4 rounded-2xl mb-3"
        } bg-white dark:bg-[#0f172a] border-slate-200 dark:border-slate-800 hover:border-blue-300 shadow-sm`}>
            
            {/* Header Section */}
            <div className="flex items-center gap-4 w-full">
                <div className="w-12 h-12 rounded-2xl bg-white p-2 flex items-center justify-center shadow-md border border-slate-100">
                    <img 
                        src={airlineLogoUrl} 
                        // onError={() => setImgError(true)} 
                        className="w-full h-full object-contain" 
                        alt={airline.name} 
                    />
                </div>
                <div className="flex-1">
                    <a href={airline.url} target="_blank" className="cursor-pointer group/link">
                        <h3 className="font-bold text-lg text-slate-900 dark:text-white group-hover/link:text-blue-500 transition-colors">
                            {airline.name} <span className="text-xs text-blue-400">↗</span>
                        </h3>
                    </a>
                    <div className="flex items-center gap-2 mt-1">
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-md border bg-slate-100 dark:bg-slate-800">
                            {airline.iata}
                        </span>
                        <div className="flex items-center gap-1 text-[10px] text-emerald-600 dark:text-emerald-400 font-bold">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                            </span>
                            Instant Transfer
                        </div>
                    </div>
                </div>
            </div>

            {/* Partner Badges & Calculator */}
            <div className="mt-6 flex flex-wrap gap-2">
                {airline.partners?.map((p: any, i: number) => (
                    <div key={i} className="flex flex-col gap-2">
                        <button 
                            onClick={() => setCalcPartner(calcPartner === p.bank ? null : p.bank)}
                            className="cursor-pointer flex items-center gap-3 border rounded-2xl px-3 py-1.5 bg-slate-50 dark:bg-slate-900/40 border-slate-200 dark:border-slate-800 hover:border-blue-400 transition-all"
                        >
                            <span className="text-[11px] font-bold">{p.bank} {p.ratio}</span>
                            {p.bonusAmount && <span className="text-[10px] font-black text-emerald-500">+{p.bonusAmount}%</span>}
                        </button>

                        {calcPartner === p.bank && (
                            <div className="p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 rounded-xl animate-in zoom-in-95 duration-200">
                                <input 
                                    type="text" 
                                    value={pointsAmount} 
                                    onClick={(e) => e.stopPropagation()}
                                    onChange={(e) => {
                                        const raw = e.target.value.replace(/,/g, '');
                                        if (!isNaN(Number(raw))) setPointsAmount(Number(raw).toLocaleString());
                                    }}
                                    className="w-full bg-white dark:bg-slate-800 rounded-lg px-2 py-1 text-xs font-bold outline-none border border-slate-200" 
                                />
                                <div className="mt-2 text-[11px] font-black text-slate-900 dark:text-white">
                                    = {calculateTransfer(pointsAmount, p.ratio, p.bonusAmount).toLocaleString()} {airline.award}
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {/* Sweet Spots Section */}
            <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800/50">
                <button 
                    onClick={() => setShowSweetSpots(!showSweetSpots)}
                    className="cursor-pointer flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-blue-600 dark:text-blue-400 hover:opacity-75 transition-opacity"
                >
                    {showSweetSpots ? '−' : '+'} View Sweet Spots
                </button>

                {showSweetSpots && (
                    <div className="mt-3 space-y-2 animate-in slide-in-from-top-1 duration-200">
                        <div className="flex justify-between p-2 rounded-xl bg-slate-50 dark:bg-slate-900/40 border border-slate-100 dark:border-slate-800">
                            <span className="text-[11px] text-slate-500">Domestic Economy</span>
                            <span className="text-[11px] font-bold text-slate-900 dark:text-white">7,500 miles</span>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}