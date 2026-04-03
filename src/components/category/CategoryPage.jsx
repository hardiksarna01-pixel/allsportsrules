import { useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { h } from '../../constants';
import { sports } from '../../data/sports';
import { categories } from '../../data/categories';

const back = {
  display: 'inline-flex', alignItems: 'center', gap: 6, background: 'none',
  border: 'none', cursor: 'pointer', fontSize: 14, fontWeight: 600,
  color: '#2563eb', padding: 0, marginBottom: 16, ...h,
};

const descriptions = {
  popular: 'The most widely followed and played sports across the globe, with billions of fans and rich competitive histories.',
  trending: 'Emerging and rapidly growing sports capturing new audiences worldwide.',
  indoor: 'Sports played in enclosed venues and arenas, from courts to rinks.',
  ball: 'Sports centered around a ball, spanning team and individual competitions.',
  combat: 'Fighting and martial arts disciplines requiring strength, technique, and strategy.',
  aquatic: 'Water-based sports from swimming to diving and water polo.',
  track: 'Running, jumping, and throwing events on the athletics track and field.',
  gym: 'Gymnastics disciplines showcasing flexibility, strength, and artistry.',
  cycle: 'Cycling sports from road racing to track, BMX, and mountain biking.',
  target: 'Precision sports requiring accuracy and focus, from archery to shooting.',
  winter: 'Sports played on ice and snow, from skiing to skating and hockey.',
  motor: 'High-speed motorsport disciplines from Formula 1 to MotoGP.',
  outdoor: 'Adventure and outdoor sports including climbing, surfing, and more.',
  racquet: 'Racquet and paddle sports played on courts of all sizes.',
  esports: 'Competitive video gaming across multiple titles and platforms.',
  womens: "Women's sports leagues and competitions growing in global prominence.",
  other: 'Unique and niche sports that defy traditional categorization.',
};

export default function CategoryPage() {
  const { catId } = useParams();
  const navigate = useNavigate();

  const category = useMemo(() => categories.find(c => c.id === catId), [catId]);

  const filtered = useMemo(() => {
    return sports.filter(s => s.cat === catId);
  }, [catId]);

  if (!category) {
    return (
      <div style={{ padding: 20, maxWidth: 600, margin: '0 auto', textAlign: 'center', paddingTop: 60 }}>
        <button style={back} onClick={() => navigate(-1)}>{'\u2190'} Back</button>
        <div style={{ fontSize: 48, marginBottom: 12 }}>{'\u{1F50D}'}</div>
        <h2 style={{ fontSize: 22, fontWeight: 900, ...h }}>Category not found</h2>
        <p style={{ fontSize: 14, color: '#78716c', ...h }}>
          This category could not be found. Please check the URL and try again.
        </p>
      </div>
    );
  }

  const desc = descriptions[catId] || `Explore all ${category.n} sports and learn their rules.`;

  return (
    <div style={{ padding: 20, maxWidth: 660, margin: '0 auto', paddingBottom: 60 }}>
      <button style={back} onClick={() => navigate(-1)}>{'\u2190'} Back</button>

      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: 28 }}>
        <div style={{ fontSize: 56, marginBottom: 8 }}>{category.e}</div>
        <h1 style={{ fontSize: 28, fontWeight: 900, margin: '0 0 8px', color: '#1a1a2e', ...h }}>
          {category.n} Sports
        </h1>
        <p style={{ fontSize: 14, lineHeight: 1.6, color: '#78716c', margin: '0 0 12px', maxWidth: 480, marginLeft: 'auto', marginRight: 'auto', ...h }}>
          {desc}
        </p>
        <span style={{
          display: 'inline-block', padding: '5px 14px', borderRadius: 20,
          fontSize: 12, fontWeight: 700, background: '#16a34a', color: '#fff', ...h,
        }}>
          {filtered.length} sport{filtered.length !== 1 ? 's' : ''} in this category
        </span>
      </div>

      {/* Sport Cards Grid */}
      {filtered.length === 0 ? (
        <div style={{
          textAlign: 'center', padding: 40, background: '#fff',
          borderRadius: 14, border: '1.5px solid #ede8e0', ...h,
        }}>
          <div style={{ fontSize: 40, marginBottom: 8 }}>{'\u{1F3C3}'}</div>
          <p style={{ fontSize: 14, color: '#78716c', ...h }}>No sports found in this category yet.</p>
        </div>
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
          gap: 14,
        }}>
          {filtered.map(s => {
            const sportColor = s.c || '#2563eb';
            return (
              <div
                key={s.id}
                onClick={() => navigate(`/sports/${s.id}`)}
                style={{
                  borderRadius: 16, overflow: 'hidden', cursor: 'pointer',
                  boxShadow: '0 4px 20px rgba(0,0,0,.08)',
                  transition: 'all .3s cubic-bezier(.34,1.56,.64,1)',
                  position: 'relative',
                }}
              >
                {/* Gradient background with emoji */}
                <div style={{
                  height: 120,
                  background: `linear-gradient(135deg, ${sportColor}, ${sportColor}cc)`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 48,
                }}>
                  {s.i}
                </div>

                {/* Gradient overlay */}
                <div style={{
                  position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
                  background: `linear-gradient(to top, ${sportColor}ee 0%, ${sportColor}88 35%, transparent 60%)`,
                  pointerEvents: 'none',
                }} />

                {/* Info bar */}
                <div style={{
                  position: 'absolute', bottom: 0, left: 0, right: 0,
                  padding: '10px 12px',
                }}>
                  <div style={{ fontSize: 14, fontWeight: 800, color: '#fff', ...h }}>
                    {s.n}
                  </div>
                  <div style={{ fontSize: 10, fontWeight: 600, color: 'rgba(255,255,255,0.8)', ...h }}>
                    {s.r ? s.r.length : 0} rules {s.oly ? '\u00B7 Olympic' : ''}
                  </div>
                </div>

                {/* Olympic badge */}
                {s.oly && (
                  <div style={{
                    position: 'absolute', top: 8, right: 8,
                    fontSize: 7, fontWeight: 800, color: '#fff',
                    background: 'rgba(217,119,6,.85)', backdropFilter: 'blur(8px)',
                    padding: '3px 7px', borderRadius: 6, ...h,
                  }}>OLYMPIC</div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
