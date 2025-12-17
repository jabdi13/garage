import { useNavigate } from 'react-router-dom';
import { useOrders } from '../context/OrdersContext';
import { getStatusLabel } from '../utils/orderUtils';

export function ClientPortalPage() {
  const { orders } = useOrders();
  const navigate = useNavigate();

  return (
    <div className="client-portal">
      <h1>My Repair Orders</h1>

      <div className="client-order-list">
        {orders.length === 0 ? (
          <p>No orders found.</p>
        ) : (
          orders.map(order => (
            <div
              key={order.id}
              className="client-order-card"
              onClick={() => navigate(`/client/order/${order.id}`)}
            >
              <h3>{order.vehicle.make} {order.vehicle.model} {order.vehicle.year}</h3>
              <p>License Plate: {order.vehicle.licensePlate}</p>

              <p className="order-description">{order.serviceDescription}</p>

              <div className="order-footer">
                <span className="order-cost">${order.estimatedCost.toFixed(2)}</span>
                <span className={`order-status status-${order.status}`}>
                  {getStatusLabel(order.status)}
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
