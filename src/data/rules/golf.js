export const golfRules = [
  {
    id: 'golf-rule-1',
    rule: 1,
    title: 'The Game, Player Conduct, and the Rules',
    short: 'Fundamental principles and player integrity.',
    full: 'Golf is played by striking a ball with a club from the teeing area into the hole by a stroke or successive strokes in accordance with the Rules. Players are expected to play in the spirit of the game by acting with integrity, showing consideration to others, and taking care of the course. A player is responsible for knowing and applying the Rules. If a player is uncertain about a rule during play, they may play two balls and seek a ruling before returning the scorecard. All penalties are the player\'s responsibility to recognize and apply.',
    category: 'General',
    img: '/images/golf/the-game.webp',
    sub: []
  },
  {
    id: 'golf-rule-2',
    rule: 2,
    title: 'The Course',
    short: 'Defined areas of the course and their significance.',
    full: 'The course consists of five defined areas: (1) the teeing area where play begins on each hole, (2) penalty areas (marked with yellow or red stakes/lines) including water hazards, (3) bunkers (specially prepared sand areas), (4) the putting green with the flagstick and hole, and (5) the general area covering the rest of the course including fairway, rough, and trees. Out of bounds is defined by white stakes or lines and is not part of the course. The Committee defines the course boundaries and may establish local rules.',
    category: 'Course',
    img: '/images/golf/course.webp',
    sub: []
  },
  {
    id: 'golf-rule-3',
    rule: 3,
    title: 'The Competition',
    short: 'Types of competitions and how scores are determined.',
    full: 'Competitions may be stroke play (total strokes for the round or rounds determine the winner) or match play (each hole is won, lost, or halved, and the player winning the most holes wins the match). In stroke play, the player with the lowest total wins. Ties may be resolved by a playoff. In match play, a player wins a hole by completing it in fewer strokes; the match status is expressed as "holes up." A match is won when one player leads by more holes than remain. Stableford, Maximum Score, and Par/Bogey are other forms of stroke play. Players must play by the rules or face disqualification.',
    category: 'General',
    img: '/images/golf/competition.webp',
    sub: []
  },
  {
    id: 'golf-rule-4',
    rule: 4,
    title: 'The Player\'s Equipment',
    short: 'Regulations for clubs, balls, and other equipment.',
    full: 'A player may carry a maximum of 14 clubs. Clubs must conform to R&A/USGA specifications for length, loft, lie, and head size. Drivers must have a maximum clubhead volume of 460cc and a maximum shaft length of 46 inches. The ball must be on the List of Conforming Golf Balls, weigh no more than 1.620 ounces (45.93 grams), and have a diameter of at least 1.680 inches (42.67 mm). Distance-measuring devices are allowed unless prohibited by local rule. Players may not use artificial devices to gauge wind or slope (unless the device has slope turned off). Penalty for carrying more than 14 clubs: two strokes per hole played with the extra club (max 4 strokes).',
    category: 'Equipment',
    img: '/images/golf/equipment.webp',
    sub: []
  },
  {
    id: 'golf-rule-5',
    rule: 5,
    title: 'Playing the Round',
    short: 'Practice, starting on time, and pace of play.',
    full: 'Players must start at the time and place set by the Committee. A player who arrives at the starting point within 5 minutes of the start time receives a general penalty (2 strokes in stroke play) but is not disqualified. Practice is not permitted on the course before a stroke-play round on the day of the competition (but is allowed in match play). Players should play without unreasonable delay and in accordance with any pace-of-play guidelines set by the Committee. A player is expected to play a stroke in no more than 40 seconds (and usually in less time). Players may discontinue play only when the Committee suspends play or there is danger from lightning.',
    category: 'General',
    img: '/images/golf/round.webp',
    sub: []
  },
  {
    id: 'golf-rule-6',
    rule: 6,
    title: 'Playing a Hole',
    short: 'Teeing off, playing the ball, and holing out.',
    full: 'A hole begins when the player makes a stroke from the teeing area and ends when the ball is holed on the putting green (or when the Rules otherwise say the hole is complete). The ball must be played from the teeing area on the first stroke and then played as it lies for each subsequent stroke. A player must hole out with the same ball played from the tee unless the rules permit substitution (relief situations, ball damaged). Playing a wrong ball results in a two-stroke penalty in stroke play (the player must then correct the error). The order of play is typically determined by honor (lowest score on previous hole) on the tee and by distance from the hole thereafter, though "ready golf" is encouraged to improve pace.',
    category: 'Gameplay',
    img: '/images/golf/playing-hole.webp',
    sub: []
  },
  {
    id: 'golf-rule-7',
    rule: 7,
    title: 'Ball Search: Finding and Identifying',
    short: 'Three minutes to search for a lost ball.',
    full: 'A player has three minutes to search for a ball after reaching the area where the ball is likely to be. If the ball is not found within three minutes, it is lost and the player must take stroke-and-distance relief (play from where the previous stroke was made with a one-stroke penalty). A player may lift a ball to identify it if identification is not possible otherwise, but must first mark the spot and give an opponent or fellow competitor the opportunity to observe. The player may clean the ball only enough to identify it. Moving objects or conditions during a search that cause the ball to move is not a penalty, but the ball must be replaced.',
    category: 'Gameplay',
    img: '/images/golf/ball-search.webp',
    sub: []
  },
  {
    id: 'golf-rule-8',
    rule: 8,
    title: 'Course Played as It Is Found',
    short: 'No improving conditions that affect your stroke.',
    full: 'A player must not improve the conditions affecting the stroke by moving, bending, or breaking anything growing or fixed, creating or eliminating irregularities of surface, removing or pressing down sand or loose soil, or removing dew, frost, or water. However, a player may fairly take a stance, make a stroke, and take a reasonable backswing. A player may remove loose impediments and movable obstructions. A player may not improve the line of play by pressing down grass with a club. Restoring conditions that were worsened by another player or an outside influence is permitted.',
    category: 'Rules',
    img: '/images/golf/course-found.webp',
    sub: []
  },
  {
    id: 'golf-rule-9',
    rule: 9,
    title: 'Ball Played as It Lies',
    short: 'Play the ball where it comes to rest unless rules allow relief.',
    full: 'The ball must be played as it lies unless the Rules allow or require a player to play from a different place or to move the ball. If a ball at rest is moved by natural forces (wind, water, gravity), it must generally be played from its new location. If a ball at rest is moved by an outside influence or another player, it must be replaced on the original spot. If a player accidentally moves their ball, there is a one-stroke penalty and the ball must be replaced (exceptions apply on the putting green and during search). The original spot must be estimated if not known.',
    category: 'Rules',
    img: '/images/golf/ball-lies.webp',
    sub: []
  },
  {
    id: 'golf-rule-10',
    rule: 10,
    title: 'Preparing for and Making a Stroke',
    short: 'Rules for taking advice, alignment, and anchoring.',
    full: 'A player may get advice only from their caddie or partner (in team/partner formats). Getting advice from anyone else or giving advice to a competitor is a penalty. A player must not use any object placed on the ground to aid alignment. The caddie must not stand behind the player on an extension of the line of play while the player begins taking a stance and until the stroke is made. The club must be fairly struck at the ball (not pushed or spooned). Anchoring the club to the body is prohibited — the player must hold the club freely. The player may make a practice swing but must not make a practice stroke.',
    category: 'Gameplay',
    img: '/images/golf/stroke.webp',
    sub: []
  },
  {
    id: 'golf-rule-11',
    rule: 11,
    title: 'Ball in Motion Accidentally Deflected',
    short: 'What happens when a moving ball hits a person or object.',
    full: 'If a player\'s ball in motion accidentally hits any person, animal, or object, there is no penalty and the ball must be played as it lies. If the ball comes to rest on a person, animal, or movable obstruction, the player must take relief by dropping the ball at the estimated point directly beneath where it came to rest. On the putting green, if a ball played from the green hits another ball at rest on the green, the player gets a two-stroke penalty in stroke play (no penalty in match play), and the moved ball must be replaced. There is no penalty if a ball played from off the green hits a ball on the green.',
    category: 'Rules',
    img: '/images/golf/deflection.webp',
    sub: []
  },
  {
    id: 'golf-rule-12',
    rule: 12,
    title: 'Bunkers',
    short: 'Special rules for playing from sand traps.',
    full: 'A bunker is a specially prepared area of sand. Before making a stroke at a ball in a bunker, a player must not touch the sand with a hand, club, rake, or other object to test its condition. The player must not touch the sand in the bunker with the club in the area right in front of or behind the ball, during a practice swing, or during the backswing. The player may touch the sand to prevent falling, remove loose impediments and movable obstructions, mark and lift the ball, and place the club lightly to address the ball (not right in front of or behind it). An unplayable ball in a bunker may be dropped in the bunker (1 penalty stroke) or outside the bunker on the line from the hole through where the ball lay (2 penalty strokes).',
    category: 'Course',
    img: '/images/golf/bunkers.webp',
    sub: []
  },
  {
    id: 'golf-rule-13',
    rule: 13,
    title: 'Putting Green',
    short: 'Rules specific to the putting surface.',
    full: 'On the putting green, a player may mark, lift, and clean the ball. The player may repair damage on the putting green including ball marks, shoe damage, spike marks, and animal damage, but may not repair natural imperfections such as aeration holes or natural wear. A player may remove sand and loose soil on the putting green. The flagstick may be left in the hole, removed, or attended during a stroke — there is no penalty if the ball hits an unattended flagstick (changed in 2019). A ball overhanging the lip of the hole is allowed a reasonable time to reach the hole plus 10 seconds; if it does not fall in by then, it is at rest.',
    category: 'Course',
    img: '/images/golf/putting-green.webp',
    sub: []
  },
  {
    id: 'golf-rule-14',
    rule: 14,
    title: 'Marking, Lifting, Cleaning, and Replacing',
    short: 'Procedures for handling the ball on the course.',
    full: 'A player may mark the spot of the ball by placing a ball-marker directly behind or next to the ball. The ball may be lifted by the player, the player\'s caddie, or a person authorized by the player. A lifted ball that must be replaced must be placed on its original spot. A ball may be cleaned when lifted except when lifted to determine if it is cut or cracked, to identify it (clean only enough to identify), or to see if it lies in a condition where relief is allowed. When dropping, the player must drop from knee height straight down without spin or direction. A dropped ball must come to rest in the relief area.',
    category: 'Rules',
    img: '/images/golf/marking.webp',
    sub: []
  },
  {
    id: 'golf-rule-15',
    rule: 15,
    title: 'Relief from Loose Impediments and Movable Obstructions',
    short: 'Removing natural and artificial objects from around the ball.',
    full: 'Loose impediments are natural objects not fixed or growing, such as stones, leaves, twigs, dead insects, and worm casts. A player may remove any loose impediment anywhere on or off the course without penalty. If removing a loose impediment causes the ball to move, the ball must be replaced (one-stroke penalty except on the putting green). Movable obstructions are artificial objects that can be moved with reasonable effort, such as rakes, bottles, and stakes not defining out of bounds. A player may take free relief from a movable obstruction anywhere on the course by removing the obstruction or, if the ball is on or in the obstruction, by dropping the ball at the nearest point of relief.',
    category: 'Rules',
    img: '/images/golf/loose-impediments.webp',
    sub: []
  },
  {
    id: 'golf-rule-16',
    rule: 16,
    title: 'Relief from Abnormal Course Conditions',
    short: 'Free relief from GUR, immovable obstructions, and temporary water.',
    full: 'Abnormal course conditions include ground under repair (GUR), immovable obstructions (sprinkler heads, cart paths, permanent structures), temporary water (casual water), and animal holes. A player gets free relief in the general area by dropping within one club-length of the nearest point of complete relief, not nearer the hole. On the putting green, the ball is placed at the nearest point of complete relief. In a bunker, the nearest point of complete relief must be in the bunker (or the player may take back-on-the-line relief outside the bunker for one penalty stroke). No free relief is available from abnormal conditions in a penalty area.',
    category: 'Rules',
    img: '/images/golf/abnormal-conditions.webp',
    sub: []
  },
  {
    id: 'golf-rule-17',
    rule: 17,
    title: 'Penalty Areas',
    short: 'Yellow and red penalty area relief options.',
    full: 'Penalty areas are defined by yellow or red stakes/lines. A player may play the ball as it lies in a penalty area without restriction (may ground the club, remove loose impediments). If the player takes relief (one penalty stroke): from a yellow penalty area, the player may (a) take stroke-and-distance relief or (b) drop on the line from the hole through the point where the ball last crossed the edge of the penalty area, going back as far as desired. From a red penalty area, the player has the same two options plus (c) lateral relief — drop within two club-lengths of where the ball last crossed the edge, not nearer the hole.',
    category: 'Rules',
    img: '/images/golf/penalty-areas.webp',
    sub: []
  },
  {
    id: 'golf-rule-18',
    rule: 18,
    title: 'Stroke-and-Distance Relief, Out of Bounds, Lost Ball',
    short: 'One-stroke penalty for OB, lost balls, and provisional balls.',
    full: 'If a ball is out of bounds (beyond white stakes/lines) or lost (not found within 3 minutes), the player must take stroke-and-distance relief: play again from where the previous stroke was made, adding one penalty stroke. A provisional ball may be played if the original might be out of bounds or lost (not in a penalty area). The player must announce "provisional ball" before playing it. The provisional ball becomes the ball in play if the original is lost or out of bounds. A local rule may allow an alternative to stroke-and-distance for lost or OB balls: dropping in the vicinity of where the ball was lost/went OB for a two-stroke penalty.',
    category: 'Rules',
    img: '/images/golf/stroke-distance.webp',
    sub: []
  },
  {
    id: 'golf-rule-19',
    rule: 19,
    title: 'Unplayable Ball',
    short: 'Three relief options for an unplayable lie.',
    full: 'A player may declare their ball unplayable anywhere on the course except in a penalty area (always one penalty stroke). The three options are: (1) stroke-and-distance relief — play from where the previous stroke was made, (2) back-on-the-line relief — drop on the line from the hole through where the ball lies, going back as far as desired, (3) lateral relief — drop within two club-lengths of where the ball lies, not nearer the hole. If the ball is in a bunker, options 2 and 3 must be taken in the bunker, or the player may take back-on-the-line relief outside the bunker for two penalty strokes. The player is the sole judge of whether a ball is unplayable.',
    category: 'Rules',
    img: '/images/golf/unplayable.webp',
    sub: []
  },
  {
    id: 'golf-rule-20',
    rule: 20,
    title: 'Resolving Rules Issues During Round',
    short: 'Procedures for uncertain situations and rulings.',
    full: 'Players must not agree to ignore any rule or penalty. In stroke play, if uncertain about the right procedure, a player may play two balls and report the situation to the Committee before returning the scorecard. The Committee will then determine which ball counts and whether any penalty applies. In match play, players may agree on how to decide a rules issue if a referee is not available; if they unknowingly agree on a wrong ruling, the result stands unless corrected before either player makes a stroke on the next tee. A referee\'s ruling is final during the round.',
    category: 'Rules',
    img: '/images/golf/rulings.webp',
    sub: []
  },
  {
    id: 'golf-rule-21',
    rule: 21,
    title: 'Other Forms of Individual Stroke Play',
    short: 'Stableford, Maximum Score, and Par/Bogey formats.',
    full: 'Stableford scoring awards points based on the score relative to a fixed target (usually par): 0 points for double bogey or worse, 1 for bogey, 2 for par, 3 for birdie, 4 for eagle, 5 for albatross. The highest point total wins. Maximum Score sets a maximum per-hole score set by the Committee (such as double par or triple bogey); a player who reaches the maximum picks up. Par/Bogey is scored hole by hole — a player wins the hole by scoring the target or better, loses by scoring higher. These formats speed up play by allowing players to pick up when they cannot achieve a useful score.',
    category: 'General',
    img: '/images/golf/other-formats.webp',
    sub: []
  },
  {
    id: 'golf-rule-22',
    rule: 22,
    title: 'Foursomes',
    short: 'Two-player team format with alternate shot.',
    full: 'In Foursomes (also called alternate shot), two partners form a side and play one ball. They take turns playing strokes — one player tees off on odd-numbered holes, the other on even-numbered holes. Partners alternate strokes until the ball is holed. If a stroke is made out of turn, it is cancelled, a penalty is applied, and the correct partner must play. In stroke play Foursomes, only one scorecard is used per side. Penalty strokes do not affect the alternating order. This format is popular in the Ryder Cup, Solheim Cup, and Presidents Cup.',
    category: 'Formats',
    img: '/images/golf/foursomes.webp',
    sub: []
  },
  {
    id: 'golf-rule-23',
    rule: 23,
    title: 'Four-Ball',
    short: 'Two-player team using the better ball of the partnership.',
    full: 'In Four-Ball, two partners each play their own ball throughout the round. The lower score of the two partners is the side\'s score for each hole. In match play, each partner plays against the opposing partners\' better ball. A partner may stop playing a hole at any time without penalty to the side. If one partner breaches a rule, the penalty generally applies only to that partner; however, if the breach assists the other partner, the other partner is also penalized. Partners may share clubs as long as the combined total does not exceed 14.',
    category: 'Formats',
    img: '/images/golf/four-ball.webp',
    sub: []
  },
  {
    id: 'golf-rule-24',
    rule: 24,
    title: 'Team Competitions',
    short: 'Rules for multi-player team events.',
    full: 'A team competition involves teams of players competing against other teams. The Committee establishes the conditions, including team size, format (stroke play or match play), how team scores are calculated, and any handicap allowances. Common team formats include total of individual scores, best scores counting (e.g., best 4 of 5), and combined match play results. The Committee may allow team captains to give advice to team members. Teams may have a designated team captain who may or may not be a competing player. Local rules for team competitions may modify standard rules regarding advice, pace of play, and order of play.',
    category: 'Formats',
    img: '/images/golf/team-competitions.webp',
    sub: []
  }
];

export default golfRules;
