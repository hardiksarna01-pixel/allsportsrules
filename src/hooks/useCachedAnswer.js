import { useState, useCallback } from 'react';
import { knowledgeBase } from '../data/knowledgeBase';
import { sports } from '../data/sports/index';
import { glossary } from '../data/glossary';

/**
 * useCachedAnswer — Three-tier lookup hook for answering sports questions
 *
 * Tier 1: knowledgeBase cache (instant, free)
 * Tier 2: search sports rules + glossary data (instant, free)
 * Tier 3: fall back to Claude API (async, costs tokens)
 *
 * Returns: { text, source: 'cache' | 'data' | 'api', loading, error, lookup }
 */

// Normalize a query string for matching
function normalize(str) {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9 ]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

// Tier 1: Check the pre-built knowledge base cache
function searchKnowledgeBase(query) {
  const norm = normalize(query);

  // Exact match
  if (knowledgeBase[norm]) {
    return knowledgeBase[norm];
  }

  // Fuzzy match — find the best key that the query contains or that contains the query
  let bestMatch = null;
  let bestScore = 0;

  for (const [key, value] of Object.entries(knowledgeBase)) {
    // Check if the query contains this key
    if (norm.includes(key) || key.includes(norm)) {
      const score = key.length; // longer key = more specific = better match
      if (score > bestScore) {
        bestScore = score;
        bestMatch = value;
      }
    }

    // Word overlap scoring
    const queryWords = norm.split(' ');
    const keyWords = key.split(' ');
    const overlap = keyWords.filter((w) => queryWords.includes(w)).length;
    const overlapScore = overlap / keyWords.length;
    if (overlapScore > 0.6 && overlap > bestScore) {
      bestScore = overlap;
      bestMatch = value;
    }
  }

  return bestMatch;
}

// Tier 2: Search sports rules and glossary data
function searchSportsData(query) {
  const norm = normalize(query);
  const queryWords = norm.split(' ');

  // Search glossary terms
  for (const entry of glossary) {
    const termNorm = normalize(entry.term);
    const searchNorm = normalize(entry.search || '');

    // Direct term match
    if (norm.includes(termNorm) || termNorm.includes(norm)) {
      return `${entry.term} (${entry.sport}): ${entry.def}`;
    }

    // Search field overlap
    const searchWords = searchNorm.split(' ');
    const overlap = queryWords.filter((w) => searchWords.includes(w)).length;
    if (overlap >= 2) {
      return `${entry.term} (${entry.sport}): ${entry.def}`;
    }
  }

  // Search sports rules
  for (const sport of sports) {
    const sportNorm = normalize(sport.n);
    if (!queryWords.some((w) => sportNorm.includes(w) || normalize(sport.id).includes(w))) {
      continue; // skip sports not mentioned in query
    }

    // Search through rules
    if (sport.r) {
      for (const rule of sport.r) {
        const ruleNorm = normalize(rule);
        const ruleWords = ruleNorm.split(' ');
        const overlap = queryWords.filter((w) => ruleWords.includes(w)).length;
        if (overlap >= 2) {
          return `${sport.n}: ${rule.replace(/^[^\s]+ /, '')}`; // strip emoji prefix
        }
      }
    }

    // Search through facts
    if (sport.f) {
      for (const fact of sport.f) {
        const factNorm = normalize(fact);
        const factWords = factNorm.split(' ');
        const overlap = queryWords.filter((w) => factWords.includes(w)).length;
        if (overlap >= 2) {
          return `${sport.n} fact: ${fact}`;
        }
      }
    }
  }

  return null;
}

// Tier 3: Claude API fallback
async function askClaudeAPI(query) {
  // This expects REACT_APP_CLAUDE_API_ENDPOINT to be set in .env
  const endpoint = process.env.REACT_APP_CLAUDE_API_ENDPOINT;
  if (!endpoint) {
    throw new Error('No Claude API endpoint configured. Set REACT_APP_CLAUDE_API_ENDPOINT in your .env file.');
  }

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      query,
      context: 'sports rules and regulations',
      max_tokens: 300,
    }),
  });

  if (!response.ok) {
    throw new Error(`API error: ${response.status}`);
  }

  const data = await response.json();
  return data.answer || data.text || data.content || '';
}

/**
 * Main hook
 */
export function useCachedAnswer() {
  const [text, setText] = useState('');
  const [source, setSource] = useState(null); // 'cache' | 'data' | 'api'
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const lookup = useCallback(async (query) => {
    if (!query || !query.trim()) {
      setText('');
      setSource(null);
      setError(null);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Tier 1: Knowledge base cache
      const cached = searchKnowledgeBase(query);
      if (cached) {
        setText(cached);
        setSource('cache');
        setLoading(false);
        return { text: cached, source: 'cache' };
      }

      // Tier 2: Sports data search
      const dataResult = searchSportsData(query);
      if (dataResult) {
        setText(dataResult);
        setSource('data');
        setLoading(false);
        return { text: dataResult, source: 'data' };
      }

      // Tier 3: Claude API fallback
      try {
        const apiResult = await askClaudeAPI(query);
        setText(apiResult);
        setSource('api');
        setLoading(false);
        return { text: apiResult, source: 'api' };
      } catch (apiErr) {
        // If API fails, provide a helpful message
        const fallback = `I don't have a cached answer for "${query}". Please check our sports rules pages or glossary for more information.`;
        setText(fallback);
        setSource('data');
        setError(apiErr.message);
        setLoading(false);
        return { text: fallback, source: 'data' };
      }
    } catch (err) {
      setError(err.message);
      setLoading(false);
      return { text: '', source: null, error: err.message };
    }
  }, []);

  return { text, source, loading, error, lookup };
}

export default useCachedAnswer;
