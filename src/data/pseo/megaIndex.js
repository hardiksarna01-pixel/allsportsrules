import { sports, sportsMap } from "../sports";
import { glossary } from "../glossary";
import { positions } from "../positions";
import { getRules } from "../rules";

function slugify(s) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

function deslugify(s) {
  return s.replace(/-/g, " ").replace(/\b\w/g, c => c.toUpperCase());
}

// ---- INTENTS (10 types) ----
const INTENTS = [
  { id: "what-is", slug: "what-is", label: "What is", meta: "What is {topic} in {sport}? Complete explanation with examples and official rules." },
  { id: "how-to", slug: "how-to", label: "How to", meta: "How to {topic} in {sport}. Step-by-step guide for players and fans." },
  { id: "rules", slug: "rules-for", label: "Rules for", meta: "Official rules for {topic} in {sport}. Governing body regulations explained." },
  { id: "explained", slug: "explained", label: "Explained", meta: "{topic} in {sport} explained simply. Easy-to-understand guide for everyone." },
  { id: "examples", slug: "examples-of", label: "Examples of", meta: "Real examples of {topic} in {sport}. Famous moments and iconic situations." },
  { id: "history", slug: "history-of", label: "History of", meta: "History of {topic} in {sport}. Origins, evolution, and key milestones." },
  { id: "why", slug: "why", label: "Why", meta: "Why does {topic} exist in {sport}? The reasoning and purpose explained." },
  { id: "penalty", slug: "penalty-for", label: "Penalty for", meta: "What is the penalty for {topic} in {sport}? Consequences explained." },
  { id: "advanced", slug: "advanced-guide", label: "Advanced Guide to", meta: "Advanced guide to {topic} in {sport}. Expert-level analysis and strategy." },
  { id: "beginners", slug: "beginners-guide", label: "Beginner Guide to", meta: "{topic} in {sport} for beginners. Simple explanation for newcomers." },
  { id: "comparison", slug: "compare", label: "Comparing", meta: "Compare {topic} across different contexts in {sport}. Side-by-side analysis." },
  { id: "mistakes", slug: "common-mistakes", label: "Common Mistakes with", meta: "Common mistakes with {topic} in {sport}. Avoid these errors and play better." },
  { id: "quiz", slug: "quiz-about", label: "Quiz About", meta: "Test your knowledge of {topic} in {sport}. Interactive quiz with answers." },
  { id: "strategy", slug: "strategy-for", label: "Strategy for", meta: "Winning strategy for {topic} in {sport}. Pro tips and tactical analysis." },
  { id: "stats", slug: "stats-about", label: "Stats About", meta: "Key statistics about {topic} in {sport}. Numbers, records, and data." },
];

// ---- AUDIENCES (5 types) ----
const AUDIENCES = [
  { id: "kids", slug: "for-kids", label: "for Kids" },
  { id: "coaches", slug: "for-coaches", label: "for Coaches" },
  { id: "parents", slug: "for-parents", label: "for Parents" },
  { id: "referees", slug: "for-referees", label: "for Referees" },
  { id: "fans", slug: "for-fans", label: "for Fans" },
];

// ======= TOPIC EXTRACTORS =======

function extractRuleTopics(sport) {
  const topics = [];
  // From legacy string rules
  (sport.r || []).forEach((rule, i) => {
    const clean = rule.replace(/\u2696\uFE0F\s*/g, "").trim();
    const title = (clean.split(":")[0] || clean.split("\u2014")[0] || "").trim().slice(0, 60);
    if (title.length > 2) {
      topics.push({ id: "rule-" + i, title, slug: slugify(title), type: "rule", text: clean });
    }
  });
  // From structured rules
  const structured = getRules(sport.id);
  structured.forEach((r) => {
    const dup = topics.find(t => slugify(t.title) === slugify(r.title));
    if (!dup && r.title) {
      topics.push({ id: r.id, title: r.title, slug: slugify(r.title), type: "rule", text: r.full || r.short || "" });
    }
  });
  return topics;
}

function extractGlossaryTopics(sport) {
  const name = sport.n.toLowerCase();
  const id = sport.id.toLowerCase();
  return glossary
    .filter(g => g.sport && (g.sport.toLowerCase().includes(name) || g.sport.toLowerCase().includes(id)))
    .map(g => ({ id: "term-" + g.id, title: g.term, slug: slugify(g.term), type: "term", text: g.def }));
}

function extractPositionTopics(sport) {
  const posData = positions[sport.id];
  if (!posData) return [];
  return (posData.list || []).map(p => ({
    id: "pos-" + p.id, title: p.n, slug: slugify(p.n), type: "position", text: p.desc || ""
  }));
}

function extractEquipmentTopics(sport) {
  return (sport.eq || []).map((eq, i) => {
    const name = eq.split("(")[0].trim();
    return { id: "eq-" + i, title: name, slug: slugify(name), type: "equipment", text: eq };
  });
}

function extractTacticTopics(sport) {
  return (sport.tac || []).map((tac, i) => {
    const title = tac.split("\u2014")[0].split("\u2013")[0].trim().slice(0, 60);
    return { id: "tac-" + i, title, slug: slugify(title), type: "strategy", text: tac };
  });
}

function extractFAQTopics(sport) {
  return (sport.faq || []).map(([q, a], i) => ({
    id: "faq-" + i, title: q.slice(0, 60), slug: slugify(q.slice(0, 50)), type: "faq", text: a
  }));
}

function extractFormatTopics(sport) {
  return (sport.fmt || []).map((fmt, i) => {
    const name = fmt.split("(")[0].trim().slice(0, 40);
    return { id: "fmt-" + i, title: name, slug: slugify(name), type: "format", text: fmt };
  });
}

function extractOfficialTopics(sport) {
  return (sport.off || []).map((off, i) => {
    const name = off.split("(")[0].trim().slice(0, 40);
    return { id: "off-" + i, title: name, slug: slugify(name), type: "official", text: off };
  });
}

function extractScoringTopics(sport) {
  if (!sport.sc) return [];
  const topics = [];
  if (sport.sc.pts) topics.push({ id: "sc-pts", title: "Scoring System", slug: "scoring-system", type: "scoring", text: sport.sc.pts });
  if (sport.sc.win) topics.push({ id: "sc-win", title: "Winning Conditions", slug: "winning-conditions", type: "scoring", text: sport.sc.win });
  return topics;
}


// ======= PATTERN GENERATORS =======

const HOW_MANY_PATTERNS = [
  "players", "substitutes", "referees", "periods", "halves", "quarters", "sets",
  "points-to-win", "fouls-before-ejection", "timeouts", "innings", "overs",
  "rounds", "minutes", "cards-before-red", "challenges", "coaches",
  "officials", "umpires", "breaks", "divisions", "weight-classes"
];

const CAN_YOU_PATTERNS = [
  "use-hands", "score-from-halfway", "substitute-during-play", "challenge-a-decision",
  "score-directly-from-restart", "pass-back-to-keeper", "score-own-goal",
  "play-with-fewer-players", "wear-any-number", "get-sent-off-from-bench",
  "be-offside-from-goal-kick", "take-quick-free-kick", "delay-the-game",
  "appeal-after-next-delivery", "hit-the-ball-twice", "obstruct-the-fielder",
  "retire-hurt-and-come-back", "serve-underhand", "challenge-with-no-challenges",
  "score-from-behind-halfway", "switch-positions-during-play", "play-without-goalkeeper",
  "tackle-from-behind", "dunk-from-free-throw-line", "run-with-the-ball",
  "block-a-shot-after-it-hits-backboard", "change-bowling-arm-mid-over",
  "bowl-consecutive-overs", "catch-the-ball-over-boundary", "mankad-the-runner",
  "play-barefoot", "wear-jewelry-during-match", "switch-sides-mid-game",
  "score-from-outside-the-field", "refuse-to-shake-hands", "celebrate-excessively",
  "use-technology-to-review", "call-timeout-from-bench", "sub-goalkeeper-for-outfield",
  "play-after-being-substituted", "protest-referee-decision", "request-new-ball",
  "change-equipment-mid-match", "play-in-extreme-weather", "forfeit-and-restart",
  "appeal-a-penalty-decision", "score-with-your-head", "play-without-shoes"
];

const WHAT_HAPPENS_PATTERNS = [
  "tie-at-full-time", "injury-during-play", "red-card-for-goalkeeper",
  "ball-hits-referee", "power-cut-during-match", "rain-stops-play",
  "both-teams-same-score", "player-scores-own-goal", "ball-bursts-during-play",
  "crowd-interference", "wrong-decision-by-referee", "player-refuses-to-leave",
  "match-abandoned", "ball-hits-umpire", "batter-hits-ball-twice",
  "bowler-bowls-no-ball-on-last-delivery", "penalty-shootout-still-tied",
  "player-gets-injured-during-celebration", "ball-hits-bird-mid-flight",
  "streaker-runs-on-pitch", "player-time-wasting", "substitute-scores-immediately",
  "goalkeeper-handles-backpass", "batsman-out-on-free-hit",
  "ball-crosses-boundary-after-fielder-touches", "car-breaks-down-during-race",
  "fighter-cant-continue", "shuttle-hits-ceiling", "ball-lands-on-line",
  "match-goes-to-extra-time", "player-gets-two-yellow-cards", "team-runs-out-of-substitutions",
  "coach-gets-sent-off", "spectator-throws-object-on-field", "player-breaks-equipment",
  "match-clock-malfunctions", "player-celebrates-prematurely", "wrong-player-takes-penalty",
  "captain-disagrees-with-umpire", "player-changes-position-illegally", "team-protests-result",
  "player-returns-from-injury-too-early", "ball-hits-obstacle-on-field",
  "multiple-players-injured-same-play", "referee-makes-obvious-mistake",
  "match-delayed-by-weather", "player-retires-mid-match", "score-tied-at-end"
];

const MEASUREMENT_PATTERNS = [
  "field-dimensions", "court-size", "ball-size", "ball-weight", "goal-size",
  "net-height", "pitch-length", "boundary-distance", "free-throw-distance",
  "penalty-spot-distance", "three-point-line-distance", "crease-dimensions",
  "ring-size", "track-length", "pool-dimensions", "table-dimensions"
];

const TRAINING_PATTERNS = [
  "training-drills", "fitness-requirements", "warm-up-routine", "skills-practice",
  "strength-training", "cardio-for-players", "flexibility-exercises",
  "mental-preparation", "nutrition-guide", "recovery-techniques",
  "speed-training", "agility-drills", "endurance-building",
  "hand-eye-coordination", "reaction-time-training"
];

const YEARLY_PATTERNS = ["2024", "2025", "2026"];

function generateHowManyTopics(sport) {
  return HOW_MANY_PATTERNS.map(p => ({
    id: "hm-" + p, title: "How Many " + deslugify(p), slug: "how-many-" + p,
    type: "question", text: "How many " + p.replace(/-/g, " ") + " in " + sport.n
  }));
}

function generateCanYouTopics(sport) {
  return CAN_YOU_PATTERNS.map(p => ({
    id: "cy-" + p, title: "Can You " + deslugify(p), slug: "can-you-" + p,
    type: "scenario", text: "Can you " + p.replace(/-/g, " ") + " in " + sport.n + "?"
  }));
}

function generateWhatHappensTopics(sport) {
  return WHAT_HAPPENS_PATTERNS.map(p => ({
    id: "wh-" + p, title: "What Happens When " + deslugify(p), slug: "what-happens-" + p,
    type: "scenario", text: "What happens when " + p.replace(/-/g, " ") + " in " + sport.n
  }));
}

function generateMeasurementTopics(sport) {
  return MEASUREMENT_PATTERNS.map(p => ({
    id: "ms-" + p, title: deslugify(p), slug: p,
    type: "measurement", text: deslugify(p) + " for " + sport.n
  }));
}

function generateTrainingTopics(sport) {
  return TRAINING_PATTERNS.map(p => ({
    id: "tr-" + p, title: deslugify(p) + " for " + sport.n, slug: p,
    type: "training", text: p.replace(/-/g, " ") + " for " + sport.n
  }));
}

function generateYearlyTopics(sport) {
  return YEARLY_PATTERNS.flatMap(year => [
    { id: "yr-rules-" + year, title: sport.n + " Rules " + year, slug: "rules-" + year, type: "yearly", text: "Latest " + sport.n + " rules for " + year },
    { id: "yr-changes-" + year, title: "Rule Changes " + year, slug: "rule-changes-" + year, type: "yearly", text: sport.n + " rule changes in " + year },
  ]);
}

function generateComparisonTopics(sport) {
  const sameCat = sports.filter(s => s.id !== sport.id && s.cat === sport.cat).slice(0, 5);
  return sameCat.flatMap(other => [
    { id: "vs-" + other.id + "-rules", title: sport.n + " vs " + other.n + " Rules", slug: sport.id + "-vs-" + other.id + "-rules", type: "comparison", text: "Comparing rules of " + sport.n + " and " + other.n },
    { id: "vs-" + other.id + "-scoring", title: sport.n + " vs " + other.n + " Scoring", slug: sport.id + "-vs-" + other.id + "-scoring", type: "comparison", text: "Comparing scoring systems" },
    { id: "vs-" + other.id + "-positions", title: sport.n + " vs " + other.n + " Positions", slug: sport.id + "-vs-" + other.id + "-positions", type: "comparison", text: "Comparing player positions" },
  ]);
}


// ======= COMPUTE ALL TOPICS FOR A SPORT =======

const _topicCache = {};

export function computeAllTopics(sport) {
  if (_topicCache[sport.id]) return _topicCache[sport.id];
  
  const raw = [
    ...extractRuleTopics(sport),
    ...extractGlossaryTopics(sport),
    ...extractPositionTopics(sport),
    ...extractEquipmentTopics(sport),
    ...extractTacticTopics(sport),
    ...extractFAQTopics(sport),
    ...extractFormatTopics(sport),
    ...extractOfficialTopics(sport),
    ...extractScoringTopics(sport),
    ...generateHowManyTopics(sport),
    ...generateCanYouTopics(sport),
    ...generateWhatHappensTopics(sport),
    ...generateMeasurementTopics(sport),
    ...generateTrainingTopics(sport),
    ...generateYearlyTopics(sport),
    ...generateComparisonTopics(sport),
  ];
  
  // Dedupe by slug
  const seen = new Set();
  const deduped = [];
  for (const t of raw) {
    if (!seen.has(t.slug)) {
      seen.add(t.slug);
      deduped.push(t);
    }
  }
  
  _topicCache[sport.id] = deduped;
  return deduped;
}

// ======= PAGE COUNT COMPUTATION =======

export function computePageCountForSport(sport) {
  const topics = computeAllTopics(sport);
  const topicCount = topics.length;
  // Each topic x 10 intents = learn pages
  const learnPages = topicCount * INTENTS.length;
  // Each topic x 5 audiences = guide pages (but only for top 30 topics)
  const guidePages = Math.min(topicCount, 50) * AUDIENCES.length;
  // Scenario pages (can-you + what-happens patterns)
  const scenarioPages = CAN_YOU_PATTERNS.length + WHAT_HAPPENS_PATTERNS.length;
  return learnPages + guidePages + scenarioPages;
}

export function getPageCount() {
  let total = 0;
  for (const sport of sports) {
    total += computePageCountForSport(sport);
  }
  // Add cross-sport comparison pages (same category pairs × 5 topics)
  for (let i = 0; i < sports.length; i++) {
    for (let j = i + 1; j < sports.length; j++) {
      if (sports[i].cat === sports[j].cat) total += 5;
    }
  }
  // Add format + history + strategy + records + position pages
  for (const sport of sports) {
    total += (sport.fmt || []).length; // format pages
    total += 1; // history page
    total += (sport.tac || []).length; // strategy pages
    total += 1; // records page
    const pd = positions[sport.id];
    if (pd) total += (pd.list || []).length; // position pages
  }
  return total;
}

// ======= CONTENT ENGINE =======

function pickFrom(arr, seed) {
  if (!arr || arr.length === 0) return "";
  return arr[Math.abs(seed) % arr.length];
}

function hashStr(s) {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = ((h << 5) - h + s.charCodeAt(i)) | 0;
  return h;
}

function generateIntro(sport, topic, intent) {
  const n = sport.n;
  const t = topic.title;
  const intros = {
    "what-is": t + " is one of the key concepts in " + n + ". Understanding it is essential whether you are a new fan, a player, or a coach. " + (topic.text ? topic.text.slice(0, 200) : "This concept shapes how the game is played and officiated at every level."),
    "how-to": "Learning how " + t.toLowerCase() + " works in " + n + " is a fundamental part of understanding the sport. " + (topic.text ? "Here is what the official rules say: " + topic.text.slice(0, 150) + "." : "This guide breaks it down step by step."),
    "rules": "The official rules governing " + t.toLowerCase() + " in " + n + " are set by " + (sport.gb || "the sport governing body") + ". " + (topic.text || "These regulations ensure fair play and consistency across all levels of competition."),
    "explained": "Let us break down " + t.toLowerCase() + " in " + n + " in the simplest possible terms. " + (topic.text ? topic.text.slice(0, 200) : "This is one of those concepts that seems complex at first but makes perfect sense once you see it in action."),
    "examples": "To truly understand " + t.toLowerCase() + " in " + n + ", it helps to look at real examples from professional matches. " + (topic.text ? "The rule states: " + topic.text.slice(0, 150) : "These moments show exactly how it plays out in practice."),
    "history": "The history of " + t.toLowerCase() + " in " + n + " stretches back to the early days of the sport. " + (sport.hist ? sport.hist.slice(0, 200) : "Understanding its origins helps explain why the rule exists in its current form."),
    "why": "Every rule in " + n + " exists for a reason, and " + t.toLowerCase() + " is no exception. " + (topic.text ? "Currently, the rule states: " + topic.text.slice(0, 150) : "It was introduced to ensure fairness, safety, or competitive balance in the sport."),
    "penalty": "When " + t.toLowerCase() + " is violated in " + n + ", there are specific consequences defined by the rules. " + (topic.text || "The severity of the penalty depends on the nature and intent of the violation."),
    "advanced": "For serious students of " + n + ", understanding the nuances of " + t.toLowerCase() + " goes beyond the basic rule. " + (topic.text ? topic.text.slice(0, 200) : "Professional players and coaches exploit these subtleties to gain competitive advantages."),
    "beginners": "If you are new to " + n + ", " + t.toLowerCase() + " is one of the first things you should understand. " + (topic.text ? "In simple terms: " + topic.text.slice(0, 150) : "Do not worry, we will explain it in plain English with no jargon."),
    "comparison": "Comparing " + t.toLowerCase() + " across different aspects of " + n + " reveals interesting patterns. " + (sport.cs ? "For reference, " + n + " is often compared to " + sport.cs.to + "." : "Different formats and competitions handle this differently."),
    "mistakes": "Even experienced " + n + " fans and players make mistakes when it comes to " + t.toLowerCase() + ". " + (topic.text ? "The rule states: " + topic.text.slice(0, 150) : "Here are the most common misunderstandings and how to avoid them."),
    "quiz": "Think you know everything about " + t.toLowerCase() + " in " + n + "? " + (topic.text ? "The official rule: " + topic.text.slice(0, 100) + ". But there is much more to it." : "Test your knowledge with these challenging questions about the rules."),
    "strategy": "Understanding the strategic implications of " + t.toLowerCase() + " in " + n + " separates casual fans from true experts. " + (sport.tac ? "Top teams use tactics like " + sport.tac[0].split("\u2014")[0].trim() + " to exploit this." : "Coaches and players study this extensively at the professional level."),
    "stats": "The numbers behind " + t.toLowerCase() + " in " + n + " tell a fascinating story. " + (sport.fans ? "With " + sport.fans + " fans globally, " + n + " generates massive amounts of data around this topic." : "Statistical analysis reveals patterns that change how the game is played."),
  };
  return intros[intent.id] || intros["what-is"];
}

function generateSections(sport, topic, intent) {
  const n = sport.n;
  const t = topic.title;
  const sections = [];
  
  // Section 1: Core explanation
  sections.push({
    heading: intent.id === "history" ? "Origins and Early Development" : "Understanding " + t,
    body: topic.text ? topic.text : "In " + n + ", " + t.toLowerCase() + " refers to a specific aspect of the game that affects how matches are played and decided. " + (sport.gb || "The governing body") + " maintains the official regulations."
  });
  
  // Section 2: Context-specific
  if (intent.id === "how-to") {
    sections.push({ heading: "Step-by-Step Process", body: "First, understand the basic principle behind " + t.toLowerCase() + ". Then, observe how it is applied in live " + n + " matches. Practice recognizing situations where " + t.toLowerCase() + " comes into play. Finally, study edge cases that can surprise even experienced fans." });
  } else if (intent.id === "examples") {
    const fact = pickFrom(sport.f, hashStr(t));
    sections.push({ heading: "Notable Examples", body: fact ? "Here is a related fact: " + fact + " These moments demonstrate exactly how " + t.toLowerCase() + " impacts the outcome of " + n + " matches." : "Professional " + n + " matches regularly feature situations involving " + t.toLowerCase() + ". Watch for these moments during live broadcasts to deepen your understanding." });
  } else if (intent.id === "penalty") {
    sections.push({ heading: "Consequences and Sanctions", body: "Violating the " + t.toLowerCase() + " rule in " + n + " can result in penalties ranging from warnings to more severe sanctions. The exact punishment depends on the severity, intent, and context of the violation. " + (sport.gb || "The governing body") + " has clear guidelines for officials to follow." });
  } else if (intent.id === "history") {
    sections.push({ heading: "Evolution Over Time", body: sport.hist ? "The broader history of " + n + ": " + sport.hist + " The rule around " + t.toLowerCase() + " has evolved alongside these changes." : "Like many aspects of " + n + ", " + t.toLowerCase() + " has evolved significantly over the decades. Rule changes are typically driven by player safety, competitive balance, or technological advances." });
  } else {
    sections.push({ heading: "Why It Matters", body: t + " in " + n + " is not just a technicality. It fundamentally shapes strategy, player behavior, and match outcomes. " + (sport.fans ? "With " + sport.fans + " fans worldwide, " + n + " relies on clear rules to maintain its global appeal." : "Understanding this concept will transform how you watch and appreciate the sport.") });
  }
  
  // Section 3: Official rule reference
  if (sport.gb) {
    sections.push({ heading: "Official Regulations", body: "According to " + sport.gb + ", " + t.toLowerCase() + " is governed by specific regulations that apply at all levels of competition. " + (sport.sc ? "The scoring system (" + sport.sc.pts + ") interacts with this rule in important ways." : "Officials are trained to apply this rule consistently across all match formats.") });
  }
  
  // Section 4: Practical tips
  sections.push({
    heading: intent.id === "beginners" ? "Quick Summary" : "Key Takeaways",
    body: "Whether you are watching " + n + " for the first time or have been a fan for years, understanding " + t.toLowerCase() + " enriches your experience. " + (sport.fmt ? "Note that the application may vary between formats: " + sport.fmt.slice(0, 2).join(", ") + "." : "The rule applies consistently across most competition levels.")
  });
  
  return sections;
}

function generateKeyPoints(sport, topic, intent) {
  const t = topic.title;
  const n = sport.n;
  return [
    t + " is a fundamental part of " + n + " rules",
    "Governed by " + (sport.gb || "the official governing body"),
    topic.text ? topic.text.split(".")[0] + "." : "Applies at all levels of competition",
    sport.fmt ? "Rules may vary between formats: " + sport.fmt[0] : "Consistent across most competitions",
    "Understanding this concept improves your appreciation of " + n,
    intent.id === "beginners" ? "Start by watching live matches to see it in action" : "Study edge cases for deeper understanding",
  ];
}

function generateFAQ(sport, topic, intent) {
  const t = topic.title;
  const n = sport.n;
  const faqs = [
    { q: "What exactly is " + t.toLowerCase() + " in " + n + "?", a: topic.text ? topic.text.slice(0, 250) : t + " is a specific rule or concept in " + n + " that governs how certain situations are handled during a match." },
    { q: "When was " + t.toLowerCase() + " introduced in " + n + "?", a: sport.hist ? "The history of " + n + ": " + sport.hist.slice(0, 200) + " The specific rule around " + t.toLowerCase() + " evolved alongside these developments." : t + " has been part of " + n + " since the early codification of the sport rules by " + (sport.gb || "the governing body") + "." },
    { q: "Does " + t.toLowerCase() + " apply in all formats of " + n + "?", a: sport.fmt ? "The application may vary between " + n + " formats: " + sport.fmt.join(", ") + ". Always check the specific competition rules." : "Generally, " + t.toLowerCase() + " applies across all competitive formats of " + n + ", though minor variations may exist." },
  ];
  // Add sport-specific FAQ if available
  if (sport.faq && sport.faq.length > 0) {
    const [q, a] = sport.faq[hashStr(t + intent.id) % sport.faq.length] || sport.faq[0];
    faqs.push({ q, a });
  }
  return faqs;
}

function generateRelatedLinks(sport, topic) {
  const links = [
    { url: "/sports/" + sport.id, title: sport.n + " Complete Rules Guide" },
    { url: "/sports/" + sport.id + "/beginners", title: sport.n + " for Beginners" },
  ];
  // Add related topic links
  const topics = computeAllTopics(sport);
  const related = topics.filter(t => t.slug !== topic.slug && t.type === topic.type).slice(0, 3);
  related.forEach(r => {
    links.push({ url: "/learn/" + sport.id + "/what-is-" + r.slug, title: "What is " + r.title + " in " + sport.n + "?" });
  });
  if (sport.faq && sport.faq.length > 0) {
    links.push({ url: "/glossary", title: sport.n + " Glossary" });
  }
  return links.slice(0, 6);
}

export function generatePageContent(sport, topic, intent, pageType) {
  return {
    title: intent.label + " " + topic.title + " in " + sport.n,
    metaTitle: intent.label + " " + topic.title + " in " + sport.n + " | SportDecoded",
    metaDesc: intent.meta.replace("{topic}", topic.title).replace("{sport}", sport.n),
    sportName: sport.n,
    sportColor: sport.c,
    sportEmoji: sport.i,
    sportId: sport.id,
    pageType: pageType,
    topicTitle: topic.title,
    intentId: intent.id,
    content: {
      intro: generateIntro(sport, topic, intent),
      sections: generateSections(sport, topic, intent),
      keyPoints: generateKeyPoints(sport, topic, intent),
      faq: generateFAQ(sport, topic, intent),
      relatedLinks: generateRelatedLinks(sport, topic),
      funFact: pickFrom(sport.f, hashStr(topic.slug)),
    },
  };
}

// ======= LOOKUP PAGE =======

export function lookupPage(pageType, sportId, slug) {
  const sport = sportsMap[sportId];
  if (!sport) return null;
  
  // Parse intent from slug prefix
  let matchedIntent = null;
  let topicSlug = slug;
  for (const intent of INTENTS) {
    if (slug.startsWith(intent.slug + "-")) {
      matchedIntent = intent;
      topicSlug = slug.slice(intent.slug.length + 1);
      break;
    }
  }
  if (!matchedIntent) matchedIntent = INTENTS[0]; // default to what-is
  
  // Find topic
  const allTopics = computeAllTopics(sport);
  let topic = allTopics.find(t => t.slug === topicSlug);
  
  // Fallback: try to find partial match
  if (!topic) {
    topic = allTopics.find(t => topicSlug.includes(t.slug) || t.slug.includes(topicSlug));
  }
  
  // Last resort: create topic from slug
  if (!topic) {
    topic = { id: "gen-" + topicSlug, title: deslugify(topicSlug), slug: topicSlug, type: "general", text: "" };
  }
  
  return generatePageContent(sport, topic, matchedIntent, pageType);
}

// ======= ENUMERATE URLS =======

export function* enumerateUrls() {
  for (const sport of sports) {
    const topics = computeAllTopics(sport);
    
    // Learn pages: topic x intent
    for (const topic of topics) {
      for (const intent of INTENTS) {
        yield "/learn/" + sport.id + "/" + intent.slug + "-" + topic.slug;
      }
    }
    
    // Guide pages: top 50 topics x audiences
    const topTopics = topics.slice(0, 50);
    for (const topic of topTopics) {
      for (const aud of AUDIENCES) {
        yield "/guide/" + sport.id + "/" + topic.slug + "-" + aud.slug;
      }
    }
    
    // Scenario pages
    for (const p of CAN_YOU_PATTERNS) {
      yield "/scenario/" + sport.id + "/can-you-" + p;
    }
    for (const p of WHAT_HAPPENS_PATTERNS) {
      yield "/scenario/" + sport.id + "/what-happens-" + p;
    }
    
    // Format pages
    for (const fmt of (sport.fmt || [])) {
      const fmtSlug = slugify(fmt.split("(")[0].trim().slice(0, 40));
      yield "/format/" + sport.id + "/" + fmtSlug;
    }

    // History page
    yield "/history/" + sport.id + "/origins-and-evolution";

    // Strategy pages
    for (const tac of (sport.tac || [])) {
      const tacSlug = slugify(tac.split("\u2014")[0].trim().slice(0, 50));
      yield "/strategy/" + sport.id + "/" + tacSlug;
    }

    // Records page
    yield "/records/" + sport.id + "/all-time-records";

    // Position pages
    const posData = positions[sport.id];
    if (posData) {
      for (const p of (posData.list || [])) {
        yield "/positions/" + sport.id + "/" + slugify(p.n);
      }
    }
  }
  
  // Cross-sport comparison pages
  for (let i = 0; i < sports.length; i++) {
    for (let j = i + 1; j < sports.length; j++) {
      if (sports[i].cat === sports[j].cat) {
        const matchup = sports[i].id + "-vs-" + sports[j].id;
        yield "/vs/" + matchup + "/rules";
        yield "/vs/" + matchup + "/scoring";
        yield "/vs/" + matchup + "/positions";
        yield "/vs/" + matchup + "/equipment";
        yield "/vs/" + matchup + "/popularity";
      }
    }
  }
}

export { INTENTS, AUDIENCES };
export default { lookupPage, getPageCount, enumerateUrls, computeAllTopics, computePageCountForSport, INTENTS, AUDIENCES };
