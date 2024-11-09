import { useState } from 'react';
import { PlusCircle, Shield } from 'lucide-react';
import DataTable from '../components/DataTable';
import Modal from '../components/Modal';
import ViolationForm, { ViolationFormData } from '../components/ViolationForm';

const mockViolations = [
  {
    id: '1',
    studentName: 'Ahmed Mohammed',
    type: 'Behavioral',
    description: 'Disruptive behavior in class',
    date: '2024-03-10',
    reportedBy: 'Sarah Ahmed',
    severity: 'moderate',
    status: 'pending' as const,
    actions: 'Parent meeting scheduled',
  },
];

const columns = [
  { header: 'Student', accessor: 'studentName' as const },
  { header: 'Type', accessor: 'type' as const },
  { header: 'Date', accessor: 'date' as const },
  {
    header: 'Severity',
    accessor: 'severity' as const,
    render: (severity: string) => (
      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
        severity === 'minor' ? 'bg-green-100 text-green-800' :
        severity === 'moderate' ? 'bg-yellow-100 text-yellow-800' :
        'bg-red-100 text-red-800'
      }`}>
        {severity}
      </span>
    ),
  },
  {
    header: 'Status',
    accessor: 'status' as const,
    render: (status: string) => (
      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
        status === 'resolved' ? 'bg-green-100 text-green-800' :
        status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
        'bg-red-100 text-red-800'
      }`}>
        {status}
      </span>
    ),
  },
];

export default function Violations() {
  const [violations, setViolations] = useState(mockViolations);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedViolation, setSelectedViolation] = useState<ViolationFormData | null>(null);

  const handleSubmit = (data: ViolationFormData) => {
    if (selectedViolation?.id) {
      setViolations(prev => prev.map(violation => 
        violation.id === selectedViolation.id ? { ...data, id: violation.id } : violation
      ));
    } else {
      setViolations(prev => [...prev, { ...data, id: String(prev.length + 1) }]);
    }
    setIsModalOpen(false);
    setSelectedViolation(null);
  };

  const handleRowClick = (violation: ViolationFormData) => {
    setSelectedViolation(violation);
    setIsModalOpen(true);
  };

  return (
    <div className="p-8">
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Violations</h1>
          <p className="mt-2 text-sm text-gray-600">
            Track and manage student violations and disciplinary actions
          </p>
        </div>
        <button
          onClick={() => {
            setSelectedViolation(null);
            setIsModalOpen(true);
          }}
          className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
        >
          <PlusCircle className="w-5 h-5 mr-2" />
          Report Violation
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center">
            <Shield className="w-10 h-10 text-indigo-600" />
            <div className="ml-4">
              <h3 className="text-lg font-medium text-gray-900">Total Reports</h3>
              <p className="text-2xl font-semibold text-indigo-600">45</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center">
            <Shield className="w-10 h-10 text-green-600" />
            <div className="ml-4">
              <h3 className="text-lg font-medium text-gray-900">Resolved</h3>
              <p className="text-2xl font-semibold text-green-600">32</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center">
            <Shield className="w-10 h-10 text-yellow-600" />
            <div className="ml-4">
              <h3 className="text-lg font-medium text-gray-900">Pending</h3>
              <p className="text-2xl font-semibold text-yellow-600">13</p>
            </div>
          </div>
        </div>
      </div>

      <DataTable
        columns={columns}
        data={violations}
        onRowClick={handleRowClick}
      />

      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedViolation(null);
        }}
        title={selectedViolation ? 'Edit Violation' : 'Report New Violation'}
      >
        <ViolationForm onSubmit={handleSubmit} initialData={selectedViolation || undefined} />
      </Modal>
    </div>
  );
}