#!/usr/bin/env node
/**
 * buildKnowledgeBase.js — Build-time script that creates a FAQ/rules answer cache
 *
 * The cost saver: pre-caches answers to common sports questions so the app
 * can respond instantly without hitting Claude API for known queries.
 *
 * Official FAQ / rules URLs to scrape (10+):
 *   1.  ICC Playing Conditions          — https://www.icc-cricket.com/about/cricket/rules-and-regulations
 *   2.  FIFA Laws of the Game           — https://www.theifab.com/laws-of-the-game
 *   3.  NBA Official Rules              — https://official.nba.com/rulebook
 *   4.  ATP Official Rules              — https://www.atptour.com/en/corporate/rulebook
 *   5.  NFL Rulebook                    — https://operations.nfl.com/the-rules/nfl-rules-digest
 *   6.  F1 Sporting Regulations         — https://www.fia.com/regulation/category/110
 *   7.  World Rugby Laws                — https://www.world.rugby/the-game/laws/law
 *   8.  MLB Official Rules              — https://www.mlb.com/official-rules
 *   9.  UFC Unified Rules               — https://www.ufc.com/unified-rules-mma
 *  10.  USAPA Pickleball Rules          — https://usapickleball.org/what-is-pickleball/official-rules
 *  11.  R&A / USGA Golf Rules           — https://www.randa.org/en/rules-of-golf
 *  12.  World Athletics Competition Rules — https://www.worldathletics.org/about-iaaf/documents/rules-regulations
 *
 * Output: src/data/knowledgeBase.js
 *   export const knowledgeBase = { "what is lbw": "...", ... };
 *
 * Usage:
 *   node src/scripts/buildKnowledgeBase.js
 *   FIRECRAWL_API_KEY=fc-xxx node src/scripts/buildKnowledgeBase.js --live
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ---------------------------------------------------------------------------
// Firecrawl FAQ scraping (commented out — enable by uncommenting)
// ---------------------------------------------------------------------------
/*
const FAQ_URLS = [
  'https://www.icc-cricket.com/about/cricket/rules-and-regulations',
  'https://www.theifab.com/laws-of-the-game',
  'https://official.nba.com/rulebook',
  'https://www.atptour.com/en/corporate/rulebook',
  'https://operations.nfl.com/the-rules/nfl-rules-digest',
  'https://www.fia.com/regulation/category/110',
  'https://www.world.rugby/the-game/laws/law',
  'https://www.mlb.com/official-rules',
  'https://www.ufc.com/unified-rules-mma',
  'https://usapickleball.org/what-is-pickleball/official-rules',
  'https://www.randa.org/en/rules-of-golf',
  'https://www.worldathletics.org/about-iaaf/documents/rules-regulations',
];

const FAQ_SCHEMA = {
  type: 'object',
  properties: {
    faqs: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          question: { type: 'string' },
          answer: { type: 'string' },
        },
      },
    },
  },
};

async function fetchLiveKnowledgeBase() {
  const { default: FirecrawlApp } = await import('@mendable/firecrawl-js');
  const firecrawl = new FirecrawlApp({ apiKey: process.env.FIRECRAWL_API_KEY });

  const kb = {};
  for (const url of FAQ_URLS) {
    console.log(`[Firecrawl] Scraping FAQ from ${url} ...`);
    try {
      const response = await firecrawl.scrapeUrl(url, {
        formats: ['extract'],
        extract: { schema: FAQ_SCHEMA },
      });
      const faqs = response.extract.faqs || [];
      faqs.forEach((faq) => {
        const key = faq.question.toLowerCase().replace(/[^a-z0-9 ]/g, '').trim();
        kb[key] = faq.answer;
      });
      console.log(`[Firecrawl] OK — ${url} (${faqs.length} FAQs)`);
    } catch (err) {
      console.error(`[Firecrawl] FAIL — ${url}:`, err.message);
    }
  }
  return kb;
}
*/

// ---------------------------------------------------------------------------
// Pre-seeded FAQ answers (50+ entries derived from our existing data)
// ---------------------------------------------------------------------------
function getPreseededKnowledgeBase() {
  return {
    // --- Cricket ---
    "what is lbw": "LBW (Leg Before Wicket) means the batter is out if the ball would have hit the stumps but was intercepted by their body (usually the leg). The ball must pitch in line or outside off stump, hit the pad in line with the stumps, and be going on to hit the stumps. Under DRS, more than 50% of the ball must be hitting the stumps to overturn.",
    "what is drs in cricket": "DRS (Decision Review System) is a technology-based system used to review on-field umpire decisions. It uses Hawk-Eye (ball-tracking), UltraEdge (sound detection), and Hot Spot (thermal imaging). Each team gets 2 reviews per innings in Tests/ODIs and 1 in T20s.",
    "what is a powerplay in cricket": "In ODI cricket, the Powerplay restricts fielding placements: overs 1-10 allow max 2 fielders outside the 30-yard circle, overs 11-40 max 4, and overs 41-50 max 5. In T20, overs 1-6 allow max 2 outside, and overs 7-20 allow max 5.",
    "what is a no ball in cricket": "A no-ball occurs when the bowler's front foot lands beyond the popping crease, or the delivery is a bouncer above shoulder height, or a full toss above waist height. It awards 1 extra run and the ball must be re-bowled. In limited-overs, the next delivery is a free hit.",
    "what is a free hit in cricket": "After a no-ball in ODIs and T20s, the next delivery is a free hit — the batter can only be dismissed by run out, hit wicket, or obstructing the field. They cannot be bowled, caught, LBW, or stumped.",
    "what is dls method": "The Duckworth-Lewis-Stern (DLS) method adjusts the target score in rain-affected limited-overs matches. It calculates a revised target based on the resources (overs and wickets) remaining for each team.",
    "what is a yorker": "A yorker is a delivery pitched right at the batsman's feet, making it extremely difficult to hit. It is especially effective during death overs in limited-overs cricket.",
    "what is a googly": "A googly is a leg-spin delivery that turns the opposite way — from off to leg for a right-handed batter — deceiving the batter who expects it to turn the other direction.",
    "what is a century in cricket": "A century is when a batsman scores 100 or more runs in a single innings. It is considered a major milestone in cricket.",
    "what is a hat trick in cricket": "A hat-trick in cricket occurs when a bowler takes three wickets on three consecutive deliveries.",
    "what is a wide ball": "A wide ball is called when the ball is too wide or too high for the batter to play a normal cricket stroke. It awards 1 extra run and the ball must be re-bowled.",
    "how many players in a cricket team": "A cricket team has 11 players. Two on-field umpires officiate the match, with a 3rd umpire handling TV replays and DRS reviews.",
    "what is follow on in cricket": "The follow-on can be enforced by the team batting first if they lead by 200 runs (in a 5-day Test match). The trailing team must bat again immediately instead of the leading team batting their second innings.",
    "what is the pitch size in cricket": "The cricket pitch is a rectangular area 22 yards (20.12m) long and 10 feet (3.05m) wide, with wickets at each end consisting of 3 stumps that are 28 inches high and 9 inches wide.",

    // --- Football ---
    "what is offside in football": "A player is offside if they are nearer to the opponent's goal line than both the ball and the second-last opponent when the ball is played to them. The offside rule does not apply in the player's own half, from goal kicks, throw-ins, or corner kicks.",
    "what is var in football": "VAR (Video Assistant Referee) is a match official who reviews decisions using video footage to correct clear and obvious errors in four situations: goals, penalty decisions, direct red cards, and mistaken identity.",
    "what is a penalty kick": "A penalty kick is a direct free kick from the penalty spot (12 yards from goal) awarded for a foul committed inside the penalty area by the defending team.",
    "what is a red card": "A red card is shown for a serious foul or violent conduct, resulting in immediate dismissal from the match. The team plays with one fewer player for the remainder of the game.",
    "what is golden goal": "The golden goal was a now-discontinued rule where the first goal scored in extra time immediately won the match (sudden death).",
    "what is tiki taka": "Tiki-taka is a style of play characterised by short passing, movement, and maintaining possession to control the game. It was popularized by Barcelona and the Spanish national team.",
    "how long is a football match": "A standard football match is 90 minutes, split into two 45-minute halves, with added time (stoppage time) at the end of each half. Extra time (2 x 15 minutes) is played in knockout rounds if needed.",

    // --- Tennis ---
    "what is a deuce in tennis": "Deuce is a score of 40-40 in a game. A player must win two consecutive points from deuce (advantage, then game point) to win the game.",
    "what is an ace in tennis": "An ace is a serve that lands in the service box and is not touched by the receiver, winning the point outright.",
    "what is a grand slam in tennis": "A Grand Slam in tennis refers to winning all four major tournaments in a single calendar year: the Australian Open, French Open, Wimbledon, and US Open.",
    "what is a tiebreak in tennis": "A tiebreak is a special game played when the set score reaches 6-6. The first player to reach 7 points with at least a 2-point lead wins the set.",
    "what is a let in tennis": "A let occurs when a serve clips the net but lands in the correct service box. The serve is replayed without penalty.",
    "how does tennis scoring work": "Tennis uses a point system: 0 (love), 15, 30, 40, game. Six games win a set (with 2 clear). Best of 3 sets in most matches, best of 5 in men's Grand Slam singles.",

    // --- Basketball ---
    "what is a double dribble": "A double dribble is a violation where a player dribbles the ball, stops, and then dribbles again, or dribbles with both hands simultaneously. It results in a turnover.",
    "what is a slam dunk": "A slam dunk is a shot where a player jumps and pushes the ball directly through the basket from above the rim.",
    "what is the shot clock in basketball": "The shot clock is a countdown timer (24 seconds in the NBA) that limits how long a team can possess the ball before attempting a shot. Failure results in a turnover.",
    "what is a triple double": "A triple-double means recording double digits (10+) in three of five statistical categories (points, rebounds, assists, steals, blocks) in a single game.",
    "what is pick and roll": "The pick and roll is an offensive play where one player sets a screen (pick) for the ball handler, then cuts toward the basket (roll) to receive a pass.",
    "what is a free throw": "A free throw is an unopposed shot from the free-throw line (15 feet from the basket), worth one point, awarded after certain fouls.",
    "what is a flagrant foul": "A flagrant foul is an unsportsmanlike foul involving excessive or unnecessary contact. It results in free throws and possession for the opposing team.",

    // --- Formula 1 ---
    "what is drs in f1": "DRS (Drag Reduction System) is a rear-wing flap that opens in a designated zone when a trailing car is within 1 second of the car ahead, providing a straight-line speed boost to aid overtaking. Note: Active aero replaces DRS from the 2026 regulations.",
    "what is pole position": "Pole position is the first position on the starting grid, earned by the driver with the fastest qualifying time.",
    "what is a safety car in f1": "The safety car is deployed during dangerous track conditions (crashes, debris). All cars must slow down and line up behind it. No overtaking is allowed until the restart.",
    "what is an undercut in f1": "An undercut is a strategy where a driver pits earlier than their rival to gain track position by running fast laps on fresh tyres while the rival is still on old tyres.",
    "what is a pit stop": "A pit stop is when a car enters the pit lane during a race for tyre changes, repairs, or adjustments. Modern F1 pit stops can be completed in under 2 seconds.",

    // --- NFL ---
    "what is a touchdown": "A touchdown scores 6 points and is achieved by carrying or catching the ball in the opponent's end zone. After a touchdown, the team can attempt an extra point kick (1 point) or a two-point conversion.",
    "what is a sack in football": "A sack occurs when the quarterback is tackled behind the line of scrimmage before they can throw a forward pass.",
    "what is a two point conversion": "After a touchdown, a team can attempt a two-point conversion by running or passing the ball into the end zone from the 2-yard line, scoring 2 points instead of kicking for 1.",
    "what is a blitz": "A blitz is a defensive play where additional defenders (beyond the standard 4 rushers) charge the quarterback to pressure or sack them.",
    "what is a hail mary pass": "A Hail Mary is a long, desperate forward pass thrown toward the end zone in the closing seconds of a half, typically with very low odds of success.",
    "how many quarters in nfl": "An NFL game has 4 quarters of 15 minutes each (game clock), for a total of 60 minutes of regulation play. Overtime is played if the score is tied.",

    // --- Rugby ---
    "what is a try in rugby": "A try is the primary method of scoring in rugby, worth 5 points. It is achieved by grounding the ball in the opponent's in-goal area. A conversion kick (2 points) follows.",
    "what is a scrum in rugby": "A scrum is a contested restart where 8 forwards from each team bind together and push against each other to win the ball, which is fed into the tunnel between them.",
    "what is a lineout": "A lineout is a restart of play after the ball goes into touch (out of bounds). Forwards line up and are lifted by teammates to catch a throw-in from the touchline.",
    "what is a ruck in rugby": "A ruck forms when the ball is on the ground after a tackle. Players from both teams bind over the ball, trying to push the opposition off it and secure possession.",

    // --- Golf ---
    "what is a birdie in golf": "A birdie is completing a hole in one stroke under par (e.g., 3 on a par-4).",
    "what is an eagle in golf": "An eagle is completing a hole in two strokes under par (e.g., 3 on a par-5).",
    "what is a bogey in golf": "A bogey is completing a hole in one stroke over par (e.g., 5 on a par-4).",
    "what is an albatross in golf": "An albatross (also called a double eagle) is completing a hole in three strokes under par — extremely rare (e.g., 2 on a par-5).",
    "what is a handicap in golf": "A golf handicap is a numerical measure of a golfer's ability used to level the playing field between players of different skill levels in competition.",

    // --- MMA / Boxing ---
    "what is a tko": "TKO (Technical Knockout) means the referee stops the fight because a fighter cannot safely continue, even though they have not been fully knocked out.",
    "what is a submission in mma": "A submission is a technique (such as a choke or joint lock) that forces an opponent to tap out (surrender), ending the fight immediately.",
    "what is ground and pound": "Ground and pound is an MMA technique where a fighter takes their opponent to the ground and strikes them with punches or elbows from a dominant top position.",

    // --- Pickleball ---
    "what is the kitchen in pickleball": "The kitchen is the non-volley zone — a 7-foot area on each side of the net where players cannot hit volleys (striking the ball before it bounces).",

    // --- Baseball ---
    "what is era in baseball": "ERA (Earned Run Average) is the average number of earned runs a pitcher allows per nine innings pitched. Lower is better.",
    "what is a home run": "A home run is a hit that allows the batter to circle all four bases and score. It usually happens when the ball is hit over the outfield fence.",
    "what is a strikeout": "A strikeout occurs when a batter accumulates three strikes — either swinging and missing, or watching a called third strike.",

    // --- Judo ---
    "what is ippon in judo": "Ippon is a perfect throw, hold, or submission that scores a full point and immediately wins the judo match.",

    // --- Fencing ---
    "what is a touche in fencing": "A touche is a valid hit on the target area in fencing that scores a point.",
  };
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------
async function main() {
  const isLive = process.argv.includes('--live') && process.env.FIRECRAWL_API_KEY;

  if (isLive) {
    console.log('=== LIVE MODE ===');
    console.log('To enable live FAQ scraping:');
    console.log('  1. npm install @mendable/firecrawl-js');
    console.log('  2. Uncomment fetchLiveKnowledgeBase() above');
    console.log('  3. Run: FIRECRAWL_API_KEY=fc-xxx node src/scripts/buildKnowledgeBase.js --live');
    console.log('');
    console.log('Using pre-seeded data...');
  }

  console.log('[buildKnowledgeBase] Building knowledge base...');
  const kb = getPreseededKnowledgeBase();

  const keys = Object.keys(kb);
  const lines = keys.map((key) => {
    const escaped = kb[key].replace(/\\/g, '\\\\').replace(/"/g, '\\"');
    return `  "${key}": "${escaped}"`;
  });

  const output = `// Auto-generated by buildKnowledgeBase.js — do not edit manually
// ${keys.length} pre-seeded FAQ answers
// Last updated: ${new Date().toISOString()}

export const knowledgeBase = {
${lines.join(',\n')}
};

export default knowledgeBase;
`;

  const outPath = path.resolve(__dirname, '../data/knowledgeBase.js');
  fs.writeFileSync(outPath, output, 'utf-8');
  console.log(`[buildKnowledgeBase] Wrote ${outPath} (${keys.length} entries)`);
}

main().catch((err) => {
  console.error('[buildKnowledgeBase] Fatal:', err);
  process.exit(1);
});
