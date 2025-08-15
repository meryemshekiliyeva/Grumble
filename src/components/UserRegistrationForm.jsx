import React, { useState } from 'react';

const UserRegistrationForm = ({ formData, handleChange }) => {
  const [passwordValidation, setPasswordValidation] = useState({
    length: false,
    uppercase: false,
    number: false,
    special: false
  });

  const validatePassword = (password) => {
    const validation = {
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      number: /\d/.test(password),
      special: /[!@#$%^&*(),.?":{}|<>]/.test(password)
    };
    setPasswordValidation(validation);
    return validation;
  };

  const handlePasswordChange = (e) => {
    const password = e.target.value;
    validatePassword(password);
    handleChange(e);
  };
  return (
    <>
      {/* Name Fields */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="firstName" className="block text-sm font-semibold text-gray-700 mb-2 az-text">
            Ad
          </label>
          <input
            id="firstName"
            name="firstName"
            type="text"
            required
            value={formData.firstName}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white/50 backdrop-blur-sm az-text"
            placeholder="Adınız"
          />
        </div>
        <div>
          <label htmlFor="lastName" className="block text-sm font-semibold text-gray-700 mb-2 az-text">
            Soyad
          </label>
          <input
            id="lastName"
            name="lastName"
            type="text"
            required
            value={formData.lastName}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white/50 backdrop-blur-sm az-text"
            placeholder="Soyadınız"
          />
        </div>
      </div>

      {/* Email */}
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

      {/* Password */}
      <div>
        <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2 az-text">
          Şifrə
        </label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="new-password"
          required
          value={formData.password}
          onChange={handlePasswordChange}
          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white/50 backdrop-blur-sm az-text"
          placeholder="••••••••"
        />
        {formData.password && (
          <div className="mt-2 space-y-1">
            <div className="text-xs text-gray-600 mb-1">Şifrə tələbləri:</div>
            <div className={`text-xs flex items-center ${passwordValidation.length ? 'text-green-600' : 'text-red-600'}`}>
              <span className="mr-1">{passwordValidation.length ? '✓' : '✗'}</span>
              Ən azı 8 simvol
            </div>
            <div className={`text-xs flex items-center ${passwordValidation.uppercase ? 'text-green-600' : 'text-red-600'}`}>
              <span className="mr-1">{passwordValidation.uppercase ? '✓' : '✗'}</span>
              Böyük hərf
            </div>
            <div className={`text-xs flex items-center ${passwordValidation.number ? 'text-green-600' : 'text-red-600'}`}>
              <span className="mr-1">{passwordValidation.number ? '✓' : '✗'}</span>
              Rəqəm
            </div>
            <div className={`text-xs flex items-center ${passwordValidation.special ? 'text-green-600' : 'text-red-600'}`}>
              <span className="mr-1">{passwordValidation.special ? '✓' : '✗'}</span>
              Xüsusi simvol (!@#$%^&*)
            </div>
          </div>
        )}
      </div>

      {/* Confirm Password */}
      <div>
        <label htmlFor="confirmPassword" className="block text-sm font-semibold text-gray-700 mb-2 az-text">
          Şifrəni Təsdiqləyin
        </label>
        <input
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          autoComplete="new-password"
          required
          value={formData.confirmPassword}
          onChange={handleChange}
          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white/50 backdrop-blur-sm az-text"
          placeholder="••••••••"
        />
      </div>

      {/* Terms Agreement */}
      <div className="flex items-start">
        <div className="flex items-center h-5">
          <input
            id="agreeToTerms"
            name="agreeToTerms"
            type="checkbox"
            required
            checked={formData.agreeToTerms}
            onChange={handleChange}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
        </div>
        <div className="ml-3 text-sm">
          <label htmlFor="agreeToTerms" className="text-gray-700 az-text">
            <span className="text-blue-600 hover:text-blue-500 cursor-pointer">İstifadə Şərtləri</span>
            {' '}və{' '}
            <span className="text-blue-600 hover:text-blue-500 cursor-pointer">Məxfilik Siyasəti</span>
            ni qəbul edirəm
          </label>
        </div>
      </div>
    </>
  );
};

export default UserRegistrationForm;
