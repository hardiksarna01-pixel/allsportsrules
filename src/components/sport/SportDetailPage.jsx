import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { h } from '../../constants';
import SportImg from './SportImg';
import FieldDiagram from './FieldDiagram';
import FactsSection from './FactsSection';
import DiagramCard from './DiagramCard';
import PlayerAvatar from './PlayerAvatar';
import { useProfileContext } from '../../context/ProfileContext';
import { diagrams } from '../../data/diagrams';
import { positions as POSITIONS } from '../../data/positions';

const pill = {
  fontSize: 7,
  fontWeight: 800,
  padding: '2px 6px',
  borderRadius: 4,
  letterSpacing: 0.5,
};

export default function SportDetailPage({ sport, onBookmarkToggle }) {
  const [tab, setTab] = useState('rules');
  const navigate = useNavigate();
  const { isBookmarked } = useProfileContext();

  if (!sport) return null;

  const sp = sport;
  const sportId = sp.id;
  const c = sp.c || '#6366f1';
  const bookmarked = isBookmarked(sportId);

  // --- build tabs ---
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

  // --- render tab content ---
  const renderContent = () => {
    switch (tab) {
      case 'rules': {
        const d = diagrams[sportId];
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {d && <DiagramCard d={d} />}
            {(sp.r || []).map((rule, i) => (
              <div
                key={i}
                style={{
                  background: '#fff',
                  border: '1.5px solid #ede8e0',
                  borderRadius: 12,
                  padding: '10px 12px',
                  display: 'flex',
                  gap: 10,
                  alignItems: 'flex-start',
                }}
              >
                <span
                  style={{
                    flexShrink: 0,
                    width: 22,
                    height: 22,
                    borderRadius: 7,
                    background: c + '18',
                    color: c,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 10,
                    fontWeight: 800,
                  }}
                >
                  {i + 1}
                </span>
                <span style={{ fontSize: 11, fontWeight: 600, color: '#2a2520', lineHeight: 1.55 }}>
                  {rule}
                </span>
              </div>
            ))}
          </div>
        );
      }

      case 'positions': {
        const posData = POSITIONS[sportId];
        if (!posData) return null;
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <FieldDiagram sportId={sportId} />
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              {posData.list.map((pos) => (
                <div
                  key={pos.id}
                  style={{
                    background: '#fff',
                    border: '1.5px solid #ede8e0',
                    borderRadius: 12,
                    padding: '8px 12px',
                    display: 'flex',
                    gap: 10,
                    alignItems: 'center',
                  }}
                >
                  <span
                    style={{
                      width: 10,
                      height: 10,
                      borderRadius: '50%',
                      background: posData.color,
                      flexShrink: 0,
                    }}
                  />
                  <div>
                    <div style={{ fontSize: 11, fontWeight: 700, color: '#2a2520' }}>{pos.n}</div>
                    <div style={{ fontSize: 9, color: '#8a8380', marginTop: 1 }}>{pos.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      }

      case 'players':
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {(sp.p || []).map((player, i) => (
              <div
                key={i}
                onClick={() => navigate('player/' + i)}
                style={{
                  background: '#fff',
                  border: '1.5px solid #ede8e0',
                  borderRadius: 14,
                  padding: '10px 12px',
                  display: 'flex',
                  gap: 12,
                  alignItems: 'center',
                  cursor: 'pointer',
                  transition: 'box-shadow .2s',
                }}
              >
                <PlayerAvatar nm={player.nm} co={player.co} c={c} sz={40} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 12, fontWeight: 700, color: '#2a2520' }}>{player.nm}</div>
                  {player.nk && (
                    <div style={{ fontSize: 9, color: '#8a8380', fontStyle: 'italic' }}>
                      "{player.nk}"
                    </div>
                  )}
                  {player.rl && (
                    <div style={{ fontSize: 9, color: '#6a6560', marginTop: 1 }}>{player.rl}</div>
                  )}
                </div>
                {player.a && (
                  <span
                    style={{
                      ...pill,
                      background: '#22c55e18',
                      color: '#16a34a',
                    }}
                  >
                    ACTIVE
                  </span>
                )}
              </div>
            ))}
          </div>
        );

      case 'facts':
        return <FactsSection facts={sp.f} details={sp.fd_details} color={c} />;

      case 'equip':
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {(sp.eq || []).map((item, i) => (
              <div
                key={i}
                style={{
                  background: '#fff',
                  border: '1.5px solid #ede8e0',
                  borderRadius: 12,
                  padding: '10px 12px',
                  display: 'flex',
                  gap: 10,
                  alignItems: 'center',
                }}
              >
                <span
                  style={{
                    flexShrink: 0,
                    width: 22,
                    height: 22,
                    borderRadius: 7,
                    background: c + '18',
                    color: c,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 10,
                    fontWeight: 800,
                  }}
                >
                  {i + 1}
                </span>
                <span style={{ fontSize: 11, fontWeight: 600, color: '#2a2520' }}>
                  <span role="img" aria-label="equipment">🏷️</span> {item}
                </span>
              </div>
            ))}
          </div>
        );

      case 'field':
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <SportImg id={sportId} style={{ height: 160, borderRadius: 14 }} />
            <div
              style={{
                background: '#fff',
                border: '1.5px solid #ede8e0',
                borderRadius: 12,
                padding: '12px 14px',
                fontSize: 11,
                color: '#2a2520',
                lineHeight: 1.6,
              }}
            >
              {sp.fd}
            </div>
          </div>
        );

      case 'scoring':
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {sp.sc.pts && (
              <div
                style={{
                  background: '#fff',
                  border: '1.5px solid #ede8e0',
                  borderRadius: 14,
                  padding: '14px 14px',
                }}
              >
                <div style={{ fontSize: 10, fontWeight: 800, color: c, textTransform: 'uppercase', marginBottom: 6 }}>
                  How Points are Scored
                </div>
                <div style={{ fontSize: 11, color: '#2a2520', lineHeight: 1.6 }}>{sp.sc.pts}</div>
              </div>
            )}
            {sp.sc.win && (
              <div
                style={{
                  background: '#fff',
                  border: '1.5px solid #ede8e0',
                  borderRadius: 14,
                  padding: '14px 14px',
                }}
              >
                <div style={{ fontSize: 10, fontWeight: 800, color: c, textTransform: 'uppercase', marginBottom: 6 }}>
                  How to Win
                </div>
                <div style={{ fontSize: 11, color: '#2a2520', lineHeight: 1.6 }}>{sp.sc.win}</div>
              </div>
            )}
          </div>
        );

      case 'formats':
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {(sp.fmt || []).map((fmt, i) => {
              const dash = fmt.indexOf('\u2014');
              const title = dash > -1 ? fmt.slice(0, dash).trim() : fmt;
              const desc = dash > -1 ? fmt.slice(dash + 1).trim() : '';
              return (
                <div
                  key={i}
                  style={{
                    background: '#fff',
                    border: '1.5px solid #ede8e0',
                    borderRadius: 14,
                    padding: '12px 14px',
                  }}
                >
                  <div style={{ fontSize: 12, fontWeight: 700, color: '#2a2520' }}>{title}</div>
                  {desc && (
                    <div style={{ fontSize: 10, color: '#6a6560', marginTop: 4, lineHeight: 1.5 }}>
                      {desc}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        );

      case 'history':
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <SportImg id={sportId} style={{ height: 140, borderRadius: 14 }} />
            <div
              style={{
                background: '#fff',
                border: '1.5px solid #ede8e0',
                borderRadius: 12,
                padding: '12px 14px',
                fontSize: 11,
                color: '#2a2520',
                lineHeight: 1.7,
              }}
            >
              {sp.hist}
            </div>
          </div>
        );

      case 'officials':
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {sp.gb && (
              <div
                style={{
                  background: c + '10',
                  border: `1.5px solid ${c}30`,
                  borderRadius: 14,
                  padding: '12px 14px',
                  display: 'flex',
                  gap: 10,
                  alignItems: 'center',
                }}
              >
                <span style={{ fontSize: 18 }}>🏛️</span>
                <div>
                  <div style={{ fontSize: 9, fontWeight: 700, color: c, textTransform: 'uppercase' }}>
                    Governing Body
                  </div>
                  <div style={{ fontSize: 12, fontWeight: 700, color: '#2a2520', marginTop: 2 }}>
                    {sp.gb}
                  </div>
                </div>
              </div>
            )}
            {(sp.off || []).map((official, i) => (
              <div
                key={i}
                style={{
                  background: '#fff',
                  border: '1.5px solid #ede8e0',
                  borderRadius: 12,
                  padding: '10px 12px',
                  display: 'flex',
                  gap: 10,
                  alignItems: 'center',
                }}
              >
                <span style={{ fontSize: 16 }}>👨‍⚖️</span>
                <span style={{ fontSize: 11, fontWeight: 600, color: '#2a2520' }}>{official}</span>
              </div>
            ))}
          </div>
        );

      case 'tactics':
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {(sp.tac || []).map((tac, i) => {
              const sep = tac.indexOf(' \u2014 ');
              const title = sep > -1 ? tac.slice(0, sep).trim() : tac;
              const desc = sep > -1 ? tac.slice(sep + 3).trim() : '';
              return (
                <div
                  key={i}
                  style={{
                    background: '#fff',
                    border: '1.5px solid #ede8e0',
                    borderRadius: 14,
                    padding: '12px 14px',
                  }}
                >
                  <div style={{ fontSize: 12, fontWeight: 700, color: '#2a2520' }}>{title}</div>
                  {desc && (
                    <div style={{ fontSize: 10, color: '#6a6560', marginTop: 4, lineHeight: 1.5 }}>
                      {desc}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        );

      case 'faq':
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {(sp.faq || []).map((item, i) => (
              <details
                key={i}
                style={{
                  background: '#fff',
                  border: '1.5px solid #ede8e0',
                  borderRadius: 12,
                  padding: '10px 14px',
                }}
              >
                <summary
                  style={{
                    fontSize: 11,
                    fontWeight: 700,
                    color: '#2a2520',
                    cursor: 'pointer',
                    listStyle: 'none',
                    display: 'flex',
                    gap: 6,
                    alignItems: 'center',
                  }}
                >
                  <span style={{ color: c, fontWeight: 800, fontSize: 10 }}>Q</span>
                  {item.q}
                </summary>
                <div
                  style={{
                    marginTop: 8,
                    fontSize: 10,
                    color: '#6a6560',
                    lineHeight: 1.6,
                    paddingLeft: 16,
                  }}
                >
                  {item.a}
                </div>
              </details>
            ))}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div style={{ ...h, paddingBottom: 80 }}>
      {/* Top bar */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '10px 0',
        }}
      >
        <button
          onClick={() => navigate('/')}
          style={{
            background: '#f5f0ea',
            border: 'none',
            borderRadius: 10,
            width: 34,
            height: 34,
            fontSize: 16,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          ←
        </button>
        <div style={{ display: 'flex', gap: 6 }}>
          <button
            onClick={() => onBookmarkToggle && onBookmarkToggle(sportId)}
            style={{
              background: '#f5f0ea',
              border: 'none',
              borderRadius: 10,
              width: 34,
              height: 34,
              fontSize: 16,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {bookmarked ? '\uD83D\uDCCC' : '\uD83D\uDD16'}
          </button>
          <button
            onClick={handleShare}
            style={{
              background: '#f5f0ea',
              border: 'none',
              borderRadius: 10,
              width: 34,
              height: 34,
              fontSize: 16,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            📤
          </button>
        </div>
      </div>

      {/* Hero image */}
      <div style={{ position: 'relative', borderRadius: 16, overflow: 'hidden', marginBottom: 12 }}>
        <SportImg id={sportId} style={{ height: 160, borderRadius: 16 }} />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: `linear-gradient(180deg, transparent 30%, ${c}dd 100%)`,
            borderRadius: 16,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end',
            padding: '14px 16px',
          }}
        >
          <div style={{ fontSize: 28 }}>{sp.emoji || ''}</div>
          <div style={{ fontSize: 18, fontWeight: 800, color: '#fff', marginTop: 2 }}>
            {sp.nm || sportId}
          </div>
          <div style={{ display: 'flex', gap: 6, alignItems: 'center', marginTop: 4, flexWrap: 'wrap' }}>
            {sp.fc && (
              <span style={{ fontSize: 9, color: '#ffffffcc', fontWeight: 600 }}>
                👥 {sp.fc} fans
              </span>
            )}
            {sp.ol && (
              <span style={{ ...pill, background: '#fbbf2430', color: '#fbbf24' }}>
                🏅 OLYMPIC
              </span>
            )}
          </div>
          <div style={{ display: 'flex', gap: 4, marginTop: 6, flexWrap: 'wrap' }}>
            {sp.ty && (
              <span style={{ ...pill, background: '#ffffff25', color: '#fff' }}>
                {sp.ty === 'team' ? 'TEAM' : sp.ty === 'individual' ? 'INDIVIDUAL' : 'BOTH'}
              </span>
            )}
            {sp.ct && (
              <span style={{ ...pill, background: '#ffffff25', color: '#fff' }}>
                {sp.ct === 'full' ? 'FULL CONTACT' : sp.ct === 'limited' ? 'LIMITED CONTACT' : 'NON-CONTACT'}
              </span>
            )}
            {sp.gb && (
              <span style={{ ...pill, background: '#ffffff25', color: '#fff' }}>
                {sp.gb}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Birthday alert */}
      {sp.bd && sp.bd.length > 0 && (
        <div
          style={{
            background: '#fef9c3',
            border: '1.5px solid #fde047',
            borderRadius: 14,
            padding: '10px 14px',
            marginBottom: 12,
            display: 'flex',
            gap: 10,
            alignItems: 'center',
          }}
        >
          <span style={{ fontSize: 22, animation: 'bounce 1s infinite' }}>🎂</span>
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, color: '#854d0e' }}>Birthday Alert!</div>
            {sp.bd.map((b, i) => (
              <div key={i} style={{ fontSize: 9, color: '#a16207', marginTop: 2 }}>{b}</div>
            ))}
          </div>
          <style>{`@keyframes bounce{0%,100%{transform:translateY(0)}50%{transform:translateY(-4px)}}`}</style>
        </div>
      )}

      {/* Comparison card */}
      {sp.cs && sp.cs.length > 0 && (
        <div
          style={{
            background: '#fff',
            border: '1.5px solid #ede8e0',
            borderRadius: 14,
            padding: '12px 14px',
            marginBottom: 12,
          }}
        >
          <div style={{ fontSize: 10, fontWeight: 800, color: c, textTransform: 'uppercase', marginBottom: 8 }}>
            Quick Comparisons
          </div>
          {sp.cs.map((row, i) => (
            <div
              key={i}
              style={{
                display: 'flex',
                gap: 8,
                alignItems: 'flex-start',
                marginBottom: i < sp.cs.length - 1 ? 8 : 0,
                paddingBottom: i < sp.cs.length - 1 ? 8 : 0,
                borderBottom: i < sp.cs.length - 1 ? '1px solid #f5f0ea' : 'none',
              }}
            >
              <span style={{ fontSize: 14, flexShrink: 0 }}>🔄</span>
              <div>
                <div style={{ fontSize: 11, fontWeight: 700, color: '#2a2520' }}>{row.map}</div>
                {row.desc && (
                  <div style={{ fontSize: 9, color: '#8a8380', marginTop: 2 }}>{row.desc}</div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tab navigation */}
      <div
        style={{
          display: 'flex',
          gap: 6,
          overflowX: 'auto',
          paddingBottom: 8,
          marginBottom: 10,
          WebkitOverflowScrolling: 'touch',
          scrollbarWidth: 'none',
        }}
      >
        {tabs.map((t) => {
          const active = tab === t.key;
          return (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              style={{
                flexShrink: 0,
                padding: '5px 10px',
                borderRadius: 8,
                border: 'none',
                fontSize: 10,
                fontWeight: 700,
                cursor: 'pointer',
                background: active ? c : '#f5f0ea',
                color: active ? '#fff' : '#5a5550',
                transition: 'background .2s, color .2s',
                display: 'flex',
                gap: 4,
                alignItems: 'center',
                ...h,
              }}
            >
              {t.label}
              {t.count != null && (
                <span
                  style={{
                    fontSize: 8,
                    fontWeight: 800,
                    background: active ? '#ffffff30' : '#e8e3db',
                    color: active ? '#fff' : '#8a8380',
                    borderRadius: 4,
                    padding: '0 3px',
                    lineHeight: '14px',
                  }}
                >
                  {t.count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Tab content */}
      {renderContent()}
    </div>
  );
}
