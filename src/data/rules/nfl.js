export const nflRules = [
  {
    id: 'nfl-rule-1',
    rule: 1,
    title: 'The Field',
    short: 'Dimensions and markings of the football field.',
    full: 'The playing field is 100 yards long and 53 1/3 yards (160 feet) wide, with two end zones each 10 yards deep. The field is marked with yard lines every 5 yards and hash marks every yard. Hash marks are 70 feet 9 inches from each sideline. A 6-foot wide border surrounds the field. Goal posts are centered on each end line with uprights 18 feet 6 inches apart and a crossbar 10 feet above the ground. Uprights extend at least 30 feet above the crossbar. The field surface may be natural grass or approved artificial turf.',
    category: 'Field',
    img: '/images/nfl/field.webp',
    sub: []
  },
  {
    id: 'nfl-rule-2',
    rule: 2,
    title: 'The Ball',
    short: 'Specifications for the official NFL football.',
    full: 'The ball is a "Wilson" brand, made of natural tan pebble-grained leather. It is inflated to 12.5 to 13.5 psi. The long axis is 11 to 11.25 inches, the short circumference is 21 to 21.25 inches, and the long circumference is 28 to 28.5 inches. Weight is 14 to 15 ounces. Each team provides 12 primary balls for inspection by the referee 2 hours and 15 minutes before kickoff. For outdoor games, an additional 12 backup balls are available. For kicking plays, the home team provides 12 special "K balls" sealed and inspected separately.',
    category: 'Equipment',
    img: '/images/nfl/ball.webp',
    sub: []
  },
  {
    id: 'nfl-rule-3',
    rule: 3,
    title: 'Definitions',
    short: 'Key terms used throughout the NFL rulebook.',
    full: 'Critical definitions include: A "down" is a period of action that starts with a snap or free kick and ends when the ball is dead. "Possession" means a player has secured the ball with hands/arms and maintains control through any contact with the ground. A "dead ball" is one not in play. The "line of scrimmage" is the yard line passing through the forward point of the ball before a snap. "Forward progress" is the furthest point of advancement before a runner is pushed backward. "Neutral zone" is the space between the offense\'s and defense\'s scrimmage lines (the length of the ball). "Fumble" is the loss of player possession other than by passing, kicking, or handing.',
    category: 'General',
    img: '/images/nfl/definitions.webp',
    sub: []
  },
  {
    id: 'nfl-rule-4',
    rule: 4,
    title: 'Game Timing',
    short: 'Four 15-minute quarters with a 13-minute halftime.',
    full: 'The game consists of four 15-minute quarters with a 13-minute intermission at halftime (longer for the Super Bowl). The game clock runs continuously except for specific stoppages: incomplete passes, out of bounds plays, scores, change of possession, timeouts, two-minute warnings, penalties, and official reviews. Each team receives three timeouts per half. The play clock is 40 seconds from the end of the previous play (25 seconds after certain stoppages). A mandatory two-minute warning occurs at 2:00 remaining in each half. If the score is tied at the end of regulation, overtime is played.',
    category: 'Time',
    img: '/images/nfl/timing.webp',
    sub: []
  },
  {
    id: 'nfl-rule-5',
    rule: 5,
    title: 'Players and Substitutions',
    short: 'Eleven players per side with specific substitution rules.',
    full: 'Each team has 11 players on the field. The roster has a maximum of 53 players, with a 48-player game-day active roster. Substitutions may be made between plays. Substituted players must leave the field before the snap. If the offense substitutes, the defense must be given an opportunity to substitute (the offense cannot snap quickly to exploit a mismatch). Players are identified by jersey numbers tied to their position: QBs 1-19, RBs/DBs 1-49, LBs 1-59 and 40-59, OL 50-79, DL 50-79 and 90-99, WRs/TEs 1-49 and 80-89. Illegal substitution or having 12 men on the field is a 5-yard penalty.',
    category: 'Players',
    img: '/images/nfl/players.webp',
    sub: []
  },
  {
    id: 'nfl-rule-6',
    rule: 6,
    title: 'Free Kicks',
    short: 'Kickoffs and safety kicks to start or restart play.',
    full: 'A kickoff starts each half and follows each score. The ball is placed on the kicking team\'s 35-yard line (20-yard line after a safety). The kicker may use a tee (1-inch maximum height). The ball must travel at least 10 yards or be touched by the receiving team before the kicking team may recover it. A touchback on a kickoff places the ball at the receiving team\'s 25-yard line. Fair catch on a kickoff is permitted. Kicking team players must be behind the ball at the kick except the kicker. Receiving team players may not block within 15 yards of the kicking team\'s restraining line until the ball is touched. An onside kick must hit the ground before or at the receiving team\'s restraining line.',
    category: 'Gameplay',
    img: '/images/nfl/free-kicks.webp',
    sub: []
  },
  {
    id: 'nfl-rule-7',
    rule: 7,
    title: 'Scrimmage Kicks (Punts)',
    short: 'Punting and field position strategy.',
    full: 'A scrimmage kick (punt) occurs when the offense kicks the ball to surrender possession in exchange for field position. The punter receives a long snap and kicks the ball before it hits the ground. The receiving team may catch or recover the punt and advance it. A fair catch signal (waving one arm overhead) means the returner will not advance and cannot be hit — the ball is dead at the catch point. If the punt goes into the end zone or the receiving team downs it there, it is a touchback at the 20-yard line. The kicking team may down the ball near the goal line. A muffed punt (touched but not caught) may be recovered by either team but not advanced by the kicking team.',
    category: 'Gameplay',
    img: '/images/nfl/punts.webp',
    sub: []
  },
  {
    id: 'nfl-rule-8',
    rule: 8,
    title: 'Touchdown, PAT, Field Goal, and Safety',
    short: 'All methods of scoring in the NFL.',
    full: 'A touchdown (6 points) is scored when the ball crosses the plane of the opponent\'s goal line while in possession of a player, or when a player catches/recovers the ball in the end zone. After a touchdown, the scoring team attempts a try: a point-after-touchdown (PAT) kick from the 15-yard line (1 point) or a two-point conversion play from the 2-yard line (2 points). A field goal (3 points) is scored by place-kicking the ball through the uprights. A safety (2 points) is scored by the defense when the ball becomes dead in the offense\'s own end zone due to the offense\'s action. After a safety, the scored-upon team kicks off from their own 20-yard line.',
    category: 'Scoring',
    img: '/images/nfl/scoring.webp',
    sub: []
  },
  {
    id: 'nfl-rule-9',
    rule: 9,
    title: 'Scrimmage',
    short: 'Snap, formations, and legal/illegal procedures.',
    full: 'Each play from scrimmage begins with a snap from the center to a player behind the line of scrimmage (usually the quarterback). The offense must have at least 7 players on the line of scrimmage. Only the two players at each end of the line are eligible receivers. All offensive players must be set for one full second before the snap, except one player who may be in motion parallel to or away from the line of scrimmage. A false start (offensive player moving before the snap) is a 5-yard penalty. Encroachment (defensive player in the neutral zone contacting an offensive player) is also 5 yards. An illegal formation (fewer than 7 on the line) is a 5-yard penalty.',
    category: 'Gameplay',
    img: '/images/nfl/scrimmage.webp',
    sub: []
  },
  {
    id: 'nfl-rule-10',
    rule: 10,
    title: 'Opportunity to Catch a Kick',
    short: 'Fair catch rules and protection for kick returners.',
    full: 'A player attempting to catch a punt or kickoff who signals a fair catch by waving one arm overhead must be given an unimpeded opportunity to catch the ball. No opponent may interfere with, block, or tackle the fair-catch receiver. The ball is dead at the spot of the catch. If the receiving team signals fair catch but muffs the ball, it is a free ball and may be recovered by either team. Kick-catch interference (hitting or blocking the receiver before or during the catch) is a 15-yard penalty from the spot of the foul. A fair catch may be made anywhere on the field.',
    category: 'Gameplay',
    img: '/images/nfl/fair-catch.webp',
    sub: []
  },
  {
    id: 'nfl-rule-11',
    rule: 11,
    title: 'Forward Pass',
    short: 'Rules governing passing plays and pass interference.',
    full: 'Only one forward pass is permitted per play, and it must be thrown from behind the line of scrimmage. An incomplete pass (hitting the ground, going out of bounds, or caught out of bounds) stops the clock and returns the ball to the previous line of scrimmage. An interception gives possession to the defending team, which may advance the ball. Pass interference occurs when a player significantly hinders an eligible receiver or defender\'s opportunity to catch the ball. Defensive pass interference is a spot foul (ball placed at the foul location). Offensive pass interference is a 10-yard penalty. Intentional grounding (throwing the ball away with no eligible receiver nearby while in the tackle box) results in loss of down and a 10-yard penalty or safety.',
    category: 'Gameplay',
    img: '/images/nfl/forward-pass.webp',
    sub: []
  },
  {
    id: 'nfl-rule-12',
    rule: 12,
    title: 'Backward Pass and Fumble',
    short: 'Laterals and loose ball recovery rules.',
    full: 'A backward pass (lateral) may be thrown at any time and from any position on the field. Unlike a forward pass, any number of backward passes may occur on a single play. A backward pass that hits the ground is a fumble and is a live ball — either team may recover and advance. A fumble occurs when a player who has possession loses the ball. Any player may recover a fumble. If a fumble goes forward and out of bounds, the ball is returned to the fumbling team at the spot of the fumble. In the last two minutes of each half, only the fumbling player may advance a fumble; otherwise the ball is dead at the recovery spot.',
    category: 'Gameplay',
    img: '/images/nfl/fumble.webp',
    sub: []
  },
  {
    id: 'nfl-rule-13',
    rule: 13,
    title: 'Non-Club Fouls and Unsportsmanlike Conduct',
    short: 'Penalties for non-player and unsportsmanlike actions.',
    full: 'Non-player fouls include interference by coaches, trainers, or other team personnel on the sideline. If a non-player enters the field and interferes with play, the opposing team is awarded appropriate yardage or a score. Unsportsmanlike conduct fouls (15 yards) include taunting, excessive celebrations directed at an opponent, removing the helmet on the field, spiking or throwing the ball at an opponent, and using abusive language. Two unsportsmanlike conduct fouls by the same player result in automatic disqualification.',
    category: 'Discipline',
    img: '/images/nfl/unsportsmanlike.webp',
    sub: []
  },
  {
    id: 'nfl-rule-14',
    rule: 14,
    title: 'Penalty Enforcement',
    short: 'How penalties are assessed and yardage applied.',
    full: 'Penalties are enforced from the spot determined by the type of foul. Common penalty distances: 5 yards (false start, offside, delay of game, illegal formation), 10 yards (holding, illegal block, offensive pass interference), 15 yards (personal foul, unnecessary roughness, face mask). Some penalties are enforced from the previous spot (pre-snap fouls), the spot of the foul (pass interference), or the end of the run. Offsetting penalties (fouls by both teams on the same play) cancel each other. The offended team may decline a penalty. Half-the-distance-to-the-goal applies when a penalty would move the ball more than half the remaining distance.',
    category: 'Rules',
    img: '/images/nfl/penalties.webp',
    sub: []
  },
  {
    id: 'nfl-rule-15',
    rule: 15,
    title: 'Personal Fouls',
    short: 'Unnecessary roughness, roughing the passer, and targeting.',
    full: 'Personal fouls are 15-yard penalties and may result in ejection for flagrant acts. Roughing the passer occurs when a defender hits the quarterback after the ball has been released, lands on the quarterback with full body weight, or hits the quarterback below the knee or above the shoulders. Unnecessary roughness includes hitting a defenseless player, piling on, and striking with a closed fist. Defenseless players (receivers catching a pass, QBs in passing posture, kick returners) receive extra protection — hits to the head or neck are prohibited. Horse-collar tackles (grabbing inside the back collar and pulling down) are 15-yard fouls.',
    category: 'Discipline',
    img: '/images/nfl/personal-fouls.webp',
    sub: []
  },
  {
    id: 'nfl-rule-16',
    rule: 16,
    title: 'Overtime',
    short: 'Sudden death rules and overtime procedures.',
    full: 'If the score is tied at the end of regulation, a 10-minute overtime period is played (regular season). A coin toss determines possession. Starting with the 2022 season, both teams are guaranteed at least one possession in overtime regardless of what happens on the first drive. If the score remains tied after both teams possess the ball, the next score of any kind wins (sudden death). If still tied after one overtime period, the game ends as a tie in the regular season. In the playoffs, additional overtime periods are played (15 minutes each) until a winner is determined — playoff games cannot end in a tie.',
    category: 'Time',
    img: '/images/nfl/overtime.webp',
    sub: []
  },
  {
    id: 'nfl-rule-17',
    rule: 17,
    title: 'Instant Replay',
    short: 'Video review system for challenged and booth-reviewed plays.',
    full: 'Coaches may challenge a ruling on the field by throwing a red flag, expending a timeout. Each team receives two challenges per game (a third if both previous challenges are successful). Inside the final two minutes of each half and all of overtime, replay reviews are initiated solely by the replay official in the booth. Reviewable plays include scoring plays, turnovers, pass completions/incompletions, forward progress, and player down by contact. The standard is "clear and obvious visual evidence" to overturn the on-field ruling. All scoring plays and turnovers are automatically reviewed. Non-reviewable plays include penalties (unless pass interference was briefly reviewable 2019-2020) and spot of the ball.',
    category: 'Officials',
    img: '/images/nfl/replay.webp',
    sub: []
  },
  {
    id: 'nfl-rule-18',
    rule: 18,
    title: 'Coin Toss',
    short: 'Pre-game coin toss to determine kickoff and direction.',
    full: 'The referee conducts the coin toss at center field three minutes before kickoff. Each team\'s captains (up to 6 per team) meet at midfield. The visiting team calls the toss. The winner of the toss may choose to: kick off, receive, or select which goal to defend. The loser of the toss makes a choice from the remaining options. At the start of the second half, the team that lost the opening toss gets the first choice. Most teams defer their choice to the second half, allowing them to receive the ball to start the third quarter while their opponent kicks off to start both halves.',
    category: 'General',
    img: '/images/nfl/coin-toss.webp',
    sub: []
  },
  {
    id: 'nfl-rule-19',
    rule: 19,
    title: 'Use of Helmet as a Weapon',
    short: 'Prohibition on leading with the crown of the helmet.',
    full: 'It is a foul for any player to lower the head and initiate contact with the crown (top) of the helmet against any opponent. This applies to all players in all situations — offensive, defensive, and special teams. The penalty is 15 yards for unnecessary roughness and potential disqualification if the act is flagrant. This rule was strengthened in 2018 to reduce head injuries. The crown of the helmet is defined as the very top of the helmet. Incidental contact with the crown during normal football activities (such as a runner lowering the shoulder) is not penalized if the player does not clearly initiate contact with the crown.',
    category: 'Discipline',
    img: '/images/nfl/helmet.webp',
    sub: []
  },
  {
    id: 'nfl-rule-20',
    rule: 20,
    title: 'Tuck Rule (Removed)',
    short: 'Former rule on incomplete passes during throwing motion.',
    full: 'The tuck rule, in effect from 1999 to 2013, stated that if a quarterback\'s arm was moving forward during a passing motion and the ball came loose, it was ruled an incomplete pass — even if the quarterback was bringing the ball back to his body (tucking it). The rule gained notoriety in the 2001 AFC Divisional Playoff ("Tuck Rule Game") when Tom Brady appeared to fumble but was ruled incomplete under this provision, allowing the Patriots to retain possession and ultimately win. The rule was abolished by a vote of 29-1 by NFL owners in 2013, meaning such plays are now ruled fumbles.',
    category: 'Rules',
    img: '/images/nfl/tuck-rule.webp',
    sub: []
  },
  {
    id: 'nfl-rule-21',
    rule: 21,
    title: 'The Catch Rule',
    short: 'Requirements for establishing a legal reception.',
    full: 'A player must complete three steps to make a legal catch: (1) secure control of the ball with the hands or arms, (2) get two feet down (or one body part other than a hand) in bounds, and (3) maintain control through a "football move" such as a third step, reach for the line to gain, or ability to perform such a move. If a player goes to the ground in the process of making the catch, the player must maintain control of the ball through contact with the ground. The catch rule was clarified in 2018 after controversial non-catch rulings (Dez Bryant 2014, Jesse James 2017), simplifying the language to remove the phrase "surviving the ground."',
    category: 'Rules',
    img: '/images/nfl/catch-rule.webp',
    sub: []
  },
  {
    id: 'nfl-rule-22',
    rule: 22,
    title: 'Roughing the Passer',
    short: 'Protecting the quarterback from dangerous hits.',
    full: 'Defenders may not hit the passer after the ball has clearly left the passer\'s hand (late hit). Defenders may not land on the passer with the full weight of the body (the "body weight rule" added in 2018 after Aaron Rodgers suffered a collarbone injury). Defenders may not strike the passer at or above the neck/head area or at or below the knee (unless blocked into the passer). The passer is a protected player from the time of the throw until the throwing motion ends. Penalty is 15 yards, automatic first down, and potential ejection for flagrant violations. The rule has been controversial due to subjective enforcement, particularly the body weight provision.',
    category: 'Discipline',
    img: '/images/nfl/roughing-passer.webp',
    sub: []
  }
];

export default nflRules;
