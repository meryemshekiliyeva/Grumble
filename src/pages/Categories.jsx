import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CategoryCard from '../components/CategoryCard';
import CompanyCard from '../components/CompanyCard';

const Categories = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState(null);

  const categories = [
    {
      name: 'Telekommunikasiya',
      icon: '📱',
      color: '#3B82F6',
      description: 'İnternet, telefon və mobil xidmətlər',
      complaintCount: 487
    },
    {
      name: 'Bank və Maliyyə',
      icon: '🏦',
      color: '#10B981',
      description: 'Bank xidmətləri və maliyyə məsələləri',
      complaintCount: 308
    },
    {
      name: 'Yemək Çatdırılması',
      icon: '🍕',
      color: '#F59E0B',
      description: 'Onlayn yemək sifarişi və çatdırılma',
      complaintCount: 199
    },
    {
      name: 'Nəqliyyat',
      icon: '🚗',
      color: '#EF4444',
      description: 'Taksi, avtobus və digər nəqliyyat xidmətləri',
      complaintCount: 156
    },
    {
      name: 'Kommunal Xidmətlər',
      icon: '⚡',
      color: '#8B5CF6',
      description: 'Su, qaz, elektrik və digər kommunal xidmətlər',
      complaintCount: 185
    },
    {
      name: 'Havayolu',
      icon: '✈️',
      color: '#06B6D4',
      description: 'Hava nəqliyyatı və havayolu şirkətləri',
      complaintCount: 134
    },
    {
      name: 'E-ticarət',
      icon: '🛒',
      color: '#84CC16',
      description: 'Onlayn alış-veriş platformaları',
      complaintCount: 98
    },
    {
      name: 'Sığorta',
      icon: '🛡️',
      color: '#F97316',
      description: 'Sığorta şirkətləri və xidmətləri',
      complaintCount: 65
    }
  ];

  const companiesByCategory = {
    'Telekommunikasiya': [
      {
        name: 'Azercell',
        category: 'Telekom',
        complaintCount: 247,
        icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Azercell_logo.svg/200px-Azercell_logo.svg.png',
        bgColor: '#0066CC'
      },
      {
        name: 'Bakcell',
        category: 'Telekom',
        complaintCount: 128,
        icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/Bakcell_logo.svg/200px-Bakcell_logo.svg.png',
        bgColor: '#FF6600'
      },
      {
        name: 'Nar Mobile',
        category: 'Telekom',
        complaintCount: 112,
        icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a8/Nar_logo.svg/200px-Nar_logo.svg.png',
        bgColor: '#8B0000'
      }
    ],
    'Bank və Maliyyə': [
      {
        name: 'Kapital Bank',
        category: 'Bank',
        complaintCount: 189,
        icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f4/Kapital_Bank_logo.svg/200px-Kapital_Bank_logo.svg.png',
        bgColor: '#E31E24'
      },
      {
        name: 'Pasha Bank',
        category: 'Bank',
        complaintCount: 65,
        icon: 'https://pashabank.az/images/logo.png',
        bgColor: '#1E3A8A'
      },
      {
        name: 'Yelo Bank',
        category: 'Bank',
        complaintCount: 54,
        icon: 'https://yelobank.az/images/logo.png',
        bgColor: '#FFFF00'
      }
    ],
    'Yemək Çatdırılması': [
      {
        name: 'Wolt',
        category: 'Yemək Çatdırılması',
        complaintCount: 43,
        icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Wolt_logo.svg/200px-Wolt_logo.svg.png',
        bgColor: '#009DE0'
      },
      {
        name: 'Bolt',
        category: 'Yemək Çatdırılması',
        complaintCount: 156,
        icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1c/Bolt_logo.svg/200px-Bolt_logo.svg.png',
        bgColor: '#34D186'
      },
      {
        name: 'Yango',
        category: 'Yemək Çatdırılması',
        complaintCount: 89,
        icon: 'https://yango.com/images/logo.png',
        bgColor: '#FFD700'
      },
      {
        name: 'Fooderos',
        category: 'Yemək Çatdırılması',
        complaintCount: 67,
        icon: 'https://fooderos.az/images/logo.png',
        bgColor: '#FF6B35'
      }
    ],
    'Nəqliyyat': [
      {
        name: 'BiP',
        category: 'Nəqliyyat',
        complaintCount: 76,
        icon: 'https://bip.az/assets/images/logo.png',
        bgColor: '#FF4500'
      }
    ],
    'Kommunal Xidmətlər': [
      {
        name: 'Azersu',
        category: 'Kommunal',
        complaintCount: 98,
        icon: 'https://azersu.az/assets/images/logo.png',
        bgColor: '#0066CC'
      },
      {
        name: 'Azerishiq',
        category: 'Kommunal',
        complaintCount: 87,
        icon: 'https://azerishiq.az/images/logo.png',
        bgColor: '#FFD700'
      }
    ],
    'Havayolu': [
      {
        name: 'AZAL',
        category: 'Havayolu',
        complaintCount: 134,
        icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/Azerbaijan_Airlines_logo.svg/200px-Azerbaijan_Airlines_logo.svg.png',
        bgColor: '#003366'
      }
    ]
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };



  const handleBackToCategories = () => {
    setSelectedCategory(null);
  };

  if (selectedCategory) {
    const companies = companiesByCategory[selectedCategory.name] || [];

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="container mx-auto px-6 py-12">
          {/* Back Button */}
          <button
            onClick={handleBackToCategories}
            className="flex items-center text-blue-600 hover:text-blue-700 mb-8 transition-colors"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Kateqoriyalara qayıt
          </button>

          {/* Category Header */}
          <div className="text-center mb-12">
            <div
              className="w-20 h-20 mx-auto mb-6 rounded-2xl flex items-center justify-center text-white text-4xl"
              style={{ backgroundColor: selectedCategory.color }}
            >
              {selectedCategory.icon}
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              {selectedCategory.name}
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-4">
              {selectedCategory.description}
            </p>
            <div className="text-sm text-gray-500">
              <span className="font-semibold">{companies.length}</span> şirkət •
              <span className="font-semibold ml-1">{selectedCategory.complaintCount}</span> şikayət
            </div>
          </div>

          {/* Companies Grid */}
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1">
            {companies.length > 0 ? (
              companies.map((company, index) => (
                <CompanyCard
                  key={index}
                  {...company}

                />
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <div className="text-gray-400 text-6xl mb-4">🏢</div>
                <h3 className="text-xl font-semibold text-gray-700 mb-2">Bu kateqoriyada şirkət yoxdur</h3>
                <p className="text-gray-500">Tezliklə əlavə ediləcək.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-6 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Şikayət Kateqoriyaları
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Şikayətinizi uyğun kateqoriyada yerləşdirin və həmin sahədəki şirkətləri araşdırın.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {categories.map((category, index) => (
            <div
              key={index}
              onClick={() => handleCategoryClick(category)}
              className="group cursor-pointer"
            >
              <div className="bg-white rounded-2xl border border-gray-200/60 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-lg hover:border-gray-300/70 p-6 text-center">
                <div
                  className="w-16 h-16 mx-auto mb-4 rounded-xl flex items-center justify-center text-white text-2xl transition-transform duration-300 group-hover:scale-110"
                  style={{ backgroundColor: category.color }}
                >
                  {category.icon}
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{category.name}</h3>
                <p className="text-sm text-gray-600 mb-3 line-clamp-2">{category.description}</p>
                <div className="text-xs text-red-600 font-semibold">
                  {category.complaintCount} şikayət
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Statistics */}
        <div className="mt-16 bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Kateqoriya Statistikaları
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">
                {categories.length}
              </div>
              <div className="text-gray-600">Aktiv Kateqoriya</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-red-600 mb-2">
                {categories.reduce((sum, cat) => sum + cat.complaintCount, 0)}
              </div>
              <div className="text-gray-600">Ümumi Şikayət</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">
                {Object.values(companiesByCategory).flat().length}
              </div>
              <div className="text-gray-600">Qeydiyyatlı Şirkət</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Categories;