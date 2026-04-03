import { useParams, useNavigate } from 'react-router-dom';
import { h } from '../../constants';
import { sportsMap } from '../../data/sports';
import { glossary } from '../../data/glossary';
import { usePageTitle } from '../../hooks/usePageTitle';
import PlayerAvatar from './PlayerAvatar';

export default function BeginnerGuidePage() {
  const { sportId } = useParams();
  const navigate = useNavigate();
  const sp = sportsMap[sportId];

  usePageTitle(sp ? `How to Play ${sp.n} — Beginner's Guide` : 'Beginner Guide');

  if (!sp) return (
    <div style={{ padding: 40, textAlign: 'center', ...h }}>
      <span style={{ fontSize: 48 }}>🔍</span>
      <h2 style={{ fontSize: 18, fontWeight: 800, marginTop: 12 }}>Sport not found</h2>
      <button onClick={() => navigate('/')} style={{ ...h, marginTop: 16, padding: '10px 24px', borderRadius: 10, background: '#16a34a', color: '#fff', border: 'none', fontWeight: 700, cursor: 'pointer' }}>Go Home</button>
    </div>
  );

  const c = sp.c || '#16a34a';
  const rules = sp.r || [];
  const players = sp.p || [];
  const terms = glossary.filter(g => g.sport && g.sport.toLowerCase().includes(sp.n.split('(')[0].trim().split('/')[0].trim().toLowerCase()));

  const section = (icon, title) => ({
    ...h, display: 'flex', alignItems: 'center', gap: 8, fontSize: 18, fontWeight: 800, margin: '28px 0 12px', color: '#1a1a2e',
  });

  const card = {
    padding: '14px 16px', borderRadius: 14, background: '#fff', border: '1.5px solid #ede8e0',
    boxShadow: '0 2px 10px rgba(0,0,0,.04)', marginBottom: 8,
  };

  return (
    <div style={{ padding: '16px 16px 100px', maxWidth: 800, margin: '0 auto' }}>
      <button onClick={() => navigate(`/sports/${sportId}`)} style={{ ...h, background: 'none', border: 'none', color: '#8a8380', fontSize: 12, fontWeight: 600, cursor: 'pointer', marginBottom: 12 }}>← Back to {sp.n}</button>

      {/* Hero */}
      <div style={{ padding: '32px 24px', borderRadius: 20, background: `linear-gradient(135deg, ${c}, ${c}cc)`, color: '#fff', textAlign: 'center', marginBottom: 20, position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: -30, right: -30, width: 120, height: 120, borderRadius: '50%', background: 'rgba(255,255,255,.1)' }} />
        <div style={{ position: 'absolute', bottom: -20, left: -20, width: 80, height: 80, borderRadius: '50%', background: 'rgba(255,255,255,.07)' }} />
        <span style={{ fontSize: 56 }}>{sp.i}</span>
        <h1 style={{ ...h, fontSize: 26, fontWeight: 900, marginTop: 8 }}>{sp.n} for Beginners</h1>
        <div style={{ ...h, display: 'inline-flex', alignItems: 'center', gap: 4, marginTop: 8, fontSize: 12, fontWeight: 700, background: 'rgba(255,255,255,.2)', backdropFilter: 'blur(8px)', padding: '4px 12px', borderRadius: 8 }}>
          ⏱️ 5 minute read
        </div>
      </div>

      {/* What is this sport? */}
      <div style={section()}>
        <span>🏟️</span> <span>What is {sp.n}?</span>
      </div>
      <div style={card}>
        <p style={{ fontSize: 14, lineHeight: 1.7, color: '#374151' }}>
          {sp.hist || (rules[0] ? rules[0].replace(/⚖️\s*/g, '') : `${sp.n} is a ${sp.tp === 'team' ? 'team' : 'individual'} sport enjoyed by ${sp.fans} fans worldwide.`)}
        </p>
        {sp.tp && <div style={{ ...h, display: 'inline-block', marginTop: 8, fontSize: 10, fontWeight: 700, color: c, background: `${c}12`, padding: '3px 8px', borderRadius: 6 }}>{sp.tp === 'team' ? '👥 Team Sport' : sp.tp === 'both' ? '👥 Team & Individual' : '🧑 Individual Sport'}</div>}
        {sp.ct === 'full' && <span style={{ ...h, display: 'inline-block', marginLeft: 6, fontSize: 10, fontWeight: 700, color: '#dc2626', background: '#fef2f2', padding: '3px 8px', borderRadius: 6 }}>💥 Full Contact</span>}
        {sp.oly && <span style={{ ...h, display: 'inline-block', marginLeft: 6, fontSize: 10, fontWeight: 700, color: '#d97706', background: '#fef3c7', padding: '3px 8px', borderRadius: 6 }}>🥇 Olympic Sport{sp.oY ? ` (since ${sp.oY})` : ''}</span>}
      </div>

      {/* Basic Rules */}
      <div style={section()}>
        <span>📋</span> <span>Basic Rules to Know</span>
      </div>
      {rules.slice(0, 8).map((r, i) => (
        <div key={i} style={{ ...card, display: 'flex', gap: 10, alignItems: 'flex-start' }}>
          <div style={{ width: 26, height: 26, borderRadius: 8, background: `${c}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', ...h, fontSize: 11, fontWeight: 900, color: c, flexShrink: 0 }}>{i + 1}</div>
          <p style={{ fontSize: 13, lineHeight: 1.6, color: '#374151' }}>{r.replace(/⚖️\s*/g, '')}</p>
        </div>
      ))}
      {rules.length > 8 && (
        <button onClick={() => navigate(`/sports/${sportId}`)} style={{ ...h, width: '100%', padding: '10px 0', borderRadius: 10, background: `${c}08`, color: c, fontWeight: 700, fontSize: 12, border: `1.5px solid ${c}20`, cursor: 'pointer', marginTop: 4 }}>
          See all {rules.length} rules →
        </button>
      )}

      {/* Scoring */}
      {sp.sc && (
        <>
          <div style={section()}>
            <span>🎯</span> <span>How Scoring Works</span>
          </div>
          <div style={card}>
            {sp.sc.pts && <p style={{ fontSize: 13, lineHeight: 1.7, color: '#374151', marginBottom: 8 }}><strong>Points:</strong> {sp.sc.pts}</p>}
            {sp.sc.win && <p style={{ fontSize: 13, lineHeight: 1.7, color: '#374151' }}><strong>Winning:</strong> {sp.sc.win}</p>}
          </div>
        </>
      )}

      {/* Key Terms */}
      {terms.length > 0 && (
        <>
          <div style={section()}>
            <span>📖</span> <span>Key Terms to Know</span>
          </div>
          {terms.slice(0, 6).map((t, i) => (
            <div key={i} onClick={() => navigate(`/glossary/${t.term.toLowerCase().replace(/\s+/g, '-')}`)}
              style={{ ...card, cursor: 'pointer', borderLeft: `3px solid ${c}` }}>
              <div style={{ ...h, fontSize: 14, fontWeight: 800, color: '#1a1a2e' }}>{t.term}</div>
              <p style={{ fontSize: 12, color: '#6b7280', marginTop: 2, lineHeight: 1.5 }}>{t.def.length > 120 ? t.def.slice(0, 120) + '…' : t.def}</p>
            </div>
          ))}
        </>
      )}

      {/* Famous Players */}
      {players.length > 0 && (
        <>
          <div style={section()}>
            <span>⭐</span> <span>Famous Players</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 10 }}>
            {players.slice(0, 4).map((p, i) => (
              <div key={i} onClick={() => navigate(`/sports/${sportId}/player/${i}`)}
                style={{ ...card, cursor: 'pointer', textAlign: 'center', padding: '16px 12px' }}>
                <PlayerAvatar nm={p.nm} co={p.co} c={c} sz={48} />
                <div style={{ ...h, fontSize: 13, fontWeight: 800, marginTop: 8 }}>{p.nm}</div>
                {p.nk && <div style={{ ...h, fontSize: 10, color: c, fontStyle: 'italic' }}>"{p.nk}"</div>}
                {p.rl && <div style={{ ...h, fontSize: 10, color: '#8a8380', marginTop: 2 }}>{p.rl}</div>}
              </div>
            ))}
          </div>
        </>
      )}

      {/* CTAs */}
      <div style={{ display: 'flex', gap: 10, marginTop: 28, flexWrap: 'wrap' }}>
        <button onClick={() => navigate('/quiz')} style={{ ...h, flex: 1, minWidth: 140, padding: '14px 0', borderRadius: 12, background: '#16a34a', color: '#fff', fontWeight: 800, fontSize: 14, border: 'none', cursor: 'pointer', boxShadow: '0 4px 12px rgba(22,163,74,.25)' }}>
          🧠 Take the Quiz
        </button>
        <button onClick={() => navigate(`/sports/${sportId}`)} style={{ ...h, flex: 1, minWidth: 140, padding: '14px 0', borderRadius: 12, background: '#fff', color: '#1a1a2e', fontWeight: 800, fontSize: 14, border: '1.5px solid #ede8e0', cursor: 'pointer' }}>
          📖 Full Rules Guide
        </button>
      </div>
    </div>
  );
}
