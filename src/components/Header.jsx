import React, { useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';

const Header = () => {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const scrollToSection = (sectionId) => {
    if (location.pathname !== '/') {
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
        <button
          className="flex md:hidden items-center justify-center h-10 w-10 rounded focus:outline-none"
          onClick={() => setMenuOpen((open) => !open)}
          aria-label="Open menu"
        >
          <svg
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="4" y1="6" x2="20" y2="6" />
            <line x1="4" y1="12" x2="20" y2="12" />
            <line x1="4" y1="18" x2="20" y2="18" />
          </svg>
        </button>
        <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
          <button
            onClick={() => scrollToSection('testimonials')}
            className="transition-colors hover:text-primary cursor-pointer"
          >
            Şikayətlər
          </button>
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
        <div className="flex items-center space-x-4">
          <Link to="/new-complaint" className="px-4 py-2 text-sm font-medium text-primary-foreground bg-primary rounded-md hover:bg-primary/90">
            Yeni Şikayət
          </Link>
          <Link to="/login" className="hidden md:inline-flex px-4 py-2 text-sm font-medium text-primary bg-primary/10 rounded-md hover:bg-primary/20">
            Giriş
          </Link>
        </div>
        {menuOpen && (
          <div className="absolute top-16 left-0 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border/40 shadow-md md:hidden z-50">
            <nav className="flex flex-col items-center px-4 py-2 space-y-2 text-sm font-medium">
              <button
                onClick={() => {
                  scrollToSection('testimonials');
                  setMenuOpen(false);
                }}
                className="w-full text-center transition-colors hover:text-primary cursor-pointer"
              >
                Şikayətlər
              </button>
              <button
                onClick={() => {
                  scrollToSection('categories');
                  setMenuOpen(false);
                }}
                className="w-full text-center transition-colors hover:text-primary cursor-pointer"
              >
                Kateqoriyalar
              </button>
              <NavLink
                to="/about"
                className={({ isActive }) =>
                  (isActive ? 'text-primary' : 'transition-colors hover:text-primary') + ' w-full text-center'
                }
                onClick={() => setMenuOpen(false)}
              >
                Haqqımızda
              </NavLink>
              <Link
                to="/login"
                className="w-full px-4 py-2 text-sm font-medium text-primary bg-primary/10 rounded-md hover:bg-primary/20 text-center"
                onClick={() => setMenuOpen(false)}
              >
                Giriş
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
