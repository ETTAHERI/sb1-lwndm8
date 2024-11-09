import { useState } from 'react';
import { PlusCircle } from 'lucide-react';
import DataTable from '../components/DataTable';
import Modal from '../components/Modal';
import ParentForm, { ParentFormData } from '../components/ParentForm';

const mockParents = [
  {
    id: '1',
    firstName: 'Mohammed',
    lastName: 'Ali',
    email: 'mohammed.ali@example.com',
    phone: '123-456-7890',
    occupation: 'Engineer',
    address: '789 Parent St',
    numberOfChildren: 2,
    status: 'active' as const,
  },
];

const columns = [
  { header: 'First Name', accessor: 'firstName' as const },
  { header: 'Last Name', accessor: 'lastName' as const },
  { header: 'Email', accessor: 'email' as const },
  { header: 'Phone', accessor: 'phone' as const },
  { header: 'Children', accessor: 'numberOfChildren' as const },
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

export default function Parents() {
  const [parents, setParents] = useState(mockParents);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedParent, setSelectedParent] = useState<ParentFormData | null>(null);

  const handleSubmit = (data: ParentFormData) => {
    if (selectedParent?.id) {
      setParents(prev => prev.map(parent => 
        parent.id === selectedParent.id ? { ...data, id: parent.id } : parent
      ));
    } else {
      setParents(prev => [...prev, { ...data, id: String(prev.length + 1) }]);
    }
    setIsModalOpen(false);
    setSelectedParent(null);
  };

  const handleRowClick = (parent: ParentFormData) => {
    setSelectedParent(parent);
    setIsModalOpen(true);
  };

  return (
    <div className="p-8">
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Parents</h1>
          <p className="mt-2 text-sm text-gray-600">
            Manage parent information and communications
          </p>
        </div>
        <button
          onClick={() => {
            setSelectedParent(null);
            setIsModalOpen(true);
          }}
          className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
        >
          <PlusCircle className="w-5 h-5 mr-2" />
          Add Parent
        </button>
      </div>

      <DataTable
        columns={columns}
        data={parents}
        onRowClick={handleRowClick}
      />

      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedParent(null);
        }}
        title={selectedParent ? 'Edit Parent' : 'Add New Parent'}
      >
        <ParentForm onSubmit={handleSubmit} initialData={selectedParent || undefined} />
      </Modal>
    </div>
  );
}