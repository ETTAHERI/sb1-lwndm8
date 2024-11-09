import { useState, FormEvent } from 'react';

interface TeacherFormProps {
  onSubmit: (data: TeacherFormData) => void;
  initialData?: TeacherFormData;
}

export interface TeacherFormData {
  id?: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  subjects: string[];
  qualification: string;
  dateOfBirth: string;
  joiningDate: string;
  address: string;
  status: 'active' | 'inactive';
}

const SUBJECTS = [
  'Mathematics',
  'Science',
  'English',
  'Arabic',
  'Social Studies',
  'Physical Education',
  'Art',
  'Computer Science',
  'Islamic Studies',
  'French',
];

export default function TeacherForm({ onSubmit, initialData }: TeacherFormProps) {
  const [formData, setFormData] = useState<TeacherFormData>(
    initialData || {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      subjects: [],
      qualification: '',
      dateOfBirth: '',
      joiningDate: '',
      address: '',
      status: 'active',
    }
  );

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleSubjectChange = (subject: string) => {
    setFormData((prev) => ({
      ...prev,
      subjects: prev.subjects.includes(subject)
        ? prev.subjects.filter((s) => s !== subject)
        : [...prev.subjects, subject],
    }));
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

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Subjects
        </label>
        <div className="grid grid-cols-2 gap-4">
          {SUBJECTS.map((subject) => (
            <label
              key={subject}
              className="flex items-center space-x-2 text-sm"
            >
              <input
                type="checkbox"
                checked={formData.subjects.includes(subject)}
                onChange={() => handleSubjectChange(subject)}
                className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
              />
              <span>{subject}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Qualification
          </label>
          <input
            type="text"
            required
            value={formData.qualification}
            onChange={(e) =>
              setFormData({ ...formData, qualification: e.target.value })
            }
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
            onChange={(e) =>
              setFormData({
                ...formData,
                status: e.target.value as 'active' | 'inactive',
              })
            }
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
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
            Joining Date
          </label>
          <input
            type="date"
            required
            value={formData.joiningDate}
            onChange={(e) =>
              setFormData({ ...formData, joiningDate: e.target.value })
            }
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
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