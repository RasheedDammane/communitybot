import { useTranslation } from 'react-i18next';
import { Check } from 'lucide-react';

interface LanguageSelectorProps {
  onSelect?: () => void;
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({ onSelect }) => {
  const { t, i18n } = useTranslation();
  
  const languages = [
    { code: 'en', name: t('languages.en') },
    { code: 'fr', name: t('languages.fr') },
    { code: 'it', name: t('languages.it') },
    { code: 'es', name: t('languages.es') },
    { code: 'ru', name: t('languages.ru') },
    { code: 'ar', name: t('languages.ar') },
    { code: 'th', name: t('languages.th') },
  ];

  const handleLanguageChange = (code: string) => {
    i18n.changeLanguage(code);
    if (onSelect) {
      onSelect();
    }
  };

  return (
    <div className="py-1">
      {languages.map((language) => (
        <button
          key={language.code}
          className={`flex items-center justify-between w-full px-4 py-2 text-sm ${
            i18n.language === language.code ? 'text-blue-600 bg-blue-50' : 'text-gray-700 hover:bg-gray-100'
          }`}
          onClick={() => handleLanguageChange(language.code)}
          dir={language.code === 'ar' ? 'rtl' : 'ltr'}
        >
          <span>{language.name}</span>
          {i18n.language === language.code && <Check className="h-4 w-4" />}
        </button>
      ))}
    </div>
  );
};

export default LanguageSelector;