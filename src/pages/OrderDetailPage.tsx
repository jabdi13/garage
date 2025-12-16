import { useParams, useNavigate } from 'react-router-dom';
import { useOrders } from '../context/OrdersContext';

export function OrderDetailPage() {
  const { orderId } = useParams<{ orderId: string }>();
  const { orders } = useOrders();
  const navigate = useNavigate();

  const order = orders.find(o => o.id === orderId);

  if (!order) {
    return (
      <div className="order-detail-page">
        <h1>Order Not Found</h1>
        <p>The order you're looking for doesn't exist.</p>
        <button onClick={() => navigate('/garage')}>Back to Orders</button>
      </div>
    );
  }

  const statusLabels: Record<string, string> = {
    pending: 'Pending',
    awaiting_approval: 'Awaiting Approval',
    approved: 'Approved',
    in_progress: 'In Progress',
    completed: 'Completed',
    delivered: 'Delivered'
  };

  return (
    <div className="order-detail-page">
      <div className="detail-header">
        <h1>Order Details</h1>
        <button onClick={() => navigate('/garage')} className="btn-back">
          ← Back to Orders
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

        {/* Client Info Card */}
        <div className="info-card">
          <h2>Client Information</h2>
          <div className="info-grid">
            <div className="info-item">
              <span className="info-label">Name:</span>
              <span className="info-value">{order.client.name}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Phone:</span>
              <span className="info-value">{order.client.phone}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Email:</span>
              <span className="info-value">{order.client.email}</span>
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
                {statusLabels[order.status]}
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

        {/* Action Buttons */}
        <div className="detail-actions">
          <button className="btn-edit" disabled>
            Edit Order (Coming Soon)
          </button>
          <button className="btn-delete" disabled>
            Delete Order (Coming Soon)
          </button>
        </div>
      </div>
    </div>
  );
}
