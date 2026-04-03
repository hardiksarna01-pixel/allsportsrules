import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

const tabs = [
  { id: 'home', icon: '🏠', label: 'Home', path: '/' },
  { id: 'ai', icon: '🤖', label: 'AI', path: '/ai' },
  { id: 'games', icon: '🎮', label: 'Games', path: '/games' },
  { id: 'explore', icon: '🌍', label: 'Explore', path: '/explore' },
  { id: 'rank', icon: '🏆', label: 'Rank', path: '/rankings' },
  { id: 'profile', icon: '👤', label: 'Profile', path: '/profile' },
];

function getActiveTab(pathname) {
  if (pathname === '/ai') return 'ai';
  if (pathname === '/games') return 'games';
  if (pathname.startsWith('/explore')) return 'explore';
  if (pathname === '/rankings') return 'rank';
  if (pathname === '/profile') return 'profile';
  return 'home';
}

export default function BottomNav() {
  const navigate = useNavigate();
  const location = useLocation();
  const activeTab = getActiveTab(location.pathname);

  return (
    <div className="fixed bottom-0 inset-x-0 z-50 backdrop-blur-xl bg-white/90 border-t border-gray-200/50">
      <div className="max-w-7xl mx-auto flex justify-around items-center h-16 md:h-[4.5rem] px-2 pb-[env(safe-area-inset-bottom)]">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => navigate(tab.path)}
              className="relative flex flex-col items-center gap-0.5 py-2 px-3 bg-transparent border-none cursor-pointer"
            >
              <span
                className={`text-xl md:text-2xl transition-colors ${
                  isActive ? 'text-emerald-600' : 'text-gray-400 hover:text-gray-600'
                }`}
              >
                {tab.icon}
              </span>
              <span
                className={`text-[10px] md:text-xs font-semibold mt-0.5 transition-colors ${
                  isActive ? 'text-emerald-600' : 'text-gray-400 hover:text-gray-600'
                }`}
              >
                {tab.label}
              </span>
              {isActive && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute -bottom-0.5 w-8 h-1 bg-emerald-500 rounded-full"
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
