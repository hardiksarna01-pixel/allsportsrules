// Central index for all sport rules
// Import individual sport rule files as they're created

import { cricketRules } from './cricket';
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
  cricket: cricketRules,
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

// Get rules for a sport by ID
export function getRules(sportId) {
  return rulesMap[sportId] || [];
}

// Get a single rule by sport ID and rule ID
export function getRule(sportId, ruleId) {
  const rules = getRules(sportId);
  return rules.find(r => r.id === ruleId) || null;
}

// Get rules by category for a sport
export function getRulesByCategory(sportId, category) {
  return getRules(sportId).filter(r => r.category === category);
}

// Get all unique categories for a sport
export function getRuleCategories(sportId) {
  const rules = getRules(sportId);
  const cats = [...new Set(rules.map(r => r.category))];
  return cats;
}

// Get total rule count across all sports
export function getTotalRuleCount() {
  return Object.values(rulesMap).reduce((sum, rules) => sum + rules.length, 0);
}

// Get all sports that have rules
export function getSportsWithRules() {
  return Object.keys(rulesMap).filter(id => rulesMap[id].length > 0);
}

export default rulesMap;
