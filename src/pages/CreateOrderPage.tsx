import { useState } from 'react';
import type { FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useOrders } from '../context/OrdersContext';

export function CreateOrderPage() {
  const { addOrder } = useOrders();
  const navigate = useNavigate();

  const [make, setMake] = useState('');
  const [model, setModel] = useState('');
  const [year, setYear] = useState('');
  const [licensePlate, setLicensePlate] = useState('');
  const [clientName, setClientName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    addOrder({
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
      serviceDescription: '',
      estimatedCost: 0
    });

    navigate('/garage');
  };

  return (
    <div className="create-order-page">
      <h1>Create New Order</h1>

      <form onSubmit={handleSubmit}>
        <div className="form-section">
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

        <div className="form-section">
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

        <div className="form-actions">
          <button type="button" onClick={() => navigate('/garage')}>Cancel</button>
          <button type="submit">Create Order</button>
        </div>
      </form>
    </div>
  );
}
