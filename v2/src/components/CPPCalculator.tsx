import { useState, useMemo } from 'react';
import { useCopy } from '../hooks/useCopy';
import { formatNumber, formatCPP } from '../utils/format';

interface CPPCalculatorProps {
  setView?: (view: 'home' | 'calculator' | 'cpp') => void;
}

export default function CPPCalculator({ setView }: CPPCalculatorProps) {
  const [cashPrice, setCashPrice] = useState('');
  const [pointsCost, setPointsCost] = useState('');

  const { isCopied, shareResult } = useCopy();

  const result = useMemo(() => {
    const cash = parseFloat(cashPrice.replace(/,/g, '')) || 0;
    const points = parseFloat(pointsCost.replace(/,/g, '')) || 0;
    
    if (cash <= 0 || points <= 0) return { cpp: 0, isGoodValue: false };
    
    const cppValue = (cash / points) * 100;
    return {
      cpp: cppValue,
      isGoodValue: cppValue >= 2.0
    };
  }, [cashPrice, pointsCost]);

  const handleInputChange = (val: string, setter: (v: string) => void) => {
    const raw = val.replace(/\D/g, '');
    if (raw === '' || Number(raw) <= 100000000000) {
      setter(raw);
    }
  };

   const handleCopy = () => {
        if (result.cpp === 0) return;

        shareResult({
            title: 'Redemption Value',
            details: `Value: ¢${formatCPP(result.cpp)} per point\nCash: $${formatNumber(cashPrice)}\nPoints: ${formatNumber(pointsCost)}`
        });
    };

  return (
    <div className="max-w-2xl mx-auto p-4 md:p-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="text-center mb-8 space-y-2">
        <h2 className="text-3xl font-black tracking-tighter uppercase dark:text-white">
          Value Calculator
        </h2>
        <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">
          Cents Per Point (CPP)
        </p>
      </div>

      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 md:p-8 shadow-2xl space-y-6">
        
        <div className="space-y-2">
          <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">
            Cash Price (USD)
          </label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-mono">$</span>
            <input 
              type="text"
              inputMode="numeric"
              value={formatNumber(cashPrice)}
              onChange={(e) => handleInputChange(e.target.value, setCashPrice)}
              className="w-full pl-8 pr-4 py-4 rounded-xl bg-slate-100 dark:bg-slate-800 border-none outline-none focus:ring-2 focus:ring-emerald-500 dark:text-white font-mono text-lg transition-all cursor-pointer"
              placeholder="0"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">
            Points Required
          </label>
          <input 
            type="text"
            inputMode="numeric"
            value={formatNumber(pointsCost)}
            onChange={(e) => handleInputChange(e.target.value, setPointsCost)}
            className="w-full p-4 rounded-xl bg-slate-100 dark:bg-slate-800 border-none outline-none focus:ring-2 focus:ring-emerald-500 dark:text-white font-mono text-lg transition-all cursor-pointer"
            placeholder="0"
          />
        </div>

        {/* Dynamic Result Card with Copy Button */}
        <div className={`p-8 rounded-2xl transition-all duration-500 text-center border-2 relative group ${
          result.isGoodValue 
            ? 'bg-emerald-600 border-emerald-500 text-white shadow-xl shadow-emerald-500/20' 
            : 'bg-slate-50 dark:bg-slate-800/50 border-slate-100 dark:border-slate-800 text-slate-900 dark:text-white'
        }`}>
          {/* Copy Icon Button */}
          <button 
            onClick={handleCopy}
            className="absolute top-4 right-4 p-2 rounded-lg bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 transition-all cursor-pointer"
            title="Copy Result"
          >
            {isCopied ? (
                <span className="text-[10px] font-black uppercase tracking-tighter text-emerald-500 dark:text-emerald-400 animate-in fade-in zoom-in duration-300">
                Copied!
                </span>
            ) : (
                <svg 
                className="w-5 h-5 opacity-40 group-hover:opacity-100 transition-opacity" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor" 
                xmlns="http://www.w3.org/2000/svg"
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

          <div className={`text-[10px] font-black uppercase tracking-widest mb-2 ${
            result.isGoodValue ? 'text-emerald-100' : 'text-slate-400'
          }`}>
            Your Redemption Value
          </div>
          
          <div className="text-6xl font-black tracking-tighter flex items-center justify-center gap-1">
            <span className="text-2xl opacity-70">¢</span>
            {formatNumber(Math.floor(result.cpp).toString())}
            <span className="text-4xl">.{(result.cpp % 1).toFixed(2).split('.')[1]}</span>
            <span className="text-2xl opacity-70 ml-1">¢</span>
            </div>
                {result.isGoodValue && (
                    <div className="mt-4 inline-block bg-white/20 px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter animate-bounce">
                    🔥 High Value Deal
                    </div>
                )}
        </div>

        {/* Navigation / Actions */}
        <div className="pt-4 flex flex-col gap-3">
          <button 
            onClick={() => setView?.('calculator')}
            className="w-full py-4 rounded-xl bg-blue-600 text-white font-bold text-sm uppercase tracking-tighter hover:bg-blue-700 shadow-lg shadow-blue-500/20 transition-all cursor-pointer"
          >
            Switch to Transfer Calculator
          </button>
          <button 
            onClick={() => setView?.('home')}
            className="w-full py-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 font-bold text-sm uppercase tracking-tighter hover:bg-slate-50 dark:hover:bg-slate-800 transition-all cursor-pointer"
          >
            Back to Airlines
          </button>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-2 gap-4">
        <div className="p-4 rounded-xl bg-blue-50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-900/30">
          <p className="text-[10px] font-black text-blue-600 dark:text-blue-400 uppercase">Average Value</p>
          <p className="text-lg font-black dark:text-white">¢1.2 - ¢1.5</p>
        </div>
        <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-900/10 border border-emerald-100 dark:border-emerald-900/30">
          <p className="text-[10px] font-black text-emerald-600 dark:text-emerald-400 uppercase">Target Value</p>
          <p className="text-lg font-black dark:text-white">¢2.0 +</p>
        </div>
      </div>
    </div>
  );
}