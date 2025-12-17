import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useOrders } from '../context/OrdersContext';
import type { OrderStatus } from '../types/repairOrder';
import { OrderList } from './OrderList';
import { ConfirmationBanner } from './ConfirmationBanner';
import { OrderFilters } from './OrderFilters';
import { getStatusLabel } from '../utils/orderUtils';

export function GarageView() {
  const { orders, updateOrderStatus } = useOrders();
  const [pendingStatusChange, setPendingStatusChange] = useState<{
    orderId: string;
    newStatus: OrderStatus;
    orderName: string;
  } | null>(null);

  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');

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

  const handleClearFilters = () => {
    setStatusFilter('all');
    setSearchTerm('');
  };

  const filteredOrders = orders.filter(order => {
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    const matchesSearch =
      searchTerm === '' ||
      order.client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.vehicle.licensePlate.toLowerCase().includes(searchTerm.toLowerCase()) ||
      `${order.vehicle.make} ${order.vehicle.model}`.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="garage-view">
      {pendingStatusChange && (
        <ConfirmationBanner
          message={`Change ${pendingStatusChange.orderName} status to ${getStatusLabel(pendingStatusChange.newStatus)}?`}
          onConfirm={handleConfirmStatusChange}
          onCancel={handleCancelStatusChange}
        />
      )}
      <h1>Repair Orders</h1>
      <Link to="/garage/new" className="new-order-button">+ New Order</Link>

      <OrderFilters
        statusFilter={statusFilter}
        searchTerm={searchTerm}
        onStatusFilterChange={setStatusFilter}
        onSearchTermChange={setSearchTerm}
        onClearFilters={handleClearFilters}
      />

      <p className="order-count">
        Showing {filteredOrders.length} of {orders.length} orders
      </p>

      <OrderList orders={filteredOrders} onRequestStatusChange={handleRequestStatusChange} />
    </div>
  );
}
