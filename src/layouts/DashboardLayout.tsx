import { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Home, MessageSquare, Users, Settings, Menu, X, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../stores/authStore';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';

const DashboardLayout = () => {
  const { t } = useTranslation();
  const { user } = useAuthStore();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  // Close sidebar on route change on mobile
  useEffect(() => {
    setSidebarOpen(false);
  }, [location.pathname]);

  // Get page title based on current path
  const getPageTitle = () => {
    const path = location.pathname;
    if (path === '/dashboard') return t('common.dashboard');
    if (path === '/bots') return t('common.bots');
    if (path.startsWith('/bots/create')) return t('common.createBot');
    if (path === '/users') return t('common.users');
    if (path === '/settings') return t('common.settings');
    return '';
  };

  const renderBreadcrumbs = () => {
    const path = location.pathname;
    const segments = path.split('/').filter(Boolean);
    
    return (
      <nav className="flex" aria-label="Breadcrumb">
        <ol className="inline-flex items-center space-x-1 md:space-x-3">
          <li className="inline-flex items-center">
            <Link to="/dashboard" className="text-sm font-medium text-gray-700 hover:text-blue-600">
              {t('common.dashboard')}
            </Link>
          </li>
          
          {segments.length > 1 && segments.map((segment, index) => {
            // Skip the first segment (dashboard) as it's already included
            if (index === 0) return null;
            
            const href = `/${segments.slice(0, index + 1).join('/')}`;
            const isLast = index === segments.length - 1;
            
            return (
              <li key={segment}>
                <div className="flex items-center">
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                  <Link 
                    to={href}
                    className={`ml-1 text-sm font-medium ${
                      isLast ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'
                    }`}
                    aria-current={isLast ? 'page' : undefined}
                  >
                    {t(`common.${segment}`)}
                  </Link>
                </div>
              </li>
            );
          })}
        </ol>
      </nav>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="flex">
        {/* Mobile sidebar toggle */}
        <div className="md:hidden fixed bottom-4 right-4 z-30">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-3 rounded-full bg-blue-600 text-white shadow-lg hover:bg-blue-700 focus:outline-none"
          >
            {sidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
        
        {/* Sidebar for mobile */}
        <div className={`md:hidden fixed inset-y-0 left-0 z-20 w-64 bg-white shadow-lg transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out`}>
          <div className="pt-5 pb-4">
            <div className="flex items-center px-4">
              <MessageSquare className="h-8 w-8 text-blue-600" />
              <span className="ml-2 text-xl font-semibold text-gray-900">OuiBooking</span>
            </div>
            {renderSidebarContent()}
          </div>
        </div>
        
        {/* Sidebar for desktop */}
        <div className="hidden md:flex md:flex-shrink-0">
          <div className="w-64 flex flex-col">
            <div className="flex-1 flex flex-col min-h-0 bg-white border-r border-gray-200">
              <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
                <div className="flex items-center px-4">
                  <MessageSquare className="h-8 w-8 text-blue-600" />
                  <span className="ml-2 text-xl font-semibold text-gray-900">OuiBooking</span>
                </div>
                {renderSidebarContent()}
              </div>
            </div>
          </div>
        </div>
        
        {/* Main content */}
        <div className="flex-1 flex flex-col">
          <main className="flex-1 pb-8">
            <div className="mt-8 px-4 sm:px-6 lg:px-8">
              {/* Page header */}
              <div className="mb-6">
                {renderBreadcrumbs()}
                <h1 className="mt-2 text-2xl font-bold text-gray-900">{getPageTitle()}</h1>
              </div>
              
              {/* Page content */}
              <Outlet />
            </div>
          </main>
          
          <Footer />
        </div>
      </div>
    </div>
  );
  
  function renderSidebarContent() {
    return (
      <nav className="mt-5 flex-1 px-2 space-y-1" aria-label="Sidebar">
        <Link
          to="/dashboard"
          className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
            location.pathname === '/dashboard'
              ? 'bg-blue-50 text-blue-600'
              : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
          }`}
        >
          <Home className={`mr-3 h-5 w-5 ${
            location.pathname === '/dashboard' ? 'text-blue-600' : 'text-gray-400 group-hover:text-gray-500'
          }`} />
          {t('common.dashboard')}
        </Link>
        
        <Link
          to="/bots"
          className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
            location.pathname.startsWith('/bots')
              ? 'bg-blue-50 text-blue-600'
              : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
          }`}
        >
          <MessageSquare className={`mr-3 h-5 w-5 ${
            location.pathname.startsWith('/bots') ? 'text-blue-600' : 'text-gray-400 group-hover:text-gray-500'
          }`} />
          {t('common.bots')}
        </Link>
        
        {user?.role === 'admin' && (
          <Link
            to="/users"
            className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
              location.pathname === '/users'
                ? 'bg-blue-50 text-blue-600'
                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
            }`}
          >
            <Users className={`mr-3 h-5 w-5 ${
              location.pathname === '/users' ? 'text-blue-600' : 'text-gray-400 group-hover:text-gray-500'
            }`} />
            {t('common.users')}
          </Link>
        )}
        
        <Link
          to="/settings"
          className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
            location.pathname === '/settings'
              ? 'bg-blue-50 text-blue-600'
              : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
          }`}
        >
          <Settings className={`mr-3 h-5 w-5 ${
            location.pathname === '/settings' ? 'text-blue-600' : 'text-gray-400 group-hover:text-gray-500'
          }`} />
          {t('common.settings')}
        </Link>
      </nav>
    );
  }
};

export default DashboardLayout;