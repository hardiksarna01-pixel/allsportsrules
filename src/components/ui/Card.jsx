import { useState } from 'react';
import { h } from '../../constants';

const base = {
  background: '#fff',
  borderRadius: 16,
  border: '1.5px solid #ede8e0',
  boxShadow: '0 2px 8px rgba(0,0,0,.03)',
  ...h,
};

export default function Card({ children, style, onClick }) {
  const [hovered, setHovered] = useState(false);

  const hoverStyle =
    onClick && hovered
      ? { transform: 'translateY(-2px)', boxShadow: '0 6px 20px rgba(0,0,0,.08)' }
      : {};

  return (
    <div
      style={{ ...base, cursor: onClick ? 'pointer' : undefined, transition: 'transform .2s, box-shadow .2s', ...hoverStyle, ...style }}
      onClick={onClick}
      onMouseEnter={onClick ? () => setHovered(true) : undefined}
      onMouseLeave={onClick ? () => setHovered(false) : undefined}
    >
      {children}
    </div>
  );
}
