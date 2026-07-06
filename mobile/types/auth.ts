import type { User } from './user';

export interface LoginRequest {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface LoginResponse {
  success: boolean;
  message: string;
  user?: User;
  token?: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  name: string;
}

export interface PasswordResetRequest {
  email: string;
}