import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const CompanyPage = () => {
  const { companyId } = useParams();
  const { user, isAuthenticated } = useAuth();
  const [reviews, setReviews] = useState([]);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [newReview, setNewReview] = useState({
    rating: 5,
    comment: ''
  });

  // Company data - same as CompanyDetailPage
  const companies = {
    'kapital-bank': {
      name: 'Kapital Bank',
      logo: 'KB',
      rating: 3.5,
      totalReviews: 139,
      website: 'www.kapitalbank.az',
      category: 'Banklar',
      description: 'Kapital Bank Azərbaycanın ən böyük istehlaklı banklarından biridir. Hazırda Kapital Bank ölkədə ən böyük xidmət şəbəkəsinə malik maliyyə qurumudur. Kapital Bankın təqdim etdiyi xidmətlər, kredit, əlaqə, komissiya, filiallər, qaynar xətt, iş saatları, müştəri təcrübəsi haqqında burada!',
      stats: {
        responseRate: 91,
        resolvedRate: 6,
        customerLoyalty: 7
      },
      views: 143077,
      socialLinks: {
        website: 'https://kapitalbank.az',
        facebook: 'https://facebook.com/kapitalbank',
        instagram: 'https://instagram.com/kapitalbank',
        linkedin: 'https://linkedin.com/company/kapitalbank'
      }
    }
  };

  const company = companies[companyId] || companies['kapital-bank'];

  useEffect(() => {
    // Load reviews from localStorage
    const existingReviews = JSON.parse(localStorage.getItem('companyReviews') || '{}');
    if (existingReviews[companyId]) {
      setReviews(existingReviews[companyId]);
    } else {
      // Load mock reviews
      const mockReviews = [
        {
          id: 1,
          author: 'Əli Məmmədov',
          email: 'ali@example.com',
          rating: 4,
          review: 'Xidmət yaxşıdır, lakin gözləmə müddəti uzundur.',
          date: '2024-01-15T10:30:00Z',
          status: 'pending',
          companyResponse: null
        },
        {
          id: 2,
          author: 'Leyla Həsənova',
          email: 'leyla@example.com',
          rating: 5,
          review: 'Əla xidmət! Çox məmnunam.',
          date: '2024-01-14T14:20:00Z',
          status: 'responded',
          companyResponse: {
            message: 'Təşəkkür edirik! Sizə xidmət etməkdən məmnunuq.',
            date: '2024-01-14T16:30:00Z'
          }
        },
        {
          id: 3,
          author: 'Rəşad Quliyev',
          email: 'rashad@example.com',
          rating: 3,
          review: 'Orta səviyyədə xidmət.',
          date: '2024-01-13T09:15:00Z',
          status: 'pending',
          companyResponse: null
        }
      ];
      setReviews(mockReviews);
    }
  }, [companyId]);

  const handleSubmitReview = (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      alert('Rəy yazmaq üçün giriş etməlisiniz');
      return;
    }

    const review = {
      id: Date.now(),
      author: `${user.firstName} ${user.lastName}` || user.name || 'İstifadəçi',
      email: user.email,
      rating: newReview.rating,
      review: newReview.comment,
      date: new Date().toISOString(),
      status: 'pending',
      companyResponse: null
    };

    const updatedReviews = [review, ...reviews];
    setReviews(updatedReviews);

    // Save to localStorage
    const existingReviews = JSON.parse(localStorage.getItem('companyReviews') || '{}');
    existingReviews[companyId] = updatedReviews;
    localStorage.setItem('companyReviews', JSON.stringify(existingReviews));

    // Reset form
    setNewReview({ rating: 5, comment: '' });
    setShowReviewForm(false);
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span key={i} className={`text-lg ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`}>
        ⭐
      </span>
    ));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header matching the design */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-4">
          {/* Breadcrumb */}
          <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-4">
            <Link to="/" className="hover:text-blue-600">Ana səhifə</Link>
            <span>/</span>
            <Link to="/companies" className="hover:text-blue-600">Banklar</Link>
            <span>/</span>
            <span className="text-gray-900">{company.name}</span>
          </nav>

          {/* Company Header */}
          <div className="flex items-start space-x-6">
            {/* Company Logo */}
            <div className="w-20 h-20 bg-blue-600 rounded-lg flex items-center justify-center text-white text-2xl font-bold flex-shrink-0">
              {company.logo}
            </div>

            {/* Company Info */}
            <div className="flex-1">
              <div className="flex items-center space-x-3 mb-2">
                <h1 className="text-2xl font-bold text-gray-900">{company.name}</h1>
                <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>

              {/* Rating */}
              <div className="flex items-center space-x-4 mb-2">
                <div className="flex items-center">
                  {renderStars(Math.floor(company.rating))}
                  <span className="ml-2 text-lg font-semibold text-gray-900">{company.rating}/5</span>
                </div>
                <span className="text-gray-600">Müştərin sayı: {company.totalReviews}</span>
                <a 
                  href={`https://${company.website}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  {company.website}
                </a>
              </div>

              {/* Stats */}
              <div className="flex items-center space-x-6 text-sm">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-gray-600">{company.stats.responseRate}% Cavab vermə faizi</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <span className="text-gray-600">{company.stats.resolvedRate}% Həll olunmuş şikayətlər</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <span className="text-gray-600">{company.stats.customerLoyalty}% Müştəri loyallığı</span>
                </div>
              </div>

              {/* View count */}
              <div className="mt-2 text-sm text-gray-500">
                <span>📊 {company.views.toLocaleString()} baxış</span>
              </div>
            </div>

            {/* Action Button */}
            <div className="flex-shrink-0">
              <button
                onClick={() => setShowReviewForm(true)}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Yeni Şikayət
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Company Description */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Şirkət haqqında</h2>
              <p className="text-gray-700 leading-relaxed">{company.description}</p>
              
              {/* Social Links */}
              <div className="mt-6">
                <h3 className="text-lg font-medium text-gray-900 mb-3">Əlaqə</h3>
                <div className="flex space-x-4">
                  {company.socialLinks.website && (
                    <a href={company.socialLinks.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M4.083 9h1.946c.089-1.546.383-2.97.837-4.118A6.004 6.004 0 004.083 9zM10 2a8 8 0 100 16 8 8 0 000-16zm0 2c-.076 0-.232.032-.465.262-.238.234-.497.623-.737 1.182-.389.907-.673 2.142-.766 3.556h3.936c-.093-1.414-.377-2.649-.766-3.556-.24-.559-.499-.948-.737-1.182C10.232 4.032 10.076 4 10 4zm3.971 5c-.089-1.546-.383-2.97-.837-4.118A6.004 6.004 0 0115.917 9h-1.946zm-2.003 2H8.032c.093 1.414.377 2.649.766 3.556.24.559.499.948.737 1.182.233.23.389.262.465.262.076 0 .232-.032.465-.262.238-.234.497-.623.737-1.182.389-.907.673-2.142.766-3.556zm1.166 4.118c.454-1.147.748-2.572.837-4.118h1.946a6.004 6.004 0 01-2.783 4.118zm-6.268 0C6.412 13.97 6.118 12.546 6.03 11H4.083a6.004 6.004 0 002.783 4.118z" clipRule="evenodd" />
                      </svg>
                    </a>
                  )}
                  {company.socialLinks.facebook && (
                    <a href={company.socialLinks.facebook} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                      </svg>
                    </a>
                  )}
                  {company.socialLinks.instagram && (
                    <a href={company.socialLinks.instagram} target="_blank" rel="noopener noreferrer" className="text-pink-600 hover:text-pink-800">
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987 6.62 0 11.987-5.367 11.987-11.987C24.014 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.323-1.297C4.198 14.895 3.708 13.744 3.708 12.447s.49-2.448 1.297-3.323c.875-.807 2.026-1.297 3.323-1.297s2.448.49 3.323 1.297c.807.875 1.297 2.026 1.297 3.323s-.49 2.448-1.297 3.323c-.875.807-2.026 1.297-3.323 1.297zm7.718-9.996c-.49 0-.875-.385-.875-.875s.385-.875.875-.875.875.385.875.875-.385.875-.875.875zm-3.718 2.01c-1.297 0-2.448.49-3.323 1.297-.807.875-1.297 2.026-1.297 3.323s.49 2.448 1.297 3.323c.875.807 2.026 1.297 3.323 1.297s2.448-.49 3.323-1.297c.807-.875 1.297-2.026 1.297-3.323s-.49-2.448-1.297-3.323c-.875-.807-2.026-1.297-3.323-1.297z"/>
                      </svg>
                    </a>
                  )}
                  {company.socialLinks.linkedin && (
                    <a href={company.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-700 hover:text-blue-900">
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                      </svg>
                    </a>
                  )}
                </div>
              </div>
            </div>

            {/* Reviews Section */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Rəyini bildir</h2>
                <span className="text-sm text-gray-500">Sual, rəy və ya şikayətinizi paylaşın</span>
              </div>

              {/* Review Form */}
              {showReviewForm && (
                <div className="mb-8 p-6 bg-gray-50 rounded-lg">
                  <form onSubmit={handleSubmitReview}>
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Reytinq
                      </label>
                      <div className="flex space-x-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            type="button"
                            onClick={() => setNewReview(prev => ({ ...prev, rating: star }))}
                            className={`text-2xl ${star <= newReview.rating ? 'text-yellow-400' : 'text-gray-300'} hover:text-yellow-400`}
                          >
                            ⭐
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Rəyiniz
                      </label>
                      <textarea
                        value={newReview.comment}
                        onChange={(e) => setNewReview(prev => ({ ...prev, comment: e.target.value }))}
                        rows={4}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Təcrübənizi bizə danışın..."
                        required
                      />
                    </div>

                    <div className="flex space-x-3">
                      <button
                        type="submit"
                        className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
                      >
                        Rəy Göndər
                      </button>
                      <button
                        type="button"
                        onClick={() => setShowReviewForm(false)}
                        className="bg-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-400"
                      >
                        Ləğv et
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* Reviews List */}
              <div className="space-y-6">
                {reviews.map((review) => (
                  <div key={review.id} className="border-b border-gray-200 pb-6 last:border-b-0">
                    <div className="flex items-start space-x-4">
                      <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-medium">
                        {review.author.charAt(0)}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <span className="font-medium text-gray-900">{review.author}</span>
                          <span className="text-sm text-gray-500">
                            {new Date(review.date).toLocaleDateString('az-AZ')}
                          </span>
                          <div className="flex items-center">
                            {renderStars(review.rating)}
                          </div>
                        </div>
                        <p className="text-gray-700 mb-4">{review.review}</p>

                        {/* Company Response */}
                        {review.companyResponse && (
                          <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-400">
                            <div className="flex items-start space-x-3">
                              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-medium">
                                {company.name.charAt(0)}
                              </div>
                              <div className="flex-1">
                                <div className="flex items-center space-x-2 mb-2">
                                  <span className="font-medium text-blue-900">{company.name}</span>
                                  <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                                    Şirkət Cavabı
                                  </span>
                                  <span className="text-sm text-blue-600">
                                    {new Date(review.companyResponse.date).toLocaleDateString('az-AZ')}
                                  </span>
                                </div>
                                <p className="text-blue-800">
                                  {review.companyResponse.message}
                                </p>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}

                {reviews.length === 0 && (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
                      <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                      </svg>
                    </div>
                    <p className="text-gray-500">Hələ heç bir rəy yazılmayıb</p>
                    <p className="text-gray-400 text-sm">İlk rəyi siz yazın!</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Stats */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Statistikalar</h3>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Ümumi rəylər</span>
                  <span className="font-medium">{company.totalReviews}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Orta reytinq</span>
                  <span className="font-medium">{company.rating}/5</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Cavab nisbəti</span>
                  <span className="font-medium text-green-600">{company.stats.responseRate}%</span>
                </div>
              </div>
            </div>

            {/* Categories */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Kateqoriya</h3>
              <Link 
                to={`/categories/${company.category.toLowerCase()}`}
                className="inline-flex items-center px-3 py-2 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors"
              >
                {company.category}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyPage;
