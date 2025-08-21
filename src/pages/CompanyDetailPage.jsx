import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import StarRating from '../components/StarRating';
import ReviewForm from '../components/ReviewForm';

const CompanyDetailPage = () => {
  const { companyId } = useParams();
  const [userRating, setUserRating] = useState(0);
  const [showRatingForm, setShowRatingForm] = useState(false);

  // Company data
  const companies = {
    'kapital-bank': {
      name: 'Kapital Bank',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Kapital_Bank_logo.svg/200px-Kapital_Bank_logo.svg.png',
      rating: 3.0,
      totalReviews: 139,
      website: 'www.kapitalbank.az',
      category: 'Banklər',
      categoryId: 'banklar',
      description: 'Kapital Bank Azərbaycanın ən böyük istehlaklı banklarından biridir. Hazırda Kapital Bank ölkədə ən böyük xidmət şəbəkəsinə malik maliyyə qurumudur. Kapital Bankın təqdim etdiyi xidmətlər, kredit, əlaqə, komissiya, filiallər, qaynar xətt, iş saatları, müştəri təcrübəsi haqqında burada!',
      stats: {
        positive: 91,
        resolved: 6,
        negative: 7
      },
      views: 143077,
      socialLinks: {
        website: 'https://kapitalbank.az',
        facebook: 'https://facebook.com/kapitalbank',
        instagram: 'https://instagram.com/kapitalbank',
        linkedin: 'https://linkedin.com/company/kapitalbank'
      }
    },
    'pasha-bank': {
      name: 'PAŞA Bank',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f4/PASHA_Bank_logo.svg/200px-PASHA_Bank_logo.svg.png',
      rating: 2.8,
      totalReviews: 8,
      website: 'www.pashabank.az',
      category: 'Banklər',
      categoryId: 'banklar',
      description: 'PAŞA Bank müasir bankçılıq xidmətləri təqdim edən aparıcı maliyyə institutudur.',
      stats: {
        positive: 75,
        resolved: 15,
        negative: 10
      },
      views: 25430
    },
    'birbank': {
      name: 'Birbank',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1f/Birbank_logo.svg/200px-Birbank_logo.svg.png',
      rating: 1.0,
      totalReviews: 1,
      website: 'www.birbank.az',
      category: 'Banklər',
      categoryId: 'banklar',
      description: 'Birbank rəqəmsal bankçılıq həlləri təklif edən innovativ bankdır.',
      stats: {
        positive: 20,
        resolved: 30,
        negative: 50
      },
      views: 5200
    },
    'azercell': {
      name: 'Azercell',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a8/Azercell_logo.svg/200px-Azercell_logo.svg.png',
      rating: 2.5,
      totalReviews: 89,
      website: 'www.azercell.com',
      category: 'Telekom',
      categoryId: 'telekom',
      description: 'Azercell Azərbaycanın aparıcı mobil rabitə operatorudur. 1996-cı ildən fəaliyyət göstərir.',
      stats: {
        positive: 45,
        resolved: 25,
        negative: 30
      },
      views: 8900
    },
    'bakcell': {
      name: 'Bakcell',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/Bakcell_logo.svg/200px-Bakcell_logo.svg.png',
      rating: 2.8,
      totalReviews: 67,
      website: 'www.bakcell.com',
      category: 'Telekom',
      categoryId: 'telekom',
      description: 'Bakcell Azərbaycanın ikinci ən böyük mobil rabitə operatorudur.',
      stats: {
        positive: 50,
        resolved: 30,
        negative: 20
      },
      views: 6700
    },
    'wolt': {
      name: 'Wolt',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Wolt_logo.svg/200px-Wolt_logo.svg.png',
      rating: 3.5,
      totalReviews: 234,
      website: 'wolt.com',
      category: 'Yemək Çatdırılması',
      categoryId: 'yemek-catdirilmasi',
      description: 'Wolt yemək çatdırılması xidməti təklif edən beynəlxalq platformadır.',
      stats: {
        positive: 70,
        resolved: 20,
        negative: 10
      },
      views: 12400
    },
    'bolt-food': {
      name: 'Bolt Food',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e9/Bolt_logo.svg/200px-Bolt_logo.svg.png',
      rating: 3.2,
      totalReviews: 156,
      website: 'food.bolt.eu',
      category: 'Yemək Çatdırılması',
      categoryId: 'yemek-catdirilmasi',
      description: 'Bolt sürətli yemək çatdırılması xidməti təklif edir. Müştərilərə keyfiyyətli və vaxtında çatdırılma xidməti göstərir.',
      stats: {
        positive: 65,
        resolved: 25,
        negative: 10
      },
      views: 9800,
      socialLinks: {
        website: 'https://food.bolt.eu',
        facebook: 'https://facebook.com/bolt',
        instagram: 'https://instagram.com/bolt',
        twitter: 'https://twitter.com/bolt'
      }
    },
    'yango': {
      name: 'Yango',
      logo: 'https://yango.com/images/logo.png',
      rating: 3.8,
      totalReviews: 89,
      website: 'yango.com',
      category: 'Yemək Çatdırılması',
      categoryId: 'yemek-catdirilmasi',
      description: 'Yango müasir texnologiyalardan istifadə edərək yemək çatdırılması xidməti göstərir. Geniş restoran seçimi və sürətli çatdırılma.',
      stats: {
        positive: 78,
        resolved: 15,
        negative: 7
      },
      views: 7200,
      socialLinks: {
        website: 'https://yango.com',
        facebook: 'https://facebook.com/yango',
        instagram: 'https://instagram.com/yango'
      }
    },
    'fooderos': {
      name: 'Fooderos',
      logo: 'https://fooderos.az/images/logo.png',
      rating: 3.4,
      totalReviews: 67,
      website: 'fooderos.az',
      category: 'Yemək Çatdırılması',
      categoryId: 'yemek-catdirilmasi',
      description: 'Fooderos yerli yemək çatdırılması platformasıdır. Azərbaycan mətbəxindən tutmuş beynəlxalq yeməklərə qədər geniş seçim təklif edir.',
      stats: {
        positive: 72,
        resolved: 18,
        negative: 10
      },
      views: 5400,
      socialLinks: {
        website: 'https://fooderos.az',
        facebook: 'https://facebook.com/fooderos',
        instagram: 'https://instagram.com/fooderos'
      }
    },
    'azal': {
  name: 'AZAL',
  logo: 'https://upload.wikimedia.org/wikipedia/commons/6/68/Azerbaijan_Airlines_logo.png',
  website: 'azal.az',
  category: 'Havayolu',
  categoryId: 'havayolu',
  description: 'AZAL — Azərbaycan Hava Yolları, Azərbaycanın milli bayraq daşıyıcısı və ən böyük aviaşirkətidir, 1992-ci ildən fəaliyyət göstərir.',
  rating: 4.3,
  totalReviews: 200,
  stats: {
    positive: 150,
    resolved: 120,
    negative: 50
  },
  views: 14500,
  socialLinks: {
    website: 'https://azal.az/en/',
    facebook: 'https://www.facebook.com/AzerbaijanAirlines',
    instagram: 'https://www.instagram.com/azerbaijanairlines/',
    twitter: 'https://twitter.com/AzalOfficial',
    youtube: 'https://www.youtube.com/AzerbaijanAirlinesOfficial',
    linkedin: 'https://www.linkedin.com/company/azerbaiCategoryCardjan-airlines/',
    telegram: 'https://t.me/azerbaijanairlines'
  }
},

'nar-mobile': {
  name: 'Nar',
  logo: 'https://upload.wikimedia.org/wikipedia/commons/2/27/Nar_logo.png',
  website: 'nar.az',
  category: 'Mobil operator',
  categoryId: 'mobil_operator',
  description: 'Azerfon MMC – Nar mobil rabitə operatoru 2007-ci ildən etibarən fəaliyyət göstərir və müştərilərə keyfiyyətli rabitə xidmətləri təqdim edir.',
  rating: 4.2,
  totalReviews: 120,
  stats: {
    positive: 90,
    resolved: 70,
    negative: 30
  },
  views: 9800,
  socialLinks: {
    website: 'https://www.nar.az',
    facebook: 'https://www.facebook.com/Narofficial/',
    instagram: 'https://www.instagram.com/nar_official/'
  }
},

'azersu': {
  name: 'Azərsu',
  logo: 'https://upload.wikimedia.org/wikipedia/commons/1/1f/Azersu_logo.png',
  website: 'azersu.az',
  category: 'Su təchizatı',
  categoryId: 'su_techizati',
  description: 'Azərsu ASC — Azərbaycanın su təchizatı və kanalizasiya xidmətlərini təmin edən dövlət müəssisəsidir.',
  rating: 3.1,
  totalReviews: 80,
  stats: {
    positive: 40,
    resolved: 25,
    negative: 40
  },
  views: 5200,
  socialLinks: {
    website: 'http://www.azersu.az'
  }
},

'azerishiq': {
  name: 'Azerişıq',
  logo: 'https://azerishiq.az/images/logo.png',
  website: 'azerishiq.az',
  category: 'Elektrik təchizatı',
  categoryId: 'elektrik_techizati',
  description: 'Azerişıq ASC — elektrik enerjisinin paylanması və abonentlərin dayanıqlı təchizatı ilə məşğul olan şirkətdir.',
  rating: 2.9,
  totalReviews: 150,
  stats: {
    positive: 60,
    resolved: 45,
    negative: 90
  },
  views: 11200,
  socialLinks: {
    website: 'http://www.azerishiq.az',
    instagram: 'https://www.instagram.com/azerishiq.asc/'
  }
},

'bip': {
  name: 'BiP',
  logo: 'https://bip.com/assets/img/logo.svg',
  category: 'Messenger',
  categoryId: 'messenger',
  description: 'BiP — təhlükəsiz mesajlaşma, səsli və video zənglər, tərcümə funksiyası və itən mesajlar təqdim edən mobil tətbiqdir.',
  rating: 4.5,
  totalReviews: 95,
  stats: {
    positive: 80,
    resolved: 60,
    negative: 15
  },
  views: 8700,
  socialLinks: {
    website: 'https://bip.com'
  }
},

'yelo-bank': {
  name: 'Yelo Bank',
  logo: 'https://upload.wikimedia.org/wikipedia/commons/5/5c/Yelo_Bank_logo.png',
  website: 'yelo.az',
  category: 'Bank',
  categoryId: 'bank',
  description: 'Yelo Bank — müasir və müştəri yönümlü bank xidmətləri təqdim edən parlaq bankdır.',
  rating: 4.0,
  totalReviews: 110,
  stats: {
    positive: 85,
    resolved: 70,
    negative: 25
  },
  views: 7600,
  socialLinks: {
    website: 'https://www.yelo.az',
    facebook: 'https://www.facebook.com/yelobank/',
    instagram: 'https://www.instagram.com/yelobank/'
  }
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

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm text-gray-500 mb-6">
          <Link to="/" className="hover:text-gray-700">Ana səhifə</Link>
          <span>/</span>
          <Link to={`/category/${company.categoryId}`} className="hover:text-gray-700">
            {company.category}
          </Link>
          <span>/</span>
          <span className="text-gray-900">{company.name}</span>
        </nav>

        {/* Company Header */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex items-start space-x-6">
            <img
              src={company.logo}
              alt={company.name}
              className="w-20 h-20 object-contain"
              onError={(e) => {
                e.target.src = `https://ui-avatars.com/api/?name=${company.name}&background=3b82f6&color=fff&size=80`;
              }}
            />
            <div className="flex-1">
              <div className="flex items-center space-x-3 mb-2">
                <h1 className="text-2xl font-bold text-gray-900">{company.name}</h1>
                <div className="flex items-center space-x-1">
                  <svg className="w-5 h-5 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
              
              <div className="flex items-center space-x-4 mb-3">
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.floor(company.rating)
                          ? 'text-yellow-400'
                          : 'text-gray-300'
                      }`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                  <span className="text-lg font-semibold text-gray-900 ml-2">{company.rating}/5</span>
                </div>
                <span className="text-gray-600">Müştərin sayı: {company.totalReviews}</span>
                {company.website && (
                  <a 
                    href={`https://${company.website}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800"
                  >
                    {company.website}
                  </a>
                )}
              </div>
              
              <div className="flex items-center space-x-1 text-gray-500 mb-4">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                <span>{company.views} baxış</span>
              </div>

              {/* Stats */}
              <div className="flex items-center space-x-6">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-sm text-gray-600">{company.stats.positive}% Cavab vermə faizi</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <span className="text-sm text-gray-600">{company.stats.resolved}% Həll olunmuş şikayətlər</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <span className="text-sm text-gray-600">{company.stats.negative}% Müştəri loyallığı</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Company Description */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Şirkət haqqında</h2>
          <p className="text-gray-700 leading-relaxed">{company.description}</p>
          
          {company.socialLinks && (
            <div className="mt-6">
              <h3 className="text-lg font-medium text-gray-900 mb-3">Əlaqə</h3>
              <div className="flex items-center space-x-4">
                {company.socialLinks.website && (
                  <a href={company.socialLinks.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4.083 9h1.946c.089-1.546.383-2.97.837-4.118A6.004 6.004 0 004.083 9zM10 2a8 8 0 100 16 8 8 0 000-16zm0 2c-.076 0-.232.032-.465.262-.238.234-.497.623-.737 1.182-.389.907-.673 2.142-.766 3.556h3.936c-.093-1.414-.377-2.649-.766-3.556-.24-.559-.499-.948-.737-1.182C10.232 4.032 10.076 4 10 4zm3.971 5c-.089-1.546-.383-2.97-.837-4.118A6.004 6.004 0 0115.917 9h-1.946zm-2.003 2H8.032c.093 1.414.377 2.649.766 3.556.24.559.499.948.737 1.182.233.23.389.262.465.262.076 0 .232-.032.465-.262.238-.234.497-.623.737-1.182.389-.907.673-2.142.766-3.556zm1.166 4.118c.454-1.148.748-2.572.837-4.118h1.946a6.004 6.004 0 01-2.783 4.118zm-6.268 0C6.412 13.97 6.118 12.546 6.03 11H4.083a6.004 6.004 0 002.783 4.118z" clipRule="evenodd" />
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
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
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
          )}
        </div>

        {/* Action Button */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="text-center">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Rəyini bildir</h3>
            <p className="text-gray-600 mb-4">Sual, rəy və ya şikayətinizi paylaşın</p>
            <Link
              to={`/review/${companyId}`}
              className="inline-flex items-center px-6 py-3 bg-primary text-white font-medium rounded-lg hover:bg-primary/90 transition-colors duration-200"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Rəy bildir
            </Link>
          </div>
        </div>

        {/* User Comments Section */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-6">İstifadəçi Şərhləri</h3>

          {/* Sample Comments */}
          <div className="space-y-6">
            <div className="border-b border-gray-200 pb-6">
              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-medium">
                  A
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="font-medium text-gray-900">Ali Məmmədov</span>
                    <span className="text-sm text-gray-500">3 gün əvvəl</span>
                    <div className="flex items-center">
                      {[1, 2, 3, 4].map((star) => (
                        <svg key={star} className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                      <svg className="w-4 h-4 text-gray-300 fill-current" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    </div>
                  </div>
                  <p className="text-gray-700">
                    {company.name} ilə təcrübəm ümumiyyətlə yaxşı olub. Xidmət keyfiyyəti qənaətbəxşdir, lakin bəzi hallarda gecikmələr olur.
                  </p>
                </div>
              </div>
            </div>

            <div className="border-b border-gray-200 pb-6">
              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white font-medium">
                  L
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="font-medium text-gray-900">Leyla Həsənova</span>
                    <span className="text-sm text-gray-500">1 həftə əvvəl</span>
                    <div className="flex items-center">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <svg key={star} className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                  </div>
                  <p className="text-gray-700">
                    Çox məmnunam! Müştəri xidməti əla, problemlər tez həll olunur. Tövsiyə edirəm.
                  </p>
                </div>
              </div>
            </div>

            <div>
              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center text-white font-medium">
                  R
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="font-medium text-gray-900">Rəşad Quliyev</span>
                    <span className="text-sm text-gray-500">2 həftə əvvəl</span>
                    <div className="flex items-center">
                      {[1, 2].map((star) => (
                        <svg key={star} className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                      {[3, 4, 5].map((star) => (
                        <svg key={star} className="w-4 h-4 text-gray-300 fill-current" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                  </div>
                  <p className="text-gray-700">
                    Təəssüf ki, xidmət keyfiyyəti gözlədiyim kimi deyil. Çox vaxt problemlər yaranır və həlli uzun çəkir.
                  </p>
                </div>
              </div>
            </div>
          </div>


        </div>
      </div>
    </div>
  );
};

export default CompanyDetailPage;
