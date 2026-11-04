import { createContext, useContext, useEffect, useState } from 'react';
const FavContext = createContext(null);
const KEY = 'ss_favs';

export function FavProvider({ children }) {
  const [ids, setIds] = useState(() => { try { return JSON.parse(localStorage.getItem(KEY)) || []; } catch { return []; } });
  useEffect(() => { localStorage.setItem(KEY, JSON.stringify(ids)); }, [ids]);
  const toggle = (id) => setIds((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  const has = (id) => ids.includes(id);
  return <FavContext.Provider value={{ ids, toggle, has }}>{children}</FavContext.Provider>;
}
export const useFav = () => useContext(FavContext);