import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useOrders } from '../context/OrdersContext';
import type { OrderStatus } from '../types/repairOrder';
import { OrderList } from './OrderList';
import { ConfirmationBanner } from './ConfirmationBanner';

export function GarageView() {
  const { orders, updateOrderStatus } = useOrders();
  const [pendingStatusChange, setPendingStatusChange] = useState<{
    orderId: string;
    newStatus: OrderStatus;
    orderName: string;
  } | null>(null);

  const formatStatus = (status: OrderStatus) => {
    const labels = {
      pending: 'Pending',
      awaiting_approval: 'Awaiting Approval',
      approved: 'Approved',
      in_progress: 'In Progress',
      completed: 'Completed',
      delivered: 'Delivered'
    };
    return labels[status];
  };

  const handleRequestStatusChange = (orderId: string, newStatus: OrderStatus, orderName: string) => {
    setPendingStatusChange({ orderId, newStatus, orderName });
  };

  const handleConfirmStatusChange = () => {
    if (pendingStatusChange) {
      updateOrderStatus(pendingStatusChange.orderId, pendingStatusChange.newStatus);
      setPendingStatusChange(null);
    }
  };

  const handleCancelStatusChange = () => {
    setPendingStatusChange(null);
  };

  return (
    <div className="garage-view">
      {pendingStatusChange && (
        <ConfirmationBanner
          message={`Change ${pendingStatusChange.orderName} status to ${formatStatus(pendingStatusChange.newStatus)}?`}
          onConfirm={handleConfirmStatusChange}
          onCancel={handleCancelStatusChange}
        />
      )}
      <h1>Repair Orders</h1>
      <Link to="/garage/new" className="new-order-button">+ New Order</Link>
      <OrderList orders={orders} onRequestStatusChange={handleRequestStatusChange} />
    </div>
  );
}
