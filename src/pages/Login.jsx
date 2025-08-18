import React, { useState, useEffect } from 'react';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import SocialLogin from '../components/SocialLogin';

const Login = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { login } = useAuth();
  const [activeTab, setActiveTab] = useState('user'); // 'user' or 'company'
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [companyFormData, setCompanyFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSocialLogin = async (provider) => {
    setLoading(true);
    setError('');

    try {
      // Redirect to OAuth provider
      window.location.href = `/api/auth/${provider}`;
    } catch (err) {
      setError(`${provider} ilə giriş zamanı xəta baş verdi`);
      setLoading(false);
    }
  };

  useEffect(() => {
    const type = searchParams.get('type');
    if (type === 'company') {
      setActiveTab('company');
    }

    // Load remembered email if exists
    const rememberedEmail = localStorage.getItem('rememberedEmail');
    if (rememberedEmail) {
      setFormData(prev => ({
        ...prev,
        email: rememberedEmail,
        rememberMe: true
      }));
    }
  }, [searchParams]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const inputValue = type === 'checkbox' ? checked : value;

    if (activeTab === 'user') {
      setFormData({
        ...formData,
        [name]: inputValue
      });
    } else {
      setCompanyFormData({
        ...companyFormData,
        [name]: inputValue
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const currentFormData = activeTab === 'user' ? formData : companyFormData;

      if (activeTab === 'user') {
        const result = await login(currentFormData.email, currentFormData.password, currentFormData.rememberMe);

        if (result.success) {
          // Store remember me preference
          if (currentFormData.rememberMe) {
            localStorage.setItem('rememberedEmail', currentFormData.email);
          } else {
            localStorage.removeItem('rememberedEmail');
          }
          navigate('/');
        } else {
          setError(result.message || 'Giriş zamanı xəta baş verdi');
        }
      } else {
        // Company login - implement later
        setError('Şirkət girişi hələ hazır deyil');
      }
    } catch (err) {
      setError('Giriş zamanı xəta baş verdi');
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
            Grumble Giriş
          </h2>
          <p className="mt-2 text-sm text-gray-600 az-text">
            {activeTab === 'user'
              ? 'Şikayətlərinizi bildirmək və həll yollarını tapmaq üçün daxil olun'
              : 'Şirkət hesabınıza daxil olun və şikayətləri idarə edin'
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
                <span className="az-text">İstifadəçi Girişi</span>
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
                <span className="az-text">Şirkət Girişi</span>
              </div>
            </button>
          </div>

          {/* Form */}
          <div className="p-8">
            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-sm text-red-600">{error}</p>
              </div>
            )}
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2 az-text">
                Email adresin
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={activeTab === 'user' ? formData.email : companyFormData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white/50 backdrop-blur-sm az-text"
                placeholder={activeTab === 'user' ? 'sizin@email.com' : 'sirket@email.com'}
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2 az-text">
                Şifrə
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={activeTab === 'user' ? formData.password : companyFormData.password}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white/50 backdrop-blur-sm az-text"
                placeholder="••••••••"
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="rememberMe"
                  type="checkbox"
                  checked={activeTab === 'user' ? formData.rememberMe : companyFormData.rememberMe}
                  onChange={handleChange}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700 az-text">
                  Məni xatırla
                </label>
              </div>

              <div className="text-sm">
                <Link to="/forgot-password" className="font-medium text-blue-600 hover:text-blue-500 az-text">
                  Şifrəni unutmusunuz?
                </Link>
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 az-text disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Giriş edilir...' : 'Daxil Ol'}
              </button>
            </div>

            {/* Social Login - Only for users */}
            {activeTab === 'user' && (
              <div className="mt-6">
                <SocialLogin
                  onGoogleLogin={handleSocialLogin}
                  onFacebookLogin={handleSocialLogin}
                />
              </div>
            )}
          </form>

          {/* Sign up link */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600 az-text">
              {activeTab === 'user' ? 'Hesabınız yoxdur?' : 'Şirkət hesabınız yoxdur?'}{' '}
              <Link to={`/register?type=${activeTab}`} className="font-semibold text-blue-600 hover:text-blue-500 az-text">
                Qeydiyyatdan keçin
              </Link>
            </p>
          </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center">
          <p className="text-xs text-gray-500 az-text">
            Daxil olmaqla{' '}
            <Link to="/terms" className="text-blue-600 hover:text-blue-500">İstifadə Şərtləri</Link>
            {' '}və{' '}
            <Link to="/privacy" className="text-blue-600 hover:text-blue-500">Məxfilik Siyasəti</Link>
            ni qəbul etmiş olursunuz.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;