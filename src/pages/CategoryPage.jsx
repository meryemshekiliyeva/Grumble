import React from 'react';
import { useParams, Link } from 'react-router-dom';

const CategoryPage = () => {
  const { categoryId } = useParams();

  // Category data with companies
  const categories = {
    'banklar': {
      name: 'Banklər',
      companies: [
        {
          id: 'kapital-bank',
          name: 'Kapital Bank',
          logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Kapital_Bank_logo.svg/200px-Kapital_Bank_logo.svg.png',
          rating: 3.0,
          complaints: 139,
          description: 'Azərbaycanın ən böyük istehlaklı banklarından biri'
        },
        {
          id: 'pasha-bank',
          name: 'PAŞA Bank',
          logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f4/PASHA_Bank_logo.svg/200px-PASHA_Bank_logo.svg.png',
          rating: 2.8,
          complaints: 8,
          description: 'Müasir bankçılıq xidmətləri təqdim edən bank'
        },
        {
          id: 'birbank',
          name: 'Birbank',
          logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1f/Birbank_logo.svg/200px-Birbank_logo.svg.png',
          rating: 1.0,
          complaints: 1,
          description: 'Rəqəmsal bankçılıq həlləri təklif edən bank'
        }
      ]
    },
    'telekommunikasiya': {
      name: 'Telekommunikasiya',
      companies: [
        {
          id: 'azercell',
          name: 'Azercell',
          logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Azercell_logo.svg/200px-Azercell_logo.svg.png',
          rating: 3.5,
          complaints: 45,
          description: 'Azərbaycanın aparıcı mobil operator şirkəti'
        },
        {
          id: 'bakcell',
          name: 'Bakcell',
          logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Bakcell_logo.svg/200px-Bakcell_logo.svg.png',
          rating: 3.2,
          complaints: 32,
          description: 'Müasir telekommunikasiya xidmətləri təqdim edən şirkət'
        }
      ]
    },
    'e-ticarət': {
      name: 'E-ticarət',
      companies: [
        {
          id: 'trendyol',
          name: 'Trendyol',
          logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/39/Trendyol_logo.svg/200px-Trendyol_logo.svg.png',
          rating: 4.1,
          complaints: 23,
          description: 'Onlayn alış-veriş platforması'
        }
      ]
    }
  };

  const category = categories[categoryId];

  if (!category) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Kateqoriya tapılmadı</h1>
          <Link to="/" className="text-blue-600 hover:text-blue-800">
            Ana səhifəyə qayıt
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <nav className="flex items-center space-x-2 text-sm text-gray-500 mb-4">
            <Link to="/" className="hover:text-gray-700">Ana səhifə</Link>
            <span>/</span>
            <span className="text-gray-900">{category.name}</span>
          </nav>
          <h1 className="text-3xl font-bold text-gray-900">{category.name}</h1>
          <p className="text-gray-600 mt-2">{category.companies.length} şirkət</p>
        </div>

        {/* Companies Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {category.companies.map((company) => (
            <Link
              key={company.id}
              to={`/company/${company.id}`}
              className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200"
            >
              <div className="flex items-center space-x-4 mb-4">
                <img
                  src={company.logo}
                  alt={company.name}
                  className="w-12 h-12 object-contain"
                  onError={(e) => {
                    e.target.src = `https://ui-avatars.com/api/?name=${company.name}&background=3b82f6&color=fff&size=48`;
                  }}
                />
                <div>
                  <h3 className="font-semibold text-gray-900">{company.name}</h3>
                  <div className="flex items-center space-x-2 mt-1">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          className={`w-4 h-4 ${
                            i < Math.floor(company.rating)
                              ? 'text-yellow-400'
                              : 'text-gray-300'
                          }`}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <span className="text-sm text-gray-600">{company.rating}</span>
                  </div>
                </div>
              </div>
              
              <p className="text-gray-600 text-sm mb-4">{company.description}</p>
              
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">Şikayət sayı: {company.complaints}</span>
                <span className="text-blue-600 font-medium">Ətraflı →</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;
