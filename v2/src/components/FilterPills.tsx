interface FilterPillsProps {
  activeBanks: string[];
  activeAlliances: string[];
  search: string;
  onRemoveBank: (bank: string) => void;
  onRemoveAlliance: (alliance: string) => void;
  onClearSearch: () => void;
  onClearAll: () => void;
}

export default function FilterPills({
  activeBanks,
  activeAlliances,
  search,
  onRemoveBank,
  onRemoveAlliance,
  onClearSearch,
  onClearAll
}: FilterPillsProps) {
  const hasFilters = activeBanks.length > 0 || activeAlliances.length > 0 || search;

  if (!hasFilters) return null;

  return (
    <div className="flex flex-wrap items-center gap-2 mb-6 mt-6 animate-in fade-in slide-in-from-top-2 duration-300">
      <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mr-1">Filters:</span>
      
      {/* Search Pill */}
      {search && (
        <Pill label={`"${search}"`} onRemove={onClearSearch} color="blue" />
      )}

      {/* Alliance Pills */}
      {activeAlliances.map(alliance => (
        <Pill key={alliance} label={alliance} onRemove={() => onRemoveAlliance(alliance)} color="indigo" />
      ))}

      {/* Bank Pills */}
      {activeBanks.map(bankId => (
        <Pill key={bankId} label={bankId} onRemove={() => onRemoveBank(bankId)} color="slate" />
      ))}

      {/* Clear All Button */}
      <button 
        onClick={onClearAll}
        className="cursor-pointer disabled:cursor-not-allowed disabled:opacity-50 text-xs font-bold text-blue-500 hover:text-blue-600 px-2 py-1 transition-colors"
      >
        Clear All
      </button>
    </div>
  );
}

// Internal Helper Component for the Pill UI
function Pill({ label, onRemove, color }: { label: string, onRemove: () => void, color: string }) {
  const colorClasses: Record<string, string> = {
    blue: "bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-400 dark:border-blue-800",
    indigo: "bg-indigo-100 text-indigo-700 border-indigo-200 dark:bg-indigo-900/30 dark:text-indigo-400 dark:border-indigo-800",
    slate: "bg-slate-100 text-slate-700 border-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700"
  };

  return (
    <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full border text-xs font-medium ${colorClasses[color]}`}>
      {label}
      <button onClick={onRemove} className="cursor-pointer disabled:cursor-not-allowed disabled:opacity-50 hover:opacity-70 transition-opacity">
        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
}