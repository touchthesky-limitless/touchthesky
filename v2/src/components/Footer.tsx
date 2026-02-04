import { useState } from 'react';

export default function Footer() {
  const [isSyncing, setIsSyncing] = useState(false);
  const currentYear = new Date().getFullYear();

  const handleRefresh = () => {
    setIsSyncing(true);
    setTimeout(() => {
      window.location.reload();
    }, 1200);
  };

  // This will render REV_02.04 automatically based on the current date
  const revCode = `REV_${(new Date().getMonth() + 1).toString().padStart(2, '0')}.${new Date().getDate().toString().padStart(2, '0')}`;

  return (
    <footer className="w-full max-w-4xl mx-auto px-4 py-12 mt-10 border-t border-slate-200 dark:border-slate-800">
      <div className="flex flex-col items-center gap-8">
        
        {/* 1. Terminal Style Status Bar */}
        <div className="flex flex-col items-center gap-3 font-mono">
          <div className="flex items-center gap-3 px-3 py-1.5 bg-slate-100 dark:bg-slate-900 rounded-full border border-slate-200 dark:border-slate-800 shadow-inner">
            {/* Status Light */}
            <div className={`w-2 h-2 rounded-full ${isSyncing ? 'bg-blue-500 animate-ping' : 'bg-emerald-500'} shadow-[0_0_8px_rgba(16,185,129,0.5)]`}></div>
            
            <p className="text-[10px] uppercase tracking-tighter text-slate-500 dark:text-slate-400">
              SYS_STATUS: <span className="text-slate-900 dark:text-slate-200 font-bold">{isSyncing ? 'SYNCING_PARTNERS' : 'EN_ROUTE_STABLE'}</span>
            </p>
            
            <div className="h-3 w-[1px] bg-slate-300 dark:bg-slate-700"></div>
            
            <p className="text-[10px] uppercase tracking-tighter text-slate-500 dark:text-slate-400">
              UPDATED: <span className="text-slate-900 dark:text-slate-200 font-bold">04_FEB_2026</span>
            </p>
          </div>

          <button 
            onClick={handleRefresh}
            disabled={isSyncing}
            className="cursor-pointer group flex items-center gap-2 text-[10px] font-black text-blue-500 hover:text-blue-400 transition-all uppercase tracking-[0.2em]"
          >
            <svg 
              className={`w-3 h-3 transition-transform duration-700 ${isSyncing ? 'animate-spin' : 'group-hover:rotate-180'}`} 
              fill="none" viewBox="0 0 24 24" stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            {isSyncing ? 'Executing Sync...' : '[ Trigger Data Refresh ]'}
          </button>
        </div>

        {/* 2. Brand Quote */}
        <p className="text-sm font-black italic tracking-[0.3em] text-slate-400 dark:text-slate-500 uppercase opacity-80">
          "No limit, gonna touch the sky"
        </p>
        
        {/* 3. Credits & Version */}
        <div className="flex flex-col items-center gap-1">
          <p className="text-[10px] font-bold tracking-widest text-slate-400 dark:text-slate-500 uppercase">
            © {currentYear} TOUCH THE SKY INC. || <span>{revCode}</span>
          </p>
          <p className="text-[9px] text-slate-400 font-medium uppercase tracking-tight">
            Architected by <span className="text-blue-500 font-bold underline decoration-blue-500/30 underline-offset-2">Gemini Protocol</span>
          </p>
        </div>

        {/* 4. Functional Airplane Icon */}
        <div className="relative group cursor-default">
          <div className="absolute inset-0 bg-blue-500/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <svg className="w-6 h-6 relative text-slate-500 dark:text-slate-400 opacity-30 group-hover:opacity-80 transition-all duration-500" fill="currentColor" viewBox="0 0 24 24">
            <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z" />
          </svg>
        </div>
      </div>
    </footer>
  );
}