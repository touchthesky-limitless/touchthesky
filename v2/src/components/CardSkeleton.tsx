export default function CardSkeleton() {
  return (
    <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50 mb-4 p-4 animate-pulse">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        
        {/* LEFT: Airline Identity Placeholder */}
        <div className="flex items-center gap-4">
          {/* Logo Box */}
          <div className="w-10 h-10 bg-slate-200 dark:bg-slate-800 rounded-lg flex-shrink-0" />
          
          {/* Name and IATA lines */}
          <div className="space-y-2">
            <div className="h-5 w-32 bg-slate-200 dark:bg-slate-800 rounded" />
            <div className="h-3 w-12 bg-slate-100 dark:bg-slate-800/60 rounded" />
          </div>
        </div>

        {/* RIGHT: Partner Banks Placeholder */}
        <div className="flex flex-wrap gap-2 sm:justify-end">
          {/* We simulate 2 or 3 bank partners */}
          {[1, 2].map((i) => (
            <div key={i} className="flex items-center gap-2 bg-slate-50 dark:bg-slate-800/30 p-2 rounded-xl border border-slate-100 dark:border-slate-800 w-20 h-10" />
          ))}
        </div>

      </div>
    </div>
  );
}