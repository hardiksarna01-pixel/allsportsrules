import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import SportImg from './SportImg';
import FieldDiagram from './FieldDiagram';
import FactsSection from './FactsSection';
import DiagramCard from './DiagramCard';
import PlayerAvatar from './PlayerAvatar';
import { useProfileContext } from '../../context/ProfileContext';
import { usePageTitle } from '../../hooks/usePageTitle';
import { diagrams } from '../../data/diagrams';
import { positions as POSITIONS } from '../../data/positions';

/* ── animation variants ── */
const fadeSlide = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
  transition: { duration: 0.2 },
};

const staggerContainer = {
  animate: { transition: { staggerChildren: 0.04 } },
};

const staggerItem = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.25 } },
};

export default function SportDetailPage({ sport, onBookmarkToggle }) {
  usePageTitle(sport ? `${sport.n} Rules & Guide` : null);
  const [tab, setTab] = useState('rules');
  const [expandedFaq, setExpandedFaq] = useState({});
  const navigate = useNavigate();
  const { isBookmarked } = useProfileContext();

  if (!sport) return null;

  const sp = sport;
  const sportId = sp.id;
  const c = sp.c || '#6366f1';
  const bookmarked = isBookmarked(sportId);

  /* ── build tabs ── */
  const tabs = [];
  tabs.push({ key: 'rules', label: 'Rules', count: sp.r ? sp.r.length : 0 });
  if (POSITIONS[sportId]) tabs.push({ key: 'positions', label: 'Positions' });
  tabs.push({ key: 'players', label: 'Players', count: sp.p ? sp.p.length : 0 });
  if (sp.f) tabs.push({ key: 'facts', label: 'Facts', count: sp.f.length });
  if (sp.eq) tabs.push({ key: 'equip', label: 'Equipment' });
  if (sp.fd) tabs.push({ key: 'field', label: 'Field' });
  if (sp.sc) tabs.push({ key: 'scoring', label: 'Scoring' });
  if (sp.fmt) tabs.push({ key: 'formats', label: 'Formats' });
  if (sp.hist) tabs.push({ key: 'history', label: 'History' });
  if (sp.off) tabs.push({ key: 'officials', label: 'Officials' });
  if (sp.tac) tabs.push({ key: 'tactics', label: 'Tactics' });
  if (sp.faq) tabs.push({ key: 'faq', label: 'FAQ' });

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: sp.nm || sportId,
          text: `Learn the rules of ${sp.nm || sportId} on SportDecoded!`,
          url: window.location.href,
        });
      } catch (_) {
        /* user cancelled */
      }
    }
  };

  /* ── render tab content ── */
  const renderContent = () => {
    switch (tab) {
      /* ───── RULES ───── */
      case 'rules': {
        const d = diagrams[sportId];
        return (
          <motion.div className="space-y-3" variants={staggerContainer} initial="initial" animate="animate">
            {d && (
              <motion.div variants={staggerItem}>
                <DiagramCard d={d} />
              </motion.div>
            )}
            {(sp.r || []).map((rule, i) => (
              <motion.div
                key={i}
                variants={staggerItem}
                className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 flex gap-3 items-start"
              >
                <span
                  className="shrink-0 w-8 h-8 rounded-xl flex items-center justify-center text-xs font-extrabold"
                  style={{ background: c + '18', color: c }}
                >
                  {i + 1}
                </span>
                <span className="text-sm md:text-base text-gray-700 leading-relaxed font-medium">
                  {rule}
                </span>
              </motion.div>
            ))}
          </motion.div>
        );
      }

      /* ───── POSITIONS ───── */
      case 'positions': {
        const posData = POSITIONS[sportId];
        if (!posData) return null;
        return (
          <motion.div className="space-y-3" variants={staggerContainer} initial="initial" animate="animate">
            <motion.div variants={staggerItem}>
              <FieldDiagram sportId={sportId} />
            </motion.div>
            {posData.list.map((pos) => (
              <motion.div
                key={pos.id}
                variants={staggerItem}
                className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 flex gap-3 items-center"
              >
                <span
                  className="w-3 h-3 rounded-full shrink-0"
                  style={{ background: posData.color }}
                />
                <div>
                  <div className="text-sm font-bold text-gray-800">{pos.n}</div>
                  <div className="text-xs text-gray-400 mt-0.5">{pos.desc}</div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        );
      }

      /* ───── PLAYERS ───── */
      case 'players':
        return (
          <motion.div className="space-y-3" variants={staggerContainer} initial="initial" animate="animate">
            {(sp.p || []).map((player, i) => (
              <motion.div
                key={i}
                variants={staggerItem}
                onClick={() => navigate('player/' + i)}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 flex gap-3 items-center cursor-pointer hover:shadow-md transition-shadow"
              >
                <PlayerAvatar nm={player.nm} co={player.co} c={c} sz={40} />
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-bold text-gray-800 truncate">{player.nm}</div>
                  {player.nk && (
                    <div className="text-xs text-gray-400 italic truncate">"{player.nk}"</div>
                  )}
                  {player.rl && (
                    <div className="text-xs text-gray-500 mt-0.5">{player.rl}</div>
                  )}
                </div>
                {player.a && (
                  <span className="bg-emerald-50 text-emerald-700 text-[10px] font-bold rounded-full px-2 py-0.5 shrink-0">
                    ACTIVE
                  </span>
                )}
              </motion.div>
            ))}
          </motion.div>
        );

      /* ───── FACTS ───── */
      case 'facts':
        return <FactsSection facts={sp.f} details={sp.fd_details} color={c} />;

      /* ───── EQUIPMENT ───── */
      case 'equip':
        return (
          <motion.div className="space-y-3" variants={staggerContainer} initial="initial" animate="animate">
            {(sp.eq || []).map((item, i) => (
              <motion.div
                key={i}
                variants={staggerItem}
                className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 flex gap-3 items-center"
              >
                <span
                  className="shrink-0 w-8 h-8 rounded-xl flex items-center justify-center text-xs font-extrabold"
                  style={{ background: c + '18', color: c }}
                >
                  {i + 1}
                </span>
                <span className="text-sm text-gray-700 font-semibold">{item}</span>
              </motion.div>
            ))}
          </motion.div>
        );

      /* ───── FIELD ───── */
      case 'field':
        return (
          <div className="space-y-3">
            <div className="rounded-2xl overflow-hidden">
              <SportImg id={sportId} style={{ height: 180, borderRadius: 16 }} />
            </div>
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 text-sm text-gray-700 leading-relaxed">
              {sp.fd}
            </div>
          </div>
        );

      /* ───── SCORING ───── */
      case 'scoring':
        return (
          <motion.div className="space-y-3" variants={staggerContainer} initial="initial" animate="animate">
            {sp.sc && sp.sc.pts && (
              <motion.div variants={staggerItem} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
                <div className="text-[10px] font-extrabold uppercase tracking-wider mb-2" style={{ color: c }}>
                  How Points are Scored
                </div>
                <div className="text-sm text-gray-700 leading-relaxed">{sp.sc.pts}</div>
              </motion.div>
            )}
            {sp.sc && sp.sc.win && (
              <motion.div variants={staggerItem} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
                <div className="text-[10px] font-extrabold uppercase tracking-wider mb-2" style={{ color: c }}>
                  How to Win
                </div>
                <div className="text-sm text-gray-700 leading-relaxed">{sp.sc.win}</div>
              </motion.div>
            )}
          </motion.div>
        );

      /* ───── FORMATS ───── */
      case 'formats':
        return (
          <motion.div className="space-y-3" variants={staggerContainer} initial="initial" animate="animate">
            {(sp.fmt || []).map((fmt, i) => {
              const dash = fmt.indexOf('\u2014');
              const title = dash > -1 ? fmt.slice(0, dash).trim() : fmt;
              const desc = dash > -1 ? fmt.slice(dash + 1).trim() : '';
              return (
                <motion.div
                  key={i}
                  variants={staggerItem}
                  className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5"
                >
                  <div className="text-sm font-bold text-gray-800">{title}</div>
                  {desc && (
                    <div className="text-xs text-gray-500 mt-1.5 leading-relaxed">{desc}</div>
                  )}
                </motion.div>
              );
            })}
          </motion.div>
        );

      /* ───── HISTORY ───── */
      case 'history':
        return (
          <div className="space-y-3">
            <div className="rounded-2xl overflow-hidden">
              <SportImg id={sportId} style={{ height: 160, borderRadius: 16 }} />
            </div>
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 text-sm text-gray-700 leading-relaxed">
              {sp.hist}
            </div>
          </div>
        );

      /* ───── OFFICIALS ───── */
      case 'officials':
        return (
          <motion.div className="space-y-3" variants={staggerContainer} initial="initial" animate="animate">
            {sp.gb && (
              <motion.div
                variants={staggerItem}
                className="rounded-2xl p-4 flex gap-3 items-center"
                style={{ background: c + '10', border: `1.5px solid ${c}30` }}
              >
                <span className="text-2xl">🏛️</span>
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-wider" style={{ color: c }}>
                    Governing Body
                  </div>
                  <div className="text-sm font-bold text-gray-800 mt-0.5">{sp.gb}</div>
                </div>
              </motion.div>
            )}
            {(sp.off || []).map((official, i) => (
              <motion.div
                key={i}
                variants={staggerItem}
                className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 flex gap-3 items-center"
              >
                <span className="text-lg">👨‍⚖️</span>
                <span className="text-sm font-semibold text-gray-700">{official}</span>
              </motion.div>
            ))}
          </motion.div>
        );

      /* ───── TACTICS ───── */
      case 'tactics':
        return (
          <motion.div className="space-y-3" variants={staggerContainer} initial="initial" animate="animate">
            {(sp.tac || []).map((tac, i) => {
              const sep = tac.indexOf(' \u2014 ');
              const title = sep > -1 ? tac.slice(0, sep).trim() : tac;
              const desc = sep > -1 ? tac.slice(sep + 3).trim() : '';
              return (
                <motion.div
                  key={i}
                  variants={staggerItem}
                  className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5"
                >
                  <div className="text-sm font-bold text-gray-800">{title}</div>
                  {desc && (
                    <div className="text-xs text-gray-500 mt-1.5 leading-relaxed">{desc}</div>
                  )}
                </motion.div>
              );
            })}
          </motion.div>
        );

      /* ───── FAQ ───── */
      case 'faq':
        return (
          <motion.div className="space-y-3" variants={staggerContainer} initial="initial" animate="animate">
            {(sp.faq || []).map((item, i) => {
              const isOpen = expandedFaq[i];
              return (
                <motion.div
                  key={i}
                  variants={staggerItem}
                  className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden"
                >
                  <button
                    onClick={() => setExpandedFaq((prev) => ({ ...prev, [i]: !prev[i] }))}
                    className="w-full p-4 flex gap-2 items-center text-left"
                  >
                    <span className="text-[10px] font-extrabold shrink-0" style={{ color: c }}>Q</span>
                    <span className="text-sm font-bold text-gray-800 flex-1">{item.q}</span>
                    <motion.span
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                      className="text-gray-400 text-xs shrink-0"
                    >
                      ▼
                    </motion.span>
                  </button>
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <div className="px-4 pb-4 pl-8 text-xs text-gray-500 leading-relaxed">
                          {item.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </motion.div>
        );

      default:
        return null;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="pb-20"
    >
      {/* ── HERO ── */}
      <div className="relative h-48 md:h-72 overflow-hidden rounded-b-3xl">
        <SportImg
          id={sportId}
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />
        {/* gradient overlay */}
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(180deg, rgba(0,0,0,0.15) 0%, ${c}dd 100%)`,
          }}
        />

        {/* back button */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => navigate('/')}
          className="absolute top-4 left-4 w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white text-lg border border-white/20 cursor-pointer"
        >
          ←
        </motion.button>

        {/* bookmark + share */}
        <div className="absolute top-4 right-4 flex gap-2">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => onBookmarkToggle && onBookmarkToggle(sportId)}
            className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-lg border border-white/20 cursor-pointer"
          >
            {bookmarked ? '\uD83D\uDCCC' : '\uD83D\uDD16'}
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleShare}
            className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-lg border border-white/20 cursor-pointer"
          >
            📤
          </motion.button>
        </div>

        {/* hero content overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.4 }}
          >
            <span className="text-3xl md:text-4xl">{sp.emoji || ''}</span>
            <h1 className="font-[Outfit] font-black text-white text-2xl md:text-4xl mt-1 leading-tight">
              {sp.nm || sportId}
            </h1>
            <div className="flex gap-2 items-center mt-2 flex-wrap">
              {sp.fc && (
                <span className="text-xs text-white/80 font-semibold">
                  👥 {sp.fc} fans
                </span>
              )}
              {sp.ol && (
                <span className="rounded-full px-2.5 py-0.5 text-[10px] font-bold bg-amber-400/25 text-amber-300">
                  🏅 OLYMPIC
                </span>
              )}
            </div>
            <div className="flex gap-1.5 mt-2.5 flex-wrap">
              {sp.ty && (
                <span className="rounded-full px-2.5 py-0.5 text-[10px] font-bold bg-white/20 text-white backdrop-blur-sm">
                  {sp.ty === 'team' ? 'TEAM' : sp.ty === 'individual' ? 'INDIVIDUAL' : 'BOTH'}
                </span>
              )}
              {sp.ct && (
                <span className="rounded-full px-2.5 py-0.5 text-[10px] font-bold bg-white/20 text-white backdrop-blur-sm">
                  {sp.ct === 'full' ? 'FULL CONTACT' : sp.ct === 'limited' ? 'LIMITED CONTACT' : 'NON-CONTACT'}
                </span>
              )}
              {sp.gb && (
                <span className="rounded-full px-2.5 py-0.5 text-[10px] font-bold bg-white/20 text-white backdrop-blur-sm">
                  {sp.gb}
                </span>
              )}
            </div>
          </motion.div>
        </div>
      </div>

      {/* ── BIRTHDAY ALERT ── */}
      {sp.bd && sp.bd.length > 0 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mx-4 mt-3 bg-yellow-50 border border-yellow-300 rounded-2xl p-4 flex gap-3 items-center"
        >
          <span className="text-2xl animate-bounce">🎂</span>
          <div>
            <div className="text-sm font-bold text-yellow-800">Birthday Alert!</div>
            {sp.bd.map((b, i) => (
              <div key={i} className="text-xs text-yellow-700 mt-0.5">{b}</div>
            ))}
          </div>
        </motion.div>
      )}

      {/* ── COMPARISON CARD ── */}
      {sp.cs && sp.cs.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="mx-4 mt-3 bg-white rounded-2xl border border-gray-100 shadow-sm p-4"
        >
          <div className="text-[10px] font-extrabold uppercase tracking-wider mb-3" style={{ color: c }}>
            Quick Comparisons
          </div>
          {sp.cs.map((row, i) => (
            <div
              key={i}
              className={`flex gap-3 items-start ${i < sp.cs.length - 1 ? 'mb-3 pb-3 border-b border-gray-50' : ''}`}
            >
              <span className="text-base shrink-0">🔄</span>
              <div>
                <div className="text-sm font-bold text-gray-800">{row.map}</div>
                {row.desc && (
                  <div className="text-xs text-gray-400 mt-0.5">{row.desc}</div>
                )}
              </div>
            </div>
          ))}
        </motion.div>
      )}

      {/* ── TAB NAVIGATION ── */}
      <div className="sticky top-14 z-30 bg-white/90 backdrop-blur-lg border-b border-gray-100 mt-3">
        <div className="flex gap-1 overflow-x-auto px-4 py-2 scrollbar-hide" style={{ scrollbarWidth: 'none', WebkitOverflowScrolling: 'touch' }}>
          {tabs.map((t) => {
            const active = tab === t.key;
            return (
              <button
                key={t.key}
                onClick={() => { setTab(t.key); setExpandedFaq({}); }}
                className={`shrink-0 rounded-full px-4 py-1.5 text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 cursor-pointer ${
                  active
                    ? 'bg-gray-900 text-white'
                    : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                }`}
              >
                {t.label}
                {t.count != null && (
                  <span
                    className={`text-[10px] font-extrabold rounded px-1 leading-4 ${
                      active
                        ? 'bg-white/20 text-white'
                        : 'bg-gray-200 text-gray-400'
                    }`}
                  >
                    {t.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* ── TAB CONTENT ── */}
      <div className="px-4 pt-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={tab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {renderContent()}
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
