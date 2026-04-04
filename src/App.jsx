import { Component } from 'react';
import { Routes, Route, useParams, useNavigate } from 'react-router-dom';
import { ProfileProvider } from './context/ProfileContext';
import Header from './components/layout/Header';
import BottomNav from './components/layout/BottomNav';

class ErrorBoundary extends Component {
  constructor(props) { super(props); this.state = { error: null }; }
  static getDerivedStateFromError(error) { return { error }; }
  render() {
    if (this.state.error) {
      return (
        <div style={{ padding: 40, textAlign: 'center', maxWidth: 600, margin: '0 auto' }}>
          <h2 style={{ fontSize: 20, fontWeight: 800, color: '#dc2626', fontFamily: "'Outfit',sans-serif" }}>Something went wrong</h2>
          <p style={{ fontSize: 13, color: '#666', marginTop: 8, lineHeight: 1.5 }}>{this.state.error.message}</p>
          <button onClick={() => { this.setState({ error: null }); window.location.href = '/'; }}
            style={{ marginTop: 16, padding: '10px 24px', borderRadius: 10, background: '#16a34a', color: '#fff', border: 'none', fontWeight: 700, cursor: 'pointer', fontFamily: "'Outfit',sans-serif" }}>
            Go Home
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
import HomePage from './components/home/HomePage';
import ChatPage from './components/chat/ChatPage';
import CalculatorsPage from './components/calculators/CalculatorsPage';
import RankingsPage from './components/rankings/RankingsPage';
import ProfilePage from './components/profile/ProfilePage';
import SportDetailPage from './components/sport/SportDetailPage';
import PlayerProfilePage from './components/profile/PlayerProfilePage';
import WorldCupHub from './components/worldcup/WorldCupHub';
import GlossaryPage from './components/glossary/GlossaryPage';
import SearchPage from './components/search/SearchPage';
import QuizPage from './components/quiz/QuizPage';
import ComparisonPage from './components/comparison/ComparisonPage';
import GlossaryTermPage from './components/glossary/GlossaryTermPage';
import EventPage from './components/events/EventPage';
import CategoryPage from './components/category/CategoryPage';
import BeginnerGuidePage from './components/sport/BeginnerGuidePage';
import GamesPage from './components/games/GamesPage';
import RulePage from './components/pseo/RulePage';
import AnswerPage from './components/pseo/AnswerPage';
import BestPlayersPage from './components/pseo/BestPlayersPage';
import EquipmentPage from './components/pseo/EquipmentPage';
import UniversalPage from './components/pseo/UniversalPage';
import InstallPrompt from './components/ui/InstallPrompt';
import { sportsMap } from './data/sports';
import { h } from './constants';

function SportDetailWrapper() {
  const { sportId } = useParams();
  const sport = sportsMap[sportId];
  if (!sport) return <div style={{ padding: 40, textAlign: 'center', color: '#aaa', ...h }}>Sport not found.</div>;
  return <SportDetailPage sport={sport} />;
}

function PlayerProfileWrapper() {
  const { sportId, playerIndex } = useParams();
  const sport = sportsMap[sportId];
  if (!sport) return <div style={{ padding: 40, textAlign: 'center', color: '#aaa', ...h }}>Sport not found.</div>;
  const player = sport.p && sport.p[Number(playerIndex)];
  if (!player) return <div style={{ padding: 40, textAlign: 'center', color: '#aaa', ...h }}>Player not found.</div>;
  return <PlayerProfilePage player={player} color={sport.c} />;
}

export default function App() {
  return (
    <ProfileProvider>
      <ErrorBoundary>
      <div style={{ width: '100%', maxWidth: 1400, margin: '0 auto', minHeight: '100vh', background: '#ffffff', position: 'relative' }}>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/sports/:sportId" element={<SportDetailWrapper />} />
          <Route path="/sports/:sportId/player/:playerIndex" element={<PlayerProfileWrapper />} />
          <Route path="/ai" element={<ChatPage />} />
          <Route path="/calculators" element={<CalculatorsPage />} />
          <Route path="/rankings" element={<RankingsPage />} />
          <Route path="/worldcup" element={<WorldCupHub />} />
          <Route path="/glossary" element={<GlossaryPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/quiz" element={<QuizPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/compare/:matchup" element={<ComparisonPage />} />
          <Route path="/glossary/:termSlug" element={<GlossaryTermPage />} />
          <Route path="/events/:eventId" element={<EventPage />} />
          <Route path="/category/:catId" element={<CategoryPage />} />
          <Route path="/sports/:sportId/beginners" element={<BeginnerGuidePage />} />
          <Route path="/games" element={<GamesPage />} />
          <Route path="/rules/:sportId/:ruleSlug" element={<RulePage />} />
          <Route path="/answers/:sportId/:questionSlug" element={<AnswerPage />} />
          <Route path="/best/:sportId/:positionSlug" element={<BestPlayersPage />} />
          <Route path="/equipment/:sportId" element={<EquipmentPage />} />
          {/* ── 200K+ pSEO routes ── */}
          <Route path="/learn/:sportId/:slug" element={<UniversalPage />} />
          <Route path="/scenario/:sportId/:slug" element={<UniversalPage />} />
          <Route path="/guide/:sportId/:slug" element={<UniversalPage />} />
          <Route path="/calc/:sportId/:slug" element={<UniversalPage />} />
          <Route path="/history/:sportId/:slug" element={<UniversalPage />} />
          <Route path="/strategy/:sportId/:slug" element={<UniversalPage />} />
          <Route path="/records/:sportId/:slug" element={<UniversalPage />} />
          <Route path="/format/:sportId/:slug" element={<UniversalPage />} />
          <Route path="/positions/:sportId/:slug" element={<UniversalPage />} />
          <Route path="/vs/:matchup/:topic" element={<UniversalPage />} />
        </Routes>
        <InstallPrompt />
        <BottomNav />
      </div>
      </ErrorBoundary>
    </ProfileProvider>
  );
}
