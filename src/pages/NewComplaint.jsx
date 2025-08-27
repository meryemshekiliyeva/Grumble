import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useNotifications } from '../contexts/NotificationContext';
import StarRating from '../components/StarRating';

const NewComplaint = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const { addNotificationToUser } = useNotifications();
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
  const [companies, setCompanies] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load companies and categories
  useEffect(() => {
    // Mock categories data
    const mockCategories = [
      { _id: 'cat1', name: 'Havayolu', icon: '✈️', color: 'blue' },
      { _id: 'cat2', name: 'Bank və Maliyyə', icon: '🏦', color: 'green' },
      { _id: 'cat3', name: 'Telekommunikasiya', icon: '📱', color: 'purple' },
      { _id: 'cat4', name: 'E-ticarət', icon: '🛒', color: 'orange' },
      { _id: 'cat5', name: 'Yemək Çatdırılması', icon: '🍕', color: 'red' },
      { _id: 'cat6', name: 'Nəqliyyat', icon: '🚗', color: 'yellow' }
    ];

    // Mock companies data - using email as ID to match login credentials
    const mockCompanies = [
      { _id: 'emirates@airline.com', companyName: 'Emirates', category: 'Havayolu' },
      { _id: 'lufthansa@airline.com', companyName: 'Lufthansa', category: 'Havayolu' },
      { _id: 'delta@airline.com', companyName: 'Delta Air Lines', category: 'Havayolu' },
      { _id: 'hsbc@bank.com', companyName: 'HSBC', category: 'Bank və Maliyyə' },
      { _id: 'jpmorgan@bank.com', companyName: 'JPMorgan Chase', category: 'Bank və Maliyyə' },
      { _id: 'goldman@bank.com', companyName: 'Goldman Sachs', category: 'Bank və Maliyyə' },
      { _id: 'amazon@ecommerce.com', companyName: 'Amazon', category: 'E-ticarət' },
      { _id: 'ebay@ecommerce.com', companyName: 'eBay', category: 'E-ticarət' },
      { _id: 'ubereats@food.com', companyName: 'Uber Eats', category: 'Yemək Çatdırılması' },
      { _id: 'doordash@food.com', companyName: 'DoorDash', category: 'Yemək Çatdırılması' }
    ];

    setCategories(mockCategories);
    setCompanies(mockCompanies);
    setIsLoading(false);
  }, []);

  // Pre-fill form data from URL parameters
  useEffect(() => {
    const companyParam = searchParams.get('company');
    const categoryParam = searchParams.get('category');

    if (companyParam || categoryParam) {
      // Find company by name
      const foundCompany = companies.find(comp => comp.companyName === companyParam);
      const foundCategory = categories.find(cat => cat.name === categoryParam);

      setFormData(prev => ({
        ...prev,
        company: foundCompany ? foundCompany._id : (companyParam === 'digər' ? 'digər' : prev.company),
        customCompany: (!foundCompany && companyParam && companyParam !== 'digər') ? companyParam : prev.customCompany,
        category: foundCategory ? foundCategory._id : prev.category
      }));
    }
  }, [searchParams, companies, categories]);

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

  // Helper function to get company key for localStorage
  const getCompanyKey = (companyName) => {
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
    return companyMap[companyName] || companyName.toLowerCase().replace(/\s+/g, '-');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    // Basic validation
    if (!formData.title || !formData.company || !formData.category || !formData.summary) {
      alert('Zəhmət olmasa bütün məcburi sahələri doldurun');
      return;
    }

    // Generate a random complaint ID
    const newComplaintId = 'SK' + Math.random().toString(36).substr(2, 9).toUpperCase();

    // Get company and category names
    const selectedCategory = categories.find(cat => cat._id === formData.category);
    const selectedCompany = companies.find(comp => comp._id === formData.company);

    // Get company and category names
    const companyName = formData.company === 'digər' ? formData.customCompany : selectedCompany?.companyName;
    const categoryName = selectedCategory?.name;

    // Create complaint object for company dashboard (detailed format)
    const companyComplaint = {
      _id: newComplaintId,
      title: formData.title,
      description: formData.summary,
      company: {
        _id: formData.company,
        companyName: companyName
      },
      category: {
        _id: formData.category,
        name: categoryName
      },
      user: {
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email
      },
      status: 'pending',
      createdAt: new Date().toISOString(),
      responses: []
    };

    // Create complaint object for user pages (simplified format)
    const userComplaint = {
      id: newComplaintId,
      title: formData.title,
      company: companyName,
      category: categoryName.toLowerCase(),
      author: `${user.firstName} ${user.lastName}`,
      authorEmail: user.email,
      date: new Date().toLocaleDateString('az-AZ'),
      summary: formData.summary,
      status: 'pending',
      rating: formData.rating || 1,
      likes: 0,
      comments: 0,
      timestamp: new Date().toISOString()
    };

    // 1. Save to company complaints (for company dashboard)
    const existingCompanyComplaints = JSON.parse(localStorage.getItem('companyComplaints') || '{}');
    const companyId = formData.company;

    if (!existingCompanyComplaints[companyId]) {
      existingCompanyComplaints[companyId] = [];
    }

    existingCompanyComplaints[companyId].unshift(companyComplaint);
    localStorage.setItem('companyComplaints', JSON.stringify(existingCompanyComplaints));

    // 2. Save to user complaints (for MyComplaints page)
    const existingUserComplaints = JSON.parse(localStorage.getItem('userComplaints') || '[]');
    existingUserComplaints.unshift(userComplaint);
    localStorage.setItem('userComplaints', JSON.stringify(existingUserComplaints));

    // 3. Save to all complaints (for Complaints page)
    const allComplaints = JSON.parse(localStorage.getItem('allComplaints') || '[]');
    allComplaints.unshift(userComplaint);
    localStorage.setItem('allComplaints', JSON.stringify(allComplaints));

    // 4. Save to company reviews (for CompanyDetailPage)
    const companyReviews = JSON.parse(localStorage.getItem('companyReviews') || '{}');
    const companyKey = companyName?.toLowerCase().replace(/\s+/g, '-') || 'unknown';

    if (!companyReviews[companyKey]) {
      companyReviews[companyKey] = [];
    }

    companyReviews[companyKey].unshift(userComplaint);
    localStorage.setItem('companyReviews', JSON.stringify(companyReviews));

    // 5. Create notifications for both user and company

    // Notification for the user (complaint submitted confirmation)
    addNotificationToUser(user.email, {
      type: 'complaint_submitted',
      title: 'Şikayətiniz Qəbul Edildi',
      message: `${companyName} şirkəti haqqında şikayətiniz uğurla göndərildi. Şikayət nömrəsi: ${newComplaintId}`,
      relatedComplaintId: newComplaintId,
      companyName: companyName
    });

    // Notification for the company (new complaint received)
    addNotificationToUser(companyId, {
      type: 'new_complaint',
      title: 'Yeni Şikayət Alındı',
      message: `${user.firstName} ${user.lastName} tərəfindən yeni şikayət göndərildi: "${formData.title}"`,
      relatedComplaintId: newComplaintId,
      customerName: `${user.firstName} ${user.lastName}`,
      customerEmail: user.email
    });

    setComplaintId(newComplaintId);
    setShowSuccess(true);

    // Reset form
    setFormData({
      title: '',
      company: '',
      customCompany: '',
      category: '',
      summary: '',
      rating: 0,
      attachments: null
    });
  };

  // Get companies for selected category
  const getCompaniesForCategory = () => {
    if (!formData.category) return [];
    // Find the selected category object
    const selectedCategory = categories.find(cat => cat._id === formData.category);
    if (!selectedCategory) return [];

    // Filter companies by category name
    return companies.filter(company => company.category === selectedCategory.name);
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
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Şikayətiniz Qəbul Edildi!</h2>
          <p className="text-gray-600 mb-6">
            Şikayətiniz uğurla göndərildi və şirkət tərəfindən görüləcək.
          </p>
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <p className="text-sm text-gray-500 mb-1">Şikayət Nömrəsi:</p>
            <p className="text-lg font-bold text-blue-600">{complaintId}</p>
          </div>
          <div className="space-y-3">
            <Link
              to="/my-complaints"
              className="block w-full px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200"
            >
              Şikayətlərimə Bax
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
            Şikayət Yaz
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto az-text">
            Təcrübənizi paylaşın və şirkətlər haqqında şikayətinizi bildirin. Şikayətiniz digər istifadəçilərə kömək edəcək.
          </p>
        </div>

        {/* Form */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-8">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Title */}
            <div>
              <label htmlFor="title" className="block text-sm font-semibold text-gray-700 mb-2 az-text">
                Şikayət Başlığı *
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
                  <option key={category._id} value={category._id}>
                    {category.name}
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
                  {getCompaniesForCategory().map((company) => (
                    <option key={company._id} value={company._id}>
                      {company.companyName}
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
                Şikayət Məzmunu *
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
              <h3 className="text-sm font-semibold text-blue-900 mb-3 az-text">💡 Effektiv şikayət üçün tövsiyələr:</h3>
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
            <p className="text-sm text-gray-600 az-text">Şikayət bildirmək tamamilə pulsuzdur</p>
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