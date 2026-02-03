/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from 'react';

export default function InstallButton() {
  // 1. Initialize isMobile directly to avoid the "cascading render" error
  const [isMobile] = useState(() => 
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
  );
  
  const [installPrompt, setInstallPrompt] = useState<any>(null);

  useEffect(() => {
    // 2. Listen for the PWA install prompt
    const handleBeforeInstallPrompt = (e: Event) => {
      // Prevent the default mini-infobar
      e.preventDefault();
      // Save the event to trigger it later
      setInstallPrompt(e);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!installPrompt) return;
    
    // Show the browser's install dialog
    installPrompt.prompt();
    
    // Check if the user accepted
    const { outcome } = await installPrompt.userChoice;
    if (outcome === 'accepted') {
      setInstallPrompt(null);
    }
  };

  // Hide if:
  // - It's a mobile device (where we use the iOS Banner instead)
  // - The browser hasn't sent the install prompt (app already installed or not supported)
  if (isMobile || !installPrompt) return null;

  return (
    <button 
      onClick={handleInstallClick}
      className="cursor-pointer bg-blue-600 text-white text-[10px] px-3 py-1.5 rounded-full font-bold animate-pulse shadow-lg shadow-blue-500/40 uppercase tracking-tighter hover:bg-blue-700 transition-all"
    >
      Install App
    </button>
  );
}