import { useState, useEffect, useRef } from 'react';

export function usePWA() {
  const [canInstall, setCanInstall] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);
  const deferredPrompt = useRef(null);

  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js').catch(() => {});
    }
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setIsInstalled(true);
    }
    const handler = (e) => { e.preventDefault(); deferredPrompt.current = e; setCanInstall(true); };
    const installed = () => { setIsInstalled(true); setCanInstall(false); };
    window.addEventListener('beforeinstallprompt', handler);
    window.addEventListener('appinstalled', installed);
    return () => {
      window.removeEventListener('beforeinstallprompt', handler);
      window.removeEventListener('appinstalled', installed);
    };
  }, []);

  const promptInstall = async () => {
    if (!deferredPrompt.current) return false;
    deferredPrompt.current.prompt();
    const { outcome } = await deferredPrompt.current.userChoice;
    deferredPrompt.current = null;
    setCanInstall(false);
    return outcome === 'accepted';
  };

  return { canInstall, isInstalled, promptInstall };
}
