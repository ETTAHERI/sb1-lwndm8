import { useState, FormEvent } from 'react';

interface BusFormProps {
  onSubmit: (data: BusFormData) => void;
  initialData?: BusFormData;
}

export interface BusFormData {
  id?: string;
  busNumber: string;
  driverName: string;
  driverPhone: string;
  capacity: number;
  route: string;
  departureTime: string;
  returnTime: string;
  status: 'active' | 'inactive';
}

export default function BusForm({ onSubmit, initialData }: BusFormProps) {
  const [formData, setFormData] = useState<BusFormData>(
    initialData || {
      busNumber: '',
      driverName: '',
      driverPhone: '',
      capacity: 40,
      route: '',
      departureTime: '',
      returnTime: '',
      status: 'active',
    }
  );

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form id="modal-form" onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Bus Number
          </label>
          <input
            type="text"
            required
            value={formData.busNumber}
            onChange={(e) => setFormData({ ...formData, busNumber: e.target.value })}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Capacity
          </label>
          <input
            type="number"
            required
            min="1"
            value={formData.capacity}
            onChange={(e) => setFormData({ ...formData, capacity: parseInt(e.target.value) })}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Driver Name
          </label>
          <input
            type="text"
            required
            value={formData.driverName}
            onChange={(e) => setFormData({ ...formData, driverName: e.target.value })}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Driver Phone
          </label>
          <input
            type="tel"
            required
            value={formData.driverPhone}
            onChange={(e) => setFormData({ ...formData, driverPhone: e.target.value })}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Route
        </label>
        <input
          type="text"
          required
          value={formData.route}
          onChange={(e) => setFormData({ ...formData, route: e.target.value })}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
        />
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Departure Time
          </label>
          <input
            type="time"
            required
            value={formData.departureTime}
            onChange={(e) => setFormData({ ...formData, departureTime: e.target.value })}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Return Time
          </label>
          <input
            type="time"
            required
            value={formData.returnTime}
            onChange={(e) => setFormData({ ...formData, returnTime: e.target.value })}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Status
        </label>
        <select
          required
          value={formData.status}
          onChange={(e) => setFormData({ ...formData, status: e.target.value as 'active' | 'inactive' })}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
        >
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
      </div>
    </form>
  );
}