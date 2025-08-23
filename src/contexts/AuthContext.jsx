import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState(null);

  // Check authentication status on mount
  useEffect(() => {
    try {
      checkAuthStatus();
    } catch (error) {
      console.error('Auth initialization error:', error);
      setError(error.message);
      setIsLoading(false);
    }
  }, []);

  const checkAuthStatus = async () => {
    try {
      const token = localStorage.getItem('token');
      const savedUser = localStorage.getItem('grumble_user');
      const bankLogin = localStorage.getItem('bankLogin');

      // Check for bank/company login first
      if (bankLogin) {
        try {
          const bankData = JSON.parse(bankLogin);

          // Validate bank data
          if (!bankData.email || !bankData.name) {
            console.error('Invalid bank data:', bankData);
            localStorage.removeItem('bankLogin');
            setIsLoading(false);
            return;
          }

          const companyUser = {
            id: bankData.email,
            firstName: bankData.firstName || bankData.name?.split(' ')[0] || 'Company',
            lastName: bankData.lastName || bankData.name?.split(' ')[1] || 'User',
            email: bankData.email,
            name: bankData.name,
            companyName: bankData.name,
            phone: bankData.phone || '',
            avatar: bankData.logo,
            userType: 'company',
            category: bankData.category || 'Company'
          };
          setUser(companyUser);
          setIsAuthenticated(true);
          setIsLoading(false);
          return;
        } catch (error) {
          console.error('Error parsing bank login:', error);
          localStorage.removeItem('bankLogin');
        }
      }

      if (savedUser) {
        try {
          const userData = JSON.parse(savedUser);
          setUser(userData);
          setIsAuthenticated(true);
          setIsLoading(false);
          return;
        } catch (error) {
          console.error('Error parsing saved user:', error);
          localStorage.removeItem('grumble_user');
        }
      }

      if (!token) {
        setIsLoading(false);
        return;
      }

      const response = await fetch('/api/auth/me', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const userData = await response.json();
        setUser(userData.user);
        setIsAuthenticated(true);
        localStorage.setItem('grumble_user', JSON.stringify(userData.user));
      } else {
        // Token is invalid
        localStorage.removeItem('token');
        localStorage.removeItem('grumble_user');
        setUser(null);
        setIsAuthenticated(false);
      }
    } catch (error) {
      console.error('Auth check error:', error);
      // Clear potentially corrupted data on any error
      localStorage.removeItem('bankLogin');
      localStorage.removeItem('grumble_user');
      localStorage.removeItem('token');
      setUser(null);
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email, password) => {
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('grumble_user', JSON.stringify(data.user));
        setUser(data.user);
        setIsAuthenticated(true);
        return { success: true, user: data.user };
      } else {
        return { success: false, message: data.message };
      }
    } catch (error) {
      console.error('Login error:', error);

      // Fallback for demo purposes when backend is not available
      const mockUsers = [
        {
          email: 'test@example.com',
          password: 'Test123!',
          firstName: 'Əli',
          lastName: 'Məmmədov',
          id: '1',
          phone: '+994501234567',
          avatar: null,
          isEmailVerified: true
        },
        {
          email: 'demo@example.com',
          password: 'Demo123!',
          firstName: 'Ayşə',
          lastName: 'Həsənova',
          id: '2',
          phone: '+994557654321',
          avatar: null,
          isEmailVerified: true
        }
      ];

      const user = mockUsers.find(u => u.email === email && u.password === password);

      if (user) {
        const { password: _, ...userWithoutPassword } = user;
        localStorage.setItem('grumble_user', JSON.stringify(userWithoutPassword));
        setUser(userWithoutPassword);
        setIsAuthenticated(true);
        return { success: true, user: userWithoutPassword };
      }

      return { success: false, message: 'Email və ya şifrə yanlışdır' };
    }
  };

  const register = async (userData) => {
    try {
      const response = await fetch('/api/auth/register/user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
      });

      const data = await response.json();

      if (response.ok) {
        return { success: true, data };
      } else {
        return { success: false, message: data.message, errors: data.errors };
      }
    } catch (error) {
      console.error('Registration error:', error);

      // Fallback for demo purposes when backend is not available
      const newUser = {
        id: Date.now().toString(),
        firstName: userData.firstName,
        lastName: userData.lastName,
        email: userData.email,
        phone: userData.phone || '',
        avatar: null,
        isEmailVerified: true // Auto-verify in demo mode
      };

      // Auto-login the user in demo mode
      localStorage.setItem('grumble_user', JSON.stringify(newUser));
      setUser(newUser);
      setIsAuthenticated(true);

      // Simulate successful registration
      return {
        success: true,
        data: {
          message: 'Qeydiyyat uğurla tamamlandı! Demo rejimində avtomatik giriş edildi.',
          user: newUser,
          requiresVerification: false
        }
      };
    }
  };

  const logout = async () => {
    try {
      const token = localStorage.getItem('token');
      if (token) {
        await fetch('/api/auth/logout', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
      }
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      localStorage.removeItem('token');
      localStorage.removeItem('grumble_user');
      localStorage.removeItem('bankLogin');
      localStorage.removeItem('rememberedEmail');
      localStorage.removeItem('rememberedCompanyEmail');
      setUser(null);
      setIsAuthenticated(false);
      setIsLoading(false);
    }
  };

  const updateProfile = async (formData) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/auth/profile', {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      });

      const data = await response.json();

      if (response.ok) {
        const updatedUser = data.user;
        setUser(updatedUser);
        localStorage.setItem('grumble_user', JSON.stringify(updatedUser));
        return { success: true, user: updatedUser };
      } else {
        return { success: false, message: data.message };
      }
    } catch (error) {
      console.error('Profile update error:', error);

      // Fallback for demo mode - update user locally
      if (user) {
        const updatedUser = { ...user };

        // Extract form data for demo mode
        if (formData instanceof FormData) {
          const firstName = formData.get('firstName');
          const lastName = formData.get('lastName');
          const email = formData.get('email');
          const phone = formData.get('phone');
          const avatar = formData.get('avatar');

          if (firstName) updatedUser.firstName = firstName;
          if (lastName) updatedUser.lastName = lastName;
          if (email) updatedUser.email = email;
          if (phone) updatedUser.phone = phone;

          // Handle avatar upload in demo mode
          if (avatar && avatar instanceof File) {
            const reader = new FileReader();
            reader.onload = (e) => {
              updatedUser.avatar = e.target.result;
              setUser(updatedUser);
              localStorage.setItem('grumble_user', JSON.stringify(updatedUser));
            };
            reader.readAsDataURL(avatar);
          } else {
            setUser(updatedUser);
            localStorage.setItem('grumble_user', JSON.stringify(updatedUser));
          }

          return { success: true, user: updatedUser };
        }
      }

      return { success: false, message: 'Profil yenilənərkən xəta baş verdi' };
    }
  };

  const value = {
    user,
    isAuthenticated,
    isLoading,
    login,
    logout,
    register,
    updateProfile,
    checkAuthStatus,
    isLoading,
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
