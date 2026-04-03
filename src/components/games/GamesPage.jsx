import { useState, useEffect, useCallback, useRef } from 'react';
import { h } from '../../constants';
import { useProfileContext } from '../../context/ProfileContext';
import { sports } from '../../data/sports';
import { glossary } from '../../data/glossary';
import { positions } from '../../data/positions';
import { refScenarios, ruleOrMyth } from '../../data/gameScenarios';

/* ───────── constants ───────── */
const GREEN = '#16a34a';
const RED = '#dc2626';
const CREAM = '#fbf8f3';
const BORDER = '#ede8e0';
const BLUE = '#2563eb';
const PURPLE = '#7c3aed';
const ORANGE = '#ea580c';
const AMBER = '#d97706';

const XP_REF = 15;
const XP_SPEED = 10;
const XP_MYTH = 12;
const XP_POSITION = 15;

/* ───────── keyframes ───────── */
const gameKeyframes = `
@keyframes gameFadeIn {
  from { opacity: 0; transform: translateY(16px); }
  to { opacity: 1; transform: translateY(0); }
}
@keyframes gameSlideUp {
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
}
@keyframes gamePulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.04); }
}
@keyframes gameShake {
  0%, 100% { transform: translateX(0); }
  20% { transform: translateX(-5px); }
  40% { transform: translateX(5px); }
  60% { transform: translateX(-3px); }
  80% { transform: translateX(3px); }
}
@keyframes gameScoreReveal {
  0% { transform: scale(0.3); opacity: 0; }
  60% { transform: scale(1.1); }
  100% { transform: scale(1); opacity: 1; }
}
@keyframes gameTimerPulse {
  0%, 100% { color: #16a34a; }
  50% { color: #dc2626; }
}
@keyframes gameGlow {
  0%, 100% { box-shadow: 0 0 8px rgba(37,99,235,0.3); }
  50% { box-shadow: 0 0 20px rgba(37,99,235,0.6); }
}
`;

/* ───────── helpers ───────── */
function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function getBest(key) {
  try { return Number(localStorage.getItem(`game_best_${key}`)) || 0; } catch { return 0; }
}
function setBest(key, val) {
  try {
    const prev = getBest(key);
    if (val > prev) localStorage.setItem(`game_best_${key}`, String(val));
  } catch {}
}

function pickRandom(arr, n) {
  return shuffle(arr).slice(0, n);
}

/* ───────── field SVG components ───────── */
function OvalField({ color, onClick, children }) {
  return (
    <svg viewBox="0 0 100 100" style={{ width: '100%', maxWidth: 340, cursor: 'crosshair' }} onClick={onClick}>
      <ellipse cx="50" cy="50" rx="46" ry="46" fill={color} opacity="0.15" stroke={color} strokeWidth="1.5" />
      <ellipse cx="50" cy="50" rx="30" ry="30" fill="none" stroke={color} strokeWidth="0.5" strokeDasharray="3,2" />
      <rect x="47" y="46" width="6" height="8" fill={color} opacity="0.4" rx="0.5" />
      {children}
    </svg>
  );
}

function RectField({ color, onClick, children }) {
  return (
    <svg viewBox="0 0 100 100" style={{ width: '100%', maxWidth: 340, cursor: 'crosshair' }} onClick={onClick}>
      <rect x="5" y="5" width="90" height="90" fill={color} opacity="0.15" stroke={color} strokeWidth="1.5" rx="2" />
      <line x1="5" y1="50" x2="95" y2="50" stroke={color} strokeWidth="0.5" />
      <circle cx="50" cy="50" r="10" fill="none" stroke={color} strokeWidth="0.5" />
      {children}
    </svg>
  );
}

function CourtField({ color, onClick, children }) {
  return (
    <svg viewBox="0 0 100 100" style={{ width: '100%', maxWidth: 340, cursor: 'crosshair' }} onClick={onClick}>
      <rect x="5" y="5" width="90" height="90" fill={color} opacity="0.15" stroke={color} strokeWidth="1.5" rx="2" />
      <line x1="5" y1="50" x2="95" y2="50" stroke={color} strokeWidth="0.5" />
      <circle cx="50" cy="50" r="12" fill="none" stroke={color} strokeWidth="0.5" />
      <rect x="20" y="5" width="60" height="18" fill="none" stroke={color} strokeWidth="0.5" />
      <rect x="20" y="77" width="60" height="18" fill="none" stroke={color} strokeWidth="0.5" />
      {children}
    </svg>
  );
}

function DiamondField({ color, onClick, children }) {
  return (
    <svg viewBox="0 0 100 100" style={{ width: '100%', maxWidth: 340, cursor: 'crosshair' }} onClick={onClick}>
      <polygon points="50,15 85,50 50,85 15,50" fill={color} opacity="0.15" stroke={color} strokeWidth="1.5" />
      <rect x="44" y="55" width="12" height="6" fill={color} opacity="0.3" rx="1" />
      {children}
    </svg>
  );
}

function TrackField({ color, onClick, children }) {
  return (
    <svg viewBox="0 0 100 100" style={{ width: '100%', maxWidth: 340, cursor: 'crosshair' }} onClick={onClick}>
      <ellipse cx="50" cy="50" rx="44" ry="36" fill={color} opacity="0.1" stroke={color} strokeWidth="1.5" fill="none" />
      <ellipse cx="50" cy="50" rx="36" ry="28" fill={color} opacity="0.08" stroke={color} strokeWidth="0.5" strokeDasharray="4,2" />
      <line x1="50" y1="14" x2="50" y2="22" stroke={color} strokeWidth="1" />
      {children}
    </svg>
  );
}

function FieldForSport({ sport, onClick, marker }) {
  const pos = positions[sport];
  if (!pos) return null;
  const color = pos.color;
  const FieldComponent = {
    oval: OvalField,
    rect: RectField,
    court: CourtField,
    diamond: DiamondField,
    track: TrackField,
  }[pos.shape] || RectField;

  return (
    <FieldComponent color={color} onClick={onClick}>
      {marker && (
        <circle cx={marker.x} cy={marker.y} r="3" fill={RED} stroke="#fff" strokeWidth="1" opacity="0.9">
          <animate attributeName="r" values="3;5;3" dur="1s" repeatCount="indefinite" />
        </circle>
      )}
    </FieldComponent>
  );
}

/* ───────── main component ───────── */
export default function GamesPage() {
  const { addXP } = useProfileContext();
  const [mode, setMode] = useState('hub');
  const [round, setRound] = useState(0);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [timer, setTimer] = useState(0);
  const timerRef = useRef(null);
  const [clickPos, setClickPos] = useState(null);
  const [stylesInjected, setStylesInjected] = useState(false);

  // Inject keyframes once
  useEffect(() => {
    if (stylesInjected) return;
    const s = document.createElement('style');
    s.textContent = gameKeyframes;
    document.head.appendChild(s);
    setStylesInjected(true);
    return () => { try { document.head.removeChild(s); } catch {} };
  }, [stylesInjected]);

  // Timer for speed match
  useEffect(() => {
    if (mode === 'speed' && !answered) {
      timerRef.current = setInterval(() => setTimer(t => t + 100), 100);
      return () => clearInterval(timerRef.current);
    }
    return () => clearInterval(timerRef.current);
  }, [mode, answered, round]);

  const startGame = useCallback((gameMode) => {
    setMode(gameMode);
    setRound(0);
    setScore(0);
    setAnswered(false);
    setSelectedOption(null);
    setClickPos(null);
    setTimer(0);

    if (gameMode === 'ref') {
      setQuestions(pickRandom(refScenarios, 10));
    } else if (gameMode === 'speed') {
      const terms = pickRandom(glossary.filter(g => g.sport && !g.sport.includes('/')), 15);
      const allSports = [...new Set(glossary.map(g => g.sport).filter(s => s && !s.includes('/')))];
      setQuestions(terms.map(t => {
        const wrongSports = shuffle(allSports.filter(s => s !== t.sport)).slice(0, 3);
        const options = shuffle([t.sport, ...wrongSports]);
        return { ...t, options, correct: options.indexOf(t.sport) };
      }));
    } else if (gameMode === 'myth') {
      setQuestions(pickRandom(ruleOrMyth, 12));
    } else if (gameMode === 'position') {
      const sportKeys = Object.keys(positions);
      const rounds = [];
      for (let i = 0; i < 8; i++) {
        const sk = sportKeys[Math.floor(Math.random() * sportKeys.length)];
        const pos = positions[sk];
        const p = pos.list[Math.floor(Math.random() * pos.list.length)];
        rounds.push({ sport: sk, position: p, shape: pos.shape, color: pos.color });
      }
      setQuestions(rounds);
    }
  }, []);

  const nextRound = useCallback(() => {
    if (round + 1 >= questions.length) {
      // Calculate XP
      let xpPerCorrect = mode === 'ref' ? XP_REF : mode === 'speed' ? XP_SPEED : mode === 'myth' ? XP_MYTH : XP_POSITION;
      let earned = score * xpPerCorrect;
      if (score === questions.length) earned += 50; // perfect bonus
      if (earned > 0) addXP(earned);
      setBest(mode, score);
      setMode('results');
    } else {
      setRound(r => r + 1);
      setAnswered(false);
      setSelectedOption(null);
      setClickPos(null);
      setTimer(0);
    }
  }, [round, questions.length, mode, score, addXP]);

  // Auto-advance after answer reveal
  useEffect(() => {
    if (!answered) return;
    const t = setTimeout(nextRound, mode === 'position' ? 2500 : 2000);
    return () => clearTimeout(t);
  }, [answered, nextRound, mode]);

  /* ── shared styles ── */
  const pageStyle = { padding: '20px 16px 100px', maxWidth: 600, margin: '0 auto', ...h };
  const cardBase = {
    borderRadius: 16, padding: '20px 18px', cursor: 'pointer', border: 'none',
    transition: 'transform 0.2s, box-shadow 0.2s', ...h, textAlign: 'left', width: '100%',
  };
  const btnBase = {
    ...h, border: 'none', borderRadius: 12, padding: '14px 18px', fontSize: 14, fontWeight: 700,
    cursor: 'pointer', width: '100%', textAlign: 'left', transition: 'all 0.15s',
  };

  /* ══════════ HUB VIEW ══════════ */
  if (mode === 'hub') {
    const games = [
      { id: 'ref', icon: '🏁', name: 'Ref Decision', desc: 'You are the referee. Make the right call across 10 tricky scenarios.', gradient: 'linear-gradient(135deg, #16a34a 0%, #059669 100%)', best: getBest('ref'), total: 10 },
      { id: 'speed', icon: '⚡', name: 'Speed Match', desc: 'Match glossary terms to their sport as fast as possible. Speed is points!', gradient: 'linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)', best: getBest('speed'), total: 15 },
      { id: 'myth', icon: '🔍', name: 'Rule or Myth', desc: 'Is this a real rule or a common myth? Test your knowledge across 12 statements.', gradient: 'linear-gradient(135deg, #ea580c 0%, #dc2626 100%)', best: getBest('myth'), total: 12 },
      { id: 'position', icon: '📍', name: 'Position Finder', desc: 'Find the correct position on the field. Tap where you think it belongs.', gradient: 'linear-gradient(135deg, #d97706 0%, #b45309 100%)', best: getBest('position'), total: 8 },
    ];

    return (
      <div style={pageStyle}>
        <div style={{ marginBottom: 24, animation: 'gameFadeIn 0.4s ease' }}>
          <h1 style={{ fontSize: 26, fontWeight: 900, color: '#1a1a1a', margin: 0 }}>Mini Games</h1>
          <p style={{ fontSize: 14, color: '#888', marginTop: 6 }}>Test your sports knowledge, earn XP</p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {games.map((g, i) => (
            <div
              key={g.id}
              onClick={() => startGame(g.id)}
              style={{
                ...cardBase, background: g.gradient, color: '#fff', position: 'relative', overflow: 'hidden',
                animation: `gameSlideUp 0.4s ease ${i * 0.08}s both`,
                boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
              }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px) scale(1.01)'; e.currentTarget.style.boxShadow = '0 8px 30px rgba(0,0,0,0.2)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.15)'; }}
            >
              <div style={{ position: 'absolute', top: -10, right: -10, fontSize: 64, opacity: 0.15 }}>{g.icon}</div>
              <div style={{ fontSize: 28, marginBottom: 8 }}>{g.icon}</div>
              <div style={{ fontSize: 18, fontWeight: 800, marginBottom: 4 }}>{g.name}</div>
              <div style={{ fontSize: 13, opacity: 0.9, lineHeight: 1.5, marginBottom: 12 }}>{g.desc}</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <span style={{ fontSize: 12, background: 'rgba(255,255,255,0.25)', borderRadius: 8, padding: '4px 10px', fontWeight: 700 }}>
                  Best: {g.best}/{g.total}
                </span>
                <span style={{ fontSize: 12, background: 'rgba(255,255,255,0.25)', borderRadius: 8, padding: '4px 10px', fontWeight: 700 }}>
                  Play {'\u2192'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  /* ══════════ RESULTS VIEW ══════════ */
  if (mode === 'results') {
    const total = questions.length;
    const pct = Math.round((score / total) * 100);
    const emoji = pct === 100 ? '🏆' : pct >= 70 ? '🎉' : pct >= 40 ? '👍' : '💪';
    const msg = pct === 100 ? 'Perfect Score!' : pct >= 70 ? 'Great Job!' : pct >= 40 ? 'Not Bad!' : 'Keep Practicing!';

    return (
      <div style={{ ...pageStyle, textAlign: 'center' }}>
        <div style={{ animation: 'gameScoreReveal 0.6s ease', marginTop: 40 }}>
          <div style={{ fontSize: 72, marginBottom: 12 }}>{emoji}</div>
          <div style={{ fontSize: 28, fontWeight: 900, color: '#1a1a1a', marginBottom: 4 }}>{msg}</div>
          <div style={{ fontSize: 48, fontWeight: 900, color: GREEN, marginBottom: 8 }}>{score}/{total}</div>
          <div style={{ fontSize: 14, color: '#888', marginBottom: 24 }}>
            +{score * (mode === 'ref' ? XP_REF : mode === 'speed' ? XP_SPEED : mode === 'myth' ? XP_MYTH : XP_POSITION)}{score === total ? ' +50 bonus' : ''} XP earned
          </div>

          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <button
              onClick={() => setMode('hub')}
              style={{ ...btnBase, width: 'auto', padding: '14px 28px', background: '#f3f0ea', color: '#1a1a1a', fontSize: 15 }}
            >
              Back to Games
            </button>
            <button
              onClick={() => startGame(questions._gameMode || 'ref')}
              style={{ ...btnBase, width: 'auto', padding: '14px 28px', background: GREEN, color: '#fff', fontSize: 15 }}
            >
              Play Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  const q = questions[round];
  if (!q) return null;

  const progressPct = ((round) / questions.length) * 100;

  /* ── Progress bar (shared) ── */
  const ProgressBar = (
    <div style={{ marginBottom: 20 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
        <button onClick={() => setMode('hub')} style={{ ...h, background: 'none', border: 'none', color: '#888', fontSize: 13, cursor: 'pointer', fontWeight: 700, padding: 0 }}>
          {'\u2190'} Back
        </button>
        <span style={{ fontSize: 13, fontWeight: 800, color: '#1a1a1a' }}>{round + 1} / {questions.length}</span>
        <span style={{ fontSize: 13, fontWeight: 800, color: GREEN }}>Score: {score}</span>
      </div>
      <div style={{ height: 4, background: BORDER, borderRadius: 4, overflow: 'hidden' }}>
        <div style={{ height: '100%', width: `${progressPct}%`, background: GREEN, borderRadius: 4, transition: 'width 0.3s ease' }} />
      </div>
    </div>
  );

  /* ══════════ REF DECISION GAME ══════════ */
  if (mode === 'ref') {
    const isCorrect = selectedOption === q.correct;
    return (
      <div style={pageStyle}>
        {ProgressBar}
        <div style={{ animation: 'gameFadeIn 0.3s ease' }}>
          <div style={{ background: '#fff', borderRadius: 16, padding: '18px 16px', border: `1px solid ${BORDER}`, marginBottom: 16, boxShadow: '0 2px 12px rgba(0,0,0,0.05)' }}>
            <div style={{ fontSize: 11, fontWeight: 800, color: GREEN, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 8 }}>
              {q.sport} {'\u2022'} You are the ref
            </div>
            <div style={{ fontSize: 15, fontWeight: 600, color: '#1a1a1a', lineHeight: 1.6 }}>{q.scenario}</div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {q.options.map((opt, i) => {
              let bg = '#fff';
              let borderColor = BORDER;
              let color = '#1a1a1a';
              if (answered) {
                if (i === q.correct) { bg = '#dcfce7'; borderColor = GREEN; color = '#166534'; }
                else if (i === selectedOption && !isCorrect) { bg = '#fef2f2'; borderColor = RED; color = '#991b1b'; }
              }
              return (
                <button
                  key={i}
                  onClick={() => {
                    if (answered) return;
                    setSelectedOption(i);
                    setAnswered(true);
                    if (i === q.correct) setScore(s => s + 1);
                  }}
                  style={{
                    ...btnBase, background: bg, color, border: `2px solid ${borderColor}`,
                    animation: answered && i === selectedOption && !isCorrect ? 'gameShake 0.4s ease' : undefined,
                    opacity: answered && i !== q.correct && i !== selectedOption ? 0.4 : 1,
                  }}
                >
                  <span style={{ fontWeight: 800, marginRight: 8, opacity: 0.5 }}>{String.fromCharCode(65 + i)}</span>
                  {opt}
                </button>
              );
            })}
          </div>

          {answered && (
            <div style={{
              marginTop: 16, padding: '14px 16px', borderRadius: 12,
              background: isCorrect ? '#dcfce7' : '#fef2f2',
              border: `1px solid ${isCorrect ? '#bbf7d0' : '#fecaca'}`,
              animation: 'gameFadeIn 0.3s ease',
            }}>
              <div style={{ fontSize: 13, fontWeight: 800, color: isCorrect ? '#166534' : '#991b1b', marginBottom: 4 }}>
                {isCorrect ? 'Correct!' : 'Incorrect'}
              </div>
              <div style={{ fontSize: 13, color: '#555', lineHeight: 1.5 }}>{q.explanation}</div>
            </div>
          )}
        </div>
      </div>
    );
  }

  /* ══════════ SPEED MATCH GAME ══════════ */
  if (mode === 'speed') {
    const isCorrect = selectedOption === q.correct;
    const timerSec = (timer / 1000).toFixed(1);
    const speedPoints = answered && isCorrect ? Math.max(1, Math.round(10 - Math.min(timer / 1000, 9))) : 0;

    return (
      <div style={pageStyle}>
        {ProgressBar}
        <div style={{ animation: 'gameFadeIn 0.3s ease' }}>
          <div style={{
            background: 'linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)', borderRadius: 16,
            padding: '24px 18px', marginBottom: 16, textAlign: 'center', color: '#fff',
            boxShadow: '0 4px 20px rgba(37,99,235,0.2)',
          }}>
            <div style={{ fontSize: 11, fontWeight: 800, textTransform: 'uppercase', letterSpacing: 1, opacity: 0.8, marginBottom: 8 }}>
              Which sport?
            </div>
            <div style={{ fontSize: 20, fontWeight: 900, marginBottom: 6 }}>{q.term}</div>
            <div style={{ fontSize: 12, opacity: 0.7, lineHeight: 1.5, maxWidth: 280, margin: '0 auto' }}>{q.def}</div>
          </div>

          <div style={{ textAlign: 'center', marginBottom: 14 }}>
            <span style={{
              fontSize: 28, fontWeight: 900, fontVariantNumeric: 'tabular-nums',
              animation: !answered ? 'gameTimerPulse 2s ease infinite' : undefined,
              color: answered ? (isCorrect ? GREEN : RED) : '#1a1a1a',
            }}>
              {timerSec}s
            </span>
            {answered && isCorrect && <span style={{ marginLeft: 8, fontSize: 14, fontWeight: 800, color: GREEN }}>+{speedPoints} pts</span>}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            {q.options.map((opt, i) => {
              let bg = '#fff';
              let borderColor = BORDER;
              let txtColor = '#1a1a1a';
              if (answered) {
                if (i === q.correct) { bg = '#dcfce7'; borderColor = GREEN; txtColor = '#166534'; }
                else if (i === selectedOption && !isCorrect) { bg = '#fef2f2'; borderColor = RED; txtColor = '#991b1b'; }
              }
              return (
                <button
                  key={i}
                  onClick={() => {
                    if (answered) return;
                    clearInterval(timerRef.current);
                    setSelectedOption(i);
                    setAnswered(true);
                    if (i === q.correct) {
                      const pts = Math.max(1, Math.round(10 - Math.min(timer / 1000, 9)));
                      setScore(s => s + pts);
                    }
                  }}
                  style={{
                    ...btnBase, background: bg, color: txtColor, border: `2px solid ${borderColor}`,
                    textAlign: 'center', fontSize: 14, padding: '16px 12px',
                    animation: answered && i === selectedOption && !isCorrect ? 'gameShake 0.4s ease' : undefined,
                  }}
                >
                  {opt}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  /* ══════════ RULE OR MYTH GAME ══════════ */
  if (mode === 'myth') {
    const userSaidTrue = selectedOption === 1;
    const isCorrect = answered && ((userSaidTrue && q.isTrue) || (!userSaidTrue && !q.isTrue));

    return (
      <div style={pageStyle}>
        {ProgressBar}
        <div style={{ animation: 'gameFadeIn 0.3s ease' }}>
          <div style={{
            background: '#fff', borderRadius: 16, padding: '22px 18px',
            border: `1px solid ${BORDER}`, marginBottom: 20,
            boxShadow: '0 2px 12px rgba(0,0,0,0.05)',
          }}>
            <div style={{ fontSize: 11, fontWeight: 800, color: ORANGE, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 10 }}>
              {q.sport} {'\u2022'} Real rule or myth?
            </div>
            <div style={{ fontSize: 16, fontWeight: 700, color: '#1a1a1a', lineHeight: 1.6 }}>
              "{q.statement}"
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <button
              onClick={() => {
                if (answered) return;
                setSelectedOption(1);
                setAnswered(true);
                if (q.isTrue) setScore(s => s + 1);
              }}
              style={{
                ...btnBase, textAlign: 'center', fontSize: 16, padding: '18px 12px',
                background: answered ? (q.isTrue ? '#dcfce7' : (selectedOption === 1 ? '#fef2f2' : '#fff')) : '#fff',
                border: `2px solid ${answered ? (q.isTrue ? GREEN : (selectedOption === 1 ? RED : BORDER)) : BORDER}`,
                color: answered ? (q.isTrue ? '#166534' : (selectedOption === 1 ? '#991b1b' : '#aaa')) : '#1a1a1a',
              }}
            >
              Real Rule {'\u2705'}
            </button>
            <button
              onClick={() => {
                if (answered) return;
                setSelectedOption(0);
                setAnswered(true);
                if (!q.isTrue) setScore(s => s + 1);
              }}
              style={{
                ...btnBase, textAlign: 'center', fontSize: 16, padding: '18px 12px',
                background: answered ? (!q.isTrue ? '#dcfce7' : (selectedOption === 0 ? '#fef2f2' : '#fff')) : '#fff',
                border: `2px solid ${answered ? (!q.isTrue ? GREEN : (selectedOption === 0 ? RED : BORDER)) : BORDER}`,
                color: answered ? (!q.isTrue ? '#166534' : (selectedOption === 0 ? '#991b1b' : '#aaa')) : '#1a1a1a',
              }}
            >
              Myth {'\u274C'}
            </button>
          </div>

          {answered && (
            <div style={{
              marginTop: 16, padding: '14px 16px', borderRadius: 12,
              background: isCorrect ? '#dcfce7' : '#fef2f2',
              border: `1px solid ${isCorrect ? '#bbf7d0' : '#fecaca'}`,
              animation: 'gameFadeIn 0.3s ease',
            }}>
              <div style={{ fontSize: 13, fontWeight: 800, color: isCorrect ? '#166534' : '#991b1b', marginBottom: 4 }}>
                {isCorrect ? 'Correct!' : 'Wrong!'} This is {q.isTrue ? 'a REAL rule' : 'a MYTH'}.
              </div>
              <div style={{ fontSize: 13, color: '#555', lineHeight: 1.5 }}>{q.explanation}</div>
            </div>
          )}
        </div>
      </div>
    );
  }

  /* ══════════ POSITION FINDER GAME ══════════ */
  if (mode === 'position') {
    const handleFieldClick = (e) => {
      if (answered) return;
      const svg = e.currentTarget;
      const rect = svg.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      setClickPos({ x, y });
      setAnswered(true);

      const dx = x - q.position.x;
      const dy = y - q.position.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      // Score: within 8 units = perfect (3pts), within 15 = good (2pts), within 25 = okay (1pt)
      if (dist <= 8) setScore(s => s + 3);
      else if (dist <= 15) setScore(s => s + 2);
      else if (dist <= 25) setScore(s => s + 1);
    };

    const getDistMessage = () => {
      if (!clickPos) return '';
      const dx = clickPos.x - q.position.x;
      const dy = clickPos.y - q.position.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist <= 8) return 'Bullseye! +3 points';
      if (dist <= 15) return 'Close! +2 points';
      if (dist <= 25) return 'Not bad! +1 point';
      return 'Too far! +0 points';
    };

    return (
      <div style={pageStyle}>
        {ProgressBar}
        <div style={{ animation: 'gameFadeIn 0.3s ease' }}>
          <div style={{
            background: '#fff', borderRadius: 16, padding: '16px', border: `1px solid ${BORDER}`,
            marginBottom: 14, textAlign: 'center', boxShadow: '0 2px 12px rgba(0,0,0,0.05)',
          }}>
            <div style={{ fontSize: 11, fontWeight: 800, color: AMBER, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 6 }}>
              {q.sport} {'\u2022'} Tap the field
            </div>
            <div style={{ fontSize: 18, fontWeight: 900, color: '#1a1a1a' }}>
              Where is the <span style={{ color: q.color }}>{q.position.n}</span>?
            </div>
            <div style={{ fontSize: 12, color: '#888', marginTop: 4 }}>{q.position.desc}</div>
          </div>

          <div style={{
            background: '#fff', borderRadius: 16, padding: 16, border: `1px solid ${BORDER}`,
            display: 'flex', justifyContent: 'center', position: 'relative',
            boxShadow: '0 2px 12px rgba(0,0,0,0.05)',
          }}>
            <div style={{ position: 'relative', width: '100%', maxWidth: 340 }}>
              <FieldForSport
                sport={q.sport}
                onClick={handleFieldClick}
                marker={clickPos}
              />
              {/* Show actual position after answer */}
              {answered && (
                <svg viewBox="0 0 100 100" style={{
                  position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none',
                }}>
                  {/* Correct position marker */}
                  <circle cx={q.position.x} cy={q.position.y} r="4" fill={GREEN} stroke="#fff" strokeWidth="1.5" opacity="0.9" />
                  <text x={q.position.x} y={q.position.y - 7} textAnchor="middle" fontSize="4" fill={GREEN} fontWeight="800">{q.position.n}</text>
                  {/* Line from click to correct */}
                  {clickPos && (
                    <line x1={clickPos.x} y1={clickPos.y} x2={q.position.x} y2={q.position.y}
                      stroke="#888" strokeWidth="0.5" strokeDasharray="2,1" />
                  )}
                </svg>
              )}
            </div>
          </div>

          {answered && (
            <div style={{
              marginTop: 14, padding: '12px 16px', borderRadius: 12, textAlign: 'center',
              background: '#f8fafc', border: `1px solid ${BORDER}`,
              animation: 'gameFadeIn 0.3s ease',
            }}>
              <div style={{ fontSize: 15, fontWeight: 800, color: '#1a1a1a' }}>{getDistMessage()}</div>
            </div>
          )}
        </div>
      </div>
    );
  }

  return null;
}
