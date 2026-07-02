/**
 * Authentication hook
 */

'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { getAccessToken, removeAccessToken, removeRefreshToken } from '../api/client';
import type { AuthUser } from '../api/types';

interface AuthContextType {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (identifier: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

/**
 * Parse JWT token to get user info
 */
const parseToken = (token: string): AuthUser | null => {
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return {
      userId: payload.userId || payload.sub,
      username: payload.username || payload.preferred_username,
      email: payload.email,
      role: payload.role || payload.roles?.[0] || 'USER',
      roles: payload.roles || [payload.role] || ['USER'],
    };
  } catch {
    return null;
  }
};

/**
 * Auth Provider Component
 */
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing token on mount
    const token = getAccessToken();
    if (token) {
      const parsedUser = parseToken(token);
      if (parsedUser) {
        setUser(parsedUser);
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (identifier: string, password: string) => {
    // Import auth endpoint to avoid circular dependency
    const { login: loginApi } = await import('../api/endpoints/auth');
    const response = await loginApi({ identifier, password });
    setUser({
      userId: response.userId,
      username: response.username,
      email: response.email,
      role: response.role,
      roles: response.roles,
    });
  };

  const logout = () => {
    removeAccessToken();
    removeRefreshToken();
    setUser(null);

    // Clear cookies
    if (typeof document !== 'undefined') {
      document.cookie = 'accessToken=; path=/; max-age=0';
      document.cookie = 'refreshToken=; path=/; max-age=0';
    }

    // Redirect to login
    if (typeof window !== 'undefined') {
      window.location.href = '/login';
    }
  };

  const contextValue: AuthContextType = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
}

/**
 * Use auth context
 */
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
