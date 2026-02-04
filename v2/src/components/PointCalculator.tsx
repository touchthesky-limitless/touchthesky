import { useState, useMemo } from 'react';

// Note: Ensure you are passing setView prop from App.tsx to this component
interface PointCalculatorProps {
  setView?: (view: 'home' | 'calculator' | 'cpp') => void;
}

export default function PointCalculator({ setView }: PointCalculatorProps) {
  const [milesNeeded, setMilesNeeded] = useState<string>('');
  const [bonusPercent, setBonusPercent] = useState<number>(0);
  const [ratioFrom, setRatioFrom] = useState<number>(1);
  const [ratioTo, setRatioTo] = useState<number>(1);

const result = useMemo(() => {
  // 1. Clean the input string
  const target = parseFloat(milesNeeded.replace(/,/g, '')) || 0;
  
  // 2. Fallback to 1 if ratio inputs are 0 or empty to prevent NaN
  const safeFrom = ratioFrom || 1;
  const safeTo = ratioTo || 1;

  if (target <= 0) return { pointsToTransfer: 0, totalMilesReceived: 0, surplus: 0 };

  // 3. Use the safe values for the math
  const effectiveRate = (safeTo / safeFrom) * (1 + bonusPercent / 100);
  const rawPointsRequired = target / effectiveRate;
  
  const pointsToTransfer = Math.ceil(rawPointsRequired / 1000) * 1000;
  const totalMilesReceived = Math.floor(pointsToTransfer * effectiveRate);
  const surplus = totalMilesReceived - target;

  return { pointsToTransfer, totalMilesReceived, surplus };
}, [milesNeeded, bonusPercent, ratioFrom, ratioTo]);

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
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Miles Needed</label>
            <input 
              type="text"
              inputMode="numeric"
              value={milesNeeded.replace(/\D/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              onChange={(e) => {
                // 1. Strip commas to get the raw number
                const rawValue = e.target.value.replace(/\D/g, '');
                const numValue = Number(rawValue);

                // 2. Limit to 100,000,000,000
                if (numValue <= 100000000000) {
                    setMilesNeeded(rawValue);
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
        <div className="bg-blue-600 p-6 rounded-2xl text-white shadow-lg shadow-blue-500/20">
          <p className="text-[10px] uppercase font-black opacity-80 mb-1 tracking-widest">Transfer Amount</p>
          <p className="text-3xl font-black italic">{result.pointsToTransfer.toLocaleString()}</p>
          <p className="text-[10px] mt-1 opacity-70 italic">Rounded to 1,000s</p>
        </div>

        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <p className="text-[10px] uppercase font-black text-slate-400 mb-1 tracking-widest">Total Received</p>
          <p className="text-3xl font-black text-slate-900 dark:text-white">{result.totalMilesReceived.toLocaleString()}</p>
        </div>

        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <p className="text-[10px] uppercase font-black text-slate-400 mb-1 tracking-widest">Surplus</p>
          <p className="text-3xl font-black text-green-500">+{result.surplus.toLocaleString()}</p>
        </div>
      </div>

      <button 
        onClick={() => { setMilesNeeded(''); setBonusPercent(0); setRatioFrom(1); setRatioTo(1); }}
        className="w-full p-4 rounded-xl bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold cursor-pointer hover:bg-slate-300 dark:hover:bg-slate-700 transition-colors active:scale-[0.99]"
      >
        Reset Calculator
      </button>
    </div>
  );
}