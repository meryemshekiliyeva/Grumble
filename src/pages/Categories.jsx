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
        name: 'AT&T',
        category: 'Telekom',
        complaintCount: 247,
        icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/AT%26T_logo_2016.svg/200px-AT%26T_logo_2016.svg.png',
        bgColor: '#0066CC',
        companyId: 'att'
      },
      {
        name: 'Vodafone',
        category: 'Telekom',
        complaintCount: 128,
        icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/Vodafone_icon.svg/200px-Vodafone_icon.svg.png',
        bgColor: '#E60000',
        companyId: 'vodafone'
      },
      {
        name: 'T-Mobile',
        category: 'Telekom',
        complaintCount: 112,
        icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/06/T-Mobile_logo.svg/200px-T-Mobile_logo.svg.png',
        bgColor: '#E20074',
        companyId: 't-mobile'
      }
    ],
    'Bank və Maliyyə': [
      {
        name: 'JPMorgan Chase',
        category: 'Bank',
        complaintCount: 189,
        icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/JPMorgan_Chase_logo.svg/200px-JPMorgan_Chase_logo.svg.png',
        bgColor: '#0066CC',
        companyId: 'jpmorgan-chase'
      },
      {
        name: 'HSBC',
        category: 'Bank',
        complaintCount: 65,
        icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/aa/HSBC_logo_%282018%29.svg/200px-HSBC_logo_%282018%29.svg.png',
        bgColor: '#DB0011',
        companyId: 'hsbc'
      },
      {
        name: 'Goldman Sachs',
        category: 'Bank',
        complaintCount: 54,
        icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/61/Goldman_Sachs.svg/200px-Goldman_Sachs.svg.png',
        bgColor: '#1E3A8A',
        companyId: 'goldman-sachs'
      }
    ],
    'Yemək Çatdırılması': [
      {
        name: 'Uber Eats',
        category: 'Yemək Çatdırılması',
        complaintCount: 43,
        icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/Uber_logo_2018.png/200px-Uber_logo_2018.png',
        bgColor: '#000000',
        companyId: 'uber-eats'
      },
      {
        name: 'DoorDash',
        category: 'Yemək Çatdırılması',
        complaintCount: 156,
        icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fe/DoorDash_logo.svg/200px-DoorDash_logo.svg.png',
        bgColor: '#FF3008',
        companyId: 'doordash'
      },
      {
        name: 'Deliveroo',
        category: 'Yemək Çatdırılması',
        complaintCount: 89,
        icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Deliveroo_logo.svg/200px-Deliveroo_logo.svg.png',
        bgColor: '#00CCBC',
        companyId: 'deliveroo'
      },
    ],
    'Kommunal Xidmətlər': [
      {
        name: 'EDF Energy',
        category: 'Kommunal',
        complaintCount: 98,
        icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1f/EDF_logo.svg/200px-EDF_logo.svg.png',
        bgColor: '#FF6600',
        companyId: 'edf-energy'
      },
      {
        name: 'National Grid',
        category: 'Kommunal',
        complaintCount: 87,
        icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8f/National_Grid_logo.svg/200px-National_Grid_logo.svg.png',
        bgColor: '#0066CC',
        companyId: 'national-grid'
      },
      {
        name: 'Veolia',
        category: 'Kommunal',
        complaintCount: 65,
        icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/70/Veolia_logo.svg/200px-Veolia_logo.svg.png',
        bgColor: '#00A651',
        companyId: 'veolia'
      },
    ],
    'Havayolu': [
      {
        name: 'Emirates',
        category: 'Havayolu',
        complaintCount: 134,
        icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/Emirates_logo.svg/200px-Emirates_logo.svg.png',
        bgColor: '#FF0000',
        companyId: 'emirates'
      },
      {
        name: 'Lufthansa',
        category: 'Havayolu',
        complaintCount: 89,
        icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/Lufthansa_Logo_2018.svg/200px-Lufthansa_Logo_2018.svg.png',
        bgColor: '#F9BA00',
        companyId: 'lufthansa'
      },
      {
        name: 'Delta Air Lines',
        category: 'Havayolu',
        complaintCount: 32,
        icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Delta_logo.svg/200px-Delta_logo.svg.png',
        bgColor: '#003366',
        companyId: 'delta-air-lines'
      },
    ],
    'Sığorta': [
      {
        name: 'Allianz',
        category: 'Sığorta',
        complaintCount: 87,
        icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/Allianz_logo.svg/200px-Allianz_logo.svg.png',
        bgColor: '#0066CC',
        companyId: 'allianz'
      },
      {
        name: 'AXA',
        category: 'Sığorta',
        complaintCount: 65,
        icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/AXA_Logo.svg/200px-AXA_Logo.svg.png',
        bgColor: '#00008F',
        companyId: 'axa'
      },
      {
        name: 'Prudential',
        category: 'Sığorta',
        complaintCount: 54,
        icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f4/Prudential_plc_logo.svg/200px-Prudential_plc_logo.svg.png',
        bgColor: '#ED1C24',
        companyId: 'prudential'
      },
    ],
    'E-ticarət': [
      {
        name: 'Amazon',
        category: 'E-ticarət',
        complaintCount: 156,
        icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/200px-Amazon_logo.svg.png',
        bgColor: '#FF9900',
        companyId: 'amazon'
      },
      {
        name: 'Alibaba',
        category: 'E-ticarət',
        complaintCount: 98,
        icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/22/Alibaba_Group_Holding_Limited_Logo.svg/200px-Alibaba_Group_Holding_Limited_Logo.svg.png',
        bgColor: '#FF6A00',
        companyId: 'alibaba'
      },
      {
        name: 'eBay',
        category: 'E-ticarət',
        complaintCount: 76,
        icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/EBay_logo.svg/200px-EBay_logo.svg.png',
        bgColor: '#E53238',
        companyId: 'ebay'
      },
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