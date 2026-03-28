export const WRONG_ANSWERS = {
  playerCounts: [5, 6, 7, 8, 9, 10, 11, 12, 13, 15, 18, 22],
  durations: ['30 minutes', '45 minutes', '60 minutes', '90 minutes', '2 hours', '3 hours', '5 days'],
  distances: ['10 yards', '12 yards', '18 yards', '22 yards', '50 meters', '100 meters'],
  fieldSizes: ['50x25m', '68x34m', '91x55m', '100x64m', '120x80m'],
  speeds: ['80 km/h', '100 km/h', '130 km/h', '160 km/h', '200 km/h', '260 km/h', '360 km/h'],
  weights: ['100g', '155g', '200g', '250g', '400g', '450g', '500g'],
  heights: ['3ft', '5ft', '8ft', '10ft', '12ft', '15ft'],
  points: ['1 point', '2 points', '3 points', '4 points', '5 points', '6 points', '7 points', '10 points'],
};

export const QUESTION_TEMPLATES = [
  { type: 'rule', template: 'Which of these is an official rule in {sport}?' },
  { type: 'rule', template: 'Which rule applies to {sport}?' },
  { type: 'fact', template: 'Which fact about {sport} is true?' },
  { type: 'fact', template: 'Which of these statements about {sport} is correct?' },
  { type: 'player', template: "What is {player}'s nickname?" },
  { type: 'player', template: "Which position does {player} play?" },
  { type: 'scoring', template: 'How is a point scored in {sport}?' },
  { type: 'equipment', template: 'Which equipment is used in {sport}?' },
  { type: 'equipment', template: 'Which of these is standard equipment in {sport}?' },
  { type: 'origin', template: 'Where did {sport} originate?' },
  { type: 'number', template: 'What is the correct number related to {sport}?' },
];

export const FAKE_NICKNAMES = [
  'The Flash', 'The Hammer', 'Iron Man', 'Rocket', 'The Jet',
  'Lightning', 'The Wall', 'Golden Boy', 'The Professor', 'The Machine',
  'Big Cat', 'The Magician', 'Ice King', 'Thunder', 'The Phoenix',
  'Speed Demon', 'The Enforcer', 'Ace', 'The Captain', 'The Warrior',
];

export const FAKE_RULES = [
  'A player can score from any position on the field at any time',
  'Teams must rotate all players every 15 minutes',
  'The referee can award bonus points for sportsmanship',
  'Players are allowed to use both hands and feet simultaneously',
  'Substitutions are unlimited and can happen during live play',
  'The match is automatically won if one team leads by 20 points',
  'Each team is allowed 5 timeouts per half',
  'Players must wear numbered jerseys from 1 to 99 only',
  'The game clock stops after every single play',
  'A coin toss determines who scores first',
  'All penalties result in a direct point for the opposing team',
  'Players can challenge any call up to 10 times per match',
  'The ball must touch the ground once before each play',
  'Teams switch sides after every goal scored',
  'A player who scores 3 times earns an extra turn',
  'Night games have different rules than day games',
  'Each half must have at least 20 minutes of stoppage time',
  'Only the captain can communicate with officials',
  'Teams must field equal numbers of men and women',
  'The match is replayed if the score is tied after regulation',
];

export const FAKE_FACTS = [
  'This sport was invented in Antarctica in 1750',
  'The longest match ever lasted 72 hours continuously',
  'The sport was banned worldwide from 1900-1920',
  'Professional athletes in this sport earn an average of $50 million',
  'The original ball was made of solid gold',
  'This sport has exactly 1 billion registered professional players',
  'The first championship was held on the moon (a simulation)',
  'Robots have been competing in this sport since 2005',
  'The scoring system was designed by Albert Einstein',
  'Every match must start exactly at midnight local time',
  'Players must take a 30-minute nap at halftime',
  'The sport originally used no equipment at all',
  'Championships are held every 10 years on a floating platform',
  'The world record for this sport was set by a 5-year-old',
  'This sport requires exactly 100 officials per match',
];

export const ORIGINS = [
  'England', 'United States', 'Japan', 'China', 'France',
  'India', 'Brazil', 'Canada', 'Scotland', 'Australia',
  'Germany', 'Spain', 'Italy', 'Mexico', 'South Korea',
  'Greece', 'Egypt', 'Ireland', 'Sweden', 'Cuba',
];
