const { useState, useEffect, useMemo, useRef } = window.React;

// ==========================================
// CONFIGURATION
// ==========================================
const INITIAL_LOAD_COUNT = 6; 
const DEFAULT_BANKS = []; 
const DEFAULT_ALLIANCES = []; 
// const DEFAULT_BANKS = ['amex', 'capitalone', 'chase']; 
// const DEFAULT_ALLIANCES = ['Star Alliance', 'SkyTeam', 'Oneworld']; 

const ALLIANCE_LOGOS = {
    'Star Alliance': 'https://www.staralliance.com/o/staralliance-2025-theme/images/logo/favicon_2025.png',
    'SkyTeam': 'https://www.skyteam.com/favicon.ico',
    'Oneworld': 'https://www.oneworld.com/favicon.ico'
};

const ALLIANCE_NAMES = ['Oneworld', 'SkyTeam', 'Star Alliance', 'Other'];

// ==========================================
// SEARCH & SORT LOGIC
// ==========================================
const searchAirlines = (data, search, activeBanks, activeAlliances) => {
    const searchTerm = search.toLowerCase().trim();
    
    // 1. Filter the list
    const filtered = data.filter(airline => {
        // Search match (Name, IATA, or Alliance)
        const matchesSearch = searchTerm === '' || 
            airline.name.toLowerCase().includes(searchTerm) || 
            airline.iata?.toLowerCase().includes(searchTerm) ||
            airline.alliance.toLowerCase().includes(searchTerm);
        
        if (!matchesSearch) return false;

        // Alliance Filter
        const isMajor = ['Star Alliance', 'SkyTeam', 'Oneworld'].includes(airline.alliance);
        const category = isMajor ? airline.alliance : 'Other';
        const matchesAlliance = activeAlliances.length === 0 || activeAlliances.includes(category);

        // Bank Filter
        const matchesBank = activeBanks.length === 0 || 
                           airline.partners.some(p => activeBanks.includes(p.bank));

        return matchesAlliance && matchesBank;
    });

    // 2. Sort the filtered results (Featured always first)
    return filtered.sort((a, b) => {
        if (a.featured && !b.featured) return -1;
        if (!a.featured && b.featured) return 1;
        return a.name.localeCompare(b.name);
    }).map(airline => ({
        ...airline,
        // Only show partners currently selected in filters
        partners: activeBanks.length === 0 
            ? airline.partners 
            : airline.partners.filter(p => activeBanks.includes(p.bank))
    }));
};

const getBankLogo = (bankId, banks) => {
    const bank = banks.find(b => b.id === bankId);
    if (!bank) return `https://ui-avatars.com/api/?name=${bankId}`;
    return bank.logoOverride || `https://www.google.com/s2/favicons?sz=64&domain=${bank.domain}`;
};

// ==========================================
// AIRLINE CARD COMPONENT
// ==========================================
function AirlineCard({ airline, allBanks }) {
    const logoUrl = `https://www.google.com/s2/favicons?sz=128&domain=${airline.domain}`;
    
    return (
        <div className={`rounded-2xl border overflow-hidden transition-all mb-4 ${
            airline.featured 
                ? 'bg-white dark:bg-slate-900 border-blue-500 shadow-lg shadow-blue-500/10 ring-1 ring-blue-500/20' 
                : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 shadow-sm'
        }`}>
            <div className={`px-5 py-4 flex justify-between items-center border-b ${
                airline.featured 
                    ? 'bg-blue-50/40 dark:bg-blue-500/10 border-blue-100 dark:border-blue-900/30' 
                    : 'bg-slate-50 dark:bg-slate-800/40 border-slate-100 dark:border-slate-800'
            }`}>
                <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center overflow-hidden border border-slate-100 shrink-0">
                        <img 
                            src={logoUrl} 
                            className="w-7 h-7 object-contain" 
                            onError={(e) => { e.target.src = `https://ui-avatars.com/api/?name=${airline.iata}`; }} 
                            alt=""
                        />
                    </div>
                    <div>
                        <div className="flex items-center gap-2">
                            {/* Hyperlinked Name with Domain */}
                            <h3 className="text-lg font-bold text-slate-900 dark:text-white leading-tight">
                                <a 
                                    href={`https://www.${airline.domain}`} 
                                    target="_blank" 
                                    rel="noopener noreferrer" 
                                    className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors inline-flex items-center gap-1 group"
                                >
                                    {airline.name}
                                    <svg className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                    </svg>
                                </a>
                                
                                {airline.featured && (
                                    <span className="ml-2 inline-flex items-center gap-1 bg-blue-600 text-white text-[9px] px-2 py-0.5 rounded-full uppercase font-black tracking-tighter align-middle shadow-sm">
                                        Featured
                                    </span>
                                )}
                            </h3>
                            <div className="flex items-center gap-2 mt-0.5">
                                <span className="text-slate-300 dark:text-slate-700 text-[10px]">|</span>
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{airline.iata}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-1.5 mt-1">
                            {ALLIANCE_LOGOS[airline.alliance] && (
                                <img src={ALLIANCE_LOGOS[airline.alliance]} className="w-3 h-3 object-contain" alt="" />
                            )}
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{airline.alliance}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-slate-100 dark:bg-slate-800">
                {airline.partners.map((p, idx) => (
                    <div key={idx} className="bg-white dark:bg-slate-900 p-4 flex justify-between items-center">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-slate-100 dark:bg-slate-800 rounded-lg flex items-center justify-center">
                                <img src={getBankLogo(p.bank, allBanks)} className="w-5 h-5 object-contain" alt="" />
                            </div>
                            <div>
                                <p className="text-[9px] font-bold text-slate-400 uppercase">{p.bank}</p>
                                <p className="text-lg font-black">{p.ratio}</p>
                            </div>
                        </div>
                        <span className="text-[10px] text-slate-400 font-medium italic">{p.time}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}

// ==========================================
// MAIN APP COMPONENT
// ==========================================
function App() {
    const [data, setData] = useState([]);
    const [banks, setBanks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [activeBanks, setActiveBanks] = useState(DEFAULT_BANKS);
    const [activeAlliances, setActiveAlliances] = useState(DEFAULT_ALLIANCES);
    const [isDark, setIsDark] = useState(true);
    const [visibleCount, setVisibleCount] = useState(INITIAL_LOAD_COUNT);
    const [showMoreBanks, setShowMoreBanks] = useState(false);
    const searchInputRef = useRef(null);
    const moreBanksRef = useRef(null);
    const [installPrompt, setInstallPrompt] = useState(null);

    const currentYear = new Date().getFullYear();

    useEffect(() => {
        Promise.all([
            fetch('./data/data.json').then(res => res.json()),
            fetch('./data/banks.json').then(res => res.json())
        ]).then(([airlineData, bankData]) => {
            setData(airlineData);
            setBanks(bankData);
            setLoading(false);
        }).catch(err => console.error("Data loading failed:", err));
    }, []);

    useEffect(() => { setVisibleCount(INITIAL_LOAD_COUNT); }, [search, activeBanks, activeAlliances]);
    
    // Dismiss "More" dropdown when clicking outside
    useEffect(() => {
        function handleClickOutside(event) {
            if (moreBanksRef.current && !moreBanksRef.current.contains(event.target)) {
                setShowMoreBanks(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    useEffect(() => {
        Promise.all([
            fetch('./data/data.json').then(res => res.json()),
            fetch('./data/banks.json').then(res => res.json())
        ]).then(([airlineData, bankData]) => {
            setData(airlineData);
            setBanks(bankData);
            setLoading(false);
        });
    }, []);

    const handleInstallClick = async () => {
        if (!installPrompt) return;
        installPrompt.prompt();
        const { outcome } = await installPrompt.userChoice;
        if (outcome === 'accepted') {
            setInstallPrompt(null);
        }
    };

    const filteredData = useMemo(() => 
        searchAirlines(data, search, activeBanks, activeAlliances), 
    [data, search, activeBanks, activeAlliances]);

    // Function to instantly show every filtered result
    const showAllResults = () => {
        setVisibleCount(filteredData.length);
    };

    const goHome = (e) => {
        if (e) e.preventDefault();
        
        // 1. Clear the text search
        setSearch('');
        
        // 2. Clear all filter arrays (returning to 'Featured Only' view)
        setActiveBanks([]);
        setActiveAlliances([]);
        
        // 3. Reset the pagination count to your initial load setting (e.g., 15)
        setVisibleCount(INITIAL_LOAD_COUNT);
        
        // 4. Close the 'More Banks' dropdown if it was open
        setShowMoreBanks(false);
        
        // 5. Smooth scroll back to the top of the page
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    if (loading) return (
        <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center text-white overflow-hidden">
            {/* Sky Background Glow */}
            <div className="absolute w-64 h-64 bg-blue-600/20 rounded-full blur-[120px]" />
            
            <div className="relative flex flex-col items-center animate-in fade-in zoom-in duration-700">
                {/* Airplane Icon with Takeoff Animation */}
                <div className="mb-6 text-blue-500 animate-bounce">
                    <svg 
                        className="w-16 h-16 transform -rotate-45" 
                        fill="currentColor" 
                        viewBox="0 0 24 24"
                    >
                        <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z" />
                    </svg>
                </div>

                {/* Branding */}
                <h1 className="text-3xl font-black italic tracking-tighter uppercase mb-2">
                    Touch The Sky...
                </h1>
                
                {/* Loading Indicator */}
                <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse" />
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.3em] ml-1">
                        Preparing for takeoff
                    </p>
                </div>
            </div>
        </div>
    );

    return (
        <div className={isDark ? 'dark' : ''}>
            <div className="min-h-screen bg-slate-50 dark:bg-black text-slate-900 dark:text-slate-100 pb-10">
                <header className="sticky top-0 z-10 bg-white/90 dark:bg-black/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 p-4">
                    <div className="max-w-4xl mx-auto flex flex-col gap-4">
                        <div className="flex justify-between items-center">
                            <a href="#" onClick={goHome} className="flex items-center gap-2 active:scale-95 transition-transform">
                                <div className="bg-blue-600 text-white w-8 h-8 rounded-lg flex items-center justify-center font-black shadow-lg shadow-blue-500/30">
                                    T
                                </div>
                                <h1 className="text-2xl font-black italic tracking-tighter">Touch The Sky</h1>
                            </a>
                            <button onClick={() => setIsDark(!isDark)} className="p-2 rounded-full bg-slate-100 dark:bg-slate-800">{isDark ? '☀️' : '🌙'}</button>
                        </div>
                        <input 
                            ref={searchInputRef} 
                            type="text" 
                            placeholder="Search airline, alliance, or IATA..." 
                            className="w-full p-4 rounded-2xl bg-slate-100 dark:bg-slate-900 border-none focus:ring-2 focus:ring-blue-500 outline-none shadow-inner transition-all" 
                            value={search} 
                            onChange={(e) => setSearch(e.target.value)} 
                        />
                        
                        {/* BANK FILTER UI */}
                        <div ref={moreBanksRef} className="bg-slate-50/50 dark:bg-slate-900/50 rounded-2xl p-3 border border-slate-100 dark:border-slate-800">
                            <div className="flex justify-between items-center px-1">
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Filter Banks</p>
                                <div className="flex gap-4">
                                    <button onClick={() => setActiveBanks(banks.map(b => b.id))} className="text-[10px] font-bold text-blue-500 hover:text-blue-600 uppercase">Select All</button>
                                    <button onClick={() => setActiveBanks([])} className="text-[10px] font-bold text-slate-400 hover:text-slate-600 uppercase">Clear</button>
                                </div>
                            </div>
                            <div className="flex flex-wrap gap-2 pt-2 items-center">
                                {banks.slice(0, 4).map(b => {
                                    const isActive = activeBanks.includes(b.id);
                                    return (
                                        <button key={b.id} onClick={() => setActiveBanks(prev => isActive ? prev.filter(x => x !== b.id) : [...prev, b.id])}
                                            className={`flex items-center gap-2 px-3 py-1.5 rounded-full border transition-all duration-200 text-xs font-semibold whitespace-nowrap ${isActive ? 'bg-blue-50 border-blue-500 text-blue-700 dark:bg-blue-500/20 dark:border-blue-400 dark:text-blue-300 shadow-sm' : 'bg-white border-slate-200 text-slate-700 hover:border-blue-300 dark:bg-slate-900 dark:border-slate-800 dark:text-slate-300 dark:hover:border-slate-600'}`}>
                                            <div className="w-4 h-4 bg-white rounded-full flex items-center justify-center overflow-hidden shrink-0">
                                                <img src={b.logoOverride || `https://www.google.com/s2/favicons?sz=64&domain=${b.domain}`} className="w-3.5 h-3.5 object-contain" alt="" />
                                            </div>
                                            {b.name}
                                        </button>
                                    );
                                })}
                                {banks.length > 4 && (
                                    <div className="relative">
                                        <button onClick={() => setShowMoreBanks(!showMoreBanks)} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-semibold transition-all ${showMoreBanks ? 'bg-slate-800 border-slate-800 text-white' : 'bg-slate-100 border-slate-200 text-slate-600 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-400 hover:bg-slate-200'}`}>
                                            {showMoreBanks ? 'Close' : `+${banks.length - 4} More`}
                                        </button>
                                        {showMoreBanks && (
                                            <>
                                                <div className="fixed inset-0 z-40" onClick={() => setShowMoreBanks(false)} />
                                                <div className="absolute left-0 mt-2 w-52 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl z-50 py-2">
                                                    <div className="max-h-[250px] overflow-y-auto px-1">
                                                        {banks.slice(4).map(b => {
                                                            const isActive = activeBanks.includes(b.id);
                                                            return (
                                                                <button key={b.id} onClick={() => setActiveBanks(prev => isActive ? prev.filter(x => x !== b.id) : [...prev, b.id])} className="w-full flex items-center justify-between px-3 py-2 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl transition-colors text-left">
                                                                    <div className="flex items-center gap-3">
                                                                        <div className="w-5 h-5 bg-white rounded-md flex items-center justify-center border border-slate-100 shrink-0">
                                                                            <img src={b.logoOverride || `https://www.google.com/s2/favicons?sz=64&domain=${b.domain}`} className="w-3.5 h-3.5 object-contain" alt="" />
                                                                        </div>
                                                                        <span className={`text-xs ${isActive ? 'font-bold text-blue-600 dark:text-blue-400' : 'text-slate-600 dark:text-slate-400'}`}>{b.name}</span>
                                                                    </div>
                                                                    {isActive && <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>}
                                                                </button>
                                                            );
                                                        })}
                                                    </div>
                                                </div>
                                            </>
                                        )}
                                    </div>
                                )}
                            </div>

                            {/* ALLIANCE FILTER UI */}
                            <div className="mt-4">
                                <div className="flex justify-between items-center px-1 mb-2">
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Alliances</p>
                                    <div className="flex gap-3">
                                        <button onClick={() => setActiveAlliances(ALLIANCE_NAMES)} className="text-[10px] font-bold text-blue-500 uppercase">All</button>
                                        <button onClick={() => setActiveAlliances([])} className="text-[10px] font-bold text-slate-400 uppercase">None</button>
                                    </div>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {ALLIANCE_NAMES.map(name => {
                                        const isActive = activeAlliances.includes(name);
                                        const logo = ALLIANCE_LOGOS[name];
                                        return (
                                            <button key={name} onClick={() => setActiveAlliances(prev => isActive ? prev.filter(x => x !== name) : [...prev, name])}
                                                className={`flex items-center gap-2 px-3 py-1.5 rounded-full border transition-all duration-200 text-xs font-semibold whitespace-nowrap ${isActive ? 'bg-blue-50 border-blue-500 text-blue-700 dark:bg-blue-500/20 dark:border-blue-400 dark:text-blue-300 shadow-sm' : 'bg-white border-slate-200 text-slate-700 dark:bg-slate-900 dark:border-slate-800 dark:text-slate-300'}`}>
                                                <div className="w-4 h-4 bg-white rounded-full flex items-center justify-center overflow-hidden shrink-0 border border-slate-100 dark:border-transparent">
                                                    {logo ? <img src={logo} className="w-3 h-3 object-contain" alt="" /> : <span className="text-[10px]">✨</span>}
                                                </div>
                                                {name}
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                </header>

                <main className="max-w-4xl mx-auto p-4 mt-4 space-y-4">
                    {/* 1. Use 'filteredData' here instead of 'data' */}
                    {filteredData.length > 0 ? (
                        <>
                            {/* 2. Slice 'filteredData' for pagination */}
                            {filteredData.slice(0, visibleCount).map(airline => (
                                <AirlineCard key={airline.name} airline={airline} allBanks={banks} />
                            ))}
                            
                            {/* 3. Use 'filteredData.length' for the buttons */}
                            {visibleCount < filteredData.length && (
                                <div className="flex gap-3 mt-6">
                                    <button 
                                        onClick={() => setVisibleCount(prev => prev + INITIAL_LOAD_COUNT)}
                                        className="flex-1 py-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl text-sm font-bold text-blue-500"
                                    >
                                        Show More
                                    </button>
                                    <button 
                                        onClick={() => setVisibleCount(filteredData.length)}
                                        className="px-8 py-4 bg-blue-600 text-white rounded-2xl text-sm font-bold"
                                    >
                                        Show All ({filteredData.length})
                                    </button>
                                </div>
                            )}
                        </>
                    ) : (
                        <div className="text-center py-20 bg-white dark:bg-slate-900 rounded-3xl border-2 border-dashed border-slate-200 dark:border-slate-800">
                            <p className="text-slate-400 italic">No matches found.</p>
                        </div>
                    )}
                </main>
                <footer className="max-w-4xl mx-auto px-4 py-4 mt-10 border-t border-slate-200 dark:border-slate-800 text-center">
                    <div className="flex flex-col items-center gap-6">
                        <p className="text-sm font-black italic tracking-[0.2em] text-slate-400 dark:text-slate-500 uppercase">
                            "No limit, gonna touch the sky"
                        </p>
                        
                        <div className="space-y-2">
                            <p className="text-[11px] font-bold tracking-wider text-slate-500 dark:text-slate-400 uppercase">
                                © 2017-{currentYear} TOUCH THE SKY INC.
                            </p>

                            <p className="text-[10px] text-slate-400 font-medium">
                                Architected and coded by <span className="text-blue-500 font-bold">Gemini</span>
                            </p>
                        </div>

                        <div className="opacity-30">
                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z" />
                            </svg>
                        </div>
                    </div>
                </footer>
            </div>
        </div>
    );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);