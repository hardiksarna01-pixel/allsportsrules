import { useBookmarks } from './useBookmarks';
import { useXP } from './useXP';
import { useStreak } from './useStreak';

export function useProfile() {
  const { bookmarks, toggle, isBookmarked } = useBookmarks();
  const { xp, addXP, level, xpInLevel } = useXP();
  const { streak, checkIn } = useStreak();

  return {
    bookmarks,
    toggle,
    isBookmarked,
    xp,
    addXP,
    level,
    xpInLevel,
    streak,
    checkIn,
  };
}
