import { h } from '../../constants';

export default function DiagramCard({ d }) {
  if (!d) return null;

  return (
    <div
      style={{
        background: '#fff',
        border: '1.5px solid #ede8e0',
        borderRadius: 12,
        padding: '10px 12px',
        display: 'flex',
        gap: 10,
        alignItems: 'center',
        ...h,
      }}
    >
      <div
        style={{
          width: 32,
          height: 32,
          borderRadius: 8,
          background: '#f5f0ea',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 16,
          flexShrink: 0,
        }}
      >
        {d.type === 'field' ? '📐' : d.type === 'court' ? '🏟' : d.type === 'track' ? '🛤️' : '📊'}
      </div>
      <div>
        <div style={{ fontSize: 11, fontWeight: 700, color: '#2a2520' }}>{d.title}</div>
        {d.desc && (
          <div style={{ fontSize: 9, color: '#8a8380', marginTop: 2 }}>{d.desc}</div>
        )}
      </div>
    </div>
  );
}
