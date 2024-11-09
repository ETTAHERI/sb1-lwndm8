import { useState } from 'react';
import { PlusCircle, Stethoscope } from 'lucide-react';
import DataTable from '../components/DataTable';
import Modal from '../components/Modal';
import MedicalForm, { MedicalFormData } from '../components/MedicalForm';

const mockMedicalRecords = [
  {
    id: '1',
    studentName: 'Omar Ahmed',
    condition: 'Asthma',
    medications: 'Ventolin',
    bloodType: 'A+',
    allergies: 'Peanuts',
    emergencyContact: 'Mohammed Ahmed',
    emergencyPhone: '123-456-7890',
    lastCheckup: '2024-02-15',
    status: 'active' as const,
  },
];

const columns = [
  { header: 'Student Name', accessor: 'studentName' as const },
  { header: 'Condition', accessor: 'condition' as const },
  { header: 'Blood Type', accessor: 'bloodType' as const },
  { header: 'Last Checkup', accessor: 'lastCheckup' as const },
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

export default function Medical() {
  const [records, setRecords] = useState(mockMedicalRecords);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<MedicalFormData | null>(null);

  const handleSubmit = (data: MedicalFormData) => {
    if (selectedRecord?.id) {
      setRecords(prev => prev.map(record => 
        record.id === selectedRecord.id ? { ...data, id: record.id } : record
      ));
    } else {
      setRecords(prev => [...prev, { ...data, id: String(prev.length + 1) }]);
    }
    setIsModalOpen(false);
    setSelectedRecord(null);
  };

  const handleRowClick = (record: MedicalFormData) => {
    setSelectedRecord(record);
    setIsModalOpen(true);
  };

  return (
    <div className="p-8">
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Medical Records</h1>
          <p className="mt-2 text-sm text-gray-600">
            Manage student health records and medical information
          </p>
        </div>
        <button
          onClick={() => {
            setSelectedRecord(null);
            setIsModalOpen(true);
          }}
          className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
        >
          <PlusCircle className="w-5 h-5 mr-2" />
          Add Record
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center">
            <Stethoscope className="w-10 h-10 text-indigo-600" />
            <div className="ml-4">
              <h3 className="text-lg font-medium text-gray-900">Active Cases</h3>
              <p className="text-2xl font-semibold text-indigo-600">12</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center">
            <Stethoscope className="w-10 h-10 text-green-600" />
            <div className="ml-4">
              <h3 className="text-lg font-medium text-gray-900">Regular Checkups</h3>
              <p className="text-2xl font-semibold text-green-600">45</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center">
            <Stethoscope className="w-10 h-10 text-yellow-600" />
            <div className="ml-4">
              <h3 className="text-lg font-medium text-gray-900">Pending Reviews</h3>
              <p className="text-2xl font-semibold text-yellow-600">8</p>
            </div>
          </div>
        </div>
      </div>

      <DataTable
        columns={columns}
        data={records}
        onRowClick={handleRowClick}
      />

      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedRecord(null);
        }}
        title={selectedRecord ? 'Edit Medical Record' : 'Add New Medical Record'}
      >
        <MedicalForm onSubmit={handleSubmit} initialData={selectedRecord || undefined} />
      </Modal>
    </div>
  );
}