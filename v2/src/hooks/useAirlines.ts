import { useState, useEffect, useMemo } from 'react';
import type { Airline, Bank } from '../types';

interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

export function useAirlines() {
  // --- 1. Data State ---
  const [data, setData] = useState<Airline[]>([]);
  const [banks, setBanks] = useState<Bank[]>([]);
  const [loading, setLoading] = useState(true);

  // --- 2. Filter State ---
  const [search, setSearch] = useState('');
  const [activeBanks, setActiveBanks] = useState<string[]>([]);
  const [activeAlliances, setActiveAlliances] = useState<string[]>([]);
  const [showOnlyBonuses, setShowOnlyBonuses] = useState(false);
  const [isDark, setIsDark] = useState(() => {
    // Check local storage or system preference on load
    return localStorage.getItem('theme') === 'dark' || 
           (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches);
  });

  // --- 3. PWA Install State ---
  const [installPrompt, setInstallPrompt] = useState<BeforeInstallPromptEvent | null>(null);

  const baseUrl = import.meta.env.BASE_URL;

  // --- 4. Effects ---
  useEffect(() => {
    // Fetch both JSON files from the public/data folder
    Promise.all([
      fetch(`${baseUrl}data/data.json`).then(res => res.json()),
      fetch(`${baseUrl}data/banks.json`).then(res => res.json())
    ])
    .then(([airlineData, bankData]) => {
      setData(airlineData);
      setBanks(bankData);
      setLoading(false);
    })
    .catch(err => console.error("Flight cancelled (Data fetch error):", err));
  }, []);

  useEffect(() => {
    // Manage dark mode classes
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
        // Search Logic
        const matchesSearch = 
          searchTerm === '' ||
          airline.name?.toLowerCase().includes(searchTerm) ||
          airline.iata?.toLowerCase().includes(searchTerm) ||
          airline.alliance?.toLowerCase().includes(searchTerm);

        if (!matchesSearch) return false;

        // Alliance Logic
        const isMajor = ['Star Alliance', 'SkyTeam', 'Oneworld', 'Hotels'].includes(airline.alliance);
        const category = isMajor ? airline.alliance : 'No Alliance';
        const matchesAlliance = activeAlliances.length === 0 || activeAlliances.includes(category);

        // Bank Logic
        const matchesBank = activeBanks.length === 0 || 
                           airline.partners.some(p => activeBanks.includes(p.bank));

        // Bonus Logic
        const matchesBonus = !showOnlyBonuses || airline.partners.some(p => p.bonus);

        return matchesSearch && matchesAlliance && matchesBank && matchesBonus;
      })
      .sort((a, b) => {
        // Featured airlines (like your favorites) float to the top
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
    // Data
    banks,
    loading,
    filteredData,
    
    // Filters
    search, setSearch,
    activeBanks, setActiveBanks,
    activeAlliances, setActiveAlliances,
    showOnlyBonuses, setShowOnlyBonuses,
    
    // UI/PWA
    isDark, setIsDark,
    installPrompt, handleInstallClick
  };
}