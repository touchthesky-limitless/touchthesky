import { useState, useEffect, useMemo } from 'react';
import type { Airline, Bank } from '../types';
import { AIRLINES } from '../data/partners';
import { BANKS } from '../data/banks';

interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

export function useAirlines() {
  const [data] = useState<Airline[]>(AIRLINES);
  const [banks] = useState<Bank[]>(BANKS);
  const [loading] = useState(false);

  const [search, setSearch] = useState('');
  const [activeBanks, setActiveBanks] = useState<string[]>([]);
  const [activeAlliances, setActiveAlliances] = useState<string[]>([]);
  const [showOnlyBonuses, setShowOnlyBonuses] = useState(false);
  const [isDark, setIsDark] = useState(() => {
    return localStorage.getItem('theme') === 'dark' || 
           (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches);
  });

  const [installPrompt, setInstallPrompt] = useState<BeforeInstallPromptEvent | null>(null);

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

        const category = ['Star Alliance', 'SkyTeam', 'Oneworld', 'Hotels'].includes(airline.alliance) 
          ? airline.alliance 
          : 'No Alliance';
        
        const matchesAlliance = activeAlliances.length === 0 || activeAlliances.includes(category);
        const matchesBank = activeBanks.length === 0 || airline.partners.some(p => activeBanks.includes(p.bank));
        const matchesBonus = !showOnlyBonuses || airline.partners.some(p => p.bonus);

        return matchesSearch && matchesAlliance && matchesBank && matchesBonus;
      })
      .sort((a, b) => {
        if (a.featured && !b.featured) return -1;
        if (!a.featured && b.featured) return 1;
        return a.name.localeCompare(b.name);
      });
  }, [data, search, activeBanks, activeAlliances, showOnlyBonuses]);

  const handleInstallClick = async () => {
    if (!installPrompt) return;
    installPrompt.prompt();
    const { outcome } = await installPrompt.userChoice;
    if (outcome === 'accepted') setInstallPrompt(null);
  };

  const toggleBank = (bankId: string) => {
    setActiveBanks(prev => 
      prev.includes(bankId) ? prev.filter(id => id !== bankId) : [...prev, bankId]
    );
  };

  const toggleAlliance = (name: string) => {
    setActiveAlliances(prev => 
      prev.includes(name) ? prev.filter(a => a !== name) : [...prev, name]
    );
  };

  const getPartnerCount = (bankCode: string) => {
    return data.filter(airline => 
      airline.partners.some(p => p.bank.toLowerCase() === bankCode.toLowerCase())
    ).length;
  };

  const analytics = useMemo(() => {
    return {
      totalAirlines: filteredData.length,
      featuredCount: filteredData.filter(a => a.featured).length,
      allianceCount: new Set(filteredData.map(a => a.alliance)).size,
      bonusCount: filteredData.filter(a => a.partners.some(p => p.bonus)).length,
    };
  }, [filteredData]);

  return {
    banks, loading, filteredData,
    search, setSearch,
    activeBanks, setActiveBanks,
    activeAlliances, setActiveAlliances,
    showOnlyBonuses, setShowOnlyBonuses,
    isDark, setIsDark,
    installPrompt, handleInstallClick,
    toggleBank,
    toggleAlliance,
    getPartnerCount,
    ...analytics,
  };
}