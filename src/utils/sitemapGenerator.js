import { sports } from '../data/sports';

const BASE_URL = 'https://allsportsrules.com';

function generateSitemap() {
  const urls = [];
  const now = new Date().toISOString().split('T')[0];

  // Static pages
  const staticPages = [
    { path: '/', priority: '1.0', changefreq: 'daily' },
    { path: '/quiz', priority: '0.8', changefreq: 'weekly' },
    { path: '/search', priority: '0.6', changefreq: 'monthly' },
    { path: '/ai', priority: '0.7', changefreq: 'monthly' },
    { path: '/calculators', priority: '0.7', changefreq: 'monthly' },
    { path: '/rankings', priority: '0.8', changefreq: 'weekly' },
    { path: '/glossary', priority: '0.9', changefreq: 'weekly' },
    { path: '/worldcup', priority: '0.9', changefreq: 'weekly' },
    { path: '/profile', priority: '0.3', changefreq: 'monthly' },
    { path: '/olympics-2028', priority: '0.8', changefreq: 'monthly' },
  ];

  staticPages.forEach(p => {
    urls.push(`  <url>
    <loc>${BASE_URL}${p.path}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>${p.changefreq}</changefreq>
    <priority>${p.priority}</priority>
  </url>`);
  });

  // Sport pages
  sports.forEach(s => {
    urls.push(`  <url>
    <loc>${BASE_URL}/sports/${s.id}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>`);

    // Beginner guide
    urls.push(`  <url>
    <loc>${BASE_URL}/sports/${s.id}/beginners</loc>
    <lastmod>${now}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`);

    // Positions (if sport has position data)
    urls.push(`  <url>
    <loc>${BASE_URL}/sports/${s.id}/positions</loc>
    <lastmod>${now}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>`);
  });

  // Category pages
  const cats = ['popular','trending','indoor','ball','combat','aquatic','track','gym','cycle','target','winter','motor','outdoor','racquet','esports','womens','other'];
  cats.forEach(c => {
    urls.push(`  <url>
    <loc>${BASE_URL}/category/${c}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>`);
  });

  // Comparison pairs (top 50)
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
  pairs.forEach(p => {
    urls.push(`  <url>
    <loc>${BASE_URL}/compare/${p}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>`);
  });

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join('\n')}
</urlset>`;

  return xml;
}

// For use in build scripts
export { generateSitemap };
export default generateSitemap;
