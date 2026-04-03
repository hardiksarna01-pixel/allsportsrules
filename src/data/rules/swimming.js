export const swimmingRules = [
  {
    id: 'swimming-rule-1',
    rule: 1,
    title: 'Facility Requirements',
    short: 'Venue standards for competitive swimming.',
    full: 'The competition venue must have adequate lighting (minimum 1500 lux for international competitions), a functioning timing system, and an electronic scoreboard visible to spectators. Water temperature must be maintained between 25°C and 28°C (77°F-82°F) for pool swimming. The venue must have adequate warm-up facilities, either in the competition pool or a separate warm-up pool. Anti-wave lane lines must separate all lanes. Starting blocks must be adjustable and firmly secured, with a height between 0.50 and 0.75 metres above the water surface. Backstroke ledges may be provided on starting blocks for backstroke starts. False start ropes are suspended across the pool at least 15 metres from the starting end.',
    category: 'Facilities',
    img: '/images/swimming/facility.webp',
    sub: []
  },
  {
    id: 'swimming-rule-2',
    rule: 2,
    title: 'Pool Dimensions',
    short: 'Standard pool sizes and lane configurations.',
    full: 'Olympic and World Championship pools are 50 metres long (long course) with a tolerance of +0.03 m/-0.00 m. Short course pools are 25 metres long. The pool must be at least 2.0 metres deep (preferably 3.0 metres for major competitions). Pools have 8 lanes for major competitions (10 lanes in some venues, with lanes 0 and 9 unused for competition). Each lane is 2.5 metres wide. The distance from the wall to the first lane line centre is 2.5 metres. Touchpads at each end are 2.4 metres wide, 0.9 metres high, and 0.01 metre thick. Lane lines are colour-coded: green for lanes 1 and 8, blue for lanes 2-3 and 6-7, and yellow for lanes 4 and 5. The 15-metre mark and 5-metre mark from each wall are indicated by a change in lane line colour.',
    category: 'Facilities',
    img: '/images/swimming/pool.webp',
    sub: []
  },
  {
    id: 'swimming-rule-3',
    rule: 3,
    title: 'Starting Procedures',
    short: 'Commands, false starts, and starting positions.',
    full: 'For freestyle, breaststroke, butterfly, and individual medley, the starter commands "Take your marks." Swimmers mount the starting block and assume a stationary starting position. When all swimmers are stationary, the starter fires the starting signal. A false start occurs when a swimmer moves before the starting signal. Swimmers are allowed one false start; a second false start by any swimmer results in disqualification of the swimmer who false-started. In backstroke and backstroke-led medley relay, swimmers start in the water facing the wall, gripping the starting grips or gutter. Relay takeoffs must occur after the incoming swimmer touches the wall — the outgoing swimmer\'s feet must still be on the block when the incoming swimmer touches.',
    category: 'Gameplay',
    img: '/images/swimming/starting.webp',
    sub: []
  },
  {
    id: 'swimming-rule-4',
    rule: 4,
    title: 'Freestyle',
    short: 'Any stroke is permitted — typically front crawl.',
    full: 'In freestyle events, the swimmer may swim any stroke. In practice, front crawl (alternating overarm strokes with flutter kick) is used almost universally because it is the fastest stroke. The swimmer must touch the wall at each turn and at the finish with any part of the body. The swimmer must surface by the 15-metre mark after the start and each turn (the swimmer may be completely submerged for up to 15 metres). Some part of the swimmer must break the surface at all times during the race except during turns and the start underwater phase. In medley events, freestyle means any stroke other than backstroke, breaststroke, or butterfly.',
    category: 'Strokes',
    img: '/images/swimming/freestyle.webp',
    sub: []
  },
  {
    id: 'swimming-rule-5',
    rule: 5,
    title: 'Backstroke',
    short: 'Swimming on the back with alternating arm strokes.',
    full: 'Swimmers start in the water facing the wall. At the starting signal, and at turns, the swimmer pushes off on the back. The swimmer must swim on the back at all times except when executing a turn. Some part of the swimmer must break the surface at all times except for 15 metres after the start and each turn, during which the swimmer may be completely submerged. At the turn, the swimmer may rotate onto the breast (stomach) to execute a continuous turning action (the "backstroke flip turn") but must return to the back before the feet leave the wall. The swimmer must finish on the back, touching the wall with any part of the body while on the back.',
    category: 'Strokes',
    img: '/images/swimming/backstroke.webp',
    sub: []
  },
  {
    id: 'swimming-rule-6',
    rule: 6,
    title: 'Breaststroke',
    short: 'Simultaneous arm and leg movements with specific technique.',
    full: 'In breaststroke, the body must be on the breast at all times (no rolling onto the back). The arm stroke and kick must be simultaneous and in the same horizontal plane. The hands must be pushed forward together from the breast and brought back simultaneously on or under the surface of the water (hands must not go past the hipline except during the first stroke after the start and each turn). The kick must be a simultaneous and symmetrical "whip kick" — alternating or scissor kicks are not permitted. The feet must be turned outward during the propulsive part of the kick. After the start and each turn, the swimmer may take one complete arm stroke entirely under water (pulling down to the legs) followed by one butterfly kick before surfacing. The swimmer must touch the wall with both hands simultaneously at each turn and at the finish.',
    category: 'Strokes',
    img: '/images/swimming/breaststroke.webp',
    sub: []
  },
  {
    id: 'swimming-rule-7',
    rule: 7,
    title: 'Butterfly',
    short: 'Simultaneous overarm recovery with dolphin kick.',
    full: 'In butterfly, both arms must move simultaneously over the water (recovery) and pull simultaneously under the water. The body must remain on the breast at all times (except at the turn). The kick must be simultaneous — a "dolphin kick" where both legs move up and down together. Alternating leg movements (flutter kick) are not permitted, though slight asymmetry is tolerated. After the start and each turn, the swimmer may take one or more butterfly kicks underwater but must surface by the 15-metre mark. The swimmer must touch the wall with both hands simultaneously at each turn and at the finish. The touch must be at or above the water surface.',
    category: 'Strokes',
    img: '/images/swimming/butterfly.webp',
    sub: []
  },
  {
    id: 'swimming-rule-8',
    rule: 8,
    title: 'Individual Medley',
    short: 'Four strokes in order: butterfly, backstroke, breaststroke, freestyle.',
    full: 'In individual medley (IM) events, the swimmer swims one-quarter of the race in each of the four strokes in this order: butterfly, backstroke, breaststroke, and freestyle. The freestyle portion must be a stroke other than butterfly, backstroke, or breaststroke (typically front crawl). Each stroke must conform to its respective rules. The transition from butterfly to backstroke requires the swimmer to touch the wall with both hands simultaneously (butterfly finish) and then push off on the back. The transition from backstroke to breaststroke requires the swimmer to finish on the back and then begin breaststroke. Standard IM distances are 200m (50m per stroke) and 400m (100m per stroke).',
    category: 'Strokes',
    img: '/images/swimming/medley.webp',
    sub: []
  },
  {
    id: 'swimming-rule-9',
    rule: 9,
    title: 'Relay Races',
    short: 'Four swimmers per team with exchange rules.',
    full: 'A relay team consists of four swimmers, each swimming an equal distance. In freestyle relays, each swimmer swims freestyle. In medley relays, the order is backstroke, breaststroke, butterfly, and freestyle (different from individual medley order because the backstroke swimmer must start in the water). The outgoing swimmer may not leave the starting block until the incoming swimmer has touched the wall. Early takeoff (leaving before the touch) results in disqualification of the team. Relay teams must be named before the race, but the order may be changed up until the submission deadline. A swimmer who has raced in heats may be replaced for the final, and any swimmer on the team roster may swim in the final.',
    category: 'Gameplay',
    img: '/images/swimming/relay.webp',
    sub: []
  },
  {
    id: 'swimming-rule-10',
    rule: 10,
    title: 'Timing and Results',
    short: 'Electronic timing systems and record standards.',
    full: 'Automatic officiating equipment (AOE) includes touchpads, starting sensors, and relay takeoff sensors. Times are recorded to the hundredth of a second (0.01s). Semi-automatic and manual timing may serve as backup. If two or more swimmers record the same time, they are awarded the same place (no tie-breaking by thousandths). In cases of a tie for a qualifying position in heats, a swim-off may be held. World records must be achieved in a 50-metre pool (long course records) or 25-metre pool (short course records) using approved electronic timing. Records are recognized to the hundredth of a second. Relay world records require all four swimmers to be eligible under the record-setting criteria.',
    category: 'Officials',
    img: '/images/swimming/timing.webp',
    sub: []
  },
  {
    id: 'swimming-rule-11',
    rule: 11,
    title: 'Disqualification Offenses',
    short: 'Actions that result in disqualification from a race.',
    full: 'Common disqualification (DQ) offenses include: false start (after the allowed one), walking on or pushing off the bottom of the pool (in races other than open water), pulling on the lane line, obstructing another swimmer, not finishing the race, performing a wrong stroke or kick (e.g., flutter kick in breaststroke, one-hand touch in butterfly), not touching the wall at a turn or finish, swimming more than 15 metres underwater after a start or turn, not surfacing before the 15-metre mark, leaving the block early in a relay exchange, and unsportsmanlike conduct. The referee has the authority to disqualify a swimmer for any violation of the rules. A disqualified swimmer\'s time is not recorded for official purposes.',
    category: 'Discipline',
    img: '/images/swimming/dq.webp',
    sub: []
  },
  {
    id: 'swimming-rule-12',
    rule: 12,
    title: 'Open Water Swimming',
    short: 'Rules for marathon and distance swimming in natural waters.',
    full: 'Open water swimming events take place in rivers, lakes, seas, or oceans. Standard distances are 5 km, 10 km (Olympic marathon swim), and 25 km. The course is defined by buoys and must be accurately measured. Water temperature must be between 16°C and 31°C. If the temperature is below 18°C, wetsuits (up to 5 mm thickness) are permitted. Feeding stations are provided on pontoons; swimmers may receive food and drink from authorized handlers but must not be touched. Swimmers may not draft (swim directly behind) a safety boat. If a swimmer is in medical distress, safety personnel in kayaks and boats may remove them from the water. Swimmers must not impede others (penalty: time addition or disqualification). Drafting behind another swimmer is a legitimate tactic. The finish is determined by electronic timing on a finish pontoon or touchpad.',
    category: 'Variations',
    img: '/images/swimming/open-water.webp',
    sub: []
  }
];

export default swimmingRules;
