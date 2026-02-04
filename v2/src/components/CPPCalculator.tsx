import { useState, useMemo } from 'react';

interface CPPCalculatorProps {
  setView?: (view: 'home' | 'calculator' | 'cpp') => void;
}

export default function CPPCalculator({ setView }: CPPCalculatorProps) {
  const [cashPrice, setCashPrice] = useState('');
  const [pointsCost, setPointsCost] = useState('');

  const result = useMemo(() => {
    // Strip commas to perform math
    const cash = parseFloat(cashPrice.replace(/,/g, '')) || 0;
    const points = parseFloat(pointsCost.replace(/,/g, '')) || 0;
    
    if (cash <= 0 || points <= 0) return { cpp: 0, isGoodValue: false };
    
    // Standard CPP Formula: (Cash Price / Points) * 100
    const cppValue = (cash / points) * 100;
    return {
      cpp: cppValue,
      isGoodValue: cppValue >= 2.0 // Benchmark: 2 cents per point is usually "Great"
    };
  }, [cashPrice, pointsCost]);

  // Handle 100 Billion Limit and Comma Formatting
  const handleInputChange = (val: string, setter: (v: string) => void) => {
    const raw = val.replace(/\D/g, '');
    if (raw === '' || Number(raw) <= 100000000000) {
      setter(raw);
    }
  };

  const formatDisplay = (val: string) => {
    return val.replace(/\D/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  return (
    <div className="max-w-2xl mx-auto p-4 md:p-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Header Section */}
      <div className="text-center mb-8 space-y-2">
        <h2 className="text-3xl font-black tracking-tighter uppercase dark:text-white">
          Value Calculator
        </h2>
        <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">
          Cents Per Point (CPP)
        </p>
      </div>

      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 md:p-8 shadow-2xl space-y-6">
        
        {/* Cash Price Input */}
        <div className="space-y-2">
          <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">
            Cash Price (USD)
          </label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-mono">$</span>
            <input 
              type="text"
              inputMode="numeric"
              value={formatDisplay(cashPrice)}
              onChange={(e) => handleInputChange(e.target.value, setCashPrice)}
              className="w-full pl-8 pr-4 py-4 rounded-xl bg-slate-100 dark:bg-slate-800 border-none outline-none focus:ring-2 focus:ring-emerald-500 dark:text-white font-mono text-lg transition-all cursor-pointer"
              placeholder="0"
            />
          </div>
        </div>

        {/* Points Required Input */}
        <div className="space-y-2">
          <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">
            Points Required
          </label>
          <input 
            type="text"
            inputMode="numeric"
            value={formatDisplay(pointsCost)}
            onChange={(e) => handleInputChange(e.target.value, setPointsCost)}
            className="w-full p-4 rounded-xl bg-slate-100 dark:bg-slate-800 border-none outline-none focus:ring-2 focus:ring-emerald-500 dark:text-white font-mono text-lg transition-all cursor-pointer"
            placeholder="0"
          />
        </div>

        {/* Dynamic Result Card */}
        <div className={`p-8 rounded-2xl transition-all duration-500 text-center border-2 ${
          result.isGoodValue 
            ? 'bg-emerald-600 border-emerald-500 text-white shadow-xl shadow-emerald-500/20' 
            : 'bg-slate-50 dark:bg-slate-800/50 border-slate-100 dark:border-slate-800 text-slate-900 dark:text-white'
        }`}>
          <div className={`text-[10px] font-black uppercase tracking-widest mb-2 ${
            result.isGoodValue ? 'text-emerald-100' : 'text-slate-400'
          }`}>
            Your Redemption Value
          </div>
          
          <div className="text-6xl font-black tracking-tighter flex items-center justify-center gap-1">
            {result.cpp.toFixed(2)}
            <span className="text-2xl opacity-70">¢</span>
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
            onClick={() => setView?.('home')}
            className="w-full py-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 font-bold text-sm uppercase tracking-tighter hover:bg-slate-50 dark:hover:bg-slate-800 transition-all cursor-pointer"
          >
            Back to Airlines
          </button>
        </div>
      </div>

      {/* Benchmark Info */}
      <div className="mt-8 grid grid-cols-2 gap-4">
        <div className="p-4 rounded-xl bg-blue-50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-900/30">
          <p className="text-[10px] font-black text-blue-600 dark:text-blue-400 uppercase">Average Value</p>
          <p className="text-lg font-black dark:text-white">1.2¢ - 1.5¢</p>
        </div>
        <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-900/10 border border-emerald-100 dark:border-emerald-900/30">
          <p className="text-[10px] font-black text-emerald-600 dark:text-emerald-400 uppercase">Target Value</p>
          <p className="text-lg font-black dark:text-white">2.0¢ +</p>
        </div>
      </div>
    </div>
  );
}