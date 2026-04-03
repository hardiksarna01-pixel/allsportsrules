#!/usr/bin/env node
/**
 * fetchEvents.js — Build-time script for fetching sports event calendars
 *
 * Official event sources:
 *   1. ICC Cricket Calendar       — https://www.icc-cricket.com/calendar
 *   2. FIFA Match Calendar        — https://www.fifa.com/tournaments
 *   3. ATP Tour Schedule          — https://www.atptour.com/en/tournaments
 *   4. WTA Tour Schedule          — https://www.wtatennis.com/tournaments
 *   5. NBA Schedule               — https://www.nba.com/schedule
 *   6. NFL Schedule               — https://www.nfl.com/schedules
 *   7. F1 Race Calendar           — https://www.formula1.com/en/racing/2026
 *   8. World Rugby Calendar       — https://www.world.rugby/tournaments
 *   9. UFC Event Schedule         — https://www.ufc.com/events
 *  10. MLB Schedule               — https://www.mlb.com/schedule
 *
 * Output schema per event:
 *   { id, n, e, loc, date, end, cat, news, tier }
 *
 * Usage:
 *   node src/scripts/fetchEvents.js              # outputs mock data
 *   FIRECRAWL_API_KEY=fc-xxx node src/scripts/fetchEvents.js --live
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ---------------------------------------------------------------------------
// Source definitions with Firecrawl extraction schemas
// ---------------------------------------------------------------------------
const SOURCES = [
  {
    id: 'icc',
    label: 'ICC Cricket Calendar',
    url: 'https://www.icc-cricket.com/calendar',
    cat: 'cricket',
    emoji: '\u{1F3CF}',
    schema: {
      type: 'object',
      properties: {
        events: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              name: { type: 'string' },
              location: { type: 'string' },
              startDate: { type: 'string' },
              endDate: { type: 'string' },
            },
          },
        },
      },
    },
  },
  {
    id: 'fifa',
    label: 'FIFA Tournaments',
    url: 'https://www.fifa.com/tournaments',
    cat: 'football',
    emoji: '\u26BD',
    schema: {
      type: 'object',
      properties: {
        events: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              name: { type: 'string' },
              location: { type: 'string' },
              startDate: { type: 'string' },
              endDate: { type: 'string' },
            },
          },
        },
      },
    },
  },
  {
    id: 'atp',
    label: 'ATP Tour Schedule',
    url: 'https://www.atptour.com/en/tournaments',
    cat: 'tennis',
    emoji: '\u{1F3BE}',
    schema: {
      type: 'object',
      properties: {
        tournaments: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              name: { type: 'string' },
              location: { type: 'string' },
              startDate: { type: 'string' },
              endDate: { type: 'string' },
              surface: { type: 'string' },
            },
          },
        },
      },
    },
  },
  {
    id: 'wta',
    label: 'WTA Tour Schedule',
    url: 'https://www.wtatennis.com/tournaments',
    cat: 'tennis',
    emoji: '\u{1F3BE}',
    schema: {
      type: 'object',
      properties: {
        tournaments: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              name: { type: 'string' },
              location: { type: 'string' },
              startDate: { type: 'string' },
              endDate: { type: 'string' },
            },
          },
        },
      },
    },
  },
  {
    id: 'nba',
    label: 'NBA Schedule',
    url: 'https://www.nba.com/schedule',
    cat: 'basketball',
    emoji: '\u{1F3C0}',
    schema: {
      type: 'object',
      properties: {
        events: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              name: { type: 'string' },
              date: { type: 'string' },
              location: { type: 'string' },
            },
          },
        },
      },
    },
  },
  {
    id: 'nfl',
    label: 'NFL Schedule',
    url: 'https://www.nfl.com/schedules',
    cat: 'nfl',
    emoji: '\u{1F3C8}',
    schema: {
      type: 'object',
      properties: {
        events: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              name: { type: 'string' },
              date: { type: 'string' },
              location: { type: 'string' },
            },
          },
        },
      },
    },
  },
  {
    id: 'f1',
    label: 'F1 Race Calendar',
    url: 'https://www.formula1.com/en/racing/2026',
    cat: 'f1',
    emoji: '\u{1F3C1}',
    schema: {
      type: 'object',
      properties: {
        races: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              name: { type: 'string' },
              circuit: { type: 'string' },
              date: { type: 'string' },
              country: { type: 'string' },
            },
          },
        },
      },
    },
  },
  {
    id: 'rugby',
    label: 'World Rugby Calendar',
    url: 'https://www.world.rugby/tournaments',
    cat: 'rugby',
    emoji: '\u{1F3C9}',
    schema: {
      type: 'object',
      properties: {
        events: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              name: { type: 'string' },
              location: { type: 'string' },
              startDate: { type: 'string' },
              endDate: { type: 'string' },
            },
          },
        },
      },
    },
  },
  {
    id: 'ufc',
    label: 'UFC Event Schedule',
    url: 'https://www.ufc.com/events',
    cat: 'mma',
    emoji: '\u{1F94A}',
    schema: {
      type: 'object',
      properties: {
        events: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              name: { type: 'string' },
              date: { type: 'string' },
              location: { type: 'string' },
            },
          },
        },
      },
    },
  },
  {
    id: 'mlb',
    label: 'MLB Schedule',
    url: 'https://www.mlb.com/schedule',
    cat: 'baseball',
    emoji: '\u26BE',
    schema: {
      type: 'object',
      properties: {
        events: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              name: { type: 'string' },
              date: { type: 'string' },
              location: { type: 'string' },
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
async function fetchLiveEvents() {
  const { default: FirecrawlApp } = await import('@mendable/firecrawl-js');
  const firecrawl = new FirecrawlApp({ apiKey: process.env.FIRECRAWL_API_KEY });

  const allEvents = [];
  for (const src of SOURCES) {
    console.log(`[Firecrawl] Scraping ${src.label} from ${src.url} ...`);
    try {
      const response = await firecrawl.scrapeUrl(src.url, {
        formats: ['extract'],
        extract: { schema: src.schema },
      });
      const items = response.extract.events || response.extract.tournaments || response.extract.races || [];
      items.forEach((item, i) => {
        allEvents.push({
          id: `${src.id}-${Date.now()}-${i}`,
          n: item.name,
          e: src.emoji,
          loc: item.location || item.circuit || item.country || 'TBD',
          date: item.startDate || item.date,
          end: item.endDate || item.date,
          cat: src.cat,
          news: '',
          tier: 2,
        });
      });
      console.log(`[Firecrawl] OK — ${src.label} (${items.length} events)`);
    } catch (err) {
      console.error(`[Firecrawl] FAIL — ${src.label}:`, err.message);
    }
  }
  return allEvents;
}
*/

// ---------------------------------------------------------------------------
// Mock data generator — valid events.js format
// ---------------------------------------------------------------------------
function generateMockEvents() {
  return [
    // NFL
    { id: 'sb-lx', n: 'Super Bowl LX', e: '\u{1F3C8}', loc: 'Santa Clara, USA', date: '2026-02-08', end: '2026-02-08', cat: 'nfl', news: "Levi's Stadium hosts Super Bowl LX. Record viewership expected as NFL expands international reach.", tier: 1 },

    // Cricket
    { id: 'ipl-26', n: 'IPL 2026', e: '\u{1F3CF}', loc: 'India', date: '2026-03-22', end: '2026-05-25', cat: 'cricket', news: '10 teams, 74 matches. CSK looking for 6th title.', tier: 1 },
    { id: 'wt20wc-26', n: 'ICC T20 World Cup 2026', e: '\u{1F3CF}', loc: 'India & Sri Lanka', date: '2026-02-09', end: '2026-03-07', cat: 'cricket', news: '20 teams compete in the expanded T20 World Cup across India and Sri Lanka.', tier: 1 },
    { id: 'women-t20wc-26', n: "Women's T20 World Cup 2026", e: '\u{1F3CF}', loc: 'Bangladesh', date: '2026-10-01', end: '2026-10-18', cat: 'cricket', news: "Bangladesh hosts the Women's T20 World Cup. Australia favorites to defend their title.", tier: 2 },

    // Football
    { id: 'ucl-final-26', n: 'UEFA Champions League Final 2026', e: '\u26BD', loc: 'Munich, Germany', date: '2026-05-30', end: '2026-05-30', cat: 'football', news: 'Allianz Arena hosts the showpiece final.', tier: 2 },
    { id: 'wc-26', n: 'FIFA World Cup 2026', e: '\u26BD', loc: 'USA, Mexico, Canada', date: '2026-06-11', end: '2026-07-19', cat: 'football', news: 'First 48-team World Cup. 104 matches across 16 cities.', tier: 1 },

    // Tennis
    { id: 'ao-26', n: 'Australian Open 2026', e: '\u{1F3BE}', loc: 'Melbourne, Australia', date: '2026-01-19', end: '2026-02-01', cat: 'tennis', news: 'The first Grand Slam of 2026.', tier: 2 },
    { id: 'rg-26', n: 'French Open 2026', e: '\u{1F3BE}', loc: 'Paris, France', date: '2026-05-24', end: '2026-06-07', cat: 'tennis', news: 'Roland Garros clay court action.', tier: 2 },
    { id: 'wimbledon-26', n: 'Wimbledon 2026', e: '\u{1F3BE}', loc: 'London, UK', date: '2026-06-29', end: '2026-07-12', cat: 'tennis', news: 'The 140th Championships.', tier: 2 },
    { id: 'uso-26', n: 'US Open 2026', e: '\u{1F3BE}', loc: 'New York, USA', date: '2026-08-31', end: '2026-09-13', cat: 'tennis', news: 'The final Grand Slam of 2026.', tier: 2 },

    // Basketball
    { id: 'nba-finals-26', n: 'NBA Finals 2026', e: '\u{1F3C0}', loc: 'USA', date: '2026-06-04', end: '2026-06-21', cat: 'basketball', news: 'The NBA championship series.', tier: 2 },

    // F1
    { id: 'f1-26', n: 'F1 Season 2026', e: '\u{1F3C1}', loc: 'Worldwide', date: '2026-03-15', end: '2026-12-06', cat: 'f1', news: 'New engine regulations. Active aero replaces DRS.', tier: 2 },

    // Cycling
    { id: 'tdf-26', n: 'Tour de France 2026', e: '\u{1F6B4}', loc: 'France', date: '2026-07-04', end: '2026-07-26', cat: 'cycling', news: 'The 113th Tour de France.', tier: 2 },

    // Baseball
    { id: 'mlb-ws-26', n: 'MLB World Series 2026', e: '\u26BE', loc: 'USA', date: '2026-10-20', end: '2026-10-31', cat: 'baseball', news: 'The Fall Classic returns.', tier: 2 },

    // Rugby
    { id: 'rugby-autumn-26', n: 'Rugby Autumn Internationals 2026', e: '\u{1F3C9}', loc: 'UK & Europe', date: '2026-11-07', end: '2026-11-28', cat: 'rugby', news: 'Northern Hemisphere unions host Southern Hemisphere giants.', tier: 3 },

    // UFC/MMA
    { id: 'ufc-300s-26', n: 'UFC 300s Series Events 2026', e: '\u{1F94A}', loc: 'Various, USA', date: '2026-01-17', end: '2026-12-19', cat: 'mma', news: 'Multiple numbered UFC events through 2026.', tier: 3 },

    // 2027 events
    { id: 'sb-lxi', n: 'Super Bowl LXI', e: '\u{1F3C8}', loc: 'Los Angeles, USA', date: '2027-02-14', end: '2027-02-14', cat: 'nfl', news: 'SoFi Stadium hosts the Super Bowl.', tier: 1 },
    { id: 'ipl-27', n: 'IPL 2027', e: '\u{1F3CF}', loc: 'India', date: '2027-03-22', end: '2027-05-25', cat: 'cricket', news: 'IPL enters its 20th season.', tier: 1 },
    { id: 'ct-27', n: 'ICC Champions Trophy 2027', e: '\u{1F3CF}', loc: 'South Africa', date: '2027-10-01', end: '2027-10-19', cat: 'cricket', news: 'Top 8 ODI nations battle for the trophy.', tier: 1 },
    { id: 'wc-26-final', n: 'FIFA World Cup 2026 Final', e: '\u26BD', loc: 'New York/New Jersey, USA', date: '2026-07-19', end: '2026-07-19', cat: 'football', news: 'MetLife Stadium hosts the biggest match in football.', tier: 1 },
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
    console.log('  2. Uncomment the fetchLiveEvents() function above');
    console.log('  3. Run: FIRECRAWL_API_KEY=fc-xxx node src/scripts/fetchEvents.js --live');
    console.log('');
    console.log('Falling back to mock data for now...');
  }

  console.log('[fetchEvents] Generating events data...');
  const events = generateMockEvents();

  // Sort by date
  events.sort((a, b) => a.date.localeCompare(b.date));

  const output = `export const events = ${JSON.stringify(events, null, 2)};\n\nexport default events;\n`;
  const outPath = path.resolve(__dirname, '../data/events.js');
  fs.writeFileSync(outPath, output, 'utf-8');
  console.log(`[fetchEvents] Wrote ${outPath} (${events.length} events)`);
}

main().catch((err) => {
  console.error('[fetchEvents] Fatal:', err);
  process.exit(1);
});
