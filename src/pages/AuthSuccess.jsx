import React, { useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const AuthSuccess = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { setUser, setIsAuthenticated } = useAuth();

  useEffect(() => {
    const token = searchParams.get('token');
    
    if (token) {
      // Store the token
      localStorage.setItem('token', token);
      
      // Fetch user data with the token
      fetch('/api/auth/me', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          localStorage.setItem('grumble_user', JSON.stringify(data.user));
          setUser(data.user);
          setIsAuthenticated(true);
          navigate('/');
        } else {
          navigate('/login?error=oauth_failed');
        }
      })
      .catch(error => {
        console.error('OAuth success error:', error);
        navigate('/login?error=oauth_failed');
      });
    } else {
      navigate('/login?error=no_token');
    }
  }, [searchParams, navigate, setUser, setIsAuthenticated]);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Giriş tamamlanır...</p>
      </div>
    </div>
  );
};

export default AuthSuccess;
