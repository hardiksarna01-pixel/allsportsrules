import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { h } from '../../constants';
import { usePWA } from '../../hooks/usePWA';

const msgs = {
  '/calculators': { icon: '🧮', text: 'Install DLS Calculator for quick access' },
  '/quiz': { icon: '🧠', text: 'Install Sports Quiz — play anytime' },
  '/ai': { icon: '🤖', text: 'Install AI Tutor — ask questions offline' },
  '/glossary': { icon: '📖', text: 'Install Sports Glossary — access anytime' },
  '/games': { icon: '🎮', text: 'Install Mini Games — play offline' },
};
const def = { icon: '🏟️', text: 'Install SportDecoded — your sports companion' };

export default function InstallPrompt() {
  const { canInstall, promptInstall } = usePWA();
  const location = useLocation();
  const [dismissed, setDismissed] = useState(() => {
    try { const d = localStorage.getItem('sd_install_dismissed'); return d && Date.now() - Number(d) < 604800000; }
    catch { return false; }
  });

  if (!canInstall || dismissed) return null;
  const msg = msgs[location.pathname] || def;

  return (
    <div style={{
      position: 'fixed', bottom: 72, left: 12, right: 12, zIndex: 90,
      maxWidth: 500, margin: '0 auto',
      padding: '14px 16px', borderRadius: 16,
      background: 'rgba(255,255,255,.92)', backdropFilter: 'blur(20px)',
      border: '1.5px solid #ede8e0', boxShadow: '0 8px 32px rgba(0,0,0,.12)',
      display: 'flex', alignItems: 'center', gap: 12,
    }}>
      <span style={{ fontSize: 28 }}>{msg.icon}</span>
      <div style={{ flex: 1 }}>
        <div style={{ ...h, fontSize: 13, fontWeight: 700 }}>{msg.text}</div>
        <div style={{ ...h, fontSize: 10, color: '#8a8380', marginTop: 2 }}>Works offline · Fast access</div>
      </div>
      <button onClick={promptInstall} style={{ ...h, padding: '8px 16px', borderRadius: 10, background: '#16a34a', color: '#fff', fontWeight: 800, fontSize: 12, border: 'none', cursor: 'pointer', boxShadow: '0 2px 8px rgba(22,163,74,.3)', whiteSpace: 'nowrap' }}>Install</button>
      <button onClick={() => { setDismissed(true); localStorage.setItem('sd_install_dismissed', String(Date.now())); }} style={{ background: 'none', border: 'none', color: '#aaa', cursor: 'pointer', fontSize: 16, padding: '4px' }}>✕</button>
    </div>
  );
}
