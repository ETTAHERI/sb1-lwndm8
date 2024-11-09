import { useState } from 'react';
import { PlusCircle } from 'lucide-react';
import DataTable from '../components/DataTable';
import Modal from '../components/Modal';
import TeacherForm, { TeacherFormData } from '../components/TeacherForm';

// Mock data - replace with actual API calls
const mockTeachers = [
  {
    id: '1',
    firstName: 'Ahmed',
    lastName: 'Hassan',
    email: 'ahmed.hassan@school.com',
    phone: '123-456-7890',
    subjects: ['Mathematics', 'Physics'],
    qualification: 'Master in Education',
    dateOfBirth: '1985-05-15',
    joiningDate: '2020-09-01',
    address: '456 Teacher St',
    status: 'active' as const,
  },
  // Add more mock data as needed
];

const columns = [
  { header: 'First Name', accessor: 'firstName' as const },
  { header: 'Last Name', accessor: 'lastName' as const },
  { header: 'Email', accessor: 'email' as const },
  {
    header: 'Subjects',
    accessor: 'subjects' as const,
    render: (subjects: string[]) => subjects.join(', '),
  },
  {
    header: 'Status',
    accessor: 'status' as const,
    render: (status: string) => (
      <span
        className={`px-2 py-1 text-xs font-medium rounded-full ${
          status === 'active'
            ? 'bg-green-100 text-green-800'
            : 'bg-red-100 text-red-800'
        }`}
      >
        {status}
      </span>
    ),
  },
];

export default function Teachers() {
  const [teachers, setTeachers] = useState(mockTeachers);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTeacher, setSelectedTeacher] = useState<TeacherFormData | null>(
    null
  );

  const handleSubmit = (data: TeacherFormData) => {
    if (selectedTeacher?.id) {
      // Update existing teacher
      setTeachers((prev) =>
        prev.map((teacher) =>
          teacher.id === selectedTeacher.id ? { ...data, id: teacher.id } : teacher
        )
      );
    } else {
      // Add new teacher
      setTeachers((prev) => [...prev, { ...data, id: String(prev.length + 1) }]);
    }
    setIsModalOpen(false);
    setSelectedTeacher(null);
  };

  const handleRowClick = (teacher: TeacherFormData) => {
    setSelectedTeacher(teacher);
    setIsModalOpen(true);
  };

  return (
    <div className="p-8">
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Teachers</h1>
          <p className="mt-2 text-sm text-gray-600">
            Manage teacher information and assignments
          </p>
        </div>
        <button
          onClick={() => {
            setSelectedTeacher(null);
            setIsModalOpen(true);
          }}
          className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
        >
          <PlusCircle className="w-5 h-5 mr-2" />
          Add Teacher
        </button>
      </div>

      <DataTable
        columns={columns}
        data={teachers}
        onRowClick={handleRowClick}
      />

      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedTeacher(null);
        }}
        title={selectedTeacher ? 'Edit Teacher' : 'Add New Teacher'}
      >
        <TeacherForm onSubmit={handleSubmit} initialData={selectedTeacher || undefined} />
      </Modal>
    </div>
  );
}