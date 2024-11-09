import { Link, useLocation } from 'react-router-dom';
import { LucideIcon } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import LanguageSwitcher from './LanguageSwitcher';

interface MenuItem {
  icon: LucideIcon;
  label: string;
  path: string;
}

interface SidebarProps {
  menuItems: MenuItem[];
}

export default function Sidebar({ menuItems }: SidebarProps) {
  const location = useLocation();
  const { t } = useLanguage();

  return (
    <div className="w-64 bg-white border-r border-gray-200 p-4">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-indigo-600">MySchool</h1>
      </div>
      <div className="mb-6">
        <LanguageSwitcher />
      </div>
      <nav className="space-y-1">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg ${
                isActive
                  ? 'bg-indigo-50 text-indigo-600'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <Icon className="w-5 h-5 mr-3" />
              {t(item.label)}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}