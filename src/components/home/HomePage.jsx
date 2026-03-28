import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { h } from '../../constants';
import { sports } from '../../data/sports';
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
`;

function todayMMDD() {
  const d = new Date();
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  return `${mm}-${dd}`;
}

export default function HomePage() {
  const navigate = useNavigate();
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

  const scrollRow = {
    display: 'flex',
    gap: 12,
    overflowX: 'auto',
    paddingBottom: 8,
    scrollbarWidth: 'none',
  };

  const sectionTitle = {
    fontSize: 16,
    fontWeight: 800,
    margin: '24px 0 10px',
    ...h,
  };

  const chipBase = {
    padding: '6px 14px',
    borderRadius: 20,
    fontSize: 11,
    fontWeight: 700,
    border: '1.5px solid #e2ddd5',
    background: '#fff',
    cursor: 'pointer',
    whiteSpace: 'nowrap',
    transition: 'all .15s',
    ...h,
  };

  const chipActive = {
    ...chipBase,
    background: '#111',
    color: '#fff',
    border: '1.5px solid #111',
  };

  return (
    <div style={{ padding: '0 0 40px', maxWidth: 600, margin: '0 auto' }}>
      <style>{heroGradientKeyframes}</style>

      {/* ── Hero ── */}
      <div style={{ textAlign: 'center', padding: '48px 0 32px', position: 'relative' }}>
        <div style={{ position: 'relative', width: 160, height: 160, margin: '0 auto 20px' }}>
          <span style={{ fontSize: 52, position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)' }}>
            {'\u{1F3DF}\uFE0F'}
          </span>
          {orbitEmojis.map((em, i) => (
            <span
              key={i}
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                fontSize: 24,
                animation: `orbit ${8 + i * 0.6}s linear infinite`,
                animationDelay: `${-i * (8 / orbitEmojis.length)}s`,
              }}
            >
              {em}
            </span>
          ))}
        </div>

        <h1
          style={{
            fontSize: 28,
            fontWeight: 900,
            lineHeight: 1.15,
            background: 'linear-gradient(135deg, #2563eb, #7c3aed, #ec4899, #f59e0b, #16a34a)',
            backgroundSize: '300% 300%',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            animation: 'gradientShift 6s ease infinite',
            ...h,
          }}
        >
          Every sport. Every rule. Made fun.
        </h1>

        <p style={{ fontSize: 12, color: '#666', marginTop: 8, ...h }}>
          {sports.length} sports &middot; AI tutor &middot; Player profiles &middot; {glossary.length}+ terms
        </p>
      </div>

      {/* ── Events Carousel ── */}
      <div style={sectionTitle}>{'\u{1F4C5}'} Upcoming Events</div>
      <div style={scrollRow}>
        {events.map((ev) => {
          const now = new Date();
          const start = new Date(ev.date);
          const end = new Date(ev.end);
          const isLive = now >= start && now <= end;
          const isWC = ev.id === 'wc26';

          return (
            <Card
              key={ev.id}
              onClick={isWC ? () => navigate('/worldcup') : undefined}
              style={{
                minWidth: 200,
                padding: 14,
                flexShrink: 0,
                border: isLive ? '2px solid #16a34a' : undefined,
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ fontSize: 24 }}>{ev.e}</span>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 800, ...h }}>{ev.n}</div>
                  <div style={{ fontSize: 10, color: '#888', ...h }}>{ev.loc}</div>
                </div>
              </div>
              {isLive && (
                <span
                  style={{
                    display: 'inline-block',
                    marginTop: 6,
                    fontSize: 9,
                    fontWeight: 800,
                    color: '#fff',
                    background: '#16a34a',
                    padding: '2px 8px',
                    borderRadius: 6,
                    animation: 'pulse 1.5s infinite',
                    ...h,
                  }}
                >
                  {'\u{1F534}'} LIVE
                </span>
              )}
              {!isLive && (
                <div style={{ fontSize: 10, color: '#aaa', marginTop: 6, ...h }}>
                  {start.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                </div>
              )}
            </Card>
          );
        })}
      </div>

      {/* ── Trending Searches ── */}
      <div style={sectionTitle}>{'\u{1F525}'} Trending Searches</div>
      <div style={scrollRow}>
        {trending.map((t) => (
          <Card key={t.id} style={{ minWidth: 170, padding: 12, flexShrink: 0 }}>
            <div style={{ fontSize: 12, fontWeight: 600, ...h }}>"{t.q}"</div>
            <div style={{ fontSize: 10, color: '#888', marginTop: 4, ...h }}>
              {'\u{1F4C8}'} {t.vol} searches
            </div>
          </Card>
        ))}
      </div>

      {/* ── 5-Minute Guides ── */}
      <div style={sectionTitle}>{'\u23F1\uFE0F'} 5-Minute Guides</div>
      <div style={scrollRow}>
        {fiveMinGuides.map((g) => {
          const sport = sports.find((s) => s.id === g.sport);
          return (
            <Card
              key={g.id}
              onClick={() => sport && navigate('/sports/' + sport.id)}
              style={{ minWidth: 180, padding: 14, flexShrink: 0 }}
            >
              <span style={{ fontSize: 28 }}>{g.e}</span>
              <div
                style={{
                  display: 'inline-block',
                  fontSize: 8,
                  fontWeight: 800,
                  color: '#2563eb',
                  background: '#eff6ff',
                  padding: '1px 6px',
                  borderRadius: 4,
                  marginTop: 6,
                  ...h,
                }}
              >
                {g.tag}
              </div>
              <div style={{ fontSize: 13, fontWeight: 800, marginTop: 4, ...h }}>{g.title}</div>
              <div style={{ fontSize: 10, color: '#888', ...h }}>{g.sub}</div>
            </Card>
          );
        })}
      </div>

      {/* ── Where to Watch ── */}
      <div style={sectionTitle}>{'\u{1F4FA}'} Where to Watch</div>
      <div style={scrollRow}>
        {whereToWatch.map((w) => (
          <Card key={w.sport} style={{ minWidth: 200, padding: 14, flexShrink: 0 }}>
            <div style={{ fontSize: 12, fontWeight: 800, ...h }}>
              {w.e} {w.n}
            </div>
            {w.regions.map((r) => (
              <div key={r.r} style={{ marginTop: 6 }}>
                <div style={{ fontSize: 9, fontWeight: 700, color: '#888', textTransform: 'uppercase', ...h }}>{r.r}</div>
                <div style={{ fontSize: 11, color: '#333', ...h }}>{r.platforms.join(' \u00B7 ')}</div>
              </div>
            ))}
          </Card>
        ))}
      </div>

      {/* ── Glossary Preview ── */}
      <div style={sectionTitle}>{'\u{1F4D6}'} Glossary</div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
        {glossary.slice(0, 4).map((g) => (
          <Card key={g.id} style={{ padding: 12 }}>
            <div style={{ fontSize: 13, fontWeight: 800, ...h }}>{g.term}</div>
            <div style={{ fontSize: 10, color: '#666', marginTop: 2, lineHeight: 1.4, ...h }}>
              {g.def.length > 80 ? g.def.slice(0, 80) + '...' : g.def}
            </div>
            <Badge color="#7c3aed" bg="#f3f0ff">{g.sport}</Badge>
          </Card>
        ))}
      </div>
      <div
        onClick={() => navigate('/glossary')}
        style={{
          textAlign: 'center',
          fontSize: 12,
          fontWeight: 700,
          color: '#2563eb',
          marginTop: 8,
          cursor: 'pointer',
          ...h,
        }}
      >
        View all {glossary.length} {'\u2192'}
      </div>

      {/* ── Birthdays ── */}
      {birthdays.length > 0 && (
        <>
          <div style={sectionTitle}>
            <span style={{ animation: 'bounce 1s infinite' }}>{'\u{1F382}'}</span> Born Today
          </div>
          {birthdays.map((b, i) => (
            <Card key={i} style={{ padding: 12, marginBottom: 8 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ fontSize: 22 }}>{b.e}</span>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 800, ...h }}>{b.name}</div>
                  <div style={{ fontSize: 10, color: '#888', ...h }}>{b.sport}</div>
                </div>
              </div>
            </Card>
          ))}
        </>
      )}

      {/* ── Search Bar ── */}
      <div style={{ ...sectionTitle, marginTop: 32 }}>{'\u{1F50D}'} Explore Sports</div>
      <SearchBar
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder={`Search ${sports.length} sports...`}
      />

      {/* ── Category Chips ── */}
      <div style={{ ...scrollRow, marginTop: 12, gap: 8 }}>
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

      {/* ── Type / Contact Chips ── */}
      <div style={{ ...scrollRow, marginTop: 8, gap: 8 }}>
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

      {/* ── Sport List ── */}
      <div style={{ marginTop: 16, display: 'flex', flexDirection: 'column', gap: 8 }}>
        {filtered.length === 0 && (
          <div style={{ textAlign: 'center', color: '#aaa', fontSize: 13, padding: 24, ...h }}>
            No sports match your filters.
          </div>
        )}
        {filtered.map((s) => (
          <SportRow key={s.id} sport={s} onClick={() => navigate('/sports/' + s.id)} />
        ))}
      </div>
    </div>
  );
}

function SportRow({ sport: s, onClick }) {
  const [hovered, setHovered] = useState(false);

  const badges = [];
  if (s.oly) badges.push({ label: 'OLYMPIC', color: '#d97706', bg: '#fef3c7' });
  if (s.esports) badges.push({ label: 'ESPORTS', color: '#7c3aed', bg: '#f3f0ff' });
  if (s.womens) badges.push({ label: "WOMEN'S", color: '#db2777', bg: '#fdf2f8' });
  if (s.trending) badges.push({ label: 'TRENDING', color: '#ea580c', bg: '#fff7ed' });
  if (s.indoor) badges.push({ label: 'INDOOR', color: '#0891b2', bg: '#ecfeff' });
  if (s.tp === 'team') badges.push({ label: 'TEAM', color: '#2563eb', bg: '#eff6ff' });
  if (s.tp === 'individual') badges.push({ label: 'INDIVIDUAL', color: '#16a34a', bg: '#f0fdf4' });
  if (s.ct === 'full') badges.push({ label: 'FULL CONTACT', color: '#dc2626', bg: '#fef2f2' });
  if (s.ct === 'limited') badges.push({ label: 'LIMITED CONTACT', color: '#f59e0b', bg: '#fffbeb' });

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        padding: '10px 14px',
        borderRadius: 14,
        background: hovered ? '#f8f6f3' : '#fff',
        border: '1.5px solid #ede8e0',
        cursor: 'pointer',
        transition: 'all .15s',
        transform: hovered ? 'translateY(-1px)' : 'none',
        boxShadow: hovered ? '0 4px 14px rgba(0,0,0,.06)' : '0 1px 4px rgba(0,0,0,.02)',
      }}
    >
      {/* Icon */}
      <div
        style={{
          width: 40,
          height: 40,
          borderRadius: 10,
          background: s.c + '18',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 22,
          flexShrink: 0,
        }}
      >
        {s.i}
      </div>

      {/* Info */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap' }}>
          <span style={{ fontSize: 14, fontWeight: 800, ...h }}>{s.n}</span>
          {badges.map((b) => (
            <Badge key={b.label} color={b.color} bg={b.bg}>
              {b.label}
            </Badge>
          ))}
        </div>
        <div style={{ fontSize: 10, color: '#999', marginTop: 2, ...h }}>
          {s.fans} fans &middot; {s.r ? s.r.length : 0} rules &middot; {s.p ? s.p.length : 0} profiles
        </div>
      </div>

      {/* Chevron */}
      <span style={{ color: '#ccc', fontSize: 16 }}>{'\u203A'}</span>
    </div>
  );
}
