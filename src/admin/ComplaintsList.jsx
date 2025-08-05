import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const mockComplaints = [
  { id: 1, title: 'Internet Issue', company: 'CityNet', user: 'Orxan Məmmədov', date: '2025-07-09', status: 'Pending' },
  { id: 2, title: 'Wrong Delivery', company: 'Wolt', user: 'Aysel Əliyeva', date: '2025-07-08', status: 'Resolved' },
  // ...more
];

const ComplaintsList = () => {
  const [complaints, setComplaints] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    // fetch('/api/complaints').then(res => res.json()).then(setComplaints);
    setComplaints(mockComplaints);
  }, []);

  const filtered = complaints.filter(
    c =>
      c.title.toLowerCase().includes(search.toLowerCase()) ||
      c.company.toLowerCase().includes(search.toLowerCase()) ||
      c.user.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Complaints Management</h2>
      <input
        type="text"
        placeholder="Search complaints..."
        className="mb-4 px-3 py-2 border rounded w-full max-w-md"
        value={search}
        onChange={e => setSearch(e.target.value)}
      />
      <table className="w-full border rounded mb-8">
        <thead>
          <tr className="bg-gray-100">
            <th>ID</th>
            <th>Title</th>
            <th>Company</th>
            <th>User</th>
            <th>Date</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map(c => (
            <tr key={c.id} className="border-t">
              <td>{c.id}</td>
              <td>{c.title}</td>
              <td>{c.company}</td>
              <td>{c.user}</td>
              <td>{c.date}</td>
              <td>{c.status}</td>
              <td>
                <Link to={`/admin/complaints/${c.id}`} className="text-blue-600 hover:underline mr-2">View</Link>
                <button className="text-green-600 mr-2">Approve</button>
                <button className="text-red-600 mr-2">Reject</button>
                <button className="text-gray-600">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Pagination would go here */}
    </div>
  );
};

export default ComplaintsList;
