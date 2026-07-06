import api from './api';
import { Count, CreateCountDTO } from '../types/count';

export const CountService = {
    listarTodas: async (): Promise<Count[]> => {
        const response = await api.get('/contagens');
        return response.data;
    },

    registrar: async (dados: CreateCountDTO): Promise<Count> => {
        const response = await api.post('/contagens', {...dados, data: new Date().toISOString()});
        return response.data;
    },
};