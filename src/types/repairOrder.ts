export type OrderStatus =
  | 'pending'
  | 'awaiting_approval'
  | 'approved'
  | 'in_progress'
  | 'completed'
  | 'delivered';

export interface RepairOrder {
  id: string;

  vehicle: {
    make: string;
    model: string;
    year: number;
    licensePlate: string;
  };

  client: {
    name: string;
    phone: string;
    email: string;
  };

  serviceDescription: string;
  estimatedCost: number;

  status: OrderStatus;
  createdAt: Date;
  updatedAt: Date;
  completedAt?: Date;
}
