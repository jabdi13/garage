import type { ChangeEvent } from 'react';
import type { OrderStatus } from '../types/repairOrder';

interface OrderFiltersProps {
  statusFilter: string;
  searchTerm: string;
  onStatusFilterChange: (status: string) => void;
  onSearchTermChange: (term: string) => void;
  onClearFilters: () => void;
}

export function OrderFilters({
  statusFilter,
  searchTerm,
  onStatusFilterChange,
  onSearchTermChange,
  onClearFilters
}: OrderFiltersProps) {
  const handleStatusChange = (e: ChangeEvent<HTMLSelectElement>) => {
    onStatusFilterChange(e.target.value);
  };

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    onSearchTermChange(e.target.value);
  };

  return (
    <div className="order-filters">
      <div className="filter-group">
        <label>Status:</label>
        <select value={statusFilter} onChange={handleStatusChange}>
          <option value="all">All</option>
          <option value="pending">Pending</option>
          <option value="awaiting_approval">Awaiting Approval</option>
          <option value="approved">Approved</option>
          <option value="in_progress">In Progress</option>
          <option value="completed">Completed</option>
          <option value="delivered">Delivered</option>
        </select>
      </div>

      <div className="filter-group">
        <label>Search:</label>
        <input
          type="text"
          placeholder="Client name, vehicle, or license plate..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>

      <button onClick={onClearFilters} className="btn-clear-filters">
        Clear Filters
      </button>
    </div>
  );
}
