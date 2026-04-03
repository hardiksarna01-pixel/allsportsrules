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
  { title: 'Glossary', sub: '300+ terms', path: '/glossary', accent: '#F59E0B' },
  { title: 'Calculators', sub: 'Stats & tools', path: '/calculators', accent: '#EF4444' },
  { title: 'Diagrams', sub: 'Field positions', path: '/sports/cricket', accent: '#06B6D4' },
];

const FAQ = [
  { q: 'What is the offside rule in football?', a: 'A player is offside if they are nearer to the opponent\'s goal line than both the ball and the second-last opponent when the ball is played to them.' },
  { q: 'How does DRS work in cricket?', a: 'DRS (Decision Review System) allows teams to challenge umpire decisions using ball-tracking technology, Snickometer, and HotSpot.' },
  { q: 'What are the basic rules of basketball?', a: 'Two teams of 5 players score by shooting a ball through the opponent\'s hoop. Games have 4 quarters of 12 minutes (NBA).' },
  { q: 'How does the F1 points system work?', a: 'Points are awarded to the top 10 finishers: 25-18-15-12-10-8-6-4-2-1, with 1 extra point for fastest lap if finishing in the top 10.' },
  { q: 'What is LBW in cricket?', a: 'Leg Before Wicket — a batter is out if the ball would have hit the stumps but was blocked by their body (not the bat).' },
];

const TYPE_FILTERS = [
  { id: 'all', label: 'All' }, { id: 'team', label: 'Team' },
  { id: 'individual', label: 'Individual' }, { id: 'full', label: 'Contact' }, { id: 'non', label: 'Non-Contact' },
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

      {/* ═══ 2. HERO — Google-style centered search ═══ */}
      <section className="max-w-3xl mx-auto px-6 pt-14 md:pt-20 pb-8 text-center">
        <motion.h1 initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
          className="font-[Outfit] text-[40px] md:text-[48px] font-black tracking-[-0.03em] text-gray-900 leading-[1.1]">
          Learn the rules of<br /><span className="text-emerald-500">any sport</span>
        </motion.h1>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
          className="mt-3 text-gray-500 text-[15px]">
          The free encyclopedia of sports rules. {sports.length} sports · {glossary.length}+ terms · AI-powered.
        </motion.p>

        {/* Big search bar — inline styles to prevent CSS override */}
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
          className="mt-7 max-w-2xl mx-auto relative">
          <input value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Search any sport, rule, or term..."
            style={{
              width: '100%',
              padding: '16px 20px 16px 48px',
              borderRadius: '9999px',
              backgroundColor: '#FFFFFF',
              border: '2px solid #D1D5DB',
              fontSize: '16px',
              color: '#111827',
              boxShadow: '0 4px 16px rgba(0,0,0,0.08)',
              outline: 'none',
              transition: 'all 0.2s',
            }}
            onFocus={e => { e.target.style.borderColor = '#10B981'; e.target.style.boxShadow = '0 4px 24px rgba(16,185,129,0.15)'; }}
            onBlur={e => { e.target.style.borderColor = '#D1D5DB'; e.target.style.boxShadow = '0 4px 16px rgba(0,0,0,0.08)'; }}
          />
          <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5" style={{ color: '#6B7280' }} />
        </motion.div>

        {/* Category tabs — large, prominent */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
          className="mt-8 flex gap-3 justify-center flex-wrap">
          {[
            { label: 'All Sports', icon: '🌍' },
            { label: 'Cricket', icon: '🏏' },
            { label: 'Football', icon: '⚽' },
            { label: 'NBA', icon: '🏀' },
            { label: 'F1', icon: '🏎️' },
            { label: 'Tennis', icon: '🎾' },
            { label: 'Rugby', icon: '🏉' },
            { label: 'Rules', icon: '📋' },
            { label: 'Glossary', icon: '📖' },
          ].map(p => (
            <button key={p.label} onClick={() => setSportFilter(p.label)}
              style={{
                padding: '10px 20px',
                borderRadius: '9999px',
                fontSize: '14px',
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                transition: 'all 0.2s',
                border: sportFilter === p.label ? '2px solid #111827' : '2px solid #E5E7EB',
                background: sportFilter === p.label ? '#111827' : '#FFFFFF',
                color: sportFilter === p.label ? '#FFFFFF' : '#374151',
                boxShadow: sportFilter === p.label ? '0 2px 8px rgba(0,0,0,0.15)' : '0 1px 4px rgba(0,0,0,0.05)',
              }}>
              <span style={{ fontSize: '16px' }}>{p.icon}</span>
              {p.label}
            </button>
          ))}
        </motion.div>
      </section>

      {/* ═══ 3. THREE-COLUMN LAYOUT (ESPN meets Wikipedia) ═══ */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 pb-12">
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

          {/* CENTER: Knowledge Panel (Wikipedia-style) */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden self-start">
            <div className="bg-emerald-500 px-4 py-3">
              <h3 className="text-white font-[Outfit] font-bold text-sm">
                {topSport?.n || 'Cricket'} — Quick Facts
              </h3>
            </div>
            <div className="divide-y divide-gray-100">
              {[
                ['Players', '11 per team'],
                ['Type', 'Bat-and-ball, team sport'],
                ['Contact', 'Non-contact'],
                ['Origin', 'England, 16th century'],
                ['Governing body', 'ICC'],
                ['Olympic sport', '2028 (returning)'],
                ['Formats', 'Test, ODI, T20'],
                ['Duration', '3hrs (T20) to 5 days'],
                ['Field', 'Oval, 137m diameter'],
                ['Equipment', 'Bat, ball, stumps, pads'],
                ['Major events', 'World Cup, IPL, Ashes'],
                ['Fans', '2.5 billion worldwide'],
              ].map(([k, v]) => (
                <div key={k} className="flex px-4 py-2.5 text-xs">
                  <span className="text-gray-500 w-28 shrink-0 font-medium">{k}</span>
                  <span className="text-gray-900 font-semibold">{v}</span>
                </div>
              ))}
            </div>
            <div className="p-3">
              <button onClick={() => navigate('/sports/cricket')}
                className="w-full py-2 rounded-lg text-xs font-semibold text-emerald-600 bg-gray-50 hover:bg-emerald-50 transition-colors">
                Read full rules →
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

      {/* ═══ 4. QUICK ACTIONS ═══ */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 py-10">
        <h2 className="font-[Outfit] text-xl font-bold text-gray-900 mb-6">Quick actions</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
          {ACTIONS.map(a => (
            <div key={a.path} onClick={() => navigate(a.path)}
              className="group bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md cursor-pointer transition-all overflow-hidden">
              <div className="h-[3px] w-full" style={{ background: a.accent }} />
              <div className="p-3.5">
                <div className="text-sm font-bold text-gray-900 group-hover:text-emerald-600 transition-colors">{a.title}</div>
                <div className="text-[11px] text-gray-500 mt-0.5">{a.sub}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ═══ 5. BROWSE ALL SPORTS ═══ */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 py-10">
        <div className="flex items-center justify-between mb-5">
          <h2 className="font-[Outfit] text-xl font-bold text-gray-900">Browse all sports</h2>
          <span className="text-sm font-semibold text-emerald-600">All {sports.length} sports →</span>
        </div>

        {/* Category pills */}
        <div className="flex gap-2 overflow-x-auto scrollbar-none pb-3">
          <button onClick={() => setCat('all')}
            className={`shrink-0 px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${cat === 'all' ? 'bg-gray-900 text-white' : 'bg-white text-gray-500 border border-gray-200 hover:bg-gray-50'}`}>
            All ({sports.length})
          </button>
          {categories.map(c => catCounts[c.id] > 0 && (
            <button key={c.id} onClick={() => setCat(c.id)}
              className={`shrink-0 px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${cat === c.id ? 'bg-gray-900 text-white' : 'bg-white text-gray-500 border border-gray-200 hover:bg-gray-50'}`}>
              {c.n}
            </button>
          ))}
        </div>

        {/* Type filters */}
        <div className="flex gap-2 pb-5">
          {TYPE_FILTERS.map(f => (
            <button key={f.id} onClick={() => setType(f.id)}
              className={`px-3 py-1 rounded-full text-[11px] font-semibold transition-all ${type === f.id ? 'bg-gray-900 text-white' : 'text-gray-400 hover:text-gray-600'}`}>
              {f.label}
            </button>
          ))}
        </div>

        {/* Grid */}
        <AnimatePresence mode="wait">
          <motion.div key={cat + type + search}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.15 }}
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
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

      {/* ═══ 6. PEOPLE ALSO ASK (Google pattern) ═══ */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 py-10">
        <h2 className="font-[Outfit] text-xl font-bold text-gray-900 mb-5">People also ask</h2>
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden divide-y divide-gray-100">
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

      {/* ═══ 7. UPCOMING EVENTS ═══ */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 py-10">
        <div className="flex items-center justify-between mb-5">
          <h2 className="font-[Outfit] text-xl font-bold text-gray-900">Upcoming events</h2>
          <button onClick={() => navigate('/events/wc26')} className="text-sm font-semibold text-emerald-600">Full calendar →</button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
          {upcomingEvents.map(ev => {
            const now = new Date(), start = new Date(ev.date), end = new Date(ev.end);
            const isLive = now >= start && now <= end;
            return (
              <div key={ev.id} onClick={() => ev.id === 'wc26' ? navigate('/worldcup') : navigate('/events/' + ev.id)}
                className="group flex items-center gap-3 p-3.5 bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md cursor-pointer transition-all">
                <div className="w-11 h-11 rounded-lg bg-gray-100 flex items-center justify-center text-lg shrink-0">{ev.e}</div>
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
      <footer className="bg-[#121217] text-white mt-8">
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
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-lg transition-shadow overflow-hidden">
        <div className="aspect-[3/2] bg-gray-100 overflow-hidden">
          {hasImg ? (
            <img src={images[s.id]} alt={s.n} loading="lazy" onError={() => setErr(true)}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-2xl font-bold text-gray-300"
              style={{ background: `linear-gradient(135deg, ${s.c}12, ${s.c}25)` }}>
              {s.n.charAt(0)}
            </div>
          )}
        </div>
        <div className="p-3">
          <div className="text-sm font-bold text-gray-900 group-hover:text-emerald-600 transition-colors truncate">{s.n}</div>
          <div className="text-[11px] text-gray-500 mt-0.5">{s.r ? s.r.length : 0} rules · {s.fans}</div>
        </div>
      </div>
    </div>
  );
}
