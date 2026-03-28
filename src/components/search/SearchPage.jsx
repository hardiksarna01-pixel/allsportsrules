import { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { h } from '../../constants';
import { useSearch } from '../../hooks/useSearch';
import { trending } from '../../data/trending';

const RECENT_KEY = 'sd_recent_searches';

function getRecent() {
  try {
    return JSON.parse(localStorage.getItem(RECENT_KEY)) || [];
  } catch {
    return [];
  }
}

function saveRecent(term) {
  const prev = getRecent().filter(t => t !== term);
  const next = [term, ...prev].slice(0, 10);
  localStorage.setItem(RECENT_KEY, JSON.stringify(next));
  return next;
}

function removeRecent(term) {
  const next = getRecent().filter(t => t !== term);
  localStorage.setItem(RECENT_KEY, JSON.stringify(next));
  return next;
}

// Styles
const card = {
  background: '#fff',
  borderRadius: 12,
  padding: '10px 14px',
  marginBottom: 8,
  cursor: 'pointer',
  animation: 'fadeUp .35s ease both',
  border: '1px solid #ede8e0',
};

const badge = (color) => ({
  display: 'inline-block',
  fontSize: 9,
  fontWeight: 700,
  padding: '2px 7px',
  borderRadius: 6,
  background: color + '18',
  color: color,
  marginLeft: 6,
});

const sectionHeader = {
  display: 'flex',
  alignItems: 'center',
  gap: 6,
  margin: '18px 0 8px',
  ...h,
};

const chip = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: 4,
  fontSize: 12,
  fontWeight: 600,
  padding: '5px 12px',
  borderRadius: 20,
  background: '#fff',
  border: '1px solid #ede8e0',
  cursor: 'pointer',
  ...h,
};

export default function SearchPage() {
  const navigate = useNavigate();
  const inputRef = useRef(null);
  const [input, setInput] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [recentSearches, setRecentSearches] = useState(getRecent);

  // Auto-focus
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // Debounce
  useEffect(() => {
    const id = setTimeout(() => setDebouncedQuery(input), 200);
    return () => clearTimeout(id);
  }, [input]);

  const results = useSearch(debouncedQuery);

  const doSearch = useCallback((term) => {
    setInput(term);
    setDebouncedQuery(term);
    setRecentSearches(saveRecent(term));
  }, []);

  const handleRemoveRecent = useCallback((e, term) => {
    e.stopPropagation();
    setRecentSearches(removeRecent(term));
  }, []);

  // Save search on result click
  const saveAndGo = (fn) => {
    if (debouncedQuery.trim().length >= 2) {
      setRecentSearches(saveRecent(debouncedQuery.trim()));
    }
    fn();
  };

  const hasResults = results && results.totalCount > 0;
  const noResults = results && results.totalCount === 0;
  const showEmpty = !results;

  return (
    <div style={{ padding: '0 16px 100px', background: '#fbf8f3', minHeight: '80vh' }}>
      {/* Search input */}
      <div style={{ position: 'relative', margin: '16px 0 12px' }}>
        <input
          ref={inputRef}
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Search sports, rules, players, terms..."
          style={{
            width: '100%',
            padding: '12px 16px 12px 40px',
            borderRadius: 14,
            border: '1.5px solid #ede8e0',
            background: '#fff',
            fontSize: 15,
            fontWeight: 500,
            outline: 'none',
            boxSizing: 'border-box',
            ...h,
          }}
        />
        <span style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', fontSize: 16 }}>
          {'\uD83D\uDD0D'}
        </span>
        {input && (
          <button
            onClick={() => { setInput(''); setDebouncedQuery(''); }}
            style={{
              position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)',
              background: '#e5e5e5', border: 'none', borderRadius: '50%', width: 22, height: 22,
              fontSize: 12, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: '#666',
            }}
          >
            X
          </button>
        )}
      </div>

      {/* Result count */}
      {hasResults && (
        <div style={{ fontSize: 12, fontWeight: 700, color: '#666', marginBottom: 8, ...h }}>
          {results.totalCount} result{results.totalCount !== 1 ? 's' : ''} for "{results.query}"
        </div>
      )}

      {/* No results */}
      {noResults && (
        <div style={{ textAlign: 'center', padding: '40px 0', ...h }}>
          <div style={{ fontSize: 40, marginBottom: 12 }}>{'\uD83D\uDE45'}</div>
          <div style={{ fontWeight: 700, fontSize: 16, color: '#1a1a1a', marginBottom: 6 }}>
            No results for "{results.query}"
          </div>
          <div style={{ fontSize: 13, color: '#888' }}>
            Try a different spelling or search for a sport, rule, or player name
          </div>
        </div>
      )}

      {/* Empty state */}
      {showEmpty && (
        <>
          {/* Recent searches */}
          {recentSearches.length > 0 && (
            <>
              <div style={{ ...sectionHeader, fontSize: 13, fontWeight: 700, color: '#555' }}>
                {'\uD83D\uDD53'} Recent
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                {recentSearches.map(term => (
                  <span key={term} style={chip} onClick={() => doSearch(term)}>
                    {term}
                    <span
                      onClick={(e) => handleRemoveRecent(e, term)}
                      style={{ marginLeft: 2, color: '#aaa', fontSize: 10, fontWeight: 800 }}
                    >
                      {'\u2715'}
                    </span>
                  </span>
                ))}
              </div>
            </>
          )}

          {/* Trending */}
          <div style={{ ...sectionHeader, fontSize: 13, fontWeight: 700, color: '#555' }}>
            {'\uD83D\uDD25'} Trending searches
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            {trending.slice(0, 8).map(t => (
              <div
                key={t.id}
                onClick={() => doSearch(t.q)}
                style={{
                  ...card,
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  animation: 'none',
                }}
              >
                <span style={{ fontSize: 13, fontWeight: 600, color: '#1a1a1a', ...h }}>{t.q}</span>
                <span style={{ fontSize: 10, color: '#aaa', fontWeight: 700 }}>{t.vol}</span>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Sports */}
      {hasResults && results.sports.length > 0 && (
        <>
          <div style={sectionHeader}>
            <span style={{ fontSize: 14 }}>{'\uD83C\uDFDF\uFE0F'}</span>
            <span style={{ fontWeight: 800, fontSize: 13, color: '#1a1a1a' }}>Sports</span>
            <span style={badge('#16a34a')}>{results.sports.length}</span>
          </div>
          {results.sports.map(sport => (
            <div
              key={sport.id}
              style={{ ...card, display: 'flex', alignItems: 'center', gap: 10 }}
              onClick={() => saveAndGo(() => navigate(`/sports/${sport.id}`))}
            >
              <div style={{
                width: 36, height: 36, borderRadius: 10,
                background: sport.c + '18',
                display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18,
              }}>
                {sport.i}
              </div>
              <div>
                <div style={{ fontWeight: 700, fontSize: 14, color: '#1a1a1a', ...h }}>{sport.n}</div>
                <div style={{ fontSize: 11, color: '#888' }}>{sport.cat} {sport.fans && `\u00B7 ${sport.fans} fans`}</div>
              </div>
            </div>
          ))}
        </>
      )}

      {/* Glossary */}
      {hasResults && results.glossary.length > 0 && (
        <>
          <div style={sectionHeader}>
            <span style={{ fontSize: 14 }}>{'\uD83D\uDCD6'}</span>
            <span style={{ fontWeight: 800, fontSize: 13, color: '#1a1a1a' }}>Glossary</span>
            <span style={badge('#2563eb')}>{results.glossary.length}</span>
          </div>
          {results.glossary.map(term => (
            <div
              key={term.id}
              style={card}
              onClick={() => saveAndGo(() => navigate('/glossary'))}
            >
              <div style={{ fontWeight: 700, fontSize: 13, color: '#1a1a1a', ...h }}>{term.term}</div>
              <div style={{ fontSize: 12, color: '#666', marginTop: 2, lineHeight: 1.4 }}>
                {term.def.length > 100 ? term.def.slice(0, 100) + '...' : term.def}
              </div>
              <span style={badge('#8b5cf6')}>{term.sport}</span>
            </div>
          ))}
        </>
      )}

      {/* Rules */}
      {hasResults && results.rules.length > 0 && (
        <>
          <div style={sectionHeader}>
            <span style={{ fontSize: 14 }}>{'\u2696\uFE0F'}</span>
            <span style={{ fontWeight: 800, fontSize: 13, color: '#1a1a1a' }}>Rules</span>
            <span style={badge('#dc2626')}>{results.rules.length}</span>
          </div>
          {results.rules.map((r, i) => (
            <div
              key={i}
              style={{ ...card, animationDelay: `${i * 0.04}s` }}
              onClick={() => saveAndGo(() => navigate(`/sports/${r.sport.id}`))}
            >
              <div style={{ fontSize: 12, color: '#444', lineHeight: 1.5, ...h }}>
                {r.text.length > 120 ? r.text.slice(0, 120) + '...' : r.text}
              </div>
              <span style={badge(r.sport.c)}>{r.sport.i} {r.sport.n}</span>
            </div>
          ))}
        </>
      )}

      {/* Facts */}
      {hasResults && results.facts.length > 0 && (
        <>
          <div style={sectionHeader}>
            <span style={{ fontSize: 14 }}>{'\uD83E\uDDE0'}</span>
            <span style={{ fontWeight: 800, fontSize: 13, color: '#1a1a1a' }}>Facts</span>
            <span style={badge('#f59e0b')}>{results.facts.length}</span>
          </div>
          {results.facts.map((f, i) => (
            <div
              key={i}
              style={{ ...card, animationDelay: `${i * 0.04}s` }}
              onClick={() => saveAndGo(() => navigate(`/sports/${f.sport.id}`))}
            >
              <div style={{ fontSize: 12, color: '#444', lineHeight: 1.5, ...h }}>
                {f.text.length > 120 ? f.text.slice(0, 120) + '...' : f.text}
              </div>
              <span style={badge(f.sport.c)}>{f.sport.i} {f.sport.n}</span>
            </div>
          ))}
        </>
      )}

      {/* Players */}
      {hasResults && results.players.length > 0 && (
        <>
          <div style={sectionHeader}>
            <span style={{ fontSize: 14 }}>{'\uD83D\uDC64'}</span>
            <span style={{ fontWeight: 800, fontSize: 13, color: '#1a1a1a' }}>Players</span>
            <span style={badge('#0891b2')}>{results.players.length}</span>
          </div>
          {results.players.map((p, i) => (
            <div
              key={i}
              style={{ ...card, display: 'flex', alignItems: 'center', gap: 10, animationDelay: `${i * 0.04}s` }}
              onClick={() => saveAndGo(() => navigate(`/sports/${p.sport.id}/player/${p.index}`))}
            >
              <div style={{
                width: 34, height: 34, borderRadius: '50%',
                background: p.sport.c + '18',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 15, fontWeight: 800, color: p.sport.c,
              }}>
                {p.player.nm.charAt(0)}
              </div>
              <div>
                <div style={{ fontWeight: 700, fontSize: 13, color: '#1a1a1a', ...h }}>
                  {p.player.nm}
                  {p.player.nk && <span style={{ fontWeight: 500, color: '#888' }}> "{p.player.nk}"</span>}
                </div>
                <div style={{ fontSize: 11, color: '#888' }}>{p.sport.i} {p.sport.n}</div>
              </div>
            </div>
          ))}
        </>
      )}

      {/* FAQ */}
      {hasResults && results.faq.length > 0 && (
        <>
          <div style={sectionHeader}>
            <span style={{ fontSize: 14 }}>{'\u2753'}</span>
            <span style={{ fontWeight: 800, fontSize: 13, color: '#1a1a1a' }}>FAQ</span>
            <span style={badge('#7c3aed')}>{results.faq.length}</span>
          </div>
          {results.faq.map((f, i) => (
            <div
              key={i}
              style={{ ...card, animationDelay: `${i * 0.04}s` }}
              onClick={() => saveAndGo(() => navigate(`/sports/${f.sport.id}`))}
            >
              <div style={{ fontWeight: 700, fontSize: 13, color: '#1a1a1a', ...h }}>{f.question}</div>
              <div style={{ fontSize: 12, color: '#666', marginTop: 2, lineHeight: 1.4 }}>
                {f.answer.length > 100 ? f.answer.slice(0, 100) + '...' : f.answer}
              </div>
              <span style={badge(f.sport.c)}>{f.sport.i} {f.sport.n}</span>
            </div>
          ))}
        </>
      )}
    </div>
  );
}
