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
  { title: 'Quiz', sub: 'Test your knowledge', path: '/quiz', accent: '#10B981', gradient: 'from-emerald-500 to-teal-600',
    icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3"/><circle cx="12" cy="17" r=".5" fill="white"/></svg> },
  { title: 'AI Tutor', sub: 'Ask any question', path: '/ai', accent: '#3B82F6', gradient: 'from-blue-500 to-indigo-600',
    icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2C6.48 2 2 6 2 10.5C2 13.8 4.46 16.54 8 17.6V22L12 19C17.52 19 22 15 22 10.5C22 6 17.52 2 12 2Z"/><path d="M8 11h0M12 11h0M16 11h0" strokeWidth="3"/></svg> },
  { title: 'Games', sub: 'Learn by playing', path: '/games', accent: '#8B5CF6', gradient: 'from-violet-500 to-purple-600',
    icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="6" width="20" height="12" rx="3"/><line x1="8.5" y1="9" x2="8.5" y2="15"/><line x1="5.5" y1="12" x2="11.5" y2="12"/><circle cx="16" cy="10" r="1" fill="white" stroke="none"/><circle cx="19" cy="13" r="1" fill="white" stroke="none"/></svg> },
  { title: 'Glossary', sub: '300+ terms', path: '/glossary', accent: '#F59E0B', gradient: 'from-amber-400 to-orange-500',
    icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 016.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z"/><line x1="9" y1="7" x2="17" y2="7"/><line x1="9" y1="11" x2="14" y2="11"/></svg> },
  { title: 'Calculators', sub: 'Stats & tools', path: '/calculators', accent: '#EF4444', gradient: 'from-red-500 to-rose-600',
    icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="2" width="16" height="20" rx="2"/><line x1="8" y1="6" x2="16" y2="6"/><line x1="8" y1="10" x2="8" y2="10" strokeWidth="3"/><line x1="12" y1="10" x2="12" y2="10" strokeWidth="3"/><line x1="16" y1="10" x2="16" y2="10" strokeWidth="3"/><line x1="8" y1="14" x2="8" y2="14" strokeWidth="3"/><line x1="12" y1="14" x2="12" y2="14" strokeWidth="3"/><line x1="16" y1="14" x2="16" y2="14" strokeWidth="3"/><line x1="8" y1="18" x2="16" y2="18"/></svg> },
  { title: 'Diagrams', sub: 'Field positions', path: '/sports/cricket', accent: '#06B6D4', gradient: 'from-cyan-500 to-sky-600',
    icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="12" y1="3" x2="12" y2="21"/><circle cx="7" cy="8" r="1.5" fill="white" stroke="none"/><circle cx="17" cy="16" r="1.5" fill="white" stroke="none"/><circle cx="12" cy="12" r="2"/></svg> },
];

const FAQ = [
  { q: 'What is the offside rule in football?', a: 'A player is offside if they are nearer to the opponent\'s goal line than both the ball and the second-last opponent when the ball is played to them.' },
  { q: 'How does DRS work in cricket?', a: 'DRS (Decision Review System) allows teams to challenge umpire decisions using ball-tracking technology, Snickometer, and HotSpot.' },
  { q: 'What are the basic rules of basketball?', a: 'Two teams of 5 players score by shooting a ball through the opponent\'s hoop. Games have 4 quarters of 12 minutes (NBA).' },
  { q: 'How does the F1 points system work?', a: 'Points are awarded to the top 10 finishers: 25-18-15-12-10-8-6-4-2-1, with 1 extra point for fastest lap if finishing in the top 10.' },
  { q: 'What is LBW in cricket?', a: 'Leg Before Wicket — a batter is out if the ball would have hit the stumps but was blocked by their body (not the bat).' },
];

const TYPE_FILTERS = [
  { id: 'all', label: 'All', icon: '📋' },
  { id: 'team', label: 'Team', icon: '👥' },
  { id: 'individual', label: 'Individual', icon: '🏃' },
  { id: 'full', label: 'Contact', icon: '💥' },
  { id: 'non', label: 'Non-Contact', icon: '🤝' },
];

const TICKER_MATCHES = [
  { t1: 'IND', s1: '287/4', t2: 'AUS', s2: '152/3', status: 'LIVE', color: 'text-red-500 bg-red-500/15' },
  { t1: 'MUN', s1: '2', t2: 'ARS', s2: '1', status: 'FT', color: 'text-gray-400 bg-gray-400/15' },
  { t1: 'LAL', s1: '108', t2: 'GSW', s2: '102', status: 'Q4', color: 'text-emerald-500 bg-emerald-500/15' },
  { t1: 'VER', s1: 'P1', t2: 'NOR', s2: 'P2', status: 'QUAL', color: 'text-blue-400 bg-blue-400/15' },
];

/* SVG Icons */
const SearchIcon = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
);
const ChevronIcon = ({ open }) => (
  <svg className={`w-4 h-4 text-gray-400 transition-transform ${open ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
);

export default function HomePage() {
  usePageTitle(null);
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [cat, setCat] = useState('all');
  const [type, setType] = useState('all');
  const [openFaq, setOpenFaq] = useState(null);
  const [sportFilter, setSportFilter] = useState('All');

  const featured = useMemo(() => FEATURED_IDS.map(id => sports.find(s => s.id === id)).filter(Boolean), []);
  const topSport = useMemo(() => sports.find(s => s.id === 'cricket'), []);

  const upcomingEvents = useMemo(() => {
    const now = new Date();
    return events.filter(ev => new Date(ev.end || ev.date) >= now)
      .sort((a, b) => new Date(a.date) - new Date(b.date)).slice(0, 4);
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
    <div className="min-h-screen" style={{ background: '#F5F7F9' }}>

      {/* ═══ 1. LIVE TICKER (ESPN-style dark bar) ═══ */}
      <div className="bg-[#121217] overflow-x-auto scrollbar-none">
        <div className="max-w-7xl mx-auto px-4 h-9 flex items-center gap-0">
          {TICKER_MATCHES.map((m, i) => (
            <div key={i} className="flex items-center gap-3 shrink-0 px-5">
              {i > 0 && <div className="absolute -ml-5 w-px h-5 bg-gray-700" />}
              <span className="text-[11px] font-bold text-white">{m.t1}</span>
              <span className="text-[11px] text-gray-400 font-medium">{m.s1}</span>
              <span className="text-[11px] text-gray-600">v</span>
              <span className="text-[11px] font-bold text-white">{m.t2}</span>
              <span className="text-[11px] text-gray-400 font-medium">{m.s2}</span>
              <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${m.color}`}>{m.status}</span>
            </div>
          ))}
          <button className="ml-auto shrink-0 text-[11px] font-semibold text-emerald-500 hover:text-emerald-400 pr-2">
            All scores →
          </button>
        </div>
      </div>

      {/* ═══ 2. HERO — immersive gradient with floating sport images ═══ */}
      <section className="relative overflow-hidden">
        {/* Gradient mesh background */}
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 via-white to-sky-50" />
        {/* Decorative blurred shapes */}
        <div className="absolute top-10 left-[10%] w-72 h-72 bg-emerald-200/30 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-[5%] w-96 h-96 bg-blue-200/20 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-violet-100/15 rounded-full blur-3xl" />
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle, #000 1px, transparent 1px)', backgroundSize: '32px 32px' }} />

        <div className="relative max-w-4xl mx-auto px-6 pt-20 md:pt-28 pb-24 text-center">
          {/* Floating sport circles — top row */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.6 }}
            className="flex justify-center gap-4 md:gap-6 mb-10">
            {TOP_FIVE.map((id, i) => {
              const s = sports.find(sp => sp.id === id);
              if (!s) return null;
              return (
                <div key={id} onClick={() => navigate('/sports/' + id)}
                  className="group cursor-pointer flex flex-col items-center gap-2">
                  <div className="w-14 h-14 md:w-[72px] md:h-[72px] rounded-full overflow-hidden border-[3px] border-white shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-300"
                    style={{ boxShadow: `0 4px 20px ${s.c}30` }}>
                    {images[id] ? (
                      <img src={images[id]} alt={s.n} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-2xl" style={{ background: s.c + '20' }}>{s.i}</div>
                    )}
                  </div>
                  <span className="text-[11px] font-bold text-gray-500 group-hover:text-gray-900 transition-colors">{s.n.split(' ')[0]}</span>
                </div>
              );
            })}
          </motion.div>

          {/* Main heading */}
          <motion.h1 initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.5 }}
            className="font-[Outfit] text-[42px] md:text-[56px] font-black tracking-[-0.03em] text-gray-900 leading-[1.05]">
            Learn the rules of<br />
            <span className="relative">
              <span className="relative z-10 bg-gradient-to-r from-emerald-500 to-teal-500 bg-clip-text text-transparent">any sport</span>
              <span className="absolute bottom-1 left-0 right-0 h-3 md:h-4 bg-emerald-200/40 rounded-sm -z-0" />
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.35 }}
            className="mt-5 text-gray-500 text-base md:text-lg max-w-xl mx-auto leading-relaxed">
            The free encyclopedia of sports rules — explained simply, beautifully, and with AI.
          </motion.p>

          {/* Search bar */}
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }}
            className="mt-8 max-w-2xl mx-auto relative">
            <input value={search} onChange={e => setSearch(e.target.value)}
              placeholder="Search any sport, rule, or term..."
              className="w-full py-4 pl-14 pr-6 rounded-2xl bg-white border-2 border-gray-200 text-base text-gray-900 shadow-lg outline-none transition-all duration-200 focus:border-emerald-400 focus:shadow-[0_8px_30px_rgba(16,185,129,0.15)] placeholder:text-gray-400 font-[Outfit]"
            />
            <SearchIcon className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          </motion.div>

          {/* Stats bar */}
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}
            className="mt-8 inline-flex items-center gap-6 md:gap-8 bg-white/70 backdrop-blur-sm border border-gray-200/80 rounded-2xl px-8 py-4 shadow-sm">
            {[
              { icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/></svg>, val: `${sports.length}`, label: 'Sports' },
              { icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 016.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z"/></svg>, val: `${glossary.length}+`, label: 'Terms' },
              { icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2C6.48 2 2 6 2 10.5C2 13.8 4.46 16.54 8 17.6V22l4-3c5.52 0 10-4 10-8.5C22 6 17.52 2 12 2z"/></svg>, val: 'AI', label: 'Powered' },
            ].map(s => (
              <div key={s.label} className="flex items-center gap-2.5">
                <span className="text-emerald-500">{s.icon}</span>
                <div className="text-left">
                  <div className="text-lg font-extrabold text-gray-900 font-[Outfit] leading-none">{s.val}</div>
                  <div className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider">{s.label}</div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══ 3. THREE-COLUMN LAYOUT (ESPN meets Wikipedia) ═══ */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px_260px] gap-6">

          {/* LEFT: Featured Articles */}
          <div className="space-y-4">
            {/* Hero article */}
            <div onClick={() => navigate('/sports/cricket')}
              className="relative rounded-2xl overflow-hidden cursor-pointer group h-[340px] bg-gray-200">
              {images.cricket && (
                <img src={images.cricket} alt="Cricket" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <span className="inline-block px-2.5 py-1 rounded text-[10px] font-bold text-white bg-emerald-500 uppercase tracking-wide mb-3">Cricket</span>
                <h2 className="font-[Outfit] text-xl md:text-2xl font-bold text-white leading-snug">
                  ICC Cricket World Cup 2026:<br />Everything You Need to Know
                </h2>
                <p className="text-gray-300 text-xs mt-2">Complete guide · Rules · Format · Schedule · Teams</p>
              </div>
            </div>

            {/* Two smaller cards */}
            <div className="grid grid-cols-2 gap-4">
              {[
                { id: 'football', tag: 'FOOTBALL', title: 'Offside Rule Explained: The Complete Visual Guide', color: 'bg-blue-500' },
                { id: 'basketball', tag: 'NBA', title: 'Shot Clock, Fouls & Violations: NBA Rules Decoded', color: 'bg-orange-500' },
              ].map(c => (
                <div key={c.id} onClick={() => navigate('/sports/' + c.id)}
                  className="relative rounded-xl overflow-hidden cursor-pointer group h-[180px] bg-gray-200">
                  {images[c.id] && (
                    <img src={images[c.id]} alt={c.tag} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <span className={`inline-block px-2 py-0.5 rounded text-[9px] font-bold text-white ${c.color} uppercase tracking-wide mb-2`}>{c.tag}</span>
                    <h3 className="font-[Outfit] text-sm font-bold text-white leading-snug">{c.title}</h3>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CENTER: Knowledge Panel */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-md overflow-hidden self-start">
            {/* Header */}
            <div className="bg-gradient-to-br from-emerald-500 via-emerald-600 to-teal-600 px-6 py-6 flex items-center justify-between relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
              <div className="absolute bottom-0 left-0 w-20 h-20 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/3" />
              <div className="flex items-center gap-4 relative z-10">
                <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur flex items-center justify-center">
                  <span className="text-3xl">{topSport?.i || '🏏'}</span>
                </div>
                <div>
                  <h3 className="text-white font-[Outfit] font-extrabold text-lg leading-tight">{topSport?.n || 'Cricket'}</h3>
                  <span className="text-emerald-100 text-xs font-medium">Quick Facts</span>
                </div>
              </div>
              <span className="relative z-10 text-white/90 text-[11px] font-bold bg-white/20 backdrop-blur px-3 py-1.5 rounded-lg">ICC</span>
            </div>

            {/* Key stats row */}
            <div className="grid grid-cols-3 divide-x divide-gray-100 border-b border-gray-100">
              {[
                { icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="4"/><path d="M20 21c0-4.42-3.58-8-8-8s-8 3.58-8 8"/></svg>, val: '11', label: 'Players' },
                { icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>, val: '3h–5d', label: 'Duration' },
                { icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 00-4-4H6a4 4 0 00-4-4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></svg>, val: '2.5B', label: 'Fans' },
              ].map(s => (
                <div key={s.label} className="flex flex-col items-center py-6 gap-2">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-500">{s.icon}</div>
                  <span className="text-xl font-extrabold text-gray-900 font-[Outfit] leading-none">{s.val}</span>
                  <span className="text-[10px] text-gray-400 font-semibold uppercase tracking-widest">{s.label}</span>
                </div>
              ))}
            </div>

            {/* Formats section */}
            <div className="px-6 pt-6 pb-5">
              <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">Formats</div>
              <div className="flex flex-wrap gap-2.5">
                {[
                  { label: 'Test', color: 'bg-red-50 text-red-600 border-red-200' },
                  { label: 'ODI', color: 'bg-blue-50 text-blue-600 border-blue-200' },
                  { label: 'T20', color: 'bg-amber-50 text-amber-700 border-amber-200' },
                ].map(c => (
                  <span key={c.label} className={`${c.color} border px-4 py-2 rounded-xl text-xs font-bold`}>{c.label}</span>
                ))}
              </div>
            </div>

            {/* Tags section */}
            <div className="px-6 pb-5">
              <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">About</div>
              <div className="flex flex-wrap gap-2">
                {[
                  { label: 'Olympics 2028', icon: '🥇' },
                  { label: 'Non-contact', icon: '🤝' },
                  { label: 'Bat & Ball', icon: '🏏' },
                  { label: 'England Origin', icon: '🏴󠁧󠁢󠁥󠁮󠁧󠁿' },
                ].map(t => (
                  <span key={t.label} className="bg-gray-50 border border-gray-100 px-3 py-1.5 rounded-lg text-[11px] font-semibold text-gray-600 flex items-center gap-1.5">
                    <span className="text-sm">{t.icon}</span>{t.label}
                  </span>
                ))}
              </div>
            </div>

            {/* Events highlight */}
            <div className="mx-6 mb-5 bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 border border-amber-200/60 rounded-2xl px-5 py-4 flex items-center gap-4">
              <div className="w-11 h-11 rounded-xl bg-amber-100 flex items-center justify-center shrink-0">
                <span className="text-xl">🏆</span>
              </div>
              <div>
                <div className="text-sm font-bold text-gray-900 font-[Outfit]">World Cup · IPL · Ashes</div>
                <div className="text-[11px] text-gray-500 mt-0.5">Top 3 global cricket events</div>
              </div>
            </div>

            {/* CTA */}
            <div className="px-6 pb-6">
              <button onClick={() => navigate('/sports/cricket')}
                className="w-full py-3.5 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 transition-all shadow-md hover:shadow-lg cursor-pointer border-none font-[Outfit]">
                Explore Cricket Rules →
              </button>
            </div>
          </div>

          {/* RIGHT: Trending Sidebar (ESPN headline list) */}
          <div className="hidden lg:block self-start">
            <h3 className="text-base font-bold text-gray-900 mb-1">Trending</h3>
            <div className="w-10 h-0.5 bg-emerald-500 mb-4" />
            <div className="space-y-0">
              {trending.slice(0, 10).map((tr, i) => (
                <div key={tr.id} onClick={() => navigate('/search')}
                  className="flex gap-2.5 py-3 border-b border-gray-100 last:border-0 cursor-pointer group">
                  <span className="text-[11px] font-bold text-gray-300 mt-0.5 w-5 shrink-0">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div>
                    <div className="text-[13px] font-semibold text-gray-700 group-hover:text-emerald-600 transition-colors leading-snug">{tr.q}</div>
                    <div className="text-[11px] text-gray-400 mt-0.5">{tr.vol} searches</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Section divider */}
      <div className="max-w-7xl mx-auto px-8"><div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" /></div>

      {/* ═══ 4. QUICK ACTIONS ═══ */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 py-20">
        <div className="flex items-center gap-3 mb-10">
          <div className="w-1.5 h-7 rounded-full bg-gradient-to-b from-emerald-500 to-blue-500" />
          <h2 className="font-[Outfit] text-2xl font-extrabold text-gray-900">Quick actions</h2>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-6 gap-5">
          {ACTIONS.map(a => (
            <div key={a.path} onClick={() => navigate(a.path)}
              className="group relative bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1.5 cursor-pointer transition-all duration-300 overflow-hidden">
              {/* Icon area */}
              <div className={`flex items-center justify-center py-10 bg-gradient-to-br ${a.gradient} relative`}>
                {/* Decorative circles */}
                <div className="absolute top-0 right-0 w-16 h-16 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/3" />
                <div className="absolute bottom-0 left-0 w-10 h-10 bg-white/10 rounded-full translate-y-1/3 -translate-x-1/4" />
                {/* Icon */}
                <div className="relative z-10 group-hover:scale-110 transition-transform duration-300">
                  {a.icon}
                </div>
                {/* Hover arrow */}
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/></svg>
                </div>
              </div>
              {/* Text content */}
              <div className="px-4 py-5">
                <div className="text-base font-bold text-gray-900 font-[Outfit]">{a.title}</div>
                <div className="text-xs text-gray-400 mt-1.5 font-medium leading-relaxed">{a.sub}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Section divider */}
      <div className="max-w-7xl mx-auto px-8"><div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" /></div>

      {/* ═══ 5. BROWSE ALL SPORTS ═══ */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 py-20">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="w-1.5 h-7 rounded-full bg-gradient-to-b from-blue-500 to-purple-500" />
            <h2 className="font-[Outfit] text-2xl font-extrabold text-gray-900">Browse all sports</h2>
          </div>
          <span className="text-sm font-bold text-emerald-600 hover:text-emerald-700 cursor-pointer transition-colors">All {sports.length} sports →</span>
        </div>

        {/* Category tabs — large pills with emojis */}
        <div className="flex gap-2.5 overflow-x-auto scrollbar-none pb-4 -mx-1 px-1">
          <button onClick={() => setCat('all')}
            className={`shrink-0 flex items-center gap-2 px-5 py-3 rounded-2xl text-sm font-bold transition-all border ${cat === 'all' ? 'bg-gray-900 text-white border-gray-900 shadow-lg' : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300 hover:shadow-sm'}`}>
            <span className="text-base">🌐</span> All <span className={`text-xs font-semibold ${cat === 'all' ? 'text-gray-400' : 'text-gray-400'}`}>({sports.length})</span>
          </button>
          {categories.map(c => catCounts[c.id] > 0 && (
            <button key={c.id} onClick={() => setCat(c.id)}
              className={`shrink-0 flex items-center gap-2 px-5 py-3 rounded-2xl text-sm font-bold transition-all border ${cat === c.id ? 'bg-gray-900 text-white border-gray-900 shadow-lg' : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300 hover:shadow-sm'}`}>
              <span className="text-base">{c.e}</span> {c.n}
            </button>
          ))}
        </div>

        {/* Type filters */}
        <div className="flex gap-2.5 pb-8">
          {TYPE_FILTERS.map(f => (
            <button key={f.id} onClick={() => setType(f.id)}
              className={`flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-sm font-bold transition-all border ${type === f.id ? 'bg-gray-900 text-white border-gray-900 shadow-md' : 'bg-white text-gray-500 border-gray-200 hover:border-gray-300 hover:shadow-sm'}`}>
              <span className="text-sm">{f.icon}</span> {f.label}
            </button>
          ))}
        </div>

        {/* Grid */}
        <AnimatePresence mode="wait">
          <motion.div key={cat + type + search}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.15 }}
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5">
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

      {/* Section divider */}
      <div className="max-w-7xl mx-auto px-8"><div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" /></div>

      {/* ═══ 6. PEOPLE ALSO ASK (Google pattern) ═══ */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 py-20">
        <div className="flex items-center gap-3 mb-10">
          <div className="w-1.5 h-7 rounded-full bg-gradient-to-b from-amber-400 to-orange-500" />
          <h2 className="font-[Outfit] text-2xl font-extrabold text-gray-900">People also ask</h2>
        </div>
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden divide-y divide-gray-100">
          {FAQ.map((f, i) => (
            <div key={i}>
              <button onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-gray-50 transition-colors">
                <span className="text-sm font-medium text-gray-700 pr-4">{f.q}</span>
                <ChevronIcon open={openFaq === i} />
              </button>
              {openFaq === i && (
                <div className="px-5 pb-4 text-sm text-gray-500 leading-relaxed">{f.a}</div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Section divider */}
      <div className="max-w-7xl mx-auto px-8"><div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" /></div>

      {/* ═══ 7. UPCOMING EVENTS ═══ */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 py-20">
        <div className="flex items-center justify-between mb-10">
          <div className="flex items-center gap-3">
            <div className="w-1.5 h-7 rounded-full bg-gradient-to-b from-rose-400 to-red-500" />
            <h2 className="font-[Outfit] text-2xl font-extrabold text-gray-900">Upcoming events</h2>
          </div>
          <button onClick={() => navigate('/events/wc26')} className="text-sm font-bold text-emerald-600 hover:text-emerald-700 transition-colors">Full calendar →</button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
          {upcomingEvents.map(ev => {
            const now = new Date(), start = new Date(ev.date), end = new Date(ev.end);
            const isLive = now >= start && now <= end;
            return (
              <div key={ev.id} onClick={() => ev.id === 'wc26' ? navigate('/worldcup') : navigate('/events/' + ev.id)}
                className="group flex items-center gap-4 p-5 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg hover:-translate-y-0.5 cursor-pointer transition-all duration-200">
                <div className="w-12 h-12 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center text-xl shrink-0">{ev.e}</div>
                <div className="min-w-0">
                  <div className="text-[13px] font-bold text-gray-900 truncate group-hover:text-emerald-600 transition-colors">{ev.n}</div>
                  <div className="text-[11px] text-gray-500 mt-0.5">
                    {isLive && <span className="text-red-500 font-bold mr-1">● Live</span>}
                    {!isLive && start.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}
                    {' · '}{ev.loc}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ═══ 8. FOOTER ═══ */}
      <footer className="bg-[#121217] text-white mt-0">
        <div className="max-w-7xl mx-auto px-6 md:px-8 py-14 md:py-16">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-10 pb-10 border-b border-gray-800">
            <div>
              <h2 className="font-[Outfit] text-2xl md:text-3xl font-black tracking-tight leading-tight">
                Don't just watch.<br /><span className="text-emerald-500">Understand the game.</span>
              </h2>
              <p className="mt-2 text-gray-500 text-sm">{sports.length} sports, {glossary.length} terms, quizzes, AI tutor — all free.</p>
            </div>
            <div className="flex gap-3 shrink-0">
              <button onClick={() => navigate('/quiz')}
                className="px-6 py-2.5 rounded-full bg-emerald-500 text-white font-bold text-sm hover:bg-emerald-400 transition-colors">
                Start learning
              </button>
              <button onClick={() => navigate('/search')}
                className="px-6 py-2.5 rounded-full border border-gray-700 text-gray-400 font-semibold text-sm hover:text-white hover:border-gray-500 transition-all">
                Explore
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-y-4 gap-x-8 mb-10 pb-10 border-b border-gray-800">
            {['Glossary', 'Rankings', 'World Cup 2026', 'Quiz & Games', 'AI Tutor', 'Field Diagrams', 'Calculators', 'Events Calendar'].map(l => (
              <button key={l} className="text-left text-sm text-gray-500 hover:text-white transition-colors font-medium">{l}</button>
            ))}
          </div>

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 text-xs text-gray-600">
            <span>© 2026 SportDecoded. All rights reserved.</span>
            <div className="flex gap-6">
              {['Home', 'Sports', 'Privacy', 'Terms'].map(l => (
                <button key={l} className="hover:text-gray-400 transition-colors">{l}</button>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

/* ── Sport Card ── */
function SportCard({ sport: s, onClick }) {
  const [err, setErr] = useState(false);
  const hasImg = images[s.id] && !err;
  return (
    <div onClick={onClick} className="group cursor-pointer">
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden hover:-translate-y-1">
        {/* Image with overlay */}
        <div className="aspect-[4/3] bg-gray-100 overflow-hidden relative">
          {hasImg ? (
            <img src={images[s.id]} alt={s.n} loading="lazy" onError={() => setErr(true)}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
          ) : (
            <div className="w-full h-full flex items-center justify-center"
              style={{ background: `linear-gradient(135deg, ${s.c}20, ${s.c}40)` }}>
              <span className="text-5xl drop-shadow-sm">{s.i}</span>
            </div>
          )}
          {/* Sport emoji badge */}
          {hasImg && (
            <div className="absolute top-3 left-3 w-10 h-10 rounded-xl bg-white/90 backdrop-blur-sm shadow-md flex items-center justify-center">
              <span className="text-xl">{s.i}</span>
            </div>
          )}
          {/* Fan count badge */}
          {s.fans && (
            <div className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-sm text-white text-[10px] font-bold px-2.5 py-1 rounded-lg">
              {s.fans} fans
            </div>
          )}
        </div>
        {/* Info */}
        <div className="p-4">
          <div className="text-base font-bold text-gray-900 group-hover:text-emerald-600 transition-colors truncate font-[Outfit]">{s.n}</div>
          <div className="flex items-center gap-2 mt-1.5">
            <span className="text-xs text-gray-400 font-medium">{s.r ? s.r.length : 0} rules</span>
            {s.oly && <span className="text-[10px] font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full">Olympic</span>}
            {s.tp === 'team' && <span className="text-[10px] font-bold text-blue-500 bg-blue-50 px-2 py-0.5 rounded-full">Team</span>}
          </div>
        </div>
      </div>
    </div>
  );
}
