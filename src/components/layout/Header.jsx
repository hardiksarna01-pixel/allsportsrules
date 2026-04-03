import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useProfileContext } from '../../context/ProfileContext';

const navLinks = [
  { label: 'Home', path: '/' },
  { label: 'Quiz', path: '/ai' },
  { label: 'Games', path: '/games' },
  { label: 'Search', path: '/search' },
  { label: 'AI', path: '/ai' },
];

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const { sk, xp } = useProfileContext();

  return (
    <div className="sticky top-0 z-50 backdrop-blur-xl bg-white/80 border-b border-gray-200/50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 md:px-8 h-14 md:h-16 flex items-center justify-between">
        {/* Left: logo + nav links */}
        <div className="flex items-center gap-2 md:gap-6">
          <div
            onClick={() => navigate('/')}
            className="flex items-center gap-2 md:gap-2.5 cursor-pointer"
          >
            <div className="w-7 h-7 md:w-9 md:h-9 rounded-full bg-gradient-to-br from-green-600 to-blue-600 flex items-center justify-center text-sm md:text-lg">
              🏟️
            </div>
            <span className="font-[Outfit] font-black text-lg md:text-xl tracking-tight text-gray-900">
              SportDecoded
            </span>
          </div>

          <nav className="hidden md:flex items-center gap-1 ml-4">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => navigate(link.path)}
                className={`text-sm font-medium px-3.5 py-1.5 rounded-lg transition-colors ${
                  location.pathname === link.path
                    ? 'text-emerald-600'
                    : 'text-gray-500 hover:text-emerald-600 hover:bg-gray-100/60'
                }`}
              >
                {link.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Right: search + badges */}
        <div className="flex items-center gap-1.5 md:gap-2.5">
          <motion.div
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            className="bg-amber-50 border border-amber-200 rounded-full px-2.5 py-0.5 text-xs font-bold text-amber-700 cursor-default select-none"
          >
            🔥 {sk}
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            className="bg-blue-50 border border-blue-200 rounded-full px-2.5 py-0.5 text-xs font-bold text-blue-700 cursor-default select-none"
          >
            💎 {xp}
          </motion.div>
          <button
            onClick={() => navigate('/search')}
            className="ml-1 p-1.5 rounded-lg text-gray-500 hover:text-emerald-600 hover:bg-gray-100/60 transition-colors text-base md:text-lg"
            aria-label="Search"
          >
            🔍
          </button>
        </div>
      </div>
    </div>
  );
}
