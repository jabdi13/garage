import type { ChangeEvent } from 'react';
import type { RepairOrder, OrderStatus } from '../types/repairOrder';

interface OrderCardProps {
  order: RepairOrder;
  onRequestStatusChange: (orderId: string, newStatus: OrderStatus, orderName: string) => void;
}

export function OrderCard({ order, onRequestStatusChange }: OrderCardProps) {
  const handleStatusChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const newStatus = e.target.value as OrderStatus;
    if (newStatus !== order.status) {
      const orderName = `${order.vehicle.make} ${order.vehicle.model} ${order.vehicle.year}`;
      onRequestStatusChange(order.id, newStatus, orderName);
    }
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
