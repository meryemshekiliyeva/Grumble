import React from 'react';

const CompanyRegistrationForm = ({ formData, handleChange }) => {
  return (
    <>
      {/* Name Fields */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="firstName" className="block text-sm font-semibold text-gray-700 mb-2 az-text">
            Ad<span className="text-red-500">*</span>
          </label>
          <input
            id="firstName"
            name="firstName"
            type="text"
            required
            value={formData.firstName}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white/50 backdrop-blur-sm az-text"
            placeholder="Ad"
          />
        </div>
        <div>
          <label htmlFor="lastName" className="block text-sm font-semibold text-gray-700 mb-2 az-text">
            Soyad<span className="text-red-500">*</span>
          </label>
          <input
            id="lastName"
            name="lastName"
            type="text"
            required
            value={formData.lastName}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white/50 backdrop-blur-sm az-text"
            placeholder="Soyad"
          />
        </div>
      </div>

      {/* Company Name */}
      <div>
        <label htmlFor="companyName" className="block text-sm font-semibold text-gray-700 mb-2 az-text">
          Şirkətin adı<span className="text-red-500">*</span>
        </label>
        <input
          id="companyName"
          name="companyName"
          type="text"
          required
          value={formData.companyName}
          onChange={handleChange}
          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white/50 backdrop-blur-sm az-text"
          placeholder="Şirkətin | Brendin adı"
        />
      </div>

      {/* Phone Number */}
      <div>
        <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2 az-text">
          Əlaqə nömrəsi<span className="text-red-500">*</span>
        </label>
        <div className="flex">
          <div className="flex items-center px-3 py-3 border border-r-0 border-gray-200 rounded-l-xl bg-gray-50 text-gray-500 text-sm">
            +994
          </div>
          <input
            id="phone"
            name="phone"
            type="tel"
            required
            value={formData.phone}
            onChange={handleChange}
            className="flex-1 px-4 py-3 border border-gray-200 rounded-r-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white/50 backdrop-blur-sm az-text"
            placeholder="123456789"
          />
        </div>
      </div>

      {/* Email */}
      <div>
        <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2 az-text">
          Email adresin<span className="text-red-500">*</span>
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
          placeholder="info@shirket.az"
        />
      </div>

      {/* Registration Info */}
      <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-xl">
        <div className="flex items-start space-x-2">
          <svg className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div>
            <h4 className="text-sm font-semibold text-green-800 mb-1 az-text">Qeydiyyat Məlumatı</h4>
            <p className="text-xs text-green-700 az-text">
              Qeydiyyatdan sonra giriş üçün şifrə: <strong>Company123!</strong>
            </p>
            <p className="text-xs text-green-700 az-text mt-1">
              Bu şifrə ilə şirkət dashboard-ına daxil ola biləcəksiniz.
            </p>
          </div>
        </div>
      </div>

    </>
  );
};

export default CompanyRegistrationForm;
