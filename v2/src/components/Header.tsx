import InstallButton from "./InstallButton";

interface HeaderProps {
  isDark: boolean;
  setIsDark: (val: boolean) => void;
  search: string;
  setSearch: (val: string) => void;
  isVisible: boolean;
  goHome: () => void;
  view: 'home' | 'calculator' | 'cpp';
  setView: (val: 'home' | 'calculator' | 'cpp') => void;
}

export default function Header({ 
  isDark, setIsDark, search, setSearch, isVisible, goHome, view, setView 
}: HeaderProps) {
  return (
    <header className={`sticky top-0 z-30 bg-white/90 dark:bg-black/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 p-4 transition-transform duration-300 ${
      isVisible ? 'translate-y-0' : '-translate-y-full'
    }`}>
      <div className="max-w-4xl mx-auto flex flex-col gap-4">
        
        {/* Row 1: Logo & Tools */}
        <div className="flex justify-between items-center">
          <button onClick={() => { goHome(); setView('home'); }} className="flex items-center gap-2 cursor-pointer">
            <div className="bg-blue-600 text-white w-8 h-8 rounded-lg flex items-center justify-center shadow-lg">
               <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M21,16 L21,14 L13,9 L13,3.5 C13,2.67 12.33,2 11.5,2 C10.67,2 10,2.67 10,3.5 L10,9 L2,14 L2,16 L10,13.5 L10,19 L8,20.5 L8,22 L11.5,21 L15,22 L15,20.5 L13,19 L13,13.5 L21,16 Z" />
              </svg>
            </div>
            <h1 className="text-xl font-black italic tracking-tighter uppercase dark:text-white">Touch The Sky</h1>
          </button>

          <div className="flex items-center gap-2">
            <InstallButton />
            <button onClick={() => setIsDark(!isDark)} className="cursor-pointer p-2 rounded-full bg-slate-100 dark:bg-slate-800 transition-colors">
              {isDark ? '☀️' : '🌙'}
            </button>
          </div>
        </div>

        {/* Row 2: Navigation Bar */}
        <nav className="flex items-center gap-6">
          <button 
            onClick={() => setView('home')}
            className={`cursor-pointer pb-1 text-sm font-bold transition-all border-b-2 ${
              view === 'home' ? 'text-blue-600 border-blue-600' : 'text-slate-500 border-transparent'
            }`}
          >
            Airlines
          </button>
          <button 
            onClick={() => setView('calculator')}
            className={`cursor-pointer pb-1 text-sm font-bold transition-all border-b-2 ${
              view === 'calculator' ? 'text-blue-600 border-blue-600' : 'text-slate-500 border-transparent'
            }`}
          >
            Points Transfer Calculator
          </button>
          <button 
            onClick={() => setView('cpp')}
            className={`cursor-pointer pb-1 text-sm font-bold transition-all border-b-2 ${
              view === 'cpp' ? 'text-blue-600 border-blue-600' : 'text-slate-500 border-transparent'
            }`}
          >
            Cent Per Point
          </button>
        </nav>
        
        {/* Row 3: Search Bar - ONLY visible on 'home' view */}
        {view === 'home' && (
          <div className="animate-in fade-in slide-in-from-top-1 duration-200">
            <input 
              type="text" 
              placeholder="Search airline, alliance, or IATA..." 
              className="w-full p-4 rounded-2xl bg-slate-100 dark:bg-slate-900 border-none focus:ring-2 focus:ring-blue-500 outline-none shadow-inner transition-all dark:text-white" 
              value={search} 
              onChange={(e) => setSearch(e.target.value)} 
            />
          </div>
        )}
      </div>
    </header>
  );
}