import { useState, FormEvent } from 'react';

interface BookFormProps {
  onSubmit: (data: BookFormData) => void;
  initialData?: BookFormData;
}

export interface BookFormData {
  id?: string;
  title: string;
  author: string;
  isbn: string;
  category: string;
  quantity: number;
  available: number;
  location: string;
  status: 'available' | 'unavailable';
  description?: string;
}

const CATEGORIES = [
  'Textbook',
  'Reference',
  'Fiction',
  'Non-Fiction',
  'Magazine',
  'Journal',
  'Educational',
];

export default function BookForm({ onSubmit, initialData }: BookFormProps) {
  const [formData, setFormData] = useState<BookFormData>(
    initialData || {
      title: '',
      author: '',
      isbn: '',
      category: '',
      quantity: 1,
      available: 1,
      location: '',
      status: 'available',
      description: '',
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
          Book Title
        </label>
        <input
          type="text"
          required
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
        />
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Author
          </label>
          <input
            type="text"
            required
            value={formData.author}
            onChange={(e) => setFormData({ ...formData, author: e.target.value })}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            ISBN
          </label>
          <input
            type="text"
            required
            value={formData.isbn}
            onChange={(e) => setFormData({ ...formData, isbn: e.target.value })}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Category
          </label>
          <select
            required
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          >
            <option value="">Select Category</option>
            {CATEGORIES.map(category => (
              <option key={category} value={category}>{category}</option>
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
            Quantity
          </label>
          <input
            type="number"
            required
            min="1"
            value={formData.quantity}
            onChange={(e) => {
              const quantity = parseInt(e.target.value);
              setFormData({
                ...formData,
                quantity,
                available: Math.min(formData.available, quantity),
              });
            }}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Available
          </label>
          <input
            type="number"
            required
            min="0"
            max={formData.quantity}
            value={formData.available}
            onChange={(e) => setFormData({ ...formData, available: parseInt(e.target.value) })}
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
          onChange={(e) => setFormData({ ...formData, status: e.target.value as 'available' | 'unavailable' })}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
        >
          <option value="available">Available</option>
          <option value="unavailable">Unavailable</option>
        </select>
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