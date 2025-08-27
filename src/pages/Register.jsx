import React, { useState, useEffect } from 'react';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { getRegistrationEmailTemplate, sendEmail } from '../utils/emailTemplates';
import UserRegistrationForm from '../components/UserRegistrationForm';
import CompanyRegistrationForm from '../components/CompanyRegistrationForm';
import SocialLogin from '../components/SocialLogin';

const Register = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { register } = useAuth();
  const [activeTab, setActiveTab] = useState('user'); // 'user' or 'company'
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [companyFormData, setCompanyFormData] = useState({
    firstName: '',
    lastName: '',
    companyName: '',
    email: '',
    phone: ''
  });

  useEffect(() => {
    const type = searchParams.get('type');
    if (type === 'company') {
      setActiveTab('company');
    }
  }, [searchParams]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (activeTab === 'user') {
      setFormData({
        ...formData,
        [name]: type === 'checkbox' ? checked : value
      });
    } else {
      setCompanyFormData({
        ...companyFormData,
        [name]: type === 'checkbox' ? checked : value
      });
    }
  };

  const handleSocialLogin = async (userData) => {
    setLoading(true);
    setError('');

    try {
      // Simulate social login API call
      await new Promise(resolve => setTimeout(resolve, 1500));

      const socialUser = {
        ...userData,
        type: 'user'
      };

      localStorage.setItem('grumble_user', JSON.stringify(socialUser));
      register(socialUser);
      navigate('/');
    } catch (err) {
      setError(`${userData.provider} ilə qeydiyyat zamanı xəta baş verdi`);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (activeTab === 'user') {
        // Basic validation
        if (!formData.firstName || !formData.lastName || !formData.email || !formData.password) {
          setError('Bütün sahələri doldurun');
          setLoading(false);
          return;
        }

        // Password validation
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{8,}$/;
        if (!passwordRegex.test(formData.password)) {
          setError('Şifrə ən azı 8 simvol, böyük hərf, rəqəm və xüsusi simvol olmalıdır');
          setLoading(false);
          return;
        }

        if (formData.password !== formData.confirmPassword) {
          setError('Şifrələr uyğun gəlmir');
          setLoading(false);
          return;
        }

        // Check if email already exists
        const existingUsers = JSON.parse(localStorage.getItem('grumble_users') || '[]');
        if (existingUsers.some(user => user.email === formData.email)) {
          setError('Bu email ünvanı ilə artıq qeydiyyat mövcuddur');
          setLoading(false);
          return;
        }

        if (!formData.agreeToTerms) {
          setError('İstifadə şərtlərini qəbul etməlisiniz');
          setLoading(false);
          return;
        }

        // Register user
        const result = await register({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          password: formData.password,
          confirmPassword: formData.confirmPassword,
          phone: formData.phone
        });

        if (result.success) {
          setSuccess('Qeydiyyat uğurla tamamlandı! E-poçt ünvanınıza doğrulama kodu göndərildi.');
          // Redirect to email verification page
          setTimeout(() => {
            navigate(`/verify-email?email=${encodeURIComponent(formData.email)}`);
          }, 2000);
        } else {
          if (result.errors && result.errors.length > 0) {
            setError(result.errors.map(err => err.msg).join(', '));
          } else {
            setError(result.message || 'Qeydiyyat zamanı xəta baş verdi');
          }
        }

        // Redirect to login after 2 seconds
        setTimeout(() => {
          navigate('/login');
        }, 2000);

      } else {
        // Handle company registration
        if (!companyFormData.firstName || !companyFormData.lastName || !companyFormData.companyName || !companyFormData.email) {
          setError('Bütün sahələri doldurun');
          setLoading(false);
          return;
        }

        // Store registered company data
        const registeredCompanies = JSON.parse(localStorage.getItem('registeredCompanies') || '[]');
        const newCompany = {
          ...companyFormData,
          registeredAt: new Date().toISOString(),
          id: Date.now()
        };
        registeredCompanies.push(newCompany);
        localStorage.setItem('registeredCompanies', JSON.stringify(registeredCompanies));

        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1500));

        setSuccess('Şirkət qeydiyyatı uğurla tamamlandı! Giriş üçün şifrə: Company123! - Giriş səhifəsinə yönləndirilirsiniz...');

        setTimeout(() => {
          navigate('/login?type=company');
        }, 3000);
      }
    } catch (err) {
      setError('Qeydiyyat zamanı xəta baş verdi');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center">
              <svg
                className="w-8 h-8 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              </svg>
            </div>
          </div>
          <h2 className="text-3xl font-black text-gray-900 az-text">
            Grumble-a Qoşulun
          </h2>
          <p className="mt-2 text-sm text-gray-600 az-text">
            {activeTab === 'user'
              ? 'Şikayətlərinizi bildirin və problemlərinizə həll tapın'
              : 'Şirkət hesabı yaradın və şikayətləri idarə edin'
            }
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 overflow-hidden">
          <div className="flex">
            <button
              onClick={() => setActiveTab('user')}
              className={`flex-1 py-4 px-6 text-sm font-semibold transition-all duration-200 ${
                activeTab === 'user'
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                  : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
              }`}
            >
              <div className="flex items-center justify-center space-x-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <span className="az-text">İstifadəçi Qeydiyyatı</span>
              </div>
            </button>
            <button
              onClick={() => setActiveTab('company')}
              className={`flex-1 py-4 px-6 text-sm font-semibold transition-all duration-200 ${
                activeTab === 'company'
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                  : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
              }`}
            >
              <div className="flex items-center justify-center space-x-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
                <span className="az-text">Şirkət Qeydiyyatı</span>
              </div>
            </button>
          </div>

        {/* Form */}
        <div className="p-8">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {activeTab === 'user' ? (
              <UserRegistrationForm
                formData={formData}
                handleChange={handleChange}
              />
            ) : (
              <CompanyRegistrationForm
                formData={companyFormData}
                handleChange={handleChange}
              />
            )}



            {/* Demo Info */}
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
              <h4 className="text-sm font-semibold text-green-800 mb-2">Demo Məlumat:</h4>
              <div className="text-xs text-green-700">
                {activeTab === 'user' ? (
                  <div>Qeydiyyatdan sonra demo hesabları ilə giriş edə bilərsiniz</div>
                ) : (
                  <div>Şirkət qeydiyyatından sonra şifrə: Company123! olacaq</div>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                className="w-full flex justify-center items-center py-4 px-6 border border-transparent rounded-xl text-base font-bold text-white transition-all duration-300 shadow-lg hover:shadow-2xl transform hover:-translate-y-1 az-text bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 focus:ring-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 active:scale-95"
              >
                {activeTab === 'company' && (
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                )}
                {activeTab === 'company' ? 'Göndər' : 'Hesab Yaradın'}
              </button>
            </div>

            {/* Social Registration - Only for users */}
            {activeTab === 'user' && (
              <div className="mt-6">
                <SocialLogin
                  onGoogleLogin={handleSocialLogin}
                  onFacebookLogin={handleSocialLogin}
                />
              </div>
            )}
          </form>

          {/* Login link */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600 az-text">
              {activeTab === 'user' ? 'Artıq hesabınız var?' : 'Artıq şirkət hesabınız var?'}{' '}
              <Link to={`/login?type=${activeTab}`} className="font-semibold text-blue-600 hover:text-blue-500 az-text">
                Daxil olun
              </Link>
            </p>
          </div>
          </div>
        </div>

        {/* Benefits */}
        <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
          <h3 className="text-lg font-bold text-gray-900 mb-4 az-text">Grumble-a qoşulmaqla:</h3>
          <ul className="space-y-2 text-sm text-gray-600">
            <li className="flex items-center az-text">
              <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              Şikayətlərinizi pulsuz bildirin
            </li>
            <li className="flex items-center az-text">
              <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              Sürətli həll yolları tapın
            </li>
            <li className="flex items-center az-text">
              <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              Şirkətlərlə birbaşa əlaqə qurun
            </li>
            <li className="flex items-center az-text">
              <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              Digər istifadəçilərin təcrübələrindən faydalanın
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Register;
