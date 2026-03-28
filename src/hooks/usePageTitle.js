import { useEffect } from 'react';

export function usePageTitle(title) {
  useEffect(() => {
    const base = 'SportDecoded';
    document.title = title ? `${title} | ${base}` : `${base} — Every Sport Rule Explained`;
  }, [title]);
}
