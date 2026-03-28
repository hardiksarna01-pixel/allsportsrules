import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { h } from '../../constants';
import { useProfileContext } from '../../context/ProfileContext';

const navLinks = [
  { label: 'Home', path: '/' },
  { label: 'Quiz', path: '/ai' },
  { label: 'Search', path: '/search' },
  { label: 'AI', path: '/ai' },
];

export default function Header() {
  const navigate = useNavigate();
  const { sk, xp } = useProfileContext();

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
        position: 'sticky',
        top: 0,
        zIndex: 100,
        width: '100%',
        background: 'rgba(251,248,243,.85)',
        backdropFilter: 'blur(24px)',
        WebkitBackdropFilter: 'blur(24px)',
        borderBottom: '1px solid rgba(0,0,0,.06)',
        boxShadow: '0 1px 3px rgba(0,0,0,.04)',
        ...h,
      }}
    >
      <div
        style={{
          maxWidth: 1400,
          margin: '0 auto',
          padding: isDesktop ? '12px 32px' : '9px 14px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        {/* Left: logo + nav links */}
        <div style={{ display: 'flex', alignItems: 'center', gap: isDesktop ? 24 : 8 }}>
          <div
            onClick={() => navigate('/')}
            style={{ display: 'flex', alignItems: 'center', gap: isDesktop ? 10 : 8, cursor: 'pointer' }}
          >
            <div
              style={{
                width: isDesktop ? 36 : 28,
                height: isDesktop ? 36 : 28,
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #16a34a, #2563eb)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: isDesktop ? 18 : 14,
              }}
            >
              🏟
            </div>
            <span
              style={{
                fontWeight: 800,
                fontSize: isDesktop ? 18 : 15,
                color: '#1a1a1a',
                letterSpacing: '-0.01em',
              }}
            >
              SportDecoded
            </span>
          </div>

          {isDesktop && (
            <nav style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              {navLinks.map((link) => (
                <button
                  key={link.label}
                  onClick={() => navigate(link.path)}
                  style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: 14,
                    fontWeight: 600,
                    color: '#555',
                    padding: '6px 14px',
                    borderRadius: 8,
                    transition: 'background .15s, color .15s',
                    ...h,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(0,0,0,.05)';
                    e.currentTarget.style.color = '#1a1a1a';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'none';
                    e.currentTarget.style.color = '#555';
                  }}
                >
                  {link.label}
                </button>
              ))}
            </nav>
          )}
        </div>

        {/* Right: badges + search */}
        <div style={{ display: 'flex', alignItems: 'center', gap: isDesktop ? 10 : 6 }}>
          <span
            style={{
              fontSize: isDesktop ? 12 : 9,
              fontWeight: 800,
              padding: isDesktop ? '4px 10px' : '2px 6px',
              borderRadius: 8,
              background: '#fef3c7',
              color: '#92400e',
            }}
          >
            🔥 {sk}
          </span>
          <span
            style={{
              fontSize: isDesktop ? 12 : 9,
              fontWeight: 800,
              padding: isDesktop ? '4px 10px' : '2px 6px',
              borderRadius: 8,
              background: '#dbeafe',
              color: '#1e40af',
            }}
          >
            💎 {xp}
          </span>
          <button
            onClick={() => navigate('/search')}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              fontSize: isDesktop ? 18 : 16,
              padding: '2px 4px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            aria-label="Search"
          >
            🔍
          </button>
        </div>
      </div>
    </div>
  );
}
