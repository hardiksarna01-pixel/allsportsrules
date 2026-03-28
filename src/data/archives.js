export const archives = [
  {
    sport: "Cricket",
    icon: "\uD83C\uDFCF",
    color: "#16a34a",
    records: [
      { category: "Highest Individual Score", holder: "Brian Lara", value: "400*", era: "2004" },
      { category: "Most Test Wickets", holder: "Muthiah Muralidaran", value: "800", era: "1992-2010" },
      { category: "Most Test Runs", holder: "Sachin Tendulkar", value: "15,921", era: "1989-2013" },
      { category: "Fastest Century", holder: "AB de Villiers", value: "31 balls", era: "2015" },
    ],
    tournaments: [
      {
        name: "ICC Cricket World Cup",
        record: "Held every 4 years since 1975",
        winners: [
          { year: 2023, winner: "Australia" },
          { year: 2019, winner: "England" },
          { year: 2015, winner: "Australia" },
          { year: 2011, winner: "India" },
          { year: 2007, winner: "Australia" },
        ],
      },
      {
        name: "ICC T20 World Cup",
        record: "Held every 2 years since 2007",
        winners: [
          { year: 2024, winner: "India" },
          { year: 2022, winner: "England" },
          { year: 2021, winner: "Australia" },
          { year: 2016, winner: "West Indies" },
          { year: 2014, winner: "Sri Lanka" },
        ],
      },
    ],
  },
  {
    sport: "Football",
    icon: "\u26BD",
    color: "#2563eb",
    records: [
      { category: "Most World Cup Goals", holder: "Miroslav Klose", value: "16", era: "2002-2014" },
      { category: "Most World Cup Wins", holder: "Brazil", value: "5 titles", era: "1958-2002" },
      { category: "Most Ballon d'Or", holder: "Lionel Messi", value: "8", era: "2009-2023" },
      { category: "Most International Goals", holder: "Cristiano Ronaldo", value: "130+", era: "2003-present" },
    ],
    tournaments: [
      {
        name: "FIFA World Cup",
        record: "Most prestigious tournament in football",
        winners: [
          { year: 2022, winner: "Argentina" },
          { year: 2018, winner: "France" },
          { year: 2014, winner: "Germany" },
          { year: 2010, winner: "Spain" },
          { year: 2006, winner: "Italy" },
        ],
      },
      {
        name: "UEFA Champions League",
        record: "Top European club competition",
        winners: [
          { year: 2024, winner: "Real Madrid" },
          { year: 2023, winner: "Manchester City" },
          { year: 2022, winner: "Real Madrid" },
          { year: 2021, winner: "Chelsea" },
          { year: 2020, winner: "Bayern Munich" },
        ],
      },
    ],
  },
  {
    sport: "Tennis",
    icon: "\uD83C\uDFBE",
    color: "#ca8a04",
    records: [
      { category: "Most Grand Slams (M)", holder: "Novak Djokovic", value: "24", era: "2008-2024" },
      { category: "Most Grand Slams (W)", holder: "Margaret Court", value: "24", era: "1960-1973" },
      { category: "Longest Match", holder: "Isner vs Mahut", value: "11h 5m", era: "Wimbledon 2010" },
      { category: "Most Weeks at No.1", holder: "Novak Djokovic", value: "428", era: "2011-2024" },
    ],
    tournaments: [
      {
        name: "Wimbledon",
        record: "Oldest tennis tournament, est. 1877",
        winners: [
          { year: 2024, winner: "Carlos Alcaraz" },
          { year: 2023, winner: "Carlos Alcaraz" },
          { year: 2022, winner: "Novak Djokovic" },
          { year: 2021, winner: "Novak Djokovic" },
          { year: 2019, winner: "Novak Djokovic" },
        ],
      },
    ],
  },
  {
    sport: "Basketball",
    icon: "\uD83C\uDFC0",
    color: "#ea580c",
    records: [
      { category: "Most NBA Championships", holder: "Bill Russell", value: "11 rings", era: "1957-1969" },
      { category: "Most Career Points", holder: "LeBron James", value: "40,000+", era: "2003-present" },
      { category: "Most Points in a Game", holder: "Wilt Chamberlain", value: "100", era: "1962" },
      { category: "Most MVPs", holder: "Kareem Abdul-Jabbar", value: "6", era: "1971-1980" },
    ],
    tournaments: [
      {
        name: "NBA Finals",
        record: "Annual NBA championship series",
        winners: [
          { year: 2024, winner: "Boston Celtics" },
          { year: 2023, winner: "Denver Nuggets" },
          { year: 2022, winner: "Golden State Warriors" },
          { year: 2021, winner: "Milwaukee Bucks" },
          { year: 2020, winner: "LA Lakers" },
        ],
      },
    ],
  },
  {
    sport: "Formula 1",
    icon: "\uD83C\uDFC1",
    color: "#dc2626",
    records: [
      { category: "Most Championships", holder: "Michael Schumacher / Lewis Hamilton", value: "7", era: "2000s-2020s" },
      { category: "Most Race Wins", holder: "Lewis Hamilton", value: "103", era: "2007-present" },
      { category: "Most Poles", holder: "Lewis Hamilton", value: "104", era: "2007-present" },
      { category: "Youngest Champion", holder: "Sebastian Vettel", value: "23 years", era: "2010" },
    ],
    tournaments: [
      {
        name: "F1 World Championship",
        record: "Running since 1950",
        winners: [
          { year: 2024, winner: "Max Verstappen" },
          { year: 2023, winner: "Max Verstappen" },
          { year: 2022, winner: "Max Verstappen" },
          { year: 2021, winner: "Max Verstappen" },
          { year: 2020, winner: "Lewis Hamilton" },
        ],
      },
    ],
  },
];

export default archives;
