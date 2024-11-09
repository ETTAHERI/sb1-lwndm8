import { useState, FormEvent } from 'react';

interface ParentFormProps {
  onSubmit: (data: ParentFormData) => void;
  initialData?: ParentFormData;
}

export interface ParentFormData {
  id?: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  occupation: string;
  address: string;
  numberOfChildren: number;
  status: 'active' | 'inactive';
}

export default function ParentForm({ onSubmit, initialData }: ParentFormProps) {
  const [formData, setFormData] = useState<ParentFormData>(
    initialData || {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      occupation: '',
      address: '',
      numberOfChildren: 1,
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
            First Name
          </label>
          <input
            type="text"
            required
            value={formData.firstName}
            onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Last Name
          </label>
          <input
            type="text"
            required
            value={formData.lastName}
            onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            required
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Phone
          </label>
          <input
            type="tel"
            required
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Occupation
          </label>
          <input
            type="text"
            required
            value={formData.occupation}
            onChange={(e) => setFormData({ ...formData, occupation: e.target.value })}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Number of Children
          </label>
          <input
            type="number"
            required
            min="1"
            value={formData.numberOfChildren}
            onChange={(e) => setFormData({ ...formData, numberOfChildren: parseInt(e.target.value) })}
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

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Address
        </label>
        <textarea
          required
          value={formData.address}
          onChange={(e) => setFormData({ ...formData, address: e.target.value })}
          rows={3}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
        />
      </div>
    </form>
  );
}