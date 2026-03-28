import { useState, useEffect, useCallback, useRef } from 'react';
import { h } from '../../constants';
import { usePageTitle } from '../../hooks/usePageTitle';
import { sports } from '../../data/sports';
import { generateQuiz, generateGeneralQuiz } from '../../utils/quizGenerator';
import { useProfileContext } from '../../context/ProfileContext';
import Card from '../ui/Card';

/* ───────── constants ───────── */
const TIMER_SECONDS = 15;
const XP_PER_CORRECT = 10;
const XP_PERFECT_BONUS = 50;
const GREEN = '#16a34a';
const RED = '#dc2626';
const CREAM = '#fbf8f3';
const BORDER = '#ede8e0';

/* ───────── keyframes (injected once) ───────── */
const quizKeyframes = `
@keyframes quizPulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
}
@keyframes quizFadeIn {
  from { opacity: 0; transform: translateY(12px); }
  to { opacity: 1; transform: translateY(0); }
}
@keyframes quizCountdown {
  from { width: 100%; }
  to { width: 0%; }
}
@keyframes quizShake {
  0%, 100% { transform: translateX(0); }
  20% { transform: translateX(-4px); }
  40% { transform: translateX(4px); }
  60% { transform: translateX(-3px); }
  80% { transform: translateX(3px); }
}
@keyframes quizConfetti {
  0% { transform: translateY(0) rotate(0deg); opacity: 1; }
  100% { transform: translateY(-80px) rotate(360deg); opacity: 0; }
}
@keyframes quizScoreReveal {
  0% { transform: scale(0.5); opacity: 0; }
  60% { transform: scale(1.15); }
  100% { transform: scale(1); opacity: 1; }
}
`;

/* ───────── helpers ───────── */
function getQuizStats() {
  try {
    return JSON.parse(localStorage.getItem('sd_quiz_stats') || '{}');
  } catch { return {}; }
}

function saveQuizStats(stats) {
  localStorage.setItem('sd_quiz_stats', JSON.stringify(stats));
}

/* ═════════════════════════════════════════════
   QuizPage
   ═════════════════════════════════════════════ */
export default function QuizPage() {
  usePageTitle('Sports Quiz');
  const { addXP } = useProfileContext();

  /* ── state ── */
  const [mode, setMode] = useState('select');           // select | active | results
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState([]);            // { selected, correct, isCorrect }
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(TIMER_SECONDS);
  const [selectedSport, setSelectedSport] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null); // null while unanswered
  const [stats, setStats] = useState(getQuizStats);

  const timerRef = useRef(null);
  const stylesInjected = useRef(false);

  /* inject keyframes once */
  useEffect(() => {
    if (stylesInjected.current) return;
    stylesInjected.current = true;
    const style = document.createElement('style');
    style.textContent = quizKeyframes;
    document.head.appendChild(style);
    return () => { try { document.head.removeChild(style); } catch {} };
  }, []);

  /* ── timer ── */
  useEffect(() => {
    if (mode !== 'active' || selectedOption !== null) return;
    timerRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          handleTimeout();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timerRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode, currentIndex, selectedOption]);

  /* ── start quiz ── */
  const startQuiz = useCallback((sport) => {
    let qs;
    if (sport) {
      qs = generateQuiz(sport, 10);
      setSelectedSport(sport);
    } else {
      qs = generateGeneralQuiz(sports, 10);
      setSelectedSport(null);
    }
    if (qs.length === 0) return;
    setQuestions(qs);
    setCurrentIndex(0);
    setAnswers([]);
    setScore(0);
    setTimeLeft(TIMER_SECONDS);
    setSelectedOption(null);
    setMode('active');
  }, []);

  /* ── handle answer ── */
  const handleAnswer = useCallback((optionIndex) => {
    if (selectedOption !== null) return;
    clearInterval(timerRef.current);
    const q = questions[currentIndex];
    const isCorrect = optionIndex === q.correct;
    setSelectedOption(optionIndex);
    if (isCorrect) setScore(s => s + 1);
    setAnswers(prev => [...prev, { selected: optionIndex, correct: q.correct, isCorrect }]);
  }, [selectedOption, questions, currentIndex]);

  /* ── handle timeout (no answer) ── */
  const handleTimeout = useCallback(() => {
    if (selectedOption !== null) return;
    const q = questions[currentIndex];
    if (!q) return;
    setSelectedOption(-1); // -1 = timed out
    setAnswers(prev => [...prev, { selected: -1, correct: q.correct, isCorrect: false }]);
  }, [selectedOption, questions, currentIndex]);

  /* ── next question ── */
  const nextQuestion = useCallback(() => {
    if (currentIndex + 1 >= questions.length) {
      finishQuiz();
    } else {
      setCurrentIndex(i => i + 1);
      setTimeLeft(TIMER_SECONDS);
      setSelectedOption(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentIndex, questions.length, score]);

  /* ── finish quiz ── */
  const finishQuiz = useCallback(() => {
    const finalScore = answers.filter(a => a.isCorrect).length + (selectedOption !== null && selectedOption !== -1 && questions[currentIndex] && selectedOption === questions[currentIndex].correct ? 1 : 0);
    // The score state should already be correct at this point
    const earned = score * XP_PER_CORRECT + (score === questions.length ? XP_PERFECT_BONUS : 0);
    if (earned > 0) addXP(earned);

    // Update persistent stats
    const prev = getQuizStats();
    const newStats = {
      totalQuizzes: (prev.totalQuizzes || 0) + 1,
      bestScore: Math.max(prev.bestScore || 0, Math.round((score / questions.length) * 100)),
      streak: score === questions.length ? (prev.streak || 0) + 1 : 0,
      lastPlayed: Date.now(),
    };
    saveQuizStats(newStats);
    setStats(newStats);
    setMode('results');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [score, questions, answers, selectedOption, currentIndex, addXP]);

  /* ═══════════ RENDER ═══════════ */

  /* ───── Screen 1: Selection ───── */
  if (mode === 'select') return <SelectionScreen stats={stats} startQuiz={startQuiz} />;

  /* ───── Screen 2: Active ───── */
  if (mode === 'active' && questions.length > 0) {
    const q = questions[currentIndex];
    return (
      <div style={{ padding: '16px 16px 100px', ...h }}>
        {/* Progress */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
          <div style={{ flex: 1, height: 6, background: BORDER, borderRadius: 3, overflow: 'hidden' }}>
            <div style={{ width: `${((currentIndex + 1) / questions.length) * 100}%`, height: '100%', background: GREEN, borderRadius: 3, transition: 'width .3s' }} />
          </div>
          <span style={{ fontSize: 12, fontWeight: 700, color: '#888' }}>{currentIndex + 1}/{questions.length}</span>
          <span style={{ fontSize: 13, fontWeight: 800, color: GREEN, minWidth: 36, textAlign: 'right' }}>
            {score} pts
          </span>
        </div>

        {/* Timer */}
        <div style={{ height: 4, background: BORDER, borderRadius: 2, overflow: 'hidden', marginBottom: 16 }}>
          <div style={{
            width: selectedOption !== null ? `${(timeLeft / TIMER_SECONDS) * 100}%` : undefined,
            height: '100%',
            background: timeLeft <= 5 ? RED : '#f59e0b',
            borderRadius: 2,
            transition: selectedOption !== null ? 'none' : 'width 1s linear',
            animation: selectedOption === null ? `quizCountdown ${TIMER_SECONDS}s linear forwards` : 'none',
          }} />
        </div>

        {/* Timer number */}
        <div style={{ textAlign: 'center', marginBottom: 8 }}>
          <span style={{
            fontSize: 14, fontWeight: 800,
            color: timeLeft <= 5 ? RED : '#f59e0b',
            animation: timeLeft <= 5 && selectedOption === null ? 'quizPulse .5s infinite' : 'none',
          }}>
            {selectedOption === null ? `${timeLeft}s` : ''}
          </span>
        </div>

        {/* Difficulty badge */}
        <div style={{ textAlign: 'center', marginBottom: 8 }}>
          <span style={{
            display: 'inline-block', fontSize: 10, fontWeight: 700, padding: '2px 10px',
            borderRadius: 20, textTransform: 'uppercase', letterSpacing: 1,
            background: q.difficulty === 'easy' ? '#dcfce7' : q.difficulty === 'hard' ? '#fef2f2' : '#fef9c3',
            color: q.difficulty === 'easy' ? GREEN : q.difficulty === 'hard' ? RED : '#a16207',
          }}>
            {q.difficulty} &middot; {q.type}
          </span>
        </div>

        {/* Question */}
        <Card style={{ padding: 20, marginBottom: 16, animation: 'quizFadeIn .3s ease-out' }}>
          <p style={{ fontSize: 16, fontWeight: 700, lineHeight: 1.5, margin: 0, color: '#1a1a1a', textAlign: 'center' }}>
            {q.question}
          </p>
        </Card>

        {/* Options */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {q.options.map((opt, i) => {
            const answered = selectedOption !== null;
            const isCorrect = i === q.correct;
            const isSelected = i === selectedOption;
            let bg = '#fff';
            let border = BORDER;
            let color = '#1a1a1a';
            if (answered) {
              if (isCorrect) { bg = '#dcfce7'; border = GREEN; color = '#166534'; }
              else if (isSelected && !isCorrect) { bg = '#fef2f2'; border = RED; color = '#991b1b'; }
              else { bg = '#f9f9f6'; border = '#e5e5e5'; color = '#aaa'; }
            }
            return (
              <button
                key={i}
                onClick={() => handleAnswer(i)}
                disabled={answered}
                style={{
                  padding: '14px 16px', borderRadius: 12, border: `2px solid ${border}`,
                  background: bg, cursor: answered ? 'default' : 'pointer',
                  fontSize: 14, fontWeight: 600, color, textAlign: 'left',
                  transition: 'all .15s', outline: 'none', ...h,
                  display: 'flex', alignItems: 'center', gap: 10,
                  animation: answered && isSelected && !isCorrect ? 'quizShake .4s' : answered && isCorrect ? 'quizPulse .4s' : 'none',
                }}
              >
                <span style={{
                  width: 28, height: 28, borderRadius: 14, display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 12, fontWeight: 800, flexShrink: 0,
                  background: answered && isCorrect ? GREEN : answered && isSelected ? RED : '#f3f0eb',
                  color: answered && (isCorrect || isSelected) ? '#fff' : '#888',
                }}>
                  {answered && isCorrect ? '\u2713' : answered && isSelected && !isCorrect ? '\u2717' : String.fromCharCode(65 + i)}
                </span>
                <span>{opt}</span>
              </button>
            );
          })}
        </div>

        {/* Explanation + Next */}
        {selectedOption !== null && (
          <div style={{ marginTop: 16, animation: 'quizFadeIn .3s ease-out' }}>
            <Card style={{ padding: 14, background: selectedOption === q.correct ? '#f0fdf4' : '#fefce8', borderColor: selectedOption === q.correct ? GREEN : '#f59e0b' }}>
              <p style={{ fontSize: 12, fontWeight: 700, margin: '0 0 4px', color: selectedOption === q.correct ? GREEN : '#a16207' }}>
                {selectedOption === q.correct ? 'Correct!' : selectedOption === -1 ? 'Time\'s up!' : 'Not quite!'}
              </p>
              <p style={{ fontSize: 12, color: '#555', margin: 0, lineHeight: 1.5 }}>{q.explanation}</p>
            </Card>
            <button
              onClick={nextQuestion}
              style={{
                width: '100%', marginTop: 12, padding: '14px 0', borderRadius: 12, border: 'none',
                background: GREEN, color: '#fff', fontSize: 15, fontWeight: 800, cursor: 'pointer', ...h,
              }}
            >
              {currentIndex + 1 >= questions.length ? 'See Results' : 'Next Question \u2192'}
            </button>
          </div>
        )}
      </div>
    );
  }

  /* ───── Screen 3: Results ───── */
  if (mode === 'results') {
    const total = questions.length;
    const pct = total > 0 ? Math.round((score / total) * 100) : 0;
    const isPerfect = score === total;
    const earnedXP = score * XP_PER_CORRECT + (isPerfect ? XP_PERFECT_BONUS : 0);

    // Breakdown by type
    const breakdown = {};
    answers.forEach((a, i) => {
      const type = questions[i]?.type || 'other';
      if (!breakdown[type]) breakdown[type] = { correct: 0, total: 0 };
      breakdown[type].total++;
      if (a.isCorrect) breakdown[type].correct++;
    });

    const shareText = `I scored ${score}/${total} (${pct}%) on the ${selectedSport ? selectedSport.n : 'General Sports'} quiz on SportDecoded! ${isPerfect ? 'Perfect score!' : ''}`;

    return (
      <div style={{ padding: '24px 16px 100px', ...h }}>
        {/* Score reveal */}
        <div style={{ textAlign: 'center', marginBottom: 24, animation: 'quizScoreReveal .6s ease-out' }}>
          {isPerfect && (
            <div style={{ fontSize: 40, marginBottom: 8 }}>
              {'\uD83C\uDF89\uD83C\uDFC6\uD83C\uDF89'}
            </div>
          )}
          <div style={{
            width: 120, height: 120, borderRadius: 60, margin: '0 auto 16px',
            background: `conic-gradient(${pct >= 70 ? GREEN : pct >= 40 ? '#f59e0b' : RED} ${pct * 3.6}deg, ${BORDER} 0deg)`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <div style={{
              width: 100, height: 100, borderRadius: 50, background: CREAM,
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
            }}>
              <span style={{ fontSize: 28, fontWeight: 900, color: '#1a1a1a' }}>{score}/{total}</span>
              <span style={{ fontSize: 12, fontWeight: 600, color: '#888' }}>{pct}%</span>
            </div>
          </div>
          <h2 style={{ fontSize: 20, fontWeight: 900, margin: '0 0 4px', color: '#1a1a1a' }}>
            {isPerfect ? 'Perfect Score!' : pct >= 70 ? 'Great Job!' : pct >= 40 ? 'Nice Try!' : 'Keep Practicing!'}
          </h2>
          <p style={{ fontSize: 13, color: '#888', margin: 0 }}>
            {selectedSport ? `${selectedSport.i} ${selectedSport.n} Quiz` : '\uD83C\uDF0D General Sports Quiz'}
          </p>
        </div>

        {/* XP earned */}
        <Card style={{ padding: 16, marginBottom: 12, textAlign: 'center', background: '#f0fdf4', borderColor: GREEN }}>
          <span style={{ fontSize: 22, fontWeight: 900, color: GREEN }}>+{earnedXP} XP</span>
          <p style={{ fontSize: 11, color: '#888', margin: '4px 0 0' }}>
            {score} correct x {XP_PER_CORRECT} XP{isPerfect ? ` + ${XP_PERFECT_BONUS} perfect bonus` : ''}
          </p>
        </Card>

        {/* Breakdown */}
        <Card style={{ padding: 16, marginBottom: 12 }}>
          <h3 style={{ fontSize: 14, fontWeight: 800, margin: '0 0 10px', color: '#1a1a1a' }}>Performance Breakdown</h3>
          {Object.entries(breakdown).map(([type, data]) => (
            <div key={type} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '6px 0', borderBottom: `1px solid ${BORDER}` }}>
              <span style={{ fontSize: 12, fontWeight: 600, color: '#555', textTransform: 'capitalize' }}>{type}</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <div style={{ width: 60, height: 4, background: BORDER, borderRadius: 2, overflow: 'hidden' }}>
                  <div style={{ width: `${(data.correct / data.total) * 100}%`, height: '100%', background: GREEN, borderRadius: 2 }} />
                </div>
                <span style={{ fontSize: 11, fontWeight: 700, color: '#888', minWidth: 28, textAlign: 'right' }}>{data.correct}/{data.total}</span>
              </div>
            </div>
          ))}
        </Card>

        {/* Actions */}
        <div style={{ display: 'flex', gap: 10, marginBottom: 12 }}>
          <button
            onClick={() => startQuiz(selectedSport)}
            style={{
              flex: 1, padding: '13px 0', borderRadius: 12, border: `2px solid ${GREEN}`,
              background: '#fff', color: GREEN, fontSize: 14, fontWeight: 800, cursor: 'pointer', ...h,
            }}
          >
            Play Again
          </button>
          <button
            onClick={() => setMode('select')}
            style={{
              flex: 1, padding: '13px 0', borderRadius: 12, border: 'none',
              background: GREEN, color: '#fff', fontSize: 14, fontWeight: 800, cursor: 'pointer', ...h,
            }}
          >
            Try Another
          </button>
        </div>

        {/* Share */}
        <button
          onClick={() => {
            if (navigator.share) {
              navigator.share({ title: 'SportDecoded Quiz', text: shareText }).catch(() => {});
            } else {
              navigator.clipboard.writeText(shareText).catch(() => {});
            }
          }}
          style={{
            width: '100%', padding: '12px 0', borderRadius: 12, border: `1.5px solid ${BORDER}`,
            background: '#fff', color: '#555', fontSize: 13, fontWeight: 700, cursor: 'pointer', ...h,
          }}
        >
          {'\uD83D\uDCE4'} Share Result
        </button>
      </div>
    );
  }

  return null;
}

/* ═════════════════════════════════════════════
   SelectionScreen (sub-component)
   ═════════════════════════════════════════════ */
function SelectionScreen({ stats, startQuiz }) {
  const sportsWithData = sports.filter(s => (s.r && s.r.length >= 2) || (s.f && s.f.length >= 1));

  return (
    <div style={{ padding: '16px 16px 100px', ...h }}>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: 20 }}>
        <span style={{ fontSize: 40 }}>{'\uD83E\uDDE0'}</span>
        <h1 style={{ fontSize: 22, fontWeight: 900, margin: '8px 0 4px', color: '#1a1a1a' }}>Sports Quiz</h1>
        <p style={{ fontSize: 13, color: '#888', margin: 0 }}>Test your knowledge across 40+ sports</p>
      </div>

      {/* Stats bar */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
        {[
          { label: 'Quizzes', value: stats.totalQuizzes || 0, emoji: '\uD83C\uDFAF' },
          { label: 'Best', value: stats.bestScore ? `${stats.bestScore}%` : '--', emoji: '\uD83C\uDFC6' },
          { label: 'Streak', value: stats.streak || 0, emoji: '\uD83D\uDD25' },
        ].map(s => (
          <Card key={s.label} style={{ flex: 1, padding: '10px 8px', textAlign: 'center' }}>
            <div style={{ fontSize: 18 }}>{s.emoji}</div>
            <div style={{ fontSize: 16, fontWeight: 900, color: '#1a1a1a' }}>{s.value}</div>
            <div style={{ fontSize: 10, fontWeight: 600, color: '#aaa', textTransform: 'uppercase', letterSpacing: .5 }}>{s.label}</div>
          </Card>
        ))}
      </div>

      {/* Quick Quiz */}
      <Card
        onClick={() => startQuiz(null)}
        style={{
          padding: 20, marginBottom: 20, textAlign: 'center',
          background: `linear-gradient(135deg, ${GREEN}, #059669)`,
          border: 'none', color: '#fff',
        }}
      >
        <span style={{ fontSize: 28 }}>{'\u26A1'}</span>
        <h2 style={{ fontSize: 17, fontWeight: 900, margin: '6px 0 4px' }}>Quick Quiz</h2>
        <p style={{ fontSize: 12, margin: 0, opacity: .85 }}>10 random questions across all sports</p>
      </Card>

      {/* Sport-specific */}
      <h3 style={{ fontSize: 14, fontWeight: 800, margin: '0 0 10px', color: '#1a1a1a' }}>Pick a Sport</h3>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
        {sportsWithData.map(s => (
          <Card
            key={s.id}
            onClick={() => startQuiz(s)}
            style={{ padding: '12px 6px', textAlign: 'center' }}
          >
            <div style={{ fontSize: 24 }}>{s.i}</div>
            <div style={{ fontSize: 11, fontWeight: 700, color: '#444', marginTop: 4, lineHeight: 1.2, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {s.n}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
