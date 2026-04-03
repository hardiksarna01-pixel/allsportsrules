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

const ACTIONS = [
  { title: 'Quiz', sub: 'Test your knowledge', path: '/quiz', accent: '#10B981' },
  { title: 'AI Tutor', sub: 'Ask any question', path: '/ai', accent: '#3B82F6' },
  { title: 'Games', sub: 'Learn by playing', path: '/games', accent: '#8B5CF6' },
  { title: 'Glossary', sub: `300+ terms defined`, path: '/glossary', accent: '#F59E0B' },
  { title: 'Calculators', sub: 'Run rate, PER, xG', path: '/calculators', accent: '#EF4444' },
];

const TYPE_FILTERS = [
  { id: 'all', label: 'All' },
  { id: 'team', label: 'Team' },
  { id: 'individual', label: 'Individual' },
  { id: 'full', label: 'Contact' },
  { id: 'non', label: 'Non-Contact' },
];

/* ── SVG Icons (no emoji) ── */
const SearchIcon = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>
);

const ArrowIcon = () => (
  <svg className="w-4 h-4 text-gray-300 group-hover:text-emerald-500 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
  </svg>
);

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
    <div className="min-h-screen pb-24" style={{ background: '#F8F8FA' }}>

      {/* ═══ HERO ═══ */}
      <section className="max-w-3xl mx-auto px-6 pt-16 md:pt-24 pb-12 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
          className="font-[Outfit] text-[40px] md:text-[52px] font-black tracking-[-0.03em] text-gray-900 leading-[1.08]">
          Learn the rules of<br /><span className="text-emerald-500">any sport</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
          className="mt-4 text-gray-500 text-base max-w-md mx-auto">
          {sports.length} sports. Simple rules. Interactive quizzes. AI-powered answers.
        </motion.p>

        {/* Search bar — thick border, visible */}
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
          className="mt-8 max-w-xl mx-auto relative">
          <input value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Search a sport, rule, or term..."
            className="w-full py-4 pl-12 pr-5 rounded-2xl bg-white border-2 border-gray-300 text-base text-gray-900 placeholder-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 focus:shadow-lg transition-all" />
          <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        </motion.div>

        {/* 5 circular sport photos */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}
          className="mt-8 flex gap-7 justify-center">
          {topSports.map(s => (
            <button key={s.id} onClick={() => navigate('/sports/' + s.id)}
              className="group flex flex-col items-center gap-2">
              <div className="w-16 h-16 rounded-full overflow-hidden border-[3px] border-gray-200 group-hover:border-emerald-400 transition-colors shadow-sm">
                <SportAvatar sport={s} />
              </div>
              <span className="text-xs font-semibold text-gray-500 group-hover:text-emerald-600 transition-colors">
                {s.n.split('(')[0].trim()}
              </span>
            </button>
          ))}
        </motion.div>
      </section>

      <div className="max-w-6xl mx-auto px-5 md:px-8">

        {/* ═══ FEATURED SPORTS ═══ */}
        <section className="py-12">
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-[Outfit] text-xl md:text-2xl font-bold text-gray-900">Featured sports</h2>
            <button onClick={() => { setCat('all'); setType('all'); }}
              className="text-sm font-semibold text-emerald-600 hover:text-emerald-700 transition-colors">
              See all →
            </button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {featured.slice(0, 4).map(s => (
              <SportCard key={s.id} sport={s} onClick={() => navigate('/sports/' + s.id)} />
            ))}
          </div>
        </section>

        {/* ═══ QUICK ACTIONS — colored left accent, no emoji ═══ */}
        <section className="py-12">
          <h2 className="font-[Outfit] text-xl md:text-2xl font-bold text-gray-900 mb-8">Quick actions</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {ACTIONS.map(a => (
              <div key={a.path} onClick={() => navigate(a.path)}
                className="group relative bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md cursor-pointer transition-all overflow-hidden">
                <div className="absolute left-0 top-0 bottom-0 w-1 rounded-l-xl" style={{ background: a.accent }} />
                <div className="p-4 pl-5">
                  <div className="font-[Outfit] text-sm font-bold text-gray-900 group-hover:text-emerald-600 transition-colors">{a.title}</div>
                  <div className="text-xs text-gray-500 mt-1">{a.sub}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ═══ UPCOMING EVENTS ═══ */}
        <section className="py-12">
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-[Outfit] text-xl md:text-2xl font-bold text-gray-900">Upcoming events</h2>
            <button onClick={() => navigate('/events/wc26')}
              className="text-sm font-semibold text-emerald-600 hover:text-emerald-700 transition-colors">
              All events →
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {upcomingEvents.map(ev => {
              const now = new Date(), start = new Date(ev.date), end = new Date(ev.end);
              const isLive = now >= start && now <= end;
              const isWC = ev.id === 'wc26';
              return (
                <div key={ev.id} onClick={isWC ? () => navigate('/worldcup') : () => navigate('/events/' + ev.id)}
                  className="group flex items-center gap-4 p-4 bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md cursor-pointer transition-all">
                  <div className="w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center text-xl shrink-0">{ev.e}</div>
                  <div className="min-w-0 flex-1">
                    <div className="font-[Outfit] text-sm font-bold text-gray-900 truncate group-hover:text-emerald-600 transition-colors">{ev.n}</div>
                    <div className="text-xs text-gray-500 mt-1">
                      {isLive && <span className="text-red-500 font-bold mr-1">● Live</span>}
                      {!isLive && start.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                      {' · '}{ev.loc}
                    </div>
                  </div>
                  <ArrowIcon />
                </div>
              );
            })}
          </div>
        </section>

        {/* ═══ TRENDING ═══ */}
        <section className="py-12">
          <h2 className="font-[Outfit] text-xl md:text-2xl font-bold text-gray-900 mb-8">People are searching</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {trending.slice(0, 3).map(t => (
              <div key={t.id} onClick={() => navigate('/search')}
                className="group flex items-center gap-4 p-4 bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md cursor-pointer transition-all">
                <div className="w-9 h-9 rounded-lg bg-gray-100 flex items-center justify-center shrink-0">
                  <SearchIcon className="w-4 h-4 text-gray-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-[Outfit] text-sm font-semibold text-gray-900 truncate">{t.q}</div>
                  <div className="text-xs text-gray-500 mt-0.5">{t.vol} searches</div>
                </div>
                <ArrowIcon />
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* ═══ BROWSE ALL SPORTS ═══ */}
      <section className="max-w-6xl mx-auto px-5 md:px-8 py-12">
        <h2 className="font-[Outfit] text-xl md:text-2xl font-bold text-gray-900 mb-6">Browse all sports</h2>

        {/* Category pills */}
        <div className="flex gap-2 overflow-x-auto scrollbar-none pb-4">
          <button onClick={() => setCat('all')}
            className={`shrink-0 px-4 py-2 rounded-full text-sm font-semibold transition-all ${cat === 'all' ? 'bg-gray-900 text-white shadow-sm' : 'bg-white text-gray-500 border border-gray-200 hover:bg-gray-50'}`}>
            All ({sports.length})
          </button>
          {categories.map(c => catCounts[c.id] > 0 && (
            <button key={c.id} onClick={() => setCat(c.id)}
              className={`shrink-0 px-4 py-2 rounded-full text-sm font-semibold transition-all ${cat === c.id ? 'bg-gray-900 text-white shadow-sm' : 'bg-white text-gray-500 border border-gray-200 hover:bg-gray-50'}`}>
              {c.n}
            </button>
          ))}
        </div>

        {/* Type filters */}
        <div className="flex gap-2 overflow-x-auto scrollbar-none pb-6">
          {TYPE_FILTERS.map(t => (
            <button key={t.id} onClick={() => setType(t.id)}
              className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${type === t.id ? 'bg-gray-900 text-white' : 'text-gray-400 hover:text-gray-600 hover:bg-gray-100'}`}>
              {t.label}
            </button>
          ))}
        </div>

        {/* Sport grid */}
        <AnimatePresence mode="wait">
          <motion.div key={cat + type + search}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.15 }}
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
            {filtered.length === 0 && (
              <div className="col-span-full text-center py-20 text-gray-400">
                <SearchIcon className="w-8 h-8 mx-auto mb-3 text-gray-300" />
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
      </section>

      {/* ═══ FOOTER ═══ */}
      <footer className="bg-gray-950 text-white mt-8">
        <div className="max-w-6xl mx-auto px-6 md:px-8 py-16 md:py-20">

          {/* Tagline + CTAs */}
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-12 pb-12 border-b border-gray-800">
            <div>
              <h2 className="font-[Outfit] text-3xl md:text-4xl font-black tracking-tight leading-tight">
                Don't just watch.<br />
                <span className="text-emerald-500">Understand the game.</span>
              </h2>
              <p className="mt-3 text-gray-500 text-sm max-w-md">
                {sports.length} sports, {glossary.length} terms, interactive quizzes, AI tutor — all free.
              </p>
            </div>
            <div className="flex gap-3 shrink-0">
              <button onClick={() => navigate('/quiz')}
                className="px-7 py-3 rounded-full bg-emerald-500 text-white font-[Outfit] font-bold text-sm hover:bg-emerald-400 transition-colors">
                Start learning
              </button>
              <button onClick={() => navigate('/search')}
                className="px-7 py-3 rounded-full border border-gray-700 text-gray-400 font-[Outfit] font-semibold text-sm hover:border-gray-500 hover:text-white transition-all">
                Explore
              </button>
            </div>
          </div>

          {/* Feature links — text only, no emoji */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-y-5 gap-x-8 mb-12 pb-12 border-b border-gray-800">
            {[
              { label: 'Glossary', path: '/glossary' },
              { label: 'Rankings', path: '/rankings' },
              { label: 'World Cup 2026', path: '/worldcup' },
              { label: 'Quiz & Games', path: '/quiz' },
              { label: 'AI Tutor', path: '/ai' },
              { label: 'Field Diagrams', path: '/sports/cricket' },
              { label: 'Calculators', path: '/calculators' },
              { label: 'Events Calendar', path: '/events/wc26' },
            ].map(f => (
              <button key={f.path} onClick={() => navigate(f.path)}
                className="text-left text-sm text-gray-500 hover:text-white transition-colors font-medium">
                {f.label}
              </button>
            ))}
          </div>

          {/* Copyright */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 text-xs text-gray-600">
            <span>© 2026 SportDecoded. All rights reserved.</span>
            <div className="flex gap-6">
              {['Home', 'Sports', 'Quiz', 'Rankings', 'AI Tutor', 'Privacy'].map(l => (
                <button key={l} className="hover:text-gray-400 transition-colors">{l}</button>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

/* ── Sport Avatar (circular photo with fallback) ── */
function SportAvatar({ sport: s }) {
  const [err, setErr] = useState(false);
  if (images[s.id] && !err) {
    return <img src={images[s.id]} alt={s.n} onError={() => setErr(true)} className="w-full h-full object-cover" />;
  }
  return (
    <div className="w-full h-full flex items-center justify-center bg-gray-100 text-lg font-bold text-gray-400">
      {s.n.charAt(0)}
    </div>
  );
}

/* ── Sport Card (white card, image top, info bottom) ── */
function SportCard({ sport: s, onClick }) {
  const [err, setErr] = useState(false);
  const hasImg = images[s.id] && !err;

  return (
    <div onClick={onClick} className="group cursor-pointer">
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-lg transition-shadow overflow-hidden">
        {/* Image */}
        <div className="aspect-[3/2] bg-gray-100 overflow-hidden">
          {hasImg ? (
            <img src={images[s.id]} alt={s.n} loading="lazy" onError={() => setErr(true)}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-3xl font-bold text-gray-300"
              style={{ background: `linear-gradient(135deg, ${s.c}15, ${s.c}30)` }}>
              {s.n.charAt(0)}
            </div>
          )}
        </div>
        {/* Info */}
        <div className="p-3">
          <div className="font-[Outfit] text-sm font-bold text-gray-900 group-hover:text-emerald-600 transition-colors truncate">{s.n}</div>
          <div className="text-xs text-gray-500 mt-0.5">{s.r ? s.r.length : 0} rules · {s.fans}</div>
        </div>
      </div>
    </div>
  );
}
