import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const mockUsers = [
  { id: 1, name: 'Admin İstifadəçi', email: 'admin@grumble.az', date: '2025-01-01', complaints: 0, status: 'Aktiv', role: 'admin' },
  { id: 2, name: 'Aysel Əliyeva', email: 'aysel.aliyeva@example.com', date: '2025-06-01', complaints: 2, status: 'Aktiv', role: 'user' },
  { id: 3, name: 'Əli Məmmədov', email: 'ali@example.com', date: '2025-06-02', complaints: 1, status: 'Aktiv', role: 'user' },
  { id: 4, name: 'Leyla Həsənova', email: 'leyla@example.com', date: '2025-06-03', complaints: 3, status: 'Aktiv', role: 'user' },
  { id: 5, name: 'Rəşad Əliyev', email: 'reshad@example.com', date: '2025-06-04', complaints: 1, status: 'Dayandırılıb', role: 'user' },
  { id: 6, name: 'Test İstifadəçi', email: 'test@example.com', date: '2025-08-20', complaints: 5, status: 'Aktiv', role: 'user' }
];

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    // fetch('/api/users').then(res => res.json()).then(setUsers);
    setUsers(mockUsers);
  }, []);

  const filtered = users.filter(
    u =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">İstifadəçi İdarəetməsi</h2>
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <input
            type="text"
            placeholder="İstifadəçiləri axtarın..."
            className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ad</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Qeydiyyat Tarixi</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Şikayətlər</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Əməliyyatlar</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filtered.map(u => (
                <tr key={u.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{u.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-8 w-8">
                        <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center text-white text-sm font-medium">
                          {u.name.charAt(0)}
                        </div>
                      </div>
                      <div className="ml-3">
                        <div className="text-sm font-medium text-gray-900">{u.name}</div>
                        {u.role === 'admin' && (
                          <div className="text-xs text-red-600 font-medium">Admin</div>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{u.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{u.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{u.complaints}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      u.status === 'Aktiv'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {u.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <Link
                      to={`/admin/users/${u.id}`}
                      className="text-blue-600 hover:text-blue-900 mr-4"
                    >
                      Bax
                    </Link>
                    {u.role !== 'admin' && (
                      <button className={`${
                        u.status === 'Aktiv'
                          ? 'text-red-600 hover:text-red-900'
                          : 'text-green-600 hover:text-green-900'
                      }`}>
                        {u.status === 'Aktiv' ? 'Dayandır' : 'Aktivləşdir'}
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UserList;
