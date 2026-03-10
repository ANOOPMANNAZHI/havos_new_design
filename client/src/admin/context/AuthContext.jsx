import { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../../lib/api';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  async function checkAuth() {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      setLoading(false);
      return;
    }
    try {
      const userData = await api.get('/api/auth/me');
      setUser(userData);
    } catch {
      api.clearTokens();
    }
    setLoading(false);
  }

  async function login(email, password) {
    const data = await api.post('/api/auth/login', { email, password });
    api.setTokens(data.accessToken, data.refreshToken);
    setUser(data.user);
    return data;
  }

  async function logout() {
    try {
      await api.post('/api/auth/logout', {});
    } catch {
      // ignore
    }
    api.clearTokens();
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
}
