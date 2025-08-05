import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const mockComplaint = {
  id: 1,
  title: 'Internet Issue',
  company: 'CityNet',
  user: 'Orxan Məmmədov',
  date: '2025-07-09',
  status: 'Pending',
  summary: 'İnternetim 3 gündür işləmir...',
  actions: [{ date: '2025-07-10', action: 'Marked as pending', admin: 'Admin1' }]
};

const ComplaintView = () => {
  const { id } = useParams();
  const [complaint, setComplaint] = useState(null);
  const [note, setNote] = useState('');
  const [status, setStatus] = useState('');

  useEffect(() => {
    // fetch(`/api/complaints/${id}`).then(res => res.json()).then(setComplaint);
    setComplaint(mockComplaint);
    setStatus(mockComplaint.status);
  }, [id]);

  const handleUpdate = () => {
    // Example PUT request
    // fetch(`/api/complaints/${id}`, { method: 'PUT', body: JSON.stringify({ status, note }) });
    alert('Status updated!');
  };

  if (!complaint) return <div>Loading...</div>;

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Complaint Details</h2>
      <div className="bg-white rounded shadow p-6 mb-6">
        <div><strong>ID:</strong> {complaint.id}</div>
        <div><strong>Title:</strong> {complaint.title}</div>
        <div><strong>Company:</strong> {complaint.company}</div>
        <div><strong>User:</strong> {complaint.user}</div>
        <div><strong>Date:</strong> {complaint.date}</div>
        <div><strong>Status:</strong> {complaint.status}</div>
        <div className="mt-4"><strong>Summary:</strong> <p>{complaint.summary}</p></div>
      </div>
      <div className="bg-gray-50 rounded shadow p-4 mb-6">
        <h3 className="font-semibold mb-2">Action Log</h3>
        <ul>
          {complaint.actions.map((a, i) => (
            <li key={i}>{a.date}: {a.action} by {a.admin}</li>
          ))}
        </ul>
      </div>
      <div className="bg-white rounded shadow p-4">
        <h3 className="font-semibold mb-2">Admin Moderation</h3>
        <select value={status} onChange={e => setStatus(e.target.value)} className="mb-2 px-2 py-1 border rounded">
          <option value="Pending">Pending</option>
          <option value="Resolved">Resolved</option>
          <option value="Rejected">Rejected</option>
        </select>
        <textarea
          value={note}
          onChange={e => setNote(e.target.value)}
          placeholder="Add a private note..."
          className="w-full mb-2 px-2 py-1 border rounded"
        />
        <button onClick={handleUpdate} className="bg-blue-600 text-white px-4 py-2 rounded">Update</button>
      </div>
    </div>
  );
};

export default ComplaintView;
