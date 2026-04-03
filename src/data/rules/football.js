export const footballRules = [
  {
    id: 'football-rule-1',
    rule: 1,
    title: 'The Field of Play',
    short: 'Dimensions and markings of the pitch.',
    full: 'The field of play must be rectangular and marked with continuous lines. The length (touchline) must be between 100 and 110 metres for international matches, and the width (goal line) between 64 and 75 metres. The field is divided into two halves by a halfway line, with a centre circle of 9.15 metres radius. The penalty area extends 16.5 metres from each goalpost and 16.5 metres into the field, with a penalty mark 11 metres from the midpoint between the goalposts. Goals must be 7.32 metres wide and 2.44 metres high, placed on the centre of each goal line.',
    category: 'field',
    img: '/images/football/field-of-play.webp',
    sub: []
  },
  {
    id: 'football-rule-2',
    rule: 2,
    title: 'The Ball',
    short: 'Specifications for the match ball.',
    full: 'The ball must be spherical, made of suitable material, with a circumference between 68 and 70 centimetres and a weight between 410 and 450 grams at the start of the match. The pressure must be equal to 0.6 to 1.1 atmosphere (600 to 1100 g/cm²) at sea level. If the ball becomes defective during play, the match is stopped and restarted with a replacement ball at the position where the original ball became defective, using a dropped ball.',
    category: 'field',
    img: '/images/football/ball.webp',
    sub: []
  },
  {
    id: 'football-rule-3',
    rule: 3,
    title: 'The Players',
    short: 'Team composition and substitution rules.',
    full: 'A match is played by two teams, each with a maximum of eleven players, one of whom must be the goalkeeper. A match cannot start or continue if either team has fewer than seven players. In official competitions, a maximum of five substitutes may be used from a list of up to fifteen named substitutes. Substitutions may be made at any stoppage in play with the referee\'s permission. A player who has been substituted may not return to the match. If a player is sent off before kick-off, they may be replaced by a named substitute without reducing the number of permitted substitutions.',
    category: 'players',
    img: '/images/football/players.webp',
    sub: []
  },
  {
    id: 'football-rule-4',
    rule: 4,
    title: 'The Players\' Equipment',
    short: 'Required and prohibited equipment for players.',
    full: 'The basic compulsory equipment consists of a jersey or shirt with sleeves, shorts, socks, shinguards, and footwear. Shinguards must be covered entirely by the socks, made of a suitable material (rubber, plastic, or similar), and provide a reasonable degree of protection. The goalkeeper must wear colours that are distinguishable from the other players, the referee, and assistant referees. Players must not wear any equipment or jewellery that is dangerous to themselves or another player, including rings, bracelets, necklaces, and earrings.',
    category: 'players',
    img: '/images/football/equipment.webp',
    sub: []
  },
  {
    id: 'football-rule-5',
    rule: 5,
    title: 'The Referee',
    short: 'Authority and responsibilities of the referee.',
    full: 'The referee has full authority to enforce the Laws of the Game in connection with the match, and their decisions on facts connected with play are final. The referee may only change a decision on realising that it is incorrect or on the advice of another match official, provided play has not restarted or the referee has not signalled the end of the half or match. The referee acts as timekeeper, stops play for infringements, and takes disciplinary action against players guilty of cautionable or sending-off offences. The referee allows play to continue when an offence occurs and the non-offending team will benefit from the advantage.',
    category: 'officials',
    img: '/images/football/referee.webp',
    sub: []
  },
  {
    id: 'football-rule-6',
    rule: 6,
    title: 'The Other Match Officials',
    short: 'Roles of assistant referees, fourth official, and VAR.',
    full: 'Two assistant referees are appointed to indicate when the ball has wholly passed over the touchline or goal line, which side is entitled to a corner kick, goal kick, or throw-in, and when an offside offence should be penalised. The fourth official assists with administrative duties, supervises substitution procedures, and may replace an official who is unable to continue. Video Assistant Referees (VAR) may review clear and obvious errors or serious missed incidents relating to goals, penalty decisions, direct red card incidents, and mistaken identity in awarding cards.',
    category: 'officials',
    img: '/images/football/officials.webp',
    sub: []
  },
  {
    id: 'football-rule-7',
    rule: 7,
    title: 'The Duration of the Match',
    short: 'Two halves of 45 minutes with added time.',
    full: 'The match lasts two equal periods of 45 minutes, unless otherwise agreed between the referee and the two teams before the start of play. Players are entitled to a half-time interval of no more than 15 minutes. The referee adds time at the end of each half for all time lost through substitutions, assessment and removal of injured players, wasting time, disciplinary sanctions, VAR checks, drinks breaks, and any other cause. Additional time is also added for each penalty kick taken at the end of each half. A period of play is extended until the penalty kick is completed.',
    category: 'gameplay',
    img: '/images/football/duration.webp',
    sub: []
  },
  {
    id: 'football-rule-8',
    rule: 8,
    title: 'The Start and Restart of Play',
    short: 'Kick-off, dropped ball, and other restarts.',
    full: 'A kick-off starts both halves of the match, both halves of extra time, and restarts play after a goal has been scored. The ball must be stationary on the centre mark, all players must be in their own half, and opponents of the team taking the kick-off must be at least 9.15 metres from the ball. A goal may be scored directly from a kick-off. A dropped ball is used to restart play when the referee stops play for any reason not mentioned elsewhere in the Laws. The ball is dropped for the defending team goalkeeper in the penalty area if play was stopped there, or for the team that last touched the ball at the location where it was last touched.',
    category: 'gameplay',
    img: '/images/football/start-restart.webp',
    sub: []
  },
  {
    id: 'football-rule-9',
    rule: 9,
    title: 'The Ball In and Out of Play',
    short: 'When the ball is considered in or out of play.',
    full: 'The ball is out of play when it has wholly passed over the goal line or touchline, whether on the ground or in the air, or when play has been stopped by the referee. The ball is in play at all other times when it touches a match official, remains on the field of play, or rebounds off a goalpost, crossbar, or corner flagpost and remains on the field. The key principle is that the whole of the ball must cross the whole of the line for it to be out of play; if any part of the ball is still on or above the line, it remains in play.',
    category: 'gameplay',
    img: '/images/football/ball-in-out.webp',
    sub: []
  },
  {
    id: 'football-rule-10',
    rule: 10,
    title: 'Determining the Outcome of a Match',
    short: 'Goals, draws, and kicks from the penalty mark.',
    full: 'A goal is scored when the whole of the ball passes over the goal line, between the goalposts and under the crossbar, provided no offence has been committed by the team scoring the goal. The team scoring the greater number of goals is the winner; if both teams score the same number of goals or no goals are scored, the match is a draw. When competition rules require a winning team, the procedures of extra time (two periods of 15 minutes) or kicks from the penalty mark may be used. During kicks from the penalty mark, each team takes five kicks alternately; if still equal, kicks continue one-for-one until one team has scored more than the other after the same number of kicks.',
    category: 'gameplay',
    img: '/images/football/outcome.webp',
    sub: []
  },
  {
    id: 'football-rule-11',
    rule: 11,
    title: 'Offside',
    short: 'A player is offside if nearer to the opponent\'s goal line than both the ball and the second-last opponent.',
    full: 'A player is in an offside position if any part of their head, body, or feet is nearer to the opponents\' goal line than both the ball and the second-last opponent. A player is not in an offside position if level with the second-last opponent or level with the last two opponents. Being in an offside position is not an offence in itself; a player is only penalised if, at the moment the ball is played or touched by a team-mate, they are involved in active play by interfering with play, interfering with an opponent, or gaining an advantage from being in that position. There is no offside offence if a player receives the ball directly from a goal kick, throw-in, or corner kick.',
    category: 'positioning',
    img: '/images/football/offside.webp',
    sub: []
  },
  {
    id: 'football-rule-12',
    rule: 12,
    title: 'Fouls and Misconduct',
    short: 'Direct/indirect free kicks, cautions, and sending-off offences.',
    full: 'A direct free kick is awarded if a player commits a careless, reckless, or excessively forceful offence such as kicking, tripping, charging, striking, pushing, or tackling an opponent, or deliberately handling the ball. An indirect free kick is awarded for dangerous play, impeding an opponent without contact, or preventing the goalkeeper from releasing the ball. A caution (yellow card) is shown for unsporting behaviour, dissent, persistent offences, delaying the restart, failing to respect the required distance, or entering or leaving the field without permission. A sending-off (red card) results from serious foul play, violent conduct, spitting, denying an obvious goal-scoring opportunity, using offensive language or gestures, or receiving a second caution.',
    category: 'discipline',
    img: '/images/football/fouls.webp',
    sub: []
  },
  {
    id: 'football-rule-13',
    rule: 13,
    title: 'Free Kicks',
    short: 'Procedures for direct and indirect free kicks.',
    full: 'Free kicks are either direct, from which a goal can be scored directly against the offending team, or indirect, from which a goal can only be scored if the ball subsequently touches another player before entering the goal. For indirect free kicks the referee indicates by raising an arm above the head and maintains the signal until the kick has been taken and the ball touches another player or goes out of play. All opponents must be at least 9.15 metres from the ball until it is in play, unless they are on their own goal line between the goalposts. The ball must be stationary when the kick is taken, and the kicker must not touch the ball again until it has touched another player.',
    category: 'restarts',
    img: '/images/football/free-kicks.webp',
    sub: []
  },
  {
    id: 'football-rule-14',
    rule: 14,
    title: 'The Penalty Kick',
    short: 'Awarded for direct free kick offences inside the penalty area.',
    full: 'A penalty kick is awarded when a player commits a direct free kick offence inside their own penalty area. The ball is placed on the penalty mark, 11 metres from the goal line. The goalkeeper must remain on the goal line, facing the kicker, between the goalposts until the ball has been kicked, but may move laterally. All other players must be outside the penalty area and behind the penalty mark, at least 9.15 metres from the penalty mark. The kicker must kick the ball forward and must not play the ball again until it has touched another player. If the ball rebounds from the goalkeeper, crossbar, or goalpost back into play, any player except the kicker may play it.',
    category: 'restarts',
    img: '/images/football/penalty-kick.webp',
    sub: []
  },
  {
    id: 'football-rule-15',
    rule: 15,
    title: 'The Throw-In',
    short: 'Awarded when the ball crosses the touchline.',
    full: 'A throw-in is awarded to the opponents of the player who last touched the ball when the whole of the ball passes over the touchline, on the ground or in the air. A goal cannot be scored directly from a throw-in. The thrower must face the field of play, have part of each foot on the touchline or on the ground outside the touchline, hold the ball with both hands, and deliver it from behind and over the head in a continuous motion from the point where it left the field of play. All opponents must stand at least 2 metres from the point on the touchline where the throw-in is taken.',
    category: 'restarts',
    img: '/images/football/throw-in.webp',
    sub: []
  },
  {
    id: 'football-rule-16',
    rule: 16,
    title: 'The Goal Kick',
    short: 'Awarded when the ball crosses the goal line after touching an attacker.',
    full: 'A goal kick is awarded when the whole of the ball passes over the goal line, on the ground or in the air, having last touched a player of the attacking team, and a goal is not scored. The ball is kicked from any point within the goal area by a player of the defending team. The ball is in play when it is kicked and clearly moves. Opponents must remain outside the penalty area until the ball is in play. A goal may be scored directly from a goal kick, but only against the opposing team. The kicker must not play the ball again until it has touched another player.',
    category: 'restarts',
    img: '/images/football/goal-kick.webp',
    sub: []
  },
  {
    id: 'football-rule-17',
    rule: 17,
    title: 'The Corner Kick',
    short: 'Awarded when the ball crosses the goal line after touching a defender.',
    full: 'A corner kick is awarded when the whole of the ball passes over the goal line, on the ground or in the air, having last touched a player of the defending team, and a goal is not scored. The ball is placed inside the corner arc nearest to the point where the ball crossed the goal line. The corner flagpost must not be moved. A goal may be scored directly from a corner kick, but only against the opposing team. Opponents must remain at least 9.15 metres from the corner arc until the ball is in play. The ball is in play when it is kicked and clearly moves, and the kicker must not play the ball again until it has touched another player.',
    category: 'restarts',
    img: '/images/football/corner-kick.webp',
    sub: []
  }
];

export default footballRules;
