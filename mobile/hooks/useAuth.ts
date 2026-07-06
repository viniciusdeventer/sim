import { useState } from 'react';
import { LoginRequest, RegisterRequest } from '../types/auth';
import apiService from '../services/user.service';
import { authStorage } from '../storage/auth.storage';

export default function useAuth() {
  const [loading, setLoading] = useState(false);

  const login = async (credentials: LoginRequest) => {
    setLoading(true);

    try {
      const response = await apiService.login(credentials);

      if (response.success && response.user && response.token) {
        await authStorage.save(response.user, response.token);
      }

      return response;
    } finally {
      setLoading(false);
    }
  };

  const register = async (data: RegisterRequest) => {
    setLoading(true);

    try {
      const response = await apiService.register(data);

      if (response.success && response.user && response.token) {
        await authStorage.save(response.user, response.token);
      }

      return response;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    await authStorage.clear();
  };

  return {
    loading,
    login,
    register,
    logout,
  };
}