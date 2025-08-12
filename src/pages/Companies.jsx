import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CompanyCard from '../components/CompanyCard';

const Companies = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const companies = [
    {
      name: 'Azercell',
      category: 'Telekom',
      complaintCount: 247,
      icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Azercell_logo.svg/200px-Azercell_logo.svg.png',
      bgColor: '#0066CC'
    },
    {
      name: 'Kapital Bank',
      category: 'Bank',
      complaintCount: 189,
      icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f4/Kapital_Bank_logo.svg/200px-Kapital_Bank_logo.svg.png',
      bgColor: '#E31E24'
    },
    {
      name: 'Bolt Food',
      category: 'Yemək Çatdırılması',
      complaintCount: 156,
      icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1c/Bolt_logo.svg/200px-Bolt_logo.svg.png',
      bgColor: '#34D186'
    },
    {
      name: 'AZAL',
      category: 'Havayolu',
      complaintCount: 134,
      icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/Azerbaijan_Airlines_logo.svg/200px-Azerbaijan_Airlines_logo.svg.png',
      bgColor: '#003366'
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
    },
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
    },
    {
      name: 'BiP',
      category: 'Nəqliyyat',
      complaintCount: 76,
      icon: 'https://bip.az/assets/images/logo.png',
      bgColor: '#FF4500'
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
    },
    {
      name: 'Wolt',
      category: 'Yemək Çatdırılması',
      complaintCount: 43,
      icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Wolt_logo.svg/200px-Wolt_logo.svg.png',
      bgColor: '#009DE0'
    }
  ];

  const categories = ['all', 'Telekom', 'Bank', 'Yemək Çatdırılması', 'Havayolu', 'Kommunal', 'Nəqliyyat'];

  const filteredCompanies = companies.filter(company => {
    const matchesSearch = company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         company.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || company.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });



  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-6 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Bütün Şirkətlər
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Azərbaycandaki şirkətlərin şikayət statistikalarını araşdırın və öz təcrübənizi paylaşın.
          </p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Search */}
            <div>
              <label htmlFor="search" className="block text-sm font-semibold text-gray-700 mb-2">
                Şirkət Axtar
              </label>
              <input
                id="search"
                type="text"
                placeholder="Şirkət adı və ya kateqoriya..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              />
            </div>

            {/* Category Filter */}
            <div>
              <label htmlFor="category" className="block text-sm font-semibold text-gray-700 mb-2">
                Kateqoriya
              </label>
              <select
                id="category"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              >
                <option value="all">Bütün Kateqoriyalar</option>
                {categories.filter(cat => cat !== 'all').map(category => (
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
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {filteredCompanies.length > 0 ? (
            filteredCompanies.map((company, index) => (
              <CompanyCard
                key={index}
                {...company}

              />
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <div className="text-gray-400 text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">Heç bir şirkət tapılmadı</h3>
              <p className="text-gray-500">Axtarış kriteriyalarınızı dəyişdirərək yenidən cəhd edin.</p>
            </div>
          )}
        </div>

        {/* Statistics */}
        <div className="mt-16 bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Platformada Ümumi Statistikalar
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">
                {companies.length}
              </div>
              <div className="text-gray-600">Qeydiyyatlı Şirkət</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-red-600 mb-2">
                {companies.reduce((sum, company) => sum + company.complaintCount, 0)}
              </div>
              <div className="text-gray-600">Ümumi Şikayət</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">
                {categories.length - 1}
              </div>
              <div className="text-gray-600">Kateqoriya</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Companies;
