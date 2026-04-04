import { sports } from '../data/sports';
import { enumerateUrls, getPageCount } from '../data/pseo/megaIndex';

const BASE_URL = 'https://allsportsrules.com';

// ---------------------------------------------------------------------------
// Sitemap index — splits 200K+ URLs into multiple sitemap files (50K each)
// Google allows max 50,000 URLs per sitemap file
// ---------------------------------------------------------------------------
const URLS_PER_SITEMAP = 50000;

function generateSitemapIndex() {
  const total = getPageCount();
  const sitemapCount = Math.ceil(total / URLS_PER_SITEMAP) + 1; // +1 for static
  const now = new Date().toISOString().split('T')[0];

  const entries = [];
  entries.push(`  <sitemap>
    <loc>${BASE_URL}/sitemap-static.xml</loc>
    <lastmod>${now}</lastmod>
  </sitemap>`);

  for (let i = 0; i < sitemapCount; i++) {
    entries.push(`  <sitemap>
    <loc>${BASE_URL}/sitemap-pseo-${i}.xml</loc>
    <lastmod>${now}</lastmod>
  </sitemap>`);
  }

  return `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries.join('\n')}
</sitemapindex>`;
}

// ---------------------------------------------------------------------------
// Static sitemap — core pages, sport pages, categories, comparisons
// ---------------------------------------------------------------------------
function generateStaticSitemap() {
  const urls = [];
  const now = new Date().toISOString().split('T')[0];

  function add(path, priority, changefreq) {
    urls.push(`  <url>
    <loc>${BASE_URL}${path}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`);
  }

  // Core static pages
  add('/', '1.0', 'daily');
  add('/quiz', '0.8', 'weekly');
  add('/search', '0.6', 'monthly');
  add('/ai', '0.7', 'monthly');
  add('/calculators', '0.7', 'monthly');
  add('/rankings', '0.8', 'weekly');
  add('/glossary', '0.9', 'weekly');
  add('/worldcup', '0.9', 'weekly');
  add('/games', '0.6', 'monthly');
  add('/profile', '0.3', 'monthly');

  // Sport pages + beginner guides
  sports.forEach(s => {
    add(`/sports/${s.id}`, '0.9', 'weekly');
    add(`/sports/${s.id}/beginners`, '0.7', 'monthly');
  });

  // Category pages
  const cats = ['popular','trending','indoor','ball','combat','aquatic','track','gym','cycle','target','winter','motor','outdoor','racquet','esports','womens','other'];
  cats.forEach(c => add(`/category/${c}`, '0.6', 'monthly'));

  // Comparison pairs
  const pairs = [
    'cricket-vs-baseball','rugby-vs-nfl','pickleball-vs-tennis','padel-vs-tennis',
    'futsal-vs-football','table-tennis-vs-badminton','boxing-vs-mma','judo-vs-wrestling',
    'field-hockey-vs-ice-hockey','figure-skating-vs-gymnastics','swimming-vs-diving',
    'cycling-vs-bmx','archery-vs-shooting','volleyball-vs-handball','water-polo-vs-swimming',
    'lol-vs-valorant','squash-vs-tennis','kabaddi-vs-wrestling','surfing-vs-skateboard',
    'climbing-vs-gymnastics','rugby-vs-football','nfl-vs-rugby','cricket-vs-football',
    'basketball-vs-handball','tennis-vs-badminton','boxing-vs-wrestling','mma-vs-judo',
    'f1-vs-motogp','f1-vs-nascar','snowboard-vs-alpine-ski','ice-hockey-vs-field-hockey',
    'rowing-vs-canoe','triathlon-vs-athletics','fencing-vs-taekwondo','golf-vs-archery',
    'baseball-vs-cricket','football-vs-basketball','tennis-vs-squash','volleyball-vs-basketball',
    'swimming-vs-water-polo','athletics-vs-gymnastics','boxing-vs-taekwondo','wrestling-vs-judo',
    'padel-vs-pickleball','flag-football-vs-nfl','lacrosse-vs-field-hockey',
    'breaking-vs-gymnastics','darts-vs-archery','snooker-vs-bowling','sepak-takraw-vs-volleyball'
  ];
  pairs.forEach(p => add(`/compare/${p}`, '0.6', 'monthly'));

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join('\n')}
</urlset>`;
}

// ---------------------------------------------------------------------------
// pSEO sitemap chunk — returns URLs for a given chunk index (0-based)
// ---------------------------------------------------------------------------
function generatePSEOSitemapChunk(chunkIndex) {
  const urls = [];
  const now = new Date().toISOString().split('T')[0];
  const start = chunkIndex * URLS_PER_SITEMAP;
  const end = start + URLS_PER_SITEMAP;
  let count = 0;

  for (const url of enumerateUrls()) {
    if (count >= end) break;
    if (count >= start) {
      urls.push(`  <url>
    <loc>${BASE_URL}${url}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>`);
    }
    count++;
  }

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join('\n')}
</urlset>`;
}

// ---------------------------------------------------------------------------
// Legacy single-file sitemap (for backwards compatibility)
// Returns static pages only + count summary as comment
// ---------------------------------------------------------------------------
function generateSitemap() {
  const total = getPageCount();
  const staticXml = generateStaticSitemap();
  // Append a comment with total page count
  return staticXml.replace('</urlset>',
    `  <!-- Total pSEO pages: ${total.toLocaleString()}. Use sitemap index for full coverage. -->\n</urlset>`);
}

// ---------------------------------------------------------------------------
// Page count report — for verification
// ---------------------------------------------------------------------------
function getPageCountReport() {
  const total = getPageCount();
  return {
    total,
    perSitemap: URLS_PER_SITEMAP,
    sitemapFiles: Math.ceil(total / URLS_PER_SITEMAP) + 1,
    breakdown: `${sports.length} sports × topics × intents × variants = ${total.toLocaleString()} unique pages`,
  };
}

export { generateSitemap, generateSitemapIndex, generateStaticSitemap, generatePSEOSitemapChunk, getPageCountReport };
export default generateSitemap;
