// Central index for all sport rules
// Imports only files that exist — others added as they're created

import { footballRules } from './football';
import { basketballRules } from './basketball';
import { tennisRules } from './tennis';
import { f1Rules } from './f1';
import { rugbyRules } from './rugby';
import { baseballRules } from './baseball';
import { nflRules } from './nfl';
import { golfRules } from './golf';
import { volleyballRules } from './volleyball';
import { boxingRules } from './boxing';
import { swimmingRules } from './swimming';
import { mmaRules } from './mma';

// Map sport IDs to their structured rules
export const rulesMap = {
  football: footballRules,
  basketball: basketballRules,
  tennis: tennisRules,
  f1: f1Rules,
  rugby: rugbyRules,
  baseball: baseballRules,
  nfl: nflRules,
  golf: golfRules,
  volleyball: volleyballRules,
  boxing: boxingRules,
  swimming: swimmingRules,
  mma: mmaRules,
};

// Get rules for a sport by ID — falls back to empty array
export function getRules(sportId) {
  return rulesMap[sportId] || [];
}

// Get a single rule by sport ID and rule ID
export function getRule(sportId, ruleId) {
  return getRules(sportId).find(r => r.id === ruleId) || null;
}

// Get rules grouped by category
export function getRulesByCategory(sportId) {
  const rules = getRules(sportId);
  const groups = {};
  rules.forEach(r => {
    const cat = r.category || 'general';
    if (!groups[cat]) groups[cat] = [];
    groups[cat].push(r);
  });
  return groups;
}

// Get total rule count across all sports
export function getTotalRuleCount() {
  return Object.values(rulesMap).reduce((sum, rules) => sum + rules.length, 0);
}

export default rulesMap;
