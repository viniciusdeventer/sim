import { useState } from 'react';
import { LoginRequest, RegisterRequest } from '../types/auth';
import apiService from '../services/user.service';

export default function useAuth() {
  const [loading, setLoading] = useState(false);

  const login = async (credentials: LoginRequest) => {
    setLoading(true);

    try {
      return await apiService.login(credentials);
    } finally {
      setLoading(false);
    }
  };

  const register = async (data: RegisterRequest) => {
    setLoading(true);

    try {
      return await apiService.register(data);
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    login,
    register,
  };
}