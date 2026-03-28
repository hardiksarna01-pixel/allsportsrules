import { useNavigate } from 'react-router-dom';
import { h } from '../../constants';
import { useProfileContext } from '../../context/ProfileContext';

export default function Header() {
  const navigate = useNavigate();
  const { sk, xp } = useProfileContext();

  return (
    <div
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 100,
        padding: '9px 14px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        background: 'rgba(251,248,243,.88)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        borderBottom: '1px solid #ede8e0',
        ...h,
      }}
    >
      <div
        onClick={() => navigate('/')}
        style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}
      >
        <div
          style={{
            width: 28,
            height: 28,
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #16a34a, #2563eb)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 14,
          }}
        >
          🏟
        </div>
        <span style={{ fontWeight: 800, fontSize: 15, color: '#1a1a1a' }}>SportDecoded</span>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
        <span
          style={{
            fontSize: 9,
            fontWeight: 800,
            padding: '2px 6px',
            borderRadius: 6,
            background: '#fef3c7',
            color: '#92400e',
          }}
        >
          🔥 {sk}
        </span>
        <span
          style={{
            fontSize: 9,
            fontWeight: 800,
            padding: '2px 6px',
            borderRadius: 6,
            background: '#dbeafe',
            color: '#1e40af',
          }}
        >
          💎 {xp}
        </span>
        <button
          onClick={() => navigate('/search')}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            fontSize: 16,
            padding: '2px 4px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          aria-label="Search"
        >
          🔍
        </button>
      </div>
    </div>
  );
}
