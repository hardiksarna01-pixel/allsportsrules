import { useParams, useNavigate } from 'react-router-dom';
import { useMemo } from 'react';
import { h } from '../../constants';
import SEOHead, { breadcrumbSchema } from '../seo/SEOHead';
import { equipmentPages } from '../../data/pSEO';

// ---------------------------------------------------------------------------
// Humanized content generators
// ---------------------------------------------------------------------------

function categorizeEquipment(equipment) {
  // Split equipment into beginner-essential and advanced/pro items
  const essential = [];
  const advanced = [];

  equipment.forEach((item, i) => {
    // First half of equipment list tends to be more essential
    if (i < Math.ceil(equipment.length / 2)) {
      essential.push(item);
    } else {
      advanced.push(item);
    }
  });

  return { essential, advanced };
}

function generateEquipmentIntro(sportName, equipment) {
  const intros = [
    `Getting started with ${sportName} does not require a massive investment, but having the right gear makes a world of difference. Whether you are a complete beginner picking up the sport for the first time or an experienced player looking to upgrade, this guide covers everything you need.`,
    `One of the great things about ${sportName} is that the basic equipment is straightforward. You do not need to be an expert to pick the right gear -- you just need to know what matters and what does not. Here is your complete ${sportName} equipment breakdown.`,
    `Before you step onto the field (or court, or track), you need the right equipment. ${sportName} has specific gear requirements, and understanding what each piece does will help you make smart purchasing decisions. Let us walk through everything from essential to optional.`,
  ];
  return intros[sportName.length % intros.length];
}

function generateBuyingTips(sportName) {
  return [
    { tip: 'Start with the basics', detail: `If you are new to ${sportName}, do not overspend on premium gear right away. Entry-level equipment from reputable brands is more than enough to learn the fundamentals and enjoy the sport.` },
    { tip: 'Prioritize fit and comfort', detail: `The most expensive gear in ${sportName} is worthless if it does not fit properly. Comfort directly affects your performance and enjoyment. Try before you buy when possible.` },
    { tip: 'Check league or club requirements', detail: `Different ${sportName} leagues, clubs, and age groups may have specific equipment requirements. Always check with your organization before purchasing to avoid buying the wrong specification.` },
    { tip: 'Invest in safety equipment first', detail: `If ${sportName} requires protective gear, this is where you should spend a little more. Quality safety equipment protects you and lasts longer -- it is not the place to cut corners.` },
  ];
}

function generateFAQs(sportName, equipment) {
  return [
    {
      q: `What equipment do I need to start playing ${sportName}?`,
      a: `The essential equipment for ${sportName} includes: ${equipment.slice(0, 3).join(', ')}. As a beginner, focus on getting these basics right before investing in advanced gear.`,
    },
    {
      q: `How much does ${sportName} equipment cost?`,
      a: `Beginner-level ${sportName} equipment can start from a modest budget. Entry-level sets are available at most sporting goods stores. As you progress, you may choose to invest in higher-quality items that can cost significantly more.`,
    },
    {
      q: `Where can I buy ${sportName} equipment?`,
      a: `${sportName} equipment is available at sporting goods stores, specialist retailers, and major online marketplaces. For beginners, a general sports store is usually the best starting point. Specialist shops offer expert advice as you advance.`,
    },
    {
      q: `How often should I replace my ${sportName} gear?`,
      a: `It depends on how frequently you play and the type of equipment. Safety gear should be inspected regularly and replaced when damaged. Performance equipment like footwear typically needs replacing more often than structural items.`,
    },
  ];
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function EquipmentPage() {
  const { sportId } = useParams();
  const navigate = useNavigate();

  const page = useMemo(() => {
    return equipmentPages.find(p => p.sportId === sportId);
  }, [sportId]);

  if (!page) {
    return (
      <div style={{ padding: 40, textAlign: 'center', ...h }}>
        <h1 style={{ fontSize: 22, fontWeight: 800, color: '#333' }}>Equipment guide not found</h1>
        <p style={{ color: '#888', marginTop: 8 }}>We could not find that equipment guide. It may not be available yet.</p>
        <button onClick={() => navigate('/')} style={{ marginTop: 16, padding: '10px 24px', borderRadius: 10, background: '#16a34a', color: '#fff', border: 'none', fontWeight: 700, cursor: 'pointer', ...h }}>
          Go Home
        </button>
      </div>
    );
  }

  const equipment = page.equipment || [];
  const { essential, advanced } = categorizeEquipment(equipment);
  const intro = generateEquipmentIntro(page.sportName, equipment);
  const buyingTips = generateBuyingTips(page.sportName);
  const faqs = generateFAQs(page.sportName, equipment);

  const schema = [
    {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: page.metaTitle,
      description: page.metaDesc,
      author: { '@type': 'Organization', name: 'SportDecoded' },
      publisher: { '@type': 'Organization', name: 'SportDecoded', url: 'https://sportdecoded.com' },
      url: `https://sportdecoded.com/equipment/${page.sportId}`,
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
      { name: 'Equipment Guide', url: `https://sportdecoded.com/equipment/${page.sportId}` },
    ]),
  ];

  const sectionTitle = { fontSize: 18, fontWeight: 800, color: '#1a1a1a', marginBottom: 12, ...h };
  const card = { background: '#fff', borderRadius: 14, padding: '20px 22px', marginBottom: 18, boxShadow: '0 1px 4px rgba(0,0,0,0.06)' };

  return (
    <div style={{ paddingBottom: 100, background: '#fbf8f3', minHeight: '100vh' }}>
      <SEOHead
        title={page.metaTitle}
        description={page.metaDesc}
        keywords={`${page.sportName} equipment, ${page.sportName} gear, what you need for ${page.sportName}, ${page.sportName} beginner equipment`}
        canonical={`https://sportdecoded.com/equipment/${page.sportId}`}
        schema={schema}
      />

      {/* Breadcrumb */}
      <nav style={{ padding: '14px 18px 0', fontSize: 12, color: '#888', ...h }}>
        <span style={{ cursor: 'pointer', color: '#2563eb' }} onClick={() => navigate('/')}>Home</span>
        {' > '}
        <span style={{ cursor: 'pointer', color: '#2563eb' }} onClick={() => navigate(`/sports/${page.sportId}`)}>{page.sportName}</span>
        {' > '}
        <span style={{ color: '#555' }}>Equipment Guide</span>
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
          {page.sportName} Equipment Guide
        </h1>
        <p style={{ fontSize: 14, color: '#555', marginTop: 8, lineHeight: 1.5, ...h }}>
          Everything you need to play {page.sportName} -- from essential gear to pro-level upgrades.
        </p>
      </div>

      {/* Introduction */}
      <div style={{ margin: '18px 16px 0' }}>
        <div style={card}>
          <p style={{ fontSize: 14, color: '#444', lineHeight: 1.7, ...h }}>{intro}</p>
        </div>
      </div>

      {/* AD PLACEMENT POINT */}
      {/* AdSense ad unit can be placed here for in-content advertising */}

      {/* Complete Equipment List */}
      <div style={{ margin: '0 16px' }}>
        <div style={card}>
          <h2 style={sectionTitle}>Complete Equipment List</h2>
          <p style={{ fontSize: 13, color: '#888', marginBottom: 14, ...h }}>
            Here is everything used in {page.sportName}, with specifications where available:
          </p>
          {equipment.map((item, i) => (
            <div key={i} style={{
              padding: '14px 16px',
              borderRadius: 10,
              background: i % 2 === 0 ? `${page.sportColor}06` : '#fff',
              marginBottom: 8,
              borderLeft: `4px solid ${page.sportColor}`,
              display: 'flex',
              alignItems: 'flex-start',
              gap: 12,
            }}>
              <div style={{
                width: 28, height: 28, borderRadius: '50%',
                background: `${page.sportColor}20`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 12, fontWeight: 800, color: page.sportColor, flexShrink: 0, ...h,
              }}>
                {i + 1}
              </div>
              <div>
                <p style={{ fontSize: 14, fontWeight: 600, color: '#333', lineHeight: 1.5, ...h }}>{item}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Essential for Beginners */}
      <div style={{ margin: '0 16px' }}>
        <div style={{
          ...card,
          border: `2px solid #16a34a30`,
          background: '#16a34a05',
        }}>
          <h2 style={{ ...sectionTitle, color: '#16a34a' }}>Essential for Beginners</h2>
          <p style={{ fontSize: 13, color: '#888', marginBottom: 14, ...h }}>
            Just starting out? Focus on these items first. You can always add more as you progress:
          </p>
          {essential.map((item, i) => (
            <div key={i} style={{
              padding: '12px 14px', borderRadius: 10, background: '#fff',
              marginBottom: 6, display: 'flex', alignItems: 'center', gap: 10,
            }}>
              <span style={{ color: '#16a34a', fontSize: 16, fontWeight: 700 }}>&#10003;</span>
              <span style={{ fontSize: 14, color: '#333', ...h }}>{item}</span>
            </div>
          ))}
          <p style={{ fontSize: 13, color: '#666', marginTop: 14, lineHeight: 1.6, ...h }}>
            As a beginner, the most important thing is to get playing. Do not let the equipment list overwhelm you --
            many clubs and facilities offer rental equipment for newcomers. Start with the basics and upgrade as your
            skills and commitment grow.
          </p>
          {/* AFFILIATE LINK PLACEHOLDER */}
          {/* Affiliate links to beginner equipment bundles can be placed here */}
        </div>
      </div>

      {/* AD PLACEMENT POINT */}
      {/* AdSense ad unit can be placed here for mid-content advertising */}

      {/* Pro Level */}
      {advanced.length > 0 && (
        <div style={{ margin: '0 16px' }}>
          <div style={{
            ...card,
            border: `2px solid ${page.sportColor}30`,
            background: `${page.sportColor}05`,
          }}>
            <h2 style={{ ...sectionTitle, color: page.sportColor }}>Pro-Level Gear</h2>
            <p style={{ fontSize: 13, color: '#888', marginBottom: 14, ...h }}>
              Ready to take your {page.sportName} to the next level? These items are worth investing in as you advance:
            </p>
            {advanced.map((item, i) => (
              <div key={i} style={{
                padding: '12px 14px', borderRadius: 10, background: '#fff',
                marginBottom: 6, display: 'flex', alignItems: 'center', gap: 10,
              }}>
                <span style={{ color: page.sportColor, fontSize: 14, fontWeight: 700 }}>&#9733;</span>
                <span style={{ fontSize: 14, color: '#333', ...h }}>{item}</span>
              </div>
            ))}
            <p style={{ fontSize: 13, color: '#666', marginTop: 14, lineHeight: 1.6, ...h }}>
              Professional-grade {page.sportName} equipment is designed for players who are training seriously and
              competing regularly. The difference in quality is noticeable -- better materials, improved ergonomics,
              and greater durability. However, skill development matters far more than equipment at every level.
            </p>
            {/* AFFILIATE LINK PLACEHOLDER */}
            {/* Affiliate links to pro-level equipment can be placed here */}
          </div>
        </div>
      )}

      {/* Buying Tips */}
      <div style={{ margin: '0 16px' }}>
        <div style={card}>
          <h2 style={sectionTitle}>Smart Buying Tips</h2>
          {buyingTips.map((tip, i) => (
            <div key={i} style={{
              marginBottom: i < buyingTips.length - 1 ? 16 : 0,
              paddingBottom: i < buyingTips.length - 1 ? 16 : 0,
              borderBottom: i < buyingTips.length - 1 ? '1px solid #eee' : 'none',
            }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: page.sportColor, marginBottom: 4, ...h }}>
                {i + 1}. {tip.tip}
              </div>
              <p style={{ fontSize: 13, color: '#555', lineHeight: 1.6, ...h }}>{tip.detail}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Where to Buy */}
      <div style={{ margin: '0 16px' }}>
        <div style={card}>
          <h2 style={sectionTitle}>Where to Buy {page.sportName} Equipment</h2>
          <p style={{ fontSize: 14, color: '#444', lineHeight: 1.7, ...h }}>
            You have several great options for purchasing {page.sportName} gear:
          </p>
          <div style={{ marginTop: 12 }}>
            {[
              { place: 'Local sporting goods stores', desc: 'Great for trying items in person. Staff can help with sizing and fit.' },
              { place: 'Specialist retailers', desc: `Shops that focus on ${page.sportName} will have the widest selection and most knowledgeable staff.` },
              { place: 'Online marketplaces', desc: 'Often the best prices. Read reviews carefully and check size guides.' },
              { place: 'Club or team pro shops', desc: 'If you join a club, they often have relationships with suppliers for discounted gear.' },
            ].map((option, i) => (
              <div key={i} style={{
                padding: '10px 14px', borderRadius: 8,
                background: i % 2 === 0 ? '#f9f9f9' : '#fff',
                marginBottom: 6,
              }}>
                <span style={{ fontSize: 13, fontWeight: 700, color: '#333', ...h }}>{option.place}</span>
                <span style={{ fontSize: 13, color: '#666', ...h }}> -- {option.desc}</span>
              </div>
            ))}
          </div>
          {/* AFFILIATE LINK PLACEHOLDER */}
          {/* Affiliate links to recommended retailers can be placed here */}
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

      {/* CTA */}
      <div style={{ margin: '0 16px' }}>
        <div style={card}>
          <h2 style={{ ...sectionTitle, textAlign: 'center' }}>Ready to Play {page.sportName}?</h2>
          <p style={{ fontSize: 13, color: '#888', textAlign: 'center', marginBottom: 16, ...h }}>
            Now that you know what gear you need, learn the rules and start playing.
          </p>
          <div style={{ display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap' }}>
            <button
              onClick={() => navigate(`/sports/${page.sportId}`)}
              style={{
                padding: '10px 20px', borderRadius: 10, background: page.sportColor,
                color: '#fff', border: 'none', fontWeight: 700, fontSize: 13, cursor: 'pointer', ...h,
              }}
            >
              Learn {page.sportName} Rules
            </button>
            <button
              onClick={() => navigate(`/sports/${page.sportId}/beginners`)}
              style={{
                padding: '10px 20px', borderRadius: 10, background: '#f8f8f8',
                color: '#333', border: '1px solid #ddd', fontWeight: 700, fontSize: 13, cursor: 'pointer', ...h,
              }}
            >
              Beginner Guide
            </button>
            <button
              onClick={() => navigate('/quiz')}
              style={{
                padding: '10px 20px', borderRadius: 10, background: '#f8f8f8',
                color: '#333', border: '1px solid #ddd', fontWeight: 700, fontSize: 13, cursor: 'pointer', ...h,
              }}
            >
              Take a Quiz
            </button>
          </div>
        </div>
      </div>

      {/* AD PLACEMENT POINT */}
      {/* AdSense ad unit can be placed here for bottom-of-page advertising */}
    </div>
  );
}
