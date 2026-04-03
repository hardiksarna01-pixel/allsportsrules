export const tennisRules = [
  {
    id: 'tennis-rule-1',
    rule: 1,
    title: 'The Court',
    short: 'Dimensions and layout of the tennis court.',
    full: 'The court is a rectangle 78 feet (23.77 metres) long and 27 feet (8.23 metres) wide for singles, or 36 feet (10.97 metres) wide for doubles. It is divided across the middle by a net suspended by a cord or metal cable attached to two net posts at a height of 3.5 feet (1.07 metres), with the net standing 3 feet (0.914 metres) high at the centre. On each side of the net, the court is divided into service courts by the service line (21 feet from the net) and the centre service line, creating two equal service boxes.',
    category: 'court',
    img: '/images/tennis/court.webp',
    sub: []
  },
  {
    id: 'tennis-rule-2',
    rule: 2,
    title: 'Permanent Fixtures',
    short: 'Net, posts, singles sticks, and other permanent court features.',
    full: 'Permanent fixtures of the court include the net, posts, singles sticks (if used), cord or metal cable, strap and band, the area behind each baseline and at the sides, the umpire\'s chair, the spectator seating, and all other fixtures around and above the court. The net posts are placed 3 feet outside the doubles court on each side, and for singles a pair of singles sticks may be used to raise the net to 3.5 feet at the sideline. If the ball in play strikes a permanent fixture after hitting the ground in the correct court, the player who hit the ball wins the point.',
    category: 'court',
    img: '/images/tennis/fixtures.webp',
    sub: []
  },
  {
    id: 'tennis-rule-3',
    rule: 3,
    title: 'The Ball',
    short: 'Specifications for approved tennis balls.',
    full: 'The ball must have a uniform outer surface consisting of a fabric cover and be white or yellow in colour. The ball must weigh between 56.0 grams and 59.4 grams, and its diameter must be between 6.54 centimetres and 6.86 centimetres. When dropped from a height of 254 centimetres onto a flat, rigid surface, the ball must bounce between 135 and 147 centimetres. The ball must conform to the specifications set out in the ITF Rules of Tennis appendix, and in official tournaments only ITF-approved balls may be used.',
    category: 'equipment',
    img: '/images/tennis/ball.webp',
    sub: []
  },
  {
    id: 'tennis-rule-4',
    rule: 4,
    title: 'The Racket',
    short: 'Specifications and restrictions on racket design.',
    full: 'The racket frame, including the handle, must not exceed 29 inches (73.66 centimetres) in overall length and 12.5 inches (31.75 centimetres) in overall width. The hitting surface must not exceed 15.5 inches (39.37 centimetres) in length and 11.5 inches (29.21 centimetres) in width. The strings must be alternately interlaced or bonded and generally uniform in pattern, and must not include any attached objects or devices other than those used solely to limit or prevent wear, vibration, or to distribute weight. The racket must be free of any device that could materially change the shape, weight distribution, or playing properties during a match.',
    category: 'equipment',
    img: '/images/tennis/racket.webp',
    sub: []
  },
  {
    id: 'tennis-rule-5',
    rule: 5,
    title: 'Score in a Game',
    short: 'Point progression: 0, 15, 30, 40, deuce, advantage.',
    full: 'The points in a game are scored as follows: the first point is called "15", the second "30", the third "40", and the fourth point wins the game, provided the player leads by at least two points. When both players have won three points (40-40), the score is called "deuce". After deuce, the next point gives "advantage" to the player who wins it. If the player with advantage wins the next point, they win the game; if they lose it, the score returns to deuce. This continues until a player wins two consecutive points from deuce.',
    category: 'scoring',
    img: '/images/tennis/scoring-game.webp',
    sub: []
  },
  {
    id: 'tennis-rule-6',
    rule: 6,
    title: 'Score in a Set',
    short: 'A set is won by the first player to win six games with a two-game lead.',
    full: 'A player who first wins six games wins the set, provided there is a margin of two games over the opponent. If the score reaches six games all, a tie-break game is played to decide the set, unless the tournament rules specify an advantage set format. In a tie-break set, the tie-break game is won by the player who first scores seven points with a margin of two points. In an advantage set format, play continues without a tie-break until one player leads by two games.',
    category: 'scoring',
    img: '/images/tennis/scoring-set.webp',
    sub: []
  },
  {
    id: 'tennis-rule-7',
    rule: 7,
    title: 'Score in a Match',
    short: 'Best of three or best of five sets determines the winner.',
    full: 'A match is won by the player or team who wins the majority of the prescribed number of sets. Matches are typically played as best of three sets or best of five sets, depending on the tournament. In Grand Slam men\'s singles, matches are best of five sets, while most other events use best of three sets. The final set may be played with a tie-break at a specified score (such as 6-6) or as an advantage set, depending on the rules of the particular competition.',
    category: 'scoring',
    img: '/images/tennis/scoring-match.webp',
    sub: []
  },
  {
    id: 'tennis-rule-8',
    rule: 8,
    title: 'Server and Receiver',
    short: 'Determines who serves and who receives at the start of the match.',
    full: 'The players stand on opposite sides of the net. The server is the player who puts the ball into play for the first point, and the receiver is the player who is ready to return the server\'s delivery. The right to be server or receiver in the first game is decided by a toss before the warm-up begins. The player who wins the toss may choose to serve, receive, choose a particular end of the court, or defer the choice to their opponent. The player who wins the toss may also defer all choices to the opponent.',
    category: 'serve',
    img: '/images/tennis/server-receiver.webp',
    sub: []
  },
  {
    id: 'tennis-rule-9',
    rule: 9,
    title: 'Choice of Ends',
    short: 'Players choose which end of the court to start from.',
    full: 'The choice of ends and the right to serve or receive in the first game is decided by a toss before the warm-up. The player winning the toss may choose to serve or receive first, in which case the opponent chooses the end, or the player may choose the end, in which case the opponent chooses to serve or receive. Alternatively, the player winning the toss may require the opponent to make the first choice. In doubles, the team that serves in the first game decides which partner serves first, and the receiving team decides who receives first.',
    category: 'serve',
    img: '/images/tennis/choice-of-ends.webp',
    sub: []
  },
  {
    id: 'tennis-rule-10',
    rule: 10,
    title: 'Change of Ends',
    short: 'Players switch ends after every odd game.',
    full: 'Players change ends at the end of the first, third, and every subsequent odd-numbered game of each set. Players also change ends at the end of each set unless the total number of games in that set is even, in which case the change occurs at the end of the first game of the next set. During a tie-break game, players change ends after every six points. If a mistake is made in the change-of-ends procedure, the players shall change to the correct ends as soon as the error is discovered, and the score stands as played.',
    category: 'serve',
    img: '/images/tennis/change-of-ends.webp',
    sub: []
  },
  {
    id: 'tennis-rule-11',
    rule: 11,
    title: 'Ball in Play',
    short: 'The ball is in play from the moment it is served until the point is decided.',
    full: 'The ball is in play from the moment the server strikes it in the service and remains in play until the point is decided. A point is decided when a player fails to make a good return, when the ball bounces twice, when a player hits the ball before it crosses the net, or when any other rule violation occurs. The ball remains in play even if it touches the net, posts, or net cord during a rally, provided it lands in the correct court. A return is good if the ball passes over the net and lands within the correct court boundaries.',
    category: 'play',
    img: '/images/tennis/ball-in-play.webp',
    sub: []
  },
  {
    id: 'tennis-rule-12',
    rule: 12,
    title: 'Ball Touches a Line',
    short: 'A ball landing on any part of a line is considered good.',
    full: 'A ball that touches a line is regarded as touching the court bounded by that line. This means if any part of the ball touches any part of the boundary line, the ball is considered "in" and play continues. Lines are considered part of the court they bound. This rule applies equally to all lines on the court, including the baseline, sidelines, service line, and centre service line. In the absence of electronic line-calling, the decision of the line judge or chair umpire is final.',
    category: 'play',
    img: '/images/tennis/ball-touches-line.webp',
    sub: []
  },
  {
    id: 'tennis-rule-13',
    rule: 13,
    title: 'Ball Touches a Permanent Fixture',
    short: 'Point is lost if the ball hits a permanent fixture before landing in the correct court.',
    full: 'If the ball in play touches a permanent fixture after it has bounced in the correct court, the player who hit that ball wins the point. However, if the ball hits a permanent fixture before bouncing in the correct court, the player who hit the ball loses the point. Permanent fixtures include the umpire\'s chair, spectator seating, walls, ceiling (in indoor courts), fencing, and any other structures around or above the court. The net, net posts, and singles sticks are not considered permanent fixtures for this purpose.',
    category: 'play',
    img: '/images/tennis/permanent-fixture.webp',
    sub: []
  },
  {
    id: 'tennis-rule-14',
    rule: 14,
    title: 'Order of Service',
    short: 'Players alternate serving each game throughout the set.',
    full: 'The players serve alternately in every game. The player who serves first in one game receives in the next game, and this alternation continues throughout the set. If a player serves out of turn, the correct order must be resumed as soon as the error is discovered, but all points played before the error was noticed shall count. In a tie-break game, the player whose turn it is to serve serves the first point from the right half of the court, and thereafter each player serves two consecutive points in rotation. Service in the tie-break begins from the deuce side.',
    category: 'serve',
    img: '/images/tennis/order-of-service.webp',
    sub: []
  },
  {
    id: 'tennis-rule-15',
    rule: 15,
    title: 'Order of Receiving in Doubles',
    short: 'Partners alternate receiving service within each set.',
    full: 'In doubles, the team receiving service in the first game of each set decides which partner receives the first serve, and that player continues to receive on the same side for the entire set. The partner receives serves to the other service court. The order of receiving may be changed at the beginning of each new set. If the receiving order is changed during a set by mistake, the correct order is resumed at the start of the next receiving game, but points already played stand as counted.',
    category: 'serve',
    img: '/images/tennis/doubles-receiving.webp',
    sub: []
  },
  {
    id: 'tennis-rule-16',
    rule: 16,
    title: 'The Service',
    short: 'The server must stand behind the baseline and serve diagonally into the service box.',
    full: 'Before starting the service motion, the server must stand at rest with both feet behind the baseline and within the imaginary extensions of the centre mark and the sideline. The server then tosses the ball into the air and strikes it before it hits the ground, serving diagonally into the opponent\'s service box. The first point of each game is served from the right side of the centre mark (deuce court), and subsequent points alternate between right and left (ad court). The service is complete when the server\'s racket strikes or misses the ball.',
    category: 'serve',
    img: '/images/tennis/service.webp',
    sub: []
  },
  {
    id: 'tennis-rule-17',
    rule: 17,
    title: 'Serving',
    short: 'Detailed procedures for executing a legal serve.',
    full: 'The server must not serve until the receiver is ready. If the receiver attempts to return the serve, they are deemed to have been ready. The server has two chances to put the ball in play on each point. The ball must pass over the net and land in the diagonally opposite service box. If the first serve is a fault, the server serves again from the same half of the court. The server must not change position by walking or running before serving, although slight foot movements are permitted as long as the original position is maintained.',
    category: 'serve',
    img: '/images/tennis/serving.webp',
    sub: []
  },
  {
    id: 'tennis-rule-18',
    rule: 18,
    title: 'Foot Fault',
    short: 'Server must not touch the baseline or court with either foot before striking the ball.',
    full: 'During the service motion, the server must not touch the baseline or the court with either foot until after the ball has been struck. The server must also not touch the imaginary extension of the centre mark with either foot, or change position by walking or running. A foot fault is called if any part of the server\'s foot touches the baseline or the playing surface inside the baseline before contact with the ball. In professional matches, a foot-fault judge may be positioned near the baseline to monitor compliance, and electronic systems may also be used.',
    category: 'serve',
    img: '/images/tennis/foot-fault.webp',
    sub: []
  },
  {
    id: 'tennis-rule-19',
    rule: 19,
    title: 'Service Fault',
    short: 'A serve is a fault if the ball does not land in the correct service box.',
    full: 'The service is a fault if the server misses the ball when trying to strike it, if the served ball touches a permanent fixture or the server\'s doubles partner before hitting the ground, or if the ball does not land within the correct service box. The serve is also a fault if the ball touches the net, strap, or band and lands outside the correct service box, or does not pass over the net at all. A foot fault is also classified as a service fault. After a first service fault, the server receives a second serve attempt.',
    category: 'serve',
    img: '/images/tennis/service-fault.webp',
    sub: []
  },
  {
    id: 'tennis-rule-20',
    rule: 20,
    title: 'Second Service',
    short: 'If the first serve is a fault, the server gets a second attempt.',
    full: 'If the first service is a fault, the server shall serve again without delay from behind the same half of the court from which the fault was served. The server has only one further opportunity to deliver a good serve. If the second service is also a fault, known as a double fault, the server loses the point. The server may not take an unreasonable amount of time between the first and second serves. The 25-second serve clock applies between serves, and a time violation may be called for exceeding this limit.',
    category: 'serve',
    img: '/images/tennis/second-service.webp',
    sub: []
  },
  {
    id: 'tennis-rule-21',
    rule: 21,
    title: 'When to Serve',
    short: 'The server must not serve until the receiver is ready.',
    full: 'The server must wait until the receiver is ready before delivering the serve. If the receiver attempts to return the service, they shall be considered ready. If the receiver signals that they are not ready, the serve is a let and shall be replayed. The receiver must play to the reasonable pace of the server and shall be ready to receive within a reasonable time of the server being ready. At the professional level, the serve clock gives both server and receiver a defined window of 25 seconds between points to prepare.',
    category: 'serve',
    img: '/images/tennis/when-to-serve.webp',
    sub: []
  },
  {
    id: 'tennis-rule-22',
    rule: 22,
    title: 'The Let during Service',
    short: 'A served ball that clips the net and lands in is replayed.',
    full: 'The service is a let if the served ball touches the net, strap, or band and then lands within the correct service box, or if it touches the net, strap, or band and then touches the receiver or anything the receiver is wearing or carrying before hitting the ground. A let service does not count as a fault or a good serve, and the server replays the entire point from that serve (first serve let replays first serve, second serve let replays second serve). There is no limit on the number of consecutive service lets that may occur.',
    category: 'serve',
    img: '/images/tennis/let-service.webp',
    sub: []
  },
  {
    id: 'tennis-rule-23',
    rule: 23,
    title: 'The Let',
    short: 'A point is replayed when play is interrupted by an outside interference.',
    full: 'A let is called in any case where a point should be replayed. Beyond service lets, a let may be called when play is disrupted by an unexpected event such as a ball rolling onto the court from an adjacent match, or any other interference outside the players\' control. If a let is called during a rally, the entire point is replayed with the server receiving a first serve. The umpire or a player may call a let, and the decision should be made immediately upon recognizing the interference.',
    category: 'play',
    img: '/images/tennis/let.webp',
    sub: []
  },
  {
    id: 'tennis-rule-24',
    rule: 24,
    title: 'Player Loses Point',
    short: 'All scenarios in which a player loses a point.',
    full: 'A player loses a point if they fail to return the ball before it bounces twice consecutively, if the ball they hit does not land in the correct court, if they touch the net or net posts while the ball is in play, if they hit the ball before it passes the net, or if the ball touches the player or anything they wear or carry except the racket. A player also loses the point if they deliberately strikes the ball more than once in a single stroke, throws the racket at and hits the ball, or touches the ball in play with their racket while the ball is in the opponent\'s court across the net.',
    category: 'play',
    img: '/images/tennis/loses-point.webp',
    sub: []
  },
  {
    id: 'tennis-rule-25',
    rule: 25,
    title: 'A Good Return',
    short: 'Requirements for a return to be considered valid.',
    full: 'A return is good if the ball passes over the net (or around the net post, at any height) and lands within the correct court, even if it touches the net, net posts, strap, band, or singles sticks in the process. It is also a good return if the ball is returned outside the net post below the height of the top of the net, provided it lands in the correct court. A player may reach over the net to play a ball only after the ball has bounced back over the net to the original side due to wind or spin, and the player does not touch the net.',
    category: 'play',
    img: '/images/tennis/good-return.webp',
    sub: []
  },
  {
    id: 'tennis-rule-26',
    rule: 26,
    title: 'Hindrance',
    short: 'Interference that affects a player\'s ability to make a shot.',
    full: 'If a player is hindered in playing the point by a deliberate act of the opponent, the player wins the point. If a player is hindered by an unintentional act of the opponent, or by something outside the players\' control, a let is called and the point is replayed. A deliberate hindrance includes shouting, making gestures, or deliberately obstructing the opponent\'s view. Continuous talking between doubles partners during a rally can also constitute a hindrance. The umpire has the discretion to determine whether a hindrance was deliberate or unintentional.',
    category: 'play',
    img: '/images/tennis/hindrance.webp',
    sub: []
  },
  {
    id: 'tennis-rule-27',
    rule: 27,
    title: 'Correcting Errors',
    short: 'Procedures for correcting mistakes in service order or court position.',
    full: 'If an error is discovered in the order of service, the player who should be serving according to the correct sequence shall serve as soon as the error is discovered, but all points already played shall stand. If a set is completed before the error is discovered, the new order of service continues as altered. Similarly, if an error is discovered in the receiving order or in the choice of ends, the correction is made at the next appropriate change and all points played stand. Any completed tie-break game or set stands, regardless of errors in rotation.',
    category: 'conduct',
    img: '/images/tennis/correcting-errors.webp',
    sub: []
  },
  {
    id: 'tennis-rule-28',
    rule: 28,
    title: 'Coaching',
    short: 'Rules regarding on-court coaching during a match.',
    full: 'In professional tennis, on-court coaching by a coach or team member is now permitted at most tour-level events. A coach may provide verbal or visual instruction to a player during changeovers and between sets, and may communicate during play as long as it does not hinder the opponent or disrupt play. The chair umpire may issue a warning or code violation if coaching interferes with the match. In Grand Slam and ITF events, coaching rules may vary and specific regulations apply. Coaching from the stands using electronic devices to communicate is prohibited.',
    category: 'conduct',
    img: '/images/tennis/coaching.webp',
    sub: []
  },
  {
    id: 'tennis-rule-29',
    rule: 29,
    title: 'Continuous Play',
    short: 'Play must be continuous from the first serve to the end of the match.',
    full: 'Play shall be continuous from the first service until the match is concluded, in accordance with the following provisions. A maximum of 25 seconds is allowed between points. When changing ends, a maximum of 90 seconds is allowed from the moment the last point ends until the first serve of the next game is struck. After the first game of each set and during a tie-break, play shall be continuous without a change of ends rest period. A set break of up to 120 seconds is permitted between sets. Play may be suspended by the chair umpire or tournament referee due to weather, darkness, or court conditions.',
    category: 'conduct',
    img: '/images/tennis/continuous-play.webp',
    sub: []
  },
  {
    id: 'tennis-rule-30',
    rule: 30,
    title: 'Code Violations',
    short: 'Penalties for misconduct including warnings, point penalties, and defaults.',
    full: 'The Point Penalty System is used to enforce the Code of Conduct. For a first offence such as racket abuse, ball abuse, verbal abuse, or unsportsmanlike conduct, the player receives a warning. For a second offence, the player loses a point. For a third offence, the player loses a game. Further offences may result in default from the match at the discretion of the tournament referee. Audible or visible obscenity results in an automatic code violation. Physical abuse of an official, opponent, spectator, or other person may result in an immediate default and potential fine or suspension from future tournaments.',
    category: 'conduct',
    img: '/images/tennis/code-violations.webp',
    sub: []
  }
];

export default tennisRules;
