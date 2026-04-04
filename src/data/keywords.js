import { sports } from './sports';
import { glossary } from './glossary';
import { events } from './events';
import { positions } from './positions';

// ---------------------------------------------------------------------------
// Helper: slugify any string
// ---------------------------------------------------------------------------
function slugify(str) {
  return str
    .toLowerCase()
    .replace(/['']/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

// ---------------------------------------------------------------------------
// Keyword factory
// ---------------------------------------------------------------------------
function kw(keyword, url, title, metaDesc, cluster, sportId = null, volume = 'medium') {
  return { keyword, url, title: `${title} | SportDecoded`, metaDesc, cluster, sportId, volume };
}

// ===========================================================================
// Layer 1 — Core sport patterns (12 per sport)
// ===========================================================================
const layer1 = sports.flatMap((s) => {
  const n = s.n;
  const base = `/sports/${s.id}`;
  return [
    kw(`${n} rules`, base, `${n} Rules - Complete Guide`, `Learn ${n} rules explained simply. Scoring, fouls, field dimensions and more.`, 'sport-rules', s.id, 'high'),
    kw(`${n} rules for beginners`, `${base}/beginners`, `${n} Rules for Beginners`, `${n} rules explained for beginners — simple, visual, jargon-free.`, 'sport-rules', s.id, 'high'),
    kw(`how to play ${n}`, `${base}/beginners`, `How to Play ${n}`, `A beginner-friendly guide to playing ${n}. Learn the basics in 5 minutes.`, 'sport-rules', s.id, 'high'),
    kw(`${n} scoring system`, base, `${n} Scoring System Explained`, `Understand how scoring works in ${n} — points, goals, runs and more.`, 'sport-rules', s.id, 'medium'),
    kw(`${n} positions explained`, `${base}/positions`, `${n} Positions Explained`, `Every position in ${n} explained with roles, responsibilities and famous players.`, 'sport-rules', s.id, 'medium'),
    kw(`${n} equipment`, base, `${n} Equipment Guide`, `Official ${n} equipment — what you need to play and what the pros use.`, 'sport-rules', s.id, 'medium'),
    kw(`${n} field dimensions`, base, `${n} Field Dimensions`, `Official ${n} field and court dimensions, markings and layout explained.`, 'sport-rules', s.id, 'medium'),
    kw(`${n} court dimensions`, base, `${n} Court Dimensions`, `${n} court size, lines and markings — official dimensions explained.`, 'sport-rules', s.id, 'low'),
    kw(`${n} history`, base, `${n} History — Origins to Modern Day`, `The history of ${n}: origins, key milestones and evolution of the sport.`, 'sport-rules', s.id, 'medium'),
    kw(`${n} rules 2026`, base, `${n} Rules 2026 — Latest Updates`, `${n} rules for 2026 including the latest rule changes and updates.`, 'sport-rules', s.id, 'medium'),
    kw(`${n} explained simply`, `${base}/beginners`, `${n} Explained Simply`, `${n} explained in plain English — no jargon, just clarity.`, 'sport-rules', s.id, 'medium'),
    kw(`${n} referee rules`, base, `${n} Referee & Officials Rules`, `How refereeing and officiating works in ${n}. Signals, decisions and review systems.`, 'sport-rules', s.id, 'low'),
    kw(`${n} game format`, base, `${n} Game Format & Structure`, `How a ${n} game is structured — periods, sets, innings and match formats.`, 'sport-rules', s.id, 'low'),
    kw(`${n} penalties`, base, `${n} Penalties & Fouls`, `All penalties and fouls in ${n} explained — what they are and when they apply.`, 'sport-rules', s.id, 'medium'),
    kw(`${n} tactics`, base, `${n} Tactics & Strategy Guide`, `Key tactics and strategies used in ${n} at the highest level.`, 'sport-rules', s.id, 'medium'),
    kw(`${n} glossary`, `/glossary?sport=${s.id}`, `${n} Glossary — Key Terms`, `All ${n} terms and jargon explained in a simple glossary.`, 'sport-rules', s.id, 'medium'),
    kw(`${n} fun facts`, base, `${n} Fun Facts`, `Interesting and surprising fun facts about ${n}.`, 'sport-rules', s.id, 'low'),
    kw(`${n} world records`, base, `${n} World Records`, `The most incredible world records in ${n} history.`, 'sport-rules', s.id, 'medium'),
    kw(`${n} famous matches`, base, `Famous ${n} Matches`, `The most iconic and famous matches in ${n} history.`, 'sport-rules', s.id, 'low'),
    kw(`${n} tips for beginners`, `${base}/beginners`, `${n} Tips for Beginners`, `Top tips for beginners learning to play ${n}.`, 'sport-rules', s.id, 'medium'),
    kw(`${n} fouls list`, base, `${n} Fouls — Complete List`, `Every foul and violation in ${n} listed and explained.`, 'sport-rules', s.id, 'low'),
    kw(`${n} rules changes 2025`, base, `${n} Rule Changes 2025`, `Latest ${n} rule changes from 2025 — what has changed and why.`, 'sport-rules', s.id, 'low'),
    kw(`${n} leagues`, base, `${n} Leagues Around the World`, `Major ${n} leagues and competitions worldwide.`, 'sport-rules', s.id, 'low'),
    kw(`learn ${n}`, `${base}/beginners`, `Learn ${n} — Beginner Guide`, `Learn ${n} from scratch — rules, techniques and how to get started.`, 'sport-rules', s.id, 'medium'),
    kw(`${n} basic rules`, `${base}/beginners`, `${n} Basic Rules`, `The basic rules of ${n} you need to know to watch or play.`, 'sport-rules', s.id, 'high'),
    kw(`${n} rules pdf`, base, `${n} Rules PDF Download`, `Download the complete ${n} rules in a simple guide format.`, 'sport-rules', s.id, 'low'),
    kw(`${n} rule book`, base, `${n} Rule Book — Official Guide`, `The official ${n} rule book summarised and explained.`, 'sport-rules', s.id, 'low'),
    kw(`${n} substitution rules`, base, `${n} Substitution Rules`, `How substitutions work in ${n} — limits, timing and special rules.`, 'sport-rules', s.id, 'low'),
  ];
});

// ===========================================================================
// Layer 2 — Question long-tail (10 per sport)
// ===========================================================================
const layer2 = sports.flatMap((s) => {
  const n = s.n;
  const base = `/sports/${s.id}`;
  return [
    kw(`how many players in ${n}`, `${base}/beginners`, `How Many Players in ${n}?`, `Find out how many players are on a ${n} team and squad sizes for different formats.`, 'questions', s.id, 'medium'),
    kw(`how long is a ${n} game`, `${base}/beginners`, `How Long Is a ${n} Game?`, `${n} match duration explained — average game length for all formats.`, 'questions', s.id, 'medium'),
    kw(`what are the rules of ${n}`, base, `What Are the Rules of ${n}?`, `The complete rules of ${n} explained from basics to advanced.`, 'questions', s.id, 'high'),
    kw(`${n} for dummies`, `${base}/beginners`, `${n} for Dummies — Easy Guide`, `${n} for dummies: the simplest possible explanation of the sport.`, 'questions', s.id, 'medium'),
    kw(`${n} cheat sheet`, `${base}/beginners`, `${n} Cheat Sheet`, `Quick ${n} cheat sheet — all the key rules on one page.`, 'questions', s.id, 'medium'),
    kw(`explain ${n} to me`, `${base}/beginners`, `Explain ${n} to Me`, `${n} explained clearly for someone who has never watched the sport.`, 'questions', s.id, 'medium'),
    kw(`most confusing rules in ${n}`, base, `Most Confusing ${n} Rules Explained`, `The most confusing rules in ${n} broken down into simple terms.`, 'questions', s.id, 'low'),
    kw(`where to watch ${n}`, `/where-to-watch`, `Where to Watch ${n}`, `Where to watch ${n} — TV channels, streaming services and free options.`, 'questions', s.id, 'medium'),
    kw(`${n} rules for kids`, `${base}/beginners`, `${n} Rules for Kids`, `${n} rules explained for kids — simple, fun and easy to understand.`, 'questions', s.id, 'medium'),
    kw(`${n} vs`, `/compare`, `${n} Compared — Sport Comparisons`, `Compare ${n} with similar sports. Side-by-side rules, scoring and gameplay.`, 'questions', s.id, 'low'),
    kw(`why is ${n} so popular`, base, `Why Is ${n} So Popular?`, `Why ${n} is one of the most popular sports in the world.`, 'questions', s.id, 'low'),
    kw(`${n} common mistakes`, `${base}/beginners`, `Common Mistakes in ${n}`, `The most common mistakes beginners make in ${n} and how to avoid them.`, 'questions', s.id, 'low'),
    kw(`${n} what is offside`, base, `Offside in ${n} Explained`, `The offside rule in ${n} — when it applies and common misconceptions.`, 'questions', s.id, 'low'),
    kw(`${n} how to score`, base, `How to Score in ${n}`, `All the ways to score in ${n} explained with point values.`, 'questions', s.id, 'medium'),
    kw(`is ${n} in the Olympics`, base, `Is ${n} in the Olympics?`, `Is ${n} an Olympic sport? History, format and medal events explained.`, 'questions', s.id, 'low'),
    kw(`${n} time out rules`, base, `${n} Time Out Rules`, `How time outs work in ${n} — number, duration and when they can be called.`, 'questions', s.id, 'low'),
    kw(`${n} overtime rules`, base, `${n} Overtime Rules`, `How overtime and extra time works in ${n} — tiebreakers explained.`, 'questions', s.id, 'medium'),
    kw(`${n} team size`, `${base}/beginners`, `${n} Team Size`, `How many players on a ${n} team? Squad sizes for all formats.`, 'questions', s.id, 'low'),
    kw(`${n} age limit`, base, `${n} Age Limits`, `Age limits and eligibility rules in professional ${n}.`, 'questions', s.id, 'low'),
  ];
});

// ===========================================================================
// Layer 3 — Glossary (4 per term)
// ===========================================================================
const layer3 = glossary.flatMap((t) => {
  const slug = slugify(t.term);
  const sportLabel = t.sport;
  return [
    kw(`what is ${t.term.toLowerCase()} in ${sportLabel}`, `/glossary/${slug}`, `What Is ${t.term} in ${sportLabel}?`, `${t.term} in ${sportLabel} — definition, examples and when the rule applies.`, 'glossary', null, 'medium'),
    kw(`${t.term.toLowerCase()} meaning in ${sportLabel}`, `/glossary/${slug}`, `${t.term} Meaning in ${sportLabel}`, `The meaning of ${t.term} in ${sportLabel} explained simply with examples.`, 'glossary', null, 'low'),
    kw(`${t.term.toLowerCase()} explained simply`, `/glossary/${slug}`, `${t.term} Explained Simply`, `${t.term} explained in plain English. Clear definition with visual examples.`, 'glossary', null, 'low'),
    kw(`${t.term.toLowerCase()} rule explained`, `/glossary/${slug}`, `${t.term} Rule Explained`, `The ${t.term} rule fully explained — when it applies, exceptions and examples.`, 'glossary', null, 'low'),
  ];
});

// ===========================================================================
// Layer 4 — Comparisons (top 50 pairs)
// ===========================================================================
const comparisonPairs = [
  ['cricket', 'baseball'], ['rugby', 'nfl'], ['pickleball', 'tennis'], ['padel', 'tennis'],
  ['futsal', 'football'], ['table-tennis', 'badminton'], ['boxing', 'mma'], ['judo', 'wrestling'],
  ['field-hockey', 'ice-hockey'], ['figure-skating', 'gymnastics'], ['swimming', 'diving'],
  ['cycling', 'bmx'], ['archery', 'shooting'], ['volleyball', 'handball'], ['water-polo', 'swimming'],
  ['lol', 'valorant'], ['squash', 'tennis'], ['kabaddi', 'wrestling'], ['surfing', 'skateboard'],
  ['climbing', 'gymnastics'], ['cricket', 'football'], ['basketball', 'handball'], ['nfl', 'rugby'],
  ['tennis', 'badminton'], ['baseball', 'cricket'], ['golf', 'archery'], ['mma', 'judo'],
  ['football', 'futsal'], ['volleyball', 'table-tennis'], ['ice-hockey', 'field-hockey'],
  ['lacrosse', 'field-hockey'], ['flag-football', 'nfl'], ['padel', 'squash'], ['rowing', 'canoe'],
  ['triathlon', 'swimming'], ['snowboard', 'skateboard'], ['alpine-ski', 'snowboard'],
  ['breaking', 'figure-skating'], ['taekwondo', 'judo'], ['fencing', 'taekwondo'],
  ['wrestling', 'boxing'], ['horse-racing', 'equestrian'], ['darts', 'archery'],
  ['snooker', 'bowling'], ['disc-golf', 'golf'], ['teqball', 'football'],
  ['cricket', 'tennis'], ['nfl', 'basketball'], ['rugby', 'football'],
  ['pickleball', 'padel'], ['crossfit', 'weightlifting'],
];

// Build a quick lookup from sport id → name
const sportNameMap = {};
sports.forEach((s) => { sportNameMap[s.id] = s.n; });

const layer4 = comparisonPairs.flatMap(([a, b]) => {
  const nA = sportNameMap[a] || a;
  const nB = sportNameMap[b] || b;
  const url = `/compare/${a}-vs-${b}`;
  return [
    kw(`${nA} vs ${nB}`, url, `${nA} vs ${nB} — Rules Compared`, `${nA} vs ${nB}: side-by-side comparison of rules, scoring, field size, players and gameplay.`, 'comparison', null, 'medium'),
    kw(`${nA} vs ${nB} rules`, url, `${nA} vs ${nB} Rules Compared`, `Compare the rules of ${nA} and ${nB}. Key differences and similarities.`, 'comparison', null, 'low'),
    kw(`difference between ${nA} and ${nB}`, url, `Difference Between ${nA} and ${nB}`, `What is the difference between ${nA} and ${nB}? Rules, equipment and format compared.`, 'comparison', null, 'medium'),
  ];
});

// ===========================================================================
// Layer 5 — Events (5 per event)
// ===========================================================================
const layer5 = events.flatMap((ev) => {
  const slug = ev.id;
  const base = `/events/${slug}`;
  return [
    kw(`${ev.n} rules`, base, `${ev.n} Rules & Format`, `Official rules and format for the ${ev.n}. Everything you need to know.`, 'events', ev.cat, 'medium'),
    kw(`${ev.n} format`, base, `${ev.n} Format Explained`, `How the ${ev.n} works — groups, knockout rounds, points system and tiebreakers.`, 'events', ev.cat, 'medium'),
    kw(`${ev.n} schedule`, `${base}/schedule`, `${ev.n} Schedule & Dates`, `${ev.n} schedule: full fixture list, dates, times and venues.`, 'events', ev.cat, 'medium'),
    kw(`${ev.n} teams`, base, `${ev.n} Teams & Squads`, `All teams competing in the ${ev.n} with squads and key players.`, 'events', ev.cat, 'low'),
    kw(`how to watch ${ev.n}`, `${base}`, `How to Watch ${ev.n}`, `How and where to watch the ${ev.n} — TV channels, streaming and free options.`, 'events', ev.cat, 'medium'),
  ];
});

// ===========================================================================
// Layer 6 — World Cup 2026 (200+ keywords)
// ===========================================================================
const wc26Groups = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L'];
const wc26Teams = [
  'USA', 'Mexico', 'Canada', 'Brazil', 'Argentina', 'France', 'Germany', 'Spain',
  'England', 'Portugal', 'Netherlands', 'Belgium', 'Italy', 'Croatia', 'Uruguay',
  'Colombia', 'Japan', 'South Korea', 'Australia', 'Saudi Arabia', 'Qatar', 'Iran',
  'Morocco', 'Senegal', 'Cameroon', 'Nigeria', 'Ghana', 'Tunisia', 'Ecuador',
  'Chile', 'Peru', 'Paraguay', 'Serbia', 'Switzerland', 'Denmark', 'Poland',
  'Austria', 'Wales', 'Scotland', 'Ukraine', 'Czech Republic', 'Turkey', 'Egypt',
  'Algeria', 'Costa Rica', 'Panama', 'Jamaica', 'New Zealand',
];
const wc26Venues = [
  'MetLife Stadium', 'SoFi Stadium', 'AT&T Stadium', 'Hard Rock Stadium',
  'Gillette Stadium', 'Lincoln Financial Field', 'Mercedes-Benz Stadium',
  'NRG Stadium', 'Levi\'s Stadium', 'Arrowhead Stadium', 'Estadio Azteca',
  'Estadio BBVA', 'BC Place', 'BMO Field', 'Lincoln Financial Field',
  'Rose Bowl',
];

const wcBase = '/events/wc-26';

const layer6 = [
  // Group keywords
  ...wc26Groups.map((g) =>
    kw(`world cup 2026 group ${g}`, `${wcBase}/groups`, `World Cup 2026 Group ${g}`, `FIFA World Cup 2026 Group ${g} — teams, fixtures, standings and predictions.`, 'wc-2026', 'football', 'high')
  ),
  // Team keywords (x3 per team)
  ...wc26Teams.flatMap((team) => {
    const slug = slugify(team);
    return [
      kw(`${team} world cup 2026`, `${wcBase}/teams/${slug}`, `${team} at World Cup 2026`, `${team}'s World Cup 2026 campaign — squad, group, fixtures and key players.`, 'wc-2026', 'football', 'high'),
      kw(`${team} world cup 2026 squad`, `${wcBase}/teams/${slug}`, `${team} World Cup 2026 Squad`, `${team} squad for the FIFA World Cup 2026 — confirmed players and reserves.`, 'wc-2026', 'football', 'medium'),
      kw(`${team} world cup 2026 fixtures`, `${wcBase}/teams/${slug}`, `${team} World Cup 2026 Fixtures`, `${team} match schedule and fixtures for the 2026 World Cup.`, 'wc-2026', 'football', 'medium'),
    ];
  }),
  // Venue keywords
  ...wc26Venues.map((v) =>
    kw(`${v} world cup 2026`, `${wcBase}/venues`, `${v} — World Cup 2026 Venue`, `${v} as a FIFA World Cup 2026 venue — capacity, location and matches hosted.`, 'wc-2026', 'football', 'low')
  ),
  // General WC keywords
  kw('world cup 2026 format', wcBase, 'World Cup 2026 Format Explained', 'FIFA World Cup 2026 format: 48 teams, 104 matches, 12 groups. How it works.', 'wc-2026', 'football', 'high'),
  kw('world cup 2026 rules', wcBase, 'World Cup 2026 Rules', 'Official rules for the FIFA World Cup 2026 including new rule changes.', 'wc-2026', 'football', 'high'),
  kw('world cup 2026 new rules', wcBase, 'World Cup 2026 New Rules', 'All the new rules for the 2026 World Cup — VAR updates, extra time changes and more.', 'wc-2026', 'football', 'medium'),
  kw('world cup 2026 tickets', `${wcBase}/tickets`, 'World Cup 2026 Tickets', 'How to buy FIFA World Cup 2026 tickets — prices, ballot and availability.', 'wc-2026', 'football', 'high'),
  kw('world cup 2026 schedule', `${wcBase}/schedule`, 'World Cup 2026 Schedule', 'Complete FIFA World Cup 2026 schedule — every match, date, time and venue.', 'wc-2026', 'football', 'high'),
  kw('world cup 2026 ball', wcBase, 'World Cup 2026 Ball', 'The official adidas match ball for the FIFA World Cup 2026.', 'wc-2026', 'football', 'medium'),
  kw('world cup 2026 debutants', wcBase, 'World Cup 2026 Debutants', 'First-time World Cup teams at the 2026 tournament — who qualified for the first time?', 'wc-2026', 'football', 'low'),
  kw('world cup 2026 opening match', `${wcBase}/schedule`, 'World Cup 2026 Opening Match', 'World Cup 2026 opening match — teams, venue, date and kickoff time.', 'wc-2026', 'football', 'medium'),
  kw('world cup 2026 final', `${wcBase}/schedule`, 'World Cup 2026 Final', 'FIFA World Cup 2026 final — venue, date, teams and how to watch.', 'wc-2026', 'football', 'high'),
  kw('world cup 2026 venues', `${wcBase}/venues`, 'World Cup 2026 Venues & Stadiums', 'All 16 FIFA World Cup 2026 venues across USA, Mexico and Canada.', 'wc-2026', 'football', 'high'),
  kw('world cup 2026 host cities', `${wcBase}/venues`, 'World Cup 2026 Host Cities', 'The 16 host cities for the FIFA World Cup 2026.', 'wc-2026', 'football', 'medium'),
  kw('world cup 2026 predictions', wcBase, 'World Cup 2026 Predictions', 'Who will win the 2026 World Cup? Predictions, favourites and dark horses.', 'wc-2026', 'football', 'medium'),
  kw('world cup 2026 groups draw', `${wcBase}/groups`, 'World Cup 2026 Groups Draw', 'FIFA World Cup 2026 group stage draw — all 12 groups revealed.', 'wc-2026', 'football', 'high'),
  kw('world cup 2026 knockout format', wcBase, 'World Cup 2026 Knockout Format', 'How the 48-team World Cup 2026 knockout rounds work.', 'wc-2026', 'football', 'medium'),
  kw('48 team world cup format', wcBase, '48-Team World Cup Format Explained', 'How the expanded 48-team FIFA World Cup 2026 format works.', 'wc-2026', 'football', 'high'),
  kw('world cup 2026 USA venues', `${wcBase}/venues`, 'World Cup 2026 USA Venues', 'All USA venues for the 2026 World Cup — stadiums, cities and capacity.', 'wc-2026', 'football', 'medium'),
  kw('world cup 2026 Mexico venues', `${wcBase}/venues`, 'World Cup 2026 Mexico Venues', 'Mexico venues for the 2026 World Cup — Estadio Azteca and more.', 'wc-2026', 'football', 'medium'),
  kw('world cup 2026 Canada venues', `${wcBase}/venues`, 'World Cup 2026 Canada Venues', 'Canada venues for the 2026 World Cup — Toronto and Vancouver.', 'wc-2026', 'football', 'medium'),
  kw('world cup 2026 qualified teams', wcBase, 'World Cup 2026 Qualified Teams', 'Full list of all 48 qualified teams for the FIFA World Cup 2026.', 'wc-2026', 'football', 'high'),
];

// ===========================================================================
// Layer 7 — Olympics 2028 (150+ keywords)
// ===========================================================================
const olympicSports = sports.filter((s) => s.oly);
const newOlympicSports = ['cricket', 'flag-football', 'lacrosse', 'squash', 'baseball'];
const olyBase = '/events/olympics-28';

const layer7 = [
  kw('LA Olympics 2028', olyBase, 'LA Olympics 2028 — Complete Guide', 'Everything about the 2028 Los Angeles Olympics — sports, schedule, venues and tickets.', 'olympics-2028', null, 'high'),
  kw('2028 Olympics sports list', olyBase, '2028 Olympics Sports List', 'Full list of all 35 sports at the LA 2028 Olympics.', 'olympics-2028', null, 'high'),
  kw('2028 Olympics schedule', `${olyBase}/schedule`, '2028 Olympics Schedule', 'Complete LA 2028 Olympics schedule — every sport, date and session.', 'olympics-2028', null, 'high'),
  kw('2028 Olympics venues', `${olyBase}/venues`, '2028 Olympics Venues', 'All venues for the LA 2028 Olympics — locations, capacity and sports hosted.', 'olympics-2028', null, 'medium'),
  kw('2028 Olympics tickets', `${olyBase}/tickets`, '2028 Olympics Tickets', 'How to buy LA 2028 Olympics tickets — prices, lottery and availability.', 'olympics-2028', null, 'high'),
  kw('2028 Olympics new sports', olyBase, '2028 Olympics New Sports', 'New sports at the LA 2028 Olympics — cricket, flag football, lacrosse, squash and baseball.', 'olympics-2028', null, 'high'),
  kw('2028 Olympics medal count predictions', olyBase, '2028 Olympics Medal Predictions', 'Predicted medal count for the LA 2028 Olympics by country.', 'olympics-2028', null, 'medium'),
  kw('2028 Olympics opening ceremony', olyBase, '2028 Olympics Opening Ceremony', 'LA 2028 Olympics opening ceremony — date, venue, performers and how to watch.', 'olympics-2028', null, 'medium'),
  kw('2028 Olympics closing ceremony', olyBase, '2028 Olympics Closing Ceremony', 'LA 2028 Olympics closing ceremony details.', 'olympics-2028', null, 'low'),
  kw('2028 Olympics mascot', olyBase, '2028 Olympics Mascot', 'The official mascot for the LA 2028 Olympic Games.', 'olympics-2028', null, 'low'),
  // New sports deep-dive (5 per new sport)
  ...newOlympicSports.flatMap((sid) => {
    const name = sportNameMap[sid] || sid;
    return [
      kw(`${name} at 2028 Olympics`, `${olyBase}/${sid}`, `${name} at the 2028 Olympics`, `${name} at the LA 2028 Olympics — format, rules, schedule and medal events.`, 'olympics-2028', sid, 'high'),
      kw(`${name} Olympic rules 2028`, `${olyBase}/${sid}`, `${name} Olympic Rules 2028`, `Official ${name} rules for the 2028 Olympics. Format and scoring explained.`, 'olympics-2028', sid, 'medium'),
      kw(`${name} 2028 Olympics schedule`, `${olyBase}/${sid}`, `${name} 2028 Olympics Schedule`, `${name} schedule at the LA 2028 Olympics — dates, sessions and venues.`, 'olympics-2028', sid, 'medium'),
      kw(`${name} 2028 Olympics teams`, `${olyBase}/${sid}`, `${name} 2028 Olympics Teams`, `Qualified teams and athletes for ${name} at the LA 2028 Olympics.`, 'olympics-2028', sid, 'medium'),
      kw(`${name} 2028 Olympics venue`, `${olyBase}/${sid}`, `${name} 2028 Olympics Venue`, `Where ${name} will be played at the LA 2028 Olympics.`, 'olympics-2028', sid, 'low'),
    ];
  }),
  // Each Olympic sport rules (35+)
  ...olympicSports.map((s) =>
    kw(`${s.n} Olympic rules`, `${olyBase}/${s.id}`, `${s.n} Olympic Rules`, `${s.n} rules at the Olympics — format, scoring and medal events explained.`, 'olympics-2028', s.id, 'medium')
  ),
  // Additional general Olympic keywords
  ...olympicSports.map((s) =>
    kw(`${s.n} at the Olympics`, `${olyBase}/${s.id}`, `${s.n} at the Olympics`, `The history and rules of ${s.n} at the Olympic Games.`, 'olympics-2028', s.id, 'low')
  ),
];

// ===========================================================================
// Layer 8 — Positions (3 per position)
// ===========================================================================
const layer8 = Object.entries(positions).flatMap(([sportId, sportData]) => {
  const sportName = sportNameMap[sportId] || sportId;
  return sportData.list.flatMap((pos) => {
    const posSlug = slugify(pos.n);
    const url = `/sports/${sportId}/positions#${posSlug}`;
    return [
      kw(`best ${pos.n.toLowerCase()} in ${sportName} history`, url, `Best ${pos.n}s in ${sportName} History`, `The greatest ${pos.n}s in ${sportName} history — legends, stats and records.`, 'positions', sportId, 'medium'),
      kw(`what does a ${pos.n.toLowerCase()} do in ${sportName}`, url, `What Does a ${pos.n} Do in ${sportName}?`, `The ${pos.n} role in ${sportName} explained — responsibilities, skills and positioning.`, 'positions', sportId, 'medium'),
      kw(`${pos.n.toLowerCase()} rules in ${sportName}`, url, `${pos.n} Rules in ${sportName}`, `Rules specific to the ${pos.n} position in ${sportName}.`, 'positions', sportId, 'low'),
    ];
  });
});

// ===========================================================================
// Layer 9 — Player keywords
// ===========================================================================
const layer9 = sports.flatMap((s) => {
  const playerKws = [];
  if (s.p && Array.isArray(s.p)) {
    s.p.forEach((player) => {
      const playerSlug = slugify(player.nm);
      playerKws.push(
        kw(`${player.nm} stats`, `/players/${playerSlug}`, `${player.nm} Stats & Records`, `${player.nm} career stats, records and achievements in ${s.n}.`, 'players', s.id, 'medium'),
        kw(`${player.nm} records`, `/players/${playerSlug}`, `${player.nm} Records`, `All records held by ${player.nm} in ${s.n}.`, 'players', s.id, 'low'),
      );
    });
  }
  playerKws.push(
    kw(`best ${s.n} players of all time`, `/sports/${s.id}/players`, `Best ${s.n} Players of All Time`, `The greatest ${s.n} players ever — ranked with stats, records and career highlights.`, 'players', s.id, 'high'),
  );
  return playerKws;
});

// ===========================================================================
// Layer 10 — Quiz / interactive
// ===========================================================================
const layer10 = [
  kw('sports rules quiz', '/quiz', 'Sports Rules Quiz', 'Test your knowledge of sports rules with our interactive quiz.', 'quiz', null, 'high'),
  kw('sports trivia questions', '/quiz', 'Sports Trivia Questions', 'Sports trivia questions and answers — test your knowledge.', 'quiz', null, 'high'),
  kw('sports rules trivia', '/quiz', 'Sports Rules Trivia', 'Fun sports rules trivia — how well do you really know the rules?', 'quiz', null, 'medium'),
  ...sports.flatMap((s) => [
    kw(`${s.n} rules quiz`, `/quiz/${s.id}`, `${s.n} Rules Quiz`, `Test your ${s.n} rules knowledge with our interactive quiz.`, 'quiz', s.id, 'medium'),
    kw(`test your ${s.n} knowledge`, `/quiz/${s.id}`, `Test Your ${s.n} Knowledge`, `How well do you know ${s.n}? Take the quiz and find out.`, 'quiz', s.id, 'low'),
  ]),
];

// ===========================================================================
// Combine all layers
// ===========================================================================
// ===========================================================================
// Layer 11 — pSEO Learn pages (10 intents × key topics per sport)
// ===========================================================================
const pseoIntents = ['what-is', 'how-to', 'rules-for', 'explained', 'examples-of', 'history-of', 'why', 'penalty-for', 'advanced-guide', 'beginners-guide'];
const layer11 = sports.flatMap((s) => {
  const n = s.n;
  const topics = [];
  // From rules: extract first word/phrase as topic
  (s.r || []).forEach((rule) => {
    const clean = rule.replace(/\u2696\uFE0F\s*/g, '').trim();
    const title = (clean.split(':')[0] || clean.split('—')[0] || '').trim().slice(0, 50);
    if (title.length > 2) topics.push(title);
  });
  // From equipment
  (s.eq || []).forEach(eq => {
    const name = eq.split('(')[0].trim();
    if (name.length > 2) topics.push(name);
  });
  // From tactics
  (s.tac || []).forEach(tac => {
    const title = tac.split('—')[0].trim().slice(0, 50);
    if (title.length > 2) topics.push(title);
  });
  // From FAQ
  (s.faq || []).forEach(([q]) => topics.push(q.slice(0, 50)));

  const kwArr = [];
  const uniqueTopics = [...new Set(topics)].slice(0, 30); // cap at 30 per sport
  uniqueTopics.forEach((topic) => {
    const topicSlug = slugify(topic);
    // Generate 3 key intents per topic (what-is, explained, how-to)
    kwArr.push(kw(`what is ${topic.toLowerCase()} in ${n}`, `/learn/${s.id}/what-is-${topicSlug}`, `What Is ${topic} in ${n}?`, `${topic} in ${n} explained: definition, rules, and real examples.`, 'pseo-learn', s.id, 'medium'));
    kwArr.push(kw(`${topic.toLowerCase()} ${n} explained`, `/learn/${s.id}/explained-${topicSlug}`, `${topic} in ${n} Explained`, `${topic} in ${n} explained simply for beginners and fans.`, 'pseo-learn', s.id, 'medium'));
    kwArr.push(kw(`how does ${topic.toLowerCase()} work in ${n}`, `/learn/${s.id}/how-to-${topicSlug}`, `How ${topic} Works in ${n}`, `How ${topic.toLowerCase()} works in ${n}: step by step.`, 'pseo-learn', s.id, 'low'));
  });
  return kwArr;
});

// ===========================================================================
// Layer 12 — pSEO Scenario pages (can-you, what-happens per sport)
// ===========================================================================
const scenarioTemplates = [
  'score from halfway', 'use hands', 'substitute during play', 'challenge a decision',
  'score directly from a throw-in', 'pass back to keeper', 'score an own goal',
  'play with fewer players', 'wear any number', 'get a red card for diving',
  'be offside from a goal kick', 'take a quick free kick', 'delay the game',
  'appeal after the next ball', 'run on a wide ball', 'retire hurt',
  'hit the ball twice', 'obstruct the fielder', 'bowl underarm',
  'serve from anywhere', 'challenge with no challenges left',
];
const layer12 = sports.flatMap((s) => {
  return scenarioTemplates.slice(0, 10).map(scenario => {
    const scenarioSlug = slugify(scenario);
    return kw(`can you ${scenario} in ${s.n}`, `/scenario/${s.id}/can-you-${scenarioSlug}`, `Can You ${scenario.charAt(0).toUpperCase() + scenario.slice(1)} in ${s.n}?`, `Can you ${scenario} in ${s.n}? Rules, penalties and edge cases explained.`, 'pseo-scenario', s.id, 'low');
  });
});

// ===========================================================================
// Layer 13 — pSEO Guide pages (audience-specific per sport)
// ===========================================================================
const audiences = ['kids', 'beginners', 'coaches', 'parents', 'referees'];
const layer13 = sports.flatMap((s) => {
  return audiences.map(aud => {
    return kw(`${s.n} rules for ${aud}`, `/guide/${s.id}/${s.id}-rules-for-${aud}`, `${s.n} Rules for ${aud.charAt(0).toUpperCase() + aud.slice(1)}`, `${s.n} rules explained specifically for ${aud}. Simplified and practical.`, 'pseo-guide', s.id, 'low');
  });
});

export const allKeywords = [
  ...layer1,
  ...layer2,
  ...layer3,
  ...layer4,
  ...layer5,
  ...layer6,
  ...layer7,
  ...layer8,
  ...layer9,
  ...layer10,
  ...layer11,
  ...layer12,
  ...layer13,
];

// ---------------------------------------------------------------------------
// Grouped by cluster
// ---------------------------------------------------------------------------
export const keywordsByCluster = allKeywords.reduce((acc, kw) => {
  if (!acc[kw.cluster]) acc[kw.cluster] = [];
  acc[kw.cluster].push(kw);
  return acc;
}, {});

// ---------------------------------------------------------------------------
// Helper — get all keywords for a specific sport
// ---------------------------------------------------------------------------
export const keywordsForSport = (sportId) =>
  allKeywords.filter((kw) => kw.sportId === sportId);

// ---------------------------------------------------------------------------
// Total count
// ---------------------------------------------------------------------------
export const keywordCount = allKeywords.length;

export default allKeywords;
