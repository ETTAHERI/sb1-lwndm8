import { useState } from 'react';
import { PlusCircle, Download } from 'lucide-react';
import DataTable from '../components/DataTable';
import Modal from '../components/Modal';
import ReportForm, { ReportFormData } from '../components/ReportForm';

const mockReports = [
  {
    id: '1',
    title: 'End of Term Report',
    type: 'academic',
    class: '10A',
    subject: 'Mathematics',
    teacher: 'Ahmed Hassan',
    date: '2024-03-15',
    status: 'published' as const,
  },
];

const columns = [
  { header: 'Title', accessor: 'title' as const },
  { header: 'Type', accessor: 'type' as const },
  { header: 'Class', accessor: 'class' as const },
  { header: 'Subject', accessor: 'subject' as const },
  { header: 'Date', accessor: 'date' as const },
  {
    header: 'Status',
    accessor: 'status' as const,
    render: (status: string) => (
      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
        status === 'published' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
      }`}>
        {status}
      </span>
    ),
  },
  {
    header: 'Actions',
    accessor: 'id' as const,
    render: () => (
      <button className="text-indigo-600 hover:text-indigo-900">
        <Download className="w-5 h-5" />
      </button>
    ),
  },
];

export default function Reports() {
  const [reports, setReports] = useState(mockReports);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedReport, setSelectedReport] = useState<ReportFormData | null>(null);

  const handleSubmit = (data: ReportFormData) => {
    if (selectedReport?.id) {
      setReports(prev => prev.map(report => 
        report.id === selectedReport.id ? { ...data, id: report.id } : report
      ));
    } else {
      setReports(prev => [...prev, { ...data, id: String(prev.length + 1) }]);
    }
    setIsModalOpen(false);
    setSelectedReport(null);
  };

  const handleRowClick = (report: ReportFormData) => {
    setSelectedReport(report);
    setIsModalOpen(true);
  };

  return (
    <div className="p-8">
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Reports</h1>
          <p className="mt-2 text-sm text-gray-600">
            Generate and manage academic reports
          </p>
        </div>
        <button
          onClick={() => {
            setSelectedReport(null);
            setIsModalOpen(true);
          }}
          className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
        >
          <PlusCircle className="w-5 h-5 mr-2" />
          Generate Report
        </button>
      </div>

      <DataTable
        columns={columns}
        data={reports}
        onRowClick={handleRowClick}
      />

      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedReport(null);
        }}
        title={selectedReport ? 'Edit Report' : 'Generate New Report'}
      >
        <ReportForm onSubmit={handleSubmit} initialData={selectedReport || undefined} />
      </Modal>
    </div>
  );
}