import { useLocalStorage } from './useLocalStorage';

export function useXP() {
  const [xp, setXP] = useLocalStorage('sportdecoded_xp', 4680);

  const addXP = (amount) => {
    setXP((prev) => prev + amount);
  };

  const level = Math.floor(xp / 1000) + 1;
  const xpInLevel = xp % 1000;

  return { xp, addXP, level, xpInLevel };
}
