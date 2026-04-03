import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { h } from '../../constants';
import { usePageTitle } from '../../hooks/usePageTitle';
import { sports } from '../../data/sports';
import { images } from '../../data/images';
import { events } from '../../data/events';
import { categories } from '../../data/categories';
import { trending } from '../../data/trending';
import { fiveMinGuides } from '../../data/fiveMinGuides';
import { whereToWatch } from '../../data/whereToWatch';
import { glossary } from '../../data/glossary';
import Card from '../ui/Card';
import Badge from '../ui/Badge';
import SearchBar from '../ui/SearchBar';

const CATS = categories;

const TYPE_FILTERS = [
  { id: 'all', label: 'All Types' },
  { id: 'team', label: 'Team Sports \u{1F465}' },
  { id: 'individual', label: 'Individual \u{1F9D1}' },
  { id: 'full', label: 'Full Contact \u{1F4A5}' },
  { id: 'non', label: 'Non-Contact \u{1F91D}' },
];

const floatingCards = [
  { emoji: '🏏', name: 'Cricket', dur: 6, delay: 0 },
  { emoji: '⚽', name: 'Football', dur: 7, delay: -1.5 },
  { emoji: '🏀', name: 'Basketball', dur: 5.5, delay: -3 },
  { emoji: '🎾', name: 'Tennis', dur: 8, delay: -0.8 },
  { emoji: '🏎️', name: 'F1', dur: 6.5, delay: -2.2 },
  { emoji: '🏸', name: 'Badminton', dur: 7.5, delay: -4 },
];

const heroKeyframes = `
@keyframes meshFlow{0%{background-position:0% 50%}25%{background-position:50% 100%}50%{background-position:100% 50%}75%{background-position:50% 0%}100%{background-position:0% 50%}}
@keyframes floatA{0%,100%{transform:translateY(0) rotate(0deg)}50%{transform:translateY(-18px) rotate(2.5deg)}}
@keyframes floatB{0%,100%{transform:translateY(-4px) rotate(0deg)}50%{transform:translateY(-24px) rotate(-2deg)}}
@keyframes floatC{0%,100%{transform:translateY(-8px) rotate(1deg)}50%{transform:translateY(-16px) rotate(-1.5deg)}}
@keyframes revealWord{from{opacity:0;transform:translateY(28px);filter:blur(8px)}to{opacity:1;transform:translateY(0);filter:blur(0)}}
@keyframes statPop{from{opacity:0;transform:scale(0.6) translateY(10px)}to{opacity:1;transform:scale(1) translateY(0)}}
@keyframes ctaGlow{0%,100%{box-shadow:0 4px 16px rgba(22,163,74,0.25)}50%{box-shadow:0 8px 40px rgba(22,163,74,0.5)}}
@keyframes scrollBounce{0%,100%{transform:translateY(0);opacity:0.4}50%{transform:translateY(10px);opacity:1}}
@keyframes sparkle{0%{opacity:0;transform:scale(0)}25%{opacity:0.8;transform:scale(1)}100%{opacity:0;transform:translateY(-60px) scale(0.2)}}
@keyframes gradientShift{0%{background-position:0% 50%}50%{background-position:100% 50%}100%{background-position:0% 50%}}
@keyframes pulse{0%,100%{opacity:1}50%{opacity:.5}}
@keyframes bounce{0%,100%{transform:translateY(0)}50%{transform:translateY(-6px)}}
@keyframes fadeInUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
@keyframes shimmer{0%{background-position:-200% center}100%{background-position:200% center}}
`;

function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 768);
  useEffect(() => {
    const handler = () => setIsDesktop(window.innerWidth >= 768);
    window.addEventListener('resize', handler);
    return () => window.removeEventListener('resize', handler);
  }, []);
  return isDesktop;
}

function todayMMDD() {
  const d = new Date();
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  return `${mm}-${dd}`;
}

/* ── Shared style helpers ── */
const glassCard = (isDesktop) => ({
  background: 'rgba(255,255,255,0.72)',
  backdropFilter: 'blur(16px)',
  WebkitBackdropFilter: 'blur(16px)',
  borderRadius: isDesktop ? 20 : 16,
  border: '1px solid rgba(255,255,255,0.6)',
  boxShadow: '0 8px 32px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.04)',
  transition: 'all 0.25s cubic-bezier(.4,0,.2,1)',
});

const sectionTitleStyle = (isDesktop) => ({
  fontSize: isDesktop ? 20 : 16,
  fontWeight: 800,
  margin: isDesktop ? '40px 0 16px' : '28px 0 12px',
  letterSpacing: '-0.01em',
  color: '#1a1a2e',
  ...h,
});

export default function HomePage() {
  usePageTitle(null);
  const navigate = useNavigate();
  const isDesktop = useIsDesktop();
  const [search, setSearch] = useState('');
  const [cat, setCat] = useState('all');
  const [type, setType] = useState('all');

  const today = todayMMDD();

  const birthdays = useMemo(() => {
    const result = [];
    sports.forEach((s) => {
      (s.birthdays || []).forEach((b) => {
        if (b.date === today) result.push({ ...b, sport: s.n, e: s.i });
      });
    });
    return result;
  }, [today]);

  const filtered = useMemo(() => {
    return sports.filter((s) => {
      if (search && !s.n.toLowerCase().includes(search.toLowerCase())) return false;
      if (cat !== 'all' && s.cat !== cat) return false;
      if (type === 'team' && s.tp !== 'team') return false;
      if (type === 'individual' && s.tp !== 'individual') return false;
      if (type === 'full' && s.ct !== 'full') return false;
      if (type === 'non' && s.ct !== 'non') return false;
      return true;
    });
  }, [search, cat, type]);

  const catCounts = useMemo(() => {
    const counts = {};
    CATS.forEach((c) => {
      counts[c.id] = sports.filter((s) => s.cat === c.id).length;
    });
    return counts;
  }, []);

  const chipBase = {
    padding: isDesktop ? '10px 22px' : '8px 16px',
    borderRadius: 28,
    fontSize: isDesktop ? 14 : 12,
    fontWeight: 700,
    border: '1.5px solid #e0dbd3',
    background: 'rgba(255,255,255,0.9)',
    backdropFilter: 'blur(8px)',
    cursor: 'pointer',
    whiteSpace: 'nowrap',
    transition: 'all .25s cubic-bezier(.4,0,.2,1)',
    color: '#444',
    boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
    ...h,
  };

  const chipActive = {
    ...chipBase,
    background: 'linear-gradient(135deg, #2563eb, #7c3aed)',
    color: '#fff',
    border: '1.5px solid transparent',
    boxShadow: '0 6px 20px rgba(37,99,235,0.35)',
  };

  const pageMaxWidth = isDesktop ? 1200 : 600;

  return (
    <div style={{
      padding: isDesktop ? '0 40px 60px' : '0 16px 40px',
      maxWidth: pageMaxWidth,
      margin: '0 auto',
      minHeight: '100vh',
    }}>
      <style>{heroKeyframes}</style>

      {/* ===== HERO SECTION ===== */}
      <div style={{
        textAlign: 'center', position: 'relative', overflow: 'hidden',
        padding: isDesktop ? '72px 40px 56px' : '48px 16px 36px',
        borderRadius: isDesktop ? '0 0 40px 40px' : '0 0 24px 24px',
        margin: isDesktop ? '0 -48px 16px' : '0 -16px 0',
        background: 'linear-gradient(135deg, #ecfdf5 0%, #eff6ff 25%, #faf5ff 50%, #fefce8 75%, #fdf2f8 100%)',
        backgroundSize: '400% 400%', animation: 'meshFlow 20s ease infinite',
      }}>
        {/* Sparkle particles */}
        {Array.from({ length: 14 }).map((_, i) => (
          <div key={`sp${i}`} style={{
            position: 'absolute', borderRadius: '50%', pointerEvents: 'none',
            width: 3 + (i % 4) * 2, height: 3 + (i % 4) * 2,
            background: ['#16a34a', '#2563eb', '#7c3aed', '#f59e0b', '#ec4899'][i % 5],
            opacity: 0, top: `${10 + (i * 7) % 80}%`, left: `${5 + (i * 13) % 90}%`,
            animation: `sparkle ${3 + (i % 3)}s ease-in-out ${i * 0.7}s infinite`,
          }} />
        ))}

        {/* Floating sport cards */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: isDesktop ? 16 : 10, flexWrap: 'wrap', marginBottom: isDesktop ? 32 : 20, position: 'relative', zIndex: 2 }}>
          {floatingCards.map((fc, i) => (
            <div key={fc.name} style={{
              padding: isDesktop ? '10px 18px' : '8px 12px', borderRadius: 14,
              background: 'rgba(255,255,255,.65)', backdropFilter: 'blur(12px)',
              border: '1px solid rgba(255,255,255,.8)', boxShadow: '0 4px 20px rgba(0,0,0,.06)',
              display: 'flex', alignItems: 'center', gap: 6, cursor: 'default',
              animation: `${['floatA', 'floatB', 'floatC'][i % 3]} ${fc.dur}s ease-in-out infinite`,
              animationDelay: `${fc.delay}s`,
              transition: 'transform .2s, box-shadow .2s',
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.1)'; e.currentTarget.style.boxShadow = '0 8px 32px rgba(0,0,0,.12)'; }}
            onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,.06)'; }}
            >
              <span style={{ fontSize: isDesktop ? 24 : 18 }}>{fc.emoji}</span>
              <span style={{ ...h, fontSize: isDesktop ? 12 : 10, fontWeight: 700, color: '#374151' }}>{fc.name}</span>
            </div>
          ))}
        </div>

        {/* Animated title — word-by-word reveal */}
        <div style={{ position: 'relative', zIndex: 2 }}>
          {['Every sport.', 'Every rule.', 'Made fun.'].map((line, i) => (
            <div key={i} style={{
              ...h, fontSize: isDesktop ? 48 : 28, fontWeight: 900, lineHeight: 1.1, letterSpacing: '-0.03em',
              background: 'linear-gradient(135deg, #1a1a2e 15%, #16a34a 40%, #2563eb 65%, #7c3aed 85%)',
              backgroundSize: '300% 300%', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
              animation: `gradientShift 8s ease infinite, revealWord 0.6s ease ${0.2 + i * 0.25}s both`,
              opacity: 0,
            }}>{line}</div>
          ))}
        </div>

        {/* Subtitle */}
        <p style={{ ...h, fontSize: isDesktop ? 15 : 12, color: '#6b7280', marginTop: isDesktop ? 16 : 10, animation: 'revealWord 0.5s ease 1s both', opacity: 0, position: 'relative', zIndex: 2 }}>
          <strong>{sports.length}+ sports</strong> · AI tutor · Interactive quizzes · {glossary.length}+ terms decoded
        </p>

        {/* Stat pills */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: isDesktop ? 16 : 8, marginTop: isDesktop ? 24 : 16, flexWrap: 'wrap', position: 'relative', zIndex: 2 }}>
          {[
            { val: `${sports.length}+`, label: 'Sports', color: '#16a34a' },
            { val: '5K+', label: 'Rules', color: '#2563eb' },
            { val: `${glossary.length}+`, label: 'Terms', color: '#7c3aed' },
            { val: 'AI', label: 'Powered', color: '#ec4899' },
          ].map((s, i) => (
            <div key={s.label} style={{
              padding: isDesktop ? '12px 24px' : '8px 14px', borderRadius: 14,
              background: 'rgba(255,255,255,.7)', backdropFilter: 'blur(12px)',
              border: '1px solid rgba(255,255,255,.8)', textAlign: 'center',
              boxShadow: `0 2px 12px ${s.color}15`,
              animation: `statPop 0.4s ease ${1.2 + i * 0.15}s both`, opacity: 0,
            }}>
              <div style={{ ...h, fontSize: isDesktop ? 24 : 18, fontWeight: 900, color: s.color }}>{s.val}</div>
              <div style={{ ...h, fontSize: isDesktop ? 10 : 8, fontWeight: 700, color: '#8a8380', textTransform: 'uppercase', letterSpacing: 1 }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* CTA Buttons */}
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', marginTop: isDesktop ? 28 : 18, flexWrap: 'wrap', position: 'relative', zIndex: 2 }}>
          <button onClick={() => navigate('/quiz')} style={{
            ...h, padding: isDesktop ? '14px 32px' : '12px 24px', borderRadius: 14,
            background: 'linear-gradient(135deg, #16a34a, #059669)', color: '#fff',
            fontWeight: 800, fontSize: isDesktop ? 15 : 13, border: 'none', cursor: 'pointer',
            animation: 'ctaGlow 3s ease infinite, revealWord 0.4s ease 1.8s both', opacity: 0,
          }}>🧠 Take a Quiz</button>
          <button onClick={() => navigate('/search')} style={{
            ...h, padding: isDesktop ? '14px 32px' : '12px 24px', borderRadius: 14,
            background: 'rgba(255,255,255,.7)', backdropFilter: 'blur(12px)',
            color: '#1a1a2e', fontWeight: 700, fontSize: isDesktop ? 15 : 13,
            border: '1.5px solid rgba(255,255,255,.8)', cursor: 'pointer',
            animation: 'revealWord 0.4s ease 2s both', opacity: 0,
            transition: 'background .2s, transform .15s',
          }}
          onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,.95)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
          onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,.7)'; e.currentTarget.style.transform = ''; }}
          >🔍 Search anything</button>
        </div>

        {/* Scroll indicator */}
        <div style={{ marginTop: isDesktop ? 32 : 20, animation: 'scrollBounce 2s ease infinite', position: 'relative', zIndex: 2 }}>
          <span style={{ fontSize: 20, color: '#d1ccc4' }}>↓</span>
        </div>
      </div>

      {/* ===== EVENTS ===== */}
      <div style={sectionTitleStyle(isDesktop)}>{'\u{1F4C5}'} Upcoming Events</div>
      <div style={{
        display: isDesktop ? 'grid' : 'flex',
        gridTemplateColumns: isDesktop ? 'repeat(3, 1fr)' : undefined,
        gap: isDesktop ? 16 : 12,
        overflowX: isDesktop ? 'visible' : 'auto',
        paddingBottom: isDesktop ? 0 : 8,
        scrollbarWidth: 'none',
      }}>
        {events.map((ev, idx) => {
          const now = new Date();
          const start = new Date(ev.date);
          const end = new Date(ev.end);
          const evColors = [['#2563eb','#7c3aed'],['#16a34a','#0891b2'],['#dc2626','#ea580c'],['#7c3aed','#db2777']];
          const [ec1,ec2] = evColors[idx % evColors.length];
          const isLive = now >= start && now <= end;
          const isWC = ev.id === 'wc26';

          return (
            <div
              key={ev.id}
              onClick={isWC ? () => navigate('/worldcup') : undefined}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = `0 16px 40px ${ec1}40`; }}
              onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = `0 8px 24px ${ec1}30`; }}
              style={{
                minWidth: isDesktop ? 'auto' : 260, flexShrink: 0,
                padding: isDesktop ? 24 : 18, borderRadius: isDesktop ? 20 : 16,
                background: `linear-gradient(135deg, ${ec1}, ${ec2})`,
                color: '#fff', position: 'relative', overflow: 'hidden',
                cursor: isWC ? 'pointer' : 'default',
                transition: 'transform .2s, box-shadow .2s',
                boxShadow: `0 8px 24px ${ec1}30`,
              }}
            >
              <div style={{ position: 'absolute', top: -30, right: -30, width: 100, height: 100, borderRadius: '50%', background: 'rgba(255,255,255,.1)' }} />
              <div style={{ position: 'absolute', bottom: -20, left: -20, width: 70, height: 70, borderRadius: '50%', background: 'rgba(255,255,255,.07)' }} />
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <span style={{ fontSize: isDesktop ? 40 : 32, filter: 'drop-shadow(0 2px 8px rgba(0,0,0,.2))' }}>{ev.e}</span>
                <div>
                  <div style={{ ...h, fontSize: isDesktop ? 18 : 15, fontWeight: 900 }}>{ev.n}</div>
                  <div style={{ ...h, fontSize: isDesktop ? 12 : 10, opacity: .85 }}>{ev.loc}</div>
                </div>
              </div>
              {isLive ? (
                <span style={{ ...h, display: 'inline-block', marginTop: 12, fontSize: 10, fontWeight: 800, color: '#fff', background: 'rgba(255,255,255,.2)', backdropFilter: 'blur(8px)', padding: '4px 12px', borderRadius: 8, animation: 'pulse 1.5s infinite' }}>
                  🔴 LIVE NOW
                </span>
              ) : (
                <div style={{ ...h, fontSize: isDesktop ? 12 : 10, color: 'rgba(255,255,255,.75)', marginTop: 12 }}>
                  {start.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* ===== TRENDING ===== */}
      <div style={sectionTitleStyle(isDesktop)}>{'\u{1F525}'} Trending Searches</div>
      <div style={{
        display: isDesktop ? 'grid' : 'flex',
        gridTemplateColumns: isDesktop ? 'repeat(3, 1fr)' : undefined,
        gap: isDesktop ? 16 : 12,
        overflowX: isDesktop ? 'visible' : 'auto',
        paddingBottom: isDesktop ? 0 : 8,
        scrollbarWidth: 'none',
      }}>
        {trending.map((t, i) => {
          const colors = ['#7c3aed','#2563eb','#dc2626','#ea580c','#16a34a','#0891b2'];
          const cl = colors[i % colors.length];
          return (
            <div key={t.id} style={{
              minWidth: isDesktop ? 'auto' : 200, flexShrink: 0,
              padding: isDesktop ? 22 : 16, borderRadius: isDesktop ? 20 : 16,
              background: `linear-gradient(135deg, ${cl}12, ${cl}06)`,
              border: `1.5px solid ${cl}20`,
              position: 'relative', overflow: 'hidden',
              transition: 'transform .2s, box-shadow .2s', cursor: 'pointer',
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = `0 12px 32px ${cl}18`; }}
            onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = 'none'; }}
            >
              <div style={{ position: 'absolute', top: -20, right: -20, width: 80, height: 80, borderRadius: '50%', background: `${cl}08` }} />
              <div style={{ ...h, fontSize: 11, fontWeight: 800, color: cl, letterSpacing: .5, marginBottom: 6 }}>TRENDING</div>
              <div style={{ ...h, fontSize: isDesktop ? 16 : 14, fontWeight: 700, color: '#1a1a2e', lineHeight: 1.3 }}>"{t.q}"</div>
              <div style={{ ...h, display: 'inline-flex', alignItems: 'center', gap: 4, marginTop: 10, fontSize: 11, fontWeight: 700, color: '#fff', background: cl, padding: '4px 10px', borderRadius: 8 }}>
                🔥 {t.vol} searches
              </div>
            </div>
          );
        })}
      </div>

      {/* ===== 5-MINUTE GUIDES ===== */}
      <div style={sectionTitleStyle(isDesktop)}>{'\u23F1\uFE0F'} 5-Minute Guides</div>
      <div style={{
        display: isDesktop ? 'grid' : 'flex',
        gridTemplateColumns: isDesktop ? 'repeat(3, 1fr)' : undefined,
        gap: isDesktop ? 16 : 12,
        overflowX: isDesktop ? 'visible' : 'auto',
        paddingBottom: isDesktop ? 0 : 8,
        scrollbarWidth: 'none',
      }}>
        {fiveMinGuides.map((g) => {
          const sport = sports.find((s) => s.id === g.sport);
          return (
            <GuideCard
              key={g.id}
              guide={g}
              isDesktop={isDesktop}
              onClick={() => sport && navigate('/sports/' + sport.id)}
            />
          );
        })}
      </div>

      {/* ===== WHERE TO WATCH ===== */}
      <div style={sectionTitleStyle(isDesktop)}>{'\u{1F4FA}'} Where to Watch</div>
      <div style={{
        display: isDesktop ? 'grid' : 'flex',
        gridTemplateColumns: isDesktop ? 'repeat(2, 1fr)' : undefined,
        gap: isDesktop ? 16 : 12,
        overflowX: isDesktop ? 'visible' : 'auto',
        paddingBottom: isDesktop ? 0 : 8,
        scrollbarWidth: 'none',
      }}>
        {whereToWatch.map((w) => {
          const wSport = sports.find((s) => s.id === w.sport);
          const wc = wSport?.c || '#2563eb';
          return (
            <div key={w.sport} style={{
              minWidth: isDesktop ? 'auto' : 260,
              flexShrink: 0,
              borderRadius: isDesktop ? 20 : 16,
              overflow: 'hidden',
              background: `linear-gradient(160deg, ${wc}08, rgba(255,255,255,0.85))`,
              border: '1px solid rgba(255,255,255,0.6)',
              boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
              transition: 'all 0.2s',
            }}>
              {/* Top accent stripe */}
              <div style={{ height: 4, background: `linear-gradient(90deg, ${wc}, ${wc}88)` }} />
              <div style={{ padding: isDesktop ? 20 : 14 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
                  <div style={{
                    width: isDesktop ? 40 : 34,
                    height: isDesktop ? 40 : 34,
                    borderRadius: '50%',
                    background: `${wc}18`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: isDesktop ? 20 : 16,
                  }}>{w.e}</div>
                  <div style={{
                    fontSize: isDesktop ? 16 : 14,
                    fontWeight: 800,
                    color: '#1a1a2e',
                    ...h,
                  }}>{w.n}</div>
                </div>
                {w.regions.map((r) => (
                  <div key={r.r} style={{ marginTop: 10 }}>
                    <div style={{
                      display: 'inline-block',
                      fontSize: isDesktop ? 9 : 8,
                      fontWeight: 800,
                      color: '#fff',
                      background: `${wc}90`,
                      padding: '2px 8px',
                      borderRadius: 4,
                      letterSpacing: '0.06em',
                      textTransform: 'uppercase',
                      marginBottom: 6,
                      ...h,
                    }}>{r.r}</div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5, marginTop: 4 }}>
                      {r.platforms.map((p) => (
                        <span key={p} style={{
                          fontSize: isDesktop ? 11 : 10,
                          fontWeight: 600,
                          color: wc,
                          background: `${wc}12`,
                          border: `1px solid ${wc}25`,
                          padding: '3px 10px',
                          borderRadius: 20,
                          ...h,
                        }}>{p}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* ===== GLOSSARY ===== */}
      <div style={sectionTitleStyle(isDesktop)}>{'\u{1F4D6}'} Glossary</div>
      <div style={{
        display: 'grid',
        gridTemplateColumns: isDesktop ? '1fr 1fr' : '1fr 1fr',
        gap: isDesktop ? 16 : 10,
      }}>
        {glossary.slice(0, isDesktop ? 6 : 4).map((g) => {
          const glossarySportColors = { Football: '#16a34a', Cricket: '#2563eb', Basketball: '#ea580c', Tennis: '#7c3aed', 'Formula 1': '#dc2626', Rugby: '#b91c1c', Pickleball: '#0891b2', MMA: '#9333ea', 'Cricket / Football': '#2563eb' };
          const gc = glossarySportColors[g.sport] || '#7c3aed';
          return (
            <div key={g.id} style={{
              ...glassCard(isDesktop),
              padding: isDesktop ? 20 : 12,
              borderLeft: `4px solid ${gc}`,
              borderRadius: isDesktop ? '4px 20px 20px 4px' : '4px 16px 16px 4px',
              background: `linear-gradient(135deg, ${gc}06, rgba(255,255,255,0.85))`,
              position: 'relative',
              overflow: 'hidden',
            }}>
              <div style={{ position: 'absolute', top: -15, right: -15, width: 60, height: 60, borderRadius: '50%', background: `${gc}08` }} />
              <div style={{
                fontSize: isDesktop ? 17 : 14,
                fontWeight: 900,
                color: '#1a1a2e',
                letterSpacing: '-0.01em',
                ...h,
              }}>{g.term}</div>
              <div style={{
                display: 'inline-block',
                fontSize: isDesktop ? 9 : 8,
                fontWeight: 800,
                color: '#fff',
                background: gc,
                padding: '2px 10px',
                borderRadius: 20,
                marginTop: 6,
                marginBottom: 6,
                letterSpacing: '0.04em',
                textTransform: 'uppercase',
                ...h,
              }}>{g.sport}</div>
              <div style={{
                fontSize: isDesktop ? 12 : 10,
                color: '#555',
                marginTop: 4,
                lineHeight: 1.6,
                ...h,
              }}>
                {g.def.length > (isDesktop ? 120 : 80) ? g.def.slice(0, isDesktop ? 120 : 80) + '...' : g.def}
              </div>
              <div style={{
                marginTop: 10,
                fontSize: isDesktop ? 11 : 10,
                fontWeight: 700,
                color: gc,
                cursor: 'pointer',
                ...h,
              }}>Learn more {'\u2192'}</div>
            </div>
          );
        })}
      </div>
      <div
        onClick={() => navigate('/glossary')}
        style={{
          textAlign: 'center',
          fontSize: isDesktop ? 14 : 12,
          fontWeight: 700,
          color: '#2563eb',
          marginTop: 12,
          cursor: 'pointer',
          padding: '8px 0',
          transition: 'color 0.2s',
          ...h,
        }}
      >
        View all {glossary.length} terms {'\u2192'}
      </div>

      {/* ===== BIRTHDAYS ===== */}
      {birthdays.length > 0 && (
        <>
          <div style={sectionTitleStyle(isDesktop)}>
            <span style={{ animation: 'bounce 1s infinite', display: 'inline-block' }}>{'\u{1F382}'}</span> Born Today
          </div>
          <div style={{
            display: isDesktop ? 'grid' : 'flex',
            gridTemplateColumns: isDesktop ? 'repeat(2, 1fr)' : undefined,
            flexDirection: isDesktop ? undefined : 'column',
            gap: isDesktop ? 16 : 8,
          }}>
            {birthdays.map((b, i) => (
              <div key={i} style={{
                ...glassCard(isDesktop),
                padding: isDesktop ? 20 : 12,
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <span style={{
                    fontSize: isDesktop ? 28 : 22,
                    filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))',
                  }}>{b.e}</span>
                  <div>
                    <div style={{
                      fontSize: isDesktop ? 15 : 13,
                      fontWeight: 800,
                      color: '#1a1a2e',
                      ...h,
                    }}>{b.name}</div>
                    <div style={{
                      fontSize: isDesktop ? 12 : 10,
                      color: '#888',
                      ...h,
                    }}>{b.sport}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* ===== EXPLORE / SEARCH ===== */}
      <div style={{
        ...sectionTitleStyle(isDesktop),
        marginTop: isDesktop ? 48 : 32,
        fontSize: isDesktop ? 24 : 18,
      }}>{'\u{1F50D}'} Explore Sports</div>

      <div style={{
        ...glassCard(isDesktop),
        padding: isDesktop ? 24 : 16,
        marginBottom: 16,
      }}>
        <SearchBar
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder={`Search ${sports.length} sports...`}
        />

        {/* Category Chips */}
        <div style={{
          display: 'flex',
          flexWrap: isDesktop ? 'wrap' : 'nowrap',
          gap: 8,
          marginTop: 16,
          overflowX: isDesktop ? 'visible' : 'auto',
          scrollbarWidth: 'none',
          paddingBottom: isDesktop ? 0 : 4,
        }}>
          <button
            style={cat === 'all' ? chipActive : chipBase}
            onClick={() => setCat('all')}
          >
            All
          </button>
          {CATS.map((c) => (
            <button
              key={c.id}
              style={cat === c.id ? chipActive : chipBase}
              onClick={() => setCat(c.id)}
            >
              {c.e} {c.n} ({catCounts[c.id] || 0})
            </button>
          ))}
        </div>

        {/* Type / Contact Chips */}
        <div style={{
          display: 'flex',
          flexWrap: isDesktop ? 'wrap' : 'nowrap',
          gap: 8,
          marginTop: 10,
          overflowX: isDesktop ? 'visible' : 'auto',
          scrollbarWidth: 'none',
          paddingBottom: isDesktop ? 0 : 4,
        }}>
          {TYPE_FILTERS.map((t) => (
            <button
              key={t.id}
              style={type === t.id ? chipActive : chipBase}
              onClick={() => setType(t.id)}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* ===== SPORT CARDS ===== */}
      <div style={{
        marginTop: 8,
        display: 'grid',
        gridTemplateColumns: isDesktop ? 'repeat(3, 1fr)' : 'repeat(2, 1fr)',
        gap: isDesktop ? 16 : 10,
      }}>
        {filtered.length === 0 && (
          <div style={{
            gridColumn: '1 / -1',
            textAlign: 'center',
            color: '#aaa',
            fontSize: isDesktop ? 15 : 13,
            padding: 32,
            ...h,
          }}>
            No sports match your filters.
          </div>
        )}
        {filtered.map((s) => (
          <SportCard key={s.id} sport={s} isDesktop={isDesktop} onClick={() => navigate('/sports/' + s.id)} />
        ))}
      </div>
    </div>
  );
}

/* ── Guide Card with hover ── */
function GuideCard({ guide: g, isDesktop, onClick }) {
  const [hovered, setHovered] = useState(false);
  const sport = sports.find((s) => s.id === g.sport);
  const sc = sport?.c || '#2563eb';

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        minWidth: isDesktop ? 'auto' : 220,
        padding: isDesktop ? 24 : 16,
        flexShrink: 0,
        cursor: 'pointer',
        borderRadius: isDesktop ? 20 : 16,
        background: `linear-gradient(135deg, ${sc}14, ${sc}08)`,
        border: `1.5px solid ${sc}25`,
        position: 'relative',
        overflow: 'hidden',
        transition: 'all 0.25s cubic-bezier(.4,0,.2,1)',
        transform: hovered ? 'translateY(-5px) scale(1.02)' : 'translateY(0) scale(1)',
        boxShadow: hovered
          ? `0 16px 48px ${sc}30, 0 4px 12px ${sc}18`
          : '0 4px 16px rgba(0,0,0,0.06)',
      }}
    >
      {/* Decorative circle top-right */}
      <div style={{ position: 'absolute', top: -25, right: -25, width: 90, height: 90, borderRadius: '50%', background: `${sc}0a` }} />
      {/* Emoji on gradient circle */}
      <div style={{
        width: isDesktop ? 56 : 46,
        height: isDesktop ? 56 : 46,
        borderRadius: '50%',
        background: `linear-gradient(135deg, ${sc}, ${sc}bb)`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10,
        boxShadow: `0 4px 14px ${sc}40`,
      }}>
        <span style={{ fontSize: isDesktop ? 28 : 22, filter: 'brightness(1.1)' }}>{g.e}</span>
      </div>
      {/* 5 MIN READ pill */}
      <div style={{
        display: 'inline-block',
        fontSize: isDesktop ? 9 : 8,
        fontWeight: 800,
        color: sc,
        background: `${sc}18`,
        padding: '3px 10px',
        borderRadius: 20,
        marginBottom: 8,
        letterSpacing: '0.04em',
        ...h,
      }}>
        5 MIN READ
      </div>
      <div style={{
        fontSize: isDesktop ? 15 : 13,
        fontWeight: 800,
        color: '#1a1a2e',
        lineHeight: 1.2,
        ...h,
      }}>{g.title}</div>
      <div style={{
        fontSize: isDesktop ? 12 : 10,
        color: '#777',
        marginTop: 4,
        lineHeight: 1.4,
        ...h,
      }}>{g.sub}</div>
    </div>
  );
}

/* ── Sport Row Card ── */
function SportCard({ sport: s, isDesktop, onClick }) {
  const [hovered, setHovered] = useState(false);
  const [imgErr, setImgErr] = useState(false);
  const sportColor = s.c || '#2563eb';
  const imgSrc = images[s.id];

  const badges = [];
  if (s.oly) badges.push({ label: 'OLYMPIC', color: '#fff', bg: 'rgba(217,119,6,.85)' });
  if (s.tp === 'team') badges.push({ label: 'TEAM', color: '#fff', bg: 'rgba(37,99,235,.75)' });
  if (s.ct === 'full') badges.push({ label: 'CONTACT', color: '#fff', bg: 'rgba(220,38,38,.75)' });
  if (s.cat === 'trending') badges.push({ label: 'TRENDING', color: '#fff', bg: 'rgba(234,88,12,.85)' });
  if (s.cat === 'esports') badges.push({ label: 'ESPORTS', color: '#fff', bg: 'rgba(124,58,237,.8)' });

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        borderRadius: isDesktop ? 20 : 16,
        overflow: 'hidden',
        cursor: 'pointer',
        transition: 'all .3s cubic-bezier(.34,1.56,.64,1)',
        transform: hovered ? 'translateY(-6px) scale(1.02)' : 'none',
        boxShadow: hovered
          ? `0 20px 50px rgba(0,0,0,.15), 0 0 0 1px ${sportColor}30`
          : '0 4px 20px rgba(0,0,0,.08)',
        position: 'relative',
      }}
    >
      {/* Image / Gradient background */}
      {imgErr || !imgSrc ? (
        <div style={{
          height: isDesktop ? 180 : 140,
          background: `linear-gradient(135deg, ${sportColor}, ${sportColor}cc)`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: isDesktop ? 64 : 48,
          transition: 'transform .4s',
          transform: hovered ? 'scale(1.05)' : 'scale(1)',
        }}>{s.i}</div>
      ) : (
        <div style={{ height: isDesktop ? 180 : 140, overflow: 'hidden' }}>
          <img
            src={imgSrc}
            alt={s.n}
            onError={() => setImgErr(true)}
            style={{
              width: '100%', height: '100%', objectFit: 'cover',
              transition: 'transform .4s',
              transform: hovered ? 'scale(1.08)' : 'scale(1)',
            }}
          />
        </div>
      )}

      {/* Gradient overlay */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
        background: `linear-gradient(to top, ${sportColor}ee 0%, ${sportColor}88 35%, transparent 60%)`,
        pointerEvents: 'none',
      }} />

      {/* Badge row top-right */}
      <div style={{ position: 'absolute', top: 8, right: 8, display: 'flex', gap: 4 }}>
        {badges.map(b => (
          <span key={b.label} style={{
            ...h, fontSize: 7, fontWeight: 800, color: b.color,
            background: b.bg, backdropFilter: 'blur(8px)',
            padding: '3px 7px', borderRadius: 6,
          }}>{b.label}</span>
        ))}
      </div>

      {/* Content overlay bottom */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0,
        padding: isDesktop ? '16px 18px' : '12px 14px',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: isDesktop ? 28 : 22 }}>{s.i}</span>
          <div>
            <div style={{ ...h, fontSize: isDesktop ? 17 : 14, fontWeight: 900, color: '#fff', textShadow: '0 1px 4px rgba(0,0,0,.3)' }}>
              {s.n}
            </div>
            <div style={{ ...h, fontSize: isDesktop ? 11 : 9, color: 'rgba(255,255,255,.85)', marginTop: 1 }}>
              {s.fans} fans · {s.r ? s.r.length : 0} rules
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
