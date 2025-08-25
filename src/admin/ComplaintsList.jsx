import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import apiService from '../services/api';

const mockComplaints = [
  { id: 1, title: 'İnternet Bağlantı Problemləri', company: 'CityNet', user: 'Orxan Məmmədov', date: '2025-07-09', status: 'pending' },
  { id: 2, title: 'Səhv Yemək Çatdırılması', company: 'Wolt', user: 'Aysel Əliyeva', date: '2025-07-08', status: 'resolved' },
  { id: 3, title: 'Məhsul Çatdırılmadı', company: 'Trendyol', user: 'Leyla Hüseynova', date: '2025-07-07', status: 'in_progress' },
  { id: 4, title: 'Bank Kartı Bloklandı', company: 'Kapital Bank', user: 'Murad Quliyev', date: '2025-07-06', status: 'pending' },
  { id: 5, title: 'Mobil İnternet Yavaşlığı', company: 'Azercell', user: 'Nigar Məmmədova', date: '2025-07-05', status: 'in_progress' },
];

const ComplaintsList = () => {
  const [complaints, setComplaints] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const loadComplaints = async () => {
      try {
        const data = await apiService.complaints.getAll();
        setComplaints(data.complaints || data);
      } catch (error) {
        console.error('Failed to load complaints:', error);
        // Fallback to mock data
        setComplaints(mockComplaints);
      }
    };

    loadComplaints();
  }, []);

  const filtered = complaints.filter(
    c =>
      c.title.toLowerCase().includes(search.toLowerCase()) ||
      c.company.toLowerCase().includes(search.toLowerCase()) ||
      c.user.toLowerCase().includes(search.toLowerCase())
  );

  const getStatusBadge = (status) => {
    const statusConfig = {
      pending: { label: 'Gözləyir', color: 'bg-yellow-100 text-yellow-800', icon: '⏳' },
      in_progress: { label: 'İcradadır', color: 'bg-blue-100 text-blue-800', icon: '🔄' },
      resolved: { label: 'Həll edilib', color: 'bg-green-100 text-green-800', icon: '✅' }
    };

    const config = statusConfig[status] || statusConfig.pending;
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.color}`}>
        <span className="mr-1">{config.icon}</span>
        {config.label}
      </span>
    );
  };

  const handleApprove = async (id) => {
    try {
      await apiService.complaints.update(id, { status: 'resolved' });
      setComplaints(prev => prev.map(c =>
        c.id === id ? { ...c, status: 'resolved' } : c
      ));
    } catch (error) {
      console.error('Failed to approve complaint:', error);
      // Fallback to local update
      setComplaints(prev => prev.map(c =>
        c.id === id ? { ...c, status: 'resolved' } : c
      ));
    }
  };

  const handleReject = async (id) => {
    if (window.confirm('Bu şikayəti rədd etmək istədiyinizə əminsiniz?')) {
      try {
        await apiService.complaints.update(id, { status: 'rejected' });
        setComplaints(prev => prev.filter(c => c.id !== id));
      } catch (error) {
        console.error('Failed to reject complaint:', error);
        // Fallback to local update
        setComplaints(prev => prev.filter(c => c.id !== id));
      }
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Bu şikayəti silmək istədiyinizə əminsiniz?')) {
      try {
        await apiService.complaints.delete(id);
        setComplaints(prev => prev.filter(c => c.id !== id));
      } catch (error) {
        console.error('Failed to delete complaint:', error);
        // Fallback to local update
        setComplaints(prev => prev.filter(c => c.id !== id));
      }
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Şikayətlərin İdarə Edilməsi</h2>
        <div className="text-sm text-gray-500">
          Ümumi: {complaints.length} şikayət
        </div>
      </div>

      <div className="mb-6">
        <input
          type="text"
          placeholder="Şikayətləri axtarın..."
          className="px-4 py-2 border border-gray-300 rounded-lg w-full max-w-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Başlıq</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Şirkət</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">İstifadəçi</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tarix</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Əməliyyatlar</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filtered.map(c => (
              <tr key={c.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">#{c.id}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{c.title}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{c.company}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{c.user}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{c.date}</td>
                <td className="px-6 py-4 whitespace-nowrap">{getStatusBadge(c.status)}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                  <Link
                    to={`/admin/complaints/${c.id}`}
                    className="text-blue-600 hover:text-blue-900 hover:underline"
                  >
                    Bax
                  </Link>
                  <button
                    onClick={() => handleApprove(c.id)}
                    className="text-green-600 hover:text-green-900"
                  >
                    Təsdiqlə
                  </button>
                  <button
                    onClick={() => handleReject(c.id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    Rədd et
                  </button>
                  <button
                    onClick={() => handleDelete(c.id)}
                    className="text-gray-600 hover:text-gray-900"
                  >
                    Sil
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">Heç bir şikayət tapılmadı.</p>
        </div>
      )}
    </div>
  );
};

export default ComplaintsList;
