import { useState, useMemo } from 'react';
import { useCopy } from '../hooks/useCopy';

// Note: Ensure you are passing setView prop from App.tsx to this component
interface PointCalculatorProps {
  setView?: (view: 'home' | 'calculator' | 'cpp') => void;
}

export default function PointCalculator({ setView }: PointCalculatorProps) {
    const [pointsNeeded, setPointsNeeded] = useState<string>('');
    const [bonusPercent, setBonusPercent] = useState<number>(0);
    const [ratioFrom, setRatioFrom] = useState<number>(1);
    const [ratioTo, setRatioTo] = useState<number>(1);
    const { isCopied, shareResult } = useCopy();

    const result = useMemo(() => {
        const target = parseFloat(pointsNeeded.replace(/,/g, '')) || 0;
        const safeFrom = ratioFrom || 1;
        const safeTo = ratioTo || 1;

        if (target <= 0) return { pointsToTransfer: 0, totalPointsReceived: 0, surplus: 0, exactRequired: 0 };

        const effectiveRate = (safeTo / safeFrom) * (1 + bonusPercent / 100);
        const rawPointsRequired = target / effectiveRate;
        
        // THE EXACT MATH
        const exactRequired = Math.ceil(rawPointsRequired); 
        // THE ROUNDED MATH (for bank transfers)
        const pointsToTransfer = Math.ceil(rawPointsRequired / 1000) * 1000;
        
        const totalPointsReceived = Math.floor(pointsToTransfer * effectiveRate);
        const surplus = totalPointsReceived - target;

        return { pointsToTransfer, totalPointsReceived, surplus, exactRequired };
    }, [pointsNeeded, bonusPercent, ratioFrom, ratioTo]);

    const { pointsToTransfer, totalPointsReceived, surplus } = result;

    const handleCopy = () => {
        if (pointsToTransfer === 0) return;

        // Use the variables destructured from 'result' above
        const fTarget = (parseInt(pointsNeeded.replace(/,/g, '')) || 0).toLocaleString();
        const fTransfer = Math.floor(pointsToTransfer).toLocaleString();
        const fReceived = Math.floor(totalPointsReceived).toLocaleString();
        const fSurplus = Math.floor(surplus).toLocaleString();

        shareResult({
            title: 'Transfer Calculation',
            details: [
                `Target Points: ${fTarget}`,
                `Transfer Required: ${fTransfer} Points`,
                `Total You'll Receive: ${fReceived} Points`,
                `Surplus: ${fSurplus} Points`,
                `Ratio: ${ratioFrom}:${ratioTo}${bonusPercent > 0 ? ` (+${bonusPercent}% Bonus)` : ''}`
            ].join('\n')
        });
    };

    return (
    <div className="space-y-6 animate-in fade-in duration-500">
        
        {/* Live Bonus Recommendation Banner */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-400 p-[1px] rounded-2xl shadow-lg shadow-blue-500/10">
        <div className="bg-white dark:bg-slate-900 p-5 rounded-[15px] flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
            <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-xl">
                <span className="text-xl">💡</span>
            </div>
            <div>
                <h3 className="font-bold text-slate-900 dark:text-white">Check for Transfer Bonuses</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">Current promos can save you thousands of points.</p>
            </div>
            </div>
            {/* LOGO LOGIC: This now switches back to the 'home' (Airlines) view */}
            <button 
            onClick={() => setView?.('home')}
            className="w-full md:w-auto px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl transition-all cursor-pointer shadow-md shadow-blue-500/20 active:scale-95 whitespace-nowrap"
            >
            Check Live Bonuses
            </button>
        </div>
        </div>

        {/* Main Calculator Card */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            <div className="space-y-2">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Points Needed</label>
            <input 
                type="text"
                inputMode="numeric"
                value={pointsNeeded.replace(/\D/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                onChange={(e) => {
                // 1. Strip commas to get the raw number
                const rawValue = e.target.value.replace(/\D/g, '');
                const numValue = Number(rawValue);

                // 2. Limit to 10,000,000
                if (numValue <= 10000000) {
                    setPointsNeeded(rawValue);
                }
                }}
                placeholder="e.g. 65,000"
                className="w-full p-4 rounded-xl bg-slate-100 dark:bg-slate-800 border-none outline-none focus:ring-2 focus:ring-blue-500 dark:text-white font-mono text-lg"
            />
            </div>

            <div className="space-y-2">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Bonus %</label>
            <input 
                type="number"
                value={bonusPercent || ''}
                onChange={(e) => setBonusPercent(Number(e.target.value))}
                placeholder="0"
                className="w-full p-4 rounded-xl bg-slate-100 dark:bg-slate-800 border-none outline-none focus:ring-2 focus:ring-blue-500 dark:text-white font-mono text-lg"
            />
            </div>

            <div className="space-y-4 md:col-span-2">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Transfer Ratio (Bank : Airline)</label>
            
            <div className="flex flex-wrap gap-2 mb-4 mt-2">
                {[
                { label: 'Standard 1:1', from: 1, to: 1 },
                { label: 'Hilton 1:2', from: 1, to: 2 },
                { label: 'Marriott 3:1', from: 3, to: 1 },
                ].map((p) => (
                <button
                    key={p.label}
                    onClick={() => { setRatioFrom(p.from); setRatioTo(p.to); }}
                    className={`px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-tighter transition-all cursor-pointer border ${
                    ratioFrom === p.from && ratioTo === p.to
                        ? 'bg-blue-600 border-blue-600 text-white'
                        : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-500'
                    }`}
                >
                    {p.label}
                </button>
                ))}
            </div>

            <div className="flex items-center gap-4">
                <input 
                type="number" 
                value={ratioFrom} 
                onChange={(e) => setRatioFrom(Number(e.target.value))}
                className="w-full p-3 rounded-xl bg-slate-100 dark:bg-slate-800 text-center font-bold dark:text-white border-none"
                />
                <span className="text-xl font-bold text-slate-300">:</span>
                <input 
                type="number" 
                value={ratioTo} 
                onChange={(e) => setRatioTo(Number(e.target.value))}
                className="w-full p-3 rounded-xl bg-slate-100 dark:bg-slate-800 text-center font-bold dark:text-white border-none"
                />
            </div>
            </div>
        </div>
        </div>

        {/* Results Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-blue-600 p-6 rounded-2xl text-white shadow-lg shadow-blue-500/20 relative group overflow-hidden">
            <button 
                onClick={handleCopy}
                className="absolute top-4 right-4 p-2 rounded-lg bg-black/5 dark:bg-white/5 hover:bg-black/20 dark:hover:bg-white/20 transition-all cursor-pointer z-10"
                title="Copy Result"
            >
                {isCopied ? (
                    <span className="text-[10px] font-black uppercase tracking-tighter text-emerald-400 animate-in fade-in zoom-in duration-300">
                    Copied!
                    </span>
                ) : (
                    <svg 
                    className="w-5 h-5 opacity-40 group-hover:opacity-100 transition-opacity" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor" 
                    >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2" />
                    </svg>
                )}
            </button>

            {/* 2. Added pointer-events-none so labels don't block the click */}
            <div className="pointer-events-none">
                <p className="text-[10px] uppercase font-black opacity-80 mb-1 tracking-widest">
                Transfer Amount
                </p>
                <p className="text-5xl font-black italic tracking-tighter">
                {result.pointsToTransfer.toLocaleString()}
                </p>
                {/* NEW ALERT LOGIC */}
                {pointsToTransfer !== result.exactRequired && pointsToTransfer > 0 && (
                    <div className="mt-3 inline-flex items-center gap-2 px-2 py-1 bg-yellow-400/20 border border-yellow-400/30 rounded-lg animate-in slide-in-from-top-1 duration-300">
                        <span className="text-[10px]">⚠️</span>
                        <p className="text-[10px] font-bold text-yellow-200">
                            Exact needed: {result.exactRequired.toLocaleString()}
                        </p>
                    </div>
                )}
                <p className="text-[10px] mt-2 opacity-70 italic font-medium">
                Rounded to nearest 1,000
                </p>
            </div>
            </div>

        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <p className="text-[10px] uppercase font-black text-slate-400 mb-1 tracking-widest">Total Received</p>
            <p className="text-3xl font-black text-slate-900 dark:text-white">{result.totalPointsReceived.toLocaleString()}</p>
        </div>

        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <p className="text-[10px] uppercase font-black text-slate-400 mb-1 tracking-widest">Surplus</p>
            <p className="text-3xl font-black text-green-500">+{result.surplus.toLocaleString()}</p>
        </div>
        </div>

        <button 
        onClick={() => { setPointsNeeded(''); setBonusPercent(0); setRatioFrom(1); setRatioTo(1); }}
        className="w-full p-4 rounded-xl bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold cursor-pointer hover:bg-slate-300 dark:hover:bg-slate-700 transition-colors active:scale-[0.99]"
        >
        Reset Calculator
        </button>
    </div>
    );
}