#!/usr/bin/env node
/**
 * fetchStreaming.js — Build-time script for fetching sport-to-streaming mappings
 *
 * Target sources:
 *   - JustWatch        — https://www.justwatch.com
 *   - Official league sites for broadcast partner pages
 *   - Regional broadcaster announcements
 *
 * Output matches whereToWatch.js schema:
 *   { sport, e, n, regions: [{ r, platforms: [...] }] }
 *
 * Usage:
 *   node src/scripts/fetchStreaming.js              # outputs mock data
 *   FIRECRAWL_API_KEY=fc-xxx node src/scripts/fetchStreaming.js --live
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
    id: 'justwatch-cricket',
    sport: 'cricket',
    url: 'https://www.justwatch.com/us/provider/willow',
    label: 'JustWatch — Cricket providers',
  },
  {
    id: 'justwatch-football',
    sport: 'football',
    url: 'https://www.justwatch.com/us/provider/paramount-plus',
    label: 'JustWatch — Football providers',
  },
  {
    id: 'justwatch-nba',
    sport: 'basketball',
    url: 'https://www.justwatch.com/us/provider/nba-league-pass',
    label: 'JustWatch — NBA providers',
  },
  {
    id: 'justwatch-f1',
    sport: 'f1',
    url: 'https://www.justwatch.com/us/provider/f1-tv',
    label: 'JustWatch — F1 providers',
  },
  {
    id: 'justwatch-tennis',
    sport: 'tennis',
    url: 'https://www.justwatch.com/us/provider/tennis-channel',
    label: 'JustWatch — Tennis providers',
  },
  {
    id: 'justwatch-nfl',
    sport: 'nfl',
    url: 'https://www.justwatch.com/us/provider/nfl-plus',
    label: 'JustWatch — NFL providers',
  },
];

const FIRECRAWL_SCHEMA = {
  type: 'object',
  properties: {
    platforms: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          name: { type: 'string' },
          region: { type: 'string' },
          type: { type: 'string', description: 'subscription, free, rent, buy' },
        },
      },
    },
  },
};

// ---------------------------------------------------------------------------
// Firecrawl live scraping (commented out — enable by uncommenting)
// ---------------------------------------------------------------------------
/*
async function fetchLiveStreaming() {
  const { default: FirecrawlApp } = await import('@mendable/firecrawl-js');
  const firecrawl = new FirecrawlApp({ apiKey: process.env.FIRECRAWL_API_KEY });

  const sportMap = {};
  for (const src of SOURCES) {
    console.log(`[Firecrawl] Scraping ${src.label} from ${src.url} ...`);
    try {
      const response = await firecrawl.scrapeUrl(src.url, {
        formats: ['extract'],
        extract: { schema: FIRECRAWL_SCHEMA },
      });
      const platforms = response.extract.platforms || [];
      // Group by region
      const regionMap = {};
      platforms.forEach((p) => {
        const region = p.region || 'Global';
        if (!regionMap[region]) regionMap[region] = [];
        regionMap[region].push(p.name);
      });
      sportMap[src.sport] = Object.entries(regionMap).map(([r, pls]) => ({
        r,
        platforms: [...new Set(pls)],
      }));
      console.log(`[Firecrawl] OK — ${src.label}`);
    } catch (err) {
      console.error(`[Firecrawl] FAIL — ${src.label}:`, err.message);
    }
  }
  return sportMap;
}
*/

// ---------------------------------------------------------------------------
// Mock data generator — valid whereToWatch.js format
// ---------------------------------------------------------------------------
function generateMockStreaming() {
  return [
    {
      sport: 'cricket', e: '\u{1F3D0}', n: 'Cricket',
      regions: [
        { r: 'India', platforms: ['JioCinema', 'Star Sports'] },
        { r: 'UK', platforms: ['Sky Sports', 'TNT Sports'] },
        { r: 'AUS', platforms: ['Fox Cricket', 'Kayo'] },
        { r: 'USA', platforms: ['Willow TV', 'ESPN+'] },
        { r: 'NZ', platforms: ['Spark Sport'] },
      ],
    },
    {
      sport: 'football', e: '\u26BD', n: 'Football',
      regions: [
        { r: 'UK', platforms: ['Sky Sports', 'TNT Sports'] },
        { r: 'USA', platforms: ['ESPN+', 'Peacock', 'Paramount+'] },
        { r: 'India', platforms: ['JioCinema', 'Sony LIV'] },
        { r: 'Germany', platforms: ['DAZN', 'Sky Deutschland'] },
        { r: 'Spain', platforms: ['Movistar+', 'DAZN'] },
      ],
    },
    {
      sport: 'basketball', e: '\u{1F3C0}', n: 'Basketball',
      regions: [
        { r: 'USA', platforms: ['ESPN', 'TNT', 'NBA LP'] },
        { r: 'India', platforms: ['FanCode'] },
        { r: 'UK', platforms: ['Sky Sports', 'NBA LP'] },
        { r: 'AUS', platforms: ['ESPN via Kayo', 'NBA LP'] },
      ],
    },
    {
      sport: 'tennis', e: '\u{1F3BE}', n: 'Tennis',
      regions: [
        { r: 'Global', platforms: ['Tennis TV'] },
        { r: 'USA', platforms: ['ESPN', 'Tennis Channel'] },
        { r: 'UK', platforms: ['Sky Sports', 'Amazon Prime'] },
        { r: 'AUS', platforms: ['Stan Sport', 'Nine'] },
      ],
    },
    {
      sport: 'f1', e: '\u{1F3C1}', n: 'Formula 1',
      regions: [
        { r: 'Global', platforms: ['F1 TV Pro'] },
        { r: 'UK', platforms: ['Sky Sports F1'] },
        { r: 'USA', platforms: ['ESPN'] },
        { r: 'Germany', platforms: ['Sky Deutschland', 'RTL'] },
        { r: 'India', platforms: ['FanCode'] },
      ],
    },
    {
      sport: 'nfl', e: '\u{1F3C8}', n: 'NFL',
      regions: [
        { r: 'USA', platforms: ['NFL+', 'ESPN', 'Fox', 'CBS', 'Amazon Prime'] },
        { r: 'UK', platforms: ['Sky Sports', 'NFL GP', 'ITV'] },
        { r: 'Global', platforms: ['NFL Game Pass', 'DAZN'] },
      ],
    },
    {
      sport: 'baseball', e: '\u26BE', n: 'Baseball',
      regions: [
        { r: 'USA', platforms: ['ESPN', 'Fox', 'TBS', 'MLB.TV'] },
        { r: 'Japan', platforms: ['J Sports', 'NHK'] },
        { r: 'Global', platforms: ['MLB.TV'] },
      ],
    },
    {
      sport: 'rugby', e: '\u{1F3C9}', n: 'Rugby',
      regions: [
        { r: 'UK', platforms: ['Sky Sports', 'TNT Sports', 'BBC'] },
        { r: 'AUS', platforms: ['Stan Sport'] },
        { r: 'NZ', platforms: ['Sky Sport NZ'] },
        { r: 'France', platforms: ['France Televisions', 'Canal+'] },
      ],
    },
    {
      sport: 'mma', e: '\u{1F94A}', n: 'MMA / UFC',
      regions: [
        { r: 'USA', platforms: ['ESPN+', 'UFC Fight Pass'] },
        { r: 'UK', platforms: ['TNT Sports', 'UFC Fight Pass'] },
        { r: 'Global', platforms: ['UFC Fight Pass'] },
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
    console.log('  2. Uncomment fetchLiveStreaming() above');
    console.log('  3. Run: FIRECRAWL_API_KEY=fc-xxx node src/scripts/fetchStreaming.js --live');
    console.log('');
    console.log('Falling back to mock data...');
  }

  console.log('[fetchStreaming] Generating streaming data...');
  const streaming = generateMockStreaming();

  const output = `export const whereToWatch = ${JSON.stringify(streaming, null, 2)};\n\nexport default whereToWatch;\n`;
  const outPath = path.resolve(__dirname, '../data/whereToWatch.js');
  fs.writeFileSync(outPath, output, 'utf-8');
  console.log(`[fetchStreaming] Wrote ${outPath} (${streaming.length} sports)`);
}

main().catch((err) => {
  console.error('[fetchStreaming] Fatal:', err);
  process.exit(1);
});
