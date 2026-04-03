import { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { h } from '../../constants';
import { events } from '../../data/events';
import { sportsMap } from '../../data/sports';

const back = {
  display: 'inline-flex', alignItems: 'center', gap: 6, background: 'none',
  border: 'none', cursor: 'pointer', fontSize: 14, fontWeight: 600,
  color: '#2563eb', padding: 0, marginBottom: 16, ...h,
};

const card = {
  background: '#fff', borderRadius: 14, border: '1.5px solid #ede8e0',
  padding: 18, marginBottom: 16,
};

const infoPill = {
  display: 'inline-flex', alignItems: 'center', gap: 4,
  padding: '5px 12px', borderRadius: 20, fontSize: 11, fontWeight: 700,
  background: '#faf8f5', border: '1px solid #ede8e0', color: '#44403c', ...h,
};

const actionBtn = (bg) => ({
  display: 'inline-block', padding: '12px 22px', borderRadius: 14,
  background: bg || '#16a34a', color: '#fff', fontWeight: 700, fontSize: 13,
  border: 'none', cursor: 'pointer', ...h,
});

function daysUntil(dateStr) {
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  const target = new Date(dateStr);
  const diff = Math.ceil((target - now) / (1000 * 60 * 60 * 24));
  return diff;
}

export default function EventPage() {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  const event = useMemo(() => events.find(ev => ev.id === eventId), [eventId]);
  const sport = useMemo(() => event ? sportsMap[event.cat] : null, [event]);

  if (!event) {
    return (
      <div style={{ padding: 20, maxWidth: 600, margin: '0 auto', textAlign: 'center', paddingTop: 60 }}>
        <button style={back} onClick={() => navigate(-1)}>{'\u2190'} Back</button>
        <div style={{ fontSize: 48, marginBottom: 12 }}>{'\u{1F4C5}'}</div>
        <h2 style={{ fontSize: 22, fontWeight: 900, ...h }}>Event not found</h2>
        <p style={{ fontSize: 14, color: '#78716c', ...h }}>
          This event could not be found. Please check the URL and try again.
        </p>
      </div>
    );
  }

  const days = daysUntil(event.date);
  const isPast = days < 0;
  const isOngoing = days <= 0 && event.end && daysUntil(event.end) >= 0;
  const isWorldCup = event.id.includes('wc') || event.n.toLowerCase().includes('world cup');

  const formattedDate = new Date(event.date).toLocaleDateString('en-US', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
  });

  const formattedEnd = event.end ? new Date(event.end).toLocaleDateString('en-US', {
    month: 'long', day: 'numeric', year: 'numeric',
  }) : null;

  return (
    <div style={{ padding: 20, maxWidth: 600, margin: '0 auto', paddingBottom: 60 }}>
      <button style={back} onClick={() => navigate(-1)}>{'\u2190'} Back</button>

      {/* Event Header */}
      <div style={{ textAlign: 'center', marginBottom: 24 }}>
        <div style={{ fontSize: 56, marginBottom: 8 }}>{event.e}</div>
        <h1 style={{ fontSize: 26, fontWeight: 900, margin: '0 0 12px', color: '#1a1a2e', ...h }}>
          {event.n}
        </h1>

        {/* Info pills */}
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 8, marginBottom: 16 }}>
          <span style={infoPill}>{'\u{1F4C5}'} {formattedDate}</span>
          {formattedEnd && <span style={infoPill}>{'\u{1F3C1}'} Ends {formattedEnd}</span>}
          <span style={infoPill}>{'\u{1F4CD}'} {event.loc}</span>
          <span style={infoPill}>{'\u{1F3F7}\uFE0F'} {event.cat}</span>
        </div>
      </div>

      {/* Countdown */}
      <div style={{
        ...card, textAlign: 'center',
        background: isOngoing ? '#dcfce7' : isPast ? '#fef2f2' : '#faf8f5',
        border: isOngoing ? '1.5px solid #86efac' : isPast ? '1.5px solid #fca5a5' : '1.5px solid #ede8e0',
      }}>
        {isOngoing ? (
          <>
            <div style={{ fontSize: 28, marginBottom: 4 }}>{'\u{1F534}'}</div>
            <div style={{ fontSize: 18, fontWeight: 900, color: '#16a34a', ...h }}>LIVE NOW</div>
            <div style={{ fontSize: 12, color: '#78716c', ...h }}>This event is currently underway</div>
          </>
        ) : isPast ? (
          <>
            <div style={{ fontSize: 28, marginBottom: 4 }}>{'\u2705'}</div>
            <div style={{ fontSize: 18, fontWeight: 900, color: '#dc2626', ...h }}>Event Completed</div>
            <div style={{ fontSize: 12, color: '#78716c', ...h }}>This event ended {Math.abs(days)} days ago</div>
          </>
        ) : (
          <>
            <div style={{ fontSize: 40, fontWeight: 900, color: '#16a34a', ...h }}>{days}</div>
            <div style={{ fontSize: 14, fontWeight: 700, color: '#44403c', ...h }}>days until event</div>
          </>
        )}
      </div>

      {/* News / Description */}
      {event.news && (
        <div style={card}>
          <h3 style={{ fontSize: 15, fontWeight: 800, margin: '0 0 8px', color: '#16a34a', ...h }}>
            {'\u{1F4F0}'} About This Event
          </h3>
          <p style={{ fontSize: 14, lineHeight: 1.7, margin: 0, color: '#44403c', ...h }}>
            {event.news}
          </p>
        </div>
      )}

      {/* Action Buttons */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
        {sport && (
          <button style={actionBtn(sport.c)} onClick={() => navigate(`/sports/${sport.id}`)}>
            {sport.i} Learn the {sport.n} Rules
          </button>
        )}
        {isWorldCup && (
          <button style={actionBtn('#7c3aed')} onClick={() => navigate('/worldcup')}>
            {'\u{1F3C6}'} World Cup Hub
          </button>
        )}
      </div>
    </div>
  );
}
