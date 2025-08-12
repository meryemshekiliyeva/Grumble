import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import StarRating from './StarRating';

const ReviewForm = ({ companyName, onSubmit }) => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    rating: 0,
    title: '',
    review: '',
    photo: null,
    phone: '',
    agreeToTerms: false
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleRatingChange = (rating) => {
    setFormData(prev => ({
      ...prev,
      rating
    }));
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        photo: file
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    if (formData.rating === 0) {
      alert('Zəhmət olmasa reytinq seçin');
      return;
    }

    if (!formData.title.trim()) {
      alert('Şirkətin adını daxil edin');
      return;
    }

    if (formData.review.length < 100) {
      alert('Rəy minimum 100 simvol olmalıdır');
      return;
    }

    if (!formData.agreeToTerms) {
      alert('Şirkətə nömrənin təqdim olunmasına etiraz etmirəm seçimini işarələyin');
      return;
    }

    setLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setSuccess(true);
      
      // Reset form after success
      setTimeout(() => {
        setFormData({
          rating: 0,
          title: '',
          review: '',
          photo: null,
          phone: '',
          agreeToTerms: false
        });
        setSuccess(false);
        if (onSubmit) onSubmit(formData);
      }, 3000);

    } catch (error) {
      alert('Rəy göndərilmədi. Yenidən cəhd edin.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
        <div className="text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Rəyiniz göndərildi!</h3>
          <p className="text-gray-600">Təşəkkür edirik. Rəyiniz yoxlanıldıqdan sonra dərc ediləcək.</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 relative">
        <div className="absolute inset-0 bg-gray-50 bg-opacity-90 rounded-lg flex items-center justify-center z-10">
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Rəy yazmaq üçün daxil olun</h3>
            <p className="text-gray-600 mb-4">Şirkət haqqında rəy yazmaq üçün hesabınıza daxil olmalısınız</p>
            <button
              onClick={() => navigate('/login')}
              className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
            >
              Daxil ol
            </button>
          </div>
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-6 opacity-30">Rəy bildir</h3>
        <div className="opacity-30 pointer-events-none">
          <div className="space-y-6">
            <div className="h-10 bg-gray-200 rounded"></div>
            <div className="h-8 bg-gray-200 rounded"></div>
            <div className="h-32 bg-gray-200 rounded"></div>
            <div className="h-20 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h3 className="text-xl font-semibold text-gray-900 mb-6">Rəy bildir</h3>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Company Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Şirkətin adı*
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            placeholder={companyName || "CityNet"}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            required
          />
        </div>

        {/* Rating */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Reytinqi seç*
          </label>
          <div className="flex items-center space-x-2">
            <StarRating 
              rating={formData.rating}
              onRatingChange={handleRatingChange}
              size="lg"
            />
            <span className="text-lg font-medium text-gray-700">
              {formData.rating}/5
            </span>
            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        </div>

        {/* Review Text */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Rəyini bildir*
          </label>
          <textarea
            name="review"
            value={formData.review}
            onChange={handleInputChange}
            placeholder="Minimum 100 simvol"
            rows={6}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
            required
          />
          <div className="text-right text-sm text-gray-500 mt-1">
            {formData.review.length}/100 minimum
          </div>
        </div>

        {/* Photo Upload */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Foto yüklə
          </label>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
            <input
              type="file"
              accept="image/*"
              onChange={handlePhotoUpload}
              className="hidden"
              id="photo-upload"
            />
            <label htmlFor="photo-upload" className="cursor-pointer">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </div>
              <span className="text-blue-600 font-medium">Yükləmək üçün seç</span>
              {formData.photo && (
                <p className="text-sm text-gray-600 mt-1">{formData.photo.name}</p>
              )}
            </label>
          </div>
        </div>

        {/* Phone Number */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Əlaqə nömrəsi (Məxfi saxlanılır)
          </label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            placeholder="+994512292505"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>

        {/* Terms Agreement */}
        <div className="flex items-start space-x-2">
          <input
            type="checkbox"
            name="agreeToTerms"
            checked={formData.agreeToTerms}
            onChange={handleInputChange}
            className="mt-1 h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
            required
          />
          <label className="text-sm text-gray-700">
            Şirkətə nömrənin təqdim olunmasına etiraz etmirəm
          </label>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-primary text-white py-3 px-4 rounded-lg font-medium hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Göndərilir...' : 'Göndər'}
        </button>
      </form>
    </div>
  );
};

export default ReviewForm;
