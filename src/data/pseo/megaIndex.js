// Stub — will be replaced by full implementation
// This file is the core pSEO registry (200K+ pages)
import { sports, sportsMap } from '../sports';
import { glossary } from '../glossary';
import { positions } from '../positions';
import { getRules } from '../rules';

function slugify(s) { return s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''); }

const INTENTS = [
  { id: 'what-is', slug: 'what-is', label: 'What is' },
  { id: 'how-to', slug: 'how-to', label: 'How to' },
  { id: 'rules', slug: 'rules-for', label: 'Rules for' },
  { id: 'explained', slug: 'explained', label: 'Explained' },
  { id: 'examples', slug: 'examples-of', label: 'Examples of' },
  { id: 'history', slug: 'history-of', label: 'History of' },
  { id: 'why', slug: 'why', label: 'Why' },
  { id: 'penalty', slug: 'penalty-for', label: 'Penalty for' },
  { id: 'advanced', slug: 'advanced-guide', label: 'Advanced Guide to' },
  { id: 'for-beginners', slug: 'beginners-guide', label: "Beginner's Guide to" },
];

const AUDIENCES = [
  { id: 'kids', slug: 'for-kids' },
  { id: 'coaches', slug: 'for-coaches' },
  { id: 'parents', slug: 'for-parents' },
  { id: 'referees', slug: 'for-referees' },
  { id: 'fans', slug: 'for-fans' },
];

export function lookupPage(pageType, sportId, slug) {
  const sport = sportsMap[sportId];
  if (!sport) return null;
  // Stub content generation
  return {
    title: slug.replace(/-/g, ' '),
    metaTitle: `${slug.replace(/-/g, ' ')} | SportDecoded`,
    metaDesc: `Learn about ${slug.replace(/-/g, ' ')} in ${sport.n}.`,
    sportName: sport.n,
    sportColor: sport.c,
    sportEmoji: sport.i,
    sportId: sport.id,
    pageType,
    topicTitle: slug.replace(/-/g, ' '),
    intentId: 'what-is',
    content: {
      intro: `Placeholder content for ${slug.replace(/-/g, ' ')} in ${sport.n}.`,
      sections: [{ heading: 'Overview', body: 'Content loading...' }],
      keyPoints: ['Content is being generated'],
      faq: [{ q: `What is ${slug.replace(/-/g, ' ')}?`, a: 'Loading...' }],
      relatedLinks: [{ url: `/sports/${sport.id}`, title: `${sport.n} Rules` }],
      funFact: '',
    },
  };
}

export function getPageCount() { return 0; }
export function* enumerateUrls() {}
export { INTENTS, AUDIENCES };
export default { lookupPage, getPageCount, enumerateUrls };
