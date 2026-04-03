import { useState, useEffect, useMemo, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { sports } from '../../data/sports';
import { images } from '../../data/images';
import { events } from '../../data/events';
import { categories } from '../../data/categories';
import { trending } from '../../data/trending';
import { fiveMinGuides } from '../../data/fiveMinGuides';
import { whereToWatch } from '../../data/whereToWatch';
import { glossary } from '../../data/glossary';
import { usePageTitle } from '../../hooks/usePageTitle';

/* ── animation variants ── */
const stagger = { animate: { transition: { staggerChildren: 0.06 } } };
const fadeUp = { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0, transition: { duration: 0.4 } } };

const floatingCards = [
  { emoji: '🏏', name: 'Cricket', dur: 5, delay: 0 },
  { emoji: '⚽', name: 'Football', dur: 6, delay: -1.2 },
  { emoji: '🏀', name: 'Basketball', dur: 4.5, delay: -2.5 },
  { emoji: '🎾', name: 'Tennis', dur: 7, delay: -0.6 },
  { emoji: '🏎️', name: 'F1', dur: 5.5, delay: -1.8 },
  { emoji: '🏸', name: 'Badminton', dur: 6.5, delay: -3 },
];

const TYPE_FILTERS = [
  { id: 'all', label: 'All Types' },
  { id: 'team', label: 'Team 👥' },
  { id: 'individual', label: 'Individual 🧑' },
  { id: 'full', label: 'Contact 💥' },
  { id: 'non', label: 'Non-Contact 🤝' },
];

/* ── scroll-reveal section ── */
function Section({ children, className = '' }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  return (
    <motion.section ref={ref} initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }} className={className}>
      {children}
    </motion.section>
  );
}

export default function HomePage() {
  usePageTitle(null);
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [cat, setCat] = useState('all');
  const [type, setType] = useState('all');
  const [placeholderIdx, setPlaceholderIdx] = useState(0);
  const [searchFocused, setSearchFocused] = useState(false);
  const searchRef = useRef(null);

  const placeholders = ['Search cricket rules...', 'What is offside?', 'Find pickleball rules...', 'Explore F1 scoring...'];
  useEffect(() => { const t = setInterval(() => setPlaceholderIdx(i => (i + 1) % 4), 3000); return () => clearInterval(t); }, []);

  const filtered = useMemo(() => sports.filter(s => {
    if (search && !s.n.toLowerCase().includes(search.toLowerCase())) return false;
    if (cat !== 'all' && s.cat !== cat) return false;
    if (type === 'team' && s.tp !== 'team') return false;
    if (type === 'individual' && s.tp !== 'individual') return false;
    if (type === 'full' && s.ct !== 'full') return false;
    if (type === 'non' && s.ct !== 'non') return false;
    return true;
  }), [search, cat, type]);

  const catCounts = useMemo(() => {
    const c = {};
    categories.forEach(ct => { c[ct.id] = sports.filter(s => s.cat === ct.id).length; });
    return c;
  }, []);

  const liveResults = useMemo(() => {
    if (search.length < 2) return null;
    const q = search.toLowerCase();
    const sp = sports.filter(s => s.n.toLowerCase().includes(q)).slice(0, 4);
    const gl = glossary.filter(g => g.term.toLowerCase().includes(q)).slice(0, 3);
    return (sp.length || gl.length) ? { sports: sp, glossary: gl } : null;
  }, [search]);

  return (
    <div className="pb-24 max-w-6xl mx-auto">

      {/* ═══════ HERO ═══════ */}
      <section className="relative overflow-hidden rounded-b-[2rem] md:rounded-b-[3rem] bg-gradient-to-br from-emerald-50 via-blue-50 to-purple-50 px-5 md:px-12 pt-12 md:pt-20 pb-10 md:pb-16 text-center -mx-4 md:-mx-0 mb-6">
        {/* sparkles */}
        {Array.from({ length: 12 }).map((_, i) => (
          <motion.div key={i} className="absolute rounded-full pointer-events-none"
            style={{ width: 3 + (i % 4) * 2, height: 3 + (i % 4) * 2, background: ['#16a34a','#2563eb','#7c3aed','#f59e0b','#ec4899'][i % 5], top: `${10 + (i * 7) % 80}%`, left: `${5 + (i * 13) % 90}%` }}
            animate={{ opacity: [0, 0.7, 0], y: [0, -40], scale: [0, 1, 0.3] }}
            transition={{ duration: 2 + (i % 3), delay: i * 0.5, repeat: Infinity }}
          />
        ))}

        {/* floating sport chips */}
        <div className="flex justify-center gap-2 md:gap-4 flex-wrap mb-8 md:mb-12 relative z-10">
          {floatingCards.map((fc, i) => (
            <motion.div key={fc.name}
              animate={{ y: [0, -14, 0] }}
              transition={{ duration: fc.dur, delay: fc.delay, repeat: Infinity, ease: 'easeInOut' }}
              whileHover={{ scale: 1.12 }}
              className="flex items-center gap-1.5 md:gap-2 px-3 md:px-5 py-2 md:py-2.5 rounded-2xl bg-white/60 backdrop-blur-md border border-white/80 shadow-lg cursor-default select-none"
            >
              <span className="text-lg md:text-2xl">{fc.emoji}</span>
              <span className="text-[11px] md:text-sm font-bold text-gray-700 font-[Outfit]">{fc.name}</span>
            </motion.div>
          ))}
        </div>

        {/* title */}
        <div className="relative z-10">
          {['Every sport.', 'Every rule.', 'Made fun.'].map((line, i) => (
            <motion.div key={i}
              initial={{ opacity: 0, y: 24, filter: 'blur(8px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 0.6, delay: 0.2 + i * 0.2 }}
              className="font-[Outfit] text-4xl md:text-7xl font-black tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 via-blue-600 to-purple-600 leading-[1.1]"
            >{line}</motion.div>
          ))}
        </div>

        {/* subtitle */}
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}
          className="mt-4 md:mt-6 text-sm md:text-base text-gray-500 font-[Outfit]">
          <strong className="text-gray-700">{sports.length}+ sports</strong> · AI tutor · Quizzes · {glossary.length}+ terms
        </motion.p>

        {/* stat pills */}
        <div className="flex justify-center gap-2 md:gap-4 mt-6 md:mt-8 flex-wrap relative z-10">
          {[
            { val: `${sports.length}+`, label: 'Sports', color: 'text-emerald-600' },
            { val: '5K+', label: 'Rules', color: 'text-blue-600' },
            { val: `${glossary.length}+`, label: 'Terms', color: 'text-purple-600' },
            { val: 'AI', label: 'Powered', color: 'text-pink-600' },
          ].map((s, i) => (
            <motion.div key={s.label}
              initial={{ opacity: 0, scale: 0.7 }} animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.1 + i * 0.12, type: 'spring', stiffness: 300 }}
              className="px-4 md:px-6 py-2 md:py-3 rounded-2xl bg-white/60 backdrop-blur-md border border-white/80 text-center"
            >
              <div className={`font-[Outfit] text-lg md:text-2xl font-black ${s.color}`}>{s.val}</div>
              <div className="text-[10px] md:text-xs font-bold text-gray-400 uppercase tracking-wider">{s.label}</div>
            </motion.div>
          ))}
        </div>

        {/* CTAs */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.6 }}
          className="flex gap-3 justify-center mt-6 md:mt-10 relative z-10">
          <button onClick={() => navigate('/quiz')}
            className="px-6 md:px-8 py-3 rounded-2xl bg-gradient-to-r from-emerald-500 to-emerald-600 text-white font-[Outfit] font-bold text-sm md:text-base shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 hover:-translate-y-0.5 transition-all active:scale-95">
            🧠 Take a Quiz
          </button>
          <button onClick={() => navigate('/search')}
            className="px-6 md:px-8 py-3 rounded-2xl bg-white/70 backdrop-blur-md border border-white/80 text-gray-700 font-[Outfit] font-bold text-sm md:text-base hover:bg-white hover:-translate-y-0.5 transition-all active:scale-95">
            🔍 Search anything
          </button>
        </motion.div>

        {/* scroll indicator */}
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity }}
          className="mt-8 text-gray-300 text-xl">↓</motion.div>
      </section>

      <div className="px-4 md:px-0">

      {/* ═══════ EVENTS ═══════ */}
      <Section>
        <h2 className="font-[Outfit] text-xl md:text-2xl font-black mb-4">📅 Upcoming Events</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {events.slice(0, 6).map((ev, idx) => {
            const now = new Date(), start = new Date(ev.date), end = new Date(ev.end);
            const isLive = now >= start && now <= end;
            const isWC = ev.id === 'wc26';
            const colors = [['from-blue-600','to-purple-600'],['from-emerald-500','to-cyan-500'],['from-red-500','to-orange-500'],['from-purple-600','to-pink-500'],['from-amber-500','to-orange-500'],['from-cyan-500','to-blue-500']];
            const [g1, g2] = colors[idx % colors.length];
            return (
              <motion.div key={ev.id} whileHover={{ y: -4, scale: 1.01 }} transition={{ type: 'spring', stiffness: 300 }}
                onClick={isWC ? () => navigate('/worldcup') : undefined}
                className={`relative overflow-hidden rounded-2xl p-5 md:p-6 bg-gradient-to-br ${g1} ${g2} text-white cursor-pointer shadow-lg`}>
                <div className="absolute -top-8 -right-8 w-24 h-24 rounded-full bg-white/10" />
                <div className="absolute -bottom-6 -left-6 w-16 h-16 rounded-full bg-white/5" />
                <div className="flex items-center gap-3 relative z-10">
                  <span className="text-3xl md:text-4xl drop-shadow-md">{ev.e}</span>
                  <div>
                    <div className="font-[Outfit] text-base md:text-lg font-black">{ev.n}</div>
                    <div className="text-xs md:text-sm opacity-80">{ev.loc}</div>
                  </div>
                </div>
                {isLive ? (
                  <span className="inline-block mt-3 text-xs font-bold bg-white/20 backdrop-blur-sm rounded-lg px-3 py-1 animate-pulse relative z-10">🔴 LIVE</span>
                ) : (
                  <div className="mt-3 text-xs opacity-70 relative z-10">{start.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</div>
                )}
              </motion.div>
            );
          })}
        </div>
      </Section>

      {/* ═══════ TRENDING ═══════ */}
      <Section className="mt-10">
        <h2 className="font-[Outfit] text-xl md:text-2xl font-black mb-4">🔥 Trending Searches</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {trending.slice(0, 6).map((t, i) => {
            const cls = ['border-l-purple-500 bg-purple-50/50','border-l-blue-500 bg-blue-50/50','border-l-red-500 bg-red-50/50','border-l-orange-500 bg-orange-50/50','border-l-emerald-500 bg-emerald-50/50','border-l-cyan-500 bg-cyan-50/50'][i % 6];
            return (
              <motion.div key={t.id} whileHover={{ y: -2 }} className={`rounded-2xl border-l-4 ${cls} p-4 md:p-5`}>
                <div className="text-[10px] font-extrabold text-gray-400 uppercase tracking-wider mb-1">Trending</div>
                <div className="font-[Outfit] text-sm md:text-base font-bold text-gray-800">"{t.q}"</div>
                <span className="inline-block mt-2 text-xs font-bold text-white bg-gray-800 rounded-full px-3 py-0.5">🔥 {t.vol}</span>
              </motion.div>
            );
          })}
        </div>
      </Section>

      {/* ═══════ 5-MIN GUIDES ═══════ */}
      <Section className="mt-10">
        <h2 className="font-[Outfit] text-xl md:text-2xl font-black mb-4">⏱️ 5-Minute Guides</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {fiveMinGuides.map(g => {
            const sp = sports.find(s => s.id === g.sport);
            return (
              <motion.div key={g.id} whileHover={{ y: -4 }} transition={{ type: 'spring', stiffness: 300 }}
                onClick={() => sp && navigate('/sports/' + sp.id + '/beginners')}
                className="rounded-2xl bg-white border border-gray-100 shadow-sm p-4 cursor-pointer hover:shadow-md transition-shadow">
                <span className="text-3xl">{g.e}</span>
                <span className="inline-block mt-2 text-[9px] font-extrabold text-blue-600 bg-blue-50 rounded-full px-2 py-0.5">{g.tag}</span>
                <div className="font-[Outfit] text-sm font-bold mt-2 text-gray-800">{g.title}</div>
                <div className="text-xs text-gray-400 mt-0.5">{g.sub}</div>
              </motion.div>
            );
          })}
        </div>
      </Section>

      {/* ═══════ WHERE TO WATCH ═══════ */}
      <Section className="mt-10">
        <h2 className="font-[Outfit] text-xl md:text-2xl font-black mb-4">📺 Where to Watch</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {whereToWatch.map(w => {
            const sp = sports.find(s => s.id === w.sport);
            const c = sp?.c || '#2563eb';
            return (
              <div key={w.sport} className="rounded-2xl bg-white border border-gray-100 shadow-sm overflow-hidden">
                <div className="h-1" style={{ background: c }} />
                <div className="p-4 md:p-5">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="w-10 h-10 rounded-full flex items-center justify-center text-lg" style={{ background: c + '15' }}>{w.e}</span>
                    <span className="font-[Outfit] text-base font-bold text-gray-800">{w.n}</span>
                  </div>
                  {w.regions.map(r => (
                    <div key={r.r} className="mt-2">
                      <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">{r.r}</div>
                      <div className="flex gap-1.5 mt-1 flex-wrap">
                        {r.platforms.map(p => (
                          <span key={p} className="text-xs font-semibold bg-gray-100 text-gray-600 rounded-full px-2.5 py-0.5">{p}</span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </Section>

      {/* ═══════ GLOSSARY ═══════ */}
      <Section className="mt-10">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-[Outfit] text-xl md:text-2xl font-black">📖 Glossary</h2>
          <button onClick={() => navigate('/glossary')} className="text-sm font-bold text-blue-600 hover:text-blue-800 transition-colors font-[Outfit]">
            View all {glossary.length} →
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          {glossary.slice(0, 8).map(g => {
            const sp = sports.find(s => s.n.toLowerCase().includes(g.sport?.toLowerCase?.() || ''));
            const c = sp?.c || '#7c3aed';
            return (
              <div key={g.id} onClick={() => navigate(`/glossary/${g.term.toLowerCase().replace(/\s+/g, '-')}`)}
                className="rounded-2xl bg-white border border-gray-100 shadow-sm p-4 cursor-pointer hover:shadow-md transition-shadow border-l-4" style={{ borderLeftColor: c }}>
                <div className="font-[Outfit] text-base font-black text-gray-800">{g.term}</div>
                <div className="text-xs text-gray-500 mt-1 leading-relaxed line-clamp-2">{g.def}</div>
                <span className="inline-block mt-2 text-[10px] font-bold text-white rounded-full px-2 py-0.5" style={{ background: c }}>{g.sport}</span>
              </div>
            );
          })}
        </div>
      </Section>

      {/* ═══════ EXPLORE ═══════ */}
      <Section className="mt-12">
        <h2 className="font-[Outfit] text-2xl md:text-3xl font-black mb-5">🔍 Explore Sports</h2>

        {/* search */}
        <div className="relative mb-4" ref={searchRef}>
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 text-lg pointer-events-none">🔍</span>
          <input
            value={search} onChange={e => setSearch(e.target.value)}
            onFocus={() => setSearchFocused(true)} onBlur={() => setTimeout(() => setSearchFocused(false), 200)}
            placeholder={placeholders[placeholderIdx]}
            className="w-full pl-12 pr-5 py-3.5 md:py-4 rounded-2xl bg-white border border-gray-200 text-sm md:text-base font-medium text-gray-800 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent focus:shadow-lg focus:shadow-emerald-500/10 transition-all font-[Outfit]"
          />
          {/* live dropdown */}
          <AnimatePresence>
            {searchFocused && liveResults && (
              <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
                className="absolute top-full mt-2 left-0 right-0 bg-white rounded-2xl border border-gray-100 shadow-xl z-40 p-3 space-y-1">
                {liveResults.sports.map(s => (
                  <div key={s.id} onClick={() => { navigate('/sports/' + s.id); setSearch(''); }}
                    className="flex items-center gap-3 p-2 rounded-xl hover:bg-gray-50 cursor-pointer">
                    <span className="text-lg">{s.i}</span>
                    <span className="text-sm font-bold text-gray-700">{s.n}</span>
                  </div>
                ))}
                {liveResults.glossary.map(g => (
                  <div key={g.id} onClick={() => navigate(`/glossary/${g.term.toLowerCase().replace(/\s+/g, '-')}`)}
                    className="flex items-center gap-3 p-2 rounded-xl hover:bg-gray-50 cursor-pointer">
                    <span className="text-lg">📖</span>
                    <span className="text-sm font-semibold text-gray-600">{g.term}</span>
                  </div>
                ))}
                <div onClick={() => { navigate('/search'); setSearch(''); }}
                  className="text-center text-xs font-bold text-blue-600 pt-2 cursor-pointer hover:text-blue-800">See all results →</div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* category chips */}
        <div className="flex gap-2 overflow-x-auto md:flex-wrap pb-2 mb-2 scrollbar-none">
          <button onClick={() => setCat('all')} className={`shrink-0 rounded-full px-4 py-2 text-xs md:text-sm font-bold transition-all ${cat === 'all' ? 'bg-gray-900 text-white shadow-md' : 'bg-white text-gray-500 border border-gray-200 hover:bg-gray-50'}`}>All</button>
          {categories.map(c => catCounts[c.id] > 0 && (
            <button key={c.id} onClick={() => setCat(c.id)} className={`shrink-0 rounded-full px-4 py-2 text-xs md:text-sm font-bold transition-all ${cat === c.id ? 'bg-gray-900 text-white shadow-md' : 'bg-white text-gray-500 border border-gray-200 hover:bg-gray-50'}`}>
              {c.e} {c.n}
            </button>
          ))}
        </div>
        <div className="flex gap-2 overflow-x-auto md:flex-wrap pb-3 mb-4 scrollbar-none">
          {TYPE_FILTERS.map(t => (
            <button key={t.id} onClick={() => setType(t.id)} className={`shrink-0 rounded-full px-4 py-2 text-xs md:text-sm font-bold transition-all ${type === t.id ? 'bg-gray-900 text-white shadow-md' : 'bg-white text-gray-500 border border-gray-200 hover:bg-gray-50'}`}>
              {t.label}
            </button>
          ))}
        </div>

        {/* sport grid */}
        <motion.div variants={stagger} initial="initial" animate="animate"
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
          {filtered.length === 0 && (
            <div className="col-span-full text-center py-12 text-gray-400 font-[Outfit] text-sm">No sports match your filters.</div>
          )}
          {filtered.map(s => (
            <motion.div key={s.id} variants={fadeUp} whileHover={{ y: -6 }} transition={{ type: 'spring', stiffness: 300 }}
              onClick={() => navigate('/sports/' + s.id)}
              className="group relative rounded-2xl overflow-hidden cursor-pointer shadow-md hover:shadow-xl transition-shadow">
              {/* image or gradient */}
              {images[s.id] ? (
                <div className="h-36 md:h-44 overflow-hidden">
                  <img src={images[s.id]} alt={s.n} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" loading="lazy" />
                </div>
              ) : (
                <div className="h-36 md:h-44 flex items-center justify-center text-5xl" style={{ background: `linear-gradient(135deg, ${s.c}, ${s.c}cc)` }}>{s.i}</div>
              )}
              {/* overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent pointer-events-none" />
              {/* badges */}
              <div className="absolute top-2 right-2 flex gap-1">
                {s.oly && <span className="text-[9px] font-extrabold text-white bg-amber-500/80 backdrop-blur-sm rounded-md px-1.5 py-0.5">OLYMPIC</span>}
                {s.cat === 'trending' && <span className="text-[9px] font-extrabold text-white bg-orange-500/80 backdrop-blur-sm rounded-md px-1.5 py-0.5">TRENDING</span>}
              </div>
              {/* info */}
              <div className="absolute bottom-0 left-0 right-0 p-3 md:p-4">
                <div className="flex items-center gap-2">
                  <span className="text-xl md:text-2xl">{s.i}</span>
                  <div>
                    <div className="font-[Outfit] text-sm md:text-base font-black text-white drop-shadow-md">{s.n}</div>
                    <div className="text-[10px] md:text-xs text-white/80">{s.fans} fans · {s.r ? s.r.length : 0} rules</div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </Section>

      </div>
    </div>
  );
}
