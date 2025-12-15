import { MOCK_ORDERS } from '../data/mockOrders';
import { OrderList } from './OrderList';

export function GarageView() {
  return (
    <div className="garage-view">
      <h1>Repair Orders</h1>
      <OrderList orders={MOCK_ORDERS} />
    </div>
  );
}
