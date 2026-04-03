import { useState, useMemo, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { sports } from '../../data/sports';
import { images } from '../../data/images';
import { categories } from '../../data/categories';
import { glossary } from '../../data/glossary';
import { usePageTitle } from '../../hooks/usePageTitle';

export default function HomePage() {
  usePageTitle(null);
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [cat, setCat] = useState('all');
  const searchRef = useRef(null);

  const filtered = useMemo(() => sports.filter(s => {
    if (search && !s.n.toLowerCase().includes(search.toLowerCase())) return false;
    if (cat !== 'all' && s.cat !== cat) return false;
    return true;
  }), [search, cat]);

  const catCounts = useMemo(() => {
    const c = {};
    categories.forEach(ct => { c[ct.id] = sports.filter(s => s.cat === ct.id).length; });
    return c;
  }, []);

  return (
    <div className="bg-white min-h-screen">

      {/* ═══ HERO — dead simple, inspired by Khan Academy ═══ */}
      <div className="max-w-4xl mx-auto px-6 pt-16 md:pt-24 pb-12 md:pb-16 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="font-[Outfit] text-4xl md:text-6xl font-black tracking-[-0.03em] text-gray-900 leading-[1.05]"
        >
          Learn the rules of<br />
          <span className="text-emerald-500">any sport</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
          className="mt-4 text-gray-400 text-base md:text-lg max-w-lg mx-auto"
        >
          {sports.length} sports explained simply. Quizzes, glossary, field diagrams, and AI tutor.
        </motion.p>

        {/* search — the main action */}
        <motion.div
          initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
          className="mt-8 max-w-xl mx-auto relative"
        >
          <input
            ref={searchRef}
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search a sport, rule, or term..."
            className="w-full px-5 py-4 pl-12 rounded-2xl bg-gray-50 border border-gray-200 text-base text-gray-800 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent focus:bg-white transition-all"
          />
          <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
        </motion.div>

        {/* quick links */}
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }}
          className="mt-6 flex gap-3 justify-center flex-wrap"
        >
          {[
            { label: 'Take a quiz', path: '/quiz', icon: '🧠' },
            { label: 'AI tutor', path: '/ai', icon: '🤖' },
            { label: 'Mini games', path: '/games', icon: '🎮' },
            { label: 'Glossary', path: '/glossary', icon: '📖' },
          ].map(l => (
            <button key={l.path} onClick={() => navigate(l.path)}
              className="flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold text-gray-500 bg-gray-50 border border-gray-100 hover:bg-gray-100 hover:text-gray-700 transition-colors">
              <span>{l.icon}</span> {l.label}
            </button>
          ))}
        </motion.div>
      </div>

      {/* ═══ CATEGORY TABS — horizontal, clean ═══ */}
      <div className="sticky top-14 z-20 bg-white/90 backdrop-blur-lg border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 py-2 flex gap-1.5 overflow-x-auto scrollbar-none">
          <button onClick={() => setCat('all')}
            className={`shrink-0 px-4 py-1.5 rounded-full text-sm font-semibold transition-all ${cat === 'all' ? 'bg-gray-900 text-white' : 'text-gray-400 hover:bg-gray-100 hover:text-gray-600'}`}>
            All ({sports.length})
          </button>
          {categories.map(c => catCounts[c.id] > 0 && (
            <button key={c.id} onClick={() => setCat(c.id)}
              className={`shrink-0 px-4 py-1.5 rounded-full text-sm font-semibold transition-all ${cat === c.id ? 'bg-gray-900 text-white' : 'text-gray-400 hover:bg-gray-100 hover:text-gray-600'}`}>
              {c.e} {c.n}
            </button>
          ))}
        </div>
      </div>

      {/* ═══ SPORT GRID — inspired by Khan Academy topic grid ═══ */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={cat + search}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3"
          >
            {filtered.length === 0 && (
              <div className="col-span-full text-center py-20 text-gray-300">
                <div className="text-4xl mb-3">🔍</div>
                <div className="text-sm font-medium">No sports match "{search || cat}"</div>
              </div>
            )}
            {filtered.map((s, i) => (
              <motion.div
                key={s.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: Math.min(i * 0.03, 0.3) }}
                onClick={() => navigate('/sports/' + s.id)}
                className="group cursor-pointer"
              >
                {/* card */}
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-gray-100 mb-2">
                  {images[s.id] ? (
                    <img src={images[s.id]} alt={s.n} loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-4xl"
                      style={{ background: `linear-gradient(135deg, ${s.c}22, ${s.c}44)` }}>
                      {s.i}
                    </div>
                  )}
                  {/* subtle dark overlay on hover */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                </div>
                {/* label */}
                <div className="px-1">
                  <div className="font-[Outfit] text-sm font-bold text-gray-800 group-hover:text-emerald-600 transition-colors truncate">{s.n}</div>
                  <div className="text-xs text-gray-400 mt-0.5">{s.r ? s.r.length : 0} rules · {s.fans}</div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ═══ BOTTOM CTA ═══ */}
      <div className="max-w-2xl mx-auto px-6 py-16 text-center">
        <h2 className="font-[Outfit] text-2xl md:text-3xl font-black text-gray-900">Don't just watch. Understand.</h2>
        <p className="mt-3 text-gray-400 text-sm md:text-base max-w-md mx-auto">
          {glossary.length} terms explained, interactive quizzes, field position diagrams, and an AI that answers any sports question.
        </p>
        <div className="mt-6 flex gap-3 justify-center">
          <button onClick={() => navigate('/quiz')}
            className="px-8 py-3 rounded-full bg-emerald-500 text-white font-bold text-sm hover:bg-emerald-600 transition-colors active:scale-95">
            Start learning
          </button>
          <button onClick={() => navigate('/glossary')}
            className="px-8 py-3 rounded-full border border-gray-200 text-gray-600 font-bold text-sm hover:border-gray-300 hover:text-gray-800 transition-all active:scale-95">
            Browse glossary
          </button>
        </div>
      </div>
    </div>
  );
}
