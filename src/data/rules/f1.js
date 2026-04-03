export const f1Rules = [
  {
    id: 'f1-rule-1',
    rule: 1,
    title: 'Championship Points',
    short: 'Points awarded on a 25-18-15-12-10-8-6-4-2-1 scale for the top ten finishers.',
    full: 'The FIA Formula One World Championship awards points to the top ten finishers in each Grand Prix on the following scale: 1st place receives 25 points, 2nd receives 18, 3rd receives 15, 4th receives 12, 5th receives 10, 6th receives 8, 7th receives 6, 8th receives 4, 9th receives 2, and 10th receives 1 point. An additional point is awarded to the driver who sets the fastest lap of the race, provided that driver finishes in the top ten. Both a Drivers\' Championship and a Constructors\' Championship are contested, with the Constructors\' Championship calculated by summing the points of both drivers from each team at every race.',
    category: 'championship',
    img: '/images/f1/championship-points.webp',
    sub: []
  },
  {
    id: 'f1-rule-2',
    rule: 2,
    title: 'Race Weekend Format',
    short: 'Free practice, qualifying, and race sessions across a Grand Prix weekend.',
    full: 'A standard Formula One Grand Prix weekend consists of three free practice sessions (FP1, FP2, and FP3), a qualifying session, and the race. Free practice sessions allow teams to test setups, gather data, and prepare for qualifying and the race. Qualifying is divided into three segments: Q1 eliminates the slowest five cars, Q2 eliminates the next five, and Q3 determines the top ten grid positions with the fastest driver earning pole position. The race distance must be the least number of complete laps that exceeds 305 kilometres (with the exception of Monaco at approximately 260 kilometres), and must not exceed two hours in duration.',
    category: 'weekend',
    img: '/images/f1/weekend-format.webp',
    sub: []
  },
  {
    id: 'f1-rule-3',
    rule: 3,
    title: 'Starting Grid',
    short: 'Grid positions are determined by qualifying times and any applied penalties.',
    full: 'The starting grid is determined by the results of the qualifying session, with the fastest driver in Q3 starting from pole position at the front of the grid. Grid penalties may be applied for engine or gearbox component changes beyond the seasonal allocation, pit lane infringements during qualifying, or penalties carried over from previous events. If a driver fails to set a qualifying time within 107 percent of the fastest Q1 time, they may not be permitted to start the race unless the stewards grant special permission. Drivers who receive grid penalties that exceed the number of grid positions are placed at the back of the grid.',
    category: 'weekend',
    img: '/images/f1/starting-grid.webp',
    sub: []
  },
  {
    id: 'f1-rule-4',
    rule: 4,
    title: 'Race Start Procedure',
    short: 'Formation lap, standing start with five red lights, and start protocols.',
    full: 'The race start procedure begins with a formation lap during which cars follow the pole-position driver at a reduced speed to warm up tyres and brakes. Cars must maintain their grid order during the formation lap and may not overtake unless a car ahead has a problem. Once all cars are on the grid, the start sequence is initiated with five red lights illuminated in sequence at one-second intervals; when all five lights go out simultaneously, the race begins. If a driver stalls or has a problem on the grid, marshals assist from the side and the driver starts from the pit lane. A race may be started behind the safety car in wet conditions at the Race Director\'s discretion.',
    category: 'weekend',
    img: '/images/f1/race-start.webp',
    sub: []
  },
  {
    id: 'f1-rule-5',
    rule: 5,
    title: 'Pit Stops',
    short: 'Procedures for entering the pit lane, tyre changes, and pit lane speed limits.',
    full: 'Pit stops are conducted in the pit lane, which runs parallel to the main straight and is accessed via a dedicated pit entry. The pit lane speed limit is typically 80 km/h during the race (60 km/h at certain street circuits such as Monaco), and exceeding this limit results in a time penalty. During a pit stop, the team may change tyres, adjust the front wing, and perform limited repairs. An unsafe release from a pit stop, where a car is released into the path of another car or with a tyre not properly attached, results in a penalty which may include a fine, time penalty, or grid drop for the next race.',
    category: 'racing',
    img: '/images/f1/pit-stops.webp',
    sub: []
  },
  {
    id: 'f1-rule-6',
    rule: 6,
    title: 'Safety Car',
    short: 'Deployed to neutralize the race when conditions are dangerous.',
    full: 'The safety car is deployed when the Race Director determines that track conditions are too dangerous for racing at full speed, such as after an accident or when debris is on the circuit. When the safety car is deployed, all cars must slow down and form a queue behind it, with overtaking strictly prohibited. The pit lane remains open during a safety car period, and drivers may make pit stops. Lapped cars may be waved through to unlap themselves before the restart. When the safety car returns to the pit lane, the race leader controls the restart pace and racing resumes at the designated safety car line.',
    category: 'racing',
    img: '/images/f1/safety-car.webp',
    sub: []
  },
  {
    id: 'f1-rule-7',
    rule: 7,
    title: 'Virtual Safety Car',
    short: 'A speed-limited regime that neutralizes the race without a physical safety car.',
    full: 'The Virtual Safety Car (VSC) procedure is used when track conditions require a reduction in speed but a full safety car deployment is unnecessary, such as when a car has stopped in a safe location. During a VSC period, all drivers must reduce their speed by approximately 40 percent and maintain a consistent delta time displayed on their steering wheel. Overtaking is prohibited during a VSC period. The VSC period ends when the Race Director calls "VSC Ending", followed by "VSC In" at a random point, after which drivers may resume racing. Pit stops are permitted during a VSC period, which can provide a strategic advantage.',
    category: 'racing',
    img: '/images/f1/virtual-safety-car.webp',
    sub: []
  },
  {
    id: 'f1-rule-8',
    rule: 8,
    title: 'Red Flag',
    short: 'Race is stopped completely when conditions make it impossible to continue safely.',
    full: 'A red flag suspends the race immediately when conditions are too dangerous to continue even behind the safety car, such as severe weather, a major accident blocking the track, or significant barrier damage. When the red flag is shown, all cars must slow down immediately and return to the pit lane. The race may be restarted once the issue has been resolved, either as a standing start or a rolling start behind the safety car. If the race cannot be resumed, results are taken from the classification at the end of the penultimate lap before the red flag, and reduced points may be awarded if less than 75 percent of the race distance has been completed.',
    category: 'racing',
    img: '/images/f1/red-flag.webp',
    sub: []
  },
  {
    id: 'f1-rule-9',
    rule: 9,
    title: 'DRS',
    short: 'Drag Reduction System allows the rear wing to open in designated zones to aid overtaking.',
    full: 'The Drag Reduction System (DRS) is an adjustable rear wing mechanism that, when activated, opens the rear wing flap to reduce aerodynamic drag and increase straight-line speed by approximately 10-15 km/h. DRS may only be used in designated DRS zones on the circuit, and only when a driver is within one second of the car ahead at the DRS detection point. DRS is not available during the first two laps of the race or the first two laps after a restart. DRS is automatically disabled when the driver applies the brakes. The system is also disabled in wet conditions when the Race Director deems it unsafe.',
    category: 'racing',
    img: '/images/f1/drs.webp',
    sub: []
  },
  {
    id: 'f1-rule-10',
    rule: 10,
    title: 'Track Limits',
    short: 'Drivers must keep at least part of the car within the white lines defining the track.',
    full: 'Drivers must use the track at all times, with the track defined by the white lines painted on the circuit surface. A driver is considered to have left the track if no part of the car remains in contact with the track surface inside the white lines. Drivers who gain a lasting advantage by leaving the track, such as overtaking another car or gaining time, must give the position back or face a penalty. Repeated track-limit violations at specific corners may result in warnings and then time penalties. The stewards may issue black-and-white flags for persistent offenders before escalating to five-second time penalties.',
    category: 'racing',
    img: '/images/f1/track-limits.webp',
    sub: []
  },
  {
    id: 'f1-rule-11',
    rule: 11,
    title: 'Penalties',
    short: 'Time penalties, drive-throughs, grid drops, and disqualification.',
    full: 'The stewards may impose a range of penalties for rule infractions during a race. A five-second time penalty is added to the driver\'s race time or served during a pit stop. A ten-second time penalty is served during a pit stop, where the car must remain stationary for the duration before work begins. A drive-through penalty requires the driver to enter the pit lane and drive through without stopping. A ten-second stop-and-go penalty requires the driver to stop in their pit box for ten seconds before any work may be done. More serious offences may result in disqualification from the race, grid penalties for future races, or championship points deductions.',
    category: 'penalties',
    img: '/images/f1/penalties.webp',
    sub: []
  },
  {
    id: 'f1-rule-12',
    rule: 12,
    title: 'Flags',
    short: 'Coloured flags communicate instructions and warnings to drivers.',
    full: 'Flag signals are a critical communication system in Formula One. The yellow flag indicates danger ahead and prohibits overtaking; a double-waved yellow requires drivers to slow significantly and be prepared to stop. The green flag signals the end of a hazard and that racing may resume. The red flag stops the session or race immediately. The blue flag warns a driver they are about to be lapped and must yield to the faster car within three marshal posts. The black flag disqualifies the indicated driver. The black-and-white flag serves as a warning for unsportsmanlike conduct. The chequered flag signals the end of a session or race.',
    category: 'penalties',
    img: '/images/f1/flags.webp',
    sub: []
  },
  {
    id: 'f1-rule-13',
    rule: 13,
    title: 'Car Regulations',
    short: 'Technical specifications for chassis, aerodynamics, and power unit.',
    full: 'Formula One cars must comply with detailed technical regulations governing their dimensions, weight, aerodynamics, and power unit specifications. The current regulations mandate ground-effect aerodynamics with simplified over-body surfaces to promote closer racing. Cars must weigh a minimum of 798 kilograms including the driver but excluding fuel. The power unit consists of a 1.6-litre V6 turbocharged internal combustion engine combined with two energy recovery systems: the MGU-K (kinetic) and MGU-H (heat), producing a combined output of approximately 1000 horsepower. Each driver is allocated a limited number of power unit components per season, and exceeding these allocations triggers grid penalties.',
    category: 'technical',
    img: '/images/f1/car-regulations.webp',
    sub: []
  },
  {
    id: 'f1-rule-14',
    rule: 14,
    title: 'Driver Regulations',
    short: 'Licensing requirements, conduct rules, and driver responsibilities.',
    full: 'All drivers must hold an FIA Super Licence, which requires accumulating a minimum of 40 points from results in specified junior racing series over the previous three seasons, being at least 18 years old, and holding a valid international racing licence. Drivers must attend the pre-race briefing conducted by the Race Director and comply with all instructions issued. Drivers are responsible for their conduct on and off the track and may be penalised for bringing the sport into disrepute. During the race, drivers may use team radio to communicate with their engineers but all radio communications are monitored and may be broadcast. Drivers must also complete media obligations as defined by the FIA.',
    category: 'drivers',
    img: '/images/f1/driver-regulations.webp',
    sub: []
  },
  {
    id: 'f1-rule-15',
    rule: 15,
    title: 'Parc Ferme',
    short: 'Cars are locked into their setup from qualifying until the race.',
    full: 'Parc ferme conditions apply from the start of qualifying until the race start, during which time significant changes to the car setup are prohibited. Under parc ferme, teams may not alter suspension geometry, aerodynamic configuration, gear ratios, or engine mappings beyond predefined limits. Permitted changes include tyre selection, front wing angle adjustment within a limited range, brake pad and disc replacement, and like-for-like component replacements in case of damage. If a team makes changes that breach parc ferme conditions, the driver must start the race from the pit lane. After the race, the top three finishers\' cars are held in parc ferme for post-race scrutineering.',
    category: 'technical',
    img: '/images/f1/parc-ferme.webp',
    sub: []
  },
  {
    id: 'f1-rule-16',
    rule: 16,
    title: 'Tire Regulations',
    short: 'Compound allocations, mandatory pit stops, and tyre usage rules.',
    full: 'Pirelli supplies all teams with tyres in several compounds: typically three dry compounds (soft, medium, and hard), intermediate tyres for light rain, and full wet tyres for heavy rain. Each driver receives a set allocation of tyres per weekend, and used tyres must be returned at specified intervals. During a dry race, drivers must use at least two different dry-weather tyre compounds, necessitating at least one pit stop. Tyre warmers are permitted to pre-heat tyres before fitting. The maximum number of dry-weather tyre sets available per driver per weekend is 13, distributed across the different compounds as specified by the FIA for each event.',
    category: 'technical',
    img: '/images/f1/tire-regulations.webp',
    sub: []
  },
  {
    id: 'f1-rule-17',
    rule: 17,
    title: 'Sprint Race Format',
    short: 'A shorter race held on select weekends that awards additional championship points.',
    full: 'At selected Grand Prix weekends, a Sprint race replaces one of the free practice sessions and is held on Saturday before the main race on Sunday. The Sprint is approximately 100 kilometres in length (roughly one-third of the main race distance) and awards points to the top eight finishers on a scale of 8-7-6-5-4-3-2-1. The Sprint grid is determined by a separate qualifying session (Sprint Qualifying), which follows the standard Q1-Q2-Q3 knockout format. Parc ferme conditions begin at the start of Sprint Qualifying, and the result of the Sprint does not affect the starting grid for the main Grand Prix, which is determined by the standard qualifying session held on Friday.',
    category: 'weekend',
    img: '/images/f1/sprint-race.webp',
    sub: []
  }
];

export default f1Rules;
