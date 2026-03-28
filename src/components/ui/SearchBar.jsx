import { useState } from 'react';
import { h } from '../../constants';

export default function SearchBar({ value, onChange, placeholder }) {
  const [focused, setFocused] = useState(false);
  return (
    <div style={{
      position: 'relative',
      width: '100%',
    }}>
      <span style={{
        position: 'absolute',
        left: 16,
        top: '50%',
        transform: 'translateY(-50%)',
        fontSize: 18,
        pointerEvents: 'none',
        opacity: focused ? 0.8 : 0.45,
        transition: 'opacity 0.2s',
      }}>{'\uD83D\uDD0D'}</span>
      <input
        type="text"
        value={value}
        onChange={onChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        placeholder={placeholder}
        style={{
          width: '100%',
          padding: '14px 18px 14px 46px',
          borderRadius: 16,
          background: focused ? '#fff' : '#f8f7f5',
          border: focused ? '2px solid #2563eb' : '1.5px solid #e2ddd5',
          fontSize: 15,
          fontWeight: 500,
          outline: 'none',
          boxSizing: 'border-box',
          boxShadow: focused ? '0 8px 24px rgba(37,99,235,0.12)' : '0 2px 8px rgba(0,0,0,0.03)',
          transition: 'all 0.25s cubic-bezier(.4,0,.2,1)',
          color: '#1a1a2e',
          ...h,
        }}
      />
    </div>
  );
}
