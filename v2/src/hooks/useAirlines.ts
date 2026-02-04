import { useState, useEffect, useMemo } from 'react';
import type { Airline, Bank } from '../types';
// 1. Import the static data directly
import { AIRLINES } from '../data/partners';
import { BANKS } from '../data/banks';

interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

export function useAirlines() {
  // --- 1. Data State ---
  // We initialize these directly with the imported data instead of empty arrays
  const [data] = useState<Airline[]>(AIRLINES);
  const [banks] = useState<Bank[]>(BANKS);
  // Loading is now permanently false because data is bundled
  const [loading] = useState(false);

  // --- 2. Filter State ---
  const [search, setSearch] = useState('');
  const [activeBanks, setActiveBanks] = useState<string[]>([]);
  const [activeAlliances, setActiveAlliances] = useState<string[]>([]);
  const [showOnlyBonuses, setShowOnlyBonuses] = useState(false);
  const [isDark, setIsDark] = useState(() => {
    return localStorage.getItem('theme') === 'dark' || 
           (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches);
  });

  // --- 3. PWA Install State ---
  const [installPrompt, setInstallPrompt] = useState<BeforeInstallPromptEvent | null>(null);

  // --- 4. Effects ---
  
  /* DELETED: The useEffect fetch block is gone. 
     The data is now available instantly on mount.
  */

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault();
      setInstallPrompt(e as BeforeInstallPromptEvent);
    };
    window.addEventListener('beforeinstallprompt', handler);
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  // --- 5. Logic (The Filter Engine) ---
  const filteredData = useMemo(() => {
    const searchTerm = search.toLowerCase().trim();

    return data
      .filter((airline) => {
        const matchesSearch = 
          searchTerm === '' ||
          airline.name?.toLowerCase().includes(searchTerm) ||
          airline.iata?.toLowerCase().includes(searchTerm) ||
          airline.alliance?.toLowerCase().includes(searchTerm);

        if (!matchesSearch) return false;

        const isMajor = ['Star Alliance', 'SkyTeam', 'Oneworld', 'Hotels'].includes(airline.alliance);
        const category = isMajor ? airline.alliance : 'No Alliance';
        const matchesAlliance = activeAlliances.length === 0 || activeAlliances.includes(category);

        const matchesBank = activeBanks.length === 0 || 
                           airline.partners.some(p => activeBanks.includes(p.bank));

        const matchesBonus = !showOnlyBonuses || airline.partners.some(p => p.bonus);

        return matchesSearch && matchesAlliance && matchesBank && matchesBonus;
      })
      .sort((a, b) => {
        if (a.featured && !b.featured) return -1;
        if (!a.featured && b.featured) return 1;
        return a.name.localeCompare(b.name);
      });
  }, [data, search, activeBanks, activeAlliances, showOnlyBonuses]);

  // --- 6. Actions ---
  const handleInstallClick = async () => {
    if (!installPrompt) return;
    installPrompt.prompt();
    const { outcome } = await installPrompt.userChoice;
    if (outcome === 'accepted') setInstallPrompt(null);
  };

  return {
    banks,
    loading,
    filteredData,
    search, setSearch,
    activeBanks, setActiveBanks,
    activeAlliances, setActiveAlliances,
    showOnlyBonuses, setShowOnlyBonuses,
    isDark, setIsDark,
    installPrompt, handleInstallClick
  };
}