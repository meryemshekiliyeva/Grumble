import React, { useState, useEffect, useRef } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import UserProfileDropdown from './UserProfileDropdown';
import CompanyProfileDropdown from './CompanyProfileDropdown';
import NotificationDropdown from './NotificationDropdown';

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout, isAuthenticated } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const mobileMenuRef = useRef(null);

  const scrollToSection = (sectionId) => {
    if (location.pathname !== '/') {
      // If not on home page, navigate to home first then scroll
      window.location.href = `/#${sectionId}`;
      return;
    }

    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target)) {
        setIsMobileMenuOpen(false);
      }
    };

    if (isMobileMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }
  }, [isMobileMenuOpen]);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 max-w-5xl items-center justify-between px-4">
        <NavLink to="/" className="flex items-center space-x-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-6 w-6 text-primary"
          >
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
          </svg>
          <span className="font-bold text-lg">Grumble</span>
        </NavLink>
        <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
          <NavLink
            to="/complaints"
            className={({ isActive }) =>
              isActive ? 'text-primary' : 'transition-colors hover:text-primary'
            }
          >
            Şikayətlər
          </NavLink>
          <button
            onClick={() => scrollToSection('categories')}
            className="transition-colors hover:text-primary cursor-pointer"
          >
            Kateqoriyalar
          </button>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              isActive ? 'text-primary' : 'transition-colors hover:text-primary'
            }
          >
            Haqqımızda
          </NavLink>
        </nav>
        <div className="flex items-center space-x-3">
          {/* Desktop Navigation */}
          {isAuthenticated ? (
            <div className="hidden md:flex items-center space-x-2">
              <NotificationDropdown />
              {user?.userType === 'company' ? (
                <CompanyProfileDropdown user={user} onLogout={handleLogout} />
              ) : (
                <>
                  <Link to="/yeni-sikayetler" className="px-4 py-2 text-sm font-medium text-primary-foreground bg-primary rounded-md hover:bg-primary/90">
                    Şikayət Göndər
                  </Link>
                  <UserProfileDropdown user={user} onLogout={handleLogout} />
                </>
              )}
            </div>
          ) : (
            <>
              <Link to="/yeni-sikayetler" className="hidden sm:inline-flex px-4 py-2 text-sm font-medium text-primary-foreground bg-primary rounded-md hover:bg-primary/90">
                Şikayət Göndər
              </Link>
              <Link to="/login" className="hidden sm:inline-flex px-4 py-2 text-sm font-medium text-primary bg-primary/10 rounded-md hover:bg-primary/20">
                Giriş
              </Link>
            </>
          )}

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMobileMenu}
            className="md:hidden p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary"
            aria-label="Menu"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div ref={mobileMenuRef} className="md:hidden absolute top-16 left-0 right-0 bg-white border-b border-gray-200 shadow-lg z-50">
            <div className="px-4 py-2 space-y-1">
              {/* Mobile Navigation Links */}
              <NavLink
                to="/complaints"
                onClick={closeMobileMenu}
                className={({ isActive }) =>
                  `block px-3 py-2 rounded-md text-base font-medium ${
                    isActive ? 'text-primary bg-primary/10' : 'text-gray-700 hover:text-primary hover:bg-gray-50'
                  }`
                }
              >
                Şikayətlər
              </NavLink>
              <button
                onClick={() => {
                  scrollToSection('categories');
                  closeMobileMenu();
                }}
                className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-50"
              >
                Kateqoriyalar
              </button>
              <NavLink
                to="/about"
                onClick={closeMobileMenu}
                className={({ isActive }) =>
                  `block px-3 py-2 rounded-md text-base font-medium ${
                    isActive ? 'text-primary bg-primary/10' : 'text-gray-700 hover:text-primary hover:bg-gray-50'
                  }`
                }
              >
                Haqqımızda
              </NavLink>

              {/* Mobile Action Buttons */}
              <div className="pt-2 border-t border-gray-200">
                {isAuthenticated ? (
                  <div className="space-y-2">
                    <Link
                      to="/yeni-sikayetler"
                      onClick={closeMobileMenu}
                      className="block w-full px-3 py-2 text-center text-sm font-medium text-primary-foreground bg-primary rounded-md hover:bg-primary/90"
                    >
                      Şikayət Göndər
                    </Link>
                    {user?.userType !== 'company' && (
                      <Link
                        to="/profile"
                        onClick={closeMobileMenu}
                        className="block w-full px-3 py-2 text-center text-sm font-medium text-primary bg-primary/10 rounded-md hover:bg-primary/20"
                      >
                        Profil
                      </Link>
                    )}
                    <button
                      onClick={() => {
                        handleLogout();
                        closeMobileMenu();
                      }}
                      className="block w-full px-3 py-2 text-center text-sm font-medium text-red-600 bg-red-50 rounded-md hover:bg-red-100"
                    >
                      Çıxış
                    </button>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <Link
                      to="/yeni-sikayetler"
                      onClick={closeMobileMenu}
                      className="block w-full px-3 py-2 text-center text-sm font-medium text-primary-foreground bg-primary rounded-md hover:bg-primary/90"
                    >
                      Şikayət Göndər
                    </Link>
                    <Link
                      to="/login"
                      onClick={closeMobileMenu}
                      className="block w-full px-3 py-2 text-center text-sm font-medium text-primary bg-primary/10 rounded-md hover:bg-primary/20"
                    >
                      Giriş
                    </Link>
                    <Link
                      to="/register"
                      onClick={closeMobileMenu}
                      className="block w-full px-3 py-2 text-center text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
                    >
                      Qeydiyyat
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;