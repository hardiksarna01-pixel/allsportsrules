import { h } from '../../constants';

function getInitials(name) {
  if (!name) return '?';
  return name
    .split(' ')
    .map((w) => w[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

export default function PlayerAvatar({ nm, co, c, sz = 72 }) {
  return (
    <div style={{ position: 'relative', width: sz, height: sz }}>
      <div
        style={{
          width: sz,
          height: sz,
          borderRadius: '50%',
          background: `linear-gradient(135deg, ${c || '#888'}, ${c || '#888'}cc)`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#fff',
          fontSize: sz * 0.32,
          fontWeight: 800,
          ...h,
        }}
      >
        {getInitials(nm)}
      </div>
      {co && (
        <span
          style={{
            position: 'absolute',
            bottom: 0,
            right: 0,
            fontSize: sz * 0.25,
            lineHeight: 1,
          }}
        >
          {co}
        </span>
      )}
    </div>
  );
}
