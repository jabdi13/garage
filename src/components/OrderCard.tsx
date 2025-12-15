import type { RepairOrder } from '../types/repairOrder';

interface OrderCardProps {
  order: RepairOrder;
}

export function OrderCard({ order }: OrderCardProps) {
  return (
    <div className="order-card">
      <h3>{order.vehicle.make} {order.vehicle.model} {order.vehicle.year}</h3>
      <p>Plate: {order.vehicle.licensePlate}</p>

      <p>Client: {order.client.name}</p>
      <p>Phone: {order.client.phone}</p>
      <p>Email: {order.client.email}</p>

      <p>Service: {order.serviceDescription}</p>
      <p>Cost: ${order.estimatedCost}</p>

      <p>Status: {order.status}</p>
      <p>Created: {order.createdAt.toString()}</p>
    </div>
  );
}
