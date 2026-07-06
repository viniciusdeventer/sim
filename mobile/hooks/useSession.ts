import { useEffect, useState } from 'react';
import { authStorage } from '../storage/auth.storage';

export default function useSession() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const savedUser = await authStorage.getUser();
      setUser(savedUser);
      setLoading(false);
    };

    load();
  }, []);

  return {
    user,
    loading,
  };
}