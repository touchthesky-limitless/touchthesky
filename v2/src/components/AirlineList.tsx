import AirlineCard from './AirlineCard';
import { usePagination } from '../hooks/usePagination';
// import { ALLIANCE_LOGOS } from '../config';
import type { Airline, Bank } from '../types';

interface AirlineListProps {
  airlines: Airline[];
  banks: Bank[];
  logos?: Record<string, string>;
  layout: 'grid' | 'list';
  ALLIANCE_LOGOS: Record<string, string | null>; 
  isGridView: boolean;
}

export default function AirlineList({ airlines, layout, ALLIANCE_LOGOS, banks }: AirlineListProps) {
  // Use a higher initial count for grid to fill the screen better
  const initialCount = layout === 'grid' ? 9 : 7;
  const { paginatedData, hasMore, remaining, showMore, showAll } = usePagination(airlines, initialCount);

  return (
    <div className="space-y-6">
      <div className={
        layout === 'grid' 
          ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 animate-in fade-in slide-in-from-bottom-3 duration-500" 
          : "flex flex-col gap-4 animate-in fade-in duration-500"
      }>
        {paginatedData.map((airline, index) => (
          <AirlineCard 
            key={`${airline.iata}-${index}`}
            banks={banks}
            airline={airline} 
            ALLIANCE_LOGOS={ALLIANCE_LOGOS} 
            isGridView={layout === 'grid'}
          />
        ))}
      </div>

      {hasMore && (
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8 mb-12">
          <button onClick={showMore} className="cursor-pointer disabled:cursor-not-allowed w-full sm:w-auto px-8 py-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-50 active:scale-95 transition-all shadow-sm">
            Show More ({remaining})
          </button>
          <button onClick={showAll} className="cursor-pointer disabled:cursor-not-allowed w-full sm:w-auto px-8 py-3 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-xl shadow-lg active:scale-95 transition-all">
            Show All
          </button>
        </div>
      )}
    </div>
  );
}