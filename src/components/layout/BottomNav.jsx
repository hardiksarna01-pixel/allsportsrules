import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

/* ── SVG Icons (clean, consistent 24×24 stroke icons) ── */
const icons = {
  home: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 12L5 10M5 10L12 3L19 10M5 10V20C5 20.55 5.45 21 6 21H9M19 10L21 12M19 10V20C19 20.55 18.55 21 18 21H15M9 21C9.55 21 10 20.55 10 20V16C10 15.45 10.45 15 11 15H13C13.55 15 14 15.45 14 16V20C14 20.55 14.45 21 15 21M9 21H15" />
    </svg>
  ),
  ai: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2C6.48 2 2 6 2 10.5C2 13.8 4.46 16.54 8 17.6V22L12 19H12C17.52 19 22 15 22 10.5C22 6 17.52 2 12 2Z" />
      <circle cx="8.5" cy="10.5" r="1" fill="currentColor" stroke="none" />
      <circle cx="12" cy="10.5" r="1" fill="currentColor" stroke="none" />
      <circle cx="15.5" cy="10.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  ),
  games: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="6" width="20" height="12" rx="3" />
      <line x1="8.5" y1="9" x2="8.5" y2="15" />
      <line x1="5.5" y1="12" x2="11.5" y2="12" />
      <circle cx="16" cy="10" r="1" fill="currentColor" stroke="none" />
      <circle cx="19" cy="13" r="1" fill="currentColor" stroke="none" />
    </svg>
  ),
  explore: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
      <circle cx="11" cy="11" r="3" />
    </svg>
  ),
  rank: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="12" width="5" height="9" rx="1" />
      <rect x="9.5" y="5" width="5" height="16" rx="1" />
      <rect x="16" y="9" width="5" height="12" rx="1" />
      <path d="M12 2L13 4H11L12 2Z" fill="currentColor" stroke="none" />
    </svg>
  ),
  profile: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="8" r="4" />
      <path d="M20 21C20 16.58 16.42 13 12 13C7.58 13 4 16.58 4 21" />
    </svg>
  ),
};

const tabs = [
  { id: 'home', icon: icons.home, label: 'Home', path: '/' },
  { id: 'ai', icon: icons.ai, label: 'Ask AI', path: '/ai' },
  { id: 'games', icon: icons.games, label: 'Play', path: '/games' },
  { id: 'explore', icon: icons.explore, label: 'Explore', path: '/search' },
  { id: 'rank', icon: icons.rank, label: 'Rankings', path: '/rankings' },
  { id: 'profile', icon: icons.profile, label: 'You', path: '/profile' },
];

function getActiveTab(pathname) {
  if (pathname === '/ai') return 'ai';
  if (pathname === '/games') return 'games';
  if (pathname === '/search' || pathname.startsWith('/explore') || pathname.startsWith('/glossary') || pathname.startsWith('/category')) return 'explore';
  if (pathname === '/rankings') return 'rank';
  if (pathname === '/profile') return 'profile';
  return 'home';
}

export default function BottomNav() {
  const navigate = useNavigate();
  const location = useLocation();
  const activeTab = getActiveTab(location.pathname);

  return (
    <nav
      className="fixed bottom-0 inset-x-0 z-50"
      style={{ fontFamily: "'Outfit', sans-serif" }}
    >
      {/* Gradient fade above the bar */}
      <div className="h-6 bg-gradient-to-t from-white/95 to-transparent pointer-events-none" />

      <div className="bg-white/95 backdrop-blur-2xl border-t border-gray-100 shadow-[0_-4px_24px_rgba(0,0,0,0.06)]">
        <div className="max-w-lg mx-auto flex items-end justify-around px-1 pt-1.5 pb-[max(0.5rem,env(safe-area-inset-bottom))]">
          {tabs.map((tab) => {
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => navigate(tab.path)}
                className="relative flex flex-col items-center gap-[3px] py-1.5 px-4 bg-transparent border-none cursor-pointer group outline-none"
                aria-label={tab.label}
                aria-current={active ? 'page' : undefined}
              >
                {/* Active pill background */}
                {active && (
                  <motion.div
                    layoutId="navPill"
                    className="absolute -top-0.5 inset-x-1 h-[calc(100%+2px)] rounded-2xl"
                    style={{ background: 'linear-gradient(135deg, #ecfdf5 0%, #f0fdf4 100%)' }}
                    transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                  />
                )}

                {/* Icon */}
                <motion.span
                  className={`relative z-10 transition-colors duration-200 ${
                    active
                      ? 'text-emerald-600'
                      : 'text-gray-400 group-hover:text-gray-600'
                  }`}
                  animate={active ? { scale: 1.1 } : { scale: 1 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                >
                  {tab.icon}
                </motion.span>

                {/* Label */}
                <span
                  className={`relative z-10 text-[10px] font-semibold tracking-wide transition-colors duration-200 ${
                    active
                      ? 'text-emerald-700'
                      : 'text-gray-400 group-hover:text-gray-600'
                  }`}
                >
                  {tab.label}
                </span>

                {/* Active dot indicator */}
                {active && (
                  <motion.div
                    layoutId="navDot"
                    className="absolute -bottom-0.5 w-1 h-1 rounded-full bg-emerald-500"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
