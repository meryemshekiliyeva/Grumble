import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const mockCompany = {
  id: 1,
  name: 'CityNet',
  category: 'Internet',
  complaints: [
    { id: 1, title: 'Internet Issue', user: 'Orxan Məmmədov', date: '2025-07-09', status: 'Pending' },
    { id: 4, title: 'Other Issue', user: 'Leyla Hüseynova', date: '2025-07-07', status: 'Resolved' }
  ]
};

const CompanyView = () => {
  const { id } = useParams();
  const [company, setCompany] = useState(null);

  useEffect(() => {
    // fetch(`/api/companies/${id}`).then(res => res.json()).then(setCompany);
    setCompany(mockCompany);
  }, [id]);

  if (!company) return <div>Loading...</div>;

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Company Details</h2>
      <div className="bg-white rounded shadow p-6 mb-6">
        <div><strong>ID:</strong> {company.id}</div>
        <div><strong>Name:</strong> {company.name}</div>
        <div><strong>Category:</strong> {company.category}</div>
      </div>
      <div className="bg-gray-50 rounded shadow p-4">
        <h3 className="font-semibold mb-2">Complaints Against Company</h3>
        <ul>
          {company.complaints.map(c => (
            <li key={c.id}>
              {c.date}: {c.title} by {c.user} - {c.status}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CompanyView;
