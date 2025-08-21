import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import ReviewForm from '../components/ReviewForm';

const ReviewPage = () => {
  const { companyId } = useParams();
  const navigate = useNavigate();

  // Company data - in real app this would come from API
  const companies = {
    'kapital-bank': {
      name: 'Kapital Bank',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Kapital_Bank_logo.svg/200px-Kapital_Bank_logo.svg.png',
      category: 'Banklər',
      categoryId: 'banklar'
    },
    'citynet': {
      name: 'CityNet',
      logo: 'https://citynet.az/assets/images/logo.png',
      category: 'İnternet Provayderlər',
      categoryId: 'internet-provayderler'
    },
    'wolt': {
      name: 'Wolt',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Wolt_logo.svg/200px-Wolt_logo.svg.png',
      category: 'Yemək Çatdırılması',
      categoryId: 'yemek-catdirilmasi'
    },
    'trendyol': {
      name: 'Trendyol',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/Trendyol_logo.svg/200px-Trendyol_logo.svg.png',
      category: 'E-ticarət',
      categoryId: 'e-ticaret'
    },
    'bolt': {
      name: 'Bolt',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e9/Bolt_logo.svg/200px-Bolt_logo.svg.png',
      category: 'Yemək Çatdırılması',
      categoryId: 'yemek-catdirilmasi'
    },
    'yango': {
      name: 'Yango',
      logo: 'https://yango.com/images/logo.png',
      category: 'Yemək Çatdırılması',
      categoryId: 'yemek-catdirilmasi'
    },
    'fooderos': {
      name: 'Fooderos',
      logo: 'https://fooderos.az/images/logo.png',
      category: 'Yemək Çatdırılması',
      categoryId: 'yemek-catdirilmasi'
    }
  };

  const company = companies[companyId];

  if (!company) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Şirkət tapılmadı</h1>
          <Link to="/" className="text-blue-600 hover:text-blue-800">
            Ana səhifəyə qayıt
          </Link>
        </div>
      </div>
    );
  }

  const handleReviewSubmit = (reviewData) => {
    console.log('Review submitted:', reviewData);
    // Handle review submission
    // Store review in localStorage for now
    const existingReviews = JSON.parse(localStorage.getItem('companyReviews') || '{}');
    if (!existingReviews[companyId]) {
      existingReviews[companyId] = [];
    }
    existingReviews[companyId].push({
      ...reviewData,
      id: Date.now(),
      date: new Date().toISOString(),
      author: 'Current User' // In real app, get from auth context
    });
    localStorage.setItem('companyReviews', JSON.stringify(existingReviews));

    // Redirect to company page
    navigate(`/company/${companyId}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm text-gray-500 mb-6">
          <Link to="/" className="hover:text-gray-700">Ana səhifə</Link>
          <span>/</span>
          <Link to={`/category/${company.categoryId}`} className="hover:text-gray-700">
            {company.category}
          </Link>
          <span>/</span>
          <Link to={`/company/${companyId}`} className="hover:text-gray-700">
            {company.name}
          </Link>
          <span>/</span>
          <span className="text-gray-900">Rəy bildir</span>
        </nav>

        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex items-center space-x-4">
            <img
              src={company.logo}
              alt={company.name}
              className="w-16 h-16 object-contain rounded-lg border border-gray-200"
            />
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{company.name}</h1>
              <p className="text-gray-600">{company.category}</p>
            </div>
          </div>
        </div>

        {/* Review Form */}
        <ReviewForm 
          companyName={company.name} 
          onSubmit={handleReviewSubmit}
        />

        {/* Back Button */}
        <div className="mt-6 text-center">
          <Link
            to={`/company/${companyId}`}
            className="inline-flex items-center px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Şirkət səhifəsinə qayıt
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ReviewPage;
