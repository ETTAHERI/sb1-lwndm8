import { useState, FormEvent } from 'react';

interface ReportFormProps {
  onSubmit: (data: ReportFormData) => void;
  initialData?: ReportFormData;
}

export interface ReportFormData {
  id?: string;
  title: string;
  type: 'academic' | 'behavioral' | 'attendance';
  class: string;
  subject: string;
  teacher: string;
  date: string;
  status: 'draft' | 'published';
  description?: string;
}

const REPORT_TYPES = [
  { value: 'academic', label: 'Academic Report' },
  { value: 'behavioral', label: 'Behavioral Report' },
  { value: 'attendance', label: 'Attendance Report' },
];

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

export default function ReportForm({ onSubmit, initialData }: ReportFormProps) {
  const [formData, setFormData] = useState<ReportFormData>(
    initialData || {
      title: '',
      type: 'academic',
      class: '',
      subject: '',
      teacher: '',
      date: new Date().toISOString().split('T')[0],
      status: 'draft',
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
          Report Title
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
            Report Type
          </label>
          <select
            required
            value={formData.type}
            onChange={(e) => setFormData({ ...formData, type: e.target.value as ReportFormData['type'] })}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          >
            {REPORT_TYPES.map(type => (
              <option key={type.value} value={type.value}>{type.label}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Class
          </label>
          <input
            type="text"
            required
            value={formData.class}
            onChange={(e) => setFormData({ ...formData, class: e.target.value })}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Subject
          </label>
          <select
            required
            value={formData.subject}
            onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          >
            <option value="">Select Subject</option>
            {SUBJECTS.map(subject => (
              <option key={subject} value={subject}>{subject}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Teacher
          </label>
          <input
            type="text"
            required
            value={formData.teacher}
            onChange={(e) => setFormData({ ...formData, teacher: e.target.value })}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
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
            Status
          </label>
          <select
            required
            value={formData.status}
            onChange={(e) => setFormData({ ...formData, status: e.target.value as 'draft' | 'published' })}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          >
            <option value="draft">Draft</option>
            <option value="published">Published</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Description
        </label>
        <textarea
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          rows={4}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
        />
      </div>
    </form>
  );
}