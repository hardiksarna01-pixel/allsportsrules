import { useLocalStorage } from './useLocalStorage';

export function useBookmarks() {
  const [bookmarks, setBookmarks] = useLocalStorage('sportdecoded_bookmarks', [
    'cricket',
    'football',
    'f1',
  ]);

  const toggle = (id) => {
    setBookmarks((prev) =>
      prev.includes(id) ? prev.filter((b) => b !== id) : [...prev, id]
    );
  };

  const isBookmarked = (id) => bookmarks.includes(id);

  return { bookmarks, toggle, isBookmarked };
}
