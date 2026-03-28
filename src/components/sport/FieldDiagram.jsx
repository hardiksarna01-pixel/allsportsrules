import { useState } from 'react';
import { h } from '../../constants';
import { positions } from '../../data/positions';

const FIELD_W = 280;
const FIELD_H = 200;

function FieldMarkings({ shape, color }) {
  const dim = '#fff3';

  if (shape === 'oval') {
    return (
      <ellipse cx={FIELD_W / 2} cy={FIELD_H / 2} rx={FIELD_W / 2 - 10} ry={FIELD_H / 2 - 10}
        fill="none" stroke={dim} strokeWidth={1.5} />
    );
  }

  if (shape === 'rect') {
    return (
      <g>
        <rect x={10} y={10} width={FIELD_W - 20} height={FIELD_H - 20}
          fill="none" stroke={dim} strokeWidth={1.5} rx={2} />
        <line x1={10} y1={FIELD_H / 2} x2={FIELD_W - 10} y2={FIELD_H / 2}
          stroke={dim} strokeWidth={1} />
        <circle cx={FIELD_W / 2} cy={FIELD_H / 2} r={20}
          fill="none" stroke={dim} strokeWidth={1} />
      </g>
    );
  }

  if (shape === 'court') {
    return (
      <g>
        <rect x={10} y={10} width={FIELD_W - 20} height={FIELD_H - 20}
          fill="none" stroke={dim} strokeWidth={1.5} rx={2} />
        <line x1={10} y1={FIELD_H / 2} x2={FIELD_W - 10} y2={FIELD_H / 2}
          stroke={dim} strokeWidth={1} />
        <circle cx={FIELD_W / 2} cy={FIELD_H / 2} r={16}
          fill="none" stroke={dim} strokeWidth={1} />
        <rect x={FIELD_W / 2 - 40} y={10} width={80} height={30}
          fill="none" stroke={dim} strokeWidth={1} />
        <rect x={FIELD_W / 2 - 40} y={FIELD_H - 40} width={80} height={30}
          fill="none" stroke={dim} strokeWidth={1} />
      </g>
    );
  }

  if (shape === 'diamond') {
    const cx = FIELD_W / 2;
    return (
      <g>
        <polygon
          points={`${cx},${FIELD_H - 30} ${FIELD_W - 30},${FIELD_H / 2} ${cx},30 30,${FIELD_H / 2}`}
          fill="none" stroke={dim} strokeWidth={1.5} />
        <polygon
          points={`${cx},${FIELD_H - 50} ${cx + 30},${FIELD_H / 2 + 10} ${cx},${FIELD_H / 2 - 20} ${cx - 30},${FIELD_H / 2 + 10}`}
          fill="none" stroke={dim} strokeWidth={1} />
      </g>
    );
  }

  if (shape === 'track') {
    return (
      <g>
        <rect x={40} y={30} width={FIELD_W - 80} height={FIELD_H - 60}
          fill="none" stroke={dim} strokeWidth={1.5} rx={50} />
        <rect x={55} y={45} width={FIELD_W - 110} height={FIELD_H - 90}
          fill="none" stroke={dim} strokeWidth={1} rx={40} />
      </g>
    );
  }

  return null;
}

export default function FieldDiagram({ sportId }) {
  const [selected, setSelected] = useState(null);
  const data = positions[sportId];

  if (!data) return null;

  const { shape, color, list } = data;
  const sel = list.find((p) => p.id === selected);

  return (
    <div style={{ ...h }}>
      <div
        style={{
          background: color,
          borderRadius: 14,
          padding: 10,
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <svg
          viewBox={`0 0 ${FIELD_W} ${FIELD_H}`}
          style={{ width: '100%', height: 'auto', display: 'block' }}
        >
          <FieldMarkings shape={shape} color={color} />

          {list.map((pos) => {
            const isSelected = selected === pos.id;
            const px = (pos.x / 100) * FIELD_W;
            const py = (pos.y / 100) * FIELD_H;
            return (
              <g
                key={pos.id}
                onClick={() => setSelected(isSelected ? null : pos.id)}
                style={{ cursor: 'pointer' }}
              >
                <circle
                  cx={px}
                  cy={py}
                  r={isSelected ? 10 : 7}
                  fill={isSelected ? '#fff' : 'rgba(255,255,255,.85)'}
                  stroke={isSelected ? '#fff' : 'none'}
                  strokeWidth={2}
                />
                <text
                  x={px}
                  y={py + 1}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  style={{
                    fontSize: 5,
                    fontWeight: 800,
                    fill: color,
                    pointerEvents: 'none',
                    fontFamily: "'Outfit', sans-serif",
                  }}
                >
                  {pos.id.toUpperCase()}
                </text>
              </g>
            );
          })}
        </svg>

        {sel && (
          <div
            style={{
              position: 'absolute',
              bottom: 10,
              left: 10,
              right: 10,
              background: 'rgba(0,0,0,.7)',
              borderRadius: 10,
              padding: '8px 10px',
              color: '#fff',
            }}
          >
            <div style={{ fontWeight: 800, fontSize: 11 }}>{sel.n}</div>
            <div style={{ fontSize: 9, opacity: 0.85, marginTop: 2 }}>{sel.desc}</div>
          </div>
        )}
      </div>

      <div
        style={{
          display: 'flex',
          gap: 4,
          overflowX: 'auto',
          padding: '8px 0 2px',
        }}
      >
        {list.map((pos) => (
          <div
            key={pos.id}
            onClick={() => setSelected(selected === pos.id ? null : pos.id)}
            style={{
              flexShrink: 0,
              padding: '3px 7px',
              borderRadius: 6,
              fontSize: 8,
              fontWeight: 700,
              cursor: 'pointer',
              background: selected === pos.id ? color : '#f5f0ea',
              color: selected === pos.id ? '#fff' : '#5a5550',
              transition: 'background .2s, color .2s',
            }}
          >
            {pos.n}
          </div>
        ))}
      </div>
    </div>
  );
}
