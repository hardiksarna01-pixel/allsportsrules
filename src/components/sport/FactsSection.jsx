import { useState } from 'react';
import { h } from '../../constants';

export default function FactsSection({ facts, details, color }) {
  const [expanded, setExpanded] = useState({});

  if (!facts || facts.length === 0) return null;

  const toggle = (i) => {
    setExpanded((prev) => ({ ...prev, [i]: !prev[i] }));
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6, ...h }}>
      {facts.map((fact, i) => {
        const hasDetail = details && details[i];
        const isOpen = expanded[i];

        return (
          <div
            key={i}
            onClick={hasDetail ? () => toggle(i) : undefined}
            style={{
              background: '#fff',
              border: '1.5px solid #ede8e0',
              borderRadius: 12,
              padding: '10px 12px',
              cursor: hasDetail ? 'pointer' : 'default',
              transition: 'border-color .2s',
              borderColor: isOpen ? color : '#ede8e0',
            }}
          >
            <div style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
              <span
                style={{
                  flexShrink: 0,
                  width: 20,
                  height: 20,
                  borderRadius: 6,
                  background: color + '18',
                  color: color,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 9,
                  fontWeight: 800,
                }}
              >
                {i + 1}
              </span>
              <span style={{ fontSize: 11, fontWeight: 600, color: '#2a2520', lineHeight: 1.5 }}>
                {fact}
              </span>
            </div>
            {hasDetail && isOpen && (
              <div
                style={{
                  marginTop: 6,
                  marginLeft: 28,
                  fontSize: 10,
                  color: '#6a6560',
                  lineHeight: 1.6,
                }}
              >
                {details[i]}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
