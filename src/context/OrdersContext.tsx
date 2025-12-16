import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';
import type { RepairOrder, OrderStatus } from '../types/repairOrder';
import { MOCK_ORDERS } from '../data/mockOrders';

interface OrdersContextType {
  orders: RepairOrder[];
  addOrder: (orderData: Omit<RepairOrder, 'id' | 'status' | 'createdAt' | 'updatedAt' | 'completedAt'>) => void;
  updateOrderStatus: (orderId: string, newStatus: OrderStatus) => void;
  updateOrder: (orderId: string, updates: Partial<Pick<RepairOrder, 'vehicle' | 'client' | 'serviceDescription' | 'estimatedCost'>>) => void;
}

const OrdersContext = createContext<OrdersContextType | undefined>(undefined);

export function OrdersProvider({ children }: { children: ReactNode }) {
  const [orders, setOrders] = useState<RepairOrder[]>(MOCK_ORDERS);

  const addOrder = (orderData: Omit<RepairOrder, 'id' | 'status' | 'createdAt' | 'updatedAt' | 'completedAt'>) => {
    const newOrder: RepairOrder = {
      ...orderData,
      id: Date.now().toString(),
      status: 'pending',
      createdAt: new Date(),
      updatedAt: new Date()
    };

    setOrders([newOrder, ...orders]);
  };

  const updateOrderStatus = (orderId: string, newStatus: OrderStatus) => {
    setOrders(orders.map(order => {
      if (order.id === orderId) {
        return {
          ...order,
          status: newStatus,
          updatedAt: new Date(),
          completedAt: newStatus === 'completed' ? new Date() : order.completedAt
        };
      }
      return order;
    }));
  };

  const updateOrder = (orderId: string, updates: Partial<Pick<RepairOrder, 'vehicle' | 'client' | 'serviceDescription' | 'estimatedCost'>>) => {
    setOrders(orders.map(order => {
      if (order.id === orderId) {
        return {
          ...order,
          ...updates,
          updatedAt: new Date()
        };
      }
      return order;
    }));
  };

  return (
    <OrdersContext.Provider value={{ orders, addOrder, updateOrderStatus, updateOrder }}>
      {children}
    </OrdersContext.Provider>
  );
}

export function useOrders() {
  const context = useContext(OrdersContext);
  if (context === undefined) {
    throw new Error('useOrders must be used within an OrdersProvider');
  }
  return context;
}
