import { useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { h } from '../../constants';
import { sportsMap } from '../../data/sports';

const back = {
  display: 'inline-flex', alignItems: 'center', gap: 6, background: 'none',
  border: 'none', cursor: 'pointer', fontSize: 14, fontWeight: 600,
  color: '#2563eb', padding: 0, marginBottom: 16, ...h,
};

const tableCell = {
  padding: '10px 12px', fontSize: 13, fontWeight: 500, ...h,
  borderBottom: '1px solid #ede8e0',
};

const headerCell = {
  ...tableCell, fontWeight: 800, fontSize: 12, color: '#78716c',
  textTransform: 'uppercase', letterSpacing: 0.5,
};

const sportCol = (c) => ({
  ...tableCell, color: c || '#111', fontWeight: 700,
});

const linkBtn = (c) => ({
  display: 'inline-block', padding: '10px 20px', borderRadius: 12,
  background: c || '#16a34a', color: '#fff', fontWeight: 700, fontSize: 13,
  textDecoration: 'none', cursor: 'pointer', border: 'none', ...h,
});

export default function ComparisonPage() {
  const { sportA: rawA, sportB: rawB } = useParams();
  const navigate = useNavigate();

  const sportA = rawA;
  const sportB = rawB;

  const spA = sportsMap[sportA];
  const spB = sportsMap[sportB];

  const differences = useMemo(() => {
    if (!spA || !spB) return [];
    const diffs = [];
    if (spA.tp !== spB.tp) diffs.push(`${spA.n} is a ${spA.tp} sport while ${spB.n} is ${spB.tp === 'both' ? 'both individual and team' : spB.tp}.`);
    if (spA.ct !== spB.ct) diffs.push(`${spA.n} has ${spA.ct || 'no'} contact, whereas ${spB.n} has ${spB.ct || 'no'} contact.`);
    if (spA.oly !== spB.oly) diffs.push(`${spA.oly ? spA.n : spB.n} is an Olympic sport, but ${spA.oly ? spB.n : spA.n} is not.`);
    if ((spA.eq || []).length !== (spB.eq || []).length) diffs.push(`${spA.n} requires ${(spA.eq || []).length} pieces of equipment vs ${(spB.eq || []).length} for ${spB.n}.`);
    if (spA.cat !== spB.cat) diffs.push(`They belong to different categories: ${spA.cat} vs ${spB.cat}.`);
    if (spA.gb !== spB.gb) diffs.push(`${spA.n} is governed by ${spA.gb || 'N/A'}, while ${spB.n} is governed by ${spB.gb || 'N/A'}.`);
    if (spA.fans !== spB.fans) diffs.push(`Fan base sizes differ: ${spA.fans || 'N/A'} for ${spA.n} vs ${spB.fans || 'N/A'} for ${spB.n}.`);
    if (diffs.length === 0) diffs.push('Both sports share many similarities across key dimensions.');
    return diffs;
  }, [spA, spB]);

  if (!spA || !spB) {
    return (
      <div style={{ padding: 20, maxWidth: 600, margin: '0 auto', textAlign: 'center', paddingTop: 60 }}>
        <button style={back} onClick={() => navigate(-1)}>{'\u2190'} Back</button>
        <div style={{ fontSize: 48, marginBottom: 12 }}>{'\u{1F50D}'}</div>
        <h2 style={{ fontSize: 22, fontWeight: 900, ...h }}>Sport not found</h2>
        <p style={{ fontSize: 14, color: '#78716c', ...h }}>
          One or both sports could not be found. Please check the URL and try again.
        </p>
      </div>
    );
  }

  const rows = [
    { label: 'Players per team', a: spA.tp === 'team' ? 'Team sport' : spA.tp === 'individual' ? 'Individual' : 'Both', b: spB.tp === 'team' ? 'Team sport' : spB.tp === 'individual' ? 'Individual' : 'Both' },
    { label: 'Contact level', a: spA.ct || 'N/A', b: spB.ct || 'N/A' },
    { label: 'Game duration', a: (spA.fmt && spA.fmt[0]) || 'Varies', b: (spB.fmt && spB.fmt[0]) || 'Varies' },
    { label: 'Scoring system', a: spA.sc ? spA.sc.pts : 'N/A', b: spB.sc ? spB.sc.pts : 'N/A' },
    { label: 'Olympic status', a: spA.oly ? `Yes (since ${spA.oY || '\u2014'})` : 'No', b: spB.oly ? `Yes (since ${spB.oY || '\u2014'})` : 'No' },
    { label: 'Fan base', a: spA.fans || 'N/A', b: spB.fans || 'N/A' },
    { label: 'Governing body', a: spA.gb || 'N/A', b: spB.gb || 'N/A' },
    { label: 'Equipment count', a: (spA.eq || []).length + ' items', b: (spB.eq || []).length + ' items' },
  ];

  return (
    <div style={{ padding: 20, maxWidth: 660, margin: '0 auto', paddingBottom: 60 }}>
      <button style={back} onClick={() => navigate(-1)}>{'\u2190'} Back</button>

      {/* Title */}
      <h1 style={{ fontSize: 26, fontWeight: 900, margin: '0 0 4px', ...h }}>
        {spA.i} {spA.n} vs {spB.n} {spB.i}
      </h1>
      <p style={{ fontSize: 13, color: '#78716c', marginBottom: 24, ...h }}>
        Side-by-side comparison of rules, scoring, and key facts
      </p>

      {/* Comparison Table */}
      <div style={{ background: '#fff', borderRadius: 14, border: '1.5px solid #ede8e0', overflow: 'hidden', marginBottom: 28 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={{ ...headerCell, textAlign: 'left', width: '30%' }}>Attribute</th>
              <th style={{ ...headerCell, textAlign: 'left', width: '35%' }}>{spA.i} {spA.n}</th>
              <th style={{ ...headerCell, textAlign: 'left', width: '35%' }}>{spB.i} {spB.n}</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr key={i} style={{ background: i % 2 === 0 ? '#faf8f5' : '#fff' }}>
                <td style={{ ...tableCell, fontWeight: 700, color: '#44403c' }}>{row.label}</td>
                <td style={sportCol(spA.c)}>{row.a}</td>
                <td style={sportCol(spB.c)}>{row.b}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Key Differences */}
      <div style={{ background: '#fff', borderRadius: 14, border: '1.5px solid #ede8e0', padding: 18, marginBottom: 28 }}>
        <h3 style={{ fontSize: 17, fontWeight: 800, margin: '0 0 12px', ...h }}>{'\u{1F4A1}'} Key Differences</h3>
        <ul style={{ margin: 0, paddingLeft: 20 }}>
          {differences.map((d, i) => (
            <li key={i} style={{ fontSize: 13, color: '#44403c', marginBottom: 8, lineHeight: 1.5, ...h }}>{d}</li>
          ))}
        </ul>
      </div>

      {/* Links to sport pages */}
      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
        <button style={linkBtn(spA.c)} onClick={() => navigate(`/sports/${spA.id}`)}>
          {spA.i} Learn {spA.n} Rules
        </button>
        <button style={linkBtn(spB.c)} onClick={() => navigate(`/sports/${spB.id}`)}>
          {spB.i} Learn {spB.n} Rules
        </button>
      </div>
    </div>
  );
}
