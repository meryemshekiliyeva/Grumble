import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="w-full bg-slate-700 text-white">
      <div className="container mx-auto max-w-6xl px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Grumble Section */}
          <div className="lg:col-span-1">
            <h3 className="text-xl font-bold mb-4">Grumble</h3>
            <p className="text-sm text-gray-300 mb-4">
              Şirkətlərlə bağlı problemlərinizi paylaşın və həllini tapın.
            </p>
            <p className="text-sm text-gray-300 mb-6">
              Milyonlarla istifadəçi təcrübəsindən faydalanın.
            </p>

            {/* Social Media Icons */}
            <div className="flex space-x-4">
              <a href="#" className="w-8 h-8 bg-gray-600 rounded flex items-center justify-center hover:bg-gray-500 transition-colors">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a href="#" className="w-8 h-8 bg-gray-600 rounded flex items-center justify-center hover:bg-gray-500 transition-colors">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a href="#" className="w-8 h-8 bg-gray-600 rounded flex items-center justify-center hover:bg-gray-500 transition-colors">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                </svg>
              </a>
              <a href="#" className="w-8 h-8 bg-gray-600 rounded flex items-center justify-center hover:bg-gray-500 transition-colors">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Şirkət Section */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Şirkət</h4>
            <ul className="space-y-2">
              <li><Link to="/about" className="text-sm text-gray-300 hover:text-white transition-colors">Biz kimik</Link></li>
              <li><Link to="/services" className="text-sm text-gray-300 hover:text-white transition-colors">Xidmətlərimiz</Link></li>
              <li><span className="text-sm bg-red-500 text-white px-2 py-1 rounded text-xs">YENİ</span></li>
              <li><Link to="/customers" className="text-sm text-gray-300 hover:text-white transition-colors">Müştərilərimiz</Link></li>
              <li><Link to="/blog" className="text-sm text-gray-300 hover:text-white transition-colors">Bloq</Link></li>
            </ul>
          </div>

          {/* Xidmətlərimiz Section */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Xidmətlərimiz</h4>
            <ul className="space-y-2">
              <li><Link to="/complaint" className="text-sm text-gray-300 hover:text-white transition-colors">Şikayət bildirimi</Link></li>
              <li><Link to="/monitoring" className="text-sm text-gray-300 hover:text-white transition-colors">Şirkət monitorinqi</Link></li>
              <li><Link to="/strategy" className="text-sm text-gray-300 hover:text-white transition-colors">Həll strategiyası</Link></li>
              <li><Link to="/support" className="text-sm text-gray-300 hover:text-white transition-colors">Müştəri dəstəyi</Link></li>
            </ul>
          </div>

          {/* Kömək Section */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Kömək lazımdır?</h4>
            <div className="space-y-4">
              <div>
                <p className="text-sm font-medium mb-1">Birbaşa zəng edin?</p>
                <p className="text-lg font-bold text-green-400">(012) 567 89 01</p>
              </div>
              <div>
                <p className="text-sm font-medium mb-1">Dəstək lazımdır?</p>
                <p className="text-sm text-green-400">help@grumble.az</p>
              </div>
            </div>
          </div>

          {/* Newsletter Section */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Xəbər bülletenimizə abunə olun</h4>
            <p className="text-sm text-gray-300 mb-4">
              Ən son xəbərləri əldə etmək üçün xəbər bülletenimizə abunə olun.
            </p>
            <div className="flex">
              <input
                type="email"
                placeholder="E-mail ünvanınızı daxil edin"
                className="flex-1 px-3 py-2 bg-gray-600 text-white placeholder-gray-400 rounded-l border-0 focus:outline-none focus:ring-2 focus:ring-red-500"
              />
              <button className="px-4 py-2 bg-red-500 text-white rounded-r hover:bg-red-600 transition-colors">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-600 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-400 mb-4 md:mb-0">
              © 2025 Grumble tərəfindən hazırlanmışdır
            </p>
            <div className="flex space-x-6">
              <Link to="/privacy" className="text-sm text-gray-400 hover:text-white transition-colors">
                Məxfilik siyasəti
              </Link>
              <Link to="/terms" className="text-sm text-gray-400 hover:text-white transition-colors">
                İstifadə şərtləri
              </Link>
              <Link to="/legal" className="text-sm text-gray-400 hover:text-white transition-colors">
                Müəllif hüquqları
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;