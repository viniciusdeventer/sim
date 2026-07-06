import { useState, useEffect, useCallback } from 'react';
import { CountService } from '../services/count.service';
import { Count, CreateCountDTO } from '../types/count';
import { Alert } from 'react-native';

export function useCount() {
  const [contagens, setContagens] = useState<Count[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const searchCount = useCallback(async () => {
    setIsLoading(true);
    try {
      const dados = await CountService.listarTodas();
      setContagens(dados);
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível buscar o histórico de contagens.');
    } finally {
      setIsLoading(false);
    }
    }, []);

    const registerCount = useCallback(async (dados: CreateCountDTO) => {
        setIsLoading(true);
        try {
            const novaContagem = await CountService.registrar(dados);
            setContagens(prevContagens => [...prevContagens, novaContagem]);
            return true;
        } catch (error) {
            Alert.alert('Erro', 'Não foi possível registrar a operação.');
            return false;
        } finally {
            setIsLoading(false);
        }
    }, []);

  useEffect(() => {
    searchCount();
  }, [searchCount]);

  return { contagens, isLoading, atualizarLista: searchCount, registerCount };
}