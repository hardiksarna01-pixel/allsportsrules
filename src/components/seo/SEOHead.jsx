import { useEffect } from 'react';

// ---------------------------------------------------------------------------
// Helper — set or create a <meta> tag
// ---------------------------------------------------------------------------
function setMeta(name, content, attr = 'name') {
  if (!content) return;
  let el = document.querySelector(`meta[${attr}="${name}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, name);
    document.head.appendChild(el);
  }
  el.content = content;
}

// ---------------------------------------------------------------------------
// SEOHead — manages document.title, meta tags, canonical and JSON-LD
// ---------------------------------------------------------------------------
export default function SEOHead({
  title,
  description,
  keywords,
  canonical,
  ogImage,
  schema,
  type = 'website',
}) {
  useEffect(() => {
    // Document title
    document.title = title
      ? `${title} | SportDecoded`
      : 'SportDecoded — Every Sport Rule Explained';

    // Standard meta
    setMeta(
      'description',
      description ||
        'Learn the rules of every sport — cricket, football, basketball, tennis, F1, MMA, Olympics and more. Simple explanations, visual guides, quizzes.',
    );
    setMeta(
      'keywords',
      keywords ||
        'sports rules, cricket rules, football rules, basketball rules, tennis rules, F1 rules, MMA rules, Olympic sports, sport explained',
    );

    // Open Graph
    setMeta('og:title', title || 'SportDecoded — Every Sport Rule Explained', 'property');
    setMeta('og:description', description || 'Learn the rules of every sport explained simply.', 'property');
    setMeta('og:type', type, 'property');
    setMeta('og:url', canonical || window.location.href, 'property');
    setMeta('og:image', ogImage || '/og-image.png', 'property');
    setMeta('og:site_name', 'SportDecoded', 'property');

    // Twitter Card
    setMeta('twitter:card', 'summary_large_image');
    setMeta('twitter:title', title || 'SportDecoded');
    setMeta('twitter:description', description || 'Learn the rules of every sport explained simply.');
    setMeta('twitter:image', ogImage || '/og-image.png');

    // Canonical link
    if (canonical) {
      let link = document.querySelector('link[rel="canonical"]');
      if (!link) {
        link = document.createElement('link');
        link.rel = 'canonical';
        document.head.appendChild(link);
      }
      link.href = canonical;
    }

    // JSON-LD structured data
    if (schema) {
      let script = document.getElementById('sd-jsonld');
      if (!script) {
        script = document.createElement('script');
        script.id = 'sd-jsonld';
        script.type = 'application/ld+json';
        document.head.appendChild(script);
      }
      script.textContent = JSON.stringify(schema);
    }

    // Cleanup: remove JSON-LD on unmount so it doesn't leak across pages
    return () => {
      const existing = document.getElementById('sd-jsonld');
      if (existing) existing.remove();
    };
  }, [title, description, keywords, canonical, ogImage, schema, type]);

  return null; // renders nothing — side-effect only
}

// ===========================================================================
// Schema helpers
// ===========================================================================

/**
 * Sport page schema — FAQPage + SportsOrganization
 */
export function sportSchema(sport) {
  const schemas = [];

  // FAQPage from sport.faq
  if (sport.faq && sport.faq.length > 0) {
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: sport.faq.map(([question, answer]) => ({
        '@type': 'Question',
        name: question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: answer,
        },
      })),
    });
  }

  // Governing body as SportsOrganization
  if (sport.gb) {
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'SportsOrganization',
      name: sport.gb,
      sport: sport.n,
      description: `${sport.gb} — the governing body of ${sport.n}.`,
    });
  }

  // WebPage
  schemas.push({
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: `${sport.n} Rules — Complete Guide | SportDecoded`,
    description: `Learn the rules of ${sport.n} explained simply. Scoring, positions, equipment and more.`,
    url: `https://sportdecoded.com/sports/${sport.id}`,
    isPartOf: {
      '@type': 'WebSite',
      name: 'SportDecoded',
      url: 'https://sportdecoded.com',
    },
  });

  return schemas.length === 1 ? schemas[0] : schemas;
}

/**
 * Event page schema — SportsEvent JSON-LD
 */
export function eventSchema(event) {
  return {
    '@context': 'https://schema.org',
    '@type': 'SportsEvent',
    name: event.n,
    startDate: event.date,
    endDate: event.end,
    location: {
      '@type': 'Place',
      name: event.loc,
    },
    description: event.news,
    url: `https://sportdecoded.com/events/${event.id}`,
    organizer: {
      '@type': 'Organization',
      name: 'SportDecoded',
    },
  };
}

/**
 * Glossary term schema — DefinedTerm JSON-LD
 */
export function glossarySchema(term) {
  return {
    '@context': 'https://schema.org',
    '@type': 'DefinedTerm',
    name: term.term,
    description: term.def,
    inDefinedTermSet: {
      '@type': 'DefinedTermSet',
      name: `${term.sport} Glossary`,
      url: 'https://sportdecoded.com/glossary',
    },
    url: `https://sportdecoded.com/glossary/${term.term.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')}`,
  };
}

/**
 * Breadcrumb schema — BreadcrumbList JSON-LD
 * @param {Array<{name: string, url: string}>} items
 */
export function breadcrumbSchema(items) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}
