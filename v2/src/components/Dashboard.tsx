import { useAirlines } from '../hooks/useAirlines';

export default function Dashboard() {
  const { 
    filteredData, banks, activeBanks, 
    toggleBank, getPartnerCount,
    totalAirlines, featuredCount,
    allianceCount, bonusCount
  } = useAirlines();

  return (
    <div className="space-y-6 p-4">
      {/* Header Section */}
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-black text-slate-900 dark:text-white uppercase tracking-tighter leading-none">
            Sky_Index Dashboard
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm mt-2 font-medium">
            Real-time analytics for your transfer partners.
          </p>
        </div>
        <button className="cursor-pointer px-5 py-2.5 bg-sky-600 text-white rounded-xl text-xs font-black uppercase tracking-widest hover:bg-sky-700 transition-all active:scale-95 shadow-lg shadow-sky-500/20">
          Sync Data
        </button>
      </div>

      {/* Main Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm">
          <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.2em]">Total Partners</p>
          <p className="text-4xl font-black text-sky-600 mt-2">{totalAirlines}</p>
        </div>

        <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm">
          <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.2em]">Featured</p>
          <p className="text-4xl font-black text-emerald-600 mt-2">{featuredCount}</p>
        </div>

        <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm">
          <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.2em]">Alliances</p>
          <p className="text-4xl font-black text-violet-600 mt-2">{allianceCount}</p>
        </div>

        <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm">
          <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.2em]">Active Bonuses</p>
          <p className="text-4xl font-black text-amber-500 mt-2">{bonusCount}</p>
        </div>
      </div>

      {/* Banking Ecosystem Section */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm">
        <div className="p-5 border-b border-slate-50 dark:border-slate-800 flex items-center justify-between">
          <h3 className="text-xs font-black uppercase tracking-widest dark:text-white">Banking Ecosystem</h3>
          <span className="text-[10px] font-bold text-slate-400 uppercase">{banks.length} Networks</span>
        </div>
        <div className="p-6">
          <div className="flex flex-wrap gap-4">
            {banks.map((bank) => {
              const count = getPartnerCount?.(bank.id);
              const isActive = activeBanks?.includes(bank.id);

              return (
                <button 
                  key={bank.id} 
                  onClick={() => toggleBank(bank.id)}
                  className={`cursor-pointer flex items-center gap-3 px-4 py-2 rounded-2xl border transition-all active:scale-95 group ${
                    isActive 
                      ? `${bank.bg} border-transparent shadow-md` 
                      : 'bg-slate-50 dark:bg-slate-800/30 border-slate-100 dark:border-slate-800 hover:border-sky-500'
                  }`}
                >
                  <div className={`w-2.5 h-2.5 rounded-full shadow-sm group-hover:scale-125 transition-transform ${
                    isActive ? 'bg-white' : bank.bg
                  }`} />
                  <div className="flex flex-col text-left">
                    <span className={`text-xs font-bold uppercase tracking-tight ${
                      isActive ? 'text-white' : 'text-slate-700 dark:text-slate-200'
                    }`}>
                      {bank.name}
                    </span>
                    <span className={`text-[9px] font-medium ${
                      isActive ? 'text-white/80' : 'text-slate-400'
                    }`}>
                      {count} Partners
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Alliance Distribution Section */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 overflow-hidden shadow-sm">
        <div className="p-5 border-b border-slate-50 dark:border-slate-800 flex items-center justify-between">
          <h3 className="text-xs font-black uppercase tracking-widest dark:text-white">Alliance Distribution</h3>
          <span className="text-[10px] font-bold text-slate-400 uppercase">Airlines per Network</span>
        </div>
        <div className="p-6">
          <div className="flex flex-wrap gap-3">
            {Array.from(new Set(filteredData.map(a => a.alliance))).map(alliance => (
              <div key={alliance} className="px-4 py-2 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-800">
                <p className="text-[10px] font-bold text-slate-400 uppercase leading-none">{alliance}</p>
                <p className="text-lg font-black dark:text-white mt-1">
                  {filteredData.filter(a => a.alliance === alliance).length} <span className="text-[10px] text-slate-500 font-medium">Airlines</span>
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}