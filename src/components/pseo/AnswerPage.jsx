import { useParams, useNavigate } from 'react-router-dom';
import { useMemo } from 'react';
import { h } from '../../constants';
import SEOHead, { breadcrumbSchema } from '../seo/SEOHead';
import { playerCountPages, durationPages } from '../../data/pSEO';
import { sports } from '../../data/sports/index';
import { positions } from '../../data/positions';

// ---------------------------------------------------------------------------
// Content generators — produce unique, humanized text per sport + question
// ---------------------------------------------------------------------------

function generatePlayerCountContent(page) {
  const sport = sports.find(s => s.id === page.sportId);
  if (!sport) return {};

  const posData = positions[page.sportId];
  const posList = posData ? posData.list || [] : [];

  const teamType = sport.tp;
  const isTeam = teamType === 'team' || teamType === 'both';

  // Try to extract a number from the rules
  let playerNum = null;
  (sport.r || []).forEach(rule => {
    const match = rule.match(/(\d+)\s*(?:players?|per team|each|a side)/i);
    if (match && !playerNum) playerNum = match[1];
  });

  const directAnswer = playerNum
    ? `A standard ${sport.n} match features ${playerNum} players per team on the field at any one time.`
    : isTeam
      ? `${sport.n} is a team sport. The exact number of players on the field depends on the format and competition rules.`
      : `${sport.n} is primarily an individual sport, though doubles or team formats may exist.`;

  const breakdown = posList.length > 0
    ? posList.map(p => ({ name: p.n, desc: p.desc }))
    : [];

  // Find similar sports for comparison
  const similarSports = sports
    .filter(s => s.id !== page.sportId && s.tp === sport.tp && s.cat === sport.cat)
    .slice(0, 5);

  if (similarSports.length < 5) {
    const more = sports
      .filter(s => s.id !== page.sportId && s.tp === sport.tp && !similarSports.find(ss => ss.id === s.id))
      .slice(0, 5 - similarSports.length);
    similarSports.push(...more);
  }

  return { directAnswer, breakdown, similarSports, playerNum, isTeam, posData };
}

function generateDurationContent(page) {
  const sport = sports.find(s => s.id === page.sportId);
  if (!sport) return {};

  const formats = sport.fmt || [];

  // Try to extract duration info from rules
  let durationHint = null;
  (sport.r || []).forEach(rule => {
    const match = rule.match(/(\d+)\s*(?:minute|min|hour|half|quarter|period|round|set)/i);
    if (match && !durationHint) durationHint = rule.replace(/\u2696\uFE0F\s*/g, '').trim();
  });

  const directAnswer = formats.length > 0
    ? `${sport.n} game duration varies by format. ${formats[0]}${formats.length > 1 ? `. Other formats include: ${formats.slice(1).join('; ')}.` : '.'}`
    : durationHint
      ? `A typical ${sport.n} match lasts based on the following structure: ${durationHint}.`
      : `The length of a ${sport.n} match depends on the competition format and level of play.`;

  const similarSports = sports
    .filter(s => s.id !== page.sportId && s.cat === sport.cat)
    .slice(0, 5);

  if (similarSports.length < 5) {
    const more = sports
      .filter(s => s.id !== page.sportId && !similarSports.find(ss => ss.id === s.id))
      .slice(0, 5 - similarSports.length);
    similarSports.push(...more);
  }

  return { directAnswer, formats, similarSports, durationHint };
}

function generatePeopleAlsoAsk(sportName, questionType, sportId) {
  if (questionType === 'how-many-players') {
    return [
      { q: `How long is a ${sportName} game?`, link: `/answers/${sportId}/game-duration` },
      { q: `What equipment do you need for ${sportName}?`, link: `/equipment/${sportId}` },
      { q: `What are the basic rules of ${sportName}?`, link: `/sports/${sportId}` },
    ];
  }
  return [
    { q: `How many players are in ${sportName}?`, link: `/answers/${sportId}/how-many-players` },
    { q: `What equipment do you need for ${sportName}?`, link: `/equipment/${sportId}` },
    { q: `What are the basic rules of ${sportName}?`, link: `/sports/${sportId}` },
  ];
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function AnswerPage() {
  const { sportId, questionSlug } = useParams();
  const navigate = useNavigate();

  const page = useMemo(() => {
    if (questionSlug === 'how-many-players') {
      return playerCountPages.find(p => p.sportId === sportId);
    }
    if (questionSlug === 'game-duration') {
      return durationPages.find(p => p.sportId === sportId);
    }
    return null;
  }, [sportId, questionSlug]);

  if (!page) {
    return (
      <div style={{ padding: 40, textAlign: 'center', ...h }}>
        <h1 style={{ fontSize: 22, fontWeight: 800, color: '#333' }}>Answer not found</h1>
        <p style={{ color: '#888', marginTop: 8 }}>We could not find that answer page. It may have been moved.</p>
        <button onClick={() => navigate('/')} style={{ marginTop: 16, padding: '10px 24px', borderRadius: 10, background: '#16a34a', color: '#fff', border: 'none', fontWeight: 700, cursor: 'pointer', ...h }}>
          Go Home
        </button>
      </div>
    );
  }

  const isPlayerCount = questionSlug === 'how-many-players';
  const content = isPlayerCount ? generatePlayerCountContent(page) : generateDurationContent(page);
  const paa = generatePeopleAlsoAsk(page.sportName, questionSlug, page.sportId);

  const questionTitle = isPlayerCount
    ? `How Many Players in ${page.sportName}?`
    : `How Long Is a ${page.sportName} Game?`;

  const schema = [
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: questionTitle,
          acceptedAnswer: {
            '@type': 'Answer',
            text: content.directAnswer,
          },
        },
        ...paa.map(p => ({
          '@type': 'Question',
          name: p.q,
          acceptedAnswer: {
            '@type': 'Answer',
            text: `Find the complete answer on SportDecoded: ${p.q}`,
          },
        })),
      ],
    },
    breadcrumbSchema([
      { name: 'Home', url: 'https://sportdecoded.com/' },
      { name: page.sportName, url: `https://sportdecoded.com/sports/${page.sportId}` },
      { name: questionTitle, url: `https://sportdecoded.com/answers/${page.sportId}/${questionSlug}` },
    ]),
  ];

  const sectionTitle = { fontSize: 18, fontWeight: 800, color: '#1a1a1a', marginBottom: 12, ...h };
  const card = { background: '#fff', borderRadius: 14, padding: '20px 22px', marginBottom: 18, boxShadow: '0 1px 4px rgba(0,0,0,0.06)' };

  return (
    <div style={{ paddingBottom: 100, background: '#fbf8f3', minHeight: '100vh' }}>
      <SEOHead
        title={page.metaTitle}
        description={page.metaDesc}
        keywords={`${page.sportName} ${isPlayerCount ? 'players, team size, how many' : 'game duration, match length, how long'}, ${page.sportName} rules`}
        canonical={`https://sportdecoded.com/answers/${page.sportId}/${questionSlug}`}
        schema={schema}
      />

      {/* Breadcrumb */}
      <nav style={{ padding: '14px 18px 0', fontSize: 12, color: '#888', ...h }}>
        <span style={{ cursor: 'pointer', color: '#2563eb' }} onClick={() => navigate('/')}>Home</span>
        {' > '}
        <span style={{ cursor: 'pointer', color: '#2563eb' }} onClick={() => navigate(`/sports/${page.sportId}`)}>{page.sportName}</span>
        {' > '}
        <span style={{ color: '#555' }}>{questionTitle}</span>
      </nav>

      {/* Hero with direct answer - featured snippet optimized */}
      <div style={{
        margin: '14px 16px 0',
        borderRadius: 16,
        background: `linear-gradient(135deg, ${page.sportColor}22, ${page.sportColor}08)`,
        border: `2px solid ${page.sportColor}30`,
        padding: '28px 22px',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
          <span style={{ fontSize: 34 }}>{page.sportEmoji}</span>
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
        <h1 style={{ fontSize: 26, fontWeight: 900, color: '#1a1a1a', lineHeight: 1.2, ...h }}>
          {questionTitle}
        </h1>

        {/* Big, bold direct answer for featured snippet */}
        <div style={{
          marginTop: 18,
          padding: '18px 20px',
          background: '#fff',
          borderRadius: 12,
          border: `2px solid ${page.sportColor}40`,
        }}>
          <p style={{ fontSize: 18, fontWeight: 700, color: '#1a1a1a', lineHeight: 1.5, ...h }}>
            {content.directAnswer}
          </p>
        </div>
      </div>

      {/* AD PLACEMENT POINT */}
      {/* AdSense ad unit can be placed here for in-content advertising */}

      {/* Detailed breakdown */}
      {isPlayerCount && content.breakdown && content.breakdown.length > 0 && (
        <div style={{ margin: '18px 16px 0' }}>
          <div style={card}>
            <h2 style={sectionTitle}>Position Breakdown</h2>
            <p style={{ fontSize: 13, color: '#888', marginBottom: 14, ...h }}>
              Each position in {page.sportName} has a specific role. Here is what every player does on the field:
            </p>
            {content.breakdown.map((pos, i) => (
              <div key={i} style={{
                padding: '12px 14px',
                borderRadius: 10,
                background: i % 2 === 0 ? '#f9f9f9' : '#fff',
                marginBottom: 6,
              }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: page.sportColor, ...h }}>{pos.name}</div>
                <p style={{ fontSize: 13, color: '#555', lineHeight: 1.5, marginTop: 4, ...h }}>{pos.desc}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Duration: format details */}
      {!isPlayerCount && content.formats && content.formats.length > 0 && (
        <div style={{ margin: '18px 16px 0' }}>
          <div style={card}>
            <h2 style={sectionTitle}>Game Formats and Durations</h2>
            <p style={{ fontSize: 13, color: '#888', marginBottom: 14, ...h }}>
              {page.sportName} can be played in several formats, each with different match lengths. Here is a look at the main ones:
            </p>
            {content.formats.map((fmt, i) => (
              <div key={i} style={{
                padding: '14px 16px',
                borderRadius: 10,
                background: i % 2 === 0 ? `${page.sportColor}08` : '#fff',
                marginBottom: 8,
                borderLeft: `4px solid ${page.sportColor}`,
              }}>
                <p style={{ fontSize: 14, fontWeight: 600, color: '#333', lineHeight: 1.5, ...h }}>{fmt}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Humanized explainer */}
      <div style={{ margin: '0 16px' }}>
        <div style={card}>
          <h2 style={sectionTitle}>
            {isPlayerCount ? 'Understanding Team Composition' : 'What Affects Game Length?'}
          </h2>
          {isPlayerCount ? (
            <>
              <p style={{ fontSize: 14, color: '#444', lineHeight: 1.7, ...h }}>
                If you are new to {page.sportName}, one of the first things you will notice is how each player has a
                distinct role. Think of it like an orchestra -- everyone plays a different instrument, but together they
                create something greater than the sum of the parts.
              </p>
              <p style={{ fontSize: 14, color: '#444', lineHeight: 1.7, marginTop: 12, ...h }}>
                {content.isTeam
                  ? `In ${page.sportName}, substitutions and tactical changes mean you might see more players involved over the course of a match than the starting lineup suggests. Coaches use their bench strategically to maintain intensity or change tactics.`
                  : `While ${page.sportName} is primarily an individual sport, team events and doubles formats add a fascinating layer of strategy. The dynamic between partners or team members can completely change how the sport is played.`
                }
              </p>
            </>
          ) : (
            <>
              <p style={{ fontSize: 14, color: '#444', lineHeight: 1.7, ...h }}>
                Several factors can influence how long a {page.sportName} match actually takes. Stoppages, weather delays,
                overtime periods, and the natural flow of play all contribute. A match that is tightly contested will often
                feel shorter than one with many interruptions, even if the clock says otherwise.
              </p>
              <p style={{ fontSize: 14, color: '#444', lineHeight: 1.7, marginTop: 12, ...h }}>
                If you are planning to watch {page.sportName} for the first time, give yourself a comfortable time buffer
                beyond the listed duration. The most memorable matches in {page.sportName} history are often the ones that
                went the distance -- and you would not want to miss the ending.
              </p>
            </>
          )}
        </div>
      </div>

      {/* AD PLACEMENT POINT */}
      {/* AdSense ad unit can be placed here for mid-content advertising */}

      {/* Comparison table */}
      {content.similarSports && content.similarSports.length > 0 && (
        <div style={{ margin: '0 16px' }}>
          <div style={card}>
            <h2 style={sectionTitle}>
              {isPlayerCount ? 'Team Sizes Compared' : 'Game Duration Compared'}
            </h2>
            <p style={{ fontSize: 13, color: '#888', marginBottom: 14, ...h }}>
              See how {page.sportName} {isPlayerCount ? 'team size' : 'match duration'} compares to similar sports:
            </p>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13, ...h }}>
                <thead>
                  <tr style={{ background: `${page.sportColor}10` }}>
                    <th style={{ padding: '10px 12px', textAlign: 'left', fontWeight: 700, color: '#333', borderBottom: '2px solid #eee' }}>Sport</th>
                    <th style={{ padding: '10px 12px', textAlign: 'left', fontWeight: 700, color: '#333', borderBottom: '2px solid #eee' }}>
                      {isPlayerCount ? 'Type' : 'Format'}
                    </th>
                    <th style={{ padding: '10px 12px', textAlign: 'left', fontWeight: 700, color: '#333', borderBottom: '2px solid #eee' }}>
                      {isPlayerCount ? 'Team Type' : 'Category'}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr style={{ background: `${page.sportColor}08`, fontWeight: 700 }}>
                    <td style={{ padding: '10px 12px', borderBottom: '1px solid #f0f0f0' }}>
                      {page.sportEmoji} {page.sportName}
                    </td>
                    <td style={{ padding: '10px 12px', borderBottom: '1px solid #f0f0f0' }}>
                      {isPlayerCount ? (page.tp || 'N/A') : ((sports.find(s => s.id === page.sportId) || {}).fmt || ['N/A'])[0]}
                    </td>
                    <td style={{ padding: '10px 12px', borderBottom: '1px solid #f0f0f0' }}>
                      {isPlayerCount ? (page.tp === 'team' ? 'Team' : page.tp === 'individual' ? 'Individual' : 'Both') : (sports.find(s => s.id === page.sportId) || {}).cat || 'N/A'}
                    </td>
                  </tr>
                  {content.similarSports.map((s, i) => (
                    <tr key={i} style={{ cursor: 'pointer' }}
                      onClick={() => navigate(`/answers/${s.id}/${questionSlug}`)}>
                      <td style={{ padding: '10px 12px', borderBottom: '1px solid #f0f0f0', color: '#2563eb' }}>
                        {s.i} {s.n}
                      </td>
                      <td style={{ padding: '10px 12px', borderBottom: '1px solid #f0f0f0', color: '#666' }}>
                        {isPlayerCount ? (s.tp || 'N/A') : (s.fmt || ['N/A'])[0]}
                      </td>
                      <td style={{ padding: '10px 12px', borderBottom: '1px solid #f0f0f0', color: '#666' }}>
                        {isPlayerCount ? (s.tp === 'team' ? 'Team' : s.tp === 'individual' ? 'Individual' : 'Both') : s.cat || 'N/A'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* People Also Ask */}
      <div style={{ margin: '0 16px' }}>
        <div style={card}>
          <h2 style={sectionTitle}>People Also Ask</h2>
          {paa.map((item, i) => (
            <div
              key={i}
              onClick={() => navigate(item.link)}
              style={{
                padding: '14px 16px',
                borderRadius: 10,
                background: '#f8f8f8',
                marginBottom: 8,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                transition: 'background 0.15s',
                ...h,
              }}
              onMouseEnter={e => e.currentTarget.style.background = '#f0f0f0'}
              onMouseLeave={e => e.currentTarget.style.background = '#f8f8f8'}
            >
              <span style={{ fontSize: 14, fontWeight: 600, color: '#2563eb' }}>{item.q}</span>
              <span style={{ fontSize: 16, color: '#999' }}>&rarr;</span>
            </div>
          ))}
        </div>
      </div>

      {/* FAQ from sport data */}
      {page.faq && page.faq.length > 0 && (
        <div style={{ margin: '0 16px' }}>
          <div style={card}>
            <h2 style={sectionTitle}>{page.sportName} Quick FAQ</h2>
            {page.faq.slice(0, 4).map((faq, i) => (
              <div key={i} style={{
                marginBottom: i < Math.min(page.faq.length, 4) - 1 ? 16 : 0,
                paddingBottom: i < Math.min(page.faq.length, 4) - 1 ? 16 : 0,
                borderBottom: i < Math.min(page.faq.length, 4) - 1 ? '1px solid #eee' : 'none',
              }}>
                <h3 style={{ fontSize: 14, fontWeight: 700, color: '#1a1a1a', marginBottom: 6, ...h }}>
                  {faq[0]}
                </h3>
                <p style={{ fontSize: 13, color: '#555', lineHeight: 1.6, ...h }}>{faq[1]}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* CTA */}
      <div style={{ margin: '0 16px' }}>
        <div style={card}>
          <h2 style={{ ...sectionTitle, textAlign: 'center' }}>Want to Learn More?</h2>
          <p style={{ fontSize: 13, color: '#888', textAlign: 'center', marginBottom: 16, ...h }}>
            Dive deeper into {page.sportName} with our comprehensive guides.
          </p>
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
              onClick={() => navigate(`/answers/${page.sportId}/${isPlayerCount ? 'game-duration' : 'how-many-players'}`)}
              style={{
                padding: '10px 20px', borderRadius: 10, background: '#f8f8f8',
                color: '#333', border: '1px solid #ddd', fontWeight: 700, fontSize: 13, cursor: 'pointer', ...h,
              }}
            >
              {isPlayerCount ? 'Game Duration' : 'Team Size'}
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
          </div>
        </div>
      </div>

      {/* AD PLACEMENT POINT */}
      {/* AdSense ad unit can be placed here for bottom-of-page advertising */}
    </div>
  );
}
