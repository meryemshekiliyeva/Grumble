import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import StarRating from '../components/StarRating';

const NewComplaint = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const [searchParams] = useSearchParams();
  const [showSuccess, setShowSuccess] = useState(false);
  const [complaintId, setComplaintId] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    company: '',
    customCompany: '',
    category: '',
    summary: '',
    rating: 0,
    attachments: null
  });

  // Pre-fill form data from URL parameters
  useEffect(() => {
    const companyParam = searchParams.get('company');
    const categoryParam = searchParams.get('category');

    if (companyParam || categoryParam) {
      setFormData(prev => ({
        ...prev,
        company: companyParam === 'digər' ? 'digər' : companyParam || prev.company,
        customCompany: companyParam && companyParam !== 'digər' ? companyParam : prev.customCompany,
        category: categoryParam || prev.category
      }));
    }
  }, [searchParams]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value
    });
  };

  const handleRatingChange = (rating) => {
    setFormData({
      ...formData,
      rating
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    console.log('New complaint:', formData);

    // Generate a random complaint ID
    const newComplaintId = 'SK' + Math.random().toString(36).substr(2, 9).toUpperCase();
    setComplaintId(newComplaintId);

    // Save complaint to localStorage (simulate database)
    const complaint = {
      id: newComplaintId,
      ...formData,
      company: formData.company === 'digər' ? formData.customCompany : formData.company,
      author: user.name,
      authorEmail: user.email,
      date: new Date().toLocaleDateString('az-AZ'),
      status: 'pending',
      likes: 0,
      comments: 0
    };

    const existingComplaints = JSON.parse(localStorage.getItem('userComplaints') || '[]');
    existingComplaints.push(complaint);
    localStorage.setItem('userComplaints', JSON.stringify(existingComplaints));

    setShowSuccess(true);
  };

  const categories = [
    'Telekommunikasiya', 'Bank və Maliyyə', 'Yemək Çatdırılması', 'Nəqliyyat',
    'Kommunal Xidmətlər', 'E-ticarət', 'Havayolu', 'Dövlət Xidmətləri',
    'Sığorta', 'Təhsil', 'Səhiyyə', 'Turizm', 'Texnologiya'
  ];

  const companiesByCategory = {
    'Telekommunikasiya': [
      { name: 'Azercell', id: 'azercell' },
      { name: 'Bakcell', id: 'bakcell' },
      { name: 'Nar', id: 'nar' },
      { name: 'CityNet', id: 'citynet' }
    ],
    'Bank və Maliyyə': [
      { name: 'JPMorgan Chase', id: 'jpmorgan-chase' },
      { name: 'Kapital Bank', id: 'kapital-bank' },
      { name: 'Pasha Bank', id: 'pasha-bank' },
      { name: 'Unibank', id: 'unibank' },
      { name: 'Bank of Baku', id: 'bank-of-baku' },
      { name: 'AccessBank', id: 'accessbank' }
    ],
    'Yemək Çatdırılması': [
      { name: 'Wolt', id: 'wolt' },
      { name: 'Bolt Food', id: 'bolt-food' },
      { name: 'Glovo', id: 'glovo' }
    ],
    'Kommunal Xidmətlər': [
      { name: 'Azersu', id: 'azersu' },
      { name: 'Azerishiq', id: 'azerishiq' },
      { name: 'Azerigas', id: 'azerigas' }
    ],
    'E-ticarət': [
      { name: 'Trendyol', id: 'trendyol' },
      { name: 'Kontakt Home', id: 'kontakt-home' },
      { name: 'Irshad', id: 'irshad' }
    ],
    'Nəqliyyat': [
      { name: 'Bolt', id: 'bolt' },
      { name: 'BiP', id: 'bip' },
      { name: 'AZAL', id: 'azal' }
    ],
    'Havayolu': [
      { name: 'Emirates', id: 'emirates' },
      { name: 'Lufthansa', id: 'lufthansa' },
      { name: 'Delta Air Lines', id: 'delta-air-lines' }
    ],
    'Sığorta': [
      { name: 'Allianz', id: 'allianz' },
      { name: 'AXA', id: 'axa' },
      { name: 'Prudential', id: 'prudential' }
    ]
  };

  if (showSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
          <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Rəyiniz Qəbul Edildi!</h2>
          <p className="text-gray-600 mb-6">
            Rəyiniz uğurla göndərildi və şirkət tərəfindən görüləcək.
          </p>
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <p className="text-sm text-gray-500 mb-1">Rəy Nömrəsi:</p>
            <p className="text-lg font-bold text-blue-600">{complaintId}</p>
          </div>
          <div className="space-y-3">
            <Link
              to="/my-complaints"
              className="block w-full px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200"
            >
              Rəylərimə Bax
            </Link>
            <Link
              to="/"
              className="block w-full px-4 py-2 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 transition-colors duration-200"
            >
              Ana Səhifəyə Qayıt
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-pink-500 rounded-2xl flex items-center justify-center">
              <svg
                className="w-8 h-8 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
          <h1 className="text-4xl font-black text-gray-900 mb-4 az-text">
            Rəyini Bildir
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto az-text">
            Təcrübənizi paylaşın və şirkətlər haqqında rəyinizi bildirin. Rəyiniz digər istifadəçilərə kömək edəcək.
          </p>
        </div>

        {/* Form */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-8">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Title */}
            <div>
              <label htmlFor="title" className="block text-sm font-semibold text-gray-700 mb-2 az-text">
                Rəy Başlığı *
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white/50 backdrop-blur-sm az-text"
                placeholder="məs., Səhv yemək çatdırılması və gec çatdırılma"
                required
              />
            </div>

            {/* Rating Section */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2 az-text">
                Şirkəti Qiymətləndirin *
              </label>
              <div className="flex items-center space-x-2">
                <StarRating
                  rating={formData.rating}
                  onRatingChange={handleRatingChange}
                  size="lg"
                />
                <span className="ml-3 text-sm text-gray-600 az-text">
                  {formData.rating > 0 ? `${formData.rating}/5` : 'Reytinq seçin'}
                </span>
              </div>
              <p className="mt-2 text-xs text-gray-500 az-text">
                Şirkətin ümumi xidmət keyfiyyətini qiymətləndirin
              </p>
            </div>

            {/* Category Selection */}
            <div>
              <label htmlFor="category" className="block text-sm font-semibold text-gray-700 mb-2 az-text">
                Kateqoriya *
              </label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white/50 backdrop-blur-sm az-text"
                required
              >
                <option value="">Kateqoriya seçin</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            {/* Company Selection */}
            {formData.category && (
              <div>
                <label htmlFor="company" className="block text-sm font-semibold text-gray-700 mb-2 az-text">
                  Şirkət Adı *
                </label>
                <select
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white/50 backdrop-blur-sm az-text"
                  required
                >
                  <option value="">Şirkət seçin</option>
                  {companiesByCategory[formData.category]?.map((company) => (
                    <option key={company.id} value={company.name}>
                      {company.name}
                    </option>
                  ))}
                  <option value="digər">Digər (siyahıda yoxdur)</option>
                </select>
              </div>
            )}

            {/* Custom Company Name */}
            {formData.company === 'digər' && (
              <div>
                <label htmlFor="customCompany" className="block text-sm font-semibold text-gray-700 mb-2 az-text">
                  Şirkət Adını Yazın *
                </label>
                <input
                  type="text"
                  id="customCompany"
                  name="customCompany"
                  value={formData.customCompany}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white/50 backdrop-blur-sm az-text"
                  placeholder="Şirkət adını daxil edin"
                  required
                />
              </div>
            )}



            {/* Summary */}
            <div>
              <label htmlFor="summary" className="block text-sm font-semibold text-gray-700 mb-2 az-text">
                Rəy Məzmunu *
              </label>
              <textarea
                id="summary"
                name="summary"
                rows="6"
                value={formData.summary}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white/50 backdrop-blur-sm az-text resize-none"
                placeholder="Problemin ətraflı təsvirini yazın. Nə baş verdi, nə vaxt baş verdi və nə gözləyirsiniz? Mümkün qədər ətraflı yazın ki, şirkət problemi daha yaxşı başa düşsün."
                required
              />
              <p className="mt-2 text-xs text-gray-500 az-text">
                Minimum 50 simvol. Şəxsi məlumatlarınızı (telefon, ünvan) yazmayın.
              </p>
            </div>

            {/* File Upload */}
            <div>
              <label htmlFor="attachments" className="block text-sm font-semibold text-gray-700 mb-2 az-text">
                Sənəd Əlavə Et (İstəyə bağlı)
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-gray-400 transition-colors duration-200">
                <input
                  type="file"
                  id="attachments"
                  name="attachments"
                  onChange={handleChange}
                  className="hidden"
                  accept="image/*,.pdf,.doc,.docx"
                />
                <label htmlFor="attachments" className="cursor-pointer">
                  <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                    <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <div className="mt-4">
                    <p className="text-sm font-medium text-gray-900 az-text">Faylı seçin və ya buraya sürükləyin</p>
                    <p className="text-xs text-gray-500 az-text">PNG, JPG, PDF, DOC (maksimum 10MB)</p>
                  </div>
                </label>
              </div>
            </div>

            {/* Tips */}
            <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
              <h3 className="text-sm font-semibold text-blue-900 mb-3 az-text">💡 Effektiv rəy üçün tövsiyələr:</h3>
              <ul className="text-sm text-blue-800 space-y-2">
                <li className="flex items-start az-text">
                  <span className="text-blue-500 mr-2">•</span>
                  Hadisənin tarixini və vaxtını qeyd edin
                </li>
                <li className="flex items-start az-text">
                  <span className="text-blue-500 mr-2">•</span>
                  Sifariş nömrəsi və ya referans kodunu əlavə edin
                </li>
                <li className="flex items-start az-text">
                  <span className="text-blue-500 mr-2">•</span>
                  Problemin həllini necə gözlədiyinizi yazın
                </li>
                <li className="flex items-start az-text">
                  <span className="text-blue-500 mr-2">•</span>
                  Sənədlərin şəklini əlavə edin (çek, ekran görüntüsü)
                </li>
              </ul>
            </div>

            {/* Submit Button */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                type="submit"
                className="px-8 py-3 text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 az-text"
              >
                Şikayət Göndər
              </button>
              <Link
                to="/"
                className="px-8 py-3 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-xl font-semibold transition-all duration-200 text-center az-text"
              >
                Ləğv Et
              </Link>
            </div>
          </form>
        </div>

        {/* Info Cards */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/20 text-center">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2 az-text">Pulsuz Xidmət</h3>
            <p className="text-sm text-gray-600 az-text">Rəy bildirmək tamamilə pulsuzdur</p>
          </div>

          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/20 text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2 az-text">Sürətli Cavab</h3>
            <p className="text-sm text-gray-600 az-text">24-48 saat ərzində cavab alırsınız</p>
          </div>

          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/20 text-center">
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2 az-text">Həll Təminatı</h3>
            <p className="text-sm text-gray-600 az-text">Problemlərinizin həlli üçün çalışırıq</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewComplaint;