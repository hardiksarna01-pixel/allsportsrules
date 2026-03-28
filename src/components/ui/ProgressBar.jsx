export default function ProgressBar({ percent, color, height = 6 }) {
  return (
    <div style={{ width: '100%', background: '#ede8e0', borderRadius: height / 2, height, overflow: 'hidden' }}>
      <div
        style={{
          width: `${percent}%`,
          height: '100%',
          background: color,
          borderRadius: height / 2,
          transition: 'width .6s',
        }}
      />
    </div>
  );
}
