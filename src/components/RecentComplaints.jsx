import React, { useState, useEffect } from 'react';
import { formatDateAz } from '../utils/dateUtils';
import { getStatusConfig } from '../utils/statusConfig';

const RecentComplaints = ({ companyName }) => {
  const [recentComplaints, setRecentComplaints] = useState([]);

  useEffect(() => {
    const loadRecentComplaints = () => {
      // Get company key for localStorage
      const getCompanyKey = (name) => {
        const companyMap = {
          'JPMorgan Chase': 'jpmorgan-chase',
          'HSBC': 'hsbc',
          'Goldman Sachs': 'goldman-sachs',
          'Emirates': 'emirates',
          'AT&T': 'att',
          'Vodafone': 'vodafone',
          'T-Mobile': 't-mobile',
          'Uber Eats': 'uber-eats',
          'DoorDash': 'doordash',
          'Deliveroo': 'deliveroo',
          'Lufthansa': 'lufthansa',
          'Delta Air Lines': 'delta-air-lines',
          'EDF Energy': 'edf-energy',
          'National Grid': 'national-grid',
          'Veolia': 'veolia',
          'Allianz': 'allianz',
          'AXA': 'axa',
          'Prudential': 'prudential',
          'Amazon': 'amazon',
          'Alibaba': 'alibaba',
          'eBay': 'ebay'
        };
        return companyMap[name] || name.toLowerCase().replace(/\s+/g, '-');
      };

      // Load from localStorage
      const companyReviews = JSON.parse(localStorage.getItem('companyReviews') || '{}');
      const companyKey = getCompanyKey(companyName);
      const complaints = companyReviews[companyKey] || [];

      // Sort by date (newest first) and take only the last 5
      const sortedComplaints = complaints
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .slice(0, 5);

      setRecentComplaints(sortedComplaints);
    };

    if (companyName) {
      loadRecentComplaints();
    }
  }, [companyName]);

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <span
        key={index}
        className={`text-lg ${
          index < rating ? 'text-yellow-400' : 'text-gray-300'
        }`}
      >
        ★
      </span>
    ));
  };

  if (recentComplaints.length === 0) {
    return (
      <div className="text-center py-8">
        <div className="text-gray-400 text-6xl mb-4">📝</div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">Hələ şikayət yoxdur</h3>
        <p className="text-gray-500">Bu şirkət haqqında ilk şikayəti siz yazın!</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {recentComplaints.map((complaint) => {
        const statusConfig = getStatusConfig(complaint.status);
        
        return (
          <div
            key={complaint.id}
            className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow duration-200"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 font-semibold text-sm">
                    {complaint.author.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">{complaint.author}</h4>
                  <div className="flex items-center space-x-2">
                    <div className="flex">{renderStars(complaint.rating)}</div>
                    <span className="text-sm text-gray-500">
                      {formatDateAz(complaint.date)}
                    </span>
                  </div>
                </div>
              </div>
              <span
                className={`px-2 py-1 rounded-full text-xs font-medium ${statusConfig.bgColor} ${statusConfig.textColor}`}
              >
                {statusConfig.label}
              </span>
            </div>

            <p className="text-gray-700 mb-3 line-clamp-3">{complaint.review}</p>

            {complaint.companyResponse && (
              <div className="bg-blue-50 border-l-4 border-blue-400 p-3 mt-3">
                <div className="flex items-center mb-2">
                  <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center mr-2">
                    <span className="text-white text-xs font-bold">
                      {companyName.charAt(0)}
                    </span>
                  </div>
                  <span className="font-medium text-blue-900">{companyName}</span>
                  <span className="text-blue-600 text-sm ml-2">cavab verdi</span>
                </div>
                <p className="text-blue-800 text-sm">{complaint.companyResponse}</p>
              </div>
            )}
          </div>
        );
      })}

      {recentComplaints.length >= 5 && (
        <div className="text-center pt-4">
          <button className="text-blue-600 hover:text-blue-800 font-medium text-sm">
            Daha çox şikayət gör →
          </button>
        </div>
      )}
    </div>
  );
};

export default RecentComplaints;
