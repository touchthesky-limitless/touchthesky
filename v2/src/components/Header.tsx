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
              className={`cursor-pointer flex items-center gap-2 whitespace-nowrap shrink-0 pb-2 text-sm font-bold transition-all border-b-2 ${
                view === 'home' ? 'text-blue-600 border-blue-600' : 'text-slate-500 border-transparent hover:text-slate-700'
              }`}
            >
<svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" className="hidden" /> {/* Fallback check */}
      <path d="M21 16l-2-3.5V5a2 2 0 10-4 0v1l-7 4H4l-1 1 4 2-1 3 2 1 2-2 7 4h2l-1-4.5 3-1.5z" stroke="currentColor" fill="none" />
    </svg>
              Airlines
            </button>
          <button 
              onClick={() => setView('calculator')}
              className={`cursor-pointer flex items-center gap-2 whitespace-nowrap shrink-0 pb-1 text-sm font-bold transition-all border-b-2 ${
                  view === 'calculator' ? 'text-blue-600 border-blue-600' : 'text-slate-500 border-transparent'
              }`}
          >
              {/* Calculator Icon */}
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
              Points Transfer Calculator
          </button>

          <button 
              onClick={() => setView('cpp')}
              className={`cursor-pointer flex items-center gap-2 whitespace-nowrap shrink-0 pb-1 text-sm font-bold transition-all border-b-2 ${
                  view === 'cpp' ? 'text-blue-600 border-blue-600' : 'text-slate-500 border-transparent'
              }`}
          >
              {/* Dollar/CPP Icon */}
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Cents Per Point
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