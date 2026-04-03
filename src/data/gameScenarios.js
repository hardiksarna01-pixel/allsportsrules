// Ref Decision scenarios and Rule or Myth data for mini-games

export const refScenarios = [
  // Cricket
  {
    sport: "Cricket",
    scenario: "A batsman hits the ball, it bounces once and a fielder catches it. The batsman is given out caught. But the delivery was a no-ball. What is the correct decision?",
    options: ["Out - caught", "Not out - you cannot be caught off a no-ball", "Out - but batsman gets 1 run added", "Umpire's discretion"],
    correct: 1,
    explanation: "A batsman cannot be given out caught off a no-ball. However, they can still be run out off a no-ball."
  },
  {
    sport: "Cricket",
    scenario: "The ball hits the batsman's pad. Hawk-Eye shows the ball clipping leg stump with 49% of the ball hitting the stumps. The on-field umpire gave it NOT out. What happens on DRS review?",
    options: ["Overturned to OUT", "Stays NOT out - need more than 50%", "Umpire reviews it again live", "Third umpire decides using their own judgment"],
    correct: 1,
    explanation: "For DRS to overturn an on-field decision, more than 50% of the ball must be hitting the stumps (known as 'Umpire's Call'). At 49%, the on-field decision stands."
  },
  {
    sport: "Cricket",
    scenario: "A bowler bowls a bouncer that goes over the batsman's head without the batsman attempting a shot. What should the umpire call?",
    options: ["No ball - too high", "Wide", "Dead ball", "Legal delivery - play on"],
    correct: 1,
    explanation: "A ball that passes over head height of the batsman standing upright is called a wide, not a no-ball. A no-ball for height applies only when the ball reaches the batsman above shoulder height (above waist in ODIs for full tosses)."
  },
  {
    sport: "Cricket",
    scenario: "In a T20 match, the bowler has already bowled 2 bouncers in the over. He bowls another short-pitched delivery above shoulder height. What happens?",
    options: ["Legal delivery - no limit on bouncers in T20", "No ball - only 2 bouncers per over allowed in T20", "Free hit awarded", "Wide ball"],
    correct: 1,
    explanation: "In T20 internationals, only 2 bouncers per over are permitted. The third bouncer above shoulder height is called a no-ball, which also results in a free hit."
  },
  // Football
  {
    sport: "Football",
    scenario: "A goalkeeper picks up a back-pass that was deliberately kicked to them by a teammate. What should the referee award?",
    options: ["Direct free kick to the opposition", "Indirect free kick to the opposition", "Penalty kick", "Drop ball"],
    correct: 1,
    explanation: "The back-pass rule results in an indirect free kick from where the goalkeeper handled the ball. It is never a penalty, even if the goalkeeper handles it inside the penalty area."
  },
  {
    sport: "Football",
    scenario: "A player takes a throw-in and throws the ball directly into the opponent's goal without anyone else touching it. What happens?",
    options: ["Goal stands", "Goal kick to the defending team", "Corner kick", "Throw-in retaken"],
    correct: 1,
    explanation: "A goal cannot be scored directly from a throw-in. If the ball goes directly into the opponent's goal, a goal kick is awarded. If it goes into the thrower's own goal, a corner kick is awarded."
  },
  {
    sport: "Football",
    scenario: "During a penalty shootout, the goalkeeper moves off the line before the kick is taken and saves the penalty. VAR confirms the goalkeeper moved early. What happens?",
    options: ["Goal awarded automatically", "Penalty retaken, goalkeeper warned", "Penalty retaken, goalkeeper yellow-carded", "Save stands - goalkeeper was close enough"],
    correct: 1,
    explanation: "Under current rules, the penalty is retaken and the goalkeeper is warned (or cautioned on repeated offences). The goalkeeper must have at least one foot on or in line with the goal line when the kick is taken."
  },
  // Basketball
  {
    sport: "Basketball",
    scenario: "A player catches their own airball (a shot that hits neither the rim nor the backboard). What is the call?",
    options: ["Legal play - they recovered their own shot", "Travelling violation", "Double dribble", "Shot clock reset"],
    correct: 1,
    explanation: "If a shot does not hit the rim or backboard, the shooter cannot be the first to touch it. Catching your own airball is a travelling violation in the NBA."
  },
  {
    sport: "Basketball",
    scenario: "A player is fouled while shooting a 3-pointer. The shot goes in. How many free throws do they get?",
    options: ["Three free throws", "One free throw", "Two free throws", "No free throws - basket counts and play resumes"],
    correct: 1,
    explanation: "When a player is fouled on a made basket, they receive one free throw (an 'and-one') regardless of whether it was a 2-pointer or 3-pointer. The basket counts plus one free throw."
  },
  {
    sport: "Basketball",
    scenario: "With 2 seconds left, a player inbounds the ball and it bounces off a defender and goes into the basket. Does it count?",
    options: ["No - an inbound pass cannot score directly", "Yes - counts as 2 points for the inbounding team", "Yes - counts as 2 points for the defending team", "Replay the inbound"],
    correct: 1,
    explanation: "If the ball deflects off a defender and goes in, 2 points are awarded to the team whose basket it is. However, a player cannot score directly from an inbound pass without the ball being touched by someone on the court first."
  },
  // Tennis
  {
    sport: "Tennis",
    scenario: "A player hits a shot that goes around the net post and lands in the court. The ball never went over the net. Is this legal?",
    options: ["No - the ball must go over the net", "Yes - the ball does not have to go over the net", "Only legal in doubles", "Legal but replay the point"],
    correct: 1,
    explanation: "A shot that goes around the net post ('around the post') is completely legal in tennis. The ball does not need to pass over the net; it only needs to land in the correct court."
  },
  {
    sport: "Tennis",
    scenario: "During a rally, a player's hat falls off and lands on their side of the court. The opponent calls a let. What happens?",
    options: ["Let is played - point replayed", "No let - play continues", "Point awarded to the opponent", "Point to the player who lost the hat"],
    correct: 1,
    explanation: "If any object falls from a player during a rally (other than the racquet), the opponent can request a let. However, it is typically only on the first occurrence; repeated instances result in the point being awarded to the opponent."
  },
  // F1
  {
    sport: "Formula 1",
    scenario: "During a race under Safety Car conditions, a driver overtakes another car to unlap themselves. What is the ruling?",
    options: ["5-second penalty for overtaking under Safety Car", "Allowed - lapped cars may unlap themselves when instructed", "Drive-through penalty", "10-second stop-go penalty"],
    correct: 1,
    explanation: "The Race Director can instruct lapped cars to overtake the Safety Car and unlap themselves. This is legal and standard procedure to set up a clean restart."
  },
  {
    sport: "Formula 1",
    scenario: "A driver exceeds track limits at Turn 4 for the fourth time during the race. What penalty do they receive?",
    options: ["No penalty until 5 times", "Black and white flag (warning), then 5-second penalty next time", "Immediate 5-second time penalty", "Drive-through penalty"],
    correct: 1,
    explanation: "Under current FIA rules, the first three track limit violations receive warnings. The fourth earns a black-and-white flag (formal warning). Continued violations lead to a 5-second penalty."
  },
  // Rugby
  {
    sport: "Rugby",
    scenario: "A player knocks the ball forward and it bounces off an opponent before going to ground. Is this a knock-on?",
    options: ["Yes - always a knock-on", "No - the ball touched an opponent, so play continues", "Scrum to the opposition", "Depends on whether the opponent played at the ball"],
    correct: 1,
    explanation: "If the ball deflects forward off an opponent, it is not a knock-on. Play continues. The key question is whether the original player propelled the ball forward deliberately or accidentally."
  },
  {
    sport: "Rugby",
    scenario: "A player scores a try but the referee is unsure if the ball was grounded correctly. They go to the TMO (Television Match Official). What does the TMO need to award the try?",
    options: ["51% probability it was scored", "Clear and obvious evidence it was scored", "Any angle showing grounding", "Majority of cameras must confirm"],
    correct: 1,
    explanation: "The TMO needs clear and obvious evidence to award a try. If there is any doubt, the on-field decision stands. This is the 'clear and obvious' standard, not a balance of probability."
  },
  // Boxing
  {
    sport: "Boxing",
    scenario: "A boxer is knocked down and gets up at the count of 8. The referee asks if they can continue and they nod. The referee waves the fight off anyway. Is this allowed?",
    options: ["No - if the boxer says they can continue, the fight must go on", "Yes - the referee can stop the fight at any time for safety", "Only the ringside doctor can stop the fight", "The corner must throw in the towel"],
    correct: 1,
    explanation: "The referee has full authority to stop a fight at any time if they believe a boxer cannot safely continue, regardless of whether the boxer protests. This is for the boxer's safety."
  },
  {
    sport: "Boxing",
    scenario: "A boxer is knocked down three times in the same round. What happens under most professional boxing rules?",
    options: ["Fight continues after each knockdown count", "Automatic TKO - three knockdown rule", "Referee's discretion each time", "Automatic draw declared"],
    correct: 1,
    explanation: "Most professional boxing commissions enforce the 'three knockdown rule' - if a boxer is knocked down three times in a single round, the fight is stopped as a TKO."
  },
  // NFL
  {
    sport: "NFL",
    scenario: "A receiver catches the ball with one foot inbounds and one foot out of bounds in the end zone. Is it a touchdown?",
    options: ["Yes - one foot is enough in the NFL", "No - both feet must be inbounds", "No - need one foot and a knee", "Touchdown only if they maintain control"],
    correct: 1,
    explanation: "In the NFL, a receiver needs TWO feet inbounds (or one knee/elbow) for a completed catch. With only one foot inbounds, it is an incomplete pass. This differs from college football, which requires only one foot."
  },
  {
    sport: "NFL",
    scenario: "On 4th down, the offense commits a false start penalty. What happens?",
    options: ["5-yard penalty, replay 4th down", "Loss of downs, turnover on downs", "10-yard penalty, replay 4th down", "Offset by automatic first down"],
    correct: 0,
    explanation: "A false start is a 5-yard penalty and the down is replayed. It does not result in a loss of down. The offense would replay 4th down but now from 5 yards further back."
  },
  // Swimming
  {
    sport: "Swimming",
    scenario: "In a 100m breaststroke race, a swimmer does a dolphin kick off the wall during the turn. What happens?",
    options: ["Legal - one dolphin kick is allowed on each turn", "Disqualified - only breaststroke kick is allowed", "Warning for first offence", "Legal - any kick is allowed underwater"],
    correct: 0,
    explanation: "Since 2005, FINA/World Aquatics allows one dolphin kick during the underwater pullout phase of each turn and at the start in breaststroke. This was a major rule change."
  },
  {
    sport: "Swimming",
    scenario: "A swimmer in backstroke turns onto their front to do a tumble turn at the wall. Is this legal?",
    options: ["Yes - as long as the turn is continuous", "No - they must touch the wall on their back", "Only in 200m backstroke, not 100m", "Legal but they must be on their back when they push off"],
    correct: 0,
    explanation: "In backstroke, a swimmer may turn onto their front to execute a flip turn as long as the turning motion is continuous and they push off the wall on their back. This is standard technique."
  },
  // Pickleball
  {
    sport: "Pickleball",
    scenario: "A player steps into the non-volley zone (kitchen) and volleys the ball. Their partner, standing outside the kitchen, claims the point. What happens?",
    options: ["Fault - you cannot volley while in the kitchen", "Legal if the ball was above net height", "Legal if the player jumped before hitting", "Point replayed"],
    correct: 0,
    explanation: "It is always a fault to volley the ball while standing in or touching the non-volley zone (the kitchen). This includes if any momentum carries you into the zone after a volley."
  },
  {
    sport: "Pickleball",
    scenario: "On the serve, the ball hits the net and lands in the correct service area. What happens?",
    options: ["Let - serve is replayed", "The serve is good, play continues", "Fault - point to the receiver", "Server gets a second serve attempt"],
    correct: 1,
    explanation: "In pickleball (since 2021 rule change), there are no let serves. If the serve hits the net and lands in the correct service area, it is a live ball and play continues."
  },
];

export const ruleOrMyth = [
  // Cricket
  {
    statement: "In cricket, a batsman can be given out 'Obstructing the field' even if they use their bat to block the ball from hitting the stumps.",
    isTrue: false,
    sport: "Cricket",
    explanation: "A batsman can use their bat to protect their wicket from being hit. The obstruction rule applies to deliberately obstructing a fielder's attempt to field the ball or make a run-out, not protecting the stumps with the bat."
  },
  {
    statement: "In Test cricket, a new ball becomes available to the fielding side after 80 overs.",
    isTrue: true,
    sport: "Cricket",
    explanation: "After 80 overs in Test cricket, the fielding captain can request a new ball. The old ball may reverse swing, so sometimes captains delay taking the new ball."
  },
  {
    statement: "A batsman can be run out off a no-ball delivery.",
    isTrue: true,
    sport: "Cricket",
    explanation: "While a batsman cannot be bowled, caught, stumped, or LBW off a no-ball, they can still be run out, hit the ball twice, or obstruct the field."
  },
  // Football
  {
    statement: "A referee can give a red card to a substitute player sitting on the bench.",
    isTrue: true,
    sport: "Football",
    explanation: "Referees have authority over substitutes and team officials. A substitute can receive a red card for violent conduct, offensive language, or other sending-off offences, even from the bench."
  },
  {
    statement: "The away goals rule is still used in the UEFA Champions League.",
    isTrue: false,
    sport: "Football",
    explanation: "UEFA abolished the away goals rule in 2021. Two-legged ties that are level on aggregate now go to extra time and penalties, regardless of away goals."
  },
  {
    statement: "A goalkeeper can score directly from a goal kick.",
    isTrue: true,
    sport: "Football",
    explanation: "A goal can be scored directly from a goal kick, though it is extremely rare. The ball is in play once it has been kicked and clearly moves."
  },
  {
    statement: "If the ball hits the referee and goes into the goal, the goal stands.",
    isTrue: false,
    sport: "Football",
    explanation: "Since 2019, if the ball touches the referee and goes into the goal, creates a promising attack, or changes possession, play is stopped with a dropped ball. The goal would not stand."
  },
  // Basketball
  {
    statement: "In the NBA, a player can step out of bounds and be the first to touch the ball when they return inbounds.",
    isTrue: false,
    sport: "Basketball",
    explanation: "A player who steps out of bounds cannot be the first to touch the ball when they return. This is a violation and results in a turnover."
  },
  {
    statement: "An NBA game can end in a tie.",
    isTrue: false,
    sport: "Basketball",
    explanation: "NBA games cannot end in a tie. If the score is level at the end of regulation, overtime periods of 5 minutes are played until a winner is determined."
  },
  {
    statement: "The 3-point line distance in the NBA is the same as in FIBA (international) basketball.",
    isTrue: false,
    sport: "Basketball",
    explanation: "The NBA 3-point line is 23 feet 9 inches (7.24m) at its farthest, while the FIBA line is 22 feet 1.75 inches (6.75m). The NBA line is significantly farther."
  },
  // Tennis
  {
    statement: "In tennis, the server must stand behind the baseline and between the centre mark and the singles sideline when serving.",
    isTrue: true,
    sport: "Tennis",
    explanation: "The server must stand behind the baseline, between the centre mark and the sideline, without touching either. The server alternates serving from the deuce (right) and advantage (left) sides."
  },
  {
    statement: "A tennis player can hit the ball before it crosses the net to their side.",
    isTrue: false,
    sport: "Tennis",
    explanation: "A player cannot reach over the net to hit the ball. The ball must cross the net to the player's side before they can hit it. The only exception is if the ball bounces back over the net due to spin."
  },
  {
    statement: "At Wimbledon, there is no tiebreak in the final set.",
    isTrue: false,
    sport: "Tennis",
    explanation: "Since 2019, Wimbledon uses a final-set tiebreak, but only when the score reaches 12-12. Before 2019, there was no tiebreak and the final set was played to a 2-game advantage."
  },
  // F1
  {
    statement: "An F1 driver receives a penalty if they cause a collision during a race start.",
    isTrue: false,
    sport: "Formula 1",
    explanation: "First-lap incidents are treated more leniently by stewards. While a penalty can be given, stewards recognize that close racing on lap 1 often leads to unavoidable contact, so racing incidents at the start often go unpunished."
  },
  {
    statement: "F1 cars have a speed limit in the pit lane.",
    isTrue: true,
    sport: "Formula 1",
    explanation: "The pit lane speed limit is typically 80 km/h during races and 60 km/h during practice sessions. Exceeding the limit results in a time penalty or fine."
  },
  {
    statement: "If it rains during an F1 race, the race is automatically red-flagged.",
    isTrue: false,
    sport: "Formula 1",
    explanation: "Rain does not automatically red-flag a race. The Race Director may deploy the Safety Car or red flag the race if conditions become too dangerous, but light rain is raced through with wet or intermediate tyres."
  },
  // Rugby
  {
    statement: "In rugby, a player can pass the ball forward as long as it's within 1 metre.",
    isTrue: false,
    sport: "Rugby",
    explanation: "There is no 'within 1 metre' exception. Any forward pass is illegal in rugby, regardless of distance. The ball must travel backwards relative to the passer (though momentum can carry it forward in flight)."
  },
  {
    statement: "A penalty try in rugby is automatically converted (no kick required).",
    isTrue: true,
    sport: "Rugby",
    explanation: "Since 2017, a penalty try is worth 7 points with no conversion kick needed. It is awarded when a try would probably have been scored if not for foul play by the defending team."
  },
  // Boxing
  {
    statement: "A boxer who is knocked out of the ring gets a count of 20 to return.",
    isTrue: true,
    sport: "Boxing",
    explanation: "If a boxer is knocked through the ropes and out of the ring, they are given a count of 20 (not the usual 10) to get back into the ring and continue fighting."
  },
  {
    statement: "In professional boxing, hitting the back of the head (rabbit punch) is legal.",
    isTrue: false,
    sport: "Boxing",
    explanation: "Rabbit punches (hits to the back of the head/neck) are strictly illegal in boxing due to the severe risk of spinal injury. Repeated rabbit punches can lead to point deductions or disqualification."
  },
  // NFL
  {
    statement: "In the NFL, both teams get a possession in overtime.",
    isTrue: true,
    sport: "NFL",
    explanation: "Since the 2022 rule change, both teams are guaranteed at least one possession in playoff overtime. In the regular season, if the first team scores a touchdown, the game ends."
  },
  {
    statement: "An NFL team can score 1 point without first scoring a touchdown.",
    isTrue: false,
    sport: "NFL",
    explanation: "A 1-point score (extra point/PAT) can only follow a touchdown. The only way to score 1 point is via the PAT kick after a touchdown. You cannot score 1 point independently."
  },
  // Swimming
  {
    statement: "In competitive swimming, swimmers can swim underwater for the entire race if they want.",
    isTrue: false,
    sport: "Swimming",
    explanation: "Swimmers are limited to 15 metres underwater after starts and turns (except in breaststroke, which has its own underwater rules). After 15m, the swimmer's head must break the surface."
  },
  {
    statement: "In the butterfly stroke, both arms must move simultaneously.",
    isTrue: true,
    sport: "Swimming",
    explanation: "In butterfly, both arms must move together over the water and pull through simultaneously underwater. Alternating arm movements would result in disqualification."
  },
  // Pickleball
  {
    statement: "In pickleball, only the serving team can score points.",
    isTrue: true,
    sport: "Pickleball",
    explanation: "Traditional pickleball uses side-out scoring where only the serving team can score. However, rally scoring (where either team can score) is becoming more common in some tournament formats."
  },
  {
    statement: "In pickleball doubles, both players on a team get to serve before a side-out (except at the start of the game).",
    isTrue: true,
    sport: "Pickleball",
    explanation: "In doubles, both players on a team serve and can score points before the serve passes to the opponents (side-out). The exception is at the very start, where only one player serves."
  },
];
