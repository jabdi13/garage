import { useParams, useNavigate } from 'react-router-dom';
import { useOrders } from '../context/OrdersContext';
import { getStatusLabel } from '../utils/orderUtils';

export function ClientOrderDetailPage() {
  const { orderId } = useParams<{ orderId: string }>();
  const { orders } = useOrders();
  const navigate = useNavigate();

  const order = orders.find(o => o.id === orderId);

  if (!order) {
    return (
      <div className="client-order-detail">
        <h1>Order Not Found</h1>
        <p>The order you're looking for doesn't exist.</p>
        <button onClick={() => navigate('/client')}>Back to My Orders</button>
      </div>
    );
  }

  return (
    <div className="client-order-detail">
      <div className="detail-header">
        <h1>Order Details</h1>
        <button onClick={() => navigate('/client')} className="btn-back">
          ← Back to My Orders
        </button>
      </div>

      <div className="detail-content">
        {/* Vehicle Info Card */}
        <div className="info-card">
          <h2>Vehicle Information</h2>
          <div className="info-grid">
            <div className="info-item">
              <span className="info-label">Make:</span>
              <span className="info-value">{order.vehicle.make}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Model:</span>
              <span className="info-value">{order.vehicle.model}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Year:</span>
              <span className="info-value">{order.vehicle.year}</span>
            </div>
            <div className="info-item">
              <span className="info-label">License Plate:</span>
              <span className="info-value">{order.vehicle.licensePlate}</span>
            </div>
          </div>
        </div>

        {/* Service Details Card */}
        <div className="info-card">
          <h2>Service Details</h2>
          <div className="info-grid">
            <div className="info-item full-width">
              <span className="info-label">Description:</span>
              <span className="info-value">{order.serviceDescription}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Estimated Cost:</span>
              <span className="info-value">${order.estimatedCost.toFixed(2)}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Status:</span>
              <span className={`info-value status-${order.status}`}>
                {getStatusLabel(order.status)}
              </span>
            </div>
          </div>
        </div>

        {/* Timeline Card */}
        <div className="info-card">
          <h2>Timeline</h2>
          <div className="info-grid">
            <div className="info-item">
              <span className="info-label">Created:</span>
              <span className="info-value">
                {new Date(order.createdAt).toLocaleString()}
              </span>
            </div>
            <div className="info-item">
              <span className="info-label">Last Updated:</span>
              <span className="info-value">
                {new Date(order.updatedAt).toLocaleString()}
              </span>
            </div>
            {order.completedAt && (
              <div className="info-item">
                <span className="info-label">Completed:</span>
                <span className="info-value">
                  {new Date(order.completedAt).toLocaleString()}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
