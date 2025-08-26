import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCompaniesWithRatings } from '../utils/companyRating';

const Companies = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [companiesWithRatings, setCompaniesWithRatings] = useState([]);

  const baseCompanies = [
    // Telekommunikasiya
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
    },
    // Bank və Maliyyə
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
      complaintCount: 165,
      icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/aa/HSBC_logo_%282018%29.svg/200px-HSBC_logo_%282018%29.svg.png',
      bgColor: '#DB0011',
      companyId: 'hsbc'
    },
    {
      name: 'Goldman Sachs',
      category: 'Bank',
      complaintCount: 95,
      icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/61/Goldman_Sachs.svg/200px-Goldman_Sachs.svg.png',
      bgColor: '#1E3A8A',
      companyId: 'goldman-sachs'
    },
    // Yemək Çatdırılması
    {
      name: 'Uber Eats',
      category: 'Yemək Çatdırılması',
      complaintCount: 156,
      icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/Uber_logo_2018.png/200px-Uber_logo_2018.png',
      bgColor: '#000000',
      companyId: 'uber-eats'
    },
    {
      name: 'DoorDash',
      category: 'Yemək Çatdırılması',
      complaintCount: 89,
      icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fe/DoorDash_logo.svg/200px-DoorDash_logo.svg.png',
      bgColor: '#FF3008',
      companyId: 'doordash'
    },
    {
      name: 'Deliveroo',
      category: 'Yemək Çatdırılması',
      complaintCount: 67,
      icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Deliveroo_logo.svg/200px-Deliveroo_logo.svg.png',
      bgColor: '#00CCBC',
      companyId: 'deliveroo'
    },
    // Havayolu
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
    // Kommunal Xidmətlər
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
    // Sığorta
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
    // E-ticarət
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
    // Havayolu
    {
      name: 'Emirates',
      category: 'Havayolu',
      complaintCount: 45,
      icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/Emirates_logo.svg/200px-Emirates_logo.svg.png',
      bgColor: '#FF0000',
      companyId: 'emirates'
    }
  ];

  // Calculate dynamic ratings for companies
  useEffect(() => {
    const companiesWithDynamicRatings = getCompaniesWithRatings(baseCompanies);
    setCompaniesWithRatings(companiesWithDynamicRatings);
  }, []);

  const categories = ['all', 'Telekom', 'Bank', 'Yemək Çatdırılması', 'Havayolu', 'Kommunal', 'Sığorta', 'E-ticarət'];

  const companies = companiesWithRatings.length > 0 ? companiesWithRatings : baseCompanies;

  const filteredCompanies = companies.filter(company => {
    const matchesSearch = company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         company.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || company.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleCompanyClick = (companyId) => {
    navigate(`/companies/${companyId}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Bütün Şirkətlər</h1>
          <p className="text-lg text-gray-600">
            Şikayət edə biləcəyiniz bütün şirkətləri burada tapa bilərsiniz
          </p>
        </div>

        {/* Search and Filter */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <input
                  type="text"
                  placeholder="Şirkət adı və ya kateqoriya axtar..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Category Filter */}
            <div className="md:w-64">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">Bütün Kateqoriyalar</option>
                {categories.slice(1).map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            <span className="font-semibold">{filteredCompanies.length}</span> şirkət tapıldı
          </p>
        </div>

        {/* Companies Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredCompanies.map((company, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow group"
            >
              <div className="flex items-center space-x-4 mb-4">
                <div
                  className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: company.bgColor }}
                >
                  <img
                    src={company.icon}
                    alt={company.name}
                    className="w-8 h-8 object-contain"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'flex';
                    }}
                  />
                  <div
                    className="w-8 h-8 rounded flex items-center justify-center text-white font-bold text-sm hidden"
                    style={{ backgroundColor: company.bgColor }}
                  >
                    {company.name.charAt(0)}
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors truncate">
                    {company.name}
                  </h3>
                  <p className="text-sm text-gray-500">{company.category}</p>
                </div>
              </div>

              <div className="space-y-3">
                {/* Rating Display */}
                {company.rating > 0 && (
                  <div className="flex items-center space-x-2">
                    <div className="flex items-center">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <svg
                          key={star}
                          className={`w-4 h-4 ${star <= Math.floor(company.rating) ? 'text-yellow-400' : 'text-gray-300'}`}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                      <span className="text-sm font-medium text-gray-900 ml-1">
                        {company.rating.toFixed(1)}
                      </span>
                    </div>
                    <span className="text-sm text-gray-500">reytinq</span>
                  </div>
                )}

                <div className="flex items-center space-x-2">
                  <div className="flex items-center">
                    <svg className="w-4 h-4 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    <span className="text-sm font-medium text-gray-900 ml-1">
                      {company.complaintCount}
                    </span>
                  </div>
                  <span className="text-sm text-gray-500">şikayət</span>
                </div>

                <div className="flex space-x-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/review/${company.companyId}`);
                    }}
                    className="flex-1 px-3 py-2 text-xs font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
                  >
                    Şikayət Göndər
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCompanyClick(company.companyId);
                    }}
                    className="flex-1 px-3 py-2 text-xs font-medium text-gray-600 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    Bax
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredCompanies.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">Heç bir şirkət tapılmadı</h3>
            <p className="text-gray-500">Axtarış kriteriyalarınızı dəyişdirərək yenidən cəhd edin.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Companies;