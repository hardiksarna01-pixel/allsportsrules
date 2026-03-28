import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { h } from '../../constants';

const tabs = [
  { id: 'home', icon: '🏠', label: 'Home', path: '/' },
  { id: 'ai', icon: '🤖', label: 'AI', path: '/ai' },
  { id: 'calc', icon: '🧮', label: 'Calc', path: '/calculators' },
  { id: 'explore', icon: '🌍', label: 'Explore', path: '/' },
  { id: 'rank', icon: '🏆', label: 'Rank', path: '/rankings' },
  { id: 'profile', icon: '👤', label: 'Profile', path: '/profile' },
];

function getActiveTab(pathname) {
  if (pathname === '/ai') return 'ai';
  if (pathname === '/calculators') return 'calc';
  if (pathname === '/rankings') return 'rank';
  if (pathname === '/profile') return 'profile';
  return 'home';
}

export default function BottomNav() {
  const navigate = useNavigate();
  const location = useLocation();
  const tab = getActiveTab(location.pathname);

  const [isDesktop, setIsDesktop] = useState(
    typeof window !== 'undefined' && window.innerWidth >= 768
  );
  useEffect(() => {
    const handler = () => setIsDesktop(window.innerWidth >= 768);
    window.addEventListener('resize', handler);
    return () => window.removeEventListener('resize', handler);
  }, []);

  return (
    <div
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        background: 'rgba(251,248,243,.92)',
        backdropFilter: 'blur(24px)',
        WebkitBackdropFilter: 'blur(24px)',
        borderTop: '1px solid rgba(0,0,0,.06)',
        boxShadow: '0 -1px 3px rgba(0,0,0,.04)',
        ...h,
      }}
    >
      <div
        style={{
          maxWidth: 1400,
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'space-around',
          alignItems: 'center',
          padding: isDesktop
            ? '10px 32px env(safe-area-inset-bottom, 10px)'
            : '6px 0 env(safe-area-inset-bottom, 6px)',
        }}
      >
        {tabs.map((t) => {
          const active = tab === t.id;
          return (
            <div
              key={t.id}
              onClick={() => navigate(t.path)}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                cursor: 'pointer',
                padding: isDesktop ? '6px 16px' : '4px 8px',
                position: 'relative',
                borderRadius: isDesktop ? 10 : 0,
                transition: 'background .15s',
                ...(isDesktop && active ? { background: 'rgba(22,163,74,.08)' } : {}),
              }}
              onMouseEnter={(e) => {
                if (isDesktop) e.currentTarget.style.background = active ? 'rgba(22,163,74,.12)' : 'rgba(0,0,0,.04)';
              }}
              onMouseLeave={(e) => {
                if (isDesktop) e.currentTarget.style.background = active ? 'rgba(22,163,74,.08)' : 'transparent';
              }}
            >
              {active && (
                <div
                  style={{
                    position: 'absolute',
                    top: 0,
                    width: isDesktop ? 24 : 16,
                    height: 3,
                    borderRadius: 2,
                    background: '#16a34a',
                  }}
                />
              )}
              <span style={{ fontSize: isDesktop ? 22 : 18 }}>{t.icon}</span>
              <span
                style={{
                  fontSize: isDesktop ? 11 : 9,
                  fontWeight: 700,
                  color: active ? '#16a34a' : '#8a8380',
                  marginTop: isDesktop ? 3 : 1,
                }}
              >
                {t.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
