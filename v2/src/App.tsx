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
import { ALLIANCE_LOGOS } from './config';
import IOSTipBanner from './components/IOSTipBanner';
import InstallButton from './components/InstallButton';

export default function App() {
  const isHeaderVisible = useHeaderVisible();
  // Grid is now the default state
  const [layout, setLayout] = useState<'grid' | 'list'>('grid');
  const [resetKey, setResetKey] = useState(0);

  const { 
    filteredData, banks, loading, search, setSearch, 
    activeBanks, setActiveBanks, 
    activeAlliances, setActiveAlliances,
    showOnlyBonuses, setShowOnlyBonuses, 
    isDark, setIsDark, installPrompt, handleInstallClick 
  } = useAirlines();

  const handleGlobalReset = (shouldScroll = false) => {
    setSearch('');
    setActiveBanks([]);
    setActiveAlliances([]);
    setShowOnlyBonuses(false);
    setResetKey(prev => prev + 1);
    if (shouldScroll) window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (loading) return <LoadingScreen />;

  return (
    <div className={isDark ? 'dark' : ''}>
      <div className="min-h-screen bg-slate-50 dark:bg-black text-slate-900 dark:text-slate-100 transition-colors duration-300">
        <Header 
          isVisible={isHeaderVisible}
          goHome={() => handleGlobalReset(true)}
          {...{ isDark, setIsDark, search, setSearch, installPrompt, handleInstallClick }} 
        />
<div className="min-h-screen bg-slate-50 dark:bg-[#020617]">
      <IOSTipBanner />

        <main className="max-w-4xl mx-auto p-4">
          <SearchFilters {...{ banks, activeBanks, setActiveBanks, activeAlliances, setActiveAlliances, showOnlyBonuses, setShowOnlyBonuses }} />
          
          {/* Controls Row: Pills on Left, Toggle on Right */}
          <div className="flex items-center justify-between w-full mt-4 min-h-[48px]">
            <div className="flex-1">
              <FilterPills 
                {...{ search, activeBanks, activeAlliances }}
                onRemoveBank={(id) => setActiveBanks(prev => prev.filter(b => b !== id))}
                onRemoveAlliance={(a) => setActiveAlliances(prev => prev.filter(it => it !== a))}
                onClearSearch={() => setSearch('')}
                onClearAll={() => handleGlobalReset(false)}
              />
            </div>

            <div className="flex bg-slate-200 dark:bg-slate-800 p-1 rounded-xl shadow-inner ml-4">
              <button 
                onClick={() => setLayout('list')}
                className={`cursor-pointer disabled:cursor-not-allowed p-2 rounded-lg transition-all ${layout === 'list' ? 'bg-white dark:bg-slate-700 shadow text-blue-600' : 'text-slate-500'}`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
              <button 
                onClick={() => setLayout('grid')}
                className={`cursor-pointer disabled:cursor-not-allowed p-2 rounded-lg transition-all ${layout === 'grid' ? 'bg-white dark:bg-slate-700 shadow text-blue-600' : 'text-slate-500'}`}
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
                ALLIANCE_LOGOS={ALLIANCE_LOGOS} isGridView={false}
              />
            ) : (
              <EmptyState onClear={() => handleGlobalReset(true)} />
            )}
          </div>
        </main>
        </div>
        <Footer />
      </div>
    </div>
  );
}