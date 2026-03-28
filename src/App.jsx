import { Routes, Route, useParams, useNavigate } from 'react-router-dom';
import { ProfileProvider } from './context/ProfileContext';
import Header from './components/layout/Header';
import BottomNav from './components/layout/BottomNav';
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
      <div style={{ maxWidth: 480, margin: '0 auto', minHeight: '100vh', background: '#fbf8f3', position: 'relative' }}>
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
        </Routes>
        <BottomNav />
      </div>
    </ProfileProvider>
  );
}
