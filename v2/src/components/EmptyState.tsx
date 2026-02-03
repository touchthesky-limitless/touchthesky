import { AirplaneIcon } from './icons/AirplaneIcon';

interface EmptyStateProps {
  onClear: () => void;
}

export default function EmptyState({ onClear }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
      {/* Visual Anchor: Large, muted icon */}
      <div className="relative mb-6">
        <div className="absolute inset-0 bg-slate-100 dark:bg-slate-800 rounded-full scale-150 blur-2xl opacity-50" />
        <AirplaneIcon className="w-20 h-20 text-slate-300 dark:text-slate-700 relative z-10 rotate-12" />
      </div>

      <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
        No airlines found
      </h3>
      <p className="text-slate-500 dark:text-slate-400 max-w-xs mx-auto mb-8">
        We couldn't find any airlines matching your current filters. Try adjusting your search or clearing your selections.
      </p>

      <button
        onClick={onClear}
        className="cursor-pointer disabled:cursor-not-allowed disabled:opacity-50 px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-xl transition-colors shadow-md shadow-blue-500/20"
      >
        Clear All Filters
      </button>
    </div>
  );
}