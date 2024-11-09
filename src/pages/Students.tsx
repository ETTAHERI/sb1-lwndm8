import { useState } from 'react';
import { PlusCircle } from 'lucide-react';
import DataTable from '../components/DataTable';
import Modal from '../components/Modal';
import StudentForm, { StudentFormData } from '../components/StudentForm';

// Mock data - replace with actual API calls
const mockStudents = [
  {
    id: '1',
    firstName: 'John',
    lastName: 'Doe',
    grade: '10',
    section: 'A',
    parentName: 'Jane Doe',
    parentEmail: 'jane@example.com',
    parentPhone: '123-456-7890',
    dateOfBirth: '2008-05-15',
    gender: 'male',
    address: '123 School St',
  },
  // Add more mock data as needed
];

const columns = [
  { header: 'First Name', accessor: 'firstName' as const },
  { header: 'Last Name', accessor: 'lastName' as const },
  { header: 'Grade', accessor: 'grade' as const },
  { header: 'Section', accessor: 'section' as const },
  { header: 'Parent Name', accessor: 'parentName' as const },
  { header: 'Parent Email', accessor: 'parentEmail' as const },
];

export default function Students() {
  const [students, setStudents] = useState(mockStudents);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<StudentFormData | null>(
    null
  );

  const handleSubmit = (data: StudentFormData) => {
    if (selectedStudent?.id) {
      // Update existing student
      setStudents((prev) =>
        prev.map((student) =>
          student.id === selectedStudent.id ? { ...data, id: student.id } : student
        )
      );
    } else {
      // Add new student
      setStudents((prev) => [...prev, { ...data, id: String(prev.length + 1) }]);
    }
    setIsModalOpen(false);
    setSelectedStudent(null);
  };

  const handleRowClick = (student: StudentFormData) => {
    setSelectedStudent(student);
    setIsModalOpen(true);
  };

  return (
    <div className="p-8">
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Students</h1>
          <p className="mt-2 text-sm text-gray-600">
            Manage student information and records
          </p>
        </div>
        <button
          onClick={() => {
            setSelectedStudent(null);
            setIsModalOpen(true);
          }}
          className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
        >
          <PlusCircle className="w-5 h-5 mr-2" />
          Add Student
        </button>
      </div>

      <DataTable
        columns={columns}
        data={students}
        onRowClick={handleRowClick}
      />

      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedStudent(null);
        }}
        title={selectedStudent ? 'Edit Student' : 'Add New Student'}
      >
        <StudentForm onSubmit={handleSubmit} initialData={selectedStudent || undefined} />
      </Modal>
    </div>
  );
}