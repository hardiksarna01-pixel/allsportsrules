import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { h } from '../../constants';
import SEOHead, { breadcrumbSchema } from '../seo/SEOHead';
import { lookupPage } from '../../data/pseo/megaIndex';

// ---------------------------------------------------------------------------
// FAQ Accordion Item
// ---------------------------------------------------------------------------
function FAQItem({ question, answer, sportColor, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div
      className="border border-gray-100 rounded-xl overflow-hidden mb-3"
      style={{ borderLeftColor: open ? sportColor : undefined, borderLeftWidth: open ? 3 : 1 }}
    >
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between px-5 py-4 text-left bg-white hover:bg-gray-50 transition-colors"
        style={h}
      >
        <span className="font-bold text-sm text-gray-900 pr-4">{question}</span>
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="text-gray-400 flex-shrink-0 text-lg"
        >
          {open ? '\u2212' : '+'}
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <p className="px-5 pb-4 text-sm text-gray-600 leading-relaxed" style={h}>
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Page-type specific renderers
// ---------------------------------------------------------------------------

function ScenarioAnswerCard({ content, sportColor }) {
  const answer = content.intro || '';
  const isYes = /^yes/i.test(answer);
  const isNo = /^no/i.test(answer);
  const badgeColor = isYes ? '#16a34a' : isNo ? '#dc2626' : sportColor;
  const badgeText = isYes ? 'Yes' : isNo ? 'No' : 'It Depends';

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.15 }}
      className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-5"
    >
      <div className="flex items-center gap-3 mb-4">
        <span
          className="px-4 py-1.5 rounded-full text-white text-sm font-bold"
          style={{ background: badgeColor, ...h }}
        >
          {badgeText}
        </span>
        <span className="text-xs font-semibold text-gray-400 uppercase tracking-wide" style={h}>
          Quick Answer
        </span>
      </div>
      <p className="text-base text-gray-800 leading-relaxed font-medium" style={h}>
        {answer}
      </p>
    </motion.div>
  );
}

function GuideSteps({ sections, sportColor }) {
  return (
    <div className="mb-5">
      {sections.map((section, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 * i }}
          className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 mb-4 flex gap-4"
        >
          <div
            className="flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center text-white text-sm font-bold"
            style={{ background: sportColor, ...h }}
          >
            {i + 1}
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-base font-bold text-gray-900 mb-2" style={h}>
              {section.heading}
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed" style={h}>
              {section.body}
            </p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

function CalcFormula({ sections, sportColor }) {
  return (
    <div className="mb-5">
      {sections.map((section, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.08 * i }}
          className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 mb-4"
        >
          <h3 className="text-base font-bold text-gray-900 mb-3" style={h}>
            {section.heading}
          </h3>
          <div
            className="rounded-xl p-4 mb-3 text-sm leading-relaxed font-mono"
            style={{ background: `${sportColor}0D`, border: `1px solid ${sportColor}30`, color: '#1a1a1a' }}
          >
            {section.body}
          </div>
        </motion.div>
      ))}
    </div>
  );
}

function HistoryTimeline({ sections, sportColor }) {
  return (
    <div className="relative mb-5 pl-6">
      <div
        className="absolute left-3 top-2 bottom-2 w-0.5 rounded-full"
        style={{ background: `${sportColor}40` }}
      />
      {sections.map((section, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, x: -12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 * i }}
          className="relative mb-5"
        >
          <div
            className="absolute -left-3 top-1.5 w-3 h-3 rounded-full border-2 border-white"
            style={{ background: sportColor }}
          />
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 ml-3">
            <h3 className="text-base font-bold text-gray-900 mb-2" style={h}>
              {section.heading}
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed" style={h}>
              {section.body}
            </p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

function StrategyBreakdown({ sections, sportColor }) {
  return (
    <div className="mb-5">
      {sections.map((section, i) => {
        const isPro = /advantage|pro|strength|benefit/i.test(section.heading);
        const isCon = /disadvantage|con|weakness|risk|drawback/i.test(section.heading);
        const icon = isPro ? '\u2705' : isCon ? '\u26A0\uFE0F' : '\u26A1';

        return (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08 * i }}
            className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 mb-4"
          >
            <div className="flex items-start gap-3">
              <span className="text-xl flex-shrink-0">{icon}</span>
              <div className="flex-1 min-w-0">
                <h3 className="text-base font-bold text-gray-900 mb-2" style={h}>
                  {section.heading}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed" style={h}>
                  {section.body}
                </p>
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}

function RecordsTable({ sections, sportColor }) {
  return (
    <div className="mb-5">
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm" style={h}>
            <thead>
              <tr style={{ background: `${sportColor}12` }}>
                <th className="px-5 py-3 text-left font-bold text-gray-700 border-b-2 border-gray-100">Record</th>
                <th className="px-5 py-3 text-left font-bold text-gray-700 border-b-2 border-gray-100">Details</th>
              </tr>
            </thead>
            <tbody>
              {sections.map((section, i) => (
                <tr key={i} className={i % 2 === 0 ? 'bg-gray-50/50' : 'bg-white'}>
                  <td className="px-5 py-3.5 font-semibold text-gray-900 border-b border-gray-50 whitespace-nowrap">
                    {section.heading}
                  </td>
                  <td className="px-5 py-3.5 text-gray-600 border-b border-gray-50 leading-relaxed">
                    {section.body}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function FormatComparison({ sections, sportColor }) {
  return (
    <div className="mb-5 space-y-4">
      {sections.map((section, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.08 * i }}
          className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5"
          style={{ borderTopColor: sportColor, borderTopWidth: 3 }}
        >
          <h3 className="text-base font-bold text-gray-900 mb-2" style={h}>
            {section.heading}
          </h3>
          <p className="text-sm text-gray-600 leading-relaxed" style={h}>
            {section.body}
          </p>
        </motion.div>
      ))}
    </div>
  );
}

function PositionDetail({ sections, sportColor }) {
  return (
    <div className="mb-5 space-y-4">
      {sections.map((section, i) => {
        const isSkills = /skill|abilit|attribute/i.test(section.heading);
        const isFamous = /famous|notable|legend|great|best/i.test(section.heading);
        const icon = isSkills ? '\uD83C\uDFAF' : isFamous ? '\u2B50' : '\uD83C\uDFBD';

        return (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.08 * i }}
            className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5"
          >
            <div className="flex items-center gap-2 mb-3">
              <span className="text-lg">{icon}</span>
              <h3 className="text-base font-bold text-gray-900" style={h}>
                {section.heading}
              </h3>
            </div>
            <p className="text-sm text-gray-600 leading-relaxed" style={h}>
              {section.body}
            </p>
          </motion.div>
        );
      })}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Render sections based on page type
// ---------------------------------------------------------------------------
function renderTypeSections(pageType, content, sportColor) {
  const sections = content.sections || [];

  switch (pageType) {
    case 'scenario':
      return (
        <>
          <ScenarioAnswerCard content={content} sportColor={sportColor} />
          {sections.map((section, i) => (
            <DefaultSection key={i} section={section} index={i} />
          ))}
        </>
      );
    case 'guide':
      return <GuideSteps sections={sections} sportColor={sportColor} />;
    case 'calc':
      return <CalcFormula sections={sections} sportColor={sportColor} />;
    case 'history':
      return <HistoryTimeline sections={sections} sportColor={sportColor} />;
    case 'strategy':
      return <StrategyBreakdown sections={sections} sportColor={sportColor} />;
    case 'records':
      return <RecordsTable sections={sections} sportColor={sportColor} />;
    case 'format':
      return <FormatComparison sections={sections} sportColor={sportColor} />;
    case 'positions':
      return <PositionDetail sections={sections} sportColor={sportColor} />;
    case 'learn':
    default:
      return sections.map((section, i) => (
        <DefaultSection key={i} section={section} index={i} />
      ));
  }
}

function DefaultSection({ section, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.08 * index }}
      className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 mb-4"
    >
      <h3 className="text-base font-bold text-gray-900 mb-3" style={h}>
        {section.heading}
      </h3>
      <p className="text-sm text-gray-600 leading-relaxed" style={h}>
        {section.body}
      </p>
    </motion.div>
  );
}

// ---------------------------------------------------------------------------
// Subtitle text per page type
// ---------------------------------------------------------------------------
function getSubtitle(pageType, sportName) {
  switch (pageType) {
    case 'learn':
      return `A complete guide to understanding this ${sportName} concept`;
    case 'scenario':
      return `${sportName} rules explained for this specific situation`;
    case 'guide':
      return `Step-by-step ${sportName} guide with clear instructions`;
    case 'calc':
      return `How this ${sportName} calculation works, with examples`;
    case 'history':
      return `The history and evolution of this ${sportName} topic`;
    case 'strategy':
      return `Strategic breakdown and analysis for ${sportName}`;
    case 'records':
      return `Records, stats, and notable achievements in ${sportName}`;
    case 'format':
      return `Game format breakdown and comparison for ${sportName}`;
    case 'positions':
      return `Position roles, skills, and responsibilities in ${sportName}`;
    default:
      return `Everything you need to know about this ${sportName} topic`;
  }
}

// ---------------------------------------------------------------------------
// UniversalPage Component
// ---------------------------------------------------------------------------
export default function UniversalPage() {
  const { sportId, slug, matchup, topic } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const page = useMemo(() => {
    // Determine page type from URL path prefix
    const path = location.pathname;
    const typeMap = { '/learn/': 'learn', '/scenario/': 'scenario', '/guide/': 'guide', '/calc/': 'calc', '/history/': 'history', '/strategy/': 'strategy', '/records/': 'records', '/format/': 'format', '/positions/': 'positions', '/vs/': 'compare' };
    let pageType = 'learn';
    for (const [prefix, type] of Object.entries(typeMap)) {
      if (path.startsWith(prefix)) { pageType = type; break; }
    }
    // Handle /vs/:matchup/:topic route
    if (pageType === 'compare') {
      return lookupPage('compare', matchup, topic);
    }
    return lookupPage(pageType, sportId, slug);
  }, [sportId, slug, matchup, topic, location.pathname]);

  // ------ Not Found ------
  if (!page) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl border border-gray-100 shadow-sm p-10 text-center max-w-md w-full"
        >
          <div className="text-5xl mb-4">{'\uD83E\uDD14'}</div>
          <h1 className="text-xl font-extrabold text-gray-800 mb-2" style={h}>
            Page Not Found
          </h1>
          <p className="text-sm text-gray-500 mb-6 leading-relaxed" style={h}>
            We could not find the page you were looking for. It may have been moved or
            the URL might be incorrect.
          </p>
          <div className="flex gap-3 justify-center flex-wrap">
            {sportId && (
              <button
                onClick={() => navigate(`/sports/${sportId}`)}
                className="px-5 py-2.5 rounded-xl text-white text-sm font-bold cursor-pointer border-none"
                style={{ background: '#16a34a', ...h }}
              >
                Back to Sport
              </button>
            )}
            <button
              onClick={() => navigate('/')}
              className="px-5 py-2.5 rounded-xl bg-gray-100 text-gray-700 text-sm font-bold cursor-pointer border border-gray-200"
              style={h}
            >
              Go Home
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  const { title, metaTitle, metaDesc, sportName, sportColor, sportEmoji, pageType, content } = page;
  const { intro, sections = [], keyPoints = [], faq = [], relatedLinks = [], funFact } = content || {};

  // ------ Canonical URL ------
  const basePath = intent ? `/${intent}/${sportId}/${slug}` : `/learn/${sportId}/${slug}`;
  const canonicalUrl = `https://sportdecoded.com${basePath}`;

  // ------ JSON-LD Structured Data ------
  const schema = [
    {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: metaTitle,
      description: metaDesc,
      author: { '@type': 'Organization', name: 'SportDecoded' },
      publisher: {
        '@type': 'Organization',
        name: 'SportDecoded',
        url: 'https://sportdecoded.com',
      },
      url: canonicalUrl,
      mainEntityOfPage: canonicalUrl,
      datePublished: '2025-01-01',
      dateModified: new Date().toISOString().split('T')[0],
    },
    ...(faq.length > 0
      ? [
          {
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: faq.map(f => ({
              '@type': 'Question',
              name: f.q,
              acceptedAnswer: { '@type': 'Answer', text: f.a },
            })),
          },
        ]
      : []),
    breadcrumbSchema([
      { name: 'Home', url: 'https://sportdecoded.com/' },
      { name: sportName, url: `https://sportdecoded.com/sports/${sportId}` },
      { name: title, url: canonicalUrl },
    ]),
  ];

  return (
    <div className="min-h-screen pb-24" style={{ background: '#fbf8f3' }}>
      <SEOHead
        title={metaTitle}
        description={metaDesc}
        keywords={`${sportName}, ${title}, ${sportName} rules, ${pageType}, sport rules explained`}
        canonical={canonicalUrl}
        schema={schema}
      />

      {/* ---- Breadcrumb ---- */}
      <nav className="px-4 pt-3.5 text-xs" style={{ color: '#888', ...h }}>
        <span
          className="cursor-pointer text-blue-600 hover:underline"
          onClick={() => navigate('/')}
        >
          Home
        </span>
        {' > '}
        <span
          className="cursor-pointer text-blue-600 hover:underline"
          onClick={() => navigate(`/sports/${sportId}`)}
        >
          {sportName}
        </span>
        {' > '}
        <span className="text-gray-500">{title}</span>
      </nav>

      {/* ---- Hero Header ---- */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="mx-4 mt-3.5 rounded-2xl p-7"
        style={{
          background: `linear-gradient(135deg, ${sportColor}22, ${sportColor}08)`,
          border: `2px solid ${sportColor}30`,
        }}
      >
        <div className="flex items-center gap-2.5 mb-3">
          <span className="text-3xl">{sportEmoji}</span>
          <span
            className="px-3 py-1 rounded-full text-white text-xs font-bold"
            style={{ background: sportColor, ...h }}
          >
            {sportName}
          </span>
          <span
            className="px-3 py-1 rounded-full text-xs font-semibold capitalize"
            style={{ background: `${sportColor}18`, color: sportColor, ...h }}
          >
            {pageType}
          </span>
        </div>
        <h1 className="text-2xl font-black text-gray-900 leading-tight" style={h}>
          {title}
        </h1>
        <p className="text-sm text-gray-500 mt-2" style={h}>
          {getSubtitle(pageType, sportName)}
        </p>
      </motion.div>

      {/* ---- Intro Paragraph ---- */}
      {intro && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mx-4 mt-5"
        >
          <div
            className="bg-white rounded-2xl border shadow-sm p-5"
            style={{ borderColor: `${sportColor}40`, borderWidth: 2, background: `${sportColor}06` }}
          >
            <div
              className="text-xs font-extrabold uppercase tracking-widest mb-2"
              style={{ color: sportColor, ...h }}
            >
              Overview
            </div>
            <p className="text-base text-gray-800 leading-relaxed font-medium" style={h}>
              {intro}
            </p>
          </div>
        </motion.div>
      )}

      {/* ---- Fun Fact ---- */}
      {funFact && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="mx-4 mt-4"
        >
          <div className="bg-amber-50 rounded-2xl border border-amber-200 shadow-sm p-5 flex gap-3 items-start">
            <span className="text-2xl flex-shrink-0">{'\uD83D\uDCA1'}</span>
            <div>
              <div className="text-xs font-extrabold text-amber-700 uppercase tracking-widest mb-1" style={h}>
                Fun Fact
              </div>
              <p className="text-sm text-amber-900 leading-relaxed" style={h}>
                {funFact}
              </p>
            </div>
          </div>
        </motion.div>
      )}

      {/* ---- Main Content Sections (type-specific rendering) ---- */}
      <div className="mx-4 mt-5">
        {renderTypeSections(pageType, content || {}, sportColor)}
      </div>

      {/* ---- Key Points ---- */}
      {keyPoints.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mx-4 mt-1"
        >
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <h2 className="text-lg font-extrabold text-gray-900 mb-4" style={h}>
              Key Takeaways
            </h2>
            <ul className="space-y-3">
              {keyPoints.map((point, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span
                    className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold mt-0.5"
                    style={{ background: sportColor, ...h }}
                  >
                    {i + 1}
                  </span>
                  <span className="text-sm text-gray-700 leading-relaxed" style={h}>
                    {point}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      )}

      {/* ---- FAQ Accordion ---- */}
      {faq.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="mx-4 mt-5"
        >
          <h2 className="text-lg font-extrabold text-gray-900 mb-4" style={h}>
            Frequently Asked Questions
          </h2>
          {faq.map((item, i) => (
            <FAQItem
              key={i}
              question={item.q}
              answer={item.a}
              sportColor={sportColor}
              defaultOpen={i === 0}
            />
          ))}
        </motion.div>
      )}

      {/* ---- Related Links ---- */}
      {relatedLinks.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mx-4 mt-5"
        >
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <h2 className="text-lg font-extrabold text-gray-900 mb-4" style={h}>
              Related Topics
            </h2>
            <div className="space-y-2">
              {relatedLinks.map((link, i) => (
                <div
                  key={i}
                  onClick={() => navigate(link.url)}
                  className="flex items-center justify-between px-4 py-3 rounded-xl bg-gray-50 hover:bg-gray-100 cursor-pointer transition-colors"
                  style={h}
                >
                  <span className="text-sm font-semibold text-blue-600">
                    {link.title}
                  </span>
                  <span className="text-gray-400 text-base">&rarr;</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* ---- Back to Sport CTA ---- */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35 }}
        className="mx-4 mt-6"
      >
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 text-center">
          <h2 className="text-lg font-extrabold text-gray-900 mb-2" style={h}>
            Explore More {sportName}
          </h2>
          <p className="text-sm text-gray-500 mb-5" style={h}>
            Dive deeper into the rules, strategies, and history of {sportName}.
          </p>
          <div className="flex gap-3 justify-center flex-wrap">
            <button
              onClick={() => navigate(`/sports/${sportId}`)}
              className="px-5 py-2.5 rounded-xl text-white text-sm font-bold cursor-pointer border-none"
              style={{ background: sportColor, ...h }}
            >
              {sportEmoji} Full {sportName} Guide
            </button>
            <button
              onClick={() => navigate('/quiz')}
              className="px-5 py-2.5 rounded-xl bg-gray-100 text-gray-700 text-sm font-bold cursor-pointer border border-gray-200"
              style={h}
            >
              Test Your Knowledge
            </button>
            <button
              onClick={() => navigate('/ai')}
              className="px-5 py-2.5 rounded-xl bg-gray-100 text-gray-700 text-sm font-bold cursor-pointer border border-gray-200"
              style={h}
            >
              Ask AI Tutor
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
