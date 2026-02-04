import { useState, useMemo } from 'react';
import { useCopy } from '../hooks/useCopy';
import type { Airline, Bank } from '../types';
import { AIRLINES } from '../data/partners';
import { BANKS } from '../data/banks';
import { BankLogo } from './BankLogo';

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
    const [mode, setMode] = useState<'need' | 'have'>('need');
    const [activeBankId, setActiveBankId] = useState<string | null>(null);

    const COMPARISON_PARTNERS = [
        { name: 'ANA / Virgin', ratio: 1, bonus: 0, icon: '✈️' },
        { name: 'Hilton Honors', ratio: 2, bonus: 0, icon: '🏨' },
        { name: 'EVA Air', ratio: 1, bonus: 0, icon: '🛩️' },
    ];

    const result = useMemo(() => {
        const inputAmount = parseFloat(pointsNeeded.replace(/,/g, '')) || 0;
        const safeFrom = ratioFrom || 1;
        const safeTo = ratioTo || 1;

        if (inputAmount <= 0) return { pointsToTransfer: 0, totalPointsReceived: 0, surplus: 0, exactRequired: 0 };

        const effectiveRate = (safeTo / safeFrom) * (1 + bonusPercent / 100);

        if (mode === 'have') {
            // REVERSE MODE: You start with Bank Points
            const totalPointsReceived = Math.floor(inputAmount * effectiveRate);
            return { 
                pointsToTransfer: inputAmount, 
                totalPointsReceived, 
                surplus: 0, 
                exactRequired: inputAmount 
            };
        } else {
            // STANDARD MODE: You start with a Points Goal
            const rawPointsRequired = inputAmount / effectiveRate;
            const exactRequired = Math.ceil(rawPointsRequired);
            const pointsToTransfer = Math.ceil(rawPointsRequired / 1000) * 1000;
            const totalPointsReceived = Math.floor(pointsToTransfer * effectiveRate);
            const surplus = totalPointsReceived - inputAmount;

            return { pointsToTransfer, totalPointsReceived, surplus, exactRequired };
        }
    }, [pointsNeeded, bonusPercent, ratioFrom, ratioTo, mode]);

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

    const cleanNumber = (value: string): number => {
        const sanitized = value.replace(/\D/g, '');
        return sanitized === '' ? 0 : Number(sanitized);
    };

    const generatePresetsFromData = (airlines: Airline[], banks: Bank[]) => {
        return banks.map(bank => {
            // 1. Find the first occurrence of this bank in your airline data to get its ratio
            let ratioString = "1:1"; // Default
            
            for (const airline of airlines) {
                const partner = airline.partners?.find(p => p.bank === bank.id);
                if (partner) {
                    ratioString = partner.ratio;
                    if (ratioString === "1:1") break; // Prioritize standard ratios
                }
            }

            const [from, to] = ratioString.split(':').map(Number);

            return {
                ...bank,
                label: bank.id === 'capitalone' ? 'Cap1' : bank.name.split(' ')[0],
                from: from || 1,
                to: to || 1
            };
        }).filter(b => b.id !== 'rove' && b.id !== 'avios'); // Optional: hide specific ones
    };

    const presets = useMemo(() => 
        generatePresetsFromData(AIRLINES, BANKS),[]
    );

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

            {/* Points need/have toggle UI */}
            <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-xl mb-6">
                <button 
                    onClick={() => { setMode('need'); setPointsNeeded(''); }}
                    className={`flex-1 py-2 text-xs font-black uppercase tracking-widest rounded-lg transition-all cursor-pointer ${mode === 'need' ? 'bg-white dark:bg-slate-700 shadow-sm text-blue-600' : 'text-slate-500'}`}
                >
                    I Need Points
                </button>
                <button 
                    onClick={() => { setMode('have'); setPointsNeeded(''); }}
                    className={`flex-1 py-2 text-xs font-black uppercase tracking-widest rounded-lg transition-all cursor-pointer ${mode === 'have' ? 'bg-white dark:bg-slate-700 shadow-sm text-blue-600' : 'text-slate-500'}`}
                >
                    I Have Points
                </button>
            </div>

            {/* Main Calculator Card */}
            <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                        {mode === 'need' ? 'Points Needed' : 'Points I Have'}
                    </label>
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
                {/*Bank buttons ratio */}
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-7 gap-2">
                    {presets.map((bank) => {
                        // Now we check the ID, which is unique to Chase, Amex, etc.
                        const isActive = activeBankId === bank.id;

                        return (
                            <button
                                key={bank.id}
                                onClick={() => {
                                    if (activeBankId === bank.id) {
                                        // If already selected, UNSELECT
                                        setActiveBankId(null);
                                        setRatioFrom(1);
                                        setRatioTo(1);
                                    } else {
                                        // Otherwise, SELECT
                                        setActiveBankId(bank.id);
                                        setRatioFrom(bank.from);
                                        setRatioTo(bank.to);
                                    }
                                }}
                                // cursor-pointer added per instructions [cite: 2026-02-04]
                                className={`
                                    flex flex-col items-center justify-center p-2 rounded-xl transition-all cursor-pointer border-2 min-h-[40px]
                                    ${isActive 
                                        ? `${bank.bg} ${bank.text} border-white shadow-md scale-105` 
                                        : 'bg-slate-100 dark:bg-slate-800 border-transparent text-slate-500 hover:border-slate-300'
                                    }
                                `}
                            >
                                <span className="text-[7px] font-black uppercase mb-1">{bank.label}</span>
                                
                                <div className="bg-white p-1 rounded-md mb-1">
                                    <BankLogo bank={bank} className="w-5 h-5 object-contain" />
                                </div>

                                <span className="text-[10px] font-bold">
                                    {bank.from}:{bank.to}
                                </span>
                            </button>
                        );
                    })}
                </div>

                <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Bonus %</label>
                    <input 
                    type="text"
                    inputMode="numeric"
                    value={bonusPercent || ''}
                    onChange={(e) => {
                        setBonusPercent(cleanNumber(e.target.value));
                        setActiveBankId(null);
                    }}
                    placeholder="0"
                    className="w-full p-4 rounded-xl bg-slate-100 dark:bg-slate-800 border-none outline-none focus:ring-2 focus:ring-blue-500 dark:text-white font-mono text-lg"
                    />
                </div>

                <div className="space-y-4 md:col-span-2">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Ratio</label>
                    <div className="flex items-center gap-4">
                    {/* Ratio From */}
                    <input 
                        type="text" 
                        inputMode="numeric" 
                        value={ratioFrom || ''} 
                        onChange={(e) => {
                            setRatioFrom(cleanNumber(e.target.value));
                            setActiveBankId(null);
                        }}
                        className="w-full p-3 rounded-xl bg-slate-100 dark:bg-slate-800 text-center font-bold dark:text-white border-none outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="1"
                    />

                    <span className="text-xl font-bold text-slate-300">:</span>

                    {/* Ratio To */}
                    <input 
                        type="text" 
                        inputMode="numeric" 
                        value={ratioTo || ''} 
                        onChange={(e) => {
                            setRatioTo(cleanNumber(e.target.value));
                            setActiveBankId(null);
                        }}
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

            {/* Comparison List Section */}
            {parseFloat(pointsNeeded) > 0 && (
            <div className="mt-8 space-y-4 animate-in slide-in-from-bottom-4 duration-500">
                <h4 className="text-xs font-black uppercase text-slate-400 tracking-widest px-1">
                Value at Other Partners
                </h4>
                
                <div className="grid grid-cols-1 gap-3">
                {COMPARISON_PARTNERS.map((partner) => {
                    // Calculate what the current input would yield for this specific partner
                    const inputAmount = parseFloat(pointsNeeded.replace(/,/g, '')) || 0;
                    const potentialMiles = Math.floor(inputAmount * partner.ratio);

                    return (
                    <div 
                        key={partner.name}
                        className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-800 transition-all hover:border-blue-200 dark:hover:border-blue-900 group"
                    >
                        <div className="flex items-center gap-3">
                        <span className="text-lg">{partner.icon}</span>
                        <span className="font-bold text-slate-700 dark:text-slate-200">{partner.name}</span>
                        <span className="text-[10px] font-medium text-slate-400">({partner.ratio === 2 ? '1:2' : partner.ratio < 1 ? '3:1' : '1:1'})</span>
                        </div>
                        
                        <div className="text-right">
                        <span className="font-mono font-black text-blue-600 dark:text-blue-400">
                            {potentialMiles.toLocaleString()}
                        </span>
                        <span className="text-[10px] ml-1 font-bold text-slate-400 uppercase">Miles</span>
                        </div>
                    </div>
                    );
                })}
                </div>
                
                <p className="text-[10px] text-center text-slate-400 italic">
                Calculated based on your "{mode === 'need' ? 'Points Needed' : 'Points I Have'}" input
                </p>
            </div>
            )}
        </div>
    );
}