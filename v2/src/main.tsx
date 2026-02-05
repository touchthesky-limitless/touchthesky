import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { AirlinesProvider } from './context/AirlinesProvider.tsx';

// Register Service Worker for PWA installation
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    // We explicitly define the scope to match your subfolder
    navigator.serviceWorker.register('./sw.js', { scope: './' })
      .then(reg => console.log('SW registered for scope:', reg.scope))
      .catch(err => console.error('SW registration failed:', err));
  });
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <AirlinesProvider>
        <App />
      </AirlinesProvider>
    </StrictMode>,
)