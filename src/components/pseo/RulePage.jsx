import { useParams, useNavigate } from 'react-router-dom';
import { useMemo } from 'react';
import { h } from '../../constants';
import SEOHead, { breadcrumbSchema } from '../seo/SEOHead';
import { rulePages } from '../../data/pSEO';

// Humanized context generators - these produce unique text per rule
function generateWhyExists(title, sportName) {
  const contexts = [
    `Every rule in ${sportName} exists to keep the game fair and safe for everyone involved. The ${title.toLowerCase()} rule is no exception -- it was developed over time as players, officials, and governing bodies worked to balance competitive intensity with sportsmanship.`,
    `Think of ${sportName} rules like the grammar of a language. Without the ${title.toLowerCase()} rule, the "sentence" of a match would not make sense. This particular regulation evolved because the sport needed a clear, consistent way to handle a situation that kept coming up in competitive play.`,
    `The ${title.toLowerCase()} rule in ${sportName} did not appear overnight. It grew out of real match situations where officials, players, and fans all needed clarity. Without it, games would descend into arguments and inconsistency.`,
  ];
  return contexts[title.length % contexts.length];
}

function generateCommonMistakes(title, sportName, fullRule) {
  const mistakes = [
    { q: `Thinking the ${title.toLowerCase()} rule is straightforward`, a: `Many newcomers to ${sportName} assume this rule is simple, but there are nuances that even seasoned fans sometimes miss. The key is understanding the specific conditions that must be met.` },
    { q: 'Confusing similar rules', a: `${sportName} has several rules that can seem alike at first glance. Make sure you understand what distinguishes the ${title.toLowerCase()} situation from related scenarios.` },
    { q: 'Forgetting the context matters', a: `The application of the ${title.toLowerCase()} rule can vary depending on the match format or competition level. Always consider the specific context of the game you are watching or playing.` },
  ];
  return mistakes;
}

function generateFAQs(title, sportName, fullRule) {
  return [
    {
      q: `What exactly is the ${title.toLowerCase()} rule in ${sportName}?`,
      a: `In simple terms: ${fullRule.slice(0, 200)}. This is one of the fundamental regulations that shapes how ${sportName} is played at every level.`,
    },
    {
      q: `When was the ${title.toLowerCase()} rule introduced?`,
      a: `Most ${sportName} rules have evolved gradually over the sport's history. The ${title.toLowerCase()} regulation has been refined multiple times by the sport's governing body to keep pace with how the game is played today.`,
    },
    {
      q: `Does the ${title.toLowerCase()} rule apply in all formats of ${sportName}?`,
      a: `Generally yes, though some formats or competition levels may have slight variations. Always check the specific competition rules if you are unsure.`,
    },
  ];
}

export default function RulePage() {
  const { sportId, ruleSlug } = useParams();
  const navigate = useNavigate();

  const page = useMemo(() => {
    return rulePages.find(r => r.sportId === sportId && r.slug === ruleSlug);
  }, [sportId, ruleSlug]);

  if (!page) {
    return (
      <div style={{ padding: 40, textAlign: 'center', ...h }}>
        <h1 style={{ fontSize: 22, fontWeight: 800, color: '#333' }}>Rule not found</h1>
        <p style={{ color: '#888', marginTop: 8 }}>We could not find that rule. It may have been moved or renamed.</p>
        <button onClick={() => navigate('/')} style={{ marginTop: 16, padding: '10px 24px', borderRadius: 10, background: '#16a34a', color: '#fff', border: 'none', fontWeight: 700, cursor: 'pointer', ...h }}>
          Go Home
        </button>
      </div>
    );
  }

  const whyExists = generateWhyExists(page.title, page.sportName);
  const mistakes = generateCommonMistakes(page.title, page.sportName, page.fullRule);
  const faqs = generateFAQs(page.title, page.sportName, page.fullRule);

  const schema = [
    {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: page.metaTitle,
      description: page.metaDesc,
      author: { '@type': 'Organization', name: 'SportDecoded' },
      publisher: { '@type': 'Organization', name: 'SportDecoded', url: 'https://sportdecoded.com' },
      url: `https://sportdecoded.com/rules/${page.sportId}/${page.slug}`,
      mainEntityOfPage: `https://sportdecoded.com/rules/${page.sportId}/${page.slug}`,
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqs.map(f => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a },
      })),
    },
    breadcrumbSchema([
      { name: 'Home', url: 'https://sportdecoded.com/' },
      { name: page.sportName, url: `https://sportdecoded.com/sports/${page.sportId}` },
      { name: 'Rules', url: `https://sportdecoded.com/sports/${page.sportId}` },
      { name: page.title, url: `https://sportdecoded.com/rules/${page.sportId}/${page.slug}` },
    ]),
  ];

  const sectionTitle = { fontSize: 18, fontWeight: 800, color: '#1a1a1a', marginBottom: 12, ...h };
  const card = { background: '#fff', borderRadius: 14, padding: '20px 22px', marginBottom: 18, boxShadow: '0 1px 4px rgba(0,0,0,0.06)' };

  return (
    <div style={{ paddingBottom: 100, background: '#fbf8f3', minHeight: '100vh' }}>
      <SEOHead
        title={page.metaTitle}
        description={page.metaDesc}
        keywords={`${page.sportName} rules, ${page.title}, ${page.sportName} regulations, sport rules explained`}
        canonical={`https://sportdecoded.com/rules/${page.sportId}/${page.slug}`}
        schema={schema}
      />

      {/* Breadcrumb */}
      <nav style={{ padding: '14px 18px 0', fontSize: 12, color: '#888', ...h }}>
        <span style={{ cursor: 'pointer', color: '#2563eb' }} onClick={() => navigate('/')}>Home</span>
        {' > '}
        <span style={{ cursor: 'pointer', color: '#2563eb' }} onClick={() => navigate(`/sports/${page.sportId}`)}>{page.sportName}</span>
        {' > '}
        <span style={{ cursor: 'pointer', color: '#2563eb' }} onClick={() => navigate(`/sports/${page.sportId}`)}>Rules</span>
        {' > '}
        <span style={{ color: '#555' }}>{page.title}</span>
      </nav>

      {/* Hero */}
      <div style={{
        margin: '14px 16px 0',
        borderRadius: 16,
        background: `linear-gradient(135deg, ${page.sportColor}22, ${page.sportColor}08)`,
        border: `2px solid ${page.sportColor}30`,
        padding: '28px 22px',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
          <span style={{ fontSize: 30 }}>{page.sportEmoji}</span>
          <span style={{
            background: page.sportColor,
            color: '#fff',
            padding: '4px 12px',
            borderRadius: 20,
            fontSize: 12,
            fontWeight: 700,
            ...h,
          }}>{page.sportName}</span>
        </div>
        <h1 style={{ fontSize: 24, fontWeight: 900, color: '#1a1a1a', lineHeight: 1.2, ...h }}>
          {page.title}
        </h1>
        <p style={{ fontSize: 13, color: '#666', marginTop: 6, ...h }}>
          A complete, simple explanation of this {page.sportName} rule
        </p>
      </div>

      {/* Quick Answer Box */}
      <div style={{ margin: '18px 16px 0' }}>
        <div style={{
          ...card,
          border: `2px solid ${page.sportColor}40`,
          background: `${page.sportColor}08`,
        }}>
          <div style={{ fontSize: 11, fontWeight: 800, color: page.sportColor, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 8, ...h }}>
            Quick Answer
          </div>
          <p style={{ fontSize: 15, fontWeight: 600, color: '#1a1a1a', lineHeight: 1.6, ...h }}>
            {page.fullRule}
          </p>
        </div>
      </div>

      {/* AD PLACEMENT POINT */}
      {/* AdSense ad unit can be placed here for in-content advertising */}

      {/* Detailed Explanation */}
      <div style={{ margin: '0 16px' }}>
        <div style={card}>
          <h2 style={sectionTitle}>Detailed Explanation</h2>
          <p style={{ fontSize: 14, color: '#444', lineHeight: 1.7, ...h }}>
            Let us break this down in plain language. The <strong>{page.title.toLowerCase()}</strong> rule in {page.sportName} is
            one of those regulations that can seem confusing at first, but once you understand the reasoning behind it,
            everything clicks into place.
          </p>
          <p style={{ fontSize: 14, color: '#444', lineHeight: 1.7, marginTop: 12, ...h }}>
            Here is what you need to know: {page.fullRule}. Think of it like a traffic rule -- it exists to
            keep the game flowing smoothly and to make sure no one gets an unfair advantage. Without this rule,
            {page.sportName} would be a very different (and probably less enjoyable) sport to watch and play.
          </p>
          <p style={{ fontSize: 14, color: '#444', lineHeight: 1.7, marginTop: 12, ...h }}>
            If you are watching a {page.sportName} match and see this rule applied, pay attention to how the officials
            handle it. You will start noticing the subtle judgment calls that make officiating such a challenging job.
            The best way to learn is by watching with this rule in mind.
          </p>
        </div>
      </div>

      {/* Why This Rule Exists */}
      <div style={{ margin: '0 16px' }}>
        <div style={card}>
          <h2 style={sectionTitle}>Why This Rule Exists</h2>
          <p style={{ fontSize: 14, color: '#444', lineHeight: 1.7, ...h }}>
            {whyExists}
          </p>
          <p style={{ fontSize: 14, color: '#444', lineHeight: 1.7, marginTop: 12, ...h }}>
            At its core, the {page.title.toLowerCase()} rule serves the spirit of {page.sportName}: fair competition,
            player safety, and an enjoyable experience for spectators. {page.sportGb ? `The ${page.sportGb} oversees how this rule is applied and updated across all levels of the sport.` : ''}
          </p>
        </div>
      </div>

      {/* Common Mistakes */}
      <div style={{ margin: '0 16px' }}>
        <div style={card}>
          <h2 style={sectionTitle}>Common Mistakes and Misconceptions</h2>
          {mistakes.map((m, i) => (
            <div key={i} style={{ marginBottom: i < mistakes.length - 1 ? 16 : 0 }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: '#b91c1c', marginBottom: 4, ...h }}>
                {i + 1}. {m.q}
              </div>
              <p style={{ fontSize: 13, color: '#555', lineHeight: 1.6, ...h }}>{m.a}</p>
            </div>
          ))}
        </div>
      </div>

      {/* AD PLACEMENT POINT */}
      {/* AdSense ad unit can be placed here for mid-content advertising */}

      {/* FAQ Section */}
      <div style={{ margin: '0 16px' }}>
        <div style={card}>
          <h2 style={sectionTitle}>Frequently Asked Questions</h2>
          {faqs.map((faq, i) => (
            <div key={i} style={{
              marginBottom: i < faqs.length - 1 ? 16 : 0,
              paddingBottom: i < faqs.length - 1 ? 16 : 0,
              borderBottom: i < faqs.length - 1 ? '1px solid #eee' : 'none',
            }}>
              <h3 style={{ fontSize: 14, fontWeight: 700, color: '#1a1a1a', marginBottom: 6, ...h }}>
                {faq.q}
              </h3>
              <p style={{ fontSize: 13, color: '#555', lineHeight: 1.6, ...h }}>{faq.a}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Related Rules */}
      {page.relatedRules.length > 0 && (
        <div style={{ margin: '0 16px' }}>
          <div style={card}>
            <h2 style={sectionTitle}>Related {page.sportName} Rules</h2>
            <p style={{ fontSize: 13, color: '#888', marginBottom: 12, ...h }}>
              Explore other important rules in {page.sportName} to build a complete understanding of the game.
            </p>
            {page.relatedRules.map((rule, i) => (
              <div
                key={i}
                onClick={() => {
                  const slug = page.relatedRuleSlugs[i];
                  if (slug) navigate(`/rules/${page.sportId}/${slug}`);
                }}
                style={{
                  padding: '12px 14px',
                  borderRadius: 10,
                  background: '#f8f8f8',
                  marginBottom: 8,
                  cursor: 'pointer',
                  transition: 'background 0.15s',
                  ...h,
                }}
                onMouseEnter={e => e.currentTarget.style.background = '#f0f0f0'}
                onMouseLeave={e => e.currentTarget.style.background = '#f8f8f8'}
              >
                <div style={{ fontSize: 13, fontWeight: 600, color: '#333' }}>
                  {page.sportEmoji} {rule}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Engagement & CTA */}
      <div style={{ margin: '0 16px' }}>
        <div style={card}>
          <h2 style={{ ...sectionTitle, textAlign: 'center' }}>Was this helpful?</h2>
          <p style={{ fontSize: 13, color: '#888', textAlign: 'center', marginBottom: 16, ...h }}>
            Understanding the rules is the first step to truly enjoying {page.sportName}.
          </p>
          <div style={{ display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap' }}>
            <button
              onClick={() => navigate(`/sports/${page.sportId}`)}
              style={{
                padding: '10px 20px',
                borderRadius: 10,
                background: page.sportColor,
                color: '#fff',
                border: 'none',
                fontWeight: 700,
                fontSize: 13,
                cursor: 'pointer',
                ...h,
              }}
            >
              Full {page.sportName} Guide
            </button>
            <button
              onClick={() => navigate('/quiz')}
              style={{
                padding: '10px 20px',
                borderRadius: 10,
                background: '#f8f8f8',
                color: '#333',
                border: '1px solid #ddd',
                fontWeight: 700,
                fontSize: 13,
                cursor: 'pointer',
                ...h,
              }}
            >
              Test Your Knowledge
            </button>
            <button
              onClick={() => navigate('/ai')}
              style={{
                padding: '10px 20px',
                borderRadius: 10,
                background: '#f8f8f8',
                color: '#333',
                border: '1px solid #ddd',
                fontWeight: 700,
                fontSize: 13,
                cursor: 'pointer',
                ...h,
              }}
            >
              Ask AI Tutor
            </button>
          </div>
        </div>
      </div>

      {/* AD PLACEMENT POINT */}
      {/* AdSense ad unit can be placed here for bottom-of-page advertising */}
    </div>
  );
}
