import type { RepairOrder } from '../types/repairOrder';

export const MOCK_ORDERS: RepairOrder[] = [
  {
    id: '1',
    vehicle: {
      make: 'Honda',
      model: 'Civic',
      year: 2019,
      licensePlate: 'ABC-123'
    },
    client: {
      name: 'John Smith',
      phone: '555-0100',
      email: 'john@email.com'
    },
    serviceDescription: 'Oil change and brake inspection',
    estimatedCost: 150,
    status: 'delivered',
    createdAt: new Date('2025-12-10T09:00:00'),
    updatedAt: new Date('2025-12-12T16:30:00'),
    completedAt: new Date('2025-12-12T16:30:00')
  },
  {
    id: '2',
    vehicle: {
      make: 'Toyota',
      model: 'Camry',
      year: 2021,
      licensePlate: 'XYZ-789'
    },
    client: {
      name: 'Maria Garcia',
      phone: '555-0201',
      email: 'maria.g@email.com'
    },
    serviceDescription: 'Replace brake pads and rotors, front and rear',
    estimatedCost: 650,
    status: 'in_progress',
    createdAt: new Date('2025-12-13T10:15:00'),
    updatedAt: new Date('2025-12-15T11:00:00')
  },
  {
    id: '3',
    vehicle: {
      make: 'Ford',
      model: 'F-150',
      year: 2018,
      licensePlate: 'TRK-456'
    },
    client: {
      name: 'Robert Johnson',
      phone: '555-0345',
      email: 'rjohnson@email.com'
    },
    serviceDescription: 'Transmission fluid change, check engine light diagnostic',
    estimatedCost: 280,
    status: 'awaiting_approval',
    createdAt: new Date('2025-12-14T14:20:00'),
    updatedAt: new Date('2025-12-14T15:45:00')
  },
  {
    id: '4',
    vehicle: {
      make: 'Chevrolet',
      model: 'Malibu',
      year: 2020,
      licensePlate: 'CHV-890'
    },
    client: {
      name: 'Lisa Anderson',
      phone: '555-0567',
      email: 'landerson@email.com'
    },
    serviceDescription: 'Replace battery, alternator diagnostic',
    estimatedCost: 420,
    status: 'approved',
    createdAt: new Date('2025-12-15T08:30:00'),
    updatedAt: new Date('2025-12-15T09:15:00')
  },
  {
    id: '5',
    vehicle: {
      make: 'Nissan',
      model: 'Altima',
      year: 2017,
      licensePlate: 'NSN-234'
    },
    client: {
      name: 'David Martinez',
      phone: '555-0789',
      email: 'dmartinez@email.com'
    },
    serviceDescription: 'AC system repair, coolant leak inspection',
    estimatedCost: 550,
    status: 'pending',
    createdAt: new Date('2025-12-15T13:00:00'),
    updatedAt: new Date('2025-12-15T13:00:00')
  }
];
