import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';
import type { RepairOrder, OrderStatus } from '../types/repairOrder';
import { MOCK_ORDERS } from '../data/mockOrders';

interface OrdersContextType {
  orders: RepairOrder[];
  addOrder: (orderData: Omit<RepairOrder, 'id' | 'status' | 'createdAt' | 'updatedAt' | 'completedAt'>) => void;
  updateOrderStatus: (orderId: string, newStatus: OrderStatus) => void;
  updateOrder: (orderId: string, updates: Partial<Pick<RepairOrder, 'vehicle' | 'client' | 'serviceDescription' | 'estimatedCost'>>) => void;
  deleteOrder: (orderId: string) => void;
  submitProposal: (orderId: string, serviceDescription: string, estimatedCost: number) => void;
  respondToProposal: (orderId: string, approved: boolean) => void;
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

  const deleteOrder = (orderId: string) => {
    setOrders(orders.filter(order => order.id !== orderId));
  };

  const submitProposal = (orderId: string, serviceDescription: string, estimatedCost: number) => {
    setOrders(orders.map(order => {
      if (order.id === orderId) {
        return {
          ...order,
          serviceDescription,
          estimatedCost,
          status: 'awaiting_approval' as OrderStatus,
          updatedAt: new Date()
        };
      }
      return order;
    }));
  };

  const respondToProposal = (orderId: string, approved: boolean) => {
    setOrders(orders.map(order => {
      if (order.id === orderId) {
        return {
          ...order,
          status: (approved ? 'approved' : 'pending') as OrderStatus,
          updatedAt: new Date()
        };
      }
      return order;
    }));
  };

  return (
    <OrdersContext.Provider value={{ orders, addOrder, updateOrderStatus, updateOrder, deleteOrder, submitProposal, respondToProposal }}>
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
