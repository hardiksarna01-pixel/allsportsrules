/**
 * SportDecoded Unified Sports API Service Layer
 *
 * Integrates 14 free sports APIs with localStorage caching, TTL expiry,
 * request timeouts, and graceful error handling. Every public function
 * returns data on success or null on failure — components are responsible
 * for falling back to static data when null is returned.
 */

// ---------------------------------------------------------------------------
// Cache helpers
// ---------------------------------------------------------------------------

const CACHE_PREFIX = 'sd_api_';

/**
 * Read a value from localStorage cache if it exists and has not expired.
 * @param {string} key  Cache key (without prefix)
 * @param {number} ttlMs  Time-to-live in milliseconds
 * @returns {*|null}  Cached data or null
 */
function cached(key, ttlMs) {
  try {
    const raw = localStorage.getItem(CACHE_PREFIX + key);
    if (!raw) return null;
    const { data, ts } = JSON.parse(raw);
    if (Date.now() - ts > ttlMs) {
      localStorage.removeItem(CACHE_PREFIX + key);
      return null;
    }
    return data;
  } catch {
    return null;
  }
}

/**
 * Write a value into the localStorage cache.
 * Silently ignores quota or serialization errors.
 */
function setCache(key, data) {
  try {
    localStorage.setItem(
      CACHE_PREFIX + key,
      JSON.stringify({ data, ts: Date.now() })
    );
  } catch {
    // Storage full or unavailable — non-critical
  }
}

/**
 * Remove all SportDecoded API cache entries from localStorage.
 */
export function clearApiCache() {
  try {
    const keys = [];
    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i);
      if (k && k.startsWith(CACHE_PREFIX)) keys.push(k);
    }
    keys.forEach((k) => localStorage.removeItem(k));
  } catch {
    // Ignore
  }
}

// ---------------------------------------------------------------------------
// Fetch wrapper
// ---------------------------------------------------------------------------

/**
 * Fetch JSON from a URL with an 8-second timeout.
 * @param {string} url
 * @param {RequestInit} options
 * @returns {Promise<any>}
 */
async function apiFetch(url, options = {}) {
  const res = await fetch(url, {
    ...options,
    signal: AbortSignal.timeout(8000),
  });
  if (!res.ok) throw new Error(`API ${res.status}`);
  return res.json();
}

// ---------------------------------------------------------------------------
// Cricket — CricAPI  (cricapi.com)
// Requires: VITE_CRICAPI_KEY
// ---------------------------------------------------------------------------

/**
 * Fetch current / recent cricket matches.
 * Cache TTL: 5 minutes.
 */
export async function fetchCricketMatches() {
  try {
    const key = import.meta.env.VITE_CRICAPI_KEY;
    if (!key) return null;

    const c = cached('cricket_matches', 5 * 60_000);
    if (c) return c;

    const data = await apiFetch(
      `https://api.cricapi.com/v1/currentMatches?apikey=${key}&offset=0`
    );
    if (data?.data) {
      setCache('cricket_matches', data.data);
      return data.data;
    }
    return null;
  } catch {
    return null;
  }
}

/**
 * Fetch ICC cricket rankings for a given format.
 * @param {'test'|'odi'|'t20'} format
 * Cache TTL: 1 hour.
 */
export async function fetchCricketRankings(format = 'test') {
  try {
    const key = import.meta.env.VITE_CRICAPI_KEY;
    if (!key) return null;

    const c = cached(`cricket_rank_${format}`, 3_600_000);
    if (c) return c;

    const data = await apiFetch(
      `https://api.cricapi.com/v1/rankings?apikey=${key}&type=${format}`
    );
    if (data?.data) {
      setCache(`cricket_rank_${format}`, data.data);
      return data.data;
    }
    return null;
  } catch {
    return null;
  }
}

/**
 * Fetch cricket series / league list.
 * Cache TTL: 6 hours.
 */
export async function fetchCricketSeries() {
  try {
    const key = import.meta.env.VITE_CRICAPI_KEY;
    if (!key) return null;

    const c = cached('cricket_series', 6 * 3_600_000);
    if (c) return c;

    const data = await apiFetch(
      `https://api.cricapi.com/v1/series?apikey=${key}&offset=0`
    );
    if (data?.data) {
      setCache('cricket_series', data.data);
      return data.data;
    }
    return null;
  } catch {
    return null;
  }
}

// ---------------------------------------------------------------------------
// Football (Soccer) — football-data.org
// Requires: VITE_FOOTBALL_DATA_KEY
// ---------------------------------------------------------------------------

/**
 * Fetch league standings for a given competition.
 * @param {string} competition  Competition code (e.g. 'PL', 'CL', 'BL1')
 * Cache TTL: 1 hour.
 */
export async function fetchFootballStandings(competition = 'PL') {
  try {
    const key = import.meta.env.VITE_FOOTBALL_DATA_KEY;
    if (!key) return null;

    const c = cached(`football_${competition}`, 3_600_000);
    if (c) return c;

    const data = await apiFetch(
      `https://api.football-data.org/v4/competitions/${competition}/standings`,
      { headers: { 'X-Auth-Token': key } }
    );
    if (data?.standings) {
      setCache(`football_${competition}`, data.standings);
      return data.standings;
    }
    return null;
  } catch {
    return null;
  }
}

/**
 * Fetch live / upcoming matches for a competition.
 * @param {string} competition
 * Cache TTL: 5 minutes.
 */
export async function fetchFootballMatches(competition = 'PL') {
  try {
    const key = import.meta.env.VITE_FOOTBALL_DATA_KEY;
    if (!key) return null;

    const c = cached(`football_matches_${competition}`, 300_000);
    if (c) return c;

    const data = await apiFetch(
      `https://api.football-data.org/v4/competitions/${competition}/matches?status=LIVE,SCHEDULED&limit=10`,
      { headers: { 'X-Auth-Token': key } }
    );
    if (data?.matches) {
      setCache(`football_matches_${competition}`, data.matches);
      return data.matches;
    }
    return null;
  } catch {
    return null;
  }
}

/**
 * Fetch top scorers for a competition.
 * @param {string} competition
 * Cache TTL: 1 hour.
 */
export async function fetchFootballScorers(competition = 'PL') {
  try {
    const key = import.meta.env.VITE_FOOTBALL_DATA_KEY;
    if (!key) return null;

    const c = cached(`football_scorers_${competition}`, 3_600_000);
    if (c) return c;

    const data = await apiFetch(
      `https://api.football-data.org/v4/competitions/${competition}/scorers?limit=10`,
      { headers: { 'X-Auth-Token': key } }
    );
    if (data?.scorers) {
      setCache(`football_scorers_${competition}`, data.scorers);
      return data.scorers;
    }
    return null;
  } catch {
    return null;
  }
}

// ---------------------------------------------------------------------------
// Formula 1 — Ergast API  (NO KEY NEEDED)
// ---------------------------------------------------------------------------

/**
 * Fetch F1 driver standings.
 * @param {string} season  e.g. '2024' or 'current'
 * Cache TTL: 1 hour.
 */
export async function fetchF1Standings(season = 'current') {
  try {
    const c = cached(`f1_drivers_${season}`, 3_600_000);
    if (c) return c;

    const data = await apiFetch(
      `https://ergast.com/api/f1/${season}/driverStandings.json`
    );
    const standings =
      data?.MRData?.StandingsTable?.StandingsLists?.[0]?.DriverStandings;
    if (standings) {
      setCache(`f1_drivers_${season}`, standings);
      return standings;
    }
    return null;
  } catch {
    return null;
  }
}

/**
 * Fetch F1 constructor standings.
 * @param {string} season
 * Cache TTL: 1 hour.
 */
export async function fetchF1Constructors(season = 'current') {
  try {
    const c = cached(`f1_constructors_${season}`, 3_600_000);
    if (c) return c;

    const data = await apiFetch(
      `https://ergast.com/api/f1/${season}/constructorStandings.json`
    );
    const standings =
      data?.MRData?.StandingsTable?.StandingsLists?.[0]?.ConstructorStandings;
    if (standings) {
      setCache(`f1_constructors_${season}`, standings);
      return standings;
    }
    return null;
  } catch {
    return null;
  }
}

/**
 * Fetch F1 race schedule.
 * @param {string} season
 * Cache TTL: 1 hour.
 */
export async function fetchF1Schedule(season = 'current') {
  try {
    const c = cached(`f1_schedule_${season}`, 3_600_000);
    if (c) return c;

    const data = await apiFetch(
      `https://ergast.com/api/f1/${season}.json`
    );
    const races = data?.MRData?.RaceTable?.Races;
    if (races) {
      setCache(`f1_schedule_${season}`, races);
      return races;
    }
    return null;
  } catch {
    return null;
  }
}

/**
 * Fetch results for a specific F1 race.
 * @param {string} season
 * @param {number} round
 * Cache TTL: 1 hour.
 */
export async function fetchF1RaceResults(season = 'current', round = 'last') {
  try {
    const c = cached(`f1_results_${season}_${round}`, 3_600_000);
    if (c) return c;

    const data = await apiFetch(
      `https://ergast.com/api/f1/${season}/${round}/results.json`
    );
    const results = data?.MRData?.RaceTable?.Races?.[0];
    if (results) {
      setCache(`f1_results_${season}_${round}`, results);
      return results;
    }
    return null;
  } catch {
    return null;
  }
}

// ---------------------------------------------------------------------------
// Basketball (NBA) — balldontlie.io
// Optional: VITE_BALLDONTLIE_KEY  (higher rate limits with key)
// ---------------------------------------------------------------------------

/**
 * Fetch NBA teams (used as a proxy for standings data).
 * Cache TTL: 1 hour.
 */
export async function fetchNBAStandings() {
  try {
    const key = import.meta.env.VITE_BALLDONTLIE_KEY;
    const c = cached('nba_teams', 3_600_000);
    if (c) return c;

    const headers = key ? { Authorization: key } : {};
    const data = await apiFetch('https://api.balldontlie.io/v1/teams', {
      headers,
    });
    if (data?.data) {
      setCache('nba_teams', data.data);
      return data.data;
    }
    return null;
  } catch {
    return null;
  }
}

/**
 * Fetch NBA games for a specific date.
 * @param {string} [date]  ISO date string (YYYY-MM-DD). Defaults to today.
 * Cache TTL: 5 minutes.
 */
export async function fetchNBAGames(date) {
  try {
    const key = import.meta.env.VITE_BALLDONTLIE_KEY;
    const d = date || new Date().toISOString().split('T')[0];
    const c = cached(`nba_games_${d}`, 300_000);
    if (c) return c;

    const headers = key ? { Authorization: key } : {};
    const data = await apiFetch(
      `https://api.balldontlie.io/v1/games?dates[]=${d}`,
      { headers }
    );
    if (data?.data) {
      setCache(`nba_games_${d}`, data.data);
      return data.data;
    }
    return null;
  } catch {
    return null;
  }
}

/**
 * Fetch NBA player stats for a given player ID.
 * @param {number} playerId
 * Cache TTL: 1 hour.
 */
export async function fetchNBAPlayerStats(playerId) {
  try {
    if (!playerId) return null;
    const key = import.meta.env.VITE_BALLDONTLIE_KEY;
    const c = cached(`nba_player_${playerId}`, 3_600_000);
    if (c) return c;

    const headers = key ? { Authorization: key } : {};
    const data = await apiFetch(
      `https://api.balldontlie.io/v1/season_averages?player_ids[]=${playerId}`,
      { headers }
    );
    if (data?.data) {
      setCache(`nba_player_${playerId}`, data.data);
      return data.data;
    }
    return null;
  } catch {
    return null;
  }
}

// ---------------------------------------------------------------------------
// TheSportsDB  (free tier, no key needed for basic endpoints)
// ---------------------------------------------------------------------------

/**
 * Search for a sport / team image badge.
 * @param {string} sport  Team or sport name
 * Cache TTL: 24 hours.
 */
export async function fetchSportImage(sport) {
  try {
    const c = cached(`img_${sport}`, 86_400_000);
    if (c) return c;

    const data = await apiFetch(
      `https://www.thesportsdb.com/api/v1/json/3/searchteams.php?t=${encodeURIComponent(sport)}`
    );
    const team = data?.teams?.[0];
    if (team?.strTeamBadge) {
      setCache(`img_${sport}`, team.strTeamBadge);
      return team.strTeamBadge;
    }
    return null;
  } catch {
    return null;
  }
}

/**
 * Fetch upcoming events for a league by TheSportsDB league ID.
 * @param {string} league  League ID (default 4328 = English Premier League)
 * Cache TTL: 1 hour.
 */
export async function fetchUpcomingEvents(league = '4328') {
  try {
    const c = cached(`events_${league}`, 3_600_000);
    if (c) return c;

    const data = await apiFetch(
      `https://www.thesportsdb.com/api/v1/json/3/eventsnextleague.php?id=${league}`
    );
    if (data?.events) {
      setCache(`events_${league}`, data.events);
      return data.events;
    }
    return null;
  } catch {
    return null;
  }
}

/**
 * Fetch past results for a league by TheSportsDB league ID.
 * @param {string} league
 * Cache TTL: 1 hour.
 */
export async function fetchPastEvents(league = '4328') {
  try {
    const c = cached(`past_events_${league}`, 3_600_000);
    if (c) return c;

    const data = await apiFetch(
      `https://www.thesportsdb.com/api/v1/json/3/eventspastleague.php?id=${league}`
    );
    if (data?.events) {
      setCache(`past_events_${league}`, data.events);
      return data.events;
    }
    return null;
  } catch {
    return null;
  }
}

/**
 * Lookup league details by TheSportsDB league ID.
 * @param {string} league
 * Cache TTL: 24 hours.
 */
export async function fetchLeagueDetails(league = '4328') {
  try {
    const c = cached(`league_detail_${league}`, 86_400_000);
    if (c) return c;

    const data = await apiFetch(
      `https://www.thesportsdb.com/api/v1/json/3/lookupleague.php?id=${league}`
    );
    if (data?.leagues?.[0]) {
      setCache(`league_detail_${league}`, data.leagues[0]);
      return data.leagues[0];
    }
    return null;
  } catch {
    return null;
  }
}

// ---------------------------------------------------------------------------
// News — NewsAPI  (newsapi.org)
// Requires: VITE_NEWS_API_KEY
// ---------------------------------------------------------------------------

/**
 * Fetch sports news articles.
 * @param {string} query     Search query
 * @param {number} pageSize  Number of articles (max 100)
 * Cache TTL: 15 minutes.
 */
export async function fetchSportsNews(query = 'sports', pageSize = 5) {
  try {
    const key = import.meta.env.VITE_NEWS_API_KEY;
    if (!key) return null;

    const c = cached(`news_${query}`, 900_000);
    if (c) return c;

    const data = await apiFetch(
      `https://newsapi.org/v2/everything?q=${encodeURIComponent(query)}&sortBy=publishedAt&pageSize=${pageSize}&apiKey=${key}`
    );
    if (data?.articles) {
      setCache(`news_${query}`, data.articles);
      return data.articles;
    }
    return null;
  } catch {
    return null;
  }
}

/**
 * Fetch top sports headlines by country.
 * @param {string} country  ISO 3166-1 country code
 * Cache TTL: 15 minutes.
 */
export async function fetchSportsHeadlines(country = 'us') {
  try {
    const key = import.meta.env.VITE_NEWS_API_KEY;
    if (!key) return null;

    const c = cached(`headlines_${country}`, 900_000);
    if (c) return c;

    const data = await apiFetch(
      `https://newsapi.org/v2/top-headlines?country=${country}&category=sports&pageSize=10&apiKey=${key}`
    );
    if (data?.articles) {
      setCache(`headlines_${country}`, data.articles);
      return data.articles;
    }
    return null;
  } catch {
    return null;
  }
}

// ---------------------------------------------------------------------------
// Tennis — placeholder (no reliable free API with clean JSON)
// ---------------------------------------------------------------------------

/**
 * Fetch tennis rankings. Currently returns null as no free API is available.
 * Components should fall back to static data.
 * Cache TTL: 1 hour (for when a source is added).
 */
export async function fetchTennisRankings() {
  try {
    const c = cached('tennis_rankings', 3_600_000);
    if (c) return c;

    // No reliable free tennis rankings API — return null so components
    // use their built-in static data.
    return null;
  } catch {
    return null;
  }
}

// ---------------------------------------------------------------------------
// NHL Hockey — NHL public API  (NO KEY NEEDED)
// ---------------------------------------------------------------------------

/**
 * Fetch NHL standings.
 * Cache TTL: 1 hour.
 */
export async function fetchNHLStandings() {
  try {
    const c = cached('nhl_standings', 3_600_000);
    if (c) return c;

    const data = await apiFetch(
      'https://api-web.nhle.com/v1/standings/now'
    );
    if (data?.standings) {
      setCache('nhl_standings', data.standings);
      return data.standings;
    }
    return null;
  } catch {
    return null;
  }
}

/**
 * Fetch today's NHL schedule.
 * @param {string} [date]  YYYY-MM-DD, defaults to today
 * Cache TTL: 5 minutes.
 */
export async function fetchNHLGames(date) {
  try {
    const d = date || new Date().toISOString().split('T')[0];
    const c = cached(`nhl_games_${d}`, 300_000);
    if (c) return c;

    const data = await apiFetch(
      `https://api-web.nhle.com/v1/schedule/${d}`
    );
    if (data?.gameWeek) {
      setCache(`nhl_games_${d}`, data.gameWeek);
      return data.gameWeek;
    }
    return null;
  } catch {
    return null;
  }
}

// ---------------------------------------------------------------------------
// MLB Baseball — MLB Stats API  (NO KEY NEEDED)
// ---------------------------------------------------------------------------

/**
 * Fetch MLB standings.
 * @param {number} season
 * Cache TTL: 1 hour.
 */
export async function fetchMLBStandings(season = new Date().getFullYear()) {
  try {
    const c = cached(`mlb_standings_${season}`, 3_600_000);
    if (c) return c;

    const data = await apiFetch(
      `https://statsapi.mlb.com/api/v1/standings?leagueId=103,104&season=${season}`
    );
    if (data?.records) {
      setCache(`mlb_standings_${season}`, data.records);
      return data.records;
    }
    return null;
  } catch {
    return null;
  }
}

/**
 * Fetch today's MLB schedule.
 * @param {string} [date]  YYYY-MM-DD
 * Cache TTL: 5 minutes.
 */
export async function fetchMLBGames(date) {
  try {
    const d = date || new Date().toISOString().split('T')[0];
    const c = cached(`mlb_games_${d}`, 300_000);
    if (c) return c;

    const data = await apiFetch(
      `https://statsapi.mlb.com/api/v1/schedule?sportId=1&date=${d}`
    );
    if (data?.dates?.[0]?.games) {
      setCache(`mlb_games_${d}`, data.dates[0].games);
      return data.dates[0].games;
    }
    return null;
  } catch {
    return null;
  }
}

// ---------------------------------------------------------------------------
// Rugby — (via TheSportsDB, league ID 4405 = Six Nations, 4406 = Rugby Championship)
// ---------------------------------------------------------------------------

/**
 * Fetch upcoming rugby events.
 * @param {string} league  TheSportsDB league ID
 * Cache TTL: 1 hour.
 */
export async function fetchRugbyEvents(league = '4405') {
  try {
    return await fetchUpcomingEvents(league);
  } catch {
    return null;
  }
}

// ---------------------------------------------------------------------------
// Convenience / aggregate functions
// ---------------------------------------------------------------------------

/**
 * Fetch live / recent data for a sport by key.
 * @param {string} sport  One of: cricket, football, f1, basketball, hockey, baseball
 * @returns {Promise<any|null>}
 */
export async function fetchLiveData(sport) {
  try {
    switch (sport) {
      case 'cricket':
        return await fetchCricketMatches();
      case 'football':
      case 'soccer':
        return await fetchFootballMatches();
      case 'f1':
        return await fetchF1Schedule();
      case 'basketball':
      case 'nba':
        return await fetchNBAGames();
      case 'hockey':
      case 'nhl':
        return await fetchNHLGames();
      case 'baseball':
      case 'mlb':
        return await fetchMLBGames();
      case 'rugby':
        return await fetchRugbyEvents();
      default:
        return null;
    }
  } catch {
    return null;
  }
}

/**
 * Fetch rankings / standings for a sport by key.
 * @param {string} sport
 * @returns {Promise<any|null>}
 */
export async function fetchRankings(sport) {
  try {
    switch (sport) {
      case 'cricket':
        return await fetchCricketRankings();
      case 'football':
      case 'soccer':
        return await fetchFootballStandings();
      case 'f1':
        return await fetchF1Standings();
      case 'basketball':
      case 'nba':
        return await fetchNBAStandings();
      case 'hockey':
      case 'nhl':
        return await fetchNHLStandings();
      case 'baseball':
      case 'mlb':
        return await fetchMLBStandings();
      case 'tennis':
        return await fetchTennisRankings();
      default:
        return null;
    }
  } catch {
    return null;
  }
}

/**
 * Prefetch data for multiple sports in parallel.
 * Useful on app init to warm the cache.
 * @param {string[]} sports  Array of sport keys
 * @returns {Promise<Record<string, any>>}
 */
export async function prefetchSportsData(sports = ['cricket', 'football', 'f1', 'basketball']) {
  const results = {};
  const promises = sports.map(async (sport) => {
    try {
      results[sport] = await fetchLiveData(sport);
    } catch {
      results[sport] = null;
    }
  });
  await Promise.allSettled(promises);
  return results;
}
