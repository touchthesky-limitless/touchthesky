interface FilterPillsProps {
  search: string;
  activeBanks: string[];
  activeAlliances: string[];
  onRemoveBank: (id: string) => void;
  onRemoveAlliance: (id: string) => void;
  onClearSearch: () => void;
  onClearAll: () => void;
}

export default function FilterPills({
  search,
  activeBanks,
  activeAlliances,
  onRemoveBank,
  onRemoveAlliance,
  onClearSearch,
  onClearAll
}: FilterPillsProps) {
  
  const hasFilters = search || activeBanks.length > 0 || activeAlliances.length > 0;
  if (!hasFilters) return null;

  // The specific base class you liked
  const base = "px-3 py-1.5 rounded-lg text-[8px] font-black uppercase tracking-tighter transition-all cursor-pointer border flex items-center gap-1.5 shadow-sm";
  
  // Style mapping for different categories
  const styles = {
    bank: `${base} bg-blue-600 border-blue-700 text-white shadow-blue-500/20`,
    alliance: `${base} bg-emerald-600 border-emerald-700 text-white shadow-emerald-500/20`,
    search: `${base} bg-slate-600 border-slate-700 text-white shadow-slate-500/20`,
    clear: `${base} bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-500 hover:border-red-500 hover:text-red-500`
  };

  return (
    <div className="flex flex-wrap gap-2 mb-4 animate-in fade-in slide-in-from-left-2 duration-300">
      
      {/* Search Pill - Slate */}
      {search && (
        <button onClick={onClearSearch} className={styles.search}>
          <span className="opacity-70">Search:</span>{search} ✕
        </button>
      )}

      {/* Bank Pills - Blue */}
      {activeBanks.map(bankId => (
        <button key={bankId} onClick={() => onRemoveBank(bankId)} className={styles.bank}>
          <span className="opacity-70"></span>{bankId} ✕
        </button>
      ))}

      {/* Alliance Pills - Emerald */}
      {activeAlliances.map(alliance => (
        <button key={alliance} onClick={() => onRemoveAlliance(alliance)} className={styles.alliance}>
          <span className="opacity-70"></span>{alliance} ✕
        </button>
      ))}

      {/* Clear All Button */}
      <button onClick={onClearAll} className={styles.clear}>
        Clear All
      </button>
    </div>
  );
}