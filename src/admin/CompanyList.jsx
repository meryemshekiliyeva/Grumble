import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const mockCompanies = [
  { id: 1, name: 'CityNet', category: 'Internet', complaints: 247 },
  { id: 2, name: 'Wolt', category: 'Food Delivery', complaints: 156 },
  // ...
];

const CompanyList = () => {
  const [companies, setCompanies] = useState([]);
  useEffect(() => {
    // fetch('/api/companies').then(res => res.json()).then(setCompanies);
    setCompanies(mockCompanies);
  }, []);

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Company Management</h2>
      <button className="bg-green-600 text-white px-4 py-2 rounded mb-4">Add Company</button>
      <table className="w-full border rounded mb-8">
        <thead>
          <tr className="bg-gray-100">
            <th>ID</th>
            <th>Name</th>
            <th>Category</th>
            <th>Complaints</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {companies.map(c => (
            <tr key={c.id} className="border-t">
              <td>{c.id}</td>
              <td>{c.name}</td>
              <td>{c.category}</td>
              <td>{c.complaints}</td>
              <td>
                <Link to={`/admin/companies/${c.id}`} className="text-blue-600 hover:underline mr-2">View</Link>
                <button className="text-yellow-600 mr-2">Edit</button>
                <button className="text-red-600">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CompanyList;
