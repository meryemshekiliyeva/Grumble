import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import ReviewForm from '../components/ReviewForm';
import { updateCompanyRating } from '../utils/companyRating';

const ReviewPage = () => {
  const { companyId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  // Company data - in real app this would come from API
  const companies = {
    'kapital-bank': {
      name: 'Kapital Bank',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Kapital_Bank_logo.svg/200px-Kapital_Bank_logo.svg.png',
      category: 'Banklar',
      categoryId: 'banklar'
    },
    'pasha-bank': {
      name: 'PAŞA Bank',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f4/PASHA_Bank_logo.svg/200px-PASHA_Bank_logo.svg.png',
      category: 'Banklar',
      categoryId: 'banklar'
    },
    'yelo-bank': {
      name: 'Yelo Bank',
      logo: 'https://yelobank.az/images/logo.png',
      category: 'Banklar',
      categoryId: 'banklar'
    },
    'azercell': {
      name: 'Azercell',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Azercell_logo.svg/200px-Azercell_logo.svg.png',
      category: 'Telekommunikasiya',
      categoryId: 'telekommunikasiya'
    },
    'bakcell': {
      name: 'Bakcell',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Bakcell_logo.svg/200px-Bakcell_logo.svg.png',
      category: 'Telekommunikasiya',
      categoryId: 'telekommunikasiya'
    },
    'nar-mobile': {
      name: 'Nar Mobile',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a8/Nar_logo.svg/200px-Nar_logo.svg.png',
      category: 'Telekommunikasiya',
      categoryId: 'telekommunikasiya'
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
    },
    'azal': {
      name: 'AZAL',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/Azerbaijan_Airlines_logo.svg/200px-Azerbaijan_Airlines_logo.svg.png',
      category: 'Havayolu',
      categoryId: 'havayolu'
    },
    'buta-airways': {
      name: 'Buta Airways',
      logo: 'https://butaairways.az/images/logo.png',
      category: 'Havayolu',
      categoryId: 'havayolu'
    },
    'azersu': {
      name: 'Azərsu',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Azersu_logo.svg/200px-Azersu_logo.svg.png',
      category: 'Kommunal Xidmətlər',
      categoryId: 'kommunal'
    },
    'azerishiq': {
      name: 'Azərişıq',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/Azerishiq_logo.svg/200px-Azerishiq_logo.svg.png',
      category: 'Kommunal Xidmətlər',
      categoryId: 'kommunal'
    },
    'bip': {
      name: 'BiP',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/BiP_logo.svg/200px-BiP_logo.svg.png',
      category: 'Nəqliyyat',
      categoryId: 'neqliyyat'
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

    // Create review object
    const newReview = {
      ...reviewData,
      id: Date.now(),
      date: new Date().toISOString(),
      author: user ? `${user.firstName} ${user.lastName}` : 'İstifadəçi'
    };

    // Update company rating and save review
    const newRating = updateCompanyRating(companyId, newReview);
    console.log('New company rating:', newRating);

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
