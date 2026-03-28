import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { h } from '../../constants';
import { glossary } from '../../data/glossary';
import { images } from '../../data/images';

const back = {
  display: 'inline-flex', alignItems: 'center', gap: 6, background: 'none',
  border: 'none', cursor: 'pointer', fontSize: 14, fontWeight: 600,
  color: '#2563eb', padding: 0, marginBottom: 16, ...h,
};

const card = {
  background: '#fff', borderRadius: 14, border: '1.5px solid #ede8e0',
  padding: 14, marginBottom: 10,
};

const chipBase = {
  padding: '6px 14px', borderRadius: 20, fontSize: 11, fontWeight: 700,
  border: '1.5px solid #e2ddd5', background: '#fff', cursor: 'pointer',
  whiteSpace: 'nowrap', transition: 'all .15s', ...h,
};

const chipActive = {
  ...chipBase,
  background: '#111', color: '#fff', border: '1.5px solid #111',
};

function sportKey(sport) {
  const s = sport.toLowerCase().split('/')[0].trim();
  const map = { 'formula 1': 'f1', 'mma': 'mma' };
  return map[s] || s;
}

export default function GlossaryPage() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [sportFilter, setSportFilter] = useState('all');

  const allSports = useMemo(() => {
    const set = new Set();
    glossary.forEach((g) => {
      g.sport.split('/').forEach((s) => set.add(s.trim()));
    });
    return Array.from(set).sort();
  }, []);

  const filtered = useMemo(() => {
    return glossary.filter((g) => {
      if (search && !g.term.toLowerCase().includes(search.toLowerCase()) && !g.def.toLowerCase().includes(search.toLowerCase())) {
        return false;
      }
      if (sportFilter !== 'all' && !g.sport.includes(sportFilter)) return false;
      return true;
    });
  }, [search, sportFilter]);

  return (
    <div style={{ padding: 20, maxWidth: 600, margin: '0 auto', paddingBottom: 40 }}>
      <button style={back} onClick={() => navigate(-1)}>{'\u2190'} Back</button>

      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
        <span style={{ fontSize: 32 }}>{'\u{1F4D6}'}</span>
        <h2 style={{ fontSize: 24, fontWeight: 900, margin: 0, ...h }}>Sports Glossary</h2>
      </div>
      <div style={{ fontSize: 12, color: '#78716c', marginBottom: 16, ...h }}>
        {glossary.length} terms across all sports
      </div>

      {/* Search */}
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search terms..."
        style={{
          width: '100%', padding: '10px 14px', fontSize: 14, borderRadius: 12,
          border: '1.5px solid #d6d3d1', outline: 'none', boxSizing: 'border-box',
          fontWeight: 500, background: '#fafaf9', marginBottom: 12, ...h,
        }}
      />

      {/* Sport Filter Chips */}
      <div style={{ display: 'flex', gap: 8, overflowX: 'auto', paddingBottom: 8, scrollbarWidth: 'none', marginBottom: 16 }}>
        <button
          style={sportFilter === 'all' ? chipActive : chipBase}
          onClick={() => setSportFilter('all')}
        >
          All
        </button>
        {allSports.map((s) => (
          <button
            key={s}
            style={sportFilter === s ? chipActive : chipBase}
            onClick={() => setSportFilter(s)}
          >
            {s}
          </button>
        ))}
      </div>

      {/* Term List */}
      {filtered.length === 0 && (
        <div style={{ textAlign: 'center', color: '#aaa', fontSize: 13, padding: 24, ...h }}>
          No terms match your search.
        </div>
      )}

      {filtered.map((g) => {
        const imgKey = sportKey(g.sport);
        const imgUrl = images[imgKey];

        return (
          <div key={g.id} style={{ ...card, display: 'flex', gap: 12, alignItems: 'flex-start' }}>
            {imgUrl && (
              <img
                src={imgUrl}
                alt=""
                style={{ width: 60, height: 42, borderRadius: 8, objectFit: 'cover', flexShrink: 0 }}
                onError={(e) => { e.target.style.display = 'none'; }}
              />
            )}
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap', marginBottom: 4 }}>
                <span style={{ fontSize: 14, fontWeight: 800, ...h }}>{g.term}</span>
                <span
                  style={{
                    fontSize: 9, fontWeight: 700, color: '#7c3aed', background: '#f3f0ff',
                    padding: '1px 6px', borderRadius: 4, ...h,
                  }}
                >
                  {g.sport}
                </span>
                <span
                  style={{
                    fontSize: 9, fontWeight: 700, color: '#16a34a', background: '#f0fdf4',
                    padding: '1px 6px', borderRadius: 4, ...h,
                  }}
                >
                  {'\u{1F4C8}'} Popular
                </span>
              </div>
              <div style={{ fontSize: 12, color: '#555', lineHeight: 1.5, ...h }}>{g.def}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
