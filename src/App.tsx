import { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { School, Users, BookOpen, Bus, Calendar, FileText, Clock, Library as LibraryIcon, Activity, Shield, Building2, Stethoscope } from 'lucide-react';
import { LanguageProvider } from './contexts/LanguageContext';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Students from './pages/Students';
import Teachers from './pages/Teachers';
import Parents from './pages/Parents';
import Buses from './pages/Buses';
import Schedule from './pages/Schedule';
import Reports from './pages/Reports';
import Attendance from './pages/Attendance';
import LibraryPage from './pages/Library';
import Activities from './pages/Activities';
import Violations from './pages/Violations';
import Properties from './pages/Properties';
import Medical from './pages/Medical';

const menuItems = [
  { icon: School, label: 'dashboard', path: '/' },
  { icon: Users, label: 'students', path: '/students' },
  { icon: BookOpen, label: 'teachers', path: '/teachers' },
  { icon: Users, label: 'parents', path: '/parents' },
  { icon: Bus, label: 'transportation', path: '/buses' },
  { icon: Calendar, label: 'schedule', path: '/schedule' },
  { icon: FileText, label: 'reports', path: '/reports' },
  { icon: Clock, label: 'attendance', path: '/attendance' },
  { icon: LibraryIcon, label: 'library', path: '/library' },
  { icon: Activity, label: 'activities', path: '/activities' },
  { icon: Shield, label: 'violations', path: '/violations' },
  { icon: Building2, label: 'properties', path: '/properties' },
  { icon: Stethoscope, label: 'medical', path: '/medical' },
];

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  if (!isAuthenticated) {
    return <Login onLogin={() => setIsAuthenticated(true)} />;
  }

  return (
    <LanguageProvider>
      <BrowserRouter>
        <div className="flex h-screen bg-gray-50">
          <Sidebar menuItems={menuItems} />
          <div className="flex-1 overflow-auto">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/students" element={<Students />} />
              <Route path="/teachers" element={<Teachers />} />
              <Route path="/parents" element={<Parents />} />
              <Route path="/buses" element={<Buses />} />
              <Route path="/schedule" element={<Schedule />} />
              <Route path="/reports" element={<Reports />} />
              <Route path="/attendance" element={<Attendance />} />
              <Route path="/library" element={<LibraryPage />} />
              <Route path="/activities" element={<Activities />} />
              <Route path="/violations" element={<Violations />} />
              <Route path="/properties" element={<Properties />} />
              <Route path="/medical" element={<Medical />} />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </LanguageProvider>
  );
}