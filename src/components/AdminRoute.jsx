import React, { useState, useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const AdminRoute = ({ children }) => {
  const { user, isAuthenticated, isLoading } = useAuth();
  const [isAdmin, setIsAdmin] = useState(false);
  const [checkingAdmin, setCheckingAdmin] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const checkAdminStatus = () => {
      // Check if user is authenticated and has admin role
      if (isAuthenticated && user) {
        // For demo purposes, check if user email is admin email
        // In production, this should check user.role === 'admin'
        const adminEmails = ['admin@grumble.az', 'admin@example.com'];
        const userIsAdmin = adminEmails.includes(user.email) || user.role === 'admin';
        setIsAdmin(userIsAdmin);
      } else {
        setIsAdmin(false);
      }
      setCheckingAdmin(false);
    };

    if (!isLoading) {
      checkAdminStatus();
    }
  }, [isAuthenticated, user, isLoading]);

  // Show loading while checking authentication and admin status
  if (isLoading || checkingAdmin) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Yetki yoxlanılır...</p>
        </div>
      </div>
    );
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Show access denied if not admin
  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-6">
          <div className="text-red-500 text-6xl mb-4">🚫</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Giriş Qadağandır</h1>
          <p className="text-gray-600 mb-6">
            Bu səhifəyə giriş üçün admin icazəniz yoxdur.
          </p>
          <div className="space-y-3">
            <button
              onClick={() => window.history.back()}
              className="w-full px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
            >
              Geri Qayıt
            </button>
            <a
              href="/"
              className="block w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-center"
            >
              Ana Səhifə
            </a>
          </div>
        </div>
      </div>
    );
  }

  // Render admin content if user is admin
  return children;
};

export default AdminRoute;
