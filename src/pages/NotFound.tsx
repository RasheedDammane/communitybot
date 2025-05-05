import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuthStore } from '../stores/authStore';
import { Home, AlertTriangle } from 'lucide-react';

const NotFound = () => {
  const { t } = useTranslation();
  const { isAuthenticated } = useAuthStore();
  
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col items-center">
        <AlertTriangle className="h-20 w-20 text-red-500 mb-6" />
        <h1 className="text-4xl font-extrabold text-gray-900 mb-2">404</h1>
        <h2 className="text-2xl font-semibold text-gray-700 mb-6">Page Not Found</h2>
        <p className="text-gray-500 text-center max-w-md mb-10">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>
        <Link
          to={isAuthenticated ? "/dashboard" : "/"}
          className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <Home className="h-5 w-5 mr-2" />
          {isAuthenticated ? t('common.dashboard') : 'Go Home'}
        </Link>
      </div>
    </div>
  );
};

export default NotFound;