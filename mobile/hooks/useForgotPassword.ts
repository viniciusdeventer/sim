import { useState } from 'react';
import authService from '../services/user.service';

export default function useForgotPassword() {
  const [loading, setLoading] = useState(false);

  const requestPasswordReset = async (email: string) => {
    setLoading(true);

    try {
      return await authService.requestPasswordReset({ email });
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    requestPasswordReset,
  };
}