import type { RepairOrder, OrderStatus } from '../types/repairOrder';
import { OrderCard } from './OrderCard';

interface OrderListProps {
  orders: RepairOrder[];
  onRequestStatusChange: (orderId: string, newStatus: OrderStatus, orderName: string) => void;
}

export function OrderList({ orders, onRequestStatusChange }: OrderListProps) {
  if (orders.length === 0) {
    return <p>No orders found</p>;
  }

  return (
    <div className="order-list">
      {orders.map((order) => (
        <OrderCard key={order.id} order={order} onRequestStatusChange={onRequestStatusChange} />
      ))}
    </div>
  );
}
