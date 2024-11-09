import { useState, FormEvent } from 'react';

interface ScheduleFormProps {
  onSubmit: (data: ScheduleFormData) => void;
  initialData?: ScheduleFormData;
}

export interface ScheduleFormData {
  id?: string;
  className: string;
  subject: string;
  teacher: string;
  day: string;
  startTime: string;
  endTime: string;
  room: string;
}

const DAYS = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
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

export default function ScheduleForm({ onSubmit, initialData }: ScheduleFormProps) {
  const [formData, setFormData] = useState<ScheduleFormData>(
    initialData || {
      className: '',
      subject: '',
      teacher: '',
      day: '',
      startTime: '',
      endTime: '',
      room: '',
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
            Class
          </label>
          <input
            type="text"
            required
            value={formData.className}
            onChange={(e) => setFormData({ ...formData, className: e.target.value })}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
        </div>
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
      </div>

      <div className="grid grid-cols-2 gap-6">
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
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Day
          </label>
          <select
            required
            value={formData.day}
            onChange={(e) => setFormData({ ...formData, day: e.target.value })}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          >
            <option value="">Select Day</option>
            {DAYS.map(day => (
              <option key={day} value={day}>{day}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Start Time
          </label>
          <input
            type="time"
            required
            value={formData.startTime}
            onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            End Time
          </label>
          <input
            type="time"
            required
            value={formData.endTime}
            onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Room
        </label>
        <input
          type="text"
          required
          value={formData.room}
          onChange={(e) => setFormData({ ...formData, room: e.target.value })}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
        />
      </div>
    </form>
  );
}