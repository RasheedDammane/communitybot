import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuthStore } from '../../stores/authStore';
import { 
  User as UserIcon, 
  Settings as SettingsIcon, 
  Bell, 
  Shield, 
  Moon, 
  Sun, 
  Monitor, 
  Check 
} from 'lucide-react';
import LanguageSelector from '../../components/common/LanguageSelector';

type ThemeOption = 'light' | 'dark' | 'system';

const Settings = () => {
  const { t } = useTranslation();
  const { user, updateUser } = useAuthStore();
  
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [selectedTheme, setSelectedTheme] = useState<ThemeOption>('light');
  
  // Save profile changes
  const handleProfileSave = () => {
    if (!user) return;
    
    updateUser(user.id, {
      name,
      email,
    });
    
    setShowSuccessMessage(true);
    setTimeout(() => {
      setShowSuccessMessage(false);
    }, 3000);
  };
  
  return (
    <div className="space-y-8">
      {/* Success message */}
      {showSuccessMessage && (
        <div className="bg-green-50 border-l-4 border-green-400 p-4 rounded">
          <div className="flex">
            <div className="flex-shrink-0">
              <Check className="h-5 w-5 text-green-400" />
            </div>
            <div className="ml-3">
              <p className="text-sm text-green-700">
                {t('settings.updateSuccess')}
              </p>
            </div>
          </div>
        </div>
      )}
      
      {/* Section navigation */}
      <div className="bg-white shadow-sm rounded-lg p-4 sm:p-6">
        <nav className="flex flex-wrap gap-2" aria-label="Settings sections">
          <button className="px-4 py-2 text-sm font-medium bg-blue-50 text-blue-600 rounded-md">
            <UserIcon className="inline-block h-4 w-4 mr-1" />
            {t('settings.profile')}
          </button>
          <button className="px-4 py-2 text-sm font-medium text-gray-500 hover:text-gray-700 hover:bg-gray-50 rounded-md">
            <Bell className="inline-block h-4 w-4 mr-1" />
            {t('settings.notifications')}
          </button>
          <button className="px-4 py-2 text-sm font-medium text-gray-500 hover:text-gray-700 hover:bg-gray-50 rounded-md">
            <SettingsIcon className="inline-block h-4 w-4 mr-1" />
            {t('settings.appearance')}
          </button>
          <button className="px-4 py-2 text-sm font-medium text-gray-500 hover:text-gray-700 hover:bg-gray-50 rounded-md">
            <Shield className="inline-block h-4 w-4 mr-1" />
            {t('settings.security')}
          </button>
        </nav>
      </div>
      
      {/* Profile settings */}
      <div className="bg-white shadow-sm rounded-lg overflow-hidden">
        <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
          <h3 className="text-lg font-medium leading-6 text-gray-900">
            {t('settings.profile')}
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            Update your personal information.
          </p>
        </div>
        
        <div className="px-4 py-5 sm:p-6 space-y-6">
          <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                {t('common.name')}
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                />
              </div>
            </div>

            <div className="sm:col-span-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                {t('common.email')}
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                />
              </div>
            </div>
          </div>
          
          <div className="pt-5">
            <div className="flex justify-end">
              <button
                type="button"
                className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                {t('common.cancel')}
              </button>
              <button
                type="button"
                onClick={handleProfileSave}
                className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                {t('common.save')}
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Language settings */}
      <div className="bg-white shadow-sm rounded-lg overflow-hidden">
        <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
          <h3 className="text-lg font-medium leading-6 text-gray-900">
            {t('common.language')}
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            Choose your preferred language.
          </p>
        </div>
        
        <div className="px-4 py-5 sm:p-6">
          <LanguageSelector />
        </div>
      </div>
      
      {/* Theme settings */}
      <div className="bg-white shadow-sm rounded-lg overflow-hidden">
        <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
          <h3 className="text-lg font-medium leading-6 text-gray-900">
            {t('settings.theme')}
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            Choose how the application looks.
          </p>
        </div>
        
        <div className="px-4 py-5 sm:p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button
              onClick={() => setSelectedTheme('light')}
              className={`border rounded-lg p-4 flex flex-col items-center ${
                selectedTheme === 'light' 
                  ? 'border-blue-500 bg-blue-50 ring-2 ring-blue-500 ring-opacity-50' 
                  : 'border-gray-200 hover:bg-gray-50'
              }`}
            >
              <Sun className={`h-8 w-8 ${selectedTheme === 'light' ? 'text-blue-500' : 'text-gray-400'} mb-2`} />
              <span className={`font-medium ${selectedTheme === 'light' ? 'text-blue-700' : 'text-gray-700'}`}>
                {t('settings.light')}
              </span>
            </button>
            
            <button
              onClick={() => setSelectedTheme('dark')}
              className={`border rounded-lg p-4 flex flex-col items-center ${
                selectedTheme === 'dark' 
                  ? 'border-blue-500 bg-blue-50 ring-2 ring-blue-500 ring-opacity-50' 
                  : 'border-gray-200 hover:bg-gray-50'
              }`}
            >
              <Moon className={`h-8 w-8 ${selectedTheme === 'dark' ? 'text-blue-500' : 'text-gray-400'} mb-2`} />
              <span className={`font-medium ${selectedTheme === 'dark' ? 'text-blue-700' : 'text-gray-700'}`}>
                {t('settings.dark')}
              </span>
            </button>
            
            <button
              onClick={() => setSelectedTheme('system')}
              className={`border rounded-lg p-4 flex flex-col items-center ${
                selectedTheme === 'system' 
                  ? 'border-blue-500 bg-blue-50 ring-2 ring-blue-500 ring-opacity-50' 
                  : 'border-gray-200 hover:bg-gray-50'
              }`}
            >
              <Monitor className={`h-8 w-8 ${selectedTheme === 'system' ? 'text-blue-500' : 'text-gray-400'} mb-2`} />
              <span className={`font-medium ${selectedTheme === 'system' ? 'text-blue-700' : 'text-gray-700'}`}>
                {t('settings.system')}
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;