/**
 * Authentication API endpoints
 */

import apiClient, { setAccessToken, setAccessTokenCookie, clearTokens, clearTokensCookie } from '../client';
import type { LoginRequest, RegisterRequest, AuthResponse } from '../types';

/**
 * Login user
 */
export const login = async (credentials: LoginRequest): Promise<AuthResponse> => {
  const response = await apiClient.post<AuthResponse>('/auth/login', credentials);
  const { token, refreshToken } = response.data;

  // Store tokens in localStorage (for API client)
  setAccessToken(token);
  if (refreshToken) {
    // Would need a setRefreshToken function if refresh tokens are used
    if (typeof window !== 'undefined') {
      localStorage.setItem('refresh_token', refreshToken);
    }
  }

  // Set cookies for middleware (server-side auth check)
  if (typeof document !== 'undefined') {
    const maxAge = 60 * 60 * 24 * 7; // 7 days
    document.cookie = `accessToken=${token}; path=/; max-age=${maxAge}; SameSite=Lax`;
    if (refreshToken) {
      document.cookie = `refreshToken=${refreshToken}; path=/; max-age=${maxAge}; SameSite=Lax`;
    }
  }

  return response.data;
};

/**
 * Register new user
 */
export const register = async (data: RegisterRequest): Promise<AuthResponse> => {
  const response = await apiClient.post<AuthResponse>('/auth/register', data);
  const { token, refreshToken } = response.data;

  // Store tokens
  setAccessToken(token);
  if (refreshToken) {
    if (typeof window !== 'undefined') {
      localStorage.setItem('refresh_token', refreshToken);
    }
  }

  // Set cookies for middleware
  if (typeof document !== 'undefined') {
    const maxAge = 60 * 60 * 24 * 7; // 7 days
    document.cookie = `accessToken=${token}; path=/; max-age=${maxAge}; SameSite=Lax`;
    if (refreshToken) {
      document.cookie = `refreshToken=${refreshToken}; path=/; max-age=${maxAge}; SameSite=Lax`;
    }
  }

  return response.data;
};

/**
 * Logout user (client-side only)
 */
export const logout = (): void => {
  // Clear tokens from storage
  clearTokens();

  // Clear cookies
  if (typeof document !== 'undefined') {
    document.cookie = 'accessToken=; path=/; max-age=0';
    document.cookie = 'refreshToken=; path=/; max-age=0';
  }
};
