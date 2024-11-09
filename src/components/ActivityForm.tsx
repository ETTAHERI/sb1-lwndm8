import { useState, FormEvent } from 'react';

interface ActivityFormProps {
  onSubmit: (data: ActivityFormData) => void;
  initialData?: ActivityFormData;
}

export interface ActivityFormData {
  id?: string;
  name: string;
  type: string;
  date: string;
  time: string;
  location: string;
  coordinator: string;
  participants: number;
  status: 'upcoming' | 'ongoing' | 'completed';
  description?: string;
}

const ACTIVITY_TYPES = [
  'academic',
  'sports',
  'cultural',
  'social',
  'field_trip',
  'competition',
  'workshop',
  'other'
];

export default function ActivityForm({ onSubmit, initialData }: ActivityFormProps) {
  const [formData, setFormData] = useState<ActivityFormData>(
    initialData || {
      name: '',
      type: '',
      date: '',
      time: '',
      location: '',
      coordinator: '',
      participants: 0,
      status: 'upcoming',
      description: ''
    }
  );

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form id="modal-form" onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Activity Name
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
            {ACTIVITY_TYPES.map(type => (
              <option key={type} value={type}>
                {type.charAt(0).toUpperCase() + type.slice(1).replace('_', ' ')}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Status
          </label>
          <select
            required
            value={formData.status}
            onChange={(e) => setFormData({ ...formData, status: e.target.value as ActivityFormData['status'] })}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          >
            <option value="upcoming">Upcoming</option>
            <option value="ongoing">Ongoing</option>
            <option value="completed">Completed</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Date
          </label>
          <input
            type="date"
            required
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Time
          </label>
          <input
            type="time"
            required
            value={formData.time}
            onChange={(e) => setFormData({ ...formData, time: e.target.value })}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
        </div>
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

      <div className="grid grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Coordinator
          </label>
          <input
            type="text"
            required
            value={formData.coordinator}
            onChange={(e) => setFormData({ ...formData, coordinator: e.target.value })}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Expected Participants
          </label>
          <input
            type="number"
            required
            min="0"
            value={formData.participants}
            onChange={(e) => setFormData({ ...formData, participants: parseInt(e.target.value) })}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Description
        </label>
        <textarea
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          rows={3}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
        />
      </div>
    </form>
  );
}