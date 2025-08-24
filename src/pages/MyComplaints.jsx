import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { getStatusConfig, sortComplaints } from '../utils/statusConfig';

const MyComplaints = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const [complaints, setComplaints] = useState([]);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    // Load user's complaints from localStorage
    const userComplaints = JSON.parse(localStorage.getItem('userComplaints') || '[]');
    const myComplaints = userComplaints.filter(complaint => complaint.authorEmail === user.email);
    // Sort complaints by date (newest first)
    const sortedComplaints = sortComplaints(myComplaints);
    setComplaints(sortedComplaints);
  }, [isAuthenticated, navigate, user]);



  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <nav className="flex items-center space-x-2 text-sm text-gray-500 mb-4">
            <Link to="/" className="hover:text-gray-700">Ana səhifə</Link>
            <span>/</span>
            <span className="text-gray-900">Şikayətlərim</span>
          </nav>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Şikayətlərim</h1>
              <p className="text-gray-600 mt-2">{complaints.length} şikayət</p>
            </div>
            <Link
              to="/new-complaint"
              className="px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200"
            >
              Yeni Şikayət
            </Link>
          </div>
        </div>

        {/* Complaints List */}
        {complaints.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Hələ şikayətiniz yoxdur</h3>
            <p className="text-gray-600 mb-6">İlk şikayətinizi göndərin və problemlərinizi həll edin.</p>
            <Link
              to="/new-complaint"
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Şikayət Göndər
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {complaints.map((complaint) => {
              const statusConfig = getStatusConfig(complaint.status);
              return (
                <div key={complaint.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">{complaint.title}</h3>
                        <div className={`flex items-center px-3 py-1 rounded-full text-xs font-semibold border ${statusConfig.bg} ${statusConfig.text} ${statusConfig.border}`}>
                          <span className="mr-1">{statusConfig.icon}</span>
                          {statusConfig.label}
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">
                        <span className="font-medium">{complaint.company}</span> • {complaint.category}
                      </p>
                      <p className="text-gray-700 mb-3 break-words">{complaint.summary}</p>
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <span>Şikayət ID: {complaint.id}</span>
                        <span>Tarix: {complaint.date}</span>
                        <div className="flex items-center space-x-2">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                          </svg>
                          <span>{complaint.likes}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                          </svg>
                          <span>{complaint.comments}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyComplaints;
