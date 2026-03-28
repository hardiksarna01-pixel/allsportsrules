import { WRONG_ANSWERS, FAKE_NICKNAMES, FAKE_RULES, FAKE_FACTS, ORIGINS } from '../data/quizTemplates';
import { glossary } from '../data/glossary';

/* ---------- helpers ---------- */
function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function pick(arr, n = 1) {
  const shuffled = shuffle(arr);
  return n === 1 ? shuffled[0] : shuffled.slice(0, n);
}

function pickExcluding(arr, exclude, n = 1) {
  const filtered = arr.filter(x => !exclude.includes(x));
  return pick(filtered, n);
}

/** Place the correct answer at a random index among 4 options */
function buildOptions(correct, distractors3) {
  const idx = Math.floor(Math.random() * 4);
  const opts = [...distractors3];
  opts.splice(idx, 0, correct);
  return { options: opts.slice(0, 4), correct: idx };
}

/** Strip leading emoji/icon prefix from rule text */
function cleanRule(rule) {
  return rule.replace(/^[^\w]*?(⚖️\s*)?/u, '').replace(/^[A-Z\s—:]+:\s*/, '').trim();
}

function extractNumbers(text) {
  const matches = [];
  // e.g. "11 players", "22 yards", "12 yards", "6 legal deliveries"
  const re = /(\d+\.?\d*)\s*(players?|yards?|feet|ft|min|minutes?|seconds?|km\/h|mph|m|cm|kg|g|points?|pts?|overs?|innings?|sets?|games?|rounds?|per side|per team|each)/gi;
  let m;
  while ((m = re.exec(text)) !== null) {
    matches.push({ num: parseFloat(m[1]), unit: m[2], context: text.substring(Math.max(0, m.index - 30), m.index + m[0].length + 30).trim() });
  }
  return matches;
}

function nearbyNumbers(n) {
  const candidates = new Set();
  candidates.add(n - 4);
  candidates.add(n - 2);
  candidates.add(n - 1);
  candidates.add(n + 1);
  candidates.add(n + 2);
  candidates.add(n + 4);
  candidates.add(Math.round(n * 0.75));
  candidates.add(Math.round(n * 1.5));
  candidates.delete(n);
  candidates.delete(0);
  const arr = [...candidates].filter(x => x > 0);
  return pick(arr, 3).map(String);
}

let questionId = 0;
function nextId() { return ++questionId; }

/* ---------- question generators ---------- */

function ruleQuestions(sport, maxQ) {
  if (!sport.r || sport.r.length < 2) return [];
  const questions = [];
  const rules = shuffle(sport.r).slice(0, maxQ);

  for (const rule of rules) {
    const cleaned = cleanRule(rule);
    const fakes = pick(FAKE_RULES, 3);
    const { options, correct } = buildOptions(cleaned.length > 100 ? cleaned.slice(0, 100) + '...' : cleaned, fakes);
    questions.push({
      id: nextId(),
      question: `Which of these is an official rule in ${sport.n}?`,
      options,
      correct,
      explanation: cleaned,
      difficulty: 'medium',
      type: 'rule',
    });
  }
  return questions;
}

function factQuestions(sport, maxQ) {
  if (!sport.f || sport.f.length < 1) return [];
  const questions = [];
  const facts = shuffle(sport.f).slice(0, maxQ);

  for (const fact of facts) {
    const fakes = pick(FAKE_FACTS, 3);
    const display = fact.length > 110 ? fact.slice(0, 110) + '...' : fact;
    const { options, correct } = buildOptions(display, fakes);
    questions.push({
      id: nextId(),
      question: `Which of these facts about ${sport.n} is true?`,
      options,
      correct,
      explanation: fact,
      difficulty: 'medium',
      type: 'fact',
    });
  }
  return questions;
}

function playerNicknameQuestions(sport, maxQ) {
  if (!sport.p || sport.p.length < 1) return [];
  const questions = [];
  const players = shuffle(sport.p).slice(0, maxQ);

  for (const player of players) {
    if (!player.nk) continue;
    const fakes = pickExcluding(FAKE_NICKNAMES, [player.nk], 3);
    const { options, correct } = buildOptions(player.nk, fakes);
    questions.push({
      id: nextId(),
      question: `What is ${player.nm}'s nickname in ${sport.n}?`,
      options,
      correct,
      explanation: `${player.nm} is known as "${player.nk}". ${player.st || ''}`,
      difficulty: 'easy',
      type: 'player',
    });
  }
  return questions;
}

function playerRoleQuestions(sport, maxQ) {
  if (!sport.p || sport.p.length < 1) return [];
  const questions = [];
  const players = shuffle(sport.p).slice(0, maxQ);
  const allRoles = ['Forward', 'Midfielder', 'Defender', 'Goalkeeper', 'Batter', 'Bowler', 'All-Rounder', 'Quarterback', 'Guard', 'Center', 'Driver', 'Sprinter', 'Singles', 'All-Around', 'Heavyweight'];

  for (const player of players) {
    if (!player.rl) continue;
    const fakes = pickExcluding(allRoles, [player.rl], 3);
    const { options, correct } = buildOptions(player.rl, fakes);
    questions.push({
      id: nextId(),
      question: `What position/role does ${player.nm} play in ${sport.n}?`,
      options,
      correct,
      explanation: `${player.nm} plays as ${player.rl}. ${player.st || ''}`,
      difficulty: 'easy',
      type: 'player',
    });
  }
  return questions;
}

function numberQuestions(sport, maxQ) {
  const questions = [];
  const allText = [...(sport.r || []), ...(sport.f || [])].join(' ');
  const nums = extractNumbers(allText);
  if (nums.length === 0) return [];

  const chosen = shuffle(nums).slice(0, maxQ);
  for (const { num, unit, context } of chosen) {
    const correctStr = String(num);
    const distractors = nearbyNumbers(num);
    const { options, correct } = buildOptions(correctStr, distractors);
    questions.push({
      id: nextId(),
      question: `In ${sport.n}, what is the correct number? Context: "...${context}..."`,
      options: options.map(o => `${o} ${unit}`),
      correct,
      explanation: `The answer is ${num} ${unit}. From: ${context}`,
      difficulty: 'hard',
      type: 'number',
    });
  }
  return questions;
}

function equipmentQuestions(sport, maxQ) {
  if (!sport.eq || sport.eq.length < 1) return [];
  const questions = [];
  const fakeEquipment = [
    'Trampoline', 'Parachute', 'Fishing rod', 'Bowling pins',
    'Ice skates', 'Surfboard', 'Boxing gloves', 'Javelin',
    'Hockey puck', 'Snorkel', 'Lacrosse stick', 'Darts',
    'Shuttlecock', 'Pommel horse', 'Barbell', 'Paddle',
  ];

  const items = shuffle(sport.eq).slice(0, maxQ);
  for (const item of items) {
    const shortItem = item.length > 60 ? item.split('(')[0].trim() : item;
    const fakes = pickExcluding(fakeEquipment, [shortItem], 3);
    const { options, correct } = buildOptions(shortItem, fakes);
    questions.push({
      id: nextId(),
      question: `Which of these is standard equipment in ${sport.n}?`,
      options,
      correct,
      explanation: `${item} is used in ${sport.n}.`,
      difficulty: 'easy',
      type: 'equipment',
    });
  }
  return questions;
}

function scoringQuestions(sport) {
  if (!sport.sc || !sport.sc.pts) return [];
  const questions = [];
  const correctScoring = sport.sc.pts.length > 100 ? sport.sc.pts.slice(0, 100) + '...' : sport.sc.pts;
  const fakeScoring = [
    'Each goal is worth 3 points, with bonus points for style',
    'Points are awarded by fan vote after each play',
    'Scoring alternates between 1 and 5 points per play',
  ];
  const { options, correct } = buildOptions(correctScoring, fakeScoring);
  questions.push({
    id: nextId(),
    question: `How does scoring work in ${sport.n}?`,
    options,
    correct,
    explanation: sport.sc.pts,
    difficulty: 'medium',
    type: 'scoring',
  });
  return questions;
}

function terminologyQuestions(sport, maxQ) {
  const sportGlossary = glossary.filter(g =>
    g.sport.toLowerCase().includes(sport.n.toLowerCase()) ||
    g.sport.toLowerCase().includes(sport.id.toLowerCase())
  );
  if (sportGlossary.length === 0) return [];
  const questions = [];
  const terms = shuffle(sportGlossary).slice(0, maxQ);

  for (const term of terms) {
    const otherDefs = glossary
      .filter(g => g.id !== term.id)
      .map(g => g.def.length > 80 ? g.def.slice(0, 80) + '...' : g.def);
    if (otherDefs.length < 3) continue;
    const fakes = pick(otherDefs, 3);
    const correctDef = term.def.length > 80 ? term.def.slice(0, 80) + '...' : term.def;
    const { options, correct } = buildOptions(correctDef, fakes);
    questions.push({
      id: nextId(),
      question: `In ${sport.n}, what does "${term.term}" mean?`,
      options,
      correct,
      explanation: term.def,
      difficulty: 'medium',
      type: 'terminology',
    });
  }
  return questions;
}

/* ---------- main generators ---------- */

export function generateQuiz(sport, numQuestions = 10) {
  questionId = 0;
  if (!sport) return [];

  // Generate a pool of questions from each type
  const pool = [
    ...ruleQuestions(sport, 3),
    ...factQuestions(sport, 3),
    ...playerNicknameQuestions(sport, 2),
    ...playerRoleQuestions(sport, 1),
    ...numberQuestions(sport, 2),
    ...equipmentQuestions(sport, 2),
    ...scoringQuestions(sport),
    ...terminologyQuestions(sport, 2),
  ];

  if (pool.length === 0) return [];

  // Shuffle and pick requested number, ensuring variety of types
  const byType = {};
  for (const q of pool) {
    if (!byType[q.type]) byType[q.type] = [];
    byType[q.type].push(q);
  }

  const selected = [];
  const types = Object.keys(byType);

  // Round-robin pick from each type for variety
  let typeIdx = 0;
  while (selected.length < numQuestions && selected.length < pool.length) {
    const type = types[typeIdx % types.length];
    const bucket = byType[type];
    if (bucket && bucket.length > 0) {
      selected.push(bucket.shift());
    }
    typeIdx++;
    // If all buckets empty, break
    if (types.every(t => !byType[t] || byType[t].length === 0)) break;
  }

  // Re-number and shuffle final order
  return shuffle(selected).map((q, i) => ({ ...q, id: i + 1 }));
}

export function generateGeneralQuiz(sports, numQuestions = 10) {
  questionId = 0;
  if (!sports || sports.length === 0) return [];

  // Build cross-sport questions
  const crossSportQs = generateCrossSportQuestions(sports, Math.min(3, numQuestions));

  // Pick random sports and generate a few questions from each
  const shuffledSports = shuffle(sports.filter(s => (s.r && s.r.length > 0) || (s.f && s.f.length > 0)));
  const pool = [...crossSportQs];

  for (const sport of shuffledSports) {
    const sportQs = [
      ...ruleQuestions(sport, 1),
      ...factQuestions(sport, 1),
      ...playerNicknameQuestions(sport, 1),
      ...equipmentQuestions(sport, 1),
      ...terminologyQuestions(sport, 1),
    ];
    pool.push(...sportQs);
    if (pool.length >= numQuestions * 2) break;
  }

  return shuffle(pool).slice(0, numQuestions).map((q, i) => ({ ...q, id: i + 1 }));
}

function generateCrossSportQuestions(sports, maxQ) {
  const questions = [];

  // "Which sport uses [equipment]?" questions
  const sportsWithEq = sports.filter(s => s.eq && s.eq.length > 0);
  const eqPicks = shuffle(sportsWithEq).slice(0, maxQ);

  for (const sport of eqPicks) {
    const equipment = pick(sport.eq);
    const shortEq = equipment.split('(')[0].trim();
    const otherSports = pickExcluding(
      sports.map(s => s.n),
      [sport.n],
      3
    );
    const { options, correct } = buildOptions(sport.n, otherSports);
    questions.push({
      id: nextId(),
      question: `Which sport uses "${shortEq}"?`,
      options,
      correct,
      explanation: `${shortEq} is used in ${sport.n}.`,
      difficulty: 'easy',
      type: 'cross-sport',
    });
  }

  // "Which sport has [player]?" questions
  const sportsWithPlayers = sports.filter(s => s.p && s.p.length > 0);
  const playerPicks = shuffle(sportsWithPlayers).slice(0, 2);

  for (const sport of playerPicks) {
    const player = pick(sport.p);
    const otherSports = pickExcluding(
      sports.map(s => s.n),
      [sport.n],
      3
    );
    const { options, correct } = buildOptions(sport.n, otherSports);
    questions.push({
      id: nextId(),
      question: `${player.nm} is famous in which sport?`,
      options,
      correct,
      explanation: `${player.nm} (${player.nk || ''}) is a star in ${sport.n}. ${player.st || ''}`,
      difficulty: 'easy',
      type: 'cross-sport',
    });
  }

  return questions;
}
