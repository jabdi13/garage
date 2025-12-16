import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';
import type { RepairOrder } from '../types/repairOrder';
import { MOCK_ORDERS } from '../data/mockOrders';

interface OrdersContextType {
  orders: RepairOrder[];
  addOrder: (orderData: Omit<RepairOrder, 'id' | 'status' | 'createdAt' | 'updatedAt' | 'completedAt'>) => void;
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

  return (
    <OrdersContext.Provider value={{ orders, addOrder }}>
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
