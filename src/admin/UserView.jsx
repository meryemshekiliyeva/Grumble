import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const mockUser = {
  id: 1,
  name: 'Orxan Məmmədov',
  email: 'orxan@example.com',
  date: '2025-06-01',
  complaints: [
    { id: 1, title: 'Internet Issue', company: 'CityNet', date: '2025-07-09', status: 'Pending' },
    { id: 3, title: 'Other Issue', company: 'Bravo', date: '2025-07-05', status: 'Resolved' }
  ],
  status: 'Active'
};

const UserView = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    // fetch(`/api/users/${id}`).then(res => res.json()).then(setUser);
    setUser(mockUser);
  }, [id]);

  const handleSuspend = () => {
    // fetch(`/api/users/${id}/suspend`, { method: 'POST' });
    alert('User status updated!');
  };

  if (!user) return <div>Loading...</div>;

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">User Details</h2>
      <div className="bg-white rounded shadow p-6 mb-6">
        <div><strong>ID:</strong> {user.id}</div>
        <div><strong>Name:</strong> {user.name}</div>
        <div><strong>Email:</strong> {user.email}</div>
        <div><strong>Registration Date:</strong> {user.date}</div>
        <div><strong>Status:</strong> {user.status}</div>
        <button onClick={handleSuspend} className="bg-yellow-600 text-white px-4 py-2 rounded mt-2">
          {user.status === 'Active' ? 'Suspend' : 'Unsuspend'}
        </button>
      </div>
      <div className="bg-gray-50 rounded shadow p-4">
        <h3 className="font-semibold mb-2">Complaint History</h3>
        <ul>
          {user.complaints.map(c => (
            <li key={c.id}>
              {c.date}: {c.title} ({c.company}) - {c.status}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default UserView;
