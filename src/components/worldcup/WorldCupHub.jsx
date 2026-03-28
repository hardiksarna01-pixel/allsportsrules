import { h } from '../../constants';
import { worldcup } from '../../data/worldcup';

const card = {
  background: '#fff', borderRadius: 14, border: '1.5px solid #ede8e0',
  padding: 16, marginBottom: 12,
};

const sectionLabel = {
  fontSize: 11, fontWeight: 800, letterSpacing: 1, color: '#78716c',
  textTransform: 'uppercase', marginBottom: 10, marginTop: 20, ...h,
};

const back = {
  display: 'inline-flex', alignItems: 'center', gap: 6, background: 'none',
  border: 'none', cursor: 'pointer', fontSize: 14, fontWeight: 600,
  color: '#2563eb', padding: 0, marginBottom: 16, ...h,
};

export default function WorldCupHub({ onBack }) {
  const wc = worldcup;
  const groups = Object.entries(wc.groups);

  return (
    <div style={{ padding: 20, maxWidth: 600, margin: '0 auto', paddingBottom: 40 }}>
      {onBack && (
        <button style={back} onClick={onBack}>{'\u2190'} Back</button>
      )}

      {/* Hero Header */}
      <div
        style={{
          background: 'linear-gradient(135deg, #1e3a5f, #2563eb, #3b82f6)',
          borderRadius: 18, padding: '28px 20px', color: '#fff', textAlign: 'center',
          marginBottom: 16,
        }}
      >
        <div style={{ fontSize: 48, marginBottom: 8 }}>{'\u26BD'}</div>
        <h1 style={{ fontSize: 24, fontWeight: 900, margin: 0, ...h }}>{wc.title}</h1>
        <div style={{ fontSize: 13, opacity: 0.85, marginTop: 4, ...h }}>{wc.dates}</div>
        <div style={{ fontSize: 12, opacity: 0.7, marginTop: 2, ...h }}>{wc.countries}</div>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 24, marginTop: 18 }}>
          {[
            { label: 'Teams', val: wc.stats.teams },
            { label: 'Matches', val: wc.stats.matches },
            { label: 'Cities', val: wc.stats.cities },
          ].map((s) => (
            <div key={s.label}>
              <div style={{ fontSize: 28, fontWeight: 900, ...h }}>{s.val}</div>
              <div style={{ fontSize: 10, fontWeight: 600, opacity: 0.7, ...h }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* New Format */}
      <div style={sectionLabel}>NEW FORMAT</div>
      <div style={card}>
        <div style={{ fontSize: 13, lineHeight: 1.6, color: '#333', ...h }}>{wc.format}</div>
      </div>

      {/* What's New */}
      <div style={sectionLabel}>WHAT'S NEW</div>
      <div style={card}>
        {wc.newRules.map((rule, i) => (
          <div
            key={i}
            style={{
              display: 'flex', alignItems: 'flex-start', gap: 8, padding: '6px 0',
              borderBottom: i < wc.newRules.length - 1 ? '1px solid #f0ede8' : 'none',
            }}
          >
            <span style={{ color: '#16a34a', fontSize: 14, flexShrink: 0 }}>{'\u2713'}</span>
            <span style={{ fontSize: 13, color: '#333', ...h }}>{rule}</span>
          </div>
        ))}
      </div>

      {/* Opening Match */}
      <div style={sectionLabel}>OPENING MATCH</div>
      <div style={{ ...card, borderLeft: '4px solid #2563eb' }}>
        <div style={{ fontSize: 16, fontWeight: 800, ...h }}>{wc.openingMatch.match}</div>
        <div style={{ fontSize: 12, color: '#78716c', marginTop: 4, ...h }}>
          {'\u{1F4C5}'} {wc.openingMatch.date}
        </div>
        <div style={{ fontSize: 12, color: '#78716c', marginTop: 2, ...h }}>
          {'\u{1F3DF}\uFE0F'} {wc.openingMatch.venue}
        </div>
        <div style={{ fontSize: 11, color: '#2563eb', fontWeight: 600, marginTop: 8, ...h }}>
          {wc.openingMatch.note}
        </div>
      </div>

      {/* Final */}
      <div style={sectionLabel}>FINAL</div>
      <div style={{ ...card, borderLeft: '4px solid #ca8a04' }}>
        <div style={{ fontSize: 16, fontWeight: 800, ...h }}>{'\u{1F3C6}'} The Final</div>
        <div style={{ fontSize: 12, color: '#78716c', marginTop: 4, ...h }}>
          {'\u{1F3DF}\uFE0F'} {wc.final.venue}
        </div>
        <div style={{ fontSize: 12, color: '#78716c', marginTop: 2, ...h }}>
          {'\u{1F4C5}'} {wc.final.date}
        </div>
        <div style={{ fontSize: 11, color: '#ca8a04', fontWeight: 600, marginTop: 8, ...h }}>
          {wc.final.note}
        </div>
      </div>

      {/* All 12 Groups */}
      <div style={sectionLabel}>ALL 12 GROUPS</div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
        {groups.map(([letter, teams]) => (
          <div key={letter} style={card}>
            <div style={{ fontSize: 14, fontWeight: 900, color: '#2563eb', marginBottom: 6, ...h }}>
              Group {letter}
            </div>
            {teams.map((team, i) => (
              <div
                key={i}
                style={{
                  fontSize: 12, padding: '3px 0', color: '#333',
                  fontWeight: i === 0 ? 700 : 400, ...h,
                }}
              >
                {team}
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* Debutants */}
      <div style={sectionLabel}>DEBUTANTS</div>
      <div style={{ ...card, background: '#f0fdf4' }}>
        <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 10, color: '#16a34a', ...h }}>
          First-time World Cup nations
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
          {wc.debutants.map((d) => (
            <div
              key={d.name}
              style={{
                display: 'flex', alignItems: 'center', gap: 6,
                background: '#fff', padding: '6px 12px', borderRadius: 20,
                fontSize: 12, fontWeight: 600, ...h,
              }}
            >
              <span style={{ fontSize: 18 }}>{d.flag}</span>
              {d.name}
            </div>
          ))}
        </div>
      </div>

      {/* How to Watch */}
      <div style={sectionLabel}>HOW TO WATCH</div>
      <div style={card}>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
          <span style={{ fontSize: 20 }}>{'\u{1F4FA}'}</span>
          <div style={{ fontSize: 13, lineHeight: 1.6, color: '#333', ...h }}>{wc.broadcast}</div>
        </div>
      </div>

      {/* Match Ball */}
      <div style={sectionLabel}>MATCH BALL</div>
      <div style={card}>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
          <span style={{ fontSize: 20 }}>{'\u26BD'}</span>
          <div style={{ fontSize: 13, lineHeight: 1.6, color: '#333', ...h }}>{wc.ball}</div>
        </div>
      </div>
    </div>
  );
}
