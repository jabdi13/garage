import { Link } from 'react-router-dom';
import { useOrders } from '../context/OrdersContext';
import { OrderList } from './OrderList';

export function GarageView() {
  const { orders } = useOrders();

  return (
    <div className="garage-view">
      <h1>Repair Orders</h1>
      <Link to="/garage/new" className="new-order-button">+ New Order</Link>
      <OrderList orders={orders} />
    </div>
  );
}
