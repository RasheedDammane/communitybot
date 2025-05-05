import { Suspense, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuthStore } from './stores/authStore';

// Layouts
import AuthLayout from './layouts/AuthLayout';
import DashboardLayout from './layouts/DashboardLayout';

// Pages
import Login from './pages/auth/Login';
import Signup from './pages/auth/Signup';
import Dashboard from './pages/dashboard/Dashboard';
import Bots from './pages/dashboard/Bots';
import CreateBot from './pages/dashboard/CreateBot';
import Settings from './pages/dashboard/Settings';
import Users from './pages/dashboard/Users';
import NotFound from './pages/NotFound';
import Loading from './components/common/Loading';
import LandingPage from './pages/LandingPage';

function App() {
  const { i18n } = useTranslation();
  const { isAuthenticated, user, initializeAuth } = useAuthStore();

  useEffect(() => {
    initializeAuth();
  }, [initializeAuth]);

  // Protected route component
  const ProtectedRoute = ({ children, adminOnly = false }: { children: JSX.Element, adminOnly?: boolean }) => {
    if (!isAuthenticated) {
      return <Navigate to="/login" />;
    }

    if (adminOnly && user?.role !== 'admin') {
      return <Navigate to="/dashboard" />;
    }

    return children;
  };

  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<LandingPage />} />
        
        {/* Auth routes */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={!isAuthenticated ? <Login /> : <Navigate to="/dashboard" />} />
          <Route path="/signup" element={!isAuthenticated ? <Signup /> : <Navigate to="/dashboard" />} />
        </Route>
        
        {/* Protected dashboard routes */}
        <Route element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/bots" element={<Bots />} />
          <Route path="/bots/create" element={<CreateBot />} />
          <Route path="/settings" element={<Settings />} />
          
          {/* Admin only routes */}
          <Route path="/users" element={
            <ProtectedRoute adminOnly>
              <Users />
            </ProtectedRoute>
          } />
        </Route>
        
        {/* Not found route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
}

export default App;