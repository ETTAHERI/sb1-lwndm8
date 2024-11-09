import { Globe } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export default function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex items-center space-x-2">
      <Globe className="w-5 h-5 text-gray-500" />
      <select
        value={language}
        onChange={(e) => setLanguage(e.target.value as 'ar' | 'fr')}
        className="border-none bg-transparent text-sm font-medium text-gray-700 focus:outline-none focus:ring-0"
      >
        <option value="ar">العربية</option>
        <option value="fr">Français</option>
      </select>
    </div>
  );
}