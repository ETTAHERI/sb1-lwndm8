import { useState, FormEvent } from 'react';

interface StudentFormProps {
  onSubmit: (data: StudentFormData) => void;
  initialData?: StudentFormData;
}

export interface StudentFormData {
  id?: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  gender: string;
  grade: string;
  section: string;
  parentName: string;
  parentEmail: string;
  parentPhone: string;
  address: string;
}

export default function StudentForm({ onSubmit, initialData }: StudentFormProps) {
  const [formData, setFormData] = useState<StudentFormData>(
    initialData || {
      firstName: '',
      lastName: '',
      dateOfBirth: '',
      gender: '',
      grade: '',
      section: '',
      parentName: '',
      parentEmail: '',
      parentPhone: '',
      address: '',
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
            onChange={(e) =>
              setFormData({ ...formData, firstName: e.target.value })
            }
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
            onChange={(e) =>
              setFormData({ ...formData, lastName: e.target.value })
            }
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Date of Birth
          </label>
          <input
            type="date"
            required
            value={formData.dateOfBirth}
            onChange={(e) =>
              setFormData({ ...formData, dateOfBirth: e.target.value })
            }
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Gender
          </label>
          <select
            required
            value={formData.gender}
            onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Grade
          </label>
          <input
            type="text"
            required
            value={formData.grade}
            onChange={(e) => setFormData({ ...formData, grade: e.target.value })}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Section
          </label>
          <input
            type="text"
            required
            value={formData.section}
            onChange={(e) =>
              setFormData({ ...formData, section: e.target.value })
            }
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
        </div>
      </div>

      <div>
        <h4 className="text-sm font-medium text-gray-900 mb-4">
          Parent Information
        </h4>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Parent Name
            </label>
            <input
              type="text"
              required
              value={formData.parentName}
              onChange={(e) =>
                setFormData({ ...formData, parentName: e.target.value })
              }
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Parent Email
            </label>
            <input
              type="email"
              required
              value={formData.parentEmail}
              onChange={(e) =>
                setFormData({ ...formData, parentEmail: e.target.value })
              }
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Parent Phone
            </label>
            <input
              type="tel"
              required
              value={formData.parentPhone}
              onChange={(e) =>
                setFormData({ ...formData, parentPhone: e.target.value })
              }
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            />
          </div>
        </div>
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