import { createContext, useContext, useEffect, useState } from 'react';
const AuthContext = createContext(null);
const KEY = 'ss_user';

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => { try { return JSON.parse(localStorage.getItem(KEY)); } catch { return null; } });
  useEffect(() => { if (user) localStorage.setItem(KEY, JSON.stringify(user)); else localStorage.removeItem(KEY); }, [user]);
  const login = (u) => setUser(u);
  const logout = () => setUser(null);
  const isAuth = !!user;
  const isAdmin = !!user && (user.role === 'admin' || user.username === 'emilys');
  return <AuthContext.Provider value={{ user, login, logout, isAuth, isAdmin }}>{children}</AuthContext.Provider>;
}
export const useAuth = () => useContext(AuthContext);