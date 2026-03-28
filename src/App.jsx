import { useState } from 'react';
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

export default function App() {
  const [tab, setTab] = useState('home');
  const [view, setView] = useState('main');
  const [sport, setSport] = useState(null);
  const [player, setPlayer] = useState(null);

  function goSport(s) {
    setSport(s);
    setView('sport');
  }

  function goPlayer(p) {
    setPlayer(p);
    setView('player');
  }

  function goBack() {
    if (view === 'player') {
      setView('sport');
    } else {
      setView('main');
    }
  }

  function switchTab(t) {
    setTab(t);
    setView('main');
  }

  return (
    <ProfileProvider>
      <div style={{ maxWidth: 480, margin: '0 auto', minHeight: '100vh', background: '#fbf8f3', position: 'relative' }}>
        <Header />

        {/* Player Profile */}
        {view === 'player' && player && sport && (
          <PlayerProfilePage player={player} color={sport.c} onBack={goBack} />
        )}

        {/* Sport Detail */}
        {view === 'sport' && sport && view !== 'player' && (
          <SportDetailPage
            sport={sport}
            onBack={goBack}
            onPlayer={goPlayer}
          />
        )}

        {/* World Cup Hub */}
        {view === 'wchub' && (
          <WorldCupHub onBack={() => setView('main')} />
        )}

        {/* Glossary */}
        {view === 'glossary' && (
          <GlossaryPage onBack={() => setView('main')} />
        )}

        {/* Main tab views */}
        {view === 'main' && (
          <>
            {(tab === 'home' || tab === 'explore') && (
              <HomePage
                onSport={goSport}
                onWorldCup={() => setView('wchub')}
                onGlossary={() => setView('glossary')}
              />
            )}
            {tab === 'ai' && <ChatPage />}
            {tab === 'calc' && <CalculatorsPage />}
            {tab === 'rank' && <RankingsPage />}
            {tab === 'profile' && <ProfilePage />}
          </>
        )}

        <BottomNav tab={tab} setTab={switchTab} />
      </div>
    </ProfileProvider>
  );
}
