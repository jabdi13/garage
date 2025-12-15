import type { RepairOrder } from '../types/repairOrder';
import { OrderCard } from './OrderCard';

interface OrderListProps {
  orders: RepairOrder[];
}

export function OrderList({ orders }: OrderListProps) {
  if (orders.length === 0) {
    return <p>No orders found</p>;
  }

  return (
    <div className="order-list">
      {orders.map((order) => (
        <OrderCard key={order.id} order={order} />
      ))}
    </div>
  );
}
