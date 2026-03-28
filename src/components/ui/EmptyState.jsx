import { h } from '../../constants';

export default function EmptyState({ icon, message }) {
  return (
    <div style={{ textAlign: 'center', padding: 30, ...h }}>
      <div style={{ fontSize: 24, opacity: 0.5 }}>{icon}</div>
      <div style={{ fontSize: 12, color: '#8a8380', marginTop: 6 }}>{message}</div>
    </div>
  );
}
