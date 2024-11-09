import { useState } from 'react';
import { PlusCircle } from 'lucide-react';
import DataTable from '../components/DataTable';
import Modal from '../components/Modal';
import ActivityForm, { ActivityFormData } from '../components/ActivityForm';

const mockActivities = [
  {
    id: '1',
    name: 'Science Fair',
    type: 'academic',
    date: '2024-04-15',
    time: '09:00',
    location: 'School Hall',
    coordinator: 'Dr. Sarah Ahmed',
    participants: 150,
    status: 'upcoming' as const,
  },
];

const columns = [
  { header: 'Activity Name', accessor: 'name' as const },
  { header: 'Type', accessor: 'type' as const },
  { header: 'Date', accessor: 'date' as const },
  { header: 'Time', accessor: 'time' as const },
  { header: 'Location', accessor: 'location' as const },
  {
    header: 'Status',
    accessor: 'status' as const,
    render: (status: string) => (
      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
        status === 'upcoming'
          ? 'bg-yellow-100 text-yellow-800'
          : status === 'ongoing'
          ? 'bg-green-100 text-green-800'
          : 'bg-gray-100 text-gray-800'
      }`}>
        {status}
      </span>
    ),
  },
];

export default function Activities() {
  const [activities, setActivities] = useState(mockActivities);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState<ActivityFormData | null>(null);

  const handleSubmit = (data: ActivityFormData) => {
    if (selectedActivity?.id) {
      setActivities(prev => prev.map(activity => 
        activity.id === selectedActivity.id ? { ...data, id: activity.id } : activity
      ));
    } else {
      setActivities(prev => [...prev, { ...data, id: String(prev.length + 1) }]);
    }
    setIsModalOpen(false);
    setSelectedActivity(null);
  };

  const handleRowClick = (activity: ActivityFormData) => {
    setSelectedActivity(activity);
    setIsModalOpen(true);
  };

  return (
    <div className="p-8">
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Activities</h1>
          <p className="mt-2 text-sm text-gray-600">
            Manage school activities and events
          </p>
        </div>
        <button
          onClick={() => {
            setSelectedActivity(null);
            setIsModalOpen(true);
          }}
          className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
        >
          <PlusCircle className="w-5 h-5 mr-2" />
          Add Activity
        </button>
      </div>

      <DataTable
        columns={columns}
        data={activities}
        onRowClick={handleRowClick}
      />

      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedActivity(null);
        }}
        title={selectedActivity ? 'Edit Activity' : 'Add New Activity'}
      >
        <ActivityForm onSubmit={handleSubmit} initialData={selectedActivity || undefined} />
      </Modal>
    </div>
  );
}