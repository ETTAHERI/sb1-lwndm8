import { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'ar' | 'fr';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = {
  ar: {
    // General
    dashboard: 'لوحة التحكم',
    students: 'الطلاب',
    teachers: 'المعلمون',
    parents: 'أولياء الأمور',
    transportation: 'النقل',
    schedule: 'الجدول الدراسي',
    reports: 'التقارير',
    attendance: 'الحضور',
    library: 'المكتبة',
    activities: 'الأنشطة',
    violations: 'المخالفات',
    properties: 'المرافق',
    medical: 'العيادة',
    
    // Actions
    add: 'إضافة',
    edit: 'تعديل',
    delete: 'حذف',
    save: 'حفظ',
    cancel: 'إلغاء',
    search: 'بحث',
    
    // Form Labels
    name: 'الاسم',
    type: 'النوع',
    date: 'التاريخ',
    time: 'الوقت',
    location: 'المكان',
    status: 'الحالة',
    description: 'الوصف',
    
    // Status
    active: 'نشط',
    inactive: 'غير نشط',
    pending: 'قيد الانتظار',
    completed: 'مكتمل',
    
    // Welcome Message
    welcome: 'مرحباً بك في نظام إدارة المدرسة',
  },
  fr: {
    // General
    dashboard: 'Tableau de Bord',
    students: 'Étudiants',
    teachers: 'Enseignants',
    parents: 'Parents',
    transportation: 'Transport',
    schedule: 'Emploi du Temps',
    reports: 'Rapports',
    attendance: 'Présence',
    library: 'Bibliothèque',
    activities: 'Activités',
    violations: 'Violations',
    properties: 'Propriétés',
    medical: 'Médical',
    
    // Actions
    add: 'Ajouter',
    edit: 'Modifier',
    delete: 'Supprimer',
    save: 'Enregistrer',
    cancel: 'Annuler',
    search: 'Rechercher',
    
    // Form Labels
    name: 'Nom',
    type: 'Type',
    date: 'Date',
    time: 'Heure',
    location: 'Lieu',
    status: 'Statut',
    description: 'Description',
    
    // Status
    active: 'Actif',
    inactive: 'Inactif',
    pending: 'En Attente',
    completed: 'Terminé',
    
    // Welcome Message
    welcome: 'Bienvenue au Système de Gestion Scolaire',
  }
};

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('ar');

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations.ar] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}