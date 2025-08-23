import React from 'react';
import { useParams, Link } from 'react-router-dom';

const CategoryPage = () => {
  const { categoryId } = useParams();

  // Category data with companies
  const categories = {
    'banklar': {
      name: 'Banklar',
      companies: [
        {
          id: 'jpmorgan-chase',
          name: 'JPMorgan Chase',
          logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/JPMorgan_Chase_logo.svg/200px-JPMorgan_Chase_logo.svg.png',
          rating: 3.0,
          complaints: 189,
          description: 'Amerika Birləşmiş Ştatlarının ən böyük banklarından biri'
        },
        {
          id: 'hsbc',
          name: 'HSBC',
          logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/aa/HSBC_logo_%282018%29.svg/200px-HSBC_logo_%282018%29.svg.png',
          rating: 3.3,
          complaints: 165,
          description: 'Dünyada aparıcı beynəlxalq banklar'
        },
        {
          id: 'goldman-sachs',
          name: 'Goldman Sachs',
          logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/61/Goldman_Sachs.svg/200px-Goldman_Sachs.svg.png',
          rating: 3.8,
          complaints: 95,
          description: 'Aparıcı investisiya bankı və maliyyə xidmətləri'
        },
      ]
    },
    'telekom': {
      name: 'Telekom',
      companies: [
        {
          id: 'att',
          name: 'AT&T',
          logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/AT%26T_logo_2016.svg/200px-AT%26T_logo_2016.svg.png',
          rating: 2.5,
          complaints: 247,
          description: 'Amerika Birləşmiş Ştatlarının aparıcı telekommunikasiya şirkəti'
        },
        {
          id: 'vodafone',
          name: 'Vodafone',
          logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/Vodafone_icon.svg/200px-Vodafone_icon.svg.png',
          rating: 2.8,
          complaints: 128,
          description: 'Dünyada aparıcı mobil rabitə operatoru'
        },
        {
          id: 't-mobile',
          name: 'T-Mobile',
          logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/06/T-Mobile_logo.svg/200px-T-Mobile_logo.svg.png',
          rating: 3.4,
          complaints: 112,
          description: 'Amerika və Avropada fəaliyyət göstərən mobil operator'
        },
      ]
    },
    'Havayolu': {
      name: 'Havayolu',
      companies: [
        {
          id: 'emirates',
          name: 'Emirates',
          logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/Emirates_logo.svg/200px-Emirates_logo.svg.png',
          rating: 4.1,
          complaints: 134,
          description: 'Dünyada aparıcı havayolu şirkətlərindən biri, yüksək keyfiyyətli xidmət təqdim edir'
        },
        {
          id: 'lufthansa',
          name: 'Lufthansa',
          logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/Lufthansa_Logo_2018.svg/200px-Lufthansa_Logo_2018.svg.png',
          rating: 3.8,
          complaints: 89,
          description: 'Almaniyanın milli havayolu şirkəti, beynəlxalq uçuşlar təqdim edir'
        },
        {
          id: 'delta-air-lines',
          name: 'Delta Air Lines',
          logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Delta_logo.svg/200px-Delta_logo.svg.png',
          rating: 3.6,
          complaints: 32,
          description: 'Amerika Birləşmiş Ştatlarının aparıcı havayolu şirkəti'
        },
    
      ]
    },
    'e-ticarət': {
      name: 'E-ticarət',
      companies: [
        {
          id: 'amazon',
          name: 'Amazon',
          logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/200px-Amazon_logo.svg.png',
          rating: 3.9,
          complaints: 156,
          description: 'Dünyada ən böyük e-ticarət platforması'
        },
        {
          id: 'alibaba',
          name: 'Alibaba',
          logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/22/Alibaba_Group_Holding_Limited_Logo.svg/200px-Alibaba_Group_Holding_Limited_Logo.svg.png',
          rating: 3.6,
          complaints: 98,
          description: 'Çinin ən böyük e-ticarət şirkəti'
        },
        {
          id: 'ebay',
          name: 'eBay',
          logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/EBay_logo.svg/200px-EBay_logo.svg.png',
          rating: 3.3,
          complaints: 76,
          description: 'Aparıcı onlayn hərrac və e-ticarət platforması'
        }
      ]
    },
    'yemek-catdirilmasi': {
      name: 'Yemək Çatdırılması',
      companies: [
        {
          id: 'uber-eats',
          name: 'Uber Eats',
          logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/Uber_logo_2018.png/200px-Uber_logo_2018.png',
          rating: 3.2,
          complaints: 156,
          description: 'Dünyada ən məşhur yemək çatdırılması platforması'
        },
        {
          id: 'doordash',
          name: 'DoorDash',
          logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fe/DoorDash_logo.svg/200px-DoorDash_logo.svg.png',
          rating: 3.1,
          complaints: 89,
          description: 'Amerika Birləşmiş Ştatlarında aparıcı yemək çatdırılması platforması'
        },
        {
          id: 'deliveroo',
          name: 'Deliveroo',
          logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Deliveroo_logo.svg/200px-Deliveroo_logo.svg.png',
          rating: 3.4,
          complaints: 67,
          description: 'Böyük Britaniya və Avropada fəaliyyət göstərən yemək çatdırılması platforması'
        }
      ]
    },
    'kommunal': {
      name: 'Kommunal Xidmətlər',
      companies: [
        {
          id: 'edf-energy',
          name: 'EDF Energy',
          logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1f/EDF_logo.svg/200px-EDF_logo.svg.png',
          rating: 2.9,
          complaints: 98,
          description: 'Böyük Britaniyada aparıcı enerji təchizatçısı'
        },
        {
          id: 'national-grid',
          name: 'National Grid',
          logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8f/National_Grid_logo.svg/200px-National_Grid_logo.svg.png',
          rating: 3.1,
          complaints: 87,
          description: 'Elektrik və qaz şəbəkələrini idarə edən beynəlxalq enerji şirkəti'
        },
        {
          id: 'veolia',
          name: 'Veolia',
          logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/70/Veolia_logo.svg/200px-Veolia_logo.svg.png',
          rating: 2.7,
          complaints: 65,
          description: 'Dünyada aparıcı ekoloji həllər şirkəti'
        }
      ]
    },
    'sigorta': {
      name: 'Sığorta',
      companies: [
        {
          id: 'allianz',
          name: 'Allianz',
          logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/Allianz_logo.svg/200px-Allianz_logo.svg.png',
          rating: 3.5,
          complaints: 87,
          description: 'Dünyada aparıcı sığorta və maliyyə xidmətləri şirkəti'
        },
        {
          id: 'axa',
          name: 'AXA',
          logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/AXA_Logo.svg/200px-AXA_Logo.svg.png',
          rating: 3.2,
          complaints: 65,
          description: 'Dünyada aparıcı sığorta şirkətlərindən biri'
        },
        {
          id: 'prudential',
          name: 'Prudential',
          logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f4/Prudential_plc_logo.svg/200px-Prudential_plc_logo.svg.png',
          rating: 3.7,
          complaints: 54,
          description: 'Beynəlxalq maliyyə xidmətləri şirkəti'
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
