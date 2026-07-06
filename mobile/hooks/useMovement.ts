import { useState, useEffect, useCallback } from 'react';
import { MovementService } from '../services/movement.service';
import { Movement, CreateMovementDTO } from '../types/movement';
import { Alert } from 'react-native';

export function useMovements() {
  const [movements, setMovements] = useState<Movement[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchMovements = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await MovementService.getAll();
      
      const sortedData = data.sort((a: Movement, b: Movement) => {
        const dateA = new Date(a.createdAt || a.date || 0).getTime();
        const dateB = new Date(b.createdAt || b.date || 0).getTime();
        return dateB - dateA;
      });

      setMovements(sortedData);
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível carregar o Kardex.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const addMovement = async (data: CreateMovementDTO) => {
    setIsLoading(true);
    try {
      const newMovement = await MovementService.create(data);
      setMovements((prev) => [newMovement, ...prev]);
      return true;
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível registrar a movimentação.');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMovements();
  }, [fetchMovements]);

  return { movements, isLoading, addMovement, refresh: fetchMovements };
}