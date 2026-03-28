import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { h } from '../../constants';
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

const orbitEmojis = ['\u{1F3CF}', '\u26BD', '\u{1F3C0}', '\u{1F3BE}', '\u{1F3CE}\uFE0F'];

const heroGradientKeyframes = `
@keyframes gradientShift {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}
@keyframes orbit {
  from { transform: rotate(0deg) translateX(70px) rotate(0deg); }
  to { transform: rotate(360deg) translateX(70px) rotate(-360deg); }
}
@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: .5; }
}
@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-6px); }
}
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
@keyframes shimmer {
  0% { background-position: -200% center; }
  100% { background-position: 200% center; }
}
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
    padding: isDesktop ? '8px 18px' : '6px 14px',
    borderRadius: 24,
    fontSize: isDesktop ? 13 : 11,
    fontWeight: 700,
    border: '1.5px solid #e2ddd5',
    background: 'rgba(255,255,255,0.8)',
    backdropFilter: 'blur(8px)',
    cursor: 'pointer',
    whiteSpace: 'nowrap',
    transition: 'all .2s cubic-bezier(.4,0,.2,1)',
    ...h,
  };

  const chipActive = {
    ...chipBase,
    background: 'linear-gradient(135deg, #1a1a2e, #16213e)',
    color: '#fff',
    border: '1.5px solid #1a1a2e',
    boxShadow: '0 4px 12px rgba(26,26,46,0.3)',
  };

  const pageMaxWidth = isDesktop ? 1200 : 600;

  return (
    <div style={{
      padding: isDesktop ? '0 40px 60px' : '0 16px 40px',
      maxWidth: pageMaxWidth,
      margin: '0 auto',
      minHeight: '100vh',
    }}>
      <style>{heroGradientKeyframes}</style>

      {/* ===== HERO SECTION ===== */}
      <div style={{
        textAlign: 'center',
        padding: isDesktop ? '64px 0 48px' : '48px 0 32px',
        position: 'relative',
        borderRadius: isDesktop ? '0 0 32px 32px' : '0 0 24px 24px',
        margin: isDesktop ? '0 -40px' : '0 -16px',
        marginBottom: isDesktop ? 16 : 0,
        paddingLeft: isDesktop ? 40 : 16,
        paddingRight: isDesktop ? 40 : 16,
        background: 'linear-gradient(135deg, #f0f4ff 0%, #fdf2f8 30%, #fef3c7 60%, #ecfdf5 100%)',
        backgroundSize: '400% 400%',
        animation: 'gradientShift 12s ease infinite',
      }}>
        {/* Orbit animation */}
        <div style={{
          position: 'relative',
          width: isDesktop ? 180 : 160,
          height: isDesktop ? 180 : 160,
          margin: '0 auto 24px',
        }}>
          <span style={{
            fontSize: isDesktop ? 64 : 52,
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%,-50%)',
            filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.1))',
          }}>
            {'\u{1F3DF}\uFE0F'}
          </span>
          {orbitEmojis.map((em, i) => (
            <span
              key={i}
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                fontSize: isDesktop ? 28 : 24,
                animation: `orbit ${8 + i * 0.6}s linear infinite`,
                animationDelay: `${-i * (8 / orbitEmojis.length)}s`,
              }}
            >
              {em}
            </span>
          ))}
        </div>

        <h1 style={{
          fontSize: isDesktop ? 42 : 26,
          fontWeight: 900,
          lineHeight: 1.1,
          letterSpacing: '-0.02em',
          background: 'linear-gradient(135deg, #2563eb, #7c3aed, #ec4899, #f59e0b, #16a34a)',
          backgroundSize: '300% 300%',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          animation: 'gradientShift 6s ease infinite',
          maxWidth: isDesktop ? 600 : 'none',
          margin: '0 auto',
          ...h,
        }}>
          Every sport. Every rule. Made fun.
        </h1>

        {/* Stats row */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: isDesktop ? 32 : 16,
          marginTop: isDesktop ? 24 : 14,
          flexWrap: 'wrap',
        }}>
          {[
            { val: sports.length, label: 'Sports' },
            { val: 'AI', label: 'Tutor' },
            { val: glossary.length + '+', label: 'Terms' },
            { val: events.length, label: 'Events' },
          ].map((stat) => (
            <div key={stat.label} style={{
              ...glassCard(isDesktop),
              padding: isDesktop ? '12px 24px' : '8px 16px',
              textAlign: 'center',
              minWidth: isDesktop ? 100 : 70,
            }}>
              <div style={{
                fontSize: isDesktop ? 22 : 16,
                fontWeight: 900,
                color: '#1a1a2e',
                ...h,
              }}>{stat.val}</div>
              <div style={{
                fontSize: isDesktop ? 11 : 9,
                fontWeight: 600,
                color: '#888',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                ...h,
              }}>{stat.label}</div>
            </div>
          ))}
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
        {events.map((ev) => {
          const now = new Date();
          const start = new Date(ev.date);
          const end = new Date(ev.end);
          const isLive = now >= start && now <= end;
          const isWC = ev.id === 'wc26';

          return (
            <div
              key={ev.id}
              onClick={isWC ? () => navigate('/worldcup') : undefined}
              style={{
                ...glassCard(isDesktop),
                minWidth: isDesktop ? 'auto' : 220,
                padding: isDesktop ? 20 : 14,
                flexShrink: 0,
                cursor: isWC ? 'pointer' : 'default',
                border: isLive
                  ? '2px solid #16a34a'
                  : '1px solid rgba(255,255,255,0.6)',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              {/* Gradient accent top */}
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: 3,
                background: isLive
                  ? 'linear-gradient(90deg, #16a34a, #22d3ee)'
                  : 'linear-gradient(90deg, #2563eb, #7c3aed)',
                borderRadius: '20px 20px 0 0',
              }} />
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                marginTop: 4,
              }}>
                <span style={{
                  fontSize: isDesktop ? 32 : 24,
                  filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))',
                }}>{ev.e}</span>
                <div>
                  <div style={{
                    fontSize: isDesktop ? 15 : 13,
                    fontWeight: 800,
                    color: '#1a1a2e',
                    ...h,
                  }}>{ev.n}</div>
                  <div style={{
                    fontSize: isDesktop ? 12 : 10,
                    color: '#888',
                    ...h,
                  }}>{ev.loc}</div>
                </div>
              </div>
              {isLive && (
                <span style={{
                  display: 'inline-block',
                  marginTop: 10,
                  fontSize: isDesktop ? 10 : 9,
                  fontWeight: 800,
                  color: '#fff',
                  background: 'linear-gradient(135deg, #16a34a, #059669)',
                  padding: '3px 10px',
                  borderRadius: 8,
                  animation: 'pulse 1.5s infinite',
                  ...h,
                }}>
                  {'\u{1F534}'} LIVE NOW
                </span>
              )}
              {!isLive && (
                <div style={{
                  fontSize: isDesktop ? 11 : 10,
                  color: '#aaa',
                  marginTop: 10,
                  ...h,
                }}>
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
        {trending.map((t) => (
          <div key={t.id} style={{
            ...glassCard(isDesktop),
            minWidth: isDesktop ? 'auto' : 180,
            padding: isDesktop ? 20 : 14,
            flexShrink: 0,
          }}>
            <div style={{
              fontSize: isDesktop ? 15 : 13,
              fontWeight: 700,
              color: '#1a1a2e',
              ...h,
            }}>"{t.q}"</div>
            <div style={{
              fontSize: isDesktop ? 12 : 10,
              color: '#888',
              marginTop: 6,
              display: 'flex',
              alignItems: 'center',
              gap: 4,
              ...h,
            }}>
              <span style={{
                display: 'inline-block',
                width: 6,
                height: 6,
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #f59e0b, #ef4444)',
              }} />
              {t.vol} searches
            </div>
          </div>
        ))}
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
        {whereToWatch.map((w) => (
          <div key={w.sport} style={{
            ...glassCard(isDesktop),
            minWidth: isDesktop ? 'auto' : 220,
            padding: isDesktop ? 20 : 14,
            flexShrink: 0,
          }}>
            <div style={{
              fontSize: isDesktop ? 15 : 13,
              fontWeight: 800,
              color: '#1a1a2e',
              marginBottom: 8,
              ...h,
            }}>
              {w.e} {w.n}
            </div>
            {w.regions.map((r) => (
              <div key={r.r} style={{ marginTop: 8 }}>
                <div style={{
                  fontSize: isDesktop ? 10 : 9,
                  fontWeight: 700,
                  color: '#999',
                  textTransform: 'uppercase',
                  letterSpacing: '0.06em',
                  ...h,
                }}>{r.r}</div>
                <div style={{
                  fontSize: isDesktop ? 13 : 11,
                  color: '#444',
                  marginTop: 2,
                  ...h,
                }}>{r.platforms.join(' \u00B7 ')}</div>
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* ===== GLOSSARY ===== */}
      <div style={sectionTitleStyle(isDesktop)}>{'\u{1F4D6}'} Glossary</div>
      <div style={{
        display: 'grid',
        gridTemplateColumns: isDesktop ? '1fr 1fr' : '1fr 1fr',
        gap: isDesktop ? 16 : 10,
      }}>
        {glossary.slice(0, isDesktop ? 6 : 4).map((g) => (
          <div key={g.id} style={{
            ...glassCard(isDesktop),
            padding: isDesktop ? 20 : 12,
          }}>
            <div style={{
              fontSize: isDesktop ? 15 : 13,
              fontWeight: 800,
              color: '#1a1a2e',
              ...h,
            }}>{g.term}</div>
            <div style={{
              fontSize: isDesktop ? 12 : 10,
              color: '#666',
              marginTop: 4,
              lineHeight: 1.5,
              ...h,
            }}>
              {g.def.length > (isDesktop ? 120 : 80) ? g.def.slice(0, isDesktop ? 120 : 80) + '...' : g.def}
            </div>
            <div style={{ marginTop: 8 }}>
              <Badge color="#7c3aed" bg="#f3f0ff">{g.sport}</Badge>
            </div>
          </div>
        ))}
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

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        ...glassCard(isDesktop),
        minWidth: isDesktop ? 'auto' : 200,
        padding: isDesktop ? 24 : 14,
        flexShrink: 0,
        cursor: 'pointer',
        transform: hovered ? 'translateY(-4px) scale(1.02)' : 'translateY(0) scale(1)',
        boxShadow: hovered
          ? '0 16px 48px rgba(0,0,0,0.12), 0 4px 8px rgba(0,0,0,0.06)'
          : '0 8px 32px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.04)',
      }}
    >
      <span style={{ fontSize: isDesktop ? 36 : 28 }}>{g.e}</span>
      <div style={{
        display: 'inline-block',
        fontSize: isDesktop ? 10 : 8,
        fontWeight: 800,
        color: '#2563eb',
        background: 'linear-gradient(135deg, #eff6ff, #e0e7ff)',
        padding: '2px 8px',
        borderRadius: 6,
        marginTop: 8,
        ...h,
      }}>
        {g.tag}
      </div>
      <div style={{
        fontSize: isDesktop ? 15 : 13,
        fontWeight: 800,
        marginTop: 6,
        color: '#1a1a2e',
        ...h,
      }}>{g.title}</div>
      <div style={{
        fontSize: isDesktop ? 12 : 10,
        color: '#888',
        marginTop: 2,
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
