export type MovementType = 'IN' | 'OUT' | 'ENTRADA' | 'SAIDA';

export interface Movement {
  id: string;
  productId: string;
  type: MovementType;
  quantity: number;
  unitPrice?: number;
  observation?: string;
  createdBy?: string;
  createdAt?: string;
  date?: string;
}

export type CreateMovementDTO = Omit<Movement, 'id' | 'createdAt' | 'date'>;