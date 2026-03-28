import { useMemo } from 'react';
import { sports } from '../data/sports';
import { glossary } from '../data/glossary';

export function useSearch(query) {
  return useMemo(() => {
    if (!query || query.trim().length < 2) return null;

    const q = query.toLowerCase().trim();
    const results = { sports: [], rules: [], facts: [], players: [], glossary: [], faq: [] };

    // Search sports by name
    sports.forEach(sport => {
      if (sport.n.toLowerCase().includes(q)) {
        results.sports.push({ ...sport, matchType: 'name' });
      }

      // Search rules
      if (sport.r) {
        sport.r.forEach((rule, i) => {
          if (rule.toLowerCase().includes(q)) {
            results.rules.push({ text: rule, sport: sport, index: i });
          }
        });
      }

      // Search facts
      if (sport.f) {
        sport.f.forEach((fact, i) => {
          if (fact.toLowerCase().includes(q)) {
            results.facts.push({ text: fact, sport: sport, index: i });
          }
        });
      }

      // Search players
      if (sport.p) {
        sport.p.forEach((player, i) => {
          if (player.nm.toLowerCase().includes(q) || (player.nk && player.nk.toLowerCase().includes(q))) {
            results.players.push({ player, sport, index: i });
          }
        });
      }

      // Search FAQs
      if (sport.faq) {
        sport.faq.forEach(([question, answer]) => {
          if (question.toLowerCase().includes(q) || answer.toLowerCase().includes(q)) {
            results.faq.push({ question, answer, sport });
          }
        });
      }
    });

    // Search glossary
    glossary.forEach(term => {
      if (term.term.toLowerCase().includes(q) || term.def.toLowerCase().includes(q)) {
        results.glossary.push(term);
      }
    });

    // Limit results per category
    Object.keys(results).forEach(key => {
      results[key] = results[key].slice(0, 8);
    });

    const totalCount = Object.values(results).reduce((sum, arr) => sum + arr.length, 0);

    return { ...results, totalCount, query: q };
  }, [query]);
}
