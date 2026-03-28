import { h } from '../../constants';

export default function SearchBar({ value, onChange, placeholder }) {
  return (
    <input
      type="text"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      style={{
        width: '100%',
        padding: '10px 14px',
        borderRadius: 12,
        background: '#fff',
        border: '1.5px solid #e2ddd5',
        fontSize: 13,
        fontWeight: 500,
        outline: 'none',
        boxSizing: 'border-box',
        ...h,
      }}
    />
  );
}
