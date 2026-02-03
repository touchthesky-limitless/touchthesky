import type { Bank } from '../types';
import { ALLIANCE_NAMES } from '../config';
import { ALLIANCE_LOGOS } from '../config';

interface Props {
  banks: Bank[];
  activeBanks: string[];
  setActiveBanks: React.Dispatch<React.SetStateAction<string[]>>;
  activeAlliances: string[];
  setActiveAlliances: React.Dispatch<React.SetStateAction<string[]>>;
  showOnlyBonuses: boolean;
  setShowOnlyBonuses: (val: boolean) => void;
}

export default function SearchFilters({
  banks, activeBanks, setActiveBanks,
  activeAlliances, setActiveAlliances,
  showOnlyBonuses, setShowOnlyBonuses
}: Props) {
  
    const toggleBank = (id: string) => {
    setActiveBanks(prev => prev.includes(id) ? prev.filter(b => b !== id) : [...prev, id]);
    };

    const toggleAlliance = (name: string) => {
    setActiveAlliances(prev => prev.includes(name) ? prev.filter(a => a !== name) : [...prev, name]);
    };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-top-4 duration-700">
      {/* Bank Icons */}
      <div className="flex flex-wrap gap-3 justify-center">
        {banks.map(bank => {
          const isActive = activeBanks.includes(bank.id);
          return (
            <button
              key={bank.id}
              onClick={() => toggleBank(bank.id)}
              className={`cursor-pointer disabled:cursor-not-allowed group relative p-2 rounded-2xl transition-all duration-300 ${
                isActive 
                  ? 'bg-blue-600 shadow-xl shadow-blue-500/40 scale-110' 
                  : 'bg-white dark:bg-slate-900 shadow-sm border border-slate-100 dark:border-slate-800'
              }`}
            >
              <div className={`w-8 h-8 flex items-center justify-center transition-all ${
                isActive ? 'bg-white rounded-full p-1' : '' // This prevents the blue from touching the logo
              }`}>
                <img 
                  src={bank.logoOverride || `https://www.google.com/s2/favicons?sz=128&domain=${bank.domain}`}
                  className="w-full h-full object-contain"
                  alt={bank.name}
                />
              </div>
            </button>
          );
        })}
      </div>

      {/* Alliance Pills */}
      <div className="flex flex-wrap gap-1.5 justify-center">
        {ALLIANCE_NAMES.map(name => {
          const isActive = activeAlliances.includes(name);
          
          const emojiMap: Record<string, string> = {
            'Hotels': '🏨',
            'No Alliance': '✨',
          };

          return (
            <button
              key={name}
              onClick={() => toggleAlliance(name)}
              className={`cursor-pointer disabled:cursor-not-allowed disabled:opacity-50 
                flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-full 
                text-[10px] font-black uppercase tracking-wider transition-all border ${
                isActive
                  ? 'bg-slate-900 dark:bg-white text-white dark:text-black border-slate-900 dark:border-white shadow-md'
                  : 'bg-white dark:bg-slate-900 text-slate-500 dark:text-slate-400 border-slate-200 dark:border-slate-800 hover:border-slate-300'
              }`}
            >
              {ALLIANCE_LOGOS?.[name] ? (
                <img 
                  src={ALLIANCE_LOGOS[name]} 
                  className={`w-3.5 h-3.5 object-contain flex-shrink-0 transition-all ${
                    isActive 
                      ? 'brightness-0 invert' // This turns logos white for the dark background
                      : 'hover:grayscale-0 hover:opacity-100'
                  } ${isActive && name === 'Star Alliance' ? 'invert-0 brightness-100' : '' /* Special case if logo is already white */}`} 
                  alt="" 
                />
              ) : (
                <span className="text-xs leading-none flex-shrink-0">
                  {emojiMap[name] || '✨'}
                </span>
              )}
              
              <span className="leading-none">{name}</span>
            </button>
          );
        })}
      </div>

      {/* Bonus Toggle */}
      <div className="flex justify-center">
        <button 
          onClick={() => setShowOnlyBonuses(!showOnlyBonuses)}
          className={`cursor-pointer disabled:cursor-not-allowed dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-50disabled:opacity-50 flex items-center gap-2 px-6 py-3 rounded-2xl font-bold transition-all ${
            showOnlyBonuses 
              ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/30' 
              : 'bg-slate-100 dark:bg-slate-900 text-slate-500'
          }`}
        >
          <span>🔥</span> Show Transfer Bonuses
        </button>
      </div>
    </div>
  );
}