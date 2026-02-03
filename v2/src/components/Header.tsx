import InstallButton from "./InstallButton";

interface HeaderProps {
  isDark: boolean;
  setIsDark: (val: boolean) => void;
  search: string;
  setSearch: (val: string) => void;
  isVisible: boolean;
  goHome: () => void;
  // REMOVED installPrompt and handleInstallClick from here
}

export default function Header({ 
  isDark, setIsDark, search, setSearch, isVisible, goHome
}: HeaderProps) {
  return (
    <header className={`sticky top-0 z-30 bg-white/90 dark:bg-black/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 p-4 transition-transform duration-300 ${
      isVisible ? 'translate-y-0' : '-translate-y-full'
    }`}>
      <div className="max-w-4xl mx-auto flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <button 
            onClick={goHome} 
            className="flex items-center gap-2 active:scale-95 transition-transform cursor-pointer"
          >
            <div className="bg-blue-600 text-white w-8 h-8 rounded-lg flex items-center justify-center shadow-lg shadow-blue-500/30">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M21,16 L21,14 L13,9 L13,3.5 C13,2.67 12.33,2 11.5,2 C10.67,2 10,2.67 10,3.5 L10,9 L2,14 L2,16 L10,13.5 L10,19 L8,20.5 L8,22 L11.5,21 L15,22 L15,20.5 L13,19 L13,13.5 L21,16 Z" />
              </svg>
            </div>
            <h1 className="text-2xl font-black italic tracking-tighter uppercase dark:text-white">Touch The Sky</h1>
          </button>

          <div className="flex items-center gap-2">
            {/* This component handles its own visibility logic internally */}
            <InstallButton />
            
            <button onClick={() => setIsDark(!isDark)} className="cursor-pointer p-2 rounded-full bg-slate-100 dark:bg-slate-800 transition-colors">
              {isDark ? '☀️' : '🌙'}
            </button>
          </div>
        </div>
        
        <input 
          type="text" 
          placeholder="Search airline, alliance, or IATA..." 
          className="w-full p-4 rounded-2xl bg-slate-100 dark:bg-slate-900 border-none focus:ring-2 focus:ring-blue-500 outline-none shadow-inner transition-all dark:text-white" 
          value={search} 
          onChange={(e) => setSearch(e.target.value)} 
        />
      </div>
    </header>
  );
}