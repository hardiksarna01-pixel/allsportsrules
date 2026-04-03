#!/usr/bin/env node
/**
 * fetchRankings.js — Build-time script for fetching sports rankings
 *
 * Official ranking sources:
 *   1. ICC Cricket Rankings      — https://www.icc-cricket.com/rankings/mens/team-rankings/test
 *   2. FIFA World Rankings       — https://www.fifa.com/fifa-world-ranking
 *   3. ATP Tennis Rankings       — https://www.atptour.com/en/rankings/singles
 *   4. NBA Standings / MVP       — https://www.nba.com/standings
 *   5. F1 Driver Standings       — https://www.formula1.com/en/results/2026/drivers
 *
 * Firecrawl JSON extraction schemas (ready-to-enable):
 *   Each source defines a schema that Firecrawl's `extract` mode can use.
 *
 * Usage:
 *   node src/scripts/fetchRankings.js           # outputs mock data
 *   FIRECRAWL_API_KEY=fc-xxx node src/scripts/fetchRankings.js --live   # enables live scraping
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ---------------------------------------------------------------------------
// Source definitions with Firecrawl schemas
// ---------------------------------------------------------------------------
const SOURCES = [
  {
    id: 'icc',
    sport: 'Cricket',
    icon: '\u{1F3CF}',
    source: 'ICC Rankings',
    color: '#16a34a',
    url: 'https://www.icc-cricket.com/rankings/mens/team-rankings/test',
    schema: {
      type: 'object',
      properties: {
        teams: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              rank: { type: 'number' },
              name: { type: 'string' },
              pts: { type: 'number' },
            },
          },
        },
      },
    },
  },
  {
    id: 'fifa',
    sport: 'Football',
    icon: '\u26BD',
    source: 'FIFA Rankings',
    color: '#2563eb',
    url: 'https://www.fifa.com/fifa-world-ranking',
    schema: {
      type: 'object',
      properties: {
        teams: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              rank: { type: 'number' },
              name: { type: 'string' },
              pts: { type: 'number' },
            },
          },
        },
      },
    },
  },
  {
    id: 'atp',
    sport: 'Tennis',
    icon: '\u{1F3BE}',
    source: 'ATP / WTA Rankings',
    color: '#ca8a04',
    url: 'https://www.atptour.com/en/rankings/singles',
    schema: {
      type: 'object',
      properties: {
        players: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              rank: { type: 'number' },
              name: { type: 'string' },
              pts: { type: 'number' },
            },
          },
        },
      },
    },
  },
  {
    id: 'nba',
    sport: 'Basketball',
    icon: '\u{1F3C0}',
    source: 'FIBA Rankings',
    color: '#ea580c',
    url: 'https://www.nba.com/standings',
    schema: {
      type: 'object',
      properties: {
        teams: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              rank: { type: 'number' },
              name: { type: 'string' },
              pts: { type: 'number' },
            },
          },
        },
      },
    },
  },
  {
    id: 'f1',
    sport: 'Formula 1',
    icon: '\u{1F3C1}',
    source: 'F1 Driver Standings',
    color: '#dc2626',
    url: 'https://www.formula1.com/en/results/2026/drivers',
    schema: {
      type: 'object',
      properties: {
        drivers: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              rank: { type: 'number' },
              name: { type: 'string' },
              pts: { type: 'number' },
              team: { type: 'string' },
            },
          },
        },
      },
    },
  },
];

// ---------------------------------------------------------------------------
// Firecrawl live scraping (commented out — enable by uncommenting)
// ---------------------------------------------------------------------------
/*
async function fetchLiveRankings() {
  const { default: FirecrawlApp } = await import('@mendable/firecrawl-js');
  const firecrawl = new FirecrawlApp({ apiKey: process.env.FIRECRAWL_API_KEY });

  const results = [];
  for (const src of SOURCES) {
    console.log(`[Firecrawl] Scraping ${src.sport} from ${src.url} ...`);
    try {
      const response = await firecrawl.scrapeUrl(src.url, {
        formats: ['extract'],
        extract: { schema: src.schema },
      });
      results.push({
        sport: src.sport,
        icon: src.icon,
        source: src.source,
        color: src.color,
        ...response.extract,
      });
      console.log(`[Firecrawl] OK — ${src.sport}`);
    } catch (err) {
      console.error(`[Firecrawl] FAIL — ${src.sport}:`, err.message);
    }
  }
  return results;
}
*/

// ---------------------------------------------------------------------------
// Mock data generator — outputs valid rankings.js format for testing
// ---------------------------------------------------------------------------
function generateMockRankings() {
  const FLAGS = {
    India: '\u{1F1EE}\u{1F1F3}', Australia: '\u{1F1E6}\u{1F1FA}', England: '\u{1F1EC}\u{1F1E7}',
    'South Africa': '\u{1F1FF}\u{1F1E6}', 'New Zealand': '\u{1F1F3}\u{1F1FF}',
    Argentina: '\u{1F1E6}\u{1F1F7}', France: '\u{1F1EB}\u{1F1F7}', Brazil: '\u{1F1E7}\u{1F1F7}',
    Belgium: '\u{1F1E7}\u{1F1EA}', USA: '\u{1F1FA}\u{1F1F8}', Spain: '\u{1F1EA}\u{1F1F8}',
    Germany: '\u{1F1E9}\u{1F1EA}', Serbia: '\u{1F1F7}\u{1F1F8}', Ireland: '\u{1F1EE}\u{1F1EA}',
    Italy: '\u{1F1EE}\u{1F1F9}', Norway: '\u{1F1F3}\u{1F1F4}', Russia: '\u{1F1F7}\u{1F1FA}',
    Pakistan: '\u{1F1F5}\u{1F1F0}',
  };
  const pick = (n) => ['up', 'down', 'same'][Math.floor(Math.random() * 3)] || 'same';

  return [
    {
      sport: 'Cricket', icon: '\u{1F3CF}', source: 'ICC Rankings', color: '#16a34a',
      teams: [
        { rank: 1, name: 'India', flag: FLAGS.India, pts: 121, change: pick() },
        { rank: 2, name: 'Australia', flag: FLAGS.Australia, pts: 116, change: pick() },
        { rank: 3, name: 'England', flag: FLAGS.England, pts: 111, change: pick() },
        { rank: 4, name: 'South Africa', flag: FLAGS['South Africa'], pts: 108, change: pick() },
        { rank: 5, name: 'New Zealand', flag: FLAGS['New Zealand'], pts: 105, change: pick() },
      ],
      players: [
        { rank: 1, name: 'Joe Root', flag: FLAGS.England, pts: 897, change: pick() },
        { rank: 2, name: 'Kane Williamson', flag: FLAGS['New Zealand'], pts: 883, change: pick() },
        { rank: 3, name: 'Marnus Labuschagne', flag: FLAGS.Australia, pts: 878, change: pick() },
        { rank: 4, name: 'Babar Azam', flag: FLAGS.Pakistan, pts: 860, change: pick() },
        { rank: 5, name: 'Steve Smith', flag: FLAGS.Australia, pts: 845, change: pick() },
      ],
      bowlers: [
        { rank: 1, name: 'Jasprit Bumrah', flag: FLAGS.India, pts: 904, change: pick() },
        { rank: 2, name: 'Pat Cummins', flag: FLAGS.Australia, pts: 883, change: pick() },
        { rank: 3, name: 'Kagiso Rabada', flag: FLAGS['South Africa'], pts: 845, change: pick() },
        { rank: 4, name: 'Ravichandran Ashwin', flag: FLAGS.India, pts: 832, change: pick() },
        { rank: 5, name: 'Josh Hazlewood', flag: FLAGS.Australia, pts: 815, change: pick() },
      ],
    },
    {
      sport: 'Football', icon: '\u26BD', source: 'FIFA Rankings', color: '#2563eb',
      teams: [
        { rank: 1, name: 'Argentina', flag: FLAGS.Argentina, pts: 1867, change: pick() },
        { rank: 2, name: 'France', flag: FLAGS.France, pts: 1859, change: pick() },
        { rank: 3, name: 'Brazil', flag: FLAGS.Brazil, pts: 1840, change: pick() },
        { rank: 4, name: 'England', flag: FLAGS.England, pts: 1792, change: pick() },
        { rank: 5, name: 'Belgium', flag: FLAGS.Belgium, pts: 1781, change: pick() },
      ],
      players: [
        { rank: 1, name: 'Lionel Messi', flag: FLAGS.Argentina, pts: 93, change: pick() },
        { rank: 2, name: 'Erling Haaland', flag: FLAGS.Norway, pts: 91, change: pick() },
        { rank: 3, name: 'Kylian Mbappe', flag: FLAGS.France, pts: 90, change: pick() },
        { rank: 4, name: 'Vinicius Jr', flag: FLAGS.Brazil, pts: 89, change: pick() },
        { rank: 5, name: 'Jude Bellingham', flag: FLAGS.England, pts: 88, change: pick() },
      ],
    },
    {
      sport: 'Tennis', icon: '\u{1F3BE}', source: 'ATP / WTA Rankings', color: '#ca8a04',
      players: [
        { rank: 1, name: 'Jannik Sinner', flag: FLAGS.Italy, pts: 11830, change: pick() },
        { rank: 2, name: 'Carlos Alcaraz', flag: FLAGS.Spain, pts: 9255, change: pick() },
        { rank: 3, name: 'Alexander Zverev', flag: FLAGS.Germany, pts: 7465, change: pick() },
        { rank: 4, name: 'Novak Djokovic', flag: FLAGS.Serbia, pts: 6540, change: pick() },
        { rank: 5, name: 'Daniil Medvedev', flag: FLAGS.Russia, pts: 5790, change: pick() },
      ],
    },
    {
      sport: 'Basketball', icon: '\u{1F3C0}', source: 'FIBA Rankings', color: '#ea580c',
      teams: [
        { rank: 1, name: 'USA', flag: FLAGS.USA, pts: 857, change: pick() },
        { rank: 2, name: 'Spain', flag: FLAGS.Spain, pts: 753, change: pick() },
        { rank: 3, name: 'Germany', flag: FLAGS.Germany, pts: 741, change: pick() },
        { rank: 4, name: 'France', flag: FLAGS.France, pts: 725, change: pick() },
        { rank: 5, name: 'Serbia', flag: FLAGS.Serbia, pts: 711, change: pick() },
      ],
    },
    {
      sport: 'Rugby', icon: '\u{1F3C9}', source: 'World Rugby Rankings', color: '#7c3aed',
      teams: [
        { rank: 1, name: 'South Africa', flag: FLAGS['South Africa'], pts: 92.78, change: pick() },
        { rank: 2, name: 'Ireland', flag: FLAGS.Ireland, pts: 90.78, change: pick() },
        { rank: 3, name: 'New Zealand', flag: FLAGS['New Zealand'], pts: 88.38, change: pick() },
        { rank: 4, name: 'France', flag: FLAGS.France, pts: 86.29, change: pick() },
        { rank: 5, name: 'England', flag: FLAGS.England, pts: 83.96, change: pick() },
      ],
    },
  ];
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------
async function main() {
  const isLive = process.argv.includes('--live') && process.env.FIRECRAWL_API_KEY;

  if (isLive) {
    console.log('=== LIVE MODE ===');
    console.log('To enable live scraping:');
    console.log('  1. npm install @mendable/firecrawl-js');
    console.log('  2. Uncomment the fetchLiveRankings() function above');
    console.log('  3. Run: FIRECRAWL_API_KEY=fc-xxx node src/scripts/fetchRankings.js --live');
    console.log('');
    console.log('Falling back to mock data for now...');
  }

  console.log('[fetchRankings] Generating rankings data...');
  const rankings = generateMockRankings();

  const output = `export const rankings = ${JSON.stringify(rankings, null, 2)};\n\nexport default rankings;\n`;
  const outPath = path.resolve(__dirname, '../data/rankings.js');
  fs.writeFileSync(outPath, output, 'utf-8');
  console.log(`[fetchRankings] Wrote ${outPath} (${rankings.length} sports)`);
}

main().catch((err) => {
  console.error('[fetchRankings] Fatal:', err);
  process.exit(1);
});
