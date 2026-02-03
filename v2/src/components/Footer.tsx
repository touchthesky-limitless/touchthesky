export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full max-w-4xl mx-auto px-4 py-12 mt-10 border-t border-slate-200 dark:border-slate-800 text-center">
      <div className="flex flex-col items-center gap-6">
        {/* Brand Quote */}
        <p className="text-sm font-black italic tracking-[0.2em] text-slate-400 dark:text-slate-500 uppercase">
          "No limit, gonna touch the sky"
        </p>
        
        {/* Copyright and Credits */}
        <div className="space-y-2">
          <p className="text-[11px] font-bold tracking-wider text-slate-500 dark:text-slate-400 uppercase">
            © 2017-{currentYear} TOUCH THE SKY INC.
          </p>

          <p className="text-[10px] text-slate-400 font-medium uppercase tracking-tight">
            Architected and coded by <span className="text-blue-500 font-bold">Gemini</span>
          </p>
        </div>

        {/* Version History Link */}
        <div className="flex items-center gap-3">
           <div className="h-[1px] w-4 bg-slate-200 dark:bg-slate-800"></div>
           <a 
            href="../v1/" 
            className="text-[10px] font-bold tracking-[0.1em] text-slate-400 hover:text-blue-500 transition-colors uppercase"
           >
            Legacy v1.0
           </a>
           <div className="h-[1px] w-4 bg-slate-200 dark:bg-slate-800"></div>
        </div>

        {/* Decorative Airplane Icon */}
        <div className="opacity-20 hover:opacity-50 transition-opacity duration-500 text-slate-500 dark:text-slate-400 cursor-default">
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z" />
          </svg>
        </div>
      </div>
    </footer>
  );
}