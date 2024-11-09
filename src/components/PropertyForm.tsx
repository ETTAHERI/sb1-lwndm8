import { useState, FormEvent } from 'react';

interface PropertyFormProps {
  onSubmit: (data: PropertyFormData) => void;
  initialData?: PropertyFormData;
}

export interface PropertyFormData {
  id?: string;
  name: string;
  type: string;
  location: string;
  capacity: number;
  facilities: string[];
  condition: string;
  lastMaintenance: string;
  nextMaintenance: string;
  status: 'operational' | 'maintenance' | 'closed';
  notes?: string;
}

const PROPERTY_TYPES = [
  'Academic',
  'Administrative',
  'Sports',
  'Laboratory',
  'Library',
  'Cafeteria',
  'Dormitory',
  'Other',
];

const FACILITIES = [
  'Classrooms',
  'Labs',
  'Library',
  'Cafeteria',
  'Gym',
  'Playground',
  'Parking',
  'Offices',
  'Meeting Rooms',
  'Storage',
];

const CONDITIONS = ['Excellent', 'Good', 'Fair', 'Poor', 'Critical'];

export default function PropertyForm({ onSubmit, initialData }: PropertyFormProps) {
  const [formData, setFormData] = useState<PropertyFormData>(
    initialData || {
      name: '',
      type: '',
      location: '',
      capacity: 0,
      facilities: [],
      condition: '',
      lastMaintenance: '',
      nextMaintenance: '',
      status: 'operational',
      notes: '',
    }
  );

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleFacilityChange = (facility: string) => {
    setFormData(prev => ({
      ...prev,
      facilities: prev.facilities.includes(facility)
        ? prev.facilities.filter(f => f !== facility)
        : [...prev.facilities, facility],
    }));
  };

  return (
    <form id="modal-form" onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Property Name
        </label>
        <input
          type="text"
          required
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
        />
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Type
          </label>
          <select
            required
            value={formData.type}
            onChange={(e) => setFormData({ ...formData, type: e.target.value })}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          >
            <option value="">Select Type</option>
            {PROPERTY_TYPES.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Location
          </label>
          <input
            type="text"
            required
            value={formData.location}
            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Capacity
          </label>
          <input
            type="number"
            required
            min="0"
            value={formData.capacity}
            onChange={(e) => setFormData({ ...formData, capacity: parseInt(e.target.value) })}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Condition
          </label>
          <select
            required
            value={formData.condition}
            onChange={(e) => setFormData({ ...formData, condition: e.target.value })}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          >
            <option value="">Select Condition</option>
            {CONDITIONS.map(condition => (
              <option key={condition} value={condition}>{condition}</option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Facilities
        </label>
        <div className="grid grid-cols-2 gap-4">
          {FACILITIES.map(facility => (
            <label key={facility} className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={formData.facilities.includes(facility)}
                onChange={() => handleFacilityChange(facility)}
                className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
              />
              <span className="text-sm text-gray-700">{facility}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Last Maintenance
          </label>
          <input
            type="date"
            required
            value={formData.lastMaintenance}
            onChange={(e) => setFormData({ ...formData, lastMaintenance: e.target.value })}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Next Maintenance
          </label>
          <input
            type="date"
            required
            value={formData.nextMaintenance}
            onChange={(e) => setFormData({ ...formData, nextMaintenance: e.target.value })}
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
          onChange={(e) => setFormData({ ...formData, status: e.target.value as PropertyFormData['status'] })}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
        >
          <option value="operational">Operational</option>
          <option value="maintenance">Under Maintenance</option>
          <option value="closed">Closed</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Notes
        </label>
        <textarea
          value={formData.notes}
          onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
          rows={3}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
        />
      </div>
    </form>
  );
}