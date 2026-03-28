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
  return (
    <div
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        padding: '6px 0 env(safe-area-inset-bottom, 6px)',
        background: 'rgba(251,248,243,.92)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        borderTop: '1px solid #ede8e0',
        ...h,
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
              padding: '4px 8px',
              position: 'relative',
            }}
          >
            {active && (
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  width: 16,
                  height: 3,
                  borderRadius: 2,
                  background: '#16a34a',
                }}
              />
            )}
            <span style={{ fontSize: 18 }}>{t.icon}</span>
            <span
              style={{
                fontSize: 9,
                fontWeight: 700,
                color: active ? '#16a34a' : '#8a8380',
                marginTop: 1,
              }}
            >
              {t.label}
            </span>
          </div>
        );
      })}
    </div>
  );
}
