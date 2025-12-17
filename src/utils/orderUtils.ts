import type { OrderStatus } from '../types/repairOrder';

export const ORDER_STATUS_LABELS: Record<OrderStatus, string> = {
  pending: 'Pending',
  awaiting_approval: 'Awaiting Approval',
  approved: 'Approved',
  in_progress: 'In Progress',
  completed: 'Completed',
  delivered: 'Delivered'
};

export function getStatusLabel(status: OrderStatus): string {
  return ORDER_STATUS_LABELS[status];
}
