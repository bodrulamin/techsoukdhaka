/**
 * Authentication types
 */

export interface LoginRequest {
  identifier: string; // username, email, or phone
  password: string;
}

export interface RegisterRequest {
  username: string;
  email: string;
  phoneNumber?: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  type: string;
  userId: string;
  username: string;
  email: string;
  role: string;
  roles: string[];
}

export interface AuthUser {
  userId: string;
  username: string;
  email: string;
  role: string;
  roles: string[];
}
