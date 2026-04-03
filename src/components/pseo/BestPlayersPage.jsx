import { useParams, useNavigate } from 'react-router-dom';
import { useMemo } from 'react';
import { h } from '../../constants';
import SEOHead, { breadcrumbSchema } from '../seo/SEOHead';
import { bestPlayerPages } from '../../data/pSEO';

// ---------------------------------------------------------------------------
// Humanized content generators
// ---------------------------------------------------------------------------

function generatePositionIntro(positionName, sportName, desc) {
  const intros = [
    `The ${positionName.toLowerCase()} is one of the most important roles in ${sportName}. ${desc} Over the decades, a handful of players have redefined what it means to play this position, setting standards that future generations aspire to reach.`,
    `When people talk about the greatest ${positionName.toLowerCase()} players in ${sportName} history, the same names keep coming up. These are athletes who did not just play the position -- they transformed it. ${desc}`,
    `Every great ${sportName} team needs an elite ${positionName.toLowerCase()}. ${desc} The legends on this list did not simply fill the role; they elevated it to an art form, inspiring millions along the way.`,
  ];
  return intros[positionName.length % intros.length];
}

function generateWhyMatters(positionName, sportName) {
  return `The ${positionName.toLowerCase()} position in ${sportName} demands a unique combination of skills that few athletes possess at the highest level. It is not enough to be physically gifted -- you need game intelligence, consistency under pressure, and the ability to perform when everything is on the line. The players who made this list demonstrated all of these qualities, often for over a decade at the very top.`;
}

function generateCurrentBest(positionName, sportName, legends) {
  const currentLegends = legends.filter(l => l.era && l.era.includes('present'));
  if (currentLegends.length > 0) {
    return `In today's game, ${currentLegends.map(l => l.name).join(' and ')} ${currentLegends.length === 1 ? 'stands' : 'stand'} out as the premier ${positionName.toLowerCase()} ${currentLegends.length === 1 ? 'player' : 'players'} in ${sportName}. ${currentLegends[0].note ? currentLegends[0].note + '.' : ''} Fans and analysts alike are watching closely to see if ${currentLegends.length === 1 ? 'this player' : 'these players'} can cement a place among the all-time greats.`;
  }
  return `The current generation of ${positionName.toLowerCase()} players in ${sportName} is incredibly talented, building on the legacy of the legends listed above. Keep watching -- the next all-time great may already be on the field.`;
}

function generateFAQs(positionName, sportName, legends) {
  return [
    {
      q: `Who is the greatest ${positionName.toLowerCase()} in ${sportName} history?`,
      a: legends.length > 0
        ? `While opinions vary, ${legends[0].name} is widely considered one of the greatest. ${legends[0].note || ''}`
        : `There are many all-time greats at the ${positionName.toLowerCase()} position. The ranking depends on which era and metrics you value most.`,
    },
    {
      q: `What makes a great ${positionName.toLowerCase()} in ${sportName}?`,
      a: `Elite ${positionName.toLowerCase()} players combine technical skill, tactical awareness, physical attributes, and mental toughness. Consistency over a long career is what separates the good from the legendary.`,
    },
    {
      q: `Who is the best current ${positionName.toLowerCase()} in ${sportName}?`,
      a: (() => {
        const current = legends.filter(l => l.era && l.era.includes('present'));
        return current.length > 0
          ? `${current[0].name} is widely regarded as one of the best active ${positionName.toLowerCase()} players. ${current[0].note || ''}`
          : `Several talented ${positionName.toLowerCase()} players are competing at the highest level right now. The debate over the current best is always lively among fans.`;
      })(),
    },
  ];
}

// ---------------------------------------------------------------------------
// Medal/rank badges
// ---------------------------------------------------------------------------
const rankColors = ['#f59e0b', '#94a3b8', '#cd7f32', '#6366f1', '#10b981'];
const rankLabels = ['1st', '2nd', '3rd', '4th', '5th'];

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function BestPlayersPage() {
  const { sportId, positionSlug } = useParams();
  const navigate = useNavigate();

  const page = useMemo(() => {
    return bestPlayerPages.find(p => p.sportId === sportId && p.slug === positionSlug);
  }, [sportId, positionSlug]);

  if (!page) {
    return (
      <div style={{ padding: 40, textAlign: 'center', ...h }}>
        <h1 style={{ fontSize: 22, fontWeight: 800, color: '#333' }}>Page not found</h1>
        <p style={{ color: '#888', marginTop: 8 }}>We could not find that best-players page.</p>
        <button onClick={() => navigate('/')} style={{ marginTop: 16, padding: '10px 24px', borderRadius: 10, background: '#16a34a', color: '#fff', border: 'none', fontWeight: 700, cursor: 'pointer', ...h }}>
          Go Home
        </button>
      </div>
    );
  }

  const intro = generatePositionIntro(page.positionName, page.sportName, page.positionDesc);
  const whyMatters = generateWhyMatters(page.positionName, page.sportName);
  const currentBest = generateCurrentBest(page.positionName, page.sportName, page.legends);
  const faqs = generateFAQs(page.positionName, page.sportName, page.legends);

  const schema = [
    {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: page.metaTitle,
      description: page.metaDesc,
      author: { '@type': 'Organization', name: 'SportDecoded' },
      publisher: { '@type': 'Organization', name: 'SportDecoded', url: 'https://sportdecoded.com' },
      url: `https://sportdecoded.com/best/${page.sportId}/${page.slug}`,
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
      { name: `Best ${page.positionName}`, url: `https://sportdecoded.com/best/${page.sportId}/${page.slug}` },
    ]),
  ];

  // Get other positions in the same sport for internal linking
  const otherPositions = bestPlayerPages.filter(
    p => p.sportId === sportId && p.slug !== positionSlug
  ).slice(0, 5);

  const sectionTitle = { fontSize: 18, fontWeight: 800, color: '#1a1a1a', marginBottom: 12, ...h };
  const card = { background: '#fff', borderRadius: 14, padding: '20px 22px', marginBottom: 18, boxShadow: '0 1px 4px rgba(0,0,0,0.06)' };

  return (
    <div style={{ paddingBottom: 100, background: '#fbf8f3', minHeight: '100vh' }}>
      <SEOHead
        title={page.metaTitle}
        description={page.metaDesc}
        keywords={`best ${page.positionName} ${page.sportName}, greatest ${page.positionName}, top ${page.positionName} players, ${page.sportName} legends`}
        canonical={`https://sportdecoded.com/best/${page.sportId}/${page.slug}`}
        schema={schema}
      />

      {/* Breadcrumb */}
      <nav style={{ padding: '14px 18px 0', fontSize: 12, color: '#888', ...h }}>
        <span style={{ cursor: 'pointer', color: '#2563eb' }} onClick={() => navigate('/')}>Home</span>
        {' > '}
        <span style={{ cursor: 'pointer', color: '#2563eb' }} onClick={() => navigate(`/sports/${page.sportId}`)}>{page.sportName}</span>
        {' > '}
        <span style={{ color: '#555' }}>Best {page.positionName}</span>
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
            background: page.sportColor, color: '#fff', padding: '4px 12px',
            borderRadius: 20, fontSize: 12, fontWeight: 700, ...h,
          }}>{page.sportName}</span>
        </div>
        <h1 style={{ fontSize: 24, fontWeight: 900, color: '#1a1a1a', lineHeight: 1.2, ...h }}>
          Best {page.positionName} in {page.sportName} History
        </h1>
        <p style={{ fontSize: 14, color: '#555', marginTop: 8, lineHeight: 1.5, ...h }}>
          The top 5 greatest {page.positionName.toLowerCase()} players of all time, ranked by career achievements, impact, and legacy.
        </p>
      </div>

      {/* Intro */}
      <div style={{ margin: '18px 16px 0' }}>
        <div style={card}>
          <p style={{ fontSize: 14, color: '#444', lineHeight: 1.7, ...h }}>{intro}</p>
        </div>
      </div>

      {/* AD PLACEMENT POINT */}
      {/* AdSense ad unit can be placed here for in-content advertising */}

      {/* Player Rankings */}
      <div style={{ margin: '0 16px' }}>
        <div style={card}>
          <h2 style={sectionTitle}>Top 5 {page.positionName} Players of All Time</h2>
          {page.legends.length > 0 ? page.legends.slice(0, 5).map((legend, i) => (
            <div key={i} style={{
              padding: '18px 16px',
              borderRadius: 12,
              background: i === 0 ? `${page.sportColor}08` : (i % 2 === 0 ? '#fafafa' : '#fff'),
              marginBottom: 12,
              border: i === 0 ? `2px solid ${page.sportColor}30` : '1px solid #f0f0f0',
              position: 'relative',
            }}>
              {/* Rank badge */}
              <div style={{
                position: 'absolute', top: -8, right: 12,
                background: rankColors[i] || '#999',
                color: '#fff', padding: '2px 10px', borderRadius: 12,
                fontSize: 11, fontWeight: 800, ...h,
              }}>
                {rankLabels[i] || `#${i + 1}`}
              </div>

              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                <div style={{
                  width: 44, height: 44, borderRadius: '50%',
                  background: `linear-gradient(135deg, ${page.sportColor}30, ${page.sportColor}10)`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 20, fontWeight: 900, color: page.sportColor, flexShrink: 0, ...h,
                }}>
                  {i + 1}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                    <h3 style={{ fontSize: 16, fontWeight: 800, color: '#1a1a1a', ...h }}>{legend.name}</h3>
                    <span style={{ fontSize: 16 }}>{legend.country}</span>
                  </div>
                  <div style={{ fontSize: 12, color: '#888', marginTop: 2, ...h }}>{legend.era}</div>
                  <p style={{ fontSize: 13, color: '#555', lineHeight: 1.6, marginTop: 6, ...h }}>
                    {legend.note}
                  </p>
                </div>
              </div>
            </div>
          )) : (
            <p style={{ fontSize: 14, color: '#888', lineHeight: 1.6, ...h }}>
              Detailed player rankings for the {page.positionName.toLowerCase()} position in {page.sportName} are being compiled.
              Check back soon for the complete list with career stats and achievements.
            </p>
          )}
        </div>
      </div>

      {/* Why this position matters */}
      <div style={{ margin: '0 16px' }}>
        <div style={card}>
          <h2 style={sectionTitle}>Why the {page.positionName} Position Matters</h2>
          <p style={{ fontSize: 14, color: '#444', lineHeight: 1.7, ...h }}>{whyMatters}</p>
          <p style={{ fontSize: 14, color: '#444', lineHeight: 1.7, marginTop: 12, ...h }}>
            {page.positionDesc}. When you watch {page.sportName}, pay special attention to how the {page.positionName.toLowerCase()} influences
            the flow of the game. You will quickly see why this position is so valued by coaches and fans alike.
          </p>
        </div>
      </div>

      {/* AD PLACEMENT POINT */}
      {/* AdSense ad unit can be placed here for mid-content advertising */}

      {/* Current Best */}
      <div style={{ margin: '0 16px' }}>
        <div style={{
          ...card,
          border: `2px solid ${page.sportColor}30`,
          background: `${page.sportColor}05`,
        }}>
          <h2 style={sectionTitle}>Who Is the Best {page.positionName} Right Now?</h2>
          <p style={{ fontSize: 14, color: '#444', lineHeight: 1.7, ...h }}>{currentBest}</p>
        </div>
      </div>

      {/* FAQ */}
      <div style={{ margin: '0 16px' }}>
        <div style={card}>
          <h2 style={sectionTitle}>Frequently Asked Questions</h2>
          {faqs.map((faq, i) => (
            <div key={i} style={{
              marginBottom: i < faqs.length - 1 ? 16 : 0,
              paddingBottom: i < faqs.length - 1 ? 16 : 0,
              borderBottom: i < faqs.length - 1 ? '1px solid #eee' : 'none',
            }}>
              <h3 style={{ fontSize: 14, fontWeight: 700, color: '#1a1a1a', marginBottom: 6, ...h }}>{faq.q}</h3>
              <p style={{ fontSize: 13, color: '#555', lineHeight: 1.6, ...h }}>{faq.a}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Other positions in this sport */}
      {otherPositions.length > 0 && (
        <div style={{ margin: '0 16px' }}>
          <div style={card}>
            <h2 style={sectionTitle}>Other {page.sportName} Positions</h2>
            <p style={{ fontSize: 13, color: '#888', marginBottom: 12, ...h }}>
              Explore the legends at every position in {page.sportName}:
            </p>
            {otherPositions.map((pos, i) => (
              <div
                key={i}
                onClick={() => navigate(`/best/${pos.sportId}/${pos.slug}`)}
                style={{
                  padding: '12px 14px', borderRadius: 10, background: '#f8f8f8',
                  marginBottom: 8, cursor: 'pointer', display: 'flex',
                  alignItems: 'center', justifyContent: 'space-between',
                  transition: 'background 0.15s', ...h,
                }}
                onMouseEnter={e => e.currentTarget.style.background = '#f0f0f0'}
                onMouseLeave={e => e.currentTarget.style.background = '#f8f8f8'}
              >
                <span style={{ fontSize: 13, fontWeight: 600, color: '#333' }}>
                  {page.sportEmoji} Best {pos.positionName} in {page.sportName}
                </span>
                <span style={{ fontSize: 14, color: '#999' }}>&rarr;</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* CTA */}
      <div style={{ margin: '0 16px' }}>
        <div style={card}>
          <h2 style={{ ...sectionTitle, textAlign: 'center' }}>Dive Deeper into {page.sportName}</h2>
          <div style={{ display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap' }}>
            <button
              onClick={() => navigate(`/sports/${page.sportId}`)}
              style={{
                padding: '10px 20px', borderRadius: 10, background: page.sportColor,
                color: '#fff', border: 'none', fontWeight: 700, fontSize: 13, cursor: 'pointer', ...h,
              }}
            >
              Full {page.sportName} Guide
            </button>
            <button
              onClick={() => navigate('/quiz')}
              style={{
                padding: '10px 20px', borderRadius: 10, background: '#f8f8f8',
                color: '#333', border: '1px solid #ddd', fontWeight: 700, fontSize: 13, cursor: 'pointer', ...h,
              }}
            >
              Test Your Knowledge
            </button>
            <button
              onClick={() => navigate('/ai')}
              style={{
                padding: '10px 20px', borderRadius: 10, background: '#f8f8f8',
                color: '#333', border: '1px solid #ddd', fontWeight: 700, fontSize: 13, cursor: 'pointer', ...h,
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
