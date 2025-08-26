import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const mockCompanies = [
  { id: 1, name: 'Azercell', category: 'Telekommunikasiya', complaints: 45, status: 'active', email: 'info@azercell.com', verified: true },
  { id: 2, name: 'Kapital Bank', category: 'Bank Xidmətləri', complaints: 23, status: 'active', email: 'info@kapitalbank.az', verified: true },
  { id: 3, name: 'Wolt', category: 'Yemək Çatdırılması', complaints: 67, status: 'active', email: 'support@wolt.com', verified: true },
  { id: 4, name: 'Trendyol', category: 'E-ticarət', complaints: 89, status: 'active', email: 'help@trendyol.com', verified: true },
  { id: 5, name: 'CityNet', category: 'Telekommunikasiya', complaints: 34, status: 'active', email: 'info@citynet.az', verified: false },
  { id: 6, name: 'Bolt', category: 'Nəqliyyat', complaints: 12, status: 'active', email: 'support@bolt.eu', verified: true },
  { id: 7, name: 'Pasha Bank', category: 'Bank Xidmətləri', complaints: 18, status: 'active', email: 'info@pashabank.az', verified: true },
  { id: 8, name: 'Azersu', category: 'Kommunal Xidmətlər', complaints: 156, status: 'active', email: 'info@azersu.az', verified: true },
  { id: 9, name: 'Emirates', category: 'Havayolu', complaints: 45, status: 'active', email: 'support@emirates.com', verified: true }
];

const CompanyList = () => {
  const [companies, setCompanies] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newCompany, setNewCompany] = useState({
    name: '',
    category: '',
    email: '',
    phone: ''
  });

  useEffect(() => {
    // Try to load real companies from localStorage
    const loadCompanies = () => {
      const registeredCompanies = JSON.parse(localStorage.getItem('registeredCompanies') || '[]');

      if (registeredCompanies.length > 0) {
        const transformedCompanies = registeredCompanies.map(company => ({
          id: company.id || company.email,
          name: company.companyName,
          category: company.category || 'Ümumi',
          email: company.email,
          phone: company.phone,
          complaints: 0, // Could be calculated from complaints data
          status: 'active'
        }));
        setCompanies([...mockCompanies, ...transformedCompanies]);
      } else {
        setCompanies(mockCompanies);
      }
    };

    loadCompanies();
  }, []);

  const handleAddCompany = (e) => {
    e.preventDefault();
    if (newCompany.name && newCompany.category) {
      const company = {
        id: companies.length + 1,
        ...newCompany,
        complaints: 0,
        status: 'active'
      };
      setCompanies([...companies, company]);
      setNewCompany({ name: '', category: '', email: '', phone: '' });
      setShowAddForm(false);
    }
  };

  const handleDelete = (id) => {
    if (window.confirm('Bu şirkəti silmək istədiyinizə əminsiniz?')) {
      setCompanies(prev => prev.filter(c => c.id !== id));
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Şirkətlərin İdarə Edilməsi</h2>
        <button
          onClick={() => setShowAddForm(true)}
          className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          <span>Şirkət Əlavə Et</span>
        </button>
      </div>

      {/* Add Company Form */}
      {showAddForm && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <h3 className="text-lg font-semibold mb-4">Yeni Şirkət Əlavə Et</h3>
          <form onSubmit={handleAddCompany} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Şirkət Adı</label>
                <input
                  type="text"
                  value={newCompany.name}
                  onChange={(e) => setNewCompany({...newCompany, name: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Kateqoriya</label>
                <select
                  value={newCompany.category}
                  onChange={(e) => setNewCompany({...newCompany, category: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                >
                  <option value="">Kateqoriya seçin</option>
                  <option value="Telekommunikasiya">Telekommunikasiya</option>
                  <option value="Yemək Çatdırılması">Yemək Çatdırılması</option>
                  <option value="E-ticarət">E-ticarət</option>
                  <option value="Bank Xidmətləri">Bank Xidmətləri</option>
                  <option value="Nəqliyyat">Nəqliyyat</option>
                  <option value="Kommunal Xidmətlər">Kommunal Xidmətlər</option>
                  <option value="Sağlamlıq">Sağlamlıq</option>
                  <option value="Təhsil">Təhsil</option>
                </select>
              </div>
            </div>
            <div className="flex space-x-3">
              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Əlavə Et
              </button>
              <button
                type="button"
                onClick={() => setShowAddForm(false)}
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 transition-colors"
              >
                Ləğv Et
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ad</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Kateqoriya</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Şikayətlər</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Əməliyyatlar</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {companies.map(c => (
              <tr key={c.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">#{c.id}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-8 w-8">
                      <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center text-white text-sm font-medium">
                        {c.name.charAt(0)}
                      </div>
                    </div>
                    <div className="ml-3">
                      <div className="text-sm font-medium text-gray-900">{c.name}</div>
                      {c.verified && (
                        <div className="text-xs text-green-600 font-medium flex items-center">
                          <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          Təsdiqlənib
                        </div>
                      )}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{c.category}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{c.email}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{c.complaints}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                    c.status === 'active'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {c.status === 'active' ? 'Aktiv' : 'Deaktiv'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                  <Link
                    to={`/admin/companies/${c.id}`}
                    className="text-blue-600 hover:text-blue-900 hover:underline"
                  >
                    Bax
                  </Link>
                  <button className="text-yellow-600 hover:text-yellow-900">
                    Redaktə Et
                  </button>
                  <button
                    onClick={() => handleDelete(c.id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    Sil
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CompanyList;
