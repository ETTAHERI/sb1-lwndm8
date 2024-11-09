import { useState } from 'react';
import { Calendar, Clock } from 'lucide-react';
import DataTable from '../components/DataTable';

const mockAttendance = [
  {
    id: '1',
    studentName: 'Omar Ahmed',
    class: '10A',
    date: '2024-03-15',
    status: 'present',
    checkIn: '07:45',
    checkOut: '14:30',
  },
  {
    id: '2',
    studentName: 'Sara Mohammed',
    class: '10A',
    date: '2024-03-15',
    status: 'absent',
    checkIn: '-',
    checkOut: '-',
  },
];

const columns = [
  { header: 'Student Name', accessor: 'studentName' as const },
  { header: 'Class', accessor: 'class' as const },
  { header: 'Date', accessor: 'date' as const },
  {
    header: 'Status',
    accessor: 'status' as const,
    render: (status: string) => (
      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
        status === 'present' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
      }`}>
        {status}
      </span>
    ),
  },
  { header: 'Check In', accessor: 'checkIn' as const },
  { header: 'Check Out', accessor: 'checkOut' as const },
];

export default function Attendance() {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [selectedClass, setSelectedClass] = useState('10A');

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Attendance</h1>
        <p className="mt-2 text-sm text-gray-600">
          Track student attendance and check-in times
        </p>
      </div>

      <div className="mb-6 grid grid-cols-2 gap-4">
        <div className="flex items-center space-x-4 bg-white p-4 rounded-lg shadow-sm">
          <Calendar className="w-5 h-5 text-gray-400" />
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="border-none focus:ring-0"
          />
        </div>
        <div className="flex items-center space-x-4 bg-white p-4 rounded-lg shadow-sm">
          <select
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
            className="w-full border-none focus:ring-0"
          >
            <option value="10A">Class 10A</option>
            <option value="10B">Class 10B</option>
            <option value="11A">Class 11A</option>
            <option value="11B">Class 11B</option>
          </select>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-medium text-gray-900">Attendance Record</h2>
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <Clock className="w-4 h-4" />
              <span>Last updated: {new Date().toLocaleTimeString()}</span>
            </div>
          </div>
        </div>
        <DataTable
          columns={columns}
          data={mockAttendance}
        />
      </div>
    </div>
  );
}