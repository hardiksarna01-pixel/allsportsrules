import { useNavigate } from 'react-router-dom';
import { h } from '../../constants';
import PlayerAvatar from '../sport/PlayerAvatar';

export default function PlayerProfilePage({ player, color }) {
  const navigate = useNavigate();
  if (!player) return null;

  const c = color || '#6366f1';

  return (
    <div style={{ ...h, paddingBottom: 80 }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', padding: '10px 0' }}>
        <button
          onClick={() => navigate(-1)}
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
      </div>

      {/* Avatar */}
      <div style={{ display: 'flex', justifyContent: 'center', margin: '8px 0 12px' }}>
        <PlayerAvatar nm={player.nm} co={player.co} c={c} sz={76} />
      </div>

      {/* Name / Info */}
      <div style={{ textAlign: 'center', marginBottom: 16 }}>
        <div style={{ fontSize: 18, fontWeight: 800, color: '#2a2520' }}>{player.nm}</div>
        {player.nk && (
          <div style={{ fontSize: 12, fontStyle: 'italic', color: c, marginTop: 2 }}>
            "{player.nk}"
          </div>
        )}
        {player.rl && (
          <div style={{ fontSize: 11, color: '#6a6560', marginTop: 4 }}>{player.rl}</div>
        )}
        <div style={{ display: 'flex', justifyContent: 'center', gap: 6, marginTop: 8, flexWrap: 'wrap' }}>
          {player.a ? (
            <span
              style={{
                fontSize: 8,
                fontWeight: 800,
                padding: '2px 8px',
                borderRadius: 4,
                background: '#22c55e18',
                color: '#16a34a',
                letterSpacing: 0.5,
              }}
            >
              ACTIVE
            </span>
          ) : (
            <span
              style={{
                fontSize: 8,
                fontWeight: 800,
                padding: '2px 8px',
                borderRadius: 4,
                background: '#8a838018',
                color: '#8a8380',
                letterSpacing: 0.5,
              }}
            >
              RETIRED
            </span>
          )}
          {player.died && (
            <span
              style={{
                fontSize: 8,
                fontWeight: 800,
                padding: '2px 8px',
                borderRadius: 4,
                background: '#ef444418',
                color: '#ef4444',
                letterSpacing: 0.5,
              }}
            >
              {player.died}
            </span>
          )}
          {player.nm && player.nm.includes('(W)') && (
            <span
              style={{
                fontSize: 8,
                fontWeight: 800,
                padding: '2px 8px',
                borderRadius: 4,
                background: '#ec489918',
                color: '#ec4899',
                letterSpacing: 0.5,
              }}
            >
              WOMEN
            </span>
          )}
        </div>
      </div>

      {/* Stats card */}
      {player.st && (
        <div
          style={{
            background: `linear-gradient(135deg, ${c}, ${c}cc)`,
            borderRadius: 14,
            padding: '14px 16px',
            marginBottom: 14,
          }}
        >
          <div
            style={{
              fontSize: 9,
              fontWeight: 800,
              color: '#ffffffaa',
              textTransform: 'uppercase',
              letterSpacing: 0.5,
              marginBottom: 6,
            }}
          >
            Career Stats
          </div>
          <div style={{ fontSize: 11, color: '#fff', lineHeight: 1.7, fontWeight: 600 }}>
            {player.st}
          </div>
        </div>
      )}

      {/* Achievements */}
      {player.ac && player.ac.length > 0 && (
        <div style={{ marginBottom: 14 }}>
          <div
            style={{
              fontSize: 10,
              fontWeight: 800,
              color: c,
              textTransform: 'uppercase',
              marginBottom: 8,
              letterSpacing: 0.5,
            }}
          >
            Achievements
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {player.ac.map((achievement, i) => (
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
                  animation: `fadeUp 0.3s ease ${i * 0.05}s both`,
                }}
              >
                <span style={{ fontSize: 16, flexShrink: 0 }}>🏅</span>
                <span style={{ fontSize: 11, fontWeight: 600, color: '#2a2520', lineHeight: 1.5 }}>
                  {achievement}
                </span>
              </div>
            ))}
          </div>
          <style>{`@keyframes fadeUp{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}`}</style>
        </div>
      )}

      {/* News */}
      {player.nw && player.nw.length > 0 && (
        <div>
          <div
            style={{
              fontSize: 10,
              fontWeight: 800,
              color: c,
              textTransform: 'uppercase',
              marginBottom: 8,
              letterSpacing: 0.5,
            }}
          >
            News
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {player.nw.map((item, i) => (
              <div
                key={i}
                style={{
                  background: '#fff',
                  border: '1.5px solid #ede8e0',
                  borderLeft: '3px solid #3b82f6',
                  borderRadius: 12,
                  padding: '10px 12px',
                  fontSize: 11,
                  fontWeight: 600,
                  color: '#2a2520',
                  lineHeight: 1.55,
                }}
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
