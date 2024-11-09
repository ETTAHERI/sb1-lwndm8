import { useState, FormEvent } from 'react';

interface ViolationFormProps {
  onSubmit: (data: ViolationFormData) => void;
  initialData?: ViolationFormData;
}

export interface ViolationFormData {
  id?: string;
  studentName: string;
  type: string;
  description: string;
  date: string;
  reportedBy: string;
  severity: 'minor' | 'moderate' | 'severe';
  status: 'pending' | 'under_review' | 'resolved';
  actions: string;
  witnesses?: string;
  notes?: string;
}

const VIOLATION_TYPES = [
  'Behavioral',
  'Academic',
  'Attendance',
  'Dress Code',
  'Property Damage',
  'Bullying',
  'Other',
];

export default function ViolationForm({ onSubmit, initialData }: ViolationFormProps) {
  const [formData, setFormData] = useState<ViolationFormData>(
    initialData || {
      studentName: '',
      type: '',
      description: '',
      date: new Date().toISOString().split('T')[0],
      reportedBy: '',
      severity: 'minor',
      status: 'pending',
      actions: '',
      witnesses: '',
      notes: '',
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
          Student Name
        </label>
        <input
          type="text"
          required
          value={formData.studentName}
          onChange={(e) => setFormData({ ...formData, studentName: e.target.value })}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
        />
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Violation Type
          </label>
          <select
            required
            value={formData.type}
            onChange={(e) => setFormData({ ...formData, type: e.target.value })}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          >
            <option value="">Select Type</option>
            {VIOLATION_TYPES.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>
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
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Description
        </label>
        <textarea
          required
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          rows={3}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
        />
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Reported By
          </label>
          <input
            type="text"
            required
            value={formData.reportedBy}
            onChange={(e) => setFormData({ ...formData, reportedBy: e.target.value })}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Witnesses
          </label>
          <input
            type="text"
            value={formData.witnesses}
            onChange={(e) => setFormData({ ...formData, witnesses: e.target.value })}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Severity
          </label>
          <select
            required
            value={formData.severity}
            onChange={(e) => setFormData({ ...formData, severity: e.target.value as ViolationFormData['severity'] })}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          >
            <option value="minor">Minor</option>
            <option value="moderate">Moderate</option>
            <option value="severe">Severe</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Status
          </label>
          <select
            required
            value={formData.status}
            onChange={(e) => setFormData({ ...formData, status: e.target.value as ViolationFormData['status'] })}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          >
            <option value="pending">Pending</option>
            <option value="under_review">Under Review</option>
            <option value="resolved">Resolved</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Actions Taken / Recommended
        </label>
        <textarea
          required
          value={formData.actions}
          onChange={(e) => setFormData({ ...formData, actions: e.target.value })}
          rows={3}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Additional Notes
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