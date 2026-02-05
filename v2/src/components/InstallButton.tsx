import { useState } from 'react';
import { useAirlines } from '../hooks/useAirlines';

export default function InstallButton() {
  // 1. Keep isMobile local as it's a simple environment check
  const [isMobile] = useState(() => 
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
  );
  
  // 2. Pull the prompt and handler from your Global Context
  const { installPrompt, handleInstallClick } = useAirlines();

  // Hide if:
  // - It's a mobile device (where you use the IOSTipBanner instead)
  // - The context hasn't captured the prompt yet
  if (isMobile || !installPrompt) return null;

  return (
    <button 
      onClick={handleInstallClick}
      className="cursor-pointer bg-blue-600 text-white text-[10px] px-3 py-1.5 rounded-full font-bold animate-pulse shadow-lg shadow-blue-500/40 uppercase tracking-tighter hover:bg-blue-700 transition-all border-none"
    >
      Install App
    </button>
  );
}