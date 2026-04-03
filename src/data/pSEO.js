import { sports } from './sports/index';
import { glossary } from './glossary';
import { positions } from './positions';

function slugify(s) { return s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''); }

// Generate individual rule pages
export const rulePages = [];
sports.forEach(s => {
  (s.r || []).forEach((rule, i) => {
    const cleanRule = rule.replace(/\u2696\uFE0F\s*/g, '').trim();
    const title = cleanRule.split(':')[0] || cleanRule.slice(0, 60);
    const slug = slugify(title.slice(0, 50));
    rulePages.push({
      sportId: s.id,
      sportName: s.n,
      sportEmoji: s.i,
      sportColor: s.c,
      ruleIndex: i,
      slug,
      title: title.trim(),
      fullRule: cleanRule,
      metaTitle: `${title.trim()} in ${s.n} | SportDecoded`,
      metaDesc: `Learn about ${title.trim().toLowerCase()} in ${s.n}. ${cleanRule.slice(0, 120)}...`,
      relatedRules: (s.r || []).filter((_, j) => j !== i).slice(0, 3).map(r => r.replace(/\u2696\uFE0F\s*/g, '').slice(0, 60)),
      relatedRuleSlugs: (s.r || []).filter((_, j) => j !== i).slice(0, 3).map(r => {
        const rt = r.replace(/\u2696\uFE0F\s*/g, '').trim().split(':')[0] || '';
        return slugify(rt.slice(0, 50));
      }),
      sportFaq: s.faq || [],
      sportGb: s.gb || '',
    });
  });
});

// Generate "how many players" pages
export const playerCountPages = sports.map(s => ({
  sportId: s.id, sportName: s.n, sportEmoji: s.i, sportColor: s.c,
  slug: 'how-many-players',
  metaTitle: `How Many Players in ${s.n}? Team Size Explained | SportDecoded`,
  metaDesc: `Find out exactly how many players are on a ${s.n} team. Complete breakdown of positions, roles, and substitution rules.`,
  tp: s.tp,
  rules: s.r || [],
  faq: s.faq || [],
}));

// Generate "how long is a game" pages
export const durationPages = sports.map(s => ({
  sportId: s.id, sportName: s.n, sportEmoji: s.i, sportColor: s.c,
  slug: 'game-duration',
  metaTitle: `How Long Is a ${s.n} Game? Duration Guide | SportDecoded`,
  metaDesc: `Complete guide to ${s.n} game duration. Learn about match length, overtime rules, and different format durations.`,
  rules: s.r || [],
  formats: s.fmt || [],
  faq: s.faq || [],
}));

// Generate "best players" pages from positions
export const bestPlayerPages = [];
Object.entries(positions).forEach(([sportId, data]) => {
  const sport = sports.find(s => s.id === sportId);
  if (!sport) return;
  (data.list || []).forEach(pos => {
    bestPlayerPages.push({
      sportId, sportName: sport.n, sportEmoji: sport.i, sportColor: sport.c,
      positionId: pos.id, positionName: pos.n, positionDesc: pos.desc,
      slug: slugify(pos.n),
      metaTitle: `Best ${pos.n} in ${sport.n} History | Top 5 Legends | SportDecoded`,
      metaDesc: `Discover the greatest ${pos.n.toLowerCase()} players in ${sport.n} history. Rankings, stats, and achievements of the top 5 legends.`,
      legends: pos.legends || [],
    });
  });
});

// Equipment pages
export const equipmentPages = sports.filter(s => s.eq && s.eq.length > 0).map(s => ({
  sportId: s.id, sportName: s.n, sportEmoji: s.i, sportColor: s.c,
  equipment: s.eq,
  slug: 'equipment',
  metaTitle: `${s.n} Equipment Guide -- What You Need to Play | SportDecoded`,
  metaDesc: `Complete ${s.n} equipment guide. Everything you need to get started: ${(s.eq || []).slice(0, 3).join(', ')}. Beginner to pro gear explained.`,
}));

export const totalPSEOPages = rulePages.length + playerCountPages.length + durationPages.length + bestPlayerPages.length + equipmentPages.length;
