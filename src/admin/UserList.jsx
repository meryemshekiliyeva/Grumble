import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const mockUsers = [
  { id: 1, name: 'Orxan Məmmədov', email: 'orxan@example.com', date: '2025-06-01', complaints: 3, status: 'Active' },
  { id: 2, name: 'Aysel Əliyeva', email: 'aysel@example.com', date: '2025-06-02', complaints: 1, status: 'Suspended' },
  // ...
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
      <h2 className="text-xl font-bold mb-4">User Management</h2>
      <input
        type="text"
        placeholder="Search users..."
        className="mb-4 px-3 py-2 border rounded w-full max-w-md"
        value={search}
        onChange={e => setSearch(e.target.value)}
      />
      <table className="w-full border rounded mb-8">
        <thead>
          <tr className="bg-gray-100">
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Registration Date</th>
            <th>Complaints</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map(u => (
            <tr key={u.id} className="border-t">
              <td>{u.id}</td>
              <td>{u.name}</td>
              <td>{u.email}</td>
              <td>{u.date}</td>
              <td>{u.complaints}</td>
              <td>{u.status}</td>
              <td>
                <Link to={`/admin/users/${u.id}`} className="text-blue-600 hover:underline mr-2">View</Link>
                <button className="text-yellow-600 mr-2">{u.status === 'Active' ? 'Suspend' : 'Unsuspend'}</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Pagination would go here */}
    </div>
  );
};

export default UserList;
