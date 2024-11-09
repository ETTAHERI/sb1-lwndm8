import { useState } from 'react';
import { PlusCircle, Building2 } from 'lucide-react';
import DataTable from '../components/DataTable';
import Modal from '../components/Modal';
import PropertyForm, { PropertyFormData } from '../components/PropertyForm';

const mockProperties = [
  {
    id: '1',
    name: 'Main Building',
    type: 'Academic',
    location: 'North Campus',
    capacity: 1000,
    facilities: ['Classrooms', 'Labs', 'Library'],
    condition: 'Good',
    lastMaintenance: '2024-01-15',
    nextMaintenance: '2024-04-15',
    status: 'operational' as const,
  },
];

const columns = [
  { header: 'Name', accessor: 'name' as const },
  { header: 'Type', accessor: 'type' as const },
  { header: 'Location', accessor: 'location' as const },
  { header: 'Capacity', accessor: 'capacity' as const },
  {
    header: 'Status',
    accessor: 'status' as const,
    render: (status: string) => (
      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
        status === 'operational' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
      }`}>
        {status}
      </span>
    ),
  },
];

export default function Properties() {
  const [properties, setProperties] = useState(mockProperties);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState<PropertyFormData | null>(null);

  const handleSubmit = (data: PropertyFormData) => {
    if (selectedProperty?.id) {
      setProperties(prev => prev.map(property => 
        property.id === selectedProperty.id ? { ...data, id: property.id } : property
      ));
    } else {
      setProperties(prev => [...prev, { ...data, id: String(prev.length + 1) }]);
    }
    setIsModalOpen(false);
    setSelectedProperty(null);
  };

  const handleRowClick = (property: PropertyFormData) => {
    setSelectedProperty(property);
    setIsModalOpen(true);
  };

  return (
    <div className="p-8">
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Properties</h1>
          <p className="mt-2 text-sm text-gray-600">
            Manage school buildings and facilities
          </p>
        </div>
        <button
          onClick={() => {
            setSelectedProperty(null);
            setIsModalOpen(true);
          }}
          className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
        >
          <PlusCircle className="w-5 h-5 mr-2" />
          Add Property
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center">
            <Building2 className="w-10 h-10 text-indigo-600" />
            <div className="ml-4">
              <h3 className="text-lg font-medium text-gray-900">Total Properties</h3>
              <p className="text-2xl font-semibold text-indigo-600">15</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center">
            <Building2 className="w-10 h-10 text-green-600" />
            <div className="ml-4">
              <h3 className="text-lg font-medium text-gray-900">Operational</h3>
              <p className="text-2xl font-semibold text-green-600">13</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center">
            <Building2 className="w-10 h-10 text-yellow-600" />
            <div className="ml-4">
              <h3 className="text-lg font-medium text-gray-900">Under Maintenance</h3>
              <p className="text-2xl font-semibold text-yellow-600">2</p>
            </div>
          </div>
        </div>
      </div>

      <DataTable
        columns={columns}
        data={properties}
        onRowClick={handleRowClick}
      />

      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedProperty(null);
        }}
        title={selectedProperty ? 'Edit Property' : 'Add New Property'}
      >
        <PropertyForm onSubmit={handleSubmit} initialData={selectedProperty || undefined} />
      </Modal>
    </div>
  );
}