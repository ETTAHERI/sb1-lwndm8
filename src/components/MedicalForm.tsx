import { useState, FormEvent } from 'react';

interface MedicalFormProps {
  onSubmit: (data: MedicalFormData) => void;
  initialData?: MedicalFormData;
}

export interface MedicalFormData {
  id?: string;
  studentName: string;
  condition: string;
  medications: string;
  bloodType: string;
  allergies: string;
  emergencyContact: string;
  emergencyPhone: string;
  lastCheckup: string;
  status: 'active' | 'inactive';
  notes?: string;
}

const BLOOD_TYPES = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

export default function MedicalForm({ onSubmit, initialData }: MedicalFormProps) {
  const [formData, setFormData] = useState<MedicalFormData>(
    initialData || {
      studentName: '',
      condition: '',
      medications: '',
      bloodType: '',
      allergies: '',
      emergencyContact: '',
      emergencyPhone: '',
      lastCheckup: new Date().toISOString().split('T')[0],
      status: 'active',
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
            Medical Condition
          </label>
          <input
            type="text"
            required
            value={formData.condition}
            onChange={(e) => setFormData({ ...formData, condition: e.target.value })}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Blood Type
          </label>
          <select
            required
            value={formData.bloodType}
            onChange={(e) => setFormData({ ...formData, bloodType: e.target.value })}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          >
            <option value="">Select Blood Type</option>
            {BLOOD_TYPES.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Medications
        </label>
        <input
          type="text"
          required
          value={formData.medications}
          onChange={(e) => setFormData({ ...formData, medications: e.target.value })}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Allergies
        </label>
        <input
          type="text"
          required
          value={formData.allergies}
          onChange={(e) => setFormData({ ...formData, allergies: e.target.value })}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
        />
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Emergency Contact
          </label>
          <input
            type="text"
            required
            value={formData.emergencyContact}
            onChange={(e) => setFormData({ ...formData, emergencyContact: e.target.value })}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Emergency Phone
          </label>
          <input
            type="tel"
            required
            value={formData.emergencyPhone}
            onChange={(e) => setFormData({ ...formData, emergencyPhone: e.target.value })}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Last Checkup
          </label>
          <input
            type="date"
            required
            value={formData.lastCheckup}
            onChange={(e) => setFormData({ ...formData, lastCheckup: e.target.value })}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
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