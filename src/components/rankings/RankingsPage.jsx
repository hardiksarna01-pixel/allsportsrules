import { useState } from 'react';
import { h } from '../../constants';
import { usePageTitle } from '../../hooks/usePageTitle';
import { rankings } from '../../data/rankings';
import { archives } from '../../data/archives';

const LEADERBOARD = [
  { rank: 1, name: 'SpeedKing99', pts: 4820, you: false },
  { rank: 2, name: 'RulesMaster', pts: 4510, you: false },
  { rank: 3, name: 'SportsFanatic', pts: 4200, you: false },
  { rank: 4, name: 'GoalHunter', pts: 3980, you: false },
  { rank: 5, name: 'You', pts: 3750, you: true },
];

const back = {
  display: 'inline-flex', alignItems: 'center', gap: 6, background: 'none',
  border: 'none', cursor: 'pointer', fontSize: 14, fontWeight: 600,
  color: '#2563eb', padding: 0, marginBottom: 16, ...h,
};

const card = {
  background: '#fff', borderRadius: 14, border: '1.5px solid #ede8e0',
  padding: 16, marginBottom: 12,
};

const sectionLabel = {
  fontSize: 11, fontWeight: 800, letterSpacing: 1, color: '#78716c',
  textTransform: 'uppercase', marginBottom: 10, marginTop: 20, ...h,
};

const th = {
  textAlign: 'left', padding: '8px 10px', fontWeight: 700, fontSize: 11,
  color: '#78716c', borderBottom: '2px solid #ede8e0', ...h,
};

const td = { padding: '8px 10px', borderBottom: '1px solid #f0ede8', fontSize: 13, ...h };

function ChangeArrow({ change }) {
  if (change === 'up') return <span style={{ color: '#16a34a', fontWeight: 700 }}>{'\u25B2'}</span>;
  if (change === 'down') return <span style={{ color: '#dc2626', fontWeight: 700 }}>{'\u25BC'}</span>;
  return <span style={{ color: '#a1a1aa', fontWeight: 700 }}>{'\u2014'}</span>;
}

function RankTable({ rows }) {
  return (
    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
      <thead>
        <tr>
          <th style={th}>#</th>
          <th style={th}>Name</th>
          <th style={{ ...th, textAlign: 'right' }}>Pts</th>
          <th style={{ ...th, textAlign: 'center', width: 30 }}></th>
        </tr>
      </thead>
      <tbody>
        {rows.map((r) => (
          <tr key={r.rank}>
            <td style={{ ...td, fontWeight: 700 }}>{r.rank}</td>
            <td style={td}>{r.flag} {r.name}</td>
            <td style={{ ...td, textAlign: 'right', fontWeight: 600 }}>{r.pts}</td>
            <td style={{ ...td, textAlign: 'center' }}><ChangeArrow change={r.change} /></td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function ArchiveView({ sport, onBack }) {
  const data = archives.find((a) => a.sport === sport);
  if (!data) return null;

  const [expanded, setExpanded] = useState(null);

  return (
    <div>
      <button style={back} onClick={onBack}>{'\u2190'} Back</button>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
        <span style={{ fontSize: 32 }}>{data.icon}</span>
        <h2 style={{ fontSize: 22, fontWeight: 900, margin: 0, ...h }}>{data.sport} Archives</h2>
      </div>

      <div style={sectionLabel}>ALL-TIME RECORDS</div>
      <div style={card}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={th}>Category</th>
              <th style={th}>Holder</th>
              <th style={th}>Value</th>
              <th style={th}>Era</th>
            </tr>
          </thead>
          <tbody>
            {data.records.map((r, i) => (
              <tr key={i}>
                <td style={{ ...td, fontWeight: 600 }}>{r.category}</td>
                <td style={td}>{r.holder}</td>
                <td style={{ ...td, fontWeight: 700, color: data.color }}>{r.value}</td>
                <td style={{ ...td, fontSize: 11, color: '#78716c' }}>{r.era}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div style={sectionLabel}>TOURNAMENT HISTORY</div>
      {data.tournaments.map((t, i) => (
        <div
          key={i}
          style={{ ...card, cursor: 'pointer' }}
          onClick={() => setExpanded(expanded === i ? null : i)}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ fontSize: 15, fontWeight: 800, ...h }}>{t.name}</div>
            <span style={{ fontSize: 16, color: '#a1a1aa', transform: expanded === i ? 'rotate(180deg)' : 'none', transition: 'transform .2s' }}>
              {'\u25BC'}
            </span>
          </div>
          {expanded === i && (
            <div style={{ marginTop: 12 }}>
              <div style={{ fontSize: 12, color: '#78716c', marginBottom: 10, ...h }}>{t.record}</div>
              {t.winners.map((w, j) => (
                <div
                  key={j}
                  style={{
                    display: 'flex', justifyContent: 'space-between', padding: '6px 0',
                    borderBottom: j < t.winners.length - 1 ? '1px solid #f0ede8' : 'none',
                    fontSize: 13, ...h,
                  }}
                >
                  <span style={{ fontWeight: 700 }}>{w.year}</span>
                  <span>{w.winner}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default function RankingsPage() {
  usePageTitle('World Rankings');
  const [active, setActive] = useState(null);
  const [archSport, setArchSport] = useState(null);

  if (archSport) {
    return (
      <div style={{ padding: 20, maxWidth: 600, margin: '0 auto' }}>
        <ArchiveView sport={archSport} onBack={() => setArchSport(null)} />
      </div>
    );
  }

  if (active) {
    const data = rankings.find((r) => r.sport === active);
    if (!data) return null;

    const sections = [];
    if (data.teams) sections.push({ label: 'Teams', rows: data.teams });
    if (data.players) sections.push({ label: 'Players', rows: data.players });
    if (data.bowlers) sections.push({ label: 'Bowlers', rows: data.bowlers });

    return (
      <div style={{ padding: 20, maxWidth: 600, margin: '0 auto' }}>
        <button style={back} onClick={() => setActive(null)}>{'\u2190'} Back</button>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
          <span style={{ fontSize: 32 }}>{data.icon}</span>
          <h2 style={{ fontSize: 22, fontWeight: 900, margin: 0, ...h }}>{data.sport} Rankings</h2>
        </div>
        <div style={{ fontSize: 11, color: '#78716c', marginBottom: 20, ...h }}>
          Source: {data.source}
        </div>

        {sections.map((sec) => (
          <div key={sec.label}>
            <div style={sectionLabel}>{sec.label.toUpperCase()}</div>
            <div style={card}>
              <RankTable rows={sec.rows} />
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div style={{ padding: 20, maxWidth: 600, margin: '0 auto' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
        <h2 style={{ fontSize: 24, fontWeight: 900, margin: 0, ...h }}>World Rankings</h2>
        <span
          style={{
            fontSize: 9, fontWeight: 800, color: '#fff', background: '#16a34a',
            padding: '2px 8px', borderRadius: 6, ...h,
          }}
        >
          OFFICIAL
        </span>
      </div>

      {/* Ranking Cards */}
      {rankings.map((r) => (
        <div
          key={r.sport}
          style={{ ...card, cursor: 'pointer' }}
          onClick={() => setActive(r.sport)}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
            <span style={{ fontSize: 26 }}>{r.icon}</span>
            <div>
              <div style={{ fontSize: 15, fontWeight: 800, ...h }}>{r.sport}</div>
              <div style={{ fontSize: 10, color: '#78716c', ...h }}>{r.source}</div>
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            {(r.teams || r.players || []).slice(0, 3).map((entry) => (
              <div key={entry.rank} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12, ...h }}>
                <span style={{ fontWeight: 700, color: '#78716c', width: 16 }}>{entry.rank}</span>
                <span>{entry.flag}</span>
                <span style={{ fontWeight: 600 }}>{entry.name}</span>
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* Tournament Archives */}
      <div style={sectionLabel}>TOURNAMENT ARCHIVES</div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
        {archives.map((a) => (
          <div
            key={a.sport}
            style={{ ...card, cursor: 'pointer', textAlign: 'center' }}
            onClick={() => setArchSport(a.sport)}
          >
            <span style={{ fontSize: 28 }}>{a.icon}</span>
            <div style={{ fontSize: 13, fontWeight: 800, marginTop: 4, ...h }}>{a.sport}</div>
            <div style={{ fontSize: 10, color: '#78716c', marginTop: 2, ...h }}>
              {a.tournaments.length} tournament{a.tournaments.length !== 1 ? 's' : ''} {'\u00B7'} {a.records.length} records
            </div>
          </div>
        ))}
      </div>

      {/* Your Progress */}
      <div style={sectionLabel}>YOUR PROGRESS</div>
      <div style={card}>
        <div style={{ fontSize: 14, fontWeight: 800, marginBottom: 10, ...h }}>
          {'\u{1F48E}'} Diamond League
        </div>
        {LEADERBOARD.map((entry) => (
          <div
            key={entry.rank}
            style={{
              display: 'flex', alignItems: 'center', gap: 10,
              padding: '8px 0',
              borderBottom: '1px solid #f0ede8',
              background: entry.you ? '#eff6ff' : 'transparent',
              borderRadius: entry.you ? 8 : 0,
              padding: entry.you ? '8px 10px' : '8px 0',
            }}
          >
            <span style={{ fontWeight: 800, fontSize: 14, width: 24, color: entry.rank <= 3 ? '#ca8a04' : '#78716c', ...h }}>
              {entry.rank}
            </span>
            <span style={{ flex: 1, fontWeight: entry.you ? 800 : 600, fontSize: 13, color: entry.you ? '#2563eb' : '#333', ...h }}>
              {entry.name}
            </span>
            <span style={{ fontWeight: 700, fontSize: 13, color: '#78716c', ...h }}>
              {entry.pts.toLocaleString()} pts
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
