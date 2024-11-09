import { useState } from 'react';
import { PlusCircle } from 'lucide-react';
import DataTable from '../components/DataTable';
import Modal from '../components/Modal';
import BusForm, { BusFormData } from '../components/BusForm';

const mockBuses = [
  {
    id: '1',
    busNumber: 'B001',
    driverName: 'Ahmed Hassan',
    driverPhone: '123-456-7890',
    capacity: 40,
    route: 'North Route',
    departureTime: '07:30',
    returnTime: '14:30',
    status: 'active' as const,
  },
];

const columns = [
  { header: 'Bus Number', accessor: 'busNumber' as const },
  { header: 'Driver', accessor: 'driverName' as const },
  { header: 'Route', accessor: 'route' as const },
  { header: 'Departure', accessor: 'departureTime' as const },
  { header: 'Return', accessor: 'returnTime' as const },
  {
    header: 'Status',
    accessor: 'status' as const,
    render: (status: string) => (
      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
        status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
      }`}>
        {status}
      </span>
    ),
  },
];

export default function Buses() {
  const [buses, setBuses] = useState(mockBuses);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBus, setSelectedBus] = useState<BusFormData | null>(null);

  const handleSubmit = (data: BusFormData) => {
    if (selectedBus?.id) {
      setBuses(prev => prev.map(bus => 
        bus.id === selectedBus.id ? { ...data, id: bus.id } : bus
      ));
    } else {
      setBuses(prev => [...prev, { ...data, id: String(prev.length + 1) }]);
    }
    setIsModalOpen(false);
    setSelectedBus(null);
  };

  const handleRowClick = (bus: BusFormData) => {
    setSelectedBus(bus);
    setIsModalOpen(true);
  };

  return (
    <div className="p-8">
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Transportation</h1>
          <p className="mt-2 text-sm text-gray-600">
            Manage school buses and transportation routes
          </p>
        </div>
        <button
          onClick={() => {
            setSelectedBus(null);
            setIsModalOpen(true);
          }}
          className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
        >
          <PlusCircle className="w-5 h-5 mr-2" />
          Add Bus
        </button>
      </div>

      <DataTable
        columns={columns}
        data={buses}
        onRowClick={handleRowClick}
      />

      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedBus(null);
        }}
        title={selectedBus ? 'Edit Bus' : 'Add New Bus'}
      >
        <BusForm onSubmit={handleSubmit} initialData={selectedBus || undefined} />
      </Modal>
    </div>
  );
}