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

      {/* ═══════ HERO — minimal, clean ═══════ */}
      <section className="relative px-5 md:px-12 pt-20 md:pt-32 pb-16 md:pb-24 text-center mb-10">
        {/* single subtle gradient orb — not 12 sparkles */}
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full bg-gradient-to-br from-emerald-100/60 via-blue-100/40 to-purple-100/30 blur-3xl pointer-events-none" />

        {/* title — one line, big, clean */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0, 1] }}
          className="relative z-10 font-[Outfit] text-5xl md:text-8xl font-black tracking-[-0.04em] text-gray-900 leading-[0.95]"
        >
          Every sport.<br />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-500 to-blue-500">Simply explained.</span>
        </motion.h1>

        {/* one short subtitle */}
        <motion.p
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4, duration: 0.6 }}
          className="relative z-10 mt-5 md:mt-6 text-base md:text-lg text-gray-400 font-[Outfit] max-w-md mx-auto"
        >
          {sports.length} sports · {glossary.length} terms · Quizzes · AI tutor
        </motion.p>

        {/* one CTA — not two competing buttons */}
        <motion.div
          initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}
          className="relative z-10 mt-8 flex gap-3 justify-center"
        >
          <button onClick={() => navigate('/search')}
            className="group flex items-center gap-2 px-7 py-3.5 rounded-full bg-gray-900 text-white font-[Outfit] font-bold text-sm hover:bg-gray-800 transition-colors active:scale-95">
            <span>Explore sports</span>
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </button>
          <button onClick={() => navigate('/quiz')}
            className="px-7 py-3.5 rounded-full border border-gray-200 text-gray-600 font-[Outfit] font-semibold text-sm hover:border-gray-300 hover:text-gray-900 transition-all active:scale-95">
            Take a quiz
          </button>
        </motion.div>
      </section>

      <div className="px-4 md:px-0">

      {/* ═══════ EVENTS ═══════ */}
      <Section>
        <h2 className="font-[Outfit] text-lg md:text-xl font-black text-gray-900 mb-4">Upcoming Events</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {events.slice(0, 3).map((ev, idx) => {
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
        <h2 className="font-[Outfit] text-lg md:text-xl font-black text-gray-900 mb-4">People are searching</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {trending.slice(0, 3).map((t, i) => (
            <motion.div key={t.id} whileHover={{ y: -2 }}
              className="rounded-2xl bg-white border border-gray-100 p-5 hover:shadow-md transition-shadow">
              <div className="font-[Outfit] text-base font-bold text-gray-800 leading-snug">"{t.q}"</div>
              <div className="mt-3 text-xs font-semibold text-gray-400">{t.vol} monthly searches</div>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* ═══════ 5-MIN GUIDES ═══════ */}
      <Section className="mt-10">
        <h2 className="font-[Outfit] text-lg md:text-xl font-black text-gray-900 mb-4">Learn in 5 minutes</h2>
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
        <h2 className="font-[Outfit] text-lg md:text-xl font-black text-gray-900 mb-4">Where to watch</h2>
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
          <h2 className="font-[Outfit] text-lg md:text-xl font-black text-gray-900">Key terms</h2>
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
        <h2 className="font-[Outfit] text-lg md:text-xl font-black text-gray-900 mb-5">All sports</h2>

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
