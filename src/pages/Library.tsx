import { useState } from 'react';
import { PlusCircle, BookOpen } from 'lucide-react';
import DataTable from '../components/DataTable';
import Modal from '../components/Modal';
import BookForm, { BookFormData } from '../components/BookForm';

const mockBooks = [
  {
    id: '1',
    title: 'Mathematics for Grade 10',
    author: 'Dr. Ahmed Ali',
    isbn: '978-3-16-148410-0',
    category: 'Textbook',
    quantity: 50,
    available: 45,
    location: 'Section A-1',
    status: 'available' as const,
  },
];

const columns = [
  { header: 'Title', accessor: 'title' as const },
  { header: 'Author', accessor: 'author' as const },
  { header: 'Category', accessor: 'category' as const },
  {
    header: 'Availability',
    accessor: 'available' as const,
    render: (available: number, row: any) => `${available}/${row.quantity}`,
  },
  { header: 'Location', accessor: 'location' as const },
  {
    header: 'Status',
    accessor: 'status' as const,
    render: (status: string) => (
      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
        status === 'available' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
      }`}>
        {status}
      </span>
    ),
  },
];

export default function Library() {
  const [books, setBooks] = useState(mockBooks);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState<BookFormData | null>(null);

  const handleSubmit = (data: BookFormData) => {
    if (selectedBook?.id) {
      setBooks(prev => prev.map(book => 
        book.id === selectedBook.id ? { ...data, id: book.id } : book
      ));
    } else {
      setBooks(prev => [...prev, { ...data, id: String(prev.length + 1) }]);
    }
    setIsModalOpen(false);
    setSelectedBook(null);
  };

  const handleRowClick = (book: BookFormData) => {
    setSelectedBook(book);
    setIsModalOpen(true);
  };

  return (
    <div className="p-8">
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Library</h1>
          <p className="mt-2 text-sm text-gray-600">
            Manage books and library resources
          </p>
        </div>
        <button
          onClick={() => {
            setSelectedBook(null);
            setIsModalOpen(true);
          }}
          className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
        >
          <PlusCircle className="w-5 h-5 mr-2" />
          Add Book
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center">
            <BookOpen className="w-10 h-10 text-indigo-600" />
            <div className="ml-4">
              <h3 className="text-lg font-medium text-gray-900">Total Books</h3>
              <p className="text-2xl font-semibold text-indigo-600">1,250</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center">
            <BookOpen className="w-10 h-10 text-green-600" />
            <div className="ml-4">
              <h3 className="text-lg font-medium text-gray-900">Available</h3>
              <p className="text-2xl font-semibold text-green-600">1,100</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center">
            <BookOpen className="w-10 h-10 text-yellow-600" />
            <div className="ml-4">
              <h3 className="text-lg font-medium text-gray-900">Borrowed</h3>
              <p className="text-2xl font-semibold text-yellow-600">150</p>
            </div>
          </div>
        </div>
      </div>

      <DataTable
        columns={columns}
        data={books}
        onRowClick={handleRowClick}
      />

      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedBook(null);
        }}
        title={selectedBook ? 'Edit Book' : 'Add New Book'}
      >
        <BookForm onSubmit={handleSubmit} initialData={selectedBook || undefined} />
      </Modal>
    </div>
  );
}