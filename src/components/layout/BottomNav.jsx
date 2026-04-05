import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

const tabs = [
  {
    id: 'home', label: 'Home', path: '/',
    color: '#10B981', bg: 'bg-emerald-50',
    icon: (c) => (
      <svg width="24" height="24" viewBox="0 0 24 24" fill={c === 'active' ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth={c === 'active' ? '0' : '1.8'} strokeLinecap="round" strokeLinejoin="round">
        {c === 'active' ? (
          <path d="M12 3L2 12h3v8a1 1 0 001 1h4v-6h4v6h4a1 1 0 001-1v-8h3L12 3z"/>
        ) : (
          <path d="M3 12L5 10M5 10L12 3L19 10M5 10V20a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 01-1-1v-4a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1m-4 0h4"/>
        )}
      </svg>
    ),
  },
  {
    id: 'ai', label: 'Ask AI', path: '/ai',
    color: '#3B82F6', bg: 'bg-blue-50',
    icon: (c) => (
      <svg width="24" height="24" viewBox="0 0 24 24" fill={c === 'active' ? 'currentColor' : 'none'} stroke={c === 'active' ? 'none' : 'currentColor'} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        {c === 'active' ? (
          <>
            <path d="M12 2C6.48 2 2 6 2 10.5C2 13.8 4.46 16.54 8 17.6V22l4-3c5.52 0 10-4 10-8.5C22 6 17.52 2 12 2z"/>
            <circle cx="8.5" cy="10.5" r="1.2" fill="white"/><circle cx="12" cy="10.5" r="1.2" fill="white"/><circle cx="15.5" cy="10.5" r="1.2" fill="white"/>
          </>
        ) : (
          <>
            <path d="M12 2C6.48 2 2 6 2 10.5C2 13.8 4.46 16.54 8 17.6V22l4-3c5.52 0 10-4 10-8.5C22 6 17.52 2 12 2z"/>
            <circle cx="8.5" cy="10.5" r="1" fill="currentColor" stroke="none"/><circle cx="12" cy="10.5" r="1" fill="currentColor" stroke="none"/><circle cx="15.5" cy="10.5" r="1" fill="currentColor" stroke="none"/>
          </>
        )}
      </svg>
    ),
  },
  {
    id: 'games', label: 'Play', path: '/games',
    color: '#8B5CF6', bg: 'bg-violet-50',
    icon: (c) => (
      <svg width="24" height="24" viewBox="0 0 24 24" fill={c === 'active' ? 'currentColor' : 'none'} stroke={c === 'active' ? 'none' : 'currentColor'} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        {c === 'active' ? (
          <>
            <rect x="2" y="6" width="20" height="12" rx="3" />
            <line x1="8.5" y1="9" x2="8.5" y2="15" stroke="white" strokeWidth="2"/><line x1="5.5" y1="12" x2="11.5" y2="12" stroke="white" strokeWidth="2"/>
            <circle cx="16" cy="10" r="1.3" fill="white"/><circle cx="19" cy="13" r="1.3" fill="white"/>
          </>
        ) : (
          <>
            <rect x="2" y="6" width="20" height="12" rx="3" />
            <line x1="8.5" y1="9" x2="8.5" y2="15"/><line x1="5.5" y1="12" x2="11.5" y2="12"/>
            <circle cx="16" cy="10" r="1" fill="currentColor" stroke="none"/><circle cx="19" cy="13" r="1" fill="currentColor" stroke="none"/>
          </>
        )}
      </svg>
    ),
  },
  {
    id: 'explore', label: 'Explore', path: '/search',
    color: '#F59E0B', bg: 'bg-amber-50',
    icon: (c) => (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={c === 'active' ? '2.2' : '1.8'} strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8" fill={c === 'active' ? 'currentColor' : 'none'} stroke={c === 'active' ? 'none' : 'currentColor'}/>
        {c === 'active' && <circle cx="11" cy="11" r="3.5" fill="none" stroke="white" strokeWidth="2"/>}
        {c !== 'active' && <circle cx="11" cy="11" r="3"/>}
        <line x1="21" y1="21" x2="16.65" y2="16.65" stroke={c === 'active' ? 'currentColor' : 'currentColor'} strokeWidth={c === 'active' ? '2.5' : '1.8'}/>
      </svg>
    ),
  },
  {
    id: 'rank', label: 'Rankings', path: '/rankings',
    color: '#EF4444', bg: 'bg-red-50',
    icon: (c) => (
      <svg width="24" height="24" viewBox="0 0 24 24" fill={c === 'active' ? 'currentColor' : 'none'} stroke={c === 'active' ? 'none' : 'currentColor'} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="12" width="5" height="9" rx="1" />
        <rect x="9.5" y="5" width="5" height="16" rx="1" />
        <rect x="16" y="9" width="5" height="12" rx="1" />
        {c === 'active' && <path d="M12 2l1.2 2.4h-2.4L12 2z" fill="currentColor"/>}
        {c !== 'active' && <path d="M12 2l1 2h-2l1-2z" fill="currentColor" stroke="none"/>}
      </svg>
    ),
  },
  {
    id: 'profile', label: 'You', path: '/profile',
    color: '#6366F1', bg: 'bg-indigo-50',
    icon: (c) => (
      <svg width="24" height="24" viewBox="0 0 24 24" fill={c === 'active' ? 'currentColor' : 'none'} stroke={c === 'active' ? 'none' : 'currentColor'} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="8" r="4" />
        <path d="M20 21c0-4.42-3.58-8-8-8s-8 3.58-8 8" />
      </svg>
    ),
  },
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
      {/* Fade above */}
      <div className="h-5 bg-gradient-to-t from-white to-transparent pointer-events-none" />

      <div className="bg-white border-t border-gray-100 shadow-[0_-2px_16px_rgba(0,0,0,0.06)]">
        <div className="max-w-2xl mx-auto flex items-center justify-around px-2 pt-2 pb-[max(0.5rem,env(safe-area-inset-bottom))]">
          {tabs.map((tab) => {
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => navigate(tab.path)}
                className="relative flex flex-col items-center gap-1 py-1 px-3 md:px-5 bg-transparent border-none cursor-pointer group outline-none min-w-[52px]"
                aria-label={tab.label}
                aria-current={active ? 'page' : undefined}
              >
                {/* Icon with colored background when active */}
                <motion.div
                  className={`relative flex items-center justify-center w-10 h-10 rounded-2xl transition-colors duration-200 ${
                    active ? tab.bg : 'group-hover:bg-gray-50'
                  }`}
                  animate={active ? { scale: 1 } : { scale: 1 }}
                >
                  <span style={{ color: active ? tab.color : '#9CA3AF' }}
                    className="group-hover:[&:not([style*='#9'])]:opacity-100 transition-opacity">
                    {tab.icon(active ? 'active' : 'inactive')}
                  </span>
                </motion.div>

                {/* Label */}
                <span
                  className="text-[11px] font-bold tracking-tight transition-colors duration-200"
                  style={{ color: active ? tab.color : '#9CA3AF' }}
                >
                  {tab.label}
                </span>

                {/* Active bar */}
                {active && (
                  <motion.div
                    layoutId="navBar"
                    className="absolute -top-[1px] left-2 right-2 h-[3px] rounded-full"
                    style={{ background: tab.color }}
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
