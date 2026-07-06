export type OperationCount = 'ENTRADA' | 'SAIDA';

export interface Count {
  id: string;
  productId: string;
  operacao: OperationCount;
  quantidade: number;
  data: string; 
}

export type CreateCountDTO = Omit<Count, 'id' | 'data'>;