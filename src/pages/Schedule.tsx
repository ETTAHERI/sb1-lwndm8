import { useState } from 'react';
import { PlusCircle } from 'lucide-react';
import DataTable from '../components/DataTable';
import Modal from '../components/Modal';
import ScheduleForm, { ScheduleFormData } from '../components/ScheduleForm';

const mockSchedules = [
  {
    id: '1',
    className: '10A',
    subject: 'Mathematics',
    teacher: 'Ahmed Hassan',
    day: 'Monday',
    startTime: '08:00',
    endTime: '09:30',
    room: 'Room 101',
  },
];

const columns = [
  { header: 'Class', accessor: 'className' as const },
  { header: 'Subject', accessor: 'subject' as const },
  { header: 'Teacher', accessor: 'teacher' as const },
  { header: 'Day', accessor: 'day' as const },
  { header: 'Time', accessor: 'startTime' as const,
    render: (time: string, row: any) => `${time} - ${row.endTime}` },
  { header: 'Room', accessor: 'room' as const },
];

export default function Schedule() {
  const [schedules, setSchedules] = useState(mockSchedules);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSchedule, setSelectedSchedule] = useState<ScheduleFormData | null>(null);

  const handleSubmit = (data: ScheduleFormData) => {
    if (selectedSchedule?.id) {
      setSchedules(prev => prev.map(schedule => 
        schedule.id === selectedSchedule.id ? { ...data, id: schedule.id } : schedule
      ));
    } else {
      setSchedules(prev => [...prev, { ...data, id: String(prev.length + 1) }]);
    }
    setIsModalOpen(false);
    setSelectedSchedule(null);
  };

  const handleRowClick = (schedule: ScheduleFormData) => {
    setSelectedSchedule(schedule);
    setIsModalOpen(true);
  };

  return (
    <div className="p-8">
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Class Schedule</h1>
          <p className="mt-2 text-sm text-gray-600">
            Manage class schedules and timetables
          </p>
        </div>
        <button
          onClick={() => {
            setSelectedSchedule(null);
            setIsModalOpen(true);
          }}
          className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
        >
          <PlusCircle className="w-5 h-5 mr-2" />
          Add Schedule
        </button>
      </div>

      <DataTable
        columns={columns}
        data={schedules}
        onRowClick={handleRowClick}
      />

      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedSchedule(null);
        }}
        title={selectedSchedule ? 'Edit Schedule' : 'Add New Schedule'}
      >
        <ScheduleForm onSubmit={handleSubmit} initialData={selectedSchedule || undefined} />
      </Modal>
    </div>
  );
}