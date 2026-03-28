import { h } from '../../constants';

export default function Badge({ children, color, bg }) {
  return (
    <span
      style={{
        fontSize: 7,
        fontWeight: 800,
        padding: '1px 4px',
        borderRadius: 2,
        color,
        background: bg,
        ...h,
      }}
    >
      {children}
    </span>
  );
}
