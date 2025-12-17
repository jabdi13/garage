import { useState, FormEvent } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useOrders } from '../context/OrdersContext';
import { ConfirmationBanner } from '../components/ConfirmationBanner';
import { getStatusLabel } from '../utils/orderUtils';

export function OrderDetailPage() {
  const { orderId } = useParams<{ orderId: string }>();
  const { orders, updateOrder, deleteOrder, submitProposal } = useOrders();
  const navigate = useNavigate();

  const order = orders.find(o => o.id === orderId);

  const [isEditMode, setIsEditMode] = useState(false);
  const [showSaveConfirmation, setShowSaveConfirmation] = useState(false);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [showProposalForm, setShowProposalForm] = useState(false);
  const [proposalCost, setProposalCost] = useState('');
  const [proposalDescription, setProposalDescription] = useState('');
  const [showProposalConfirmation, setShowProposalConfirmation] = useState(false);

  const [make, setMake] = useState('');
  const [model, setModel] = useState('');
  const [year, setYear] = useState('');
  const [licensePlate, setLicensePlate] = useState('');
  const [clientName, setClientName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [serviceDescription, setServiceDescription] = useState('');
  const [estimatedCost, setEstimatedCost] = useState('');

  if (!order) {
    return (
      <div className="order-detail-page">
        <h1>Order Not Found</h1>
        <p>The order you're looking for doesn't exist.</p>
        <button onClick={() => navigate('/garage')}>Back to Orders</button>
      </div>
    );
  }

  const handleEditClick = () => {
    setMake(order.vehicle.make);
    setModel(order.vehicle.model);
    setYear(order.vehicle.year.toString());
    setLicensePlate(order.vehicle.licensePlate);
    setClientName(order.client.name);
    setPhone(order.client.phone);
    setEmail(order.client.email);
    setServiceDescription(order.serviceDescription);
    setEstimatedCost(order.estimatedCost.toString());
    setIsEditMode(true);
  };

  const handleCancelEdit = () => {
    setIsEditMode(false);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setShowSaveConfirmation(true);
  };

  const handleConfirmSave = () => {
    updateOrder(order.id, {
      vehicle: {
        make,
        model,
        year: parseInt(year),
        licensePlate
      },
      client: {
        name: clientName,
        phone,
        email
      },
      serviceDescription,
      estimatedCost: parseFloat(estimatedCost)
    });
    setShowSaveConfirmation(false);
    setIsEditMode(false);
  };

  const handleCancelSave = () => {
    setShowSaveConfirmation(false);
  };

  const handleDeleteClick = () => {
    if (order.status === 'delivered') {
      alert('Cannot delete delivered orders');
      return;
    }
    setShowDeleteConfirmation(true);
  };

  const handleConfirmDelete = () => {
    deleteOrder(order.id);
    setShowDeleteConfirmation(false);
    navigate('/garage');
  };

  const handleCancelDelete = () => {
    setShowDeleteConfirmation(false);
  };

  const handleSubmitProposalClick = () => {
    setProposalDescription('');
    setShowProposalForm(true);
  };

  const handleProposalSubmit = (e: FormEvent) => {
    e.preventDefault();
    setShowProposalConfirmation(true);
  };

  const handleConfirmProposal = () => {
    submitProposal(order.id, proposalDescription, parseFloat(proposalCost));
    setShowProposalConfirmation(false);
    setShowProposalForm(false);
    setProposalCost('');
    setProposalDescription('');
  };

  const handleCancelProposal = () => {
    setShowProposalConfirmation(false);
  };

  const handleCancelProposalForm = () => {
    setShowProposalForm(false);
    setProposalCost('');
    setProposalDescription('');
  };

  if (isEditMode) {
    return (
      <div className="order-detail-page">
        <div className="detail-header">
          <h1>Edit Order</h1>
          <button onClick={handleCancelEdit} className="btn-back">
            Cancel
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="detail-content">
            <div className="info-card">
              <h2>Vehicle Information</h2>
              <div className="form-group">
                <label>Make</label>
                <input type="text" value={make} onChange={(e) => setMake(e.target.value)} required />
              </div>
              <div className="form-group">
                <label>Model</label>
                <input type="text" value={model} onChange={(e) => setModel(e.target.value)} required />
              </div>
              <div className="form-group">
                <label>Year</label>
                <input type="number" value={year} onChange={(e) => setYear(e.target.value)} required />
              </div>
              <div className="form-group">
                <label>License Plate</label>
                <input type="text" value={licensePlate} onChange={(e) => setLicensePlate(e.target.value)} required />
              </div>
            </div>

            <div className="info-card">
              <h2>Client Information</h2>
              <div className="form-group">
                <label>Name</label>
                <input type="text" value={clientName} onChange={(e) => setClientName(e.target.value)} required />
              </div>
              <div className="form-group">
                <label>Phone</label>
                <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} required />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
              </div>
            </div>

            <div className="info-card">
              <h2>Service Details</h2>
              <div className="form-group">
                <label>Service Description</label>
                <textarea value={serviceDescription} onChange={(e) => setServiceDescription(e.target.value)} required rows={4} />
              </div>
              <div className="form-group">
                <label>Estimated Cost ($)</label>
                <input type="number" step="0.01" value={estimatedCost} onChange={(e) => setEstimatedCost(e.target.value)} required />
              </div>
            </div>

            <div className="detail-actions">
              <button type="button" onClick={handleCancelEdit} className="btn-cancel">
                Cancel
              </button>
              <button type="submit" className="btn-confirm">
                Save Changes
              </button>
            </div>
          </div>
        </form>

        {showSaveConfirmation && (
          <ConfirmationBanner
            message={`Save changes to order for ${order.vehicle.make} ${order.vehicle.model}?`}
            onConfirm={handleConfirmSave}
            onCancel={handleCancelSave}
          />
        )}
      </div>
    );
  }

  return (
    <div className="order-detail-page">
      <div className="detail-header">
        <h1>Order Details</h1>
        <button onClick={() => navigate('/garage')} className="btn-back">
          ← Back to Orders
        </button>
      </div>

      <div className="detail-content">
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

        <div className="info-card">
          <h2>Service Details</h2>
          <div className="info-grid">
            <div className="info-item full-width">
              <span className="info-label">Description:</span>
              <span className="info-value">
                {order.serviceDescription || 'Pending evaluation'}
              </span>
            </div>
            <div className="info-item">
              <span className="info-label">Estimated Cost:</span>
              <span className="info-value">
                {order.estimatedCost === 0 ? 'Pending Estimate' : `$${order.estimatedCost.toFixed(2)}`}
              </span>
            </div>
            <div className="info-item">
              <span className="info-label">Status:</span>
              <span className={`info-value status-${order.status}`}>
                {getStatusLabel(order.status)}
              </span>
            </div>
          </div>
        </div>

        {order.status === 'pending' && !showProposalForm && (
          <div className="info-card">
            <h2>Proposal</h2>
            <p>This order is pending a cost estimate.</p>
            <button className="btn-confirm" onClick={handleSubmitProposalClick}>
              Submit Proposal
            </button>
          </div>
        )}

        {order.status === 'pending' && showProposalForm && (
          <div className="info-card">
            <h2>Submit Proposal</h2>
            <form onSubmit={handleProposalSubmit}>
              <div className="form-group">
                <label>Service Description</label>
                <textarea
                  value={proposalDescription}
                  onChange={(e) => setProposalDescription(e.target.value)}
                  required
                  rows={4}
                />
              </div>
              <div className="form-group">
                <label>Estimated Cost ($)</label>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  value={proposalCost}
                  onChange={(e) => setProposalCost(e.target.value)}
                  required
                />
              </div>
              <div className="detail-actions">
                <button type="button" onClick={handleCancelProposalForm} className="btn-cancel">
                  Cancel
                </button>
                <button type="submit" className="btn-confirm">
                  Submit Proposal
                </button>
              </div>
            </form>
          </div>
        )}

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

        <div className="detail-actions">
          <button className="btn-edit" onClick={handleEditClick}>
            Edit Order
          </button>
          <button
            className="btn-delete"
            onClick={handleDeleteClick}
            disabled={order.status === 'delivered'}
          >
            Delete Order
          </button>
        </div>
      </div>

      {showDeleteConfirmation && (
        <ConfirmationBanner
          message={`Delete order for ${order.vehicle.make} ${order.vehicle.model}? This action cannot be undone.`}
          onConfirm={handleConfirmDelete}
          onCancel={handleCancelDelete}
        />
      )}

      {showProposalConfirmation && (
        <ConfirmationBanner
          message={`Submit proposal of $${parseFloat(proposalCost).toFixed(2)} to client?`}
          onConfirm={handleConfirmProposal}
          onCancel={handleCancelProposal}
        />
      )}
    </div>
  );
}
