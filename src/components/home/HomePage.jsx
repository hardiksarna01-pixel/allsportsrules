import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { sports } from '../../data/sports';
import { images } from '../../data/images';
import { events } from '../../data/events';
import { categories } from '../../data/categories';
import { trending } from '../../data/trending';
import { glossary } from '../../data/glossary';
import { usePageTitle } from '../../hooks/usePageTitle';

const FEATURED_IDS = ['cricket', 'football', 'basketball', 'tennis', 'f1', 'nfl', 'rugby', 'baseball'];
const TOP_FIVE = ['cricket', 'football', 'basketball', 'tennis', 'f1'];
const TYPE_FILTERS = [
  { id: 'all', label: 'All Types' },
  { id: 'team', label: 'Team' },
  { id: 'individual', label: 'Individual' },
  { id: 'full', label: 'Contact' },
  { id: 'non', label: 'Non-Contact' },
];

const fadeIn = { initial: { opacity: 0, y: 12 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.4 } };

export default function HomePage() {
  usePageTitle(null);
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [cat, setCat] = useState('all');
  const [type, setType] = useState('all');

  const featured = useMemo(() => FEATURED_IDS.map(id => sports.find(s => s.id === id)).filter(Boolean), []);
  const topSports = useMemo(() => TOP_FIVE.map(id => sports.find(s => s.id === id)).filter(Boolean), []);

  const upcomingEvents = useMemo(() => {
    const now = new Date();
    return events.filter(ev => new Date(ev.end || ev.date) >= now)
      .sort((a, b) => new Date(a.date) - new Date(b.date)).slice(0, 3);
  }, []);

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

  return (
    <div className="bg-white min-h-screen pb-24">

      {/* ═══ 1. HERO ═══ */}
      <div className="max-w-4xl mx-auto px-6 pt-14 md:pt-20 pb-8 text-center">
        <motion.h1 {...fadeIn}
          className="font-[Outfit] text-4xl md:text-6xl font-black tracking-[-0.03em] text-gray-900 leading-[1.05]">
          Learn the rules of<br /><span className="text-emerald-500">any sport</span>
        </motion.h1>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
          className="mt-4 text-gray-400 text-base md:text-lg max-w-lg mx-auto">
          {sports.length} sports explained simply. Quizzes, glossary, field diagrams, and AI tutor.
        </motion.p>
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
          className="mt-6 max-w-xl mx-auto relative">
          <input value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Search a sport, rule, or term..."
            className="w-full px-5 py-4 pl-12 rounded-2xl bg-white border-2 border-gray-300 text-base text-gray-900 placeholder-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 focus:shadow-md transition-all" />
          <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
        </motion.div>
        {/* Popular sport quick-nav */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}
          className="mt-6 flex gap-5 justify-center">
          {topSports.map(s => (
            <button key={s.id} onClick={() => navigate('/sports/' + s.id)} className="group flex flex-col items-center gap-1.5">
              <div className="w-12 h-12 md:w-14 md:h-14 rounded-full overflow-hidden border-2 border-gray-100 group-hover:border-emerald-400 transition-colors">
                <SportAvatar sport={s} />
              </div>
              <span className="text-[11px] font-semibold text-gray-400 group-hover:text-emerald-600 transition-colors">{s.n.split('(')[0].trim()}</span>
            </button>
          ))}
        </motion.div>
      </div>

      <div className="max-w-6xl mx-auto px-4 md:px-8">

        {/* ═══ 2. FEATURED SPORTS ═══ */}
        <section className="mt-12 md:mt-16 pt-8 border-t border-gray-100">
          <h2 className="font-[Outfit] text-xl md:text-2xl font-bold text-gray-900 mb-6">Featured sports</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {featured.map(s => (
              <SportCard key={s.id} sport={s} onClick={() => navigate('/sports/' + s.id)} />
            ))}
          </div>
        </section>

        {/* ═══ 3. QUICK ACTIONS ═══ */}
        <section className="mt-12 md:mt-16 pt-8 border-t border-gray-100">
          <h2 className="font-[Outfit] text-xl md:text-2xl font-bold text-gray-900 mb-6">Quick actions</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {[
              { icon: '🧠', title: 'Quiz', sub: 'Test your knowledge', path: '/quiz', bg: 'bg-emerald-50 border-emerald-200' },
              { icon: '🤖', title: 'AI Tutor', sub: 'Ask anything', path: '/ai', bg: 'bg-blue-50 border-blue-200' },
              { icon: '🎮', title: 'Games', sub: 'Play & learn', path: '/games', bg: 'bg-purple-50 border-purple-200' },
              { icon: '📖', title: 'Glossary', sub: `${glossary.length} terms`, path: '/glossary', bg: 'bg-amber-50 border-amber-200' },
              { icon: '🧮', title: 'Calculators', sub: 'Stats tools', path: '/calculators', bg: 'bg-rose-50 border-rose-200' },
            ].map(a => (
              <div key={a.path} onClick={() => navigate(a.path)}
                className={`flex flex-col items-center text-center gap-2 p-5 md:p-6 rounded-2xl border cursor-pointer hover:shadow-lg hover:-translate-y-1 transition-all ${a.bg}`}>
                <span className="text-3xl md:text-4xl">{a.icon}</span>
                <div>
                  <div className="font-[Outfit] text-sm md:text-base font-bold text-gray-800">{a.title}</div>
                  <div className="text-xs text-gray-500 mt-0.5">{a.sub}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ═══ 4. UPCOMING EVENTS ═══ */}
        <section className="mt-12 md:mt-16 pt-8 border-t border-gray-100">
          <h2 className="font-[Outfit] text-xl md:text-2xl font-bold text-gray-900 mb-6">Upcoming events</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {upcomingEvents.map(ev => {
              const now = new Date(), start = new Date(ev.date), end = new Date(ev.end);
              const isLive = now >= start && now <= end;
              const isWC = ev.id === 'wc26';
              return (
                <div key={ev.id} onClick={isWC ? () => navigate('/worldcup') : () => navigate('/events/' + ev.id)}
                  className="flex items-center gap-4 p-5 rounded-2xl bg-gray-50 border border-gray-200 cursor-pointer hover:shadow-md hover:bg-white transition-all">
                  <span className="text-3xl shrink-0">{ev.e}</span>
                  <div className="min-w-0">
                    <div className="font-[Outfit] text-base font-bold text-gray-900 truncate">{ev.n}</div>
                    <div className="text-sm text-gray-500 mt-1">
                      {isLive ? <span className="text-red-500 font-bold mr-1">● Live</span> : start.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                      {' · '}{ev.loc}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ═══ 5. TRENDING ═══ */}
        <section className="mt-12 md:mt-16 pt-8 border-t border-gray-100">
          <h2 className="font-[Outfit] text-xl md:text-2xl font-bold text-gray-900 mb-6">People are searching</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {trending.slice(0, 3).map(t => (
              <div key={t.id} onClick={() => navigate('/search')}
                className="flex items-center gap-4 p-5 rounded-2xl bg-gray-50 border border-gray-200 cursor-pointer hover:shadow-md hover:bg-white transition-all">
                <div className="w-10 h-10 rounded-xl bg-white border border-gray-200 flex items-center justify-center shrink-0">
                  <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                </div>
                <div>
                  <div className="font-[Outfit] text-base font-bold text-gray-900">{t.q}</div>
                  <div className="text-sm text-gray-500 mt-0.5">{t.vol} searches</div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* ═══ 6. BROWSE ALL SPORTS ═══ */}
      <div className="max-w-6xl mx-auto px-4 md:px-8 mt-12 md:mt-16 pt-8 border-t border-gray-100">
        <h2 className="font-[Outfit] text-xl md:text-2xl font-bold text-gray-900 mb-4">Browse all sports</h2>
      </div>
      <div className="sticky top-14 z-20 bg-white/95 backdrop-blur-lg border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-2 flex gap-1.5 overflow-x-auto scrollbar-none">
          <button onClick={() => setCat('all')}
            className={`shrink-0 px-4 py-1.5 rounded-full text-sm font-semibold transition-all ${cat === 'all' ? 'bg-gray-900 text-white' : 'text-gray-400 hover:bg-gray-100'}`}>All ({sports.length})</button>
          {categories.map(c => catCounts[c.id] > 0 && (
            <button key={c.id} onClick={() => setCat(c.id)}
              className={`shrink-0 px-4 py-1.5 rounded-full text-sm font-semibold transition-all ${cat === c.id ? 'bg-gray-900 text-white' : 'text-gray-400 hover:bg-gray-100'}`}>{c.e} {c.n}</button>
          ))}
        </div>
      </div>
      <div className="max-w-6xl mx-auto px-4 pt-4 pb-2">
        <div className="flex gap-2 overflow-x-auto scrollbar-none pb-3">
          {TYPE_FILTERS.map(t => (
            <button key={t.id} onClick={() => setType(t.id)}
              className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${type === t.id ? 'bg-gray-900 text-white' : 'text-gray-400 hover:bg-gray-100'}`}>{t.label}</button>
          ))}
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 pb-8">
        <AnimatePresence mode="wait">
          <motion.div key={cat + type + search} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.15 }}
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {filtered.length === 0 && (
              <div className="col-span-full text-center py-16 text-gray-300">
                <div className="text-3xl mb-2">🔍</div>
                <div className="text-sm font-medium">No sports found</div>
              </div>
            )}
            {filtered.map((s, i) => (
              <motion.div key={s.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: Math.min(i * 0.02, 0.2) }}>
                <SportCard sport={s} onClick={() => navigate('/sports/' + s.id)} />
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ═══ 7. FOOTER ═══ */}
      <div className="mt-16 md:mt-24 bg-gray-950 text-white">
        <div className="max-w-6xl mx-auto px-6 md:px-8 py-16 md:py-20">

          {/* top row: tagline + CTA */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-14 pb-14 border-b border-gray-800">
            <div>
              <h2 className="font-[Outfit] text-3xl md:text-4xl font-black tracking-tight">Don't just watch.<br />Understand the game.</h2>
              <p className="mt-3 text-gray-400 text-sm md:text-base max-w-md">{sports.length} sports, {glossary.length} terms, interactive quizzes, AI tutor, and field diagrams — all free.</p>
            </div>
            <div className="flex gap-3 shrink-0">
              <button onClick={() => navigate('/quiz')}
                className="px-8 py-3.5 rounded-full bg-emerald-500 text-white font-[Outfit] font-bold text-sm hover:bg-emerald-400 transition-colors active:scale-95">
                Start learning
              </button>
              <button onClick={() => navigate('/search')}
                className="px-8 py-3.5 rounded-full border border-gray-700 text-gray-300 font-[Outfit] font-bold text-sm hover:border-gray-500 hover:text-white transition-all active:scale-95">
                Explore
              </button>
            </div>
          </div>

          {/* feature grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 mb-14 pb-14 border-b border-gray-800">
            {[
              { icon: '📖', title: 'Glossary', sub: `${glossary.length} sports terms explained in plain language`, path: '/glossary' },
              { icon: '🏆', title: 'Rankings', sub: 'Live standings for cricket, football, F1, NBA, and more', path: '/rankings' },
              { icon: '⚽', title: 'World Cup 2026', sub: '48 teams, 104 matches — your complete guide', path: '/worldcup' },
              { icon: '🧠', title: 'Quiz & Games', sub: 'Test your knowledge with 4 game modes', path: '/quiz' },
              { icon: '🤖', title: 'AI Tutor', sub: 'Ask any sports question and get an instant answer', path: '/ai' },
              { icon: '📐', title: 'Field Diagrams', sub: 'Interactive position maps for 8 major sports', path: '/sports/cricket' },
              { icon: '🧮', title: 'Calculators', sub: 'Run rate, F1 points, xG, PER, DLS, and more', path: '/calculators' },
              { icon: '📅', title: 'Events Calendar', sub: '76 events tracked from 2026 to 2031', path: '/events/wc26' },
            ].map(f => (
              <div key={f.path} onClick={() => navigate(f.path)}
                className="cursor-pointer group">
                <span className="text-3xl md:text-4xl block mb-3">{f.icon}</span>
                <div className="font-[Outfit] text-base font-bold text-white group-hover:text-emerald-400 transition-colors">{f.title}</div>
                <div className="text-sm text-gray-500 mt-1 leading-relaxed group-hover:text-gray-400 transition-colors">{f.sub}</div>
              </div>
            ))}
          </div>

          {/* bottom row: links + copyright */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 text-sm text-gray-500">
            <div className="flex gap-6">
              {[
                { label: 'Home', path: '/' },
                { label: 'Glossary', path: '/glossary' },
                { label: 'Quiz', path: '/quiz' },
                { label: 'Rankings', path: '/rankings' },
                { label: 'AI Tutor', path: '/ai' },
                { label: 'Games', path: '/games' },
              ].map(l => (
                <button key={l.path} onClick={() => navigate(l.path)}
                  className="hover:text-white transition-colors">{l.label}</button>
              ))}
            </div>
            <div className="text-gray-600">© 2026 SportDecoded. All rights reserved.</div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Sport Avatar (circular, with error fallback) ── */
function SportAvatar({ sport: s }) {
  const [imgErr, setImgErr] = useState(false);
  if (images[s.id] && !imgErr) {
    return <img src={images[s.id]} alt={s.n} onError={() => setImgErr(true)} className="w-full h-full object-cover" />;
  }
  return <div className="w-full h-full flex items-center justify-center bg-gray-100 text-xl">{s.i}</div>;
}

/* ── Sport Card ── */
function SportCard({ sport: s, onClick }) {
  const [imgErr, setImgErr] = useState(false);
  const hasImg = images[s.id] && !imgErr;

  return (
    <div onClick={onClick} className="group cursor-pointer">
      <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-gray-100">
        {hasImg ? (
          <img src={images[s.id]} alt={s.n} loading="lazy"
            onError={() => setImgErr(true)}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-4xl" style={{ background: `linear-gradient(135deg, ${s.c}22, ${s.c}44)` }}>{s.i}</div>
        )}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
      </div>
      <div className="mt-2 px-0.5">
        <div className="font-[Outfit] text-sm font-bold text-gray-800 group-hover:text-emerald-600 transition-colors truncate">{s.n}</div>
        <div className="text-xs text-gray-400">{s.r ? s.r.length : 0} rules · {s.fans}</div>
      </div>
    </div>
  );
}
