import { useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { h } from '../../constants';
import { glossary } from '../../data/glossary';

const back = {
  display: 'inline-flex', alignItems: 'center', gap: 6, background: 'none',
  border: 'none', cursor: 'pointer', fontSize: 14, fontWeight: 600,
  color: '#2563eb', padding: 0, marginBottom: 16, ...h,
};

const card = {
  background: '#fff', borderRadius: 14, border: '1.5px solid #ede8e0',
  padding: 18, marginBottom: 16,
};

const badge = {
  display: 'inline-block', padding: '4px 12px', borderRadius: 20,
  fontSize: 11, fontWeight: 700, background: '#16a34a', color: '#fff', ...h,
};

function toSlug(term) {
  return term.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
}

function sportKey(sport) {
  const s = sport.toLowerCase().split('/')[0].trim();
  const map = { 'formula 1': 'f1', 'mma': 'mma', 'nfl': 'nfl', 'league of legends': 'league-of-legends', 'ice hockey': 'ice-hockey', 'figure skating': 'figure-skating' };
  return map[s] || s;
}

export default function GlossaryTermPage() {
  const { termSlug } = useParams();
  const navigate = useNavigate();

  const entry = useMemo(() => {
    return glossary.find(g => toSlug(g.term) === termSlug);
  }, [termSlug]);

  const relatedTerms = useMemo(() => {
    if (!entry) return [];
    return glossary.filter(g => g.id !== entry.id && g.sport.split('/').some(s => entry.sport.includes(s.trim())));
  }, [entry]);

  if (!entry) {
    return (
      <div style={{ padding: 20, maxWidth: 600, margin: '0 auto', textAlign: 'center', paddingTop: 60 }}>
        <button style={back} onClick={() => navigate('/glossary')}>{'\u2190'} Back to Glossary</button>
        <div style={{ fontSize: 48, marginBottom: 12 }}>{'\u{1F50D}'}</div>
        <h2 style={{ fontSize: 22, fontWeight: 900, ...h }}>Term not found</h2>
        <p style={{ fontSize: 14, color: '#78716c', ...h }}>
          This glossary term could not be found. Check the URL or browse the full glossary.
        </p>
      </div>
    );
  }

  const primarySport = entry.sport.split('/')[0].trim();
  const sportId = sportKey(primarySport);

  // FAQ schema for SEO
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [{
      '@type': 'Question',
      name: `What is ${entry.term} in ${primarySport}?`,
      acceptedAnswer: {
        '@type': 'Answer',
        text: entry.def,
      },
    }],
  };

  return (
    <div style={{ padding: 20, maxWidth: 600, margin: '0 auto', paddingBottom: 60 }}>
      {/* FAQ Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <button style={back} onClick={() => navigate('/glossary')}>{'\u2190'} Back to Glossary</button>

      {/* Term Header */}
      <h1 style={{ fontSize: 30, fontWeight: 900, margin: '0 0 8px', color: '#1a1a2e', ...h }}>
        {entry.term}
      </h1>
      <div style={{ marginBottom: 20 }}>
        <span style={badge}>{entry.sport}</span>
      </div>

      {/* Image */}
      {entry.img && (
        <div style={{ borderRadius: 14, overflow: 'hidden', marginBottom: 20 }}>
          <img
            src={entry.img}
            alt={entry.term}
            style={{ width: '100%', height: 180, objectFit: 'cover', display: 'block' }}
          />
        </div>
      )}

      {/* Definition */}
      <div style={card}>
        <h3 style={{ fontSize: 15, fontWeight: 800, margin: '0 0 8px', color: '#16a34a', ...h }}>
          {'\u{1F4D6}'} Definition
        </h3>
        <p style={{ fontSize: 14, lineHeight: 1.7, margin: 0, color: '#44403c', ...h }}>
          {entry.def}
        </p>
      </div>

      {/* Related Terms */}
      {relatedTerms.length > 0 && (
        <div style={card}>
          <h3 style={{ fontSize: 15, fontWeight: 800, margin: '0 0 12px', ...h }}>
            {'\u{1F517}'} Related {primarySport} Terms
          </h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {relatedTerms.slice(0, 10).map(t => (
              <button
                key={t.id}
                onClick={() => navigate(`/glossary/${toSlug(t.term)}`)}
                style={{
                  padding: '6px 14px', borderRadius: 20, fontSize: 12, fontWeight: 700,
                  border: '1.5px solid #ede8e0', background: '#faf8f5', cursor: 'pointer',
                  color: '#44403c', ...h,
                }}
              >
                {t.term}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Learn More Link */}
      <button
        onClick={() => navigate(`/sports/${sportId}`)}
        style={{
          width: '100%', padding: '14px 20px', borderRadius: 14,
          background: '#16a34a', color: '#fff', fontWeight: 700, fontSize: 14,
          border: 'none', cursor: 'pointer', ...h,
        }}
      >
        {'\u{1F3C6}'} Learn more about {primarySport} rules
      </button>
    </div>
  );
}
