import api  from './api';
import { Movement, CreateMovementDTO } from '../types/movement';

export const MovementService = {
  getAll: async (): Promise<Movement[]> => {
    const response = await api.get('/movements');
    return response.data;
  },

  create: async (data: CreateMovementDTO): Promise<Movement> => {
    const response = await api.post('/movements', {
      ...data,
      createdAt: new Date().toISOString(), 
    });
    return response.data;
  },
};