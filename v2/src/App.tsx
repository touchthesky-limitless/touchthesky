import { useState } from 'react';
import { useAirlines } from './hooks/useAirlines';
import { useHeaderVisible } from './hooks/useHeaderVisible';

import Header from './components/Header';
import SearchFilters from './components/SearchFilters';
import FilterPills from './components/FilterPills';
import AirlineList from './components/AirlineList';
import EmptyState from './components/EmptyState';
import LoadingScreen from './components/LoadingScreen';
import Footer from './components/Footer';
import PointCalculator from './components/PointCalculator';
import { ALLIANCE_LOGOS } from './config';
import IOSTipBanner from './components/IOSTipBanner';
import CPPCalculator from './components/CPPCalculator';
import ValuationService from './components/ValuationService';
import Dashboard from './components/Dashboard';
import StatsBar from './components/StatsBar';

export default function App() {
  const isHeaderVisible = useHeaderVisible();
  const [layout, setLayout] = useState<'grid' | 'list'>('grid');
  const [resetKey, setResetKey] = useState(0);

  const [view, setView] = useState<'home' | 'calculator' | 'cpp'>('home');
  const [isDashboardOpen, setIsDashboardOpen] = useState(false);

  const { 
    filteredData, banks, loading, search, setSearch, 
    activeBanks, 
    activeAlliances,
    showOnlyBonuses, setShowOnlyBonuses, 
    isDark,
    toggleBank, toggleAlliance,
    resetFilters,
  } = useAirlines();

  const handleGlobalReset = (shouldScroll = false) => {
    resetFilters(); 

    setResetKey(prev => prev + 1);
    setView('home'); 

    if (shouldScroll) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  if (loading) return <LoadingScreen />;

  return (
    <div className={isDark ? 'dark' : ''}>
      <div className="min-h-screen bg-slate-50 dark:bg-black text-slate-900 dark:text-slate-100 transition-colors duration-300">
        <Header 
          isVisible={isHeaderVisible}
          goHome={() => handleGlobalReset(true)}
          view={view}
          setView={setView}
        />
        
        <div className="min-h-screen bg-slate-50 dark:bg-[#020617]">
          <IOSTipBanner />

        <main className="max-w-4xl mx-auto p-4">
          {/* 1. Show Point Calculator */}
          {view === 'calculator' && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <PointCalculator setView={setView}/>
            </div>
          )}

          {/* 2. Show CPP Calculator */}
          {view === 'cpp' && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <CPPCalculator setView={setView}/>
            </div>
          )}

          {/* 3. Show Airlines (Home) */}
          {view === 'home' && (
            <div className="animate-in fade-in duration-500">
              <SearchFilters 
                banks={banks}
                activeBanks={activeBanks}
                activeAlliances={activeAlliances}
                showOnlyBonuses={showOnlyBonuses}
                setShowOnlyBonuses={setShowOnlyBonuses}
                toggleBank={toggleBank} 
                toggleAlliance={toggleAlliance}
              />
              {/* Insights Stats Bar */}
              <StatsBar onOpenDashboard={() => setIsDashboardOpen(true)} />
              {/* Controls Row */}
              <div className="flex items-center justify-between w-full mt-4 min-h-[48px]">
                <div className="flex-1">
                  <FilterPills 
                    {...{ search, activeBanks, activeAlliances }}
                    onRemoveBank={(id) => toggleBank(id)}
                    onRemoveAlliance={toggleAlliance}
                    onClearSearch={() => setSearch('')}
                    onClearAll={() => handleGlobalReset(false)}
                  />
                </div>

                <div className="flex bg-slate-200 dark:bg-slate-800 p-1 rounded-xl shadow-inner ml-4">
                  <button 
                    onClick={() => setLayout('list')}
                    className={`cursor-pointer p-2 rounded-lg transition-all ${layout === 'list' ? 'bg-white dark:bg-slate-700 shadow text-blue-600' : 'text-slate-500'}`}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                  </button>
                  <button 
                    onClick={() => setLayout('grid')}
                    className={`cursor-pointer p-2 rounded-lg transition-all ${layout === 'grid' ? 'bg-white dark:bg-slate-700 shadow text-blue-600' : 'text-slate-500'}`}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                    </svg>
                  </button>
                </div>
              </div>

              <div className="mt-6">
                {filteredData.length > 0 ? (
                  <AirlineList 
                    key={`${layout}-${search}-${resetKey}`}
                    airlines={filteredData}
                    banks={banks}
                    layout={layout}
                    ALLIANCE_LOGOS={ALLIANCE_LOGOS} 
                    isGridView={layout === 'grid'}
                  />
                ) : (
                  <EmptyState onClear={() => handleGlobalReset(true)} />
                )}
                {/* 4. The Dashboard Drawer (Overlay) */}
                {isDashboardOpen && (
                  <div className="fixed inset-0 z-[100] flex flex-col justify-end bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
                    <div 
                      className="absolute inset-0" 
                      onClick={() => setIsDashboardOpen(false)} 
                    />
                    <div className="relative bg-slate-50 dark:bg-slate-950 rounded-t-[3rem] p-6 max-h-[85vh] overflow-y-auto shadow-2xl animate-in slide-in-from-bottom-full duration-500">
                      <div className="w-12 h-1.5 bg-slate-300 dark:bg-slate-700 rounded-full mx-auto mb-6" />
                      <Dashboard />
                      <button 
                        onClick={() => setIsDashboardOpen(false)}
                        className="cursor-pointer w-full mt-8 py-4 bg-slate-900 dark:bg-white text-white dark:text-black rounded-2xl font-black uppercase tracking-widest text-xs"
                      >
                        Close Insights
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </main>
        </div>
        <Footer />
        <ValuationService />
      </div>
    </div>
  );
}