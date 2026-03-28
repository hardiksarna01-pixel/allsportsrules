import { useState } from 'react';
import { h } from '../../constants';

const CALCS = [
  { id: 'rr', icon: '\u{1F4CA}', name: 'Run Rate Calculator', sport: 'Cricket', color: '#16a34a', desc: 'Chase target, current/required rate, projected score' },
  { id: 'f1pts', icon: '\u{1F3CE}\uFE0F', name: 'F1 Points Calculator', sport: 'Formula 1', color: '#dc2626', desc: 'Points by position + fastest lap bonus' },
  { id: 'xg', icon: '\u{1F3AF}', name: 'xG Calculator', sport: 'Football', color: '#2563eb', desc: 'Expected goals, conversion rate, shot quality' },
  { id: 'per', icon: '\u2B50', name: 'PER Calculator', sport: 'Basketball', color: '#ea580c', desc: 'Player Efficiency Rating from box score stats' },
  { id: 'dls', icon: '\u{1F327}\uFE0F', name: 'DLS Target Calculator', sport: 'Cricket', color: '#16a34a', desc: 'Rain-adjusted target using Duckworth-Lewis-Stern' },
  { id: 'league', icon: '\u{1F3C6}', name: 'League Table Simulator', sport: 'Football', color: '#2563eb', desc: 'Simulate points from remaining matches' },
  { id: 'serve', icon: '\u{1F3BE}', name: 'Serve Speed Converter', sport: 'Tennis', color: '#ca8a04', desc: 'Convert between mph, km/h, and m/s' },
  { id: 'bmi', icon: '\u{1F4AA}', name: 'Athlete BMI Calculator', sport: 'General', color: '#7c3aed', desc: 'Compare your BMI to top athletes by sport' },
];

const F1_POINTS = [25, 18, 15, 12, 10, 8, 6, 4, 2, 1];

const defaultVals = {
  target: 180, overs: 20, cur: 90, bowled: 10,
  runs1: 0, wkts1: 0, resource: 100,
  f1pos: 1, laps: 57, fastest: false,
  goals: 0, shots: 0, xg: 0,
  pts: 0, reb: 0, ast: 0, min: 0, fga: 0, fta: 0, to: 0,
};

const s = {
  page: { padding: 20, maxWidth: 700, margin: '0 auto', ...h },
  header: { fontSize: 28, fontWeight: 800, marginBottom: 4 },
  sub: { color: '#78716c', fontSize: 15, marginBottom: 24 },
  card: {
    display: 'flex', alignItems: 'center', gap: 14, padding: 16,
    background: '#fff', borderRadius: 14, border: '1.5px solid #ede8e0',
    cursor: 'pointer', marginBottom: 10, transition: 'transform .15s, box-shadow .15s',
  },
  iconBox: {
    width: 40, height: 40, borderRadius: 10, display: 'flex',
    alignItems: 'center', justifyContent: 'center', fontSize: 20, flexShrink: 0,
  },
  cardName: { fontWeight: 700, fontSize: 15, marginBottom: 2 },
  cardDesc: { fontSize: 13, color: '#78716c', lineHeight: 1.3 },
  tag: {
    fontSize: 11, fontWeight: 600, padding: '2px 8px', borderRadius: 6,
    marginLeft: 'auto', flexShrink: 0,
  },
  back: {
    display: 'inline-flex', alignItems: 'center', gap: 6, background: 'none',
    border: 'none', cursor: 'pointer', fontSize: 14, fontWeight: 600,
    color: '#2563eb', padding: 0, marginBottom: 16,
  },
  calcHeader: { display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 },
  calcIcon: {
    width: 44, height: 44, borderRadius: 12, display: 'flex',
    alignItems: 'center', justifyContent: 'center', fontSize: 22,
  },
  calcTitle: { fontWeight: 800, fontSize: 22 },
  label: { fontSize: 13, fontWeight: 600, color: '#57534e', marginBottom: 4, display: 'block' },
  input: {
    width: '100%', padding: '10px 12px', fontSize: 16, borderRadius: 10,
    border: '1.5px solid #d6d3d1', outline: 'none', boxSizing: 'border-box',
    fontWeight: 600, background: '#fafaf9',
  },
  inputGroup: { marginBottom: 14 },
  row: { display: 'grid', gap: 12, marginBottom: 14 },
  resultCard: {
    padding: 16, borderRadius: 12, textAlign: 'center',
    borderLeft: '4px solid',
  },
  resultVal: { fontSize: 28, fontWeight: 800, marginBottom: 2 },
  resultLabel: { fontSize: 12, fontWeight: 600, color: '#78716c' },
  note: {
    fontSize: 13, color: '#78716c', background: '#fafaf9',
    padding: 12, borderRadius: 10, marginTop: 14, lineHeight: 1.5,
  },
  toggleBtn: {
    padding: '10px 18px', borderRadius: 10, border: '2px solid #d6d3d1',
    cursor: 'pointer', fontWeight: 700, fontSize: 14, transition: 'all .15s',
  },
  table: {
    width: '100%', borderCollapse: 'collapse', fontSize: 13, marginTop: 10,
  },
  th: {
    textAlign: 'left', padding: '8px 10px', fontWeight: 700, fontSize: 12,
    color: '#78716c', borderBottom: '2px solid #ede8e0',
  },
  td: { padding: '8px 10px', borderBottom: '1px solid #f0ede8' },
};

function Input({ label, value, onChange, min, max, step }) {
  return (
    <div style={s.inputGroup}>
      <label style={s.label}>{label}</label>
      <input
        type="number"
        style={s.input}
        value={value}
        min={min}
        max={max}
        step={step || 1}
        onChange={e => onChange(e.target.value)}
      />
    </div>
  );
}

function ResultCard({ value, label, color }) {
  return (
    <div style={{ ...s.resultCard, borderLeftColor: color, background: color + '10' }}>
      <div style={{ ...s.resultVal, color }}>{value}</div>
      <div style={s.resultLabel}>{label}</div>
    </div>
  );
}

function CalcRunRate({ vals, up }) {
  const crr = vals.bowled > 0 ? (vals.cur / vals.bowled) : 0;
  const remaining = vals.overs - vals.bowled;
  const rrr = remaining > 0 ? ((vals.target - vals.cur) / remaining) : 0;
  const projected = vals.bowled > 0 ? ((vals.cur / vals.bowled) * vals.overs) : 0;
  const runsNeeded = vals.target - vals.cur;
  const ballsLeft = remaining * 6;

  return (
    <div>
      <div style={{ ...s.row, gridTemplateColumns: '1fr 1fr' }}>
        <Input label="Target Score" value={vals.target} onChange={v => up('target', v)} min={0} />
        <Input label="Total Overs" value={vals.overs} onChange={v => up('overs', v)} min={1} />
      </div>
      <div style={{ ...s.row, gridTemplateColumns: '1fr 1fr' }}>
        <Input label="Current Score" value={vals.cur} onChange={v => up('cur', v)} min={0} />
        <Input label="Overs Bowled" value={vals.bowled} onChange={v => up('bowled', v)} min={0} step={0.1} />
      </div>
      <div style={{ ...s.row, gridTemplateColumns: '1fr 1fr 1fr' }}>
        <ResultCard value={crr.toFixed(2)} label="Current RR" color="#2563eb" />
        <ResultCard value={rrr.toFixed(2)} label="Required RR" color={rrr > 12 ? '#dc2626' : '#16a34a'} />
        <ResultCard value={Math.round(projected)} label="Projected" color="#ca8a04" />
      </div>
      <div style={s.note}>
        Need <strong>{runsNeeded > 0 ? runsNeeded : 0} runs</strong> from <strong>{remaining.toFixed(1)} overs</strong> ({ballsLeft > 0 ? Math.round(ballsLeft) : 0} balls)
      </div>
    </div>
  );
}

function CalcF1Points({ vals, up }) {
  const pos = Math.max(1, Math.min(20, vals.f1pos));
  const base = pos <= 10 ? F1_POINTS[pos - 1] : 0;
  const bonus = vals.fastest && pos <= 10 ? 1 : 0;
  const total = base + bonus;

  return (
    <div>
      <Input label="Finishing Position (1-20)" value={vals.f1pos} onChange={v => up('f1pos', v)} min={1} max={20} />
      <div style={{ marginBottom: 14 }}>
        <label style={s.label}>Fastest Lap</label>
        <button
          style={{
            ...s.toggleBtn,
            background: vals.fastest ? '#dc2626' : '#fff',
            color: vals.fastest ? '#fff' : '#57534e',
            borderColor: vals.fastest ? '#dc2626' : '#d6d3d1',
          }}
          onClick={() => up('fastest', !vals.fastest)}
        >
          {vals.fastest ? 'YES' : 'NO'}
        </button>
      </div>
      <div style={{ textAlign: 'center', padding: 24, background: '#fef2f2', borderRadius: 14, marginBottom: 14 }}>
        <div style={{ fontSize: 48, fontWeight: 900, color: '#dc2626' }}>{total}</div>
        <div style={{ fontSize: 14, fontWeight: 600, color: '#78716c' }}>Points for P{pos}</div>
        {bonus > 0 && <div style={{ fontSize: 13, color: '#dc2626', fontWeight: 600, marginTop: 4 }}>+1 Fastest Lap Bonus</div>}
      </div>
      <div style={s.note}>
        <strong>Points Reference</strong>
        <table style={s.table}>
          <thead>
            <tr>
              <th style={s.th}>Pos</th>
              <th style={s.th}>Pts</th>
              <th style={s.th}>Pos</th>
              <th style={s.th}>Pts</th>
            </tr>
          </thead>
          <tbody>
            {[0, 1, 2, 3, 4].map(i => (
              <tr key={i}>
                <td style={s.td}>P{i + 1}</td>
                <td style={{ ...s.td, fontWeight: 700 }}>{F1_POINTS[i]}</td>
                <td style={s.td}>P{i + 6}</td>
                <td style={{ ...s.td, fontWeight: 700 }}>{F1_POINTS[i + 5]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function CalcXG({ vals, up }) {
  const conv = vals.shots > 0 ? ((vals.goals / vals.shots) * 100) : 0;
  const xgPerShot = vals.shots > 0 ? (vals.goals / vals.shots) : 0;

  return (
    <div>
      <div style={{ ...s.row, gridTemplateColumns: '1fr 1fr' }}>
        <Input label="Goals Scored" value={vals.goals} onChange={v => up('goals', v)} min={0} />
        <Input label="Total Shots" value={vals.shots} onChange={v => up('shots', v)} min={0} />
      </div>
      <div style={{ ...s.row, gridTemplateColumns: '1fr 1fr' }}>
        <ResultCard value={conv.toFixed(1) + '%'} label="Conversion Rate" color="#2563eb" />
        <ResultCard value={xgPerShot.toFixed(3)} label="xG Per Shot" color="#16a34a" />
      </div>
      <div style={s.note}>
        Average xG per shot in top leagues is around <strong>0.10 - 0.12</strong>.
        A conversion rate above 15% is considered clinical finishing.
      </div>
    </div>
  );
}

function CalcPER({ vals, up }) {
  const minSafe = vals.min > 0 ? vals.min : 1;
  const per = ((vals.pts + vals.reb + vals.ast - vals.to) / (minSafe / 48)) * 15;

  let tier = 'Below Average';
  let tierColor = '#78716c';
  if (per >= 25) { tier = 'MVP Level'; tierColor = '#ca8a04'; }
  else if (per >= 20) { tier = 'All-Star'; tierColor = '#2563eb'; }
  else if (per >= 15) { tier = 'Above Average'; tierColor = '#16a34a'; }

  return (
    <div>
      <div style={{ ...s.row, gridTemplateColumns: '1fr 1fr 1fr' }}>
        <Input label="Points" value={vals.pts} onChange={v => up('pts', v)} min={0} />
        <Input label="Rebounds" value={vals.reb} onChange={v => up('reb', v)} min={0} />
        <Input label="Assists" value={vals.ast} onChange={v => up('ast', v)} min={0} />
      </div>
      <div style={{ ...s.row, gridTemplateColumns: '1fr 1fr' }}>
        <Input label="Turnovers" value={vals.to} onChange={v => up('to', v)} min={0} />
        <Input label="Minutes Played" value={vals.min} onChange={v => up('min', v)} min={0} />
      </div>
      <div style={{ textAlign: 'center', padding: 24, background: tierColor + '10', borderRadius: 14, borderLeft: `4px solid ${tierColor}`, marginBottom: 14 }}>
        <div style={{ fontSize: 48, fontWeight: 900, color: tierColor }}>{per.toFixed(1)}</div>
        <div style={{ fontSize: 14, fontWeight: 700, color: tierColor }}>{tier}</div>
      </div>
      <div style={s.note}>
        League avg: <strong>15.0</strong> &middot; All-Star: <strong>20+</strong> &middot; MVP: <strong>25+</strong>
      </div>
    </div>
  );
}

function CalcDLS({ vals, up }) {
  const wktsLost = Math.max(0, Math.min(10, vals.wkts1));
  const oversAvail = Math.max(0, vals.runs1);
  const totalOvers = Math.max(1, vals.overs);
  const oversFrac = oversAvail / totalOvers;
  const wktFactor = 1 - (wktsLost * 0.075);
  const resourcePct = Math.max(0, Math.min(100, oversFrac * wktFactor * 100));
  const revisedTarget = Math.ceil((vals.target * resourcePct) / 100);

  return (
    <div>
      <div style={{ ...s.row, gridTemplateColumns: '1fr 1fr' }}>
        <Input label="Original Target" value={vals.target} onChange={v => up('target', v)} min={0} />
        <Input label="Total Overs" value={vals.overs} onChange={v => up('overs', v)} min={1} />
      </div>
      <div style={{ ...s.row, gridTemplateColumns: '1fr 1fr' }}>
        <Input label="Overs Available" value={vals.runs1} onChange={v => up('runs1', v)} min={0} />
        <Input label="Wickets Lost" value={vals.wkts1} onChange={v => up('wkts1', v)} min={0} max={10} />
      </div>
      <div style={{ ...s.row, gridTemplateColumns: '1fr 1fr' }}>
        <ResultCard value={resourcePct.toFixed(1) + '%'} label="Resources Available" color="#2563eb" />
        <ResultCard value={revisedTarget} label="Revised Target" color="#16a34a" />
      </div>
      <div style={s.note}>
        This is a <strong>simplified approximation</strong> of the Duckworth-Lewis-Stern method.
        The actual DLS uses complex resource tables maintained by the ICC.
      </div>
    </div>
  );
}

function CalcServe({ vals, up }) {
  const mph = vals.target || 0;
  const kmh = mph * 1.60934;
  const ms = mph * 0.44704;
  const knots = mph * 0.868976;

  const refs = [
    { name: 'Sam Groth (record)', mph: 163.7 },
    { name: 'John Isner', mph: 157.2 },
    { name: 'Serena Williams', mph: 128.6 },
    { name: 'Average pro (M)', mph: 120 },
    { name: 'Average pro (F)', mph: 100 },
  ];

  return (
    <div>
      <Input label="Speed in MPH" value={vals.target} onChange={v => up('target', v)} min={0} />
      <div style={{ ...s.row, gridTemplateColumns: '1fr 1fr 1fr' }}>
        <ResultCard value={kmh.toFixed(1)} label="km/h" color="#2563eb" />
        <ResultCard value={ms.toFixed(2)} label="m/s" color="#16a34a" />
        <ResultCard value={knots.toFixed(1)} label="knots" color="#ca8a04" />
      </div>
      <div style={s.note}>
        <strong>Serve Speed Reference</strong>
        <table style={s.table}>
          <thead>
            <tr>
              <th style={s.th}>Player</th>
              <th style={s.th}>MPH</th>
              <th style={s.th}>km/h</th>
            </tr>
          </thead>
          <tbody>
            {refs.map((r, i) => (
              <tr key={i}>
                <td style={s.td}>{r.name}</td>
                <td style={{ ...s.td, fontWeight: 700 }}>{r.mph}</td>
                <td style={s.td}>{(r.mph * 1.60934).toFixed(1)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function CalcBMI({ vals, up }) {
  const ht = vals.overs || 170;
  const wt = vals.cur || 70;
  const bmi = wt / Math.pow(ht / 100, 2);

  let cat = 'Normal';
  let catColor = '#16a34a';
  if (bmi < 18.5) { cat = 'Underweight'; catColor = '#2563eb'; }
  else if (bmi >= 25 && bmi < 30) { cat = 'Overweight'; catColor = '#ca8a04'; }
  else if (bmi >= 30) { cat = 'Obese'; catColor = '#dc2626'; }

  const athletes = [
    { name: 'Usain Bolt', sport: 'Sprinting', bmi: '24.8' },
    { name: 'Lionel Messi', sport: 'Football', bmi: '22.3' },
    { name: 'LeBron James', sport: 'Basketball', bmi: '27.5' },
    { name: 'Virat Kohli', sport: 'Cricket', bmi: '23.5' },
    { name: 'Serena Williams', sport: 'Tennis', bmi: '23.7' },
  ];

  return (
    <div>
      <div style={{ ...s.row, gridTemplateColumns: '1fr 1fr' }}>
        <Input label="Height (cm)" value={vals.overs} onChange={v => up('overs', v)} min={100} max={250} />
        <Input label="Weight (kg)" value={vals.cur} onChange={v => up('cur', v)} min={30} max={250} />
      </div>
      <div style={{ textAlign: 'center', padding: 24, background: catColor + '10', borderRadius: 14, borderLeft: `4px solid ${catColor}`, marginBottom: 14 }}>
        <div style={{ fontSize: 48, fontWeight: 900, color: catColor }}>{bmi.toFixed(1)}</div>
        <div style={{ fontSize: 14, fontWeight: 700, color: catColor }}>{cat}</div>
      </div>
      <div style={s.note}>
        <strong>Athlete Comparison</strong>
        <table style={s.table}>
          <thead>
            <tr>
              <th style={s.th}>Athlete</th>
              <th style={s.th}>Sport</th>
              <th style={s.th}>BMI</th>
            </tr>
          </thead>
          <tbody>
            {athletes.map((a, i) => (
              <tr key={i}>
                <td style={s.td}>{a.name}</td>
                <td style={s.td}>{a.sport}</td>
                <td style={{ ...s.td, fontWeight: 700 }}>{a.bmi}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function CalcLeague() {
  const teams = [
    { name: 'Team A', w: 8, d: 2, l: 1 },
    { name: 'Team B', w: 7, d: 3, l: 1 },
    { name: 'Team C', w: 5, d: 4, l: 2 },
    { name: 'Team D', w: 3, d: 2, l: 6 },
  ];

  const sorted = [...teams]
    .map(t => ({ ...t, pts: t.w * 3 + t.d }))
    .sort((a, b) => b.pts - a.pts);

  return (
    <div>
      <table style={s.table}>
        <thead>
          <tr>
            <th style={s.th}>#</th>
            <th style={s.th}>Team</th>
            <th style={s.th}>W</th>
            <th style={s.th}>D</th>
            <th style={s.th}>L</th>
            <th style={{ ...s.th, textAlign: 'right' }}>PTS</th>
          </tr>
        </thead>
        <tbody>
          {sorted.map((t, i) => (
            <tr key={i} style={{ background: i === 0 ? '#f0fdf4' : i < 3 ? '#f0f9ff' : undefined }}>
              <td style={{ ...s.td, fontWeight: 700 }}>{i + 1}</td>
              <td style={{ ...s.td, fontWeight: 700 }}>{t.name}</td>
              <td style={s.td}>{t.w}</td>
              <td style={s.td}>{t.d}</td>
              <td style={s.td}>{t.l}</td>
              <td style={{ ...s.td, fontWeight: 800, textAlign: 'right', color: '#2563eb' }}>{t.pts}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div style={s.note}>
        Win = <strong>3 pts</strong> &middot; Draw = <strong>1 pt</strong> &middot; Loss = <strong>0 pts</strong>.
        Teams are ranked by total points.
      </div>
    </div>
  );
}

const CALC_MAP = {
  rr: CalcRunRate,
  f1pts: CalcF1Points,
  xg: CalcXG,
  per: CalcPER,
  dls: CalcDLS,
  serve: CalcServe,
  bmi: CalcBMI,
  league: CalcLeague,
};

export default function CalculatorsPage() {
  const [active, setActive] = useState(null);
  const [vals, setVals] = useState(defaultVals);

  const up = (k, v) => setVals(prev => ({ ...prev, [k]: typeof v === 'boolean' ? v : Number(v) }));

  if (!active) {
    return (
      <div style={s.page}>
        <div style={{ textAlign: 'center', marginBottom: 28 }}>
          <div style={{ fontSize: 36, marginBottom: 6 }}>{'\u{1F3DF}\uFE0F'}</div>
          <div style={s.header}>Sports Calculators</div>
          <div style={s.sub}>Interactive tools for every sport</div>
        </div>
        {CALCS.map(c => (
          <div
            key={c.id}
            style={s.card}
            onClick={() => setActive(c.id)}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 6px 20px rgba(0,0,0,.08)'; }}
            onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = ''; }}
          >
            <div style={{ ...s.iconBox, background: c.color + '18' }}>
              {c.icon}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={s.cardName}>{c.name}</div>
              <div style={s.cardDesc}>{c.desc}</div>
            </div>
            <span style={{ ...s.tag, background: c.color + '15', color: c.color }}>
              {c.sport}
            </span>
          </div>
        ))}
      </div>
    );
  }

  const calc = CALCS.find(c => c.id === active);
  const CalcComponent = CALC_MAP[active];

  return (
    <div style={s.page}>
      <button style={s.back} onClick={() => setActive(null)}>
        {'\u2190'} All Calculators
      </button>
      <div style={s.calcHeader}>
        <div style={{ ...s.calcIcon, background: calc.color + '18' }}>
          {calc.icon}
        </div>
        <div>
          <div style={s.calcTitle}>{calc.name}</div>
          <span style={{ ...s.tag, background: calc.color + '15', color: calc.color, fontSize: 12 }}>
            {calc.sport}
          </span>
        </div>
      </div>
      <CalcComponent vals={vals} up={up} />
    </div>
  );
}
