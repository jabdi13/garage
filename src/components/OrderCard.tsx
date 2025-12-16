import type { ChangeEvent } from 'react';
import type { RepairOrder, OrderStatus } from '../types/repairOrder';
import { useOrders } from '../context/OrdersContext';

interface OrderCardProps {
  order: RepairOrder;
}

export function OrderCard({ order }: OrderCardProps) {
  const { updateOrderStatus } = useOrders();

  const handleStatusChange = (e: ChangeEvent<HTMLSelectElement>) => {
    updateOrderStatus(order.id, e.target.value as OrderStatus);
  };

  return (
    <div className="order-card">
      <h3>{order.vehicle.make} {order.vehicle.model} {order.vehicle.year}</h3>
      <p>Plate: {order.vehicle.licensePlate}</p>

      <p>Client: {order.client.name}</p>
      <p>Phone: {order.client.phone}</p>
      <p>Email: {order.client.email}</p>

      <p>Service: {order.serviceDescription}</p>
      <p>Cost: ${order.estimatedCost}</p>

      <p>
        Status:{' '}
        <select value={order.status} onChange={handleStatusChange}>
          <option value="pending">Pending</option>
          <option value="awaiting_approval">Awaiting Approval</option>
          <option value="approved">Approved</option>
          <option value="in_progress">In Progress</option>
          <option value="completed">Completed</option>
          <option value="delivered">Delivered</option>
        </select>
      </p>
      <p>Created: {order.createdAt.toString()}</p>
    </div>
  );
}
