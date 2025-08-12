import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { getPasswordResetEmailTemplate, sendEmail } from '../utils/emailTemplates';

const ForgotPassword = () => {
  const [step, setStep] = useState(1); // 1: Email input, 2: Code verification, 3: New password
  const [formData, setFormData] = useState({
    email: '',
    verificationCode: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Generate reset code
      const resetCode = Math.floor(100000 + Math.random() * 900000).toString();

      // Send password reset email
      const emailTemplate = getPasswordResetEmailTemplate('İstifadəçi', resetCode);
      await sendEmail(formData.email, emailTemplate);

      setIsLoading(false);
      setMessage('Təsdiq kodu e-poçt ünvanınıza göndərildi.');
      setStep(2);
    } catch (error) {
      setIsLoading(false);
      setMessage('E-poçt göndərilmədi. Yenidən cəhd edin.');
    }
  };

  const handleCodeVerification = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      if (formData.verificationCode === '123456') {
        setMessage('Kod təsdiqləndi. Yeni şifrənizi daxil edin.');
        setStep(3);
      } else {
        setMessage('Yanlış kod. Yenidən cəhd edin.');
      }
    }, 1500);
  };

  const handlePasswordReset = async (e) => {
    e.preventDefault();
    
    if (formData.newPassword !== formData.confirmPassword) {
      setMessage('Şifrələr uyğun gəlmir.');
      return;
    }
    
    if (formData.newPassword.length < 8) {
      setMessage('Şifrə ən azı 8 simvol olmalıdır.');
      return;
    }
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setMessage('Şifrəniz uğurla dəyişdirildi!');
      // Redirect to login after 2 seconds
      setTimeout(() => {
        window.location.href = '/login';
      }, 2000);
    }, 2000);
  };

  const resendCode = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setMessage('Yeni təsdiq kodu göndərildi.');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl flex items-center justify-center">
              <svg
                className="w-8 h-8 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
              </svg>
            </div>
          </div>
          <h2 className="text-3xl font-black text-gray-900 az-text">
            Şifrəni Sıfırla
          </h2>
          <p className="mt-2 text-sm text-gray-600 az-text">
            {step === 1 && 'E-poçt ünvanınızı daxil edin və təsdiq kodunu gözləyin'}
            {step === 2 && 'E-poçtunuza göndərilən təsdiq kodunu daxil edin'}
            {step === 3 && 'Yeni şifrənizi daxil edin'}
          </p>
        </div>

        {/* Progress Indicator */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center space-x-4">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
              step >= 1 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-500'
            }`}>
              1
            </div>
            <div className={`w-8 h-1 ${step >= 2 ? 'bg-blue-600' : 'bg-gray-200'}`}></div>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
              step >= 2 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-500'
            }`}>
              2
            </div>
            <div className={`w-8 h-1 ${step >= 3 ? 'bg-blue-600' : 'bg-gray-200'}`}></div>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
              step >= 3 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-500'
            }`}>
              3
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-8">
          {/* Step 1: Email Input */}
          {step === 1 && (
            <form onSubmit={handleEmailSubmit} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2 az-text">
                  E-poçt Ünvanı
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white/50 backdrop-blur-sm az-text"
                  placeholder="sizin@email.com"
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed az-text"
              >
                {isLoading ? (
                  <div className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Göndərilir...
                  </div>
                ) : (
                  'Təsdiq Kodu Göndər'
                )}
              </button>
            </form>
          )}

          {/* Step 2: Code Verification */}
          {step === 2 && (
            <form onSubmit={handleCodeVerification} className="space-y-6">
              <div>
                <label htmlFor="verificationCode" className="block text-sm font-semibold text-gray-700 mb-2 az-text">
                  Təsdiq Kodu
                </label>
                <input
                  id="verificationCode"
                  name="verificationCode"
                  type="text"
                  required
                  value={formData.verificationCode}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white/50 backdrop-blur-sm az-text text-center text-2xl tracking-widest"
                  placeholder="123456"
                  maxLength="6"
                />
                <p className="mt-2 text-xs text-gray-500 az-text">
                  {formData.email} ünvanına göndərilən 6 rəqəmli kodu daxil edin
                </p>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed az-text"
              >
                {isLoading ? (
                  <div className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Yoxlanılır...
                  </div>
                ) : (
                  'Kodu Təsdiqlə'
                )}
              </button>

              <div className="text-center">
                <button
                  type="button"
                  onClick={resendCode}
                  className="text-sm text-blue-600 hover:text-blue-500 az-text"
                >
                  Kodu yenidən göndər
                </button>
              </div>
            </form>
          )}

          {/* Step 3: New Password */}
          {step === 3 && (
            <form onSubmit={handlePasswordReset} className="space-y-6">
              <div>
                <label htmlFor="newPassword" className="block text-sm font-semibold text-gray-700 mb-2 az-text">
                  Yeni Şifrə
                </label>
                <input
                  id="newPassword"
                  name="newPassword"
                  type="password"
                  required
                  value={formData.newPassword}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white/50 backdrop-blur-sm az-text"
                  placeholder="••••••••"
                />
              </div>

              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-semibold text-gray-700 mb-2 az-text">
                  Şifrəni Təsdiqlə
                </label>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  required
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white/50 backdrop-blur-sm az-text"
                  placeholder="••••••••"
                />
              </div>

              <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
                <h4 className="text-sm font-semibold text-blue-900 mb-2 az-text">Şifrə tələbləri:</h4>
                <ul className="text-xs text-blue-800 space-y-1">
                  <li className="flex items-center az-text">
                    <span className={`mr-2 ${formData.newPassword.length >= 8 ? 'text-green-500' : 'text-gray-400'}`}>
                      {formData.newPassword.length >= 8 ? '✓' : '○'}
                    </span>
                    Ən azı 8 simvol
                  </li>
                  <li className="flex items-center az-text">
                    <span className={`mr-2 ${/[A-Z]/.test(formData.newPassword) ? 'text-green-500' : 'text-gray-400'}`}>
                      {/[A-Z]/.test(formData.newPassword) ? '✓' : '○'}
                    </span>
                    Böyük hərf
                  </li>
                  <li className="flex items-center az-text">
                    <span className={`mr-2 ${/[0-9]/.test(formData.newPassword) ? 'text-green-500' : 'text-gray-400'}`}>
                      {/[0-9]/.test(formData.newPassword) ? '✓' : '○'}
                    </span>
                    Rəqəm
                  </li>
                </ul>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed az-text"
              >
                {isLoading ? (
                  <div className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Dəyişdirilir...
                  </div>
                ) : (
                  'Şifrəni Dəyişdir'
                )}
              </button>
            </form>
          )}

          {/* Message Display */}
          {message && (
            <div className={`mt-4 p-4 rounded-xl ${
              message.includes('uğurla') || message.includes('təsdiqləndi') || message.includes('göndərildi')
                ? 'bg-green-50 text-green-800 border border-green-200'
                : 'bg-red-50 text-red-800 border border-red-200'
            }`}>
              <p className="text-sm az-text">{message}</p>
            </div>
          )}
        </div>

        {/* Back to Login */}
        <div className="text-center">
          <Link to="/login" className="text-sm text-blue-600 hover:text-blue-500 az-text">
            ← Giriş səhifəsinə qayıt
          </Link>
        </div>

        {/* Help */}
        <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
          <h3 className="text-lg font-bold text-gray-900 mb-4 az-text">Kömək lazımdır?</h3>
          <div className="space-y-3 text-sm text-gray-600">
            <div className="flex items-center az-text">
              <svg className="w-4 h-4 text-blue-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              E-poçt gəlmirsə spam qovluğunu yoxlayın
            </div>
            <div className="flex items-center az-text">
              <svg className="w-4 h-4 text-blue-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Kod 10 dəqiqə ərzində etibarlıdır
            </div>
            <div className="flex items-center az-text">
              <svg className="w-4 h-4 text-blue-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M12 2.25a9.75 9.75 0 11-9.75 9.75A9.75 9.75 0 0112 2.25z" />
              </svg>
              Problem yaşayırsınızsa help@grumble.az ilə əlaqə saxlayın
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
