import { useEffect } from 'react';
import { useLocalStorage } from './useLocalStorage';

function getToday() {
  return new Date().toISOString().split('T')[0];
}

function getYesterday() {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  return d.toISOString().split('T')[0];
}

export function useStreak() {
  const [streak, setStreak] = useLocalStorage('sportdecoded_streak', {
    count: 5,
    lastDate: null,
  });

  useEffect(() => {
    const today = getToday();
    if (streak.lastDate === today) return;

    if (streak.lastDate === getYesterday()) {
      setStreak({ count: streak.count + 1, lastDate: today });
    } else if (streak.lastDate !== null) {
      setStreak({ count: 1, lastDate: today });
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const checkIn = () => {
    const today = getToday();
    if (streak.lastDate === today) return;

    if (streak.lastDate === getYesterday()) {
      setStreak({ count: streak.count + 1, lastDate: today });
    } else {
      setStreak({ count: 1, lastDate: today });
    }
  };

  return { streak, checkIn };
}
