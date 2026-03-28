import { useState } from 'react';
import { h } from '../../constants';
import { images } from '../../data/images';
import { sports } from '../../data/sports';

export default function SportImg({ id, style }) {
  const [error, setError] = useState(false);
  const src = images[id];

  if (error || !src) {
    return (
      <div
        style={{
          width: '100%',
          height: 120,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#f5f0ea',
          borderRadius: 12,
          fontSize: 32,
          ...h,
          ...style,
        }}
      >
        {(sports.find(s => s.id === id) || {}).i || '🏅'}
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={id}
      onError={() => setError(true)}
      style={{
        width: '100%',
        height: 120,
        objectFit: 'cover',
        borderRadius: 12,
        ...style,
      }}
    />
  );
}
