export const mmaRules = [
  {
    id: 'mma-rule-1',
    rule: 1,
    title: 'Weight Classes',
    short: 'Twelve divisions from strawweight to heavyweight.',
    full: 'The Unified Rules of MMA recognize the following weight classes: Strawweight (up to 115 lbs / 52.2 kg), Flyweight (up to 125 lbs / 56.7 kg), Bantamweight (up to 135 lbs / 61.2 kg), Featherweight (up to 145 lbs / 65.8 kg), Lightweight (up to 155 lbs / 70.3 kg), Super Lightweight (up to 165 lbs / 74.8 kg), Welterweight (up to 170 lbs / 77.1 kg), Super Welterweight (up to 175 lbs / 79.4 kg), Middleweight (up to 185 lbs / 83.9 kg), Light Heavyweight (up to 205 lbs / 93 kg), Heavyweight (up to 265 lbs / 120.2 kg), and Super Heavyweight (no upper limit). Fighters weigh in the day before the bout. A one-pound allowance is granted for non-title fights. Missing weight may result in a percentage of the purse being forfeited to the opponent and the fight proceeding at a catchweight.',
    category: 'General',
    img: '/images/mma/weight-classes.webp',
    sub: []
  },
  {
    id: 'mma-rule-2',
    rule: 2,
    title: 'Round Duration',
    short: 'Three or five rounds of five minutes each.',
    full: 'Non-championship bouts consist of three rounds of five minutes each, with one-minute rest periods between rounds. Championship bouts and main event fights consist of five rounds of five minutes each, with one-minute rest periods. The timekeeper signals 10 seconds remaining in each round with an audible clap or signal. The round begins when the referee says "fight" or "go" and ends when the horn or bell sounds. If a submission or stoppage occurs simultaneously with the end-of-round signal, the referee determines whether the fight-ending sequence began before the signal. Between rounds, each fighter returns to their corner where their team (cornermen) may provide water, advice, and medical attention such as treating cuts.',
    category: 'General',
    img: '/images/mma/rounds.webp',
    sub: []
  },
  {
    id: 'mma-rule-3',
    rule: 3,
    title: 'The Ring or Cage',
    short: 'Specifications for the fighting enclosure.',
    full: 'MMA may be conducted in a ring or a fenced area (cage). The UFC uses an octagonal cage (the "Octagon") with eight sides, 30 feet in diameter and 6 feet high, enclosed by chain-link fence covered with vinyl. The fighting surface is padded canvas. Other promotions may use a circular or hexagonal cage, or a traditional boxing ring with ropes. The cage fence must be padded at the top and at the posts. The cage must have two entry/exit gates. The fighting area must be between 20 and 32 feet across (ring or cage). The surface must provide traction without being abrasive. No obstructions may be present in the fighting area.',
    category: 'Facilities',
    img: '/images/mma/cage.webp',
    sub: []
  },
  {
    id: 'mma-rule-4',
    rule: 4,
    title: 'Legal Strikes and Techniques',
    short: 'Permitted striking and grappling techniques.',
    full: 'Fighters may strike with punches (closed fist), kicks, knees, and elbows to legal target areas. Legal target areas include the front and sides of the head, the body (torso), and the legs. Fighters may use any form of wrestling takedown, trip, throw, or clinch technique. All forms of submission holds are legal, including chokes (both blood chokes and air chokes), joint locks (armbars, kimuras, heel hooks, kneebars), and compression locks. Fighters may strike from standing, in the clinch, and on the ground (ground-and-pound). Kicks and knees to the body and legs of a standing opponent are permitted. Stomps to the body of a grounded opponent are legal in some jurisdictions under the Unified Rules.',
    category: 'Gameplay',
    img: '/images/mma/legal-strikes.webp',
    sub: []
  },
  {
    id: 'mma-rule-5',
    rule: 5,
    title: 'Illegal Strikes and Techniques',
    short: 'Prohibited attacks that draw fouls or disqualification.',
    full: 'The following strikes and techniques are illegal: headbutts, eye gouging, biting, hair pulling, fish-hooking (inserting fingers into mouth/nose/ear and pulling), groin strikes, strikes to the spine or back of the head (the "mohawk" area), strikes to the throat (direct), small joint manipulation (fingers and toes — must grab four or more fingers together), downward elbow strikes (12-to-6 elbows, striking straight downward), knees to the head of a grounded opponent (in most jurisdictions), kicks to the head of a grounded opponent, soccer kicks to the head of a grounded opponent, and spiking an opponent on their head or neck (pile-driving). Intentionally throwing an opponent out of the ring/cage is also prohibited.',
    category: 'Discipline',
    img: '/images/mma/illegal-strikes.webp',
    sub: []
  },
  {
    id: 'mma-rule-6',
    rule: 6,
    title: 'Fouls and Penalties',
    short: 'Point deductions and disqualification for rule violations.',
    full: 'When a foul is committed, the referee stops the action if necessary and penalizes the offending fighter. The penalty system is: first foul results in a warning, second foul results in a one-point deduction, third and subsequent fouls result in additional point deductions or disqualification. For egregious or intentional fouls, the referee may skip warnings and immediately deduct points or disqualify. If a foul renders a fighter unable to continue, the fight is ruled a no contest if the foul was accidental and occurs before the halfway point of the bout, or a technical decision (using scorecards) if past the halfway point. An intentional foul causing a stoppage results in disqualification. Additional fouls include holding the fence, holding the opponent\'s shorts or gloves, timidity (avoiding contact), and using abusive language.',
    category: 'Discipline',
    img: '/images/mma/fouls.webp',
    sub: []
  },
  {
    id: 'mma-rule-7',
    rule: 7,
    title: 'Judging: 10-Point Must System',
    short: 'Three judges score each round independently.',
    full: 'MMA uses the 10-Point Must System. Three judges score each round independently. The winner of the round receives 10 points and the loser receives 9 or fewer. Judges evaluate effective striking (number and significance of legal strikes landed), effective grappling (takedowns, submission attempts, reversals, positional control), octagon/ring control (dictating pace, position, and location of the fight), and effective aggressiveness (moving forward and attempting to finish the fight). A clear round is scored 10-9. A dominant round (knockdowns, near-finishes, or sustained one-sided control) is 10-8. A thoroughly dominant round may be 10-7. Even rounds are scored 10-10 (extremely rare). At the bout\'s conclusion, the fighter with the higher total wins by decision (unanimous, split, or majority).',
    category: 'Scoring',
    img: '/images/mma/judging.webp',
    sub: []
  },
  {
    id: 'mma-rule-8',
    rule: 8,
    title: 'Win Conditions',
    short: 'KO, TKO, submission, and decision outcomes.',
    full: 'A fight can end by: Knockout (KO) — a fighter is rendered unconscious by a legal strike. Technical Knockout (TKO) — the referee stops the fight because a fighter is no longer intelligently defending themselves, a corner throws in the towel, or a doctor advises the referee to stop. Submission — a fighter verbally submits ("taps out") or physically taps the opponent or the mat, signalling they are caught in a hold. Technical Submission — a fighter goes unconscious from a choke without tapping. Decision — if the fight goes to the scorecards after all rounds, it is decided by unanimous, split, or majority decision. Draw — if scores are even. No Contest — if a fight is stopped due to accidental foul before the halfway point or if the result is later overturned. Disqualification — for intentional or repeated fouls.',
    category: 'Scoring',
    img: '/images/mma/win-conditions.webp',
    sub: []
  },
  {
    id: 'mma-rule-9',
    rule: 9,
    title: 'Doctor Stoppages',
    short: 'Ringside physician authority to stop a fight.',
    full: 'A ringside physician is present at every sanctioned MMA event. The referee may call the doctor into the cage/ring to examine a fighter between rounds or during a break in action. The doctor evaluates cuts (especially those near the eyes that impair vision), swelling, broken bones, and overall fitness to continue. The doctor advises the referee, who makes the final stoppage decision based on the medical recommendation. A fight stopped on the doctor\'s advice is recorded as a TKO (doctor stoppage). If the stoppage is due to an accidental foul (such as an inadvertent headbutt causing a cut), the bout is scored as a technical decision (if past the halfway point) or a no contest (if before). Fighters must pass a pre-fight medical examination and may be given mandatory medical suspensions after the bout.',
    category: 'Officials',
    img: '/images/mma/doctor.webp',
    sub: []
  },
  {
    id: 'mma-rule-10',
    rule: 10,
    title: 'Grounded Fighter',
    short: 'Definition and protections for a fighter on the ground.',
    full: 'Under the 2017 updated Unified Rules, a fighter is considered grounded when any part of the body other than the soles of the feet is touching the ground. This means a fighter with one hand, one knee, or any other body part on the canvas is grounded. A fighter may not knee or kick a grounded opponent to the head. Strikes to the body of a grounded opponent with kicks and knees are generally legal. The previous definition (requiring three points of contact) was changed because fighters were exploiting the rule by placing a hand on the mat to avoid head strikes. The referee will instruct fighters not to kick or knee the head of a downed opponent. Violations result in fouls as outlined in the foul rules.',
    category: 'Rules',
    img: '/images/mma/grounded.webp',
    sub: []
  },
  {
    id: 'mma-rule-11',
    rule: 11,
    title: 'Cage and Fence Use',
    short: 'Rules for using the enclosure during the fight.',
    full: 'Fighters may press opponents against the cage fence and use the fence for leverage during clinch fighting and grappling. Fighters may not grab or hold the fence with their fingers or toes — this is a foul. Hooking fingers through the links of the fence to avoid a takedown or to maintain position is illegal and results in a warning or point deduction. A fighter may use the fence to stand up from the ground (pushing against it). The referee will reposition fighters to the centre of the cage if the action stalls against the fence for an extended period without meaningful activity. If a fighter is caught between the ropes (in a ring) or entangled in the fence, the referee will stop action and reposition the fighters.',
    category: 'Rules',
    img: '/images/mma/fence.webp',
    sub: []
  },
  {
    id: 'mma-rule-12',
    rule: 12,
    title: 'Gloves and Attire',
    short: 'Specifications for MMA gloves and fighter apparel.',
    full: 'MMA gloves are open-fingered, weighing 4 ounces for all UFC bouts (some commissions allow 4-6 ounces). The gloves must be approved by the athletic commission and provided by the promotion. Gloves allow grappling while providing padding for strikes. Fighters must wear approved shorts (no pockets, zippers, or hard materials) and a groin protector (male fighters) or chest protector (optional for female fighters). Mouthguards are mandatory. Fighters must be barefoot — no shoes or foot coverings are permitted. Fighters may not apply grease, oils, or any slippery substance to the body (a cutman may apply petroleum jelly only to the eyebrows and cheekbones to prevent cuts). Fingernails and toenails must be trimmed. Long hair must be secured. No jewelry, piercings, or clothing with rivets or hard materials is permitted.',
    category: 'Equipment',
    img: '/images/mma/gloves.webp',
    sub: []
  }
];

export default mmaRules;
