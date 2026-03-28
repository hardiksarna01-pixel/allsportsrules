import { h } from '../../constants';
import { usePageTitle } from '../../hooks/usePageTitle';
import { useProfileContext } from '../../context/ProfileContext';
import { achievements } from '../../data/achievements';
import { sports } from '../../data/sports';

const card = {
  background: '#fff', borderRadius: 14, border: '1.5px solid #ede8e0',
  padding: 16, marginBottom: 12,
};

const sectionLabel = {
  fontSize: 11, fontWeight: 800, letterSpacing: 1, color: '#78716c',
  textTransform: 'uppercase', marginBottom: 10, marginTop: 20, ...h,
};

const SETTINGS = [
  { label: 'Language', value: 'English' },
  { label: 'Notifications', value: 'On' },
  { label: 'Theme', value: 'Light' },
  { label: 'About', value: 'v1.0.0' },
];

export default function ProfilePage() {
  usePageTitle('My Profile');
  const { xp, level, xpInLevel, streak, bookmarks } = useProfileContext();

  const xpToNext = 1000;
  const progressPct = (xpInLevel / xpToNext) * 100;

  const bookmarkedSports = sports.filter((s) => bookmarks.includes(s.id));

  return (
    <div style={{ padding: 20, maxWidth: 600, margin: '0 auto', paddingBottom: 40 }}>
      {/* Avatar */}
      <div style={{ textAlign: 'center', marginBottom: 20 }}>
        <div
          style={{
            width: 72, height: 72, borderRadius: '50%',
            background: 'linear-gradient(135deg, #16a34a, #2563eb)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 34, margin: '0 auto 10px',
          }}
        >
          {'\u{1F464}'}
        </div>
        <div style={{ fontSize: 18, fontWeight: 900, ...h }}>Sports Enthusiast</div>
      </div>

      {/* Level / Streak Badges */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: 10, marginBottom: 20 }}>
        <span
          style={{
            fontSize: 12, fontWeight: 800, color: '#16a34a', background: '#f0fdf4',
            padding: '4px 14px', borderRadius: 20, ...h,
          }}
        >
          Level {level}
        </span>
        <span
          style={{
            fontSize: 12, fontWeight: 800, color: '#ca8a04', background: '#fefce8',
            padding: '4px 14px', borderRadius: 20, ...h,
          }}
        >
          {'\u{1F525}'} {streak} Day Streak
        </span>
      </div>

      {/* XP Progress Card */}
      <div style={card}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
          <span style={{ fontSize: 13, fontWeight: 700, ...h }}>Level {level} Progress</span>
          <span style={{ fontSize: 12, color: '#78716c', ...h }}>{xpInLevel} / {xpToNext} XP</span>
        </div>
        <div style={{ height: 10, background: '#f0ede8', borderRadius: 5, overflow: 'hidden' }}>
          <div
            style={{
              height: '100%', width: `${Math.min(progressPct, 100)}%`,
              background: 'linear-gradient(90deg, #16a34a, #2563eb)',
              borderRadius: 5, transition: 'width .3s',
            }}
          />
        </div>
        <div style={{ fontSize: 11, color: '#78716c', marginTop: 6, ...h }}>
          {xpToNext - xpInLevel} XP to Level {level + 1}
        </div>
      </div>

      {/* Stats Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10, marginBottom: 8 }}>
        {[
          { label: 'Total XP', value: xp.toLocaleString(), color: '#2563eb' },
          { label: 'Day Streak', value: streak, color: '#ca8a04' },
          { label: 'Bookmarks', value: bookmarks.length, color: '#7c3aed' },
          { label: 'Sports Read', value: 8, color: '#16a34a' },
        ].map((stat) => (
          <div key={stat.label} style={{ ...card, textAlign: 'center', padding: 12 }}>
            <div style={{ fontSize: 20, fontWeight: 900, color: stat.color, ...h }}>{stat.value}</div>
            <div style={{ fontSize: 10, color: '#78716c', fontWeight: 600, marginTop: 2, ...h }}>{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Achievements */}
      <div style={sectionLabel}>ACHIEVEMENTS</div>
      {achievements.map((a) => {
        const pct = Math.min((a.prog / a.goal) * 100, 100);
        return (
          <div
            key={a.id}
            style={{
              ...card,
              display: 'flex', alignItems: 'center', gap: 12,
              background: a.done ? '#fffbeb' : '#fff',
              opacity: a.done ? 1 : 0.7,
            }}
          >
            <div
              style={{
                width: 40, height: 40, borderRadius: 10,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 20, background: a.done ? '#fef3c7' : '#f0ede8',
              }}
            >
              {a.done ? a.icon : '\u{1F512}'}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 2 }}>
                <span style={{ fontSize: 13, fontWeight: 800, ...h }}>{a.name}</span>
                <span
                  style={{
                    fontSize: 9, fontWeight: 700, color: '#ca8a04', background: '#fef3c7',
                    padding: '1px 6px', borderRadius: 4, ...h,
                  }}
                >
                  +{a.xp} XP
                </span>
              </div>
              <div style={{ fontSize: 11, color: '#78716c', marginBottom: 6, ...h }}>{a.desc}</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <div style={{ flex: 1, height: 6, background: '#f0ede8', borderRadius: 3, overflow: 'hidden' }}>
                  <div
                    style={{
                      height: '100%', width: `${pct}%`,
                      background: a.done ? '#ca8a04' : '#2563eb',
                      borderRadius: 3,
                    }}
                  />
                </div>
                <span style={{ fontSize: 10, color: '#78716c', fontWeight: 600, whiteSpace: 'nowrap', ...h }}>
                  {a.prog}/{a.goal}
                </span>
              </div>
            </div>
          </div>
        );
      })}

      {/* Bookmarked Sports */}
      <div style={sectionLabel}>BOOKMARKED SPORTS</div>
      {bookmarkedSports.length === 0 ? (
        <div style={{ ...card, textAlign: 'center', color: '#aaa', fontSize: 13, ...h }}>
          No bookmarks yet. Tap the bookmark icon on any sport!
        </div>
      ) : (
        bookmarkedSports.map((s) => (
          <div key={s.id} style={{ ...card, display: 'flex', alignItems: 'center', gap: 12 }}>
            <div
              style={{
                width: 40, height: 40, borderRadius: 10,
                background: s.c + '18',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 22, flexShrink: 0,
              }}
            >
              {s.i}
            </div>
            <div>
              <div style={{ fontSize: 14, fontWeight: 800, ...h }}>{s.n}</div>
              <div style={{ fontSize: 10, color: '#78716c', ...h }}>
                {s.fans} fans {'\u00B7'} {s.r ? s.r.length : 0} rules
              </div>
            </div>
          </div>
        ))
      )}

      {/* Settings */}
      <div style={sectionLabel}>SETTINGS</div>
      <div style={card}>
        {SETTINGS.map((item, i) => (
          <div
            key={item.label}
            style={{
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              padding: '10px 0',
              borderBottom: i < SETTINGS.length - 1 ? '1px solid #f0ede8' : 'none',
            }}
          >
            <span style={{ fontSize: 13, fontWeight: 600, ...h }}>{item.label}</span>
            <span style={{ fontSize: 13, color: '#78716c', ...h }}>{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
